import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function latlong() {
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

  // Function to handle button click event
  const handleButtonClick = () => {
    // Re-fetch the geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setError(null); // Clear any previous errors
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  return (
    <div>
      {/* Button to trigger fetching of location */}
      <button onClick={handleButtonClick}> Get Current Location</button>

      {/* Display latitude and longitude */}
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      )}
    </div>
  );
}

export default latlong;
