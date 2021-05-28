import React from 'react'
import ManagementVilaSetPriceCalendar from '../../../Components/management_vila_set_price_calendar/ManagementVilaSetPriceCalendar.component'
import PrimaryTextInput from '../../../Components/primaty_text_input/PrimaryTextInput.component'
import PrimaryButton from '../../../Components/primary_button/PrimaryButton.component'
import moment from 'moment-jalaali'
import globals from '../../../Globals/Global'

import { connect } from 'react-redux'
import { messageBoxModify } from '../../../Redux/UI/ui.action'

class VilaDetial extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstDate: null,
            secondDate: null,
            firstDateGari: null,
            secondDateGari: null,
            days: [],
            selectedDaysArray: [],
            isLoaded: false,
            price: 0,
            isRefreshing: false
        }
    }

    getDaysDetail = async () => {
        const d1 = String(this.state.firstDate).replace("/", "").replace("/", "")
        const d2 = String(this.state.secondDate).replace("/", "").replace("/", "")
        const res = await fetch(`${globals.baseUrl}bj/datePrice/view/${this.props.match.params.id}/1/${d1}/${d2}`)
        const data = await res.json()
        console.log(data.DatePrice)
        this.setState({
            days: data.DatePrice,
        })

    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    validation = () => {
        if (this.state.price == null || this.state.price == 0) {
            return "لطفا مبلغ معتبر وارد کن"
        }
        if (this.state.firstDate == null || this.state.secondDate == null) {
            return "لطفا بازه مورد نظرتان را انتخاب کنید"
        }
        return "OK"
    }
    fillSelectedDate = () => {
        const { firstDateGari, secondDateGari } = this.state
        const arrayOfDays = []
        if (firstDateGari != null && secondDateGari != null) {
            const d1 = new Date(firstDateGari)
            const d2 = new Date(secondDateGari)
            const distance = ((d2 - d1) / 1000 / 60 / 60 / 24)

            //adding the first day with index 0 
            const m = moment(`${d1.getFullYear()}/${d1.getMonth() + 1}/${d1.getDate()}`, 'YYYY/MM/DD')
            const persianDate = m.format("jYYYY/jMM/jDD")
            arrayOfDays.push(persianDate)

            for (let i = 0; i < distance; i++) {
                d1.setDate(d1.getDate() + 1)
                const m = moment(`${d1.getFullYear()}/${d1.getMonth() + 1}/${d1.getDate()}`, 'YYYY/MM/DD')
                const persianDate = m.format("jYYYY/jMM/jDD")
                arrayOfDays.push(persianDate)
            }
            this.setState({
                selectedDaysArray: arrayOfDays
            })
        }

    }
    render() {

        return (
            <div className="container">
                <div>
                    <div className="row panel-main-content">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            {
                                this.state.isRefreshing ? null
                                    :
                                    <ManagementVilaSetPriceCalendar accommodationId={this.props.match.params.id} selectedDaysArray={this.state.selectedDaysArray} setDate={(args) => {
                                        if (this.state.firstDate == null) {
                                            this.setState({
                                                firstDate: args.jalali,
                                                firstDateGari: args.garigorian
                                            })
                                        } else if (this.state.secondDate == null) {
                                            this.setState({
                                                secondDate: args.jalali,
                                                secondDateGari: args.garigorian
                                            }, () => {
                                                this.fillSelectedDate()
                                                this.getDaysDetail()
                                            })
                                        } else {
                                            this.setState({
                                                firstDate: args.jalali,
                                                firstDateGari: args.garigorian,
                                                secondDate: null,
                                                secondDateGari: null,
                                                days: [],
                                                selectedDaysArray: []
                                            })
                                        }
                                    }} />
                            }

                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 margin-top-20px">
                            <p className="font-size-13 font-bold-iransanse">(قیمت ها به تومان می‌باشد)</p>
                            <div className="form-input-border">
                                <PrimaryTextInput placeholder={"قیمت مورد نظر خود را وارد کنید"} name="price" onChange={this.handleChange} />
                            </div>
                            <div className="border-pill">
                                <p className="font-size-18 font-bold-iransanse">روزهای انتخاب شده</p>
                                {

                                    this.state.selectedDaysArray.map(day => {
                                        let price
                                        try {
                                            price = this.state.days.filter(x => x.DateM == day)[0].Price
                                        } catch{
                                            price = null
                                        }
                                        return (
                                            <div className="row">
                                                <div className="col-lg-3 col-md-3 col-sm-4 col-6 font-size-13 font-bold-iransanse">{day}</div>
                                                <div className="col-lg-9 col-md-9 col-sm-8 col-6 font-size-13 font-bold-iransanse">{price != null ? price : "ثبت نشده است"}</div>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                            <div className="row margin-top-10px">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-4 padding-3px">
                                    <PrimaryButton className="font-size-13" value={"ثبت قیمت"} onClick={() => {
                                        const message = this.validation()
                                        if (message != "OK") {
                                            this.props.messageBoxModify({
                                                state: true,
                                                message: message
                                            })
                                            return
                                        }
                                        this.setState({
                                            isRefreshing:true
                                        })
                                        const requestObject = this.state.selectedDaysArray.map(day => ({
                                            "EghamatId": this.props.match.params.id,
                                            "RoomRow": 1,
                                            "DateM": day.replace("/", "").replace("/", ""),
                                            "Price": this.state.price,
                                            "Cap": 1
                                        }))
                                        fetch(`${globals.baseUrl}bj/datePrice/save`, {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify(requestObject)
                                        }).then(res => res.json())
                                            .then(data => {
                                                if (data.status == "OK") {
                                                    this.props.messageBoxModify({
                                                        state: true,
                                                        message: "عملیات موفقیت آمیز بود"
                                                    })
                                                } else {
                                                    this.props.messageBoxModify({
                                                        state: true,
                                                        message: data.message
                                                    })
                                                }
                                                this.setState({
                                                    isRefreshing:false,
                                                    selectedDaysArray:[]
                                                })
                                            })
                                    }} />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-8 padding-3px">
                                    <a className="btn-outlined-cancle" onClick={() => {
                                        this.setState({
                                            firstDate: null,
                                            secondDate: null,
                                            firstDateGari: null,
                                            secondDateGari: null,
                                            days: [],
                                            selectedDaysArray: []
                                        })
                                    }}> حذف ایتم های انتخاب شده </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchesToProps = (dispatch) => ({
    messageBoxModify: async value => dispatch(messageBoxModify(value))
})
export default  connect(null, mapDispatchesToProps)(VilaDetial)