import React from "react";
import Image from "next/image";

import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import globals from "../Global";
import styles from "../../../styles/FlightReserve.module.scss";
import { getweekday } from "../../Utils/SimpleTasks";
const FlightReserveMobileHeader = (props) =>
  props.airport1 ? (
    <div className={`row visible-xs ${styles["reserve-mobile-hero"]} `} style={{height: 'auto',marginTop:'-3px !important'}} >
      <div
        className={`col-12 border-pill ${styles["border-pill-private"]}  ${styles["background-world"]}`}
      >
        <div className="row">
          <div className="col-4">
            <strong className="color-secondary font-size-15">
              {props.airport1}
            </strong>
          </div>
          <div className="col-4">
            <strong className="color-secondary font-size-14">به</strong>
          </div>
          <div className="col-4">
            <strong className="color-secondary font-size-15">
              {props.airport2}
            </strong>
          </div>
        </div>
        <div className="row line-2">
          <div className="col-4 mt-1rem-mobi">
            <strong className="font-size-10 center-p">
              {" "}
              شماره پرواز &nbsp;
              <span style={{color: 'red'}} className="font-size-12">
                {props.flightNo}
              </span>
            </strong>
          </div>
          <div className="col-4" style={{ marginTop: 10 }}>
            <img
              width=""
              height=""
              className="airline-icon"
              src={globals.website + `Airlines/${props.airlineCode}.png?ver=1`}
              alt="بلبطجا - لوگو ایرلاین"
            />
            <div className="">
              <span className="font-size-10">ایرلاین</span>{" "}
              <strong className="text-danger font-size-12">{props.airline}</strong>
            </div>
          </div>
          <div className="col-4 mt-1rem-mobi padding-3pxheader">
            <p className="font-size-12 center-p">
              <svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 -960 960 960" width="25"><path d="M560-440q-33 0-56.5-23.5T480-520v-200q0-33 23.5-56.5T560-800h80q33 0 56.5 23.5T720-720v200q0 33-23.5 56.5T640-440h-80Zm0-80h80v-200h-80v200ZM380-240q-27 0-48-15.5T303-297L200-640v-160h80v160l100 320h340v80H380Zm-60 120v-80h400v80H320Zm240-600h80-80Z"/></svg>

              <strong className="text-danger mx-1 font-size-14">
                {props.capLast}
              </strong>
              {/*<i className="bilitja icon-seat font-size-16"></i>*/}


              صندلی
               خالی

            </p>
          </div>
        </div>
        <div className="row line-3">
          <div className="col-7" style={{ marginRight: -25 }}>
            <span className="text-right">
              <FontAwesomeIcon icon={faCalendarAlt} className="mx-2" />
              <span className="text-danger font-size-12">
                {getweekday(String(props.flightDay))}
              </span>
            </span>
            <span className="mx-2 font-size-12">
              <span className="text-danger " style={{ marginRight: -12 }}>
                  {/* <br/> */}{' '}{' '}
                {String(props.flightDate).replace("-", "/").replace("-", "/")}
                  {props.flightDay}
                {/* <p style={{ fontSize: 15 }} className={styles["flight-day"]}>
                </p> */}
              </span>
            </span>
          </div>
          <div className="col-4" style={{ marginRight: 25 }}>
            <p className="text-left ">
              <FontAwesomeIcon icon={faClock} className="mx-2" />
              <span className="text-danger font-size-12 ">
                {props.flightTime}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
export default FlightReserveMobileHeader;
