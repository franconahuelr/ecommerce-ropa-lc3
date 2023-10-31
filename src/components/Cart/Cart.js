import React, { useState, useEffect } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { auth, fs } from '../../Firebase/Firebase'
import { CartProducts } from '../CartProducts/CartProducts';
import StripeCheckout from 'react-stripe-checkout';
import { collection, doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import {Footer} from '../Footer/Footer' 
import './Cart.css'

export const Cart = () => {
    const [userRole, setUserRole] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

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
                                setUserRole(userData.role);
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

            return () => unsubscribe();
        }, []);

        return user;
    }

    const user = GetCurrentUser();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const cartRef = collection(fs, 'Cart ' + user.uid);
                onSnapshot(cartRef, (snapshot) => {
                    const newCartProduct = snapshot.docs.map((doc) => ({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);
                });
            } else {
                console.log('User is not signed in to retrieve cart');
            }
        });

        return unsubscribe;
    }, []);

    // Calculate totalQty and totalPrice whenever cartProducts changes
    useEffect(() => {
      const qty = cartProducts.map((cartProduct) => cartProduct.qty);
      const price = cartProducts.map((cartProduct) => {
          const productPrice = cartProduct.price || 0; // Default to 0 if price is undefined
          return cartProduct.qty * productPrice;
      });
  
      const newTotalQty = qty.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const newTotalPrice = price.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
      setTotalQty(newTotalQty);
      setTotalPrice(newTotalPrice);
  }, [cartProducts]);

    // cart product increase function
    const cartProductIncrease = (cartProduct) => {
        const updatedCartProducts = cartProducts.map((product) =>
            product.ID === cartProduct.ID
                ? {
                      ...product,
                      qty: product.qty + 1,
                      TotalProductPrice: (product.qty + 1) * product.price,
                  }
                : product
        );
        setCartProducts(updatedCartProducts);

        // Updating in the database
        auth.onAuthStateChanged((user) => {
            if (user) {
                const cartDocRef = doc(fs, 'Cart ' + user.uid, cartProduct.ID);
                updateDoc(cartDocRef, {
                    qty: cartProduct.qty + 1,
                    TotalProductPrice: (cartProduct.qty + 1) * cartProduct.price,
                }).then(() => {
                    console.log('increment added');
                });
            } else {
                console.log('User is not logged in to increment');
            }
        });
    };

    // cart product decrease functionality
    const cartProductDecrease = (cartProduct) => {
        if (cartProduct.qty > 1) {
            const updatedCartProducts = cartProducts.map((product) =>
                product.ID === cartProduct.ID
                    ? {
                          ...product,
                          qty: product.qty - 1,
                          TotalProductPrice: (product.qty - 1) * product.price,
                      }
                    : product
            );
            setCartProducts(updatedCartProducts);

            // Updating in the database
            auth.onAuthStateChanged((user) => {
                if (user) {
                    const cartDocRef = doc(fs, 'Cart ' + user.uid, cartProduct.ID);
                    updateDoc(cartDocRef, {
                        qty: cartProduct.qty - 1,
                        TotalProductPrice: (cartProduct.qty - 1) * cartProduct.price,
                    }).then(() => {
                        console.log('decrement');
                    });
                } else {
                    console.log('User is not logged in to decrement');
                }
            });
        }
    };

    // state of totalProducts
    const [totalProducts, setTotalProducts] = useState(0);

    // getting cart products
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const cartRef = collection(fs, 'Cart ' + user.uid);
          const unsubscribe = onSnapshot(cartRef, (snapshot) => {
            const qty = snapshot.size;
            setTotalProducts(qty);
          });

          return unsubscribe; // Cleanup the listener
        }
      }, []);
    }, []);


    return (
        <>
            <Navbar user={user} totalProducts={totalProducts}/>

            <br />
            {userRole === 'admin' ? (
                <div>Admin content goes here</div>
            ) : (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts
                            cartProducts={cartProducts}
                            cartProductIncrease={cartProductIncrease}
                            cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                    <div className='summary-box'>
                        <h5>Sumario</h5>
                        <br />
                        <div>
                            Cantidad de Productos: <span>{totalQty}</span>
                        </div>
                        <div>
                            Precio Total: <span>$ {totalPrice}</span>
                        </div>
                        <br />
                        <StripeCheckout />
                    </div>
                </div>
            )}
            <Footer/> 
        </>
    );
};






