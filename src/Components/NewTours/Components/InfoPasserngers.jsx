import React, { useEffect } from "react";
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
const InfoPasserngers = ({ room, roomDets, roomName }) => {
  console.log("dasd", [room]);

  const formGen = () => {
    [room];
  };
  const humanType = () => {
    switch (key) {
      case value:
        break;

      default:
        break;
    }
  };
  const adlFormGen = (humanType) => {
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
                <select name="" id="">
                  <option value="1">اقا</option>
                  <option value="0">خانم</option>
                </select>
              </div>
            </div>
            {/* align-items-center w-18 */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input type="text" placeholder="نام (لاتین)" />
              </div>
            </div>

            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input type="text" placeholder="نام خانوادگی (لاتین)" />
              </div>
            </div>

            <div className={styles["item-form"]}>
              {/* "inp-form mt-2" */}
              <div className={styles["inp-form"]}>
                <select name="" id="">
                  <option value="1">ایرانی</option>
                  <option value="0">غیر ایرانی</option>
                </select>
              </div>
            </div>

            {/* "item-form w-15" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input type="text" placeholder="کدملی" />
              </div>
            </div>
            {/* "item-form w-15" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input type="text" placeholder="تاریخ تولد" />
              </div>
            </div>
            {/* "item-form w-10" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input type="text" placeholder="شماره پاسپورت" />
              </div>
            </div>
            {/* "item-form w-15" */}
            <div className={styles["item-form"]}>
              <div className={styles["inp-form"]}>
                <input type="text" placeholder="تاریخ انقضا پاسپورت" />
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
            >
              {/* <label className={styles["label-fix"]}>سرپرست</label> */}
              <div className={styles["price-fix"]}>
                <strong>۲۰۰۰</strong>
                <small>تومان</small>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                {room.adl_count === 0 ? null : (
                  <label className={styles["label-fix-gray"]}>بزرگسال</label>
                )}
                {adlFormGen(room.adl_count)?.map((form) => {
                  return form;
                })}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.chd_count === 0 ? null : (
                  <label className={styles["label-fix-gray"]}>کودک</label>
                )}
                {adlFormGen(room.chd_count)?.map((form) => {
                  return form;
                })}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.inf_count === 0 ? null : (
                  <label className={styles["label-fix-gray"]}>نوزاد</label>
                )}
                {adlFormGen(room.inf_count)?.map((form) => {
                  return form;
                })}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                {room.extra_count === 0 ? null : (
                  <label className={styles["label-fix-gray"]}>تخت اضافه</label>
                )}
                {adlFormGen(room.extra_count)?.map((form) => {
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
