import React, { useRef} from 'react';
import {MiladiToJalaliConvertor, timeFixer} from "../../Utils/newTour";
import {Navigation} from "swiper";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import styles from '../../../styles/TourPackage/TransferList.module.scss';

const TransfersList = (props) => {


    const swiperRef = useRef();

    return (
        <>
            <div className={styles['tour-details']}>

                <div className={styles['title-conatiner']}>
                    <svg
                        style={{position: 'relative', bottom: '3px', rotate: '270deg'}}
                        viewBox="0 0 24 24"
                        // fill="#e20000"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill='#e20000'
                    >
                        <g>
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"/>
                        </g>
                    </svg>
                    <p >لطفا پرواز خود را انتخاب کنید.</p>

                    <svg className={styles['svg']} style={{marginTop:'20px'}} width="28px" height="28px" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 19.5L7 14.5M12 19.5L17 14.5M12 19.5C12 19.5 12 11.1667 12 9.5C12 7.83333 13 4.5 17 4.5"
                            stroke="#e20000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </div>
                {/*<div>*/}
                {/*    <div className={styles['tour-details-container']}>*/}
                {/*        <div style={{display: "flex", alignItems: 'center', columnGap: '5px'}}>*/}
                {/*            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg">*/}

                {/*                <g id="SVGRepo_bgCarrier" stroke-width="0"/>*/}

                {/*                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>*/}

                {/*                <g id="SVGRepo_iconCarrier">*/}
                {/*                    <path*/}
                {/*                        d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"*/}
                {/*                        stroke="#000000" stroke-width="2" stroke-linecap="round"*/}
                {/*                        stroke-linejoin="round"/>*/}
                {/*                </g>*/}

                {/*            </svg>*/}
                {/*            <div className={styles['hotel-detail']}>*/}
                {/*                <label htmlFor="">تاریخ ورود به هتل</label>*/}
                {/*                <p>{MiladiToJalaliConvertor(props.hotelInfo?.checkin)}</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}


                {/*        <div style={{*/}
                {/*            display: 'flex',*/}
                {/*            justifyContent: 'center',*/}
                {/*            alignItems: 'center',*/}

                {/*            columnGap: '4px',*/}
                {/*            borderLeft: '1px solid white',*/}
                {/*            borderRight: '1px solid white',*/}
                {/*            padding: '0 8px'*/}
                {/*        }}>*/}
                {/*            <svg width="22px" height="22px" viewBox="0 0 64 64"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000"*/}
                {/*                 stroke-width="3.136">*/}

                {/*                <g id="SVGRepo_bgCarrier" stroke-width="0"/>*/}

                {/*                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>*/}

                {/*                <g id="SVGRepo_iconCarrier">*/}

                {/*                    <path*/}
                {/*                        d="M46 44a26 26 0 0 1-24.94-33.36 24 24 0 1 0 32.3 32.3A26.24 26.24 0 0 1 46 44z"/>*/}

                {/*                </g>*/}

                {/*            </svg>*/}
                {/*            <p style={{*/}
                {/*                fontSize: '14px',*/}
                {/*                padding: '0',*/}
                {/*                margin: '0',*/}
                {/*                color: '#e20000',*/}
                {/*                whiteSpace:'nowrap'*/}
                {/*            }}>{props.hotelInfo?.night_num}شب</p>*/}

                {/*            <p style={{*/}
                {/*                fontSize: '14px',*/}
                {/*                padding: '0',*/}
                {/*                margin: '0',*/}
                {/*                color: '#e20000',*/}
                {/*                whiteSpace:'nowrap'*/}

                {/*            }}>{props.hotelInfo?.day_num} روز </p>*/}

                {/*        </div>*/}

                {/*        <div style={{display: "flex", alignItems: 'center', columnGap: '5px'}}>*/}
                {/*            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"*/}
                {/*                 xmlns="http://www.w3.org/2000/svg">*/}

                {/*            <g id="SVGRepo_bgCarrier" stroke-width="0"/>*/}

                {/*                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>*/}

                {/*                <g id="SVGRepo_iconCarrier">*/}
                {/*                    <path*/}
                {/*                        d="M7 10H17M7 14H12M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"*/}
                {/*                        stroke="#000000" stroke-width="2" stroke-linecap="round"*/}
                {/*                        stroke-linejoin="round"/>*/}
                {/*                </g>*/}

                {/*            </svg>*/}
                {/*            <div className={styles['hotel-detail']}>*/}
                {/*                <label htmlFor="">تاریخ خروج از هتل</label>*/}
                {/*                <p>{MiladiToJalaliConvertor(props.hotelInfo?.checkout)}</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
            <div className="left position-relative col-lg-12 col-lg-12 col-12 mb-1">
                    <div className={styles['transfers']}>

                        <div>
                            <button className={`isDesktop  prevNextbtnSwiper ${styles['next']}`} onClick={() => swiperRef.current?.slidePrev()}>
                                <FontAwesomeIcon icon={faAngleRight}/>
                            </button>

                            <div
                                className={styles['transferList']}>

                                <div className='header-left-container'>



                                    <Swiper
                                        modules={[Navigation]}
                                        onBeforeInit={(swiper) => {
                                            swiperRef.current = swiper;
                                        }}
                                        slidesPerView={3}
                                        spaceBetween={10}
                                        slidesPerGroup={1}
                                        centeredSlidesBounds={true}
                                        initialSlide={props.index}
                                        breakpoints={{
                                            0: {
                                                spaceBetween: 10,
                                                slidesPerView: 1.2,
                                            },
                                            480: {
                                                slidesPerView: 1.5
                                            },
                                            855: {
                                                spaceBetween: 20,
                                                slidesPerView: 2,
                                            },
                                            1210: {
                                                spaceBetween: 10,
                                                slidesPerView: 2.2,
                                            },

                                        }}
                                    >
                                        {props.transfers && props.transfers?.map((transfer, index) => {
                                            return (


                                                <SwiperSlide key={transfer.id}>

                                                    <div
                                                        className={
                                                            props.selectedFlight === transfer.id ? 'header activeflight' : 'header'}
                                                        onClick={() => {

                                                            props.setSelectedFlight(transfer.id)
                                                            // props.setInfPrice(transfer.chd_price)

                                                        }}>
                                                        {props.selectedFlight === transfer.id &&
                                                            <div className={styles['selected-flight']}></div>}
                                                        <div className='flight-item'>
                                                            <div className='airline-det'
                                                                 style={{borderLeft: '1px solid #d4d4d4'}}>

                                                                <div className='det'>
                                                                    <div className='image-con'>
                                                                        <img
                                                                            src={transfer?.departure_flight?.airline_thumb.url}
                                                                            alt=""/>
                                                                    </div>

                                                                    <p>{transfer.departure_flight.airline}</p>
                                                                    <p>{transfer.departure_flight.origin}</p>

                                                                    <div className={styles['transfer-date']}>
                                                                        <p>{timeFixer(transfer.departure_flight.time)}</p>
                                                                        <p>
                                                                            | {MiladiToJalaliConvertor(transfer.departure_flight.date)}
                                                                        </p>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className='middle-det'>

                                                                <div style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    columnGap: '5px'
                                                                }}>
                                                                    <p style={{
                                                                        padding: '0',
                                                                        margin: '0',
                                                                        fontSize: '13px',
                                                                        color: '#e20000'
                                                                    }}>موجودی پرواز</p>
                                                                    <p style={{
                                                                        padding: '0',
                                                                        margin: '0',
                                                                        fontSize: '14px',
                                                                        color: '#e20000'
                                                                    }}>{transfer?.capacity}</p>
                                                                </div>
                                                                <div className='f'>
                                                                    <div>
                                                                        <div className='separator'>
                                                                            <div className='dot'></div>
                                                                            <div className='dash'></div>
                                                                            <div className='flightlogo'>
                                                                                {/*<img src="../../../Images/flightlogo" alt=""/>*/}
                                                                                <svg
                                                                                    viewBox="0 0 24 24"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="30"
                                                                                    height="30"
                                                                                >
                                                                                    <g>
                                                                                        <path d="M0 0h24v24H0z"
                                                                                              fill="none"/>
                                                                                        <path
                                                                                            d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"/>
                                                                                    </g>
                                                                                </svg>

                                                                                {/*<svg viewBox="0 0 24 24" fill="#e20000"  width="30" height="30" style="transform: rotate(270deg);"><g><path d="M0 0h24v24H0z" fill="none"></path><path d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"></path></g></svg>*/}
                                                                            </div>
                                                                        </div>

                                                                        {
                                                                            props.selectedFlight === transfer.id &&

                                                                            <div style={{display:'flex',justifyContent:'center', color:"#e20000 !important"}}>

                                                                                <small style={{textAlign:'center',fontSize:'13px' }}> * پرواز انتخاب شده</small>
                                                                            </div>

                                                                        }


                                                                        <div className='separator'>
                                                                            <div className='flightlogo'>
                                                                                {/*<img src="../../../Images/flightlogo" alt=""/>*/}
                                                                                <svg
                                                                                    style={{
                                                                                        transform: "rotate(-270deg)",
                                                                                        position: 'relative',
                                                                                        top: '3px'
                                                                                    }}
                                                                                    viewBox="0 0 24 24"
                                                                                    // fill="#e20000"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="30"
                                                                                    height="30"
                                                                                >
                                                                                    <g>
                                                                                        <path d="M0 0h24v24H0z"
                                                                                              fill="none"/>
                                                                                        <path
                                                                                            d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"/>
                                                                                    </g>
                                                                                </svg>

                                                                                {/*<svg viewBox="0 0 24 24" fill="#e20000"  width="30" height="30" style="transform: rotate(270deg);"><g><path d="M0 0h24v24H0z" fill="none"></path><path d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"></path></g></svg>*/}
                                                                            </div>
                                                                            <div className='dash'></div>

                                                                            <div className='dot'></div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className='airline-det'
                                                                 style={{borderRight: '1px solid #d4d4d4'}}>
                                                                <div className='det'>
                                                                    <div className='image-con'>
                                                                        <img
                                                                            src={transfer.return_flight.airline_thumb.url}
                                                                            alt=""/>
                                                                    </div>

                                                                    <p>{transfer.return_flight.airline}  </p>
                                                                    <p>{transfer.departure_flight.destination}</p>

                                                                    <div className={styles['transfer-date']}>
                                                                        <p>{timeFixer(transfer.return_flight.time)}</p>
                                                                        <p> | {MiladiToJalaliConvertor(transfer.return_flight.date)}</p>

                                                                    </div>

                                                                </div>


                                                            </div>


                                                        </div>


                                                    </div>
                                                </SwiperSlide>

                                            )
                                        })}

                                    </Swiper>


                                </div>

                            </div>
                            <button  className={`isDesktop prevNextbtnSwiper ${styles['prev']}`} onClick={() => swiperRef.current?.slideNext()}>
                                <FontAwesomeIcon icon={faAngleLeft}/>
                            </button>
                        </div>

                    </div>

            </div>


        </>
    );
};

export default TransfersList;
