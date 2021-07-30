import React from "react";
import Image from "next/image";
//import airplaneReserveSmall from '../../../Images/airplane_reserve_small.png'
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import globals from "../Global";
import styles from "../../../styles/FlightReciept.module.scss";
import stylesRes from "../../../styles/FlightReserve.module.scss";
const FlightReceiptMobileHero = (props) =>
  props.airport1 ? (
    <div className={`row visible-xs ${stylesRes["reserve-mobile-hero"]}`}>
      <div className={`col-12 border-pill ${styles["background-world"]} `}>
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
          <div className="col-4" style={{ paddingLeft: 0 }}>
            <p className="text-right font-size-12 center-p">
              {" "}
              شماره پرواز &nbsp;
              <span className="color-secondary font-bold-iransanse">
                {props.flightNo}
              </span>
            </p>
          </div>
          <div className="col-4">
            <img
              className="airline-icon"
              src={globals.website + `Airlines/${props.airlineCode}.png?ver=1`}
            />
            <p className="font-size-14">
              <span className="font-bold-iransanse">ایرلاین</span> -{" "}
              <span className="color-secondary">{props.airline}</span>
            </p>
          </div>
          <div className="col-4">
            <p className="font-size-12 center-p">
              <span className="text-danger font-bold-iransanse mx-1 font-size-14">
                {props.capLast}
              </span>
              <i
                className="kilo-font icon-seat mx-1"
                style={{ fontSize: "23px" }}
              ></i>
              صندلی خالی
            </p>
          </div>
        </div>
        <div className="row line-3">
          <div className="col-8">
            <p className="text-right">
              <FontAwesomeIcon icon={faCalendarAlt} className="mx-1" />
              <span className="color-secondary">
                {" "}
                {String(props.flightDay)} &nbsp;{" "}
                {String(props.flightDate).replace("-", "/").replace("-", "/")}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p className="text-left">
              <FontAwesomeIcon icon={faClock} className="mx-1" />
              {props.flightTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
export default FlightReceiptMobileHero;
