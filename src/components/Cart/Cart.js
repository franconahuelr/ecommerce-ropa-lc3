import React from "react";
import { useEffect, useState } from "react";
import { Navbar } from './../Navbar/Navbar';
import {auth, fs} from './../../Firebase/Firebase';
import {getDoc, doc, onSnapshot, collection} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { CartProducts } from './../CartProducts/CartProducts'
//import { useNavigate } from "react-router-dom";


export const Cart = () => {
    const [userRole, setUserRole] = useState(null);
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
                  setUserRole(null);
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
  
    const [cartProducts, setCartProducts]= useState([]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
          if (user) {
            const cartRef = collection(fs, 'Cart ' + user.uid);
            const unsubscribe = onSnapshot(cartRef, (snapshot) => {
              const newCartProduct = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(),
              }));
              setCartProducts(newCartProduct);
            });
            return unsubscribe; // Cleanup the listener
          } else {
            console.log('Usuario no registrado');
          }
        }, []);
    
      }, []);
    

  return (
    <>
        <Navbar user={user}/>
        <br />
        {userRole === 'admin' ? (
        <div>Admin content goes here</div>
      ) : (
         <>
    {cartProducts.length > 0 ? (
      <div className='container-fluid'>
        <h1 className='text-center'>Carrito</h1>
        <div className='products-box'>
          <CartProducts cartProducts={cartProducts} />
        </div>
      </div>
    ) : (
      <div className='container-fluid'>No products to show</div>
    )}
  </>
      )}
    </>
  )
}

export default Cart
