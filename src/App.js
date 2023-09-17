import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import {Signup} from "./components/Signup/Signup";
import {Login} from "./components/Login/Login"
import {NotFound} from "./components/NotFound/NotFound"
 
function App() {
  return (
    
      <Router>
        <Routes>
          <Route exact path="/" element = {<Home/>}/>
          <Route path="signup" element = {<Signup/>}/>
          <Route path="login" element = {<Login/>}/>
          <Route element = {<NotFound/>}/>
        </Routes>
      </Router>
    
  
  );
}

export default App;
