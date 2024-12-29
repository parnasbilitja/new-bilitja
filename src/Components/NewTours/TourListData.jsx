import styles from '../../../styles/newTour/TourLIstData.module.scss'
import React, {useEffect} from "react";
import Link from "next/link";
import {moneyFormatrial} from "../../Utils/SimpleTasks";
import {getcurrencyfa, getRandomNumber, MiladiToJalaliConvertor, timeFixer} from "../../Utils/newTour";
import {useRouter} from "next/router";

const TourListData = (props) => {
const router = useRouter();

    const tags=['مجری مستقیم','بهترین قیمت','لیدر فارسی زبان','خدمات ویژه','لاکچری','پرواز بدون تغییر','لحظه آخری','رزرو آنلاین تلفنی']

    return (
        <div>
            {
                props.tours.map((item,index) => {
                    return(
                        <Link href={`/tours/${item?.id}?tour_type=${router.query.tour_type}&flight_id=${item.flightData.id}`}
                              // onClick={() => slugHandler(item?.id)}
                              key={index}
                              className="w-100 col-xl-12 col-lg-12 w-100 d-flex flex-column">
                            <div className="tour-item col-xl-12 col-lg-12 mb-4"
                                 style={{cursor: 'pointer'}}>
                                <div className="tour-city">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="41.265"
                                         height="48.155" viewBox="0 0 41.265 48.155">
                                        <g id="location2" transform="translate(1.549 1.5)">
                                            <path id="Path_1011" data-name="Path 1011"
                                                  d="M1.271,23.5A27.9,27.9,0,0,0,8.614,37.67,46.066,46.066,0,0,0,18.34,45.6a3.243,3.243,0,0,0,3.487,0,46.066,46.066,0,0,0,9.725-7.932A27.9,27.9,0,0,0,38.895,23.5,21.308,21.308,0,0,0,35.951,8.79C33.1,4.425,28.083,1,20.083,1S7.067,4.425,4.215,8.79A21.308,21.308,0,0,0,1.271,23.5Z"
                                                  transform="translate(-1 -1)" fill="none"
                                                  stroke="#e20000" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth="3"/>
                                            <circle id="Ellipse_49" data-name="Ellipse 49" cx="5.204"
                                                    cy="5.204" r="5.204"
                                                    transform="translate(24.288 23.697) rotate(180)"
                                                    fill="none" stroke="#e20000" strokeWidth="3"/>
                                        </g>
                                    </svg>

                                    <div className="info-tour-city mr-2">
                                        <Link href={`/tours/${item.id}?tour_type=${router.query.tour_type}&flight_id=${item.flightData.id}`}>
                                            <>
                                                <strong
                                                    style={{fontSize: '14px'}}>{item.title}</strong>
                                                <small
                                                    style={{marginRight: '5px'}}>({item.id})</small>
                                            </>
                                        </Link>
                                        <div className="text-price pt-1">
                                            <small className="title-price"
                                                   style={{fontSize: '13px'}}>شروع قیمت از :</small>
                                            <strong className="price-tour color-base-color me-2"
                                                    style={{color: ' #e20000', fontSize: '15px'}}>
                                                {moneyFormatrial(item.min_price)}
                                                <small
                                                    className="pe-1">{getcurrencyfa(item?.currencies)} </small>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="tour-days">
                                    <div className="night mb-2">
                                        <svg className="ms-2" xmlns="http://www.w3.org/2000/svg"
                                             width="15.437" height="16.078"
                                             viewBox="0 0 15.437 16.078" fill='#e20000'>
                                            <path id="Moon_1" data-name="Moon 1"
                                                  d="M14.794,10.838l.595.245a.643.643,0,0,0-.883-.82ZM6.442.643l.519.38A.643.643,0,0,0,6.3.015Zm5.39,10.25a6.126,6.126,0,0,1-6.07-6.181H4.475a7.413,7.413,0,0,0,7.356,7.467Zm2.674-.63a5.954,5.954,0,0,1-2.674.63V12.18a7.24,7.24,0,0,0,3.25-.766Zm-.307.33a6.717,6.717,0,0,1-6.2,4.2v1.286a8,8,0,0,0,7.387-5ZM8,14.792A6.777,6.777,0,0,1,1.287,7.955H0a8.063,8.063,0,0,0,8,8.123ZM1.287,7.955A6.812,6.812,0,0,1,6.58,1.271L6.3.015A8.1,8.1,0,0,0,0,7.955ZM5.762,4.712a6.225,6.225,0,0,1,1.2-3.689L5.923.263A7.512,7.512,0,0,0,4.475,4.712Z"
                                                  transform="translate(0)" fill="#e20000"/>
                                        </svg>
                                        <span
                                            className="font-size-14 font-bold">{item.night_num} شب</span>
                                    </div>
                                    <div className="day d-flex justify-content-start">
                                        <svg className="ms-2" id="Sun"
                                             xmlns="http://www.w3.org/2000/svg" width="21.159"
                                             height="21.159" viewBox="0 0 21.159 21.159">
                                            <path id="Path_1144" data-name="Path 1144"
                                                  d="M7,12.3c-.024,2.225.347,3.463,1.064,4.18s1.973,1.1,4.225,1.1,3.492-.382,4.205-1.1,1.084-1.96,1.084-4.19-.37-3.471-1.084-4.19S14.542,7,12.289,7,8.811,7.382,8.1,8.1,7.024,10.063,7,12.3Z"
                                                  transform="translate(-1.71 -1.71)" fill="none"
                                                  stroke="#e20000" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth={2}/>
                                            <path id="Path_1145" data-name="Path 1145"
                                                  d="M14.511.756A.756.756,0,0,0,13,.756ZM13,2.267a.756.756,0,0,0,1.511,0ZM13,.756V2.267h1.511V.756Z"
                                                  transform="translate(-3.176)" fill="#e20000"/>
                                            <path id="Path_1146" data-name="Path 1146"
                                                  d="M14.511,24.756a.756.756,0,0,0-1.511,0ZM13,26.267a.756.756,0,0,0,1.511,0Zm0-1.511v1.511h1.511V24.756Z"
                                                  transform="translate(-3.176 -5.864)"
                                                  fill="#e20000"/>
                                            <path id="Path_1147" data-name="Path 1147"
                                                  d="M26.267,14.511a.756.756,0,0,0,0-1.511ZM24.756,13a.756.756,0,0,0,0,1.511Zm1.511,0H24.756v1.511h1.511Z"
                                                  transform="translate(-5.864 -3.176)"
                                                  fill="#e20000"/>
                                            <path id="Path_1148" data-name="Path 1148"
                                                  d="M2.267,14.511a.756.756,0,0,0,0-1.511ZM.756,13a.756.756,0,0,0,0,1.511Zm1.511,0H.756v1.511H2.267Z"
                                                  transform="translate(0 -3.176)" fill="#e20000"/>
                                            <path id="Path_1149" data-name="Path 1149"
                                                  d="M4.29,3.221A.756.756,0,0,0,3.221,4.29Zm0,2.137A.756.756,0,0,0,5.359,4.29ZM3.221,4.29,4.29,5.359,5.359,4.29,4.29,3.221Z"
                                                  transform="translate(-0.733 -0.733)"
                                                  fill="#e20000"/>
                                            <path id="Path_1150" data-name="Path 1150"
                                                  d="M4.29,24.359A.756.756,0,1,1,3.221,23.29Zm0-2.137A.756.756,0,0,1,5.359,23.29ZM3.221,23.29,4.29,22.221,5.359,23.29,4.29,24.359Z"
                                                  transform="translate(-0.733 -5.375)"
                                                  fill="#e20000"/>
                                            <path id="Path_1151" data-name="Path 1151"
                                                  d="M23.29,3.221A.756.756,0,1,1,24.359,4.29Zm0,2.137A.756.756,0,0,1,22.221,4.29ZM24.359,4.29,23.29,5.359,22.221,4.29,23.29,3.221Z"
                                                  transform="translate(-5.375 -0.733)"
                                                  fill="#e20000"/>
                                            <path id="Path_1152" data-name="Path 1152"
                                                  d="M23.29,24.359a.756.756,0,1,0,1.069-1.069Zm0-2.137a.756.756,0,0,0-1.069,1.069Zm1.069,1.069L23.29,22.221,22.221,23.29l1.069,1.069Z"
                                                  transform="translate(-5.375 -5.375)"
                                                  fill="#e20000"/>
                                        </svg>
                                        <span
                                            className="font-size-14 font-bold">{item.day_num} روز</span>
                                    </div>
                                </div>

                                <div className={'d-flex flex-column gap-2'}>

                                    <div className={'d-flex align-items-center gap-2'}>
                                        <div className={'airline_img'}>
                                            <img src={item.flightData?.departure_flight?.airline_thumb.url}
                                                 width={30}
                                                 height={30}
                                                 alt=""/>
                                        </div>
                                        <p className={'m-0 p-0 font-size-13'}>
                                            {item.flightData?.departure_flight?.airline}
                                        </p>
                                    </div>  <div className={'d-flex align-items-center gap-2'}>
                                        <div className={'airline_img'}>
                                            <img src={item.flightData?.return_flight?.airline_thumb.url}
                                                 width={30}
                                                 height={30}
                                                 alt=""/>
                                        </div>
                                        <p className={'m-0 p-0 font-size-13'}>
                                            {item.flightData?.return_flight?.airline}
                                        </p>
                                    </div>
                                    {/*<br/>*/}
                                </div>
                                <div className="tour-night d-flex align-items-center">
                                    <svg className="ms-2" xmlns="http://www.w3.org/2000/svg"
                                         width="21.429" height="17.709" viewBox="0 0 21.429 17.709">
                                        <g id="Up_Down_1" data-name="Up Down 1"
                                           transform="translate(21.015 17.294) rotate(180)">
                                            <path id="Path_1173" data-name="Path 1173"
                                                  d="M1,11.23l4.65,4.65m0,0V1m0,14.88,4.65-4.65"
                                                  fill="none" stroke="#e20000" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth={2}/>
                                            <path id="Path_1174" data-name="Path 1174"
                                                  d="M11,5.65,15.65,1m0,0V15.88M15.65,1,20.3,5.65"
                                                  transform="translate(-0.7)" fill="none"
                                                  stroke="#e20000" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth={2}/>
                                        </g>
                                    </svg>
                                    <div className="d-flex flex-column">
                                                           <span
                                                               className="to text-dark font-size-14 pt-1">{MiladiToJalaliConvertor(item?.flightData?.departure_flight?.date)} | {timeFixer(item?.flightData?.departure_flight?.time)}</span>
                                        <span
                                            className="from text-dark font-size-14 pt-1">{MiladiToJalaliConvertor(item?.flightData?.return_flight?.date)} | {timeFixer(item?.flightData?.return_flight?.time)}</span>
                                    </div>
                                </div>
                                <div className="type">
                                    <div className={'isDesktop'}>
                                        {<div style={{
                                            display: 'flex',
                                            columnGap: '3px',
                                            justifyContent: 'center'
                                        }}>
                                            {!item.offered ? getRandomNumber(8).map(num => (
                                                <div style={{
                                                    padding: '4px',
                                                    width: '110px',
                                                    backgroundColor: "#efefef",
                                                    color: "#a9a9a9",
                                                    borderRadius: '5px',
                                                    fontSize: '13px',
                                                    fontWeight: '700',
                                                    textAlign: 'center',
                                                    whiteSpace: 'nowrap'
                                                }}>{tags[num]}</div>

                                            )) : <div style={{
                                                padding: '4px',
                                                width: '110px',
                                                backgroundColor: "#e20000",
                                                color: "white",
                                                borderRadius: '5px',
                                                fontSize: '13px',
                                                fontWeight: '700',
                                                textAlign: 'center',
                                                whiteSpace: 'nowrap'
                                            }}>ویژه</div>}
                                        </div>}


                                    </div>
                                    {/*<img width="45" src={item.transfers[0].logo} alt={item.title} />*/}
                                    {/*<span className="text-dark me-2 font-size-14">{item.transfers[0].transfer}</span>*/}
                                </div>
                                <Link href={`/tours/${item.id}?tour_type=${router.query.tour_type}&flight_id=${item.flightData.id}`}>
                                    <div className="ino-tour-btn">
                                                           <span
                                                               className="text-white isMobile ms-2 font-bold-iransanse"
                                                               style={{display: "none"}}>جزییات</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27.414"
                                             height="18.453" viewBox="0 0 27.414 18.453">
                                            <path id="Right_Arrow_2" data-name="Right Arrow 2"
                                                  d="M18.188,1,26,8.812m0,0H1m25,0-7.812,7.813"
                                                  transform="translate(27.414 18.039) rotate(180)"
                                                  fill="none" stroke="#fff" strokeLinecap="round"
                                                  strokeLinejoin="round" strokeWidth={2}/>
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </Link>
                    )
                })
            }
            <div>

            </div>

        </div>
    )
}

export default TourListData
