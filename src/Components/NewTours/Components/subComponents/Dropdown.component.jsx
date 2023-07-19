import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/Dropdown.module.scss";
import { useDispatch } from "react-redux";
import { withRouter } from "next/router";
import { connect } from "react-redux";

const DropdownComponent = (props) => {
  console.log("fcgdx", props);

  return (
    <div className={styles.dropdowncontainer}>
      <select
        className="select-custom"
        name="تعداد شب"
        id=""
        onChange={(e) => {
          if (props.nights) {
            props.setNight(e.target.value);
          }
        }}
        onClick={(e) => props.setNight(e.target.value)}
        // value={}
        value={props.destandorgcities.night}
      >
        {/* {props.nights ? } */}
        <option value="" disabled selected>
          تعداد شب
        </option>
        {props.nights?.map((nightItem) => {
          return <option value={nightItem.night}>{nightItem.night} شب</option>;
        })}
      </select>
    </div>
  );
};

const mapStatesToProps = (state) => ({
  destandorgcities: state.destandoriginCitiesTour,
});

export default withRouter(connect(mapStatesToProps, null)(DropdownComponent));
