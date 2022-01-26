import React, { useState } from "react";
import axios from "axios";

/*** Files ***/
import "../styles/InputCity.css";
import FlightCodesModal from "./FlightCodesModal";

/*** Material Ui ***/
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


function requestAirportCode(city) {
  console.log("test3", city)
  return axios.get(`/airports/${city}`)
  .then(function (response) {
    return response
  })
  .catch(function (error) {
    return error
  });
}

export default function InputCity(props) {

  const [city, setCity] = useState("");
  // const [error, setError] = useState();
  const [open,setOpen] = useState(false);
  const [flightCodeData, setflightCodeData] = useState([]);

  console.log("test 15", flightCodeData)
   //pass as a prop to your custom modal
  function validate(event, city) {
    event.preventDefault()
    // if(city === "") {
    // setError("City name cannot be blank");
    //   return;
    // }
    // setError("");
    requestAirportCode(city).then((response) => {
      if(response.data) {
        setflightCodeData(response.data);
        setOpen(true);
      }
    })
  }

  return (
    <>
      <div className="inputCityImg">
        <div className="tagline">
          <h1 className="display-4">Experience the World</h1>
          <p>Let's start with where you want to fly out from.</p>
          <form autoComplete="off" onSubmit={(event) => validate(event,city)}>
            <Input
              className="inputField"
              placeholder="Enter a City"
              onChange={(event)=> {
                setCity(event.target.value);
              }}
              sx={{ border: 1, borderRadius: 1, width: 250 }}
            />
            <Button
              className="searchButton"
              variant="button"
              onClick={(event) => validate(event,city)}
              sx={{ my: 1, mx: 1.5 }}
            >
              Search
            </Button>
          </form>
          <FlightCodesModal
          open={open}
          setOpen={setOpen}
          flightCodeData={flightCodeData}
          code = {props.code}
          setCode = {props.setCode}
          />
        </div>
      </div>
    </>
  );
}



//1. create a form and on submit call a function
//2. creating an axios.get to get display the aiport code
//3. using react router to display