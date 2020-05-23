import React from 'react'
import "../Scss/button.scss"

const Button = ({formdata,filled}) =>{
    var submitEnable = true;
    var template = null;
    Object.values(filled).map((value)=>{
        if (!value)
            submitEnable = false;
        return;
    })

    const renderButton = ()=>{
        template = (
            <button type="submit" 
                className={"btn" + (submitEnable ? " btn--active" : " btn--outline disable") } 
                disabled={!submitEnable}>{formdata.value}</button>
        )
        return template;
    }

    return <div>{renderButton()}</div>

}

export default Button;