import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Reservation from "../../../Components/NewTours/Reservation";
import NavHandler from "../../../Components/share/NavHandler";
import axios from "axios";
const ReservedHotel = () => {
  const router = useRouter();
  const [hotelDet, setHoteldet] = useState([]);
  const [stayCount, setStayCount] = useState();
  useEffect(() => {
    console.log("dasda", router.query);
    if (router.query.rooms && router.query.reservedHotel) {
      const rooms = JSON.parse(router.query.rooms);
      const checkin = router.query.checkin;
      const flight_id = +router.query.reservedHotel[1];
      const hotel_id = +router.query.reservedHotel[0];
      const stayCount = router.query.stayCount;
      setStayCount(stayCount);
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
          setHoteldet(res?.data.data);
          console.log(res.data.data);
        });
    }
  }, [router]);
  return (
    <>
      <NavHandler />
      <div style={{ paddingTop: "7rem" }}>
        <Reservation hotelDet={hotelDet} stayCount={stayCount} />
      </div>
    </>
  );
};

export default ReservedHotel;
