import React from "react";
import styles from "../../../styles/PopUpWide.module.scss";
const PopUpWide = (props) => {
  return (
    <div className={props.opened ? "d-block" : "d-none"}>
      {/* <div
        className={` ${styles["popup-calendar-scrren-saver"]}`}
        onClick={() => {
          props.closePopUp(false);
        }}
      ></div> */}
      <div
        onClick={() => {
          props.closePopUp(false);
        }}
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
