import React, { useEffect } from 'react'
import PrimaryTextInput from '../../../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../../../sources/component/PrimaryButton.component'
import { useForm, useCustomStateHook } from '../../../Utils/CustomHooks'
import globals from '../../Global'
import { connect } from 'react-redux'
import { messageBoxModify } from '../../../Redux/UI/ui.action'
import styles from '../../../../styles/manager.module.scss'
import stylesTrack from '../../../../styles/TrackOrder.module.scss'

const UpdateRule = (props) => {
    const [state, handleChange] = useCustomStateHook({ ruleName: '', ruleNameError: '' });
    const validation = () => {
        let ruleNameError = ''
        let isValidated = true
        if (state.ruleName == "" || state.ruleName == null) {
            ruleNameError = 'نام قانون نمیتواند خالی باشد'

            isValidated = false
        }
        handleChange({
            ruleNameError: ruleNameError,
        })
        return isValidated
    }

    useEffect(async () => {

        const res = await fetch(`${globals.baseUrl}bj/rules/view/${this.props.router.asPath.substr(17)}`);
        const json = await res.json();

        handleChange({
            ruleName: json.Rules[0].RulesName
        })

    }, []);
    return (
        <div className={styles['panel-main-content']}>
            <h3 className={` ${stylesTrack['border-bottom-black-track']} font-size-16 font-bold-iransanse`}>اضافه کردن قانون</h3>
            <div className="row margin-top-10px">
                <div className="col-lg-3 col-12 padding-3px">
                    <span className="font-bold-iransanse font-size-13">نام قانون</span>
                    <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                        <PrimaryTextInput placeholder="نام قانون" value={state.ruleName} name="ruleName" onChange={(e)=>{handleChange({'ruleName':e.target.value})}} />
                    </div>
                    <span className="color-secondary error-message font-size-14">{state.ruleNameError}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 col-12 padding-3px">
                    <PrimaryButton value="ثبت" onClick={() => {
                        if (validation()) {
                            fetch(`${globals.baseUrl}bj/rules/save`, {
                                headers: { 'Content-Type': 'application/json' },
                                method: 'POST',
                                body: JSON.stringify({ 'RulesId': this.props.router.asPath.substr(17), 'RulesName': state.ruleName })
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.status == "OK") {
                                        props.messageBoxModify({
                                            color:true,
                                            state: true,
                                            message: 'عملیات موفقیت آمیز بود'
                                        })
                                    } else {
                                        props.messageBoxModify({
                                            color:true,
                                            state: true,
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
export default connect(null, mapDispatchesToProps)(UpdateRule) 