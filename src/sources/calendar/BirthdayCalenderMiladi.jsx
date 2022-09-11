import React from 'react'
import moment from 'moment-jalaali'
import styles from '../../../styles/BirthdayCalendar.module.scss'
class BirthdayCalenderMiladi extends React.Component {
    current = 2022;

    constructor(props) {
        super(props)
        const today = moment().format('jYYYY/jMM/jDD')
        const date = today.split("/")
        this.current = parseInt(date[0])
        //        console.log('current tavalod')
        //        console.log(this.current)
        this.state = {
            stage: 1,
            year: '',
            month: ''
        };

    }

    getYears = () => {
        if (this.props.typePassenger == "ADL") {
            return new Array(this.current - 11 - this.props.numBase).fill().map((x, index) => {
                return this.props.num + index
            }).reverse()
        } else if (this.props.typePassenger == "CHD") {
            return new Array(this.current - 11 - 1379).fill().map((x, index) => {
                return 2010 + index
            }).reverse()
        }
        else if (this.props.typePassenger == "INF") {
            return new Array(this.current - 11 - 1387).fill().map((x, index) => {
                return 2020 + index
            }).reverse()
        }

    }
    //calculate days in a month, month and year are defined in previous steps!
    getDays = () => {
        let arrayOfdays
        if (parseInt(this.state.month) >= 1 && this.state.month <= 6) {
            arrayOfdays = Array.from({ length: 31 }, (_, i) => i + 1)
        } else if (parseInt(this.state.month) >= 7 && this.state.month <= 11) {
            arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1)
        } else {
            if ((this.current - 1331) % 4 == 0) {
                arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1)
            } else {
                arrayOfdays = Array.from({ length: 29 }, (_, i) => i + 1)
            }
        }
        const firstDaymonth = moment(`${this.state.year + '/' + this.state.month + '/' + 1}`, 'jYYYY/jMM/jDD').weekday()
        let revArrayOfDay = arrayOfdays.reverse()
        for (let i = 0; i <= firstDaymonth; i++) {
            revArrayOfDay.push(undefined)
        }

        return revArrayOfDay.reverse()
    }
    getMonth = () => {
        // const monthes = ["", "خرداد", "اردیبهشت", "فروردین",
        //     "شهریور", "مرداد", "تیر",
        //     "آذر", "آبان", "مهر",
        //     "اسفند", "بهمن", "دی"]
        var monthes = ['',
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


        return monthes[parseInt(this.state.month)]
    }
    render() {
        return (
            <div className={styles['birthday-calendar']}>
                {
                    this.state.stage == 1 ?
                        <div>
                            <p className="font-size-14 black-color font-bold-iransanse text-center">
                                {this.props.title}
                            </p>

                            <div className={styles['birthday-year-container']}>
                                {
                                    this.getYears()
                                        .map(x => (
                                            <div className={styles['birthday-item']} style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }} onClick={() => {
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
                            <p className="font-size-14 black-color font-bold-iransanse text-center">
                                Please enter your desired month
                            </p>
                            <div className={`font-en ${styles['birthday-month-container']}`}>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "1",
                                        stage: 3
                                    })
                                }}>
                                    January
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "2",
                                        stage: 3
                                    })
                                }}>
                                    February
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "3",
                                        stage: 3
                                    })
                                }}>
                                    March
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "4",
                                        stage: 3
                                    })
                                }}>
                                    April
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "5",
                                        stage: 3
                                    })
                                }}>
                                    May
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "6",
                                        stage: 3
                                    })
                                }}>
                                    June
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "7",
                                        stage: 3
                                    })
                                }}>
                                    July
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "8",
                                        stage: 3
                                    })
                                }}>
                                    August
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "9",
                                        stage: 3
                                    })
                                }}>
                                    September
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "10",
                                        stage: 3
                                    })
                                }}>
                                    October
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "11",
                                        stage: 3
                                    })
                                }}>
                                    November
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
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
                            <p className="font-size-14 black-color font-bold-iransanse text-center border-bottom-black">
                                {this.getMonth()}&nbsp;&nbsp;{this.state.year}
                            </p>
                            <div className={styles['birthday-day-container']}>
                                <div className="font-size-13 color-black">Saturday</div>
                                <div className="font-size-13 color-black">Sunday</div>
                                <div className="font-size-13 color-black">Monday</div>
                                <div className="font-size-13 color-black">Tuesday</div>
                                <div className="font-size-13 color-black">Wednesday</div>
                                <div className="font-size-13 color-black">Thursday</div>
                                <div className="font-size-13 color-black">Friday</div>

                                {
                                    this.getDays().map(x => (
                                        x != undefined ?
                                            <div className={styles['birthday-item']} style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }} onClick={() => {
                                                const m = moment(`${this.state.year + '/' + this.state.month + '/' + x}`, 'jYYYY/jMM/jDD')
                                                const date = m.format('jYYYY/jMM/jDD')
                                                this.props.setBirthday(date)
                                                this.props.closePopUpCalendar(false)
                                                this.setState({
                                                    stage: 1
                                                })
                                            }}>
                                                {x}
                                            </div>
                                            :
                                            <div>
                                                {x}
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

export default BirthdayCalenderMiladi


// <Calendar
//                     timePicker={false}
//                     showTodayButton={false}
//                     isGregorian={false}
//                     onChange={value => {
//                         let datePersian = this.getCustomFormat(value, false)
//                         let date = this.getCustomFormat(value, true)

//                         this.setState({ value })
//                         this.props.setBirthday(date)
//                         this.props.closePopUpCalendar(false)
//                     }}
//                     value={this.state.value}
//                 />