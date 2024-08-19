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
    startBuilder, removeDuplicateObj, getDayInPersian, MiladiToJalaliConvertorDec,
} from "../../Utils/newTour";
import axios from "axios";
import {motion} from "framer-motion";
import TourDetailLabel from "./Components/subComponents/TourDetailLabel.component";
import {useRouter, withRouter} from "next/router";
import {Err, ErrSuccess, NotifAlert} from "./Components/NotifAlert.component";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import base from "../home/Base";
import CountDownTimer from "./Components/CountDownTimer";
import moment from "moment-jalaali";
import {Shimmers4, Shimmers5} from "../../Components/NewTours/Components/subComponents/Shimmers";
import {accountBoxModify, messageBoxModify} from "../../Redux/UI/ui.action";
// import {addReservationProperties} from "@/Redux/Reserve/reserve.action";
import {selectProperties} from "../../Redux/Reserve/reserve.reselect";
import {connect} from "react-redux";
import PopUp from "../../sources/component/PopUp.component";
import Account from "../../sources/account/Account.component";
import {selcetAccountBox} from "../../Redux/UI/ui.reselect";
import {selectAirports} from "../../Redux/Airports/airport.reselect";
import {selectCredentials} from "../../Redux/Search/search.reselect";
import globals from "../../sources/Global";
// import {usePostHog} from "posthog-js/react";

const Reservation = (props) => {
    const [generalRoomsData, setGeneralRoomsData] = useState([])
    const [roomBaseDet, setRoomBaseDet] = useState([])
    const [flightDet, setFlightDet] = useState(null)
    const [dataq, setDataq] = useState([]);
    const [roomsData, setRoomsData] = useState([]);
    const [reserverData, setReserverData] = useState({
        reserver_phone: "", reserver_id_code: "", reserver_name: "", reserver_lastname: "",
    });



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
    const [evRoomsPrc, setEvRoomsPrc] = useState([]);
    const [err, setErr] = useState({});
    const router = useRouter();


useEffect(()=>{
   if(localStorage?.getItem('mobile') ){
       setState({ ...state, mobileSubmiter: localStorage?.getItem('mobile') ? localStorage?.getItem('mobile') :'' })   }
},[props])




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
                if(name === "reserver_phone"){
                    setState({ ...state, mobileSubmiter: value })

                }
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
        setDataq(roomsData);
    }, [roomsData]);

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


    const getYear=(d)=>{
        // debugger
        let date=moment(d)
        let f=date.format('YYYY')
        return f
    }
   const changeDateFormat=(arr)=>{
       // debugger
     let newData =arr.map((room)=>{
        return {
            ...room,
            passengers:room.passengers.map(pass=>{
                return{
                    ...pass,
                    birth_day :pass.birth_day===''?'': (+getYear(pass.birth_day)>1900?pass.birth_day:moment(pass.birth_day,'jYYYY/jMM/jDD').format('YYYY-MM-DD')),
                    expired_passport:pass.expired_passport===''?'': (+getYear(pass.expired_passport)>1900?pass.expired_passport:moment(pass.expired_passport,'jYYYY/jMM/jDD').format('YYYY-MM-DD'))

                }
            })
        }
             })

       return newData
   }
    useEffect(
        ()=>{
            // debugger
            setReserverData({
                ...reserverData, reserver_phone:props.hotelDet?.data?.information.reserver.phone,
            });

            // console.log('phone',props.hotelDet?.data?.information.reserver.phone)

            const selected_roomsReformat=props.hotelDet?.data?.selected_rooms.map(selectedRoom=>{
                return {
                    ...selectedRoom,
                    passengers: selectedRoom.passengers.map((passenger,i) => {
                      return {
                        ...passenger,
                        pass_id: i+passenger.type+ (passenger.child_type?passenger.child_type:''),
                      };
                    }),
                  };
            })



            setRoomsData(selected_roomsReformat)
        },[props.hotelDet])



