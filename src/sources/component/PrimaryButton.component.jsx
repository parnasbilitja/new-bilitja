import React from "react";
import styles from "../../../styles/PrimaryButton.module.scss";
const PrimaryButton = (props) => {
    return (
      <input
        type="button"
        {...props}
        className={`${styles["primary-button"]} py-2 font-bold-iransanse`}
      />
    );
}
export default PrimaryButton;