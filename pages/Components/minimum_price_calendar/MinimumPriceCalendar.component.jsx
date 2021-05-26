import React from 'react'
import '../../../styles/MinimumPriceCalendar.module.scss'
import globals from '../../Globals/Global'
import moment from 'jalali-moment'
import { connect } from 'react-redux'
import { selectCredentials } from '../../Redux/Search/search.reselect'
import { addCredentials } from '../../Redux/Search/search.action'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class MinimumPriceCalendar extends React.Component {
    constructor(props) {
        super(props)
        let year,month
        if(this.props.credentials.flightDatePersian == ''){
            const currentMoment = moment().format('jYYYY,jMM,jDD')
            year = currentMoment.split(",")[0]
            month = currentMoment.split(",")[1]
        }else{
           const currentMoment =  this.props.credentials.flightDatePersian
           year = currentMoment.split("/")[0]
           month = currentMoment.split("/")[1]
        }
        
        this.state = {
            firstMonth: null,
            year: year,
            month: month,
        }
    }

    componentDidMount() {
        this.getData(true)
    }
    //check if there is any available day left for the current month
    checkLastDays = (days = []) => {
        let flag= false
        days.forEach(day => {
            if (day.minPrice != null && day.minPrice > 0) {
                flag= true
            }
        })
        return flag
    }
    // get data of a month with prices. source and destination come from redux
    getData = (idInitReq = false) => {
        const requestParams1 = {
            airport1: this.props.credentials.source,
            airport2: this.props.credentials.dest,
            year: this.state.year,
            month: this.state.month
        }
        fetch(`${globals.baseUrl}flights/getFlightCalendar`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestParams1),
            method: "POST"
        })
            .then(res => res.json())
            .then(data => {
                // check if this is from componentdidmount or not
                if (idInitReq) {
                    if (!this.checkLastDays(data.flightCalendarModel)) {
                        const year = (parseInt(this.state.month) + 1) > 12 ? parseInt(this.state.year) + 1 : parseInt(this.state.year)
                        const month = (parseInt(this.state.month) + 1) > 12 ? 1 : parseInt(this.state.month) + 1

                        const requestParams2 = {
                            airport1: this.props.credentials.source,
                            airport2: this.props.credentials.dest,
                            year: year,
                            month: month
                        }
                        fetch(`${globals.baseUrl}flights/getFlightCalendar`, {
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(requestParams2),
                            method: "POST"
                        })
                            .then(res => res.json())
                            .then(data => {
                                this.setState({
                                    firstMonth: data.flightCalendarModel,
                                    year:year,
                                    month:month
                                })
                            })
                    } else {
                        this.setState({
                            firstMonth: data.flightCalendarModel
                        })
                    }
                } else {
                    this.setState({
                        firstMonth: data.flightCalendarModel
                    })
                }
            })
    }

    getTitle = () => {
        const monthes = ["",
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند"]
        return `${monthes[this.state.month]} ${this.state.year}`
    }

    decreaseMonth = () => {
        let month = parseInt(this.state.month) - 1
        if (month < 1) {
            this.setState({
                month: 12,
                year: parseInt(this.state.year) - 1
            }, this.getData)
        } else {
            this.setState({
                month: month
            }, this.getData)
        }
    }
    increaseMonth = () => {
        let month = parseInt(this.state.month) + 1
        if (month > 12) {
            this.setState({
                month: 1,
                year: parseInt(this.state.year) + 1
            }, this.getData)
        } else {
            this.setState({
                month: month
            }, this.getData)
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-1 col-0"></div>
                {
                    this.state.firstMonth ?
                        <div className="col-lg-6 col-md-6 col-md-10 col-12">
                            <div className="row">
                                <div className="col-lg-1 col-1">
                                    <FontAwesomeIcon icon={faAngleRight} onClick={this.decreaseMonth} />
                                </div>

                                <div className="col-lg-10 col-10">
                                    <p className="no-margin-vertical font-size-14 black-color font-bold-iransanse text-center border-bottom-black">
                                        {this.getTitle()}
                                    </p>
                                </div>

                                <div className="col-lg-1 col-1">
                                    <FontAwesomeIcon icon={faAngleLeft} onClick={this.increaseMonth} />
                                </div>
                            </div>
                            <div className="min-price-calendar-container">
                                <div className="font-size-13 color-black">شنبه</div>
                                <div className="font-size-13 color-black">1شنبه</div>
                                <div className="font-size-13 color-black">2شنبه</div>
                                <div className="font-size-13 color-black">3شنبه</div>
                                <div className="font-size-13 color-black">4شنبه</div>
                                <div className="font-size-13 color-black">5شنبه</div>
                                <div className="font-size-13 color-black">جمعه</div>
                                {
                                    this.state.firstMonth.map(day => (
                                        <div className={`${day.offset == "-" || day.flag==false ? "disable" : "available"}`}
                                            onClick={() => {
                                                if (day.minPrice == null || day.minPrice <= 0) {
                                                    return
                                                }
                                                const m = moment(`${this.state.year}/${this.state.month}/${day.day}`, 'jYYYY/jM/jD')
                                                const persianDate = m.format("jYYYY/jM/jD")
                                                const date = m.format('YYYY/M/D')
                                                this.props.addCredentials({
                                                    stDate: date,
                                                    flightDatePersian: persianDate,
                                                }).then(() => {
                                                    this.props.refreshAction()
                                                })
                                            }}
                                        >
                                            <div>{day.day}</div>
                                            <div className={`${day.minPrice != null && day.minPrice > 0 ? "color-secondary" : null} font-size-13`}>{Math.floor(day.minPrice / 10000)}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        :
                        null
                }

            </div>
        )
    }
}
const mapStatesToProps = (state) => ({
    credentials: selectCredentials(state)
})
const mapDispatchesToProps = (dispatch) => ({
    addCredentials: async value => dispatch(addCredentials(value))
})

export default connect(mapStatesToProps, mapDispatchesToProps)(MinimumPriceCalendar)