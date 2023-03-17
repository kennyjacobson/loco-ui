import React, {useState, useEffect} from "react"
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button,  Paper, Toolbar, Typography } from "@mui/material"
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Map from "../pages/Map";
import AddLocation from "../pages/AddLocation";
// import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Recents from "../pages/Recents";
import Favorites from "../pages/Favorites";
import Nearby from "../pages/Nearby";
import LocoContract from "../data/contract";

// const markers = []


const Layout = () => {
    const [bottomMenuSelected, setBottomMenuSelected] = useState(0);
    const [mapMarkers, setMapMarkers] = useState([])
    const [locoContract, setLocoContract] = useState(null)

    useEffect( ()  => {
        // setMapMarkers(mapMarkers.concat([[44.07, -83.07]]))
        const tempLocoContract = new LocoContract()
        setLocoContract(tempLocoContract)
        
    }, [])

    const loginButtonClick = () => {
        locoContract.connect()
        locoContract.getLocationCount()
    }

    return (
        <>
        

        <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                {/* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Loco (Onchain Location Services)
                </Typography>
                <Button color="inherit" onClick={loginButtonClick} >Login</Button>
                </Toolbar>
            </AppBar>
        </Box>

        <Toolbar ></Toolbar>
        <Box sx={{ml:1, mr:1, border:0}}   >
                
                <Routes>
                    <Route exact path="/" element={<Map mapMarkers={mapMarkers} setMapMarkers={setMapMarkers} locoContract={locoContract} />} />
                    
                    <Route exact path="map" element={<Map mapMarkers={mapMarkers} setMapMarkers={setMapMarkers} locoContract={locoContract} />} />
                    <Route exact path="addlocation" element={<AddLocation/>} />
                    <Route exact path="recents" element={<Recents/>} />
                    <Route exact path="favorites" element={<Favorites/>} />
                    <Route exact path="nearby" element={<Nearby/>} />
                </Routes>

            
            
        </Box>
            
        
        

        <Box >
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    position="fixed"
                    showLabels
                    value={bottomMenuSelected}
                    onChange={(event, newValue) => {
                        setBottomMenuSelected(newValue);
                        console.log(newValue)
                    }}
                >
                    <BottomNavigationAction label="Map" icon={<MapIcon />} component={Link} to="/map" />
                    <BottomNavigationAction label="Add Location" icon={<LocationOnIcon />} component={Link} to="/addlocation" />
                    {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} component={Link} to="/recents" />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} component={Link} to="/favorites"  />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} component={Link} to="/nearby" /> */}
                    

                </BottomNavigation>
            </Paper>
        </Box>
        </BrowserRouter>
        </>
    )

    
}

export default Layout