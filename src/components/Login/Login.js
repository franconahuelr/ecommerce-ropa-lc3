import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'


export const Login = () => {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const handleLogin=(e)=>{
        e.preventDefault();
        console.log(email, password)
    }

  return (
    <div className='container'>
    <Form onSubmit={handleLogin}>
        <br /><br />
        <h1>Ingreso</h1>
        <br />
        <hr />
        <br />
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
      </Form.Group>
      <br/>
        <div className='btn-box'>
        <span>Si no tienes una cuenta has click
            <Link to="/signup" className='link'> Aqui</Link> para crear una</span>
            <button type="submit" className='btn btn-success btn-md'>Ingresar</button>
        </div>
    </Form>
    </div>
  )
}

export default Login
