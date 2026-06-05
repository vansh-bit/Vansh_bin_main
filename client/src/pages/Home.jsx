import { Container } from "postcss";
import React,{useEffect,useState} from "react";
import { Button } from "@mui/material";
import Hero from "@/components/Hero";
import Services from "@/components/services";
import Timeliness from "@/components/Timeline";
import Whatwedo from "@/components/Whatwedo";
import {useLocation} from 'react-router-dom';
import axios from "axios";
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
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
        console.log("Not logged In");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  },[location.state])
  
  return (
    <div style={{backgroundColor: 'white'}}>
    {/* <h1>{isLoggedIn.toString()}</h1> */}
    {/* <p>{JSON.stringify(user)}</p> */}
      <Hero />
      <Whatwedo />
      <Services />
      <Timeliness /> 
    </div>
  );
};

export default Home;