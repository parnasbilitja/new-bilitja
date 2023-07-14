import React, { useEffect, useState } from "react";
import styles from "../../../../../styles/newTour/components/subComponent/PassengerForm.module.scss";
import PopUp from "./PopUp.component";
import BirthDayParentCl from "../calendar/BirthDayParentCl";
import BirthDayParent from "../../../../sources/calendar/BirthDayParent";
const PassengerForm = (props) => {
  console.log("hotel", props.hotelDets);
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
          [e.target.name]: e.target.value,
        });
      } else {
        newpassengerArr.push(...findroom.passengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: `${index}${type}`,
          price: props.prcTypeBase(type),
          [e.target.name]: e.target.value,
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
              [e.target.name]: e.target.value,
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

  const [currentindex, setCurrentIndex] = useState(null);
  return (
    <>
      {[...Array(props.count)].map((p, index) => {
        return (
          <form
            key={index}
            className={
              //   props.hotelDets.hotel.is_domestic
              //     ? styles["form-container2"]
              //     : styles["form-container"]
              styles["form-container"]
            }
            onClick={() => {
              console.log(index);
            }}
            // onChange={form.handleSubmit((data) => {
            //   formDataPicker(data, index, type, room.id, room.room_id);
            // })}
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
                >
                  <option value="1">اقا</option>
                  <option value="0">خانم</option>
                </select>
              </div>
            </div>
            {/* align-items-center w-18 */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  type="text"
                  placeholder="نام (لاتین)"
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
                />
              </div>
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
                  <option value="1">ایرانی</option>
                  <option value="0">غیر ایرانی</option>
                </select>
              </div>
            </div>

            {/* "item-form w-15" */}

            {/* {props.hotelDets.hotel.is_domestic ? ( */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  // {...form.register("id_code")}
                  type="text"
                  placeholder="کدملی"
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
            </div>
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
                />
              </div>
            </div>
            {/* "item-form w-10" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  type="text"
                  placeholder="شماره پاسپورت"
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
                />
              </div>
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
                    props.type === "ext" ? "Adl" : props.type.toUpperCase()
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
        );
      })}
    </>
  );
};

export default PassengerForm;
