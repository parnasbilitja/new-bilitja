import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import PrimaryTextInput from '../../Components/primaty_text_input/PrimaryTextInput.component'
import PrimaryButton from '../../Components/primary_button/PrimaryButton.component'

import globals from '../../Globals/Global'

import { connect } from 'react-redux'
import { accountBoxModify, messageBoxModify} from '../../Redux/UI/ui.action'

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: ""
        }
    }

    forgetPassword = () => {
        fetch(`${globals.baseUrl}account/auth/getMobile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mobile: this.state.mobile
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.status=="0"){
                fetch(`${globals.baseUrl}account/auth/forgotPassword`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        mobile: this.state.mobile,
                        token:data.token
                    })
                }).then(res=>res.json()).then(data_=>{
                    if(data_.status==0){
                        this.props.messageBoxModify({
                            state:true,
                            message:'رمزعبور برای شما ارسال گردید'
                        })
                        this.props.accountBoxModify({
                            state: true,
                            type: 'login'
                        })
                    }
                    
                })
            }else{
                this.props.messageBoxModify({
                    state:true,
                    message:data.message
                })
            }
        })

        
    }
    render() {
        return (
            <div className="popup-content-container" >
                <div className="popup-heading">
                    <span>بازیابی رمز عبور</span>
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
                            <PrimaryTextInput placeHolder="نام‌کاربری(تلفن همراه)" onChange={(e) => {
                                this.setState({
                                    mobile: e.target.value
                                })
                            }} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="form-input-border without-focus col-12">
                        <PrimaryButton defaultValue={"ارسال رمز عبور"} onClick={(e) => {
                            this.forgetPassword()
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
                        }}>بازگشت</p>
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
export default connect(null, mapDispatchesToProps)(ForgetPassword)