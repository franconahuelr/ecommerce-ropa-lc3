import React from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
//import {auth,fs} from '../Firebase/Firebase'
//import { collection, getDocs} from 'firebase/firestore'

export const Home = () => {

    // getting current user function
   // function GetCurrentUser(){
        //const [user, setUser]=useState(null);
      //  useEffect(()=>{
      //      auth.onAuthStateChanged((user)=>{
         //       if(user){
       //             setUser(snapshot.data().FullName);
           //     } else{
        //            setUser(null);
         //       }
           // })
  //
//},[])
//

      //  return user;
   // }


   //const user = GetCurrentUser();
    // console.log(user);

    return (
        <>
            <Navbar />
            <Products/>
        </>
    )
}

export default Home;