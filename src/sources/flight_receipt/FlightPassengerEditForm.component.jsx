import React, { useEffect, useState } from "react";

import PrimaryTextInput from "../component/PrimaryTextInput.component";
import PrimarySelectInput from "../component/PrimarySelectInput.component";
import PrimaryButton from "../component/PrimaryButton.component";
import PopUp from "../component/PopUp.component";
import BirthdayCalendar from "../calendar/BirthdayCalendar.component";


import {
  isValidPassportCode,
  isValidIranianNationalCode,
} from "../../Utils/SimpleTasks";
import styles from "../../../styles/FlightPassengerEditForm.module.scss";
import BirthDayParent from "../calendar/BirthDayParent";
import PopUpWide from "../component/PopUpWide.component";
import * as moment from 'jalali-moment';

const FlightPassengerEditForm = (props) => {
  console.log(props);
  const [calend, setCalend] = useState(false)
  const [date, setDate] = useState('')
  const [state, setState] = useState({
    nameErr: "",
    familyErr: "",
    melliCodeErr: "",
    birthdayErr: "",
    pasnoErr: "",
    pasenddatErr: "",
    name: props.name,
    family: props.family,
    meliat: props.meliat,
    meliCode: props.pasNoAll,
    pathKind: props.pathKind,
    sex: props.sex,
    birthday: props.birthday,
    index: props.index,
  });
  // console.log(props);
  useEffect(() => {
    setState({
      ...state,
      name: props.name,
      family: props.family,
      meliat: props.meliat,
      meliCode: props.meliCode,
      pathKind: props.pathKind,
      sex: props.sex,
      birthday: props.birthday ,
      index: props.index,
    })});
    // console.log(props);
    useEffect(() => {
      setState({
        ...state,
        name: props.name,
        family: props.family,
        meliat: props.meliat,
        meliCode: props.pasNoAll || props.meliCode,
        pathKind: props.pathKind,
        sex: props.sex,
        birthday: props.birthday,
        index: props.index,
      })
    },[props])
    console.log(state);
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const managePopUpBirthdayCalendar = (value) => {
    setState({
      ...state,
      open: value,
    });
  };
  const validation = () => {
    let isValid = true;
    let nameErr = "";
    let familyErr = "";
    let codeErr = "";
    let birthdayErr = "";
    let pasnoErr = "";
    let pasenddatErr = "";

    if (state.name == "") {
      nameErr = "نام الزامی میباشد";
      isValid = false;
    }
    if (state.family == "") {
      familyErr = "نام‌خانوادگی الزامی میباشد";
      isValid = false;
    }
    if (state.pathKind == 1) {
      if (!isValidIranianNationalCode(state.meliCode)) {
        codeErr = "کدملی نامعتبر میباشد";
        isValid = false;
      }
    } else if (state.pathKind == 2) {
      if (!isValidPassportCode(state.meliCode)) {
        codeErr = "کد پاسورت نا معتبر میباشد"
        isValid = false
      }
    }

    if (state.birthday == "") {
      birthdayErr = "تاریخ تولد الزامی میباشد";
      isValid = false;
    }
    setState({
      ...state,
      birthdayErr: birthdayErr,
      melliCodeErr: codeErr,
      familyErr: familyErr,
      nameErr: nameErr,
      pasnoErr: pasnoErr,
      pasenddatErr: pasenddatErr,

    });

    return isValid;
  };
  useEffect(() => {
    let res = date && calend == true ? date : date && calend == false ? moment(date).locale('fa').format('YYYY/M/D') : ''
    setState({ ...state, birthday: res })
  }, [date])
  return (
    <div
      className="passenger-form mx-3"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px mb-4"
          style={{ height: 40 }}>
          <div
            className={` form-input-border ${styles["form-input-border-private"]} `}
          >
            <PrimaryTextInput
              placeholder="نام"
              value={state.name}
              name="name"
              onChange={(e) => handleChange(e)}
              style={{ height: 40 }}
            />
          </div>
          <span className="color-secondary error-message">
            {state.nameErr}
          </span>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px mb-4" style={{ height: 40 }}>
          <div
            className={` form-input-border ${styles["form-input-border-private"]} `}
          >
            <PrimaryTextInput
              placeholder="نام‌خانوادگی"
              value={state.family}
              name="family"
              onChange={(e) => handleChange(e)}
              style={{ height: 40 }}
            />
          </div>
          <span className="color-secondary error-message">
            {state.familyErr}
          </span>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px mb-4"
          style={{ height: 40 }}>
          <div
            className={` form-input-border  ${styles["form-input-border-private"]} `}
          >
            <PrimaryTextInput
              placeholder={`${state.pathKind == 1 ? 'کدملی' : 'شماره پاسپورت'}`}
              value={state.meliCode}
              name="meliCode"
              onChange={(e) => handleChange(e)}
              style={{ height: 40 }}
            />
          </div>
          <span className="color-secondary error-message">
            {state.melliCodeErr}
          </span>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px selectbox-receipt mb-4">
          <PrimarySelectInput
            value={state.sex}
            name="sex"
            onChange={(e) => handleChange(e)}
            style={{ height: "30px", position: "relative", bottom: "2px" }}
          >
            <option value="1">مرد</option>
            <option value="2">زن</option>
          </PrimarySelectInput>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px selectbox-receipt mb-4">
          <PrimarySelectInput
            value={state.meliat}
            name="meliat"
            onChange={(e) => handleChange(e)}
            style={{ height: "30px", position: "relative", bottom: "2px" }}
          >
            <option value="IR">ایرانی</option>
            <option value="Other">خارجی</option>
          </PrimarySelectInput>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px mb-4"
          style={{ height: 40 }}>
          <div
            className={` form-input-border ${styles["form-input-border-private"]} `}
          >
            <PrimaryTextInput
              placeholder="تاریخ تولد"
              value={state.birthday}
              name="birthday"
              onChange={''}
              onFocus={() => {
                managePopUpBirthdayCalendar(true);
              }}
              style={{ height: 40 }}
            />
          </div>
          <span className="color-secondary error-message">
            {state.birthdayErr}
          </span>
        </div>
      </div>
      <div className="row mt-10">
        <div className="col-lg-10"></div>
        <div className="col-lg-1 padding-3px">
          <PrimaryButton
            value="ثبت"
            onClick={() => {
              if (validation()) {
                props.setOpen(false);
                props.changeProperty(props.index, {
                  ...state,
                });
              }
            }}
            style={{ height: "40px" }}
          />
        </div>
        <div className="col-lg-1 padding-3px">
          <a
            onClick={(e) => {
              e.preventDefault();
              props.setOpen(false)
            }}
            className="btn-outlined-cancle color-secondary"
          >
            <span>انصراف</span>
          </a>
        </div>
      </div>
      <PopUp
        opened={state.open}
        closePopUp={managePopUpBirthdayCalendar}
      >
        <div className="p-15">
          {/* <button className="py-2 px-4" onClick={() => setCalend(!calend)}>{calend ? 'میلادی' : 'شمسی'}</button>
              <BirthDayParent
              numSh={1301}
              numBase={1300}
              numMi={1920}
              numMiBase={1300}
              title="Please enter date of birth"
              placeholder="لطفا تاریخ تولد را وارد کنید"
              calend={calend}
              typePassenger={"ADL"}
              type={'BD'}
              name="birthday"
              setBirthday={(value) => {
                setState({...state, birthday: value });
              }}
              closePopUpCalendar={managePopUpBirthdayCalendar}
            /> */}
          <button className="py-2 px-4" onClick={() => setCalend(!calend)}>{calend ? 'میلادی' : 'شمسی'}</button>
          <BirthDayParent
            numSh={1301}
            numBase={1300}
            numMi={1920}
            numMiBase={1300}
            title="Please enter date of birth"
            placeholder="لطفا تاریخ تولد را وارد کنید"
            calend={calend}
            typePassenger={'ADL'}
            type={'BD'}
            name="birthday"
            setBirthdayb={(value) => {
              setDate(value);
              console.log(date);
            }}
            closePopUpCalendar={managePopUpBirthdayCalendar}
          />
        </div>
      </PopUp>
    </div>
  );

}
export default FlightPassengerEditForm;
