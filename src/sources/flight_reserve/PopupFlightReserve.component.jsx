import React from 'react'

import styles from  '../../../styles/PopupFlightReserve.module.scss'

import { faMale, faFemale, faBaby, faChild } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import globals from '../Global'

import PrimarySelectInput from '../component/PrimarySelectInput.component'
import PrimaryButton from '../component/PrimaryButton.component'

import { connect } from 'react-redux'
import { addReservationProperties } from '../../Redux/Reserve/reserve.action'
import { messageBoxModify } from '../../Redux/UI/ui.action'
import { withRouter } from 'next/router'


class PopupFlightReserve extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numADL: 1,
            numCHD: 0,
            numINF: 0
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: parseInt(value)
        })
    }
    
    submitReserve = () => {
        const { flightId, classId, kndSys, iataCodSource, iataCodDestinate, airlineIataCode, className, flightDate,
            flightTime, flightNo, cap, pathKind, serviceType, priceView } = this.props
            
            console.log(this.props)
            const reserveObject = {
            numADL: this.state.numADL,
            numCHD: this.state.numCHD,
            numINF: this.state.numINF,
            flightId: flightId,
            classId: classId,
            kndSys: kndSys,
            iataCodSource: iataCodSource,
            iataCodDestinate: iataCodDestinate,
            airlineCode: airlineIataCode,
            className: className,
            flightDate: flightDate,
            flightTime: flightTime,
            flightNo: flightNo,
            cap: cap,
            pathKind: pathKind,
            serviceType: serviceType,
            priceView: priceView
        }

        fetch(`${globals.baseUrl}flightsReserve/reserve`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserveObject),
            method: "POST"
        }).then(res => res.json())
            .then(data => {
                if (data.message == "OK" ) {
                    this.props.addReservationProperties({
                        reqNo: data.reqNo,
                        reqPnr: data.reqPnr,
                        priceMessage :data.priceMessage
                    }).then(() => {
                        console.log(this.props.router);
                        this.props.router.push(`${this.props.router.asPath}/info/${data.reqNo}/${data.reqPnr}` )
                        
                    })
                } else {

                    // //  پیام تغییر قیمت
                    // //if(data.priceMessage != null){
                    //         if(data.priceMessage != ""){
                    //             this.props.messageBoxModify({
                    //                 state: true,
                    //                 message: `${data.priceMessage}`
                    //             }) 
                    //         }
                    // //}
                    this.props.messageBoxModify({
                        state: true,
                        message: `${data.message}`
                    })
                }
            })
    }
    validation = (numADL, numCHD, numINF, cap) => {
        if (numADL <= 0) {
            return "باید حداقل یک بزرگسال در بین مسافرین باشد"

        }
        if (numADL + numCHD > cap) {
            return "تعداد افراد بیش از ظرفیت پرواز است"
        }
        if (numADL < numINF) {
            return "تعداد نوزاد نمیتواند بیشتر از تعداد بزرگسال باشد"
        }
        return "OK"
    }
    render() {
        const numberOfPassengers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const numberOfPassengers_ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        const { source, destinate, flightDay, flightDate, flightDateTime, cap, airlineIataCode, airline } = this.props
        return (
            <div className={styles['pop-up-flight-reserve-box']}>
                <p className="font-bold-iransanse">
                    خرید بلیط هواپیما  &nbsp;
                    <span className="color-secondary">{source}</span>
                    &nbsp;به &nbsp;
                    <span className="color-secondary">{destinate}</span>
                </p>
                <p className="font-size-15 font-bold-iransanse">
                    {flightDay} &nbsp;{flightDate}
                </p>

                <div className={styles['pop-up-flight-detail-reserve-box']}>
                    <div>
                        <div>
                            <i className="kilo-font icon-clock"></i>
                        </div>
                        <span className="font-size-12 xs-font-size-13">
                            {String(flightDateTime).split("T")[1].slice(0, 5)}
                        </span>
                    </div>

                    <div>
                        <div>
                            <i className="kilo-font icon-seat"></i>
                        </div>
                        <span className="font-size-12 xs-font-size-13">
                            {cap + " صندلی خالی"}
                        </span>
                    </div>

                    <div>
                        <img src={globals.website + `Airlines/${airlineIataCode}.png?ver=1`} />
                        <p className="font-size-15 xs-font-size-14">{airline}</p>
                    </div>
                </div>

                <div className={styles['pop-up-flight-passengers-reserve-box']}>
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-5 col-6">
                            <FontAwesomeIcon icon={faMale} />
                            <FontAwesomeIcon icon={faFemale} />
                            <span className="font-size-14 font-bold-iransanse"> تعداد بزرگسال</span>
                            <p className="font-size-11">(12 سال به بالا)</p>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                            <PrimarySelectInput name="numADL" onChange={this.handleChange}>
                                {
                                    numberOfPassengers_.map(x => (
                                        this.state.numADL == x
                                            ?
                                            <option selected>{x}</option>
                                            :
                                            <option>{x}</option>

                                    ))
                                }
                            </PrimarySelectInput>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-5 col-6">
                            <FontAwesomeIcon icon={faChild} />
                            <span className="font-size-14 font-bold-iransanse">تعداد کودک</span>
                            <p className="font-size-11">(2 تا 12 سال)</p>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                            <PrimarySelectInput name="numCHD" onChange={this.handleChange}>
                                {
                                    numberOfPassengers.map(x => (
                                        this.state.numCHD == x
                                            ?
                                            <option selected>{x}</option>
                                            :
                                            <option>{x}</option>

                                    ))
                                }
                            </PrimarySelectInput>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-5 col-6">
                            <FontAwesomeIcon icon={faBaby} />
                            <span className="font-size-14 font-bold-iransanse">تعداد نوزاد</span>
                            <p className="font-size-11">(زیر 2 سال)</p>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-7 col-6">
                            <PrimarySelectInput name="numINF" onChange={this.handleChange}>
                                {
                                    numberOfPassengers.map(x => (
                                        this.state.numINF == x
                                            ?
                                            <option selected>{x}</option>
                                            :
                                            <option>{x}</option>

                                    ))
                                }
                            </PrimarySelectInput>
                        </div>
                    </div>
                    <div className={` form-input-border  ${styles['form-input-border-private']} without-focus`}>
                        <PrimaryButton defaultValue={"مرحله بعد"} onClick={() => {
                            const message = this.validation(this.state.numADL, this.state.numCHD, this.state.numINF, this.props.cap)
                            if (message == "OK") {
                                this.submitReserve()
                            } else {
                                this.props.messageBoxModify({
                                    state: true,
                                    message: message
                                })
                            }
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchesToProps = (dispatch) => ({
    addReservationProperties: async value => dispatch(addReservationProperties(value)),
    messageBoxModify: value => dispatch(messageBoxModify(value))
})
export default withRouter(connect(null, mapDispatchesToProps)(PopupFlightReserve))