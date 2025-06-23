import React from 'react'
import {AdvancedVideo} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import { apiConnector } from '../services/apiconnector';
import axios from 'axios';
import { categories } from '../services/apis';
import { useSelector } from 'react-redux';


const Entry = () => {

    const authe = useSelector((store) => store.auth);
    // const auth = useSelector((store) => store.auth.password);
    // console.log(authe);

  return (
    <div>
        ENTRY
        <button  className='bg-slate-400' >click</button>
    
    </div>
  )
}

export default Entry
