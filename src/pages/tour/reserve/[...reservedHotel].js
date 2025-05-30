import {useRouter, withRouter} from "next/router";
import React, { useEffect, useState } from "react";
import Reservation from "../../../Components/NewTours/Reservation";
import NavHandler from "../../../Components/share/NavHandler";
import axios from "axios";
import moment from "moment-jalaali";
import Head from "next/head";
import {accountBoxModify, messageBoxModify} from "../../../Redux/UI/ui.action";
import {selectProperties} from "../../../Redux/Reserve/reserve.reselect";
import globals from "../../../sources/Global";

const ReservedHotel = (props) => {
  const router = useRouter();
  const [hotelDet, setHoteldet] = useState([]);
  const [stayCount, setStayCount] = useState();
  useEffect(() => {
    if (router?.query?.ref_code) {

      setStayCount(moment(router.query.checkout).diff(router.query.checkin, "days"));
            axios.get(
               `${globals.tourPackages}reserves/${router?.query?.ref_code
               }`,
                {
                    headers: {
                        "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
                    }
                }
                ).then(res=>{

                setHoteldet(res?.data);

  

            })
    }
  }, [router]);



  return (
    <>
      <NavHandler />
      <div className='reservedHotelcon'>
          <Head>
               <title>بلیطجا | تور</title>
          </Head>
        <Reservation roomsCount={router.query.rooms} hotelDet={hotelDet} stayCount={stayCount} ref_code={router?.query?.ref_code}/>
      </div>
        {/*<Footer/>*/}
    </>
  );
};

const mapStateToProps = (state) => {
    return {
        reserveProperties: selectProperties(state),
        user: state.user,
    }
};
const mapDispatchToProps = (dispatch) => ({
    accountBoxModify: (value) => dispatch(accountBoxModify(value)),
    // addReservationProperties: async (value) =>
    //     dispatch(addReservationProperties(value)),
    // messageBoxModify: (value) => dispatch(messageBoxModify(value)),
})

export default   ReservedHotel;
