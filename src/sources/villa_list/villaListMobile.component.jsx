import React from "react";
import Image from "next/image";
//import HotelView from '../../../Images/hotel_view.jpg'

import { useRouter } from "next/router";
import Link from "next/link";

const villaListMobile = ({ history, villaList }) => {
  const myRouter = useRouter();
  return (
    <div className="visible-xs">
      {villaList ? (
        villaList.map((villa) => {
          let highest = 0;
          villa.Rooms.forEach(
            (room) => {
              if (room.StartPrice > highest) {
                highest = room.StartPrice;
              }
            },
            {
              amount: Number.MIN_SAFE_INTEGER,
            }
          );
          return (
            <div className="hotel_row_mobile">
              <div className="row">
                <div className="col-5">
                  <img
                    width=""
                    height=""
                    alt="بلیطجا - پیشنمایش هتل"
                    src="../../../Images/hotel_view.jpg"
                  />
                </div>
                <div className="col-7 text-right no-padding">
                  <div className="row">
                    <div className="col-7">
                      <p className="font-bold-iransanse no-margin text-overflow">
                        {villa.Name}
                      </p>
                      <p className="font-bold-iransanse no-margin">تهران</p>
                      <p className="font-size-12">موقعیت:{villa.AddressName}</p>
                      <p className="font-size-12">هر شب از {highest} تومان</p>
                    </div>
                    <div className="col-4">
                      <p className="font-size-13 color-textpill">
                        کد:{villa.EghamatId}
                      </p>
                      <p className="font-size-13 color-textpill no-margin">
                        1 شب
                      </p>
                      <Link href={"/reserve/villa/tehran"}
                        className="btn-outlined-cancle villa-reserve-btn"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   myRouter.push("/reserve/villa/tehran");
                        // }}
                      >
                        رزرو
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="alert alert-warning text-right">
          {" "}
          لیست ویلاها خالی می‌باشد{" "}
        </div>
      )}
    </div>
  );
};

export default villaListMobile;
