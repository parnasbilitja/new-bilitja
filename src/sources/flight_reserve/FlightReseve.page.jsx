import React , { useEffect, useState }from "react";
import styles from "../../../styles/FlightReserve.module.scss";
import * as moment from 'jalali-moment';
import { addReservationProperties } from "../../Redux/Reserve/reserve.action";
import FlightPassengerForm from "./FlightPassengerForm.component";
import FlightReserveDesktopHeader from "./FlightReserveDesktopHeader.component";
import FlightReserveMobileHeader from "./FlightReserveMobileHeader.component";
import {
    faMale,
    faFemale,
    faChild,
    faBaby,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import globals from "../Global";

import { connect } from "react-redux";
import { selectProperties } from "../../Redux/Reserve/reserve.reselect";
import { messageBoxModify, accountBoxModify } from "../../Redux/UI/ui.action";

import {
    isValidIranianNationalCode,
    moneyFormat,
} from "../../Utils/SimpleTasks";
import { withRouter } from "next/router";
import Link from "next/link";
import PopUp from "../component/PopUp.component";

const FlightReserve = (props) =>{
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);
    // console.log(props);
    const [err,setErr] = useState({
        rule:false,
        ruleErr:'لطفا قوانین را بپذیرید',
        fixedNumber: false,
        fixedNumberErr:'این فیلد الزامیست',
        number: false,
        numberErr:'این فیلد الزامیست',
    })
    const errHandler = (e) =>{
        if (e.target.name == 'rule' && !e.target.checked) {
            setErr({...err,[e.target.name]:true})
        }else 
        if (e.target.value == '') {   
            setErr({...err,[e.target.name]:true})
        }else {
            setErr({...err,[e.target.name]:false})
        }
    }
    const [numbers ,setNumbers] = useState(false)
    const [closePopUp, setClosePopUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [state,setState] = useState({
        stateRegister: false,
        passengers: [],
        priceAll: 0,
        mobileSubmiter: localStorage.getItem('mobile') ? localStorage.getItem('mobile') : '',
        phoneSubmiter: '',
        mobileSubmiterErr: "",
        phoneSubmiterErr: "شماره ثابت اجباریست!!",
        agreeWithTerm: false,
        agreeWithTermerr: false,
        email:''
    });
    // }
    useEffect(() =>{
            props.addReservationProperties({
                reqNo: props.router.asPath.split("/")[7],
                reqPnr: props.router.asPath.split("/")[8],
                priceMessage: "",
            });
        fetch(
            `${globals.baseUrlNew
            }BilitFlightReserve/flightsReserve/ravisReserveProperty/${props.router.asPath.split("/")[7]
            }-${props.router.asPath.split("/")[8]
            }/1a157116-a01a-4027-ab10-74098ac63815`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "0") {
                    new Array(parseInt(data.flightReservePropertyModel.numADL))
                        .fill()
                        .forEach((x) => {
                            addNewPassenger(
                                "ADL",
                                data.flightReservePropertyModel.priceADL
                            );
                        });
                    Array(parseInt(data.flightReservePropertyModel.numCHD))
                        .fill()
                        .forEach((x) => {
                            addNewPassenger(
                                "CHD",
                                data.flightReservePropertyModel.priceCHD
                            );
                        });
                    Array(parseInt(data.flightReservePropertyModel.numINF))
                        .fill()
                        .forEach((x) => {
                            addNewPassenger(
                                "INF",
                                data.flightReservePropertyModel.priceINF
                            );
                        });

                    setState({...state,
                        ...data.flightReservePropertyModel,
                    });
                } else {
                }
            });
            getAllPrice();
        },[]);
    // }
    const fillPassengersData = (field, passengerNo, value) => {
        let passenger = state.passengers.find((x) => x.id == passengerNo);
        passenger[field] = value;
        let passengers_ = state.passengers.map((x) => {
            if (x.id == passengerNo) {
                return passenger;
            } else {
                return x;
            }
        });

        passengers_.sort((a, b) => {
            const A = a.type;
            const B = b.type;
            if (A < B) {
              return -1;
            }
            if (A > B) {
              return 1;
            }
            return 0;
          });

        setState({...state,
            passengers: passengers_,
        },() =>{
            getAllPrice();
        });
    };

    const addNewPassenger = (type, price) => {
        let passengers = state.passengers;
        let max_ = -1;
        passengers.map((onePassenger) => {
            if (onePassenger.id > max_) {
                max_ = onePassenger.id;
            }
        });
        const additionalPassenger = {
            id: max_ + 1,
            type: type,
            name: "",
            family: "",
            nationality: "IR",
            gender: "1",
            code: "",
            birthday: "",
            // pasaport: "",
            // add new fild for extPasaport
            extPasaport: "",
            price: price,
            nameErr: "",
            familyErr: "",
            codeErr: "",
            birthdayErr: "",
            // pasaportErr: "",
            futureday: "",
            pasno: "",
            birthdate: "",
            pasenddat: "",
            pasenddatErr: "",
            pasnoErr: "",
        };

        passengers.push(additionalPassenger);

        passengers.sort((a, b) => {
            const A = a.type;
            const B = b.type;
            if (A < B) {
              return -1;
            }
            if (A > B) {
              return 1;
            }
            return 0;
          });
        setState(
            {...state,
                passengers: passengers,
            });
            getAllPrice();
    };

    const removePassenger = (type, id) => {
        let passengers = state.passengers;
        passengers = passengers.filter((onePssenger) => onePssenger.id != id);
        if(type == 'ADL' && passengers[passengers.length - 1].type == 'INF'){
            passengers.pop();
        }
        
        setState(
            {...state,
                passengers: passengers,
            },
            () => {
                getAllPrice();
            }
        );
    };

    const validation = () => {
        console.log(state);
        let isValid = true;

        if (state.mobileSubmiter == "") {
            setState({...state,
                mobileSubmiterErr : "وارد کردن شماره همراه اجباری است",
            })
            isValid = false;
        }
        if (state.mobileSubmiter && state.mobileSubmiter.length < 10) {
            setState({...state,
                mobileSubmiterErr : "شماره موبایل باید 11 رقمی باشد"
            })
            isValid = false;
        }
        if (state.phoneSubmiter == "") {
            isValid = false;
            setState({...state,
                phoneSubmiterErr:"شماره ثابت را وارد کنید",
            })
        }
        const passengers = state.passengers.map((onePassenger) => {
            const tempPassenger = onePassenger;

            tempPassenger.nameErr = "";
            tempPassenger.familyErr = "";
            tempPassenger.codeErr = "";
            tempPassenger.birthdayErr = ""; 
            tempPassenger.pasnoErr = "";
            tempPassenger.pasenddatErr = "";

            if (tempPassenger.name == "") {
                tempPassenger.nameErr = "نام الزامی میباشد";
                isValid = false;
            }

            if (tempPassenger.family == "") {
                tempPassenger.familyErr = "نام‌خانوادگی الزامی میباشد";
                isValid = false;
            }

            if (tempPassenger.pasno == "" && state.pathKind == 2) {
                tempPassenger.codeErr = "شماره پاسپورت الزامی میباشد";
                isValid = false;
            }
            if (tempPassenger.futureday == "" && state.pathKind == 2) {
                tempPassenger.pasenddatErr = "انقضای پاسپورت الزامی میباشد";
                isValid = false;
            }
            if (onePassenger.nationality == "IR" && state.pathKind != 2) {
                if (!isValidIranianNationalCode(tempPassenger.code)) {
                    tempPassenger.codeErr = "کدملی نامعتبر میباشد";
                    isValid = false;
                }
            }

            if (tempPassenger.birthday == "") {
                tempPassenger.birthdayErr = "تاریخ تولد الزامی میباشد";
                isValid = false;
            }
            return tempPassenger;
        });
        setState({...state,
            passengers: passengers,
        });
        return isValid;
    };

    const getAllPrice = () => {
        let sum = 0;
        state.passengers.forEach((onePassenger) => {
            sum += onePassenger.price;
        });
        setState({...state,
            priceAll: sum,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'mobileSubmiter' && state.mobileSubmiter.length >= 10 ) {   
            localStorage.setItem('mobile',value);
            console.log(value);
        }
            if (value.length == 11 ) {
                setState({...state,
                    [`${name}error`]:false
                });
            }else if (value.length !==11) {
                setState({...state,[`${name}error`]:true})
            }
            setState({...state,[name]:value})
    };


    useEffect(() => {
        setState({...state,mobileSubmiter:props?.user?.user_info?.mobile})
      }, [props.user])

    const validationNumberOfPassengers = (type = '') => {
        const numADL = state.passengers.filter((x) => x.type == "ADL").length;
        const numCHD = state.passengers.filter((x) => x.type == "CHD").length;
        const numINF = state.passengers.filter((x) => x.type == "INF").length;
        const cap = state.capLast;
        let message = "";
        let valid = true;

        if (numADL <= numINF && type != 'ADL' && type != 'CHD') {
            message = "تعداد نوزاد نمیتواند بیشتر از تعداد بزرگسال باشد";
            valid = false;
        } else if (numADL <= 0) {
            message = "باید حداقل یک بزرگسال در بین مسافرین باشد";
            valid = false;
        } else if (numADL + numCHD >= cap && type != 'INF') {
            message = "تعداد افراد بیش از ظرفیت پرواز است";
            valid = false;
        }
        if (!valid) {
            props.messageBoxModify({
                color:false,
                message: message,
                state: true,
            });
        }
        getAllPrice();
        // console.log(state.passengers);
        return valid;
    };
    const compeleteReservation = () => {
        const numADL = state.passengers.filter((x) => x.type == "ADL").length;
        const numCHD = state.passengers.filter((x) => x.type == "CHD").length;
        const numINF = state.passengers.filter((x) => x.type == "INF").length;

        const reservePassengerObject = {
            reqNo: props.reserveProperties.reqNo,
            reqPnr: props.reserveProperties.reqPnr,
            // nameFamily: state.passengers[0].family,
            // nameFamilyEn: state.passengers[0].family,
            nameEnAll: state.passengers.map((x) => x.name).join(","),
            familyEnAll: state.passengers.map((x) => x.family).join(","),
            familyAll: state.passengers.map((x) => x.family).join(","),
            nameAll: state.passengers.map((x) => x.name).join(","),
            nameFamily: state.passengers.map((x) => x.family).join(","),
            nameFamilyEn: state.passengers.map((x) => x.family).join(","),
            meliCodeAll: state.passengers.map((x) => x.code).join(","),
            ticketCodeAll: state.passengers.map((x) => x.type).join(","),
            sexAll: state.passengers.map((x) => x.gender).join(","),
            birthDayAll: state.passengers.map((x) => moment(x.birthday).locale('fa').format('YYYY/MM/DD')).join(","),
            // moment("1989/1/24").locale('fa').format('YYYY/M/D');
            meliatAll: state.passengers.map((x) => x.nationality).join(","),
            telNo: state.phoneSubmiter.toString(),
            mobileNo: state.mobileSubmiter.toString(),
            email: state.email.toString(),
            pasNoAll: state.passengers.map((x) => x.pasno).join(","),   
            pasStDateAll: Array(state.passengers.length).fill("").join(","),
            pasEndDateAll: state.passengers.map((x) => x.futureday).join(","),
            numADL: numADL,
            numCHD: numCHD,
            numINF: numINF,
            customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        };
        getAllPrice();
        console.log(reservePassengerObject);
        fetch(
            `${globals.baseUrlNew}BilitFlightReserve/flightsReserve/ravisReserveSave`,
            {
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservePassengerObject),
                method: "POST",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "0") {
                    props.router.push(
                        `/flights/receipt/${data.reqNo}/${data.reqPnr}`
                    );
                } else {
                    setLoading(false)
                    props.messageBoxModify({
                        color:false,
                        state: true,
                        message: `${data.message}`,
                    });
                }
            });
    };
    useEffect(() => {getAllPrice();},[state.passengers])

    const login = () => {
        console.log(state);
        localStorage.setItem("mobile",state.mobileSubmiter)
        setState({...state, btn_disabled: true});
        setLoading(true)
        fetch(`${globals.baseUrlNew}auth/getMobile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            
            mobile: state.mobileSubmiter,
            password: '',
            register: 0,

            customerId: "1a157116-a01a-4027-ab10-74098ac63815",
            hostname: "bilitja.com",
            agencyName: "بلیطجا",
            telNumber: "02157874",
            // token: state.token|'',
        }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == "0") {
              setState({...state,
                btn_disabled: false,
                get_mobile_status: true,
                btn_text: "تایید کد احراز هویت",
              });
              setLoading(false)
            } else if (data.status == "10") {
              setState({...state, btn_disabled: false });
              setLoading(false)
              console.log('compeleteReservation();');
              compeleteReservation();
              localStorage.setItem("mobile", data.mobile);
              localStorage.setItem("token", data.token);
              props.checkUserLogged();
              props.getUserInfo({
                mobile: data.mobile,
              });
              props.accountBoxModify({
                state: false,
                type: "authentication",
              });
              props.messageBoxModify({
                color:true,
                state: true,
                message: "ورود شما موفقیت آمیز بود.",
              });
              props.accountBoxModify({
                state: false,
                type: "authentication",
              });
              

            } else if (data.status === "-111") {

              register();

            } else if (data.status === "-200") {
              setState({...state,
                btn_disabled: false,
                error: true,
                errText: "شماره موبایل یا رمز ثابت نادرست می باشد.",
              });
              setLoading(false)
            } else {
                setLoading(false)
              setState({...state,
                btn_disabled: false,
                error: true,
                errText: data.message,
              });
            }
          });
      };
    
    const register = () => {
        setState({...state, btn_disabled: true});
        setLoading(true)
        fetch(`${globals.baseUrlNew}auth/getMobile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: state.mobile,
            token: state.token,
            password: state.password,
            register: 1,
            hostname: "bilitja.com",
            customerId: "1a157116-a01a-4027-ab10-74098ac63815",
            agencyName: "بلیطجا",
            telNumber: "02157874",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status == "0") {
                setLoading(false)
              setState({...state,
                get_mobile_status:true,
                register_status: true,
                resend_code: true,
                btn_text: "تایید کد احراز هویت",
              });
            } else if (data.status === "-110") {
            //   setState({...state,
            //     btn_disabled: false,
            //     loading: false,
            //     error: true,
            //     errText:
            //       "این شماره موبایل در سامانه موجود است، لطفا از بخش ورود وارد حساب خود شوید.",
            //   });
            } else {
                setLoading(false)
              setState({...state,
                btn_disabled: false,
                error: true,
                errText: data.message,
              });
            }
          });
      };

        return (
            <div className="container">
                <div className={`${styles["flight-detail"]}`}>
                    <FlightReserveDesktopHeader {...state} />
                    <FlightReserveMobileHeader {...state} />
                </div>
                <div className="row mt-10">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-12 no-padding-xs border-pill-lg mt-2">
                        {state.passengers ? state.passengers.map((onePassenger, index) => (
                                    <FlightPassengerForm
                                        {...onePassenger}
                                        id={onePassenger.id}
                                        index={index}
                                        type={onePassenger.type}
                                        removePassenger={removePassenger}
                                        fillPassengersData={fillPassengersData}
                                        pathKind={state.pathKind}
                                    />
                                )): null}
                        <div className={`row ${styles["add-passanger"]} text-left`}>
                            <div className="visible-xs col-12 ">
                                <p className="font-size-14">
                                    <span className="font-bold-iransanse">
                                        مجموع قیمت: &nbsp;
                                    </span>
                                    <span className="color-secondary font-bold-iransanse">
                                        {moneyFormat(state.priceAll)}
                                        &nbsp;
                                    </span>
                                    <span className="font-bold-iransanse">تومان</span>
                                </p>
                            </div>

                            <div className="col-lg-9 col-md-8 col-12">
                                <div className="row">
                                    <div className="col-lg-2 col-md-4 col-4 no-padding">
                                        <a
                                            href="#"
                                            className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                                            onClick={(e) => {
                                                if (validationNumberOfPassengers('ADL')) {
                                                    addNewPassenger("ADL", state.priceADL);
                                                }
                                                e.preventDefault();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                            <span className="me-2">بزرگسال</span>
                                            <FontAwesomeIcon className="pull-left" icon={faMale} />
                                            <FontAwesomeIcon
                                                className="pull-left ml-0"
                                                icon={faFemale}
                                            />
                                        </a>
                                    </div>

                                    <div className="col-lg-2 col-md-4 col-4 no-padding">
                                        <div
                                            className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                                            onClick={(e) => {
                                                if (validationNumberOfPassengers('CHD')) {
                                                    addNewPassenger("CHD", state.priceCHD);
                                                }
                                                e.preventDefault();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                            <span className="me-2">کودک</span>
                                            <FontAwesomeIcon className="pull-left" icon={faChild} />
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-4 col-4 no-padding">
                                        <a
                                            href="#"
                                            className={` ${styles["btn-outlined-private"]}  btn-outlined  font-bold-iransanse`}
                                            onClick={(e) => {
                                                if (validationNumberOfPassengers('INF')) {
                                                    addNewPassenger("INF", state.priceINF);
                                                }
                                                e.preventDefault();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                            <span className="me-2">نوزاد</span>
                                            <FontAwesomeIcon className="pull-left" icon={faBaby} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 hidden-xs">
                                <p className="font-size-14">
                                    <span className="font-bold-iransanse">
                                        مجموع قیمت: &nbsp;
                                    </span>
                                    <span className="color-secondary font-bold-iransanse">
                                        {/* priceADL */}
                                        {state.priceAll !== 0 ?
                                        moneyFormat(state.priceAll):moneyFormat(state.priceADL)}
                                        &nbsp;
                                    </span>
                                    <span className="font-bold-iransanse">تومان</span>
                                </p>
                            </div>
                        </div>

                        <div className={`row ${styles["passanger-submiter"]} `}>
                            <div className="col-lg-6 col-md-12 col-12 px-4">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-6 padding-3px">
                                        <div>
                                            <input
                                                value={state.mobileSubmiter}
                                                type="text"
                                                placeholder="شماره همراه"
                                                name="mobileSubmiter"
                                                onChange={(e) => {handleChange(e)}}
                                                className="col-12 reserve-input px-2 h-35em"
                                                maxLength={11}
                                            />
                                        </div>
                                        <span className="color-secondary">
                                            { 
                                            state.mobileSubmiter == null ||state.mobileSubmiter == ''?'لطفا شماره را وارد کنید':
                                            state.mobileSubmiter?.length <= 10 ? 'شماره همراه باید ۱۱ رقمی باشد' :
                                            ''}
                                        </span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-6 padding-3px">
                                        <div>
                                            <input
                                                maxLength={11}
                                                value={state.phoneSubmiter}
                                                className="col-12 reserve-input px-2 h-35em"
                                                type="text"
                                                placeholder="شماره ثابت"
                                                name="phoneSubmiter"
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                        <span className="color-secondary">
                                            {state.phoneSubmiter =='' && numbers && state.phoneSubmiterErr}

                                            {/* {state.phoneSubmiterErr 
                                            : state.phoneSubmiter.length <= 10 && state.phoneSubmiter.length > 0 ? 'شماره ثابت باید ۱۱ رقمی باشد' 
                                            :''} */}
                                        </span>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-lg-6 col-md-6 col-12 padding-3px">
                                        <div>
                                            <input
                                                className="col-12 reserve-input px-2 h-35em"
                                                placeholder="ایمیل (اختیاری)"
                                                name="email"
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12 padding-3px">
                                        <div>
                                            <input
                                                className="col-12 reserve-input px-2 h-35em"
                                                placeholder="کد تخفیف (اختیاری)"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12 col-12 finish-reserve">
                                <div className="row" style={{ marginTop: 10 }}>
                                    <div className="col-lg-9 d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            name='rule'
                                            onChange={(e) => {
                                                errHandler(e);
                                                setState({...state,
                                                    agreeWithTerm: e.target.checked,
                                                    agreeWithTermerr:!state.agreeWithTermerr
                                                });
                                            }}
                                            className="mx-2"
                                        />
                                        <label htmlFor="terms" style={{ fontSize: 15 }}>
                                            قوانین و مقررات و صحت اطلاعات را قبول دارم.
                                        </label>
                                    </div>
                                        
                                    {/* <span className="color-secondary error-message">
                                        {err.rule && err.ruleErr}
                                    </span> */}
                                    <div className="col-lg-3 text-right">
                                        <div className={styles["ruls-text"]}>
                                            <div onClick={() =>setClosePopUp(true)} style={{ marginRight: 10, marginTop: 5, borderBottom: '2px dashed #090026', paddingBottom: 5, color: '#090026' }}>
                                                قوانین و مقررات
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="color-secondary">
                                        {state.agreeWithTermerr==true && state.agreeWithTerm == false && 'قوانین و مقررات و صحت اطلاعات را بپذیرید!!!.'}
                                </span>
                            
                                <div className="row finish-reserve-buttons mb-3 ml-5 mt-4">
                                    <div className="col-lg-8 col-md-8 col-7 padding-3px">
                                        <button
                                            onClick={(e) => {
                                                if(localStorage.getItem('mobile')?.length==11 && !localStorage.getItem('token')){
                                                    setState({...state, stateRegister: false });
                                                    login();
                                                    props.messageBoxModify({
                                                        state: true,
                                                        color:false,
                                                        message: "لطفا کد تایید ارسال شده را وارد کنید!",
                                                    });
                                                    props.accountBoxModify({
                                                        state: true,
                                                        type: "login",
                                                    });
                                                }
                                                if (!validation()) {
                                                    setLoading(false)
                                                    props.messageBoxModify({
                                                        state: true,
                                                        color:false,
                                                        message: "لطفا اطلاعات را تکمیل کنید.",
                                                    });
                                                    setNumbers(true)
                                                } else if (state.agreeWithTerm === true && props.user.logged && localStorage.getItem('token')) {

                                                    setLoading(true)
                                                    
                                                    compeleteReservation();

                                                } else if(state.agreeWithTerm === false) {
                                                    setState({...state,agreeWithTermerr:true });
                                                    setLoading(false)
                                                    props.messageBoxModify({
                                                        state: true,
                                                        color:false,
                                                        message: "لطفا با شرایط و مقررات موافقت کنید",
                                                    });
                                                }else if(!localStorage.getItem('token')){
                                                    setState({...state, stateRegister: false });
                                                    login();
                                                    props.messageBoxModify({
                                                        state: true,
                                                        color:false,
                                                        message: "لطفا کد تایید ارسال شده را وارد کنید!",
                                                    });
                                                    props.accountBoxModify({
                                                            state: true,
                                                            type: "login",
                                                        });
                                                }

                                            }}
                                            className="py-2 btn-block col-12 end-payment-btn btn"
                                        >
                                            {loading == false
                                                ? "تکمیل خرید"
                                                : "درحال پردازش..."
                                                }
                                        </button>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-5 padding-3px">
                                        {/* <a
                                            className="btn col-12 back-payment-btn py-2"
                                            onClick={() => {
                                                props.router.back();
                                            }}
                                        > */}
                                        <Link href={`/${JSON.parse(localStorage.getItem('url'))}`}>
                                            <span
                                            className="btn col-12 back-payment-btn py-2"
                                            >بازگشت</span>
                                        </Link>
                                        {/* </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PopUp opened={closePopUp} closePopUp={setClosePopUp} >
                    <div className="p-2">
                        <p onClick={() =>setClosePopUp(false)} className='cursor-pointer mb-0 text-danger' style={{fontSize:20}}>X</p>
                        <div onClick={() =>setClosePopUp(false)} className="p-5">
                            قوانین و مقررات
                        </div>
                    </div>
                </PopUp>
            </div>
        );
}
function mapStateToProps(state){
    return{
        reserveProperties: selectProperties(state),
        user: state.user,
}};
const mapDispatchToProps = (dispatch) => ({
    accountBoxModify: (value) => dispatch(accountBoxModify(value)),
    addReservationProperties: async (value) =>
        dispatch(addReservationProperties(value)),
    messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FlightReserve)
);
