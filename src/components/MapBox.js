import React, {useState} from "react"
import{ GoogleMap,  MarkerF, useJsApiLoader, InfoWindowF } from "@react-google-maps/api"
import { Typography, Card, CardContent } from "@mui/material";


const googleApiKey = process.env.REACT_APP_GOOGLE_API
const containerStyle = {
    width: '90%',
    height: '70vh'
  };

//convert solidity date in a hex string to javascript date
const convertDate = (date) => {
    const dateStr = date.toString()
    const dateInt = parseInt(dateStr, 16)
    const dateObj = new Date(dateInt * 1000)
    return dateObj.toLocaleString()
}


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
                            console.log("value", value)
                            
                            return(
                                <div key={index}>
                                <MarkerF key={index} position={{lat:value["latitude"], lng:value["longitude"]}} onClick={e => onMarkerClick(e,index)} ></MarkerF>
                                {
                                (infoWindow === index) &&
                                    <InfoWindowF  key={`iw${index}`} position={{lat:value["latitude"], lng:value["longitude"]}}>
                                    <Card key={`ca${index}`} sx={{ minWidth: 275}}>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {value["name"]}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {value["description"]}
                                            </Typography>
                                            <Typography  sx={{ mb: 1.5 }} color="text.primary">
                                                {value["streetAddress"]} <br></br>
                                                {value["city"]}, {value["state"]} {value["zipCode"]}
                                            </Typography>
                                            
                                            <Typography  sx={{  fontSize:".8em;" }} color="text.secondary">
                                                {value["latitude"]} | {value["longitude"]} | {value["geohash"]}
                                            </Typography>
                                            <Typography  sx={{ fontSize:".8em;" }} color="text.secondary">
                                                Submitter: {value["submitter"]} 
                                            </Typography>
                                            <Typography  sx={{  fontSize:".8em;" }} color="text.secondary">
                                                Date Created: {convertDate(value["createdDate"])} 
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