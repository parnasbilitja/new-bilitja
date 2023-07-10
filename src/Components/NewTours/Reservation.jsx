import React, { useEffect, useState } from "react";
import styles from "../../../styles/newTour/Reserve.module.scss";
import Image from "next/image";
import InfoPasserngers from "./Components/InfoPasserngers";
import {
  MiladiToJalaliConvertor,
  MiladiToJalaliConvertorDec,
  MiladiToJalaliConvertorInc,
  chdPrcGen,
} from "../../Utils/newTour";
const Reservation = ({ hotelDet }) => {
  console.log(hotelDet.rooms_selected);
  const roomNameChecker = (room_id) => {
    const roomName = hotelDet?.rooms?.filter((room) => room.id === room_id);
    return roomName[0]?.room_type;
  };
  const [dataq, setDataq] = useState([
    {
      passengers: [],
      room_id: null,
    },
  ]);

  useEffect(() => {
    console.log("dsjfgsjk", dataq);
  }, [dataq]);

  const [reformSelectedRooms, setReformSelectedRooms] = useState([]);
  useEffect(() => {
    if (hotelDet?.rooms_selected && hotelDet?.rooms) {
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

  return (
    <div className={styles["p-body"]}>
      <div className={styles["prs-responsive"]}>
        <div className={styles["main-reserve"]}>
          <div className={styles["box-fix-user-reservation"]}>
            <div className={styles["detail-box-fix-user-reservation"]}>
              <div className={styles["p-detail-reservation"]}>
                <div className={styles["priceDet"]}>
                  <p>
                    مبلغ کل: ...........................<span>2000</span> تومان
                  </p>
                  <p>
                    {" "}
                    اعتبار کیف پول شما: ...........................
                    <span>1000</span> تومان
                  </p>
                  <p>
                    مبلغ قابل پرداخت: ...........................
                    <span>1000</span> تومان
                  </p>
                </div>
                <div className={styles["paymentoption"]}>
                  <div className={styles["payment_container"]}>
                    <div className={styles["payment"]}>
                      <input type="checkbox" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/L_O_G_O-new_color-01.jpg" />
                    </div>
                  </div>
                </div>
                <div className={styles["finalprice"]}>
                  <div className={styles["totalprice_container"]}>
                    <p>مبلغ قابل پرداخت:</p>

                    <p>
                      <span>1200000</span>
                      تومان
                    </p>
                  </div>
                </div>
                <div className={styles["paymentbtn"]}>
                  <button>پرداخت با کارت شتاب</button>
                  <p>انصراف از خرید</p>
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
          <div className={styles["box-top-box-reserve"]}>
            <div className={styles["flight-title-container"]}>
              <h3>پرواز رفت</h3>
              <h3>پرواز برگشت</h3>
            </div>
            <div className={styles["set-request-tour"]}>
              <div className={styles["info-from"]}>
                <div className={styles["orgdest-cities"]}>
                  <span className={styles["city-name"]}>
                    {hotelDet?.flight?.origin_name}
                  </span>
                  <strong>به</strong>
                  <strong className={styles["city-name"]}>
                    {hotelDet?.flight?.destination_name}
                  </strong>
                </div>
                <div className={styles["p-airline-top"]}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      src={hotelDet?.flight?.airline_thumb?.url}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <span>{hotelDet?.flight?.flight.airline_name}</span>
                </div>
                <div className={styles["end-box"]}>
                  <div className={styles["date"]}>
                    <span>تاریخ :</span>
                    <strong>
                      {MiladiToJalaliConvertor(hotelDet?.flight?.date)}
                    </strong>
                  </div>
                  <div className={styles["time"]}>
                    <span>ساعت :</span>
                    <strong>{hotelDet?.flight?.time}</strong>
                  </div>
                </div>
                <div className={`${styles["end-box"]} ${styles["center"]}`}>
                  <div className={styles["date"]}>
                    <small>تاریخ ورود به هتل :</small>
                    <strong>
                      {hotelDet?.flight?.checkin_tomorrow
                        ? MiladiToJalaliConvertorInc(hotelDet?.flight?.date)
                        : MiladiToJalaliConvertor(hotelDet?.flight?.date)}
                    </strong>
                  </div>
                </div>
              </div>

              <div className={styles["info-time"]}>
                <div className={styles["nightlogo"]}>
                  <img src="https://hotelobilit.com/assets/img/moon.png" />
                </div>
                <span className={styles["title"]}>مدت اقامت:</span>
                <span className={styles["text"]}>۵ شب و ۶ روز</span>
              </div>

              <div className={styles["info-from"]}>
                <div className={styles["orgdest-cities"]}>
                  <span className={styles["city-name"]}>
                    {" "}
                    {hotelDet?.flight?.destination_name}
                  </span>
                  <strong>به</strong>
                  <strong className={styles["city-name"]}>
                    {" "}
                    {hotelDet?.flight?.origin_name}
                  </strong>
                </div>
                <div className={styles["p-airline-top"]}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      borderRadius: "50%",
                    }}
                  >
                    <img
                      src={hotelDet?.flight?.flight.airline_thumb?.url}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <span>{hotelDet?.flight?.flight.airline_name}</span>
                </div>
                <div className={styles["end-box"]}>
                  <div className={styles["date"]}>
                    <span>تاریخ :</span>
                    <strong>
                      {MiladiToJalaliConvertor(hotelDet?.flight?.flight.date)}
                    </strong>
                  </div>
                  <div className={styles["time"]}>
                    <span>ساعت :</span>
                    <strong>{hotelDet?.flight?.flight.time}</strong>
                  </div>
                </div>
                <div className={`${styles["end-box"]} ${styles["center"]}`}>
                  <div className={styles["date"]}>
                    <small>تاریخ خروج از هتل :</small>
                    <strong>
                      {" "}
                      {hotelDet?.flight?.flight.checkout_yesterday
                        ? MiladiToJalaliConvertorDec(
                            hotelDet?.flight?.flight.date
                          )
                        : MiladiToJalaliConvertor(
                            hotelDet?.flight?.flight.date
                          )}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <h2 className={styles["reserver-info"]}>
              <strong>اطلاعات رزروگیرنده</strong>

              <span className="font-size-13">
                (این مشخصات به عنوان طرف قرارداد درنظر گرفته می شود)
              </span>
            </h2>

            <div className={styles["set-info-supervisor"]}>
              <div className={styles["item-form"]}>
                <div className={styles["inp-form"]}>
                  <input type="text" placeholder="نام و نام خانوادگی" />
                </div>
              </div>
              <div className={styles["item-form"]}>
                <div className={styles["inp-form"]}>
                  <input type="text" placeholder="کد ملی" />
                </div>
              </div>
              <div className={styles["item-form"]}>
                <div className={styles["inp-form"]}>
                  <input type="text" placeholder="شماره همراه" />
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: "1.5rem" }}>اطلاعات مسافران</h2>
            <form>
              {reformSelectedRooms?.map((room) => (
                <InfoPasserngers
                  room={room}
                  hotelDets={hotelDet}
                  roomName={roomNameChecker(room.room_id)}
                  room_type_id={room.room_type_id}
                  newSelectedRooms={reformSelectedRooms}
                  dataq={dataq}
                  setDataq={setDataq}
                />
              ))}
            </form>

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
