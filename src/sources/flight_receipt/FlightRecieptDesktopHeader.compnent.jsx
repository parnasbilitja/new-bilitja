import React from "react";
import Image from "next/image";
//import airplaneReserve from '../../../Images/airplane_reserve.webp'

//import barcode from '../../../Images/barcode.webp'
import globals from "../Global";
import styles from "../../../styles/FlightReciept.module.scss";
import { getweekday } from "../../Utils/SimpleTasks";
const FlightRecieptDesktopHeader = (props) =>
  props.airport1 ? (
    <section>
      <br />
      <div className="row hidden-xs font-bold-iransanse">
        {/* <div className="col-lg-1"></div> */}
        <div className="col-lg-12 border-pill">
          <div className="row">
            <div
              className={`col-lg-6 col-md-12 col-sm-12 col-12 ${styles["background-world"]}`}
            >
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <strong className="font-size-23">{props.airport1}</strong>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <strong className="font-size-23">به</strong>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <strong className="font-size-23">{props.airport2}</strong>
                </div>
              </div>
              <div className="p-10">
                <img
                  width=""
                  height=""
                  alt="بلیطجا- لوگو رزور بلیط هواپیما"
                  src="../../../../../Images/airplane_reserve.webp"
                />
              </div>
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8 col-6 text-right">
                  <p className="text-center no-margin">تاریخ</p>
                  <p className="color-secondary text-center font-size-23 no-margin">
                    {getweekday(String(props.flightDay))} &nbsp;
                    {String(props.flightDate)
                      .replace("-", "/")
                      .replace("-", "/")}
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
                      globals.website +
                      `Airlines/${props.airlineCode}.png?ver=1`
                    }
                    alt="بلیطجا - لوگو ایرلاین"
                  />
                  <p>
                    ایرلاین :{" "}
                    <span className="color-secondary">{props.airline}</span>
                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-6 second-column ">
                  <br />
                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <img
                      width=""
                      height=""
                      alt="بلیطجا - لوگو رزرو بلیط"
                      className="pe-3"
                      src="../../../../../Images/airplane_reserve.png"
                      style={{ transform: 'rotateY(180deg)' }}
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
                  <div className="d-flex align-items-center justify-content-center">
                    <i className="bilitja icon-seat mx-1 font-size-30 me-4"></i>
                    <p className="font-size-14 mb-0">
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
                    alt="بلیطجا - بارکد"
                    className="imgbarcode"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;

export default FlightRecieptDesktopHeader;
