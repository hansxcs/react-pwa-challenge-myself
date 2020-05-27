import React, { Component } from 'react';
import Cookies from "universal-cookie";
import { Route, Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        authed: false
    }

    componentWillMount() {
        var authed;
        var cookie = new Cookies();
        if (cookie.get('challengemyself_session') !== undefined) {
            authed = true;
        } else {
            authed = false;
        }

        this.setState({
            authed
        })
    }

    routing = (props) => {
        var template = null;
        if (this.state.authed) {
            if (props.location.pathname === "/" || props.location.pathname === "/register") {
                template = (<Redirect to="/home" />)
            } else {
                template = (<Route
                    path={props.path}
                    exact={props.exact}
                    component={props.component}
                />)
            }

        } else {

            template = (<Route
                path={props.path}
                exact={props.exact}
                component={props.component}
            />)
            if (props.restristed) {
                template = (<Redirect to="/"

                />)
            }

        }




        return template
    }

    render() {
        return (
            <div>
                {this.routing(this.props)}

            </div>
        )
    }
}

export default Auth;