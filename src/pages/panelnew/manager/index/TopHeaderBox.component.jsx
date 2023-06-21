import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchway,
  faBlog,
  faCalculator,
  faDollarSign,
  faHome,
  faHotel,
  faInfo,
  faInfoCircle,
  faMapMarked,
  faPlane,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";

export const TopHeaderBox = () => {
  return (
    <div className="">
      <div className="row ">
        <div className="col-lg-2">
          <div className=" panel-header-box cursor-pointer hover-shadow px-2">
            <div className="row mt-2 p-1">
              <div className="col-6 my-1 text-right">
                <h5 className="font-bold-iransanse">پرواز </h5>
              </div>
              <div className="col-6 my-1 text-left">
                <FontAwesomeIcon
                  icon={faPlaneDeparture}
                  className="text-danger font-size-32"
                />
              </div>
              <div className="text-right border-bottom">
                {" "}
                <h5 className="font-bold-iransanse font-size-16">3</h5>
              </div>

              <div className="row mx-1 p-0">
                <div className="col-10 text-right">
                  <span className="text-muted font-size-13">
                    پرواز های 24 ساعت آینده
                  </span>
                </div>
                <div className="col-2 text-left">
                  <FontAwesomeIcon icon={faPlane} className="text-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className=" panel-header-box cursor-pointer hover-shadow px-2">
            <div className="row mt-2 p-1">
              <div className="col-6 my-1 text-right">
                <h5 className="font-bold-iransanse">هتل </h5>
              </div>
              <div className="col-6 my-1 text-left">
                <FontAwesomeIcon
                  icon={faHotel}
                  className="font-size-32 text-danger"
                />
              </div>
              <div className="text-right border-bottom">
                {" "}
                <h5 className="font-size-16 font-bold-iransanse">5</h5>
              </div>

              <div className="row mx-1 p-0">
                <div className="col-10 text-right">
                  <span className="font-size-13 text-muted">
                    مشاهده لیست هتل ها
                  </span>
                </div>
                <div className="col-2 text-left">
                  <FontAwesomeIcon icon={faHotel} className="text-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className=" panel-header-box cursor-pointer hover-shadow px-2">
            <div className="row mt-2 p-1">
              <div className="col-6 my-1 text-right">
                <h5 className="font-bold-iransanse">تور </h5>
              </div>
              <div className="col-6 my-1 text-left">
                <FontAwesomeIcon
                  icon={faMapMarked}
                  className="font-size-32 text-danger"
                />
              </div>
              <div className="text-right border-bottom">
                {" "}
                <h5 className="font-size-16 font-bold-iransanse">30</h5>
              </div>

              <div className="row mx-1 p-0">
                <div className="col-10 text-right">
                  <span className="font-size-13 text-muted">مشاهده جزئیات</span>
                </div>
                <div className="col-2 text-left">
                  <FontAwesomeIcon icon={faHome} className="text-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className=" panel-header-box cursor-pointer hover-shadow px-2">
            <div className="row mt-2 p-1">
              <div className="col-6 my-1 text-right">
                <h5 className="font-bold-iransanse">ویلا </h5>
              </div>
              <div className="col-6 my-1 text-left">
                <FontAwesomeIcon
                  icon={faArchway}
                  className="font-size-32 text-danger"
                />
              </div>
              <div className="text-right border-bottom">
                {" "}
                <h5 className="font-size-16 font-bold-iransanse">3</h5>
              </div>

              <div className="row mx-1 p-0">
                <div className="col-10 text-right">
                  <span className="font-size-13 text-muted">
                    پرواز های 24 ساعت آینده
                  </span>
                </div>
                <div className="col-2 text-left ltr">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-muted "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className=" panel-header-box cursor-pointer hover-shadow px-2">
            <div className="row mt-2 p-1">
              <div className="col-6 my-1 text-right">
                <h5 className="font-bold-iransanse">بلاگ </h5>
              </div>
              <div className="col-6 my-1 text-left">
                <FontAwesomeIcon
                  icon={faBlog}
                  className="font-size-32 text-danger"
                />
              </div>
              <div className="text-right border-bottom">
                {" "}
                <h5 className="font-size-16 font-bold-iransanse">0</h5>
              </div>

              <div className="row mx-1 p-0">
                <div className="col-10 text-right">
                  <span className="font-size-13 text-muted">
                    مشاهده لیست بلاگ ها
                  </span>
                </div>
                <div className="col-2 text-left">
                  <FontAwesomeIcon icon={faBlog} className="text-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className=" panel-header-box cursor-pointer hover-shadow px-2">
            <div className="row mt-2 p-1">
              <div className="col-6 my-1 text-right">
                <h5 className="font-bold-iransanse">مالی </h5>
              </div>
              <div className="col-6 my-1 text-left">
                <FontAwesomeIcon
                  icon={faCalculator}
                  className="font-size-32 text-danger"
                />
              </div>
              <div className="text-right border-bottom">
                {" "}
                <h5 className="font-size-16 font-bold-iransanse">175</h5>
              </div>

              <div className="row mx-1 p-0">
                <div className="col-10 text-right">
                  <span className="font-size-13 text-muted">میزان موجودی</span>
                </div>
                <div className="col-2 text-left">
                  <FontAwesomeIcon icon={faDollarSign} className="text-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
