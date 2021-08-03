import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import globals from "./../../Global";
import { messageBoxModify } from "./../../../Redux/UI/ui.action";
import PopUp from "./../../component/PopUp.component";
import BirthdayCalendar from "./../../calendar/BirthdayCalendar.component";

const EditProfile = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    name: props.user_information.name,
    family: props.user_information.family,
    mobile: props.user_information.mobile,
    meliCod: props.user_information.meliCod,
    pasNo: props.user_information.pasNo,
    gender: props.user_information.gender,
    birthDate: props.user_information.birthDate,
    mobileMoaref: props.user_information.mobileMoaref,
    address: props.user_information.address,
    mariedStat: props.user_information.mariedStat,
  });
  const [open, setOpen] = useState(false);

  const handleSetState = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setState((prevSate) => ({
      ...prevSate,
      UserId: localStorage.getItem("token"),
    }));
  }, []);

  const handleEditProfile = (event) => {
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
  const managePopUpBirthdayCalendar = (value) => {
    setOpen(value);
  };
  return (
    <section>
      <div className="border-bottom-black">
        <div>
          <FontAwesomeIcon icon={faUserAlt} className="color-textpill" />
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            ویرایش اطلاعات
          </span>
        </div>
      </div>
      <div
        className="card my-4"
        style={{ borderRadius: "15px", border: "transparent" }}
      >
        <form onSubmit={handleEditProfile}>
          <div className="container-fluid">
            <div className="row my-3">
              <div className="col-lg-4 text-center">
                <img
                  src="https://profiles.utdallas.edu/img/default.png"
                  alt="User Profile"
                  className="img-fluid img-responsive rounded-circle border-black profile-img"
                />
                <div className="button-wrapper">
                  <span className="label font-bold-iransanse">
                    تغییر پروفایل
                  </span>

                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    className={styles["primary-button"]}
                    placeholder="تغییر پروفایل"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">نام</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue={state.name}
                      onChange={handleSetState}
                      name="name"
                      className="col-12 complate-profile-input"
                      required
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">نام خانوادگی</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue={state.family}
                      onChange={handleSetState}
                      name="family"
                      className="col-12 complate-profile-input"
                      required
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">شماره همراه</div>
                  <div className="col-lg-8">
                    <input
                      value={state.mobile}
                      className="col-12 complate-profile-input"
                      nputMode="numeric"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">کد ملی</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue={state.meliCod}
                      onChange={handleSetState}
                      name="meliCod"
                      className="col-12 complate-profile-input"
                      nputMode="numeric"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">شماره پاسپورت</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue={state.pasNo}
                      onChange={handleSetState}
                      name="pasNo"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">جنسیت</div>
                  <div className="col-lg-8">
                    <select
                      value={state.gender}
                      onChange={handleSetState}
                      name="gender"
                      className="col-12 complate-profile-input"
                    >
                      <option value={0}>جنسیت خود را انتخاب کنید</option>
                      <option value={1}>مرد</option>
                      <option value={2}>زن</option>
                    </select>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">تاریخ تولد</div>
                  <div className="col-lg-8">
                    <input
                      value={state.birthDate}
                      onFocus={() => setOpen(true)}
                      // name="birthDate"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">معرف</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue={state.mobileMoaref}
                      onChange={handleSetState}
                      name="mobileMoaref"
                      className="col-12 complate-profile-input"
                      nputMode="numeric"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">آدرس</div>
                  <div className="col-lg-8">
                    <input
                      defaultValue={state.address}
                      onChange={handleSetState}
                      name="address"
                      className="col-12 complate-profile-input"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-lg-4 title-box ">وضعیت تاهل</div>
                  <div className="col-lg-8">
                    <select
                      value={state.mariedStat}
                      onChange={handleSetState}
                      name="mariedStat"
                      className="col-12 complate-profile-input"
                    >
                      <option value={0}>وضعیت تاهل خود را انتخاب کنید</option>
                      <option value={1}>مجرد</option>
                      <option value={2}>متاهل</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-lg-8 mb-2">
              <button
                className={`${styles["primary-button"]}  font-bold-iransanse py-2 `}
              >
                ویرایش اطلاعات
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
        </form>
      </div>
      <PopUp
        opened={open}
        closePopUp={() => managePopUpBirthdayCalendar(false)}
      >
        <div style={{ padding: 15 }}>
          <BirthdayCalendar
            typePassenger={"ADL"}
            setBirthday={(value) => {
              setState((prevState) => ({ ...prevState, birthDate: value }));
            }}
            closePopUpCalendar={() => managePopUpBirthdayCalendar(false)}
          />
        </div>
      </PopUp>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user_information: state.user_information,
});

const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchesToProps)(EditProfile)
);
