import React from "react";

export default class PrimarySelectInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="form-input-border form-input-border-primaryselect">
        <select {...this.props} className="form-input primary-text">
          {this.props.children}
        </select>
      </div>
    );
  }
}
