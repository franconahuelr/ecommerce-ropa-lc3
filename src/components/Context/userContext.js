import React, { createContext, useContext, useEffect, useState } from 'react';
import {auth, fs} from './../../Firebase/Firebase'
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Create a context
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  
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

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}