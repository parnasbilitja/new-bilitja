import React, { useState } from 'react'
import moment from 'moment-jalaali'
import styles from '../../../styles/BirthdayCalendar.module.scss'
const BirthdayCalendar = (props) => {
    let current = 1402
    const today = moment().format('jYYYY/jMM/jDD')
    const date = today.split("/")
    current = parseInt(date[0]) 
    const [state,setState] = useState({
        stage: 1,
        year: '',
        month: '',
    });

    const getYears = () => {
        if (props.typePassenger == "ADL") {
            return new Array(current - 11 - props.type=="BD"?51:props.type=="EXT"?10:85).fill().map((x, index) => {
                // console.log(props.type=="BD"?1390:80  + index);
                return (props.type=="BD"?1300:props.type=="EXT"?1405:1400)  + index
            }).reverse()
        } else if (props.typePassenger == "CHD") {
            return new Array(11).fill().map((x, index) => {
                return current - 12 + index
            }).reverse()
        }
        else if (props.typePassenger == "INF") {
            return new Array(3).fill().map((x, index) => {
                return current - 2 + index
            }).reverse()
        }

    }
    //calculate days in a month, month and year are defined in previous steps!
    const getDays = () => {
        let arrayOfdays
        if (parseInt(state.month) >= 1 && state.month <= 6) {
            arrayOfdays=Array.from({length: 31}, (_, i) => i + 1)
        } else if (parseInt(state.month) >= 7 && state.month <= 11) {
            arrayOfdays=Array.from({length: 30}, (_, i) => i + 1)
        } else {
            if ((current - 1331) % 4 == 0) {
                arrayOfdays=Array.from({length: 30}, (_, i) => i + 1)
            } else {
                arrayOfdays=Array.from({length: 29}, (_, i) => i + 1)
            }
        }
        const firstDaymonth = moment(`${state.year+'/'+state.month+'/'+1}`, 'jYYYY/jMM/jDD').weekday()
        let revArrayOfDay = arrayOfdays.reverse()
        for(let i =0; i <= firstDaymonth;i++){
            revArrayOfDay.push(undefined)
        }

        return revArrayOfDay.reverse()
    }
    const getMonth = () => {
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
        "اسفند",
            ]

        return monthes[parseInt( state.month)]
    }
        return (
            <div className={styles['birthday-calendar']}>
                {
                    state.stage == 1 ?
                        <div>
                            <p className="font-size-14 black-color font-bold-iransanse text-center">
                                {props.placeholder}
                            </p>

                            <div className={styles['birthday-year-container']}>
                                {
                                    getYears()
                                        .map(x => (
                                            <div className={styles['birthday-item']} onClick={() => {
                                                setState({...state, year: x, stage: 2 })
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
                    state.stage == 2 ?
                        <div>
                            <p className="font-size-14 black-color font-bold-iransanse text-center">
                                لطفا ماه تولد خود را وارد کنید
                            </p>
                            <div className={styles['birthday-month-container']}>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "1",
                                        stage: 3
                                    })
                                }}>
                                    فروردین
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "2",
                                        stage: 3
                                    })
                                }}>
                                    اردیبهشت
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "3",
                                        stage: 3
                                    })
                                }}>
                                    خرداد
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "4",
                                        stage: 3
                                    })
                                }}>
                                    تیر
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "5",
                                        stage: 3
                                    })
                                }}>
                                    مرداد
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "6",
                                        stage: 3
                                    })
                                }}>
                                    شهریور
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "7",
                                        stage: 3
                                    })
                                }}>
                                    مهر
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "8",
                                        stage: 3
                                    })
                                }}>
                                    آبان
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "9",
                                        stage: 3
                                    })
                                }}>
                                    آذر
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "10",
                                        stage: 3
                                    })
                                }}>
                                    دی
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
                                        month: "11",
                                        stage: 3
                                    })
                                }}>
                                    بهمن
                                </div>
                                <div className={styles['birthday-item']} onClick={() => {
                                    setState({...state,
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
                    state.stage == 3 ?
                        <div>
                            <p className="font-size-14 black-color font-bold-iransanse text-center border-bottom-black">
                                {getMonth()}&nbsp;&nbsp;{state.year}
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
                                    getDays().map(x => (
                                        x!=undefined?
                                        <div className={styles['birthday-item']} onClick={() => {
                                            const m = moment(`${state.year+'/'+state.month+'/'+x}`, 'jYYYY/jMM/jDD')
                                            const date = m.format('jYYYY/jMM/jDD')
                                            props.setBirthday(date)
                                            props.closePopUpCalendar(false)
                                            setState({...state,
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

export default BirthdayCalendar
