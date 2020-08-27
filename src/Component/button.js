import React from "react";
import "../Scss/button.scss";

const Button = ({ formdata, filled, type, handle, data }) => {
  var submitEnable = true;
  var template = null;
  if (filled != null) {
    Object.values(filled).map((value) => {
      if (!value) submitEnable = false;
      return template;
    });
  }
  const renderButton = () => {

    if (formdata) {
      switch (type) {
        case "form":
          template = (
            <button
              type="submit"
              className={
                "btn" + (submitEnable ? " btn--active" : " btn--outline disable")
              }
              disabled={!submitEnable}
            >
              {formdata.value}
            </button>
          );
          break;
        case "checkin":
          template = (
            <button
              type="submit"
              className={
                "btn" +
                (!formdata.check ? " btn--active" : " btn--outline disable")
              }
              disabled={formdata.check}
              onClick={() => handle(data[formdata.iteration], formdata.iteration)}
            >
              {formdata.text}
            </button>
          );
          break;
        case "danger":
          template = (
            <button
              type="submit"
              className={
                "btn" +
                (!formdata.check ? " btn--active" : " btn--outline disable")
              }
              disabled={formdata.check}
              onClick={() => handle(data[formdata.iteration], formdata.iteration)}
            >
              {formdata.text}
            </button>
          );
          break;
        default:
          template = null;
      }
    }

    return template;
  };

  return <div>{renderButton()}</div>;
};

export default Button;
