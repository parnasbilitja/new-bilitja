import React from "react";
import "../../../styles/PrimaryTextInput.module.scss";

const PrimaryTextInput = (props) =>{
  

    return props.readonlyattr ? (
      <input
        {...props}
        // autoComplete="off"
        className="form-input primary-text px-2"
      />
    ) : (
      <input
        {...props}
        // autoComplete="off"
        className="form-input primary-text px-2 rounded "
      />
    );
}
export default PrimaryTextInput;