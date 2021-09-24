import React from "react";

import styles from "../../../styles/PopUp.module.scss";

const PopUp = (props) => {
  return (
    <div className={props.opened ? "d-block" : "d-none"}>
      <div
        className={styles["popup-scrren-saver"]}
        onClick={() => {
          props.closePopUp(false);
        }}
      ></div>
      <div
        className={` ${styles["popup-main-box"]} ${
          props.opened ? styles["popup-animation"] : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};
export default PopUp;
