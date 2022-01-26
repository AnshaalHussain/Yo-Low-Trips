
const db = require("../db");
const router = require("express").Router();
const helpers = require("../helpers/dbHelpers")(db);
const fetch = require("node-fetch");
const { DatabaseError } = require("pg");

module.exports = () => {
  router.get("/:id", (req, result) => {

    // console.log("test15", req.params)
    // helpers.getUsers(2).then((result) => {
    //   const users = result[0];
    //   console.log(users);
    //   //important for CORS error
    //   res.header("Access-Control-Allow-Origin", "*");
    //   //res.status(200).json({ users })
    //   res.send({ users });
    //   // res.json("db result", { users });
    // });



    const params = {
      origin: req.params.id,
      page: "None", // default it shows 100 object
      currency: "CAD",
      destination: "-",
    };

    const qs = new URLSearchParams(params);

    const header = {
      "x-access-token": "e62e076131586fa535bf5122617771fd",
      "x-rapidapi-host":
        "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
      "x-rapidapi-key": "b171b851e2msh63c29682d8b9f4ep1465fcjsn38b2167465d3",
      useQueryString: true,
    };
    const response = fetch(
      "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?" +
        qs,
      {
        headers: {
          "x-access-token": "e62e076131586fa535bf5122617771fd",
          "x-rapidapi-host":
            "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "b171b851e2msh63c29682d8b9f4ep1465fcjsn38b2167465d3",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        const data = res.data;

        // const flightArray = [];
        const flightArrayPromises = Object.keys(data).map(async (key) => {
          const flightData = data[key];
          const flightObject = {};

          // console.log("flightdata",flightData)
          for (let item in flightData) {
            // console.log("itemflight", item)
            const flightNumber = await helpers.getFlightNumber(flightData[item].flight_number)
            // console.log("test27", flightNumber)
            // console.log("flightobject",({
            //   destination: key,
            //   flightData: flightData[item],
            //   favourited: flightNumber[0] ? true: false
            // }))
            flightObject[item] = ({
                destination: key,
                flightData: flightData[item],
                favourited: flightNumber[0] ? true: false
              });
          }
          return flightObject
        });
        const flightArray = await Promise.all(flightArrayPromises)
        const flightArrayParse = [];

        for (const flightItem of flightArray) {
          // console.log("what is this", flightItem)
          for (const flightObject in flightItem) {
            // console.log("what is this2", flightItem[flightObject])
            flightArrayParse.push(flightItem[flightObject])
          }
        }

        console.log("RES", flightArrayParse);
        result.json(flightArrayParse);
      });

    //console.log(response)

  });

  router.post("/:id/user/favourites", (req,res) => {
    const {id} = req.params;
    console.log(`THIS IS ORIGIN!!!!!! ${id}`)
    const { flightObj, user_id } = req.body
    const { destination } = flightObj; // destructure so it's easy to access
    const { airline, departure_at, expires_at, flight_number, price, return_at } = flightObj.flightData
    // console.log(`THIS IS PRICE: ${price} && THIS IS DESTINATION ${destination}`)

    const fav_id = Math.floor(Math.random() * 100);
    helpers.addToFavourite(fav_id, user_id, flightObj, id)
      .then((response) => {
        // console.log("THIS IS BKEND RESPONSE", response)
        const favFlight = response;
        res.send(favFlight);
      })
  })

  return router;
};