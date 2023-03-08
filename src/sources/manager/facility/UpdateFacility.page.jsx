import React, { useEffect } from 'react'
import PrimaryTextInput from '../../../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../../../sources/component/PrimaryButton.component'
import { useForm, useCustomStateHook } from '../../../Utils/CustomHooks'
import globals from '../../Global'
import { connect } from 'react-redux'
import { messageBoxModify } from '../../../Redux/UI/ui.action'
import PrimarySelectInput from '../../../sources/component/PrimarySelectInput.component'
import styles from '../../../../styles/manager.module.scss'
import stylesTrack from '../../../../styles/TrackOrder.module.scss'

const UpdateFacility = (props) => {
    const [state, handleChange] = useCustomStateHook({ facilityName: '', facilityType: 0, facilityNameError: '', facilityTypeError: ''});
    
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
        handleChange({
            facilityNameError: facilityNameError,
            facilityTypeError: facilityTypeError
        })
        return isValidated
    }
    useEffect(async () => {
        
        const res = await fetch(`${globals.baseUrl}bj/emkanat/view/${this.props.router.asPath.substr(21)}`);
        const json = await res.json();

        handleChange({
             facilityName: json.Emkanat[0].EmkanatName,
             facilityType: json.Emkanat[0].EmkanatType
        })

    }, []);
    return (
        <div className={styles['panel-main-content']}>
            <h3 className={` ${stylesTrack['border-bottom-black-track']} font-size-16 font-bold-iransanse`}>اضافه کردن امکانات</h3>
            <div className="row margin-top-10px">
                <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-13">نام امکانات</span>
                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                        <PrimaryTextInput placeholder="نام امکانات" value={state.facilityName} name="facilityName" onChange={(e)=>{handleChange({facilityName:e.target.value})}} />
                    </div>
                    <span className="color-secondary error-message font-size-14">{state.facilityNameError}</span>
                </div>
                <div className="col-lg-3 col-12 no-padding">
                    <span className="font-bold-iransanse font-size-13">نوع امکانات</span>
                    <PrimarySelectInput value={state.facilityType} name="facilityType" onChange={(e)=>{handleChange({facilityType:e.target.value})}}>
                       <option value="0"></option>
                       <option value="1">امکانات اقامتگاه</option>
                       <option value="2">امکانات اتاق اقامتگاه</option>
                    </PrimarySelectInput>
                    <span className="color-secondary error-message font-size-14">{state.facilityTypeError}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 col-12 padding-3px">
                    <PrimaryButton value="ثبت" onClick={() => {
                        if (validation()) {
                            fetch(`${globals.baseUrl}bj/emkanat/save`, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'POST',
                                body: JSON.stringify({ 'EmkanatId':this.props.router.asPath.substr(21),'EmkanatName': state.facilityName ,"EmkanatType":state.facilityType})
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.status == "OK") {
                                        props.messageBoxModify({
                                            state: true,
                                            color:true,
                                            message: 'عملیات موفقیت آمیز بود'
                                        }).then(() => {
                                           
                                        })
                                    } else {
                                        props.messageBoxModify({
                                            state: true,
                                            color:false,
                                            message: 'متاسفانه مشکلی پیش آمده است'
                                        })
                                    }

                                })
                        }
                    }} >{"ثبت"}</PrimaryButton>
                </div>
            </div>
        </div>
    )
}
const mapDispatchesToProps = (dispatch) => ({
    messageBoxModify: async value => dispatch(messageBoxModify(value))
})
export default connect(null, mapDispatchesToProps)(UpdateFacility) 