import DfoodForm from "@/components/DfoodForm"
import React,{useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import  axios from "axios";
import { toast } from 'react-toastify';
import { bg_donate } from "../assets";

const DFood = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.post('/api/users/isloggedin',{},{withCredentials: true})
    .then(response => {
      if(response.data.data.verifiedObj.verified)
      { 
        console.log(response.data.data.user);
        setIsLoggedIn(true);
        setUser(response.data.data.user);
      }
      else{
        toast.error("Please Login to continue");
        navigate("/login");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  },[])
  return (
    <div  className='text-white h-[150vh] flex justify-center items-center bg-cover' style={{ backgroundImage: `url(${bg_donate})` }}>
        <DfoodForm/>

    </div>
   
  )
}

export default DFood