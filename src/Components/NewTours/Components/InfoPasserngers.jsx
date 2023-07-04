import React from "react";
import styles from "../../../../styles/newTour/components/InfoPassengers.module.scss";
const InfoPasserngers = () => {
  return (
    <>
      <div className={styles["box-room"]}>
        <div
          className={`${styles["box-room-Det"]} ${styles["flex-column-mobi"]}`}
        >
          <div className={styles["box-room-Det-name"]}>
            <div className={styles["circle"]}></div>
            <h2>اتاق دوتخته </h2>
          </div>
        </div>
        {/* style="position: relative;" */}
        <div>
          <div>
            <div
              className={`${styles["set-info-passengers"]} ${styles["posi-relative"]}`}
            >
              <label className={styles["label-fix"]}>سرپرست</label>
              <div className={styles["price-fix"]}>
                <strong>۲۰۰۰</strong>
                <small>تومان</small>
              </div>
              <label className={styles["label-fix-gray"]}>بزرگسال</label>

              <div className={styles["item-form"]}>
                {/* "inp-form mt-2" */}
                <div className="inp-form mt-2">
                  <select name="" id="">
                    <option value="1">اقا</option>
                    <option value="0">خانم</option>
                  </select>
                </div>
              </div>

              <div className="item-form align-items-center w-18">
                <div className="inp-form mt-2">
                  <input type="text" placeholder="نام (لاتین)" />
                </div>
              </div>
              <div>
                <div className="inp-form mt-2">
                  <input type="text" placeholder="نام خانوادگی (لاتین)" />
                </div>
              </div>

              <div>
                <div className="inp-form mt-2">
                  <select name="" id="">
                    <option value="0">ایرانی</option>
                    <option value="1">غیرایرانی</option>
                  </select>
                </div>
              </div>

              <div className="item-form w-15">
                <div className="inp-form mt-2">
                  <input type="text" placeholder="کدملی" />
                </div>
              </div>
              <div className="item-form w-15">
                <div className="mt-2">
                  <input type="text" placeholder="تاریخ تولد" />
                </div>
              </div>

              <div className="item-form w-10">
                <div className="inp-form mt-2">
                  <input type="text" placeholder="شماره پاسپورت" />
                </div>
              </div>
              <div className="item-form w-15">
                <div className="mt-2">
                  <input type="text" placeholder="تاریخ انقضا پاسپورت" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPasserngers;
