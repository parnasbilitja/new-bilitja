import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/newTour/components/subComponent/PassengerForm.module.scss";
import PopUp from "./PopUp.component";
import BirthDayParentCl from "../calendar/BirthDayParentCl";
import BirthDayParent from "../../../../sources/calendar/BirthDayParent";
import { errValidation } from "../../../../Utils/newTour";
const PassengerForm = (props) => {
  console.log("hotel", props);
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

  const findDate = (passId, id, datetype) => {
    // debugger;
    if (props.dataq.length !== 0) {
      const findroom = props.dataq.filter((room) => room.id === id);
      if (findroom) {
        const findPassenger = findroom[0]?.passengers.filter(
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
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const [calend, setCalend] = useState(true);

  const formDataPicker21 = (e, passId, type, roomid, roomTypeid, id) => {
    // debugger;
    const findroom = props.dataq.filter((data) => data.id === id);
    let newrooms = [];
    const enRegEx = /[^A-Za-z0-9]/g;

    if (findroom.length > 0) {
      const filteredrooms = props.dataq.filter((data) => data.id !== id);
      const findpassenger = findroom[0].passengers.filter(
        (passenger) => passenger.id === passId
      );
      let newpassengerArr = [];
      if (findpassenger) {
        const filteredpassengers = findroom[0].passengers.filter(
          (passenger) => passenger.id !== passId
        );
        if (enRegEx.test(e.target.value)) {
          newpassengerArr.push(...filteredpassengers, {
            ...findpassenger[0],
            bed_type: type === "ext" ? "extra" : "normal",
            type,
            id: passId,
            price: props.prcTypeBase(type),
            [e.target.name]: "",
          });
          setLatinCheck({
            ...latinCheck,
            [e.target.name]: true,
          });
        } else {
          newpassengerArr.push(...filteredpassengers, {
            ...findpassenger[0],
            bed_type: type === "ext" ? "extra" : "normal",
            type,
            id: passId,
            price: props.prcTypeBase(type),
            [e.target.name]: e.target.value,
          });
          setLatinCheck({
            ...latinCheck,
            [e.target.name]: false,
          });
        }
      }

      newrooms.push(...filteredrooms, {
        id: id,
        room_id: roomid,
        room_type_id: roomTypeid,
        passengers: [...newpassengerArr],
      });
      props.setDataq(newrooms);
    }
  };
  const Birthdate = (date, passId, type, roomid, roomTypeid, datetype, id) => {
    const findroom = props.dataq.filter((data) => data.id === id);
    let newrooms = [];

    if (findroom.length > 0) {
      const filteredrooms = props.dataq.filter((data) => data.id !== id);
      const findpassenger = findroom[0].passengers.filter(
        (passenger) => passenger.id === passId
      );
      let newpassengerArr = [];
      if (findpassenger) {
        const filteredpassengers = findroom[0].passengers.filter(
          (passenger) => passenger.id !== passId
        );

        newpassengerArr.push(...filteredpassengers, {
          ...findpassenger[0],
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: passId,
          price: props.prcTypeBase(type),
          [datetype]: date,
        });
      } else {
        newpassengerArr.push(...findroom.passengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: passId,
          price: props.prcTypeBase(type),
          [datetype]: date,
        });
      }

      newrooms.push(...filteredrooms, {
        id: id,
        room_id: roomid,
        room_type_id: roomTypeid,
        passengers: [...newpassengerArr],
      });

      props.setDataq(newrooms);
    } else {
      props.setDataq((prev) => [
        ...prev,
        {
          id: id,
          room_id: roomid,
          room_type_id: roomTypeid,
          passengers: [
            {
              bed_type: type === "ext" ? "extra" : "normal",
              type,
              id: passId,
              [datetype]: date,
              price: props.prcTypeBase(type),
            },
          ],
        },
      ]);
    }
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

  const errStruct = (roomId, passenId, inputName) => {
    return `rooms.${roomId}.passengers.${passenId}.${inputName}`;
  };

  const humantype = (type) => {
    switch (type) {
      case "adl":
        return "بزرگسال";
      case "inf":
        return "نوزاد";
      case "chd":
        return "کودک";
      default:
        return "تخت اضافه";
    }
  };
  const indexidfinder = (passId, roomId, name) => {
    // const { name, value } = e.target;

    const findroom = props.dataq.filter((data) => data.id === roomId);
    if (findroom.length > 0) {
      const findPassInput = findroom[0].passengers.filter(
        (passenger) => passenger.id == passId
      );
      return findPassInput[0]?.[name];
    }
  };
  useEffect(() => {
    console.log("passindex", props.passIndex);
  }, []);

  return (
    <>
      {
        <div className={styles["container"]}>
          <div className={styles["personDet"]}>
            <label className={styles["label-fix-gray"]}>
              {humantype(props.type)}
              <small>
                {" "}
                {humantype(props.type) === "بزرگسال"
                  ? "(12 سال به بالا)"
                  : humantype(props.type) === "کودک"
                  ? "(2 تا 12 سال)"
                  : humantype(props.type) === "نوزاد"
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
              props.hotelDets.hotel.is_domestic
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
                  onChange={(e) =>
                    formDataPicker21(
                      e,
                      props.passId,
                      props.type,
                      props.roomid,
                      props.room_type_id,
                      props.id
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
            {/* align-items-center w-18 */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  type="text"
                  placeholder="نام (لاتین)"
                  value={indexidfinder(props.passId, props.id, "name")}
                  required
                  defaultValue=""
                  maxLength="50"
                  onChange={(e) =>
                    formDataPicker21(
                      e,
                      props.passId,
                      props.type,
                      props.roomid,
                      props.room_type_id,
                      props.id
                    )
                  }
                  name="name"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {props.Errs?.errors &&
                errValidation(
                  props.Errs?.errors,
                  errStruct(props.roomIndex, props.passIndex, "name")
                ) &&
                !validation(props.passId, props.id, "name") ? (
                  <small style={{ marginTop: "5px" }}>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, props.passIndex, "name")
                      ]
                    }
                  </small>
                ) : null}

                {latinCheck.name === true ? (
                  <small style={{ marginTop: "5px" }}>
                    لطفا نام را به لاتین وارد کنید
                  </small>
                ) : null}
              </div>
            </div>

            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  type="text"
                  placeholder="نام خانوادگی (لاتین)"
                  value={indexidfinder(props.passId, props.id, "family")}
                  onChange={(e) =>
                    formDataPicker21(
                      e,
                      props.passId,
                      props.type,
                      props.roomid,
                      props.room_type_id,
                      props.id
                    )
                  }
                  name="family"
                  maxLength="50"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {props.Errs?.errors &&
                errValidation(
                  props.Errs?.errors,
                  errStruct(props.roomIndex, props.passIndex, "family")
                ) &&
                !validation(props.passId, props.id, "family") ? (
                  <small style={{ marginTop: "5px" }}>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, props.passIndex, "family")
                      ]
                    }
                  </small>
                ) : null}

                {latinCheck.family === true ? (
                  <small style={{ marginTop: "5px" }}>
                    لطفا نام خانوادگی را به لاتین وارد کنید
                  </small>
                ) : null}
              </div>
            </div>

            <div className={styles["item-form"]}>
              {/* "inp-form mt-2" */}
              <div className={styles["inp-form"]}>
                <select
                  // {...form.register("nationality")}

                  id=""
                  onChange={(e) =>
                    formDataPicker21(
                      e,
                      props.passId,
                      props.type,
                      props.roomid,
                      props.room_type_id,
                      props.id
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

            {props.hotelDets.hotel.is_domestic ? (
              <div className={styles["item-form"]}>
                <div className={styles["inp-form"]}>
                  <input
                    // {...form.register("id_code")}
                    type="text"
                    placeholder="کدملی"
                    maxLength="10"
                    onChange={(e) =>
                      formDataPicker21(
                        e,
                        props.passId,
                        props.type,
                        props.roomid,
                        props.room_type_id,
                        props.id
                      )
                    }
                    name="id_code"
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
              </div>
            ) : null}

            {/* ) : null} */}

            {/* "item-form w-15" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  onClick={() => {
                    managePopUpBirthdayCalendar(true);
                    // setCurrentIndex(index);
                  }}
                  type="text"
                  placeholder="تاریخ تولد"
                  value={findDate(props.passId, props.id, "birth_day")?.replace(
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
                  maxLength="9"
                  onChange={(e) =>
                    formDataPicker21(
                      e,
                      props.passId,
                      props.type,
                      props.roomId,
                      props.roomTypeId,
                      props.id
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
                    formDataPicker21(
                      e,
                      props.passId,
                      props.type,
                      props.roomId,
                      props.roomTypeId,
                      props.id
                    )
                  }
                  name="expired_passport"
                  onClick={() => {
                    managePopUpExtPasCalendar(true);
                    // setCurrentIndex(index);
                  }}
                  value={findDate(
                    props.passId,
                    props.id,
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
              <div style={{ padding: 15 }} class="text-center">
                <button
                  className="py-2 px-4"
                  onClick={() => setCalend(!calend)}
                >
                  {calend ? "تقویم میلادی" : "تقویم شمسی"}
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
                    passId: props.passId,
                    id: props.id,
                    // index: currentindex,
                  }}
                  Birthdate={(
                    date,
                    passId,
                    type,
                    roomid,
                    roomTypeid,
                    datetype,
                    id
                  ) =>
                    Birthdate(
                      date,
                      passId,
                      type,
                      roomid,
                      roomTypeid,
                      datetype,
                      id
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
                    roomId: props.roomid,
                    roomTypeId: props.room_type_id,
                    type: props.type,
                    passId: props.passId,
                    id: props.id,
                  }}
                  Birthdate={(
                    date,
                    passId,
                    type,
                    roomid,
                    roomTypeid,
                    datetype,
                    id
                  ) =>
                    Birthdate(
                      date,
                      passId,
                      type,
                      roomid,
                      roomTypeid,
                      datetype,
                      id
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
