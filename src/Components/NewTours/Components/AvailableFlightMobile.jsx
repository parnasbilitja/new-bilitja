import React from "react";
import styles from "../../../../styles/newTour/components/AvailableFlightMobile.module.scss";
import {MiladiToJalaliConvertor, getDayInPersian, chdAgeStr,} from "../../../Utils/newTour";
import {Err, ErrSuccess, NotifAlert} from "./NotifAlert.component";
import moment from "moment-jalaali";
const AvailableFlightMobile = ({flight, setSelectedRoom, setSelectedFlight, setIsOpen, price, index}) => {
    return (
        <>
            <NotifAlert/>
            <div key={index}>
                <div className={styles["ticket_container"]}>
                    <div className={styles["container"]}>
                        <>
                            <div className={styles["ticket"]}>
                                <div className={styles["ticket_flight"]}>
                                    <div className={styles["flightDet_container"]}>
                                        <div className={styles["flight_company"]}>
                                            <div className={styles["flight_company_logo"]}>
                                                <p style={{whiteSpace: 'nowrap'}}>رفت</p>
                                                <div className={styles["image_container"]}>
                                                    <img src={flight?.departure_flight?.airline_thumb?.url } alt=""/>
                                                </div>
                                                <p>{flight?.departure_flight?.airline}</p>
                                                <div className={styles["flight_info"]}>
                                                    <div style={{
                                                        backgroundColor: 'rgb(236,236,236)',
                                                        padding: '.3rem',
                                                        borderRadius: '20px',
                                                        marginBottom: '5px'
                                                    }}>
                                                        <p style={{whiteSpace: 'nowrap'}}>
                                                            {flight?.departure_flight?.origin}
                                                        </p>
                                                        <p>
                                                            به
                                                        </p>
                                                        <p style={{whiteSpace: 'nowrap'}}>
                                                            {flight?.departure_flight?.destination}
                                                        </p>
                                                    </div>
                                                    <div

                                                        className={styles['flight_number']}
                                                    >
                                                        <p>ش.پرواز: </p>
                                                        <p style={{ marginRight: '5px'}}>
                                                            {flight?.departure_flight?.flight_number}
                                                        </p>
                                                    </div>
                                                    <div className={styles['flightdate']}>

                                                        <p>{MiladiToJalaliConvertor(flight?.departure_flight?.date)}</p>
                                                        <p>{getDayInPersian(moment(flight?.departure_flight?.date).format('dddd'))}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{
                                                            color: '#e20000',
                                                            fontSize: '17px'
                                                        }}>{flight?.departure_flight?.time.slice(0, 5)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'d-flex justify-content-center align-items-center gap-3'}>
                                                <div className={styles["flight_company_remaintour"]}>
                                                    <p style={{whiteSpace: "nowrap"}}>
                                                         موجودی  :<span style={{
                                                        color: '#e20000',
                                                        fontWeight: '900',
                                                        fontSize: '13px'
                                                    }}>{flight?.capacity}</span>
                                                    </p>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: 'center',
                                                            padding: "0",
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#e20000"
                                                             viewBox="0 0 24 24"
                                                             width={25}
                                                             className={styles['svg']}
                                                             height={25}
                                                             stroke-width="1.5" stroke="#e20000">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles["flight_company_logo"]}>
                                                <p style={{whiteSpace: 'nowrap'}}>برگشت</p>
                                                <div className={styles["image_container"]}>
                                                    <img
                                                        src={flight?.return_flight?.airline_thumb?.url}
                                                        alt=""
                                                    />
                                                </div>
                                                <p>{flight?.return_flight?.airline}</p>

                                                <div className={styles["flight_info"]}>
                                                    <div style={{
                                                        backgroundColor: '#ebebeb',
                                                        padding: '.5rem',
                                                        borderRadius: '20px',
                                                        marginBottom: '5px'
                                                    }}>
                                                        <p style={{whiteSpace: 'nowrap'}}>
                                                            {flight?.return_flight?.origin}
                                                        </p>
                                                        <p>
                                                            به
                                                        </p>
                                                        <p style={{whiteSpace: 'nowrap'}}>
                                                            {flight?.return_flight?.destination}
                                                        </p>
                                                    </div>
                                                    <div

                                                        className={styles['flight_number']}
                                                    >
                                                        <p>ش.پرواز: </p>
                                                        <p style={{marginRight: '5px'}}>
                                                            {flight?.return_flight?.flight_number}
                                                        </p>
                                                    </div>
                                                    <div className={styles['flightdate']}>
                                                        <p>
                                                            {MiladiToJalaliConvertor(flight?.return_flight?.date)}
                                                        </p>
                                                        <p>{getDayInPersian(moment(flight?.return_flight?.date).format('dddd'))}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{
                                                            color: '#e20000',
                                                            fontSize: '17px'
                                                        }}>{flight?.return_flight?.time.slice(0, 5)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["ticket_reserve"]}>
                                <div className={styles["ticket_reserve_price"]}
                                     // ref={el => collapseRefs.current[flight.departure.id.toString() + flight.return.id.toString()] = el}
                                    >
                                    <p className={styles["priceTitle"]}> قیمت هتل + پرواز (هرنفر) :</p>
                                    <p style={{color:'#e20000',fontSize:'15px !important',fontWeight:'900'}}>
                                        {price + ' ' + 'تومان'}
                                    </p>
                                </div>
                                <div className={styles["btn-container"]}>
                                    <button
                                        onClick={() => {
                                           setIsOpen()
                                            setSelectedRoom()
                                            setSelectedFlight()
                                        }}
                                        className={`${styles["ticket_reserve_btn_active"]}`}
                                    >
                                        انتخاب پرواز
                                    </button>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AvailableFlightMobile;
