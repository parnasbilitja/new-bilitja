import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/Dropdown.module.scss";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import moment from "moment-jalaali";

const DropdownComponent = (props) => {

  return (
    <div className={styles.dropdowncontainer}>

      <select key='night'
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
          {
              props.destandorgcities.night ?    <option key={'مدت اقامت'} value='' disabled selected>
                  {props.destandorgcities.night} شب{moment(props.flightDate.miladiDate).add(+props.destandorgcities.night,'days').format("jYYYY/jMM/jDD")}
              </option>:   <option key={'مدت اقامت'} value='' disabled selected>
                  مدت اقامت
              </option>

          }
        {/* <option value='' disabled selected>*/}
        {/*  مدت اقامت*/}
        {/*</option>*/}

        {props.nights?.map((nightItem) => {
          return <option key={nightItem} value={nightItem}>
            {nightItem}  شب
              ({moment(props.flightDate.miladiDate).add(+nightItem,'days').format("jYYYY/jMM/jDD")})
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
