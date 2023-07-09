import React, { useEffect, useState } from "react";
import styles from "../../../styles/newTour/AvailableFlightBasedonSelectedTour.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MiladiToJalaliConvertor,
  MiladiToJalaliConvertorDec,
  MiladiToJalaliConvertorInc,
  chdPrcGen,
 
  extBedPrcGen,
  jalaliToMiladiConvertor,
  numberWithCommas,
  roomPrcGen,
  startBuilder,
} from "../../Utils/newTour";
import Image from "next/image";
import Link from "next/link";
import PictureModal from "./Components/subComponents/PictureModal";

const AvailableFlightBasedonSelectedTour = () => {
  const router = useRouter();
  const [hotel, setHotel] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [isOpen, setIsOpen] = useState("");
  const [ismodal, setIsModal] = useState(null);
  ///count every selected room based on their type =>:دوتخته , سه تخته , ...........
  const roomCounter = (roomTypeId) => {
    const rooms = selectedRoom.filter(
      (room) => room.room_type_id === roomTypeId
    );
    return rooms.length;
  };

  ///increase room => :دوتخته , سه تخته , ...........
  const IncRoom = (
    flightId,
    room_type_id,
    room_type,
    Adl_capacity,
    rates,
    room_id
    // chd_capacity
  ) => {
    let minAvRoom = Math.min(
      ...rates.map((a) => {
        return a.available_room_count;
      })
    );
    if (minAvRoom > roomCounter(room_type_id)) {
      setIsOpen(flightId);
      setSelectedRoom([
        ...selectedRoom,
        {
          id: Math.random() * 1000,
          room_type_id,
          room_id,
          room_type,
          Adl_capacity,
          extra_bed_count: 0,
          inf_count: 0,
          chd_count: 0,
        },
      ]);
    } else {
      console.log("noooooooooooooo!");
    }
  };

  ///decrease room => :دو تخته , سه تخته , ...........
  const decRoom = (roomTypeId) => {
    if (roomCounter(roomTypeId) === 0) {
      return null;
    } else {
      const removedRoom = [];
      const getRooms = selectedRoom.filter(
        (room) => room.room_type_id === roomTypeId
      );
      const finalRoom = getRooms.pop();
      removedRoom.push(finalRoom);

      const anoRooms = selectedRoom.filter(
        (selectroom) => removedRoom[0].id !== selectroom.id
      );

      setSelectedRoom([...anoRooms]);
    }
  };

  ////inc chd, inf,ext number

  const incDet = (id, type) => {
    if (type === "ext_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x.id === id) {
          return {
            ...x,
            extra_bed_count: x.extra_bed_count + 1,
          };
        } else {
          return x;
        }
      });

      setSelectedRoom(findRoom);
    } else if (type === "inf_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x.id === id) {
          return {
            ...x,
            inf_count: x.inf_count + 1,
          };
        } else {
          return x;
        }
      });

      setSelectedRoom(findRoom);
    } else if (type === "chd_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x.id === id) {
          return {
            ...x,
            chd_count: x.chd_count + 1,
          };
        } else {
          return x;
        }
      });

      setSelectedRoom(findRoom);
    }
    console.log(selectedRoom);
  };

  ////dec chd, inf,ext number
  const decDet = (id, type) => {
    if (type === "ext_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x.id === id) {
          if (x.extra_bed_count > 0) {
            return {
              ...x,
              extra_bed_count: x.extra_bed_count - 1,
            };
          } else {
            return {
              ...x,
              extra_bed_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelectedRoom(findRoom);
    } else if (type === "inf_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x.id === id) {
          if (x.inf_count) {
            return {
              ...x,
              inf_count: x.inf_count - 1,
            };
          } else {
            return {
              ...x,
              inf_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelectedRoom(findRoom);
    } else if (type === "chd_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x.id === id) {
          if (x.chd_count) {
            return {
              ...x,
              chd_count: x.chd_count - 1,
            };
          } else {
            return {
              ...x,
              chd_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelectedRoom(findRoom);
    }
    // console.log(selectedRoom);
  };

  ////remove room
  const removeRoom = (id) => {
    const newSelectedRoom = selectedRoom.filter((room) => room.id !== id);
    setSelectedRoom(newSelectedRoom);
  };

  useEffect(() => {
    console.log(router);
    const hotelFnName = router?.query?.availablehotels;
    const hotelName =
      hotelFnName && hotelFnName.length > 2 ? hotelFnName[2] : null;
    if (hotelName) {
      axios
        .post(
          `https://hotelobilit-api.iran.liara.run/api/v1/hotels/search/${hotelName}`,
          {
            origin: router.query.origin,
            dest: router.query.dest,
            stayCount: router.query.night,
            date: jalaliToMiladiConvertor(router.query.stDate),
          }
        )
        .then((res) => {
          setHotel(res.data?.data);
        });
    }

    console.log(hotel);
  }, [router]);

  const twoBedPrcPicker = (rooms, flight) => {
    let fiPrice;
    rooms.map((room) => {
      if (room.room_type_id === 148) {
        fiPrice = roomPrcGen(room, flight);
      }
    });

    return fiPrice;
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
  return (
    <>
      {ismodal && (
        <PictureModal url={ismodal} setIsModal={() => setIsModal()} />
      )}

      <div className={styles["container"]}>
        <div className={styles["hotelDet_container"]}>
          <div className={styles["hotelDet"]}>
            <div className={styles["right"]}>
              <div className={styles["hotelDet-image"]}>
                {hotel?.gallery && (
                  <Image src={hotel.gallery[0].url} height={200} width={300} />
                )}
              </div>
              <div className={styles["hotelDet-names"]}>
                <div className={styles["hotelDet-names_star"]}>
                  {startBuilder(+hotel.stars).map((x) => {
                    return x;
                  })}
                </div>

                <p className={styles["hotelDet-names_faName"]}>
                  {hotel.is_domestic ? hotel.title : hotel.titleEn}
                </p>
                <p className={styles["hotelDet-names_enName"]}>
                  {hotel.is_domestic ? hotel.titleEn : hotel.title}
                </p>
                <div className={styles["hotelDet-names_services"]}>
                  <label htmlFor="">خدمات:</label>
                  <p>ثبت نشده</p>
                </div>
                <div className={styles["hotelDet-names_zone"]}>
                  <label htmlFor="">منطقه:</label>
                  <p>ثبت نشده</p>
                </div>
              </div>
            </div>
            <div className={styles["left"]}>
              {hotel?.gallery && (
                <div className={styles["image_container"]}>
                  <div className={styles["images"]}>
                    <motion.img
                      src={hotel?.gallery[2]?.url}
                      height={100}
                      width={100}
                      whileHover={{ translateY: "-15px" }}
                      onClick={() => {
                        setIsModal(hotel?.gallery[2]?.url);
                      }}
                      layoutId={hotel?.gallery[2]?.url}
                    />
                    <motion.img
                      src={hotel?.gallery[3].url}
                      height={100}
                      width={100}
                      whileHover={{ translateY: "-15px" }}
                      onClick={() => {
                        setIsModal(hotel?.gallery[3]?.url);
                      }}
                      layoutId={hotel?.gallery[3]?.url}
                    />
                    <motion.img
                      src={hotel?.gallery[4].url}
                      height={100}
                      width={100}
                      whileHover={{ translateY: "-15px" }}
                      onClick={() => {
                        setIsModal(hotel?.gallery[4]?.url);
                      }}
                      layoutId={hotel?.gallery[4]?.url}
                    />
                    <motion.img
                      src={hotel?.gallery[5].url}
                      height={100}
                      width={100}
                      whileHover={{ translateY: "-15px" }}
                      onClick={() => {
                        setIsModal(hotel?.gallery[5]?.url);
                      }}
                      layoutId={hotel?.gallery[5]?.url}
                    />
                  </div>
                  <Image src={hotel?.gallery[1].url} height={100} width={100} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles["subscription"]}>
          <p>با بررسی زمان پرواز و قیمت اتاق ها تور خود را انتخاب کنید</p>
        </div>
        {hotel.flights?.map((flight) => {
          return (
            <div className={styles["ticket_container"]}>
              <div className={styles["ticket"]}>
                {/* title col1 */}
                <div className={styles["ticket_titles"]}>
                  <div className={styles["ticket_titles_info"]}>
                    اطلاعات پرواز
                  </div>
                  <div className={styles["ticket_titles_info"]}>
                    <p>اطلاعات اتاق </p>
                  </div>
                </div>
                {/* ticketdet col2 */}
                <div className={styles["ticket_flight"]}>
                  <div className={styles["flightDet_container"]}>
                    <div className={styles["flightDet"]}>
                      <div className={styles["flightDet_title"]}>
                        <p>پرواز رفت</p>
                      </div>
                      <div className={styles["flightDet_loc"]}>
                        <p>
                          {flight.origin_name} به {flight.destination_name}
                        </p>
                      </div>
                      <div className={styles["flightDet_timedate"]}>
                        <span>{flight.time}</span>
                        <span>و</span>
                        <span>{MiladiToJalaliConvertor(flight.date)}</span>
                      </div>
                      <div className={styles["flightDet_hotelEnt"]}>
                        <label htmlFor="">ورود به هتل :</label>
                        <p>
                          {flight.checkin_tomorrow
                            ? MiladiToJalaliConvertorInc(flight.date)
                            : MiladiToJalaliConvertor(flight.date)}
                        </p>
                      </div>
                    </div>

                    <div className={styles["flight_company"]}>
                      <div className={styles["flight_company_logo"]}>
                        <div className={styles["image_container"]}>
                          <img src={flight.airline_thumb.url} alt="" />
                        </div>
                        <p>{flight.airline_name}</p>
                      </div>
                      <div className={styles["flight_company_remaintour"]}>
                        <p>تعداد موجودی پرواز :{flight.capacity}</p>
                      </div>
                      <div className={styles["flight_company_logo"]}>
                        <div className={styles["image_container"]}>
                          <img src={flight.flight.airline_thumb.url} alt="" />
                        </div>
                        <p>{flight.flight.airline_name}</p>
                      </div>
                    </div>

                    <div className={styles["flightDet"]}>
                      <div className={styles["flightDet_title"]}>
                        <p>پرواز برگشت</p>
                      </div>
                      <div className={styles["flightDet_loc"]}>
                        <p>
                          {flight.flight.origin_name} به{" "}
                          {flight.flight.destination_name}
                        </p>
                      </div>
                      <div className={styles["flightDet_timedate"]}>
                        <span>{flight.flight.time}</span>
                        <span>و</span>
                        <span>
                          {MiladiToJalaliConvertor(flight.flight.date)}
                        </span>
                      </div>
                      <div className={styles["flightDet_hotelEnt"]}>
                        <label htmlFor="">خروج از هتل :</label>
                        <p>
                          {" "}
                          {flight.checkout_yesterday === true
                            ? MiladiToJalaliConvertorDec(flight.flight.date)
                            : MiladiToJalaliConvertor(flight.flight.date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles["roomDet_container"]}>
                    {hotel.rooms?.map((room) => {
                      return (
                        <div className={styles["roomDetcard"]}>
                          <div className={styles["roomDetcard_roomnum"]}>
                            <label htmlFor="">{room.room_type}</label>
                            <div
                              className={styles["roomDetcard_roomnum_indec"]}
                            >
                              <div
                                className={styles["in"]}
                                onClick={() =>
                                  IncRoom(
                                    flight.id,
                                    room.room_type_id,
                                    room.room_type,
                                    room.Adl_capacity,
                                    room.rates,
                                    room.id
                                  )
                                }
                              >
                                +
                              </div>
                              <span>{roomCounter(room.room_type_id)}</span>
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

                          <div className={styles["roomDetcard_price"]}>
                            <p>
                              <span>
                                {numberWithCommas(roomPrcGen(room, flight))}
                              </span>
                              تومان
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* reserve col 3 */}
                <div className={styles["ticket_reserve"]}>
                  <p className={styles["priceTitle"]}>قیمت برای هر نفر:</p>
                  <div className={styles["ticket_reserve_price"]}>
                    <label htmlFor="">قیمت:</label>
                    <p>
                      <span>
                        {numberWithCommas(twoBedPrcPicker(hotel.rooms, flight))}
                      </span>
                      تومان
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (selectedRoom.length > 0) {
                        const routerParam = router.query;

                        const finalDet = {
                          checkin: jalaliToMiladiConvertor(routerParam.stDate),
                          stayCount: routerParam.night,
                          rooms: [...roomsGen(selectedRoom)],
                        };
                        router.push(
                          `/tours/reserve/${hotel.id}/${flight.id}?checkin=${
                            finalDet.checkin
                          }&stayCount=${
                            finalDet.stayCount
                          }&rooms=${JSON.stringify(finalDet.rooms)}`
                        );
                      } else {
                        console.log("not enough");
                      }
                    }}
                    className={styles["ticket_reserve_btn"]}
                  >
                    رزرو تور
                  </button>
                </div>
              </div>
              <div
                className={
                  flight.id === isOpen ? styles["open"] : styles["close"]
                }
              >
                {selectedRoom.map((room) => {
                  return (
                    <div className={styles["roomcountDet_container"]}>
                      <div className={styles["roomcountDet"]}>
                        <div
                          className={styles["roomcountDet_remove"]}
                          onClick={() => removeRoom(room.id)}
                        >
                          <svg
                            data-name="Layer 1"
                            height="200"
                            id="Layer_1"
                            viewBox="0 0 200 200"
                            width="200"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title />
                            <path
                              fill="#8d0303"
                              d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"
                            />
                            <path
                              fill="#8d0303"
                              d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"
                            />
                          </svg>
                        </div>
                        <div className={styles["roomcountDet_name"]}>
                          <p>{room.room_type}</p>
                        </div>
                        <div className={styles["roomcountDet_AdlCount"]}>
                          <p>تعداد بزرگسال</p>
                          <p>{room.Adl_capacity}</p>
                        </div>
                        <div className={styles["roomcountDet_bedcount"]}>
                          <p>تعداد تخت اضافه</p>
                          <p>
                            {numberWithCommas(
                              extBedPrcGen(
                                hotel.rooms,
                                flight,
                                room.room_type_id
                              )
                            )}
                            تومان
                          </p>
                          <div
                            className={styles["roomcountDet_bedcount_count"]}
                          >
                            <div
                              className={styles["decin"]}
                              onClick={() => incDet(room.id, "ext_count")}
                            >
                              +
                            </div>
                            <span>{room.extra_bed_count}</span>
                            <div
                              className={styles["decin"]}
                              onClick={() => decDet(room.id, "ext_count")}
                            >
                              -
                            </div>
                          </div>
                        </div>
                        <div className={styles["roomcountDet_bedcount"]}>
                          <p>تعداد نوزاد</p>
                          <p>{numberWithCommas(flight.inf_price)} تومان</p>
                          <div
                            className={styles["roomcountDet_bedcount_count"]}
                          >
                            <div
                              className={styles["decin"]}
                              onClick={() => incDet(room.id, "inf_count")}
                            >
                              +
                            </div>
                            <span>{room.inf_count}</span>
                            <div
                              className={styles["decin"]}
                              onClick={() => decDet(room.id, "inf_count")}
                            >
                              -
                            </div>
                          </div>
                        </div>
                        <div className={styles["roomcountDet_bedcount"]}>
                          <p>تعداد کودک</p>
                          <p>
                            {numberWithCommas(
                              chdPrcGen(hotel.rooms, flight, room.room_type_id)
                            )}{" "}
                            تومان
                          </p>
                          <div
                            className={styles["roomcountDet_bedcount_count"]}
                          >
                            <div
                              className={styles["decin"]}
                              onClick={() => incDet(room.id, "chd_count")}
                            >
                              +
                            </div>
                            <span>{room.chd_count}</span>
                            <div
                              className={styles["decin"]}
                              onClick={() => decDet(room.id, "chd_count")}
                            >
                              -
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AvailableFlightBasedonSelectedTour;
