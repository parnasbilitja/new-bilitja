import React from "react";
import "../../../styles/PrimaryTextInput.module.scss";

const PrimaryTextInput = (props) =>{
  // console.log(props);
    return props.readonlyattr ? (
      <input
        {...props}
        type='text'
        // autoComplete="off"
        className="form-input primary-text px-2"
      />
    ) : (
      <input
        {...props}
        type='text'
        // autoComplete="off"
        className={`form-input primary-text px-2 rounded ${props.ext} `}
      />
    );
}
export default PrimaryTextInput;