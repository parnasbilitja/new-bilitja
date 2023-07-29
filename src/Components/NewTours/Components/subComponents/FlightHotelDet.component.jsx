import React from "react";
import {
  MiladiToJalaliConvertor,
  MiladiToJalaliConvertorDec,
  MiladiToJalaliConvertorInc,
  chdPrcGen,
  dateDiffChecker,
  extBedPrcGen,
  flightDateChecker,
  numberWithCommas,
  reservePrc,
  roomPrcGen,
} from "../../../../Utils/newTour";
import styles from "../../../../../styles/newTour/components/subComponent/FlightHotelDet.module.scss";

import { motion } from "framer-motion";
import { Err, ErrSuccess } from "../NotifAlert.component";
import { useRouter } from "next/router";
const FlightHotelDet = (props) => {
  const router = useRouter();
  return (
    <>
      {props.hotel.flights?.map((flight) => {
        return props.widthmobi > 868 ? (
          dateDiffChecker(
            flightDateChecker(flight).checkin,
            flightDateChecker(flight).checkout,
            props?.night
          ) ? (
            <div className={styles["ticket_container"]}>
              <div className={styles["container"]}>
                {props.isOpen === 0 ? null : props.isOpen ===
                  flight.id ? null : (
                  <motion.div
                    className={styles["blur"]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.4 }}
                  ></motion.div>
                )}
                <div className={styles["ticket"]}>
                  {/* title col1 */}
                  <div className={styles["ticket_titles"]}>
                    <div
                      className={styles["ticket_titles_info"]}
                      style={props.isOpen === flight.id ? { padding: 0 } : null}
                    >
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
                        <div className={styles["flightDet_props.Ent"]}>
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
                            <img src={flight?.airline_thumb?.url} alt="" />
                          </div>
                          <p>{flight.airline_name}</p>
                        </div>
                        <div className={styles["flight_company_remaintour"]}>
                          <p className={styles["p-middle"]}>
                            تعداد موجودی پرواز :{flight.capacity}
                          </p>
                        </div>
                        <div className={styles["flight_company_logo"]}>
                          <div className={styles["image_container"]}>
                            <img
                              src={flight?.flight?.airline_thumb?.url}
                              alt=""
                            />
                          </div>
                          <p>{flight?.flight?.airline_name}</p>
                        </div>
                      </div>

                      <div className={styles["flightDet"]}>
                        <div className={styles["flightDet_title"]}>
                          <p>پرواز برگشت</p>
                        </div>
                        <div className={styles["flightDet_loc"]}>
                          <p>
                            {flight?.flight?.origin_name} به{" "}
                            {flight?.flight?.destination_name}
                          </p>
                        </div>
                        <div className={styles["flightDet_timedate"]}>
                          <span>{flight?.flight?.time}</span>
                          <span>و</span>
                          <span>
                            {MiladiToJalaliConvertor(flight?.flight?.date)}
                          </span>
                        </div>
                        <div className={styles["flightDet_hotelEnt"]}>
                          <label htmlFor="">خروج از هتل :</label>
                          <p>
                            {" "}
                            {flight.checkout_yesterday === true
                              ? MiladiToJalaliConvertorDec(flight?.flight?.date)
                              : MiladiToJalaliConvertor(flight?.flight?.date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles["roomDet_container"]}>
                      {props.hotel.rooms?.map((room) => {
                        return (
                          <div className={styles["roomDetcard"]}>
                            <div className={styles["roomDetcard_roomnum"]}>
                              <label htmlFor="">{room.room_type}</label>
                              <div
                                className={styles["roomDetcard_roomnum_indec"]}
                              >
                                <div
                                  className={styles["in"]}
                                  onClick={() => {
                                    props.IncRoom(
                                      flight.id,
                                      room.room_type_id,
                                      room.room_type,
                                      room.Adl_capacity,
                                      room.rates,
                                      room.id,
                                      room.chd_capacity
                                    );
                                  }}
                                >
                                  +
                                </div>
                                <span>
                                  {props.roomCounter(room.room_type_id)}
                                </span>
                                <div
                                  className={
                                    props.roomCounter(room.room_type_id) === 0
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
                    <div className="d-flex flex-column align-items-center">
                      <p className={styles["priceTitle"]}>قیمت برای هر نفر:</p>
                      <div className={styles["ticket_reserve_price"]}>
                        <label htmlFor="">قیمت:</label>
                        <p>
                          <span>
                            {numberWithCommas(
                              reservePrc(props.hotel?.rooms, flight)
                            )}
                          </span>
                          تومان
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (props.selectedRoom.length > 0) {
                          ErrSuccess(
                            "به صفحه تکمیل اطلاعات و رزرو منتقل می‌شوید"
                          );
                          const routerParam = router.query;
                          const finalDet = {
                            checkin: flight.checkin_tomorrow
                              ? MiladiToJalaliConvertorInc(flight.date)
                              : MiladiToJalaliConvertor(flight.date),
                            checkout: flight.checkout_yesterday
                              ? MiladiToJalaliConvertorDec(flight?.flight?.date)
                              : MiladiToJalaliConvertor(flight?.flight?.date),
                            stayCount: routerParam.night,
                            rooms: [...props.roomsGen(props.selectedRoom)],
                          };
                          router.push(
                            `/tours/reserve/${props.hotel.id}/${
                              flight.id
                            }?checkin=${finalDet.checkin}&checkout=${
                              finalDet.checkout
                            }&rooms=${JSON.stringify(finalDet.rooms)}`
                          );
                        } else {
                          Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
                        }
                      }}
                      className={styles["ticket_reserve_btn"]}
                    >
                      رزرو تور
                    </button>
                  </div>
                </div>
              </div>
              {flight.id === props.isOpen ? (
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
                  {props.selectedRoom.map((room) => {
                    return (
                      <div className={styles["roomcountDet_container"]}>
                        <div className={styles["roomcountDet"]}>
                          <div
                            className={styles["roomcountDet_remove"]}
                            onClick={() => {
                              removeRoom(room.id);
                            }}
                          >
                            <svg
                              data-name="Layer 1"
                              height="150"
                              id="Layer_1"
                              viewBox="0 0 200 200"
                              width="150"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title />
                              <path
                                fill="#e20000"
                                d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"
                              />
                              <path
                                fill="#e20000"
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
                            <p className={styles["bedtype"]}>تعداد تخت اضافه</p>
                            <p className={styles["bedtypeprc"]}>
                              {numberWithCommas(
                                extBedPrcGen(
                                  props.hotel.rooms,
                                  flight,
                                  room.room_type_id
                                )
                              )}{" "}
                              تومان
                            </p>

                            <div
                              className={styles["roomcountDet_bedcount_count"]}
                            >
                              <div
                                className={styles["decin"]}
                                onClick={() => props.incDet(room, "ext_count")}
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
                            <p className={styles["bedtype"]}>تعداد نوزاد</p>
                            <p className={styles["bedtypeprc"]}>
                              {numberWithCommas(flight.inf_price)} تومان
                            </p>
                            <div
                              className={styles["roomcountDet_bedcount_count"]}
                            >
                              <div
                                className={styles["decin"]}
                                onClick={() => props.incDet(room, "inf_count")}
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
                            <p className={styles["bedtype"]}>تعداد کودک</p>
                            <p className={styles["bedtypeprc"]}>
                              {numberWithCommas(
                                chdPrcGen(
                                  props.hotel.rooms,
                                  flight,
                                  room.room_type_id
                                )
                              )}{" "}
                              تومان
                            </p>
                            <div
                              className={styles["roomcountDet_bedcount_count"]}
                            >
                              <div
                                className={styles["decin"]}
                                onClick={() => props.incDet(room, "chd_count")}
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
                </motion.div>
              ) : null}
            </div>
          ) : null
        ) : dateDiffChecker(
            flightDateChecker(flight).checkin,
            flightDateChecker(flight).checkout,
            props?.night
          ) ? (
          <div>
            <div className={styles["ticket_container"]}>
              <div className={styles["container"]}>
                {props.isOpen === 0 ? null : props.isOpen ===
                  flight.id ? null : (
                  <motion.div
                    className={styles["blur"]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeOut", duration: 0.4 }}
                  ></motion.div>
                )}
                <div className={styles["ticket"]}>
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
                            <img src={flight?.airline_thumb?.url} alt="" />
                          </div>
                          <p>{flight.airline_name}</p>
                        </div>
                        <div className={styles["flight_company_remaintour"]}>
                          <p className={styles["p-middle"]}>
                            تعداد موجودی پرواز :{flight.capacity}
                          </p>
                        </div>
                        <div className={styles["flight_company_logo"]}>
                          <div className={styles["image_container"]}>
                            <img
                              src={flight?.flight?.airline_thumb?.url}
                              alt=""
                            />
                          </div>
                          <p>{flight?.flight?.airline_name}</p>
                        </div>
                      </div>

                      <div className={styles["flightDet"]}>
                        <div className={styles["flightDet_title"]}>
                          <p>پرواز برگشت</p>
                        </div>
                        <div className={styles["flightDet_loc"]}>
                          <p>
                            {flight?.flight?.origin_name} به{" "}
                            {flight?.flight?.destination_name}
                          </p>
                        </div>
                        <div className={styles["flightDet_timedate"]}>
                          <span>{flight?.flight?.time}</span>
                          <span>و</span>
                          <span>
                            {MiladiToJalaliConvertor(flight?.flight?.date)}
                          </span>
                        </div>
                        <div className={styles["flightDet_hotelEnt"]}>
                          <label htmlFor="">خروج از هتل :</label>
                          <p>
                            {" "}
                            {flight.checkout_yesterday === true
                              ? MiladiToJalaliConvertorDec(flight?.flight?.date)
                              : MiladiToJalaliConvertor(flight?.flight?.date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles["roomDet_container"]}>
                      {props.hotel.rooms?.map((room) => {
                        return (
                          <div className={styles["roomDetcard"]}>
                            <div className={styles["roomDetcard_roomnum"]}>
                              <label htmlFor="">{room.room_type}</label>
                              <div
                                className={styles["roomDetcard_roomnum_indec"]}
                              >
                                <div
                                  className={styles["in"]}
                                  onClick={() => {
                                    props.IncRoom(
                                      flight.id,
                                      room.room_type_id,
                                      room.room_type,
                                      room.Adl_capacity,
                                      room.rates,
                                      room.id,
                                      room.chd_capacity
                                    );
                                  }}
                                >
                                  +
                                </div>
                                <span>
                                  {props.roomCounter(room.room_type_id)}
                                </span>
                                <div
                                  className={
                                    props.roomCounter(room.room_type_id) === 0
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
                </div>
                <div className={styles["ticket_reserve"]}>
                  <div className="d-flex flex-column align-items-center">
                    <p className={styles["priceTitle"]}>قیمت برای هر نفر:</p>
                    <div className={styles["ticket_reserve_price"]}>
                      <label htmlFor="">قیمت:</label>
                      <p>
                        <span>
                          {numberWithCommas(
                            reservePrc(props.hotel.rooms, flight)
                          )}
                        </span>
                        تومان
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (props.selectedRoom.length > 0) {
                        ErrSuccess(
                          "به صفحه تکمیل اطلاعات و رزرو منتقل می‌شوید"
                        );
                        const routerParam = props.router.query;
                        const finalDet = {
                          checkin: flight.checkin_tomorrow
                            ? MiladiToJalaliConvertorInc(flight.date)
                            : MiladiToJalaliConvertor(flight.date),
                          checkout: flight.checkout_yesterday
                            ? MiladiToJalaliConvertorDec(flight?.flight?.date)
                            : MiladiToJalaliConvertor(flight?.flight?.date),
                          stayCount: routerParam.night,
                          rooms: [...roomsGen(props.selectedRoom)],
                        };
                        props.router.push(
                          `/tours/reserve/${props.hotel.id}/${
                            flight.id
                          }?checkin=${finalDet.checkin}&checkout=${
                            finalDet.checkout
                          }&rooms=${JSON.stringify(finalDet.rooms)}`
                        );
                      } else {
                        Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
                      }
                    }}
                    className={styles["ticket_reserve_btn"]}
                  >
                    رزرو تور
                  </button>
                </div>
              </div>

              {flight.id === props.isOpen ? (
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
                  {props.selectedRoom.map((room) => {
                    return (
                      <div className={styles["roomcountDet_container"]}>
                        <div className={styles["roomcountDet"]}>
                          <div
                            className={styles["roomcountDet_remove"]}
                            onClick={() => {
                              removeRoom(room.id);
                            }}
                          >
                            <svg
                              data-name="Layer 1"
                              height="150"
                              id="Layer_1"
                              viewBox="0 0 200 200"
                              width="150"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title />
                              <path
                                fill="#e20000"
                                d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"
                              />
                              <path
                                fill="#e20000"
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
                            <p className={styles["bedtype"]}>تعداد تخت اضافه</p>
                            <p className={styles["bedtypeprc"]}>
                              {numberWithCommas(
                                extBedPrcGen(
                                  props.hotel.rooms,
                                  flight,
                                  room.room_type_id
                                )
                              )}{" "}
                              تومان
                            </p>

                            <div
                              className={styles["roomcountDet_bedcount_count"]}
                            >
                              <div
                                className={styles["decin"]}
                                onClick={() => props.incDet(room, "ext_count")}
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
                            <p className={styles["bedtype"]}>تعداد نوزاد</p>
                            <p className={styles["bedtypeprc"]}>
                              {numberWithCommas(flight.inf_price)} تومان
                            </p>
                            <div
                              className={styles["roomcountDet_bedcount_count"]}
                            >
                              <div
                                className={styles["decin"]}
                                onClick={() => props.incDet(room, "inf_count")}
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
                            <p className={styles["bedtype"]}>تعداد کودک</p>
                            <p className={styles["bedtypeprc"]}>
                              {numberWithCommas(
                                chdPrcGen(
                                  props.hotel.rooms,
                                  flight,
                                  room.room_type_id
                                )
                              )}{" "}
                              تومان
                            </p>
                            <div
                              className={styles["roomcountDet_bedcount_count"]}
                            >
                              <div
                                className={styles["decin"]}
                                onClick={() => props.incDet(room, "chd_count")}
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
                </motion.div>
              ) : null}
            </div>
          </div>
        ) : null;
      })}
    </>
  );
};

export default FlightHotelDet;
