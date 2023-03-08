import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faLock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { accountBoxModify, messageBoxModify } from "../../Redux/UI/ui.action";
import globals from "../Global";

import Countdown from "react-countdown";
import { Loader } from "./../../Utils/Loader";
import { MuiOtpInput } from "mui-one-time-password-input";
const Register = (props) =>{
  // constructor() {
  //   super(props);
    const [state,setState] = useState({
      mobile: "",
      password: "",
      mobilemoaref: "",
      register_status: false,
      moaref_save: false,
      resend_code: false,
      loading: false,
      error: false,
      errText: "",
      btn_text: "دریافت کد احراز هویت",
    });
  // }
  const register = () => {
    setState({...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: state.mobile,
        token: state.token,
        password: state.password,
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
          setState({...state,
            loading: false,
            register_status: true,
            resend_code: true,
            btn_text: "تایید کد احراز هویت",
          });
        } else if (data.status === "-110") {
          setState({...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText:
              "این شماره موبایل در سامانه موجود است، لطفا از بخش ورود وارد حساب خود شوید.",
          });
        } else {
          setState({...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        }
      });
  };

  const RegisterWithToken = () => {
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
        if (data.status == "1") {
          if (data.name == null) {
            localStorage.setItem("mobile", data.mobile);
          } else {
            localStorage.setItem("name", data.name + data.family);
          }
          localStorage.setItem("token", data.token);
          props.messageBoxModify({
            color:true,
            state: true,
            message: "کاربر عزیز، شما با موفقیت وارد حساب کاربری خود شدید.",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          // props.addAccountProperties({
          //   token: data.token,
          //   dateLogin: moment().format("YYYY/MM/DD"),
          // });
        } else if (data.status == "2") {
          setState({...state,
            moaref_save: true,
            loading: false,
            btn_text: "ثبت نام",
          });
          if (data.name == null) {
            localStorage.setItem("mobile", data.mobile);
          } else {
            localStorage.setItem("name", data.name + data.family);
          }
          localStorage.setItem("token", data.token);
        } else if (data.status === "-103") {
          setState({...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "کد احراز هویت وارد شده نادرست است.",
          });
        } else {
          setState({...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        }
      });
  };

  const SendMoarefMobile = () => {
    setState({...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/MoarefSave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: state.mobile,
        userid: localStorage.getItem("token"),
        mobilemoaref: state.mobilemoaref,
        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02157874",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "0") {
          props.messageBoxModify({
            state: true,
            color:true,
            message: "مسافر عزیز، شما با موفقیت ثبت نام شدید.",
          });
          props.accountBoxModify({
            state: false,
            type: "authentication",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setState({...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name == 'mobile' && String(value).length ==11){
      setState({...state,
        [name]: value,
        error: false,
        errText: "",
      });
    }else if(name !=='mobile'){
      setState({...state,
        [name]: value,
        error: false,
        errText: "",
      });
    }
  };
  const handleChangePassword = (newValue) => {
    setState({...state,password:newValue})
  }
  

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setState({...state,
        resend_code: false,
        register_status: false,
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
          <span>ثبت نام</span>
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
        {state.error === true ? (
          // console.log(state.errText),
          <div className="alert alert-danger">{state.errText !==undefined ? state.errText:'شماره وارد شده باید ۱۱ رقم باشد'}</div>
        ) : null}
        <div className="container">
          <div className="row mb-2">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faUser} className="margin-top-20px" />
            </div>

            <div className="col-11 padding-horizental-3px">
              <div>
                <input
                  className="form-input-auth px-2  col-12"
                  placeholder="نام کاربری ( شماره همراه )"
                  name="mobile"
                  onChange={handleChange}
                  disabled={state.register_status}
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>

          {state.register_status === true ? (<>
            <div className="row mb-2">
              <div className="col-1 padding-horizental-3px">
                <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
              </div>
              <div className="col-11 padding-horizental-3px">
                <div>
                <MuiOtpInput value={state.password} onChange={handleChangePassword} />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-1 padding-horizental-3px">
                <FontAwesomeIcon icon={faUsers} className="margin-top-20px" />
              </div>
              <div className="col-11 padding-horizental-3px">
                <div>
                  <input
                    className="form-input-auth px-2  col-12"
                    placeholder="شماره موبایل معرف ( اختیاری )"
                    name="mobilemoaref"
                    onChange={handleChange}
                    inputMode="numeric"
                    />
                </div>
              </div>
            </div>
            </>
          ) : null}
        </div>

        <div className="row">
          <div className="form-input-auth-border px-2 without-focus col-12">
            <button
              onClick={(e) => {
                state.moaref_save === false
                  ? state.register_status === false
                    ? register()
                    : RegisterWithToken()
                  : SendMoarefMobile();
              }}
              className="register-btn col-12 rounded h-3em"
            >
              {state.loading === true ? <Loader /> : state.btn_text}
            </button>
          </div>
        </div>
        {state.resend_code === true ? (
          <div className="row mt-3 text-center">
            <div className="col-12">
              <Countdown renderer={renderer} date={Date.now() + 60000} />
            </div>
          </div>
        ) : null}
        <div className="row">
          <div className="col-12 no-padding-horizental">
            <br />
            <p className="text-center font-size-13 no-margin font-bold-iransanse">
              حساب کاربری دارید؟{" "}
              <Link
                onClick={() => {
                  props.accountBoxModify({
                    state: true,
                    type: "login",
                  });
                }}
                className="cursor-pointer"
              >
                {" "}
                ورود به حساب کاربری
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});

export default connect(null, mapDispatchesToProps)(Register);
