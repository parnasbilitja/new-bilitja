import React, {useEffect, useState} from 'react';
import styles from '../../../../styles/newTour/components/CountDownTimer.module.scss'
import {useRouter} from "next/router";
import {Err, NotifAlert} from "./NotifAlert.component";
import moment from 'moment-jalaali';

const CountDownTimer = ({exp_time}) => {
    const router=useRouter()
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(200);


    const getTime=(expired_at)=> {

        let duration = moment.duration(moment(expired_at).diff(new Date()));
        setMinutes(duration.get('minutes'))
        setSeconds(duration.get('seconds'))

    }

    useEffect(()=>{
        getTime(exp_time)

    },[exp_time])



    useEffect(() => {

        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    Err('متاسفانه زمان رزرو شما به پایان رسید؛ به صفحه میشوید.')
                    setTimeout(()=>{
                            router.push('/')
                    },4000)
                } else {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [minutes, seconds]);

    return (
        <div className={styles['container']}>
           <NotifAlert/>
                <div className={styles['timer_countainer']}>
                    <div className={styles['title']}>
                        <p>زمان باقیمانده برای رزرو:</p>
                    </div>

                    <div className={styles['timer']}>
                        <p>{seconds < 10 ? `0${seconds}` : seconds}</p>
                        <p>:</p>
                        <p>
                            {minutes}
                        </p>
                    </div>


                </div>


        </div>
    );
};

export default CountDownTimer;
