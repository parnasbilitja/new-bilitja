import { faEnvelope, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import RouteButtons from "./RouteButtons.components";
import { useRouter, withRouter } from "next/router";
import globals from "./../../Global";
import { messageBoxModify } from "./../../../Redux/UI/ui.action";
import { connect } from "react-redux";

const ComplateProfile = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    UserId: "",
    gender: 1,
    MariedStat: 1,
  });

  useEffect(() => {
    setState((prevSate) => ({
      ...prevSate,
      UserId: localStorage.getItem("token"),
      mobile: localStorage.getItem("mobile"),
    }));
  }, []);

  const handleSetState = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleComplateProfile = (event) => {
    event.preventDefault();
    fetch(`${globals.baseUrlNew}account/auth/ProfileSave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "0") {
          router.push("/dashboard/profile");
          props.messageBoxModify({
            state: true,
            message: "اطلاعات شما با موفقیت ثبت شد.",
          });
        } else {
          props.messageBoxModify({
            state: true,
            message: "خطایی رخ داده است لطفا مجداا تلاش کنید.",
          });
        }
      });
  };
  return (
    <section>
      <div className="border-bottom-black">
        <div>
          <FontAwesomeIcon icon={faUserAlt} className="color-textpill" />
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            تکمیل اطلاعات
          </span>
        </div>
      </div>
      <div>
        <div
          className="card my-4"
          style={{ borderRadius: "15px", border: "transparent" }}
        >
          <form onSubmit={handleComplateProfile}>
            <div className="container-fluid">
              <div className="row my-3">
                <div className="col-lg-4 text-center">
                  <img
                    src="https://profiles.utdallas.edu/img/default.png"
                    alt="User Profile"
                    className="img-fluid img-responsive rounded-circle border-black profile-img"
                  />
                </div>
                <div className="col-lg-4">
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">نام</div>
                    {props.user_information.name === null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          name="Name"
                        />
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.name}
                      </div>
                    )}
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">نام خانوادگی</div>
                    {props.user_information.family === null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          name="Family"
                        />
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.family}
                      </div>
                    )}
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">شماره همراه</div>
                    <div className="col-lg-7 text-box">{state.mobile}</div>
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">کد ملی</div>
                    {props.user_information.meliCod === null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          name="MeliCod"
                        />
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.meliCod}
                      </div>
                    )}
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">شماره پاسپورت</div>
                    {props.user_information.pasNo === null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          name="PasNo"
                        />
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.pasNo}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">جنسیت</div>
                    {props.user_information.gender === null ? (
                      <div className="col-lg-8">
                        <select
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          value={state.gender}
                          name="gender"
                        >
                          <option value="1">مرد</option>
                          <option value="2">زن</option>
                        </select>
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.gender === 1 ? "مرد" : "زن"}
                      </div>
                    )}
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">تاریخ تولد</div>
                    {props.user_information.birthDate === null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          name="birthDate"
                        />
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.birthDate}
                      </div>
                    )}
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">معرف</div>
                    {props.user_information.mobileMoaref === null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          name="MobileMoaref"
                        />
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.mobileMoaref}
                      </div>
                    )}
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">آدرس</div>
                    {props.user_information.address === null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          name="address"
                        />
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.address}
                      </div>
                    )}
                  </div>
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">وضعیت تاهل</div>
                    {props.user_information.mariedStat === null ? (
                      <div className="col-lg-8">
                        <select
                          className="col-12 complate-profile-input"
                          value={state.MariedStat}
                          onChange={(e) => handleSetState(e)}
                          name="MariedStat"
                        >
                          <option value="1">مجرد</option>
                          <option value="2">متاهل</option>
                        </select>
                      </div>
                    ) : (
                      <div className="col-lg-7 text-box">
                        {" "}
                        {props.user_information.mariedStat == 1
                          ? "مجرد"
                          : "متاهل"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row my-2">
                <div className="col-lg-8 mb-2 ">
                  <button
                    className={`${styles["primary-button"]}  font-bold-iransanse py-2 `}
                    type="submit"
                  >
                    ثبت اطلاعات
                  </button>
                </div>
                <div className="col-lg-4 mb-2">
                  <button
                    className={`btn btn-outline-danger col-12 py-2 font-bold-iransanse  `}
                    onClick={() => router.push("/dashboard/profile")}
                    style={{ height: "3em" }}
                    type="button"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});

const mapStateToProps = (state) => ({
  user_information: state.user_information,
});

export default connect(mapStateToProps, mapDispatchesToProps)(ComplateProfile);
