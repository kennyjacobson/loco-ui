// import { Favorite } from "@mui/icons-material"
import React, {useState} from "react"
import {  Box, TextField, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";


const AddLocation = ({locoContract}) => {
    // create a form that allows the user to add a location
    // the form should have the following fields:
    // name, latitude, longitude, description
    // geohash should be calculated from the latitude and longitude
    // the form should have a submit button
    // when the form is submitted, the location should be added to the contract
    // the user should be redirected to the map page
    
    const [location, setLocation] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {id, value} = e.target
        setLocation(location => ({
            ...location,
            [id] : value
        }))
        console.log(location)
    }

    const submit = () => {
        console.log("submit")
        locoContract.writeLocation(location)
        navigate("/map")
    }


    return (
        //Add TextFields for streetAddress, city, state, zip, and country
        // center the form and the button

        <>
            <Box
                component={"form"}
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off"
                width={"45ch"}
                margin={"auto"}
                
            >
                <TextField id="name" label="Name" variant="outlined" onChange={handleChange} />
                <TextField id="latitude" label="Latitude" variant="outlined" onChange={handleChange}/>
                <TextField id="longitude" label="Longitude" variant="outlined" onChange={handleChange}/>
                <TextField id="description" label="Description" variant="outlined" onChange={handleChange}/>
                <TextField id="streetAddress" label="Street Address" variant="outlined" onChange={handleChange}/>
                <TextField id="city" label="City" variant="outlined" onChange={handleChange}/>
                <TextField id="state" label="State" variant="outlined" onChange={handleChange}/>
                <TextField id="zipCode" label="Zip Code" variant="outlined" onChange={handleChange}/>
                <TextField id="country" label="Country" variant="outlined" onChange={handleChange}/>
                

            </Box>
            <Button variant="contained" onClick={submit}>Submit</Button>

        </>


    )
}

export default AddLocation