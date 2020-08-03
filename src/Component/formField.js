import React from 'react'
import "../Scss/formfield.scss"

const FormField = ({ formdata, change, id }) => {
    const renderTemplate = () => {
        let template = null;
        switch (formdata.element) {
            case "input":
                template = (
                    <div className="form-field">
                        <div className="form-field__control">
                            <label className="form-field__label">{formdata.label}</label>
                            <input className="form-field__input"
                                {...formdata.config}
                                value={formdata.value}
                                onBlur={(event) => change({ event, id, blur: true })}
                                onChange={(event) => change({ event, id, blur: false })}
                                autoComplete="off"
                            />
                        </div>

                        {showError()}
                    </div>
                );
                break;
            case "textarea":
                template = (
                    <div className="form-field">
                        <div className="form-field__control">
                            <label className="form-field__label">{formdata.label}</label>
                            <textarea className="form-field__input"
                                {...formdata.config}
                                value={formdata.value}
                                onBlur={(event) => change({ event, id, blur: true })}
                                onChange={(event) => change({ event, id, blur: false })}
                                autoComplete="off"
                            />
                        </div>

                        {showError()}
                    </div>
                );
                break;
            case "checkbox":
                template = (
                    <div className="form-field form-field--is-filled">
                        <label className="form-field__label__normal">{formdata.label}</label>
                        <div>
                            <label className="toggle">
                                <input
                                    {...formdata.config}
                                    onBlur={(event) => change({ event, id, blur: true })}
                                    onChange={(event) => change({ event, id, blur: false })}
                                    hidden />
                                <span className="circle"></span>
                            </label>
                        </div>
                        {showError()}
                    </div>
                );
                break;

            default:
                template = null;
        }
        return template;
    }

    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className="error_message">{formdata.validationMessage}</div>
            );
        }
        return errorMessage;
    };


    return <div>{renderTemplate()}</div>

}


export default FormField;