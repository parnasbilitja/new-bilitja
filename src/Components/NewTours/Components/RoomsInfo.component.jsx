import React, { useState } from "react";
import styles from "../../../../styles/newTour/components/RoomsInfo.module.scss";
import PassengerInfo from "./subComponents/PassengerInfo.component";
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
          <th>ردیف</th>
          <th>نوع</th>
          <th>جنسیت</th>
          <th>نام</th>
          <th>نام خانوادگی</th>
          <th>ملیت</th>
          <th>کدملی</th>
          <th>تاریخ تولد</th>
          <th>شماره پاسپورت</th>
          <th>تاریخ انقضای پاسپورت</th>
          <th>قیمت</th>
        </tr>
        {props.reservedRooms?.passengers?.map((passenger, index) => {
          return (
            <tr>
              <td>
                <p style={{ fontWeight: "900", margin: 0 }}>{index + 1}</p>
              </td>
              <td>{humanType(passenger.type)}</td>
              <td>{passenger.gender === "1" ? "آقا" : "خانم"}</td>
              <td>{passenger.name}</td>
              <td>{passenger.family}</td>
              <td>{passenger.nationality === "1" ? "ایرانی" : "غیرایرانی"}</td>
              <td>{passenger.id_code}</td>
              <td>{passenger.birth_day?.replace(/-/g, "/")}</td>
              <td>{passenger.passport}</td>
              <td>{passenger.expired_passport?.replace(/-/g, "/")}</td>
              <td> {numberWithCommas(passenger.price)} تومان</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default RoomsInfo;
