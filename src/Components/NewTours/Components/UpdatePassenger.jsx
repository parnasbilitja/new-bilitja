import React from 'react';
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
import PassengerForm from "./subComponents/PassengerForm.component";
import {errStruct, errValidation, humantype, numberWithCommas} from "../../../Utils/newTour";
import PopUp from "./subComponents/PopUp.component";
import BirthDayParentCl from "./calendar/BirthDayParentCl";
import BirthDayParent from "./calendar/BirthDayParent";

const UpdatePassenger = () => {
    return (
        <>
            <div className={styles["box-room"]}>
                <div
                    className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
                >
                    <div className={styles["box-room-Det-name"]}>
                        <p>{props?.roomName}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div
                            className={`${styles["set-info-passengers"]} ${styles["posi-relative"]}`}
                        >
                            {/* <label className={styles["label-fix"]}>سرپرست</label> */}
                            <div>
                                {props.room.passengers?.map((passenger, passindex) => {
                                    return (
                                        <>
                                            {
                                                <div className={styles["container"]}>
                                                    <div className={styles["personDet"]}>
                                                        <label className={styles["label-fix-gray"]}>
                                                            {/*{humantype(props.type)}*/}
                                                            {/*<small>*/}
                                                            {/*    {" "}*/}
                                                            {/*    {humantype(props.type) === "بزرگسال"*/}
                                                            {/*        ? "(12 سال به بالا)"*/}
                                                            {/*        : humantype(props.type) === "کودک"*/}
                                                            {/*            ? "(2 تا 12 سال)"*/}
                                                            {/*            : humantype(props.type) === "نوزاد"*/}
                                                            {/*                ? "(زیر 2 سال)"*/}
                                                            {/*                : "(12 سال به بالا)"}*/}
                                                            {/*</small>*/}
                                                        </label>
                                                        <div className={styles["price-fix"]}>
                                                            {/*<p>{props.prc}</p>*/}
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
                                                                    id=""
                                                                    // {...form.register("gender")}
                                                                    name="gender"
                                                                    // onChange={(e) =>
                                                                    //     FormDataPicker(
                                                                    //         e,
                                                                    //         props.passId,
                                                                    //         props.type,
                                                                    //         props.roomid,
                                                                    //         props.room_type_id,
                                                                    //         props.id,
                                                                    //         props.reserve_id
                                                                    //     )
                                                                    // }
                                                                    defaultChecked="1"
                                                                >
                                                                    <option value="" disabled selected>
                                                                        جنسیت
                                                                    </option>
                                                                    <option value="1">اقا</option>
                                                                    <option value="0">خانم</option>
                                                                </select>
                                                            </div>
                                                            {/*{props.Errs?.errors &&*/}
                                                            {/*errValidation(*/}
                                                            {/*    props.Errs?.errors,*/}
                                                            {/*    errStruct(props.roomIndex, props.passIndex, "gender")*/}
                                                            {/*) &&*/}
                                                            {/*!validation(props.passId, props.id, "gender") ? (*/}
                                                            {/*    <small>*/}
                                                            {/*        {*/}
                                                            {/*            props.Errs?.errors[*/}
                                                            {/*                errStruct(props.roomIndex, props.passIndex, "gender")*/}
                                                            {/*                ]*/}
                                                            {/*        }*/}
                                                            {/*    </small>*/}
                                                            {/*) : null}*/}
                                                        </div>
                                                        {/* align-items-center w-18 */}
                                                        <div className={styles["item-form"]}>
                                                            <div className={styles["inp-form"]}>
                                                                <input
                                                                    type="text"
                                                                    placeholder="نام (لاتین)"
                                                                    // value={indexidfinder(props.passId, props.id, "name")}
                                                                    required
                                                                    defaultValue=""
                                                                    maxLength="50"

                                                                    // onChange={(e) =>
                                                                    //     FormDataPicker(
                                                                    //         e,
                                                                    //         props.passId,
                                                                    //         props.type,
                                                                    //         props.roomid,
                                                                    //         props.room_type_id,
                                                                    //         props.id,
                                                                    //         props.reserve_id
                                                                    //     )
                                                                    // }
                                                                    name="name"
                                                                />
                                                            </div>

                                                            {/*{props.Errs?.errors &&*/}
                                                            {/*errValidation(*/}
                                                            {/*    props.Errs?.errors,*/}
                                                            {/*    errStruct(props.roomIndex, props.passIndex, "name")*/}
                                                            {/*) &&*/}
                                                            {/*!validation(props.passId, props.id, "name") ? (*/}
                                                            {/*    <small style={{ marginTop: "5px" }}>*/}
                                                            {/*        {*/}
                                                            {/*            props.Errs?.errors[*/}
                                                            {/*                errStruct(props.roomIndex, props.passIndex, "name")*/}
                                                            {/*                ]*/}
                                                            {/*        }*/}
                                                            {/*    </small>*/}
                                                            {/*) : null}*/}

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
                                                                    // value={indexidfinder(props.passId, props.id, "family")}
                                                                    // onChange={(e) =>
                                                                    //     FormDataPicker(
                                                                    //         e,
                                                                    //         props.passId,
                                                                    //         props.type,
                                                                    //         props.roomid,
                                                                    //         props.room_type_id,
                                                                    //         props.id,
                                                                    //         props.reserve_id
                                                                    //     )
                                                                    // }
                                                                    name="family"
                                                                    maxLength="50"
                                                                />
                                                            </div>

                                                            {/*{props.Errs?.errors &&*/}
                                                            {/*errValidation(*/}
                                                            {/*    props.Errs?.errors,*/}
                                                            {/*    errStruct(props.roomIndex, props.passIndex, "family")*/}
                                                            {/*) &&*/}
                                                            {/*!validation(props.passId, props.id, "family") ? (*/}
                                                            {/*    <small style={{ marginTop: "5px" }}>*/}
                                                            {/*        {*/}
                                                            {/*            props.Errs?.errors[*/}
                                                            {/*                errStruct(props.roomIndex, props.passIndex, "family")*/}
                                                            {/*                ]*/}
                                                            {/*        }*/}
                                                            {/*    </small>*/}
                                                            {/*) : null}*/}

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
                                                                    // onChange={(e) =>
                                                                    //     FormDataPicker(
                                                                    //         e,
                                                                    //         props.passId,
                                                                    //         props.type,
                                                                    //         props.roomid,
                                                                    //         props.room_type_id,
                                                                    //         props.id,
                                                                    //         props.reserve_id
                                                                    //     )
                                                                    // }
                                                                    name="nationality"
                                                                >
                                                                    <option value="" disabled selected>
                                                                        ملیت
                                                                    </option>
                                                                    <option value="1">ایرانی</option>
                                                                    <option value="0">غیر ایرانی</option>
                                                                </select>
                                                            </div>
                                                            {/*{props.Errs?.errors &&*/}
                                                            {/*errValidation(*/}
                                                            {/*    props.Errs?.errors,*/}
                                                            {/*    errStruct(props.roomIndex, props.passIndex, "nationality")*/}
                                                            {/*) &&*/}
                                                            {/*!validation(props.passId, props.id, "nationality") ? (*/}
                                                            {/*    <small>*/}
                                                            {/*        {*/}
                                                            {/*            props.Errs?.errors[*/}
                                                            {/*                errStruct(props.roomIndex, props.passIndex, "nationality")*/}
                                                            {/*                ]*/}
                                                            {/*        }*/}
                                                            {/*    </small>*/}
                                                            {/*) : null}*/}
                                                        </div>

                                                        {/* "item-form w-15" */}

                                                        {props.hotelDets?.hotel?.is_domestic ? (
                                                            <div className={styles["item-form"]}>
                                                                <div className={styles["inp-form"]}>
                                                                    <input
                                                                        // {...form.register("id_code")}
                                                                        type="text"
                                                                        placeholder="کدملی"
                                                                        maxLength="10"
                                                                        // onChange={(e) =>
                                                                        //     FormDataPicker(
                                                                        //         e,
                                                                        //         props.passId,
                                                                        //         props.type,
                                                                        //         props.roomid,
                                                                        //         props.room_type_id,
                                                                        //         props.id,
                                                                        //         props.reserve_id
                                                                        //     )
                                                                        // }
                                                                        name="id_code"
                                                                    />
                                                                </div>
                                                                {/*{props.Errs?.errors &&*/}
                                                                {/*errValidation(*/}
                                                                {/*    props.Errs?.errors,*/}
                                                                {/*    errStruct(props.roomIndex, props.passIndex, "id_code")*/}
                                                                {/*) &&*/}
                                                                {/*!validation(props.passId, props.id, "id_code") ? (*/}
                                                                {/*    <small>*/}
                                                                {/*        {*/}
                                                                {/*            props.Errs?.errors[*/}
                                                                {/*                errStruct(props.roomIndex, props.passIndex, "id_code")*/}
                                                                {/*                ]*/}
                                                                {/*        }*/}
                                                                {/*    </small>*/}
                                                                {/*) : null}*/}
                                                            </div>
                                                        ) : null}

                                                        {/* ) : null} */}

                                                        {/* "item-form w-15" */}
                                                        <div className={styles["item-form"]}>
                                                            <div className={styles["inp-form"]}>
                                                                <input
                                                                    // onClick={() => {
                                                                    //     managePopUpBirthdayCalendar(true);
                                                                    //     // setCurrentIndex(index);
                                                                    // }}
                                                                    type="text"
                                                                    placeholder="تاریخ تولد"
                                                                    // value={findDate(props.passId, props.id, "birth_day")?.replace(
                                                                    //     /-/g,
                                                                    //     "/"
                                                                    // )}
                                                                    name="birth_day"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            {/*{props.Errs?.errors &&*/}
                                                            {/*errValidation(*/}
                                                            {/*    props.Errs?.errors,*/}
                                                            {/*    errStruct(props.roomIndex, props.passIndex, "birth_day")*/}
                                                            {/*) &&*/}
                                                            {/*!validation(props.passId, props.id, "birth_day") ? (*/}
                                                            {/*    <small>*/}
                                                            {/*        {*/}
                                                            {/*            props.Errs?.errors[*/}
                                                            {/*                errStruct(props.roomIndex, props.passIndex, "birth_day")*/}
                                                            {/*                ]*/}
                                                            {/*        }*/}
                                                            {/*    </small>*/}
                                                            {/*) : null}*/}
                                                        </div>
                                                        {/* "item-form w-10" */}
                                                        <div className={styles["item-form"]}>
                                                            <div className={styles["inp-form"]}>
                                                                <input
                                                                    type="text"
                                                                    placeholder="شماره پاسپورت"
                                                                    // value={indexidfinder(props.passId, props.id, "passport")}
                                                                    maxLength="9"
                                                                    // onChange={(e) =>
                                                                    //     FormDataPicker(
                                                                    //         e,
                                                                    //         props.passId,
                                                                    //         props.type,
                                                                    //         props.roomId,
                                                                    //         props.roomTypeId,
                                                                    //         props.id,
                                                                    //         props.reserve_id
                                                                    //     )
                                                                    // }
                                                                    name="passport"
                                                                />
                                                            </div>
                                                            {/*{props.Errs?.errors &&*/}
                                                            {/*errValidation(*/}
                                                            {/*    props.Errs?.errors,*/}
                                                            {/*    errStruct(props.roomIndex, props.passIndex, "passport")*/}
                                                            {/*) &&*/}
                                                            {/*!validation(props.passId, props.id, "passport") ? (*/}
                                                            {/*    <small>*/}
                                                            {/*        {*/}
                                                            {/*            props.Errs?.errors[*/}
                                                            {/*                errStruct(props.roomIndex, props.passIndex, "passport")*/}
                                                            {/*                ]*/}
                                                            {/*        }*/}
                                                            {/*    </small>*/}
                                                            {/*) : null}*/}
                                                        </div>
                                                        {/* "item-form w-15" */}
                                                        <div className={styles["item-form"]}>
                                                            <div className={styles["inp-form"]}>
                                                                <input
                                                                    type="text"
                                                                    // {...form.register("expired_passport")}
                                                                    placeholder="تاریخ انقضا پاسپورت"
                                                                    // onChange={(e) =>
                                                                    //     FormDataPicker(
                                                                    //         e,
                                                                    //         props.passId,
                                                                    //         props.type,
                                                                    //         props.roomId,
                                                                    //         props.roomTypeId,
                                                                    //         props.id,
                                                                    //         props.reserve_id
                                                                    //     )
                                                                    // }
                                                                    name="expired_passport"
                                                                    // onClick={() => {
                                                                    //     managePopUpExtPasCalendar(true);
                                                                    //     // setCurrentIndex(index);
                                                                    // }}
                                                                    // value={findDate(
                                                                    //     props.passId,
                                                                    //     props.id,
                                                                    //     "expired_passport"
                                                                    // )?.replace(/-/g, "/")}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            {/*{props.Errs?.errors &&*/}
                                                            {/*errValidation(*/}
                                                            {/*    props.Errs?.errors,*/}
                                                            {/*    errStruct(props.roomIndex, props.passIndex, "expired_passport")*/}
                                                            {/*) &&*/}
                                                            {/*!validation(props.passId, props.id, "expired_passport") ? (*/}
                                                            {/*    <small>فیلد تاریخ انقضا پاسپورت الزامی است</small>*/}
                                                            {/*) : null}*/}
                                                        </div>

                                                        {/*<PopUp opened={state.open} closePopUp={managePopUpBirthdayCalendar}>*/}
                                                        {/*    <div style={{ padding: 15 }} class="text-center">*/}
                                                        {/*        <button*/}
                                                        {/*            className="py-2 px-4"*/}
                                                        {/*            onClick={() => setCalend(!calend)}*/}
                                                        {/*        >*/}
                                                        {/*            {calend ? "تقویم میلادی" : "تقویم شمسی"}*/}
                                                        {/*        </button>*/}
                                                        {/*        <BirthDayParentCl*/}
                                                        {/*            calend={calend}*/}
                                                        {/*            typePassenger={*/}
                                                        {/*                props.type === "ext" ? "ADL" : props.type?.toUpperCase()*/}
                                                        {/*            }*/}
                                                        {/*            closePopUpCalendar={managePopUpBirthdayCalendar}*/}
                                                        {/*            roomInfo={{*/}
                                                        {/*                roomId: props.roomid,*/}
                                                        {/*                roomTypeId: props.room_type_id,*/}
                                                        {/*                type: props.type,*/}
                                                        {/*                passId: props.passId,*/}
                                                        {/*                id: props.id,*/}
                                                        {/*                reserve_id:props.reserve_id*/}
                                                        {/*                // index: currentindex,*/}
                                                        {/*            }}*/}
                                                        {/*            Birthdate={(*/}
                                                        {/*                date,*/}
                                                        {/*                passId,*/}
                                                        {/*                type,*/}
                                                        {/*                roomid,*/}
                                                        {/*                roomTypeid,*/}
                                                        {/*                datetype,*/}
                                                        {/*                id,*/}
                                                        {/*                reserve_id*/}
                                                        {/*            ) =>*/}
                                                        {/*                Birthdate(*/}
                                                        {/*                    date,*/}
                                                        {/*                    passId,*/}
                                                        {/*                    type,*/}
                                                        {/*                    roomid,*/}
                                                        {/*                    roomTypeid,*/}
                                                        {/*                    datetype,*/}
                                                        {/*                    id,*/}
                                                        {/*                    reserve_id*/}
                                                        {/*                )*/}
                                                        {/*            }*/}
                                                        {/*        />*/}
                                                        {/*    </div>*/}
                                                        {/*</PopUp>*/}

                                                        {/*<PopUp*/}
                                                        {/*    opened={state.extOpen}*/}
                                                        {/*    closePopUp={managePopUpExtPasCalendar}*/}
                                                        {/*>*/}
                                                        {/*    <div style={{ padding: 15 }}>*/}
                                                        {/*        <BirthDayParent*/}
                                                        {/*            numMi={2022}*/}
                                                        {/*            numMiBase={2000}*/}
                                                        {/*            title="Please enter an expiration date"*/}
                                                        {/*            placeholder="لطفا تاریخ انقضا را وارد کنید"*/}
                                                        {/*            // calend={calend}*/}
                                                        {/*            typePassenger={"ADL"}*/}
                                                        {/*            type={"EXT"}*/}
                                                        {/*            name="futureday"*/}
                                                        {/*            //   setBirthdayb={(value) => {*/}
                                                        {/*            //     props.fillPassengersData("futureday", props.id, value);*/}
                                                        {/*            //   }}*/}
                                                        {/*            closePopUpCalendar={managePopUpExtPasCalendar}*/}
                                                        {/*            roomInfo={{*/}
                                                        {/*                roomId: props.roomid,*/}
                                                        {/*                roomTypeId: props.room_type_id,*/}
                                                        {/*                type: props.type,*/}
                                                        {/*                passId: props.passId,*/}
                                                        {/*                id: props.id,*/}
                                                        {/*                reserve_id:props.reserve_id*/}
                                                        {/*            }}*/}
                                                        {/*            Birthdate={(*/}
                                                        {/*                date,*/}
                                                        {/*                passId,*/}
                                                        {/*                type,*/}
                                                        {/*                roomid,*/}
                                                        {/*                roomTypeid,*/}
                                                        {/*                datetype,*/}
                                                        {/*                id,*/}
                                                        {/*                reserve_id*/}
                                                        {/*            ) =>*/}
                                                        {/*                Birthdate(*/}
                                                        {/*                    date,*/}
                                                        {/*                    passId,*/}
                                                        {/*                    type,*/}
                                                        {/*                    roomid,*/}
                                                        {/*                    roomTypeid,*/}
                                                        {/*                    datetype,*/}
                                                        {/*                    id,*/}
                                                        {/*                    reserve_id*/}
                                                        {/*                )*/}
                                                        {/*            }*/}
                                                        {/*        />*/}
                                                        {/*    </div>*/}
                                                        {/*</PopUp>*/}
                                                    </form>
                                                </div>
                                            }
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePassenger;