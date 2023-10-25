import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { NotFound } from './components/NotFound'
import { AddProducts } from './components/AddProducts/AddProducts'
import { Cart } from './components/Cart/Cart'
//import { Authentication } from './components/Authentication'


export const App = () => {

 // const { checkUserRole } = Authentication();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addProducts" element={<AddProducts/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
