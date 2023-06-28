import React from "react";
import styles from "../../../styles/PrimaryButton.module.scss";
const PrimaryButton = (props) => {
  return <button {...props} className={`${styles["primary-button"]} py-2 `} />;
};
export default PrimaryButton;
