import React, { useState, useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { GiTireIronCross } from "react-icons/gi";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState(1);
  const navigate = useNavigate();
  const data = useSelector((state) => state.auth);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [updatedCart, setUpdatedCart] = useState([]);

  const calculate = () => {
    let newTotal = 0;

    if (Array.isArray(cart)) {
      cart.forEach((item) => {
        newTotal += item.price * item.quantity;
      });
      setTotal(newTotal);
    }
  };

  const getCart = async () => {
    try {
      const res = await axios.get(
        `https://gamezy-vercel-backend.onrender.com/api/cart/getcart/${data.id}`
      );
      setCart(res?.data?.user?.cart);
      res && calculate();
    } catch (error) {
      console.error("Failed to post data:", error);
    }
  };

  const increment = async (id) => {
    try {
      const res = await axios.post(
        `https://gamezy-vercel-backend.onrender.com/api/cart/${data.id}/increase/${id}`
      );
      const updatedItem = res?.data?.updatedItem;

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.error("Failed to increment:", error);
    }
  };

  const decrement = async (id) => {
    try {
      const res = await axios.post(
        `https://gamezy-vercel-backend.onrender.com/api/cart/${data.id}/decrease/${id}`
      );
      const updatedItem = res?.data?.updatedItem;

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } catch (error) {
      console.error("Failed to decrement:", error);
    }
  };

  const deletecart = async (id) => {
    try {
      const res = await axios.delete(
        `https://gamezy-vercel-backend.onrender.com/api/cart/removeitem/${data.id}/${id}`
      );

      setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const emptyCart = async () => {
    try {
      const res = await axios.post(
        `https://gamezy-vercel-backend.onrender.com/api/cart/${data.id}/empty`
      );
      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(getCart, 10000);
    return () => clearInterval(interval);
  }, []);

  //.......................................payment...........................

  // setUpdatedCart(cart);
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51RJITUP9uqXwF99s1fo3MEgZQ6jvSoGYp5Lu602a3Gn7PCDvw0RfbO18rpGQ9NTt2SMVxyAanSnQDb7warbhLxmM00Ki4S60IY"
    );

    const body = {
      products: cart,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    const res = await axios.post(
      "https://gamezy-vercel-backend.onrender.com/api/payment/create-checkout-session",
      body,
      headers
    );

    if (res.status === 200) {
      const session = await res.data;

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      } else {
        const empty = await axios.post(
          `https://gamezy-vercel-backend.onrender.com/api/cart/${data.id}/empty`
        );
        await Promise.all(
          cart.map(async (item) => {
            await axios.post(
              `https://gamezy-vercel-backend.onrender.com/api/order/${data.id}`,
              {
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              }
            );
          })
        );
      }
    }
    emptyCart();
  };

  useEffect(() => {
    if (Array.isArray(cart)) {
      calculate();
    }
  }, [cart]);

  return (
    <div className="p-10 bg-black">
      <div className="flex flex-col">
        <GiTireIronCross
          className="text-2xl mb-3 cursor-pointer  text-white"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="text-2xl mb-2 text-white">Cart</h1>
      </div>

      <div>
        <ul className="bg-[#252525] px-3 py-5 min-h-[50vh] max-h-[50vh] overflow-y-scroll rounded-3xl">
          {cart &&
            cart.map((item) => {
              return (
                <li className="flex justify-between mb-3">
                  <p className="text-2xl w-1/4  text-white">{item.name}</p>
                  <p className="text-2xl w-1/4 text-center  text-white">
                    ₹{item.price}
                  </p>
                  <div className="text-2xl flex w-1/4  text-white">
                    <button className=" px-2 py-2 rounded-full  bg-white text-black  mx-3 ">
                      <AiOutlineMinus
                        onClick={() => {
                          decrement(item._id);
                        }}
                      />
                    </button>
                    <p className="text-2xl flex items-center justify-center  text-white">
                      {item.quantity}
                    </p>
                    <button className=" px-2 py-2 rounded-full  bg-white text-black  mx-3">
                      <AiOutlinePlus
                        className="font-extrabold"
                        onClick={() => {
                          increment(item._id);
                        }}
                      />
                    </button>
                  </div>
                  <div className="w-1/4 items-center justify-center flex">
                    <button
                      className=" rounded-2xl py-2 bg-red-700 px-12"
                      onClick={() => {
                        deletecart(item._id);
                      }}
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
        <h1 className="text-2xl mt-3  text-white">Price breakdown</h1>
        <div className="p-10">
          <ul>
            <li className="flex justify-between text-2xl my-3">
              <p className=" text-white">Subtotal</p>
              <p className=" text-white">₹{total}</p>
            </li>
            <li className="flex justify-between text-2xl my-3  text-white">
              <p className=" text-white">Tax {`(5%)`}</p>
              <p className=" text-white">₹{(total * 5) / 100}</p>
            </li>
            <li className="flex justify-between text-2xl my-3 py-2 border-b-2 border-gray-600 border-t-2">
              <p className=" text-white">Amount payble</p>
              <p className=" text-white">₹{total + (total * 5) / 100}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-700 text-2xl px-10 py-2 rounded-3xl  text-white"
          onClick={() => {
            makePayment();
          }}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
