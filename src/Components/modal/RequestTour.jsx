import React, {useEffect} from "react";

import { numberWithCommas } from "../../Utils/newTour";
const RequestTour = ({ rooms }) => {
  useEffect(()=>{
    debugger
    console.log(rooms)
  },[rooms])
  return (
    <div
      className="req-container"
      style={{ padding: "2rem 3rem", overflowX: "scroll", margin: "0 auto" }}
    >
      {rooms?.length > 0 ? (
        <div className="">
          <div>
            <div className="rooms">
              <div className="room-title">
                <div className="title">
                  <p>اتاق</p>
                </div>
                <div className="title">
                  <p>قیمت اتاق </p>
                </div>
                <div className="title">
                  <p>تخت اضافه</p>
                </div>
                <div className="title">
                  <p>کودک با تخت</p>
                </div>
                <div className="title">
                  <p>کودک بدون تخت</p>
                </div>
                <div className="title">
                  <p>نوزاد</p>
                </div>
              </div>
              {rooms?.map((price) => {
                return (
                  <div className="room-description">
                    <div className="description">
                      <p style={{ color: "#e20000", fontWeight: 700,whiteSpace:'nowrap' }}>
                        {price?.room_name}
                      </p>
                    </div>
                    {/*}*/}
                    <div className="description">
                      <p>
                        {price?.price
                          ? numberWithCommas(price.price) + "تومان"
                          : "عدم موجودی"}
                      </p>
                    </div>

                    <div className="description">
                      <p>
                        {price?.extra_bed_count === 0
                          ? "عدم موجودی"
                          : numberWithCommas(price?.extra_bed_price) +
                            "تومان"}{" "}
                      </p>
                    </div>

                    <div className="description">
                      <p>
                        {price?.chd_w_price === 0 ||
                        price?.roomChdCapacity === 0
                          ? "عدم موجودی"
                          : numberWithCommas(price?.chd_w_price) + "تومان"}{" "}
                      </p>
                    </div>

                    <div className="description">
                      <p>
                        {" "}
                        {price?.chd_n_price === 0 ||
                        price?.roomChdCapacity === 0
                          ? "عدم موجودی"
                          : numberWithCommas(price?.chd_n_price) + "تومان"}{" "}
                      </p>
                    </div>

                    <div className="description">
                      <p>{numberWithCommas(price?.inf_price) + "تومان"} </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ padding: 0, margin: 0 }}>متاسفانه اتاقی یافت نشد.</p>
        </div>
      )}
    </div>
  );
};

export default RequestTour;
