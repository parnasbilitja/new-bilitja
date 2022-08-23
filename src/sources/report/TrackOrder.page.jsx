import React from 'react'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from '../../../styles/TrackOrder.module.scss'
import PrimaryTextInput from '../../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../../sources/component/PrimaryButton.component'
import globals from '../Global'
class TrackOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

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
            <div className="container-fluid mt-130">
                <div className="container">
                    <div className="d-flex align-items-center col-xl-12 col-lg-12 col-sm-12 mx-auto">
                        <div className="col-lg-6 details-order mt-4">
                            <div className="title-order d-flex align-items-center">
                                <FontAwesomeIcon className="color-textpill icon-size" icon={faCalendarCheck} />
                                <h2 className={'title-track-order'}>پیگیری خرید</h2>
                            </div>
                            <div className="row border-bottom-black-track">
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10 text-right font-size-14">
                                    <p className="track-order-second-title">جهت پیگیری رزرو، کد 6 رقمی رفرنس را وارد نمایید و بروی دکمه جستجو  کلیک کنید</p>
                                </div>

                                {/* <div className="col-lg-1 col-md-1 col-sm-0 hidden-xs"></div> */}

                                <div className="w-100">
                                    <div className="col-md-10 form-input-border height-short-input">
                                        <PrimaryTextInput placeholder="رفرنس پیگیری" name="trackRef" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                    <div className="form-input-border height-short-input without-focus">
                                        <PrimaryButton defaultValue={"جستجو"} onClick={() => {
                                            this.checkTheRefrence()
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.referenceEbank ?
                                <div className="row">
                                    <div className="col-lg-10 border-pill p-4">
                                        <div className="row">
                                            <div className="col-lg-6">{this.state.referenceEbank.state}</div>
                                            <div className="col-lg-6">{this.state.referenceEbank.bankName}</div>
                                            <div className="col-lg-6">{this.state.referenceEbank.reqNo}</div>
                                            <div className="col-lg-6">{this.state.referenceEbank.reqPnr}</div>
                                        </div>
                                    </div>
                                </div>
                                : <div className="col-lg-6 img">
                                    <img className="img-fluid-1" src="/Images/Exploring-pana.svg" height="350" width="100%" alt="" />
                                </div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default TrackOrder
