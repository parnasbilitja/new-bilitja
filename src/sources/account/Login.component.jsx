import React, { useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";

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
import Timer from "../../Utils/Timer";
import Router from "next/router";


const Login = (props) => {
  let route = {
    reqPnr:localStorage.getItem('reqPnr'),
    reqNo:localStorage.getItem('reqNo')
  }
  
  // props.router.push(`/flights/receipt/${route.reqNo}/${route.reqPnr}`)

  const [TimerChecker, setTimerChecker] = useState({
    phoneErrType: false,
    value: false,
    timer: false,
  })
  const [Errors, setErrors] = useState('')
  const [UserMobileAndCode, setUserMobileAndCode] = useState({
    mobile: localStorage.getItem('mobile').length == 11 ? localStorage.getItem('mobile') : "",
    code: ''
  })
  const [TestForValue, setTestForValue] = useState({
    num: false,
    code: false,
  })

  const [state, setState] = useState({
    btn_disabled: false,
    loading: false,
    date: '',
    login_with_code: true,
    get_mobile_status: false,
    btn_text: "ثبت کد احراز هویت",
    // mobile: localStorage.getItem('mobile') | "",
    password: "",
    token: "",
    error: false,
    phoneErrType: false,
    errText: "",
    timer: false,
    minutes: '',
    seconds: '',
    value: false
  });

  const login = () => {
    setState({ ...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        mobile: UserMobileAndCode.mobile,
        password: '',
        register: 0,

        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        hostname: "bilitja.com",
        agencyName: "بلیطجا",
        telNumber: "02157874",
        // token: state.token|'',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "10") {
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
            color: true,
            state: true,
            message: "ورود شما موفقیت آمیز بود.",
          });
          
          props.accountBoxModify({
            state: false,
            type: "authentication",
          });
        } else if (data.status === "-111") {

          register();

        } else if (data.status === "-200") {
          setState({
            ...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "شماره موبایل یا رمز ثابت نادرست می باشد.",
          });
        } else {
          setState({
            ...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        }
      });
  };

  const register = () => {
    setState({ ...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: UserMobileAndCode.mobile,
        token: UserMobileAndCode.code,
        password: UserMobileAndCode.code,
        register: 1,
        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02157874",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "0") {
          setState({
            ...state,
            get_mobile_status: true,
            loading: false,
            register_status: true,
            resend_code: true,
            btn_text: "تایید کد احراز هویت",
          });
        } else if (data.status === "-110") {
          //   setState({...state,
          //     btn_disabled: false,
          //     loading: false,
          //     error: true,
          //     errText:
          //       "این شماره موبایل در سامانه موجود است، لطفا از بخش ورود وارد حساب خود شوید.",
          //   });
        } else {
          setState({
            ...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        }
      });
  };


  const phoneHandler = () => {
    setState({ ...state, phoneErrType: true, timer: false })
    setTestForValue({ code: false, num: false })
    setUserMobileAndCode({ code: '', mobile: '' })
  }

  useEffect(() => {
    if (UserMobileAndCode.mobile.length == 11) {
      localStorage.setItem("mobile", UserMobileAndCode.mobile);
      console.log(UserMobileAndCode.mobile);
    }
  }, [UserMobileAndCode.mobile])
  const handleSetToken = (e) => {
    userMobileHandler(e)
    setState({ ...state, [e.target.name]: e.target.value, error: false, errText: "" });
  };


  useEffect(() => {
    if (localStorage.getItem('mobile').length == 11) {
      setTestForValue({ ...TestForValue, num: true })
      setUserMobileAndCode({ ...UserMobileAndCode, mobile: localStorage.getItem('mobile') })
    }
  }, [])


  const loginWithToken = () => {
    console.log(UserMobileAndCode);
    setState({ ...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        mobile: UserMobileAndCode.mobile,
        token: UserMobileAndCode.code,

        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02157874",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "2" || data.status == "1") {
          localStorage.setItem('loginGoNext',JSON.stringify(1))
          setState({ ...state, btn_disabled: false, loading: false });
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
            color: true,
            state: true,
            message: "ورود شما موفقیت آمیز بود.",
          });
          props.accountBoxModify({
            state: false,
            type: "authentication",
          });
        } else if (data.status == "-103") {
          setState({
            ...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "کد احراز هویت وارد شده نادرست می باشد.",
          });
        } else if (data.status == "-104") {
          setState({
            ...state,
            btn_disabled: false,
            loading: false,
            error: true,
            // errText: data.message,
          });
        } else {
          setState({
            ...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "لطفا شماره خود را وارد کنید",
          });
        }
      });
  };

  const userMobileHandler = (e) => {
    setUserMobileAndCode({ ...UserMobileAndCode, [e.target.name]: e.target.value });
    console.log(UserMobileAndCode);
    console.log(TestForValue);
  }

  return (
    <div className="popup-content-container">

      <div className="popup-heading d-flex align-items-center justify-content-between">
        {TestForValue.num !== true ?
          <span>لطفا شماره خود را وارد کنید</span> : TestForValue.num == true ?
            <span>کد ارسال شده به {UserMobileAndCode.mobile} را وارد کنید</span> : ''
        }
        <span
          className="exit-form position-absolute"
          onClick={() => {
            props.accountBoxModify({
              state: false,
            });
          }} style={{ left: 10 }}
        >
          <CloseOutlined style={{ color: "red" }} />
        </span>
      </div>
      {state.error === true ? (
        console.log(state.errText),
        <div className="alert alert-danger">{state.errText !== undefined ? state.errText : 'شماره یا پسورد اشتباه است'}</div>
      ) : null}
      <div className="container">
        <div className="row mb-2">
          <div className="col-1 padding-horizental-3px">
            <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
          </div>
          <div className="col-11 padding-horizental-3px">
            <div>
              {TestForValue.num == false ?
                <input
                  className="form-input-auth px-2 col-12"
                  placeholder="شماره موبایل"
                  name="mobile"
                  value={UserMobileAndCode.mobile}
                  onChange={e => userMobileHandler(e)}
                  autoFocus
                  inputMode="numeric"
                />
                :
                TestForValue.num == true && TestForValue.code == false ?
                  <input
                    className="form-input-auth px-2 col-12"
                    value={UserMobileAndCode.code}
                    placeholder="کد ارسال شده را وارد نمایید."
                    name="code"
                    onChange={e => userMobileHandler(e)}
                    // autoFocus
                    inputMode="numeric"
                  />
                  :
                  <input
                    value={UserMobileAndCode.code}
                    className="form-input-auth px-2 col-12"
                    placeholder="کد ارسال شده را وارد نمایید."
                    name="code"
                    onChange={e => userMobileHandler(e)}
                    // autoFocus
                    inputMode="numeric"
                  />
              }
            </div>
          </div>
        </div>
        <div className="row mt-3">

          <div className=" without-focus col-12">
            <button
              onClick={() => {
                console.log(UserMobileAndCode, UserMobileAndCode.code.length);
                if (UserMobileAndCode.code.length !== 4 && UserMobileAndCode.mobile.length == 11) {
                  setTestForValue({ ...TestForValue, num: true })
                  login()
                } else if (UserMobileAndCode.code.length == 4) {
                  console.log(UserMobileAndCode.code);
                  loginWithToken()
                }

              }}
              className={
                // props.disabled === false
                //  "btn btn-info py-3 mb-3 col-12 btn-block"
                `${styles["primary-button"]} py-2`
              }
            // disabled={state.btn_disabled}
            >
              {TestForValue.num == false ? "دریافت کد" :
                TestForValue.num == true && TestForValue.code == false ? 'ثبت کد' :
                  'ارسال مجدد کد تایید' && setTestForValue({ ...TestForValue, code: false })}
            </button>

          </div>
          {TestForValue.num == true &&
            <div className="col-12 justify-content-center d-flex">
              <button className={'btn p-2 my-1 cursor-pointer pb-0 rounded-0'} style={{borderBottom: '1px dashed'}} onClick={() => phoneHandler()}>تغییر شماره</button>
            </div>
          }
        </div>
      </div>
      {!TimerChecker.phoneErrType && TestForValue.num == true &&
        <div className="row mt-3 text-center">
          <div className="col-12">
            {TimerChecker.value <= 1000 &&
              <p className="cursor-pointer" onClick={() => {
                login();
                setTimerChecker({ ...TimerChecker, phoneErrType: !TimerChecker.phoneErrType })
              }}>ارسال مجدد کد</p>
            }
            <Timer setTimerChecker={setTimerChecker} TimerChecker={TimerChecker} phoneErrType={TimerChecker.phoneErrType} />
          </div>
        </div>
      }


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

