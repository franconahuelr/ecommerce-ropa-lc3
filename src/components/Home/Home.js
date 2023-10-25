import React from "react";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import {Products} from './../Products/Products';
import {auth, fs} from "../../Firebase/Firebase";
import {getDoc, doc, getDocs, collection, query, deleteDoc, setDoc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {CarouselImages} from "./CarouselImages/CarouselImages";
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const history = useNavigate();

  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        }
      });
      return unsubscribe;
    }, []);
    return uid;
  }
  const uid = GetUserUid();

  const [userRole, setUserRole] = useState(null);
  // Getting the current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          const userRef = doc(fs, 'users', authUser.uid);
          getDoc(userRef)
            .then((snapshot) => {
              if (snapshot.exists()) {
                const userData = snapshot.data();
                setUser({ email: userData.email, role: userData.role });
                setUserRole(userData.role)
              } else {
                setUser(null);
              }
            })
            .catch((error) => {
              console.error('Error getting user document:', error);
            });
        } else {
          setUser(null);
          setUserRole(null);
        }
      });

      // Cleanup function
      return () => unsubscribe();
    }, []);

    return user;
  }

  const user = GetCurrentUser();
  console.log(userRole);


  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productsQuery = query(collection(fs, 'Products'));
    const productsSnapshot = await getDocs(productsQuery);

    const productsArray = productsSnapshot.docs.map((doc) => ({
      ID: doc.id,
      ...doc.data(),
    }));

    setProducts(productsArray);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      // Delete the product from Firestore by its ID
      await deleteDoc(doc(fs, 'Products', productId));

      // Update the product list by filtering out the deleted product
      setProducts((prevProducts) => prevProducts.filter((product) => product.ID !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = (product) => {
    if (uid !== null) {
      const Product = { ...product, qty: 1, TotalProductPrice: product.qty * product.price };
      const cartRef = collection(fs, `Cart ${uid}`);
      const cartDoc = doc(cartRef, product.ID);
  
      setDoc(cartDoc, Product)
        .then(() => {
          console.log('Successfully added to cart');
        })
        .catch((error) => {
          console.error('Error adding to cart: ', error);
        });
  } else {
    history('/login');
    }
  };
  return (
    <>
      <Navbar user={user} />
      <CarouselImages />
      <br />
      {products.length > 0 ? (
        <div className="container-fluid">
          <h1 className="text-center">Products</h1>
          <div className="products-box">
            <Products products={products} onDelete={handleDeleteProduct} addToCart={addToCart} userRole={userRole} />
          </div>
        </div>
      ) : (
        <div className="container-fluid">Por favor espere...</div>
      )}
    </>
  );
};

export default Home;