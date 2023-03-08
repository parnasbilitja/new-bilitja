import React from "react";
import PrimaryTextInput from "../../../sources/component/PrimaryTextInput.component";
import PrimaryButton from "../../../sources/component/PrimaryButton.component";
import { useForm, useCustomStateHook } from "../../../Utils/CustomHooks";
import globals from "../../Global";
import { connect } from "react-redux";
import { messageBoxModify } from "../../../Redux/UI/ui.action";
import PrimarySelectInput from "../../../sources/component/PrimarySelectInput.component";
import styles from "../../../../styles/manager.module.scss";
import stylesTrack from "../../../../styles/TrackOrder.module.scss";

const AddFacility = (props) => {
  const [state, handleChange, manualChange] = useForm({
    facilityName: "",
    facilityType: 0,
  });
  const [errors, setErrors] = useCustomStateHook({
    facilityNameError: "",
    facilityTypeError: "",
  });
  const validation = () => {
    let facilityNameError, facilityTypeError;
    let isValidated = true;
    if (state.facilityName == "" || state.facilityName == null) {
      facilityNameError = "نام امکانات نمیتواند خالی باشد";
      isValidated = false;
    }
    if (state.facilityType == 0) {
      facilityTypeError = "لطفا نوع امکانات را وارد کنید";
      isValidated = false;
    }
    setErrors({
      facilityNameError: facilityNameError,
      facilityTypeError: facilityTypeError,
    });
    return isValidated;
  };

  return (
    <div className={styles["panel-main-content"]}>
      <div class="position-relative">
        <h6 className="mt-0 font-bold-iransanse">
          اضــافه کردن اقـامتــگاه
        </h6>
        <div class="d-flex align-items-center">
          <div class="box-through"></div>
          <div class="aside-through"></div>
        </div>
      </div>

      <div className="row margin-top-10px px-3 pt-2">
        <div className="col-lg-3 col-12 padding-3px">
          <span className="font-bold-iransanse font-size-16">نام امکانات</span>
          <div>
            <PrimaryTextInput
              placeholder="نام امکانات"
              value={state.facilityName}
              name="facilityName"
              onChange={handleChange}
            />
          </div>
          <span className="color-secondary error-message font-size-14">
            {errors.facilityNameError}
          </span>
        </div>
        <div className="col-lg-3 col-12 no-padding">
          <span className="font-bold-iransanse font-size-16">نوع امکانات</span>
          <PrimarySelectInput
            value={state.facilityType}
            name="facilityType"
            onChange={handleChange}
          >
            <option value="0"></option>
            <option value="1">امکانات اقامتگاه</option>
            <option value="2">امکانات اتاق اقامتگاه</option>
          </PrimarySelectInput>
          <span className="color-secondary error-message font-size-14">
            {errors.facilityTypeError}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2 col-12 padding-3px me-auto ms-3">
          <PrimaryButton
            value="ثبت"
            onClick={() => {
              if (validation()) {
                fetch(`${globals.baseUrl}bj/emkanat/save`, {
                  headers: { "Content-Type": "application/json" },
                  method: "POST",
                  body: JSON.stringify({
                    EmkanatName: state.facilityName,
                    EmkanatType: state.facilityType,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.status == "OK") {
                      props
                        .messageBoxModify({
                          state: true,
                          color:true,
                          message: "عملیات موفقیت آمیز بود",
                        })
                        .then(() => {
                          manualChange({
                            facilityName: "",
                            facilityType: 0,
                          });
                        });
                    } else {
                      props.messageBoxModify({
                        state: true,
                        color:false,
                        message: "متاسفانه مشکلی پیش آمده است",
                      });
                    }
                  });
              }
            }}
          >{"ثبت"}</PrimaryButton>
        </div>
      </div>
    </div>
  );
};
const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
});
export default connect(null, mapDispatchesToProps)(AddFacility);
