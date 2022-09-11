import React, { useEffect, useState } from "react";

import PrimaryTextInput from "../component/PrimaryTextInput.component";
import PrimarySelectInput from "../component/PrimarySelectInput.component";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BirthdayCalendar from "../calendar/BirthdayCalendar.component";
import FuturedayCalendar from "../calendar/FutureCalendar.component";

import { moneyFormat } from "../../Utils/SimpleTasks";
import PopUp from "../component/PopUp.component";
import styles from "../../../styles/FlightPassengerForm.module.scss";
import { checkCharacter, checkNumber } from "../../Utils/SimpleTasks";
import { messageBoxModify } from "../../Redux/UI/ui.action";
import { connect } from "react-redux";
import BirthdayCalenderMiladi from "../calendar/BirthdayCalenderMiladi";
import PrimaryTextInputMobile from "../component/PrimaryTextInputMobile";
import PopUpWide from "../component/PopUpWide.component";
import CalendarComponent from "../calendar/Calendar.component";
import BirthDayParent from "../calendar/BirthDayParent";


const FlightPassengerForm = (props) => {
    const [state, setState] = useState({
        open: false,
        extOpen: false,
    });
    const [calend, setCalend] = useState(false)
    const [birthday, setBirthday] = useState('')

    const [err, setErr] = useState({
        checker: false,
        name: false,
        nameErr: 'لطفا نام را صحیح وارد کنید',
        lname: false,
        lnameErr: 'لطفا نام خانوادگی را صحیح وارد کنید',
        nationalCode: false,
        nationalCodeErr: 'لطفا کد را صحیح وارد کنید',
        birthday: false,
        birthdayErr: 'لطفا تاریخ تولد را وارد کنید',
        extPasaport: false,
        extPasaportErr: 'لطفا فیلد انقضا را پر کنید',
    })
    const errHandler = (e) => {
        if (e.target.name = 'extPasaport' && e.target.value !== '') {
            setErr({ ...err, [e.target.name]: true })
        } else if (e.target.name = 'birthday' && e.target.value == '') {
            setErr({ ...err, [e.target.name]: true })
        } else if (e.target.value.length <= 1) {
            setErr({ ...err, [e.target.name]: true })
        } else {
            setErr({ ...err, [e.target.name]: false })
        }
    }


    //get title of form
    const getTitleByType = (type) => {
        if (type == "ADL") {
            return "بزرگسال";
        } else if (type == "CHD") {
            return "کودک";
        } else if (type == "INF") {
            return "نوزاد";
        }
    };
    // get a small description based on type of passenger
    const getSubtitleByType = (type) => {
        if (type == "ADL") {
            return "(12 سال به بالا)";
        } else if (type == "CHD") {
            return "(2 تا 12 سال)";
        } else if (type == "INF") {
            return "(زیر 2 سال)";
        }
    };
    const managePopUpBirthdayCalendar = (value) => {
        setState({
            open: value,
        });
    };
    const managePopUpExtPasCalendar = (value) => {
        setState({
            extOpen: value,
        });
    };
    const managePopUpFuturedayCalendar = (value) => {
        setState({
            openFuture: value,
        });
    };
    const checkCharacters = (value) => {
        if (!checkCharacter(value) && value != "") {
            props.messageBoxModify({
                message: "لطفا از کاراکتر های لاتین استفاده کنید",
                state: true,
            });
            return false;
        }
        return true;
    };
    return (
        <div className={`${styles["passenger-form"]}`}>
            <div className="row d-flex justify-content-start col-md-12">
                <div className="col-lg-1 col-md-12 col-sm-12 col-12 no-padding hidden-xs">
                    <p className="no-margin font-size-14 font-bold-iransanse">
                        {`${props.index + 1}-`}&nbsp;
                        {getTitleByType(props.type)}
                    </p>
                    <p className="no-margin font-size-10">
                        {getSubtitleByType(props.type)}
                    </p>
                </div>
                <div className="hidden-xs col-lg-1 mr-4 col-md-2 col-sm-2 row-price font-size-12 p-3">
                    <span className="font-size-14 color-secondary font-bold-iransanse ">
                        {moneyFormat(props.price)}
                        &nbsp;
                    </span>
                    تومان
                </div>
                {/* shows up just for mobile ----- start*/}
                <div
                    className={` ${styles["visible-xs-passenger-form-header"]} col-12 padding-3px`}
                >
                    <div className="col-6 no-margin padding-xs-0-7 mx-3">
                        <span className="font-size-13 no-margin font-bold-iransanse">
                            {`${props.index + 1}-`}&nbsp;
                            {getTitleByType(props.type)}{" "}
                        </span>
                        <span className="no-margin font-size-11">
                            {getSubtitleByType(props.type)}
                        </span>
                    </div>
                    <div
                        className="col-6 no-padding text-left"
                        style={{ marginRight: -14 }}
                    >
                        <span className="font-size-14 color-secondary font-bold-iransanse">
                            {moneyFormat(props.price)}
                        </span>
                        <span className="font-size-12 font-bold-iransanse">تومان</span>
                    </div>
                    {props.id != 0 ? (
                        <div className="col-1 no-margin no-padding">
                            <span
                                style={{ padding: 3 }}
                                className="exit-form"
                                onClick={() => {
                                    props.removePassenger(props.id);
                                }}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            <span className="color-secondary error-message">&nbsp;</span>
                        </div>
                    ) : null}
                </div>
                {/* shows up just for mobile ----- end */}
                <div className={`"col-lg-12 col-md-12 col-sm-12 col-12 m-auto" ${styles["container"]}`}>
                    <div className="row justify-content-start">
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 padding-horizental-3px">
                            <div className="pb-1 mt-1">
                                <PrimaryTextInput
                                    style={{ height: "3.1em", border: "1px solid #eee", fontSize: 15 }}
                                    placeholder="نام"
                                    name="name"
                                    onChange={(e) => {
                                        errHandler(e)
                                        if (!checkCharacters(e.target.value)) {
                                            return;
                                        }
                                        props.fillPassengersData(
                                            "name",
                                            props.id,
                                            e.target.value
                                        );
                                    }}
                                    value={props.name}
                                />
                            </div>
                            <span className="color-secondary error-message position-absolute w-100">
                                {props.nameErr == '' && err.name ? err.nameErr : ''}
                                {props.name.length < 3 && props.nameErr}
                                {/* {props.nameErr} */}
                            </span>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 padding-horizental-3px">
                            <div className="pb-1 mt-1">
                                <PrimaryTextInput
                                    style={{ height: "3.1em", border: "1px solid #eee", fontSize: 15 }}
                                    placeholder="نام خانودگی"
                                    name='lname'
                                    onChange={(e) => {
                                        errHandler(e)
                                        if (!checkCharacters(e.target.value)) {
                                            return;
                                        }
                                        props.fillPassengersData(
                                            "family",
                                            props.id,
                                            e.target.value
                                        );
                                    }}
                                    value={props.family}
                                />
                            </div>
                            <span className="color-secondary error-message position-absolute">
                                {/* {err.lname && err.lnameErr} */}
                                {props.familyErr == '' && err.lname ? err.lnameErr : ''}
                                {props.family.length < 3 && props.familyErr}

                                {/* {props.familyErr} */}
                            </span>
                        </div>
                        <div className=" col-lg-1 col-md-1 col-sm-2 col-6 padding-horizental-3px mt-1">
                            <PrimarySelectInput
                                style={{ padding: "6px 0", paddingBottom: 3, border: "1px solid #eee" }}
                                name="nationality"
                                onChange={(e) => {
                                    props.fillPassengersData(
                                        "nationality",
                                        props.id,
                                        e.target.value
                                    );
                                }}
                            >
                                <option value="IR">ایرانی</option>
                                <option value="other">غیر ایرانی</option>
                            </PrimarySelectInput>
                        </div>
                        <div className=" col-lg-1 col-md-1 col-sm-4 col-6 padding-horizental-3px mt-1">
                            <PrimarySelectInput
                                style={{ paddingBottom: 3, border: "1px solid #eee", fontSize: 15 }}
                                name="gender"
                                onChange={(e) => {
                                    props.fillPassengersData(
                                        "gender",
                                        props.id,
                                        e.target.value
                                    );
                                }}
                            >
                                <option value="1" selected="selected">
                                    مرد
                                </option>
                                <option value="2">زن</option>
                            </PrimarySelectInput>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-4 col-6 padding-horizental-3px">
                            <div className="pb-1 mt-1">
                                <PrimaryTextInput
                                    style={{ height: "3.1em", border: "1px solid #eee", fontSize: 15 }}
                                    placeholder="تاریخ تولد"
                                    value={props.birthday}
                                    name="birthday"
                                    onClick={(e) => {
                                        errHandler(e)
                                        managePopUpBirthdayCalendar(true);
                                    }}
                                // onFocus={(e) => {
                                // }}

                                />
                            </div>
                            <span className="color-secondary error-message position-absolute">
                                {props.birthday == '' && err.birthdayErr ? props.birthdayErr : ''}
                            </span>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 padding-horizental-3px mt-1">
                            <div className={`d-flex align-items-center ${props.pathKind == 3 ? styles["makhfi"] : ""}`} >
                                <PrimaryTextInput
                                    style={{ height: "3.1em", border: "1px solid #eee", marginBottom: 3, fontSize: 15 }}
                                    name="nationalCode"
                                    placeholder={`${props.nationality == "IR"
                                        ? "کد ملی"
                                        : "شماره پاسپورت"
                                        }`}
                                    inputMode={`${props.nationality == "IR" ? "numeric" : "text"
                                        }`}
                                    onChange={(e) => {
                                        errHandler(e)
                                        if (props.nationality !== "other") {
                                            props.fillPassengersData(
                                                "code",
                                                props.id,
                                                e.target.value
                                            );
                                        } else {
                                            if (!checkNumber(e.target.value)) {
                                                return;
                                            } else {
                                                props.fillPassengersData(
                                                    "pasno",
                                                    props.id,
                                                    e.target.value
                                                );
                                            }
                                        }
                                    }}
                                    defaultValue={props.code}
                                />
                            </div>




                            <div className={`d-flex align-items-center ${props.nationality == 'IR' ? styles["makhfi"] : ""}`} >
                                {/* <PrimaryTextInput
                                        style={{height: "3em", fontSize: 12,display: props.nationality == 'IR' && 'none'}}
                                        placeholder={`${ "انقضای پاسپورت"}`}
                                        inputMode={`${"text"}`} 
                                        onChange={(e) => {
                                                props.fillPassengersData(
                                                    "extPasaport",
                                                    props.id,
                                                    e.target.value
                                                );}}
                                                onFocus={() => {
                                                    managePopUpExtPasCalendar(true);
                                                }}
                                        defaultValue={props.extPasaport}
                                        value={props.extPasaport}
                                    /> */}
                                {/* <PrimaryTextInput 
                                        style={{height: "3em", fontSize: 12,marginRight:12}}
                                        placeholder={` شماره پاسپورت`}
                                        name="nationalCode"
                                        onChange={(e) => {
                                            if (!checkCharacters(e.target.value)) {
                                                return;
                                            }
                                            props.fillPassengersData(
                                                "pasno",
                                                props.id,
                                                e.target.value
                                            );
                                        }}
                                        defaultValue={props.pasno}
                                    /> */}
                            </div>
                            <span className="color-secondary error-message position-absolute">
                                {/* {err.nationalCode && err.nationalCodeErr} */}
                                {/* {props.codeErr}
                                {props.pasnoErr} */}
                                {props.codeErr == '' && props.pasnoErr == '' && err.nationalCode ? err.nationalCodeErr : ''}
                                {props.code.length < 10 ? props.codeErr : ""}
                                {props.nationality == 'other' && props.pasno.length < 10 && props.pasno.length > 1 ? 'شماره پاسپورت اشتباه است' : ''}

                            </span>
                        </div>

                        <div className="col-lg-2 col-md-3 col-sm-4 col-6 padding-horizental-3px mt-1">
                            <div className={`d-flex align-items-center ${props.nationality == 'IR' ? styles["makhfi"] : ""}`} >
                                <PrimaryTextInput
                                    style={{ height: "3.1em", border: "1px solid #eee", fontSize: 15, display: props.nationality == 'IR' && 'none' }}
                                    placeholder={`${"انقضای پاسپورت"}`}
                                    name="extPasaport"
                                    inputMode={`${"text"}`}
                                    onChange={(e) => {
                                        errHandler(e);
                                        props.fillPassengersData(
                                            "extPasaport",
                                            props.id,
                                            e.target.value
                                        );
                                    }}
                                    onFocus={() => {
                                        managePopUpExtPasCalendar(true);
                                    }}
                                    defaultValue={props.extPasaport}
                                    value={props.extPasaport}
                                />
                            </div>
                            <span className="color-secondary error-message position-absolute">
                                {props.extPasaport == "" && err.extPasaport ? err.extPasaportErr : ''}
                            </span>
                        </div>
                        <div className="col-lg-2 mt-12 col-md-2 col-sm-4 col-6 padding-horizental-3px ">
                            {/* <div  className={`${ props.pathKind !=2 ? styles["makhfi"]:""  }`} >
                                    <PrimaryTextInput
                                        style={{height: "3em", fontSize: 12}}
                                        placeholder=" انقضا پاسپورت"
                                        value={props.futureday}
                                        onFocus={() => {
                                            managePopUpFuturedayCalendar(true);
                                        }}
                                        
                                    />
                                      
                                </div> */}
                            <span className="color-secondary error-message position-absolute">
                                {props.pasenddatErr}
                            </span>
                        </div>

                    </div>
                </div>

                <div className="hidden-xs col-lg-1 col-md-2 col-sm-2 row-price font-size-12">
                    {props.id != 0 ? (
                        <div
                            className="hidden-xs hidden-sm corner-position"
                            style={{ position: "absolute", left: "-33px", top: "35px" }}
                        >
                            <span
                                className="delete-thumbnail"
                                onClick={() => {
                                    props.removePassenger(props.id);
                                }}
                            >
                                <svg id="Layer_1" height="23" viewBox="0 0 24 24" width="23" data-name="Layer 1"><path
                                    d="m9 12a6 6 0 1 0 -6-6 6.006 6.006 0 0 0 6 6zm0-10a4 4 0 1 1 -4 4 4 4 0 0 1 4-4zm9 17v5h-2v-5a3 3 0 0 0 -3-3h-8a3 3 0 0 0 -3 3v5h-2v-5a5.006 5.006 0 0 1 5-5h8a5.006 5.006 0 0 1 5 5zm3.414-9 2.543 2.543-1.414 1.414-2.543-2.543-2.543 2.543-1.414-1.414 2.543-2.543-2.543-2.543 1.414-1.414 2.543 2.543 2.543-2.543 1.414 1.414z" /></svg>
                            </span>
                            <span className="color-secondary error-message position-absolute top-50">&nbsp;</span>
                        </div>
                    ) : null}
                </div>
            </div>

            <PopUp
                opened={state.open}
                closePopUp={managePopUpBirthdayCalendar}
            >
                <div style={{ padding: 15 }}>
                    <button onClick={() => setCalend(!calend)}>{calend ? 'میلادی' : 'شمسی'}</button>
                    <BirthDayParent
                        numSh={1300}
                        numBase={1300}
                        numMi={1920}
                        numMiBase={1300}
                        placeholder="لطفا تاریخ تولد را وارد کنید"
                        calend={calend}
                        typePassenger={props.type}
                        name="birthday"
                        setBirthdayb={(value) => {
                            props.fillPassengersData("birthday", props.id, value);
                        }}
                        closePopUpCalendar={managePopUpBirthdayCalendar}
                    />
                    {/* <BirthdayCalenderMiladi
                        /> */}
                </div>
            </PopUp>

            <PopUp
                opened={state.extOpen}
                closePopUp={managePopUpExtPasCalendar}
            >
                <div style={{ padding: 15 }}>
                    <button onClick={() => setCalend(!calend)}>{calend ? 'میلادی' : 'شمسی'}</button>
                    <BirthDayParent
                        numSh={1402}
                        numBase={1380}
                        numMi={2022}
                        numMiBase={1380}
                        placeholder="لطفا تاریخ انقضا را وارد کنید"
                        calend={calend}
                        typePassenger={props.type}
                        name="birthday"
                        setBirthdayb={(value) => {
                            props.fillPassengersData("extPasaport", props.id, value);
                        }}
                        closePopUpCalendar={managePopUpBirthdayCalendar}
                    />
                </div>

            </PopUp>

            <PopUp
                opened={state.openFuture}
                closePopUp={managePopUpFuturedayCalendar}
            >
                <div style={{ padding: 15 }}>
                    <FuturedayCalendar
                        numOfYear={10}
                        setFutureday={(value) => {
                            props.fillPassengersData("futureday", props.id, value);
                        }}
                        closePopUpCalendar={managePopUpFuturedayCalendar}
                    />
                </div>
            </PopUp>


        </div>
    );
}


const dispatchStateToProps = (dispatch) => ({
    messageBoxModify: (value) => dispatch(messageBoxModify(value)),
    accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
export default connect(null, dispatchStateToProps)(FlightPassengerForm);