const reserveTour=()=>{
    let hotel_id = props.hotelDet.data.hotel.id;
    axios
        .post(`https://api.hotelobilit.com/api/v2/reserves/${router.query.ref_code}`, {
            reserver_full_name: `${reserverData.reserver_name} ${reserverData.reserver_lastname}`,
            reserver_id_code: reserverData.reserver_id_code,
            reserver_phone: reserverData.reserver_phone,
            reserves: [...changeDateFormat(dataq)],
        },{
            headers: {
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
            }
        })
        .then((res) => {
            router.push(`/tour/reserve/reserveconfirmation/${hotel_id}?ref_code=${router.query.ref_code}&staycount=${props.stayCount}`);
            ErrSuccess("به صفحه تایید اطلاعات رزرو و پرداخت نهایی منتقل می شوید");
        })
        .catch((err) => {

            if(err.response?.status===400){
                Err('متاسفانه زمان رزرو شما به پایان رسید؛ به صفحه میشوید.')

                setTimeout(()=>{
                    router.push('/tour')
                },5000)
            }else{

                Err("لطفا فیلد های زیر را تکمیل کنید");
                setErr(err?.response?.data);
            }

        });
    if (dataq.length === 0) {
        Err("هنوز اطلاعاتی وارد نشده!");
    } else if (!err.isDone && err.errors?.length > 0) {
        Err("لطفا اطلاعات مسافرین را تکمیل نمایید!");
    } else if (!err.isDone && err.errors?.length === 0) {
        Err("این پرواز موجودی ندارد!");
        router.push("/tour");
    }


}

