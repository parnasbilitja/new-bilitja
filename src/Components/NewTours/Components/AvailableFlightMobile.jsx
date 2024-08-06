import React, {useEffect, useRef, useState} from "react";
import styles from "../../../../styles/newTour/components/AvailableFlightMobile.module.scss";
import {
    MiladiToJalaliConvertor,
    numberWithCommas,
    numberRounder,
    getDayInPersian, chdAgeStr,
} from "../../../Utils/newTour";
import {AnimatePresence, motion} from "framer-motion";
import {Err, ErrSuccess, NotifAlert} from "./NotifAlert.component";
import {useRouter} from "next/router";
import axios from "axios";
import MapPopUpComponent from "./subComponents/MapPopUp.component";
import moment from "moment-jalaali";

const AvailableFlightMobile = ({

                                   isOpen,
                                   flight,
                                   night,
                                   hotel,
                                   selectedRoom,
                                   setSelectedRoom,
                                   setIsOpen,
                                   isLoading,
                                   setIsLoading,
                                   index,
                                   toggleCollapse
                                   , collapseRefs
                               }) => {
    const [reserveStage, setReserveStage] = useState(1);
    const [passRoomId, setPassRoomId] = useState(null);
    const [iscollapse, setIsCollapse] = useState(false);
    const router = useRouter();


    useEffect(() => {
        console.log('gudkasd8e32684572', getSumOfPrc())
    }, [selectedRoom])

    const variants = {
        hidden: {height: "35px", backgroundColor: "#e4e4e4"},
        visible: {
            height: "auto",
            backgroundColor: ["#e4e4e4", "#f0f0f0", "#fff"],
            transition: {
                ease: "easeOut",
                duration: 0.5,
            },
        },
        exit: {
            height: "35px",
            backgroundColor: ["#fff", "#f0f0f0", "#e4e4e4"],
            transition: {
                ease: "easeOut",
                duration: 0.2,
            },
        },
    };
    const minAvRoom = (rates) =>
        Math.min(
            ...rates.map((a) => {
                return a.available_room_count;
            })
        );
    const roomCounter = (roomTypeId) => {
        const room = selectedRoom?.filter(
            (room) => room?.room_type_id === roomTypeId
        );
        return room.length > 0 ? room[0]?.passCount?.length : 0;
    };

    const individualRoomstypeFinder = (selectedrooms, roomtypeid) => {
        let filteredRoom = selectedrooms.filter(
            (room) => room.room_type_id === roomtypeid
        );
        return filteredRoom;
    };

    const serviceflightprc = (id, servicearr) => {
        let foundservice = servicearr.filter(s => s?.airport_id === id)
        if (foundservice.length > 0) {
            return foundservice[0].rate
        } else {
            return 0
        }
    }
    const IncRoom = (flightId, room, destid) => {
        console.log(destid)
        let service_Flight_Prc
        service_Flight_Prc = serviceflightprc(0, room.services) + serviceflightprc(destid, room.services)

        setPassRoomId(null);

        let findRoom = selectedRoom.filter(
            (sroom) => sroom.room_type_id === room.room_type_id
        );

        if (findRoom.length === 0) {

            if (room.rate.available_room_count > roomCounter(room.room_type_id)) {
                setIsOpen(flightId);
                let idGen = Math.random() * 1000;
                setSelectedRoom([
                    ...selectedRoom,
                    {
                        id: idGen,
                        room_type_id: room.room_type_id,
                        room_id: room.room_id,
                        room_type: room.room_type,
                        Adl_capacity: room.Adl_capacity,
                        count: 1,
                        passCount: [
                            {
                                idroom: idGen,
                                extra_bed_count: 0,
                                inf_count: 0,
                                chd_withbed_count: 0,
                                chd_nobed_count: 0,
                                Adl_count: +room.Adl_capacity,
                            },
                        ],
                        chd_capacity: room.chd_capacity,
                        extra_bed_capacity: room.extra_bed_count,
                        total_extra_count: room.total_extra_count,
                        chd_n_prc: room?.rate?.chd_n_price + flight?.total_chd_price + service_Flight_Prc,
                        chd_w_prc: room?.rate?.chd_w_price === 0 ? 0 : room?.rate?.chd_w_price + flight?.total_chd_price + service_Flight_Prc,
                        ext_prc: room.rate.extra_price + flight?.total_adl_price + service_Flight_Prc,
                        inf_prc: flight.departure?.inf_price + flight?.return?.inf_price + service_Flight_Prc,
                        room_prc: getRoomPrc(room.room_type_id)

                        // adlprc,
                    },
                ]);
            } else {
                Err("تعداد اتاق انتخابی بیش از ظرفیت موجود نیست");
            }
        } else {
            let targetRooms = selectedRoom.filter(
                (sroom) => sroom.room_type_id !== room.room_type_id
            );
            let prevpasscount = findRoom[0].passCount;

            if (room.rate.available_room_count > roomCounter(room.room_type_id)) {
                prevpasscount.push({
                    idroom: Math.random() * 1000,
                    extra_bed_count: 0,
                    inf_count: 0,
                    chd_withbed_count: 0,
                    chd_nobed_count: 0,
                    Adl_count: +room.Adl_capacity,
                });

                let newfinRoom = findRoom[0];
                newfinRoom.passCount = prevpasscount;
                newfinRoom.count = prevpasscount?.length;
                targetRooms.push(newfinRoom);
                setSelectedRoom([...targetRooms]);
            } else {
                Err("تعداد اتاق انتخابی بیش از ظرفیت موجود نیست");
            }
        }
    };
    ///decrease room => :دو تخته , سه تخته , ...........
    const decRoom = (roomTypeId) => {
        if (roomCounter(roomTypeId) === 0) {
            return null;
        } else {
            const removedRoom = [];
            let getRooms = selectedRoom.filter(
                (room) => room.room_type_id === roomTypeId
            );
            if (getRooms[0].passCount.length === 1) {
                const finalRoom = getRooms.pop();
                removedRoom.push(finalRoom);
                const anoRooms = selectedRoom.filter(
                    (selectroom) => removedRoom[0].id !== selectroom.id
                );
                setSelectedRoom([...anoRooms]);
            } else {
                let selecetedPassCount = getRooms[0].passCount;
                selecetedPassCount.pop();
                setSelectedRoom(
                    selectedRoom.map((item) =>
                        item.room_type_id === roomTypeId
                            ? {...item, passCount: selecetedPassCount}
                            : item
                    )
                );
            }
        }

    };

    const incDet = (roomTypeId, type) => {

        let findRoom = selectedRoom.filter(
            (room) => room?.room_type_id === roomTypeId
        );
        let regularCap =
            type === "extra_bed_count"
                ? +findRoom[0]?.extra_bed_capacity
                : type === "inf_count"
                    ? +findRoom[0]?.Adl_capacity
                    : +findRoom[0]?.chd_capacity;
        let maxCap = regularCap * +findRoom[0]?.count;
        if (passCounter(roomTypeId, type) < maxCap) {
            let passnegerCountI = findRoom[0].passCount;
            let passengerCount = findRoom[0].passCount.filter(
                (pass) => pass[type] > 0 && pass[type] < regularCap
            );
            if (passengerCount?.length > 0) {
                let newPassengerCount = {
                    ...passengerCount[0],
                    [type]: passengerCount[0][type] + 1,
                };

                passnegerCountI = passnegerCountI.filter(
                    (pass) => pass.idroom !== newPassengerCount.idroom
                );
                passnegerCountI.push(newPassengerCount);
            } else {
                if (regularCap !== 0) {
                    let passCountwithpropzero = findRoom[0].passCount.filter(
                        (pass) => pass[type] === 0
                    );
                    let newPassengerCount = {
                        ...passCountwithpropzero[0],
                        [type]: passCountwithpropzero[0][type] + 1,
                    };
                    passnegerCountI = passnegerCountI.filter(
                        (pass) => pass.idroom !== newPassengerCount.idroom
                    );
                    passnegerCountI.push(newPassengerCount);
                } else {
                    return false;
                }
            }

            findRoom[0].passCount = passnegerCountI;

            let FilteredRoom = selectedRoom.filter(
                (room) => room?.room_type_id !== roomTypeId
            );

            FilteredRoom.push(findRoom[0]);

            setSelectedRoom(FilteredRoom);
        } else {
            if (type === "extra_bed_count") {
                Err("تخت اضافه بیش از تعداد انتخاب شده، موجود نیست");
            } else if (type === "inf_count") {
                Err("تعداد نوزاد بیش از تعداد انتخاب شده، موجود نیست");
            } else {
                Err("تعداد کودک بیش از تعداد انتخاب شده، موجود نیست");
            }
        }

        //
    };



    ////dec chd, inf,ext number
    const decDet = (roomTypeId, type) => {
        let findRoom = selectedRoom.filter(
            (room) => room?.room_type_id === roomTypeId
        );

        let regularCap =
            type === "extra_bed_count"
                ? +findRoom[0]?.extra_bed_capacity
                : type === "inf_count"
                    ? +findRoom[0]?.Adl_capacity
                    : +findRoom[0]?.chd_capacity;
        let maxCap = regularCap * +findRoom[0]?.count;
        if (passCounter(roomTypeId, type) !== 0) {
            let passnegerCountI = findRoom[0].passCount;
            let passengerCount = findRoom[0].passCount.filter(
                (pass) => pass[type] > 0
            );
            if (passengerCount?.length > 0) {
                let newPassengerCount = {
                    ...passengerCount[0],
                    [type]: passengerCount[0][type] - 1,
                };

                passnegerCountI = passnegerCountI.filter(
                    (pass) => pass.idroom !== newPassengerCount.idroom
                );
                passnegerCountI.push(newPassengerCount);
            } else {
                if (regularCap !== 0) {
                    let passCountwithpropzero = findRoom[0].passCount.filter(
                        (pass) => pass[type] === 0
                    );
                    let newPassengerCount = {
                        ...passCountwithpropzero[0],
                        [type]: passCountwithpropzero[0][type] - 1,
                    };
                    passnegerCountI = passnegerCountI.filter(
                        (pass) => pass.idroom !== newPassengerCount.idroom
                    );
                    passnegerCountI.push(newPassengerCount);
                } else {
                    return false;
                }
            }

            findRoom[0].passCount = passnegerCountI;

            let FilteredRoom = selectedRoom.filter(
                (room) => room?.room_type_id !== roomTypeId
            );

            FilteredRoom.push(findRoom[0]);

            setSelectedRoom(FilteredRoom);
        } else {
            if (type === "extra_bed_count") {
                Err("تخت اضافه بیش از تعداد انتخاب شده، موجود نیست");
            } else if (type === "inf_count") {
                Err("تعداد نوزاد بیش از تعداد انتخاب شده، موجود نیست");
            } else {
                Err("تعداد کودک بیش از تعداد انتخاب شده، موجود نیست");
            }
        }
        //
    };


    useEffect(() => {
        console.log(selectedRoom)
    }, [selectedRoom])
    const getSumOfPrc = () => {

        let totalPrc = 0
        selectedRoom.map(room => {
            totalPrc += passCounter(room.room_type_id, 'extra_bed_count') * room.ext_prc
            totalPrc += passCounter(room.room_type_id, 'chd_withbed_count') * room.chd_w_prc
            totalPrc += passCounter(room.room_type_id, 'chd_nobed_count') * room.chd_n_prc
            totalPrc += passCounter(room.room_type_id, 'inf_count') * room.inf_prc
            totalPrc += room.Adl_capacity * room.room_prc

        })

        return totalPrc
    }
    const getSumOfPassenger = (roomtypeid, passengerType) => {
        let findRoom = selectedRoom.filter(
            (room) => room.room_type_id === roomtypeid
        );
        return findRoom[0].passCount.reduce((accumulator, object) => {
            return accumulator + object[passengerType];
        }, 0);
    };

    const passCounter = (roomTypeId, roomtype, counterType = "individual") => {

        if (counterType === "individual") {
            let findRoom = selectedRoom.filter(
                (room) => room?.room_type_id === roomTypeId
            );
            let sum = findRoom[0].passCount.reduce(
                (accumulator, pass) => accumulator + pass[roomtype],
                0
            );
            return sum;
        } else {
        }
    };
    const getPassengerCap = (roomTypeId, type) => {
        let findRoom = selectedRoom.filter(
            (room) => room?.room_type_id === roomTypeId
        );
        let regularCap =
            type === "extra_bed_count"
                ? +findRoom[0]?.extra_bed_capacity
                : type === "inf_count"
                    ? +findRoom[0]?.Adl_capacity
                    : +findRoom[0]?.chd_capacity;

        return regularCap * +findRoom[0]?.count;
    };

    const AllSelectedPassengerNumber = () => {
        let allPassCounts = [];
        selectedRoom.map((room) => allPassCounts.push(...room.passCount));
        allPassCounts = allPassCounts.map(({idroom, ...pass}) => pass);
        let allpassvalue = [];
        allPassCounts.map((pass) => {
            let passvalue = Object.values(pass);
            allpassvalue.push(...passvalue);
        });

        return allpassvalue.reduce((accumulator, pass) => accumulator + pass, 0);
    };

    const tourReserve1 = (
        fCheckin,
        fCheckout,
        fDId,
        fRId,
        hotelId
    ) => {

        let rooms = [...roomsGen(reformSelectedRoom())];
        if (selectedRoom.length > 0) {
            setIsLoading(true)

            axios
                .post(
                    "https://api.hotelobilit.com/api/v2/reserves/checking",
                    {
                        checkin: fCheckin,
                        checkout: fCheckout,
                        hotel_id: hotelId,
                        flight_id: fDId,
                        return_flight_id: fRId,
                        rooms,
                    }, {
                        headers: {
                            "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
                        }
                    }
                )
                .then((res) => {
                    // console.log(res.data)
                    ErrSuccess("به صفحه تکمیل اطلاعات و رزرو منتقل می‌شوید");
                    router.push(
                        `/tour/reserve/${hotelId}/${fDId}/${fRId}?checkin=${fCheckin}&checkout=${fCheckout}&rooms=${JSON.stringify(
                            rooms
                        )}&ref_code=${res.data.data.ref_code}`
                    );
                })
                .catch((err) => {
                    setIsLoading(false)
                    Err("این پرواز با این تعداد اتاق انتخابی موجودی ندارد");
                });
        } else {
            setIsLoading(false)
            Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
        }
    };
    const minCapacity = (flight) => {
        // debugger
        return Math.min(flight?.departure.capacity, flight?.return.capacity)
    }
    const roomsGen = (selectedRoom) => {
        const rooms = [];
        // debugger
        selectedRoom.map((room) => {
            rooms.push({
                adl_count: room.Adl_capacity,
                chd_withbed_count: room.chd_withbed_count,
                chd_nobed_count: room.chd_nobed_count,
                inf_count: room.inf_count,
                room_id: room?.room_id,
                extra_count: room.extra_bed_count,
                count: 1,
            });
        });

        return rooms;
    };

    const reformSelectedRoom = () => {
        let newRooms = [];
        selectedRoom.map((room) => {
            room.passCount.map((passcount) => {
                let obj = {
                    ...passcount,
                    ...room,
                };
                newRooms.push(obj);
            });
        });
        return newRooms;
    };

    const getDoublePrc = () => {
        // debugger

        let insurance
        let services
        let targetedRoom = hotel.rooms.filter(room => room.room_type_id === 148)
        if (targetedRoom.length > 0) {
            insurance = targetedRoom[0].services.filter(ins => ins.airport_id === 0)
            services = targetedRoom[0].services.filter(service => service.airport_id === flight.departure.destination_id)
            return targetedRoom[0]?.rate?.price + (insurance.length > 0 ? insurance[0].rate : 0) + (services.length > 0 ? services[0].rate : 0) + flight?.total_adl_price

        } else {
            insurance = hotel.rooms[0].services.filter(ins => ins.airport_id === 0)
            services = hotel.rooms[0].services.filter(service => service.airport_id === flight.departure.destination_id)
            return +hotel.rooms[0]?.rate?.price + (insurance.length > 0 ? insurance[0].rate : 0) + (services.length > 0 ? services[0].rate : 0) + flight?.total_adl_price
        }
    }
    const getRoomPrc = (roomTypeId) => {
        let insurance
        let services
        let targetedRoom = hotel.rooms.filter(room => room.room_type_id === roomTypeId)
        insurance = targetedRoom[0].services.filter(ins => ins.airport_id === 0)
        services = targetedRoom[0].services.filter(service => service.airport_id === flight.departure.destination_id)
        return targetedRoom[0]?.rate?.price + (insurance.length > 0 ? insurance[0].rate : 0) + (services.length > 0 ? services[0].rate : 0) + flight.total_adl_price
    }


    return (
        <>
            <NotifAlert/>
            <div key={index}>
                <div className={styles["ticket_container"]}>
                    <div className={styles["container"]}>

                        {isOpen === 0 ? null : isOpen === flight.departure.id.toString() + flight.return.id.toString()
                            ? null : (
                                <motion.div
                                    className={styles["blur"]}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{ease: "easeOut", duration: 0.4}}
                                ></motion.div>
                            )}

                        <>
                            <div className={styles["ticket"]}>
                                {/* ticketdet col2 */}
                                <div className={styles["ticket_flight"]}>
                                    <div className={styles["flightDet_container"]}>
                                        <div className={styles["flight_company"]}>
                                            <div className={styles["flight_company_logo"]}>
                                                <p style={{whiteSpace: 'nowrap'}}>رفت</p>
                                                <div className={styles["image_container"]}>
                                                    <img src={flight?.departure?.airline_logo?.url} alt=""/>
                                                </div>
                                                <p>{flight?.departure?.airline_name}</p>

                                                <div className={styles["flight_info"]}>
                                                    <div style={{
                                                        backgroundColor: '#ebebeb',
                                                        padding: '.5rem',
                                                        borderRadius: '20px',
                                                        marginBottom: '5px'
                                                    }}>
                                                        <p style={{whiteSpace: 'nowrap'}}>
                                                            {flight?.departure?.origin_name}
                                                        </p>
                                                        <p>
                                                            به
                                                        </p>
                                                        <p style={{whiteSpace: 'nowrap'}}>
                                                            {flight?.departure?.destination_name}
                                                        </p>
                                                    </div>
                                                    <div

                                                        className={styles['flight_number']}
                                                    >
                                                        <p>ش.پرواز: </p>
                                                        <p style={{color: "red", marginRight: '5px'}}>
                                                            {flight?.departure?.flight_number}
                                                        </p>
                                                    </div>
                                                    <div className={styles['flightdate']}>

                                                        <p>{MiladiToJalaliConvertor(flight?.departure?.date)}</p>
                                                        <p>{getDayInPersian(moment(flight?.departure?.date).format('dddd'))}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{
                                                            color: '#e20000',
                                                            fontSize: '17px'
                                                        }}>{flight?.departure?.time.slice(0, 5)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles["flight_company_remaintour"]}>
                                                <p style={{whiteSpace: "nowrap"}}>
                                                    تعداد موجودی پرواز :<span style={{
                                                    color: '#e20000',
                                                    fontWeight: '900',
                                                    fontSize: '13px'
                                                }}>{minCapacity(flight)}</span>
                                                </p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: 'center',
                                                        padding: "0",
                                                    }}
                                                >
                                                    <div className={styles["dot"]}></div>
                                                    <div className={styles["seprator"]}></div>
                                                    <svg
                                                        style={{transform: "rotate(270deg)"}}
                                                        viewBox="0 0 24 24"
                                                        fill="#e20000"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        height="30"
                                                    >
                                                        <g>
                                                            <path d="M0 0h24v24H0z" fill="none"/>
                                                            <path
                                                                d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"/>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <p>
                                                    <span style={{
                                                        color: '#e20000',
                                                        fontWeight: '900',
                                                        fontSize: '13px'
                                                    }}> {night}</span> شب و{" "}
                                                    <span style={{
                                                        color: '#e20000',
                                                        fontWeight: '900',
                                                        fontSize: '13px'
                                                    }}> {+night + 1}</span>
                                                    روز
                                                </p>
                                            </div>
                                            <div className={styles["flight_company_logo"]}>
                                                <p style={{whiteSpace: 'nowrap'}}>برگشت</p>
                                                <div className={styles["image_container"]}>
                                                    <img
                                                        src={flight?.return?.airline_logo?.url}
                                                        alt=""
                                                    />
                                                </div>
                                                <p>{flight?.return?.airline_name}</p>

                                                <div className={styles["flight_info"]}>
                                                    <div style={{
                                                        backgroundColor: '#ebebeb',
                                                        padding: '.5rem',
                                                        borderRadius: '20px',
                                                        marginBottom: '5px'
                                                    }}>
                                                        <p style={{whiteSpace: 'nowrap'}}>
                                                            {flight?.return?.origin_name}
                                                        </p>
                                                        <p>
                                                            به
                                                        </p>
                                                        <p style={{whiteSpace: 'nowrap'}}>
                                                            {flight?.return?.destination_name}
                                                        </p>
                                                    </div>
                                                    <div

                                                        className={styles['flight_number']}
                                                    >
                                                        <p>ش.پرواز: </p>
                                                        <p style={{color: "#e20000", marginRight: '5px'}}>
                                                            {flight?.return?.flight_number}
                                                        </p>
                                                    </div>
                                                    <div className={styles['flightdate']}>
                                                        <p>
                                                            {MiladiToJalaliConvertor(flight?.return?.date)}
                                                        </p>
                                                        <p>{getDayInPersian(moment(flight?.return?.date).format('dddd'))}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{
                                                            color: '#e20000',
                                                            fontSize: '17px'
                                                        }}>{flight?.return?.time.slice(0, 5)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {router?.query?.dest === 'AYT' ? <>
                                            <div className={styles["timeline"]}>
                                                <div className={styles["time"]}>
                                                    <p>ورود به هتل : </p>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >

                                                    </div>
                                                </div>
                                                <div className={styles["date"]}>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            margin: "0 10px",
                                                        }}
                                                    >

                                                        <svg
                                                            enableBackground="new 0 0 48 48"
                                                            height="20"
                                                            id="Layer_1"
                                                            version="1.1"
                                                            viewBox="0 0 48 48"
                                                            width="20"
                                                        >
                                                            <path
                                                                clip-rule="evenodd"
                                                                d="M43,43H5c-2.209,0-4-1.791-4-4V9c0-2.209,1.791-4,4-4h38c2.209,0,4,1.791,4,4v30  C47,41.209,45.209,43,43,43z M45,9c0-1.104-0.896-2-2-2H5C3.896,7,3,7.896,3,9v6h42V9z M45,17H3v22c0,1.104,0.896,2,2,2h38  c1.104,0,2-0.896,2-2V17z M41,31h-2c-0.552,0-1-0.447-1-1v-2c0-0.552,0.448-1,1-1h2c0.553,0,1,0.448,1,1v2  C42,30.553,41.553,31,41,31z M41,24h-2c-0.552,0-1-0.447-1-1v-2c0-0.553,0.448-1,1-1h2c0.553,0,1,0.447,1,1v2  C42,23.553,41.553,24,41,24z M33,31h-2c-0.552,0-1-0.447-1-1v-2c0-0.552,0.448-1,1-1h2c0.553,0,1,0.448,1,1v2  C34,30.553,33.553,31,33,31z M33,24h-2c-0.552,0-1-0.447-1-1v-2c0-0.553,0.448-1,1-1h2c0.553,0,1,0.447,1,1v2  C34,23.553,33.553,24,33,24z M25,31h-2c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2  C26,30.553,25.553,31,25,31z M25,24h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C26,23.553,25.553,24,25,24z M17,38h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C18,37.553,17.553,38,17,38z M17,31h-2c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2  C18,30.553,17.553,31,17,31z M17,24h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C18,23.553,17.553,24,17,24z M9,38H7c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2C10,37.553,9.553,38,9,38  z M9,31H7c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2C10,30.553,9.553,31,9,31z M23,34h2  c0.553,0,1,0.447,1,1v2c0,0.553-0.447,1-1,1h-2c-0.553,0-1-0.447-1-1v-2C22,34.447,22.447,34,23,34z"
                                                                fill-rule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles["timeline"]}>
                                                <div className={styles["time"]}>
                                                    <p>خروج از هتل : </p>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        {/*<p>14:00</p>*/}
                                                        {/*<svg*/}
                                                        {/*    height="20"*/}
                                                        {/*    id="Layer_1"*/}
                                                        {/*    version="1.1"*/}
                                                        {/*    viewBox="0 0 512 512"*/}
                                                        {/*    width="20"*/}
                                                        {/*>*/}
                                                        {/*  <g>*/}
                                                        {/*    <path d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M256,446.7   c-105.1,0-190.7-85.5-190.7-190.7c0-105.1,85.5-190.7,190.7-190.7c105.1,0,190.7,85.5,190.7,190.7   C446.7,361.1,361.1,446.7,256,446.7z" />*/}
                                                        {/*    <polygon points="256,256 160,256 160,273.3 273.3,273.3 273.3,128 256,128  " />*/}
                                                        {/*  </g>*/}
                                                        {/*</svg>*/}
                                                    </div>
                                                </div>
                                                <div className={styles["date"]}>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            margin: "0 10px",
                                                        }}
                                                    >
                                                        {/*<p style={{ margin: "0 10px", padding: "0" }}>*/}
                                                        {/*  {" "}*/}
                                                        {/*  {flight.flight.checkin_tomorrow*/}
                                                        {/*      ? MiladiToJalaliConvertorInc(flight.flight.date)*/}
                                                        {/*      : MiladiToJalaliConvertor(flight.flight.date)}*/}
                                                        {/*</p>*/}
                                                        <svg
                                                            enableBackground="new 0 0 48 48"
                                                            height="20"
                                                            id="Layer_1"
                                                            version="1.1"
                                                            viewBox="0 0 48 48"
                                                            width="20"
                                                        >
                                                            <path
                                                                clip-rule="evenodd"
                                                                d="M43,43H5c-2.209,0-4-1.791-4-4V9c0-2.209,1.791-4,4-4h38c2.209,0,4,1.791,4,4v30  C47,41.209,45.209,43,43,43z M45,9c0-1.104-0.896-2-2-2H5C3.896,7,3,7.896,3,9v6h42V9z M45,17H3v22c0,1.104,0.896,2,2,2h38  c1.104,0,2-0.896,2-2V17z M41,31h-2c-0.552,0-1-0.447-1-1v-2c0-0.552,0.448-1,1-1h2c0.553,0,1,0.448,1,1v2  C42,30.553,41.553,31,41,31z M41,24h-2c-0.552,0-1-0.447-1-1v-2c0-0.553,0.448-1,1-1h2c0.553,0,1,0.447,1,1v2  C42,23.553,41.553,24,41,24z M33,31h-2c-0.552,0-1-0.447-1-1v-2c0-0.552,0.448-1,1-1h2c0.553,0,1,0.448,1,1v2  C34,30.553,33.553,31,33,31z M33,24h-2c-0.552,0-1-0.447-1-1v-2c0-0.553,0.448-1,1-1h2c0.553,0,1,0.447,1,1v2  C34,23.553,33.553,24,33,24z M25,31h-2c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2  C26,30.553,25.553,31,25,31z M25,24h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C26,23.553,25.553,24,25,24z M17,38h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C18,37.553,17.553,38,17,38z M17,31h-2c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2  C18,30.553,17.553,31,17,31z M17,24h-2c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2  C18,23.553,17.553,24,17,24z M9,38H7c-0.553,0-1-0.447-1-1v-2c0-0.553,0.447-1,1-1h2c0.553,0,1,0.447,1,1v2C10,37.553,9.553,38,9,38  z M9,31H7c-0.553,0-1-0.447-1-1v-2c0-0.552,0.447-1,1-1h2c0.553,0,1,0.448,1,1v2C10,30.553,9.553,31,9,31z M23,34h2  c0.553,0,1,0.447,1,1v2c0,0.553-0.447,1-1,1h-2c-0.553,0-1-0.447-1-1v-2C22,34.447,22.447,34,23,34z"
                                                                fill-rule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </> : null
                                        }

                                    </div>
                                </div>
                                {/* reserve col 3 */}
                            </div>
                            <div className={styles["ticket_reserve"]}>
                                <div className={styles["ticket_reserve_price"]}
                                     ref={el => collapseRefs.current[flight.departure.id.toString() + flight.return.id.toString()] = el}>
                                    <p className={styles["priceTitle"]}>قیمت برای هر نفر:</p>
                                    <p>
                      <span>
                      {numberWithCommas(
                          getDoublePrc()
                      )}
                      </span>
                                        تومان
                                    </p>
                                </div>

                                <div className={styles["btn-container"]}>
                                    <button
                                        onClick={() => {
                                            setIsOpen(flight.departure.id.toString() + flight.return.id.toString())
                                            setReserveStage(2);

                                            setSelectedRoom([])
                                            toggleCollapse(flight.departure.id.toString() + flight.return.id.toString())
                                        }}
                                        className={`${styles["ticket_reserve_btn_active"]}`}
                                    >
                                        انتخاب تور
                                    </button>

                                </div>


                                <div>
                                    {(isOpen === flight.departure.id.toString() + flight.return.id.toString()) &&

                                        <>
                                            <div className={styles["roomContainer"]}>
                                                <motion.div
                                                    initial={{height: 0}}
                                                    animate={{height: "auto"}}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 100,
                                                        duration: 0.5,
                                                    }}
                                                    className={styles["roomcountdet_roomnum"]}
                                                >
                                                    <div
                                                        style={{
                                                            // paddingLeft: "12px",
                                                            display: "flex",
                                                            justifyContent: "flex-end",
                                                            marginBottom: "16px",
                                                            marginTop: '10px'
                                                        }}
                                                        onClick={() => {
                                                            setIsOpen(0)
                                                            setSelectedRoom([])
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                fontSize: "12px",
                                                                margin: "0 0 0 5px",
                                                                padding: "0 !important",
                                                            }}
                                                        >
                                                            بازگشت به انتخاب پرواز
                                                        </p>
                                                        <svg
                                                            viewBox="0 0 32 32"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            fill="#e20000"
                                                        >
                                                            <title/>
                                                            <g data-name="Layer 2" id="Layer_2">
                                                                <path
                                                                    d="M31,16A15,15,0,1,1,16,1,15,15,0,0,1,31,16ZM3,16A13,13,0,1,0,16,3,13,13,0,0,0,3,16Z"/>
                                                                <path
                                                                    d="M19.87,10.41,14.29,16l5.58,5.59a1,1,0,0,1,0,1.41h0a1,1,0,0,1-1.41,0L12.1,16.64a.91.91,0,0,1,0-1.28L18.46,9a1,1,0,0,1,1.41,0h0A1,1,0,0,1,19.87,10.41Z"/>
                                                            </g>
                                                        </svg>
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                padding: "0",
                                                                margin: "0",
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                            لطفا طبق نفرات اتاق مناسب خود را انتخاب کنید
                                                        </p>
                                                    </div>


                                                    <p
                                                        style={{
                                                            color: "red",
                                                            fontSize: "13px",
                                                            fontWeight: "900",
                                                            margin: "2px 0",
                                                            fontFamily: 'iranBold',
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        توجه داشته باشید اتاق ها طبق ظرفیت میباشد، مثلا دوتخته
                                                        برای دونفر بزرگسال می باشد
                                                    </p>

                                                </motion.div>

                                                <div style={{height: "auto"}}>
                                                    <div className={styles["roomDet_container"]}>
                                                        {hotel?.rooms.sort((a, b) => a.Adl_capacity - b.Adl_capacity)?.map((room) => {
                                                            return (
                                                                <div className={styles["roomDetcard"]}>
                                                                    <div className={styles["room_counter"]}>
                                                                        <div className={styles["roomDetcard_roomnum"]}>
                                                                            <label htmlFor="">
                                                                                {room?.room_type} (مناسب {room.Adl_capacity}{" "}
                                                                                نفر)
                                                                            </label>
                                                                            <div style={{display: "flex"}}>
                                                                                <p
                                                                                    style={{
                                                                                        color: "black",
                                                                                        marginLeft: "3px",
                                                                                        fontSize: "14px"
                                                                                    }}
                                                                                >
                                                                                    قیمت برای هر نفر:
                                                                                </p>
                                                                                <p>
                                  <span className={styles["cost"]}>

                                      {numberWithCommas(getRoomPrc(room.room_type_id))}
                                  </span>
                                                                                    تومان
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        <div
                                                                            className={styles["roomDetcard_roomnum_indec"]}
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    room.rate.available_room_count <=
                                                                                    roomCounter(room.room_type_id)
                                                                                        ? styles["dec-none"]
                                                                                        : styles["in"]
                                                                                }
                                                                                onClick={() => {
                                                                                    IncRoom(
                                                                                        flight.departure.id.toString() + flight.return.id.toString()
                                                                                        ,
                                                                                        room,
                                                                                        flight.departure.destination_id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                +
                                                                            </div>
                                                                            <div className={styles["counter"]}>
                                                                                <p>{roomCounter(room?.room_type_id)}</p>
                                                                            </div>
                                                                            <div
                                                                                className={
                                                                                    roomCounter(room.room_type_id) === 0
                                                                                        ? styles["dec-none"]
                                                                                        : styles["dec"]
                                                                                }
                                                                                onClick={() => {
                                                                                    decRoom(room.room_type_id);
                                                                                }}
                                                                            >
                                                                                -
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <AnimatePresence>
                                                                        {individualRoomstypeFinder(
                                                                                selectedRoom,
                                                                                room?.room_type_id
                                                                            ) &&
                                                                            individualRoomstypeFinder(
                                                                                selectedRoom,
                                                                                room?.room_type_id
                                                                            )?.map((pass) => {
                                                                                return (
                                                                                    <div
                                                                                        // style={{backgroundColor:'#f0f0f0'}}
                                                                                        className={`${styles["roomcountDet_options"]} ${(pass.room_type_id === passRoomId) ? styles['animate'] : passRoomId === null ? null : (pass.room_type_id === passRoomId && iscollapse) ? styles['bacWhite'] : null}`}
                                                                                        onClick={() => {
                                                                                            if (pass.room_type_id === passRoomId) {
                                                                                                setPassRoomId(null);
                                                                                                setIsCollapse(false)
                                                                                            } else {
                                                                                                setPassRoomId(pass.room_type_id);
                                                                                                setIsCollapse(true)
                                                                                            }
                                                                                        }}
                                                                                        // initial="hidden"
                                                                                        // animate={
                                                                                        //   passRoomId === pass.room_type_id &&
                                                                                        //   "visible"
                                                                                        // }
                                                                                        // variants={variants}
                                                                                        // exit="exit"
                                                                                    >
                                                                                        <div
                                                                                            style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "space-between",
                                                                                                padding: "5px 15px",
                                                                                            }}
                                                                                        >
                                                                                            <p style={{fontSize: "10px"}}>
                                                                                                انتخاب کودک، نوزاد، تخت
                                                                                                اضافه{" "}
                                                                                            </p>

                                                                                            <div>
                                                                                                <svg
                                                                                                    height="20px"
                                                                                                    id="Layer_1"
                                                                                                    version="1.1"
                                                                                                    viewBox="0 0 512 512"
                                                                                                    width="20px"
                                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                                >
                                                                                                    <polygon
                                                                                                        points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "/>
                                                                                                </svg>
                                                                                            </div>
                                                                                        </div>
                                                                                        {passRoomId === pass.room_type_id && (
                                                                                            <>
                                                                                                {
                                                                                                    pass.extra_bed_capacity > 0 &&
                                                                                                    <div
                                                                                                        className={`${
                                                                                                            styles["roomcountDet_bedcount"]
                                                                                                        } ${
                                                                                                            styles[
                                                                                                                room?.extra_bed_count > 0
                                                                                                                    ? "borderActive"
                                                                                                                    : "bordernoneActive"
                                                                                                                ]
                                                                                                        }`}
                                                                                                    >
                                                                                                        <div>
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    // display: "flex",
                                                                                                                    // justifyContent: "space-between",
                                                                                                                    // padding: "0 5px",
                                                                                                                    columnGap: '5px'
                                                                                                                }}>

                                                                                                                <p className={styles["bedtype"]}>
                                                                                                                    تعداد
                                                                                                                    تخت
                                                                                                                    اضافه
                                                                                                                </p>
                                                                                                                <p className={styles['age_range']}>(بالای
                                                                                                                    12
                                                                                                                    سال)</p>
                                                                                                            </div>
                                                                                                            <p className={styles["bedtypeprc"]}>
                                                                                                                {numberWithCommas(pass.ext_prc)}{" "}
                                                                                                                تومان
                                                                                                            </p>

                                                                                                        </div>
                                                                                                        <div
                                                                                                            style={{
                                                                                                                display: "flex",
                                                                                                                justifyContent: "space-between",
                                                                                                                alignItems: "center",
                                                                                                                marginTop: "10px",
                                                                                                                padding: "0 15px",
                                                                                                            }}
                                                                                                        >


                                                                                                            <div
                                                                                                                className={
                                                                                                                    styles[
                                                                                                                        "roomcountDet_bedcount_count"
                                                                                                                        ]
                                                                                                                }
                                                                                                            >
                                                                                                                <div
                                                                                                                    className={
                                                                                                                        styles[
                                                                                                                            getPassengerCap(
                                                                                                                                pass.room_type_id,
                                                                                                                                "extra_bed_count"
                                                                                                                            ) <=
                                                                                                                            passCounter(
                                                                                                                                pass.room_type_id,
                                                                                                                                "extra_bed_count"
                                                                                                                            )
                                                                                                                                ? "dis_decin"
                                                                                                                                : "decin"
                                                                                                                            ]
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        e.stopPropagation();
                                                                                                                        incDet(
                                                                                                                            room?.room_type_id,
                                                                                                                            "extra_bed_count"
                                                                                                                        );
                                                                                                                    }}
                                                                                                                >
                                                                                                                    +
                                                                                                                </div>
                                                                                                                <span>
                                                {getSumOfPassenger(
                                                    room?.room_type_id,
                                                    "extra_bed_count"
                                                )}
                                              </span>
                                                                                                                <div
                                                                                                                    className={
                                                                                                                        styles[
                                                                                                                            passCounter(
                                                                                                                                pass.room_type_id,
                                                                                                                                "extra_bed_count"
                                                                                                                            ) === 0
                                                                                                                                ? "dis_decin"
                                                                                                                                : "decin"
                                                                                                                            ]
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        e.stopPropagation();
                                                                                                                        decDet(
                                                                                                                            room?.room_type_id,
                                                                                                                            "extra_bed_count"
                                                                                                                        );
                                                                                                                    }}
                                                                                                                >
                                                                                                                    -
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                }

                                                                                                {
                                                                                                    pass.chd_capacity > 0 &&
                                                                                                    <div
                                                                                                        className={`${
                                                                                                            styles["roomcountDet_bedcount"]
                                                                                                        } ${
                                                                                                            styles[
                                                                                                                room?.chd_count > 0
                                                                                                                    ? "borderActive"
                                                                                                                    : "bordernoneActive"
                                                                                                                ]
                                                                                                        }`}
                                                                                                    >
                                                                                                        <div

                                                                                                        >
                                                                                                            <div
                                                                                                                style={{

                                                                                                                    // justifyContent: "space-between",
                                                                                                                    // padding: "0 5px",
                                                                                                                    columnGap: '5px'
                                                                                                                }}>

                                                                                                                <p className={styles["bedtype"]}>
                                                                                                                    تعداد
                                                                                                                    کودک
                                                                                                                    با
                                                                                                                    تخت
                                                                                                                </p>
                                                                                                                <p className={styles['age_range']}>({chdAgeStr(hotel?.hotel?.with_bed_child_ages[0], hotel?.hotel?.with_bed_child_ages[1])})</p>
                                                                                                            </div>
                                                                                                            <p className={styles["bedtypeprc"]}>
                                                                                                                {/*{numberWithCommas(*/}
                                                                                                                {/*    numberRounder(*/}
                                                                                                                {/*        chdPrcGen(*/}
                                                                                                                {/*            hotel.rooms,*/}
                                                                                                                {/*            flight,*/}
                                                                                                                {/*            room.room_type_id*/}
                                                                                                                {/*        )*/}
                                                                                                                {/*    )*/}
                                                                                                                {/*)}{" "}*/}
                                                                                                                {pass.chd_w_prc > 0 ? ` ${numberWithCommas(
                                                                                                                    pass.chd_w_prc
                                                                                                                )}
                                                                تومان` : 'عدم موجودی'}
                                                                                                            </p>
                                                                                                        </div>

                                                                                                        <div
                                                                                                            style={{
                                                                                                                display: "flex",
                                                                                                                justifyContent: "space-between",
                                                                                                                alignItems: "center",
                                                                                                                // marginTop: "10px",
                                                                                                                padding: "0 15px",
                                                                                                            }}
                                                                                                        >

                                                                                                            <div
                                                                                                                className={
                                                                                                                    styles[
                                                                                                                        "roomcountDet_bedcount_count"
                                                                                                                        ]
                                                                                                                }
                                                                                                            >
                                                                                                                <div
                                                                                                                    className={
                                                                                                                        styles[
                                                                                                                            (getPassengerCap(
                                                                                                                                    pass.room_type_id,
                                                                                                                                    "chd_count"
                                                                                                                                ) <=
                                                                                                                                passCounter(
                                                                                                                                    pass.room_type_id,
                                                                                                                                    "chd_nobed_count"
                                                                                                                                ) + passCounter(
                                                                                                                                    pass.room_type_id,
                                                                                                                                    "chd_withbed_count"
                                                                                                                                )) || pass.chd_w_prc === 0
                                                                                                                                ? "dis_decin"
                                                                                                                                : "decin"
                                                                                                                            ]
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        e.stopPropagation();

                                                                                                                        if (pass.chd_w_prc > 0) {
                                                                                                                            incDet(
                                                                                                                                room?.room_type_id,
                                                                                                                                "chd_withbed_count"
                                                                                                                            )
                                                                                                                        } else {
                                                                                                                            Err('کودک با تخت موجودی ندارد')
                                                                                                                        }
                                                                                                                    }}
                                                                                                                >
                                                                                                                    +
                                                                                                                </div>
                                                                                                                <span>
                                                {" "}
                                                                                                                    {getSumOfPassenger(
                                                                                                                        room?.room_type_id,
                                                                                                                        "chd_withbed_count"
                                                                                                                    )}
                                              </span>
                                                                                                                <div
                                                                                                                    className={
                                                                                                                        styles[
                                                                                                                            passCounter(
                                                                                                                                pass.room_type_id,
                                                                                                                                "chd_withbed_count"
                                                                                                                            ) === 0
                                                                                                                                ? "dis_decin"
                                                                                                                                : "decin"
                                                                                                                            ]
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        e.stopPropagation();
                                                                                                                        decDet(
                                                                                                                            room?.room_type_id,
                                                                                                                            "chd_withbed_count"
                                                                                                                        );
                                                                                                                    }}
                                                                                                                >
                                                                                                                    -
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                }

                                                                                                {
                                                                                                    pass.chd_capacity > 0 &&
                                                                                                    <div
                                                                                                        className={`${
                                                                                                            styles["roomcountDet_bedcount"]
                                                                                                        } ${
                                                                                                            styles[
                                                                                                                room?.chd_count > 0
                                                                                                                    ? "borderActive"
                                                                                                                    : "bordernoneActive"
                                                                                                                ]
                                                                                                        }`}
                                                                                                    >
                                                                                                        <div

                                                                                                        >
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    // display: "flex",
                                                                                                                    // justifyContent: "space-between",
                                                                                                                    // padding: "0 5px",
                                                                                                                    columnGap: '5px'
                                                                                                                }}>

                                                                                                                <p className={styles["bedtype"]}>
                                                                                                                    تعداد
                                                                                                                    کودک
                                                                                                                    بدون
                                                                                                                    تخت
                                                                                                                </p>
                                                                                                                <p className={styles['age_range']}
                                                                                                                   style={{fontSize: '10px !important'}}>({chdAgeStr(hotel?.hotel?.no_bed_child_ages[0], hotel?.hotel?.no_bed_child_ages[1])})</p>
                                                                                                            </div>
                                                                                                            <p className={styles["bedtypeprc"]}>
                                                                                                                {/*{numberWithCommas(*/}
                                                                                                                {/*    numberRounder(*/}
                                                                                                                {/*        chdPrcGen(*/}
                                                                                                                {/*            hotel.rooms,*/}
                                                                                                                {/*            flight,*/}
                                                                                                                {/*            room.room_type_id*/}
                                                                                                                {/*        )*/}
                                                                                                                {/*    )*/}
                                                                                                                {/*)}{" "}*/}
                                                                                                                {` ${numberWithCommas(
                                                                                                                    pass.chd_n_prc
                                                                                                                )}
                                                                تومان`}
                                                                                                            </p>
                                                                                                        </div>

                                                                                                        <div
                                                                                                            style={{
                                                                                                                display: "flex",
                                                                                                                justifyContent: "space-between",
                                                                                                                alignItems: "center",
                                                                                                                // marginTop: "10px",
                                                                                                                padding: "0 15px",
                                                                                                            }}
                                                                                                        >

                                                                                                            <div
                                                                                                                className={
                                                                                                                    styles[
                                                                                                                        "roomcountDet_bedcount_count"
                                                                                                                        ]
                                                                                                                }
                                                                                                            >
                                                                                                                <div
                                                                                                                    className={
                                                                                                                        styles[
                                                                                                                            (getPassengerCap(
                                                                                                                                    pass.room_type_id,
                                                                                                                                    "chd_count"
                                                                                                                                ) <=
                                                                                                                                passCounter(
                                                                                                                                    pass.room_type_id,
                                                                                                                                    "chd_nobed_count"
                                                                                                                                ) + passCounter(
                                                                                                                                    pass.room_type_id,
                                                                                                                                    "chd_withbed_count"
                                                                                                                                )) || pass.chd_n_prc === 0
                                                                                                                                ? "dis_decin"
                                                                                                                                : "decin"
                                                                                                                            ]
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        e.stopPropagation();
                                                                                                                        if (pass.chd_n_prc > 0) {
                                                                                                                            incDet(
                                                                                                                                room?.room_type_id,
                                                                                                                                "chd_nobed_count"
                                                                                                                            )
                                                                                                                        } else {
                                                                                                                            Err('کودک بدون تخت موجودی ندارد')
                                                                                                                        }

                                                                                                                    }}
                                                                                                                >
                                                                                                                    +
                                                                                                                </div>
                                                                                                                <span>
                                                {" "}
                                                                                                                    {getSumOfPassenger(
                                                                                                                        room?.room_type_id,
                                                                                                                        "chd_nobed_count"
                                                                                                                    )}

                                              </span>
                                                                                                                <div
                                                                                                                    className={
                                                                                                                        styles[
                                                                                                                            passCounter(
                                                                                                                                pass.room_type_id,
                                                                                                                                "chd_nobed_count"
                                                                                                                            ) === 0
                                                                                                                                ? "dis_decin"
                                                                                                                                : "decin"
                                                                                                                            ]
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        e.stopPropagation();
                                                                                                                        decDet(
                                                                                                                            room?.room_type_id,
                                                                                                                            "chd_nobed_count"
                                                                                                                        );
                                                                                                                    }}
                                                                                                                >
                                                                                                                    -
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                }

                                                                                                {
                                                                                                    pass.Adl_capacity > 0 &&
                                                                                                    <div
                                                                                                        className={`${
                                                                                                            styles["roomcountDet_bedcount"]
                                                                                                        } ${
                                                                                                            styles[
                                                                                                                room?.inf_count > 0
                                                                                                                    ? "borderActive"
                                                                                                                    : "bordernoneActive"
                                                                                                                ]
                                                                                                        }`}
                                                                                                    >
                                                                                                        <div

                                                                                                        >
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    columnGap: '5px'
                                                                                                                }}>

                                                                                                                <p className={styles["bedtype"]}>
                                                                                                                    تعداد
                                                                                                                    نوزاد
                                                                                                                </p>
                                                                                                                <p className={styles['age_range']}>(زیر
                                                                                                                    2
                                                                                                                    سال)</p>
                                                                                                            </div>
                                                                                                            <p className={styles["bedtypeprc"]}>

                                                                                                                {numberWithCommas(pass.inf_prc)}{" "}
                                                                                                                تومان
                                                                                                            </p>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            style={{
                                                                                                                display: "flex",
                                                                                                                justifyContent: "space-between",
                                                                                                                alignItems: "center",
                                                                                                                // marginTop: "10px",
                                                                                                                padding: "0 15px",
                                                                                                            }}
                                                                                                        >

                                                                                                            <div
                                                                                                                className={
                                                                                                                    styles[
                                                                                                                        "roomcountDet_bedcount_count"
                                                                                                                        ]
                                                                                                                }
                                                                                                            >
                                                                                                                <div
                                                                                                                    className={
                                                                                                                        styles[
                                                                                                                            getPassengerCap(
                                                                                                                                pass.room_type_id,
                                                                                                                                "inf_count"
                                                                                                                            ) <=
                                                                                                                            passCounter(
                                                                                                                                pass.room_type_id,
                                                                                                                                "inf_count"
                                                                                                                            )
                                                                                                                                ? "dis_decin"
                                                                                                                                : "decin"
                                                                                                                            ]
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        e.stopPropagation();
                                                                                                                        incDet(
                                                                                                                            room?.room_type_id,
                                                                                                                            "inf_count"
                                                                                                                        );
                                                                                                                    }}
                                                                                                                >
                                                                                                                    +
                                                                                                                </div>
                                                                                                                <span>
                                                {" "}
                                                                                                                    {getSumOfPassenger(
                                                                                                                        room?.room_type_id,
                                                                                                                        "inf_count"
                                                                                                                    )}
                                              </span>
                                                                                                                <div
                                                                                                                    className={
                                                                                                                        styles[
                                                                                                                            passCounter(
                                                                                                                                pass.room_type_id,
                                                                                                                                "inf_count"
                                                                                                                            ) === 0
                                                                                                                                ? "dis_decin"
                                                                                                                                : "decin"
                                                                                                                            ]
                                                                                                                    }
                                                                                                                    onClick={(e) => {
                                                                                                                        e.stopPropagation();
                                                                                                                        decDet(
                                                                                                                            room?.room_type_id,
                                                                                                                            "inf_count"
                                                                                                                        );
                                                                                                                    }}
                                                                                                                >
                                                                                                                    -
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                }


                                                                                            </>
                                                                                        )}
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                    </AnimatePresence>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                <div className={styles["btnContainer"]}>
                                                    <button
                                                        onClick={() => {
                                                            if (!isLoading) {
                                                                tourReserve1(
                                                                    hotel.hotel.checkin,
                                                                    hotel.hotel.checkout,
                                                                    flight?.departure.id,
                                                                    flight?.return.id,
                                                                    hotel.hotel.id
                                                                );

                                                            }
                                                        }}
                                                        className={
                                                            styles[selectedRoom.length === 0 ? "disbtn" : "btn"]
                                                        }
                                                    >
                                                        {
                                                            isLoading ?

                                                                <span>لطفا منتطر بمانید....</span> :
                                                                <>
                                      <span>
                                                        {`رزرو تور برای ${AllSelectedPassengerNumber()} نفر`}


                                                        </span>
                                                                    <span>
                                          {numberWithCommas(getSumOfPrc())} تومان
                                        </span>
                                                                </>

                                                        }

                                                    </button>
                                                </div>
                                            </div>

                                        </>
                                    }
                                </div>

                            </div>
                        </>

                    </div>
                </div>
            </div>


        </>
    );
};

export default AvailableFlightMobile;
