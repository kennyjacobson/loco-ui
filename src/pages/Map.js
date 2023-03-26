// import { Favorite } from "@mui/icons-material"
import { Box, Button, Grid, TextField } from "@mui/material"
import React, { useState } from "react"
import MapBox from "../components/MapBox"

const Map = ({mapMarkers, setMapMarkers, locoContract}) => {
    // console.log("from Map.js", mapMarkers)
    const [locationTotalCount, setLocationTotalCount] = useState(null)
    const [nextLocationId, setNextLocationId] = useState(0)
    const [mapCenter, setMapCenter] = useState({lat: 34.0568400, lng: -118.2460100})
    const [searchGeohash, setSearchGeohash] = useState("")

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
        const latlng = [location]
        console.log("theLatLong" , latlng)
        setMapCenter({lat: location.latitude, lng: location.longitude})
        setMapMarkers(mapMarkers.concat(latlng))

        console.log("This is the location:", location)
    }

    const getLocationsByGeohashClick = async () => {
        console.log("searchGeohash", searchGeohash)
        if(searchGeohash === ""){
            console.log("Please enter a geohash")
            return
        }
        const locations = await locoContract.getLocationsByGeohash(searchGeohash)
        setMapMarkers(mapMarkers.concat(locations))
    }

    //function to clear the map markers
    const clearMapMarkers = () => {
        setMapMarkers([])
        setNextLocationId(0)
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
            latlng.push(location)
            
            
        }
        setNextLocationId(countPlus10)
        // setMapCenter({lat: latlng[0][0], lng: latlng[0][1]})
        setMapMarkers(mapMarkers.concat(latlng))

    }
    //q: using MUI how do I divide ui elements into divisions?
    //a: use the Grid component
    //q: using MUI how do I get two box components to be side by side?
    //a: use the Box component and set the display to flex and justify content to left or right

    return (
        <>
        <Grid container>
            <Grid item xs={6}>
                <Box sx={{display: "inline-flex", justifyContent: "left"}}>
                    <Button sx={{mb:1, mt:1, ml:1}} variant="contained"   onClick={getTenLocationClick}>Get Ten</Button>
                    <Button sx={{mb:1, mt:1, ml:1}} variant="contained"   onClick={getLocationClick}>Get One</Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{display: "inline-flex", justifyContent: "right"}}>
                    <TextField sx={{mb:1, mt:1, ml:1}} id="searchGeohash" label="Search Geohash" variant="outlined" onChange={(e) => setSearchGeohash(e.target.value)}/>
                    <Button sx={{mb:1, mt:1, ml:1}} variant="contained"   onClick={getLocationsByGeohashClick}>Search</Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{display: "inline-flex", justifyContent: "right"}}>
                    <Button sx={{mb:1, mt:1, ml:1}} variant="contained"   onClick={clearMapMarkers}>Clear Map</Button>
                </Box>
            </Grid>

        </Grid>
    
            <div style={{display: "flex", justifyContent: "center"}}>
            <MapBox mapMarkers={mapMarkers} setMapMarkers={setMapMarkers} mapCenter={mapCenter}/>
            </div>
        </>
        

    )
}

export default Map