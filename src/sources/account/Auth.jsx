import React from "react";
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
import { useEffect } from "react";
import { checkNumberfatoen } from "../../Utils/SimpleTasks";
import PasswordBox from "../../Components/share/PasswordBox";
const Auth = (props) => {
  
  const [state, setState] = useState({
    btn_disabled: false,
    loading: false,
    login_with_code: true,
    get_mobile_status: false,
    btn_text: "دریافت کد",
    mobile: "",
    password: "",
    token: "",
    error: false,
    errText: "",
  });


  const [type, setType] = useState(1)

  const handleLoginWithCode = () => {
    setType(1)
    setState({
      ...state,
      login_with_code: true,
      password: "",
      btn_text: "دریافت کد",
    });
  };
  const handleLoginWithPassword = () => {

    setType(2)
    setState({
      ...state,
      get_mobile_status: false,
      login_with_code: false,
      token: "",
      btn_text: "ورود به حساب",
    });
  };

  const handleSetMobile = (e) => {
    
    // if (e.target.name == 'mobile' && String(e.target.value).length == 11) {
      setState({ ...state, mobile: e.target.value, error: false, errText: "" })
    // };
  };
  const handleSetToken = (newvalue) => {
    setState({ ...state, token: newvalue, error: false, errText: "" });
  };
  useEffect(() => {
    if (state.token.length == 4 ) {
      loginWithToken()
    }
  },[state.token]);
  const handleSetPassword = (e) => {
    setState({ ...state, password: e.target.value, error: false, errText: "" });
  };
  const login = () => {
    // console.log(state);
    if (state.mobile.length ==11) {
      setState({ ...state, btn_disabled: true, loading: true });
      fetch(`${globals.baseUrlNew}auth/getMobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: checkNumberfatoen(state.mobile),
          token: checkNumberfatoen(state.token),
          password: checkNumberfatoen(state.password),
          register: 0,
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
              btn_disabled: false,
              loading: false,
              get_mobile_status: true,
              btn_text: "تایید کد",
            });
          } else if (data.status == "10") {
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
    }else{
      setState({...state, errText:'شماره وارد شده صحیح نیست',error:true});
    }
  };

  const register = () => {
    setState({ ...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: checkNumberfatoen(state.mobile),
        token: checkNumberfatoen(state.token),
        password: checkNumberfatoen(state.password),
        register: 1,
        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02157874",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        if (data.status == "0") {
          setState({
            ...state,
            get_mobile_status: true,
            loading: false,
            register_status: true,
            resend_code: true,
            btn_text: "تایید کد",
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
  
  const loginWithToken = () => {
    setState({ ...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: checkNumberfatoen(state.mobile),
        token: checkNumberfatoen(state.token),
        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02157874",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        localStorage.setItem("token", data.token);
        if (data.status == "2" || data.status == "1") {
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
          // props.addAccountProperties({
          //   token: data.token,
          //   dateLogin: moment().format("YYYY/MM/DD"),
          // });
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
            errText: "کد وارد شده نادرست می باشد.",
          });
        } else if (data.status == "-104") {
          setState({
            ...state,
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        } else {
          setState({
            ...state,
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
      setState({
        ...state,
        get_mobile_status: false,
        btn_text: "دریافت مجدد کد",
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
        <img src={'Images/bilitja-logo.webp'} alt="site-logo" width={70} height={50} />
        <div
          className="exit-form position-absolute"
          onClick={() => {
            props.accountBoxModify({
              state: false,
            });
          }} style={{ left: 10,top:10 }}
        >
          <div style={{ color: "red" }} className="font-bold font-size-15" >x</div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="row btn-container-header-login rounded-pill m-2">
          <button
            className={
              state.login_with_code === true
                ? "btn btn-header-login-active col-6 rounded-pill pt-1"
                : "btn btn-header-login col-6 rounded-pill pt-1"
            }
            onClick={handleLoginWithCode}
          >
            ورود با پیامک
          </button>
          <button
            className={
              state.login_with_code === false
                ? "btn btn-header-login-active col-6 rounded-pill pt-1"
                : "btn btn-header-login col-6 rounded-pill pt-1"
            }
            onClick={handleLoginWithPassword}
          >
            ورود با رمز ثابت
          </button>
        </div>
      </div>
      {state.error === true ? (
        // console.log(state.errText),
        <div className="d-flex justify-content-center">
          <div className="alert alert-danger w-80 d-flex align-items-center" style={{height:'35px'}}>
            {state.errText !== undefined ? state.errText : 'شماره وارد شده باید ۱۱ رقم باشد'}</div>
        </div>
      ) : null}
      <div className="container">
        {/* <div className=""> */}
          <div className="row mb-2 d-flex align-center d-flex justify-content-center border rounded mx-4">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faUser} className="margin-top-10px" />
            </div>
            {/* <div className="col-11 padding-horizental-3px"> */}
              {/* <div> */}
                <input
                  className="form-input-auth px-2 col-10 padding-horizental-3px"
                  placeholder="شماره همراه"
                  name="mobile"
                  onChange={handleSetMobile}
                  value={state.mobile}
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
              {/* </div> */}
            {/* </div> */}
        {/* </div */}
        {state.login_with_code === false ? (
          <div className="row mb-2 d-flex align-center d-flex justify-content-center border rounded mx-4">
            {type == 2 &&
              <>
                <div className="col-1 padding-horizental-3px">
                  <FontAwesomeIcon icon={faLock} className="margin-top-10px" />
                </div>
                {/* <div className="col-11 padding-horizental-3px"> */}
                  {/* <div> */}
                    <input
                      className="form-input-auth px-2 col-10"
                      placeholder="رمز عبور"
                      name="password"
                      onChange={handleSetPassword}
                      inputMode="numeric"
                      type="password"
                    />
                  {/* </div> */}
                {/* </div> */}
              </>
            }
          </div>
        ) : null}
        {state.get_mobile_status === true ? (
          <div className="row mb-2 justify-content-center">
            {type == 1 &&
              <>
                {/* <div className="col-1 padding-horizental-3px">
                  <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
                </div> */}
                <div className="col-12 padding-horizental-3px row justify-content-center">
                  <PasswordBox value={state.token} valueLength={4} onChange={handleSetToken}/>
                  {/* <MuiOtpInput value={state.token.length==4?'':state.token} onChange={handleSetToken} validateChar={validateChar} TextFieldsProps={{ type:'number',autoFocus:'true' }} /> */}
                  
                </div>
              </>
            }
          </div>
        ) : null}
      </div>
      <div className="row mt-3">
        <div className=" without-focus col-12 d-flex justify-content-center">
          <button
            onClick={(e) => {
                state.get_mobile_status == true ? loginWithToken():login()
            }}
            className={`w-80  ${
              props.disabled === false
                ? "btn btn-info py-3 mb-3 col-12 btn-block"
                : `${styles["primary-button"]} py-1`}`
            }
            disabled={state.btn_disabled}
          >
            {state.loading === false ? state.btn_text : <Loader />}
          </button>
        </div>
        {state.get_mobile_status && 
        <div className="justify-content-center row mt-3">
            <span className="btn btn-outline-info col-5 btn-block" onClick={()=>{setState({...state,get_mobile_status:false})}}>تغییر شماره</span>
        </div>
        }
      </div>
      {state.get_mobile_status === true ? (
        <div className="row mt-3 text-center">
          <div className="col-12">
            <Countdown renderer={renderer} date={Date.now() + 60000} />
          </div>
        </div>
      ) : null}

      <div className="d-flex justify-content-center">
        <div
          // style={{ marginTop: -20 }}
          className="col-4 no-padding-horizental"
        >
          {/* <br /> */}
          <p className="text-center no-margin font-bold-iransanse font-size-10">
            {/* گذرواژه خود را فراموش کرده اید؟{" "} */}
            <div
              onClick={() => {
                props.accountBoxModify({
                  state: true,
                  type: "forget",
                });
              }}
              className="cursor-pointer font-size-5 forget-pass"
            > بازیابی گذرواژه </div>
          </p>
        </div>
      </div>
    </div>
  );
}
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
  checkUserLogged: () => dispatch(checkUserLogged()),
  getUserInfo: (value) => dispatch(getUserInfo(value)),
});
export default connect(null, mapDispatchesToProps)(Auth);
