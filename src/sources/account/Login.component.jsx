import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import PrimaryTextInput from "../../sources/component/PrimaryTextInput.component";
import styles from "../../../styles/PrimaryButton.module.scss";

import { connect } from "react-redux";
import { accountBoxModify, messageBoxModify } from "../../Redux/UI/ui.action";

import globals from "../Global";
import { Loader } from "./../../Utils/Loader";

import Countdown from "react-countdown";
import {
  checkUserLogged,
  getUserInfo,
} from "../../Redux/Account/account.action";
import { useState } from "react";
const Login = (props) => {
    const [state,setState] = useState({
      btn_disabled: false,
      loading: false,
      login_with_code: true,
      get_mobile_status: false,
      btn_text: "ثبت کد احراز هویت",
      mobile: "",
      password: "",
      token: "",
      error: false,
      errText: "",
    });
  

  const handleLoginWithCode = () => {
    setState({...state,
      login_with_code: true,
      password: "",
      btn_text: "دریافت کد احراز هویت",
    });
  };
  // const handleLoginWithPassword = () => {
  //   setState({...state,
  //     login_with_code: false,
  //     token: "",
  //     btn_text: "ورود به حساب",
  //   });
  // };
useEffect(() => {
  const handleSetMobile = () => {
    let mobile = localStorage.getItem("mobile");
    if( String(mobile).length ==11){
      setState({...state, mobile: mobile, error: false, errText: "" })
    };
  };
  handleSetMobile();
},[])
  const handleSetToken = (e) => {
    setState({...state, token: e.target.value, error: false, errText: "" });
  };
  // const handleSetPassword = (e) => {
  //   setState({...state, password: e.target.value, error: false, errText: "" });
  // };

  // const login = () => {
  //   setState({...state, btn_disabled: true, loading: true });
  //   fetch(`${globals.baseUrlNew}auth/getMobile`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       mobile: state.mobile,
  //       token: state.token,
  //       password: state.password,
  //       register: 0,
  //       hostname: "bilitja.com",
  //       customerId: "1a157116-a01a-4027-ab10-74098ac63815",
  //       agencyName: "بلیطجا",
  //       telNumber: "02157874",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status == "0") {
  //         setState({...state,
  //           btn_disabled: false,
  //           loading: false,
  //           get_mobile_status: true,
  //           btn_text: "تایید کد احراز هویت",
  //         });
  //       } else if (data.status == "10") {
  //         setState({...state, btn_disabled: false, loading: false });
  //         localStorage.setItem("mobile", data.mobile);
  //         localStorage.setItem("token", data.token);
  //         props.checkUserLogged();
  //         props.getUserInfo({
  //           mobile: data.mobile,
  //         });
  //         props.accountBoxModify({
  //           state: false,
  //           type: "authentication",
  //         });
  //         // props.addAccountProperties({
  //         //   token: data.token,
  //         //   dateLogin: moment().format("YYYY/MM/DD"),
  //         // });
  //         props.messageBoxModify({
  //           color:true,
  //           state: true,
  //           message: "ورود شما موفقیت آمیز بود.",
  //         });
  //         props.accountBoxModify({
  //           state: false,
  //           type: "authentication",
  //         });
  //       } else if (data.status === "-111") {
  //         setState({...state,
  //           btn_disabled: false,
  //           loading: false,
  //           error: true,
  //           errText:
  //             "چنین شماره موبایلی در سامانه ثبت نشده است، لطفا ثبت نام کنید.",
  //         });
  //       } else if (data.status === "-200") {
  //         setState({...state,
  //           btn_disabled: false,
  //           loading: false,
  //           error: true,
  //           errText: "شماره موبایل یا رمز ثابت نادرست می باشد.",
  //         });
  //       } else {
  //         setState({...state,
  //           btn_disabled: false,
  //           loading: false,
  //           error: true,
  //           errText: data.message,
  //         });
  //       }
  //     });
  // };

  const loginWithToken = () => {
    console.log(state);
    setState({...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: state.mobile,
        token: state.token,
        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02157874",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "2" || data.status == "1") {
          setState({...state, btn_disabled: false, loading: false });
          localStorage.setItem("mobile", data.mobile);
          localStorage.setItem("token", data.token);
          props.checkUserLogged();
          props.getUserInfo({
            mobile: data.mobile,
          });
          props.accountBoxModify({
            state: false,
            type: "authentication",
          });
          props.messageBoxModify({
            color:true,
            state: true,
            message: "ورود شما موفقیت آمیز بود.",
          });
          props.accountBoxModify({
            state: false,
            type: "authentication",
          });
        } else if (data.status == "-103") {
          setState({...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "کد احراز هویت وارد شده نادرست می باشد.",
          });
        } else if (data.status == "-104") {
          setState({...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        } else {
          setState({...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "لطفا از اتصال خود به اینترنت اطمینان حاصل کنید.",
          });
        }
      });
  };

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setState({...state,
        get_mobile_status: false,
        btn_text: "  دریافت مجدد کد احراز هویت",
      });
      return null;
    } else {
      return (
        <span className="font-bold-iransanse text-danger">
          {minutes}:{seconds}
        </span>
      );
    }
  };
    return (
      <div className="popup-content-container">
        <div className="popup-heading text-center">
          <span>کد را وارد کنید</span>
          <span
            className="pull-left exit-form"
            onClick={() => {
              props.accountBoxModify({
                state: false,
              });
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        {/* <div className="row btn-container-header-login rounded-pill m-2">
          <button
            className={
              state.login_with_code === true
                ? "btn btn-header-login-active col-6 rounded-pill"
                : "btn btn-header-login col-6 rounded-pill"
            }
            onClick={handleLoginWithCode}
          >
            ورود با رمز یکبار مصرف
          </button>
          <button
            className={
              state.login_with_code === false
                ? "btn btn-header-login-active col-6 rounded-pill"
                : "btn btn-header-login col-6 rounded-pill"
            }
            onClick={handleLoginWithPassword}
          >
            ورود با رمز ثابت
          </button>
        </div> */}
        {state.error === true ? (
          console.log(state.errText),
          <div className="alert alert-danger">{state.errText !==undefined ? state.errText:'شماره وارد شده باید ۱۱ رقم باشد'}</div>
        ) : null}
        <div className="container">
          <div className="row mb-2">
            {/* <div className="col-1 padding-horizental-3px"> */}
              {/* <FontAwesomeIcon icon={faUser} className="margin-top-20px" /> */}
            </div>
            {/* <div className="col-11 padding-horizental-3px">
              <div>
                <input
                  className="form-input-auth px-2 col-12"
                  placeholder="نام کاربری ( شماره همراه )"
                  name="mobile"
                  onChange={handleSetMobile}
                  disabled={
                    state.login_with_code === true
                      ? state.get_mobile_status === true
                        ? true
                        : false
                      : null
                  }
                  inputMode="numeric"
                />
              </div>
            </div> */}
          {/* </div> */}
          {/* {state.login_with_code === true ? (
            <div className="row mb-2">
              <div className="col-1 padding-horizental-3px">
                <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
              </div>
              <div className="col-11 padding-horizental-3px">
                <div>
                  <input
                    className="form-input-auth px-2 col-12"
                    placeholder="رمز عبور"
                    name="password"
                    onChange={handleSetPassword}
                    inputMode="numeric"
                    type="password"
                  />
                </div>
              </div>
            </div>
          ) : null} */}
          {state.get_mobile_status === false ? (
            <div className="row mb-2">
              <div className="col-1 padding-horizental-3px">
                <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
              </div>
              <div className="col-11 padding-horizental-3px">
                <div>
                  <input
                    className="form-input-auth px-2 col-12"
                    placeholder="کد ارسال شده را وارد نمایید."
                    name="moaref"
                    onChange={handleSetToken}
                    autoFocus
                    inputMode="numeric"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="row mt-3">
          <div className=" without-focus col-12">
            <button
              onClick={(e) => {
                loginWithToken();
              }}
              className={
                props.disabled === false
                  ? "btn btn-info py-3 mb-3 col-12 btn-block"
                  : `${styles["primary-button"]} py-2`
              }
              disabled={state.btn_disabled}
            >
              {state.loading === false ? state.btn_text : <Loader />}
            </button>
          </div>
        </div>
        {state.get_mobile_status === true ? (
          <div className="row mt-3 text-center">
            <div className="col-12">
              <Countdown renderer={renderer} date={Date.now() + 60000} />
            </div>
          </div>
        ) : null}

        {/* <div className="row">
          <div className="col-12 no-padding-horizental">
            <br />
            <p className="text-center font-size-13 no-margin font-bold-iransanse">
              حساب کاربری ندارید؟{" "}
              <a
                onClick={() => {
                  props.accountBoxModify({
                    state: true,
                    type: "register",
                  });
                }}
                className="cursor-pointer"
              >
                {" "}
                ( ثبت نــام جدید )
              </a>
            </p>
          </div>
        </div>
        <div className="row">
          <div
            style={{ marginTop: -20 }}
            className="col-12 no-padding-horizental"
          >
            <br />
            <p className="text-center font-size-13 no-margin font-bold-iransanse">
              گذرواژه خود را فراموش کرده اید؟{" "}
              <a
                onClick={() => {
                  props.accountBoxModify({
                    state: true,
                    type: "forget",
                  });
                }}
                className="cursor-pointer"
              >
                {" "}
                (بازیابی گذرواژه )
              </a>
            </p>
          </div>
        </div> */}
        {/*<div className="row">
                    
                   
                     <div className="col-lg-6 col-md-6 col-sm-6 col-12 no-padding-horizental">
                        <br />
                        <p className="text-center no-margin font-size-13" onClick={() => {
                            props.accountBoxModify({
                                state: true,
                                type: 'forget'
                            })
                        }}>رمز عبور را فراموش کرده ام</p>
                    </div> 
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 no-padding-horizental">
                        <br />
                        <p className="text-center font-size-13 no-margin" onClick={() => {
                            props.accountBoxModify({
                                state: true,
                                type: 'register'
                            })
                        }}>ثبت نام</p>
                    </div> 
                </div>*/}
      </div>
    );
}
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
  checkUserLogged: () => dispatch(checkUserLogged()),
  getUserInfo: (value) => dispatch(getUserInfo(value)),
});
export default connect(null, mapDispatchesToProps)(Login);
