import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/Dropdown.module.scss";
import { useDispatch } from "react-redux";

const DropdownComponent = (props) => {
  console.log("fcgdx", props);

 
  return (
    <div className={styles.dropdowncontainer}>
      <select className="select-custom"
        name="تعداد شب"
        id=""
        onClick={(e) => props.setNight(e.target.value)}
      >
        <option value="" disabled selected>
          تعداد شب
        </option>
        {props.nights?.map((nightItem) => {
          return (
            <option
              value={nightItem.night}
              // onClick={() => {
              //   console.log("kj");
              // }}
            >
              {nightItem.night} شب
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropdownComponent;
