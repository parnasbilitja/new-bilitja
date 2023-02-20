import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../../../styles/PopUpWide.module.scss";
const PopUpWide = (props) => {
  const [width, setWidth] = useState(0)
  useEffect(()=>{
    setWidth(window.innerWidth)
  },[])
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
        style={{top:props.type =='editReciept' && width < 400 && '-60px'}}
      >
        <div>{props.children}</div>
      </div>
    </div>
  );
};
export default PopUpWide;
