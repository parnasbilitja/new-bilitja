import React, { useEffect, useState } from "react";
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
import {
  chdPrcGen,
  extBedPrcGen,
  numberWithCommas,
  roomPrcGen,
} from "../../../Utils/newTour";

import PassengerForm from "./subComponents/PassengerForm.component";

const InfoPasserngers = (props) => {
  useEffect(() => {
    console.log("from info passs", props.flightDet);
  }, [props.flightDet]);

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


  useEffect(() => {
    const baseRoomDet = props.generalRoomDet?.filter(
        (obj, index) =>
            props.generalRoomDet?.findIndex((item) => item.id === obj.id && item.room_type_id
                ===obj.room_type_id
            ) === index
    );
    // let filterbasedonreserveId=generalRoomDet.filter(det=>)

    debugger
    setChdPrc(chdPrcGen(baseRoomDet, props.flightDet, props.room?.room_type_id));
    setextPrc(extBedPrcGen(baseRoomDet, props.flightDet, props?.room_type_id));
    setinfPrc(props.flightDet.inf_price);
    setAdlPrc(roomprcFinder(baseRoomDet, props?.room));
    if(props.isEdit?.length>0){
      return ()=>null

    }else {
      props?.setEvRoomsPrc((prev) => [
        ...prev,
        totalPrice(adlPrc, chdPrc, infPrc, extPrc),
      ]);

    }
  }, [props?.hotelDets, props?.room_type_id, chdPrc, adlPrc, infPrc, extPrc]);

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
  //   debugger
  //   console.log("das", props.flightDet);
  // }, [props.flightDet]);

  return (
    <>
      <div className={styles["box-room"]}>
        <div
          className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
        >
          <div className={styles["box-room-Det-name"]}>
            <p>{props?.roomName}</p>
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
                      prcTypeBase={(type) => prcTypeBase(type)}
                      hotelDets={props?.hotelDets}
                      Errs={props?.Errs}
                      prc={numberWithCommas(prcTypeBase(passenger.type))}
                      roomsData={props?.roomsData}
                      setRoomsData={props?.setRoomsData}
                      passId={passenger.id}
                      roomid={props.room?.room_id}
                      room_type_id={props.room.room_type_id}
                      reserve_id={props?.room.reserve_id}
                      id={props?.room.id}
                      passIndex={passindex}
                      roomIndex={props?.roomIndex}
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
