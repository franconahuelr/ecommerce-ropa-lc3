import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth,fs } from '../Firebase/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { setDoc,doc } from 'firebase/firestore';

export function Authentication() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const [successmsg, setSuccessmsg] = useState('');
  const [errorMsg, setErrorMsg]=useState('');
  const [successMsg, setSuccessMsg]=useState('');
  
    //const checkUserRole = (user) => {
      // Implement logic to check the user's role based on your data structure
      //return user ? user.role : null;
   // };
      const handleSignup= async (e) => {
        e.preventDefault();
        const addUserToFirestore = async (userId, email, role) => {
            const userRef = doc(fs, 'users', userId);
          
            try {
              await setDoc(userRef, {
                email, 
                role
              });
          
              console.log('Usuario añadido a Firestore.');
            } catch (error) {
              console.error(error);
            }
          };
        const userRole = 'user'
        await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential)=>{
        const user = userCredential.user;
        const userId = user.uid;
  
      // Add user data to Firestore
           
            setSuccessmsg('Te has registrado correctamente, seras re-dirigido al inicio de sesion');
            setEmail('');
            setPassword('');
            setErrormsg('');
            setTimeout(()=>{
            setSuccessmsg('');
            history('/login');
            },3000)
              try {
            await addUserToFirestore(userId, email, userRole);
            console.log('User registered successfully and added to Firestore.');
          } catch (error) {
            console.error('Registration error:', error.message);
          }
           
        }).catch ((error)=>{
          if (error.code === "auth/email-already-in-use") {
          setErrormsg('Este email ya ha sido utilizado anteriormente');
          } else if (error.code === "auth/weak-password") {
          setErrormsg('Su contraseña es demasiado debil')
          }
          
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        await signInWithEmailAndPassword(auth, email,password).then(()=>{
            setSuccessMsg('Ingreso exitoso, seras redirigido a la pagina principal');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(()=>{
                setSuccessMsg('');
                history('/');
            },3000)
        }).catch(error=>setErrorMsg(error.message));
    };

  return {
    
    email,
    password,
    errormsg,
    successmsg,
    successMsg,
    errorMsg,
    setEmail,
    setPassword,
    setErrorMsg,
    setErrormsg,
    setSuccessMsg,
    setSuccessmsg,
    handleSignup,
    handleLogin,
    //checkUserRole
  };
}