import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInUser } from "../Store/Slices/AuthSlice";
import Home from "./Home";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bgImage = process.env.REACT_APP_BG_IMAGE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    const res = await axios.post(
      "https://gamezy-vercel-backend.onrender.com/api/auth/login",
      user
    );

    

    const { _id, username } = res.data.foundUser;

    const response = { username, email, _id, password };
     if (res.status === 200) {
    dispatch(logInUser(response)) && navigate("/homepage");
     }
  };

  return (
    <div>
      <div
        className="  flex  justify-center relative"
        style={{
          backgroundImage: `url("${bgImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          className="md:w-3/4 w-[33%] p-5   bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100
    "
        >
          <h1 className="text-center text-3xl text-white">Login</h1>
          <form className="flex flex-col">
            <input
              type="email"
              value={email}
              className=" rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 "
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              value={password}
              className=" rounded-3xl h-10 px-3 my-3 outline-none text-white  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100"
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
};

export default Login;
