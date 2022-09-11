import React from "react";

const PrimarySelectInput = (props) =>{
    return (
      <div>
        <select
          {...props}
          className="col-12 primary-text select-box p-2 font-yekan"
          style={{ height: "3em", borderRadius: 5 }}
        >
          {props.children}
        </select>
      </div>
    );
}
export default PrimarySelectInput;