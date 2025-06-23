import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logInUser } from '../Store/Slices/AuthSlice';
import Home from './Home';
import axios from 'axios';


const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const dispatch = useDispatch();




    const handleSubmit = async(e)=> {

          e.preventDefault();
          // const user = {username,email,password};
           const user = { email, password };
          // console.log("user-->>>",user);

          // try {

          const res = await axios.post('https://gamezy-vercel-backend.onrender.com/api/auth/login', user);

            // const res = await apiConnector("POST",'http://localhost:4000/api/auth/login', user)
            console.log("data---------->" , res)
            // res.data && window.location.replace("/homepage");
            if (res.status === 200) {
                
                // console.log("res===>>>>>::",res.data.foundUser);
                
                const { _id, username } = res.data.foundUser;
               
                // console.log(_id,username)
                const response = { username, email, _id,password };

                //dispatch the action ....
                dispatch(logInUser(response)) &&  navigate("/homepage");

              //   //..................
              //   // console.log(response);
                // navigate("/homepage");
              }

            // console.log("result is::",res);
          // } catch (error) {
          //   console.error('Failed to post data:', error);
          // }

        // console.log("hellooo ump----------------------->")
      
      
        

      };





    return (
        <div className="relative ">
     <video autoPlay muted loop className="absolute opacity-80 min-w-[100vw] min-h-[100vh]">
     <source src="https://assets.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt778f65cedfee54fd/63bcad5b08dfb21202a7794d/VAL_Ep6_Homepage-CG-Video_V5.mp4" type="video/mp4"/>
     </video>
        <div className="flex  justify-center relative">
          <div className="md:w-3/4 w-[33%] p-5  mt-[10rem] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100
    ">
            <h1 className="text-center text-3xl text-white">Login</h1>
            <form className="flex flex-col">
              <input
                type="email"
                value={email}
                className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 text-white "
                placeholder="Email"

                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                value={password}
                className=" rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 text-white"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="flex justify-center">
                <button
                  className="px-8 rounded-3xl py-3 border-2 bg-[#303030] hover:bg-[#4c4c4c] border-[#303030]"
                  onClick={handleSubmit}
                >
                  Log in
                </button>
              </div>
            </form>
    
            <p className="text-center text-2xl text-white">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-[#9f9f9f] cursor-pointer">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
             
        </div>
      );
}

export default Login
