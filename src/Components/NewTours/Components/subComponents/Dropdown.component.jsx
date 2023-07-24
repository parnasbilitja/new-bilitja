import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/Dropdown.module.scss";
import { withRouter } from "next/router";
import { connect } from "react-redux";

const DropdownComponent = (props) => {
  useEffect(() => {
    if (props.destandorgcities.date.miladiDate && props.nights) {
      props.setNight(props.nights[0]?.night);
    }
  }, [props.destandorgcities.date.miladiDate, props.nights]);

  useEffect(() => {
    console.log("fcgdx1", props.night);
  }, []);
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
        <option value={props.destandorgcities.night} disabled selected>
          {props.destandorgcities?.date?.miladiDate && props.nights.length > 0
            ? `${props.nights[0]?.night} شب`
            : props?.night?.length > 0 && props?.nights?.length === 0
            ? `${props?.night} شب`
            : "تعداد شب"}
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
