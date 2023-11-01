import React, { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Products } from "./../Products/Products";
import { auth, fs } from "../../Firebase/Firebase";
import {
  getDoc,
  doc,
  getDocs,
  collection,
  deleteDoc,
  setDoc,
  query,
  onSnapshot
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { CarouselImages } from "./CarouselImages/CarouselImages";
import { useNavigate } from "react-router-dom";
import { IndividualFilteredProduct } from "../IndividualFilteredProduct";
import './Home.css'
import Footer from "../Footer/Footer";

export const Home = () => {
  const history = useNavigate();

  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [uid, setUid] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [active, setActive] = useState("");
  const [category, setCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const spans = [
    { id: "Remeras", text: "Remeras" },
    { id: "Buzos", text: "Buzos" },
    { id: "Shorts", text: "Shorts" },
  ];

  useEffect(() => {
    const unsubscribeUser = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const userRef = doc(fs, "users", authUser.uid);
        getDoc(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.data();
              setUser({ email: userData.email, role: userData.role });
              setUserRole(userData.role);
            }
          })
          .catch((error) => {
            console.error("Error getting user document:", error);
          });

        setUid(authUser.uid);
      } else {
        setUser(null);
        setUserRole(null);
        setUid(null);
      }
    });

    const productsQuery = query(collection(fs, "Products"));
    getDocs(productsQuery)
      .then((productsSnapshot) => {
        const productsArray = [];
        productsSnapshot.forEach((doc) => {
          productsArray.push({ ID: doc.id, ...doc.data() });
        });
        setProducts(productsArray);
      })
      .catch((error) => {
        console.error("Error getting products:", error);
      });

    if (uid) {
      const cartRef = collection(fs, `Cart ${uid}`);
      const unsubscribeCart = onSnapshot(cartRef, (snapshot) => {
        const qty = snapshot.size;
        setTotalProducts(qty);
      });
      return unsubscribeCart;
    }
    return unsubscribeUser;
  }, [uid]);

  const addToCart = (product) => {
    if (uid) {
      const newProduct = {
        ...product,
        qty: 1,
        TotalProductPrice: product.qty * product.price,
      };
      const cartRef = collection(fs, `Cart ${uid}`);
      const cartDoc = doc(cartRef, product.ID);

      setDoc(cartDoc, newProduct)
        .then(() => {
          console.log("Successfully added to cart");
        })
        .catch((error) => {
          console.error("Error adding to cart: ", error);
        });
    } else {
      history("/login");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(fs, "Products", productId));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.ID !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleChange = (individualSpan) => {
    console.log("Categoria", individualSpan.id)
    setActive(individualSpan.id);
    setCategory(individualSpan.text);
    filterFunction(individualSpan.text);
  };

  const filterFunction = (text) => {
    if (products.length > 1) {
      const filter = products.filter((product) => product.category === text);
      setFilteredProducts(filter);
    } else {
      console.log("no products to filter");
    }
  };

  const returntoAllProducts = () => {
    setActive("");
    setCategory("");
    setFilteredProducts([]);
  };

  return (
    <>
        <Navbar user={user} />
        <CarouselImages />           
        <br></br>
        <div className='container-fluid filter-products-main-box'>
            <div className='filter-box'>
                <h6>Categorias</h6>
                {spans.map((individualSpan,index)=>(
                    <span key={index} id={individualSpan.id}
                    onClick={()=>handleChange(individualSpan)}
                    className={individualSpan.id===active ? active:'deactive'}>{individualSpan.text}</span>
                ))}
            </div>
            {filteredProducts.length > 0&&(
              <div className='my-products'>
                  <h1 className='text-center'>{category}</h1>
                  <a
                    href="#"
                    onClick={returntoAllProducts}
                    style={{
                      textDecoration: 'none',
                      color: 'red',
                      fontWeight: 'bold',
                      fontSize: '20px',
                      transition: 'color 0.3s',                   
                  }}
                  >
                    Mostrar todos los Productos
                  </a>
                  <div className='products-box'>
                      {filteredProducts.map(individualFilteredProduct=>(
                          <IndividualFilteredProduct
                          key={individualFilteredProduct.ID}
                          individualFilteredProduct={individualFilteredProduct}
                          addToCart={addToCart}
                          onDelete={handleDeleteProduct}
                          userRole={userRole}
                          />
                      ))}
                  </div>
              </div>  
            )}
            {filteredProducts.length < 1&&(
                <>
                    {products.length > 0&&(
                      
                        <div className='my-products'>
                          
                            <h1 className='text-center'>Todos los Productos</h1>
                            
                            <div className='products-box'>
                                
                                <Products products={products} addToCart={addToCart} onDelete={handleDeleteProduct} userRole={userRole}/>
                            </div>
                        </div>
                    )}
                    {products.length < 1&&(
                        <div className='my-products please-wait'>Por favor espere...</div>
                    )}
                </>
            )}
        </div>      
        <Footer/> 
    </>
)
};