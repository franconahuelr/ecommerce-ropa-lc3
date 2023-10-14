import React from "react";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import {Products} from "../Products"
import {auth, fs} from "../../Firebase/Firebase";
import {getDoc, doc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {CarouselImages} from "./CarouselImages/CarouselImages";


export const Home = () => {
  // Getting the current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          getDoc(doc(fs, 'users', authUser.uid))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const userData = snapshot.data();
                setUser({ email: userData.email, role: userData.role });
              } else {
                setUser(null);
              }
            })
            .catch((error) => {
              console.error('Error getting user document:', error);
            });
        } else {
          setUser(null);
        }
      });
  
      // Cleanup function
      return () => unsubscribe();
    }, []);
  
    return user;
  }

  const user = GetCurrentUser();

  return (
    <>

      <Navbar user={user} />
      <CarouselImages />
      <Products />
      
    </>
  );
};

export default Home;