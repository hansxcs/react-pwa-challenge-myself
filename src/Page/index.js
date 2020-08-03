import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Index extends Component {
    render() {
        return (
            <div>
                <div><Link to="/register">Register</Link><Link to="/login">Login</Link>  </div>
            </div>
        )
    }
} 

export default Index;