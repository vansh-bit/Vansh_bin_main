import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import pointer from "./restaurant.png"

const MapComponent = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:import.meta.env.VITE_MAP_API_KEY,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const handleMarkerClick = (marker) => {
    const infowindow = new window.google.maps.InfoWindow({
      content: marker[2],
    });
    infowindow.setPosition({ lat: marker[0], lng: marker[1] }); // Set position of the infowindow
    infowindow.open(mapRef.current); // Associate the infowindow with the map
    console.log(marker);
  };

//   const markers = [
//     [
    
//         25.04756186859711,
//         75.82903849647712
//     ],
//     [
        
//         25.050030688239502,
//         75.82734334044619
//     ]
//   ];

const markers = props.data.map(obj => [obj.location.coordinates[1],obj.location.coordinates[0],obj.title]);
console.log(markers);

  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div style={{ marginTop: "50px" }}>
      <GoogleMap
        mapContainerStyle={{
          height: "80vh",
        //    width:"100vw"
        }}
        center={{ lat: 25.050030688239502, lng: 75.82734334044619 }} // Set your default center here
        zoom={5}
        onLoad={onMapLoad}  
      >
        {markers.map((markerData, index) => (
          <MarkerF
            key={index}
            position={{ lat: markerData[0], lng: markerData[1] }}
            onClick={() => handleMarkerClick(markerData)}
            icon={{
                url: pointer,
                scaledSize: new window.google.maps.Size(35, 35),
              }}
          />
          
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
