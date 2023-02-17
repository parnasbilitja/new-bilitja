import React from "react";
import styles from "../../../styles/PopUpWide.module.scss";
const PopUpWide = (props) => {
  return (
    <div className={`${styles["parent"]} ${props.opened ? "d-block" : "d-none"}`}
      onClick={() => {
        props.closePopUp(false);
      }}
    >
      <div
        className={` ${styles["popup-calendar-main-box"]} ${
          props.opened ? styles["popup-animation"] : ""
        }`}
      >
        <div>{props.children}</div>
      </div>
    </div>
  );
};
export default PopUpWide;
