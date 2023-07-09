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
}) => {
  // console.log("dasd", [room]);
  const [dataq, setDataq] = useState();
  const { register, handleSubmit } = useForm();
  const [formCount, setFormCount] = useState(2);
  const forms = [...Array(formCount)].map(() => useForm());

  useEffect(() => {
    console.log("dsjfgsjk", dataq);
  }, [dataq]);

  const useformGen = (count) => {
    const forms = [...Array(count)].map(() => useForm());
    return forms;
  };

  const onSubmit = (data, index) => {
    console.log(`Form ${index + 1} data:`, data);
  };

  const adlFormGen = (humanType, type) => {
    const formArr = [];
    if (humanType === 0) {
      return null;
    } else {
      for (let i = 0; i < humanType; i++) {
        formArr.push(
          <div className={styles["form-container"]}>
            <div className={styles["item-form"]}>
              {/* "inp-form mt-2" */}
              <div className={styles["inp-form"]}>
                <select
                  name=""
                  id=""
                  {...register(`gender${type}${humanType}`)}
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
                  {...register(`firstname${type}${humanType}`)}
                  type="text"
                  placeholder="نام (لاتین)"
                />
              </div>
            </div>

            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  {...register(`lastname${type}${humanType}`)}
                  type="text"
                  placeholder="نام خانوادگی (لاتین)"
                />
              </div>
            </div>

            <div className={styles["item-form"]}>
              {/* "inp-form mt-2" */}
              <div className={styles["inp-form"]}>
                <select
                  {...register(`nationality${type}${humanType}`)}
                  name=""
                  id=""
                >
                  <option value="1">ایرانی</option>
                  <option value="0">غیر ایرانی</option>
                </select>
              </div>
            </div>

            {/* "item-form w-15" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  {...register(`idcode${type}${humanType}`)}
                  type="text"
                  placeholder="کدملی"
                />
              </div>
            </div>
            {/* "item-form w-15" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  {...register(`birthdate${type}${humanType}`)}
                  type="text"
                  placeholder="تاریخ تولد"
                />
              </div>
            </div>
            {/* "item-form w-10" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input
                  {...register(`passport${type}${humanType}`)}
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
                  {...register(`exppassport${type}${humanType}`)}
                  placeholder="تاریخ انقضا پاسپورت"
                />
              </div>
            </div>
          </div>
        );
      }
    }

    return formArr;
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
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
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

                {adlFormGen(room.adl_count, "adl")?.map((form) => {
                  return form;
                })}
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

                {/* {adlFormGen(room.chd_count, "chd")?.map((form) => {
                  return form;
                })} */}
                {useformGen(room.chd_count).map((form, index) => {
                  return (
                    <form
                      key={index}
                      className={styles["form-container"]}
                      onChange={() => {
                        form.handleSubmit((data) => {
                          setDataq([data]);
                          console.log("fsdds", dataq);
                        });
                      }}
                    >
                      <div className={styles["item-form"]}>
                        {/* "inp-form mt-2" */}
                        <div className={styles["inp-form"]}>
                          <select
                            name=""
                            id=""
                            {...form.register(`genderchd${index}`)}
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
                            {...form.register(`firstnamechd${index}`)}
                            type="text"
                            placeholder="نام (لاتین)"
                          />
                        </div>
                      </div>

                      <div className={styles["item-form"]}>
                        <div className={styles["inp-form"]}>
                          <input
                            {...form.register(`lastnamechd${index}`)}
                            type="text"
                            placeholder="نام خانوادگی (لاتین)"
                          />
                        </div>
                      </div>

                      <div className={styles["item-form"]}>
                        {/* "inp-form mt-2" */}
                        <div className={styles["inp-form"]}>
                          <select
                            {...form.register(`nationalitychd${index}`)}
                            name=""
                            id=""
                          >
                            <option value="1">ایرانی</option>
                            <option value="0">غیر ایرانی</option>
                          </select>
                        </div>
                      </div>

                      {/* "item-form w-15" */}
                      <div className={styles["item-form"]}>
                        <div className={styles["inp-form"]}>
                          <input
                            {...form.register(`idcodechd${index}`)}
                            type="text"
                            placeholder="کدملی"
                          />
                        </div>
                      </div>
                      {/* "item-form w-15" */}
                      <div className={styles["item-form"]}>
                        <div className={styles["inp-form"]}>
                          <input
                            {...form.register(`birthdatechd${index}`)}
                            type="text"
                            placeholder="تاریخ تولد"
                          />
                        </div>
                      </div>
                      {/* "item-form w-10" */}
                      <div className={styles["item-form"]}>
                        <div className={styles["inp-form"]}>
                          <input
                            {...form.register(`passportchd${index}`)}
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
                            {...form.register(`exppassportchd${index}`)}
                            placeholder="تاریخ انقضا پاسپورت"
                          />
                        </div>
                      </div>
                      <input type="submit" value={`Submit Form ${index + 1}`} />
                    </form>
                  );
                })}
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
                {/* {adlFormGen(room.inf_count, "inf")?.map((form) => {
                  return form;
                })} */}

                {useformGen(room.inf_count).map((form, index) => {
                  return (
                    <form
                      key={index}
                      className={styles["form-container"]}
                      onChange={form.handleSubmit((data) =>
                        onSubmit(data, index)
                      )}
                    >
                      <div className={styles["item-form"]}>
                        {/* "inp-form mt-2" */}
                        <div className={styles["inp-form"]}>
                          <select
                            name=""
                            id=""
                            {...form.register(`genderchd${index}`)}
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
                            {...form.register(`firstnamechd${index}`)}
                            type="text"
                            placeholder="نام (لاتین)"
                          />
                        </div>
                      </div>

                      <div className={styles["item-form"]}>
                        <div className={styles["inp-form"]}>
                          <input
                            {...form.register(`lastnamechd${index}`)}
                            type="text"
                            placeholder="نام خانوادگی (لاتین)"
                          />
                        </div>
                      </div>

                      <div className={styles["item-form"]}>
                        {/* "inp-form mt-2" */}
                        <div className={styles["inp-form"]}>
                          <select
                            {...form.register(`nationalitychd${index}`)}
                            name=""
                            id=""
                          >
                            <option value="1">ایرانی</option>
                            <option value="0">غیر ایرانی</option>
                          </select>
                        </div>
                      </div>

                      {/* "item-form w-15" */}
                      <div className={styles["item-form"]}>
                        <div className={styles["inp-form"]}>
                          <input
                            {...form.register(`idcodechd${index}`)}
                            type="text"
                            placeholder="کدملی"
                          />
                        </div>
                      </div>
                      {/* "item-form w-15" */}
                      <div className={styles["item-form"]}>
                        <div className={styles["inp-form"]}>
                          <input
                            {...form.register(`birthdatechd${index}`)}
                            type="text"
                            placeholder="تاریخ تولد"
                          />
                        </div>
                      </div>
                      {/* "item-form w-10" */}
                      <div className={styles["item-form"]}>
                        <div className={styles["inp-form"]}>
                          <input
                            {...form.register(`passportchd${index}`)}
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
                            {...form.register(`exppassportchd${index}`)}
                            placeholder="تاریخ انقضا پاسپورت"
                          />
                        </div>
                      </div>
                      <input type="submit" value={`Submit Form ${index + 1}`} />
                    </form>
                  );
                })}
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
                {adlFormGen(room.extra_count, "ext")?.map((form) => {
                  return form;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPasserngers;
