import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/Dropdown.module.scss";
import { withRouter } from "next/router";
import { connect } from "react-redux";

const DropdownComponent = (props) => {
  const [filteredNights, setFilteredNights] = useState([]);
  useEffect(() => {
    if (props.nights) {
      const uniqueData = props.nights.filter(
        (value, index, self) =>
          self.findIndex((item) => item.night === value.night) === index
      );
      setFilteredNights(uniqueData);
    }
  }, [props.nights]);
  useEffect(() => {
    if (props.destandorgcities.date.miladiDate && props.night) {
      props.setNight(props?.night);
    } else if (props.destandorgcities.date.miladiDate === "") {
      props.setNight(null);
    } else {
      props.setNight(filteredNights[0]?.night);
    }
  }, [props.destandorgcities.date.miladiDate, filteredNights]);

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

        {filteredNights.length === 0 && (
          <option disabled selected>
            تعداد شب
          </option>
        )}

        {filteredNights?.map((nightItem) => {
          return <option value={nightItem.night}>{nightItem.night}شب</option>;
        })}
      </select>
    </div>
  );
};

const mapStatesToProps = (state) => ({
  destandorgcities: state.destandoriginCitiesTour,
});

export default withRouter(connect(mapStatesToProps, null)(DropdownComponent));
