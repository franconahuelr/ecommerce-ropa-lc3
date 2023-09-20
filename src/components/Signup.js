import React,{ useState } from 'react'
import { auth } from '../Firebase/Firebase'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fs } from '../Firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';


export const Signup = () => {

    const history = useNavigate();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errormsg, setErrormsg]=useState('');
    const [successmsg, setSuccessmsg]=useState('');
    
    const addUserToFirestore = async (userId, email) => {
      const userRef = doc(fs, 'users', userId);
    
      try {
        await setDoc(userRef, {
          email: email,
        });
    
        console.log('Usuario anadido a Firestore.');
      } catch (error) {
        console.error(error);
      }
    };

    const handleSignup= async (e) => {
      e.preventDefault();
        
        //createUserWithEmailAndPassword(auth,fullName.value,email.value,password.value);
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
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
            return addUserToFirestore(userId, email).then(() => {
               console.log('User registered successfully and added to Firestore.');
            })
            .catch((error) => {
              console.error('Registration error:', error.message);
            });
         
      }).catch ((error)=>{
        if (error.code === "auth/email-already-in-use") {
        setErrormsg('Este email ya ha sido utilizado anteriormente');
        } else if (error.code === "auth/weak-password") {
        setErrormsg('Su contraseña es demasiado debil')
        }
        
      });
        
    };



    return (
      <div className='container'>
      <Form onSubmit={handleSignup}>
          <br /><br />
          <h1>Registro</h1>
          <br />
          <hr />
          {successmsg&&<>
              <div className="success-msg">{successmsg}</div>
          </>}
          
          <br />
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
        </Form.Group>
        <br/>
          <div className='btn-box'>
              <span>Si ya tienes una cuenta has click
              <Link to="/login" className='link'> Aqui</Link></span>
              <button type="submit" className='btn btn-success btn-md'>Registrar</button>
          </div>
      </Form>
            {errormsg&&<>
                <br></br>
                <div className='error-msg'>{errormsg}</div>                
            </>}
    </div>
    )
}

export default Signup;