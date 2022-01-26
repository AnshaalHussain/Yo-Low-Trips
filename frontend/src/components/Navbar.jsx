import React from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/Navbar.css"

/*** material-ui core components ***/
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";

//mui icons
import SearchIcon from '@mui/icons-material/Search';
import FlightIcon from '@mui/icons-material/Flight';
import StarRateIcon from '@mui/icons-material/StarRate';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Navbar({user, setUser, code}) {
  // const classes = linkStyles();
  const history = useHistory();

  console.log("THIS IS CODE :", code)

  const handleLogout = async evt => {
    setUser(null);
    localStorage.removeItem("YoLowUser")
    history.push("/");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        component={Paper}
        elevation={0}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography className="Brand" variant="h4" noWrap sx={{ flexGrow: 3 }}>
          Yo-Low Trips
        </Typography>
          { user &&
            <Button
              className="Nav-link"
              variant="button"
              component={Link}
              to="/search"
              sx={{ my: 1, mx: 1.5 }}
            >
              <SearchIcon></SearchIcon>
              Search Origin
            </Button>
          }
          { user &&
            <Button
              className="Nav-link"
              variant="button"
              component={Link}
              to={`/flights/${code}`}
              sx={{ my: 1, mx: 1.5 }}
            >
              <FlightIcon></FlightIcon>
              Flight Deals
            </Button>
          }
          { user &&
            <Button
              className="Nav-link"
              variant="button"
              component={Link}
              to="/favourites"
              sx={{ my: 1, mx: 1.5 }}
            >
              <StarRateIcon></StarRateIcon>
              Favourites
            </Button>
          }
          { user &&
            <Button
              className="Nav-link"
              variant="button"
              onClick={handleLogout}
              sx={{ my: 1, mx: 1.5 }}
            >
              <LogoutIcon></LogoutIcon>
              Logout
            </Button>
          } 
        </Toolbar>
      </AppBar>
     </React.Fragment>
  )
}
