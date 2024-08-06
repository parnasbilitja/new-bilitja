import axios from "axios";
import React, {useEffect, useState} from "react";
import {Err, ErrSuccess, NotifAlert} from "../NewTours/Components/NotifAlert.component";
import PrimaryTextInput from "../../sources/component/PrimaryTextInput.component";
import {usePostHog} from "posthog-js/react";
import {chdAgeStr, numberToWordConvertor, numberWithCommas} from "../../Utils/newTour";
import {useRouter, withRouter} from "next/router";
import {fontSize} from "@mui/system";
import globals from "../../sources/Global";
import {selectProperties} from "../../Redux/Reserve/reserve.reselect";
import {selcetAccountBox} from "../../Redux/UI/ui.reselect";
import {selectAirports} from "../../Redux/Airports/airport.reselect";
import {selectCredentials} from "../../Redux/Search/search.reselect";
import {connect} from "react-redux";
import {accountBoxModify} from "../../Redux/UI/ui.action";


const PackageReserve = ({
    tourId,
                            transfers,
    user,
                            reserveProperties,
                            accountBoxModify,
                            tourData,
                            flightIds,
                            selectedHotel,
                            flightId,
                            messageBoxModify,
                            setIsReserve,
                            messages,
                            setMessages,
                            setShow,
                            setPackData,
                            packData,
                            setOpen,
                            datatitle,
                            isBundle,
                        }) => {
    const router = useRouter()


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

        rooms.map(r => {

            if (r.room_type_id === room.room_type_id) {
                if (r?.available_room_count > roomNumber(room.room_type_id).length) {
                    setSelecetedRoomsData(prevState => [...prevState, {
                        id: Math.random() * 1000,
                        room_type_id: room.room_type_id,
                        room_id: room.room_id,
                        room_type: room?.room_name,
                        hotel_id: selectedHotel.hotel_id,
                        Adl_capacity: room?.adl_capacity,
                        extra_bed_count: 0,
                        inf_count: 0,
                        chd_withbed_count: 0,
                        chd_nobed_count: 0,
                        chd_capacity: room?.room_chd_capacity,
                        extra_bed_capacity: room?.extra_bed_count,
                        total_extra_count: room?.total_extra_count,
                        chd_withbed_prc: room?.chd_w_price,
                        chd_nobed_prc: room?.chd_n_price,
                        chd_withbed_ages: selectedHotel?.with_bed_child_ages,
                        chd_nobed_ages: selectedHotel?.no_bed_child_ages,
                        ext_prc: room?.extra_bed_price,
                        inf_prc: room.inf_price,
                        adl_count: room.adl_capacity,
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

    const login = () => {
        localStorage.setItem("mobile", state.mobileSubmiter)
        setState({ ...state, btn_disabled: true });
        // setLoading(true)
        fetch(`${globals.baseUrlNew}auth/getMobile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({

                mobile: state.mobileSubmiter,
                password: '',
                register: 0,
                customerId: "1a157116-a01a-4027-ab10-74098ac63815",
                hostname: "hamnavaz.com",
                agencyName: "بلیطجا",
                telNumber: "02184278",
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // debugger
                if (data.status == "0") {
                    setState({
                        ...state,
                        btn_disabled: false,
                        get_mobile_status: true,
                        btn_text: "تایید کد احراز هویت",
                    });
                    // setLoading(false)
                } else if (data.status == "10") {
                    setState({ ...state, btn_disabled: false });
                    // setLoading(false)
                    localStorage.setItem("mobile", data.mobile);
                    // localStorage.setItem("token", data.token);
                    props.checkUserLogged();
                    props.getUserInfo({
                        mobile: data.mobile,
                    });
                    props.accountBoxModify({
                        state: false,
                        type: "authentication",
                    });
                    props.messageBoxModify({
                        color: true,
                        state: true,
                        message: "ورود شما موفقیت آمیز بود.",
                    });
                    props.accountBoxModify({
                        state: false,
                        type: "authentication",
                    });
                    reserveTour()

                } else if (data.status === "-111") {

                    register();

                } else if (data.status === "-200") {
                    setState({
                        ...state,
                        btn_disabled: false,
                        error: true,
                        errText: "شماره موبایل یا رمز ثابت نادرست می باشد.",
                    });
                    // setLoading(false)
                } else {
                    // setLoading(false)
                    setState({
                        ...state,
                        btn_disabled: false,
                        error: true,
                        errText: data.message,
                    });
                }
            });
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
            debugger
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
        //
    };



    const incDet1 = (room, type) => {
        // debugger;
        if (type === "ext_count") {
            debugger
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === room?.id) {
                    if (x?.extra_count + x.chd_withbed_count >= x?.total_extra_count) {
                        Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
                        return x;
                    } else {
                        if (x.extra_count < x.extra_bed_capacity) {
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
            debugger
            const findRoom = selectedRoomsData.map((x) => {
                if (x?.id === room?.id) {
                    if (x?.chd_withbed_count + x?.extra_count >= x?.total_extra_count) {
                        Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
                        return x;
                    } else {
                        // debugger
                        if (x?.chd_withbed_count + x?.chd_nobed_count < x?.chd_capacity) {
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
                        if (x?.chd_nobed_count +x?.chd_withbed_count< x?.chd_capacity) {
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
        //
    };


    const tourReserve = (
        fCheckin,
        fCheckout,
        fDId,
        fRId,
        hotelId
    ) => {



        if (selectedRoomsData.length > 0) {
            // setIsLoading(true)
            axios
                .post(
                    `${globals.tourPackages}reserves/checking`,
                    {
                        tour_id:+tourId,
                        package_id:selectedHotel.id,
                        reserver_phone:user.logged ? localStorage.getItem('mobile'):'',
                        checkin: tourData.checkin,
                        checkout: tourData.checkout,
                        hotel_id: selectedHotel.hotel_id,
                        flight_id: tourData.selected_flight,

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
                        )}&ref_code=${res.data.data.information.ref_code}`
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

            let selectedRooms
            selectedRooms = selectedHotel.rooms
            selectedRooms = selectedRooms.map(room =>
                ({...room, count: 0, id: Math.random() * 100})
            )
            setRooms(selectedRooms)
        } else {
            setRooms(selectedHotel)
        }
    }, [isBundle])


    useEffect(()=>{

        console.log(localStorage.getItem('mobile'),user.logged)
    },[])

    const roomNumber = (roomid) => {

        let foundrooms = selectedRoomsData.filter(room => room.room_type_id === roomid)

        return foundrooms
    }


    const decRoom = (room) => {
        debugger
        let foundRoom = selectedRoomsData?.filter(r => r.room_type_id === room.room_type_id)
        foundRoom.pop()
        let filteredRoom = selectedRoomsData?.filter(r => r.room_type_id !== room.room_type_id)
        filteredRoom.push(...foundRoom)
        setSelecetedRoomsData(filteredRoom)
    }
    useEffect(() => {
        console.log(selectedRoomsData)
    }, [selectedRoomsData])


    const [state, setState] = useState({
        stateRegister: false,
        // passengers: [],
        // priceAll: 0,
        mobileSubmiter:  '',
        // phoneSubmiter: '',
        // mobileSubmiterErr: "شماره همراه اجباری است",
        // phoneSubmiterErr: "شماره ثابت اجباری است",
        // agreeWithTerm: false,
        // agreeWithTermerr: false,
        // email: ''
    });
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
                                                جهت تماس با شما از طریق کارشناسان بلیطجا اطلاعات درخواستی زیر را تکمیل و
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
                                {/*جهت تماس با شما از طریق کارشناسان  بلیطجا اطلاعات درخواستی زیر را تکمیل و ارسال فرمایید.*/}
                            </div>
                            {
                                !isBundle && <>
                                    {/*<div className="in-data w-75 d-flex flex-column align-items-stretch justify-content-center m-auto mb-2">*/}
                                    {/*    <label htmlFor="" className="pb-2 font-yekan font-bold">شماره تلفن همراه</label>*/}
                                    {/*    <div className='form-input-border'>*/}
                                    {/*        <PrimaryTextInput type="text" value={packData.number} onChange={e => valueHandler(e)} name="number" className="w-100 px-2 rounded-3 border-secondary font-yekan" placeholder="شماره همراه خود را وارد کنید" style={{ height: "40px", outline: "none" }} />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
<div>
    {/*<input type="text" value={reserverPhone} onChange={(e)=>setReserverPhone(e.target.value)}/>*/}
</div>
                                    <div className="bedcount-container">

                                        <div className="bedcount">

                                            {rooms?.map(room => (
                                                <div className='passengercount'>
                                                    <p style={{
                                                        fontSize: '14px',
                                                        margin: '0',
                                                        padding: '0',
                                                        textAlign: 'center',
                                                        marginBottom: '3px'
                                                    }}>تعداد {room.room_name} </p>
                                                    <span style={{fontSize: '12px'}}> (مناسب برای {room.adl_capacity}نفر )
                                                    </span>
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
                                                        <p>{roomNumber(room.room_type_id)?.length}</p>
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
                                                                        <p className='p-0 m-0'>{room?.room_type} <small
                                                                            style={{
                                                                                fontWeight: 600,
                                                                                fontSize: '12px'
                                                                            }}>({numberToWordConvertor(findRoomByName(room.room_type_id, room.id))})</small>
                                                                        </p>
                                                                    </div>

                                                                </div>

                                                                <div
                                                                    className={'roomcount'}

                                                                >
                                                                    <p style={{fontSize: '12px'}}>تعداد بزرگسال این
                                                                        اتاق:</p>
                                                                    <p style={{
                                                                        fontSize: '13px',
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

                                                                                    (room?.extra_count + room?.chd_withbed_count >=
                                                                                        room?.total_extra_count) || room.extra_count >= room.extra_bed_capacity
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
                                                                            <p className={"bedtype"}>
                                                                                تعداد کودک با تخت
                                                                            </p>
                                                                            {selectedHotel?.with_bed_child_ages.length > 0 &&
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

                                                                                    room?.chd_nobed_count + room?.chd_withbed_count >= room?.chd_capacity || (room.chd_withbed_count + room.extra_count >= room.total_extra_count)
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
                                                                        {selectedHotel?.no_bed_child_ages.length > 0 &&
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
                                            // console.log(reserveProperties)
                                            // if(user.logged) {
                                                tourReserve()
                                            // }else {
                                            //
                                            //         Err('ابتدا وارد سایت شوید')
                                            //         setState({ ...state, stateRegister: false });
                                            //         login();
                                            //         setIsReserve(false)
                                            //         // messageBoxModify({
                                            //         //     state: true,
                                            //         //     color: false,
                                            //         //     message: "لطفا کد تایید ارسال شده را وارد کنید!",
                                            //         // });
                                            //         accountBoxModify({
                                            //             state: true,
                                            //             type: "login",
                                            //         });
                                            //
                                            //
                                            // }
                                            setLoading(true)
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


const mapStateToProps = (state) => {
    return {
        reserveProperties: selectProperties(state),
        user: state.user,
        accountBox: selcetAccountBox(state),
        airports: selectAirports(state),
        credentials: selectCredentials(state),
    }
};

const mapDispatchToProps = (dispatch) => ({
    accountBoxModify: (value) => dispatch(accountBoxModify(value)),
    // addReservationProperties: async (value) =>
    //     dispatch(addReservationProperties(value)),
    // messageBoxModify: (value) => dispatch(messageBoxModify(value)),
})
export default withRouter(
    connect( mapStateToProps,mapDispatchToProps) (PackageReserve));
// export default PackageReserve;

