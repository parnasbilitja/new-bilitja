import React, { useState, useEffect } from "react";
import PrimaryTextInput from "../../../sources/component/PrimaryTextInput.component";
import PrimarySelectInput from "../../../sources/component/PrimarySelectInput.component";
import PrimaryButton from "../../../sources/component/PrimaryButton.component";
import { useForm, useCustomStateHook } from "../../../Utils/CustomHooks";
import globals from "../../Global";
import { connect } from "react-redux";
import { messageBoxModify } from "../../../Redux/UI/ui.action";
import styles from "../../../../styles/manager.module.scss";
import stylesTrack from "../../../../styles/TrackOrder.module.scss";

const AddCity = (props) => {
  const [state, handleChange, manaulChange] = useForm({
    cityName: "",
    province: -1,
    airportCode: "",
  });
  const [errors, setErrors] = useCustomStateHook({
    cityNameError: "",
    provinceError: "",
    airportCodeError: "",
  });
  const [provinces, setProvinces] = useState([]);
  const validation = () => {
    let cityNameError, provinceError, airportCodeError;
    let isValidated = true;
    if (state.cityName == "" || state.cityName == null) {
      cityNameError = "نام شهر نمیتواند خالی باشد";
      isValidated = false;
    }

    if (state.province == -1) {
      provinceError = "لطفا استان مورد نظرتان را انتخاب کنید";
      isValidated = false;
    }

    if (state.airportCode == "" || state.airportCode == null) {
      airportCodeError = "کد فرودگاه نمیتواند خالی باشد";
      isValidated = false;
    }

    setErrors({
      cityNameError: cityNameError,
      provinceError: provinceError,
      airportCodeError: airportCodeError,
    });

    return isValidated;
  };
  useEffect(async () => {
    const res = await fetch(`${globals.baseUrl}bj/province/view`);
    const json = await res.json();
    setProvinces(json.Province);
  }, []);
  return (
    <section>
      <div>
        <div class="position-relative">
          <h6 className="mt-0 font-bold-iransanse">
            اضــافه کردن شهــر
          </h6>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
        <div className="px-3 pt-2">
          <div className="row align-items-center margin-top-10px">
            <div className="col-lg-3 col-12 padding-3px">
              <span className="font-bold-iransanse font-size-16">نام شهر</span>
              <div
                className={` form-input-border  ${styles["form-input-border-private"]} `}
              >
                <PrimaryTextInput
                  placeholder="نام شهر"
                  value={state.cityName}
                  name="cityName"
                  onChange={handleChange}
                />
              </div>
              <span className="color-secondary error-message font-size-14">
                {errors.cityNameError}
              </span>
            </div>
            <div className="col-lg-3 col-12 padding-3px">
              <span className="font-bold-iransanse font-size-16">استان</span>
              <PrimarySelectInput
                name="province"
                value={state.province}
                onChange={handleChange}
              >
                <option value="-1" selected></option>
                {provinces.map((oneProvince) => (
                  <option value={oneProvince.ProvinceId}>
                    {oneProvince.ProvinceName}
                  </option>
                ))}
              </PrimarySelectInput>
              <span className="color-secondary error-message font-size-14">
                {errors.provinceError}
              </span>
            </div>
            <div className="col-lg-3 col-12 padding-3px">
              <span className="font-bold-iransanse font-size-16">کد فرودگاه</span>
              <div
                className={` form-input-border  ${styles["form-input-border-private"]} `}
              >
                <PrimaryTextInput
                  placeholder="کد فرودگاه"
                  value={state.airportCode}
                  name="airportCode"
                  onChange={handleChange}
                />
              </div>
              <span className="color-secondary error-message font-size-14">
                {errors.airportCodeError}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-1 col-12 padding-3px me-auto">
              <PrimaryButton
                value="ثبت"
                onClick={() => {
                  if (validation()) {
                    fetch(`${globals.baseUrl}bj/city/save`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        CityName: state.cityName,
                        ProvinceId: state.Provinces,
                        AirportCode: state.airportCode,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.status == "OK") {
                          props
                            .messageBoxModify({
                              state: true,
                              message: "عملیات موفقیت آمیز بود",
                            })
                            .then(() => {
                              manaulChange({
                                cityName: "",
                                airportCode: "",
                                province: -1,
                              });
                            });
                        } else {
                          props.messageBoxModify({
                            state: true,
                            message: "متاسفانه مشکلی پیش آمده است",
                          });
                        }
                      });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapDispatchesToProps = (dispatch) => ({
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
});
export default connect(null, mapDispatchesToProps)(AddCity);
