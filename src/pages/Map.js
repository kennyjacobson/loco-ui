// import { Favorite } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import React, { useState } from "react"
import MapBox from "../components/MapBox"

const Map = ({mapMarkers, setMapMarkers, locoContract}) => {
    // console.log("from Map.js", mapMarkers)
    const [locationTotalCount, setLocationTotalCount] = useState(null)
    const [nextLocationId, setNextLocationId] = useState(0)
    const [mapCenter, setMapCenter] = useState({lat: 44, lng: -83})

    // const getCountClick = async () => {
    //     const count = await locoContract.getLocationCount()
    //     console.log("This is the count:", count)
    // }

    const getLocationClick = async () => {
        if (!locationTotalCount){
            const count = await locoContract.getLocationCount()
            setLocationTotalCount(count)
        }

        const location = await locoContract.getLocation(nextLocationId)
        setNextLocationId(nextLocationId + 1)
        const latlng = [[location.latitude, location.longitude]]
        setMapCenter({lat: location.latitude, lng: location.longitude})
        setMapMarkers(mapMarkers.concat(latlng))

        console.log("This is the location:", location)
    }

    const getTenLocationClick = async () => {
        let tempCount = locationTotalCount
        if (!locationTotalCount){
            tempCount = await locoContract.getLocationCount()
            setLocationTotalCount(tempCount)
        }

        if (nextLocationId >= tempCount){
            console.log("No more")
            return
        }

        let countPlus10 = nextLocationId + 10
        if(countPlus10 > tempCount){
            countPlus10 = tempCount
        }
        // console.log(nextLocationId, countPlus10)
        const latlng = []
        for(let i = nextLocationId; i < countPlus10; i++){
            const location = await locoContract.getLocation(i)
            latlng.push([location.latitude, location.longitude])
            
            
        }
        setNextLocationId(countPlus10)
        setMapCenter({lat: latlng[0][0], lng: latlng[0][1]})
        setMapMarkers(mapMarkers.concat(latlng))

    }

    return (
        <>
            <Typography>The Map Page</Typography>
            <Button onClick={getTenLocationClick}>Get Next 10</Button>
            <MapBox mapMarkers={mapMarkers} setMapMarkers={setMapMarkers} mapCenter={mapCenter}/>
        </>
        

    )
}

export default Map