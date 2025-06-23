import React,{useState,useEffect} from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {

    const [catagory,setCategory] = useState([]);
    const [isloading,setIsloading] = useState(true);

    const getCart = async() => {
        try {
              
            const res=await axios.get("https://api.rawg.io/api/genres?key=45f59e1704f8461689b89fa64f35877b&page_size=25");
            console.log(res);
            setCategory(res.data.results);


        } catch (err) {
             console.log("Error in fetching data",err);
        }
    }

    useEffect (()=> {
        const fetchData = async() => {

            try{
                setIsloading(true);
                await getCart();
                setIsloading(false);
            } catch (err){
                console.log("error fetching data",err);
                setIsloading(false);
            }
       
             
        }

        fetchData();
    },[])



    return (
        <div>
         <Navbar/>
         <div className='pt-[80px] p-10'>
    <h1 className='text-5xl mb-5 '>Genres</h1>
    {
      isloading?<h1 className='text-gray-50'>Loading...</h1>:(
        <div className='grid grid-cols-5 gap-y-4'>
        {catagory.map((item)=>{
          return(
            <Link to={`/catagory/${item.slug}`}>
    
            <div class="h-[8rem] w-[15rem] relative rounded-2xl cursor-pointer">
                  <img
                    src={item.image_background}
                    alt=""
                    class="absolute h-full object-cover w-full opacity-60 rounded-2xl"
                  />
                  <h1 class="absolute px-20 py-10 text-white text-3xl ">{item.name}</h1>
                </div>
                </Link>
          )
        })}
        </div>
      )
    }
    
         </div>
        </div>
      );
}

export default Categories
