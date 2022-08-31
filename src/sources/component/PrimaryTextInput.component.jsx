import React from "react";
import "../../../styles/PrimaryTextInput.module.scss";

export default class PrimaryTextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.readonlyattr ? (
      <input
        {...this.props}
        // autoComplete="off"
        className="form-input primary-text px-2"
      />
    ) : (
      <input
        {...this.props}
        // autoComplete="off"
        className="form-input primary-text px-2 rounded "
      />
    );
  }
}
