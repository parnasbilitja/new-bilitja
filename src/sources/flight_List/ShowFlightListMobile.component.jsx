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
          {/* <div
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
          </div> */}

          <div
            style={{
              margin: "25px 0 15px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "8px",
            }}
          >
            <div
              style={{
                padding: "0 5px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "45px",
                  border: "2px solid #137cb6",
                  color: "#137cb6",
                  borderRadius: "512px",
                  display: "flex",
                  columnGap: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                  padding: "0 10px",
                }}
                onClick={() => {
                  this.props.filter();
                }}
              >
                فیلتر
                <svg
                  width="18px"
                  height="18px"
                  enable-background="new 0 0 32 32"
                  id="Editable-line"
                  version="1.1"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="  M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z"
                    fill="none"
                    id="XMLID_6_"
                    stroke="#137cb6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="2"
                  />
                </svg>
              </div>
            </div>
            <div
              className={styles["search-header"]}
              onClick={() => {
                this.props.search();
              }}
            >
              <div className={styles["travelinfo"]}>
                <p>
                  {this.props.flightList.length != 0
                    ? this.props.flightList[0]?.source
                    : ""}
                </p>
                <p>به</p>
                <p>
                  {this.props.flightList.length != 0
                    ? this.props.flightList[0]?.destinate
                    : ""}
                </p>
                <label htmlFor="">
                  {" "}
                  {this.props.flightList.length != 0
                    ? getweekday(this.props.flightList[0]?.flightDay)
                    : ""}{" "}
                  &nbsp;
                  {this.props.flightList.length != 0
                    ? `${this.props.flightList[0]?.flightDate}`
                    : ""}
                </label>
                {/* <p>|</p>
                              <p>{jalaliDate}</p> */}
              </div>
              <div>
                <svg
                  height="25"
                  viewBox="0 0 512 512"
                  width="25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title />
                  <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
                </svg>
              </div>
            </div>
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
                        alt="همنواز - لوگو ایرلاین"
                      />
                      <span
                        className="font-bold-iransanse"
                        style={{ fontSize: 15 }}
                      >
                        {oneFlight.airline}
                      </span>
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
