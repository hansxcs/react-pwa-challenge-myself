import React from 'react'
import "../Scss/loader.scss"

const Loader = () => {

    const renderBar = () => {
        var bars = [];
        for (var i = 1; i <= 5; i++) {
            bars.push(<div className={"bar bar--" + i} key={i}></div>);
        }
        return bars;
    }

    return (
        <div className="loader loader--container">
            <div className="wrapper">
                {renderBar()}
            </div>
        </div>
    )
}

export default Loader;