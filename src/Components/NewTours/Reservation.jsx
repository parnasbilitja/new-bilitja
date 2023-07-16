import React, { useEffect, useState } from "react";
import styles from "../../../styles/newTour/Reserve.module.scss";
import InfoPasserngers from "./Components/InfoPasserngers";
import { numberWithCommas, roomNameChecker } from "../../Utils/newTour";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import TourDetailLabel from "./Components/subComponents/TourDetailLabel.component";
import { useRouter } from "next/router";
const Reservation = ({ hotelDet, stayCount }) => {
  console.log("from reservation", hotelDet);
  const [dataq, setDataq] = useState([]);
  const { register, handleSubmit } = useForm();
  const [reserverData, setReserverData] = useState([]);
  const [reformSelectedRooms, setReformSelectedRooms] = useState([]);
  const [evRoomsPrc, setEvRoomsPrc] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (hotelDet?.rooms_selected && hotelDet?.rooms) {
      console.log("saa", hotelDet?.rooms_selected);
      const newSelectedRooms = [];
      hotelDet?.rooms_selected?.map((roomselected) => {
        hotelDet?.rooms?.map((room) => {
          if (room.id === roomselected.room_id) {
            newSelectedRooms.push({
              ...roomselected,
              room_type_id: room.room_type_id,
              id: Math.random() * 100,
            });
          }
        });
      });

      setReformSelectedRooms(newSelectedRooms);
    }
  }, [hotelDet?.rooms_selected]);

  const TotalPrcGen = (prcArr) => {
    let total = prcArr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    return total;
  };
  useEffect(() => {
    console.log("arr", [reformSelectedRooms]);
  }, [reformSelectedRooms]);

  const personCounter = (arr) => {
    let people = 0;
    arr.map((pers) => {
      people += pers.adl_count;
      people += pers.chd_count;
      people += pers.inf_count;
      people += pers.extra_count;
    });

    return people;
  };

  return (
    <div className={styles["p-body"]}>
      <div className={styles["prs-responsive"]}>
        <div className={styles["main-reserve"]}>
          <div className={styles["box-fix-user-reservation"]}>
            <div className={styles["detail-box-fix-user-reservation"]}>
              <div className={styles["p-detail-reservation"]}>
                <div className={styles["priceDet_container"]}>
                  <div className={styles["priceDet"]}>
                    {/* <p>
                      {" "}
                      اعتبار کیف پول شما: ...........................
                      <span>1000</span> تومان
                    </p> */}
                    <div className={styles["price-title"]}>
                      <p>مبلغ قابل پرداخت:</p>
                    </div>
                    <div className={styles["price"]}>
                      <p>{numberWithCommas(TotalPrcGen(evRoomsPrc))}تومان</p>
                    </div>{" "}
                  </div>
                </div>

                <div className={styles["finalprice"]}>
                  <div className={styles["totalprice_container"]}>
                    <div>
                      <p>
                        تعداد کل نفرات:
                        <span>{personCounter(reformSelectedRooms)}</span>
                      </p>
                    </div>
                    <div>
                      <p>
                        تعداد کل اتاق: <span>{reformSelectedRooms.length}</span>
                      </p>
                    </div>

                    <p></p>
                  </div>
                </div>
                <div className={styles["paymentbtn"]}>
                  <button
                    onClick={() => {
                      // let flight_id = hotelDet.flight.flight.id;
                      // let hotel_id = hotelDet.hotel.id;
                      // let checkin = hotelDet.flight.date;
                      // let reserver_full_name = reserverData.reserver_full_name;
                      // let reserver_id_code = reserverData.reserver_id_code;
                      // let reserver_phone = reserverData.reserver_phone;
                      // axios.post(
                      //   "https://hotelobilit-api.iran.liara.run/api/v1/reserves",
                      //   {
                      //     checkin,
                      //     flight_id,
                      //     hotel_id,
                      //     reserver_full_name,
                      //     reserver_id_code,
                      //     reserver_phone,
                      //     rooms: [...dataq],
                      //     stayCount,
                      //   }
                      // );
                      let rooms = [...dataq];
                      let flight_id = hotelDet.flight.flight.id;
                      let hotel_id = hotelDet.hotel.id;

                      let reserverdata = [reserverData];

                      router.push(
                        `/tours/reserve/reserveconfirmation/${hotel_id}/${flight_id}?reserverData=${JSON.stringify(
                          reserverdata
                        )}&hotel=${JSON.stringify(
                          hotelDet
                        )}&rooms=${JSON.stringify(rooms)}&fiPrc=${TotalPrcGen(
                          evRoomsPrc
                        )}`
                      );
                    }}
                  >
                    تاییدیه اولیه
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["tourDet-container"]}>
            <div className={styles["tourDet"]}>
              <h2 className={styles["title-tour"]}>اطلاعات تور</h2>
            </div>
            <div className={styles["selected-hotel"]}>
              <h2>هتل انتخابی : </h2>
              <div className={styles["selected-hotel-names"]}>
                <h2>
                  {hotelDet?.hotel?.is_domestic
                    ? hotelDet?.hotel?.title
                    : hotelDet?.hotel?.titleEn}
                </h2>
                <p>
                  {" "}
                  {hotelDet?.hotel?.is_domestic
                    ? hotelDet?.hotel?.titleEn
                    : hotelDet?.hotel?.title}
                </p>
              </div>
            </div>
          </div>

          {/* {hotelDet?.flight ?} */}
          <div className={styles["box-top-box-reserve"]}>
            <div className={styles["flight-title-container"]}>
              <h3>پرواز رفت</h3>
              <h3>پرواز برگشت</h3>
            </div>
            {hotelDet?.flight ? (
              <TourDetailLabel
                flightDet={hotelDet?.flight}
                stayCount={stayCount}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className={styles["box-top-box-reserve2"]}
              >
                {/* <div className={styles["skew"]}></div> */}
              </motion.div>
            )}

            <h2 className={styles["reserver-info"]}>
              <strong>اطلاعات رزروگیرنده</strong>

              <span className="font-size-13">
                (این مشخصات به عنوان طرف قرارداد درنظر گرفته می شود)
              </span>
            </h2>

            <form
              className={styles["set-info-supervisor"]}
              onChange={handleSubmit((data) => {
                setReserverData(data);
              })}
            >
              <div className={styles["item-form"]}>
                <div className={styles["inp-form"]}>
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    {...register("reserver_full_name")}
                  />
                </div>
              </div>
              <div className={styles["item-form"]}>
                <div className={styles["inp-form"]}>
                  <input
                    type="text"
                    placeholder="کد ملی"
                    {...register("reserver_id_code")}
                  />
                </div>
              </div>
              <div className={styles["item-form"]}>
                <div className={styles["inp-form"]}>
                  <input
                    type="text"
                    placeholder="شماره همراه"
                    {...register("reserver_phone")}
                  />
                </div>
              </div>
            </form>

            <h2 style={{ fontSize: "1.5rem" }}>اطلاعات مسافران</h2>

            {reformSelectedRooms?.map((room) => (
              <InfoPasserngers
                room={room}
                hotelDets={hotelDet}
                roomName={roomNameChecker(hotelDet?.rooms, room.room_id)}
                room_type_id={room.room_type_id}
                newSelectedRooms={reformSelectedRooms}
                dataq={dataq}
                setDataq={setDataq}
                setEvRoomsPrc={setEvRoomsPrc}
              />
            ))}

            <div className={styles["rules"]}>
              <p>
                ثبت درخواست به منزله پذیرش تمام
                <a>قوانین و مقررات</a>
                قوانین و مقررات مرتبط با سایت هتل و بلیط و پکیجهای این تور می
                باشد
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
