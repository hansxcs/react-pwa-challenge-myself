import React from 'react'
import "../Scss/button.scss"

const Button = ({formdata}) =>{
    var template = null;
    const renderButton = ()=>{
        template = (
            <button className="btn btn-primary">{formdata.value}</button>
        )
        return template;
    }

    return <div>{renderButton()}</div>

}

export default Button;