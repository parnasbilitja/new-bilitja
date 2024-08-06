import React, { useEffect, useState } from "react";

import PrimaryTextInput from "../component/PrimaryTextInput.component";
import PrimarySelectInput from "../component/PrimarySelectInput.component";
import PrimaryButton from "../component/PrimaryButton.component";
import PopUp from "../component/PopUp.component";
import BirthdayCalendar from "../calendar/BirthdayCalendar.component";

import stylesflight from "../../../styles/FlightSearchBox.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import {
  isValidPassportCode,
  isValidIranianNationalCode,
} from "../../Utils/SimpleTasks";
import styles from "../../../styles/FlightPassengerEditForm.module.scss";
import BirthDayParent from "../calendar/BirthDayParent";
import * as moment from 'moment-jalaali';
import BirthDayParentCl from "../calendar/BirthDayParentCl";

const FlightPassengerEditForm = (props) => {
  const [calend, setCalend] = useState(true)
  const [date, setDate] = useState('')
  const [EXT, setEXT] = useState('')
  
  useEffect(() => {
    props.pathKind == 2 ? setCalend(false):setCalend(true)

  }, [])
  useEffect(() => {
    props.pathKind == 2 ? setCalend(false):setCalend(true)
  }, [props.pathKind])
  const [state, setState] = useState({
    EXTOPEN: false,
    nameErr: "",
    familyErr: "",
    melliCodeErr: "",
    pasEndDateAllErr: "",
    birthdayErr: "",
    pasnoErr: "",
    pasenddatErr: "",
    name: props.name,
    family: props.family,
    meliat: props.meliat,
    meliCode: props.meliCode,
    pasNoAll:props.pasNoAll,
    pathKind: props.pathKind,
    pasEndDateAll: props.pasEndDateAll,
    sex: props.sex,
    birthday: props.birthday,
    index: props.index,
  });
  useEffect(() => {
    setState({
      ...state,
      name: props.name,
      family: props.family,
      meliat: props.meliat,
      meliCode: props.meliCode,
      pasNoAll:props.pasNoAll,
      pasEndDateAll: props.pasEndDateAll,
      pathKind: props.pathKind,
      sex: props.sex,
      birthday: props.birthday,
      index: props.index,
    })
  }, []);
  useEffect(() => {
    setState({
      ...state,
      name: props.name,
      family: props.family,
      meliat: props.meliat,
      pasEndDateAll: props.pasEndDateAll,
      meliCode: props.meliCode,
      pasNoAll:props.pasNoAll,
      pathKind: props.pathKind,
      sex: props.sex,
      birthday: props.birthday,
      index: props.index,
    })
  }, [props])
// useEffect(() =>{
//   
// },[state])

  const handleChange = (event) => {
    
    const { name, value } = event.target;
    // 
    if (name == 'meliat') {
      setState({...state,meliCode:'',codeErr:'',pasnoErr:'',[name]: value})
    }else if (name == 'meliCode') {
      setState({...state,melliCodeErr:'',[name]: value})
    }else{
      setState({...state,[name]: value});
    }
  };
  const managePopUpBirthdayCalendar = (value) => {
    setState({
      ...state,
      open: value,
    });
  };
  const managePopUpEXTCalendar = (value) => {
    setState({
      ...state,
      EXTOPEN: value,
    });
  };
  const validation = () => {
    let isValid = true;
    let nameErr = "";
    let familyErr = "";
    let codeErr = "";
    let birthdayErr = "";
    let passportCodeErr = "";
    let pasEndDateAllErr = "";

    if (state.name == "") {
      nameErr = "نام الزامی میباشد";
      isValid = false;
    }
    if (state.family == "") {
      familyErr = "نام‌خانوادگی الزامی میباشد";
      isValid = false;
    }
    // if ((state.meliat == "other" || state.pathKind == 2) && state.pasno == "") {
    //   state.passportCodeErr = "شماره پاسپورت الزامی میباشد";
    //   isValid = false;
    // }
    if (isValidPassportCode(state.pasNoAll) && (state.meliat !='IR' || state.pathKind !=1)) {
        passportCodeErr = "شماره پاسپورت صحیح نمیباشد";
        isValid = false;
    }
    if (state.pasEndDateAll == "" && (state.meliat !='IR' || state.pathKind !=1) ) {
        pasEndDateAllErr = "انقضای پاسپورت الزامی میباشد";
        isValid = false;
    }
    if (state.meliat == "IR" && state.pathKind != 2) {
        if (!isValidIranianNationalCode(state.meliCode)) {
            state.codeErr = "کدملی نامعتبر میباشد";
            isValid = false;
        }
    }
    setState({
      ...state,
      birthdayErr: birthdayErr,
      melliCodeErr: codeErr,
      familyErr: familyErr,
      pasEndDateAllErr: pasEndDateAllErr,
      nameErr: nameErr,
      pasnoErr: passportCodeErr,
    });

    return isValid;
  };
  useEffect(() => {
    let res = date && calend == true ? date : date && calend == false ? moment(date).locale('fa').format('YYYY/M/D') : ''
    setState({ ...state, birthday: res })
  }, [date])
  useEffect(() => {
    setState({ ...state, pasEndDateAll: EXT })
  }, [EXT])
  return (
     <div className={stylesflight["flight-search-box-calendar-container"]} style={{ border: " 1px solid", borderRadius: '5px' }}> 
        <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-4 col-10 mx-4 mt-3">
          <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center" color={'#279692'}>
              <FontAwesomeIcon icon={faPencilAlt} color={'#279692'} />
                  <div className="text">
                      <h5 className="font-size-18 mb-0">ویرایش اطلاعات</h5>
                  </div>
              </div>
          </div>
      </div>
      <div className="bottom d-flex align-items-center mt-3 mb-3  mx-4" style={{width: '96%' }}>
        <div className="border-right"></div>
        <div className="border-left"></div>
      </div>
      <div
        className="passenger-form mx-3"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="row px-3">
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


          {state.pathKind == 2?
          <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px mb-4"
            style={{ height: 40 }}>
            <div
              className={` form-input-border  ${styles["form-input-border-private"]} `}
            >
              <PrimaryTextInput
                placeholder={`'شماره پاسپورت`}
                value={state.pasNoAll}
                name={'pasNoAll'}
                onChange={(e) => handleChange(e)}
                style={{ height: 40 }}
              />
            </div>
            <span className="color-secondary error-message">
              {state.codeErr}
              {state.pasnoErr !=''&&state.pasnoErr}
            </span>
          </div>:
          <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px mb-4"
            style={{ height: 40 }}>
            <div
              className={` form-input-border  ${styles["form-input-border-private"]} `}
            >
              <PrimaryTextInput
                placeholder={'کدملی'}
                value={state.meliCode}
                name={"meliCode"}
                onChange={(e) => handleChange(e)}
                style={{ height: 40 }}
              />
            </div>
            <span className="color-secondary error-message">
              {state.codeErr}
              {state.pasnoErr !=''&&state.pasnoErr}
            </span>
          </div> }
          
          {state.meliat !='IR' || state.pathKind == 2 ?
            <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px mb-4"
              style={{ height: 40 }}>
              <div
                className={` form-input-border  ${styles["form-input-border-private"]} `}
              >
                <PrimaryTextInput
                  placeholder={`انقضای پاسپورت`}
                  value={state.pasEndDateAll}
                  name="pasEndDateAll"
                  onChange={(e) => handleChange(e)}
                  style={{ height: 40 }}
                  onFocus={() => {
                    managePopUpEXTCalendar(true);
                  }}
                />
              </div>
              <span className="color-secondary error-message">
                {state.pasEndDateAllErr}
              </span>
            </div>
          :null}
          <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px selectbox-receipt mb-4">
            <PrimarySelectInput
              value={state.sex}
              name="sex"
              onChange={(e) => handleChange(e)}
              style={{ height: "44px", position: "relative", bottom: "-3px" }}
            >
              <option value="1">مرد</option>
              <option value="2">زن</option>
            </PrimarySelectInput>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12 padding-horizental-3px selectbox-receipt mb-4">
            <PrimarySelectInput
              value={state.meliat}
              name="meliat"
              onChange={(e) => {
                handleChange(e)
              }}
              style={{ height: "44px", position: "relative", bottom: "-3px" }}
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
          <div className="col-6 col-lg-1 padding-3px">
            <PrimaryButton
              value="ثبت"
              onClick={() => {
                if (validation()) {
                  props.setOpen(false);
                  props.changeProperty(props.index, state);
                }
              }}
              style={{ height: "40px" }}
            >{"ثبت"}</PrimaryButton>
          </div>
          <div className="col-6 col-lg-1 padding-3px">
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
          <div className="p-15 text-center">
            {
              props.pathKind == 1 ?
                <button className="py-2 px-4" onClick={() => setCalend(!calend)}>{calend ? 'تقویم میلادی' : 'تقویم شمسی'}</button>
                : ''}
            <BirthDayParentCl
              calend={calend}
              typePassenger={'ADL'}
              type={'BD'}
              name="birthday"
              setBirthdayb={(value) => {
                setDate(value);
                // 
              }}
              closePopUpCalendar={managePopUpBirthdayCalendar}
            />
          </div>
        </PopUp>
        <PopUp
          opened={state.EXTOPEN}
          closePopUp={managePopUpEXTCalendar}>
          <div className="p-15 text-center">
            <button className="py-2 px-4" onClick={() => setCalend(!calend)}>{calend ? 'تقویم میلادی' : 'تقویم شمسی'}</button>
            <BirthDayParent
              numMi={2022}
              numMiBase={2000}
              title="Please enter an expiration date"
              placeholder="لطفا تاریخ انقضا را وارد کنید"
              // calend={calend}
              typePassenger={'ADL'}
              type={'EXT'}
              name="pasEndDateAll"
              setBirthdayb={(value) => {
                setEXT(value);
              }}
              closePopUpCalendar={managePopUpEXTCalendar}
            />
          </div>
        </PopUp>


      </div>
    </div>
  );

}
export default FlightPassengerEditForm;
