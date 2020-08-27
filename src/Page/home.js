import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AliceCarousel from "react-alice-carousel";
import RoundProgressBar from "../Component/circularBar";
import Button from "../Component/button";
import Loader from "../Component/loader";
import Api from "../api";
import Cookies from "universal-cookie";

import "../Scss/home.scss";

// import Canvas from "../Canvas/canvas"
// import Sidebar from "../Component/sidebar"

class Home extends Component {
  state = {
    visible: false,
    is_fetching: true,
    loading: false,
    data: [],
    button: {
      checkIn: {
        text: "CHECK IN",
        iteration: 0,
        check: false,
      },
      delete: {
        text: "FORTFEIT",
        check: false,
      },
      failed: {
        text: "I LOST MY CHALLENGE",
      },
    },
  };
  loading = () => (this.state.loading ? <Loader /> : "");

  componentWillMount() {
    this.setState({
      loading: true,
    });
    const cookies = new Cookies();
    var token = cookies.get("challengemyself_session");
    var text = this.state.button.checkIn.text;
    Api.get("/goal/index", {
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.data.goals[0].check_in) text = "CHECKED";
        this.setState({
          is_fetching: false,
          loading: false,
          data: res.data.goals,
          button: {
            checkIn: {
              text,
              check: res.data.goals[0].check_in,
              iteration: 0,
            },
            delete: {
              text: "FORTFEIT",
              check: false,
            },
          },
        });
      })
      .catch((e) => {
        if (e.response) {
          if (e.response.status === 401) {
            this.props.history.push("/");
          } else {
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
            this.setState({
              loading: false,
              registerError: e.response.data.message,
            });
          }
        } else {
          this.setState({
            loading: false,
            registerError: "500 Internal Server",
          });
        }
      });
  }

  onSlideChanged(e) {
    var text = "CHECK IN",
      check = false;
    if (this.state.data[e.item].check_in) {
      text = "CHECKED";
      check = true;
    }
    this.setState({
      button: {
        checkIn: {
          text,
          check,
          iteration: e.item,
        },
        delete: {
          text: 'FORTFEIT',
          check: false,
        },
      },
    });
  }

  renderGoal = () => {
    var template = [];
    for (var i = 0; i < this.state.data.length; i++) {
      template.push(
        <div className="goal--wrapper" key={i}>
          <RoundProgressBar
            value={this.state.data[i].current_day}
            max={this.state.data[i].total_day}
          />
          <div className="goal--title goal--title_mt">
            <p>{this.state.data[i].name}</p>
          </div>
        </div>
      );
    }

    return template;
  };

  addgoal = () => {
    return this.props.history.push("/add-goal");
  };

  handleCheckIn = async (data, iteration) => {
    let checkIn = this.state.button.checkIn;
    let originalData = [...this.state.data];
    checkIn.text = "CHECKED";
    checkIn.check = true;
    originalData[iteration].current_day++;
    this.setState({
      data: originalData,
      button: {
        checkIn,
      },
    });
    this.renderGoal();
    const cookies = new Cookies();
    var token = cookies.get("challengemyself_session");
    await Api.post(`/goal/${data.id}/check-in`, {
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        data.check_in = true;
        originalData = [...this.state.data];
        originalData[iteration] = data;

        this.setState({
          data: originalData,
        });
        console.log(res);
      })
      .catch((e) => {
        if (e.response) {
          if (e.response.status === 401) {
            // this.props.history.push("/");
          } else {
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
            this.setState({
              loading: false,
              registerError: e.response.data.message,
            });
          }
        } else {
          this.setState({
            loading: false,
            registerError: "500 Internal Server",
          });
        }
      });
  };

  handleDelete = async (data, iteration) => { };
  render() {
    return (
      <div>
        <div className="add-button" onClick={() => this.addgoal()}>
          <FontAwesomeIcon size="lg" icon={faPlus} />
        </div>
        {this.state.is_fetching ? (
          "Please Wait..."
        ) : (
            <AliceCarousel
              startIndex={0}
              fadeOutAnimation={true}
              mouseDragEnabled={true}
              buttonsDisabled={true}
              onSlideChanged={(event) => this.onSlideChanged(event)}
            >
              {this.renderGoal()}
            </AliceCarousel>
          )}
        <div className="container">
          <Button
            formdata={this.state.button.checkIn}
            type="checkin"
            handle={(event, iteration) => this.handleCheckIn(event, iteration)}
            data={this.state.data}
          />
          <br />
          <Button
            formdata={this.state.button.delete}
            type="checkin"
            handle={(event, iteration) => this.handleDelete(event, iteration)}
            data={this.state.data}
          />
        </div>
        {this.loading()}
      </div>
    );
  }
}

export default Home;
