import React from "react";
import styles from "../../../../styles/newTour/components/RoomsInfo.module.scss";
import PassengerInfo from "./subComponents/PassengerInfo.component";
const RoomsInfo = (props) => {
  console.log("from rooms info", props);
  return (
    <>
      <div className={styles["box-room"]}>
        <div
          className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
        >
          <div className={styles["box-room-Det-name"]}>
            <div className={styles["circle"]}></div>
            <h2>{props.roomName}</h2>
          </div>
        </div>

        <table className={styles["passengers_container"]}>
          <tr>
            <th>جنسیت</th>
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>ملیت</th>
            <th>کدملی</th>
            <th>تاریخ تولد</th>
            <th>شماره پاسپورت</th>
            <th>تاریخ انقضای پاسپورت</th>
          </tr>
          {props.reservedRooms?.passengers?.map((passenger) => {
            return (
              <tr>
                <td>{passenger.gender === "1" ? "آقا" : "خانم"}</td>
                <td>{passenger.name}</td>
                <td>{passenger.family}</td>
                <td>
                  {passenger.nationality === "1" ? "ایرانی" : "غیرایرانی"}
                </td>
                <td>{passenger.id_code}</td>
                <td>{passenger.birth_day?.replace(/-/g, "/")}</td>
                <td>{passenger.passport}</td>
                <td>{passenger.expired_passport?.replace(/-/g, "/")}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default RoomsInfo;
