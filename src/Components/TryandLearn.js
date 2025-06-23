import React from "react";
import Navbar from "../Components/Navbar";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "../index.css";
// import "./App.css";
// import './index.css';
import "@splidejs/react-splide/css/core";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "@splidejs/react-splide/css";
import axios from "axios";
import { useEffect, useState } from "react";
// import Cards from "../Components/Cards";
// import Cards from "../Components/Cards";
import { useMediaQuery } from "react-responsive";
import { useNavigate,Link } from "react-router-dom";
import Cards from "../Components/Cards";

// import React from 'react'



const TryandLearn = () => {

    const [curousel , setCurousel] = useState([]);
    const [action , setAction] = useState([]);
    const [isLoading,setIsloading] = useState(true);


    const getCarousel = async() => {
        try {

            const res=await axios.get("https://api.rawg.io/api/games?key=45f59e1704f8461689b89fa64f35877b&page_size=10&platforms=187");
            setCurousel(res.data.results);
           



        } catch (err){
            console.log(err);
        }
    }

    const getAction = async () => {
        try {
          const res = await axios.get(
            "https://api.rawg.io/api/games?key=45f59e1704f8461689b89fa64f35877b&page_size=10&genres=action&dates=2020-01-01,2023-10-01&ordering=-rating&platforms=187"
          );
          setAction(res.data.results);
        } catch (error) {
          console.error("Error fetching action data:", error);
        }
      };

      //  console.log("isloading",isLoading);


      useEffect(() => {
        const fetchData = async () => {
          try {
            setIsloading(true);
            await getCarousel();
            await getAction();
            
            setIsloading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
            setIsloading(false);
          }
        };
    
        fetchData();
      }, []);
      
      // console.log("after is loading",isLoading);

    // console.log("curousel is-->", curousel);
    // console.log("action vale");
    // console.log("curousel action is-->", action );
    







  return (
    <div className="flex flex-row">
           Try..

           <div className="hero px-10">
          <Splide
            className="w-full "
            options={{
              type: "loop",
              autoplay: "play",
              interval: 3000,
              pauseOnHover: false,
              arrows: false,
              pagination: true,
            }}
          >
            {curousel .map((item) => {
              return (
                <SplideSlide className="flex flex-col w-full relative">
                  <div className="hero__slide__image h-[70vh] flex flex-col items-center justify-center w-full relative">
                    <img
                      src={item.background_image}
                      className="object-cover rounded-3xl max-w-full max-h-full"
                      alt="The Witcher 3"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent opacity-[65%] rounded-3xl"></div>
                    <div className="hero__slide__content absolute top-[15%] md:w-[40rem] w-[50rem]">
                      <div>
                        <h2
                          className="hero__slide__title text-5xl"
                          style={{ fontFamily: "Brolimo" }}
                        >
                          {item.name}
                        </h2>
                        <p className="hero__slide__description text-lg mt-5 pr-[25rem]">
                          The Witcher 3: Wild Hunt is a 2015 action role-playing
                          game developed and published by Polish developer CD
                          Projekt Red and is based on The Witcher series of
                          fantasy novels by Andrzej Sapkowski.
                        </p>
                        <div className="flex mt-5">
                         <Link to={`/description/${item.id}`}>
                          <button className="flex items-center justify-center w-[8rem] h-[3rem] text-xl bg-white text-black border-2 border-white hover:bg-black hover:text-white rounded-xl">
                          Discover{" "}
                          </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
    </div>
  )
}

export default TryandLearn
