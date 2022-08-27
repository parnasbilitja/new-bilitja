import React from "react";

export default class PrimarySelectInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <select
          {...this.props}
          className="col-12 primary-text select-box p-2"
          style={{ height: "2.8em", borderRadius: 5, marginTop: 9 }}
        >
          {this.props.children}
        </select>
      </div>
    );
  }
}
