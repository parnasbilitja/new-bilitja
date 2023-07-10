import React, { useEffect, useState } from "react";
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
import {
  chdPrcGen,
  extBedPrcGen,
  numberWithCommas,
} from "../../../Utils/newTour";
import { useForm } from "react-hook-form";
const InfoPasserngers = ({
  room,
  roomName,
  room_type_id,
  hotelDets,
  dataq,
  setDataq,
}) => {

  const formDataPicker = (data, id, type, roomid) => {
    
    const find = dataq.passengers.filter((data) => data.id === `${id}${type}`);
    if (find) {
      setDataq(dataq.passengers.filter((data) => data.id !== `${id}${type}`));
      setDataq((prev) => [
        ...prev,
        {
          passengers: [
            ...prev.passengers,
            {
              bed_type: type === "ext" ? "extra" : "normal",
              type,
              id: `${id}${type}`,
              ...data,
            },
          ],
          room_id: room.room_id,
          id: room.id,
        },
      ]);
    } else {
      setDataq((prev) => [
        ...prev,
        {
          passengers: [
            ...prev.passengers,
            {
              bed_type: type === "ext" ? "extra" : "normal",
              type,
              id: `${id}${type}`,
              ...data,
            },
          ],
          room_id: room.room_id,
          id: room.id,
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
            formDataPicker(data, index, type, room.id);
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
              />
            </div>
          </div>

          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register("family")}
                type="text"
                placeholder="نام خانوادگی (لاتین)"
              />
            </div>
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
              />
            </div>
          </div>
          {/* "item-form w-15" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register("birth_day")}
                type="text"
                placeholder="تاریخ تولد"
              />
            </div>
          </div>
          {/* "item-form w-10" */}
          <div className={styles["item-form"]}>
            <div className={styles["inp-form"]}>
              <input
                {...form.register("passport")}
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
                {...form.register("expired_passport")}
                placeholder="تاریخ انقضا پاسپورت"
              />
            </div>
          </div>
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
