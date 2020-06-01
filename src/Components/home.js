import React, { Component } from "react"
// import FontAwesome from "react-fontawesome"
import AliceCarousel from 'react-alice-carousel'
import RoundProgressBar from "../Hoc/circularBar"
import Button from "../Hoc/button"
import "../Scss/home.scss"

// import Canvas from "../Canvas/canvas"
// import Sidebar from "../Hoc/sidebar"


RoundProgressBar.defaultProps = {
    size: 200,
    value: 25,
    max: 100,
    strokeWidth: 10,
    stroke: 'red',
    text: ""
}
class Home extends Component {
    state = {
        visible: false,
        percentage: 80,
        button: {
            checkIn: {
                value: "CHECK IN",
            },
            failed: {
                value: "I LOST MY CHALLENGE"
            }
        }
    };



    renderGoal = () => {
        var template = [];
        for (var i = 0; i < 5; i++) {
            template.push(
                <div className="goal--wrapper" key={i}>
                    <RoundProgressBar
                        value={this.state.percentage}
                        stroke={'#6EFAFF'}
                        max={100}
                        strokeWidth={15}
                        size={230}
                        text="Days Remaining"
                    />
                    <div className="goal--title">
                        <p>100 Push Up Every Day</p>
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
                <div className="container">
                    <Button formdata={this.state.button.checkIn} />
                </div>
            </div>
        )
    }
}

export default Home;