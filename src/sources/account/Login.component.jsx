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
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btn_disabled: false,
      loading: false,
      login_with_code: true,
      get_mobile_status: false,
      btn_text: "دریافت کد احراز هویت",
      mobile: "",
      password: "",
      token: "",
      error: false,
      errText: "",
    };
  }

  handleLoginWithCode = () => {
    this.setState({
      login_with_code: true,
      password: "",
      btn_text: "دریافت کد احراز هویت",
    });
  };
  handleLoginWithPassword = () => {
    this.setState({
      login_with_code: false,
      token: "",
      btn_text: "ورود به حساب",
    });
  };

  handleSetMobile = (e) => {
    this.setState({ mobile: e.target.value, error: false, errText: "" });
  };
  handleSetToken = (e) => {
    this.setState({ token: e.target.value, error: false, errText: "" });
  };
  handleSetPassword = (e) => {
    this.setState({ password: e.target.value, error: false, errText: "" });
  };

  login = () => {
    this.setState({ btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}account/auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: this.state.mobile,
        token: this.state.token,
        password: this.state.password,
        register: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "0") {
          this.setState({
            btn_disabled: false,
            loading: false,
            get_mobile_status: true,
            btn_text: "تایید کد احراز هویت",
          });
        } else if (data.status == "10") {
          this.setState({ btn_disabled: false, loading: false });
          localStorage.setItem("mobile", data.mobile);
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          this.props.accountBoxModify({
            state: false,
            type: "authentication",
          });
          // this.props.addAccountProperties({
          //   token: data.token,
          //   dateLogin: moment().format("YYYY/MM/DD"),
          // });
          this.props.messageBoxModify({
            state: true,
            message: "ورود شما موفقیت آمیز بود.",
          });
          this.props.accountBoxModify({
            state: false,
            type: "authentication",
          });
        } else if (data.status === "-111") {
          this.setState({
            btn_disabled: false,
            loading: false,
            error: true,
            errText:
              "چنین شماره موبایلی در سامانه ثبت نشده است، لطفا ثبت نام کنید.",
          });
        } else if (data.status === "-200") {
          this.setState({
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "شماره موبایل یا رمز ثابت نادرست می باشد.",
          });
        } else {
          this.setState({
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        }
      });
  };

  loginWithToken = () => {
    this.setState({ btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}account/auth/checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: this.state.mobile,
        token: this.state.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "2" || data.status == "1") {
          this.setState({ btn_disabled: false, loading: false });
          localStorage.setItem("mobile", data.mobile);
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          this.props.accountBoxModify({
            state: false,
            type: "authentication",
          });
          // this.props.addAccountProperties({
          //   token: data.token,
          //   dateLogin: moment().format("YYYY/MM/DD"),
          // });
          this.props.messageBoxModify({
            state: true,
            message: "ورود شما موفقیت آمیز بود.",
          });
          this.props.accountBoxModify({
            state: false,
            type: "authentication",
          });
        } else if (data.status == "-103") {
          this.setState({
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "کد احراز هویت وارد شده نادرست می باشد.",
          });
        } else if (data.status == "-104") {
          this.setState({
            btn_disabled: false,
            loading: false,
            error: true,
            errText: data.message,
          });
        } else {
          this.setState({
            btn_disabled: false,
            loading: false,
            error: true,
            errText: "لطفا از اتصال خود به اینترنت اطمینان حاصل کنید.",
          });
        }
      });
  };

  // Renderer callback with condition
  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      this.setState({
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
  render() {
    return (
      <div className="popup-content-container">
        <div className="popup-heading text-center">
          <span>ورود</span>
          <span
            className="pull-left exit-form"
            onClick={() => {
              this.props.accountBoxModify({
                state: false,
              });
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <div className="row btn-container-header-login rounded-pill m-4">
          <button
            className={
              this.state.login_with_code === true
                ? "btn btn-header-login-active col-6 rounded-pill"
                : "btn btn-header-login col-6 rounded-pill"
            }
            onClick={this.handleLoginWithCode}
          >
            ورود با رمز یکبار مصرف
          </button>
          <button
            className={
              this.state.login_with_code === false
                ? "btn btn-header-login-active col-6 rounded-pill"
                : "btn btn-header-login col-6 rounded-pill"
            }
            onClick={this.handleLoginWithPassword}
          >
            ورود با رمز ثابت
          </button>
        </div>
        {this.state.error === true ? (
          <div className="alert alert-danger">{this.state.errText}</div>
        ) : null}
        <div className="container">
          <div className="row mb-2">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faUser} className="margin-top-20px" />
            </div>
            <div className="col-11 padding-horizental-3px">
              <div>
                <input
                  className="form-input-auth px-2 col-12"
                  placeholder="نام کاربری ( شماره همراه )"
                  name="mobile"
                  onChange={this.handleSetMobile}
                  disabled={
                    this.state.login_with_code === true
                      ? this.state.get_mobile_status === true
                        ? true
                        : false
                      : null
                  }
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
          {this.state.login_with_code === false ? (
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
                    onChange={this.handleSetPassword}
                    inputMode="numeric"
                    type="password"
                  />
                </div>
              </div>
            </div>
          ) : null}
          {this.state.get_mobile_status === true ? (
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
                    onChange={this.handleSetToken}
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
                this.state.get_mobile_status === false
                  ? this.login()
                  : this.loginWithToken();
              }}
              className={
                this.props.disabled === false
                  ? "btn btn-info py-3 mb-3 col-12 btn-block"
                  : `${styles["primary-button"]} py-2`
              }
              disabled={this.state.btn_disabled}
            >
              {this.state.loading === false ? this.state.btn_text : <Loader />}
            </button>
          </div>
        </div>
        {this.state.get_mobile_status === true ? (
          <div className="row mt-3 text-center">
            <div className="col-12">
              <Countdown renderer={this.renderer} date={Date.now() + 60000} />
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col-12 no-padding-horizental">
            <br />
            <p className="text-center font-size-13 no-margin font-bold-iransanse">
              حساب کاربری ندارید؟{" "}
              <a
                onClick={() => {
                  this.props.accountBoxModify({
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
        {/*<div className="row">
                    
                   
                     <div className="col-lg-6 col-md-6 col-sm-6 col-12 no-padding-horizental">
                        <br />
                        <p className="text-center no-margin font-size-13" onClick={() => {
                            this.props.accountBoxModify({
                                state: true,
                                type: 'forget'
                            })
                        }}>رمز عبور را فراموش کرده ام</p>
                    </div> 
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 no-padding-horizental">
                        <br />
                        <p className="text-center font-size-13 no-margin" onClick={() => {
                            this.props.accountBoxModify({
                                state: true,
                                type: 'register'
                            })
                        }}>ثبت نام</p>
                    </div> 
                </div>*/}
      </div>
    );
  }
}
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default connect(null, mapDispatchesToProps)(Login);
