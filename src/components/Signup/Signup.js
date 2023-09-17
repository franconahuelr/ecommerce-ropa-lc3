import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import { firestore } from '../../Firebase/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Firebase/Firebase';
import {useNavigate} from 'react-router-dom';


export const Signup=()=>{

    const history = useNavigate(); //Metodo para autodirigir a una pagina en especifico

    const [user, setUser]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const [errormsg, setErrormsg]=useState("");
    const [successmsg, setSuccessmsg]=useState("");
    
  
  
    
    const handleSignup=(e)=>{
        e.preventDefault();
        //console.log(user, email, password)
        createUserWithEmailAndPassword(auth,email,password).then((credentials)=>{
            console.log(credentials);
             //Guarda la lista de usuarios y contrasenas en la constante fs, al ser asincronico usamos Then
            firestore.collection('users').doc(credentials.user.uid).set({
             User: user,
             Email: email,
             Password: password   
            }).then(()=>{
                setSuccessmsg('Registro exitoso, seras redirigido a la pagina de Ingreso');
                setUser('');
                setEmail('');
                setPassword('');
                setErrormsg('');
                setTimeout(()=>{
                    setSuccessmsg('');
                    history.push('/login');
                },3000)
            }).catch((error)=>{
                setErrormsg(error.messege)
            });
        }).catch((error)=>{
            setErrormsg(error.messege)
        });
        
    }

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
        <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Usuario</Form.Label>
        <Form.Control type="text" placeholder="Usuario" onChange={(e)=>setUser(e.target.value)} value={user}/>
      </Form.Group>
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
            <div className="error-msg">{errormsg}</div>
        </>}
    </div>
  );
}



export default Signup;
