import React from "react";
import {
    BrowserRouter as Router, 
    Route,
    Switch,
} from "react-router-dom";
import Home from "./Components/home";
import Register from "./Components/register";

const Routes = (props) => {
  return (
      <Router>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/register" component={Register} exact/>
        </Switch>
      </Router>
  );
};

export default Routes;
