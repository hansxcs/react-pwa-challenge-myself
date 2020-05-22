// import React from 'react';
import Cookies from "universal-cookie";

const Auth = ()=>{
    var authed =()=>{
        var cookie = new Cookies();
        console.log(cookie.get('challengemyself_session'));
        if(cookie.get('challengemyself_session') !== undefined){
            return true;
        }
        return false;
    }
    return ({authed})
}

export default Auth;