import { BrowserRouter,HashRouter,Route,Routes } from "react-router-dom";
import Registration from "./components/Registration";
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Detail from "./components/Detail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Update from "./components/Update";
import Protected from "./components/Protected";




 const App = () => {
    
  return (
    <>
    <HashRouter>
    <Routes>
    <Route exact path = "/login" element={<Login/>}/>
    <Route exact path = "/" element={<Login/>}/>
    <Route exact path = "/register" element={<Registration/>}/>    
    <Route exact path = "/home" element={<Protected Component={Home}/>}/>  
    <Route exact path = "/detail/:id"element={<Protected Component={Detail}/>}/>
    <Route exact path = "/cart" element={<Protected Component={Cart}/>}/> 
    <Route exact path = "/order" element={<Protected Component={Checkout}/>}/>  
    <Route exact path = "/profile" element={<Protected Component={Update}/>}/>   
    </Routes>
    </HashRouter>
    </>
  )
}
export default App;


