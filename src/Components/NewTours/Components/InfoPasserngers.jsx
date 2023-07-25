import React, { useEffect, useState } from "react";
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
import {
  chdPrcGen,
  extBedPrcGen,
  numberWithCommas,
  roomPrcGen,
} from "../../../Utils/newTour";

import PassengerForm from "./subComponents/PassengerForm.component";

const InfoPasserngers = ({
  room,
  roomName,
  room_type_id,
  hotelDets,
  setEvRoomsPrc,
  Errs,
  roomsData,
  setRoomsData,
  dataq,
  setDataq,
  roomIndex,
}) => {
  useEffect(() => {
    console.log("from info passs", roomName);
  }, []);

  const [chdPrc, setChdPrc] = useState("");
  const [adlPrc, setAdlPrc] = useState("");
  const [infPrc, setinfPrc] = useState("");
  const [extPrc, setextPrc] = useState("");

  const totalPrice = (adlPrc, chdPrc, infPrc, extPrc) => {
    const adlCount = room.passengers.filter(
      (pass) => pass.type === "adl"
    ).length;
    const chdCount = room.passengers.filter(
      (pass) => pass.type === "chd"
    ).length;
    const infCount = room.passengers.filter(
      (pass) => pass.type === "inf"
    ).length;
    const extCount = room.passengers.filter(
      (pass) => pass.type === "ext"
    ).length;
    let totAdlPrc = adlPrc * (typeof adlCount === "number" ? adlCount : 0);
    let totChdPrc = chdPrc * (typeof chdCount === "number" ? chdCount : 0);
    let totInfPrc = infPrc * (typeof infCount === "number" ? infCount : 0);
    let totExtPrc = extPrc * (typeof extCount === "number" ? extCount : 0);
    return totAdlPrc + totChdPrc + totInfPrc + totExtPrc;
  };
  useEffect(() => {
    setChdPrc(chdPrcGen(hotelDets?.rooms, hotelDets?.flight, room_type_id));
    setextPrc(extBedPrcGen(hotelDets?.rooms, hotelDets?.flight, room_type_id));
    setinfPrc(hotelDets.flight.inf_price);
    setAdlPrc(roomprcFinder(hotelDets.rooms, room));

    setEvRoomsPrc((prev) => [
      ...prev,
      totalPrice(adlPrc, chdPrc, infPrc, extPrc),
    ]);
  }, [hotelDets, room_type_id, chdPrc, adlPrc, infPrc, extPrc]);

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
    const foundRoom = rooms.filter(
      (room) => room.room_type_id === selectedroom.room_type_id
    );
    return roomPrcGen(...foundRoom, hotelDets.flight);
  };

  useEffect(() => {
    console.log("das", hotelDets.rooms);
  }, [hotelDets.rooms]);

  return (
    <>
      <div className={styles["box-room"]}>
        <div
          className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
        >
          <div className={styles["box-room-Det-name"]}>
            <p>{roomName}</p>
          </div>
        </div>
        <div>
          <div>
            <div
              className={`${styles["set-info-passengers"]} ${styles["posi-relative"]}`}
            >
              {/* <label className={styles["label-fix"]}>سرپرست</label> */}
              <div>
                {room.passengers.map((passenger, passindex) => {
                  return (
                    <PassengerForm
                      dataq={dataq}
                      setDataq={setDataq}
                      type={passenger.type}
                      prcTypeBase={(type) => prcTypeBase(type)}
                      hotelDets={hotelDets}
                      Errs={Errs}
                      prc={numberWithCommas(prcTypeBase(passenger.type))}
                      roomsData={roomsData}
                      setRoomsData={setRoomsData}
                      passId={passenger.id}
                      roomid={room.room_id}
                      room_type_id={room.room_type_id}
                      id={room.id}
                      passIndex={passindex}
                      roomIndex={roomIndex}
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
