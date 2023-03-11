import React from "react";

import globals from "../Global";
import styles from "../../../styles/FlightReserve.module.scss";
import { getweekday } from "../../Utils/SimpleTasks";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FlightReserveDesktopHeader = (props) =>{
  return(<>
  {props.airport1 ? 
    <div className="row hidden-xs ">
      {/* <div className="col-lg-1"></div> */}
      <div className={`mb-2 ${styles["header-box"]}`} style={{marginTop:'-10px'}}>
        <div className="row">
          <div
            className={`col-lg-6 col-md-12 col-sm-12 col-12 ${styles["background-world"]}`}
          >
            <div className="row d-flex align-items-center justify-content-evenly" style={{position: 'relative',top: '30px'}}>
              <div className="col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center pe-1">
                <strong className="font-size-18" style={{color:'red'}}>{props.airport1}</strong>
              </div>

              <div className="border-between col-md-1 col-lg-1" style={{ transform: 'translate(0, 35px)' }}>
                {/* <svg id="Outline" viewBox="0 0 24 24" width="45" height="45"><path fill="#dbdbdb" d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" /></svg> */}
                <i className={`bilitja icon-plane-departure ${styles["form-input-icon"]} rotate-y-180`} style={{ fontSize: 45 }}></i>
              </div>

              <div className="col-lg-1 col-md-1 col-sm-1 col-4">
                <strong className="font-size-18"> به </strong>
              </div>
              <div className="border-between col-md-1 col-lg-1" style={{ transform: 'translate(-40px, 35px)' }}>
                {/* <svg id="Outline" viewBox="0 0 24 24" width="45" height="45"><path fill="#dbdbdb" d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" /></svg> */}
                <i className={`bilitja icon-plane-departure ${styles["form-input-icon"]} rotate-upsidedown-reverse`} style={{ fontSize: 45 }}></i>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center pe-3">
                <strong className="font-size-18"style={{color:'red'}}>{props.airport2}</strong>
              </div>
            </div>
            <div className={styles["data"]}>
              <div style={{ marginTop: -25 }} className="col-lg-8 col-md-8 col-sm-8 col-6 pe-4">
                <div className="d-flex align-items-start justify-content-start">
                  <div>
                    <strong className="font-size-14" style={{ marginRight: 50 }}>
                  <FontAwesomeIcon icon={faCalendarAlt} className="mx-2" />
                      تاریخ:
                    </strong>
                  </div>
                  <div className="d-flex justify-content-start align-items-start">
                    <span
                      className={`" font-size-16`} style={{color:'red'}}>
                      {getweekday(String(props.flightDay))} &nbsp;{" "}
                      {String(props.flightDate).replace("-", "/").replace("-", "/")}{" "}-
                    </span>
                    <span className="font-size-16 mb-0" style={{ marginRight: 10, color:'red' }}> {props.flightDay}</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: -25 }} className="col-lg-4 col-md-4 col-sm-4 col-6">
                <strong className="font-size-14"><FontAwesomeIcon icon={faClock} className="mx-2" />ساعت:</strong>{' '}
                <span className={`" font-size-16`} style={{color:'red'}}>
                  {props.flightTime}
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <br />
                <img
                  width="85px"
                  height="65px"
                  className="airline-image"
                  src={
                    globals.website + `Airlines/${props.airlineCode}.png?ver=1`
                  }
                  alt="بلیطجا - لوگو ایرلاین"
                  style={{ objectFit: 'scale-down' }}
                />
                <p className="pt-3">
                  <strong className="font-size-14">ایرلاین :</strong>
                  <span className="font-size-14"style={{color:'red'}}> {props.airline}</span>
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-6 second-column">
                <br />
                <div className="d-flex align-items-center justify-content-center pb-4">
                  <img
                    width=""
                    height=""
                    alt="بلیطجا - لوگو رزرو بلیط هواپیما"
                    className="pe-3"
                    src="../../../../../Images/airplane_reserve.png"
                    style={{ transform: 'rotateY(180deg)' }}
                  />
                  <p className="pt-2">
                    {" "}
                    <strong className="font-size-14">شماره پرواز :</strong>
                    <span className="font-size-14" style={{color:'red'}}>
                      &nbsp;{props.flightNo}
                    </span>
                  </p>
                </div>
                <div className="clear"></div>
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bilitja icon-seat mx-1 font-size-30 me-4"></i>
                  <p className="mb-0 pe-3">
                    <strong className="font-size-14">ظرفیت :</strong>
                    <span className="font-size-14" style={{color:'red'}}>
                      &nbsp;{props.capLast}&nbsp;
                    </span>
                    <span>
                      صندلی خالی
                    </span>
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
    : null}
  </>
  )} ;

export default FlightReserveDesktopHeader;
