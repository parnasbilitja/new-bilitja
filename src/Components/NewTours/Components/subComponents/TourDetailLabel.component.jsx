import React from "react";
import { MiladiToJalaliConvertor } from "../../../../Utils/newTour";

import styles from "../../../../../styles/newTour/components/subComponent/TourDetailLabel.module.scss";
const TourDetailLabel = ({ flightDet, stayCount }) => {
  const dateReform = (date) => {
    return date?.slice(0, 5);
  };
  // console.log("asdas", flightDet);
  return (
    <div className={styles["set-request-tour"]}>
      <div className={styles["info-from"]}>
        <div className={`${styles["airline_info"]} ${styles["col-right"]}`}>
          <p>پرواز رفت</p>
          <div className={styles["p-airline-top"]}>
            <div
              style={{
                width: "45px",
                height: "45px",
                overflow: "hidden",
                borderRadius: "50%",
                marginBottom: "4px",
              }}
            >
              <img
                src={flightDet?.airline_thumb?.url}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <span>{flightDet?.flight.airline_name}</span>
          </div>
        </div>
        <div className={styles["flight_info_container"]}>
          <div className={styles["flight_info"]}>
            <div className={styles["orgdest-cities"]}>
              <span className={styles["city-name"]}>
                {flightDet?.origin_name}
              </span>
              <p>به</p>
              <span className={styles["city-name"]}>
                {flightDet?.destination_name}
              </span>
            </div>

            <div className={styles["end-box"]}>
              <div className={styles["date"]}>
                <span>تاریخ :</span>
                <strong>{MiladiToJalaliConvertor(flightDet?.date)}</strong>
              </div>
              <div className={styles["time"]}>
                <span>ساعت :</span>
                <strong>{dateReform(flightDet?.time)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["info-time"]}>
        <div className={styles["nightlogo"]}>
          <img src="https://hotelobilit.com/assets/img/moon.png" />
        </div>
        <span className={styles["title"]}>مدت اقامت:</span>
        <span className={styles["text"]}>
          {stayCount} شب و {+stayCount + 1} روز
        </span>
      </div>

      <div className={styles["info-from"]}>
        <div className={styles["flight_info_container"]}>
          <div className={styles["flight_info"]}>
            <div className={styles["orgdest-cities"]}>
              <span className={styles["city-name"]}>
                {flightDet?.destination_name}
              </span>
              <p>به</p>
              <span className={styles["city-name"]}>
                {flightDet?.origin_name}
              </span>
            </div>

            <div className={styles["end-box"]}>
              <div className={styles["date"]}>
                <span>تاریخ :</span>
                <strong>
                  {MiladiToJalaliConvertor(flightDet?.flight.date)}
                </strong>
              </div>
              <div className={styles["time"]}>
                <span>ساعت :</span>
                <strong>{dateReform(flightDet?.flight.time)}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles["airline_info"]} ${styles["col-left"]}`}>
          <p>پرواز برگشت</p>

          <div className={styles["p-airline-top"]}>
            <div
              style={{
                width: "45px",
                height: "45px",
                overflow: "hidden",
                borderRadius: "50%",
                marginBottom: "4px",
              }}
            >
              <img
                src={flightDet?.airline_thumb?.url}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
            <span>{flightDet?.flight.airline_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailLabel;
