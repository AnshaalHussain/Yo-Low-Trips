/* Root/ Parent component */
import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import InputCity from "./components/InputCity";
import Flights from "./components/Flights";
import Favourites from "./components/Favourites";
import Login from "./components/Login";
import FlightCodesModal from "./components/FlightCodesModal";
import PriceFilter from "./components/PriceFilter";

// import AllFlights from "components/allflights"
function App() {

  const [user, setUser] = useState(
    null
    // email: "",
    // password: "",
  );

 //  for each flight data item
 //  render a form that has each flight data.
 // the form will have a on submit handler
 // scheduler appointment form (ie. onsave) instead of onsave use handle submit
 // tiny app ex.

 // filters are button siblings to the filter components

  return (

    
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <div className="content">
          <Switch>
            {/* all routes goes inside switch component */}
            <Route exact path="/"> {/* homepage */}
              <InputCity />

            </Route>
            <Route exact path="/login">
              <Login setUser={setUser}/>
            </Route>
            <Route exact path="/flights/:id">
              <Flights />
            </Route>
            <Route exact path="/favourites">
              { !user ? <Redirect to="/login" /> : <Favourites />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
