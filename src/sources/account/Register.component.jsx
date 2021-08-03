import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUser,
  faLock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryTextInput from "../component/PrimaryTextInput.component";
import PrimaryButton from "../component/PrimaryButton.component";

import { connect } from "react-redux";
import { accountBoxModify, messageBoxModify } from "../../Redux/UI/ui.action";
import globals from "../Global";

import Countdown from "react-countdown";
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      mobilemoaref: "",
      register_status: false,
      moaref_save: false,
      resend_code: false,
      btn_text: "دریافت کد احراز هویت",
    };
  }
  register = () => {
    this.setState({ btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}account/auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: this.state.mobile,
        token: this.state.token,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "0") {
          this.setState({
            loading: false,
            register_status: true,
            resend_code: true,
            btn_text: "تایید کد احراز هویت",
          });
        } else {
          this.setState({ btn_disabled: false, loading: false });
          this.props.messageBoxModify({
            state: true,
            message: data.message,
          });
        }
      });
  };

  RegisterWithToken = () => {
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
        if (data.status == "1") {
          if (data.name == null) {
            localStorage.setItem("mobile", data.mobile);
          } else {
            localStorage.setItem("name", data.name + data.family);
          }
          localStorage.setItem("token", data.token);
          this.props.messageBoxModify({
            state: true,
            message: "کاربر عزیز، شما با موفقیت وارد حساب کاربری خود شدید.",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          // this.props.addAccountProperties({
          //   token: data.token,
          //   dateLogin: moment().format("YYYY/MM/DD"),
          // });
        } else if (data.status == "2") {
          this.setState({
            moaref_save: true,
            loading: false,
            btn_text: "ثبت معرف",
          });
          if (data.name == null) {
            localStorage.setItem("mobile", data.mobile);
          } else {
            localStorage.setItem("name", data.name + data.family);
          }
          localStorage.setItem("token", data.token);
        } else {
          this.setState({ btn_disabled: false, loading: false });
          this.props.messageBoxModify({
            state: true,
            message: data.message,
          });
        }
      });
  };

  SendMoarefMobile = () => {
    this.setState({ btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}account/auth/MoarefSave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: this.state.mobile,
        userid: localStorage.getItem("token"),
        mobilemoaref: this.state.mobilemoaref,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "0") {
          this.props.messageBoxModify({
            state: true,
            message: "کاربر عزیز، شما با موفقیت ثبت نام شدید.",
          });
          this.props.messageBoxModify({
            state: true,
            message: data.message,
          });
          this.props.accountBoxModify({
            state: false,
            type: "authentication",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          this.setState({ btn_disabled: false, loading: false });
          this.props.messageBoxModify({
            state: true,
            message: data.message,
          });
        }
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      this.setState({
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
  render() {
    return (
      <div className="popup-content-container">
        <div className="popup-heading text-center">
          <span>ثبت نام</span>
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
        <div className="row mb-2">
          <div className="col-1 padding-horizental-3px">
            <FontAwesomeIcon icon={faUser} className="margin-top-20px" />
          </div>

          <div className="col-11 padding-horizental-3px">
            <div>
              <input
                className="form-input-auth col-12"
                placeHolder="نام کاربری ( شماره همراه )"
                name="mobile"
                onChange={this.handleChange}
                disabled={this.state.register_status}
                inputMode="numeric"
              />
            </div>
          </div>
        </div>

        {this.state.register_status === true ? (
          <div className="row mb-2">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
            </div>
            <div className="col-11 padding-horizental-3px">
              <div>
                <input
                  className="form-input-auth col-12"
                  placeHolder="کد ارسال شده را وارد نمایید."
                  name="token"
                  onChange={this.handleChange}
                  disabled={this.state.moaref_save}
                  autoFocus
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        ) : null}
        {this.state.moaref_save === true ? (
          <div className="row mb-2">
            <div className="col-1 padding-horizental-3px">
              <FontAwesomeIcon icon={faUsers} className="margin-top-20px" />
            </div>
            <div className="col-11 padding-horizental-3px">
              <div>
                <input
                  className="form-input-auth col-12"
                  placeHolder="شماره موبایل معرف"
                  name="mobilemoaref"
                  onChange={this.handleChange}
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="form-input-auth-border without-focus col-12">
            <PrimaryButton
              defaultValue={this.state.btn_text}
              onClick={(e) => {
                this.state.moaref_save === false
                  ? this.state.register_status === false
                    ? this.register()
                    : this.RegisterWithToken()
                  : this.SendMoarefMobile();
              }}
              style={{ height: "3em" }}
            />
          </div>
        </div>
        {this.state.resend_code === true ? (
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
              حساب کاربری دارید؟{" "}
              <a
                onClick={() => {
                  this.props.accountBoxModify({
                    state: true,
                    type: "login",
                  });
                }}
                className="cursor-pointer"
              >
                {" "}
                ورود به حساب کاربری
              </a>
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

export default connect(null, mapDispatchesToProps)(Register);
