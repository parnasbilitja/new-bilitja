import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import TourDetailLabel from "../../../../Components/NewTours/Components/subComponents/TourDetailLabel.component";
import styles from "../../../../../styles/newTour/ReservationConfirmation.module.scss";
import RoomsInfo from "../../../../Components/NewTours/Components/RoomsInfo.component";
import {
    getDayInPersian, isEmpty,
    MiladiToJalaliConvertor, MiladiToJalaliConvertorDec,
    MiladiToJalaliConvertorInc,
    numberWithCommas,
    roomNameChecker,
    startBuilder
} from "../../../../Utils/newTour";
import NabvarCustom from "../../../../sources/component/NabvarCustom";
import {motion, AnimatePresence} from "framer-motion";
import {Err, ErrSuccess, NotifAlert} from "../../../../Components/NewTours/Components/NotifAlert.component";
import Footer from "../../../../sources/component/Footer.component";
import globals from "../../../../sources/Global";
import Scrolltoprefresh from "../../../../sources/component/Scrolltoprefresh";
import axios from "axios";
import InfoPasserngers from "../../../../Components/NewTours/Components/InfoPasserngers";
import UpdatePassenger from "../../../../Components/NewTours/Components/UpdatePassenger";
import Head from "next/head";
import NavHandler from "../../../../Components/share/NavHandler";
import moment from "moment-jalaali";
import {Shimmers3, Shimmers4, Shimmers6} from "../../../../Components/NewTours/Components/subComponents/Shimmers";

