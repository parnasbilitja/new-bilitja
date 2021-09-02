import React, { useState, useEffect } from 'react'
import PrimaryTextInput from '../../../sources/component/PrimaryTextInput.component'
import PrimarySelectInput from '../../../sources/component/PrimarySelectInput.component'
import PrimaryButton from '../../../sources/component/PrimaryButton.component'
import { useCustomStateHook } from '../../../Utils/CustomHooks'
import globals from '../../Global'
import { connect } from 'react-redux'
import { messageBoxModify } from '../../../Redux/UI/ui.action'
import styles from '../../../../styles/manager.module.scss'
import stylesTrack from '../../../../styles/TrackOrder.module.scss'

const UpdateCity = (props) => {
    const [state, setState] = useCustomStateHook({ cityName: '', province: -1, airportCode: '', cityNameError: '', provinceError: '', airportCodeError: '' });
    
    const validation = () => {
        let cityNameError, provinceError, airportCodeError
        let isValidated = true
        if (state.cityName == "" || state.cityName == null) {
            cityNameError = 'نام شهر نمیتواند خالی باشد'
            isValidated = false
        }

        if (state.province == -1) {
            provinceError = 'لطفا استان مورد نظرتان را انتخاب کنید'
            isValidated = false
        }

        if (state.airportCode == "" || state.airportCode == null) {
            airportCodeError = 'کد فرودگاه نمیتواند خالی باشد'
            isValidated = false
        }

        setState({
            cityNameError: cityNameError,
            provinceError: provinceError,
            airportCodeError: airportCodeError
        })

        return isValidated
    }
    useEffect(async () => {
        const res = await fetch(`${globals.baseUrl}bj/province/view`);
        const json = await res.json();
        setProvinces(json.Province)
        
        const resCity = await fetch(`${globals.baseUrl}bj/city/view/${this.props.router.asPath.substr(17)}`);
        const jsonCity = await resCity.json();

        setState({
            cityName: jsonCity.City[0].CityName,
            province: jsonCity.City[0].ProvinceId,
            airportCode: jsonCity.City[0].AirportCode
        })

    }, []);
    return (
        <div className={styles['panel-main-content']}>
            <h3 className={` ${stylesTrack['border-bottom-black-track']} font-size-16 font-bold-iransanse`}>اضافه کردن شهر</h3>
            <div className="row margin-top-10px">
                <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-13">نام شهر</span>
                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                        <PrimaryTextInput placeholder="نام شهر" value={state.cityName} name="cityName" onChange={(e) => {
                            setState({
                                cityName: e.target.value
                            })
                        }} />
                    </div>
                    <span className="color-secondary error-message font-size-14">{state.cityNameError}</span>
                </div>
                <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-13">استان</span>
                    <PrimarySelectInput value={state.province} name="province" onChange={(e) => {
                        setState({
                            province: e.target.value
                        })
                    }} >
                        <option value="-1" selected></option>

                        {
                            provinces.map(oneProvince => (
                                <option value={oneProvince.ProvinceId}>{oneProvince.ProvinceName}</option>
                            ))
                        }
                    </PrimarySelectInput>
                    <span className="color-secondary error-message font-size-14">{state.provinceError}</span>
                </div>
                <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-13">کد فرودگاه</span>
                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                        <PrimaryTextInput placeholder="کد فرودگاه" value={state.airportCode} name="airportCode" onChange={(e) => {
                            setState({
                                airportCode: e.target.value
                            })
                        }} />
                    </div>
                    <span className="color-secondary error-message font-size-14">{state.airportCodeError}</span>
                </div>

            </div>
            <div className="row">
                <div className="col-lg-2 col-12 padding-3px">
                    <PrimaryButton value="ثبت" onClick={() => {
                        if (validation()) {
                            fetch(`${globals.baseUrl}bj/city/save`, {
                                method: "POST",
                                headers: { 'Content-Type': "application/json" },
                                body: JSON.stringify({
                                    CityId: this.props.router.asPath.substr(17),
                                    CityName: state.cityName,
                                    ProvinceId: state.province,
                                    AirportCode: state.airportCode
                                })
                            }).then(res => res.json())
                                .then(data => {
                                    if (data.status == "OK") {
                                        props.messageBoxModify({
                                            state: true,
                                            message: 'عملیات موفقیت آمیز بود'
                                        })
                                    } else {
                                        props.messageBoxModify({
                                            state: true,
                                            message: 'متاسفانه مشکلی پیش آمده است'
                                        })
                                    }

                                })
                        }
                    }} />
                </div>
            </div>
        </div>
    )
}
const mapDispatchesToProps = (dispatch) => ({
    messageBoxModify: async value => dispatch(messageBoxModify(value))
})
export default connect(null, mapDispatchesToProps)(UpdateCity)