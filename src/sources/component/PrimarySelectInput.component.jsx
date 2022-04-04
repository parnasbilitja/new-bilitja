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
          className="col-12 primary-text select-box my-1 h-25 p-1"
        >
          {this.props.children}
        </select>
      </div>
    );
  }
}
