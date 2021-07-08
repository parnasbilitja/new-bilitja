import React from 'react'
import moment from 'moment-jalaali'
import styles from '../../../styles/BirthdayCalendar.module.scss'
class BirthdayCalendar extends React.Component {
    current = 1399

    constructor(props) {
        super(props)
        const today = moment().format('jYYYY/jMM/jDD')
        const date = today.split("/")
        this.current = parseInt(date[0]) 
        console.log('current tavalod')
        console.log(this.current)
        this.state = {
            stage: 1,
            year: '',
            month: ''
        };

    }

    getYears = () => {
        if (this.props.typePassenger == "ADL") {
            return new Array(this.current - 11 - 1300).fill().map((x, index) => {
                return 1300 + index
            }).reverse()
        } else if (this.props.typePassenger == "CHD") {
            return new Array(11).fill().map((x, index) => {
                return this.current - 12 + index
            }).reverse()
        }
        else if (this.props.typePassenger == "INF") {
            return new Array(3).fill().map((x, index) => {
                return this.current - 2 + index
            }).reverse()
        }

    }
    //calculate days in a month, month and year are defined in previous steps!
    getDays = () => {
        let arrayOfdays
        if (parseInt(this.state.month) >= 1 && this.state.month <= 6) {
            arrayOfdays=Array.from({length: 31}, (_, i) => i + 1)
        } else if (parseInt(this.state.month) >= 7 && this.state.month <= 11) {
            arrayOfdays=Array.from({length: 30}, (_, i) => i + 1)
        } else {
            if ((this.current - 1331) % 4 == 0) {
                arrayOfdays=Array.from({length: 30}, (_, i) => i + 1)
            } else {
                arrayOfdays=Array.from({length: 29}, (_, i) => i + 1)
            }
        }
        const firstDaymonth = moment(`${this.state.year+'/'+this.state.month+'/'+1}`, 'jYYYY/jMM/jDD').weekday()
        let revArrayOfDay = arrayOfdays.reverse()
        for(let i =0; i <= firstDaymonth;i++){
            revArrayOfDay.push(undefined)
        }

        return revArrayOfDay.reverse()
    }
    getMonth = () => {
        const monthes = ["", "خرداد", "اردیبهشت", "فروردین",
            "شهریور", "مرداد", "تیر",
            "آذر", "آبان", "مهر",
            "اسفند", "بهمن", "دی"]

        return monthes[this.state.month]
    }
    render() {
        return (
            <div className={styles['birthday-calendar']}>
                {
                    this.state.stage == 1 ?
                        <div>
                            <p className="font-size-14 black-color font-bold-iransanse text-center">
                                لطفا سال تولد خود را وارد کنید
                            </p>

                            <div className={styles['birthday-year-container']}>
                                {
                                    this.getYears()
                                        .map(x => (
                                            <div className={styles['birthday-item']} onClick={() => {
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
                                لطفا ماه تولد خود را وارد کنید
                            </p>
                            <div className={styles['birthday-month-container']}>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "1",
                                        stage: 3
                                    })
                                }}>
                                    فروردین
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "2",
                                        stage: 3
                                    })
                                }}>
                                    اردیبهشت
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "3",
                                        stage: 3
                                    })
                                }}>
                                    خرداد
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "4",
                                        stage: 3
                                    })
                                }}>
                                    تیر
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "5",
                                        stage: 3
                                    })
                                }}>
                                    مرداد
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "6",
                                        stage: 3
                                    })
                                }}>
                                    شهریور
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "7",
                                        stage: 3
                                    })
                                }}>
                                    مهر
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "8",
                                        stage: 3
                                    })
                                }}>
                                    آبان
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "9",
                                        stage: 3
                                    })
                                }}>
                                    آذر
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "10",
                                        stage: 3
                                    })
                                }}>
                                    دی
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    this.setState({
                                        month: "11",
                                        stage: 3
                                    })
                                }}>
                                    بهمن
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
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
                            <p className="font-size-14 black-color font-bold-iransanse text-center border-bottom-black">
                                {this.getMonth()}&nbsp;&nbsp;{this.state.year}
                            </p>
                            <div className={styles['birthday-day-container']}>
                                <div className="font-size-13 color-black">شنبه</div>
                                <div className="font-size-13 color-black">1شنبه</div>
                                <div className="font-size-13 color-black">2شنبه</div>
                                <div className="font-size-13 color-black">3شنبه</div>
                                <div className="font-size-13 color-black">4شنبه</div>
                                <div className="font-size-13 color-black">5شنبه</div>
                                <div className="font-size-13 color-black">جمعه</div>

                                {
                                    this.getDays().map(x => (
                                        x!=undefined?
                                        <div className={styles['birthday-item']} onClick={() => {
                                            const m = moment(`${this.state.year+'/'+this.state.month+'/'+x}`, 'jYYYY/jMM/jDD')
                                            const date = m.format('YYYY/MM/DD')
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

export default BirthdayCalendar


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