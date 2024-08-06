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
                <strong className="font-size-18" style={{color:'#e20000'}}>{props.airport1}</strong>
              </div>

              <div className="border-between col-md-1 col-lg-1" style={{ transform: 'translate(0, 35px)' }}>
                {/* <svg id="Outline" viewBox="0 0 24 24" width="45" height="45"><path fill="#dbdbdb" d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" /></svg> */}
                {/*<i className={`bilitja icon-plane-departure ${styles["form-input-icon"]} rotate-y-180`} style={{ fontSize: 45 }}></i>*/}
                <svg xmlns="http://www.w3.org/2000/svg" style={{transform:'rotateY(180deg)'}} height="50" viewBox="0 -960 960 960" width="50"><path d="M120-120v-80h720v80H120Zm74-200L80-514l62-12 70 62 192-52-162-274 78-24 274 246 200-54q32-9 58 12t26 56q0 22-13.5 39T830-492L194-320Z"/></svg>
              </div>

              <div className="col-lg-1 col-md-1 col-sm-1 col-4">
                <strong className="font-size-18"> به </strong>
              </div>
              <div className="border-between col-md-1 col-lg-1" style={{ transform: 'translate(-40px, 35px)' }}>
                {/* <svg id="Outline" viewBox="0 0 24 24" width="45" height="45"><path fill="#dbdbdb" d="M.88,14.09,4.75,18a1,1,0,0,0,1.42,0h0a1,1,0,0,0,0-1.42L2.61,13H23a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H2.55L6.17,7.38A1,1,0,0,0,6.17,6h0A1,1,0,0,0,4.75,6L.88,9.85A3,3,0,0,0,.88,14.09Z" /></svg> */}
                {/*<i className={`bilitja icon-plane-departure ${styles["form-input-icon"]} rotate-upsidedown-reverse`} style={{ fontSize: 45 }}></i>*/}
                <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 -960 960 960" width="50" ><path d="M754-324 120-500v-220l60 20 28 84 192 54v-318l80 20 110 350 200 56q23 6 36.5 24.5T840-388q0 33-27 53t-59 11ZM120-120v-80h720v80H120Z"/></svg>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-4 col-4 d-flex justify-content-center pe-3">
                <strong className="font-size-18"style={{color:'#e20000'}}>{props.airport2}</strong>
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
                      className={`" font-size-16`} style={{color:'#e20000'}}>
                      {getweekday(String(props.flightDay))} &nbsp;{" "}
                      {String(props.flightDate).replace("-", "/").replace("-", "/")}{" "}-
                    </span>
                    <span className="font-size-16 mb-0" style={{ marginRight: 10, color:'#e20000' }}> {props.flightDay}</span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: -25 }} className="col-lg-4 col-md-4 col-sm-4 col-6">
                <strong className="font-size-14"><FontAwesomeIcon icon={faClock} className="mx-2" />ساعت:</strong>{' '}
                <span className={`" font-size-16`} style={{color:'#e20000'}}>
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
                  <span className="font-size-14"style={{color:'#e20000'}}> {props.airline}</span>
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
                    <span className="font-size-14" style={{color:'#e20000'}}>
                      &nbsp;{props.flightNo}
                    </span>
                  </p>
                </div>
                <div className="clear"></div>
                <div className="d-flex align-items-center justify-content-center">
                  <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M560-440q-33 0-56.5-23.5T480-520v-200q0-33 23.5-56.5T560-800h80q33 0 56.5 23.5T720-720v200q0 33-23.5 56.5T640-440h-80Zm0-80h80v-200h-80v200ZM380-240q-27 0-48-15.5T303-297L200-640v-160h80v160l100 320h340v80H380Zm-60 120v-80h400v80H320Zm240-600h80-80Z"/></svg>

                  <p className="mb-0 pe-3">
                    <strong className="font-size-14">ظرفیت :</strong>
                    <span className="font-size-14" style={{color:'#e20000'}}>
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
