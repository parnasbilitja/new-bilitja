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
  dataq,
  setDataq,
  setEvRoomsPrc,
  roomIndex,
  Errs,
}) => {
  const [chdPrc, setChdPrc] = useState("");
  const [adlPrc, setAdlPrc] = useState("");
  const [infPrc, setinfPrc] = useState("");
  const [extPrc, setextPrc] = useState("");

  const totalPrice = (adlPrc, chdPrc, infPrc, extPrc) => {
    let totAdlPrc = adlPrc * room.adl_count;
    let totChdPrc = chdPrc * room.chd_count;
    let totInfPrc = infPrc * room.inf_count;
    let totExtPrc = extPrc * room.extra_count;
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
    const foundRoom = rooms.filter((room) => room.id === selectedroom.room_id);
    return roomPrcGen(...foundRoom, hotelDets.flight);
  };

  useEffect(() => {
    console.log("das", dataq);
  }, [dataq]);

  return (
    <>
      <div className={styles["box-room"]}>
        <div
          className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
        >
          <div className={styles["box-room-Det-name"]}>
            <div className={styles["circle"]}></div>
            <h2>{roomName}</h2>
          </div>
        </div>
        <div>
          <div>
            <div
              className={`${styles["set-info-passengers"]} ${styles["posi-relative"]}`}
            >
              {/* <label className={styles["label-fix"]}>سرپرست</label> */}
              <div>
                {room.adl_count === 0 ? null : (
                  <>
                    <PassengerForm
                      count={room.adl_count}
                      type="adl"
                      roomId={room.id}
                      roomTypeId={room.room_id}
                      dataq={dataq}
                      setDataq={setDataq}
                      prcTypeBase={(type) => prcTypeBase(type)}
                      hotelDets={hotelDets}
                      roomIndex={roomIndex}
                      Errs={Errs}
                      prc={numberWithCommas(adlPrc)}
                    />
                  </>
                )}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.chd_count === 0 ? null : (
                  <>
                    <PassengerForm
                      count={room.chd_count}
                      type="chd"
                      roomId={room.id}
                      roomTypeId={room.room_id}
                      dataq={dataq}
                      setDataq={setDataq}
                      prcTypeBase={(type) => prcTypeBase(type)}
                      hotelDets={hotelDets}
                      prc={numberWithCommas(chdPrc)}
                    />
                  </>
                )}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.inf_count === 0 ? null : (
                  <>
                    <PassengerForm
                      count={room.inf_count}
                      type="inf"
                      roomId={room.id}
                      roomTypeId={room.room_id}
                      dataq={dataq}
                      setDataq={setDataq}
                      prcTypeBase={(type) => prcTypeBase(type)}
                      hotelDets={hotelDets}
                      prc={numberWithCommas(infPrc)}
                    />
                  </>
                )}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.extra_count === 0 ? null : (
                  <>
                    <PassengerForm
                      count={room.extra_count}
                      type="ext"
                      roomId={room.id}
                      roomTypeId={room.room_id}
                      dataq={dataq}
                      setDataq={setDataq}
                      prcTypeBase={(type) => prcTypeBase(type)}
                      hotelDets={hotelDets}
                      prc={numberWithCommas(extPrc)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPasserngers;
