import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Reservation from "../../../Components/NewTours/Reservation";
import NavHandler from "../../../Components/share/NavHandler";
import axios from "axios";
import { jalaliToMiladiConvertor } from "../../../Utils/newTour";
import moment from "moment-jalaali";
import Footer from "../../../sources/component/Footer.component";
import Head from "next/head";
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

                setHoteldet(res?.data);
            })
    }
  }, [router]);


  return (
    <>
      <NavHandler />
      <div style={{ paddingTop: "7rem"  }}>
          <Head>
              <title>همنواز | تور</title>
          </Head>
        <Reservation hotelDet={hotelDet} stayCount={stayCount} ref_code={router?.query?.ref_code}/>
      </div>
        <Footer/>
    </>
  );
};

export default ReservedHotel;
