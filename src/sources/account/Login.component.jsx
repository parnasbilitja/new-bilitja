import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import PrimaryTextInput from '../../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../../sources/component/PrimaryButton.component'

import { connect } from 'react-redux'
import { accountBoxModify, messageBoxModify } from '../../Redux/UI/ui.action'

import globals from '../Global'
class Login extends React.Component {
    constructor(props) {
        super(props)
       
    }

    login = () => {
        
        fetch(`${globals.baseUrl}account/auth/getMobile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mobile: this.props.mobile,
            })
        }).then(res => res.json()).then(data => {
            if (data.status == "0") {
                this.props.accountBoxModify({
                    state: true,
                    type: 'authentication'
                })
            } else {
                this.props.messageBoxModify({
                    state: true,
                    message: data.message
                })
            }

        })
    }
    render() {
        return (
            <div className="popup-content-container">
                <div className="popup-heading">
                    <span>ورود</span>
                    <span className="pull-left exit-form" onClick={() => {
                        this.props.accountBoxModify({
                            state: false,
                        })
                    }}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </div>
                <div className="row">
                    <div className="col-1 padding-horizental-3px">
                        <FontAwesomeIcon icon={faUser} className="margin-top-20px" />
                    </div>
                    <div className="col-11 padding-horizental-3px">
                        <div className={` form-input-border  `}>
                            <PrimaryTextInput placeHolder="نام کاربری (شماره همراه)" name="mobile" onChange={this.props.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 padding-horizental-3px">
                        <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
                    </div>
                    <div className="col-11 padding-horizental-3px">
                        <div className={` form-input-border  `}>
                            <PrimaryTextInput placeHolder="شماره همراه معرف را وارد کنید (اختیاری)" name="moaref" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-1 padding-horizental-3px">
                        <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
                    </div>
                    <div className="col-11 padding-horizental-3px">
                        <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                            <PrimaryTextInput placeHolder="رمز عبور" name="password" onChange={this.handleChange} />
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <div className="form-input-border without-focus col-12">
                        <PrimaryButton defaultValue={"مرحله بعد"} onClick={(e) => {
                            this.login()
                        }} />
                    </div>
                </div>
                {/*<div className="row">
                    
                   
                     <div className="col-lg-6 col-md-6 col-sm-6 col-12 no-padding-horizental">
                        <br />
                        <p className="text-center no-margin font-size-13" onClick={() => {
                            this.props.accountBoxModify({
                                state: true,
                                type: 'forget'
                            })
                        }}>رمز عبور را فراموش کرده ام</p>
                    </div> 
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 no-padding-horizental">
                        <br />
                        <p className="text-center font-size-13 no-margin" onClick={() => {
                            this.props.accountBoxModify({
                                state: true,
                                type: 'register'
                            })
                        }}>ثبت نام</p>
                    </div> 
                </div>*/}

            </div>
        )
    }
}
const mapDispatchesToProps = (dispatch) => ({
    accountBoxModify: value => dispatch(accountBoxModify(value)),
    messageBoxModify: value => dispatch(messageBoxModify(value))
})
export default connect(null, mapDispatchesToProps)(Login)