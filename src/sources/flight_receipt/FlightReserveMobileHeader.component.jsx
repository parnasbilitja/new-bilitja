import React from "react";
import Image from "next/image";

import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import globals from "../Global";
import styles from "../../../styles/FlightReserve.module.scss";
import { getweekday } from "../../Utils/SimpleTasks";
const FlightReserveMobileHeader = (props) =>
  props.airport1 ? (
    <div className={`row visible-xs ${styles["reserve-mobile-hero"]} `}>
      <br />
      <div
        className={`col-12 border-pill  ${styles["border-pill-private"]}  ${styles["background-world"]}`}
      >
        <div className="row">
          <div className="col-4">
            <strong className="color-secondary font-size-25">
              {props.airport1}
            </strong>
          </div>
          <div className="col-4">
            <strong className="color-secondary font-size-25">به</strong>
          </div>
          <div className="col-4">
            <strong className="color-secondary font-size-25">
              {props.airport2}
            </strong>
          </div>
        </div>
        <div className="row line-2">
          <div className="col-4 pl-0">
            <p className="text-right font-size-12 center-p">
              {" "}
              شماره پرواز &nbsp;
              <span className="color-secondary font-bold-iransanse">
                {props.flightNo}
              </span>
            </p>
          </div>
          <div className="col-4" style={{ marginTop: 51 }}>
            <img
              width=""
              height=""
              className="airline-icon"
              src={globals.website + `Airlines/${props.airlineCode}.png?ver=1`}
              alt="بلبطجا - لوگو ایرلاین"
            />
            <p className="font-size-14">
              <span className="font-bold-iransanse">ایرلاین</span>{" "}
              <div className="color-secondary">{props.airline}</div>
            </p>
          </div>
          <div className="col-4 padding-3px">
            <p className="font-size-14 center-p">
              <span className="text-danger font-bold-iransanse mx-1 font-size-14">
                {props.capLast}
              </span>
              <i className="bilitja icon-seat mx-1 font-size-24"></i>
              صندلی خالی
            </p>
          </div>
        </div>
        <div className="row line-3">
          <div className="col-8" style={{ marginRight: -40 }}>
            <span className="text-right">
              <FontAwesomeIcon icon={faCalendarAlt} className="mx-2" />
              <span className="color-secondary">
                {getweekday(String(props.flightDay))} &nbsp;{" "}
              </span>
            </span>
            <span className="text-right mx-2">
              <span className="color-secondary" style={{ marginRight: -15 }}>
                {String(props.flightDate).replace("-", "/").replace("-", "/")}
                <p style={{ fontSize: 15 }} className={styles["flight-day"]}>
                  {props.flightDay}
                </p>
              </span>
            </span>
          </div>
          <div className="col-4" style={{ marginRight: 25 }}>
            <p className="text-left">
              <FontAwesomeIcon icon={faClock} className="mx-2" />
              {props.flightTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
export default FlightReserveMobileHeader;
