import React from "react";
import Image from "next/image";

import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import globals from "../Global";
import styles from "../../../styles/FlightReserve.module.scss";
import { getweekday } from "../../Utils/SimpleTasks";
const FlightReserveMobileHeader = (props) =>{
  if (props) {
    var flight_info = props.referenceFlight[0];
  }
  return(<>
  {flight_info.airport1 ? (
    <div className={`row visible-xs ${styles["reserve-mobile-hero"]} mx-1`} style={{height: 'auto',marginTop:'-3px !important'}} >
      <div
        className={`col-12 border-pill ${styles["border-pill-private"]}  ${styles["background-world"]} mt-0`}
      >
        <div className="row">
          <div className="col-4">
            <strong className="color-secondary font-size-15">
              {flight_info.airport1}
            </strong>
          </div>
          <div className="col-4">
            <strong className="color-secondary font-size-14">به</strong>
          </div>
          <div className="col-4">
            <strong className="color-secondary font-size-15">
              {flight_info.airport2}
            </strong>
          </div>
        </div>
        <div className="row line-2">
          <div className="col-6 mt-1rem-mobi">
            <strong className="font-size-10 center-p">
              {" "}
              شماره پرواز &nbsp;
              <span style={{color: 'red'}} className="font-size-12">
                {flight_info.flightNo}
              </span>
            </strong>
          </div>
          {/* <div className="col-4 mt-1rem-mobi padding-3pxheader">
            
          </div> */}
          <div className="col-6" style={{ marginTop: 10 }}>
            <div className="row justify-content-between">
              <img
                width=""
                height=""
                alt="بلبطجا - لوگو رزرو بلیط هواپیما"
                className="airline-icon col-4 px-0"
                src="../../../../../Images/airplane_reserve.png"
                style={{ transform: 'rotateY(180deg)' }}
              />
              <div className="col-8 px-0">
                <span className="font-size-10">ایرلاین</span>{" "}
                <strong className="text-danger font-size-12">{flight_info.airline}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="row line-3">
          <div className="col-7" style={{ marginRight: -15 }}>
            <span className="text-right">
              <FontAwesomeIcon icon={faCalendarAlt} className="mx-2" />
              <span className="text-danger font-size-12">
                {getweekday(String(flight_info.flightDay))} 
              </span>
            </span>
            <span className="mx-2 font-size-12">
              <span className="text-danger " style={{ marginRight: -12 }}>
                  {/* <br/> */}{' '}{' '}
                {String(flight_info.flightDate).replace("-", "/").replace("-", "/")}
                  {flight_info.flightDay}
                {/* <p style={{ fontSize: 15 }} className={styles["flight-day"]}>
                </p> */}
              </span>
            </span>
          </div>
          <div className="col-4" style={{ marginRight: 25 }}>
            <p className="text-left ">
              <FontAwesomeIcon icon={faClock} className="mx-2" />
              <span className="text-danger font-size-12 ">
                {flight_info.flightTime}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

  ) : null}
  </>)};
export default FlightReserveMobileHeader;
