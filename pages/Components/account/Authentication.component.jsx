import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faLock } from '@fortawesome/free-solid-svg-icons'
import PrimaryTextInput from '../primaty_text_input/PrimaryTextInput.component'
import PrimaryButton from '../primary_button/PrimaryButton.component'
import moment from 'moment-jalaali'

import { connect } from 'react-redux'
import { accountBoxModify, messageBoxModify } from '../../Redux/UI/ui.action'
import {addAccountProperties} from '../../Redux/Account/account.action'

import globals from '../../Globals/Global'
class Authentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: ''
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    loginWithToken = () => {
        fetch(`${globals.baseUrl}account/auth/checkUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mobile: this.props.mobile,
                token: this.state.token
            })
        }).then(res => res.json()).then(data => {
            if(data.status=="0"){
            
                this.props.addAccountProperties({
                    token:data.token,
                    dateLogin:moment().format("YYYY/MM/DD")
                })
                this.props.messageBoxModify({
                    state: true,
                    message: "authorized"
                })
            }else{
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
                        <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
                    </div>
                    <div className="col-11 padding-horizental-3px">
                        <div className={` form-input-border `}>
                            <PrimaryTextInput placeHolder="کد ارسال شده" name="token" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="form-input-border without-focus col-12">
                        <PrimaryButton defaultValue={"ورود"} onClick={(e) => {
                            this.loginWithToken()
                        }} />
                    </div>
                </div>
                {/* <div className="row">
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
                </div> */}

            </div>
        )
    }
}
const mapDispatchesToProps = (dispatch) => ({
    accountBoxModify: value => dispatch(accountBoxModify(value)),
    messageBoxModify: value => dispatch(messageBoxModify(value)),
    addAccountProperties:value=>dispatch(addAccountProperties(value))
})
export default connect(null, mapDispatchesToProps)(Authentication)