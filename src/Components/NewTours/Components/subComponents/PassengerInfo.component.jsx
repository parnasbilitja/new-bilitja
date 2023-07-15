import React from "react";
import styles from "../../../../../styles/newTour/components/subComponent/PassengerInfo.module.scss";
const PassengerInfo = ({ passenger }) => {
  //   console.log(props);
  return (
    <tr className={styles["passenger_container"]}>
      <td>{passenger.gender === "1" ? "آقا" : "خانم"}</td>
      <td>{passenger.name}</td>
      <td>{passenger.family}</td>
      <td>{passenger.nationality === "1" ? "ایرانی" : "غیرایرانی"}</td>
      <td>{passenger.id_code}</td>
      <td>{passenger.birth_day}</td>
      <td>{passenger.passport}</td>
      <td>{passenger.expired_passport}</td>
    </tr>
  );
};

export default PassengerInfo;
