import React from 'react'
import "../Scss/button.scss"

const Button = ({formdata,change}) =>{
    var template = null;
    const renderButton = ()=>{
        template = (
            <button type="submit" className="btn btn--outline" 
                >{formdata.value}</button>
        )
        return template;
    }

    return <div>{renderButton()}</div>

}

export default Button;