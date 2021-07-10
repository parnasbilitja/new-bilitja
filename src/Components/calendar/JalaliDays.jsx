import React from 'react'
import moment from 'moment-jalaali'
//import '../../../styles/Calendar.module.scss'
import { connect } from 'react-redux'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import globals from '../../Globals/Global'
class JalaliDays extends React.Component {
    currentYear = 1405

    constructor(props) {
        super(props)
        const today = moment().format('jYYYY/jMM/jDD')
        console.log('today=')
        console.log(today)

        const date = today.split("/")
        this.currentYear = parseInt(date[0]) + 5
        this.state = {
            stage: 3,
            year: parseInt(date[0]),
            month: parseInt(date[1]),
            today: today
        };

    }
componentDidMount(){
      //  this.getDays()
      const today = moment().format('jYYYY/jMM/jDD')
   
}
    getYears = () => {
        return new Array(this.currentYear - 1300).fill().map((x, index) => {
            return 1300 + index
        }).reverse()
    }
    //calculate days in a month, month and year are defined in previous steps!
    getDays = () => {

        let arrayOfdays
        if (parseInt(this.state.month) >= 1 && this.state.month <= 6) {
            arrayOfdays = Array.from({ length: 31 }, (_, i) => i + 1)
        } else if (parseInt(this.state.month) >= 7 && this.state.month <= 11) {
            arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1)
        } else {
            if ((this.state.year - 1331) % 4 == 0) {
                arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1)
            } else {
                arrayOfdays = Array.from({ length: 29 }, (_, i) => i + 1)
            }
        }
        const firstdayofweek = moment(`${this.state.year}/${this.state.month}/01`, 'jYYYY/jMM/jDD').weekday()
        let revArrayOfDay = arrayOfdays.reverse()
        for (let i = 0; i <= firstdayofweek; i++) {
            revArrayOfDay.push(undefined)
        }

        return revArrayOfDay.reverse()
    }

    //calculate days in a month, month and year are defined in previous steps!
    getDaysNextMonth = () => {
        const year = (parseInt(this.state.month) + 1) > 12 ? parseInt(this.state.year) + 1 : parseInt(this.state.year)
        const month = (parseInt(this.state.month) + 1) > 12 ? 1 : parseInt(this.state.month) + 1

        let arrayOfdays

        if (month >= 1 && month <= 6) {
            arrayOfdays = Array.from({ length: 31 }, (_, i) => i + 1)
        } else if (month >= 7 && month <= 11) {
            arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1)
        } else {
            if ((year - 1331) % 4 == 0) {
                arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1)
            } else {
                arrayOfdays = Array.from({ length: 29 }, (_, i) => i + 1)
            }
        }

        const firstdayofweek = moment(`${year}/${month}/01`, 'jYYYY/jMM/jDD').weekday()
        let revArrayOfDay = arrayOfdays.reverse()
        for (let i = 0; i <= firstdayofweek; i++) {
            revArrayOfDay.push(undefined)
        }
        return revArrayOfDay.reverse()

    }
    //title on top of each month
    getDateTitle = () => {
        const firstYear = parseInt(this.state.year)
        const firstMonth = parseInt(this.state.month)

        let secondMonth = firstMonth + 1
        let secondYear = firstYear


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
        if (secondMonth > 12) {
            secondMonth = 1
            secondYear = firstYear + 1
        }
        const dates = [
            [monthes[firstMonth], firstYear],
            [monthes[secondMonth], secondYear]
        ]

        return dates
    }
    //check date is after today or not,the proccess occures in current month
    checkDateIsAfterToday = (year, month, day) => {
        console.log('checkdateAfterToday=');
        console.log(day);
        let date = year + ''
            + ('0' + month).slice(-2) + ''
            + ('0' + day).slice(-2);
        const today = parseInt(this.state.today.replace("/", "").replace("/", ""))
        date = parseInt(date)
        if (date > today) {
            return "AFTER"
        } else if (date < today) {
            return "BEFORE"
        } else {
            console.log('TODAYTODAY=');
            console.log(day)
            return "TODAY"
            
            
        }
    }
    //check date is after today or not,the proccess occures in next month
    checkDateIsAfterTodayNextMonth = (day) => {
        const year = (parseInt(this.state.month) + 1) > 12 ? parseInt(this.state.year) + 1 : parseInt(this.state.year)
        const month = (parseInt(this.state.month) + 1) > 12 ? 1 : parseInt(this.state.month) + 1

        let date = year + ''
            + ('0' + month).slice(-2) + ''
            + ('0' + day).slice(-2);
        const today = parseInt(this.state.today.replace("/", "").replace("/", ""))
        date = parseInt(date)
        if (date > today) {
            return "AFTER"
        } else if (date < today) {
            return "BEFORE"
        } else {
            return "TODAY"  // this is never happen
        }
    }

    decreaseMonth = () => {
        let month = parseInt(this.state.month) - 1
        if (month < 1) {
            this.setState({
                month: "12",
                year: parseInt(this.state.year) - 1
            })
        } else {
            this.setState({
                month: month
            })
        }
    }
    increaseMonth = () => {
        let month = parseInt(this.state.month) + 1
        if (month > 12) {
            this.setState({
                month: "01",
                year: parseInt(this.state.year) + 1
            })
        } else {
            this.setState({
                month: month
            })
        }
    }

    render() {
        let currentAndNextDate = this.getDateTitle()

        return (
            
            <div className="calendar">
                {
                    this.state.stage == 1 ?
                        <div>

                            <div className="calendar-year-container">
                                {
                                    this.getYears()
                                        .map(x => (
                                            <div className="calendar-item" onClick={() => {
                                                this.setState({ year: x, stage: 2 })
                                            }}>
                                                {x}
                                            </div>
                                        ))
                                }
                            </div>

                        </div>
                        :
                        null
                }
                {
                    this.state.stage == 2 ?
                        <div>

                            <div className="calendar-month-container">
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "01",
                                        stage: 3
                                    })
                                }}>
                                    فروردین
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "02",
                                        stage: 3
                                    })
                                }}>
                                    اردیبهشت
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "03",
                                        stage: 3
                                    })
                                }}>
                                    خرداد
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "04",
                                        stage: 3
                                    })
                                }}>
                                    تیر
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "05",
                                        stage: 3
                                    })
                                }}>
                                    مرداد
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "06",
                                        stage: 3
                                    })
                                }}>
                                    شهریور
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "07",
                                        stage: 3
                                    })
                                }}>
                                    مهر
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "08",
                                        stage: 3
                                    })
                                }}>
                                    آبان
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "09",
                                        stage: 3
                                    })
                                }}>
                                    آذر
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "10",
                                        stage: 3
                                    })
                                }}>
                                    دی
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "11",
                                        stage: 3
                                    })
                                }}>
                                    بهمن
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "12",
                                        stage: 3
                                    })
                                }}>
                                    اسفند
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
                {
                    this.state.stage == 3 ?
                        <div>
                            <div className="row" style={{ margin: "0" }}>
                                <div className="col-lg-1 col-1 no-padding no-margin">
                                    <FontAwesomeIcon icon={faAngleRight} onClick={this.decreaseMonth} />
                                </div>

                                <div className="col-lg-10 col-10 no-padding no-margin">
                                    <p className="no-margin-vertical font-size-14 black-color font-bold-iransanse text-center border-bottom-black">
                                        <span onClick={() => {
                                            const persianDate = moment().format("jYYYY/jMM/jDD")
                                            console.log('test date jalali');
                                            const miladidate = moment().format('YYYY/MM/DD')
                                            this.props.setDate({
                                                garigorian: miladidate,
                                                jalali: persianDate
                                            })
                                            this.props.closePopUpCalendar(false)
                                        }}>برو به امروز</span>
                                    </p>
                                </div>

                                <div className="col-lg-1 col-1 no-padding no-margin">
                                    <FontAwesomeIcon icon={faAngleLeft} onClick={this.increaseMonth} />
                                </div>
                            </div>

                            <div className="two-month-container">
                                <div>
                                    <p className="no-margin padding-5px font-size-14 black-color font-bold-iransanse text-center" onClick={(e) => {
                                        this.setState({
                                            stage: 1
                                        })
                                    }}>
                                        {`${currentAndNextDate[0][0]} ${currentAndNextDate[0][1]}`}
                                    </p>
                                    <div className="calendar-day-container">
                                        <div className="font-size-13 color-black">شنبه</div>
                                        <div className="font-size-13 color-black">1شنبه</div>
                                        <div className="font-size-13 color-black">2شنبه</div>
                                        <div className="font-size-13 color-black">3شنبه</div>
                                        <div className="font-size-13 color-black">4شنبه</div>
                                        <div className="font-size-13 color-black">5شنبه</div>
                                        <div className="font-size-13 color-black">جمعه</div>

                                        {
                                            this.getDays().map(x => {
                                                const compareToToday = this.checkDateIsAfterToday(this.state.year, this.state.month, x)
                                                return (
                                                    x != undefined ?
                                                        <div className={`calendar-item ${compareToToday}`} onClick={() => {

                                                            if (compareToToday == "BEFORE") {
                                                                return
                                                            }
                                                            const m = moment(`${this.state.year}/${this.state.month}/${x}`, 'jYYYY/jMM/jDD')
                                                            const persianDate = m.format("jYYYY/jMM/jDD")
                                                            const miladidate = m.format('YYYY/MM/DD')
                                                            this.props.setDate({
                                                                garigorian: miladidate,
                                                                jalali: persianDate
                                                            })
                                                            this.props.closePopUpCalendar(false)

                                                        }}>
                                                            {x}
                                                        </div>
                                                        :
                                                        <div>
                                                            {x}
                                                        </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div>
                                    <p className="no-margin padding-5px font-size-14 black-color font-bold-iransanse text-center" onClick={(e) => {
                                        this.setState({
                                            stage: 1
                                        })
                                    }}>
                                        {`${currentAndNextDate[1][0]} ${currentAndNextDate[1][1]}`}
                                    </p>
                                    <div className="calendar-day-container">
                                        <div className="font-size-13 color-black">شنبه</div>
                                        <div className="font-size-13 color-black">1شنبه</div>
                                        <div className="font-size-13 color-black">2شنبه</div>
                                        <div className="font-size-13 color-black">3شنبه</div>
                                        <div className="font-size-13 color-black">4شنبه</div>
                                        <div className="font-size-13 color-black">5شنبه</div>
                                        <div className="font-size-13 color-black">جمعه</div>

                                        {
                                            this.getDaysNextMonth().map(x => {
                                                const compareToToday = this.checkDateIsAfterTodayNextMonth(x)

                                                return (
                                                    x != undefined ?
                                                        <div className={`calendar-item ${compareToToday}`} onClick={() => {
                                                            if (compareToToday == "BEFORE") {
                                                                return
                                                            }
                                                            const year = (parseInt(this.state.month) + 1) > 12 ? parseInt(this.state.year) + 1 : parseInt(this.state.year)
                                                            const month = (parseInt(this.state.month) + 1) > 12 ? 1 : parseInt(this.state.month) + 1

                                                            const m = moment(`${year}/${month}/${x}`, 'jYYYY/jMM/jDD')
                                                            const persianDate = m.format("jYYYY/jMM/jDD")
                                                            const date = m.format('YYYY/MM/DD')
                                                            this.props.setDate({
                                                                garigorian: date,
                                                                jalali: persianDate
                                                            })
                                                            
                                                            this.props.closePopUpCalendar(false)

                                                        }}>
                                                            {x}
                                                        </div>
                                                        :
                                                        <div>
                                                            {x}
                                                        </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}


const mapDispatchesToProps = (dispatch) => ({
    addCredentials: value => dispatch(addCredentials(value))
})
export default connect(null, mapDispatchesToProps)(JalaliDays)




