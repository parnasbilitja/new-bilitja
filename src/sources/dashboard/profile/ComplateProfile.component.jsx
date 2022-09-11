import { faEnvelope, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import RouteButtons from "./RouteButtons.components";
import { useRouter, withRouter } from "next/router";
import globals from "./../../Global";
import { messageBoxModify } from "./../../../Redux/UI/ui.action";
import { connect } from "react-redux";
import PopUp from "./../../component/PopUp.component";
import BirthdayCalendar from "./../../calendar/BirthdayCalendar.component";
import BirthDayParent from "../../calendar/BirthDayParent";

const ComplateProfile = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    UserId: "",
    gender: 0,
    MariedStat: 0,
    birthDate: null
  });

  const [open, setOpen] = useState(false);
  const [calend, setCalend] = useState(false)


  useEffect(() => {
    setState((prevSate) => ({
      ...prevSate,
      UserId: localStorage.getItem("token"),
      mobile: localStorage.getItem("mobile"),
      hostname: "bilitja.com",
      customerId: "1a157116-a01a-4027-ab10-74098ac63815",
      agencyName: "بلیطجا",
      telNumber: "02157874",

    }));
  }, []);

  const handleSetState = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const managePopUpBirthdayCalendar = (value) => {
    setOpen(value);
  };

  const handleComplateProfile = (event) => {
    event.preventDefault();
    if (
      state.Name !== undefined &&
      state.Family !== undefined &&
      state.Name !== null &&
      state.Family !== null &&
      state.Name !== "" &&
      state.Family !== ""
    ) {
      if (state.MariedStat != 0 && state.gender != 0) {
        fetch(`${globals.baseUrlNew}auth/ProfileSave`, {
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
                color:true,
                message: "اطلاعات شما با موفقیت ثبت شد.",
              });
            } else {
              props.messageBoxModify({
                color:false,
                state: true,
                message: "خطایی رخ داده است لطفا مجداا تلاش کنید.",
              });
            }
          });
      } else {
        props.messageBoxModify({
          color:false,
          state: true,
          message: "لطفا جنسیت و وضعیت تاهل خود را مشخص کنید.",
        });
      }
    } else {
      props.messageBoxModify({
        state: true,
        color:false,
        message: "لطفا نام و نام خانوادگی خود را پر کنید.",
      });
    }
  };
  return (
    <section>
      <div class="position-relative">
        <h6 className="mt-0 font-bold-iransanse">
          تکـــمیل اطلاعـــات
        </h6>
        <div class="d-flex align-items-center">
          <div class="box-through"></div>
          <div class="aside-through"></div>
        </div>
      </div>
      <div>
        <div className="card my-4 complate-profile-cnt">
          <form onSubmit={handleComplateProfile}>
            <div className="container-fluid">
              <div className="row my-3">
                <div className="col-lg-4 text-center">
                  <img
                    width=""
                    height=""
                    src={"https://profiles.utdallas.edu/img/default.png"}
                    alt="بلیطجا - عکس پروفایل کاربر"
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
                          value={state.Name}
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
                          value={state.Family}
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
                          inputMode="numeric"
                          value={state.MeliCod}
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
                          value={state.PasNo}
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
                    {props.user_information.gender === 0 ? (
                      <div className="col-lg-8">
                        <select
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          value={state.gender}
                          name="gender"
                        >
                          <option value={0}>جنسیت خود را انتخاب کنید</option>
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
                    {props.user_information.birthDate !== null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          value={state.birthDate}
                          onFocus={() => setOpen(true)}
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
                    {props.user_information.mobileMoaref === "" ||
                      props.user_information.mobileMoaref === null ? (
                      <div className="col-lg-8">
                        <input
                          className="col-12 complate-profile-input"
                          onChange={(e) => handleSetState(e)}
                          value={state.MobileMoaref}
                          name="MobileMoaref"
                          inputMode="numeric"
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
                          value={state.address}
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
                    {props.user_information.mariedStat === 0 ? (
                      <div className="col-lg-8">
                        <select
                          className="col-12 complate-profile-input"
                          value={state.MariedStat}
                          onChange={(e) => handleSetState(e)}
                          name="MariedStat"
                        >
                          <option value={0}>
                            وضعیت تاهل خود را انتخاب کنید
                          </option>
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
                    className={`btn btn-outline-danger col-12 py-2 font-bold-iransanse h-3em `}
                    onClick={() => router.push("/dashboard/profile")}
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
      <PopUp
        opened={open}
        closePopUp={() => managePopUpBirthdayCalendar(false)}
      >
        <div className="p-15">
          <button className="py-2 px-4" onClick={() => setCalend(!calend)}>{calend ? 'Christian month' : 'شمسی'}</button>
          <BirthDayParent
            numSh={1300}
            numBase={1350}
            numMi={1920}
            numMiBase={1300}
            placeholder="لطفا تاریخ تولد را وارد کنید"
            calend={calend}
            typePassenger={"ADL"}
            name="birthday"
            setBirthdayb={(value) => {
              setState((prevState) => ({ ...prevState, birthDate: value }));
            }}
            closePopUpCalendar={managePopUpBirthdayCalendar}
          />
          {/* <BirthdayCalendar
            typePassenger={"ADL"}
            numBase={1300}
                num={1300}
                placeholder={'props.placeholder'}
                
            setBirthday={(value) => {
              setState((prevState) => ({ ...prevState, birthDate: value }));
            }}
            closePopUpCalendar={() => managePopUpBirthdayCalendar(false)}
          /> */}
        </div>
      </PopUp>
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
