import React, { Component } from "react"
import FontAwesome from "react-fontawesome"
import "../Scss/home.scss"
import AliceCarousel from 'react-alice-carousel';

// import Canvas from "../Canvas/canvas"
// import Sidebar from "../Hoc/sidebar"
class Home extends Component {
    state = {
        visible: false
    };

    renderGoal = () => {
        var template = [];
        for (var i = 0; i < 5; i++) {
            template.push(
                <div className="goal--wrapper">
                    <div className="goal--meter">
                        <p>30</p><p>Days remaining</p>
                    </div>
                    <div className="goal--title">
                        <p>push up</p>
                    </div>
                </div>);
        }

        return template
    }


    render() {
        return (
            <div>
                <AliceCarousel
                    startIndex={1}
                    fadeOutAnimation={true}
                    mouseDragEnabled={true}
                    buttonsDisabled={true}
                >
                    {this.renderGoal()}
                </AliceCarousel>
                <FontAwesome name="clock-o" />
                {/* <button onClick={() => this.toggleSidebar()} >click me</button> */}
            </div>
        )
    }
}

export default Home;