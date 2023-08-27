import React, {useEffect, useState} from "react";
import styles from "../../../styles/newTour/AvailableFlightBasedonSelectedTour.module.scss";
import {useRouter} from "next/router";
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";
import {
    MiladiToJalaliConvertor,
    MiladiToJalaliConvertorDec,
    MiladiToJalaliConvertorInc,
    chdPrcGen,
    dateDiffChecker,
    extBedPrcGen,
    flightDateChecker,
    jalaliToMiladiConvertor,
    numberWithCommas,
    roomPrcGen,
    startBuilder,
} from "../../Utils/newTour";
import Image from "next/image";
import PictureModal from "./Components/subComponents/PictureModal";
import {Err, ErrSuccess, NotifAlert} from "./Components/NotifAlert.component";

const AvailableFlightBasedonSelectedTour = (props) => {
    const router = useRouter();
    const [hotel, setHotel] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState([]);
    const [isOpen, setIsOpen] = useState(0);
    const [ismodal, setIsModal] = useState(null);
    ///count every selected room based on their type =>:دوتخته , سه تخته , ...........
    const roomCounter = (roomTypeId) => {
        const rooms = selectedRoom.filter((room) => room?.room_type_id === roomTypeId);
        return rooms.length;
    };


    const minAvRoom = (rates) => Math.min(...rates.map((a) => {
        return a.available_room_count;
    }));


    ///increase room => :دوتخته , سه تخته , ...........
    const IncRoom = (flightId, room_type_id, room_type, Adl_capacity, rates, room_id, chd_capacity,total_extra_count) => {
        let minAvRoom = Math.min(...rates.map((a) => {
            return a.available_room_count;
        }));
        let minAvExtbedCount = Math.min(...rates.map((a) => {
            return a.extra_bed_count;
        }));
        if (minAvRoom > roomCounter(room_type_id)) {
            setIsOpen(flightId);
            setSelectedRoom([...selectedRoom, {
                id: Math.random() * 1000,
                room_type_id,
                room_id,
                room_type,
                Adl_capacity,
                extra_bed_count: 0,
                inf_count: 0,
                chd_count: 0,
                chd_capacity,
                extra_bed_capacity: minAvExtbedCount,
                total_extra_count
            },]);

            // console.log(selectedRoom)

        } else {
            // console.log("noooooooooooooo!");
            // setIsOpen(0);
            Err("تعداد اتاق انتخابی بیش از ظرفیت موجود نیست");
        }
    };

    ///decrease room => :دو تخته , سه تخته , ...........
    const decRoom = (roomTypeId) => {
        if (roomCounter(roomTypeId) === 0) {
            return null;
        } else {
            const removedRoom = [];
            const getRooms = selectedRoom.filter((room) => room.room_type_id === roomTypeId);
            const finalRoom = getRooms.pop();
            removedRoom.push(finalRoom);
            const anoRooms = selectedRoom.filter((selectroom) => removedRoom[0].id !== selectroom.id);
            setSelectedRoom([...anoRooms]);
        }

        // roomCounter(roomTypeId) ===
        if (selectedRoom.length <= 1) {
            setIsOpen(0);
        }
    };

    ////inc chd, inf,ext number

    const incDet = (room, type) => {
        if (type === "ext_count") {
            const findRoom = selectedRoom.map((x) => {
                if (x?.id === room?.id) {
                    if(x?.chd_count+x?.extra_bed_count>=x?.total_extra_count){
                        Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
                        return  x
                    }else{
                        if (x.extra_bed_count < x.extra_bed_capacity) {
                            return {
                                ...x, extra_bed_count: x.extra_bed_count + 1,
                            };
                        } else {
                            Err("تخت اضافه بیش از تعداد انتخاب شده موجود نیست");
                            return x;
                        }
                    }


                } else {
                    return x;
                }
            });

            setSelectedRoom(findRoom);
        } else if (type === "inf_count") {
            const findRoom = selectedRoom.map((x) => {
                if (x?.id === room?.id) {
                    if (x.inf_count < x.Adl_capacity) {
                        return {
                            ...x, inf_count: x.inf_count + 1,
                        };
                    } else {
                        Err("گنجایش نوزاد بیش از تعداد انتخاب شده موجود نیست");
                        return x;
                    }
                } else {
                    return x;
                }
            });

            setSelectedRoom(findRoom);
        } else if (type === "chd_count") {
            const findRoom = selectedRoom.map((x) => {
                if (x?.id === room?.id) {
                    if(x?.chd_count+x?.extra_bed_count>=x?.total_extra_count){
                        Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
                        return  x
                    }else{
                        if (x?.chd_count < x?.chd_capacity) {
                            return {
                                ...x, chd_count: x?.chd_count + 1,
                            };
                        } else {
                            Err("گنجایش کودک بیش از تعداد انتخاب شده موجود نیست");
                            return x;
                        }
                    }

                } else {
                    return x;
                }
            });

            setSelectedRoom(findRoom);
        }
        // console.log(selectedRoom);
    };

    ////dec chd, inf,ext number
    const decDet = (id, type) => {
        if (type === "ext_count") {
            const findRoom = selectedRoom.map((x) => {
                if (x?.id === id) {
                    if (x.extra_bed_count > 0) {
                        return {
                            ...x, extra_bed_count: x.extra_bed_count - 1,
                        };
                    } else {
                        return {
                            ...x, extra_bed_count: 0,
                        };
                    }
                } else {
                    return x;
                }
            });
            setSelectedRoom(findRoom);
        } else if (type === "inf_count") {
            const findRoom = selectedRoom.map((x) => {
                if (x?.id === id) {
                    if (x.inf_count) {
                        return {
                            ...x, inf_count: x.inf_count - 1,
                        };
                    } else {
                        return {
                            ...x, inf_count: 0,
                        };
                    }
                } else {
                    return x;
                }
            });
            setSelectedRoom(findRoom);
        } else if (type === "chd_count") {
            const findRoom = selectedRoom.map((x) => {
                if (x?.id === id) {
                    if (x?.chd_count) {
                        return {
                            ...x, chd_count: x?.chd_count - 1,
                        };
                    } else {
                        return {
                            ...x, chd_count: 0,
                        };
                    }
                } else {
                    return x;
                }
            });
            setSelectedRoom(findRoom);
        }
        // console.log(selectedRoom);
    };

    ////remove room
    const removeRoom = (id) => {
        const newSelectedRoom = selectedRoom.filter((room) => room.id !== id);
        setSelectedRoom(newSelectedRoom);
    };

    useEffect(() => {
        // debugger
        // console.log("from me", router);

        const hotelFnName = router?.query?.availablehotels;
        const hotelName = hotelFnName && hotelFnName.length > 2 ? hotelFnName[2] : null;
        if (hotelName) {
            // debugger
            axios
                .post(`https://hotelobilit-api.iran.liara.run/api/v1/hotels/search/${hotelName}`, {
                    origin: router.query.origin,
                    dest: router.query.dest,
                    stayCount: router.query.night,
                    date: jalaliToMiladiConvertor(router.query.stDate),
                })
                .then((res) => {
                    setHotel(res.data?.data);
                    // console.log(res.data?.data);
                });
        }
    }, [router]);

    const reservePrc = (rooms, flight) => {
        let fiPrice;
        // debugger;
        rooms.map((room) => {
            if (room.room_type_id === 148) {
                fiPrice = roomPrcGen(room, flight);
            }
        });

        if (fiPrice) {
            return fiPrice;
        } else {
            fiPrice = Math.min(rooms.map((room) => {
                return roomPrcGen(room, flight);
            }));
            return fiPrice;
        }
    };

    const roomsGen = (selectedRoom) => {
        const rooms = [];
        selectedRoom.map((room) => {
            rooms.push({
                adl_count: room.Adl_capacity,
                chd_count: room.chd_count,
                inf_count: room.inf_count,
                room_id: room.room_id,
                extra_count: room.extra_bed_count,
                count: 1,
            });
        });

        return rooms;
    };



    const picGen = (picsNum) => {
        const gallary = [];
        let number = picsNum >= 3 ? 3 : picsNum;
        for (let i = 1; i <= number; i++) {
            gallary.push(<motion.div
                whileHover={{translateY: "-15px"}}
                onClick={() => {
                    setIsModal(hotel?.gallery[i]?.url);
                }}
                layoutId={hotel?.gallery[i]?.url}
            >
                <motion.img src={hotel?.gallery[i]?.url} height={100} width={100}/>
            </motion.div>);
        }
        return gallary;
    };

    return (<>
        <NotifAlert/>
        {ismodal && (<PictureModal
            url={ismodal}
            gallery={hotel?.gallery}
            setIsModal={() => setIsModal()}
        />)}

        <div className={styles["container"]}>
            <div className={styles["hotelDet_container"]}>
                {hotel?.gallery ? (<div className={styles["hotelDet"]}>
                    <div className={styles["right"]}>
                        <div className={styles["hotelDet-image"]}>
                            {hotel?.gallery && (<Image
                                src={hotel?.gallery[0].url}
                                height={200}
                                width={300}
                            />)}
                        </div>
                        <div className={styles["hotelDet-names"]}>
                            <div className={styles["hotelDet-names_star"]}>
                                {startBuilder(+hotel?.stars).map((x) => {
                                    return x;
                                })}
                            </div>

                            <p className={styles["hotelDet-names_faName"]}>
                                {hotel.is_domestic ? hotel.title : hotel.titleEn}
                            </p>
                            <p className={styles["hotelDet-names_enName"]}>
                                {hotel.is_domestic ? hotel.titleEn : hotel.title}
                            </p>
                            <div className={styles["hotelDet-names_zoneservice"]}>
                                <label htmlFor="">خدمات:</label>
                                <p>ثبت نشده</p>
                            </div>
                            <div className={styles["hotelDet-names_zoneservice"]}>
                                <label htmlFor="">منطقه:</label>
                                <p>{hotel?.location ? hotel?.location : "ثبت نشده"}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles["left"]}>
                        {hotel?.gallery && (<div className={styles["image_container"]}>
                            <div className={styles["images"]}>
                                {picGen(hotel?.gallery.length).map((pic) => {
                                    return pic;
                                })}
                                <motion.div
                                    className={styles["morePic"]}
                                    onClick={() => {
                                        setIsModal(hotel?.gallery[hotel?.gallery.length - 1]?.url);
                                    }}
                                    layoutId={hotel?.gallery[hotel?.gallery.length - 1]?.url}
                                >
                                    <div className={styles["dots"]}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <Image
                                        src={hotel?.gallery[0].url}
                                        height={100}
                                        width={100}
                                    />
                                </motion.div>
                            </div>
                            <div className={styles["imgbig_container"]}>
                                <Image
                                    className={styles["img-big"]}
                                    src={hotel?.gallery[1].url}
                                    layout="responsive"
                                    height={205}
                                    width={200}
                                />
                            </div>
                        </div>)}
                    </div>
                </div>) : (<motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        duration: 0.9, repeat: Infinity, repeatType: "reverse",
                    }}
                    className={styles["box-top-box-reserve2"]}
                >
                    {/* <div className={styles["skew"]}></div> */}
                </motion.div>)}
            </div>
            <div className={styles["subscription"]}>
                <p className={styles["p-title-page"]}>
                    با بررسی زمان پرواز و قیمت اتاق ها تور خود را انتخاب کنید
                </p>
            </div>

            {hotel?.flights?.map((flight) => {
                return props.widthmobi > 868 ? (dateDiffChecker(flightDateChecker(flight).checkin, flightDateChecker(flight).checkout, props?.night) ? (
                    <div className={styles["ticket_container"]}>
                        <div className={styles["container"]}>
                            {isOpen === 0 ? null : isOpen === flight.id ? null : (<motion.div
                                className={styles["blur"]}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{ease: "easeOut", duration: 0.4}}
                            ></motion.div>)}
                            <div className={styles["ticket"]}>
                                {/* title col1 */}
                                <div className={styles["ticket_titles"]}>
                                    <div
                                        className={styles["ticket_titles_info"]}
                                        style={isOpen === flight.id ? {padding: 0} : null}
                                    >
                                        اطلاعات پرواز
                                    </div>
                                    <div className={styles["ticket_titles_info"]}>
                                        <p>اطلاعات اتاق </p>
                                    </div>
                                </div>
                                {/* ticketdet col2 */}
                                <div className={styles["ticket_flight"]}>
                                    <div className={styles["flightDet_container"]}>
                                        <div className={styles["flightDet"]}>
                                            <div className={styles["flightDet_title"]}>
                                                <p>پرواز رفت</p>
                                            </div>
                                            <div className={styles["flightDet_loc"]}>
                                                <p>
                                                    {flight.origin_name} به {flight.destination_name}
                                                </p>
                                            </div>
                                            <div className={styles["flightDet_timedate"]}>
                                                <span>{flight.time.slice(0, 5)}</span>
                                                <span>و</span>
                                                <span>{MiladiToJalaliConvertor(flight.date)}</span>
                                            </div>
                                            <div className={styles["flightDet_hotelEnt"]}>
                                                <label htmlFor="">ورود به هتل :</label>
                                                <p>
                                                    {flight.checkin_tomorrow ? MiladiToJalaliConvertorInc(flight.date) : MiladiToJalaliConvertor(flight.date)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className={styles["flight_company"]}>
                                            <div className={styles["flight_company_logo"]}>
                                                <div className={styles["image_container"]}>
                                                    <img src={flight?.airline_thumb?.url} alt=""/>
                                                </div>
                                                <p>{flight.airline_name}</p>
                                            </div>
                                            <div className={styles["flight_company_remaintour"]}>
                                                <p className={styles["p-middle"]}>
                                                    تعداد موجودی پرواز : {flight.capacity}
                                                </p>
                                            </div>
                                            <div className={styles["flight_company_logo"]}>
                                                <div className={styles["image_container"]}>
                                                    <img
                                                        src={flight?.flight?.airline_thumb?.url}
                                                        alt=""
                                                    />
                                                </div>
                                                <p>{flight?.flight?.airline_name}</p>
                                            </div>
                                        </div>

                                        <div className={styles["flightDet"]}>
                                            <div className={styles["flightDet_title"]}>
                                                <p>پرواز برگشت</p>
                                            </div>
                                            <div className={styles["flightDet_loc"]}>
                                                <p>
                                                    {flight?.flight?.origin_name} به{" "}
                                                    {flight?.flight?.destination_name}
                                                </p>
                                            </div>
                                            <div className={styles["flightDet_timedate"]}>
                                                <span>{flight?.flight?.time.slice(0, 5)}</span>
                                                <span>و</span>
                                                <span>
                                                {MiladiToJalaliConvertor(flight?.flight?.date)}
                            </span>
                                            </div>
                                            <div className={styles["flightDet_hotelEnt"]}>
                                                <label htmlFor="">خروج از هتل:</label>
                                                <p>
                                                    {" "}
                                                    {flight.checkout_yesterday === true ? MiladiToJalaliConvertorDec(flight?.flight?.date) : MiladiToJalaliConvertor(flight?.flight?.date)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles["roomDet_container"]}>
                                        {hotel?.rooms?.map((room) => {
                                            return (<div className={styles["roomDetcard"]}>
                                                <div className={styles["roomDetcard_roomnum"]}>
                                                    <label htmlFor="">{room.room_type}</label>
                                                    <div
                                                        className={styles["roomDetcard_roomnum_indec"]}
                                                    >
                                                        <div
                                                            className={minAvRoom(room.rates) <= roomCounter(room.room_type_id) ? styles["dec-none"] : styles["in"]}
                                                            onClick={() => {
                                                                IncRoom(flight.id, room.room_type_id, room.room_type, room.Adl_capacity, room.rates, room.id, room.chd_capacity,room.total_extra_count );
                                                            }}
                                                        >
                                                            +
                                                        </div>
                                                        <span>{roomCounter(room.room_type_id)}</span>
                                                        <div
                                                            className={roomCounter(room.room_type_id) === 0 ? styles["dec-none"] : styles["dec"]}
                                                            onClick={() => {
                                                                decRoom(room.room_type_id);
                                                            }}
                                                        >
                                                            -
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles["roomDetcard_price"]}>
                                                    <p>
                                  <span>
                                    {numberWithCommas(roomPrcGen(room, flight))}
                                  </span>
                                                        تومان
                                                    </p>
                                                </div>
                                            </div>);
                                        })}
                                    </div>
                                </div>
                                {/* reserve col 3 */}
                                <div className={styles["ticket_reserve"]}>
                                    <div className="d-flex flex-column align-items-center">
                                        <p className={styles["priceTitle"]}>
                                            قیمت برای هر نفر:
                                        </p>
                                        <div className={styles["ticket_reserve_price"]}>
                                            <label htmlFor="">قیمت:</label>
                                            <p>
                            <span>
                              {numberWithCommas(reservePrc(hotel?.rooms, flight))}
                            </span>
                                                تومان
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                                let routerParam = router.query;
                                                let checkin= flight?.checkin_tomorrow ? MiladiToJalaliConvertorInc(flight?.date) : MiladiToJalaliConvertor(flight?.date)
                                                let checkout= flight?.checkout_yesterday ? MiladiToJalaliConvertorDec(flight?.flight?.date) : MiladiToJalaliConvertor(flight?.flight?.date)
                                                let stayCount= routerParam.night
                                                let rooms= [...roomsGen(selectedRoom)]

                                            if (selectedRoom.length > 0) {
                                            axios.post("https://hotelobilit-api.iran.liara.run/api/v2/reserves/checking",{
                                                checkin:jalaliToMiladiConvertor(checkin),
                                                checkout:jalaliToMiladiConvertor(checkout),
                                                hotel_id:hotel.id,
                                                flight_id:flight.id,
                                                rooms,
                                            }).then(res=>{
                                                // console.log(res.data)
                                                    ErrSuccess("به صفحه تکمیل اطلاعات و رزرو منتقل می‌شوید");
                                                    router.push(`/tours/reserve/${hotel.id}/${flight.id}?checkin=${checkin}&checkout=${checkout}&rooms=${JSON.stringify(rooms)}&ref_code=${res.data.data.ref_code}`);
                                            })
                                            } else {
                                                Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
                                            }

                                        }}
                                        className={styles["ticket_reserve_btn"]}
                                    >
                                        رزرو تور
                                    </button>
                                </div>
                            </div>
                        </div>
                        {flight.id === isOpen ? (<AnimatePresence>
                            <motion.div
                                initial={{height: 0}}
                                animate={{height: "auto"}}
                                transition={{
                                    type: "spring", stiffness: 100, duration: 0.5,
                                }}
                                className={styles["roomcountdet_roomnum"]}
                            >
                                {selectedRoom.map((room) => {
                                    return (<div className={styles["roomcountDet_container"]}>
                                        <div className={styles["roomcountDet"]}>
                                            <div
                                                className={styles["roomcountDet_remove"]}
                                                onClick={() => {
                                                    if (selectedRoom.length === 1) {
                                                        removeRoom(room.id);
                                                        setIsOpen(0);
                                                    } else {
                                                        removeRoom(room.id);
                                                        setIsOpen(flight.id);
                                                    }
                                                }}
                                            >
                                                <svg
                                                    data-name="Layer 1"
                                                    height="150"
                                                    id="Layer_1"
                                                    viewBox="0 0 200 200"
                                                    width="150"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title/>
                                                    <path
                                                        fill="#e20000"
                                                        d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"
                                                    />
                                                    <path
                                                        fill="#e20000"
                                                        d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className={styles["roomcountDet_name"]}>
                                                <p>{room?.room_type}</p>
                                            </div>
                                            <div className={styles["roomcountDet_AdlCount"]}>
                                                <p>تعداد بزرگسال</p>
                                                <p>{room?.Adl_capacity}</p>
                                            </div>

                                            <div className={styles["roomcountDet_bedcount"]}>
                                                <p className={styles["bedtype"]}>
                                                    تعداد تخت اضافه
                                                </p>
                                                <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(extBedPrcGen(hotel?.rooms, flight, room?.room_type_id))}{" "}
                                                    تومان
                                                </p>

                                                <div
                                                    className={styles["roomcountDet_bedcount_count"]}
                                                >
                                                    <div
                                                        className={styles[room?.extra_bed_capacity === 0 ? "dis_decin" : "decin"]}
                                                        onClick={() => {
                                                            incDet(room, "ext_count");
                                                        }}
                                                    >
                                                        +
                                                    </div>
                                                    <span>{room?.extra_bed_count}</span>
                                                    <div
                                                        className={styles[room?.extra_bed_count === 0 ? "dis_decin" : "decin"]}
                                                        onClick={() => decDet(room?.id, "ext_count")}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles["roomcountDet_bedcount"]}>
                                                <p className={styles["bedtype"]}>تعداد نوزاد</p>
                                                <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(flight.inf_price)} تومان
                                                </p>
                                                <div
                                                    className={styles["roomcountDet_bedcount_count"]}
                                                >
                                                    <div
                                                        className={styles[room?.inf_count >= room?.Adl_capacity ? "dis_decin" : "decin"]}
                                                        onClick={() => incDet(room, "inf_count")}
                                                    >
                                                        +
                                                    </div>
                                                    <span>{room?.inf_count}</span>
                                                    <div
                                                        className={styles[room?.inf_count === 0 ? "dis_decin" : "decin"]}
                                                        onClick={() => decDet(room?.id, "inf_count")}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles["roomcountDet_bedcount"]}>
                                                <p className={styles["bedtype"]}>تعداد کودک</p>
                                                <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(chdPrcGen(hotel?.rooms, flight, room?.room_type_id))}{" "}
                                                    تومان
                                                </p>
                                                <div
                                                    className={styles["roomcountDet_bedcount_count"]}
                                                >
                                                    <div
                                                        className={styles[room?.chd_count >= room?.chd_capacity ? "dis_decin" : "decin"]}
                                                        onClick={() => incDet(room, "chd_count")}
                                                    >
                                                        +
                                                    </div>
                                                    <span>{room?.chd_count}</span>
                                                    <div
                                                        className={styles[room?.chd_count === 0 ? "dis_decin" : "decin"]}
                                                        onClick={() => decDet(room?.id, "chd_count")}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>);
                                })}
                            </motion.div>
                        </AnimatePresence>) : null}
                    </div>) : null) : dateDiffChecker(flightDateChecker(flight)?.checkin, flightDateChecker(flight)?.checkout, props?.night) ? (
                    <div>
                        <div className={styles["ticket_container"]}>
                            <div className={styles["container"]}>
                                {isOpen === 0 ? null : isOpen === flight.id ? null : (<motion.div
                                    className={styles["blur"]}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{ease: "easeOut", duration: 0.4}}
                                ></motion.div>)}
                                <div className={styles["ticket"]}>
                                    {/* ticketdet col2 */}
                                    <div className={styles["ticket_flight"]}>
                                        <div className={styles["flightDet_container"]}>
                                            <div className={styles["flightDet"]}>
                                                <div className={styles["flightDet_title"]}>
                                                    <p>پرواز رفت</p>
                                                </div>
                                                <div className={styles["flightDet_loc"]}>
                                                    <p>
                                                        {flight.origin_name} به {flight.destination_name}
                                                    </p>
                                                </div>
                                                <div className={styles["flightDet_timedate"]}>
                                                    <span>{flight.time}</span>
                                                    <span>و</span>
                                                    <span>{MiladiToJalaliConvertor(flight.date)}</span>
                                                </div>
                                                <div className={styles["flightDet_hotelEnt"]}>
                                                    <label htmlFor="">ورود به هتل :</label>
                                                    <p>
                                                        {flight.checkin_tomorrow ? MiladiToJalaliConvertorInc(flight.date) : MiladiToJalaliConvertor(flight.date)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={styles["flight_company"]}>
                                                <div className={styles["flight_company_logo"]}>
                                                    <div className={styles["image_container"]}>
                                                        <img src={flight?.airline_thumb?.url} alt=""/>
                                                    </div>
                                                    <p>{flight.airline_name}</p>
                                                </div>
                                                <div className={styles["flight_company_remaintour"]}>
                                                    <p className={styles["p-middle"]}>
                                                        تعداد موجودی پرواز :{flight.capacity}
                                                    </p>
                                                </div>
                                                <div className={styles["flight_company_logo"]}>
                                                    <div className={styles["image_container"]}>
                                                        <img
                                                            src={flight?.flight?.airline_thumb?.url}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p>{flight?.flight?.airline_name}</p>
                                                </div>
                                            </div>

                                            <div className={styles["flightDet"]}>
                                                <div className={styles["flightDet_title"]}>
                                                    <p>پرواز برگشت</p>
                                                </div>
                                                <div className={styles["flightDet_loc"]}>
                                                    <p>
                                                        {flight?.flight?.origin_name} به{" "}
                                                        {flight?.flight?.destination_name}
                                                    </p>
                                                </div>
                                                <div className={styles["flightDet_timedate"]}>
                                                    <span>{flight?.flight?.time}</span>
                                                    <span>و</span>
                                                    <span>
                              {MiladiToJalaliConvertor(flight?.flight?.date)}
                            </span>
                                                </div>
                                                <div className={styles["flightDet_hotelEnt"]}>
                                                    <label htmlFor="">خروج از هتل :</label>
                                                    <p>
                                                        {" "}
                                                        {flight.checkout_yesterday === true ? MiladiToJalaliConvertorDec(flight?.flight?.date) : MiladiToJalaliConvertor(flight?.flight?.date)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles["roomDet_container"]}>
                                            {hotel?.rooms?.map((room) => {
                                                return (<div className={styles["roomDetcard"]}>
                                                    <div className={styles["roomDetcard_roomnum"]}>
                                                        <label htmlFor="">{room?.room_type}</label>
                                                        <div
                                                            className={styles["roomDetcard_roomnum_indec"]}
                                                        >
                                                            <div
                                                                className={minAvRoom(room.rates) <= roomCounter(room.room_type_id) ? styles["dec-none"] : styles["in"]}
                                                                onClick={() => {
                                                                    IncRoom(flight.id, room.room_type_id, room.room_type, room.Adl_capacity, room.rates, room.id, room.chd_capacity,room.total_extra_count);
                                                                }}
                                                            >
                                                                +
                                                            </div>
                                                            <span>{roomCounter(room?.room_type_id)}</span>
                                                            <div
                                                                className={roomCounter(room.room_type_id) === 0 ? styles["dec-none"] : styles["dec"]}
                                                                onClick={() => {
                                                                    decRoom(room.room_type_id);
                                                                }}
                                                            >
                                                                -
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={styles["roomDetcard_price"]}>
                                                        <p>
                                  <span>
                                    {numberWithCommas(roomPrcGen(room, flight))}
                                  </span>
                                                            تومان
                                                        </p>
                                                    </div>
                                                </div>);
                                            })}
                                        </div>
                                    </div>
                                    {/* reserve col 3 */}
                                </div>
                                <div className={styles["ticket_reserve"]}>
                                    <div className="d-flex flex-column align-items-center">
                                        <p className={styles["priceTitle"]}>قیمت برای هر نفر:</p>
                                        <div className={styles["ticket_reserve_price"]}>
                                            <label htmlFor="">قیمت:</label>
                                            <p>
                          <span>
                            {numberWithCommas(reservePrc(hotel.rooms, flight))}
                          </span>
                                                تومان
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            let routerParam = router.query;
                                            let checkin= flight?.checkin_tomorrow ? MiladiToJalaliConvertorInc(flight?.date) : MiladiToJalaliConvertor(flight?.date)
                                            let checkout= flight?.checkout_yesterday ? MiladiToJalaliConvertorDec(flight?.flight?.date) : MiladiToJalaliConvertor(flight?.flight?.date)
                                            let stayCount= routerParam.night
                                            let rooms= [...roomsGen(selectedRoom)]

                                            if (selectedRoom.length > 0) {
                                                axios.post("https://hotelobilit-api.iran.liara.run/api/v2/reserves/checking",{
                                                    checkin:jalaliToMiladiConvertor(checkin),
                                                    checkout:jalaliToMiladiConvertor(checkout),
                                                    hotel_id:hotel.id,
                                                    flight_id:flight.id,
                                                    rooms,
                                                }).then(res=>{
                                                    // console.log(res.data)
                                                    ErrSuccess("به صفحه تکمیل اطلاعات و رزرو منتقل می‌شوید");
                                                    router.push(`/tours/reserve/${hotel.id}/${flight.id}?checkin=${checkin}&checkout=${checkout}&rooms=${JSON.stringify(rooms)}&ref_code=${res.data.data.ref_code}`);
                                                })
                                            } else {
                                                Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
                                            }

                                        }}
                                        className={styles["ticket_reserve_btn"]}
                                    >
                                        رزرو تور
                                    </button>
                                </div>
                            </div>

                            {flight.id === isOpen ? (<motion.div
                                initial={{height: 0}}
                                animate={{height: "auto"}}
                                transition={{
                                    type: "spring", stiffness: 100, duration: 0.5,
                                }}
                                className={styles["roomcountdet_roomnum"]}
                            >
                                {selectedRoom.map((room) => {
                                    return (<div className={styles["roomcountDet_container"]}>
                                        <div className={styles["roomcountDet"]}>
                                            <div
                                                className={styles["roomcountDet_remove"]}
                                                onClick={() => {
                                                    if (selectedRoom.length === 1) {
                                                        removeRoom(room.id);
                                                        setIsOpen(0);
                                                    } else {
                                                        removeRoom(room.id);
                                                        setIsOpen(flight.id);
                                                    }
                                                }}
                                            >
                                                <svg
                                                    data-name="Layer 1"
                                                    height="150"
                                                    id="Layer_1"
                                                    viewBox="0 0 200 200"
                                                    width="150"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <title/>
                                                    <path
                                                        fill="#e20000"
                                                        d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"
                                                    />
                                                    <path
                                                        fill="#e20000"
                                                        d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className={styles["roomcountDet_name"]}>
                                                <p>{room?.room_type}</p>
                                            </div>
                                            <div className={styles["roomcountDet_AdlCount"]}>
                                                <p>تعداد بزرگسال</p>
                                                <p>{room?.Adl_capacity}</p>
                                            </div>

                                            <div className={styles["roomcountDet_bedcount"]}>
                                                <p className={styles["bedtype"]}>
                                                    تعداد تخت اضافه
                                                </p>
                                                <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(extBedPrcGen(hotel?.rooms, flight, room?.room_type_id))}{" "}
                                                    تومان
                                                </p>

                                                <div
                                                    className={styles["roomcountDet_bedcount_count"]}
                                                >
                                                    <div
                                                        className={styles[room.extra_bed_capacity === 0 ? "dis_decin" : "decin"]}
                                                        onClick={() => {
                                                            incDet(room, "ext_count");
                                                        }}
                                                    >
                                                        +
                                                    </div>
                                                    <span>{room?.extra_bed_count}</span>
                                                    <div
                                                        className={styles[room.extra_bed_count === 0 ? "dis_decin" : "decin"]}
                                                        onClick={() => decDet(room.id, "ext_count")}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles["roomcountDet_bedcount"]}>
                                                <p className={styles["bedtype"]}>تعداد نوزاد</p>
                                                <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(flight?.inf_price)} تومان
                                                </p>
                                                <div
                                                    className={styles["roomcountDet_bedcount_count"]}
                                                >
                                                    <div
                                                        className={styles[room?.inf_count >= room.Adl_capacity ? "dis_decin" : "decin"]}
                                                        onClick={() => incDet(room, "inf_count")}
                                                    >
                                                        +
                                                    </div>
                                                    <span>{room?.inf_count}</span>
                                                    <div
                                                        className={styles[room?.inf_count === 0 ? "dis_decin" : "decin"]}
                                                        onClick={() => decDet(room.id, "inf_count")}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles["roomcountDet_bedcount"]}>
                                                <p className={styles["bedtype"]}>تعداد کودک</p>
                                                <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(chdPrcGen(hotel.rooms, flight, room.room_type_id))}{" "}
                                                    تومان
                                                </p>
                                                <div
                                                    className={styles["roomcountDet_bedcount_count"]}
                                                >
                                                    <div
                                                        className={styles[styles[room.chd_count >= room.chd_capacity ? "dis_decin" : "decin"] ? "dis_decin" : "decin"]}
                                                        onClick={() => incDet(room, "chd_count")}
                                                    >
                                                        +
                                                    </div>
                                                    <span>{room?.chd_count}</span>
                                                    <div
                                                        className={styles[room.chd_count === 0 ? "dis_decin" : "decin"]}
                                                        onClick={() => decDet(room.id, "chd_count")}
                                                    >
                                                        -
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>);
                                })}
                            </motion.div>) : null}
                        </div>
                    </div>) : null;
            })}
        </div>
    </>);
};

export default AvailableFlightBasedonSelectedTour;
