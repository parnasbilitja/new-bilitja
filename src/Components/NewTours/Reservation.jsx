import React, {useEffect, useState} from "react";
import styles from "../../../styles/newTour/Reserve.module.scss";
import InfoPasserngers from "./Components/InfoPasserngers";
import {
    MiladiToJalaliConvertor,
    MiladiToJalaliConvertorInc,
    TotalPrcGen,
    numberWithCommas,
    passengerObjModelGen,
    roomNameChecker,
    startBuilder, removeDuplicateObj,
} from "../../Utils/newTour";
import axios from "axios";
import {motion} from "framer-motion";
import TourDetailLabel from "./Components/subComponents/TourDetailLabel.component";
import {useRouter} from "next/router";
import {Err, ErrSuccess, NotifAlert} from "./Components/NotifAlert.component";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import base from "../home/Base";
import CountDownTimer from "./Components/CountDownTimer";

const Reservation = ({hotelDet, stayCount,ref_code}) => {
    const [generalRoomsData, setGeneralRoomsData] = useState([])
    const [roomBaseDet, setRoomBaseDet] = useState([])
    const [flightDet, setFlightDet] = useState([])
    const [dataq, setDataq] = useState([]);
    const [roomsData, setRoomsData] = useState([]);
    const [reserverData, setReserverData] = useState({
        reserver_phone: "", reserver_id_code: "", reserver_name: "", reserver_lastname: "",
    });
    const [reformSelectedRooms, setReformSelectedRooms] = useState([]);
    const [evRoomsPrc, setEvRoomsPrc] = useState([]);
    const [err, setErr] = useState({});
    const router = useRouter();


    useEffect(() => {
        const baseRoomDeta = generalRoomsData.filter(
            (obj, index) =>
                generalRoomsData.findIndex((item) => item.id === obj.id && item.room_type_id
                    === obj.room_type_id
                ) === index
        );
        setRoomBaseDet(baseRoomDeta)
    }, [generalRoomsData])


    useEffect(() => {
        console.log('sada',ref_code)
        if (hotelDet?.data?.details?.request) {
            let flight = hotelDet.data?.reserves?.filter(reserve => reserve?.reserve_type === 'flight')
            setFlightDet(flight[0].flight)
            let filterdRooms = []
            let rooms = hotelDet.data?.reserves?.filter(reserve => reserve?.reserve_type !== 'flight')
            rooms.map(room => filterdRooms.push(room.room))
            // baseRoom=
            setGeneralRoomsData(filterdRooms)
            const newSelectedRooms = [];
            hotelDet?.data?.details?.request?.map((roomselected) => {
                // debugger
                rooms?.map((room) => {
                    if (room.room.id === roomselected.room_id) {
                        newSelectedRooms.push({
                            ...roomselected,
                            room_type_id: room.room.room_type_id,
                            id: Math.random() * 100,
                            reserve_id: room.id
                        });
                    }
                });
            });
            setReformSelectedRooms(removeDuplicateObj(newSelectedRooms));
        }
    }, [hotelDet]);

    useEffect(() => {
        console.log('DSAA', flightDet)
    }, [flightDet])


    const personCounter = (arr) => {
        let people = 0;
        arr.map((pers) => {
            people += pers.adl_count;
            people += pers.chd_count;
            people += pers.inf_count;
            people += pers.extra_count;
        });
        return people;
    };

    const reserverformData = (e) => {
        const {name, value} = e.target;
        const regEx = /^\d+$/;
        if (name === "reserver_phone" || name === "reserver_id_code") {
            if (regEx.test(value)) {
                setReserverData({
                    ...reserverData, [name]: value,
                });
            } else {
                setReserverData({
                    ...reserverData, [name]: "",
                });
            }
        } else {
            setReserverData({
                ...reserverData, [name]: value,
            });
        }
    };

    useEffect(() => {
        // debugger
        if (reformSelectedRooms.length > 0) {
            reformSelectedRooms?.map((selectedroom) => {
                let passarr = [];
                const adlCount = selectedroom?.adl_count;
                const chdCount = selectedroom?.chd_count;
                const infCount = selectedroom?.inf_count;
                const extCount = selectedroom?.ext_count;
                passarr.push(...passengerObjModelGen(adlCount, "adl"));
                passarr.push(...passengerObjModelGen(chdCount, "chd"));
                passarr.push(...passengerObjModelGen(infCount, "inf"));
                passarr.push(...passengerObjModelGen(extCount, "ext"));
                setRoomsData((prev) => [...prev, {
                    id: selectedroom.id,
                    room_type_id: selectedroom.room_type_id,
                    room_id: selectedroom.room_id,
                    reserve_id: selectedroom.reserve_id,
                    passengers: [...passarr],
                },]);
            });
        }
    }, [reformSelectedRooms]);

    useEffect(() => {

        setDataq(roomsData);
    }, [roomsData]);

    useEffect(() => {
        console.log('asdas', dataq)
    }, [dataq])


    return (<>
        <Scrolltoprefresh/>
        <div className={styles["p-body"]}>
            <NotifAlert/>
            <div className={styles["prs-responsive"]}>
                <div className={styles["main-reserve"]}>
                    <div className={styles["box-fix-user-reservation"]}>
                        <div className={styles["detail-box-fix-user-reservation"]}>
                            <div className={styles["p-detail-reservation"]}>
                                <div className={styles["priceDet_container"]}>
                                    <div className={styles["priceDet"]}>
                                        {/* <p>
                      {" "}
                      اعتبار کیف پول شما: ...........................
                      <span>1000</span> تومان
                    </p> */}
                                        <div className={styles["price-title"]}>
                                            <p>مبلغ قابل پرداخت:</p>
                                        </div>
                                        <div className={styles["price"]}>
                                            <p>{numberWithCommas(TotalPrcGen(evRoomsPrc))} تومان</p>
                                        </div>
                                        {" "}
                                    </div>
                                </div>

                                <div className={styles["finalprice"]}>
                                    <div className={styles["totalprice_container"]}>
                                        <div className={styles["peopleroomnum"]}>
                                            <p>تعداد کل نفرات :</p>
                                            <span>{personCounter(reformSelectedRooms)}</span>
                                        </div>
                                        <div className={styles["peopleroomnum"]}>
                                            <p> تعداد کل اتاق : </p>
                                            <span>{reformSelectedRooms.length}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles["paymentbtn"]}>
                                    <button
                                        onClick={() => {
                                            // debugger
                                            let flight_id = flightDet.id;
                                            let hotel_id = hotelDet.data.hotel.id;
                                            axios
                                                .post(`https://hotelobilit-api.iran.liara.run/api/v2/reserves/${router.query.ref_code}`, {
                                                    reserver_full_name: `${reserverData.reserver_name} ${reserverData.reserver_lastname}`,
                                                    reserver_id_code: reserverData.reserver_id_code,
                                                    reserver_phone: reserverData.reserver_phone,
                                                    reserves: [...dataq],
                                                })
                                                .then((res) => {
                                                    let rooms = [...dataq];
                                                    let reserverdata = [reserverData];
                                                    router.push(`/tours/reserve/reserveconfirmation/${hotel_id}/${flight_id}?reserverData=${JSON.stringify(reserverdata)}&hotel=${JSON.stringify(hotelDet)}&rooms=${JSON.stringify(rooms)}&fiPrc=${TotalPrcGen(evRoomsPrc)}&stayCount=${stayCount}&flightDet=${JSON.stringify(flightDet)}&roombase=${JSON.stringify(roomBaseDet)}&ref_code=${router.query.ref_code}`);
                                                    ErrSuccess("به صفحه تایید اطلاعات رزرو و پرداخت نهایی منتقل می شوید");
                                                })
                                                .catch((err) => {
                                                    Err("لطفا فیلد های زیر را تکمیل کنید");
                                                    setErr(err?.response?.data);
                                                });
                                            if (dataq.length === 0) {
                                                Err("هنوز اطلاعاتی وارد نشده!");
                                            } else if (!err.isDone && err.errors?.length > 0) {
                                                Err("لطفا اطلاعات مسافرین را تکمیل نمایید!");
                                            } else if (!err.isDone && err.errors?.length === 0) {
                                                Err("این پرواز موجودی ندارد!");
                                                router.push("/tours");
                                            }
                                        }}
                                    >
                                        تایید اطلاعات
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["tourDet-container"]}>
                        <div className={styles["selected-hotel_conatiner"]}>
                            <div className={styles["selected-hotel"]}>
                                <div className={styles["selected-hotel-names"]}>
                                    <h2>
                                        {hotelDet?.data?.hotel?.is_domestic ? hotelDet?.data?.hotel?.title : hotelDet?.data?.hotel?.titleEn}
                                    </h2>
                                    <p>
                                        {" "}
                                        {hotelDet?.data?.hotel?.is_domestic ? hotelDet?.data?.hotel?.titleEn : hotelDet?.data?.hotel?.title}
                                    </p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex", marginBottom: ".1rem", paddingRight: "1rem",
                                }}
                            >
                                {startBuilder(+hotelDet?.data?.hotel?.stars).map((x) => {
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
                            {flightDet? (<>
                                <div className={styles["entext"]}>
                                    <p
                                        className={styles["entexttitle"]}
                                        style={{marginBottom: "5px"}}
                                    >
                                        تاریخ ورود به هتل
                                    </p>
                                    <p style={{fontWeight: "500", fontSize: "12px"}}>
                                        {flightDet?.checkin_tomorrow ? MiladiToJalaliConvertorInc(flightDet?.date) : MiladiToJalaliConvertor(flightDet?.date)}
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
                                        {" "}
                                        {flightDet?.checkin_tomorrow ? MiladiToJalaliConvertorInc(flightDet?.flight?.date) : MiladiToJalaliConvertor(flightDet?.flight?.date)}
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

                    {/* {hotelDet?.flight ?} */}
                    <div className={styles["box-top-box-reserve"]}>
                        {hotelDet?.data?.reserves[0]?.flight ? (<TourDetailLabel
                            flightDet={hotelDet?.data?.reserves[0]?.flight}
                            stayCount={stayCount}
                        />) : (<motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.9, repeat: Infinity, repeatType: "reverse",
                            }}
                            className={styles["box-top-box-reserve2"]}
                        ></motion.div>)}
                        {
                            hotelDet.data &&
                            <CountDownTimer minute={hotelDet.data?.expired_in_minutes}/>
                        }
                        <div className={styles["reserverform_container"]}>
                            <h2 className={styles["reserver-info"]}>
                                <strong>اطلاعات رزروگیرنده</strong>

                                <span className="font-size-13">
                    (این مشخصات به عنوان طرف قرارداد درنظر گرفته می شود)
                  </span>
                            </h2>

                            <form className={styles["set-info-supervisor"]}>
                                <div className={styles["item-form"]}>
                                    <div className={styles["inp-form"]}>
                                        <input
                                            type="text"
                                            placeholder="نام "
                                            name="reserver_name"
                                            onChange={(e) => {
                                                reserverformData(e);
                                            }}
                                            value={reserverData.reserver_name}
                                        />
                                    </div>

                                    {err.errors?.reserver_full_name && reserverData.reserver_name.length === 0 ? (
                                        <small>لطفا فیلد نام را وارد کنید</small>) : null}
                                </div>
                                <div className={styles["item-form"]}>
                                    <div className={styles["inp-form"]}>
                                        <input
                                            type="text"
                                            placeholder="نام و نام خانوادگی"
                                            name="reserver_lastname"
                                            onChange={(e) => {
                                                reserverformData(e);
                                            }}
                                            value={reserverData.reserver_lastname}
                                        />
                                    </div>
                                    <small>
                                        {err.errors?.reserver_full_name && reserverData.reserver_lastname.length === 0 ? "لطفا فیلد نام و نام خانوادگی را وارد کنید" : null}
                                    </small>
                                </div>

                                <div className={styles["item-form"]}>
                                    <div className={styles["inp-form"]}>
                                        <input
                                            type="text"
                                            placeholder="کد ملی"
                                            name="reserver_id_code"
                                            onChange={(e) => {
                                                reserverformData(e);
                                            }}
                                            value={reserverData.reserver_id_code}
                                            maxLength={10}
                                        />
                                    </div>

                                    {err.errors?.reserver_id_code && reserverData.reserver_id_code.length === 0 ? (
                                        <small>{err.errors?.reserver_id_code}</small>) : null}
                                </div>
                                <div className={styles["item-form"]}>
                                    <div className={styles["inp-form"]}>
                                        <input
                                            type="text"
                                            placeholder="شماره همراه"
                                            onChange={(e) => {
                                                reserverformData(e);
                                            }}
                                            value={reserverData.reserver_phone}
                                            name="reserver_phone"
                                            maxLength="11"
                                        />
                                    </div>
                                    {err.errors?.reserver_phone && reserverData.reserver_phone.length === 0 ? (
                                        <small>{err.errors?.reserver_phone}</small>) : null}
                                </div>
                            </form>
                        </div>

                        <h2 style={{fontSize: "1.5rem"}}>اطلاعات مسافران</h2>

                        {roomsData?.map((room, roomIndex) => (<InfoPasserngers
                            room={room}
                            hotelDets={hotelDet}
                            generalRoomDet={generalRoomsData && generalRoomsData}
                            flightDet={flightDet}
                            roomName={roomNameChecker(generalRoomsData, room?.room_id)}
                            dataq={dataq}
                            setDataq={setDataq}
                            setEvRoomsPrc={setEvRoomsPrc}
                            Errs={err}
                            roomsData={roomsData}
                            setRoomsData={setRoomsData}
                            roomIndex={roomIndex}
                        />))}

                        <div className={styles["rules"]}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <p style={{fontSize: '14px', margin: '0'}}>ثبت درخواست به منزله پذیرش تمام</p>
                                <a style={{fontSize: '14px'}}>قوانین و مقررات</a>
                                <p style={{fontSize: '14px', margin: '0'}}>
                                    قوانین و مقررات مرتبط با سایت هتل و بلیط و پکیجهای این تور می
                                    باشد
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Reservation;
