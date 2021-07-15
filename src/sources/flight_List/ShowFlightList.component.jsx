import React from 'react'

import { faShoppingBag, faClock, faChair } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import globals from '../Global'

import styles from  '../../../styles/FlightList.module.scss'

import { moneyFormat } from '../../Utils/SimpleTasks'
// just a function component to show existing flights
const ShowFlightList = (props)=> {
        return (
            <div>
                {
                    // .filter(x=>x.kndSys==3)
                    props.flightList.map(oneFlight => (
                        <div key={oneFlight.flightId} className={styles['flight-list-one-row']}>
                            <div className={styles['one-row-price']}>
                                <div>
                                    <span className="font-size-20"> {moneyFormat(oneFlight.priceView)}</span>
                                    <span className="color-black font-size-14">تومان</span>
                                </div>
                                <div className="btn-buy-action">
                                    <i className="kilo-font icon-refrence"></i>
                                    <a href="" onClick={(e) => {
                                        e.preventDefault()
                                        props.setReserveBoxData(oneFlight)

                                    }}>خرید آنلاین</a>
                                </div>
                            </div>
                            <div className={styles['one-row-detail']}>
                                <div>
                                    <span className="color-secondary">{oneFlight.source}</span>
                                    <span>به</span>
                                    <span className="color-secondary">{oneFlight.destinate}</span>
                                </div>
                                <div>
                                    <span>شماره پرواز{oneFlight.flightNo}</span>
                                </div>
                            </div>

                            <div className={styles['one-row-provider']}>
                                <img src={globals.website + `Airlines/${oneFlight.airlineIataCode}.png?ver=1`} />
                                <p>{oneFlight.airline}</p>
                            </div>

                            <div className={styles['one-row-date']}>
                                <div>{oneFlight.flightDay}</div>
                                <div>{oneFlight.flightDate}</div>
                                <div dir='ltr'>{oneFlight.flightDateM}</div>
                            </div>
                            <div className={styles['one-row-time']}>
                                <div>
                                    <i className="kilo-font icon-clock"></i>
                                </div>
                                <span className="font-size-18">
                                    {String(oneFlight.flightDateTime).split("T")[1].slice(0, 5)}
                                </span>

                            </div>
                            <div className={styles['one-row-cap']}>
                                <div>
                                    <i className="kilo-font icon-seat"></i>
                                </div>
                                <span className="font-size-18">
                                    {oneFlight.cap + " صندلی خالی"}
                                </span>

                            </div>
                        </div>
                    ))
                }
            </div>
        )
    
}
export default ShowFlightList