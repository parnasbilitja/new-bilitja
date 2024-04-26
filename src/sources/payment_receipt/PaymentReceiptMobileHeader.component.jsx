import React from "react";
import Image from "next/image";

import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import globals from "../Global";
import styles from "../../../styles/FlightReciept.module.scss";
import stylesRes from "../../../styles/FlightReserve.module.scss";
import { getweekday } from "../../Utils/SimpleTasks";
const PaymentReciptMobileHeader = (props) => {
  if (props) {
    var flight_info = props.info.referenceFlight[0];
  }
  return (
    <div className={`row visible-xs ${stylesRes["reserve-mobile-hero"]}`}>
      <div className={`col-12 border-pill ${styles["background-world"]}`}>
        <div className="row">
          <div className="col-5 text-center">
            <strong className="color-secondary font-size-25 font-bold-iransanse">
              {flight_info.airport1}
            </strong>
          </div>
          <div className="col-2 text-center">
            <strong className="color-secondary font-size-25 font-bold-iransanse">
              به
            </strong>
          </div>
          <div className="col-5 text-center">
            <strong className="color-secondary font-size-25 font-bold-iransanse">
              {flight_info.airport2}
            </strong>
          </div>
        </div>
        <div className="row line-2">
          <div className="col-6 text-center">
            <p className="text-center font-size-12  font-bold-iransanse flight-no">
              {" "}
              شماره پرواز &nbsp;
              <span className="color-secondary font-bold-iransanse">
                {flight_info.flightNo}
              </span>
            </p>
          </div>
          <div className="col-6 text-center">
            <img
              width=""
              height=""
              className="airline-icon"
              src={
                globals.website +
                `Airlines/${flight_info.airlineCode}.png?ver=1`
              }
              alt="بلبطجا - لوگو ایرلاین"
            />
            <p className="font-size-14">
              <span className="font-bold-iransanse">ایرلاین</span> -{" "}
              <span className="color-secondary">{flight_info.airline}</span>
            </p>
          </div>
        </div>
        <div className="row line-3">
          <div className="col-8">
            <p className="text-right">
              <FontAwesomeIcon icon={faCalendarAlt} className="mx-1" />
              <span className="color-secondary">
                {" "}
                {getweekday(String(flight_info.flightDay))} &nbsp;{" "}
                {String(flight_info.flightDate)
                  .replace("-", "/")
                  .replace("-", "/")}
              </span>
            </p>
          </div>
          <div className="col-4">
            <p className="text-left">
              <FontAwesomeIcon icon={faClock} className="mx-1" />
              {flight_info.flightTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentReciptMobileHeader;
