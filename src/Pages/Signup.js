import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const bgImage = process.env.REACT_APP_BG_IMAGE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, email, password };
    try {
      const res = await axios.post(
        "https://gamezy-vercel-backend.onrender.com/api/auth/signup",
        user
      );

      res.data && window.location.replace("/");
      console.log("result is::", res);
    } catch (error) {
      console.error("Failed to post data:", error);
    }
  };

  return (
    <div className="relative ">
      <div
        className="flex  justify-center relative"
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
        <div className="md:w-3/4 w-[33%] p-5   bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100">
          <h1 className="text-center text-3xl text-white">Sign up</h1>
          <form className="flex flex-col">
            <input
              type="text"
              value={username}
              className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 text-white"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="email"
              value={email}
              className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 text-white"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              value={password}
              className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100 text-white"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="flex  justify-center">
              <button
                className="px-8 rounded-3xl py-3 border-2 bg-[#303030] hover:bg-[#4c4c4c] border-[#303030]"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-2xl text-white">
            Already have an account?{" "}
            <Link to="/">
              <span className="text-[#9f9f9f] cursor-pointer">Log in</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
