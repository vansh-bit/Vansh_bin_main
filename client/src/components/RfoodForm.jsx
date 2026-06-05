import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const RfoodForm = () => {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

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
  }, []); // Empty dependency array ensures this effect runs only once
  return (
    <div className='flex justify-center items-center h-[70vh] w-3/4'>
      <div className='bg-slate-800 border border-slate-200 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-full max-w-md '>
        <h1 className='text-4xl text-white font-bold text-center mb-6'>Get Food</h1>
        <form action="">
          <div className='relative my-4'>
            <input type="text" className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer' placeholder=""/>
            <label htmlFor="email" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Address</label>
          </div>

          <div className='relative my-4'>
            <input type="number" className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer' placeholder=""/>
            <label htmlFor="email" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Pincode</label>
          </div>

          <div className='relative my-4'>
            <input type="text" className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer' placeholder=""/>
            <label htmlFor="email" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>State</label>

          </div>

          <div className='relative my-4'>
            <input type="text" className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer' placeholder=""/>
            <label htmlFor="email" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>City</label>

          </div>

          <div className='relative my-4'>
            <input type="text" className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer' placeholder=""/>
            <label htmlFor="email" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Organization (if applicable)</label>

          </div>

          {/* <div className='relative my-7'>
            <input type="file" className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer' placeholder=" "/>
            <label htmlFor="email" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Upload Photo</label>

          </div> */}

          {/* <div className='relative my-8'>
            <textarea className='relative block w-full py-3.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 resize-none peer' rows="4" placeholder=""></textarea>
            <label htmlFor="email" className='absolute text-sm text-white duration-300 transform -translate-y-8 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Description</label>

          </div> */}
          <div className='relative my-4'>
            <input type="text"  value={latitude}  className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer' placeholder=""/>
            <label htmlFor="latitude" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Latitude</label>
          </div>
          <div className='relative my-4'>
            <input type="text" value={longitude} className='block w-full py-2.5 px-4 text-sm text-white bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus-text-white focus:border-blue-600 peer' placeholder=""/>
            <label htmlFor="longitude" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-3   peer-focus:scale:75 peer-focus:-translate-y-6'>Longitude</label>
          </div>

          <div className="flex justify-between">
            <button type="button" className='w-1/2 ml-2 mr-4 text-lg rounded-full bg-white text-emerald-800 hover:bg-red-600 hover:text-white py-3 transition-colors duration-300' value={latitude} ><Link to='/'>Cancel</Link></button>
            <button type="button" className='w-1/2 mr-2 text-lg rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-3 transition-colors duration-300' value={longitude}><Link to='/GetFood'>Request Food</Link></button>
          </div>
        </form>

        <span className='mt-4 block text-center'><Link to='/DFood' className='text-white-500 hover:text-blue-500'>Donate Food</Link></span>
      </div>
    </div>
  );
};

export default RfoodForm;