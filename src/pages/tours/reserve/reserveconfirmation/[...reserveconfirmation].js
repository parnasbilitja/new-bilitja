import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TourDetailLabel from "../../../../Components/NewTours/Components/subComponents/TourDetailLabel.component";
import NavHandler from "../../../../Components/share/NavHandler";
import styles from "../../../../../styles/newTour/ReservationConfirmation.module.scss";
import RoomsInfo from "../../../../Components/NewTours/Components/RoomsInfo.component";
import { roomNameChecker } from "../../../../Utils/newTour";
const ReservationConfirmation = () => {
  const [hotelDet, setHotelDet] = useState();
  const [reservedRooms, setReservedRooms] = useState();

  const router = useRouter();

  useEffect(() => {
    if (router.query.hotel) {
      setHotelDet(JSON.parse(router?.query?.hotel));

      setReservedRooms(JSON.parse(router?.query?.rooms));
    }
  }, [router]);

  useEffect(() => {
    console.log(reservedRooms);
  }, [reservedRooms]);
  return (
    <>
      <NavHandler />
      <div className={styles["reserveinfo_container"]}>
        <TourDetailLabel flightDet={hotelDet?.flight} />

        {reservedRooms?.map((reservedroom) => {
          return (
            <RoomsInfo
              roomName={roomNameChecker(hotelDet.rooms, reservedroom.room_id)}
              reservedRooms={reservedroom}
            />
          );
        })}
        <div className={styles["detail-box-fix-user-reservation"]}>
          <div className={styles["p-detail-reservation"]}>
            <div className={styles["priceDet_container"]}>
              <div className={styles["priceDet"]}>
                <p>
                  مبلغ کل: ...........................
                  <span>
                    {/* {numberWithCommas(TotalPrcGen(evRoomsPrc))} */}
                  </span>{" "}
                  تومان
                </p>
                {/* <p>
                      {" "}
                      اعتبار کیف پول شما: ...........................
                      <span>1000</span> تومان
                    </p> */}
                <p>
                  مبلغ قابل پرداخت: ...........................
                  <span>
                    {/* {numberWithCommas(TotalPrcGen(evRoomsPrc))} */}
                  </span>{" "}
                  تومان
                </p>
              </div>
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
                  <span>
                    {/* {numberWithCommas(TotalPrcGen(evRoomsPrc))} */}
                  </span>
                  تومان
                </p>
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
                    )}&hotel=${JSON.stringify(hotelDet)}&rooms=${JSON.stringify(
                      rooms
                    )}`
                  );
                }}
              >
                پرداخت با کارت شتاب
              </button>
              <p>انصراف از خرید</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationConfirmation;
