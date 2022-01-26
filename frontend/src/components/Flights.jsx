import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import PriceFilter from "./PriceFilter";
import DestinationFilter from "./DestinationFilter";
import DatesFilter from "./DatesFilter";
// import airportNamesLookupTable from "./helpers/airportNamesLookupTable";
import {airportNamesLookup} from "../helpers/airportNamesLookupTable";
import "./Flights.css";


export default function Flights(props) {
  let { id } = useParams();

  const { appFlightCode } = props;
  appFlightCode(id);

  const priceReset = () => {
    setminMaxValue([0, 1000]);
    console.log("resetted price");
  };
  const destinationReset = () => {
    setSelectedDestination(null);
    console.log("resetted destination");
  };
  const dateReset = () => {
    setSelectedDate(null);
    console.log("resetted date");
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  // console.log("THIS IS USE PARAMS: ", useParams())
  // console.log("THIS SHOULD BE FLIGHTCODE ID: ", id)
  const [minMaxValue, setminMaxValue] = React.useState([0, 2000]);

  const [flights, setFlights] = useState([]);

  const [filterFlights, setFilterFlights] = useState([]);

  const [selectedDestination, setSelectedDestination] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  // const [state, setState] = useState({
  //   flights: [],
  // });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/flights/${id}`)
      .then((res) => {
        console.log("axios req data", res.data);
        const flightsData = res.data;
        setFlights(flightsData);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [id]);

  useEffect(() => {
    setFilterFlights(
      flights.filter((flight) => {

        // console.log(
        //   "selectedDate",
        //   selectedDate,
        //   flight.flightData.departure_at
        // );

        // console.log("selectedDate", selectedDate, flight.flightData.departure_at)

        return (
          flight.flightData.price > minMaxValue[0] &&
          flight.flightData.price < minMaxValue[1] &&
          (selectedDestination === null ||
            flight.destination === selectedDestination) &&
          (selectedDate === null ||
            flight.flightData.departure_at.slice(0, 10) ===
              selectedDate.slice(0, 10))
        );
      })
    );
  }, [minMaxValue, flights, selectedDestination, selectedDate]);

  // console.log("this is flight", flights);

  const handleAdd = (flightObj, index) => {

   console.log("THIS IS FLIGHT OBJECT+++++", flightObj)
  //  const { destination } = flightObj; // destructure so it's easy to access
  //  const { airline, departure_at, expires_at, flight_number, price, return_at } = flightObj.flightData
  //  const abc = new Date(departure_at).getTime();
  // let flight_id = `${airline}-${abc}-${flight_number}` // set this as id for local database
  // console.log(typeof flight_id)

   let user = JSON.parse(localStorage.getItem("YoLowUser"));
   const user_id = user.id;
  //  console.log ("USER----------", user_id)
   axios
   .post(`http://localhost:3001/api/flights/${id}/user/favourites/`, { flightObj, user_id })
   .then(response => {
     const flightsData = {favourited: true, destination: flightObj.destination, flightData: {...response.data}}
     console.log("THIS IS RESDATA+++++++", flightsData)

     const newFlights = [...flights]
     newFlights[index] = flightsData
     console.log("THIS IS RES+++++++", response)
     setFlights(newFlights);

   })
  }
  // console.log("test 25", minMaxValue)


  return (
    <div>
       <Typography className = "center" variant="h1">Flight Deals for {id.toUpperCase()}</Typography>
      <Grid container spacing={4} justify-content="center" alignItems="center" style={{padding:"0 100px"}} >
        <Grid item xs={4}>
          <Item className="filterBox">
            {/* <h5>Price range</h5>
      <p>Between</p>
      <Typography>{minMaxValue[0]}</Typography>
      <p>To</p>
      <Typography>{minMaxValue[1]}</Typography> */}

            <PriceFilter className="priceFilter"
              minMaxValue={minMaxValue}
              setminMaxValue={setminMaxValue}
            />
            <Button size="small" color="primary" onClick={() => priceReset()}>
              Reset Price
            </Button>
          </Item>
        </Grid>
        <Grid item xs={4} >
          <Item className="destinationFilter">
            <DestinationFilter
              selectedDestination={selectedDestination}
              setDestination={setSelectedDestination}
              flightData={filterFlights}
            />
            <Button
              size="small"
              color="primary"
              onClick={() => destinationReset()}
            >
              Reset Destination
            </Button>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item className="departureFilter">
            <DatesFilter setDate={setSelectedDate} flightData={filterFlights} />
            <Button size="small" color="primary" onClick={() => dateReset()}>
              Reset Date
            </Button>
          </Item>
        </Grid>
      </Grid>


      <Container>
        <Grid container spacing={4} marginTop="100px" alignItems="stretch" >
          {filterFlights.map((flight, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={index} height="100%" alignItems="stretch">
                <Card  sx={{height:"400px"}}>
                  <CardContent className="cards">
                    <Typography gutterBottom variant="h5">
                    {/* Need to add the airport name  */}
                      <span className="pop">{airportNamesLookup[flight.destination] ? `${airportNamesLookup[flight.destination]} - ${flight.destination}` : flight.destination}</span>
                    </Typography>
                    <Typography >
                    <span className="titles">Airline:</span> {flight.flightData.airline} <br></br>
                      <span className="titles">Flight Number:</span> {flight.flightData.flight_number} <br></br>
                      <span className="titles">Departure At:</span> {moment(flight.flightData.departure_a).format('LLL')} <br></br>
                      <span className="titles">Return At:</span> {moment(flight.flightData.return_at).format('LLL')} <br></br>
                      <span className="titles expire">Expires At:</span> {moment(flight.flightData.expires_at).format('LLL')} <br></br>

                      {/* {console.log("flight data with fav", flight)} */}
                    </Typography>
                    <Typography >
                    <span className="titles">Price</span>:  <span className="price">${flight.flightData.price} </span> <br></br>

                    </Typography>

                  </CardContent>
                  <CardContent className="cards">
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleAdd(flight)}
                    />
                    {flight.favourited === false ? (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleAdd(flight, index)}
                      >
                        Favourite
                      </Button>
                    ) : (
                      <Button size="small" color="warning">
                        Favourited
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}
