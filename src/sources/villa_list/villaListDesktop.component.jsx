import React from "react";
import Image from "next/image";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import HotelView from '../../../Images/hotel_view.jpg'
import { useRouter } from "next/router";
import Link from "next/link";

const villaListDesktop = ({ history, villaList }) => {
  const myRouter = useRouter();
  return (
    <div className="hidden-xs">
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
            <div className="hotel_row">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4">
                  <img
                    width=""
                    height=""
                    alt="بلبطجا - پیشنمایش هتل"
                    src="../../../Images/hotel_view.jpg"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                  <div className="row">
                    <div className="col-lg-9 col-md-9 col-sm-9 no-padding">
                      <p className="font-bold-iransanse no-margin">
                        {villa.Name}
                      </p>
                      <p className="font-bold-iransanse no-margin">تهران</p>
                      <span className="pull-right start-box">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                      </span>
                      <br />
                      <p className="font-size-12">موقعیت:{villa.AddressName}</p>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3">
                      <p className="font-size-13 color-textpill">
                        کد:{villa.EghamatId}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 text-center border-right-pill padding-r-5">
                  <br />
                  <p className="no-margin font-size-13">شروع قیمت</p>
                  <p className="no-margin font-size-13">از شبی {highest}</p>
                  <p className="no-margin font-size-13">تومان</p>

                  <Link href={`/reserve/villa/tehran/${villa.EghamatId}`}
                    className="btn-outlined-cancle villa-reserve-btn "
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   myRouter.push(`/reserve/villa/tehran/${villa.EghamatId}`);
                    // }}
                  >
                    رزرو
                  </Link>
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

export default villaListDesktop;
