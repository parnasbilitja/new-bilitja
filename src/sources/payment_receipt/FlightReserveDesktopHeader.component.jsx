import React from "react";

import globals from "../Global";
import styles from "../../../styles/FlightReserve.module.scss";
import { getweekday } from "../../Utils/SimpleTasks";
import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FlightReserveDesktopHeader = (props) =>{
  if (props) {
    var flight_info = props.referenceFlight[0];
  }
  return(<>
  {flight_info.airport1 ? 
    <div className="row hidden-xs">
      <div className={`mb-2 ${styles["header-box"]} mt-1`}>
        <div className="row">
          <div className={`col-lg-6 col-md-5 col-sm-6 col-6 ${styles["background-world"]} px-0`}>
            <div className="row d-flex align-items-center justify-content-evenly" style={{position: 'relative',top: '30px'}}>
              <div className="col-lg-4 col-md-4 col-sm-2 col-2 d-flex justify-content-center pe-1">
                <strong className="font-size-18" style={{color:'red'}}>{flight_info.airport1}</strong>
              </div>

              <div className="border-between col-sm-2 px-0 col-md-1 col-lg-1" style={{ transform: 'translate(0, 35px)' }}>
                <i className={`bilitja icon-plane-departure ${styles["form-input-icon"]} rotate-y-180`} style={{ fontSize: 45 }}></i>
              </div>

              <div className="col-lg-1 col-md-1 col-sm-1 px-0 col-4">
                <strong className="font-size-18"> به </strong>
              </div>
              <div className="border-between col-sm-2 px-0 col-md-1 col-lg-1" style={{ transform: 'translate(-40px, 35px)' }}>
                <i className={`bilitja icon-plane-departure ${styles["form-input-icon"]} rotate-upsidedown-reverse`} style={{ fontSize: 45 }}></i>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-2 col-2 d-flex justify-content-center pe-3">
                <strong className="font-size-18"style={{color:'red'}}>{flight_info.airport2}</strong>
              </div>
            </div>
            <div className={styles["data"]}>
              <div style={{ marginTop: -25 }} className="col-lg-8 col-md-12 col-sm-12 col-6 pe-4">
                <div className="d-flex align-items-start justify-content-start">
                  <div>
                    <strong className="font-size-14" style={{ marginRight: 0 }}>
                      <FontAwesomeIcon icon={faCalendarAlt} className="mx-2" />
                      تاریخ:
                    </strong>
                  </div>
                  <div className="d-flex justify-content-start align-items-start">
                    <span
                      className={`" font-size-16`} style={{color:'red'}}>
                      {getweekday(String(flight_info.flightDay))} &nbsp;{" "}
                      {String(flight_info.flightDate).replace("-", "/").replace("-", "/")}{" "}-
                    </span>
                    <span className="font-size-16 mb-0" style={{ marginRight: 10, color:'red' }}> {flight_info.flightDay}</span>
                  </div>
                </div>
              </div>
              {/* <div style={{ marginTop: -25 }} className="col-lg-4 col-md-4 col-sm-4 col-6">
                <strong className="font-size-14"><FontAwesomeIcon icon={faClock} className="mx-2" />ساعت:</strong>{' '}
                <span className={`" font-size-16`} style={{color:'red'}}>
                  {flight_info.flightTime}
                </span>
              </div> */}
            </div>
          </div>
          <div className="col-lg-6 col-md-7 col-sm-5 col-6">
            <div className="row">
              <div className="col-lg-3 col-md-2 col-sm-3 col-12">
                <br />
                {/* <img
                  width="85px"
                  height="65px"
                  className="airline-image"
                  src={
                    globals.website + `Airlines/${flight_info.airlineCode}.png?ver=1`
                  }
                  alt="بلیطجا - لوگو ایرلاین"
                  style={{ objectFit: 'scale-down' }}
                /> */}
                <img
                    width="135px"
                    height="65px"
                    alt="بلیطجا - لوگو رزرو بلیط هواپیما"
                    className="pe-3"
                    src="../../../../../Images/flight.png"
                  />
                <p className="pt-3">
                  <strong className="font-size-14">ایرلاین:</strong>
                  <span className="font-size-14"style={{color:'red'}}> {flight_info.airline}</span>
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-6 second-column px-0">
                <br />
                <div className="d-flex align-items-center justify-content-center pb-4">
                  
                  <p className="pt-2">
                    {" "}
                    <strong className="font-size-14">شماره پرواز :</strong>
                    <span className="font-size-14" style={{color:'red'}}>
                      &nbsp;{flight_info.flightNo}
                    </span>
                  </p>
                </div>
                <div className="clear"></div>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    
                <strong className="font-size-14"><FontAwesomeIcon icon={faClock} className="mx-2" />ساعت:</strong>{' '}
                <span className={`" font-size-16`} style={{color:'red'}}>
                  {flight_info.flightTime}
                </span>
              </div>
                  </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-6 pe-0">
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
