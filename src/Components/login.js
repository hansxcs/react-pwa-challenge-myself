import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import FormField from '../Hoc/formField'
import Button from '../Hoc/button'
import Api from "../api"
import Cookies from 'universal-cookie';
import '../Scss/formfield.scss'


class Login extends Component{
    state={
        registerError: "",
        loading: false,
        filled:{
            email:false,
            password:false,
        },
        formData:{
            email:{
                label: "Email",
                element: "input",
                value: "",
                config: {
                    name: "email",
                    type: "email",
                },
                validation:{
                    required: true,
                    email: true,
                },
                valid: false,
                touched:false,
                validationMessage: "",
            },
            password:{
                label: "Password",
                element: "input",
                value: "",
                config: {
                    name: "password",
                    type: "password",
                },
                validation:{
                    required:true,
                },
                valid: false,
                touched:false,
                validationMessage: "",
            },
        },
        button:{
            registerButton:{
                value:"LOGIN",
            },
        }
    }

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
    

    updateForm = (element) =>{
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
        newElement.validationMessage= validData[1];
    
        newElement.touched = element.blur;
        newFormData[element.id] = newElement;

        if(newFormData[element.id].value != ""){
            formIsFilled[element.id] = true
        }else{
            formIsFilled[element.id] = false
        }

        this.setState({
            formData:newFormData,
            filled:formIsFilled,
        })

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

    submitForm = (event)=>{
        event.preventDefault();
        var dataToSubmit ={};
        var formIsValid = true;
        
        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
        }
        for (let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }
        if(formIsValid){
            this.setState({
                loading:true,
                registerError:""
            })
            Api.post('/user/login',{
                email:dataToSubmit.email,
                password:dataToSubmit.password},
            {
                headers:{'content-type': 'application/json'}
            }).then(res=>{
                let d = new Date();
                d.setTime(d.getTime() + (60*60*1000));
                const cookies = new Cookies();
                cookies.set('challengemyself_session','Bearer '+res.data.access_token,{path:'/',expires: d});
                this.props.history.push("/home");
            }).catch(e=> {
                if (e.response) {   
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                  }
                this.setState({
                    loading:false,
                    registerError:e.response.data.message
                })
            })
        }

    }

    showError = () =>
        this.state.registerError !== "" ? (
            <div className="error_message">{this.state.registerError}</div>
        ) : (
        ""
    );

    render() {
        return (
            <div className="container container--form">
                <form onSubmit={(event)=>this.submitForm(event)}>
                    <FormField 
                        id={"email"} 
                        formdata={this.state.formData.email}
                        change={(event)=>this.updateForm(event)}
                    />
                    <FormField 
                        id={"password"} 
                        formdata={this.state.formData.password}
                        change={(event)=>this.updateForm(event)}
                    />
                    <Button 
                        formdata={this.state.button.registerButton} 
                        filled={this.state.filled}  />
                        
                    {this.showError()}
                </form>
                <div className="text text--bottom">Don't have an account ? <Link className="text text--highlight " to="/register">Register</Link></div>
            </div>
        )
    }
}

export default Login;