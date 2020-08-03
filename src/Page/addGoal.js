import React, { Component } from 'react';
import FormField from '../Component/formField';
import Button from '../Component/button';
import Loader from '../Component/loader';
import Api from "../api";
import Cookies from 'universal-cookie';
import '../Scss/formfield.scss';

class AddGoal extends Component {
    state = {
        addGoalError: "",
        loading: false,
        filled: {
            goal_name: false,
            description: false,
            total_day: false,
            auto_checkin: true,
            notify_me: true,
        },
        formData: {
            goal_name: {
                label: "Goal Name",
                element: "input",
                value: "",
                config: {
                    name: "goal_name",
                    type: "text",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
            description: {
                label: "Description",
                element: "textarea",
                value: "",
                config: {
                    name: "description",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
            total_day: {
                label: "Total Day",
                element: "input",
                value: "",
                config: {
                    name: "total_day",
                    type: "number",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
            },
            auto_checkin: {
                label: "Auto Check-In",
                element: "checkbox",
                value: "",
                config: {
                    name: "auto_checkin",
                    type: "checkbox",
                    checked: false,
                },
                validation: {
                },
                valid: true,
                touched: true,
                validationMessage: "",
            },
            notify_me: {
                label: "Notify Me",
                element: "checkbox",
                config: {
                    name: "notify_me",
                    type: "checkbox",
                    checked: false,
                },
                validation: {
                },
                valid: true,
                touched: true,
                validationMessage: "",
            },
        },
        button: {
            addButton: {
                value: "ADD NEW GOAL",
            },
        }
    };

    componentDidMount() {
        const setActive = (el, active) => {
            const formField = el.parentNode.parentNode
            if (active) {
                formField.classList.add('form-field--is-active')
            } else {
                formField.classList.remove('form-field--is-active')
                el.value === '' ?
                    formField.classList.remove('form-field--is-filled') :
                    formField.classList.add('form-field--is-filled')
            }
        }

        [].forEach.call(
            document.querySelectorAll('.form-field__input, .form-field__textarea'),
            (el) => {
                el.onblur = () => {
                    setActive(el, false)
                }
                el.onfocus = () => {
                    setActive(el, true)
                }
            }
        )
    }

    updateForm = (element) => {
        const formIsFilled = {
            ...this.state.filled,
        }
        const newFormData = {
            ...this.state.formData,
        };
        const newElement = {
            ...newFormData[element.id]
        };

        newElement.value = element.event.target.value;

        let validData = this.validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newElement.touched = element.blur;
        newFormData[element.id] = newElement;
        if (element.id !== "auto_checkin" && element.id !== "notify_me") {
            if (newFormData[element.id].value !== "") {
                formIsFilled[element.id] = true
            } else {
                formIsFilled[element.id] = false
            }
        }
        this.setState({
            formData: newFormData,
            filled: formIsFilled,
        })

    }

    handleCheckboxChange = (element) => {
        const newFormData = {
            ...this.state.formData,
        };
        const newElement = {
            ...newFormData[element.id]
        };
        newElement.config.checked = element.event.target.checked;
        newFormData[element.id] = newElement;
        this.setState({ formData: newFormData })
    }

    validate = (element) => {
        let error = [true, ""];

        if (element.validation.email) {
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? "Must be valid email" : ""}`;
            error = !valid ? [valid, message] : error;
        }

        if (element.validation.password) {
            const valid = element.value.length >= 5;
            const message = `${!valid ? "Must be greater than 5" : ""}`;
            error = !valid ? [valid, message] : error;
        }

        if (element.validation.required) {
            const valid = element.value.trim() !== "";
            const message = `${!valid ? "This field is required" : ""}`;
            error = !valid ? [valid, message] : error;
        }

        return error;
    };

    submitForm = (event) => {
        event.preventDefault();
        var dataToSubmit = {};
        var formIsValid = true;
        dataToSubmit['start_Date'] = new Date();
        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            if (this.state.formData[key].element === "checkbox") {
                dataToSubmit[key] = this.state.formData[key].config.checked;
            }
        }
        for (let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            this.setState({
                loading: true,
                addGoalError: ""
            })
            const cookies = new Cookies();
            var token = cookies.get('challengemyself_session')
            var today = new Date();

            Api.post('/goal/store', {
                name: dataToSubmit.goal_name,
                is_not_lazy: dataToSubmit.auto_checkin,
                started_at: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
                total_day: dataToSubmit.total_day,
            },
                {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': token,
                    }
                }).then(res => {
                    this.props.history.push("/home");
                }).catch(e => {
                    if (e.response) {
                        console.log(e.response.data);
                        console.log(e.response.status);
                        console.log(e.response.headers);
                    }
                    this.setState({
                        loading: false,
                        addGoalError: e.response.data.message
                    })
                })
        }

    }

    showError = () =>
        this.state.addGoalError !== "" ? (
            <div className="error_message">{this.state.addGoalError}</div>
        ) : (
                ""
            );

    loading = () =>
        this.state.loading ? (
            <Loader />
        ) : (
                ""
            );


    render() {
        return (
            <div className="container container--form">
                <form onSubmit={(event) => this.submitForm(event)}>
                    add Goal
                <FormField
                        id={"goal_name"}
                        formdata={this.state.formData.goal_name}
                        change={(event) => this.updateForm(event)}
                    />
                    <FormField
                        id={"description"}
                        formdata={this.state.formData.description}
                        change={(event) => this.updateForm(event)}
                    />
                    <FormField
                        id={"total_day"}
                        formdata={this.state.formData.total_day}
                        change={(event) => this.updateForm(event)}
                    />
                    <FormField
                        id={"auto_checkin"}
                        formdata={this.state.formData.auto_checkin}
                        change={(event) => this.handleCheckboxChange(event)}
                    />
                    <FormField
                        id={"notify_me"}
                        formdata={this.state.formData.notify_me}
                        change={(event) => this.handleCheckboxChange(event)}
                    />

                    <Button
                        formdata={this.state.button.addButton}
                        filled={this.state.filled}
                        type="form" />
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default AddGoal;