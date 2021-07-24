import React from "react";
import styles from "../../../styles/PrimaryButton.module.scss";
export default class PrimaryButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        type="button"
        {...this.props}
        className={styles["primary-button"]}
      />
    );
  }
}
