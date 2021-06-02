import React from 'react'

import PrimaryTextInput from '../../Components/primaty_text_input/PrimaryTextInput.component'
import PrimarySelectInput from '../../Components/primary_select_input/PrimarySelectInput.component'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BirthdayCalendar from '../birthday_calendar/BirthdayCalendar.component'
import { moneyFormat } from '../../Utils/SimpleTasks'
import PopUp from "../pop_up/PopUp.component"
import  styles from  '../../../styles/FlightPassengerForm.module.scss'
import {checkCharacter,checkNumber} from '../../Utils/SimpleTasks'
import { messageBoxModify } from '../../Redux/UI/ui.action'
import { connect } from 'react-redux'

class FlightPassengerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    //get title of form
    getTitleByType = (type) => {
        if (type == "ADL") {
            return "بزرگسال"
        } else if (type == "CHD") {
            return "کودک"
        } else if (type == "INF") {
            return "نوزاد"
        }
    }
    // get a small description based on type of passenger
    getSubtitleByType = (type) => {
        if (type == "ADL") {
            return "(12 سال به بالا)"
        } else if (type == "CHD") {
            return "(2 تا 12 سال)"
        } else if (type == "INF") {
            return "(زیر 2 سال)"
        }
    }
    managePopUpBirthdayCalendar = (value) => {
        this.setState({
            open: value
        })
    }
    checkCharacters=(value)=>{
        if(!checkCharacter(value) && value!=""){
            this.props.messageBoxModify({
                message: "لطفا از کاکتر های لاتین استفاده کنید",
                state: true
            })
            return false
        }
        return true
    }
    render() {
        return (
            <div className={styles['passenger-form']}>
                <div className="row">
                    <div className="col-lg-1 col-md-12 col-sm-12 col-12 no-padding hidden-xs">
                        <p className="no-margin font-size-14 font-bold-iransanse">{`${this.props.index + 1}-`}&nbsp;{this.getTitleByType(this.props.type)}</p>
                        <p className="no-margin font-size-10">{this.getSubtitleByType(this.props.type)}</p>
                    </div>
                    {/* shows up just for mobile ----- start*/}
                    <div className={` ${styles['visible-xs-passenger-form-header']} col-12 padding-3px`}>
                        <div className="col-6 no-margin padding-xs-0-7">
                            <span className="font-size-13 no-margin font-bold-iransanse">{`${this.props.index + 1}-`}&nbsp;{this.getTitleByType(this.props.type)} </span>
                            <span className="no-margin font-size-11">{this.getSubtitleByType(this.props.type)}</span>
                        </div>
                        <div className="col-6 no-padding no-margin text-left">
                            <span className="font-size-14 color-secondary font-bold-iransanse">
                                {moneyFormat(this.props.price)}
                            </span>
                            <span className="font-size-12 font-bold-iransanse">تومان</span>

                        </div>
                        {
                            this.props.id != 0 ?
                                <div className="col-1 no-margin no-padding">
                                    <span className="exit-form" onClick={() => {
                                        this.props.removePassenger(this.props.id)
                                    }}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>
                                    <span className="color-secondary error-message">&nbsp;</span>

                                </div>
                                : null
                        }
                    </div>
                    {/* shows up just for mobile ----- end */}
                    <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-6 padding-horizental-3px">
                                <div className="form-input-border">
                                    <PrimaryTextInput placeHolder="نام" onChange={(e) => {
                                        if(!this.checkCharacters(e.target.value)){
                                            return
                                        }
                                        this.props.fillPassengersData("name", this.props.id, e.target.value)
                                    }} value={this.props.name}/>
                                </div>
                                <span className="color-secondary error-message">{this.props.nameErr}</span>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-3 col-6 padding-horizental-3px">
                                <div className="form-input-border">
                                    <PrimaryTextInput placeHolder="نام خانودگی" onChange={(e) => {
                                        if(!this.checkCharacters(e.target.value)){
                                            return
                                        }
                                        this.props.fillPassengersData("family", this.props.id, e.target.value)
                                    }} value={this.props.family}/>
                                </div>
                                <span className="color-secondary error-message">{this.props.familyErr}</span>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-6 padding-horizental-3px">
                                <PrimarySelectInput name="nationality" onChange={(e) => {
                                    this.props.fillPassengersData("nationality", this.props.id, e.target.value)
                                }}>
                                    <option value="IR" selected="selected">ایرانی</option>
                                    <option value="other">خارجی</option>
                                </PrimarySelectInput>
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-6 padding-horizental-3px">
                                <PrimarySelectInput name="gender" onChange={(e) => {
                                    this.props.fillPassengersData("gender", this.props.id, e.target.value)
                                }}>
                                    <option value="1" selected="selected">مرد</option>
                                    <option value="2">زن</option>
                                </PrimarySelectInput>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-6 padding-horizental-3px">
                                <div className="form-input-border">
                                    <PrimaryTextInput inputMode="numeric" placeHolder={`${this.props.nationality=="IR" ? "کد ملی" : "کد پاسپورت" }`} onChange={(e) => {
                                        if(!checkNumber(e.target.value)){
                                            return
                                        }
                                        this.props.fillPassengersData("code", this.props.id, e.target.value)
                                    }} value={this.props.code}/>
                                </div>
                                <span className="color-secondary error-message">{this.props.codeErr}</span>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-6 padding-horizental-3px">
                                <div className="form-input-border">
                                    <PrimaryTextInput placeHolder="تاریخ تولد" value={this.props.birthday} onFocus={() => {
                                        this.managePopUpBirthdayCalendar(true)
                                    }} />
                                </div>
                                <span className="color-secondary error-message">{this.props.birthdayErr}</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-xs col-lg-1 col-md-2 col-sm-2 row-price font-size-12">
                        <span className="font-size-14 color-secondary font-bold-iransanse">
                            {moneyFormat(this.props.price)}
                            &nbsp;
                        </span>
                        تومان
                    </div>
                    {
                        this.props.id != 0 ?
                            <div className="hidden-xs hidden-sm corner-position">
                                <span className="exit-form-circle corner-position" onClick={() => {
                                    this.props.removePassenger(this.props.id)
                                }}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                                <span className="color-secondary error-message">&nbsp;</span>

                            </div>
                            : null
                    }
                </div>
                <PopUp opened={this.state.open} closePopUp={this.managePopUpBirthdayCalendar}>
                    <div style={{ padding: 15 }}>
                        <BirthdayCalendar typePassenger={this.props.type} setBirthday={(value) => {
                            this.props.fillPassengersData("birthday", this.props.id, value)
                        }} closePopUpCalendar={this.managePopUpBirthdayCalendar} />
                    </div>
                </PopUp>
            </div>
        )
    }
}
const dispatchStateToProps = (dispatch) => ({
    messageBoxModify: value => dispatch(messageBoxModify(value))
})
export default connect(null,dispatchStateToProps)(FlightPassengerForm)