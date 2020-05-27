import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, authed, ...rest }) => {


    return (
        <Route
            {...rest}
            component={(props) => authed ? <Redirect to="/home" /> : <Component {...props} />}
        />
    );
}

export default PublicRoute;
