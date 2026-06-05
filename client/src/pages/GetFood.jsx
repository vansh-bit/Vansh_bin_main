import FoodCard from "./../components/FoodCard.jsx";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import MapComponent from "./../components/Map/Maps";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';


const GetFood = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(20);
  const [data, setData] = useState([]);
  const [sliderValue, setSliderValue] = useState(20); // New state for slider value

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }

    // Fetch data when latitude and longitude are available
    fetchData();
  }, [latitude, longitude, radius]); // Add radius to the dependency array

  // Define the fetchData function outside of useEffect
  const fetchData = async () => {
    try {
      if (latitude !== null && longitude !== null) {
        const response = await axios.post('/api/food/getfood', { latitude, longitude, setDistance: radius }, {
          withCredentials: true,
        });
        setData(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setSliderValue(value); // Update the slider value state
    setRadius(value); // Update the radius state
  };
  

  return (
    <div>
      <div className="container text-center ">
        <div className="flex justify-center align-middle">
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-black mt-14">
            Delicious <span className="text-green-700"> Delights</span>
          </h1>
        </div>
        <p>
          Embark on a Culinary Adventure: Discover and Order the Most Delectable
          Food Experiences Near You! From cozy cafes to upscale restaurants,
          explore a diverse array of flavors and cuisines just around the
          corner. Savor every bite as you uncover hidden gems and indulge in the
          finest culinary creations your neighborhood has to offer!
        </p>
        
        {/* Slider */}
        <div className="flex justify-center items-center mt-6">
          <span className="font-semibold">Radius</span>
          <input
            type="range"
            min="1"
            max="2000" // Set maximum radius value
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider"
            />
          <span className="  font-semibold ml-2">{sliderValue} km</span>
        </div>
        
            <MapComponent data={data}/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 pb-14">
          {data.map((item, index) => (
            <FoodCard card_detail={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetFood;
