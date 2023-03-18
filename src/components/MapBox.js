import React, {useState} from "react"
import{ GoogleMap,  MarkerF, useJsApiLoader, InfoWindowF } from "@react-google-maps/api"
import { Typography, Card, CardContent } from "@mui/material";


const googleApiKey = process.env.REACT_APP_GOOGLE_API
const containerStyle = {
    width: '90%',
    height: '70vh'
  };

const MapBox = ({mapMarkers, setMapMarkers, mapCenter}) => {
    console.log("googleApiKey:", googleApiKey) 
    const {isLoaded} = useJsApiLoader ({
        googleMapsApiKey : googleApiKey
    })

    //initially hide the info window
    //display the info window when the marker is clicked
    const [infoWindow, setInfoWindow] = useState(-1)
 

    const onMarkerClick = (e, index) => {
        console.log("onMarkerClick", e)
        console.log(index)
        setInfoWindow(index)
    }





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
                            // initially hide the info window
                            // display the info window when the marker is clicked
                            
                            
                            return(
                                <div key={index}>
                                <MarkerF key={index} position={{lat:value[0], lng:value[1]}} onClick={e => onMarkerClick(e,index)} ></MarkerF>
                                {
                                (infoWindow === index) &&
                                    <InfoWindowF  key={`iw${index}`} position={{lat:value[0], lng:value[1]}}>
                                    <Card key={`ca${index}`} sx={{ minWidth: 275}}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {value[2]}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {value[3]}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {value[0]}, {value[1]}
                                            </Typography>
                                        </CardContent>
                                        
                                    </Card>
                                </InfoWindowF>
                                }
                                

                                </div>
                                
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