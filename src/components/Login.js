import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../Firebase/Firebase'
import {useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Form } from 'react-bootstrap'

export const Login = () => {

    const history = useNavigate();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errormsg, setErrorMsg]=useState('');
    const [successmsg, setSuccessMsg]=useState('');

    const handleLogin= async (e)=>{
        e.preventDefault();
        // console.log(email, password);
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
    }

    
    return (
        <div className='container'>
        <Form onSubmit={handleLogin}>
        <br /><br />
        <h1>Ingreso</h1>
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
            <span>Si no tienes una cuenta has click
            <Link to="/signup" className='link'> Aqui </Link>para registrarte</span>
            <button type="submit" className='btn btn-success btn-md'>Ingresar</button>
        </div>
    </Form>
          {errormsg&&<>
              <br></br>
              <div className='error-msg'>{errormsg}</div>                
          </>}
  </div>
    )
}
        

export default Login;