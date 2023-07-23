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

  const findDate = (id, type, roomId, datetype) => {
    if (props.dataq.length !== 0) {
      const findroom = props.dataq.filter((room) => room.id === roomId);
      if (findroom) {
        const findPassenger = findroom[0]?.passengers.filter(
          (passenger) => passenger.id === `${id}${type}`
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

  const formDataPicker2 = (e, index, type, roomid, roomTypeid) => {
    const objModel = {
      name: "",
      family: "",
      birth_day: "",
      nationality: "",
      gender: "",
      passport: "",
      expired_passport: "",
      id_code: "",
    };
    const findroom = props.dataq.filter((data) => data.id === roomid);
    let newrooms = [];
    const enRegEx = /[^A-Za-z0-9]/g;

    if (findroom.length > 0) {
      const filteredrooms = props.dataq.filter((data) => data.id !== roomid);
      const findpassenger = findroom[0].passengers.filter(
        (passenger) => passenger.id === `${index}${type}`
      );
      let newpassengerArr = [];
      if (findpassenger) {
        const filteredpassengers = findroom[0].passengers.filter(
          (passenger) => passenger.id !== `${index}${type}`
        );
        newpassengerArr.push(...filteredpassengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: `${index}${type}`,
          price: props.prcTypeBase(type),
          ...objModel,
          ...findpassenger[0],
          [e.target.name]: enRegEx.test(e.target.value) ? "" : e.target.value,
        });
      } else {
        debugger;
        newpassengerArr.push(...findroom.passengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: `${index}${type}`,
          price: props.prcTypeBase(type),
          ...objModel,
          [e.target.name]: enRegEx.test(e.target.value) ? "" : e.target.value,
        });
      }

      newrooms.push(...filteredrooms, {
        id: roomid,
        room_id: roomTypeid,
        passengers: [...newpassengerArr],
      });

      props.setDataq(newrooms);
    } else {
      props.setDataq((prev) => [
        ...prev,
        {
          id: roomid,
          room_id: roomTypeid,
          passengers: [
            {
              bed_type: type === "ext" ? "extra" : "normal",
              type,
              id: `${index}${type}`,
              [e.target.name]: enRegEx.test(e.target.value)
                ? ""
                : e.target.value,
              ...objModel,
              price: props.prcTypeBase(type),
            },
          ],
        },
      ]);
    }
  };

  const Birthdate = (date, index, type, roomid, roomTypeid, datetype) => {
    // debugger;
    const findroom = props.dataq.filter((data) => data.id === roomid);
    let newrooms = [];

    if (findroom.length > 0) {
      const filteredrooms = props.dataq.filter((data) => data.id !== roomid);
      const findpassenger = findroom[0].passengers.filter(
        (passenger) => passenger.id === `${index}${type}`
      );
      let newpassengerArr = [];
      if (findpassenger) {
        const filteredpassengers = findroom[0].passengers.filter(
          (passenger) => passenger.id !== `${index}${type}`
        );

        newpassengerArr.push(...filteredpassengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: `${index}${type}`,
          price: props.prcTypeBase(type),
          ...findpassenger[0],
          [datetype]: date,
        });
      } else {
        newpassengerArr.push(...findroom.passengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: `${index}${type}`,
          price: props.prcTypeBase(type),
          [datetype]: date,
        });
      }

      newrooms.push(...filteredrooms, {
        id: roomid,
        room_id: roomTypeid,
        passengers: [...newpassengerArr],
      });

      props.setDataq(newrooms);
    } else {
      props.setDataq((prev) => [
        ...prev,
        {
          id: roomid,
          room_id: roomTypeid,
          passengers: [
            {
              bed_type: type === "ext" ? "extra" : "normal",
              type,
              id: `${index}${type}`,
              [datetype]: date,
              price: props.prcTypeBase(type),
            },
          ],
        },
      ]);
    }
  };

  const inputValueFinder = (e, type, index, roomId) => {
    // debugger;
    const { name, value } = e.target;
    const findroom = props.dataq.filter((data) => data.id === roomId);
    if (findroom.length > 0) {
      const findPassInput = findroom[0].passengers.filter(
        (passenger) => passenger.id == `${index}${type}`
      );
      return findPassInput?.[name];
    } else {
      return "";
    }
  };

  const validation = (type, index, roomId, inputname) => {
    const findroom = props.dataq.filter((data) => data.id === roomId);
    if (findroom.length > 0) {
      const findPassInput = findroom[0].passengers.filter(
        (passenger) => passenger.id == `${index}${type}`
      );

      if (findPassInput[0]?.[inputname].length > 0) {
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

  const [currentindex, setCurrentIndex] = useState(null);

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
  // const objModelBuilder = () => {
  //   console.log("hellooo", {
  //     name: "",
  //     family: "",
  //     birth_day: "",
  //     nationality: "",
  //     gender: "",
  //     passport: "",
  //     expired_passport: "",
  //     id_code: "",
  //     id: `${props.type}${props.count}`,
  //   });
  // };

  return (
    <>
      {[...Array(props.count)].map((p, index) => {
        return (
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
              key={index}
              className={
                props.hotelDets.hotel.is_domestic
                  ? styles["form-container"]
                  : styles["form-container2"]
              }
              onClick={() => {
                console.log(index);
              }}
            >
              <div className={styles["item-form"]}>
                {/* "inp-form mt-2" */}
                <div className={styles["inp-form"]}>
                  <select
                    id=""
                    // {...form.register("gender")}
                    name="gender"
                    onChange={(e) =>
                      formDataPicker2(
                        e,
                        index,
                        props.type,
                        props.roomId,
                        props.roomTypeId
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
                  errStruct(props.roomIndex, index, "gender")
                ) &&
                !validation(props.type, index, props.roomId, "gender") ? (
                  <small>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, index, "gender")
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
                    // value={(e) =>
                    //   inputValueFinder(e, props.type, index, props.roomId)
                    // }
                    required
                    defaultValue=""
                    maxLength="50"
                    onChange={(e) =>
                      formDataPicker2(
                        e,
                        index,
                        props.type,
                        props.roomId,
                        props.roomTypeId
                      )
                    }
                    name="name"
                  />
                </div>
                {props.Errs?.errors &&
                errValidation(
                  props.Errs?.errors,
                  errStruct(props.roomIndex, index, "name")
                ) &&
                !validation(props.type, index, props.roomId, "name") ? (
                  <small>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, index, "name")
                      ]
                    }
                  </small>
                ) : null}
              </div>

              <div className={styles["item-form"]}>
                <div className={styles["inp-form"]}>
                  <input
                    type="text"
                    placeholder="نام خانوادگی (لاتین)"
                    onChange={(e) =>
                      formDataPicker2(
                        e,
                        index,
                        props.type,
                        props.roomId,
                        props.roomTypeId
                      )
                    }
                    name="family"
                    maxLength="50"
                  />
                </div>
                {props.Errs?.errors &&
                errValidation(
                  props.Errs?.errors,
                  errStruct(props.roomIndex, index, "family")
                ) &&
                !validation(props.type, index, props.roomId, "family") ? (
                  <small>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, index, "family")
                      ]
                    }
                  </small>
                ) : null}
              </div>

              <div className={styles["item-form"]}>
                {/* "inp-form mt-2" */}
                <div className={styles["inp-form"]}>
                  <select
                    // {...form.register("nationality")}

                    id=""
                    onChange={(e) =>
                      formDataPicker2(
                        e,
                        index,
                        props.type,
                        props.roomId,
                        props.roomTypeId
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
                {errValidation(
                  props.Errs?.errors,
                  errStruct(props.roomIndex, index, "nationality")
                ) &&
                !validation(props.type, index, props.roomId, "nationality") ? (
                  <small>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, index, "nationality")
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
                        formDataPicker2(
                          e,
                          index,
                          props.type,
                          props.roomId,
                          props.roomTypeId
                        )
                      }
                      name="id_code"
                    />
                  </div>
                  {errValidation(
                    props.Errs?.errors,
                    errStruct(props.roomIndex, index, "id_code")
                  ) &&
                  !validation(props.type, index, props.roomId, "id_code") ? (
                    <small>
                      {
                        props.Errs?.errors[
                          errStruct(props.roomIndex, index, "id_code")
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
                      setCurrentIndex(index);
                    }}
                    type="text"
                    placeholder="تاریخ تولد"
                    value={findDate(
                      index,
                      props.type,
                      props.roomId,
                      "birth_day"
                    )?.replace(/-/g, "/")}
                    name="birth_day"
                    readOnly
                  />
                </div>
                {errValidation(
                  props.Errs?.errors,
                  errStruct(props.roomIndex, index, "birth_day")
                ) &&
                !validation(props.type, index, props.roomId, "birth_day") ? (
                  <small>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, index, "birth_day")
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
                      formDataPicker2(
                        e,
                        index,
                        props.type,
                        props.roomId,
                        props.roomTypeId
                      )
                    }
                    name="passport"
                  />
                </div>
                {errValidation(
                  props.Errs?.errors,
                  errStruct(props.roomIndex, index, "passport")
                ) &&
                !validation(props.type, index, props.roomId, "passport") ? (
                  <small>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, index, "passport")
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
                      formDataPicker2(
                        e,
                        index,
                        props.type,
                        props.roomId,
                        props.roomTypeId
                      )
                    }
                    name="expired_passport"
                    onClick={() => {
                      managePopUpExtPasCalendar(true);
                      setCurrentIndex(index);
                    }}
                    value={findDate(
                      index,
                      props.type,
                      props.roomId,
                      "expired_passport"
                    )?.replace(/-/g, "/")}
                    readOnly
                  />
                </div>
                {errValidation(
                  props.Errs?.errors,
                  errStruct(props.roomIndex, index, "expired_passport")
                ) &&
                !validation(
                  props.type,
                  index,
                  props.roomId,
                  "expired_passport"
                ) ? (
                  <small>
                    {
                      props.Errs?.errors[
                        errStruct(props.roomIndex, index, "expired_passport")
                      ]
                    }
                  </small>
                ) : null}
              </div>

              <PopUp
                opened={state.open}
                closePopUp={managePopUpBirthdayCalendar}
              >
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
                      props.type === "ext" ? "ADL" : props.type.toUpperCase()
                    }
                    closePopUpCalendar={managePopUpBirthdayCalendar}
                    roomInfo={{
                      roomId: props.roomId,
                      roomTypeId: props.roomTypeId,
                      type: props.type,
                      roomId: props.roomId,
                      index: currentindex,
                    }}
                    Birthdate={(
                      date,
                      index,
                      type,
                      roomid,
                      roomTypeid,
                      datetype
                    ) =>
                      Birthdate(date, index, type, roomid, roomTypeid, datetype)
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
                      roomId: props.roomId,
                      roomTypeId: props.roomTypeId,
                      type: props.type,
                      roomId: props.roomId,
                      index: currentindex,
                    }}
                    Birthdate={(
                      date,
                      index,
                      type,
                      roomid,
                      roomTypeid,
                      datetype
                    ) =>
                      Birthdate(date, index, type, roomid, roomTypeid, datetype)
                    }
                  />
                </div>
              </PopUp>
            </form>
          </div>
        );
      })}
    </>
  );
};

export default PassengerForm;