const formValidation=()=>{
        if(reserverData.reserver_phone){

        }


}
const [isReservePhone,setIsreservePhone]=useState(false);

    return (<>
        <div className={styles["p-body"]}>
        <Scrolltoprefresh/>
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
                                        {
                                            props.hotelDet?.data?.prices?.total_price ? <>

                                                <div className={styles["price-title"]}>
                                                    <p>مبلغ قابل پرداخت:</p>
                                                </div>
                                                <div className={styles["price"]}>
                                                    {
                                                        props.hotelDet?.data?.prices?.total_price &&
                                                        <p>{numberWithCommas(props.hotelDet?.data?.prices?.total_price) } تومان</p>

                                                    }
                                                </div>
                                            </>:<>
                                                <motion.div
                                                    initial={{opacity: 0}}
                                                    animate={{opacity: 1}}
                                                    transition={{
                                                        duration: 0.9, repeat: Infinity, repeatType: "reverse",
                                                    }}
                                                    className={styles["box-top-box-reserve2"]}
                                                    style={{height: "50px", width: "220px"}}
                                                ></motion.div>
                                            </>
                                        }

                                        {" "}
                                    </div>
                                </div>
                                {/*<div className={styles["finalprice"]}>*/}
                                {/*    <div className={styles["totalprice_container"]}>*/}
                                {/*        <div className={styles["peopleroomnum"]}>*/}
                                {/*            <p>تعداد کل نفرات :</p>*/}
                                {/*            <span>{personCounter(reformSelectedRooms)}</span>*/}
                                {/*        </div>*/}
                                {/*        <div className={styles["peopleroomnum"]}>*/}
                                {/*            <p> تعداد کل اتاق : </p>*/}
                                {/*            <span>{reformSelectedRooms.length}</span>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className={styles["paymentbtn"]}>
                                    <button
                                        onClick={() => {
                                            // posthog.capture("FormEndTourPackage",{})
                                            // posthog.identify(reserverData.reserver_phone)
                                            // debugger
                                            // let flight_id = flightDet.id;
                                            // debugger

                                                if(props.user.logged) {
                                                    // reserveTour()
                                                }else {
                                                    if(reserverData.reserver_phone.length>0){
                                                        reserveTour()

                                                        // Err('ابتدا وارد سایت شوید')
                                                        // setState({ ...state, stateRegister: false });
                                                        // login();
                                                        // // props.messageBoxModify({
                                                        // //     state: true,
                                                        // //     color: false,
                                                        // //     message: "لطفا کد تایید ارسال شده را وارد کنید!",
                                                        // // });
                                                        // props.accountBoxModify({
                                                        //     state: true,
                                                        //     type: "login",
                                                        // });
                                                    }else {

                                                        Err('لطفا شماره رزرو گیرنده را وارد کنید')
                                                    }

                                                }




                                        }
                                    }
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
                                        {props.hotelDet?.data?.hotel?.is_domestic ? props.hotelDet?.data?.hotel?.title : props.hotelDet?.data?.hotel?.titleEn}
                                    </h2>
                                    <p>
                                        {" "}
                                        {props.hotelDet?.data?.hotel?.is_domestic ? props.hotelDet?.data?.hotel?.titleEn : props.hotelDet?.data?.hotel?.title}
                                    </p>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex", marginBottom: ".1rem", paddingRight: "1rem",
                                }}
                            >
                                {startBuilder(+props.hotelDet?.data?.hotel?.stars).map((x) => {
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
                            {props.hotelDet?.data ? (<>
                                <div className={styles["entext"]}>
                                    <p
                                        className={styles["entexttitle"]}
                                        style={{marginBottom: "5px"}}
                                    >
                                        تاریخ ورود به هتل
                                    </p>
                                    <p style={{fontWeight: "500", fontSize: "12px"}}>
                                        {
                                            MiladiToJalaliConvertor(props.hotelDet?.data?.hotel?.checkin)

                                        }
                                    </p>
                                    <p>

                                        { getDayInPersian(moment(props.hotelDet?.data?.hotel?.checkin).format('dddd'))   }
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
                                        {
                                            MiladiToJalaliConvertor(props.hotelDet?.data?.hotel?.checkout)

                                        }
                                    </p>
                                    <p>

                                        { getDayInPersian(moment(props.hotelDet?.data?.hotel?.checkout).format('dddd'))}
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
                        {props.hotelDet?.data?.flights ? (<TourDetailLabel
                            hotelName={props.hotelDet?.data?.hotel?.title}
                            flightDet={props.hotelDet?.data?.flights}
                            stayCount={props.stayCount}
                            gallary={props.hotelDet?.data?.hotel.gallery}
                            refcode={router.query.ref_code}
                        />) : (<motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.9, repeat: Infinity, repeatType: "reverse",
                            }}
                            className={styles["box-top-box-reserve2"]}
                        ></motion.div>)}

                        {
                            props.hotelDet.data?.information?.expired_at ?
                            <CountDownTimer hoteldata={props.hotelDet.data} exp_time={props.hotelDet.data?.information?.expired_at}/>:

                                <div style={{display:'flex',justifyContent:'end'}}>
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{
                                            duration: 0.9, repeat: Infinity, repeatType: "reverse",
                                        }}
                                        className={styles["box-top-box-reserve2"]}
                                        style={{height: "50px", width: "220px"}}
                                    ></motion.div>
                                </div>

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

                                    {err?.errors?.reserver_full_name && reserverData.reserver_name.length === 0 ? (
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
                                        {err?.errors?.reserver_full_name && reserverData.reserver_lastname.length === 0 ? "لطفا فیلد نام و نام خانوادگی را وارد کنید" : null}
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
                                            inputMode='numeric'
                                        />
                                    </div>

                                    {
                                        err.errors &&  <div style={{display:"flex",justifyContent:"space-between",marginTop:'7px'}}>
                                            {err.errors?.reserver_id_code && reserverData.reserver_id_code.length === 0 ? (
                                                <p style={{marginLeft:'10px'}}>{err.errors?.reserver_id_code}</p>) : null}
                                            {err.errors && reserverData.reserver_id_code.length < 10 ? (
                                                <p>کد ملی نباید کمتر از 10 رقم باشد.</p>) : null}
                                        </div>
                                    }

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
                                            inputMode='numeric'
                                            disabled={reserverData?.reserver_phone?.length>0?true:false}
                                        />
                                    </div>
                                    {err.errors?.reserver_phone && reserverData.reserver_phone.length === 0 ? (
                                        <small>{err.errors?.reserver_phone}</small>) : null}
                                </div>
                            </form>
                        </div>

                        <h2 style={{fontSize: "1.5rem"}}>اطلاعات مسافران</h2>

                        {roomsData?roomsData?.map((room, roomIndex) => (<InfoPasserngers
                            room={room}
                            hotelDets={props.hotelDet}
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
                        />)):<>

                        {
                            <Shimmers5/>
                        }
                        </>}

                        <div className={styles["rules"]}>
                            <div style={{display: 'flex', alignItems: 'center',marginBottom:'4rem'}}>
                                <p> ثبت درخواست به منزله پذیرش تمام <span>قوانین و مقررات</span>   مرتبط با سایت هتل و بلیط و پکیجهای این تور می
                                    باشد</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <PopUp
            opened={props.accountBox.state}
            closePopUp={() => {
                props.accountBoxModify({
                    state: false,
                });
            }}
        >
            <Account func={()=>reserveTour()} />
        </PopUp>
    </>);
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
    connect( mapStateToProps,mapDispatchToProps) (Reservation));
