import React from "react";

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

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      token: "",
      get_code: false,
      password: "",
      passwordnew: "",
      showSetPassword: false,
      btn_text: "دریافت کد احراز هویت",
    };
  }

  forgetPassword = () => {
    this.setState({ btn_text: "در حال پردازش..." });
    fetch(`${globals.baseUrlNew}account/auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: this.state.mobile,
        register: 0,
        token: "",
        password: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 0) {
          this.setState({ get_code: true, btn_text: "تایید کد احراز هویت" });
          this.props.messageBoxModify({
            state: true,
            message: "کد احراز هویت برای شما ارسال شد.",
          });
        } else if (data.status == -111) {
          this.props.messageBoxModify({
            state: true,
            message: "چنین کاربری در سامانه یافت نشد، لطفا ثبت نام کنید.",
          });
        }
      });
  };

  verifyToken = () => {
    this.setState({ btn_text: "در حال پردازش..." });
    fetch(`${globals.baseUrlNew}account/auth/ForgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: this.state.mobile,
        token: this.state.token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 0) {
          this.props.messageBoxModify({
            state: true,
            message: "احراز هویت شما تایید شد.",
          });

          this.setState({
            showSetPassword: true,
            btn_text: "دریافت کد احراز هویت",
          });
          localStorage.setItem("f-token", data.token);
        } else if (data.status == -100) {
          this.props.messageBoxModify({
            state: true,
            message: "کد احراز هویت شما صحیح نمی باشد.",
          });
        }
      });
  };

  setNewPassword = () => {
    if (this.state.passwordnew == "") {
      this.props.messageBoxModify({
        state: true,
        message: "لطفا فیلد را کامل پر کنید.",
      });
    } else {
      fetch(`${globals.baseUrlNew}account/auth/setPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: localStorage.getItem("f-token"),
          password: this.state.password,
          passwordnew: this.state.passwordnew,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 0) {
            this.props.messageBoxModify({
              state: true,
              message: "گذرواژه شما با موفقیت ثبت شد.",
            });
            localStorage.removeItem("f-token");
            this.props.accountBoxModify({
              state: true,
              type: "login",
            });
          } else if (data.status == -100) {
            this.props.messageBoxModify({
              state: true,
              message: data.message,
            });
          }
        });
    }
  };
  render() {
    return (
      <div className="popup-content-container">
        <div className="popup-heading">
          <span>بازیابی رمز عبور</span>
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
        {this.state.showSetPassword == false ? (
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
                    value={this.state.mobile}
                    onChange={(e) => {
                      this.setState({
                        mobile: e.target.value,
                      });
                    }}
                    disabled={this.state.get_code}
                  />
                </div>
              </div>
            </div>
            {this.state.get_code == true ? (
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
                      value={this.state.token}
                      onChange={(e) => {
                        this.setState({
                          token: e.target.value,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
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
                    value={this.state.passwordnew}
                    type="password"
                    onChange={(e) => {
                      this.setState({
                        passwordnew: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {this.state.showSetPassword == false ? (
          <div className="row">
            <div className="form-input-border without-focus col-12">
              <PrimaryButton
                defaultValue={this.state.btn_text}
                onClick={(e) => {
                  this.state.get_code == false
                    ? this.forgetPassword()
                    : this.verifyToken();
                }}
              />
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="form-input-border without-focus col-12">
              <PrimaryButton
                defaultValue={"ثبت گذرواژه جدید"}
                onClick={(e) => {
                  this.setNewPassword();
                }}
              />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12 no-padding-horizental">
            <br />
            <p
              className="text-center font-size-13 no-margin"
              onClick={() => {
                this.props.accountBoxModify({
                  state: true,
                  type: "login",
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
}
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default connect(null, mapDispatchesToProps)(ForgetPassword);
