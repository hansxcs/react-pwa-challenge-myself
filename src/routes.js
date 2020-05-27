import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./Components/home";
import Register from "./Components/register";
import Login from "./Components/login";
// import Auth from "./Auth/auth";
import PrivateRoute from "./Auth/privateRoutes";

const Routes = (props) => {

  return (
    <Router>
      <Switch>
        {/* <Auth path="/" component={Login} restristed={false} />
        <Auth path="/register" component={Register} restristed={false} />
        <Auth path="/home" component={Home} restristed={true} /> */}
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/home" authed={true} component={Home} />

      </Switch>
    </Router>
  );
};

export default Routes;
