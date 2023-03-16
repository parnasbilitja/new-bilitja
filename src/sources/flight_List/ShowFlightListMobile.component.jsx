import React from "react";
import styles from "../../../styles/MobileFlightList.module.scss";

import globals from "../Global";
import { moneyFormat, getweekday } from "../../Utils/SimpleTasks";
import Scrolltoprefresh from "../component/Scrolltoprefresh";
import Image from "next/image";

class ShowFlightListMobile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.flightList);
    {
    }
    return (
      <div className={`${styles["container-flight-list-mobile"]} `}>
        <Scrolltoprefresh />
        <div>
          <div
            className={` ${styles["mobile-flight-list-header"]} font-bold-iransanse`}
          >
            <p className="font-light-iransans pt-1 pb-3">
              خريد بليط هواپيما{" "}
              <span className="color-secondary font-bold-iransanse">
                {this.props.flightList.length != 0
                  ? this.props.flightList[0]?.source
                  : ""}
              </span>{" "}
              به{" "}
              <span className="color-secondary font-bold-iransanse">
                {this.props.flightList.length != 0
                  ? this.props.flightList[0]?.destinate
                  : ""}
              </span>
            </p>
            <p className={`${styles["date-style"]}`}>
              {this.props.flightList.length != 0
                ? getweekday(this.props.flightList[0]?.flightDay)
                : ""}{" "}
              &nbsp;
              {this.props.flightList.length != 0
                ? `${this.props.flightList[0]?.flightDate}`
                : ""}
            </p>
          </div>
          {this.props.flightList.length != 0
            ? this.props.flightList.map((oneFlight) => (
              <div
                key={oneFlight.flightId}
                className={styles["mobile-flight-list-one-row"]}
              >
                <div className={styles["mobile-one-row-price"]}>
                  <div style={{ marginTop: 9 }}>
                    <span className="font-size-15 color-secondary font-bold-iransanse">
                      {moneyFormat(oneFlight.priceView)}
                    </span>
                    <span className="color-black font-size-12"> تومان</span>
                  </div>
                  <div
                    className="btn-buy-action"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.setReserveBoxData(oneFlight);
                    }}
                  >
                    <i className="bilitja icon-refrence"></i>
                    <a href="">خرید آنلاین</a>
                  </div>
                </div>

                <div>
                  <div
                    // style={{ marginBottom: 18 }}
                    className={`${styles["mobile-one-row-provider"]} d-flex align-items-center justify-content-center`}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={
                        globals.website +
                        `Airlines/${oneFlight.airlineIataCode}.png?ver=1`
                      }
                      alt="بلیطجا - لوگو ایرلاین"
                    />
                    <span className="font-bold-iransanse" style={{ fontSize: 15 }}>{oneFlight.airline}</span>
                  </div>

                  <div className={styles["mobile-one-row-flight-number"]}>
                    <span>شماره پرواز </span>
                    <span
                      style={{ fontSize: 15 }}
                      className="font-bold-iransanse"
                    >
                      {oneFlight.flightNo}
                    </span>
                  </div>
                </div>

                <div>
                  <div className={styles["mobile-one-row-time"]}>
                    <span
                      style={{ fontSize: 15 }}
                      className="font-size-18 font-bold-iransanse"
                    >
                      {String(oneFlight.flightDateTime)
                        .split("T")[1]
                        .slice(0, 5)}
                    </span>
                    <i className="bilitja icon-clock"></i>
                  </div>
                  <div className={styles["mobile-one-row-cap"]}>
                    <span
                      style={{ fontSize: 15 }}
                      className="font-bold-iransanse"
                    >
                      {oneFlight.cap}
                    </span>
                    <i className="bilitja icon-seat"></i>

                    <span className="font-size-18">&nbsp;صندلی خالی</span>
                  </div>
                </div>
              </div>
            ))
            : null}
        </div>
      </div>
    );
  }
}

export default ShowFlightListMobile;
