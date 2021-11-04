import React from "react";

import globals from "../Global";
import styles from "../../../styles/FlightReserve.module.scss";

const FlightReserveDesktopHeader = (props) =>
  props.airport1 ? (
    <div className="row hidden-xs font-bold-iransanse mt-100">
      <div className="col-lg-1"></div>
      <div className="col-lg-10 border-pill">
        <div className="row">
          <div
            className={`col-lg-6 col-md-12 col-sm-12 col-12 ${styles["background-world"]}`}
          >
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                <strong className="font-size-23">{props.airport1}</strong>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                <strong className="font-size-23"> به </strong>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                <strong className="font-size-23">{props.airport2}</strong>
              </div>
            </div>
            <div className="p-10">
              <img
                width=""
                height=""
                alt="بلیطجا - لوگو رزور بلیط هواپیما"
                src="../../../../../Images/airplane_reserve.webp"
              />
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8 col-6 text-right">
                <p className="text-center no-margin">تاریخ</p>
                <p className="color-secondary text-center font-size-23 no-margin">
                  {String(props.flightDay)} &nbsp;{" "}
                  {String(props.flightDate).replace("-", "/").replace("-", "/")}
                </p>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                <p className="text-center no-margin">ساعت</p>
                <p className="color-secondary font-size-23 no-margin">
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
                  width=""
                  height=""
                  className="airline-image"
                  src={
                    globals.website + `Airlines/${props.airlineCode}.png?ver=1`
                  }
                  alt="بلیطجا - لوگو ایرلاین"
                />
                <p>
                  ایرلاین :{" "}
                  <span className="color-secondary">{props.airline}</span>
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
                    <span className="color-secondary">
                      &nbsp;{props.flightNo}
                    </span>
                  </p>
                </div>
                <div className="clear"></div>
                <div>
                  <i className="kilo-font icon-seat mx-1 font-size-30"></i>
                  <p className="font-size-14">
                    ظرفیت :
                    <span className="color-secondary">
                      &nbsp;{props.capLast}&nbsp;
                    </span>
                    صندلی خالی
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-6">
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
  ) : null;

export default FlightReserveDesktopHeader;
