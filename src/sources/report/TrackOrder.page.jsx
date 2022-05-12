import React from 'react'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../styles/TrackOrder.module.scss'
import PrimaryTextInput from '../../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../../sources/component/PrimaryButton.component'
import globals from '../Global'
class TrackOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }

    checkTheRefrence = () => {
        fetch(`${globals.baseUrlNew}OnlinePay/api/onlinePay/reference/${this.state.trackRef}/1a157116-a01a-4027-ab10-74098ac63815`).then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ ...data })
            })
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-10 border-pill">
                        <br />

                        <p className="text-right track-order-title font-bold-iransanse no-margin">
                            <FontAwesomeIcon className="color-textpill" icon={faCalendarCheck} />
                                پیگیری خرید
                        </p>

                        <div className="row border-bottom-black-track">
                            <div className="col-lg-7 col-md-7 col-sm-8 col-12 text-right font-size-14">
                                <p className="track-order-second-title">جهت نمایش اطلاعات خرید و پرداخت های آنلاین، کد 6 رقمی رفرنس را وارد نمایید و دکمه جستجو را کلیک کنید</p>
                            </div>

                            <div className="col-lg-1 col-md-1 col-sm-0 hidden-xs"></div>

                            <div className="col-lg-2 col-md-2 col-sm-2 col-7">
                                <div className="form-input-border height-short-input">
                                    <PrimaryTextInput placeholder="رفرنس پیگیری" name="trackRef" onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-5">
                                <div className="form-input-border height-short-input without-focus">
                                    <PrimaryButton defaultValue={"جستجو"} onClick={() => {
                                        this.checkTheRefrence()
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.referenceEbank ?
                        <div className="row">
                            <div className="col-lg-1"></div>
                            <div className="col-lg-10 border-pill">
                                <div className="row">
                                    <div className="col-lg-6">{this.state.referenceEbank.stat}</div>
                                    <div className="col-lg-6">{this.state.referenceEbank.bankName}</div>
                                    <div className="col-lg-6">{this.state.referenceEbank.reqNo}</div>
                                    <div className="col-lg-6">{this.state.referenceEbank.reqPnr}</div>
                                </div>
                            </div>
                        </div>
                        : null
                }

            </div>
        )
    }
}

export default TrackOrder