import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Authentication } from './Authentication';
import { Navbar } from './Navbar/Navbar'

export const Signup = (user) => {
  const {
    email,
    password,
    errormsg,
    successmsg,
    setEmail,
    setPassword,
    handleSignup,
  } = Authentication();
    
    return (
      <>
      <Navbar user={user} />
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
              <button type="submit" className='btn btn-danger btn-md'>Registrar</button>
          </div>
      </Form>
            {errormsg&&<>
                <br></br>
                <div className='error-msg'>{errormsg}</div>                
            </>}
    </div>
    </>
    )
}

export default Signup;