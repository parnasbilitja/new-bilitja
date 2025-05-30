import React from "react";

import Router from 'next/router'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faLock,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryTextInput from "../../sources/component/PrimaryTextInput.component";
import PrimaryButton from "../../sources/component/PrimaryButton.component";
import styles from "../../../styles/PrimaryButton.module.scss";

import globals from "../Global";

import { connect } from "react-redux";
import { accountBoxModify, messageBoxModify } from "../../Redux/UI/ui.action";
import { useState } from "react";
import Countdown from "react-countdown";
import { Loader } from "../../Utils/Loader";

const ForgetPassword = (props) => {

  const [state, setState] = useState({
    mobile: "",
    token: "",
    get_code: false,
    password: "",
    loading:false,
    passwordnew: "",
    showSetPassword: false,
    btn_text: "دریافت کد",
  });


  // setTimeout(() => {
  //   setState({...state, get_code: true, btn_text: "تایید کد احراز هویت" });
  // }, 2000)

  const forgetPassword = () => {
    setState({ ...state, btn_text: "در حال پردازش..." });
    fetch(`${globals.baseUrlNew}auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: state.mobile,
        register: 0,
        token: "",
        password: "",
        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02157874",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 0) {
          setState({ ...state, get_code: true, btn_text: "تایید کد احراز هویت" });
          props.messageBoxModify({
            state: true,
            color: true,
            message: "کد احراز هویت برای شما ارسال شد.",
          });
        } else if (data.status == -111) {
          setState({ ...state, btn_text: "دریافت کد احراز هویت" });
          props.messageBoxModify({
            color: false,
            state: true,
            message: "چنین کاربری در سامانه یافت نشد، لطفا ثبت نام کنید.",
          });
        }
      });
  };

  const verifyToken = () => {
    // console.log(localStorage.getItem("f-token"));
    setState({ ...state, btn_text: "در حال پردازش..." });
    fetch(`${globals.baseUrlNew}auth/ForgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: state.mobile,
        token: state.token,
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        hostname: "bilitja.com",
        agencyName: "بلیطجا",
        telNumber: "02157874"

      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 0) {
          props.messageBoxModify({
            color: true,
            state: true,
            message: "احراز هویت شما تایید شد.",
          });

          setState({
            ...state,
            showSetPassword: true,
            btn_text: "دریافت کد احراز هویت",
          });
          localStorage.setItem("f-token", data.token);
        } else if (data.status == -100) {
          props.messageBoxModify({
            color: false,
            state: true,
            message: "کد احراز هویت شما صحیح نیست.",
          });
        }
      });
  };

  const setNewPassword = () => {
    if (state.passwordnew == "") {
      props.messageBoxModify({
        state: true,
        color: false,
        message: "لطفا فیلد را کامل پر کنید.",
      });
    } else {
      fetch(`${globals.baseUrlNew}auth/setPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: localStorage.getItem("f-token"),
          password: state.password,
          passwordnew: state.passwordnew,
          hostname: "hamnavaz.com",
          customerId: "1a157116-a01a-4027-ab10-74098ac63815",
          agencyName: "بلیطجا",
          telNumber: "02184278",

        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 0) {
            props.messageBoxModify({
              state: true,
              color: true,
              message: "گذرواژه شما با موفقیت ثبت شد.",
            });
            localStorage.removeItem("f-token");
            // props.accountBoxModify({
            //   state: true,
            //   type: "login",
            // });
            Router.push("/")
            props.accountBoxModify({
              state: false,
              type: "authentication",
            });
          } else if (data.status == -100) {
            props.messageBoxModify({
              color: false,
              state: true,
              message: data.message,
            });
          }
        });
    }
  };
  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setState({
        ...state,
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
      <div className="popup-heading d-flex align-items-center justify-content-center">
        <span>بازیابی رمز عبور</span>
        <span
          className="exit-form position-absolute"
          onClick={() => {
            props.accountBoxModify({
              state: false,
            });
          }} style={{ left: 10 }}
        >
          <div style={{ color: "red" }} className="font-bold font-size-15" >x</div>
        </span>
      </div>
      {state.showSetPassword == false ? (
        <>
        <div className="row mb-2 d-flex align-center d-flex justify-content-center border rounded mx-4">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faUser} className="margin-top-10px" />
            </div>
                <input
                  className="form-input-auth px-2 col-10 padding-horizental-3px"
                  placeholder="شماره همراه"
                  name="mobile"
                  value={state.mobile}
                  onChange={(e) => {
                    setState({
                      ...state,
                      mobile: e.target.value,
                    })}}
                    disabled={state.get_code}
                  inputMode="numeric"
                />
          </div>

          {/* <div className="row">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faUser} className="margin-top-20px" />
            </div>
            <div className="col-11 padding-horizental-3px">
              <div
                className={` form-input-border  ${styles["form-input-border-private"]} `}
              >
                <PrimaryTextInput
                  placeholder="تلفن همراه"
                  value={state.mobile}
                  onChange={(e) => {
                    // 
                    setState({
                      ...state,
                      mobile: e.target.value,
                    });
                  }}
                  disabled={state.get_code}
                />
              </div>
            </div>
          </div> */}
          {state.get_code == true ? (<>
            <div className="row mb-2 d-flex align-center d-flex justify-content-center border rounded mx-4">
              <div className="col-1 padding-horizental-3px">
                <FontAwesomeIcon icon={faKey} className="margin-top-10px" />
              </div>
                  <input
                  className="form-input-auth px-2 col-10 padding-horizental-3px"
                    placeholder="کد احراز هویت"
                    value={state.token}
                    onChange={(e) => {
                      setState({
                        ...state,
                        token: e.target.value,
                        password: e.target.value,
                      });
                    }}
                  />
            </div>
          </>
          ) : null}
        </>
      ) : (
        <div className="row mb-2 d-flex align-center d-flex justify-content-center border rounded mx-2">

                <div className="col-1 padding-horizental-3px">
                  <FontAwesomeIcon icon={faLock} className="margin-top-10px" />
                </div>
                {/* <div className="col-11 padding-horizental-3px"> */}
                  {/* <div> */}
                    <input
                      className="form-input-auth px-2 col-10"
                      // placeholder="رمز عبور"
                      name="password"
                      placeholder={"گذرواژه جدید"}
                      // onClick={(e) => {
                      //   setNewPassword();
                      // }}
                      value={state.passwordnew}
                      onChange={(e) => {
                        setState({
                          ...state,
                          passwordnew: e.target.value,
                        });
                      }}
                      inputMode="numeric"
                      type="password"
                    />
                  {/* </div> */}
                {/* </div> */}
              </div>
      )}

      {state.showSetPassword == false ? (
        <div className="d-flex justify-content-center">
          <button
            value={state.btn_text}
            onClick={(e) => {
              state.get_code == false && state.mobile.length==11
                ? forgetPassword()
                :state.mobile.length==11? verifyToken():''
                ;
            }}
            className={`w-80  ${
              props.disabled === false
                ? "btn btn-info py-3 mb-3 col-12 btn-block"
                : `${styles["primary-button"]} col-12 py-1`}`
            }
            disabled={state.btn_disabled}
          >
            {state.loading === false ? state.btn_text : <Loader />}
          </button>
        </div>
      ) : (<>
        <div className="d-flex justify-content-center">
          {/* <div className=" without-focus col-12"> */}
            <button
              className={`w-80  ${
                props.disabled === false
                  ? "btn btn-info py-3 mb-3 col-12 btn-block"
                  : `${styles["primary-button"]} col-12 py-1`}`
              }
              disabled={state.btn_disabled}
              onClick={(e) => {
                setNewPassword();

              }}
            >{state.loading === false ? "ثبت گذرواژه جدید" : <Loader />}</button>
          </div>
        {/* </div> */}

      </>
      )}
      {state.get_code == true &&<div className="row mt-3 text-center">
              <div className="col-12">
                <Countdown renderer={renderer} date={Date.now() + 60000} />
              </div>
            </div>}
      <div className="row">
        <div className="col-12 no-padding-horizental">
          {/* <br /> */}
          <p
            className="text-center font-size-13 no-margin cursor-pointer"
          onClick={() => {
            props.accountBoxModify({
              state: true,
              type: "register",
            });
          }}
          >
            بازگشت
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
export default connect(null, mapDispatchesToProps)(ForgetPassword);
