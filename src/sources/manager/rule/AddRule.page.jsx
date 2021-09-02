import React from 'react'
import PrimaryTextInput from '../../../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../../../sources/component/PrimaryButton.component'
import { useForm, useCustomStateHook } from '../../../Utils/CustomHooks'
import globals from '../../Global'
import { connect } from 'react-redux'
import { messageBoxModify } from '../../../Redux/UI/ui.action'
import styles from '../../../../styles/manager.module.scss'
import stylesTrack from '../../../../styles/TrackOrder.module.scss'

const AddRule = (props) => {
    const [state, handleChange,manualChange] = useForm({ ruleName: '' });
    const [errors, setErrors] = useCustomStateHook({ ruleNameError: '' })
    const validation = () => {
        let ruleNameError = ''
        let isValidated = true
        if (state.ruleName == "" || state.ruleName == null) {
            ruleNameError = 'نام قانون نمیتواند خالی باشد'

            isValidated = false
        }
        setErrors({
            ruleNameError: ruleNameError,
        })
        return isValidated
    }

    return (
        <div className={styles['panel-main-content']}>
            <h3 className={` ${stylesTrack['border-bottom-black-track']} font-size-16 font-bold-iransanse`}>اضافه کردن قانون</h3>
            <div className="row margin-top-10px">
                <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-13">نام قانون</span>
                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                        <PrimaryTextInput placeholder="نام قانون" value={state.ruleName} name="ruleName" onChange={handleChange} />
                    </div>
                    <span className="color-secondary error-message font-size-14">{errors.ruleNameError}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 col-12 padding-3px">
                    <PrimaryButton value="ثبت" onClick={() => {
                        if (validation()) {
                            fetch(`${globals.baseUrl}bj/rules/save`, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'POST',
                                body: JSON.stringify({ 'RulesName': state.ruleName })
                            })
                                .then(res => res.json())
                                .then(data => {    
                                    if (data.status == "OK") {
                                        props.messageBoxModify({
                                            state: true,
                                            message: 'عملیات موفقیت آمیز بود'
                                        }).then(()=>{
                                            manualChange({
                                                ruleName:''
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
export default connect(null, mapDispatchesToProps)(AddRule) 