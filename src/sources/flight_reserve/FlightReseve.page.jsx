import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/FlightReserve.module.scss";
import moment from 'moment-jalaali';
import { addReservationProperties } from "../../Redux/Reserve/reserve.action";
import FlightPassengerForm from "./FlightPassengerForm.component";
import FlightReserveDesktopHeader from "./FlightReserveDesktopHeader.component";
import FlightReserveMobileHeader from "./FlightReserveMobileHeader.component";

import globals from "../Global";
import { connect } from "react-redux";
import { selectProperties } from "../../Redux/Reserve/reserve.reselect";
import { messageBoxModify, accountBoxModify } from "../../Redux/UI/ui.action";

import {
    isValidIranianNationalCode,
    isValidPassportCode,
    moneyFormat,
} from "../../Utils/SimpleTasks";
import { withRouter } from "next/router";
import Link from "next/link";
import PopUp from "../component/PopUp.component";
import Scrolltoprefresh from "../component/Scrolltoprefresh";
import { useRouter } from 'next/router';
import AddNewPassenger from "./AddNewPassenger";
import OtherData from "./OtherData";
import Submit from "./Submit";

const FlightReserve = (props) => {
    const [err, setErr] = useState({
        rule: false,
        ruleErr: 'لطفا قوانین را بپذیرید',
        fixedNumber: false,
        fixedNumberErr: 'این فیلد الزامیست',
        number: false,
        numberErr: 'این فیلد الزامیست',
    })
    const errHandler = (e) => {
        if (e.target.name == 'rule' && !e.target.checked) {
            setErr({ ...err, [e.target.name]: true })
        } else
            if (e.target.value == '') {
                setErr({ ...err, [e.target.name]: true })
            } else {
                setErr({ ...err, [e.target.name]: false })
            }
    }
    const [numbers, setNumbers] = useState(false)
    const [numbers2, setNumbers2] = useState(false)
    const [closePopUp, setClosePopUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)
    const [width, setWidth] = useState(0)
    const [ closePopUpPrice, setClosePopUpPrice ] = useState(false)
    const [state, setState] = useState({
        stateRegister: false,
        passengers: [],
        priceAll: 0,
        mobileSubmiter: localStorage.getItem('mobile') ? localStorage.getItem('mobile') : '',
        phoneSubmiter: '',
        mobileSubmiterErr: "شماره همراه اجباری است",
        phoneSubmiterErr: "شماره ثابت اجباری است",
        agreeWithTerm: false,
        agreeWithTermerr: false,
        email: ''
    });
    // const router = useRouter();
    let route=''
    // useEffect(()=>{
    //     setTimeout(function() {
    //         if (parseInt(localStorage.getItem('priceChecker')) != parseInt(state.passengers[0].price)){
    //             console.log('state',(state),'|',state.passengers,'|',parseInt(localStorage.getItem('priceChecker'))/10);
    //             setClosePopUpPrice(true)
    //         }
    // }, 500);
    // },[state.price])
    useEffect(() => {
        setWidth(window.innerWidth)
        route = props.router.asPath.split('info')[0]
        if (localStorage.getItem('reqNo') !== null) {
            props.messageBoxModify({
                color: false,
                message: 'به علت تغییر قیمت, جستجو مجدد انجام می شود!<br/> درحال انتقال به صفحه پرواز ...',
                state: true,
            })
            setTimeout(() => { 
                props.router.push(route)
            }, "3000")
        }

        localStorage.setItem('reqNo', props.router.asPath.split("/")[7])
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
                let sum = 0;
                if (data.status == "0") {
                    new Array(parseInt(data.flightReservePropertyModel.numADL))
                        .fill()
                        .forEach((x) => {
                            addNewPassenger(
                                "ADL",
                                data.flightReservePropertyModel.priceADL
                            );
                            sum+=data.flightReservePropertyModel.priceADL
                        });
                    Array(parseInt(data.flightReservePropertyModel.numCHD))
                        .fill()
                        .forEach((x) => {
                            addNewPassenger(
                                "CHD",
                                data.flightReservePropertyModel.priceCHD
                            );
                            sum+=data.flightReservePropertyModel.priceCHD
                        });
                    Array(parseInt(data.flightReservePropertyModel.numINF))
                        .fill()
                        .forEach((x) => {
                            addNewPassenger(
                                "INF",
                                data.flightReservePropertyModel.priceINF,
                                data.flightReservePropertyModel.pathKind,
                            );
                            sum+=data.flightReservePropertyModel.priceINF
                        });

                    setState({
                        ...state,
                        priceAll:sum,
                        ...data.flightReservePropertyModel,
                    });
                } else {
                }
            });
        getAllPrice();
        // localStorage.removeItem('reqNo');
    }, []);
    
    const validation = () => {
        let isValid = true;

        if (state.mobileSubmiter == "") {
            setState({
                ...state,
                mobileSubmiterErr: "شماره موبایل باید 11 رقمی باشد"
            })
            isValid = false;
        }
        if (state.phoneSubmiter == "") {
            isValid = false;
            setState({
                ...state,
                phoneSubmiterErr: "شماره ثابت را وارد کنید",
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
            tempPassenger.passportCodeErr = "";

            if (tempPassenger.name == "") {
                tempPassenger.nameErr = "نام الزامی میباشد";
                isValid = false;
            }

            if (tempPassenger.family == "") {
                tempPassenger.familyErr = "نام‌خانوادگی الزامی میباشد";
                isValid = false;
            }

            if ((onePassenger.nationality == "other" || state.pathKind == 2) && tempPassenger.pasno == "") {
                tempPassenger.pasnoErr = "شماره پاسپورت الزامی میباشد";
                isValid = false;
            }
            // if (isValidPassportCode(tempPassenger.pasno) && (onePassenger.nationality == "other" || state.pathKind == 2)) {
            //     tempPassenger.pasnoErr = "شماره پاسپورت صحیح نمیباشد";
            //     isValid = false;
            // }
            if ((onePassenger.nationality == "other" || state.pathKind == 2) && tempPassenger.futureday == "" ) {
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
        setState({
            ...state,
            passengers: passengers,
        });
        return isValid;
    };
    const fillPassengersData = (field, passengerNo, value) => {
        let passenger = state.passengers.find((x) => x.id == passengerNo);
        passenger[field] = value;
        if (field == 'nationality') {
            if (value=='IR') {
                // passenger.pasno = ''
                passenger.pasnoErr = "";
            }else{
                // passenger.code = ''
                passenger.codeErr = "";
                // passenger.pasnoErr = "شماره پاسپورت صحیح نمیباشد";
            }
        }
        // name
        if (field == "name" && value == "") {
            passenger.nameErr = "نام الزامی میباشد";
        }else if(field == "name" ){
            passenger.nameErr = "";
        }
        // family
        if (field == "family" && value == "") {
            passenger.familyErr = "نام‌خانوادگی الزامی میباشد";
        }else if (field == "family"){
            passenger.familyErr = ""
        }
        // birthday
        if (field == 'birthday' && value == "") {
            passenger.birthdayErr = "تاریخ تولد الزامی میباشد";
        }else if (field == 'birthday'){
            passenger.birthdayErr = "";
        }
        // futureday
        if (field == 'futureday' && value == "" ) {
            passenger.pasenddatErr = "انقضای پاسپورت الزامی میباشد";
        }else if (field == 'futureday'){
            passenger.pasenddatErr = "";
        }
        // pasno
        if (field == 'pasno') {
            if (passenger.pasno == '') {
                passenger.pasnoErr = "شماره پاسپورت الزامی میباشد";
            }else {
                passenger.pasnoErr = "";
            }
        }
        // code
        if ( field =='code' && value.length == 10) {
            if (!isValidIranianNationalCode(passenger.code)) {
                passenger.codeErr = "کدملی نامعتبر میباشد";
            }else if(field =='code' && !value =='') {
                passenger.codeErr = "";
            }
        }
        
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

        setState({
            ...state,
            passengers: passengers_,
        }, () => {
            getAllPrice();
        });
    };

    const addNewPassenger = (type, price, pathKind) => {
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
            pathKind: pathKind,
            code: "",
            birthday: "",
            extPasaport: "",
            price: price,
            nameErr: "",
            familyErr: "",
            codeErr: "",
            birthdayErr: "",
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
            {
                ...state,
                passengers: passengers,
            });
        getAllPrice();
    };

    const removePassenger = (type, id) => {
        let passengers = state.passengers;
        passengers = passengers.filter((onePssenger) => onePssenger.id != id);
        if (type == 'ADL' && passengers[passengers.length - 1].type == 'INF') {
            passengers.pop();
        }

        setState(
            {
                ...state,
                passengers: passengers,
            },
            () => {
                getAllPrice();
            }
        );
    };

    const getAllPrice = () => {
        let sum = 0;
        state.passengers.forEach((onePassenger) => {
            sum += onePassenger.price;
        });
        setState({
            ...state,
            priceAll: sum,
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'mobileSubmiter' && state.mobileSubmiter.length >= 10) {
            localStorage.setItem('mobile', value);
        }
        setState({ ...state, [name]: value })
    };

    const Ref = useRef(null);

    const scrollToBottom = () => {
        Ref.current.scrollIntoView({ block: "end", behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        setScrollTop(false)
    }, [scrollTop]);

    useEffect(() => {
        setState({ ...state, mobileSubmiter: props?.user?.user_info?.mobile })
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
                color: false,
                message: message,
                state: true,
            });
        }
        getAllPrice();
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
            birthDayAll: state.passengers.map((x) => moment(x.birthday).locale('en').format('YYYY/MM/DD')).join(","),
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
                    props.router.push(`/flights/receipt/${data.reqNo}/${data.reqPnr}`);
                } else {
                    setLoading(false)
                    props.messageBoxModify({
                        color: false,
                        state: true,
                        message: `${data.message}`,
                    });
                }
            });
    };
    useEffect(() => { getAllPrice() }, [state.passengers])

    const login = () => {
        localStorage.setItem("mobile", state.mobileSubmiter)
        setState({ ...state, btn_disabled: true });
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
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "0") {
                    setState({
                        ...state,
                        btn_disabled: false,
                        get_mobile_status: true,
                        btn_text: "تایید کد احراز هویت",
                    });
                    setLoading(false)
                } else if (data.status == "10") {
                    setState({ ...state, btn_disabled: false });
                    setLoading(false)
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

                } else if (data.status === "-111") {

                    register();

                } else if (data.status === "-200") {
                    setState({
                        ...state,
                        btn_disabled: false,
                        error: true,
                        errText: "شماره موبایل یا رمز ثابت نادرست می باشد.",
                    });
                    setLoading(false)
                } else {
                    setLoading(false)
                    setState({
                        ...state,
                        btn_disabled: false,
                        error: true,
                        errText: data.message,
                    });
                }
            });
    };

    const register = () => {
        setState({ ...state, btn_disabled: true });
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
                    setState({
                        ...state,
                        get_mobile_status: true,
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
                    setState({
                        ...state,
                        btn_disabled: false,
                        error: true,
                        errText: data.message,
                    });
                }
            });
    };
    let loginGoNext = ''
    loginGoNext = localStorage.getItem('loginGoNext') && localStorage.getItem('loginGoNext')
    useEffect(() => {
        if (loginGoNext == 1) {
            compeleteReservation()
            setLoading(true)
            localStorage.setItem('loginGoNext', JSON.stringify(''))
        }
    }, [loginGoNext])

    return (
        <div className={`container ${width>=826?"mt-90":'mt-110'}`} style={{ height: '100%' }}>
            <Scrolltoprefresh />
            <div className={`${styles["flight-detail"]}`} ref={Ref}>
                <FlightReserveDesktopHeader {...state} />
                <FlightReserveMobileHeader {...state} />
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-12 no-padding-xs border-pill-lg">
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
                    )) : null}
                    {/* in mobile shown */}
                    <div className={`row ${styles["add-passanger"]} text-left`}>
                        <div className="visible-xs col-12 ">
                            <p className="font-size-14">
                                <span className="font-bold-iransanse">
                                    مجموع قیمت: &nbsp;
                                </span>
                                <span className="color-secondary font-bold-iransanse">
                                    {/* priceADL */}
                                    {moneyFormat(state.priceAll)}
                                    &nbsp;
                                </span>
                                <span className="font-bold-iransanse">تومان</span>
                            </p>
                        </div>

                        <div className="col-lg-9 col-md-8 col-12">
                            <AddNewPassenger
                                state={state}
                                addNewPassenger={addNewPassenger}
                                validationNumberOfPassengers={validationNumberOfPassengers}
                            />
                        </div>
                        <div className="col-lg-3 col-md-4 hidden-xs d-flex justify-content-end align-center">
                            <p className="font-size-14 mb-0">
                                <span className="font-bold-iransanse">
                                    مجموع قیمت: &nbsp;
                                </span>
                                <span className="color-secondary font-bold-iransanse">
                                    {/* priceADL */}
                                    {moneyFormat(state.priceAll)}
                                    &nbsp;
                                </span>
                                <span className="font-bold-iransanse">تومان</span>
                            </p>
                        </div>
                    </div>

                    <div className={`row ${styles["passanger-submiter"]} `}>
                        <OtherData
                            state={state}
                            numbers2={numbers2}
                            numbers={numbers}
                            handleChange={handleChange}
                        />

                        <Submit 
                            route={props.router.asPath.split('info')[0]}
                            {...props}
                            state={state}
                            setState={setState}
                            setScrollTop={setScrollTop}
                            validation={validation}
                            loading={loading}
                            setLoading={setLoading}
                            errHandler={errHandler}
                            setClosePopUp={setClosePopUp}
                            setNumbers={setNumbers}
                            setNumbers2={setNumbers2}
                            compeleteReservation={compeleteReservation}
                            login={login}
                        />
                    </div>
                </div>
            </div>

            <PopUp opened={closePopUp} closePopUp={setClosePopUp} >
                <div className="p-2">
                    <span
                        className="exit-form position-absolute"
                        onClick={() => {
                            props.accountBoxModify({
                                state: false,
                            });
                        }} style={{ left: 10 }}
                    >
                        <div style={{ color: "red" }} className="font-bold font-size-15" >x</div>
                    </span>
                    <div onClick={() => setClosePopUp(false)} className="p-5">
                        قوانین و مقررات
                    </div>
                </div>
            </PopUp>
            
            <PopUp opened={closePopUpPrice} closePopUp={setClosePopUpPrice} >
                <div className="p-2">
                    <div className="text-start row justify-content-end">
                        <span
                        className="exit-form pb-1Important ms-3"
                        style={{width: '30px'}}
                        onClick={() => {
                            setClosePopUpPrice(false);
                        }}
                        >
                        <div style={{ color: "red" }} className="font-bold font-size-15" >x</div>
                        </span>
                    </div>
                    <div className="text-center">
                        <img src={'../../Images/notification.png'} width={'150px'} height={'150px'} />
                        <p>پرواز انتخابی شما با تغییر قیمت مواجه شده
                        </p>
                    </div>
                </div>
            
            </PopUp>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        reserveProperties: selectProperties(state),
        user: state.user,
    }
};
const mapDispatchToProps = (dispatch) => ({
    accountBoxModify: (value) => dispatch(accountBoxModify(value)),
    addReservationProperties: async (value) =>
        dispatch(addReservationProperties(value)),
    messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});

FlightReserve.getInitialProps = ({ query }) => {
    return {
      Pathname: query
    }
  }
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FlightReserve)
);
