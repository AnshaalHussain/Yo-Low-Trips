import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css"

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import loginImage from "../assets/images/Flying-around-world.png";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Charlesdigital/Yo-Low-Trips">
        Yo-Low Trips
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({ setUser }) {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

 // making request to the backend server to pull in data
  const login = function() {
    console.log ("LOGGING IN!!!")
    axios({
      method: "POST",
      url: '/users/login', // uses POXY
      data: {
        email: email,
        password: password
      },
    }).then((response) => {  // success message
      const user = response.data.user;
      setUser(user);
      localStorage.setItem( "YoLowUser", JSON.stringify(user));  //set the user to use multiple screens/page on app
      // console.log("Success!!!! response is:", response)
    }).catch(err => {
      console.error(err.response.data);
    })
  };

  const handleLogin = async evt => {
    evt.preventDefault();
    login({ email, password });
    // setUser(user);
    history.push('/search'); // redirects to flights screen after successful login
  }

  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${loginImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[70] : t.palette.grey[900],
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 30,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={evt => setEmail(evt.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={evt => setPassword(evt.target.value)}
            />
            <Button
              className="SignInButton"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired
}