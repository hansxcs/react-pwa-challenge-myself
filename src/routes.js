import React from "react";
import {
    BrowserRouter as Router, 
    Route,
    Switch,
} from "react-router-dom";
import Index from "./Components/index";
import Home from "./Components/home";
import Register from "./Components/register";
import Login from "./Components/login";
import PrivateRoute from "./Auth/privateRoutes";

const Routes = (props) => {
  return (
      <Router>
        <Switch>
            <Route path="/" component={Index} exact/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/home" authed={props.authed} component={Home}/>
        </Switch>
      </Router>
  );
};

export default Routes;
