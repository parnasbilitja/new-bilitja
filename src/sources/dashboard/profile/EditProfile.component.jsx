import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../../../styles/PrimaryButton.module.scss";
import { useRouter, withRouter } from "next/router";
import { connect } from "react-redux";
import globals from "./../../Global";
import { messageBoxModify } from "./../../../Redux/UI/ui.action";
import PopUp from "./../../component/PopUp.component";
import BirthDayParent from "../../calendar/BirthDayParent";
import ImgPrev from "./Image";

const EditProfile = (props) => {
  const router = useRouter();
  const [calend, setCalend] = useState(false)
  const [open, setOpen] = useState(false);
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
    hostname: "bilitja.com",
    customerId: "1a157116-a01a-4027-ab10-74098ac63815",
    agencyName: "بلیطجا",
    telNumber: "02157874",
    image: 'https://profiles.utdallas.edu/img/default.png'
  });

  console.log(state);

  const handleSetState = (e) => {
    const { name, value } = e.target;
    setState(({ ...state, [name]: value }));
  };

  useEffect(() => {
    setState((prevSate) => ({
      ...prevSate,
      UserId: localStorage.getItem("token"),
    }));
  }, []);

  const handleEditProfile = (event) => {
    event.preventDefault();
    console.log(state);
    if (state.name != "" && state.family != "") {
      if (state.gender != 0 && state.mariedStat != 0) {
        fetch(`${globals.baseUrlNew}auth/ProfileSave`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.status === "0") {
              router.push("/dashboard/profile");
              props.messageBoxModify({
                state: true,
                color: true,
                message: "اطلاعات شما با موفقیت ثبت شد.",
              });
            } else {
              props.messageBoxModify({
                color: false,
                state: true,
                message: "خطایی رخ داده است لطفا مجداا تلاش کنید.",
              });
            }
          });
      } else {
        props.messageBoxModify({
          state: true,
          color: false,
          message: "لطفا جنسیت و وضعیت تاهل خود را مشخص کنید.",
        });
      }
    } else {
      props.messageBoxModify({
        state: true,
        color: false,
        message: "لطفا نام و نام خانوادگی خود را پر کنید.",
      });
    }
  };
  const managePopUpBirthdayCalendar = (value) => {
    setOpen(value);
  };
  return (
    <section>
      <div class="position-relative">
        <h6 className="mt-0 font-bold-iransanse">
          تکمیـــل اطلاعـــات
        </h6>
        <div class="d-flex align-items-center">
          <div class="box-through"></div>
          <div class="aside-through"></div>
        </div>
      </div>
      <div className="card my-4 edit-profile-cnt">
        <form onSubmit={handleEditProfile}>
          <div className="container-fluid">
            <div className="row my-3">
              <div className="col-lg-3 text-center">
                <ImgPrev state={state} setState={setState} />
              </div>
              <div className="col-lg-9 d-flex flex-wrap align-items-start justify-content-between">
                <div className="flex-48">
                  <div className="row my-2">
                    <div className="col-lg-4 title-box ">نام</div>
                    <div className="col-lg-8">
                      <input
                        defaultValue={state.name}
                        onChange={handleSetState}
                        name="name"
                        className="col-12 complate-profile-input"
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
                <div className="flex-48">
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
                <div className="col-lg-12">
                  <div className="row my-2">
                    <div className="col-lg-2 title-box">آدرس</div>
                    <div className="flex-83">
                      <textarea
                        defaultValue={state.address}
                        onChange={handleSetState}
                        name="address"
                        className="col-12 complate-profile-input"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-2 justify-content-end ms-3">
            <div className="col-lg-2 mb-2">
              <button
                className={`${styles["primary-button"]}  font-bold-iransanse py-2 `}
              >
                ویرایش اطلاعات
              </button>
            </div>
            <div className="col-lg-2 mb-2">
              <button
                className={`btn btn-outline-danger col-12 py-2 font-bold-iransanse h-3em `}
                onClick={() => router.push("/dashboard/profile")}
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
        <div className="p-15 text-center">
          <button className="py-2 px-4" onClick={() => setCalend(!calend)}>{calend ? 'Christian month' : 'شمسی'}</button>
          <BirthDayParent
            numSh={1301}
            numBase={1300}
            numMi={1920}
            numMiBase={1300}
            title="Please enter date of birth"
            placeholder="لطفا تاریخ تولد را وارد کنید"
            calend={calend}
            type={'BD'}
            typePassenger={"ADL"}
            name="birthday"
            setBirthdayb={(value) => {
              setState((prevState) => ({ ...prevState, birthDate: value }));
            }}
            closePopUpCalendar={managePopUpBirthdayCalendar}
          />
          {/* <BirthdayCalendar
            typePassenger={"ADL"}
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

const mapStateToProps = (state) => ({
  user_information: state.user_information,
});

const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchesToProps)(EditProfile)
);
