import React, { useEffect } from "react";

import globals from "../Global";
import styles from "../../../styles/FlightList.module.scss";

import { moneyFormat, getweekday } from "../../Utils/SimpleTasks";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ShowFlightList = (props) => {

  useEffect(() => {
    props?.flightList?.sort((a, b) => {
      if (a.priceView > b.priceView) {
        return 1;
      }
      if (a.priceView < b.priceView) {
        return -1;
      }
      return 0;
    })
  },[])
  return (
    <>
      <div>
        {props.flightList && props?.flightList?.map((oneFlight) => (
          <div
            key={oneFlight.flightId}
            className={styles["flight-list-one-row"]}
          >
            <div className={styles["one-row-price"]}>
              <div>
                <span style={{ fontWeight: 900 }} className="font-size-20">
                  {moneyFormat(oneFlight?.priceView)}
                </span>
                <span className="text-dark font-size-14 p-1 font-bold-iransanse">
                  تـومان
                </span>
              </div>
              {/* panel */}
              {props.type == 'panel'?
              <>
              {oneFlight.kndSys == 12000?'سیستمی':
              props.azhansName.map((item)=>(
                    <span>
                      {item.kndsys === oneFlight.kndSys && item.azhansNam}
                    </span>
                ))}
              </>
              :
              // site
              <div
                style={{ marginTop: 15 }}
                className="btn-buy-action"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.setItem('priceChecker',oneFlight?.priceView)
                  props.setReserveBoxData(oneFlight);
                }}>
                <svg className={'svg-bg-white'} id="Filled" viewBox="0 0 24 24" width="17" height="17"><path d="M2,7.177V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V7.177a3,3,0,0,0-1.543-2.622L12.486.126a1,1,0,0,0-.972,0L3.543,4.555A3,3,0,0,0,2,7.177ZM12,5.5A1.5,1.5,0,1,1,10.5,7,1.5,1.5,0,0,1,12,5.5Z" /></svg>
                <a className={'mr-8px'} href="">خرید بلیط</a>
              </div>
              }
            </div>
            <div className={styles["one-row-detail"]}>
              <div>
                <span className="color-secondary font-bold-iransanse">
                  {oneFlight.source}
                </span>
                <span>به</span>
                <span className="color-secondary font-bold-iransanse">
                  {oneFlight.destinate}
                </span>
              </div>
              <div className="p-1">
                <span className="font-bold-iransanse">ش.پرواز :</span>
                <span>{oneFlight.flightNo}</span>
              </div>
            </div>
            <div className={styles["one-row-provider"]}>
              <Image
                className={styles["img-airplan"]}
                height={40}
                width={40}
                src={
                  globals.website +
                  `Airlines/${oneFlight.airlineIataCode}.png?ver=1`
                }
                alt="بلبطجا - لوگو ایرلاین"
              />
              <p className="font-bold-iransanse">{oneFlight.airline}</p>
            </div>
            <div className={styles["one-row-date"]}>
              <div className="font-size-18 font-bold-iransanse"> {getweekday(oneFlight.flightDay)}</div>
              <div style={{ marginTop: 8 }}>
                <div className="font-size-14">{oneFlight.flightDate}</div>
                <div className="font-size-14" dir="ltr">{oneFlight.flightDateM}</div>
              </div>
            </div>
            <div className={styles["one-row-time"]}>
              <div style={{marginBottom:'10px'}} >

                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
              </div>
              <span className="font-size-18 font-bold-iransanse">
                {String(oneFlight.flightDateTime).split("T")[1].slice(0, 5)}
              </span>
            </div>
            <div className={styles["one-row-cap"]}>
              <div style={{marginBottom:'10px'}}>
                <FontAwesomeIcon icon="fa-thin fa-location-dot" />
                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M560-440q-33 0-56.5-23.5T480-520v-200q0-33 23.5-56.5T560-800h80q33 0 56.5 23.5T720-720v200q0 33-23.5 56.5T640-440h-80Zm0-80h80v-200h-80v200ZM380-240q-27 0-48-15.5T303-297L200-640v-160h80v160l100 320h340v80H380Zm-60 120v-80h400v80H320Zm240-600h80-80Z"/></svg>
              </div>
              <span className="font-size-18 font-bold-iransanse">
                {oneFlight.cap + " صندلی خالی"}
              </span>
            </div>
          </div>

        ))}
      </div>{" "}
    </>
  );
};
export default ShowFlightList;
