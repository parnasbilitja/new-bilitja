import React, { useEffect, useState } from "react";
import styles from "../../../../styles/newTour/components/AvailableFlightMobile.module.scss";
import {
  MiladiToJalaliConvertor,
  MiladiToJalaliConvertorDec,
  MiladiToJalaliConvertorInc,
  chdPrcGen,
  dateDiffChecker,
  extBedPrcGen,
  flightDateChecker,
  jalaliToMiladiConvertor,
  numberWithCommas,
  roomPrcGen,
  startBuilder,
  numberRounder,
  getRandomRounded,
  reservePrc,
  getCheapestRoom,
} from "../../../Utils/newTour";
import { AnimatePresence, motion } from "framer-motion";
import { Err, ErrSuccess, NotifAlert } from "./NotifAlert.component";
import { useRouter } from "next/router";
import axios from "axios";
import MapPopUpComponent from "./subComponents/MapPopUp.component";
const AvailableFlightMobile = ({
                                 isOpen,
                                 flight,
                                 night,
                                 hotel,
                                 selectedRoom,
                                 setSelectedRoom,
                                 setIsOpen,
                               }) => {
  const [reserveStage, setReserveStage] = useState(1);
  const [passRoomId, setPassRoomId] = useState(null);
  const [iscollapse, setIsCollapse] = useState(false);
  const router = useRouter();


  useEffect(()=>{
    console.log(router)
  },[])

  const variants = {
    hidden: { height: "35px", backgroundColor: "#e4e4e4" },
    visible: {
      height: "auto",
      backgroundColor: ["#e4e4e4", "#f0f0f0", "#fff"],
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
    exit: {
      height: "35px",
      backgroundColor: ["#fff", "#f0f0f0", "#e4e4e4"],
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
  };
  const minAvRoom = (rates) =>
      Math.min(
          ...rates.map((a) => {
            return a.available_room_count;
          })
      );
  const roomCounter = (roomTypeId) => {
    const room = selectedRoom?.filter(
        (room) => room?.room_type_id === roomTypeId
    );
    return room.length > 0 ? room[0]?.passCount?.length : 0;
  };

  const individualRoomstypeFinder = (selectedrooms, roomtypeid) => {
    let filteredRoom = selectedrooms.filter(
        (room) => room.room_type_id === roomtypeid
    );
    return filteredRoom;
  };

  const IncRoom = (flightId, room, adlprc) => {
    setPassRoomId(null);
    let minAvRoom = Math.min(
        ...room.rates?.map((a) => {
          return a.available_room_count;
        })
    );
    let findRoom = selectedRoom.filter(
        (sroom) => sroom.room_type_id === room.room_type_id
    );

    if (findRoom.length === 0) {
      // debugger
      if (minAvRoom > roomCounter(room.room_type_id)) {
        setIsOpen(flightId);
        let idGen = Math.random() * 1000;
        setSelectedRoom([
          ...selectedRoom,
          {
            id: idGen,
            room_type_id: room.room_type_id,
            room_id: room.id,
            room_type: room.room_type,
            Adl_capacity: room.Adl_capacity,
            count: 1,
            passCount: [
              {
                idroom: idGen,
                extra_bed_count: 0,
                inf_count: 0,
                chd_count: 0,
                Adl_count: +room.Adl_capacity,
              },
            ],
            chd_capacity: room.chd_capacity,
            extra_bed_capacity: room.extra_bed_count,
            total_extra_count: room.total_extra_count,
            adlprc,
          },
        ]);
      } else {
        Err("تعداد اتاق انتخابی بیش از ظرفیت موجود نیست");
      }
    } else {
      let targetRooms = selectedRoom.filter(
          (sroom) => sroom.room_type_id !== room.room_type_id
      );
      let prevpasscount = findRoom[0].passCount;

      if (minAvRoom > roomCounter(room.room_type_id)) {
        prevpasscount.push({
          idroom: Math.random() * 1000,
          extra_bed_count: 0,
          inf_count: 0,
          chd_count: 0,
          Adl_count: +room.Adl_capacity,
        });

        let newfinRoom = findRoom[0];
        newfinRoom.passCount = prevpasscount;
        newfinRoom.count = prevpasscount?.length;
        targetRooms.push(newfinRoom);
        setSelectedRoom([...targetRooms]);
      } else {
        Err("تعداد اتاق انتخابی بیش از ظرفیت موجود نیست");
      }
    }
  };

  ///decrease room => :دو تخته , سه تخته , ...........
  const decRoom = (roomTypeId) => {
    setPassRoomId(null);
    if (roomCounter(roomTypeId) === 0) {
      return null;
    } else {
      const removedRoom = [];
      let getRooms = selectedRoom.filter(
          (room) => room.room_type_id === roomTypeId
      );
      if (getRooms[0].passCount.length === 1) {
        const finalRoom = getRooms.pop();
        removedRoom.push(finalRoom);
        const anoRooms = selectedRoom.filter(
            (selectroom) => removedRoom[0].id !== selectroom.id
        );
        setSelectedRoom([...anoRooms]);
      } else {
        let selecetedPassCount = getRooms[0].passCount;
        selecetedPassCount.pop();
        setSelectedRoom(
            selectedRoom.map((item) =>
                item.room_type_id === roomTypeId
                    ? { ...item, passCount: selecetedPassCount }
                    : item
            )
        );
      }
    }
    // roomCounter(roomTypeId) ===
    if (selectedRoom.length <= 1) {
      setIsOpen(0);
    }
  };

  const incDet = (roomTypeId, type) => {
    let findRoom = selectedRoom.filter(
        (room) => room?.room_type_id === roomTypeId
    );
    let regularCap =
        type === "extra_bed_count"
            ? +findRoom[0]?.extra_bed_capacity
            : type === "inf_count"
                ? +findRoom[0]?.Adl_capacity
                : +findRoom[0]?.chd_capacity;
    let maxCap = regularCap * +findRoom[0]?.count;
    if (passCounter(roomTypeId, type) < maxCap) {
      let passnegerCountI = findRoom[0].passCount;
      let passengerCount = findRoom[0].passCount.filter(
          (pass) => pass[type] > 0 && pass[type] < regularCap
      );
      if (passengerCount?.length > 0) {
        let newPassengerCount = {
          ...passengerCount[0],
          [type]: passengerCount[0][type] + 1,
        };

        passnegerCountI = passnegerCountI.filter(
            (pass) => pass.idroom !== newPassengerCount.idroom
        );
        passnegerCountI.push(newPassengerCount);
      } else {
        if (regularCap !== 0) {
          let passCountwithpropzero = findRoom[0].passCount.filter(
              (pass) => pass[type] === 0
          );
          let newPassengerCount = {
            ...passCountwithpropzero[0],
            [type]: passCountwithpropzero[0][type] + 1,
          };
          passnegerCountI = passnegerCountI.filter(
              (pass) => pass.idroom !== newPassengerCount.idroom
          );
          passnegerCountI.push(newPassengerCount);
        } else {
          return false;
        }
      }

      findRoom[0].passCount = passnegerCountI;

      let FilteredRoom = selectedRoom.filter(
          (room) => room?.room_type_id !== roomTypeId
      );

      FilteredRoom.push(findRoom[0]);

      setSelectedRoom(FilteredRoom);
    } else {
      if (type === "extra_bed_count") {
        Err("تخت اضافه بیش از تعداد انتخاب شده، موجود نیست");
      } else if (type === "inf_count") {
        Err("تعداد نوزاد بیش از تعداد انتخاب شده، موجود نیست");
      } else {
        Err("تعداد کودک بیش از تعداد انتخاب شده، موجود نیست");
      }
    }

    // console.log(selectedRoom);
  };

  ////dec chd, inf,ext number
  const decDet = (roomTypeId, type) => {
    let findRoom = selectedRoom.filter(
        (room) => room?.room_type_id === roomTypeId
    );

    let regularCap =
        type === "extra_bed_count"
            ? +findRoom[0]?.extra_bed_capacity
            : type === "inf_count"
                ? +findRoom[0]?.Adl_capacity
                : +findRoom[0]?.chd_capacity;
    let maxCap = regularCap * +findRoom[0]?.count;
    if (passCounter(roomTypeId, type) !== 0) {
      let passnegerCountI = findRoom[0].passCount;
      let passengerCount = findRoom[0].passCount.filter(
          (pass) => pass[type] > 0
      );
      if (passengerCount?.length > 0) {
        let newPassengerCount = {
          ...passengerCount[0],
          [type]: passengerCount[0][type] - 1,
        };

        passnegerCountI = passnegerCountI.filter(
            (pass) => pass.idroom !== newPassengerCount.idroom
        );
        passnegerCountI.push(newPassengerCount);
      } else {
        if (regularCap !== 0) {
          let passCountwithpropzero = findRoom[0].passCount.filter(
              (pass) => pass[type] === 0
          );
          let newPassengerCount = {
            ...passCountwithpropzero[0],
            [type]: passCountwithpropzero[0][type] - 1,
          };
          passnegerCountI = passnegerCountI.filter(
              (pass) => pass.idroom !== newPassengerCount.idroom
          );
          passnegerCountI.push(newPassengerCount);
        } else {
          return false;
        }
      }

      findRoom[0].passCount = passnegerCountI;

      let FilteredRoom = selectedRoom.filter(
          (room) => room?.room_type_id !== roomTypeId
      );

      FilteredRoom.push(findRoom[0]);

      setSelectedRoom(FilteredRoom);
    } else {
      if (type === "extra_bed_count") {
        Err("تخت اضافه بیش از تعداد انتخاب شده، موجود نیست");
      } else if (type === "inf_count") {
        Err("تعداد نوزاد بیش از تعداد انتخاب شده، موجود نیست");
      } else {
        Err("تعداد کودک بیش از تعداد انتخاب شده، موجود نیست");
      }
    }
    // console.log(selectedRoom);
  };

  const getSumOfPassenger = (roomtypeid, passengerType) => {
    let findRoom = selectedRoom.filter(
        (room) => room.room_type_id === roomtypeid
    );
    return findRoom[0].passCount.reduce((accumulator, object) => {
      return accumulator + object[passengerType];
    }, 0);
  };

  const passCounter = (roomTypeId, roomtype, counterType = "individual") => {
    if (counterType === "individual") {
      let findRoom = selectedRoom.filter(
          (room) => room?.room_type_id === roomTypeId
      );
      let sum = findRoom[0].passCount.reduce(
          (accumulator, pass) => accumulator + pass[roomtype],
          0
      );
      return sum;
    } else {
    }
  };
  const getPassengerCap = (roomTypeId, type) => {
    let findRoom = selectedRoom.filter(
        (room) => room?.room_type_id === roomTypeId
    );
    let regularCap =
        type === "extra_bed_count"
            ? +findRoom[0]?.extra_bed_capacity
            : type === "inf_count"
                ? +findRoom[0]?.Adl_capacity
                : +findRoom[0]?.chd_capacity;

    return regularCap * +findRoom[0]?.count;
  };

  const AllSelectedPassengerNumber = () => {
    // debugger
    let allPassCounts = [];
    selectedRoom.map((room) => allPassCounts.push(...room.passCount));
    allPassCounts = allPassCounts.map(({ idroom, ...pass }) => pass);
    let allpassvalue = [];
    allPassCounts.map((pass) => {
      let passvalue = Object.values(pass);
      allpassvalue.push(...passvalue);
    });

    return allpassvalue.reduce((accumulator, pass) => accumulator + pass, 0);
  };

  const tourReserve1 = (
      fCheckin,
      fCheckout,
      goneDate,
      arrivalDate,
      fId,
      hotelId
  ) => {
    let routerParam = router.query;
    let checkin = fCheckin
        ? MiladiToJalaliConvertorInc(goneDate)
        : MiladiToJalaliConvertor(goneDate);
    let checkout = fCheckout
        ? MiladiToJalaliConvertorDec(arrivalDate)
        : MiladiToJalaliConvertor(arrivalDate);
    let stayCount = routerParam.night;
    let rooms = [...roomsGen(reformSelectedRoom())];
    if (selectedRoom.length > 0) {
      axios
          .post(
              "https://hotelobilit-api.iran.liara.run/api/v2/reserves/checking",
              {
                checkin: jalaliToMiladiConvertor(checkin),
                checkout: jalaliToMiladiConvertor(checkout),
                hotel_id: hotelId,
                flight_id: fId,
                rooms,
              }
          )
          .then((res) => {
            // console.log(res.data)
            ErrSuccess("به صفحه تکمیل اطلاعات و رزرو منتقل می‌شوید");
            router.push(
                `/tour/reserve/${hotelId}/${fId}?checkin=${checkin}&checkout=${checkout}&rooms=${JSON.stringify(
                    rooms
                )}&ref_code=${res.data.data.ref_code}`
            );
          })
          .catch((err) => {
            Err("این پرواز با این تعداد اتاق انتخابی موجودی ندارد");
          });
    } else {
      Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
    }
  };

  const roomsGen = (selectedRoom) => {
    const rooms = [];
    selectedRoom.map((room) => {
      rooms.push({
        adl_count: room.Adl_capacity,
        chd_count: room.chd_count,
        inf_count: room.inf_count,
        room_id: room.room_id,
        extra_count: room.extra_bed_count,
        count: 1,
      });
    });

    return rooms;
  };

  const reformSelectedRoom = () => {
    let newRooms = [];
    selectedRoom.map((room) => {
      // let roomNum = room.passCount.length;
      // let passCount = room.passCount;
      room.passCount.map((passcount) => {
        let obj = {
          ...passcount,
          ...room,
        };
        newRooms.push(obj);
      });
    });
    return newRooms;
  };

  return (
      <>
        <NotifAlert />
        <div>
          <div className={styles["ticket_container"]}>
            <div className={styles["container"]}>
              {isOpen === 0 ? null : isOpen === flight.id ? null : (
                  <motion.div
                      className={styles["blur"]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ ease: "easeOut", duration: 0.4 }}
                  ></motion.div>
              )}
              {reserveStage === 1 ? (
                  <>
                    <div className={styles["ticket"]}>
                      {/* ticketdet col2 */}
                      <div className={styles["ticket_flight"]}>
                        <div className={styles["flightDet_container"]}>
                          <div className={styles["flight_company"]}>
                            <div className={styles["flight_company_logo"]}>
                              <p style={{whiteSpace:'nowrap'}}>رفت</p>
                              <div className={styles["image_container"]}>
                                <img src={flight?.airline_thumb?.url} alt="" />
                              </div>
                              <p>{flight.airline_name}</p>

                              <div className={styles["flight_info"]}>
                                <div style={{backgroundColor:'#ebebeb',padding:'.5rem',borderRadius:'20px' ,marginBottom:'5px'}}>
                                  <p style={{whiteSpace:'nowrap'}}>
                                    {flight.origin_name}
                                  </p>
                                  <p>
                                    به
                                  </p>
                                  <p style={{whiteSpace:'nowrap'}} >
                                    {flight.destination_name}
                                  </p>
                                </div>
                                <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                >
                                  <p>ش.پرواز:  </p>
                                  <p style={{ color: "red",marginRight:'5px'}}>
                                    {flight.flight_number}
                                  </p>
                                </div>
                                <div>
                                  <p>{MiladiToJalaliConvertor(flight.date)}</p>
                                </div>
                                <div>
                                  <p style={{color:'#e20000'}}>{flight.time.slice(0, 5)}</p>
                                </div>
                              </div>
                            </div>
                            <div className={styles["flight_company_remaintour"]}>
                              <p style={{ whiteSpace: "nowrap" }}>
                                تعداد موجودی پرواز :<span style={{color:'#e20000',fontWeight:'900',fontSize:'13px'}}>{flight.capacity}</span>
                              </p>
                              <div
                                  style={{
                                    display: "flex",
                                    justifyContent:'center',
                                    padding: "0",
                                  }}
                              >
                                <div className={styles["dot"]}></div>
                                <div className={styles["seprator"]}></div>
                                <svg
                                    style={{ transform: "rotate(270deg)" }}
                                    viewBox="0 0 24 24"
                                    fill="#e20000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                >
                                  <g>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z" />
                                  </g>
                                </svg>
                              </div>
                              <p>
                                <span style={{color:'#e20000',fontWeight:'900',fontSize:'13px'}}> {night}</span> شب و{" "}
                                <span style={{color:'#e20000',fontWeight:'900',fontSize:'13px'}}> {+night + 1}</span>
                                روز
                              </p>
                            </div>
                            <div className={styles["flight_company_logo"]}>
                              <p style={{whiteSpace:'nowrap'}}>برگشت</p>
                              <div className={styles["image_container"]}>
                                <img
                                    src={flight?.flight?.airline_thumb?.url}
                                    alt=""
                                />
                              </div>
                              <p>{flight?.flight?.airline_name}</p>

                              <div className={styles["flight_info"]}>
                                <div style={{backgroundColor:'#ebebeb',padding:'.5rem',borderRadius:'20px',marginBottom:'5px'}}>
                                  <p style={{whiteSpace:'nowrap'}}>
                                    {flight.destination_name}
                                  </p>
                                  <p>
                                    به
                                  </p>
                                  <p style={{whiteSpace:'nowrap'}} >
                                    {flight.origin_name}
                                  </p>
                                </div>
                                <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                >
                                  <p>ش.پرواز: </p>
                                  <p style={{ color: "#e20000",marginRight:'5px' }}>
                                    {flight.flight.flight_number}
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    {MiladiToJalaliConvertor(flight.flight.date)}
                                  </p>
                                </div>
                                <div>
                                  <p style={{color:'#e20000'}}>{flight.flight.time.slice(0, 5)}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {router?.query?.dest==='AYT'?<>
                            <div className={styles["timeline"]}>
                              <div className={styles["time"]}>
                                <p>ورود به هتل : </p>
                                <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                >
                                  {/*<p>12:00</p>*/}
                                  {/*<svg*/}
                                  {/*    height="20"*/}
                                  {/*    id="Layer_1"*/}
                                  {/*    version="1.1"*/}
                                  {/*    viewBox="0 0 512 512"*/}
                                  {/*    width="20"*/}
                                  {/*>*/}
                                  {/*  <g>*/}
                                  {/*    <path d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M256,446.7   c-105.1,0-190.7-85.5-190.7-190.7c0-105.1,85.5-190.7,190.7-190.7c105.1,0,190.7,85.5,190.7,190.7   C446.7,361.1,361.1,446.7,256,446.7z" />*/}
                                  {/*    <polygon points="256,256 160,256 160,273.3 273.3,273.3 273.3,128 256,128  " />*/}
                                  {/*  </g>*/}
                                  {/*</svg>*/}
                                </div>
                              </div>
                              <div className={styles["date"]}>
                                <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      margin: "0 10px",
                                    }}
                                >
                                  <p style={{ margin: "0 10px", padding: "0" }}>
                                    {" "}
                                    {flight.checkin_tomorrow
                                        ? MiladiToJalaliConvertorInc(flight.date)
                                        : MiladiToJalaliConvertor(flight.date)}
                                  </p>
                                  <svg
                                      enable-background="new 0 0 48 48"
                                      height="20"
                                      id="Layer_1"
                                      version="1.1"
                                      viewBox="0 0 48 48"
                                      width="20"
                                  >
                                    <path
                                        clip-rule="evenodd"
                                        d="M43,43H5c-2.209,0-4-1.791-4-4V9c0-2.209,1.791-4,4-4h38c2.209,0,4,1.791,4,4v30  C47,41.209,45.209,43,43,43z M45,9c0-1.104-0.896-2-2-2H5C3.896,7,3,7.896,3,9v6h42V9z M45,17H3v22c0,1.104,0.896,2,2,2h38  c1.104,0,2-0.896,2-2V17z M41,31h-2c-0.552,0-1-0.447-1-1v-2c0-0.552,0.448-1,1-1h2c0.553,0,1,0.448,1,1v2  C42,30.553,41.553,31,41,31z M41,24h-2c-0.552,0-1-0.447-1-1v-2c0-0.553,0.448-1,1-1h2c0.553,0,1,0.447,1,1v2  C42,23.553,41.553,24,41,24z M33,31h-2c-0.552,0-1-0.447-1-1v-2c0-0.552,0.448-1,1-1h2c0.553,0,1,0.448,1,1v2  C34,30.553,33.553,31,33,31z M33,24h-2c-0.552,0-1-0.447-1-1v-2c0-0.553,0.448-1,1-1h2c0.553,0,1,0.447,1,1v2  C34,23.553,33.553,24,33,24z M25,31h-2c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2  C26,30.553,25.553,31,25,31z M25,24h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C26,23.553,25.553,24,25,24z M17,38h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C18,37.553,17.553,38,17,38z M17,31h-2c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2  C18,30.553,17.553,31,17,31z M17,24h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C18,23.553,17.553,24,17,24z M9,38H7c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2C10,37.553,9.553,38,9,38  z M9,31H7c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2C10,30.553,9.553,31,9,31z M23,34h2  c0.553,0,1,0.447,1,1v2c0,0.553-0.447,1-1,1h-2c-0.553,0-1-0.447-1-1v-2C22,34.447,22.447,34,23,34z"
                                        fill-rule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <div className={styles["timeline"]}>
                              <div className={styles["time"]}>
                                <p>خروج از هتل : </p>
                                <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                >
                                  {/*<p>14:00</p>*/}
                                  {/*<svg*/}
                                  {/*    height="20"*/}
                                  {/*    id="Layer_1"*/}
                                  {/*    version="1.1"*/}
                                  {/*    viewBox="0 0 512 512"*/}
                                  {/*    width="20"*/}
                                  {/*>*/}
                                  {/*  <g>*/}
                                  {/*    <path d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M256,446.7   c-105.1,0-190.7-85.5-190.7-190.7c0-105.1,85.5-190.7,190.7-190.7c105.1,0,190.7,85.5,190.7,190.7   C446.7,361.1,361.1,446.7,256,446.7z" />*/}
                                  {/*    <polygon points="256,256 160,256 160,273.3 273.3,273.3 273.3,128 256,128  " />*/}
                                  {/*  </g>*/}
                                  {/*</svg>*/}
                                </div>
                              </div>
                              <div className={styles["date"]}>
                                <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      margin: "0 10px",
                                    }}
                                >
                                  <p style={{ margin: "0 10px", padding: "0" }}>
                                    {" "}
                                    {flight.flight.checkin_tomorrow
                                        ? MiladiToJalaliConvertorInc(flight.flight.date)
                                        : MiladiToJalaliConvertor(flight.flight.date)}
                                  </p>
                                  <svg
                                      enable-background="new 0 0 48 48"
                                      height="20"
                                      id="Layer_1"
                                      version="1.1"
                                      viewBox="0 0 48 48"
                                      width="20"
                                  >
                                    <path
                                        clip-rule="evenodd"
                                        d="M43,43H5c-2.209,0-4-1.791-4-4V9c0-2.209,1.791-4,4-4h38c2.209,0,4,1.791,4,4v30  C47,41.209,45.209,43,43,43z M45,9c0-1.104-0.896-2-2-2H5C3.896,7,3,7.896,3,9v6h42V9z M45,17H3v22c0,1.104,0.896,2,2,2h38  c1.104,0,2-0.896,2-2V17z M41,31h-2c-0.552,0-1-0.447-1-1v-2c0-0.552,0.448-1,1-1h2c0.553,0,1,0.448,1,1v2  C42,30.553,41.553,31,41,31z M41,24h-2c-0.552,0-1-0.447-1-1v-2c0-0.553,0.448-1,1-1h2c0.553,0,1,0.447,1,1v2  C42,23.553,41.553,24,41,24z M33,31h-2c-0.552,0-1-0.447-1-1v-2c0-0.552,0.448-1,1-1h2c0.553,0,1,0.448,1,1v2  C34,30.553,33.553,31,33,31z M33,24h-2c-0.552,0-1-0.447-1-1v-2c0-0.553,0.448-1,1-1h2c0.553,0,1,0.447,1,1v2  C34,23.553,33.553,24,33,24z M25,31h-2c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2  C26,30.553,25.553,31,25,31z M25,24h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C26,23.553,25.553,24,25,24z M17,38h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C18,37.553,17.553,38,17,38z M17,31h-2c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2  C18,30.553,17.553,31,17,31z M17,24h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C18,23.553,17.553,24,17,24z M9,38H7c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2C10,37.553,9.553,38,9,38  z M9,31H7c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2C10,30.553,9.553,31,9,31z M23,34h2  c0.553,0,1,0.447,1,1v2c0,0.553-0.447,1-1,1h-2c-0.553,0-1-0.447-1-1v-2C22,34.447,22.447,34,23,34z"
                                        fill-rule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div></>:null
                          }

                        </div>
                      </div>
                      {/* reserve col 3 */}
                    </div>
                    <div className={styles["ticket_reserve"]}>
                      <div className={styles["ticket_reserve_price"]}>
                        <p className={styles["priceTitle"]}>قیمت برای هر نفر:</p>
                        <p>
                      <span>
                        {numberWithCommas(
                            numberRounder(reservePrc(hotel.rooms, flight))
                        )}
                      </span>
                          تومان
                        </p>
                      </div>

                      <div className={styles["btn-container"]}>
                        <button
                            onClick={() => {
                              // tourReserve(flight?.checkin_tomorrow,flight?.checkout_yesterday ,flight?.date,flight?.flight?.date,flight.id,hotel.id)
                              setReserveStage(2);
                            }}
                            className={`${styles["ticket_reserve_btn_active"]}`}
                        >
                          انتخاب تور
                        </button>
                      </div>
                    </div>
                  </>
              ) : (
                  <div className={styles["roomContainer"]}>
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          duration: 0.5,
                        }}
                        className={styles["roomcountdet_roomnum"]}
                    >
                      <div
                          style={{
                            paddingLeft: "12px",
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "16px",
                            marginTop:'10px'
                          }}
                          onClick={() => {
                            setReserveStage(1);
                          }}
                      >
                        <p
                            style={{
                              fontSize: "12px",
                              margin: "0 0 0 5px",
                              padding: "0 !important",
                            }}
                        >
                          بازگشت به انتخاب پرواز
                        </p>
                        <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#137cb6"
                        >
                          <title />
                          <g data-name="Layer 2" id="Layer_2">
                            <path d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z" />
                            <path d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z" />
                          </g>
                        </svg>
                      </div>

                      <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                      >
                        <p
                            style={{
                              padding: "0",
                              margin: "0",
                              fontSize: "14px",
                            }}
                        >
                          لطفا طبق نفرات اتاق مناسب خود را انتخاب کنید
                        </p>
                      </div>

                      {selectedRoom.length === 0 && (
                          <p
                              style={{
                                color: "red",
                                fontSize: "10px",
                                fontWeight: "900",
                                margin: "2px 0",
                                textAlign: "center",
                              }}
                          >
                            توجه داشته باشید اتاق ها طبق ظرفیت میباشد، مثلا دوتخته
                            برای دونفر بزرگسال می باشد
                          </p>
                      )}
                    </motion.div>

                    <div style={{ height: "auto" }}>
                      <div className={styles["roomDet_container"]}>
                        {getCheapestRoom(hotel?.rooms, flight)?.map((room) => {
                          return (
                              <div className={styles["roomDetcard"]}>
                                <div className={styles["room_counter"]}>
                                  <div className={styles["roomDetcard_roomnum"]}>
                                    <label htmlFor="">
                                      {room?.room_type} (مناسب {room.Adl_capacity}{" "}
                                      نفر)
                                    </label>
                                    <div style={{ display: "flex" }}>
                                      <p
                                          style={{
                                            color: "black",
                                            marginLeft: "3px",
                                            fontSize:"14px"
                                          }}
                                      >
                                        قیمت برای هر نفر:
                                      </p>
                                      <p>
                                  <span className={styles["cost"]}>
                                    {numberWithCommas(
                                        numberRounder(roomPrcGen(room, flight))
                                    )}
                                  </span>
                                        تومان
                                      </p>
                                    </div>
                                  </div>

                                  <div
                                      className={styles["roomDetcard_roomnum_indec"]}
                                  >
                                    <div
                                        className={
                                          minAvRoom(room.rates) <=
                                          roomCounter(room.room_type_id)
                                              ? styles["dec-none"]
                                              : styles["in"]
                                        }
                                        onClick={() => {
                                          IncRoom(
                                              flight.id,
                                              room,
                                              numberWithCommas(
                                                  numberRounder(roomPrcGen(room, flight))
                                              )
                                          );
                                        }}
                                    >
                                      +
                                    </div>
                                    <div className={styles["counter"]}>
                                      <p>{roomCounter(room?.room_type_id)}</p>
                                    </div>
                                    <div
                                        className={
                                          roomCounter(room.room_type_id) === 0
                                              ? styles["dec-none"]
                                              : styles["dec"]
                                        }
                                        onClick={() => {
                                          decRoom(room.room_type_id);
                                        }}
                                    >
                                      -
                                    </div>
                                  </div>
                                </div>
                                <AnimatePresence>
                                  {individualRoomstypeFinder(
                                          selectedRoom,
                                          room?.room_type_id
                                      ) &&
                                      individualRoomstypeFinder(
                                          selectedRoom,
                                          room?.room_type_id
                                      )?.map((pass) => {
                                        return (
                                            <div
                                                // style={{backgroundColor:'#f0f0f0'}}
                                                className={`${styles["roomcountDet_options"]} ${(pass.room_type_id === passRoomId) ? styles[ 'animate']: passRoomId===null ? null : (pass.room_type_id === passRoomId && iscollapse)?styles[ 'bacWhite']:null}`}
                                                onClick={() => {
                                                  if (pass.room_type_id === passRoomId) {
                                                    setPassRoomId(null);
                                                    setIsCollapse(false)
                                                  } else {
                                                    setPassRoomId(pass.room_type_id);
                                                    setIsCollapse(true)
                                                  }
                                                }}
                                                // initial="hidden"
                                                // animate={
                                                //   passRoomId === pass.room_type_id &&
                                                //   "visible"
                                                // }
                                                // variants={variants}
                                                // exit="exit"
                                            >
                                              <div
                                                  style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    padding: "5px 15px",
                                                  }}
                                              >
                                                <p style={{ fontSize: "10px" }}>
                                                  انتخاب کودک، نوزاد، تخت اضافه{" "}
                                                </p>

                                                <div>
                                                  <svg
                                                      height="20px"
                                                      id="Layer_1"
                                                      version="1.1"
                                                      viewBox="0 0 512 512"
                                                      width="20px"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 " />
                                                  </svg>
                                                </div>
                                              </div>
                                              {passRoomId === pass.room_type_id && (
                                                  <>
                                                    <div
                                                        className={`${
                                                            styles["roomcountDet_bedcount"]
                                                        } ${
                                                            styles[
                                                                room?.extra_bed_count > 0
                                                                    ? "borderActive"
                                                                    : "bordernoneActive"
                                                                ]
                                                        }`}
                                                    >
                                                      <div>
                                                        <div style={{
                                                          display: "flex",
                                                          // justifyContent: "space-between",
                                                          // padding: "0 5px",
                                                          columnGap:'5px'
                                                        }}>

                                                          <p className={styles["bedtype"]}>
                                                            تعداد تخت اضافه
                                                          </p>
                                                          <p>(بالای 12 سال)</p>
                                                        </div>
                                                        <p className={styles["bedtypeprc"]}>
                                                          {numberWithCommas(
                                                              numberRounder(
                                                                  extBedPrcGen(
                                                                      hotel?.rooms,
                                                                      flight,
                                                                      room?.room_type_id
                                                                  )
                                                              )
                                                          )}{" "}
                                                          تومان
                                                        </p>

                                                      </div>
                                                      <div
                                                          style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            marginTop: "10px",
                                                            padding: "0 15px",
                                                          }}
                                                      >


                                                        <div
                                                            className={
                                                              styles[
                                                                  "roomcountDet_bedcount_count"
                                                                  ]
                                                            }
                                                        >
                                                          <div
                                                              className={
                                                                styles[
                                                                    getPassengerCap(
                                                                        pass.room_type_id,
                                                                        "extra_bed_count"
                                                                    ) <=
                                                                    passCounter(
                                                                        pass.room_type_id,
                                                                        "extra_bed_count"
                                                                    )
                                                                        ? "dis_decin"
                                                                        : "decin"
                                                                    ]
                                                              }
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                incDet(
                                                                    room?.room_type_id,
                                                                    "extra_bed_count"
                                                                );
                                                              }}
                                                          >
                                                            +
                                                          </div>
                                                          <span>
                                                {getSumOfPassenger(
                                                    room?.room_type_id,
                                                    "extra_bed_count"
                                                )}
                                              </span>
                                                          <div
                                                              className={
                                                                styles[
                                                                    passCounter(
                                                                        pass.room_type_id,
                                                                        "extra_bed_count"
                                                                    ) === 0
                                                                        ? "dis_decin"
                                                                        : "decin"
                                                                    ]
                                                              }
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                decDet(
                                                                    room?.room_type_id,
                                                                    "extra_bed_count"
                                                                );
                                                              }}
                                                          >
                                                            -
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div
                                                        className={`${
                                                            styles["roomcountDet_bedcount"]
                                                        } ${
                                                            styles[
                                                                room?.chd_count > 0
                                                                    ? "borderActive"
                                                                    : "bordernoneActive"
                                                                ]
                                                        }`}
                                                    >
                                                      <div

                                                      >
                                                        <div   style={{
                                                          display: "flex",
                                                          // justifyContent: "space-between",
                                                          // padding: "0 5px",
                                                          columnGap:'5px'
                                                        }}>

                                                          <p className={styles["bedtype"]}>
                                                            تعداد کودک
                                                          </p>
                                                          <p>(2 تا 12 سال)</p>
                                                        </div>
                                                        <p className={styles["bedtypeprc"]}>
                                                          {numberWithCommas(
                                                              numberRounder(
                                                                  chdPrcGen(
                                                                      hotel.rooms,
                                                                      flight,
                                                                      room.room_type_id
                                                                  )
                                                              )
                                                          )}{" "}
                                                          تومان
                                                        </p>
                                                      </div>

                                                      <div
                                                          style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            // marginTop: "10px",
                                                            padding: "0 15px",
                                                          }}
                                                      >
                                                        .
                                                        <div
                                                            className={
                                                              styles[
                                                                  "roomcountDet_bedcount_count"
                                                                  ]
                                                            }
                                                        >
                                                          <div
                                                              className={
                                                                styles[
                                                                    getPassengerCap(
                                                                        pass.room_type_id,
                                                                        "chd_count"
                                                                    ) <=
                                                                    passCounter(
                                                                        pass.room_type_id,
                                                                        "chd_count"
                                                                    )
                                                                        ? "dis_decin"
                                                                        : "decin"
                                                                    ]
                                                              }
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                incDet(
                                                                    room?.room_type_id,
                                                                    "chd_count"
                                                                );
                                                              }}
                                                          >
                                                            +
                                                          </div>
                                                          <span>
                                                {" "}
                                                            {getSumOfPassenger(
                                                                room?.room_type_id,
                                                                "chd_count"
                                                            )}
                                              </span>
                                                          <div
                                                              className={
                                                                styles[
                                                                    passCounter(
                                                                        pass.room_type_id,
                                                                        "chd_count"
                                                                    ) === 0
                                                                        ? "dis_decin"
                                                                        : "decin"
                                                                    ]
                                                              }
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                decDet(
                                                                    room?.room_type_id,
                                                                    "chd_count"
                                                                );
                                                              }}
                                                          >
                                                            -
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div
                                                        className={`${
                                                            styles["roomcountDet_bedcount"]
                                                        } ${
                                                            styles[
                                                                room?.inf_count > 0
                                                                    ? "borderActive"
                                                                    : "bordernoneActive"
                                                                ]
                                                        }`}
                                                    >
                                                      <div

                                                      >
                                                        <div style={{
                                                          display: "flex",
                                                          // justifyContent: "space-between",
                                                          // padding: "0 15px",
                                                          columnGap:'5px'
                                                        }}>

                                                          <p className={styles["bedtype"]}>
                                                            تعداد نوزاد
                                                          </p>
                                                          <p>(زیر 2 سال)</p>
                                                        </div>
                                                        <p className={styles["bedtypeprc"]}>
                                                          {numberWithCommas(
                                                              numberRounder(flight?.inf_price)
                                                          )}{" "}
                                                          تومان
                                                        </p>
                                                      </div>
                                                      <div
                                                          style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            // marginTop: "10px",
                                                            padding: "0 15px",
                                                          }}
                                                      >
                                                        .
                                                        <div
                                                            className={
                                                              styles[
                                                                  "roomcountDet_bedcount_count"
                                                                  ]
                                                            }
                                                        >
                                                          <div
                                                              className={
                                                                styles[
                                                                    getPassengerCap(
                                                                        pass.room_type_id,
                                                                        "inf_count"
                                                                    ) <=
                                                                    passCounter(
                                                                        pass.room_type_id,
                                                                        "inf_count"
                                                                    )
                                                                        ? "dis_decin"
                                                                        : "decin"
                                                                    ]
                                                              }
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                incDet(
                                                                    room?.room_type_id,
                                                                    "inf_count"
                                                                );
                                                              }}
                                                          >
                                                            +
                                                          </div>
                                                          <span>
                                                {" "}
                                                            {getSumOfPassenger(
                                                                room?.room_type_id,
                                                                "inf_count"
                                                            )}
                                              </span>
                                                          <div
                                                              className={
                                                                styles[
                                                                    passCounter(
                                                                        pass.room_type_id,
                                                                        "inf_count"
                                                                    ) === 0
                                                                        ? "dis_decin"
                                                                        : "decin"
                                                                    ]
                                                              }
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                decDet(
                                                                    room?.room_type_id,
                                                                    "inf_count"
                                                                );
                                                              }}
                                                          >
                                                            -
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                  </>
                                              )}
                                            </div>
                                        );
                                      })}
                                </AnimatePresence>
                              </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className={styles["btnContainer"]}>
                      <button
                          onClick={() => {
                            tourReserve1(
                                flight?.checkin_tomorrow,
                                flight?.checkout_yesterday,
                                flight?.date,
                                flight?.flight?.date,
                                flight.id,
                                hotel.id
                            );
                          }}
                          className={
                            styles[selectedRoom.length === 0 ? "disbtn" : "btn"]
                          }
                      >
                        {` رزرو تور برای ${AllSelectedPassengerNumber()} نفر`}
                      </button>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>


      </>
  );
};

export default AvailableFlightMobile;
