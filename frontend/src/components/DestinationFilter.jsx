import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { airportNamesLookup } from "../helpers/airportNamesLookupTable";

export default function DestinationFilter(props) {
  // console.log("props.flightData", props.flightData.flights)

  // const [value, setValue] = React.useState(options[0]);
  // const [inputValue, setInputValue] = React.useState('');

  const filteredArray = [
    ...new Set(
      props.flightData.map((item) => {
        return item.destination;
      })
    ),
  ];

  //console.log("SA", filteredArray);
  return (
    <Autocomplete
      onChange={(event, newValue) => {
        props.setDestination(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        props.setDestination(newInputValue ? newInputValue : null);
      }}
      sx={{ width: 300 }}
      value={props.selectedDestination}
      // inputValue={props.selectedDestination}
      options={filteredArray}
      autoHighlight
      getOptionLabel={(option) => option}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {airportNamesLookup[option] ? airportNamesLookup[option] : option}
        </Box>
      )}
      renderInput={(params) => (
        console.log("params", airportNamesLookup[params.inputProps.value]),
        (
          <TextField
            {...params}
            label="Choose a destination"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
              value:
                params.inputProps.value &&
                `${airportNamesLookup[params.inputProps.value]}`, // disable autocomplete and autofill
            }}
          />
        )
      )}
    />
  );
}

// {city: "", country: "", code: ""},

// const destinations = [
//   {city: "Toronto, ON", country: "Canada", code: "YYZ"},
//   {city: "Atlanta, GA", country: "USA", code: "ATL"},
//   {city: "Phuket", country: "Thailand", code: "HKT"},
// ]
