import React from "react";
import Image from "next/image";
//import airplaneReserve from '../../../Images/airplane_reserve.webp'
//import airplaneReserveSmall from '../../../Images/airplane_reserve_small.webp'
//import barcode from '../../../Images/barcode.webp'
import globals from "../Global";
import styles from "../../../styles/FlightReciept.module.scss";

const PaymentReceiptDesktopHeader = (props) => {
  if (props) {
    var flight_info = props.info.referenceFlight[0];
  }
  return (
    <section className="">
      <div className="row hidden-xs font-bold-iransanse">
        <div className="col-lg-1"></div>
        <div className="col-lg-10 border-pill">
          <div className="row">
            <div
              className={`col-lg-6 col-md-12 col-sm-12 col-12 ${styles["background-world"]}`}
            >
              <div className="row mt-3">
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <strong className="font-size-23 text-danger">
                    {flight_info.airport1}
                  </strong>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <strong className="font-size-23">به</strong>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                  <strong className="font-size-23 text-danger">
                    {flight_info.airport2}
                  </strong>
                </div>
              </div>
              <div className="p-10">
                <img
                  width=""
                  height=""
                  alt="بلیطجا - رزرو بلیط هواپیما"
                  src="../../../../../Images/airplane_reserve.webp"
                />
              </div>
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-8 col-6 text-right">
                  <p className="text-center no-margin">تاریخ</p>
                  <p className="color-secondary text-center font-size-23 no-margin">
                    {String(flight_info.flightDay)} &nbsp;
                    {String(flight_info.flightDate)
                      .replace("-", "/")
                      .replace("-", "/")}
                  </p>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-4 col-6 text-center">
                  <p className="text-center no-margin">ساعت</p>
                  <p className="color-secondary font-size-23 no-margin">
                    {flight_info.flightTime}
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
                      `Airlines/${flight_info.airlineCode}.png?ver=1`
                    }
                    alt="بلیطجا - لوگو ایرلاین"
                  />
                  <p>
                    ایرلاین :{" "}
                    <span className="color-secondary">
                      {flight_info.airline}
                    </span>
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
                        &nbsp;{flight_info.flightNo}
                      </span>
                    </p>
                  </div>
                  <div className="clear"></div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                  <img
                    width=""
                    height=""
                    src="../../../../../Images/barcode.webp"
                    className="imgbarcode barcode-img"
                    alt="بلیطجا - بارکد"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentReceiptDesktopHeader;
