import React from 'react'
import { Form } from 'react-bootstrap'
import { Authentication } from './Authentication'
import { Link } from 'react-router-dom'
import {Navbar } from './Navbar/Navbar'


    export const Login = (user) => {
        const {
          email,
          password,
          errorMsg,
          successMsg,
          setEmail,
          setPassword,
          handleLogin,
        } = Authentication();
    

    
    return (
        <>
        <Navbar user={user} />
        <div className='container'>
        
        <Form onSubmit={handleLogin}>
        <br /><br />
        <h1>Ingreso</h1>
        <br />
        <hr />
        {successMsg&&<>
            <div className="success-msg">{successMsg}</div>
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
            <button type="submit" className='btn btn-danger btn-md'>Ingresar</button>
        </div>
    </Form>
          {errorMsg&&<>
              <br></br>
              <div className='error-msg'>{errorMsg}</div>                
          </>}
  </div>
  </>
    )
    
}
        

export default Login;