import React, {useEffect, useState} from 'react';
import styles from "../../../../styles/newTour/components/UpdatePassenger.module.scss";
import {errStruct, errValidation, humantype, numberWithCommas} from "../../../Utils/newTour";
import PopUp from "./subComponents/PopUp.component";
import BirthDayParentCl from "./calendar/BirthDayParentCl";
import BirthDayParent from "./calendar/BirthDayParent";
import {Err} from "./NotifAlert.component";
import PrimaryButton from "../../../sources/component/PrimaryButton.component";
// import PassengerForm from "./subComponents/PassengerForm.component";
// import {numberWithCommas} from "../../../Utils/newTour";

const UpdatePassenger = (props) => {
    const [formdata, setFormData] = useState([])
    const [latinCheck, setLatinCheck] = useState({
        name: false,
        family: false,
    });
    const [state, setState] = useState({
        open: false,
        extOpen: false,
    });
    const [calend, setCalend] = useState(true);
    const [currentType, setCurrenttype] = useState('adl');
    const[currentPassId,setCrrentPassId]=useState('')
    useEffect(() => {
        setFormData(props.targetedRoom.details.passengers)
    }, [props.targetedRoom.details.passengers])

    useEffect(() => {
        console.log('sad324456', formdata)
    }, [formdata])
    const indexidfinder = (passId, name) => {

        const findPassInput = formdata.filter(
            (passenger) => passenger.id == passId
        );
        return findPassInput[0]?.[name];

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


    const FormDataPicker = (e, passId) => {
        // debugger;
        const enRegEx = /[^A-Za-z0-9\s]/g;
        const findpassenger = formdata.filter(
            (passenger) => passenger.id === passId
        );
        let newpassengerArr = [];
        if (findpassenger) {
            const filteredpassengers = formdata.filter(
                (passenger) => passenger.id !== passId
            );
            if (enRegEx.test(e.target.value)) {
                newpassengerArr.push(...filteredpassengers, {
                    ...findpassenger[0],
                    [e.target.name]: "",
                });
                if (e.target.name === "name") {
                    Err("لطفا نام  را به لاتین وارد کنید");
                } else if (e.target.name === "family") {
                    Err("لطفا نام خانوادگی را به لاتین وارد کنید");
                }
            } else {
                newpassengerArr.push(...filteredpassengers, {
                    ...findpassenger[0],
                    [e.target.name]: e.target.name === 'passport' ? e.target.value.toUpperCase() : e.target.value,
                });
                setLatinCheck({
                    ...latinCheck,
                    [e.target.name]: false,
                });

            }
        }


        setFormData(newpassengerArr);

    };


    const findDate = (passId, datetype) => {
        // debugger;
        const findPassenger = formdata.filter(
            (passenger) => passenger.id === passId
        );
        if (findPassenger && findPassenger[0]?.hasOwnProperty(datetype)) {
            if (datetype === "birth_day") {
                return findPassenger[0].birth_day;
            } else if (datetype === "expired_passport") {
                return findPassenger[0].expired_passport;
            }
        } else {
            return "";
        }
    }
    const Birthdate = (date, passId, type, roomid, roomTypeid, datetype) => {
        // debugger
            const findpassenger = formdata.filter(
                (passenger) => passenger.id === passId
            );
            let newpassengerArr = [];
            if (findpassenger) {
                const filteredpassengers = formdata.filter(
                    (passenger) => passenger.id !== passId
                );

                newpassengerArr.push(...filteredpassengers, {
                    ...findpassenger[0],
                    [datetype]: date,
                });
            }

            setFormData(newpassengerArr);

    };

    const validation = (passId, inputname) => {

        const findPassInput = formdata.filter(
            (passenger) => passenger.id == passId
        );

        if (findPassInput[0]?.[inputname]?.length > 0) {
            return true;
        } else {
            return false;
        }

    };
    return (
        <>

            <div className={styles["box-room"]}>
                <div
                    className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
                >
                    <div className={styles["box-room-Det-name"]}>
                        <p>{props.targetedRoom.room.room_type}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div
                            className={`${styles["set-info-passengers"]} ${styles["posi-relative"]}`}
                        >
                            {/* <label className={styles["label-fix"]}>سرپرست</label> */}
                            <div>
                                {props.targetedRoom.details.passengers.map((pass ,passIndex) => {
                                    return (
                                        <div className={styles['container']}>
                                            <div className={styles["personDet"]}>
                                                <label className={styles["label-fix-gray"]}>
                                                    {humantype(pass.type)}
                                                    <small>
                                                        {humantype(pass.type) === "بزرگسال"
                                                            ? "(12 سال به بالا)"
                                                            : humantype(pass.type) === "کودک"
                                                                ? "(2 تا 12 سال)"
                                                                : humantype(pass.type) === "نوزاد"
                                                                    ? "(زیر 2 سال)"
                                                                    : "(12 سال به بالا)"}
                                                    </small>
                                                </label>
                                                <div className={styles["price-fix"]}>
                                                    <p>{numberWithCommas(pass.price)}</p>
                                                    <small>تومان</small>
                                                </div>
                                            </div>
                                            <form
                                                // key={index}
                                                className={
                                                    props.hotelDets?.hotel?.is_domestic
                                                        ? styles["form-container"]
                                                        : styles["form-container2"]
                                                }
                                                // onClick={() => {
                                                //   console.log(index);
                                                // }}
                                            >
                                                <div className={styles["item-form"]}>
                                                    {/* "inp-form mt-2" */}
                                                    <div className={styles["inp-form"]}>
                                                        <select
                                                            value={indexidfinder(pass.id, "gender")}
                                                            id=""
                                                            // {...form.register("gender")}
                                                            name="gender"
                                                            onChange={(e) =>
                                                                FormDataPicker(
                                                                    e,
                                                                    pass.id,
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
                                                        errStruct(0, passIndex, "gender")
                                                    ) &&
                                                    !validation( pass.id , "gender") ? (
                                                        <small>
                                                            {
                                                                props.Errs?.errors[
                                                                    errStruct(0, passIndex, "gender")
                                                                    ]
                                                            }
                                                        </small>
                                                    ) : null}
                                                </div>
                                                {/* align-items-center w-18 */}
                                                <div className={styles["item-form"]}>
                                                    <div className={styles["inp-form"]}>
                                                        <input
                                                            type="text"
                                                            placeholder="نام (لاتین)"
                                                            value={indexidfinder(pass.id, "name")}
                                                            required
                                                            defaultValue=""
                                                            maxLength="50"
                                                            onChange={(e) =>
                                                                FormDataPicker(
                                                                    e,
                                                                    pass.id,
                                                                )
                                                            }
                                                            name="name"
                                                        />
                                                    </div>

                                                    {props.Errs?.errors &&
                                                    errValidation(
                                                        props.Errs?.errors,
                                                        errStruct(0, passIndex, "name")
                                                    ) &&
                                                    !validation( pass.id , "name") ? (
                                                        <small>
                                                            {
                                                                props.Errs?.errors[
                                                                    errStruct(0, passIndex, "name")
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
                                                            value={indexidfinder(pass.id, "family")}
                                                            // value={indexidfinder(props.passId, props.id, "family")}
                                                            onChange={(e) =>
                                                                FormDataPicker(
                                                                    e,
                                                                    pass.id,
                                                                )
                                                            }
                                                            name="family"
                                                            maxLength="50"
                                                        />
                                                    </div>

                                                    {props.Errs?.errors &&
                                                    errValidation(
                                                        props.Errs?.errors,
                                                        errStruct(0, passIndex, "family")
                                                    ) &&
                                                    !validation( pass.id , "family") ? (
                                                        <small>
                                                            {
                                                                props.Errs?.errors[
                                                                    errStruct(0, passIndex, "family")
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
                                                            value={indexidfinder(pass.id, "nationality")}
                                                            id=""
                                                            onChange={(e) =>
                                                                FormDataPicker(
                                                                    e,
                                                                    pass.id,

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
                                                        errStruct(0, passIndex, "nationality")
                                                    ) &&
                                                    !validation( pass.id , "nationality") ? (
                                                        <small>
                                                            {
                                                                props.Errs?.errors[
                                                                    errStruct(0, passIndex, "nationality")
                                                                    ]
                                                            }
                                                        </small>
                                                    ) : null}
                                                </div>

                                                {/* "item-form w-15" */}

                                                {/*{props.hotelDets?.hotels?.is_domestic ? (*/}
                                                {/*    <div className={styles["item-form"]}>*/}
                                                {/*        <div className={styles["inp-form"]}>*/}
                                                {/*            <input*/}
                                                {/*                // {...form.register("id_code")}*/}
                                                {/*                type="text"*/}
                                                {/*                placeholder="کدملی"*/}
                                                {/*                maxLength="10"*/}
                                                {/*                onChange={(e) =>*/}
                                                {/*                    FormDataPicker(*/}
                                                {/*                        e,*/}
                                                {/*                        props.passId,*/}
                                                {/*                        props.type,*/}
                                                {/*                        props.roomid,*/}
                                                {/*                        props.room_type_id,*/}
                                                {/*                        props.id,*/}
                                                {/*                        props.reserve_id*/}
                                                {/*                    )*/}
                                                {/*                }*/}
                                                {/*                name="id_code"*/}
                                                {/*            />*/}
                                                {/*        </div>*/}
                                                {/*        {props.Errs?.errors &&*/}
                                                {/*        errValidation(*/}
                                                {/*            props.Errs?.errors,*/}
                                                {/*            errStruct(props.roomIndex, props.passIndex, "id_code")*/}
                                                {/*        ) &&*/}
                                                {/*        !validation(props.passId, props.id, "id_code") ? (*/}
                                                {/*            <small>*/}
                                                {/*                {*/}
                                                {/*                    props.Errs?.errors[*/}
                                                {/*                        errStruct(props.roomIndex, props.passIndex, "id_code")*/}
                                                {/*                        ]*/}
                                                {/*                }*/}
                                                {/*            </small>*/}
                                                {/*        ) : null}*/}
                                                {/*    </div>*/}
                                                {/*) : null}*/}

                                                {/* ) : null} */}

                                                {/* "item-form w-15" */}
                                                <div className={styles["item-form"]}>
                                                    <div className={styles["inp-form"]}>
                                                        <input
                                                            onClick={() => {
                                                                managePopUpBirthdayCalendar(true);
                                                                setCurrenttype(pass.type)
                                                                setCrrentPassId(pass.id)
                                                                console.log(pass.type)
                                                            }}
                                                            type="text"
                                                            placeholder="تاریخ تولد"
                                                            value={findDate(pass.id, "birth_day")?.replace(
                                                                /-/g,
                                                                "/"
                                                            )}
                                                            name="birth_day"
                                                            readOnly
                                                        />
                                                    </div>
                                                    {props.Errs?.errors &&
                                                    errValidation(
                                                        props.Errs?.errors,
                                                        errStruct(0, passIndex, "birth_day")
                                                    ) &&
                                                    !validation( pass.id , "birth_day") ? (
                                                        <small>
                                                            {
                                                                props.Errs?.errors[
                                                                    errStruct(0, passIndex, "birth_day")
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
                                                            value={indexidfinder(pass.id, "passport")}
                                                            maxLength="9"
                                                            onChange={(e) =>
                                                                FormDataPicker(
                                                                    e,
                                                                    pass.id,
                                                                )
                                                            }
                                                            name="passport"
                                                        />
                                                    </div>
                                                    {props.Errs?.errors &&
                                                    errValidation(
                                                        props.Errs?.errors,
                                                        errStruct(0, passIndex, "passport")
                                                    ) &&
                                                    !validation( pass.id , "passport") ? (
                                                        <small>
                                                            {
                                                                props.Errs?.errors[
                                                                    errStruct(0, passIndex, "passport")
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
                                                            onClick={() => {
                                                                managePopUpExtPasCalendar(true);
                                                                setCurrenttype(pass.type)
                                                                setCrrentPassId(pass.id)
                                                                // setCurrentIndex(index);
                                                            }}
                                                            name="expired_passport"
                                                            value={findDate(
                                                                pass.id,
                                                                "expired_passport"
                                                            )?.replace(/-/g, "/")}
                                                            readOnly
                                                        />
                                                    </div>
                                                    {props.Errs?.errors &&
                                                    errValidation(
                                                        props.Errs?.errors,
                                                        errStruct(0, passIndex, "expired_passport")
                                                    ) &&
                                                    !validation( pass.id , "expired_passport") ? (
                                                        <small>فیلد تاریخ انقضا پاسپورت الزامی است</small>
                                                    ) : null}

                                                </div>

                                                <PopUp opened={state.open} closePopUp={managePopUpBirthdayCalendar}>
                                                    <div style={{ padding: 15 }} class="text-center">
                                                        <button
                                                            className="py-2 px-4"
                                                            onClick={() =>  setCalend(!calend)}
                                                        >
                                                            {calend ? "تقویم میلادی" : "تقویم شمسی"}
                                                        </button>
                                                        <BirthDayParentCl
                                                            calend={calend}
                                                            typePassenger={
                                                                currentType === "ext" ? "ADL" : currentType?.toUpperCase()
                                                            }
                                                            closePopUpCalendar={managePopUpBirthdayCalendar}
                                                            roomInfo={{
                                                                roomId: null,
                                                                roomTypeId: null,
                                                                type: null,
                                                                passId: currentPassId,
                                                                id: null,
                                                                reserve_id:null
                                                                // index: currentindex,
                                                            }}
                                                            Birthdate={(
                                                                date,
                                                                passId,
                                                                type,
                                                                roomid,
                                                                roomTypeid,
                                                                datetype,
                                                                id,
                                                                reserve_id
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
                                                                )
                                                            }
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
                                                            typePassenger={"ADL"}
                                                            type={"EXT"}
                                                            name="futureday"
                                                            //   setBirthdayb={(value) => {
                                                            //     props.fillPassengersData("futureday", props.id, value);
                                                            //   }}
                                                            closePopUpCalendar={managePopUpExtPasCalendar}
                                                            roomInfo={{
                                                                roomId: null,
                                                                roomTypeId: null,
                                                                type: null,
                                                                passId: currentPassId,
                                                                id: null,
                                                                reserve_id:null
                                                            }}
                                                            Birthdate={(
                                                                date,
                                                                passId,
                                                                type,
                                                                roomid,
                                                                roomTypeid,
                                                                datetype,
                                                                id,
                                                                reserve_id
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
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </PopUp>
                                            </form>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: "100%", display: 'flex', justifyContent: 'center'}}>

                <PrimaryButton onClick={()=>props.EditClickHandler(formdata)} style={{height: "52px", marginTop: "15px", borderRadius: "5px",width:'20%'}}>ویرایش </PrimaryButton>
            {/*<button style={{marginTop: '1rem'}} onClick={()=>props.EditClickHandler(formdata)}>ویرایش</button>*/}
            </div>
        </>
    );
};

export default UpdatePassenger;