const ReservationConfirmation = () => {
    const [hotelDet, setHotelDet] = useState();
    const [flightDet, setFlightDet] = useState();
    const [reservedRooms, setReservedRooms] = useState();
    const router = useRouter();
    const [roomId, setRoomId] = useState();
    const [isEdit, setIsEdit] = useState(false)
    const [targetedRoom, setTargetedRoom] = useState([])
    const [reservedRoom, setReservedRoom] = useState([])
    const [tourData, setTourData] = useState([])
    const [targetedReservedId, setTargetedReservedId] = useState('')
    const [err, setErr] = useState({});
    const [messageModal,setMessageModal]=useState(false)

    useEffect(() => {
        if (router?.query?.ref_code) {

            // setHotelDet(JSON.parse(router?.query?.hotel));
            // setFlightDet(JSON.parse(router?.query?.flightDet));
            // setRoomBaseDet(JSON.parse(router?.query?.roombase))
            // setReservedRooms(JSON.parse(router?.query?.rooms));
            // setFiPrc(router?.query?.fiPrc);
            // debugger
            getReservedData(router?.query?.ref_code)
            // setStayCount(router?.query?.staycount)
        }
        // console.log("fsdfsasa", router?.query);
    }, [router?.query]);

    useEffect(() => {
        if (reservedRooms) {
            setRoomId(reservedRoom[0]?.id);
        }
    }, [reservedRoom]);

    // useEffect(() => {
    //
    //
    //     console.log('sdsadw342', reservedRoom);
    //
    // }, [reservedRoom]);

    const variants = {
        initial: {
            height: 0,
        }, animate: {
            height: "auto", transition: {
                type: "spring", stiffness: 100, duration: 0.5,
            },
        }, exit: {
            height: 0, transition: {
                type: "tween", duration: 0.5,
            },
        },
    };

    const getReservedData = (refcode) => {
        // debugger
        let reservedRoomData
        axios.get(`https://api.hotelobilit.com/api/v2/reserves/${refcode}`,{
            headers: {
                "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
            }
        }).then((res) => {
            debugger
            // debugger
            // console.log('reserves', res.data)
            // setTourData(res.data.data)
            // reservedRoomData = res.data.data.reserves.filter(room => room.reserve_type === 'room')
            setReservedRoom(res.data.data)
            // console.log(res.data.data);

        })
    }


    useEffect(() => {
        console.log('ryeutie', reservedRoom)
    }, [reservedRoom])


    const OpenEdit = (reserveId) => {

        setIsEdit(!isEdit)
        setTargetedReservedId(reserveId)

        // console.log(reserveId)
        let selectRoom = reservedRoom?.selected_rooms?.filter(reserveRoom => reserveRoom?.reserve_id === reserveId)
        setTargetedRoom(selectRoom)
    }

    useEffect(() => {
        console.log('e', reservedRoom)
    }, [reservedRoom])


    const EditClickHandler = (passengersArr,roominfo) => {
        axios.patch(`https://api.hotelobilit.com/api/v2/reserves/${router.query.ref_code}`, {
            reserves: [{
                reserve_id: targetedReservedId, passengers: [...passengersArr],info_room:roominfo
            }],
            // reserver_full_name: reservedRoom.information.reserver.reserver_full_name,
            // reserver_phone: reservedRoom.information.reserver.reserver_phone,
            // reserver_id_code: reservedRoom.information.reserver.reserver_id_code
        },{
            headers: {
                "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
            }
        }).then((res) => {
            getReservedData(router?.query?.ref_code)
            setIsEdit(false)
        }).catch((err) => {

            setErr(err?.response?.data);
        });

    }


    return (<>
        <NabvarCustom/>

            <NotifAlert/>
        {
            messageModal &&
            <>
            <div className={styles['message_con']}>
                <div className={styles['message']}>
                    <div>

                    </div>
                    <div style={{width:'100%',display:'flex',justifyContent:'space-between', fontSize:'14px',borderBottom:'1px solid #cecece',paddingBottom:'8px'}}>
                    <span style={{fontSize:'13px',fontWeight:'700'}}>مسافر/همکارگرامی</span>
                    <strong>{tourData.reserver_full_name}</strong>

                    </div>
                    <div>
                    <p style={{textAlign:'center',fontSize:'13px',fontWeight:'900',color:'#757575'}}>ثبت شما با موفقیت انجام شد همکاران ما جهت تایید نهایی با شما تماس می گیرند.</p>

                    </div>

                    <div style={{width:'100%',display:'flex',justifyContent:'space-between', fontSize:'14px',paddingBottom:'8px',backgroundColor:'#e0e0e0',borderRadius:'512px',padding:'.725rem'}}>
                        <span>شماره رفرنس </span>
                        <strong>{router.query.ref_code}</strong>
                    </div>
                    <p style={{padding:'0',margin:'2px 0',fontSize:'12px',fontWeight:'900',color:"#e20000",textAlign:'center'}}>لطفا رفرنس را جهت پیگیری های بعدی یادداشت فرمایید</p>

                    <div  className={styles['paymentbtn']}>

                    <button onClick={()=>{
                        ErrSuccess('رزرو شما با موفقیت انجام شد.به صفحه نخست منتقل می شوید. ')
                        setTimeout(() => {
                            router.push('/')
                        }, 3000)
                    }}>

                            بازگشت به صفحه اصلی

                        </button>
                    </div>

                </div>
            </div>

            </>
        }

            {isEdit && <div className={styles['UpadateContainer']}>
                <div className={styles['updatePass']}>
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

                    <div  className={styles['updatePass_con']}>
                        <UpdatePassenger targetedRoom={targetedRoom[0]} setIsEdit={() => setIsEdit(false)}
                                         EditClickHandler={(passengersArr,room) => EditClickHandler(passengersArr,room)}
                                         Errs={err}/>
                    </div>
                </div>
            </div>}

            <div className={styles["reserveinfo_container"]}>

                <Head>
                    <title>بلبطجا | تور</title>
                </Head>
                <div className={styles["tourDet-container"]} style={{marginBottom:'15px'}}>
                    <div className={styles["selected-hotel_conatiner"]}>
                        <div className={styles["selected-hotel"]}>
                            <div className={styles["selected-hotel-names"]}>
                                <h2>
                                    {reservedRoom?.hotel?.is_domestic ? reservedRoom?.hotel?.title : reservedRoom?.hotel?.titleEn}
                                </h2>
                                <p>
                                    {" "}
                                    {reservedRoom?.hotel?.is_domestic ? reservedRoom?.hotel?.titleEn : reservedRoom?.hotel?.title}
                                </p>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex", marginBottom: ".1rem", paddingRight: "1rem",
                            }}
                        >
                            {startBuilder(+reservedRoom?.hotel?.stars).map((x) => {
                                return (<div
                                    style={{
                                        width: "20px", height: "30px", marginLeft: ".5rem",
                                    }}
                                >
                                    {x}
                                </div>);
                            })}
                        </div>
                    </div>
                    <div className={styles["ent-ext_container"]}>
                        {!isEmpty(reservedRoom) ? (<>
                            <div className={styles["entext"]}>
                                <p
                                    className={styles["entexttitle"]}
                                    style={{marginBottom: "5px"}}
                                >
                                    تاریخ ورود به هتل
                                </p>
                                <p style={{fontWeight: "500", fontSize: "12px"}}>
                                    {MiladiToJalaliConvertor(reservedRoom?.hotel?.checkin)}
                                </p>
                                <p>

                                    { getDayInPersian(moment(reservedRoom?.hotel?.checkin).format('dddd'))  }
                                </p>
                            </div>
                            <div className={styles["entext"]}>
                                <p
                                    className={styles["entexttitle"]}
                                    style={{marginBottom: "5px"}}
                                >
                                    تاریخ خروج از هتل
                                </p>
                                <p style={{fontWeight: "500", fontSize: "12px"}}>
                                    {MiladiToJalaliConvertor(reservedRoom?.hotel?.checkout)}
                                </p>
                                <p>

                                    { getDayInPersian(moment(reservedRoom?.hotel?.checkout).format('dddd'))  }
                                </p>
                            </div>
                        </>) : (<motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.9, repeat: Infinity, repeatType: "reverse",
                            }}
                            className={styles["box-top-box-reserve2"]}
                            style={{height: "50px", width: "220px"}}
                        ></motion.div>)}
                    </div>
                </div>
                <>
                    {!isEmpty(reservedRoom) ?   <TourDetailLabel
                        flightDet={reservedRoom?.flights}
                        stayCount={router.query.staycount}
                        gallary={reservedRoom?.hotel?.gallery}
                        refcode={router.query.ref_code}/>:

                        <Shimmers6 selectedHeight={'320px'}/>
                    }
                </>


                <div className={styles["rooms"]}>
                    <Scrolltoprefresh/>
                    {reservedRoom?.selected_rooms?reservedRoom?.selected_rooms?.map((reservedroom) => {
                        return (<div
                                className={styles["box-room"]}
                                // onClick={() => {
                                //     setRoomId(reservedroom.id);
                                // }}
                            >
                                <div
                                    className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
                                >
                                    <div className={styles["box-room-Det-name"]}>
                                        <div className={styles["circle"]}></div>
                                        <h2>
                                            {reservedroom?.info_room?.room_type}
                                        </h2>
                                    </div>


                                    <div style={{display: 'flex'}}>
                                        <div style={{color: 'red', cursor: "pointer"}}
                                             onClick={() => OpenEdit(reservedroom.reserve_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15"
                                                 height="15" viewBox="0 0 24 24" fill='#e20000'>
                                                <path
                                                    d="M 18 2 L 15.585938 4.4140625 L 19.585938 8.4140625 L 22 6 L 18 2 z M 14.076172 5.9238281 L 3 17 L 3 21 L 7 21 L 18.076172 9.9238281 L 14.076172 5.9238281 z"></path>
                                            </svg>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setRoomId(reservedroom.reserve_id);
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
                                <div style={{overflowX: 'scroll'}}>
                                    <AnimatePresence>
                                    {/*<motion.div*/}
                                    {/*        //   variants={variants}*/}
                                    {/*        //   initial="initial"*/}
                                    {/*        //   animate="animate"*/}
                                    {/*        //   exit="exit"*/}
                                    {/*        //   style={{ overflowX: "auto" }}*/}
                                    {/*        // >*/}


                                            <RoomsInfo
                                                reservedRooms={reservedroom}
                                                // is_domestic={hotelDet.data.hotel.is_domestic}
                                                totalRservedroomData={reservedRoom}
                                            />

                                            {/*// </motion.div>*/}

                                    </AnimatePresence>
                                </div>
                            </div>);
                    }):<>

                    <Shimmers6 selectedHeight={'100vh'}/>
                    </>}
                </div>
                <div className={styles["detail-box-fix-user-reservation"]}>
                    <div className={styles["p-detail-reservation"]}>
                        <div className={styles["priceDet_container"]}>
                            <div className={styles["priceDet"]}>
                                <div
                                    style={{
                                        display: "flex", justifyContent: "space-between", marginBottom: "8px",
                                    }}
                                >
                                    <p>مبلغ کل :</p>
                                    <span>..........................</span>
                                    <div style={{display: "flex"}}>
                                        <strong style={{fontSize: "14px", marginRight: "4px"}}>
                                            {reservedRoom?.prices?.total_price && numberWithCommas(reservedRoom?.prices?.total_price)}
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
                                            {/*{numberWithCommas(fiPrc)}*/}
                                            {reservedRoom?.prices?.total_price && numberWithCommas(reservedRoom?.prices?.total_price)}
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
                                            fontSize: "14px", marginRight: "4px", color: "red",
                                        }}
                                    >
                                        {/*{numberWithCommas(fiPrc)}*/}
                                        {reservedRoom?.prices?.total_price && numberWithCommas(reservedRoom?.prices?.total_price)}
                                    </strong>
                                    <span style={{fontSize: "12px", marginRight: "4px"}}>
                    تومان
                  </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles["paymentbtn"]}>
                            <button
                                onClick={() => {
                                    // ErrSuccess('رزرو شما با موفقیت انجام شد.به صفحه نخست منتقل می شوید. ')

                                    // setTimeout(() => {
                                    //     router.push('/')
                                    // }, 3000)

                                    axios.post(`https://api.hotelobilit.com/api/v2/reserves/confirm/${router.query.ref_code}`,{},{
                                        headers: {
                                            "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
                                        }
                                    }).then(res=>{
                                        ErrSuccess(res.message)

                                    setMessageModal(true)
                                    })
                                    console.log('sadas')
                                }}
                            >
                                پرداخت با کارت شتاب
                            </button>
                            <p
                                onClick={() => {
                                    router.push("/tour");
                                    Err("به صفحه نخست منتقل می شوید");
                                }}
                            >
                                انصراف از خرید
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*<Footer/>*/}
        </>);
};

export default ReservationConfirmation;
