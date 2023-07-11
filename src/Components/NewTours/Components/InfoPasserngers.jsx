import React, { useEffect, useState } from "react";
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
import {
  chdPrcGen,
  extBedPrcGen,
  numberWithCommas,
} from "../../../Utils/newTour";
import { useForm } from "react-hook-form";
import PopUp from "../../../sources/component/PopUp.component";
import BirthDayParentCl from "../../../sources/calendar/BirthDayParentCl";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const InfoPasserngers = ({
  room,
  roomName,
  room_type_id,
  hotelDets,
  dataq,
  setDataq,
}) => {
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
        });
      } else {
        newpassengerArr.push(...findroom.passengers, {
          bed_type: type === "ext" ? "extra" : "normal",
          type,
          id: `${id}${type}`,
          ...data,
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

  const formBuilder = (count, type) => {
    return useformGen(count).map((form, index) => {
      return (
        <form
          key={index}
          className={styles["form-container"]}
          onChange={form.handleSubmit((data) => {
            formDataPicker(data, index, type, room.id, room.room_id);
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
                {...form.register("name", {
                  onBlur: (e) => console.log(e),
                })}
                type="text"
                placeholder="نام (لاتین)"
                name="latin-name"
              />
            </div>
            {form.formState.errors.name?.message && (
              <small>{form.formState.errors.name.message}</small>
            )}
          </div>

          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register(
                  "family"
                  // {
                  //   required: ".لطفا نام خانوادگی را به لاتین وارد کنید",
                  // }
                )}
                type="text"
                placeholder="نام خانوادگی (لاتین)"
              />
            </div>
            {form.formState.errors.family?.message && (
              <small>{form.formState.errors.family.message}</small>
            )}
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
                {...form.register(
                  "id_code"
                  // {
                  //   required: "لطفا کدملی را وارد کنید",
                  // }
                )}
                type="text"
                placeholder="کدملی"
              />
            </div>
            {form.formState.errors.id_code?.message && (
              <small>{form.formState.errors.id_code.message}</small>
            )}
          </div>
          {/* "item-form w-15" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register(
                  "birth_day"
                  //  {
                  //   required: "لطفا تاریخ تولد وارد کنید",
                  // }
                )}
                type="text"
                placeholder="تاریخ تولد"
              />
            </div>
          </div>
          {/* "item-form w-10" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register(
                  "passport"
                  // {
                  //   required: "لطفا شماره پاسپورت را وارد کنید",
                  // }
                )}
                type="text"
                placeholder="شماره پاسپورت"
              />
            </div>
          </div>
          {/* "item-form w-15" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                type="text"
                {...form.register(
                  "expired_passport"
                  //  {
                  //   required: "لطفا تاریخ انقضا پاسپورت را وارد کنید",
                  // }
                )}
                placeholder="تاریخ انقضا پاسپورت"
              />
            </div>
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
                      <strong>۲۰۰۰</strong>
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
                      <strong>
                        {numberWithCommas(
                          chdPrcGen(
                            hotelDets?.rooms,
                            hotelDets?.flight,
                            room_type_id
                          )
                        )}
                      </strong>
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
                      <strong>
                        {numberWithCommas(hotelDets.flight.inf_price)}
                      </strong>
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
                      <strong>
                        {numberWithCommas(
                          extBedPrcGen(
                            hotelDets?.rooms,
                            hotelDets?.flight,
                            room_type_id
                          )
                        )}
                      </strong>
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
