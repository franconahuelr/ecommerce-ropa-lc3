import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { NotFound } from './components/NotFound'
import { AddProducts } from './components/AddProducts/AddProducts'
import { Cart } from './components/Cart/Cart'
import {FrecuentsQuestions} from './components/FrecuentsQuestions'
import { Sizes } from './components/Sizes/Sizes'
import {Contact} from './components/Contact/Contact'
import { UserProvider } from './components/Context/userContext'

export const App = () => {

  return (
    <>
   <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addProducts" element={<AddProducts/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/faq" element={<FrecuentsQuestions/>}/>       
        <Route path='/sizes' element={<Sizes/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>
    </UserProvider>
    </>
  )
}

export default App
