import React from "react";

import globals from "../Global";
import styles from "../../../styles/FlightReserve.module.scss";
import { getweekday } from "../../Utils/SimpleTasks";

const FlightReserveDesktopHeader = (props) =>
  props.airport1 ? (
    <div className="row hidden-xs font-bold-iransanse mt-4">
      {/* <div className="col-lg-1"></div> */}
      <div className={styles["header-box"]}>
        <div className="row">
          <div
            className={`col-lg-6 col-md-12 col-sm-12 col-12 ${styles["background-world"]}`}
          >
            <div className="row d-flex align-items-center">
              <div className="col-lg-3 col-md-3 col-sm-3 col-4 d-flex justify-content-center pe-5">
                <strong className="font-size-23">{props.airport1}</strong>
              </div>

              <div className="border-between col-md-2 col-lg-2">
                <svg id="Outline" viewBox="0 0 24 24" width="45" height="45"><path fill="#dbdbdb" d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" /></svg>
              </div>

              <div className="col-lg-1 col-md-1 col-sm-1 col-4">
                <strong className="font-size-23"> به </strong>
              </div>
              <div className="border-between col-md-2 col-lg-2">
                <svg id="Outline" viewBox="0 0 24 24" width="45" height="45"><path fill="#dbdbdb" d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" /></svg>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-3 col-4 d-flex justify-content-center pe-5">
                <strong className="font-size-23">{props.airport2}</strong>
              </div>
            </div>
            <div className="p-15">
              <img
                style={{ marginTop: 20, transform: 'translate(28px, 26px)' }}
                alt="بلیطجا - لوگو رزور بلیط هواپیما"
                src="../../../../../Images/airplane_reserve.webp"
              />
            </div>
            <div className={styles["data"]}>
              <div style={{ marginTop: -25 }} className="col-lg-8 col-md-8 col-sm-8 col-6 ">
                <p style={{ marginLeft: 250 }} className="font-size-20">
                  تاریخ
                </p>
                <p
                  className="color-secondary font-size-17"
                  style={{ marginLeft: 250 }}
                >
                  {getweekday(String(props.flightDay))} &nbsp;{" "}
                  {String(props.flightDate).replace("-", "/").replace("-", "/")}
                  <p style={{ fontSize: 15 }}> {props.flightDay}</p>
                </p>
              </div>

              <div style={{ marginTop: -25 }} className="col-lg-4 col-md-4 col-sm-4 col-6">
                <p className="font-size-23">ساعت</p>
                <p className="color-secondary font-size-18 ">
                  {props.flightTime}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <br />
                <img
                  width="70%"
                  height=""
                  className="airline-image"
                  src={
                    globals.website + `Airlines/${props.airlineCode}.png?ver=1`
                  }
                  alt="بلیطجا - لوگو ایرلاین"
                />
                <p>
                  ایرلاین :
                  <span className="color-secondary"> {props.airline}</span>
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-6 second-column">
                <br />
                <div>
                  <img
                    width=""
                    height=""
                    alt="بلیطجا - لوگو رزرو بلیط هواپیما"
                    src="../../../../../Images/airplane_reserve.webp"
                  />
                  <p>
                    {" "}
                    شماره پرواز :
                    <span className="color-secondary iranBold">
                      &nbsp;{props.flightNo}
                    </span>
                  </p>
                </div>
                <div className="clear"></div>
                <div>
                  <i className="bilitja icon-seat mx-1 font-size-30"></i>
                  <p className="font-size-14">
                    ظرفیت :
                    <span className="color-secondary iranBold">
                      &nbsp;{props.capLast}&nbsp;
                    </span>
                    صندلی خالی
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                <div className={styles["barcod"]}>
                  <img
                    width=""
                    height=""
                    src="../../../../../Images/barcode.webp"
                    className="imgbarcode"
                    alt="بلیطجا - بارکد "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;

export default FlightReserveDesktopHeader;
