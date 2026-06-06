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

  const userLat = parseFloat(props.userLatitude);
  const userLng = parseFloat(props.userLongitude);
  const hasUserLocation = !isNaN(userLat) && !isNaN(userLng);
  
  const mapCenter = hasUserLocation 
    ? { lat: userLat, lng: userLng } 
    : { lat: 25.050030688239502, lng: 75.82734334044619 };
    
  const mapZoom = hasUserLocation ? 12 : 5;

  const markers = props.data 
    ? props.data.map(obj => [obj.location.coordinates[1], obj.location.coordinates[0], obj.title])
    : [];
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
        center={mapCenter} 
        zoom={mapZoom}
        onLoad={onMapLoad}  
      >
        {hasUserLocation && (
          <MarkerF
            position={{ lat: userLat, lng: userLng }}
            title="Your Current Location"
          />
        )}
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
