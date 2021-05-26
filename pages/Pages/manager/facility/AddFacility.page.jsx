import React from 'react'
import PrimaryTextInput from '../../../Components/primaty_text_input/PrimaryTextInput.component'
import PrimaryButton from '../../../Components/primary_button/PrimaryButton.component'
import { useForm, useCustomStateHook } from '../../../Utils/CustomHooks'
import globals from '../../../Globals/Global'
import { connect } from 'react-redux'
import { messageBoxModify } from '../../../Redux/UI/ui.action'
import PrimarySelectInput from '../../../Components/primary_select_input/PrimarySelectInput.component'
const AddFacility = (props) => {
    const [state, handleChange, manualChange] = useForm({ facilityName: '', facilityType: 0 });
    const [errors, setErrors] = useCustomStateHook({ facilityNameError: '', facilityTypeError: '' })
    const validation = () => {
        let facilityNameError, facilityTypeError
        let isValidated = true
        if (state.facilityName == "" || state.facilityName == null) {
            facilityNameError = 'نام امکانات نمیتواند خالی باشد'
            isValidated = false
        }
        if (state.facilityType == 0) {
            facilityTypeError = 'لطفا نوع امکانات را وارد کنید'
            isValidated = false
        }
        setErrors({
            facilityNameError: facilityNameError,
            facilityTypeError: facilityTypeError
        })
        return isValidated
    }

    return (
        <div className="panel-main-content">
            <h3 className="border-bottom-black-track font-size-16 font-bold-iransanse">اضافه کردن امکانات</h3>
            <div className="row margin-top-10px">
                <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-13">نام امکانات</span>
                    <div className="form-input-border">
                        <PrimaryTextInput placeHolder="نام امکانات" value={state.facilityName} name="facilityName" onChange={handleChange} />
                    </div>
                    <span className="color-secondary error-message font-size-14">{errors.facilityNameError}</span>
                </div>
                <div className="col-lg-3 col-12 no-padding">
                    <span className="font-bold-iransanse font-size-13">نوع امکانات</span>
                    <PrimarySelectInput value={state.facilityType} name="facilityType" onChange={handleChange}>
                        <option value="0"></option>
                        <option value="1">امکانات اقامتگاه</option>
                        <option value="2">امکانات اتاق اقامتگاه</option>
                    </PrimarySelectInput>
                    <span className="color-secondary error-message font-size-14">{errors.facilityTypeError}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 col-12 padding-3px">
                    <PrimaryButton value="ثبت" onClick={() => {
                        if (validation()) {
                            fetch(`${globals.baseUrl}bj/emkanat/save`, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'POST',
                                body: JSON.stringify({ 'EmkanatName': state.facilityName, "EmkanatType": state.facilityType })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.status == "OK") {
                                        props.messageBoxModify({
                                            state: true,
                                            message: 'عملیات موفقیت آمیز بود'
                                        }).then(() => {
                                            manualChange({
                                                facilityName: "",
                                                facilityType: 0
                                            })
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
export default connect(null, mapDispatchesToProps)(AddFacility) 