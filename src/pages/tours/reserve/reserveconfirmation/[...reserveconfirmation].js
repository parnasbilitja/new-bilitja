import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TourDetailLabel from "../../../../Components/NewTours/Components/subComponents/TourDetailLabel.component";

import styles from "../../../../../styles/newTour/ReservationConfirmation.module.scss";
import RoomsInfo from "../../../../Components/NewTours/Components/RoomsInfo.component";
import {numberWithCommas, roomNameChecker} from "../../../../Utils/newTour";
import NabvarCustom from "../../../../sources/component/NabvarCustom";
import {motion, AnimatePresence} from "framer-motion";
import {Err} from "../../../../Components/NewTours/Components/NotifAlert.component";
import Footer from "../../../../sources/component/Footer.component";
import globals from "../../../../sources/Global";
import Scrolltoprefresh from "../../../../sources/component/Scrolltoprefresh";
import axios from "axios";
import InfoPasserngers from "../../../../Components/NewTours/Components/InfoPasserngers";

const ReservationConfirmation = () => {
    const [hotelDet, setHotelDet] = useState();
    const [flightDet, setFlightDet] = useState();
    const [roomBaseDet, setRoomBaseDet] = useState();
    const [reservedRooms, setReservedRooms] = useState();
    const [fiPrc, setFiPrc] = useState("");
    const router = useRouter();
    const [roomId, setRoomId] = useState();
    // const [stayCount, setStayCount] = useState("");
    const [isEdit, setIsEdit] = useState(false)
    const [targetedRoom, setTargetedRoom] = useState([])
    const[dataq,setDataq]=useState([])

    useEffect(() => {
        if (router?.query?.flightDet) {
            // let flightDetArr=[]
            // flightDetArr.push(JSON.parse(router?.query?.flightDet))
            setHotelDet(JSON.parse(router?.query?.hotel));
            setFlightDet(JSON.parse(router?.query?.flightDet));
            setRoomBaseDet(JSON.parse(router?.query?.roombase))
            setReservedRooms(JSON.parse(router?.query?.rooms));
            setFiPrc(router?.query?.fiPrc);
            // setStayCount(router?.query?.stayCount);
        }
        console.log("fsdfsasa", router?.query);
    }, [router?.query]);

    useEffect(() => {
        if (reservedRooms) {
            setRoomId(reservedRooms[0]?.id);
        }
    }, [reservedRooms]);

    // useEffect(() => {
    //
    //
    //       console.log('sdsadw342',flightDet);
    //
    // }, [flightDet]);

    const variants = {
        initial: {
            height: 0,
        },
        animate: {
            height: "auto",
            transition: {
                type: "spring",
                stiffness: 100,
                duration: 0.5,
            },
        },
        exit: {
            height: 0,
            transition: {
                type: "tween",
                duration: 0.5,
            },
        },
    };

    useEffect(() => {
       // axios.post(`https://hotelobilit-api.iran.liara.run/api/v2/reserves/confirm/${router.query.ref_code}`).then((res)=>{
       //     console.log(res.data)
       // })
        console.log('sada',flightDet)
    }, [flightDet])



    const OpenEdit=(reserveId)=>{
        setIsEdit(!isEdit)
        // console.log(reserveId)

        let selectRoom=reservedRooms.filter(reserveRoom=>reserveRoom.reserve_id===reserveId)
        setTargetedRoom(selectRoom)
        // console.log(selectRoom)
    }


    return (
        <>
            {
                isEdit &&
                <div style={{
                    position: 'absolute',
                    zIndex: 1000,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(53, 53, 53, 0.28)',
                    top: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onClick={() => setIsEdit(false)}>
                    <div style={{padding:'1rem', borderRadius:'20px',marginTop:'3rem', width: '800px', height: '500px', backgroundColor: 'white'}}>
                        {/*{debugger}*/}
                        <InfoPasserngers room={targetedRoom[0]} flightDet={flightDet} generalRoomDet={roomBaseDet} dataq={dataq}
                        setDataq={(val)=>setDataq(val)} isEdit={'hi'}
                        />
                    </div>
                </div>
            }
            <NabvarCustom/>
            <div className={styles["reserveinfo_container"]}>
                <TourDetailLabel flightDet={hotelDet?.data?.reserves[0]?.flight} stayCount={router?.query?.stayCount}/>
                <div className={styles["rooms"]}>
                    <Scrolltoprefresh/>
                    {reservedRooms?.map((reservedroom) => {
                        return (
                            <div
                                className={styles["box-room"]}
                                onClick={() => {
                                    setRoomId(reservedroom.id);
                                }}
                            >
                                <div
                                    className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
                                >
                                    <div className={styles["box-room-Det-name"]}>
                                        <div className={styles["circle"]}></div>
                                        <h2>
                                            {roomNameChecker(roomBaseDet, reservedroom.room_id)}
                                        </h2>
                                    </div>
                                    <div style={{color: 'red', cursor: "pointer"}}
                                         onClick={() => OpenEdit(reservedroom.reserve_id)}>edit
                                    </div>
                                    <div
                                        onClick={() => {
                                            setRoomId(reservedroom.id);
                                        }}
                                        style={{cursor: "pointer"}}
                                    >

                                        <svg
                                            viewBox="0 0 96 96"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12px"
                                        >
                                            <title/>
                                            <path
                                                d="M81.8457,25.3876a6.0239,6.0239,0,0,0-8.45.7676L48,56.6257l-25.396-30.47a5.999,5.999,0,1,0-9.2114,7.6879L43.3943,69.8452a5.9969,5.9969,0,0,0,9.2114,0L82.6074,33.8431A6.0076,6.0076,0,0,0,81.8457,25.3876Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {reservedroom.id === roomId ? (
                                        // <motion.div
                                        //   variants={variants}
                                        //   initial="initial"
                                        //   animate="animate"
                                        //   exit="exit"
                                        //   style={{ overflowX: "auto" }}
                                        // >

                                        <RoomsInfo
                                            reservedRooms={reservedroom}
                                            is_domestic={hotelDet.data.hotel.is_domestic}
                                        />
                                        // </motion.div>
                                    ) : null}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
                <div className={styles["detail-box-fix-user-reservation"]}>
                    <div className={styles["p-detail-reservation"]}>
                        <div className={styles["priceDet_container"]}>
                            <div className={styles["priceDet"]}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <p>مبلغ کل :</p>
                                    <span>..........................</span>
                                    <div style={{display: "flex"}}>
                                        <strong style={{fontSize: "14px", marginRight: "4px"}}>
                                            {numberWithCommas(fiPrc)}
                                        </strong>
                                        <span style={{fontSize: "12px", marginRight: "4px"}}>
                      تومان
                    </span>
                                    </div>
                                </div>
                                {/* <p>
                      {" "}
                      اعتبار کیف پول شما: ...........................
                      <span>1000</span> تومان
                    </p> */}


                                <div
                                    style={{display: "flex", justifyContent: "space-between"}}
                                >
                                    <p>مبلغ قابل پرداخت : </p>
                                    <span>...........</span>
                                    <div style={{display: "flex"}}>
                                        <strong style={{fontSize: "14px", marginRight: "4px"}}>
                                            {numberWithCommas(fiPrc)}
                                        </strong>
                                        <span style={{fontSize: "12px", marginRight: "4px"}}>
                      تومان
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles["paymentoption"]}>
                            <div className={styles["payment_container"]}>
                                <div className={styles["payment"]}>
                                    <input type="checkbox" checked/>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/b/b6/L_O_G_O-new_color-01.jpg"/>
                                </div>
                            </div>
                        </div>
                        <div className={styles["finalprice"]}>
                            <div className={styles["totalprice_container"]}>
                                <p>مبلغ قابل پرداخت:</p>
                                <div style={{display: "flex"}}>
                                    <strong
                                        style={{
                                            fontSize: "14px",
                                            marginRight: "4px",
                                            color: "#e52121",
                                        }}
                                    >
                                        {numberWithCommas(fiPrc)}
                                    </strong>
                                    <span style={{fontSize: "12px", marginRight: "4px"}}>
                    تومان
                  </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles["paymentbtn"]}>
                            <button
                                // onClick={() => {
                                //   let flight_id = fromRouter.reservationconfirmation[1];
                                //   let hotel_id = fromRouter.reservationconfirmation[0];
                                //   let checkin = hotelDet.flight.date;
                                //   let reserver_full_name = reserverData.reserver_full_name;
                                //   let reserver_id_code = reserverData.reserver_id_code;
                                //   let reserver_phone = reserverData.reserver_phone;
                                //   axios.post(
                                //     "https://hotelobilit-api.iran.liara.run/api/v1/reserves",
                                //     {
                                //       checkin,
                                //       flight_id,
                                //       hotel_id,
                                //       reserver_full_name,
                                //       reserver_id_code,
                                //       reserver_phone,
                                //       rooms: [...dataq],
                                //       stayCount,
                                //     }
                                //   );
                                // }}
                            >
                                پرداخت با کارت شتاب
                            </button>
                            <p
                                onClick={() => {
                                    router.push("/tours");
                                    Err("به صفحه نخست منتقل می شوید");
                                }}
                            >
                                انصراف از خرید
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default ReservationConfirmation;
