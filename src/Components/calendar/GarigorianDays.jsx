import React from 'react'
import moment from 'moment-jalaali'
//import styles from '../../../styles/Calendar.module.scss'
import { connect } from 'react-redux'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class GarigorianDays extends React.Component {
    currentYear = 2026

    constructor(props) {
        super(props)
        const today = moment().format('YYYY/MM/DD')
        const date = today.split("/")
        this.currentYear = parseInt(date[0]) + 5
        this.state = {
            stage: 3,
            year: parseInt(date[0]),
            month: parseInt(date[1]),
            today: today
        };

    }

    getYears = () => {
        return new Array(this.currentYear - 1931).fill().map((x, index) => {
            return 1931 + index
        }).reverse()
    }
    //calculate days in a month, month and year are defined in previous steps!
    getDays = () => {

        let arrayOfdays
        const getDaysInMonth = () => {
            const month = parseInt(this.state.month)
            switch (month) {
                case 1: return 31
                case 2: return this.state.year % 4 == 0 ? 29 : 28
                case 3: return 31
                case 4: return 30
                case 5: return 31
                case 6: return 30
                case 7: return 31
                case 8: return 31
                case 9: return 30
                case 10: return 31
                case 11: return 30
                case 12: return 31
            }
        }
        arrayOfdays = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1)

        var firstMonthWeekday = moment(`${this.state.year}/${this.state.month}/01`, 'YYYY/MM/DD').weekday()
        if(firstMonthWeekday==0){
            firstMonthWeekday=7
        }  

        let revArrayOfDay = arrayOfdays.reverse()
        for (let i = 1; i < firstMonthWeekday; i++) {
            revArrayOfDay.push(undefined)
        }

        return revArrayOfDay.reverse()
    }
    //calculate days in a month, month and year are defined in previous steps!
    getDaysNextMonth = () => {
        const year = (parseInt(this.state.month) + 1) > 12 ? parseInt(this.state.year) + 1 : parseInt(this.state.year)
        const month = (parseInt(this.state.month) + 1) > 12 ? 1 : parseInt(this.state.month) + 1

        let arrayOfdays
        const getDaysInMonth = () => {

            switch (month) {
                case 1: return 31
                case 2: return year % 4 == 0 ? 29 : 28
                case 3: return 31
                case 4: return 30
                case 5: return 31
                case 6: return 30
                case 7: return 31
                case 8: return 31
                case 9: return 30
                case 10: return 31
                case 11: return 30
                case 12: return 31
            }
        }
        arrayOfdays = Array.from({ length: getDaysInMonth() }, (_, i) => i + 1)

        var firstMonthWeekday = moment(`${year}/${month}/01`, 'YYYY/MM/DD').weekday()
        if(firstMonthWeekday==0){
           firstMonthWeekday=7
        }  


        let revArrayOfDay = arrayOfdays.reverse()
        for (let i = 1; i < firstMonthWeekday; i++) {
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
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "Septemeber",
            "Obtober",
            "November",
            "December"]
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
            return "TODAY"
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
            <div className="calendar ltr">
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
                                    January
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "02",
                                        stage: 3
                                    })
                                }}>
                                    February
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "03",
                                        stage: 3
                                    })
                                }}>
                                    March
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "04",
                                        stage: 3
                                    })
                                }}>
                                    April
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "05",
                                        stage: 3
                                    })
                                }}>
                                    May
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "06",
                                        stage: 3
                                    })
                                }}>
                                    June
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "07",
                                        stage: 3
                                    })
                                }}>
                                    July
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "08",
                                        stage: 3
                                    })
                                }}>
                                    August
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "09",
                                        stage: 3
                                    })
                                }}>
                                    September
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "10",
                                        stage: 3
                                    })
                                }}>
                                    October
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "11",
                                        stage: 3
                                    })
                                }}>
                                    November
                                </div>
                                <div className="calendar-item" onClick={() => {
                                    this.setState({
                                        month: "12",
                                        stage: 3
                                    })
                                }}>
                                    December
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
                                    <FontAwesomeIcon icon={faAngleLeft} onClick={this.decreaseMonth} />
                                </div>

                                <div className="col-lg-10 col-10 no-padding no-margin">
                                    <p className="no-margin-vertical font-size-14 black-color font-bold-iransanse text-center border-bottom-black">
                                        <span onClick={() => {
                                            const persianDate = moment().format("jYYYY/jMM/jDD")
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
                                    <FontAwesomeIcon icon={faAngleRight} onClick={this.increaseMonth} />
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
                                        <div className="font-size-13 color-black">Mon</div>
                                        <div className="font-size-13 color-black">Tue</div>
                                        <div className="font-size-13 color-black">Wed</div>
                                        <div className="font-size-13 color-black">Thu</div>
                                        <div className="font-size-13 color-black">Fri</div>
                                        <div className="font-size-13 color-black">Sat</div>
                                        <div className="font-size-13 color-black">Sun</div>
                                        {
                                            this.getDays().map(x => {
                                                const compareToToday = this.checkDateIsAfterToday(this.state.year, this.state.month, x)
                                                return (
                                                    x != undefined ?
                                                        <div className={`calendar-item ${compareToToday}`} onClick={() => {

                                                            if (compareToToday == "BEFORE") {
                                                                return
                                                            }
                                                            const todayDate = moment(`${this.state.year}/${this.state.month}/${x}`, 'YYYY/MM/DD')
                                                            const persianDate = todayDate.format("jYYYY/jMM/jDD")
                                                            const miladidate = todayDate.format('YYYY/MM/DD')
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
                                        <div className="font-size-13 color-black">Mon</div>
                                        <div className="font-size-13 color-black">Tue</div>
                                        <div className="font-size-13 color-black">Wed</div>
                                        <div className="font-size-13 color-black">Thu</div>
                                        <div className="font-size-13 color-black">Fri</div>
                                        <div className="font-size-13 color-black">Sat</div>
                                        <div className="font-size-13 color-black">Sun</div>

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
                                                    
                                                            const todayDate = moment(`${year}/${month}/${x}`, 'YYYY/MM/DD')
                                                            const persianDate = todayDate.format("jYYYY/jMM/jDD")
                                                            const miladidate = todayDate.format('YYYY/MM/DD')
                                                            this.props.setDate({
                                                                    garigorian:miladidate,
                                                                    jalali:persianDate
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


export default GarigorianDays
