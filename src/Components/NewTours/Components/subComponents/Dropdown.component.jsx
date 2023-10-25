import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/Dropdown.module.scss";
import { withRouter } from "next/router";
import { connect } from "react-redux";

const DropdownComponent = (props) => {
  const [filteredNights, setFilteredNights] = useState([]);


  useEffect(() => {
    setFilteredNights([])
    if (props.nights) {
      const uniqueData = props.nights.filter(
          (value, index, self) =>
              self.findIndex((item) => item.night === value.night) === index
      );
      setFilteredNights(uniqueData);
    }

  }, [props.nights]);
  // useEffect(() => {
  //   if (props.destandorgcities.date.miladiDate && props.night) {
  //     props.setNight(props?.night);
  //   } else if (props.destandorgcities.date.miladiDate === "") {
  //     props.setNight(null);
  //   } else {
  //     props.setNight(filteredNights[0]?.night);
  //   }
  // }, [props.destandorgcities.date.miladiDate, filteredNights]);

  // ${!props.valid() && 'select-custom1'}
  return (
      <div className={styles.dropdowncontainer}>
        <select
            className={`select-custom ${(props.isNight && !props.destandorgcities.night) && 'select-custom1'}`}

            id=""
            onChange={(e) => {
              props.setNight(e.target.value);
            }}
            onClick={(e) => props.setNight(e.target.value)}
            // value={}
            value={props.destandorgcities.night}
        >
          {/* {props.nights ? } */}
          <option value='' disabled selected>
            مدت اقامت
          </option>

          {filteredNights?.map((nightItem) => {
            return <option value={nightItem.night}>
              {nightItem.night} شب
            </option>
          })}
        </select>
      </div>
  );
};

const mapStatesToProps = (state) => ({
  destandorgcities: state.destandoriginCitiesTour,
});

export default withRouter(connect(mapStatesToProps, null)(DropdownComponent));
