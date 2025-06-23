import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Categories from './Pages/Categories'
import Description from './Pages/Description'
import Games from './Pages/Games'
import Cart from './Pages/Cart'
import Profile from './Pages/Profile'




const App = () => {

  return (
    <div>
         <Routes>
            <Route path="/" element={<Login/>}  />
            <Route path="/signup" element={<Signup/>}  />
            <Route path="/navbar" element={<Navbar/>}  />
            <Route path="/homepage" element={<Home/>}  />
            <Route path="/catagory" element={<Categories/>}  />
            <Route path="/catagory/:id" element={<Games/>}  />
            <Route path="/description/:id" element={<Description/>}  />
            <Route path="/cart" element={<Cart/>}  />
            <Route path="/profile" element={<Profile/>}  />
         </Routes>     
    </div>
  )
}

export default App
