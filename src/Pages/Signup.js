import React from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
// require("dotenv").config();
import { useState } from 'react'
import { useEffect } from 'react'
import { apiConnector  } from '../services/apiconnector'
// import { categories } from '../services/apis'


const Signup = () => {
const [username , setUsername] = useState('');
const [email , setEmail] = useState('');
const [password , setPassword] = useState('');
console.log(email);

const handleSubmit = async(e)=> {

  e.preventDefault();
    const user = {username,email,password};
    console.log("user-->>>",user);
    try {
      const res = await apiConnector("POST",'http://localhost:4000/api/auth/signup', user)
      res.data && window.location.replace("/");
      console.log("result is::",res);
    } catch (error) {
      console.error('Failed to post data:', error);
    }


  


};

return (
  <div className="relative">
<video autoPlay muted loop className="absolute opacity-90 min-w-[100vw] min-h-[100vh]">
<source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt778f65cedfee54fd/63bcad5b08dfb21202a7794d/VAL_Ep6_Homepage-CG-Video_V5.mp4" type="video/mp4"/>
</video>
  <div className="flex  justify-center relative">
    <div className="md:w-3/4 w-[33%] p-5  mt-[10rem] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100">
      <h1 className="text-center text-3xl">Sign up</h1>
      <form className="flex flex-col">
        <input type="text" value={username} className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="email" value={email} className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" value={password} className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
        <div className="flex  justify-center"> 
      <button className="px-8 rounded-3xl py-3 border-2 hover:bg-[#303030] border-[#303030]" onClick={handleSubmit}>Sign Up</button>
       </div>
      </form>
     
      <p className="text-center text-2xl">Already have an account? <Link to="/login"><span className="text-[#9f9f9f] cursor-pointer">Log in</span></Link> </p>
    </div>
  </div>
  </div>
);




  // return (
  //   <div className='relative'>This Is SignUp

  //   <div>
             
  //            <form>                 
  //                  <div><input className='border' type='text' value={username} onChange={(e)=>{setUsername(e.target.value)}}  ></input></div>
  //                  <div><input className='border' type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}  ></input></div>
  //                  <div><input className='border' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}  ></input></div>
  //                  <div ><button className='border bg-slate-400 hover:bg-slate-500' onClick={fuck}>Sign Up</button></div>
  //            </form>
  //   </div>







  //   </div>
  // )
}

export default Signup
