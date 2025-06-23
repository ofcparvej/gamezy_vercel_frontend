import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const data = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  console.log("StateData==>" , data.id)
  const updateData = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(`/auth/${data.id}`, {
        username: name, // Use the state variables
        email: email,
        password: password,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getWishlist = async () => {
    try {
      const res = await axios.get(`https://gamezy-vercel-backend.onrender.com/api/wishlist/${data.id}`);     
      console.log("GetwishList---->" , res)
      
      setWishlist(Array.isArray(res.data) ? res.data : []);
      // setWishlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteWishlist = async (id) => {
    // console.log("II=>" , id)   
    // try {
    //   const res = await axios.delete(`https://gamezy-vercel-backend.onrender.com/api/wishlist/${data.id}/${id}`);
    //   // const res = await axios.get(`/wishlist/${data.id}`);   
    //   setWishlist(res.data);
    //   res.data && navigate("/profile")
    //   console.log("deleted:" , res.data)
    // } catch (error) {
    //   console.log(error);
    // }


    try {
    await axios.delete(`https://gamezy-vercel-backend.onrender.com/api/wishlist/${data.id}/${id}`);
    
    // Locally remove the deleted item from the list
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== id)
    );

    console.log("Item deleted locally from wishlist:", id);
  } catch (error) {
    console.log(error);
  }



  };   
  const addCart = async (name,price) => {
    console.log("add cart client---------------->")
    try {
      const res = await axios.post(`https://gamezy-vercel-backend.onrender.com/api/cart/additem/${data.id}`, {
        name: name,
        price: price,
      });
      console.log("ADD CART RES=>" , res)
      if (res.status === 200) {
        console.log("added to cart");
      }
    } catch (error) {
      console.log(error);
    }    
  };
  const getOrders = async () => {
    try {
      const res = await axios.get(`https://gamezy-vercel-backend.onrender.com/api/order/${data.id}`);
      console.log("Örders",res.data)
      setOrders(res.data);
    } catch (error) { 
      console.log(error);
    }}
  useEffect(() => {
    getWishlist();
    getOrders();
  }, []);

  return (
    <div className="p-10 bg-black">
      <div className="flex items-center flex-col">
        <div className="flex justify-between items-center w-full">
          <h1 className="flex justify-between items-center text-2xl text-white">

            <span>
              <IoArrowBackCircleOutline className="text-4xl mr-5 text-white" onClick={()=>{navigate(-1)}}/>
            </span>
            Details{" "}
          </h1>
          <FiEdit
            className="text-2xl cursor-pointer"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
        <form className="flex flex-col w-2/3 items-center">
          <input
            type="text"
            className="bg-[#303030] rounded-3xl h-10 px-3 my-3 outline-none w-full text-white"
            placeholder={data.username}
            disabled={open ? false : true}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            className="bg-[#303030] rounded-3xl h-10 px-3 my-3 outline-none w-full text-white"
            placeholder={data.email}
            disabled={open ? false : true}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />    
          <input
            type="password"
            className="bg-[#303030] rounded-3xl h-10 px-3 my-3 outline-none w-full text-white"
            placeholder={data.password}
            disabled={open ? false : true}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className={`px-8 rounded-3xl py-3 border-2 hover:bg-[#303030] ${
              open ? "block" : "hidden"
            } border-[#303030]`}
            onClick={updateData}
          >   
            Update
          </button>
        </form>
      </div>
   
      <div>
        <h1 className="text-2xl mb-5 text-white">Wishlist</h1>
        <ul className="bg-[#252525] px-3 py-5 min-h-[50vh] max-h-[50vh] overflow-y-scroll rounded-3xl">
          {Array.isArray(wishlist) && wishlist.map((item) => {
            return (
              <li className="flex mb-3 text-white">
                <p className="text-2xl w-1/3 text-white">{item.name}</p>
                <p className="text-2xl mx-36 w-1/3 text-white">₹{item.price}</p>
                <div className="text-2xl w-1/3 flex justify-center text-white">
                  <button
                    className="px-5 rounded-2xl mr-3 py-2 bg-blue-700"
                    onClick={() => addCart(item.name, item.price)}
                  >
                    <AiOutlineShoppingCart />
                  </button>
                  <button
                    className="px-5 rounded-2xl py-2 bg-red-700"
                    onClick={() => deleteWishlist(item._id)}
                  >
                    <ImBin />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>    
      </div>
      <div>
        <h1 className="text-2xl mb-5 mt-5">Orders</h1>
        <ul className="bg-[#252525] px-3 py-5 min-h-[50vh] max-h-[50vh] overflow-y-scroll rounded-3xl">
          {orders.map((item) => {return(
              <li className="flex justify-between mb-3">
     
              <p className="text-2xl w-1/4  text-white">{item.name}</p>
              <p className="text-2xl w-1/4 text-center  text-white">{item.price}</p>
              <p className="text-2xl w-1/4  text-white">{new Date(item.date).toLocaleString()}</p>
              <p className="text-2xl w-1/4 text-center  text-white">Qty: {item.quantity}</p>
            </li>
          )})}
        
        </ul>
      </div>
    </div>
  );
};

export default Profile;
