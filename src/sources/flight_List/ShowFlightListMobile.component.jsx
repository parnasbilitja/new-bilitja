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

          {/*<div*/}
          {/*  style={{*/}
          {/*    margin: "25px 0 15px 0",*/}
          {/*    display: "flex",*/}
          {/*    justifyContent: "center",*/}
          {/*    alignItems: "center",*/}
          {/*    columnGap: "8px",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <div*/}
          {/*    style={{*/}
          {/*      padding: "0 5px",*/}
          {/*      display: "flex",*/}
          {/*      justifyContent: "space-between",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <div*/}
          {/*      style={{*/}
          {/*        width: "90px",*/}
          {/*        height: "45px",*/}
          {/*        border: "2px solid #e20000",*/}
          {/*        color: "#e20000",*/}
          {/*        borderRadius: "512px",*/}
          {/*        display: "flex",*/}
          {/*        columnGap: "8px",*/}
          {/*        justifyContent: "center",*/}
          {/*        alignItems: "center",*/}
          {/*        fontSize: "16px",*/}
          {/*        padding: "0 10px",*/}
          {/*      }}*/}
          {/*      onClick={() => {*/}
          {/*        this.props.filter();*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      فیلتر*/}
          {/*      <svg*/}
          {/*        width="18px"*/}
          {/*        height="18px"*/}
          {/*        enableBackground="new 0 0 32 32"*/}
          {/*        id="Editable-line"*/}
          {/*        version="1.1"*/}
          {/*        viewBox="0 0 32 32"*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*      >*/}
          {/*        <path*/}
          {/*          d="  M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z"*/}
          {/*          fill="none"*/}
          {/*          id="XMLID_6_"*/}
          {/*          stroke="#e20000"*/}
          {/*          strokeLinecap="round"*/}
          {/*          strokeLinejoin="round"*/}
          {/*          strokeMiterlimit="10"*/}
          {/*          strokeWidth="2"*/}
          {/*        />*/}
          {/*      </svg>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div*/}
          {/*    className={styles["search-header"]}*/}
          {/*    onClick={() => {*/}
          {/*      this.props.search();*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <div className={styles["travelinfo"]}>*/}
          {/*      <p>*/}
          {/*        {this.props.flightList.length != 0*/}
          {/*          ? this.props.flightList[0]?.source*/}
          {/*          : ""}*/}
          {/*      </p>*/}
          {/*      <p>به</p>*/}
          {/*      <p>*/}
          {/*        {this.props.flightList.length != 0*/}
          {/*          ? this.props.flightList[0]?.destinate*/}
          {/*          : ""}*/}
          {/*      </p>*/}
          {/*      <label htmlFor="">*/}
          {/*        {" "}*/}
          {/*        {this.props.flightList.length != 0*/}
          {/*          ? getweekday(this.props.flightList[0]?.flightDay)*/}
          {/*          : ""}{" "}*/}
          {/*        &nbsp;*/}
          {/*        {this.props.flightList.length != 0*/}
          {/*          ? `${this.props.flightList[0]?.flightDate}`*/}
          {/*          : ""}*/}
          {/*      </label>*/}
          {/*      /!* <p>|</p>*/}
          {/*                    <p>{jalaliDate}</p> *!/*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*      <svg*/}
          {/*        height="25"*/}
          {/*        viewBox="0 0 512 512"*/}
          {/*        width="25"*/}
          {/*        xmlns="http://www.w3.org/2000/svg"*/}
          {/*      >*/}
          {/*        <title />*/}
          {/*        <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />*/}
          {/*      </svg>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
                          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
                              <path
                                  d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/>
                          </svg>
                          <span
                              style={{fontSize: 15}}
                              className="font-size-18 font-bold-iransanse"
                          >
                        {String(oneFlight.flightDateTime)
                            .split("T")[1]
                            .slice(0, 5)}
                      </span>


                      </div>
                      <div className={styles["mobile-one-row-cap"]}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
                              <path
                                  d="M560-440q-33 0-56.5-23.5T480-520v-200q0-33 23.5-56.5T560-800h80q33 0 56.5 23.5T720-720v200q0 33-23.5 56.5T640-440h-80Zm0-80h80v-200h-80v200ZM380-240q-27 0-48-15.5T303-297L200-640v-160h80v160l100 320h340v80H380Zm-60 120v-80h400v80H320Zm240-600h80-80Z"/>
                          </svg>
                          <span
                              style={{fontSize: 15}}
                              className="font-bold-iransanse"
                          >
                        {oneFlight.cap}
                      </span>


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
