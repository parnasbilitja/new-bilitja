import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faLock } from "@fortawesome/free-solid-svg-icons";
import PrimaryTextInput from "../component/PrimaryTextInput.component";
import styles from "../../../styles/PrimaryButton.module.scss";
import moment from "moment-jalaali";

import { connect } from "react-redux";
import { accountBoxModify, messageBoxModify } from "../../Redux/UI/ui.action";
import { addAccountProperties } from "../../Redux/Account/account.action";

import globals from "../Global";
import { Loader } from "./../../Utils/Loader";
const Authentication = (props) => {
  const [state, setState] = useState({
    token: "",
    forseUpdate: false,
    btn_disabled: false,
    loading: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const loginWithToken = () => {
    setState({ ...state, btn_disabled: true, loading: true });
    fetch(`${globals.baseUrlNew}auth/checkUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: props.mobile,
        token: state.token,
        hostname: "bilitja.com",
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName: "بلیطجا",
        telNumber: "02184279999",

      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "0") {
          setState({ ...state, btn_disabled: false, loading: false });
          localStorage.setItem("mobile", data.mobile);
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            window?.location?.reload();
          }, 2000);
          props.accountBoxModify({
            state: false,
            type: "authentication",
          });
          props.addAccountProperties({
            token: data.token,
            dateLogin: moment().format("YYYY/MM/DD"),
          });
          props.messageBoxModify({
            state: true,
            color: true,
            message: "ورود شما موفقیت آمیز بود.",
          });
        } else {
          setState({ ...state, btn_disabled: false, loading: false });
          props.messageBoxModify({
            color: false,
            state: true,
            message: data.message,
          });
        }
      });
  };
  return (
    <div className="popup-content-container">
      <div className="popup-heading d-flex align-items-center justify-content-center">
        <span>ورود</span>
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
      <div className="row">
        <div className="col-1 padding-horizental-3px">
          <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
        </div>
        <div className="col-11 padding-horizental-3px">
          <div className={` form-input-border `}>
            <PrimaryTextInput
              placeholder="کد ارسال شده"
              name="token"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="form-input-border without-focus col-12">
          <button
            onClick={(e) => {
              loginWithToken();
            }}
            className={
              props.disabled === false
                ? "btn btn-info py-3 mb-3 col-12 btn-block"
                : styles["primary-button"]
            }
            disabled={state.btn_disabled}
          >
            {state.loading === false ? "  ورود" : <Loader />}
          </button>
        </div>
      </div>
      {/* <div className="row">
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
                </div> */}
    </div>
  );
}
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
  addAccountProperties: (value) => dispatch(addAccountProperties(value)),
});
export default connect(null, mapDispatchesToProps)(Authentication);
