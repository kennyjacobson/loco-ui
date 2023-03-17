import React from "react"

import{ GoogleMap,  MarkerF, useJsApiLoader } from "@react-google-maps/api"

const googleApiKey = "AIzaSyDCKYfKmfF5Q-Pmu3AwHFO8NGy2pZ6lau4"
const containerStyle = {
    width: '400px',
    height: '400px'
  };

const MapBox = ({mapMarkers, setMapMarkers, mapCenter}) => { 
    const {isLoaded} = useJsApiLoader ({
        googleMapsApiKey : googleApiKey
    })

    return (
        
        <>
        {
            (!isLoaded) ? (
                <div>Loading</div>
            ) : (
                <GoogleMap
                    center={mapCenter}
                    zoom = {10}
                    mapContainerStyle={containerStyle}
                >
                    {
                        mapMarkers.map((value, index, array) => {
                            return(
                                <MarkerF key={index} position={{lat:value[0], lng:value[1]}} ></MarkerF>
                            )
            
                        })
                    }
                   
               
                </GoogleMap>
            )
        }
         
        </>
    )
        
    
}

export default MapBox