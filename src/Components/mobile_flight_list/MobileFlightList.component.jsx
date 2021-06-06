import React from 'react'
import styles from '../../../styles/MobileFlightList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faClock, faChair } from '@fortawesome/free-solid-svg-icons'
import globals from '../../Globals/Global'
import { moneyFormat } from '../../Utils/SimpleTasks'
class MobileFlightList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container-flight-list-mobile">
                <div>
                    <div className={` ${styles['mobile-flight-list-header']} 'font-bold-iransanse' `}>
                        <p>خريد بليط هواپيما <span className="color-secondary">{this.props.flightList[0].source}</span> به <span className="color-secondary">{this.props.flightList[0].destinate}</span></p>
                        <p>{this.props.flightList[0].flightDay} &nbsp; {this.props.flightList[0].flightDate}</p>
                    </div>
                    {
                        this.props.flightList.map(oneFlight => (
                            <div key={oneFlight.flightId} className={styles['mobile-flight-list-one-row']}>
                                <div className={styles['mobile-one-row-price']}>
                                    <div>
                                        <span className="font-size-16 color-secondary font-bold-iransanse">{moneyFormat(oneFlight.priceView)}</span>
                                        <span className="color-black font-size-12">تومان</span>
                                    </div>
                                    <div className="btn-buy-action">
                                        <i className="kilo-font icon-refrence"></i>
                                        <a href="" onClick={(e) => {
                                            e.preventDefault()
                                            this.props.setReserveBoxData(oneFlight)

                                        }}>خرید آنلاین</a>
                                    </div>
                                </div>

                                <div>
                                    <div className={styles['mobile-one-row-provider']}>
                                        <img src={globals.website + `Airlines/${oneFlight.airlineIataCode}.png?ver=1`} />
                                        <span>{oneFlight.airline}</span>
                                    </div>

                                    <div className={styles['mobile-one-row-flight-number']}>
                                        <span>شماره پرواز </span>
                                        <span className="font-bold-iransanse">{oneFlight.flightNo}</span>
                                    </div>
                                </div>

                                <div>
                                    <div className={styles['mobile-one-row-time']}>
                                        <span className="font-size-18 font-bold-iransanse">
                                            {String(oneFlight.flightDateTime).split("T")[1].slice(0, 5)}
                                        </span>
                                        <i className="kilo-font icon-clock"></i>
                                    </div>
                                    <div className={styles['mobile-one-row-cap']}>
                                        <span className="font-bold-iransanse">
                                            {oneFlight.cap}

                                        </span>
                                        <i className="kilo-font icon-seat"></i>

                                        <span className="font-size-18">
                                            &nbsp;صندلی خالی
                                                </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default MobileFlightList