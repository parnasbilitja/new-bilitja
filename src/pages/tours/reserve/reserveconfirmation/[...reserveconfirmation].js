import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TourDetailLabel from "../../../../Components/NewTours/Components/subComponents/TourDetailLabel.component";

import styles from "../../../../../styles/newTour/ReservationConfirmation.module.scss";
import RoomsInfo from "../../../../Components/NewTours/Components/RoomsInfo.component";
import {numberWithCommas, roomNameChecker} from "../../../../Utils/newTour";
import NabvarCustom from "../../../../sources/component/NabvarCustom";
import {motion, AnimatePresence} from "framer-motion";
import {Err, ErrSuccess, NotifAlert} from "../../../../Components/NewTours/Components/NotifAlert.component";
import Footer from "../../../../sources/component/Footer.component";
import globals from "../../../../sources/Global";
import Scrolltoprefresh from "../../../../sources/component/Scrolltoprefresh";
import axios from "axios";
import InfoPasserngers from "../../../../Components/NewTours/Components/InfoPasserngers";
import UpdatePassenger from "../../../../Components/NewTours/Components/UpdatePassenger";

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
    const [dataq, setDataq] = useState([])
    const [reservedRoom, setReservedRoom] = useState([])
    const [tourData, setTourData] = useState([])
    const [targetedReservedId, setTargetedReservedId] = useState('')
    const [err, setErr] = useState({});

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
            setRoomId(reservedRoom[0]?.id);
        }
    }, [reservedRoom]);

    useEffect(() => {


        console.log('sdsadw342', hotelDet);

    }, [hotelDet]);

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

    const getReservedData = () => {
        let reservedRoomData
        axios.get(`https://hotelobilit-api.iran.liara.run/api/v2/reserves/${router.query.ref_code}`).then((res) => {
            console.log('reserves', res.data)
            setTourData(res.data.data)
            reservedRoomData = res.data.data.reserves.filter(room => room.reserve_type === 'room')
            setReservedRoom(reservedRoomData)

        })
    }

    useEffect(() => {
        getReservedData()

    }, [router])

    useEffect(() => {
        console.log('ryeutie', tourData)
    }, [tourData])


    const OpenEdit = (reserveId) => {

        setIsEdit(!isEdit)
        setTargetedReservedId(reserveId)
        console.log(reserveId)
        let selectRoom = reservedRoom.filter(reserveRoom => reserveRoom.id === reserveId)
        setTargetedRoom(selectRoom)
    }

    useEffect(() => {
        console.log('e', targetedRoom)
    }, [targetedRoom])


    const EditClickHandler = (passengersArr) => {
        axios.patch(`https://hotelobilit-api.iran.liara.run/api/v2/reserves/${router.query.ref_code}`, {
            reserves: [{
                reserve_id: targetedReservedId,
                passengers: [...passengersArr]
            }],
            reserver_full_name: tourData.reserver_full_name,
            reserver_phone: tourData.reserver_phone,
            reserver_id_code: tourData.reserver_id_code

        }).then((res) => {
            getReservedData()
            setIsEdit(false)
        })  .catch((err) => {

            setErr(err?.response?.data);
        });

    }




    return (
        <>
            <NotifAlert/>
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
                }}>
                    <div style={{
                        padding: '1.5rem',
                        borderRadius: '20px',
                        marginTop: '3rem',
                        width: '900px',
                        height: 'auto',
                        backgroundColor: 'white'
                    }}>
                        {/*{debugger}*/}
                        <div onClick={() => setIsEdit(false)} style={{
                            border: '2px solid red',
                            width: '20px',
                            height: '25px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17" height="17"
                                 viewBox="0 0 48 48">
                                <path fill="#F44336" d="M21.5 4.5H26.501V43.5H21.5z"
                                      transform="rotate(45.001 24 24)"></path>
                                <path fill="#F44336" d="M21.5 4.5H26.5V43.501H21.5z"
                                      transform="rotate(135.008 24 24)"></path>
                            </svg>
                        </div>

                        <div style={{
                            height: 'auto',
                            width: '100%',
                            display: 'flex',
                            justifyContent: "center",
                            flexDirection: 'column'
                        }}>
                            <UpdatePassenger targetedRoom={targetedRoom[0]} setIsEdit={() => setIsEdit(false)}
                                             EditClickHandler={(passengersArr) => EditClickHandler(passengersArr)} Errs={err}/>
                        </div>
                    </div>
                </div>
            }
            <NabvarCustom/>
            <div className={styles["reserveinfo_container"]}>
                <TourDetailLabel flightDet={hotelDet?.data?.reserves[0]?.flight} stayCount={router?.query?.stayCount}/>
                <div className={styles["rooms"]}>
                    <Scrolltoprefresh/>
                    {reservedRoom?.map((reservedroom) => {
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
                                            {reservedroom.room.room_type}
                                        </h2>
                                    </div>


                                    <div style={{display: 'flex'}}>
                                        <div style={{color: 'red', cursor: "pointer"}}
                                             onClick={() => OpenEdit(reservedroom.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15"
                                                 height="15" viewBox="0 0 24 24" fill='#279692'>
                                                <path
                                                    d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
                                            </svg>
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
                           onClick={()=>{
                                   ErrSuccess('رزرو شما با موفقیت انجام شد.به صفحه نخست منتقل می شوید. ')
                               setTimeout(()=>{
                                   router.push('/')
                               },3000)
                           }}
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
