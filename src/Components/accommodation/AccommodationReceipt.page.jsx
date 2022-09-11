import React, { useState } from "react";
import "../../../styles/AccommodationReceipt.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import PrimaryTextInput from "../component/PrimaryTextInput.component";
import PrimaryButton from "../component/PrimaryButton.component";

import { selectProperties } from "../../Redux/Reservevilla/reserve_villa.reselect";
import { connect } from "react-redux";
import globals from "../../Globals/Global";

import { messageBoxModify } from "../../Redux/UI/ui.action";
const AccommodationReceipt = (props) => {
  
    const [state,setState] = useState({});
  

  const handeChange = (e) => {
    const { name, value } = e.target;
    setState({...state,
      [name]: value,
    });
  };

  const validation = () => {
    const errors = {
      familyErr: "",
      nationalCodeErr: "",
      mobileNoErr: "",
    };
    let validated = true;
    if (
      state.NameFamily == null ||
      state.NameFamily == "" ||
      state.NameFamily == undefined
    ) {
      errors["familyErr"] = "لطفا نام و نام خانوادگی خود را وارد کنید";
      validated = false;
    }
    if (
      state.NationalCode == null ||
      state.NationalCode == "" ||
      state.NationalCode == undefined
    ) {
      errors["nationalCodeErr"] = "لطفا کد ملی خود را وارد کنید";
      validated = false;
    }
    if (
      state.MobileNo == null ||
      state.MobileNo == "" ||
      state.MobileNo == undefined
    ) {
      errors["mobileNoErr"] = "لطفا شماره موبایل خود را وارد کنید";
      validated = false;
    }
    setState({...state,
      ...errors,
    });
    return validated;
  };

    return (
      <div className="container-fluid accommodation-receipt">
        <br />
        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-0 col-0"></div>
          <div className="col-lg-10 col-12">
            <h1 className="border-bottom-black font-size-18 text-right padding-5px">
              اطلاعات رزرو شماره
            </h1>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-20 font-bold-iransanse">
                      استخردار مستقل شیک در چالوس
                    </h1>
                  </div>
                  <div className="row padding-10px">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                      <FontAwesomeIcon icon={faClock} />
                      <span>
                        {" "}
                        شهر : {props.selectProperties.CityName}{" "}
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                      <FontAwesomeIcon icon={faClock} />
                      <span>
                        {" "}
                        محدوده : {props.selectProperties.AddressName}{" "}
                      </span>
                    </div>
                    <div className="col-lg-12 col-md-4 col-sm-4 col-6">
                      <FontAwesomeIcon icon={faClock} />
                      <span>
                        {" "}
                        آدرس : {props.selectProperties.Address}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <br />
                <div className="border-pill text-right">
                  <div className="border-bottom-black padding-10px">
                    <h1 className="font-size-20 font-bold-iransanse">
                      استخردار مستقل شیک در چالوس
                    </h1>
                  </div>
                  <div className="row padding-10px">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                      <div
                        className={` form-input-border  ${styles["form-input-border-private"]} `}
                      >
                        <PrimaryTextInput
                          placeholder={"نام و نام‌خانوادگی"}
                          name="NameFamily"
                          onChange={handeChange}
                        />
                      </div>
                      <span className="color-secondary error-message">
                        {state.familyErr}
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6 padding-horizental-3px">
                      <div
                        className={` form-input-border  ${styles["form-input-border-private"]} `}
                      >
                        <PrimaryTextInput
                          placeholder={"کد ملی"}
                          name="NationalCode"
                          onChange={handeChange}
                        />
                      </div>
                      <span className="color-secondary error-message">
                        {state.nationalCodeErr}
                      </span>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-6">
                      <div
                        className={` form-input-border  ${styles["form-input-border-private"]} `}
                      >
                        <PrimaryTextInput
                          placeholder={"شماره موبایل"}
                          name="MobileNo"
                          onChange={handeChange}
                        />
                      </div>
                      <span className="color-secondary error-message">
                        {state.mobileNoErr}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 text-right">
                <div className="border-pill padding-5px">
                  <p className="font-size-12">قیمت ها به هزار تومان می‌باشد</p>
                  <p className="border-bottom-black font-size-13 margin-top-20px margin-bottom-5px">
                    روز های انتخاب شده شما (قیمت ها به تومان می‌باشد)
                  </p>
                  <div className="row">
                    <div className="col-lg-1 col-1"></div>
                    <div className="col-lg-5 col-5 border-pill padding-5px">
                      <span className="font-size-13">
                        <FontAwesomeIcon icon={faCalendar} />
                        &nbsp;تاریخ ورود :{" "}
                        {props.selectProperties.selectedDaysArray[0][0]}
                      </span>
                    </div>
                    &nbsp;&nbsp;
                    <div className="col-lg-5 col-5 border-pill padding-5px">
                      <span className="font-size-13">
                        <FontAwesomeIcon icon={faCalendar} />
                        &nbsp;تاریخ خروج :
                        {
                          props.selectProperties.selectedDaysArray[
                            props.selectProperties.selectedDaysArray
                              .length - 1
                          ][0]
                        }
                      </span>
                    </div>
                  </div>
                  <p className="border-bottom margin-top-10px margin-bottom-5px"></p>
                  <div className="font-size-14 padding-10px">
                    {props.selectProperties.selectedDaysArray.map(
                      (day) => (
                        <div className="row">
                          <div className="col-lg-3 col-md-3 col-sm-4 col-6 font-size-13 font-bold-iransanse">
                            {day[0]}
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-8 col-6 font-size-13 font-bold-iransanse">
                            {day[1] != null ? day[1] : "قیمتی ثبت نشده است"}
                          </div>
                        </div>
                      )
                    )}
                    <span className="pull-left">
                      {props.selectProperties.selectedDaysArray.reduce(
                        (a, b) => a + (b[1] || 0),
                        0
                      )}{" "}
                      تومان
                    </span>
                    <span>مبلغ کل</span>
                  </div>
                  <div className="font-size-14 padding-10px">
                    <span className="pull-left">0 تومان</span>
                    <span>اعتبار کیف پول شما :‌</span>
                  </div>
                  <div className="font-size-14 padding-10px">
                    <span className="pull-left">0 تومان</span>
                    <span>مبلغ قابل پرداخت :‌</span>
                  </div>
                  <div className="row">
                    <div className="col-lg-1 col-1"></div>
                    <div className="col-lg-5 col-5 no-padding">
                      <a
                        className="btn-encouregment"
                        onClick={() => {
                          if (!validation()) {
                            return;
                          }
                          const requestObject = {
                            EghamatId: parseInt(
                              props.selectProperties.EghamatId
                            ),
                            RoomRow: props.selectProperties.RoomRow,
                            DateInc:
                              props.selectProperties.DateInc.replace(
                                "/",
                                ""
                              ).replace("/", ""),
                            NightCount: props.selectProperties.NightCount,
                            NameFamily: state.NameFamily,
                            NationalCode: state.NationalCode,
                            MobileNo: state.MobileNo,
                            Email: "",
                            PassengerDsc: "",
                          };

                          fetch(`${globals.baseUrl}bj/site/reserve`, {
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            body: JSON.stringify(requestObject),
                          })
                            .then((res) => res.json())
                            .then((json) => {
                              if (json.status == "OK") {
                                const properties = String(json.message).split(
                                  "-"
                                );
                                window.open(
                                  `Https://bilitja.ravis.ir/ApplicationBank/CallBank?reqNo=${properties[0]}&reqPnr=${properties[1]}`
                                );
                              } else {
                                props.messageBoxModify({
                                  color:false,
                                  state: true,
                                  message: json.message,
                                });
                              }
                            });
                        }}
                      >
                        پرداخت با کارت شتاب
                      </a>
                    </div>
                    &nbsp;&nbsp;
                    <div className="col-lg-5 col-5 no-padding">
                      <PrimaryButton
                        style={{ fontSize: 14 }}
                        value={"پرداخت از کیف پول"}
                      />
                    </div>
                  </div>
                  <div className="padding-horizental-10px">
                    <a className="btn-outlined-cancle-tall accommodation-back">
                      بازگشت
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => ({
  selectProperties: selectProperties(state),
});
const dispatchStateToProps = (dispatch) => ({
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default connect(
  mapStateToProps,
  dispatchStateToProps
)(AccommodationReceipt);
