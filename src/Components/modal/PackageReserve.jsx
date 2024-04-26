import axios from "axios";
import React, {useEffect, useState} from "react";
import {Err, ErrSuccess, NotifAlert} from "../NewTours/Components/NotifAlert.component";
import PrimaryTextInput from "../../sources/component/PrimaryTextInput.component";
import {usePostHog} from "posthog-js/react";
import {chdAgeStr, numberToWordConvertor, numberWithCommas} from "../../Utils/newTour";
import {useRouter} from "next/router";


const PackageReserve = ({
                            transfers,
                            tourData,
                            flightIds,
                            selectedHotel,
                            flightId,
                            setIsReserve,
                            messages,
                            setMessages,
                            setShow,
                            setPackData,
                            packData,
                            setOpen,
                            datatitle,
                            isBundle
                        }) => {
    const router = useRouter()
    const [foundFlight, setFoundFlight] = useState([])
    useEffect(() => {
        let flight = transfers.filter(f => +(f.id.toString() + f.return_id.toString()) === +flightId)
        setFoundFlight(flight[0])
        console.log(flight, transfers, flightId)
    }, [transfers, flightId])


    const [loading, setLoading] = useState(false)
    const roomCounter = (typeid) => {

        let room = rooms.filter(r => r.room_type_id === typeid)
        return room.length
    }

    const findRoomByName=(roomtypeid,id)=>{
       let foundroom= selectedRoomsData.filter(room=>room.room_type_id===roomtypeid)
        let getIndex= foundroom.findIndex(item => item.id === id)

        return (+getIndex)+1
    }
    const incRoom = (room) => {
// debugger

        rooms.map(r => {

            if (r.roomTypeId === room.roomTypeId) {
                if (r.capacity > roomNumber(room.roomTypeId).length) {
                    setSelecetedRoomsData(prevState => [...prevState, {
                        id: Math.random() * 1000,
                        room_type_id: room.roomTypeId,
                        room_id: room.roomId,
                        room_type: room?.roomName,
                        hotel_id: selectedHotel.hotel_id,
                        Adl_capacity: room?.roomCapacity,
                        extra_bed_count: 0,
                        inf_count: 0,
                        chd_withbed_count: 0,
                        chd_nobed_count: 0,
                        chd_capacity: room?.roomChdCapacity,
                        extra_bed_capacity: room?.extra_bed_count,
                        total_extra_count: room?.total_extra_count,
                        chd_withbed_prc: room?.chd_w_price,
                        chd_nobed_prc: room?.chd_n_price,
                        chd_withbed_ages: room.with_bed_child_ages,
                        chd_nobed_ages: room.no_bed_child_ages,
                        ext_prc: room?.extra_bed_price,
                        inf_prc: room.inf_price,
                        adl_count: room.roomCapacity,
                        extra_count: 0,
                        count: 1,
                    }])
                } else {
                    Err('تعداد موارد انتخابی بیش از حد مجاز است.')
                    return r
                }


            } else {
                return r
            }

        })

        // setRooms(justifiedRooms)

        console.log(selectedRoomsData)


    }

    const removeRoom = (id) => {

        const newSelectedRoom = selectedRoomsData.filter((room) => room.id !== id);
        setSelecetedRoomsData(newSelectedRoom);
    };
    const decDet1 = (id, type) => {
        if (type === "ext_count") {
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === id) {
                    if (x.extra_count > 0) {
                        return {
                            ...x,
                            extra_count: x.extra_count - 1,
                        };
                    } else {
                        return {
                            ...x,
                            extra_count: 0,
                        };
                    }
                } else {
                    return x;
                }
            });
            setSelecetedRoomsData(findRoom);
        } else if (type === "inf_count") {
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === id) {
                    if (x.inf_count) {
                        return {
                            ...x,
                            inf_count: x.inf_count - 1,
                        };
                    } else {
                        return {
                            ...x,
                            inf_count: 0,
                        };
                    }
                } else {
                    return x;
                }
            });
            setSelecetedRoomsData(findRoom);
        } else if (type === "chd_withbed_count") {
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === id) {
                    if (x?.chd_withbed_count) {
                        return {
                            ...x,
                            chd_withbed_count: x?.chd_withbed_count - 1,
                        };
                    } else {
                        return {
                            ...x,
                            chd_withbed_count: 0,
                        };
                    }
                } else {
                    return x;
                }
            });
            setSelecetedRoomsData(findRoom);
        } else if (type === "chd_nobed_count") {
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === id) {
                    if (x?.chd_nobed_count) {
                        return {
                            ...x,
                            chd_nobed_count: x?.chd_nobed_count - 1,
                        };
                    } else {
                        return {
                            ...x,
                            chd_nobed_count: 0,
                        };
                    }
                } else {
                    return x;
                }
            });
            setSelecetedRoomsData(findRoom);
        }
        // console.log(selectedRoom);
    };

    useEffect(() => {
        console.log('pouya', selectedRoomsData)
    }, [selectedRoomsData])

    const incDet1 = (room, type) => {
        // debugger;
        if (type === "ext_count") {
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === room?.id) {
                    if (x?.extra_count + x.chd_withbed_count >= x?.extra_bed_capacity) {
                        Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
                        return x;
                    } else {
                        if (x.extra_count <= x.extra_bed_capacity) {
                            return {
                                ...x,
                                extra_count: x.extra_count + 1,
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

            setSelecetedRoomsData(findRoom);
        } else if (type === "inf_count") {
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === room?.id) {
                    if (x.inf_count < x.Adl_capacity) {
                        return {
                            ...x,
                            inf_count: x.inf_count + 1,
                        };
                    } else {
                        Err("گنجایش نوزاد بیش از تعداد انتخاب شده موجود نیست");
                        return x;
                    }
                } else {
                    return x;
                }
            });

            setSelecetedRoomsData(findRoom);
        } else if (type === "chd_withbed_count") {
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === room?.id) {
                    if (x?.chd_withbed_count + x?.extra_count >= x?.total_extra_count) {
                        Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
                        return x;
                    } else {
                        // debugger
                        if (x?.chd_withbed_count < x?.chd_capacity) {
                            return {
                                ...x,
                                chd_withbed_count: x?.chd_withbed_count + 1,
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

            setSelecetedRoomsData(findRoom);
        } else if (type === "chd_nobed_count") {
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === room?.id) {
                    if (x?.chd_nobed_count + x?.extra_count >= x?.total_extra_count) {
                        Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
                        return x;
                    } else {
                        if (x?.chd_nobed_count < x?.chd_capacity) {
                            return {
                                ...x,
                                chd_nobed_count: x?.chd_nobed_count + 1,
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

            setSelecetedRoomsData(findRoom);
        }
        // console.log(selectedRoom);
    };

    useEffect(() => {
        console.log(tourData)
    }, [tourData])
    const tourReserve = (
        fCheckin,
        fCheckout,
        fDId,
        fRId,
        hotelId
    ) => {
        let routerParam = router.query;
        // let checkin = fCheckin
        //     ? MiladiToJalaliConvertorInc(goneDate)
        //     : MiladiToJalaliConvertor(goneDate);
        // let checkout = fCheckout
        //     ? MiladiToJalaliConvertorDec(arrivalDate)
        //     : MiladiToJalaliConvertor(arrivalDate);
        // let stayCount = routerParam.night;
        // let rooms = [...roomsGen(selectedRoom)];


        if (selectedRoomsData.length > 0) {
            // setIsLoading(true)

            axios
                .post(
                    "https://api.hotelobilit.com/api/v2/reserves/checking",
                    {

                        checkin: tourData.checkin,
                        checkout: tourData.checkout,
                        hotel_id: selectedHotel.hotel_id,
                        flight_id: flightIds.depratureId,
                        return_flight_id: flightIds.returnId,
                        rooms: selectedRoomsData,
                    },
                    {
                        headers: {
                            "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
                        }
                    }
                )
                .then((res) => {
                    setLoading(false)
                    console.log('data', res.data)
                    ErrSuccess("به صفحه تکمیل اطلاعات و رزرو منتقل می‌شوید");
                    router.push(
                        `/tour/reserve/${selectedHotel.hotel_id}/${flightIds.depratureId}/${flightIds.returnId}?checkin=${tourData.checkin}&checkout=${tourData.checkout}&rooms=${JSON.stringify(
                            selectedRoomsData
                        )}&ref_code=${res.data.data.ref_code}`
                    );
                })
                .catch((err) => {
                    // setIsLoading(false)
                    setLoading(false)
                    Err("این پرواز با این تعداد اتاق انتخابی موجودی ندارد");
                });
        } else {
            // setIsLoading(false)
            Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
        }
    };

////////////////////
    const posthog = usePostHog()
    const [passsengerCount, setPassengerCount] = useState({
        adl: 0,
        chd: 0,
        inf: 0
    })
    const valueHandler = (e) => {
        setPackData({...packData, [e.target.name]: e.target.value})
    }

    const [rooms, setRooms] = useState([])
    const [selectedRoomsData, setSelecetedRoomsData] = useState([])


    useEffect(() => {

        setPackData({...packData, count: passsengerCount.adl + passsengerCount.chd + passsengerCount.inf})
    }, [passsengerCount])

    const data = {
        noPackage: false,
        package_id: packData.tourId,
        city_id: null,
        phone: packData.number,
        name: null,
        month: null,
        count: packData.count ? packData.count : 1
    }

    const dataHandler = async () => {
        await axios.post('https://api.hotelobilit.com/api/v2/tours/createReserve', data,
            {
                headers: {
                    "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
                }
            }
        )
            .then(response => {
                setMessages({...messages, isDone: response.data.isDone, message: response.data.message});
                ErrSuccess('درخواست رزرو با موفقیت ثبت شد. منتظر تماس کارشناسان ما باشید.')
            })
        setShow(false);
        setOpen(true)
    }
    const removeDuplicateObj = (data, prop) => {
        // debugger
        const seenIds = {}; // Helper object to keep track of seen IDs

        const filteredData = data.filter((obj) => {
            if (!seenIds[obj.roomTypeId]) {
                seenIds[obj.roomTypeId] = true; // Mark the ID as seen
                return true; // Keep the object in the filtered data
            }
            return false; // Ignore the object as duplicate
        });
        return filteredData;
    };

    ////////////////////////////////
    const getCheapestRoom = (roomsArr) => {

        let chepestRooms = []
        roomsArr.map(room => {
            let roomtypeId = room.roomTypeId

            let filteredRoom = roomsArr?.filter(room => room.roomTypeId === roomtypeId)
            let minprc = filteredRoom.reduce((min, obj) => (obj.price < min.price ? obj : min), filteredRoom[0]);
            chepestRooms.push(minprc)
        })


        let finalRoom = removeDuplicateObj(chepestRooms)

        return finalRoom

    }
    useEffect(() => {
        // console.log('asdas32432',selectedHotel)
        if (!isBundle) {
            // debugger
            let selectedRooms = selectedHotel.prices.filter(room => (room.flight_id.toString() + room.return_flight_id.toString()) === flightId)
            selectedRooms = getCheapestRoom(selectedRooms)
            selectedRooms = selectedRooms.map(room =>
                ({...room, count: 0, id: Math.random() * 100})
            )
            setRooms(selectedRooms)
        } else {
            setRooms(selectedHotel)
        }
    }, [isBundle])


    const roomNumber = (roomid) => {

        let foundrooms = selectedRoomsData.filter(room => room.room_type_id === roomid)

        return foundrooms
    }

    useEffect(() => {

        console.log(tourData)
    }, [tourData])
    const decRoom = (room) => {
        // debugger
        let foundRoom = selectedRoomsData?.filter(r => r.room_type_id === room.roomTypeId)
        foundRoom.pop()
        let filteredRoom = selectedRoomsData?.filter(r => r.room_type_id !== room.roomTypeId)
        filteredRoom.push(...foundRoom)
        setSelecetedRoomsData(filteredRoom)
    }
    useEffect(() => {
        console.log(selectedRoomsData)
    }, [selectedRoomsData])

    return (


        <>
            <NotifAlert/>
            <div className="col-xl-12 col-lg-12 col-12 " >

                <div style={{position:'relative'}}>
                    <div className={selectedRoomsData.length > 1 ? 'roomtour':'h-auto'}>
                        <div onClick={() => {
                            setIsReserve(false)
                        }} className="ic-close  cursor-pointer" style={{
                            position: 'relative',
                            right: "15px",
                            top: "20px",
                            width: '30px',
                            height: '30px',
                            border: '2px solid #e20000',
                            borderRadius: '5px',
                            color: '#e20000',
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: 'center'
                        }}>
                            x
                        </div>
                        <div className="d-flex flex-wrap col-xl-12 col-lg-12 col-12 w-100  pb-4">
                            <div className="text d-flex flex-column align-items-center w-100  mt-sm-7">
                                <p className="text-center font-yekan font-bold font-size-14 mb-0" >
                                    با تشکر از انتخاب شما
                                    لطفا جهت رزرو تور با شماره تلفن
                                    <a
                                        style={{color: '#e20000',padding:'0 4px'}} href='tel:02184278'>02184278</a>
                                    تماس حاصل فرمایید.
                                </p>
                                {
                                    isBundle &&

                                    <>
                                        <div className="text d-flex flex-column align-items-center w-100 px-2 mb-2">

                                            <span className="text-center font-yekan font-bold font-size-14 py-2">یا</span>
                                            <p className="text-center font-yekan font-bold font-size-14">
                                                جهت تماس با شما از طریق کارشناسان بلبطجا اطلاعات درخواستی زیر را تکمیل و
                                                ارسال فرمایید.
                                            </p>
                                        </div>
                                        <div
                                            className="in-data w-75 d-flex flex-column align-items-stretch justify-content-center m-auto mb-2">
                                            <label htmlFor="" className="pb-2 font-yekan font-bold">شماره تلفن همراه</label>
                                            <div className='form-input-border'>
                                                <PrimaryTextInput type="text" value={packData.number}
                                                                  onChange={e => valueHandler(e)} name="number"
                                                                  className="w-100 px-2 rounded-3 border-secondary font-yekan"
                                                                  placeholder="شماره همراه خود را وارد کنید"
                                                                  style={{height: "40px", outline: "none"}}/>
                                            </div>
                                        </div>
                                        <div
                                            className="c-btn request-data my-3 font-yekan m-auto w-100 d-flex justify-content-center">
                                            <button style={{
                                                width: '130px',
                                                height: '50px',
                                                backgroundColor: '#069e2c !important'
                                            }}
                                                    className={`ancher bg-success text-white font-size-13 py-2 px-4 rounded-3 mt-2 foc01`}>
                                                درخواست رزرو
                                            </button>
                                        </div>
                                    </>
                                }
                                {!isBundle &&
                                    <>
                                                     <span
                                                         className="text-center font-yekan font-bold font-size-14 py-2">یا</span>
                                        <p className="text-center font-yekan font-bold font-size-14 p-0 m-0">
                                            جهت رزرو لطفا اتاق خود را انتخاب کنید.
                                        </p>
                                    </>
                                }
                                {/*جهت تماس با شما از طریق کارشناسان  بلبطجا اطلاعات درخواستی زیر را تکمیل و ارسال فرمایید.*/}
                            </div>
                            {
                                !isBundle && <>
                                    {/*<div className="in-data w-75 d-flex flex-column align-items-stretch justify-content-center m-auto mb-2">*/}
                                    {/*    <label htmlFor="" className="pb-2 font-yekan font-bold">شماره تلفن همراه</label>*/}
                                    {/*    <div className='form-input-border'>*/}
                                    {/*        <PrimaryTextInput type="text" value={packData.number} onChange={e => valueHandler(e)} name="number" className="w-100 px-2 rounded-3 border-secondary font-yekan" placeholder="شماره همراه خود را وارد کنید" style={{ height: "40px", outline: "none" }} />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <div className="bedcount-container">
                                        <div className="bedcount">

                                            {rooms?.map(room => (
                                                <div className='passengercount'>
                                                    <p style={{
                                                        fontSize: '14px',
                                                        margin: '0',
                                                        padding: '0',
                                                        textAlign: 'center',
                                                        marginBottom: '8px'
                                                    }}>{room.roomName}</p>
                                                    <p style={{
                                                        fontSize: '12px',
                                                        margin: '0',
                                                        padding: '0',
                                                        textAlign: 'center',
                                                        marginBottom: '8px',
                                                        color: '#e20000'
                                                    }}>{numberWithCommas(room.price)} تومان</p>
                                                    <div className='count'>

                                                        <div
                                                            className={roomCounter(room.room_type_id) > 0 ? 'decin' : 'dis_decin'}
                                                            onClick={() => incRoom(room)}>
                                                            +
                                                        </div>
                                                        <p>{roomNumber(room.roomTypeId)?.length}</p>
                                                        <div
                                                            className={roomCounter(room.room_type_id) === 0 ? 'dis_decin' : 'decin'}
                                                            onClick={() => decRoom(room)}>
                                                            -
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}


                                        </div>


                                    </div>

                                    <>
                                        {selectedRoomsData && <>
                                            {selectedRoomsData.map((room) => {
                                                return (
                                                    <div className="roomcountDet_container">
                                                        <div className={"roomcountDet"}>
                                                            <div className='room-s'>
                                                                <div style={{display: 'flex', columnGap: '10px'}}>
                                                                    <div
                                                                        // className={"roomcountDet_remove"}
                                                                        onClick={() => {
                                                                            if (selectedRoomsData.length === 1) {
                                                                                removeRoom(room.id);
                                                                                // setIsOpen(0);
                                                                            } else {
                                                                                removeRoom(room.id);
                                                                                // setIsOpen(flight.departure.id.toString()+flight.return.id.toString());
                                                                            }
                                                                        }}
                                                                    >
                                                                        <svg
                                                                            data-name="Layer 1"
                                                                            height="30"
                                                                            id="Layer_1"
                                                                            viewBox="0 0 200 200"
                                                                            width="30"
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
                                                                    <div className={"roomcountDet_name"}>
                                                                        <p className='p-0 m-0'>{room?.room_type}  <small style={{fontWeight:600,fontSize:'12px'}}>({ numberToWordConvertor(findRoomByName(room.room_type_id,room.id)) })</small> </p>
                                                                    </div>

                                                                </div>

                                                                <div
                                                                    className={'roomcount'}

                                                                >
                                                                    <p style={{fontSize:'12px'}}>تعداد بزرگسال این اتاق:</p>
                                                                    <p style={{
                                                                        fontSize:'13px',
                                                                        color: '#e20000',
                                                                        fontWeight: '700'
                                                                    }}>{room?.Adl_capacity}</p>
                                                                </div>
                                                            </div>

                                                            <div className='roomscon'>
                                                                {room.extra_bed_capacity > 0 &&
                                                                    <div
                                                                        className={`${
                                                                            "roomcountDet_bedcount"
                                                                        } ${

                                                                            room?.extra_bed_count > 0
                                                                                ? "borderActive"
                                                                                : "bordernoneActive"

                                                                        }`}
                                                                    >
                                                                        <>
                                                                            <p className={"bedtype"}>
                                                                                تعداد تخت اضافه
                                                                            </p>
                                                                            <p>۱۲ سال به بالا</p>

                                                                        </>
                                                                        <p className={"bedtypeprc"}>
                                                                            {numberWithCommas(
                                                                                room.ext_prc
                                                                            )}{" "}
                                                                            تومان
                                                                        </p>

                                                                        <div
                                                                            className={
                                                                                "roomcountDet_bedcount_count"
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={

                                                                                    room.extra_count >=
                                                                                    room?.extra_bed_capacity
                                                                                        ? "dis_decin"
                                                                                        :
                                                                                        "decin"

                                                                                }
                                                                                onClick={() => {
                                                                                    incDet1(room, "ext_count");
                                                                                }}
                                                                            >
                                                                                +
                                                                            </div>
                                                                            <span>{room?.extra_count}</span>
                                                                            <div
                                                                                className={

                                                                                    room?.extra_count === 0
                                                                                        ? "dis_decin"
                                                                                        :
                                                                                        "decin"


                                                                                }
                                                                                onClick={() =>
                                                                                    decDet1(room?.id, "ext_count")
                                                                                }
                                                                            >
                                                                                -
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }


                                                                {

                                                                    <div
                                                                        className={`${
                                                                            "roomcountDet_bedcount"
                                                                        } ${

                                                                            room?.chd_count > 0
                                                                                ? "borderActive"
                                                                                : "bordernoneActive"

                                                                        }`}
                                                                    >
                                                                        <>
                                                                        </>
                                                                        <>
                                                                            <p className={"bedtype"}>
                                                                                تعداد کودک با تخت
                                                                            </p>
                                                                            {selectedHotel?.with_bed_child_ages.length>0 &&
                                                                                <p>{chdAgeStr(selectedHotel?.with_bed_child_ages[0], selectedHotel?.with_bed_child_ages[1])}</p>}
                                                                        </>
                                                                        <p className={"bedtypeprc"}>
                                                                            {(room.chd_capacity > 0 && room.chd_withbed_prc > 0) ? ` ${numberWithCommas(
                                                                                room.chd_withbed_prc
                                                                            )}
                                                                تومان` : 'عدم موجودی'}
                                                                        </p>
                                                                        <div
                                                                            className={
                                                                                "roomcountDet_bedcount_count"
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={

                                                                                    room?.chd_nobed_count + room?.chd_withbed_count >= room?.chd_capacity
                                                                                        ? "dis_decin"
                                                                                        :
                                                                                        "decin"

                                                                                }
                                                                                onClick={() => incDet1(room, "chd_withbed_count")}
                                                                            >
                                                                                +
                                                                            </div>
                                                                            <span>{room?.chd_withbed_count}</span>
                                                                            <div
                                                                                className={

                                                                                    room?.chd_withbed_count === 0
                                                                                        ?
                                                                                        "dis_decin"
                                                                                        :
                                                                                        "decin"

                                                                                }
                                                                                onClick={() =>
                                                                                    decDet1(room?.id, "chd_withbed_count")
                                                                                }
                                                                            >
                                                                                -
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }{

                                                                <div
                                                                    className={`${
                                                                        "roomcountDet_bedcount"
                                                                    } ${

                                                                        room?.chd_count > 0
                                                                            ? "borderActive"
                                                                            : "bordernoneActive"

                                                                    }`}
                                                                >
                                                                    <>
                                                                    </>
                                                                    <>
                                                                        <p className={"bedtype"}>
                                                                            تعداد کودک بدون تخت
                                                                        </p>
                                                                        {selectedHotel?.no_bed_child_ages.length>0 &&
                                                                            <p>{chdAgeStr(selectedHotel?.no_bed_child_ages[0], selectedHotel?.no_bed_child_ages[1])}</p>}
                                                                    </>
                                                                    <p className={"bedtypeprc"}>
                                                                        {room.chd_capacity > 0 ? `${numberWithCommas(
                                                                            room.chd_nobed_prc
                                                                        )}
                                                                تومان` : 'عدم موجودی'}
                                                                    </p>
                                                                    <div
                                                                        className={
                                                                            "roomcountDet_bedcount_count"
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={

                                                                                room?.chd_nobed_count + room?.chd_withbed_count >= room?.chd_capacity
                                                                                    ? "dis_decin"
                                                                                    :
                                                                                    "decin"

                                                                            }
                                                                            onClick={() => incDet1(room, "chd_nobed_count")}
                                                                        >
                                                                            +
                                                                        </div>
                                                                        <span>{room?.chd_nobed_count}</span>
                                                                        <div
                                                                            className={

                                                                                room?.chd_nobed_count === 0
                                                                                    ?
                                                                                    "dis_decin"
                                                                                    :
                                                                                    "decin"

                                                                            }
                                                                            onClick={() =>
                                                                                decDet1(room?.id, "chd_nobed_count")
                                                                            }
                                                                        >
                                                                            -
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }

                                                                {room.Adl_capacity > 0 &&

                                                                    <div
                                                                        className={`${


                                                                            "roomcountDet_bedcount"
                                                                        }
                                                                                 ${

                                                                            room?.inf_count > 0
                                                                                ? "borderActive"
                                                                                : "bordernoneActive"

                                                                        }`}
                                                                    >
                                                                        <>
                                                                            <p className={"bedtype"}>
                                                                                تعداد نوزاد
                                                                            </p>
                                                                            <p>{chdAgeStr(0, 2)}</p>
                                                                        </>

                                                                        <p className={"bedtypeprc"}>
                                                                            {numberWithCommas(
                                                                                room.inf_prc
                                                                            )}{" "}
                                                                            تومان
                                                                        </p>
                                                                        <div
                                                                            className={
                                                                                "roomcountDet_bedcount_count"
                                                                            }
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    room?.inf_count >= room?.Adl_capacity
                                                                                        ? "dis_decin"
                                                                                        :
                                                                                        "decin"

                                                                                }
                                                                                onClick={() => incDet1(room, "inf_count")}
                                                                            >
                                                                                +
                                                                            </div>
                                                                            <span>{room?.inf_count}</span>
                                                                            <div
                                                                                className={
                                                                                    room?.inf_count === 0
                                                                                        ?
                                                                                        "dis_decin"
                                                                                        :
                                                                                        "decin"
                                                                                }
                                                                                onClick={() =>
                                                                                    decDet1(room?.id, "inf_count")
                                                                                }
                                                                            >
                                                                                -
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>

                                                        </div>

                                                    </div>
                                                );
                                            })}

                                        </>}
                                    </>


                                </>
                            }
                        </div>
                    </div>

                    {selectedRoomsData.length > 0 && <div className={'reservecon'}>
                        <div className=" font-yekan w-100"
                             style={{display: 'flex', justifyContent: 'center'}}>
                            <button style={{
                                width: '130px',
                                height: '50px',
                                backgroundColor: '#069e2c !important',
                                whiteSpace: 'nowrap'
                            }}
                                    className={`ancher bg-success text-white font-size-13 py-2 px-4 rounded-3  foc01`}
                                    onClick={() => {
                                        if (!loading) {
                                            setLoading(true)
                                            tourReserve()
                                            posthog.capture("FormEndTourPackage", {
                                                HMNPhone: packData.number,
                                                HMNPassengerCount: packData.count
                                            })
                                            posthog.identify(packData.number)
                                        }
                                    }}>
                                {loading ? 'لطقا منتظر بمانید...' : `درخواست رزرو`}
                            </button>
                        </div>
                        <div style={{display: 'flex', columnGap: '10px'}}>
                            <p className={'p-0 m-0'}>تعداد اتاق:</p>
                            <p className={'p-0 m-0'}
                               style={{color: '#e20000', fontWeight: '700'}}>{selectedRoomsData.length}</p>
                        </div>
                    </div>}
                </div>



            </div>
            {/*${datatitle.endCity.name==='استانبول' && 'ist'} ${datatitle.endCity.name==='آنتالیا' && 'ayt'}*/}
        </>


    );
};

export default PackageReserve;

