import React, {useEffect, useState} from "react";
import styles from "../../../../../styles/newTour/components/subComponent/PassengerForm.module.scss";
import PopUp from "./PopUp.component";
import BirthDayParentCl from "../calendar/BirthDayParentCl";
import BirthDayParent from "../calendar/BirthDayParent";
import {chdAgeStr, errStruct, errValidation, humantype} from "../../../../Utils/newTour";
import {Err} from "../NotifAlert.component";

const PassengerForm = (props) => {

    const [state, setState] = useState({
        open: false,
        extOpen: false,
    });
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
    const [latinCheck, setLatinCheck] = useState({
        name: false,
        family: false,
    });


    const findDate = (passId, reserve_id, datetype) => {
        // debugger;
        if (props.dataq?.length !== 0) {
            const findroom = props.dataq?.filter((room) => room.reserve_id === reserve_id);
            if (findroom) {
                const findPassenger = findroom[0]?.passengers.filter(
                    (passenger) => passenger.pass_id === passId
                );
                if (findPassenger && findPassenger[0]?.hasOwnProperty(datetype)) {
                    if (datetype === "birth_day") {
                        return findPassenger[0].birth_day;
                    } else if (datetype === "expired_passport") {
                        return findPassenger[0]?.expired_passport;
                    }
                } else {
                    return "";
                }
            } else {
                return "";
            }
        } else {
            return "";
        }
    };

    const [calend, setCalend] = useState(true);


    const FormDataPicker = (e, passId, type, roomid, roomTypeid, id, reserve_id,passindex,roomindex) => {
        let newrooms = [];
        const enRegEx = /[^A-Za-z0-9\s]/g;
        const digitRegEx = /^\d+$/;


                if (enRegEx.test(e.target.value)) {
                    props.dataq[roomindex].passengers[passindex]= {
                        ...props.dataq[roomindex].passengers[passindex],
                        bed_type: type === "ext" ? "extra" : "normal",
                        type: type === 'ext' ? 'adl' : type,
                        id: passId,
                        price: props.prcTypeBase(type),
                        [e.target.name]: "",
                    };
                    if (e.target.name === "name") {
                        Err("لطفا نام  را به لاتین وارد کنید");
                    } else if (e.target.name === "family") {
                        Err("لطفا نام خانوادگی را به لاتین وارد کنید");
                    }
                } else if (e.target.name === "id_code" && !digitRegEx.test(e.target.value) ) {
                    props.dataq[roomindex].passengers[passindex]= {
                        ...props.dataq[roomindex].passengers[passindex],
                        bed_type: type === "ext" ? "extra" : "normal",
                        type: type === 'ext' ? 'adl' : type,
                        id: passId,
                        price: props.prcTypeBase(type),
                        [e.target.name]: "",
                    };
                    Err("لطفا کدملی را به عدد وارد کنید");
                } else {

                    props.dataq[roomindex].passengers[passindex]= {
                        ...props.dataq[roomindex].passengers[passindex],
                        bed_type: type === "ext" ? "extra" : "normal",
                        type: type === 'ext' ? 'adl' : type,
                        id: passId,
                        price: props.prcTypeBase(type),
                        [e.target.name]: e.target.name === 'passport' ? e.target.value.toUpperCase() : e.target.value,
                    };
                    setLatinCheck({
                        ...latinCheck,
                        [e.target.name]: false,
                    });
                }



            newrooms=props.dataq
            props.setDataq(newrooms);
    };
    const Birthdate = (date, passId, type, roomid, roomTypeid, datetype, id, reserve_id,passindex,roomindex) => {
        let newrooms = []
                props.dataq[roomindex].passengers[passindex]= {
                    ...props.dataq[roomindex].passengers[passindex],
                    bed_type: type === "ext" ? "extra" : "normal",
                    type: type === 'ext' ? 'adl' : type,
                    id: passId,
                    price: props.prcTypeBase(type),
                    [datetype]: date,
                };
            newrooms=props.dataq

            props.setDataq(newrooms);

    };

    const validation = (passId, id, inputname) => {
        const findroom = props.dataq.filter((data) => data.id === id);
        if (findroom.length > 0) {
            const findPassInput = findroom[0].passengers.filter(
                (passenger) => passenger.id == passId
            );

            if (findPassInput[0]?.[inputname]?.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };


    const indexidfinder = (passId, reserve_id, name) => {
        const findroom = props.dataq?.filter((data) => data?.reserve_id === reserve_id);
        if (findroom?.length > 0) {
            const findPassInput = findroom[0].passengers.filter(
                (passenger) => passenger.pass_id == passId
            );
            return findPassInput[0]?.[name];
        }
    };



    return (
        <>
            {
                <div className={styles["container"]}>
                    <div className={styles["personDet"]}>
                        <label className={styles["label-fix-gray"]}>
                            {humantype(props.type+props.chd_type)}
                            <small>
                                {" "}
                                {humantype(props.type+props.chd_type) === "بزرگسال"
                                    ? "(12 سال به بالا)"
                                    : humantype(props.type+props.chd_type) === "کودک با تخت"
                                        ? chdAgeStr(props.hotelDets.data.hotel?.with_bed_child_ages[0],props.hotelDets.data.hotel?.with_bed_child_ages[1])
                                        :humantype(props.type+props.chd_type) === "کودک بدون تخت"
                                        ? chdAgeStr(props.hotelDets.data.hotel?.no_bed_child_ages[0],props.hotelDets.data.hotel?.no_bed_child_ages[1])
                                        : humantype(props.type+props.chd_type) === "نوزاد"
                                            ? "(زیر 2 سال)"
                                            : "(12 سال به بالا)"}
                            </small>
                        </label>
                        <div className={styles["price-fix"]}>
                            <p>{props.prc}</p>
                            <small>تومان</small>
                        </div>
                    </div>
                    <form
                        // key={index}
                        className={
                            indexidfinder(props.passId, props.reserve_id, "nationality")==='1'
                              ?
                            styles["form-container2"]
                            : styles["form-container"]
                        }

                    >
                        <div className={styles["item-form"]}>
                            {/* "inp-form mt-2" */}
                            <div className={styles["inp-form"]}>
                                <select
                                    id=""

                                    name="gender"
                                    onChange={(e) =>
                                        FormDataPicker(
                                            e,
                                            props.passId,
                                            props.type,
                                            props.roomid,
                                            props.room_type_id,
                                            props.id,
                                            props.reserve_id,
                                            props.passIndex,
                                            props.roomIndex
                                        )
                                    }
                                    defaultChecked="1"
                                >
                                    <option value="" disabled selected>
                                        جنسیت
                                    </option>
                                    <option value="1">اقا</option>
                                    <option value="0">خانم</option>
                                </select>
                            </div>
                            {props.Errs?.errors &&
                            errValidation(
                                props.Errs?.errors,
                                errStruct(props.roomIndex, props.passIndex, "gender")
                            ) &&
                            !validation(props.passId, props.id, "gender") ? (
                                <small>
                                    {
                                        props.Errs?.errors[
                                            errStruct(props.roomIndex, props.passIndex, "gender")
                                            ]
                                    }
                                </small>
                            ) : null}
                        </div>
                        <div className={styles["item-form"]}>
                            <div className={styles["inp-form"]}>
                                <input
                                    type="text"
                                    placeholder="نام (لاتین)"
                                    value={indexidfinder(props.passId, props.reserve_id, "name")}
                                    required
                                    defaultValue=""
                                    maxLength="50"
                                    onChange={(e) =>
                                        FormDataPicker(
                                            e,
                                            props.passId,
                                            props.type,
                                            props.roomid,
                                            props.room_type_id,
                                            props.id,
                                            props.reserve_id,
                                            props.passIndex,
                                            props.roomIndex
                                        )
                                    }
                                    name="name"
                                />
                            </div>

                            {props.Errs?.errors &&
                            errValidation(
                                props.Errs?.errors,
                                errStruct(props.roomIndex, props.passIndex, "name")
                            ) &&
                            !validation(props.passId, props.id, "name") ? (
                                <small style={{marginTop: "5px"}}>
                                    {
                                        props.Errs?.errors[
                                            errStruct(props.roomIndex, props.passIndex, "name")
                                            ]
                                    }
                                </small>
                            ) : null}

                            {/* {latinCheck.name === true ? (
                  <small style={{ marginTop: "5px" }}>
                    لطفا نام را به لاتین وارد کنید
                  </small>
                ) : null} */}
                        </div>

                        <div className={styles["item-form"]}>
                            <div className={styles["inp-form"]}>
                                <input
                                    type="text"
                                    placeholder="نام خانوادگی (لاتین)"
                                    value={indexidfinder(props.passId, props.reserve_id, "family")}
                                    onChange={(e) =>
                                        FormDataPicker(
                                            e,
                                            props.passId,
                                            props.type,
                                            props.roomid,
                                            props.room_type_id,
                                            props.id,
                                            props.reserve_id,
                                            props.passIndex,
                                            props.roomIndex
                                        )
                                    }
                                    name="family"
                                    maxLength="50"
                                />
                            </div>

                            {props.Errs?.errors &&
                            errValidation(
                                props.Errs?.errors,
                                errStruct(props.roomIndex, props.passIndex, "family")
                            ) &&
                            !validation(props.passId, props.id, "family") ? (
                                <small style={{marginTop: "5px"}}>
                                    {
                                        props.Errs?.errors[
                                            errStruct(props.roomIndex, props.passIndex, "family")
                                            ]
                                    }
                                </small>
                            ) : null}

                            {/* {latinCheck.family === true ? (
                  <small style={{ marginTop: "5px" }}>
                    لطفا نام خانوادگی را به لاتین وارد کنید
                  </small>
                ) : null} */}
                        </div>

                        <div className={styles["item-form"]}>
                            {/* "inp-form mt-2" */}
                            <div className={styles["inp-form"]}>
                                <select
                                    // {...form.register("nationality")}

                                    id=""
                                    onChange={(e) =>
                                        FormDataPicker(
                                            e,
                                            props.passId,
                                            props.type,
                                            props.roomid,
                                            props.room_type_id,
                                            props.id,
                                            props.reserve_id,
                                            props.passIndex,
                                            props.roomIndex
                                        )
                                    }
                                    name="nationality"
                                >
                                    <option value="" disabled selected>
                                        ملیت
                                    </option>
                                    <option value="1">ایرانی</option>
                                    <option value="0">غیر ایرانی</option>
                                </select>
                            </div>
                            {props.Errs?.errors &&
                            errValidation(
                                props.Errs?.errors,
                                errStruct(props.roomIndex, props.passIndex, "nationality")
                            ) &&
                            !validation(props.passId, props.id, "nationality") ? (
                                <small>
                                    {
                                        props.Errs?.errors[
                                            errStruct(props.roomIndex, props.passIndex, "nationality")
                                            ]
                                    }
                                </small>
                            ) : null}
                        </div>

                        {/* "item-form w-15" */}

                        {indexidfinder(props.passId, props.reserve_id, "nationality")==='1' && <div className={styles["item-form"]}>
                            <div className={styles["inp-form"]}>
                                <input
                                    // {...form.register("id_code")}
                                    type="text"
                                    placeholder="کدملی"
                                    value={indexidfinder(props.passId, props.reserve_id, "id_code")}
                                    maxLength="10"
                                    onChange={(e) =>
                                        FormDataPicker(
                                            e,
                                            props.passId,
                                            props.type,
                                            props.roomid,
                                            props.room_type_id,
                                            props.id,
                                            props.reserve_id,
                                            props.passIndex,
                                            props.roomIndex
                                        )
                                    }
                                    name="id_code"
                                    inputMode='numeric'
                                />
                            </div>
                            {props.Errs?.errors &&
                            errValidation(
                                props.Errs?.errors,
                                errStruct(props.roomIndex, props.passIndex, "id_code")
                            ) &&
                            !validation(props.passId, props.id, "id_code") ? (
                                <small>
                                    {
                                        props.Errs?.errors[
                                            errStruct(props.roomIndex, props.passIndex, "id_code")
                                            ]
                                    }
                                </small>
                            ) : null}
                        </div>}
                        <div className={styles["item-form"]}>
                            <div className={styles["inp-form"]}>
                                <input
                                    onClick={() => {
                                        managePopUpBirthdayCalendar(true);
                                        // setCurrentIndex(index);
                                    }}
                                    type="text"
                                    placeholder="تاریخ تولد"
                                    value={findDate(props.passId,props?.reserve_id, "birth_day")?.replace(
                                        /-/g,
                                        "/"
                                    )}
                                    name="birth_day"
                                    readOnly
                                    // disabled={true}
                                />
                            </div>
                            {props.Errs?.errors &&
                            errValidation(
                                props.Errs?.errors,
                                errStruct(props.roomIndex, props.passIndex, "birth_day")
                            ) &&
                            !validation(props.passId, props.id, "birth_day") ? (
                                <small>
                                    {
                                        props.Errs?.errors[
                                            errStruct(props.roomIndex, props.passIndex, "birth_day")
                                            ]
                                    }
                                </small>
                            ) : null}
                        </div>
                        {/* "item-form w-10" */}
                        <div className={styles["item-form"]}>
                            <div className={styles["inp-form"]}>
                                <input
                                    type="text"
                                    placeholder="شماره پاسپورت"
                                    value={indexidfinder(props.passId, props.reserve_id, "passport")}
                                    maxLength="9"
                                    onChange={(e) =>
                                        FormDataPicker(
                                            e,
                                            props.passId,
                                            props.type,
                                            props.roomId,
                                            props.roomTypeId,
                                            props.id,
                                            props.reserve_id,
                                            props.passIndex,
                                            props.roomIndex
                                        )
                                    }
                                    name="passport"
                                />
                            </div>
                            {props.Errs?.errors &&
                            errValidation(
                                props.Errs?.errors,
                                errStruct(props.roomIndex, props.passIndex, "passport")
                            ) &&
                            !validation(props.passId, props.id, "passport") ? (
                                <small>
                                    {
                                        props.Errs?.errors[
                                            errStruct(props.roomIndex, props.passIndex, "passport")
                                            ]
                                    }
                                </small>
                            ) : null}
                        </div>
                        {/* "item-form w-15" */}
                        <div className={styles["item-form"]}>
                            <div className={styles["inp-form"]}>
                                <input
                                    type="text"
                                    // {...form.register("expired_passport")}
                                    placeholder="تاریخ انقضا پاسپورت"
                                    onChange={(e) =>
                                        FormDataPicker(
                                            e,
                                            props.passId,
                                            props.type,
                                            props.roomId,
                                            props.roomTypeId,
                                            props.id,
                                            props.reserve_id,
                                            props.passIndex,
                                            props.roomIndex
                                        )
                                    }
                                    name="expired_passport"
                                    onClick={() => {
                                        managePopUpExtPasCalendar(true);
                                        // setCurrentIndex(index);
                                    }}
                                    value={findDate(
                                        props.passId,
                                        props?.reserve_id,
                                        "expired_passport"
                                    )?.replace(/-/g, "/")}
                                    readOnly
                                />
                            </div>
                            {props.Errs?.errors &&
                            errValidation(
                                props.Errs?.errors,
                                errStruct(props.roomIndex, props.passIndex, "expired_passport")
                            ) &&
                            !validation(props.passId, props.id, "expired_passport") ? (
                                <small>فیلد تاریخ انقضا پاسپورت الزامی است</small>
                            ) : null}
                        </div>

                        <PopUp opened={state.open} closePopUp={managePopUpBirthdayCalendar}>
                            <div style={{padding: 15}} class="text-center">
                                <button
                                    className="py-2 px-4"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setCalend(!calend)
                                    }}
                                    style={{border: '2px solid #e20000', borderRadius: '20px'}}
                                >
                                    {calend ? "تبدیل تقویم به میلادی" : "تبدیل تقویم به شمسی"}
                                </button>
                                <BirthDayParentCl
                                    calend={calend}
                                    typePassenger={
                                        props.type === "ext" ? "ADL" : props.type?.toUpperCase()
                                    }
                                    closePopUpCalendar={managePopUpBirthdayCalendar}
                                    roomInfo={{
                                        roomId: props.roomid,
                                        roomTypeId: props.room_type_id,
                                        type: props.type,
                                        chdType:props?.chd_type,
                                        passId: props.passId,
                                        id: props.id,
                                        reserve_id: props.reserve_id,
                                        checkin:props.hotelDets.data.hotel.checkin,
                                        chdages:{
                                            withbed:props.hotelDets.data.hotel?.with_bed_child_ages,
                                            nobed:props.hotelDets.data.hotel?.no_bed_child_ages
                                        },
                                        passindex:props.passIndex,
                                        roomindex:props.roomIndex
                                    }}
                                    Birthdate={(
                                        date,
                                        passId,
                                        type,
                                        roomid,
                                        roomTypeid,
                                        datetype,
                                        id,
                                        reserve_id,passindex,roomindex
                                    ) =>
                                        Birthdate(
                                            date,
                                            passId,
                                            type,
                                            roomid,
                                            roomTypeid,
                                            datetype,
                                            id,
                                            reserve_id,passindex,roomindex
                                        )
                                    }
                                />
                            </div>
                        </PopUp>

                        <PopUp
                            opened={state.extOpen}
                            closePopUp={managePopUpExtPasCalendar}
                        >
                            <div style={{padding: 15}}>
                                <div style={{display:'flex',justifyContent:'center'}}>

                                <button
                                    className="py-2 px-4"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setCalend(!calend)
                                    }}
                                    style={{border: '2px solid #e20000', borderRadius: '20px'}}
                                >
                                    {calend ? "تبدیل تقویم به میلادی" : "تبدیل تقویم به شمسی"}
                                </button>
                                </div>
                                <BirthDayParent
                                    numMi={2022}
                                    numMiBase={2000}
                                    title="لطفا تاریخ انقضا را وارد کنید"
                                    placeholder="لطفا تاریخ انقضا را وارد کنید"
                                    calend={calend}
                                    typePassenger={"ADL"}
                                    type={"EXT"}
                                    name="futureday"
                                    //   setBirthdayb={(value) => {
                                    //     props.fillPassengersData("futureday", props.id, value);
                                    //   }}
                                    closePopUpCalendar={managePopUpExtPasCalendar}
                                    roomInfo={{
                                        roomId: props.roomid,
                                        roomTypeId: props.room_type_id,
                                        type: props.type,
                                        passId: props.passId,
                                        id: props.id,
                                        reserve_id: props.reserve_id,
                                        passindex:props.passIndex,
                                        roomindex:props.roomIndex,

                                    }}
                                    Birthdate={(
                                        date,
                                        passId,
                                        type,
                                        roomid,
                                        roomTypeid,
                                        datetype,
                                        id,
                                        reserve_id,
                                        passindex,roomindex
                                    ) =>
                                        Birthdate(
                                            date,
                                            passId,
                                            type,
                                            roomid,
                                            roomTypeid,
                                            datetype,
                                            id,
                                            reserve_id
                                            ,passindex,roomindex
                                        )
                                    }
                                />
                            </div>
                        </PopUp>
                    </form>
                </div>
            }
        </>
    );
};

export default PassengerForm;
