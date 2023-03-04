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
              alt="بلیطجا - لوگو ایرلاین"
            />
            <div className="">
              <span className="font-size-10">ایرلاین</span>{" "}
              <strong className="text-danger font-size-12">{props.airline}</strong>
            </div>
          </div>
          <div className="col-4 mt-1rem-mobi padding-3pxheader">
            <p className="font-size-12 center-p">
              <strong className="text-danger mx-1 font-size-14">
                {props.capLast}
              </strong>
              <i className="bilitja icon-seat font-size-16"></i>
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
