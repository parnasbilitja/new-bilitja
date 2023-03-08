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

const ForgetPassword = (props) => {

  const [state, setState] = useState({
    mobile: "",
    token: "",
    get_code: false,
    password: "",
    passwordnew: "",
    showSetPassword: false,
    btn_text: "دریافت کد احراز هویت",
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
            message: "کد احراز هویت شما صحیح نمی باشد.",
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
          hostname: "bilitja.com",
          customerId: "1a157116-a01a-4027-ab10-74098ac63815",
          agencyName: "بلیطجا",
          telNumber: "02157874",

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
          <div className="row">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faUser} className="margin-top-20px" />
            </div>
            <div className="col-11 padding-horizental-3px">
              <div
                className={` form-input-border  ${styles["form-input-border-private"]} `}
              >
                <PrimaryTextInput
                  placeholder="نام‌کاربری(تلفن همراه)"
                  value={state.mobile}
                  onChange={(e) => {
                    // console.log(state);
                    setState({
                      ...state,
                      mobile: e.target.value,
                    });
                  }}
                  disabled={state.get_code}
                />
              </div>
            </div>
          </div>
          {state.get_code == true ? (<>
            <div className="row">
              <div className="col-1 padding-horizental-3px">
                <FontAwesomeIcon icon={faKey} className="margin-top-20px" />
              </div>
              <div className="col-11 padding-horizental-3px">
                <div
                  className={` form-input-border  ${styles["form-input-border-private"]} `}
                >
                  <PrimaryTextInput
                    placeholder="کد احراز هویت"
                    value={state.token}
                    onChange={(e) => {
                      // console.log(state);
                      setState({
                        ...state,
                        token: e.target.value,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3 text-center">
              <div className="col-12">
                <Countdown renderer={renderer} date={Date.now() + 60000} />
              </div>
            </div>
          </>
          ) : null}
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
            </div>
            <div className="col-11 padding-horizental-3px">
              <div
                className={` form-input-border  ${styles["form-input-border-private"]} `}
              >
                <PrimaryTextInput
                  placeholder="گذرواژه"
                  value={state.passwordnew}
                  type="password"
                  onChange={(e) => {
                    setState({
                      ...state,
                      passwordnew: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {state.showSetPassword == false ? (
        <div className="row">
          <div className="form-input-border without-focus col-12">
            <PrimaryButton
              defaultValue={state.btn_text}
              onClick={(e) => {
                state.get_code == false
                  ? forgetPassword()
                  : verifyToken();
              }}
            />
          </div>
        </div>
      ) : (<>
        <div className="row">
          <div className="form-input-border without-focus col-12">
            <PrimaryButton
              defaultValue={"ثبت گذرواژه جدید"}
              onClick={(e) => {
                setNewPassword();
              }}
            />
          </div>
        </div>

      </>
      )}
      <div className="row">
        <div className="col-12 no-padding-horizental">
          <br />
          <p
            className="text-center font-size-13 no-margin cursor-pointer"
          // onClick={() => {
          //   props.accountBoxModify({
          //     state: true,
          //     type: "login",
          //   });
          // }}
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
