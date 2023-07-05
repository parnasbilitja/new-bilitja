import React, { useEffect, useState } from "react";
import styles from "../../../styles/newTour/Reserve.module.scss";
import Image from "next/image";
import InfoPasserngers from "./Components/InfoPasserngers";
import { useRouter } from "next/router";
import axios from "axios";
import {
  MiladiToJalaliConvertor,
  MiladiToJalaliConvertorDec,
  MiladiToJalaliConvertorInc,
} from "../../Utils/newTour";
const Reservation = () => {
  const router = useRouter();
  const [hotelDet, setHoteldet] = useState([]);

  useEffect(() => {
    console.log(router);
    if (router.query.rooms && router.query.reservedHotel) {
      const rooms = JSON.parse(router.query.rooms);
      const checkin = router.query.checkin;
      const flight_id = +router.query.reservedHotel[1];
      const hotel_id = +router.query.reservedHotel[0];
      const stayCount = router.query.stayCount;

      console.log(rooms, checkin, flight_id, hotel_id, stayCount);
      axios
        .post(
          "https://hotelobilit-api.iran.liara.run/api/v1/reserves/checking",
          {
            checkin,
            hotel_id,
            flight_id,
            rooms,
            stayCount,
          }
        )
        .then((res) => {
          setHoteldet(res.data.data);
          console.log(res.data.data);
        });
    }
  }, [router]);
  return (
    <div className={styles["p-body"]}>
      <div className={styles["prs-responsive"]}>
        <div className={styles["main-reserve"]}>
          <div className={styles["box-fix-user-reservation"]}>
            <div className={styles["detail-box-fix-user-reservation"]}>
              <div className={styles["p-detail-reservation"]}>
                <div className={styles["p-price"]}>
                  <span>مبلغ قابل پرداخت:</span>
                  <div className={styles["price"]}>
                    <strong>2,000,000</strong>
                    <small>تومان</small>
                  </div>
                </div>
                <div className={styles["count-p"]}>
                  <div className={styles["total"]}>
                    <span>تعداد کل(نفرات) : 2</span>
                  </div>
                  <div className={styles["room"]}>
                    <span>تعداد اتاق انتخابی : 3</span>
                  </div>
                </div>
                <button className="btn-base btn-box-fix">پرداخت آنلاین</button>
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
                  {/* <img src="" width="40" alt="" /> */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      borderRadius: "50%",
                    }}
                  >
                    <Image
                      src={hotelDet?.flight?.airline_thumb?.url}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover" }}
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
                  <Image
                    src="https://hotelobilit.com/assets/img/moon.png"
                    width={30}
                    height={30}
                    alt=""
                  />
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
                    <Image
                      src={hotelDet?.flight?.flight.airline_thumb?.url}
                      width={40}
                      height={40}
                      style={{ objectFit: "cover" }}
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

            <InfoPasserngers />
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
