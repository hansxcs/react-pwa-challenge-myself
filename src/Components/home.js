import React, { Component } from "react"
// import FontAwesome from "react-fontawesome"
import AliceCarousel from 'react-alice-carousel'
import RoundProgressBar from "../Hoc/circularBar"
import Button from "../Hoc/button"
import Loader from '../Hoc/loader';
import Api from "../api"
import Cookies from 'universal-cookie'

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
        is_fetching: true,
        loading: false,
        percentage: 80,
        data: [],
        button: {
            checkIn: {
                value: "CHECK IN",
            },
            failed: {
                value: "I LOST MY CHALLENGE"
            }
        }
    };

    loading = () =>
        this.state.loading ? (
            <Loader />
        ) : (
                ""
            );

    componentWillMount() {
        this.setState({
            loading: true
        })
        const cookies = new Cookies();
        var token = cookies.get('challengemyself_session')
        Api.get('/goal/index',
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': token,
                }
            }).then(res => {
                this.setState({
                    is_fetching: false,
                    loading: false,
                    data: res.data.goals,
                })
            }).catch(e => {
                if (e.response) {
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                    this.setState({
                        loading: false,
                        registerError: e.response.data.message
                    })
                } else {
                    this.setState({
                        loading: false,
                        registerError: '500 Internal Server'
                    })
                }

            })
    }

    renderGoal = () => {
        var template = [];
        for (var i = 0; i < this.state.data.length; i++) {
            template.push(
                <div className="goal--wrapper" key={i}>
                    <RoundProgressBar
                        value={1}
                        stroke={'#6EFAFF'}
                        max={this.state.data[i].total_day}
                        strokeWidth={15}
                        size={230}
                        text="Days Remaining"
                    />
                    <div className="goal--title goal--title_mt">
                        <p>{this.state.data[i].name}</p>
                    </div>
                </div>);
        }

        return template
    }

    addgoal = () => {
        return this.props.history.push("/add-goal");
    }

    render() {
        return (
            <div>
                <button onClick={() => this.addgoal()}> Add Goal</button>
                {this.state.is_fetching ? "Please Wait..." :
                    <AliceCarousel
                        startIndex={1}
                        fadeOutAnimation={true}
                        mouseDragEnabled={true}
                        buttonsDisabled={true}
                    >
                        {this.renderGoal()}
                    </AliceCarousel>
                }
                <div className="container">
                    <Button formdata={this.state.button.checkIn} />
                </div>
                {this.loading()}
            </div>
        )
    }
}

export default Home;