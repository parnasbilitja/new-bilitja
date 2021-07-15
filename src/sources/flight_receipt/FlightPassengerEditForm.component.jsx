import React from 'react'

import PrimaryTextInput from '../component/PrimaryTextInput.component'
import PrimarySelectInput from '../component/PrimarySelectInput.component'
import PrimaryButton from '../component/PrimaryButton.component'
import PopUp from "../component/PopUp.component"
import BirthdayCalendar from '../calendar/BirthdayCalendar.component'

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { isValidPassportCode, isValidIranianNationalCode } from '../../Utils/SimpleTasks'
import styles from '../../../styles/FlightPassengerEditForm.module.scss'
class FlightPassengerEditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameErr: '',
            familyErr: '',
            melliCodeErr: '',
            birthdayErr: ''
        }
    }
    // when a new user gets selected from parent component, this method will be triggered 
    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            family: nextProps.family,
            meliat: nextProps.meliat,
            meliCode: nextProps.meliCode,
            sex: nextProps.sex,
            birthday: nextProps.birthday,
            index: nextProps.index
        })
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    managePopUpBirthdayCalendar = (value) => {
        this.setState({
            open: value
        })
    }
    validation = () => {
        let isValid = true
        let nameErr = ""
        let familyErr = ""
        let codeErr = ""
        let birthdayErr = ""

        if (this.state.name == "") {
            nameErr = "نام الزامی میباشد"
            isValid = false
        }
        if (this.state.family == "") {
            familyErr = "نام‌خانوادگی الزامی میباشد"
            isValid = false
        }
        if (this.state.meliat == "IR") {
            if (!isValidIranianNationalCode(this.state.meliCode)) {
                codeErr = "کدملی نامعتبر میباشد"
                isValid = false
            }
        } else {
            // if (!isValidPassportCode(tempPassenger.code)) {
            //     codeErr = "کد پاسورت نا معتبر میباشد"
            //     isValid = false
            // }
        }

        if (this.state.birthday == "") {
            birthdayErr = "تاریخ تولد الزامی میباشد"
            isValid = false
        }
        this.setState({
            birthdayErr: birthdayErr,
            melliCodeErr: codeErr,
            familyErr: familyErr,
            nameErr: nameErr,
        })

        return isValid
    }
    
    render() {
        return (
            <div className="passenger-form" onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-12 padding-horizental-3px">
                        <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                            <PrimaryTextInput placeHolder="نام" value={this.state.name} name="name" onChange={this.handleChange} />
                        </div>
                        <span className="color-secondary error-message">{this.state.nameErr}</span>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-12 padding-horizental-3px">
                        <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                            <PrimaryTextInput placeHolder="نام‌خانوادگی" value={this.state.family} name="family" onChange={this.handleChange} />
                        </div>
                        <span className="color-secondary error-message">{this.state.familyErr}</span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-12 padding-horizental-3px">
                        <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                            <PrimaryTextInput placeHolder="کدملی" value={this.state.meliCode} name="meliCode" onChange={this.handleChange} />
                        </div>
                        <span className="color-secondary error-message">{this.state.melliCodeErr}</span>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-12 padding-horizental-3px">
                        <PrimarySelectInput value={this.state.sex} name="sex" onChange={this.handleChange}>
                            <option value="1">مرد</option>
                            <option value="2">زن</option>
                        </PrimarySelectInput>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-12 padding-horizental-3px">
                        <PrimarySelectInput value={this.state.meliat} name="meliat" onChange={this.handleChange}>
                            <option value="IR">ایرانی</option>
                            <option value="Other">خارجی</option>
                        </PrimarySelectInput>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-3 col-12 padding-horizental-3px">
                        <div className={` form-input-border  ${styles['form-input-border-private']} `}>
                            <PrimaryTextInput placeHolder="تاریخ تولد" value={this.state.birthday} name="birthday" onFocus={() => {
                                this.managePopUpBirthdayCalendar(true)
                            }} />
                        </div>
                        <span className="color-secondary error-message">{this.state.birthdayErr}</span>
                    </div>
                </div>
                <div className="row" style={{marginTop:10}}>
                    <div className="col-lg-10"></div>
                    <div className="col-lg-1 padding-3px">
                        <PrimaryButton value="ثبت" onClick={() => {
                            if (this.validation()) {
                                this.props.closePopUpEditFrom(false)
                                this.props.changeProperty(this.props.index, { ...this.state })
                            }
                        }} />
                    </div>
                    <div className="col-lg-1 padding-3px">
                        <a onClick={() => {
                            this.props.closePopUpEditFrom(false)
                        }} className="btn-outlined-cancle color-secondary">
                            <span>انصراف</span>
                        </a>
                    </div>
                </div>
                <PopUp opened={this.state.open} closePopUp={this.managePopUpBirthdayCalendar}>
                    <div style={{ padding: 15 }}>
                        <BirthdayCalendar typePassenger={"ADL"} setBirthday={(value) => {
                            this.setState({ birthday: value })
                        }} closePopUpCalendar={this.managePopUpBirthdayCalendar} />
                    </div>
                </PopUp>
            </div>
        )
    }
}
export default FlightPassengerEditForm