import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Reservation from "../../../Components/NewTours/Reservation";
import NavHandler from "../../../Components/share/NavHandler";
import axios from "axios";
import { jalaliToMiladiConvertor } from "../../../Utils/newTour";
import moment from "moment-jalaali";
import Footer from "../../../sources/component/Footer.component";
const ReservedHotel = () => {
  const router = useRouter();
  const [hotelDet, setHoteldet] = useState([]);
  const [stayCount, setStayCount] = useState();
  useEffect(() => {
    if (router?.query?.ref_code) {
        console.log('dsa',router.query)
      setStayCount(moment(router.query.checkout).diff(router.query.checkin, "days"));
            axios.get(
               ` https://hotelobilit-api.iran.liara.run/api/v2/reserves/${router?.query?.ref_code
               }`).then(res=>{

                console.log(res?.data)
                setHoteldet(res?.data);
            })
    }
  }, [router]);

  // useEffect(()=>{
  //     console.log('sadas',hotelDet)
  // },[hotelDet])
  return (
    <>
      <NavHandler />
      <div style={{ paddingTop: "7rem" }}>
        <Reservation hotelDet={hotelDet} stayCount={stayCount} />
      </div>
        <Footer/>
    </>
  );
};

export default ReservedHotel;
