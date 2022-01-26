import React from "react";

import globals from "../Global";

import styles from "../../../styles/FlightList.module.scss";

import { moneyFormat, getweekday } from "../../Utils/SimpleTasks";
// import Listtiketssold from "../listtiketssold/Listtiketssold";
// just a function component to show existing flights

const ShowFlightList = (props) => {
  return (
    <div>
      {/* <Listtiketssold /> */}
      {
        // .filter(x=>x.kndSys==3)
        props.flightList.map((oneFlight) => (
          <div
            key={oneFlight.flightId}
            className={styles["flight-list-one-row"]}
          >
            <div className={styles["one-row-price"]}>
              <div>
                <span style={{ fontWeight: 900 }} className="font-size-20">
                  {moneyFormat(oneFlight.priceView)}
                </span>
                <span style={{ color: "blue" }} className=" font-size-14 p-1">
                  تومان
                </span>
              </div>
              <div
                style={{ marginTop: 15 }}
                className="btn-buy-action"
                onClick={(e) => {
                  e.preventDefault();
                  props.setReserveBoxData(oneFlight);
                }}
              >
                <i className="kilo-font icon-refrence"></i>
                <a href="">خرید بلیط</a>
              </div>
            </div>
            <div className={styles["one-row-detail"]}>
              <div>
                <span className="color-secondary font-bold-iransanse">
                  {oneFlight.source}
                </span>
                <span>به</span>
                <span className="color-secondary font-bold-iransanse">
                  {oneFlight.destinate}
                </span>
              </div>
              <div className="p-1">
                <span>ش.پرواز : {oneFlight.flightNo}</span>
              </div>
            </div>

            <div className={styles["one-row-provider"]}>
              <img
                src={
                  globals.website +
                  `Airlines/${oneFlight.airlineIataCode}.png?ver=1`
                }
                alt="بلیطجا - لوگو ایرلاین"
              />
              <p>{oneFlight.airline}</p>
            </div>

            <div className={styles["one-row-date"]}>
              <div> {getweekday(oneFlight.flightDay)}</div>
              <div style={{ marginTop: 8 }}>
                <div>{oneFlight.flightDate}</div>
                <div dir="ltr">{oneFlight.flightDateM}</div>
              </div>
            </div>
            <div className={styles["one-row-time"]}>
              <div>
                <i className="kilo-font icon-clock"></i>
              </div>
              <span className="font-size-18">
                {String(oneFlight.flightDateTime).split("T")[1].slice(0, 5)}
              </span>
            </div>
            <div className={styles["one-row-cap"]}>
              <div>
                <i className="kilo-font icon-seat"></i>
              </div>
              <span className="font-size-18">
                {oneFlight.cap + " صندلی خالی"}
              </span>
            </div>
          </div>
        ))
      }
    </div>
  );
};
export default ShowFlightList;
