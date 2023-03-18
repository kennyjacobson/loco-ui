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
        <>
            <Box
                component={"form"}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="name" label="Name" variant="outlined" onChange={handleChange} />
                <TextField id="latitude" label="Latitude" variant="outlined" onChange={handleChange}/>
                <TextField id="longitude" label="Longitude" variant="outlined" onChange={handleChange}/>
                <TextField id="description" label="Description" variant="outlined" onChange={handleChange}/>

            </Box>
            <Button variant="contained" onClick={submit}>Submit</Button>

        </>


    )
}

export default AddLocation