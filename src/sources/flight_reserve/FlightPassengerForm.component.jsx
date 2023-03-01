import React, { useEffect, useState } from "react";

import PrimaryTextInput from "../component/PrimaryTextInput.component";
import PrimarySelectInput from "../component/PrimarySelectInput.component";

import { moneyFormat } from "../../Utils/SimpleTasks";
import PopUp from "../component/PopUp.component";
import styles from "../../../styles/FlightPassengerForm.module.scss";
import { checkCharacter, checkNumber } from "../../Utils/SimpleTasks";
import { messageBoxModify } from "../../Redux/UI/ui.action";
import { connect } from "react-redux";
import BirthDayParent from "../calendar/BirthDayParent";
import BirthDayParentCl from "../calendar/BirthDayParentCl";


const FlightPassengerForm = (props) => {
    console.log(props);
    const [calend, setCalend] = useState(true)
    const [state, setState] = useState({
        open: false,
        extOpen: false,
    });
    useEffect(() => {

        props.pathKind == 2 && setCalend(false)

    }, [])
    useEffect(() => {
        props.pathKind == 2 && setCalend(false)
    }, [props.pathKind])

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
        passCodeErr:'',
        extPasaportErr: 'لطفا فیلد انقضا را پر کنید',
        // pasaportErr : "پاسپورت الزامی میباشد",
    })
    useEffect(()=>{
        setErr({...err,
            nationalCodeErr:props.codeErr,
            passCodeErr:props.passportCodeErr,
            extPasaportErr:props.pasenddatErr,
        })
    },[props.codeErr,props.pasenddatErr,props.passportCodeErr,props])
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
                color: false,
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
                <div className="px-0 col-lg-2 col-md-12 col-sm-12 col-12 no-padding hidden-xs">
                    <span className="no-margin font-size-14 font-bold-iransanse">
                        &nbsp;&nbsp;&nbsp;{`${props.index + 1}-`}&nbsp;
                        {getTitleByType(props.type)}
                    </span>
                    <span className="no-margin font-size-10">
                        {getSubtitleByType(props.type)}
                    </span>
                </div>
                <div className="hidden-xs col-xl-2 px-0 col-lg-2 d-flex justify-content-end mr-4 ms-5 col-md-2 col-sm-2 row-price font-size-12 p-3 me-auto py-2 px-4">
                    <span className="font-size-14 color-secondary font-bold-iransanse ">
                        {moneyFormat(props.price)}
                        &nbsp;
                    </span>
                    تومان
                </div>
                {/* shows up just for mobile ----- start*/}
                <div
                    className={` ${styles["visible-xs-passenger-form-header"]} col-12 px-1`}
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
                        className="col-6 no-padding text-left ms-5"
                        style={{ marginRight: -40 }}
                    >
                        <span className="font-size-14 color-secondary font-bold-iransanse ps-1">
                            {moneyFormat(props.price)}
                        </span>
                        <span className="font-size-12 font-bold-iransanse">تومان</span>
                    </div>
                    {props.id != 0 ? (
                        <div
                            className="col-1 no-margin no-padding corner-position"
                            style={{ position: "absolute", left: "-7px", top: "0px" }}
                        >
                            <span
                                className="delete-thumbnail"
                                onClick={() => {
                                    props.removePassenger(props.type, props.id);
                                }}
                            >
                                <svg id="Layer_1" height="18" viewBox="0 0 24 24" width="18" data-name="Layer 1"><path
                                    d="m9 12a6 6 0 1 0 -6-6 6.006 6.006 0 0 0 6 6zm0-10a4 4 0 1 1 -4 4 4 4 0 0 1 4-4zm9 17v5h-2v-5a3 3 0 0 0 -3-3h-8a3 3 0 0 0 -3 3v5h-2v-5a5.006 5.006 0 0 1 5-5h8a5.006 5.006 0 0 1 5 5zm3.414-9 2.543 2.543-1.414 1.414-2.543-2.543-2.543 2.543-1.414-1.414 2.543-2.543-2.543-2.543 1.414-1.414 2.543 2.543 2.543-2.543 1.414 1.414z" /></svg>
                            </span>
                            <span className="color-secondary error-message position-absolute top-50">&nbsp;</span>

                        </div>
                    ) : null}
                </div>
                {/* shows up just for mobile ----- end */}
                <div className={`"px-0 col-lg-12 col-md-12 col-sm-12 col-12 m-auto" ${styles["container"]}`}>
                    <div className="row justify-content-between">
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 px-0 padding-horizental-3px">
                            <div className="pb-1 mt-1">
                                <PrimaryTextInput
                                    style={{ height: "2em", border: "1px solid #eee", fontSize: 15 }}
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
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 px-0 padding-horizental-3px">
                            <div className="pb-1 mt-1">
                                <PrimaryTextInput
                                    style={{ height: "2em", border: "1px solid #eee", fontSize: 15 }}
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
                        <div className=" col-lg-1 col-md-1 col-sm-2 col-6 px-0 padding-horizental-3px mt-1">
                            <PrimarySelectInput
                                style={{ padding: "6px 0", height: "2em", paddingBottom: 3, border: "1px solid #eee" }}
                                name="nationality"
                                onChange={(e) => {
                                    props.fillPassengersData(
                                        "nationality",
                                        props.id,
                                        e.target.value
                                    );
                                    if (props.pathKind == 1 && e.target.value == 'IR') {
                                        setCalend(true)
                                    } else if (props.pathKind == 1 && e.target.value == 'other') {
                                        setCalend(false)
                                    }
                                    setErr({...err,
                                        nationalCodeErr:'',
                                        extPasaportErr:''
                                    })
                                    props.fillPassengersData(
                                        "pasno",
                                        props.id,
                                        ''
                                    );
                                    props.fillPassengersData(
                                        "code",
                                        props.id,
                                        ''
                                    );
                                }
                                }
                            >
                                <option value="IR">ایرانی</option>
                                <option value="other">غیر ایرانی</option>
                            </PrimarySelectInput>
                        </div>
                        <div className=" col-lg-1 col-md-1 col-sm-4 col-6 px-0 mt-1">
                            <PrimarySelectInput
                                style={{ height: "2em", paddingBottom: 3, border: "1px solid #eee", fontSize: 15 }}
                                name="gender"
                                onChange={(e) => {
                                    props.fillPassengersData(
                                        "gender",
                                        props.id,
                                        e.target.value
                                    );
                                }}
                            >
                                <option value="1" selected="selected">مرد</option>
                                <option value="2">زن</option>
                            </PrimarySelectInput>
                        </div>
                        <div className="col-lg-2 col-md-1 col-sm-4 col-6 px-0 padding-horizental-3px">
                            <div className="pb-1 mt-1">
                                <PrimaryTextInput
                                    style={{ height: "2em", border: "1px solid #eee", fontSize: 15 }}
                                    placeholder="تاریخ تولد"
                                    value={props.birthday}
                                    readonly="readonly"
                                    name="birthday"
                                    onClick={(e) => {
                                        errHandler(e)
                                        managePopUpBirthdayCalendar(true);
                                    }}
                                />
                            </div>
                            <span className="color-secondary error-message position-absolute">
                                {props.birthday == '' && err.birthdayErr ? props.birthdayErr : ''}
                            </span>
                        </div>
                        <div className="national-codeData col-lg-2 col-md-2 col-sm-4 col-6 px-0 padding-horizental-3px mt-1 " style={{ width: "110% !important" }}>
                            {props.pathKind == 1 && props.nationality == "IR" ?
                                <>
                                    <div className={`d-flex align-items-center ${props.pathKind == 3 ? styles["makhfi"] : ""}`} >
                                        <PrimaryTextInput
                                            style={{ height: "2em", border: "1px solid #eee", marginBottom: 3, fontSize: 15 }}
                                            name={`nationalCode`}
                                            maxlength={10}
                                            placeholder={`کد ملی`}
                                            inputMode={`numeric`}
                                            onChange={(e) => {
                                                setErr({ ...err, nationalCodeErr: '' })
                                                props.fillPassengersData(
                                                    "code",
                                                    props.id,
                                                    e.target.value
                                                );
                                            }
                                            }
                                            defaultValue={props.code}
                                        />
                                    </div>
                                    <span className="color-secondary error-message position-absolute">
                                        {err.nationalCodeErr !== "" && err.nationalCodeErr}
                                    </span>
                                </>
                                :
                                <div className={`d-flex align-items-center ${props.pathKind == 3 ? styles["makhfi"] : ""}`} >
                                    <PrimaryTextInput
                                        style={{ height: "2em", border: "1px solid #eee", marginBottom: 3, fontSize: 15 }}
                                        name={`nationalCode`}
                                        placeholder={`شماره پاسپورت`}
                                        inputMode={`text`}
                                        onChange={(e) => {
                                            props.fillPassengersData(
                                                "pasno",
                                                props.id,
                                                e.target.value
                                                );
                                            }
                                        }
                                        defaultValue={props.pasno}
                                    />
                                </div>
                            }

                            <span className="color-secondary error-message position-absolute">
                                {props.pasnoErr}
                            </span>
                        </div>

                        <div className="col-lg-2 col-md-1 col-sm-4 col-6 px-0 padding-horizental-3px mt-1">
                            <div className={`d-flex align-items-center `} >
                                <PrimaryTextInput
                                    ext={props.nationality == 'IR' && props.pathKind == 1 ? 'BEFORE' : ''}
                                    disabled={props.nationality == 'IR' && props.pathKind == 1 ? true : false}
                                    style={{ height: "2em", border: "1px solid #eee", fontSize: 15 }}
                                    placeholder={`${"انقضای پاسپورت"}`}
                                    name="futureday"
                                    inputMode={`${"text"}`}
                                    readonly="readonly"
                                    onChange={(e) => {
                                        errHandler(e);
                                        setErr({...err,extPasaportErr:''})
                                        props.fillPassengersData(
                                            "futureday",
                                            props.id,
                                            e.target.value
                                        );
                                    }}
                                    onFocus={() => {
                                        managePopUpExtPasCalendar(true);
                                    }}
                                    defaultValue={props.pasenddat}
                                    value={props.futureday}
                                />
                            </div>
                            <span className="color-secondary error-message position-absolute">
                                {err.extPasaportErr !='' ? err.extPasaportErr : ''}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="hidden-xs px-0 col-lg-1 col-md-2 col-sm-2 row-price font-size-12">
                    {props.id != 0 ? (
                        <div
                            className="hidden-xs hidden-sm corner-position"
                            style={{ position: "absolute", left: "0px", top: "0px" }}
                        >
                            <span
                                className="delete-thumbnail"
                                onClick={() => {
                                    props.removePassenger(props.type, props.id);
                                }}
                            >
                                <svg id="Layer_1" height="18" viewBox="0 0 24 24" width="18" data-name="Layer 1"><path
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
                <div style={{ padding: 15 }} class="text-center">
                    <button className="py-2 px-4" onClick={() => setCalend(!calend)}>{calend ? 'تقویم میلادی' : 'تقویم شمسی'}</button>
                    <BirthDayParentCl
                        calend={calend}
                        typePassenger={props.type}
                        setBirthdayb={(value) => {
                            props.fillPassengersData("birthday", props.id, value);
                        }}
                        closePopUpCalendar={managePopUpBirthdayCalendar}
                    />
                </div>
            </PopUp>

            <PopUp
                opened={state.extOpen}
                closePopUp={managePopUpExtPasCalendar}
            >
                <div style={{ padding: 15 }}>
                    <BirthDayParent
                        numMi={2022}
                        numMiBase={2000}
                        title="Please enter an expiration date"
                        placeholder="لطفا تاریخ انقضا را وارد کنید"
                        // calend={calend}
                        typePassenger={'ADL'}
                        type={'EXT'}
                        name="futureday"
                        setBirthdayb={(value) => {
                            props.fillPassengersData("futureday", props.id, value);
                        }}
                        closePopUpCalendar={managePopUpExtPasCalendar}
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