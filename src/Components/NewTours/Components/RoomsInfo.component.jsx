import React from "react";
import styles from "../../../../styles/newTour/components/RoomsInfo.module.scss";

import { numberWithCommas } from "../../../Utils/newTour";
const RoomsInfo = (props) => {
  console.log("from rooms info", props);

  const humanType = (type) => {
    switch (type) {
      case "adl":
        return "بزرگسال";
      case "inf":
        return "نوزاد";
      case "chd":
        return "کودک";
      case "ext":
        return "تخت اضافه";
    }
  };
  return (
    <>
      <table className={styles["passengers_container"]}>
        <tr>
          <th className={styles["th"]}>ردیف</th>
          <th className={styles["th"]}>نوع</th>
          <th className={styles["th"]}>جنسیت</th>
          <th className={styles["th"]}>نام</th>
          <th className={styles["th"]}>نام خانوادگی</th>
          <th className={styles["th"]}>ملیت</th>
          {props.is_domestic ? <th className={styles["th"]}>کدملی</th> : null}
          <th className={styles["th"]}>تاریخ تولد</th>
          <th className={styles["th"]}>شماره پاسپورت</th>
          <th className={styles["th"]}>تاریخ انقضای پاسپورت</th>
          <th className={styles["th"]}>قیمت</th>
        </tr>
        {props.reservedRooms?.passengers?.map((passenger, index) => {
          return (
            <tr>
              <td
                className={styles["td"]}
                style={{ backgroundColor: "#f8f9fd" }}
              >
                <p style={{ fontWeight: "900", margin: 0 }}>{index + 1}</p>
              </td>
              <td className={styles["td"]}>{humanType(passenger.type)}</td>
              <td className={styles["td"]}>
                {passenger.gender === "1" ? "آقا" : "خانم"}
              </td>
              <td className={styles["td"]}>{passenger.name}</td>
              <td className={styles["td"]}>{passenger.family}</td>
              <td className={styles["td"]}>
                {passenger.nationality === "1" ? "ایرانی" : "غیرایرانی"}
              </td>
              {props.is_domestic ? (
                <td className={styles["td"]}>{passenger.id_code}</td>
              ) : null}
              <td className={styles["td"]}>
                {passenger.birth_day?.replace(/-/g, "/")}
              </td>
              <td className={styles["td"]}>{passenger.passport}</td>
              <td className={styles["td"]}>
                {passenger.expired_passport?.replace(/-/g, "/")}
              </td>
              <td className={styles["td"]}>
                {" "}
                {numberWithCommas(passenger.price)} تومان
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default RoomsInfo;
