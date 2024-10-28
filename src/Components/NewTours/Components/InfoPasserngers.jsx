import React, { useEffect, useState } from "react";
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
import {
  // chdPrcGen,
  // extBedPrcGen, numberRounder,
  numberWithCommas,
  // roomPrcGen,
} from "../../../Utils/newTour";

import PassengerForm from "./subComponents/PassengerForm.component";
import {useRouter} from "next/router";

const InfoPasserngers = (props) => {
  const router=useRouter()
  // useEffect(() => {
  //
  // }, [router]);

  const [chdPrc, setChdPrc] = useState("");
  const [adlPrc, setAdlPrc] = useState("");
  const [infPrc, setinfPrc] = useState("");
  const [extPrc, setextPrc] = useState("");
  const [rooms, setRooms] = useState("");

  const totalPrice = (adlPrc, chdPrc, infPrc, extPrc) => {
    const adlCount = props.room?.passengers.filter(
      (pass) => pass.type === "adl"
    ).length;
    const chdCount = props.room?.passengers.filter(
      (pass) => pass.type === "chd"
    ).length;
    const infCount = props.room?.passengers.filter(
      (pass) => pass.type === "inf"
    ).length;
    const extCount = props.room?.passengers.filter(
      (pass) => pass.type === "ext"
    ).length;
    let totAdlPrc = adlPrc * (typeof adlCount === "number" ? adlCount : 0);
    let totChdPrc = chdPrc * (typeof chdCount === "number" ? chdCount : 0);
    let totInfPrc = infPrc * (typeof infCount === "number" ? infCount : 0);
    let totExtPrc = extPrc * (typeof extCount === "number" ? extCount : 0);
    return totAdlPrc + totChdPrc + totInfPrc + totExtPrc;
  };
//
//   const PrcRoomGen=(flight,services)=>{
//     // debugger
//
//     let flifgtsPrc=flight?.departure?.adl_price + flight?.return?.adl_price
//
//     let totalPrc=0
//     totalPrc+=flifgtsPrc
//
//     services.map(service=>{
//         totalPrc+=service?.rate
//     })
//
//     return totalPrc
//
// }


  const prcTypeBase = (type) => {
    switch (type) {
      case "adl":
        return adlPrc;
      case "chd":
        return chdPrc;
      case "inf":
        return infPrc;
      case "ext":
        return extPrc;

      default:
        0;
        break;
    }
  };

  const roomprcFinder = (rooms, selectedroom) => {
    // debugger
    const foundRoom = rooms.filter(
      (room) => room.room_type_id === selectedroom.room_type_id
    );
    return roomPrcGen(...foundRoom, props.flightDet);
  };

  // useEffect(() => {
  //   // debugger
  //
  // }, [props.room]);

  return (
    <>
      <div className={styles["box-room"]}>
        <div
          className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
        >
          <div className={styles["box-room-Det-name"]}>
            <p>{props.room?.info_room.room_type}</p>
          </div>
        </div>
        <div>
          <div>
            <div
              className={`${styles["set-info-passengers"]} ${styles["posi-relative"]}`}
            >
              {/* <label className={styles["label-fix"]}>سرپرست</label> */}
              <div>
                {props.room.passengers?.map((passenger, passindex) => {
                  return (
                    <PassengerForm
                      dataq={props?.dataq}
                      setDataq={props?.setDataq}
                      type={passenger.type}
                      chd_type={passenger.child_type}
                      prcTypeBase={(type) => prcTypeBase(type)}
                      // reserve_id={props.room?.reserve_id}
                      hotelDets={props?.hotelDets}
                      Errs={props?.Errs}
                      prc={numberWithCommas(passenger.total_room_price)}
                      roomsData={props?.roomsData}
                      setRoomsData={props?.setRoomsData}
                      passId={passenger.pass_id}
                      roomid={props.room?.room_id}
                      room_type_id={props.room.room_type_id}
                      reserve_id={props?.room?.reserve_id}
                      id={props?.room.id}
                      passIndex={passindex}
                      roomIndex={props?.roomIndex}
                      info_room={props.room?.info_room}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPasserngers;
