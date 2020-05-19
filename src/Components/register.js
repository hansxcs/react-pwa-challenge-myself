import React, { Component } from 'react'
import FormField from '../Hoc/formField'
import Button from '../Hoc/button'
import '../Scss/formfield.scss'

class Register extends Component{
    state={
        registerError: "",
        loading: false,
        formData:{
            name:{
                label: "Name",
                element: "input",
                value: "",
                config: {
                    name: "name",
                    type: "text",
                },
                validation:{
                    required:true,
                },
                valid: false,
                touched:false,
                validationMessage: "",
            },
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
            confirmpassword:{
                label: "Password Confirmation",
                element: "input",
                value: "",
                config: {
                    name: "confirmpassword",
                    type: "password",
                },
                validation:{
                    required:true,
                },
                valid: false,
                touched:false,
                validationMessage: "",
            },
            registerButton:{
                value:"REGISTER",
            },
        }
    }

    updateForm = (element) =>{
        const newFormData = {
            ...this.state.formData,
        };
        const newElement = {
            ...newFormData[element.id]
        };

        newElement.value = element.event.target.value;
        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0]
            // newElement.validationMessage[element.id]= newElement;
        } 
        newElement.touched = element.blur;
        newFormData[element.id] = newElement;

        this.setState({
            formData:newFormData,
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

    render() {
        return (
            <div className="container">
                <FormField 
                    id={"name"} 
                    formdata={this.state.formData.name}
                    change={(event)=>this.updateForm(event)}
                />
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
                <FormField 
                    id={"confirmpassword"} 
                    formdata={this.state.formData.confirmpassword}
                    change={(event)=>this.updateForm(event)}
                />
                <Button formdata={this.state.formData.registerButton}/>
            </div>
        )
    }
}

export default Register;