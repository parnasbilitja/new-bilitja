import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import PrimaryTextInput from '../primaty_text_input/PrimaryTextInput.component'
import PrimaryButton from '../primary_button/PrimaryButton.component'

import { connect } from 'react-redux'
import { accountBoxModify,messageBoxModify } from '../../Redux/UI/ui.action'
import globals from '../../Globals/Global'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameFamily: '',
            mobile: '',
            password: '',
            mobileMoaref: ''
        }
    }
    register = () => {
        fetch(`${globals.baseUrl}account/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mobile: this.state.mobile,
                password: this.state.password,
                confirmPassword: this.state.password,
                nameFamily: this.state.nameFamily,
                mobileMoaref: this.state.mobileMoaref
            })
        }).then(res => res.json()).then(data => {
            this.props.messageBoxModify({
                state: true,
                message: data.message
            })
        })
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div className="popup-content-container">
                <div className="popup-heading">
                    <span>ثبت نام</span>
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
                        <div className="form-input-border">
                            <PrimaryTextInput placeHolder="نام کاربری(موبایل)" name="mobile" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-1 padding-horizental-3px">
                        <FontAwesomeIcon icon={faUser} className="margin-top-20px" />
                    </div>

                    <div className="col-11 padding-horizental-3px">
                        <div className="form-input-border">
                            <PrimaryTextInput placeHolder="نام و نام خانوادگی" name="nameFamily" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 padding-horizental-3px">
                        <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
                    </div>
                    <div className="col-11 padding-horizental-3px">
                        <div className="form-input-border">
                            <PrimaryTextInput placeHolder="رمز عبور" type="password" name="password" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 padding-horizental-3px">
                        <FontAwesomeIcon icon={faLock} className="margin-top-20px" />
                    </div>
                    <div className="col-11 padding-horizental-3px">
                        <div className="form-input-border">
                            <PrimaryTextInput placeHolder="موبایل معرف" name="mobileMoaref" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-input-border without-focus col-12">
                        <PrimaryButton defaultValue={"ثبت نام"} onClick={(e) => {
                            this.register()
                        }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 no-padding-horizental">
                        <br/>
                        <p className="text-center font-size-13 no-margin" onClick={() => {
                            this.props.accountBoxModify({
                                state: true,
                                type: 'login'
                            })
                        }}>ورود</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchesToProps = (dispatch) => ({
    accountBoxModify: value => dispatch(accountBoxModify(value)),
    messageBoxModify: value => dispatch(messageBoxModify(value))

})

export default connect(null, mapDispatchesToProps)(Register)