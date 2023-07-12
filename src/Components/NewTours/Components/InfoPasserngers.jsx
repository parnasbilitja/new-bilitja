import React, { useEffect, useState } from "react";
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
import {
  chdPrcGen,
  extBedPrcGen,
  numberWithCommas,
  roomPrcGen,
} from "../../../Utils/newTour";
import { useForm } from "react-hook-form";
import PopUp from "../../../sources/component/PopUp.component";
import BirthDayParentCl from "../../../sources/calendar/BirthDayParentCl";

const InfoPasserngers = ({
  room,
  roomName,
  room_type_id,
  hotelDets,
  dataq,
  setDataq,
}) => {
  const [chdPrc, setChdPrc] = useState("");
  const [adlPrc, setAdlPrc] = useState("");
  const [infPrc, setinfPrc] = useState("");
  const [extPrc, setextPrc] = useState("");

  useEffect(() => {
    setChdPrc(chdPrcGen(hotelDets?.rooms, hotelDets?.flight, room_type_id));
    setextPrc(extBedPrcGen(hotelDets?.rooms, hotelDets?.flight, room_type_id));
    setinfPrc(hotelDets.flight.inf_price);
    setAdlPrc(roomprcFinder(hotelDets.rooms, room));

    
  }, [hotelDets, room_type_id]);

  const [err, setErr] = useState({
    name: "",
    family: "",
    id_code: "",
    birth_day: "",
    passport: "",
    expired_passport: "",
  });

  const prcTypeBase = (type) => {
    switch (type) {
      case "adl":
        return adlPrc;

      case "chd":
        return chdPrc;
      case "inf":
        return infPrc;
      case "ext":
        return extPrc;

      default:
        0;
        break;
    }
  };
  const roomprcFinder = (rooms, selectedroom) => {
    const foundRoom = rooms.filter((room) => room.id === selectedroom.room_id);
    return roomPrcGen(...foundRoom, hotelDets.flight);
  };

  const formDataPicker = (data, id, type, roomid, roomTypeid) => {
    const findroom = dataq.filter((data) => data.id === roomid);
    let newrooms = [];
    if (findroom.length > 0) {
      const filteredrooms = dataq.filter((data) => data.id !== roomid);
      const findpassenger = findroom[0].passengers.filter(
        (passenger) => passenger.id === `${id}${type}`
      );
      let newpassengerArr = [];
      if (findpassenger) {
        const filteredpassengers = findroom[0].passengers.filter(
          (passenger) => passenger.id !== `${id}${type}`
        );
        newpassengerArr.push(...filteredpassengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: `${id}${type}`,
          ...data,
          price: prcTypeBase(type),
        });
      } else {
        newpassengerArr.push(...findroom.passengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: `${id}${type}`,
          ...data,
          price: prcTypeBase(type),
        });
      }

      newrooms.push(...filteredrooms, {
        id: roomid,
        room_id: roomTypeid,
        passengers: [...newpassengerArr],
      });

      setDataq(newrooms);
    } else {
      setDataq((prev) => [
        ...prev,
        {
          id: roomid,
          room_id: roomTypeid,
          passengers: [
            {
              bed_type: type === "ext" ? "extra" : "normal",
              type,
              id: `${id}${type}`,
              ...data,
              price: prcTypeBase(type),
            },
          ],
        },
      ]);
    }
  };

  const useformGen = (count) => {
    const forms = [...Array(count)].map(() => useForm());
    return forms;
  };

  const errHandler = (e, type, id) => {
    if (e.target.name === "name" + type + id && e.target.value === "") {
      setErr((prev) => ({
        ...prev,
        name: {
          nameerr: "لطفا نام",
          id: e.target.name,
        },
      }));
    } else if (e.target.value !== "") {
      setErr((prev) => ({
        ...prev,
        name: {
          nameerr: null,
          id: null,
        },
      }));
    }
    if (e.target.name === "family" + type + id && e.target.value === "") {
      setErr((prev) => ({
        ...prev,
        family: {
          familyerr: "خانوادگی لطفا نام",
          id: e.target.name,
        },
      }));
    } else if (e.target.value !== "") {
      setErr((prev) => ({
        ...prev,
        family: {
          familyerr: null,
          id: null,
        },
      }));
    }

    if (e.target.name === "id_code" + type + id && e.target.value === "") {
      setErr((prev) => ({
        ...prev,
        id_code: {
          id_codeerr: " لطفا کدملی",
          id: e.target.name,
        },
      }));
    } else if (e.target.value !== "") {
      setErr((prev) => ({
        ...prev,
        id_code: {
          id_codeerr: null,
          id: null,
        },
      }));
    }
    if (e.target.name === "birth_day" + type + id && e.target.value === "") {
      setErr((prev) => ({
        ...prev,
        birth_day: {
          birth_dayerr: " لطفا تاریخ تولد",
          id: e.target.name,
        },
      }));
    } else if (e.target.value !== "") {
      setErr((prev) => ({
        ...prev,
        birth_day: {
          birth_dayerr: null,
          id: null,
        },
      }));
    }
    if (e.target.name === "passport" + type + id && e.target.value === "") {
      setErr((prev) => ({
        ...prev,
        passport: {
          passporterr: " لطفا شماره پاسپورت",
          id: e.target.name,
        },
      }));
    } else if (e.target.value !== "") {
      setErr((prev) => ({
        ...prev,
        passport: {
          passporterr: null,
          id: null,
        },
      }));
    }

    if (
      e.target.name === "expired_passport" + type + id &&
      e.target.value === ""
    ) {
      setErr((prev) => ({
        ...prev,
        expired_passport: {
          expired_passporterr: " لطفا شماره پاسپورت",
          id: e.target.name,
        },
      }));
    } else if (e.target.value !== "") {
      setErr((prev) => ({
        ...prev,
        expired_passport: {
          expired_passporterr: null,
          id: null,
        },
      }));
    }
  };

  const formBuilder = (count, type) => {
    return useformGen(count).map((form, index) => {
      return (
        <form
          key={index}
          className={styles["form-container"]}
          onChange={form.handleSubmit((data) => {
            formDataPicker(data, index, type, room.id, room.room_id);
            // console.log(data);
          })}
        >
          <div className={styles["item-form"]}>
            {/* "inp-form mt-2" */}
            <div className={styles["inp-form"]}>
              <select name="" id="" {...form.register("gender")}>
                <option value="1">اقا</option>
                <option value="0">خانم</option>
              </select>
            </div>
          </div>
          {/* align-items-center w-18 */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register("name")}
                type="text"
                placeholder="نام (لاتین)"
                // name={`name${type}${index}`}
                // onChange={(e) => {
                //   errHandler(e, type, index);
                // }}
                // onFocus={(e) => {
                //   errHandler(e, type, index);
                // }}
              />
            </div>
            {err.name.id === `name${type}${index}` && err.name.nameerr ? (
              <small>{err.name.nameerr}</small>
            ) : null}
          </div>

          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register("family")}
                type="text"
                placeholder="نام خانوادگی (لاتین)"
                // name={`family${type}${index}`}
                // onChange={(e) => {
                //   errHandler(e, type, index);
                // }}
                // onFocus={(e) => {
                //   errHandler(e, type, index);
                // }}
              />
            </div>
            {err.family.id === `family${type}${index}` &&
            err.family.familyerr ? (
              <small>{err.family.familyerr}</small>
            ) : null}
          </div>

          <div className={styles["item-form"]}>
            {/* "inp-form mt-2" */}
            <div className={styles["inp-form"]}>
              <select {...form.register("nationality")} name="" id="">
                <option value="1">ایرانی</option>
                <option value="0">غیر ایرانی</option>
              </select>
            </div>
          </div>

          {/* "item-form w-15" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register("id_code")}
                type="text"
                placeholder="کدملی"
                // name={`id_code${type}${index}`}
                // onChange={(e) => {
                //   errHandler(e, type, index);
                // }}
                // onFocus={(e) => {
                //   errHandler(e, type, index);
                // }}
              />
            </div>
            {err.id_code.id === `id_code${type}${index}` &&
            err.id_code.id_codeerr ? (
              <small>{err.id_code.id_codeerr}</small>
            ) : null}
          </div>
          {/* "item-form w-15" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register("birth_day")}
                // name={`birth_day${type}${index}`}
                // onChange={(e) => {
                //   errHandler(e, type, index);
                // }}
                // onFocus={(e) => {
                //   errHandler(e, type, index);
                // }}
                type="text"
                placeholder="تاریخ تولد"
              />
            </div>
            {err.birth_day.id === `birth_day${type}${index}` &&
            err.birth_day.birth_dayerr ? (
              <small>{err.birth_day.birth_dayerr}</small>
            ) : null}
          </div>
          {/* "item-form w-10" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register("passport")}
                // name={`passport${type}${index}`}
                // onChange={(e) => {
                //   errHandler(e, type, index);
                // }}
                // onFocus={(e) => {
                //   errHandler(e, type, index);
                // }}
                type="text"
                placeholder="شماره پاسپورت"
              />
            </div>
            {err.passport.id === `passport${type}${index}` &&
            err.passport.passporterr ? (
              <small>{err.passport.passporterr}</small>
            ) : null}
          </div>
          {/* "item-form w-15" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                type="text"
                {...form.register("expired_passport")}
                placeholder="تاریخ انقضا پاسپورت"
                // name={`expired_passport${type}${index}`}
                // onChange={(e) => {
                //   errHandler(e, type, index);
                // }}
                // onFocus={(e) => {
                //   errHandler(e, type, index);
                // }}
              />
            </div>
            {err.expired_passport.id === `expired_passport${type}${index}` &&
            err.expired_passport.expired_passporterr ? (
              <small>{err.expired_passport.expired_passporterr}</small>
            ) : null}
          </div>

          {/* <PopUp opened={state.open} closePopUp={managePopUpBirthdayCalendar}>
            <div style={{ padding: 15 }} class="text-center">
              <button className="py-2 px-4" onClick={() => setCalend(!calend)}>
                {calend ? "تقویم میلادی" : "تقویم شمسی"}
              </button>
              <BirthDayParentCl
                calend={calend}
                typePassenger={props.type}
                setBirthdayb={(value) => {
                  props.fillPassengersData("birthday", props.id, value);
                }}
                closePopUpCalendar={managePopUpBirthdayCalendar}
              />
            </div>
          </PopUp> */}
        </form>
      );
    });
  };

  return (
    <>
      <div className={styles["box-room"]}>
        <div
          className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
        >
          <div className={styles["box-room-Det-name"]}>
            <div className={styles["circle"]}></div>
            <h2>{roomName}</h2>
          </div>
        </div>
        {/* style="position: relative;" */}
        <div>
          <div>
            <div
              className={`${styles["set-info-passengers"]} ${styles["posi-relative"]}`}
            >
              {/* <label className={styles["label-fix"]}>سرپرست</label> */}

              <div style={{ marginBottom: "1.5rem" }}>
                {room.adl_count === 0 ? null : (
                  <div className={styles["personDet"]}>
                    <label className={styles["label-fix-gray"]}>بزرگسال</label>
                    <div className={styles["price-fix"]}>
                      <strong>{numberWithCommas(adlPrc)}</strong>
                      <small>تومان</small>
                    </div>
                  </div>
                )}

                {formBuilder(room.adl_count, "adl")}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.chd_count === 0 ? null : (
                  <div className={styles["personDet"]}>
                    <label className={styles["label-fix-gray"]}>کودک</label>
                    <div className={styles["price-fix"]}>
                      <strong>{numberWithCommas(chdPrc)}</strong>
                      <small>تومان</small>
                    </div>
                  </div>
                )}

                {formBuilder(room.chd_count, "chd")}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.inf_count === 0 ? null : (
                  <div className={styles["personDet"]}>
                    <label className={styles["label-fix-gray"]}>نوزاد</label>
                    <div className={styles["price-fix"]}>
                      <strong>{numberWithCommas(infPrc)}</strong>
                      <small>تومان</small>
                    </div>
                  </div>
                )}

                {formBuilder(room.inf_count, "inf")}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.extra_count === 0 ? null : (
                  <div className={styles["personDet"]}>
                    <label className={styles["label-fix-gray"]}>
                      تخت اضافه
                    </label>
                    <div className={styles["price-fix"]}>
                      <strong>{numberWithCommas(extPrc)}</strong>
                      <small>تومان</small>
                    </div>
                  </div>
                )}

                {formBuilder(room.extra_count, "ext")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPasserngers;
