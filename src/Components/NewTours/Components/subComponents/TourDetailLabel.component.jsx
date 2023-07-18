import React from "react";
import {
  MiladiToJalaliConvertor,
  MiladiToJalaliConvertorDec,
  MiladiToJalaliConvertorInc,
} from "../../../../Utils/newTour";

import styles from "../../../../../styles/newTour/components/subComponent/TourDetailLabel.module.scss";
const TourDetailLabel = ({ flightDet, stayCount }) => {
  // console.log("asdas", flightDet);
  return (
    <div className={styles["set-request-tour"]}>
      <div className={styles["info-from"]}>
        <div className={styles["orgdest-cities"]}>
          <span className={styles["city-name"]}>{flightDet?.origin_name}</span>
          <strong>به</strong>
          <strong className={styles["city-name"]}>
            {flightDet?.destination_name}
          </strong>
        </div>
        <div className={styles["p-airline-top"]}>
          <div
            style={{
              width: "40px",
              height: "40px",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <img
              src={flightDet?.airline_thumb?.url}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <span>{flightDet?.flight.airline_name}</span>
        </div>
        <div className={styles["end-box"]}>
          <div className={styles["date"]}>
            <span>تاریخ :</span>
            <strong>{MiladiToJalaliConvertor(flightDet?.date)}</strong>
          </div>
          <div className={styles["time"]}>
            <span>ساعت :</span>
            <strong>{flightDet?.time}</strong>
          </div>
        </div>
        <div className={`${styles["end-box"]} ${styles["center"]}`}>
          <div className={styles["date"]}>
            <small>تاریخ ورود به هتل :</small>
            <strong>
              {flightDet?.checkin_tomorrow
                ? MiladiToJalaliConvertorInc(flightDet?.date)
                : MiladiToJalaliConvertor(flightDet?.date)}
            </strong>
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
        <div className={styles["orgdest-cities"]}>
          <span className={styles["city-name"]}>
            {" "}
            {flightDet?.destination_name}
          </span>
          <strong>به</strong>
          <strong className={styles["city-name"]}>
            {" "}
            {flightDet?.origin_name}
          </strong>
        </div>
        <div className={styles["p-airline-top"]}>
          <div
            style={{
              width: "40px",
              height: "40px",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <img
              src={flightDet?.flight.airline_thumb?.url}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <span>{flightDet?.flight.airline_name}</span>
        </div>
        <div className={styles["end-box"]}>
          <div className={styles["date"]}>
            <span>تاریخ :</span>
            <strong>{MiladiToJalaliConvertor(flightDet?.flight.date)}</strong>
          </div>
          <div className={styles["time"]}>
            <span>ساعت :</span>
            <strong>{flightDet?.flight.time}</strong>
          </div>
        </div>
        <div className={`${styles["end-box"]} ${styles["center"]}`}>
          <div className={styles["date"]}>
            <small>تاریخ خروج از هتل :</small>
            <strong>
              {" "}
              {flightDet?.flight.checkout_yesterday
                ? MiladiToJalaliConvertorDec(flightDet?.flight.date)
                : MiladiToJalaliConvertor(flightDet?.flight.date)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailLabel;
