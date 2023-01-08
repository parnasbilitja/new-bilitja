import React, { useEffect } from "react";

import globals from "../Global";
import styles from "../../../styles/FlightList.module.scss";

import { moneyFormat, getweekday } from "../../Utils/SimpleTasks";

const ShowFlightList = (props) => {
  // console.log("props", props);
  useEffect(() => {
    props?.flightList?.sort((a, b) => {
      if (a.priceView > b.priceView) {
        return 1;
      }
      if (a.priceView < b.priceView) {
        return -1;
      }
      return 0;
    })
  },[])
  return (
    <>
      <div>
        {props?.flightList?.map((oneFlight) => (
          <div
            key={oneFlight.flightId}
            className={styles["flight-list-one-row"]}
          >
            <div className={styles["one-row-price"]}>
              <div>
                <span style={{ fontWeight: 900 }} className="font-size-20">
                  {moneyFormat(oneFlight?.priceView)}
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
                }}>
                  <svg className={'svg-bg-white'}  id="Filled" viewBox="0 0 24 24" width="17" height="17"><path  d="M2,7.177V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V7.177a3,3,0,0,0-1.543-2.622L12.486.126a1,1,0,0,0-.972,0L3.543,4.555A3,3,0,0,0,2,7.177ZM12,5.5A1.5,1.5,0,1,1,10.5,7,1.5,1.5,0,0,1,12,5.5Z"/></svg>
                  <a className={'mr-8px'} href="">خرید بلیط</a>
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
                className={styles["img-airplan"]}
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
                <i className="bilitja icon-clock"></i>
              </div>
              <span className="font-size-18">
                {String(oneFlight.flightDateTime).split("T")[1].slice(0, 5)}
              </span>
            </div>
            <div className={styles["one-row-cap"]}>
              <div>
                <i className="bilitja icon-seat"></i>
              </div>
              <span className="font-size-18">
                {oneFlight.cap + " صندلی خالی"}
              </span>
            </div>
          </div>
  
        ))}
      </div>{" "}
    </>
  );
};
export default ShowFlightList;
