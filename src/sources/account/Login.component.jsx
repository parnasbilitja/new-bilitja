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
import Timer from "../../Utils/Timer";
const Login = (props) => {
  
    const [state,setState] = useState({
      btn_disabled: false,
      loading: false,
      date:'',
      login_with_code: true,
      get_mobile_status: false,
      btn_text: "ثبت کد احراز هویت",
      mobile: localStorage.getItem('mobile') | "",
      password: "",
      token: "",
      error: false,
      phoneErrType:false,
      errText: "",
      timer:false,
      minutes:'',
      seconds:'',
      value:false
    });
    
    useEffect(() => {
      console.log(state);
      if (String(state.mobile).length >=10 || String(state.mobile) == '0' ) {
        console.log(state);
        setState({...state,phoneErrType: true, mobile:'',timer:false})
      }
    },[])

    const login = () => {
      setState({...state, btn_disabled: true, loading: true });
      fetch(`${globals.baseUrlNew}auth/getMobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          
          mobile: localStorage.getItem("mobile"),
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
          if (data.status == "0") {

            // setState({...state,
            //   btn_disabled: false,
            //   loading: false,
            //   get_mobile_status: true,
            //   btn_text: "تایید کد احراز هویت",
            // });
          } else if (data.status == "10") {
            // setState({...state, btn_disabled: false, loading: false });
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
          } else if (data.status === "-111") {

            register();

          } else if (data.status === "-200") {
            setState({...state,
              btn_disabled: false,
              loading: false,
              error: true,
              errText: "شماره موبایل یا رمز ثابت نادرست می باشد.",
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
              get_mobile_status:true,
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
            setState({...state,
              btn_disabled: false,
              loading: false,
              error: true,
              errText: data.message,
            });
          }
        });
    };


  const phoneHandler = () => {
    setState({...state,phoneErrType: true, mobile:'',timer:false})
  }

useEffect(() => {
  const handleSetMobile = () => {
    let mobile = localStorage.getItem("mobile");
    if( String(mobile).length == 11){
      setState({...state, mobile: mobile, error: false, errText: "" })
    };
  };
  handleSetMobile();
  console.log(state);
},[])
useEffect(() => {
  let mobile = localStorage.setItem("mobile",state.mobile);
},[state.mobile])
  const handleSetToken = (e) => {
    setState({...state, [e.target.name]: e.target.value, error: false, errText: "" });
  };

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
            errText: "لطفا شماره خود را وارد کنید",
          });
        }
      });
  };

    return (
      <div className="popup-content-container">
        <div className="popup-heading text-center">
          <span>کد ارسال شده به {state.mobile} را وارد کنید</span>
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
          console.log(state.errText),
          <div className="alert alert-danger">{state.errText !==undefined ? state.errText:'شماره وارد شده باید ۱۱ رقم باشد'}</div>
        ) : null}
        <div className="container">
            <div className="row mb-2">
              <div className="col-1 padding-horizental-3px">
                <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
              </div>
              <div className="col-11 padding-horizental-3px">
                <div>
                  {state.phoneErrType == true ? 
                  
                  <input
                  className="form-input-auth px-2 col-12"
                  placeholder="شماره موبایل"
                  name="mobile"
                  onChange={e => handleSetToken(e)}
                  autoFocus
                  inputMode="numeric"
                  />
                  :
                  <>
                    <input
                    className="form-input-auth px-2 col-12"
                    placeholder="کد ارسال شده را وارد نمایید."
                    name="token"
                    onChange={e => handleSetToken(e)}
                    autoFocus
                    inputMode="numeric"
                    />
                  </>
                }
                </div>
              </div>
            </div>
        </div>
        <div className="row mt-3">
            
          <div className=" without-focus col-12">
            <button
              onClick={(e) => {
                if (state.phoneErrType && state.mobile.length == 11) {
                  login()
                  setState({...state,phoneErrType: false,timer:true})
                }else{
                  loginWithToken() 
                }
                
              }}
              className={
                props.disabled === false
                ? "btn btn-info py-3 mb-3 col-12 btn-block"
                : `${styles["primary-button"]} py-2`
              }
              disabled={state.btn_disabled}
            >
              {state.loading ? state.btn_text :state.minutes == 0 && state.seconds && state.seconds == 0? "ارسال مجدد کد تایید" : 'ثبت کد'}
            </button>
            
          </div>
          <div className="col-12 justify-content-center d-flex">
              <button className={'btn btn-outline-dark p-2 my-1 cursor-pointer'} onClick={(e) =>phoneHandler(e)}>تغییر شماره</button>
          </div>
        </div>
        {!state.phoneErrType &&
          <div className="row mt-3 text-center">
            <div className="col-12">
              {state.value <= 1000 &&
                <p className="cursor-pointer" onClick={()=>loginWithToken()}>ارسال مجدد کد</p>
              }
              {/* <Countdown renderer={renderer} date={Date.now() + 3000 } /> */}
              {/* {state.value != "00:00" &&  */}
                <Timer setState={setState} state={state} phoneErrType={state.phoneErrType} />
              {/* } */}
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

