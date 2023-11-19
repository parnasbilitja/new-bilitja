import React, {useEffect} from "react";
import {getDayInPersian, MiladiToJalaliConvertor} from "../../../../Utils/newTour";

import styles from "../../../../../styles/newTour/components/subComponent/TourDetailLabel.module.scss";
import NewLoader from "./NewLoader";
import moment from "moment-jalaali";
import {Loader} from "../../../../Utils/Loader";
import Slider from "../../../slider/Slider";
const TourDetailLabel = ({ flightDet, stayCount,gallary ,refcode}) => {
    const dateReform = (date) => {
        return date?.slice(0, 5);
    };

    const handleGallary=(images)=>{

        const gallarr=[]


        gallary.map(item=>gallarr.push(item.url))

        return gallarr



    }

    useEffect(()=>{
        console.log(gallary )
    },[gallary])

    return (


        <div className="detail-tour col-xl-12 col-lg-12 col-12 d-flex flex-wrap justify-content-between border-bottom">
            <div className="right col-xl-5 col-lg-5 col-12">
                <>
                    <div className="gallery-image">

                        {gallary ?
                            <img src={ gallary && gallary[0].url} width={'100%'} height={'100%'}  style={{objectFit:'cover',borderRadius:'20px'}}/>
                            :<NewLoader/>}

                    </div>



                </>
            </div>
            <div className="left position-relative col-xl-7 col-lg-7 col-12 " style={{height:'50% !important'}}>
                <div className="vertical-data" style={{ display: "none" }}></div>
                <div className="p-info__tour mr-0 d-flex flex-wrap align-items-center justify-content-between col-xl-12 col-lg-12 me-3 ">
                    {/* c info */}
                    <div className="c-info__tour w-100-mobi   col-xl-12 col-gl-12 d-flex justify-content-between">
                        <div className='d-flex align-items-center'>
                            <div className="bg-white py-3">
                                <div className="image d-flex align-items-center bg-white rounded shadow-sm py-3 px-3 isDesktop">
                                    <img src={flightDet?.airline_thumb?.url} width={"35px"} height={"35px"} alt="company" style={{ objectFit: 'cover' }} />
                                </div>
                            </div>
                            <div className="text w-90-mobi m-flex-100 pe-2">
                                <div className="m-main-data d-flex flex-between-mobi align-items-center pb-1">

                                    <div className="val pe-2 m-pr-15 mb-0">
                                        <div className="d-flex justify-content-between">
                                            <p className='px-2 py-0' style={{margin:0, padding:0,fontSize:'14px',fontWeight:'600'}}>
                                                {flightDet?.origin_name}
                                            </p>
                                            <p style={{margin:0, padding:0,fontSize:'14px',fontWeight:'600'}}>به</p>
                                            <p className='px-2 py-0' style={{margin:0, padding:0,fontSize:'14px',fontWeight:'600'}}>
                                                {flightDet?.destination_name}
                                            </p>
                                        </div>
                                    </div>


                                </div>
                                <div className="val pe-2 m-pr-15 mb-0">
                                    <div className="d-flex justify-content-between">
                                        <p className='px-2 py-0' style={{margin:0, padding:0,fontSize:'14px',fontWeight:'600'}}>
                                            {flightDet?.airline_name
                                            }
                                        </p>

                                    </div>

                                </div>
                                <div className="m-main-data d-flex flex-between-mobi align-items-center pb-1 m-pb-7">
                                    <div className="prop d-flex align-items-center">
                                        <div className="image ms-2 isMobile" style={{display:"none"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18.976" height="18.41" viewBox="0 0 29.976 32.41">
                                                <g id="Up-Down-3" transform="translate(2.121 1.5)">
                                                    <path id="Path_1175" data-name="Path 1175" d="M1,21.219l9.191,9.191V1" transform="translate(-1 -1)" fill="none" stroke="#0d7b0d" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}/>
                                                    <path id="Path_1176" data-name="Path 1176" d="M19.191,10.191,10,1V30.41" transform="translate(6.543 -1)" fill="none" stroke="#0d7b0d" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}/>
                                                </g>
                                            </svg>
                                        </div>
                                        <span className="font-bold font-12-mobi bold-900-mobi bold-900-mobi text-danger" style={{fontSize:'14px'}}>تاریخ و ساعت پرواز رفت</span>
                                    </div>
                                    <div className="val pe-2">
                                        <span className="font-13-mobi bold-900-mobi" style={{fontSize:'13px', fontWeight:'600'}}>{` ${dateReform(flightDet?.time)} | ${getDayInPersian(moment(flightDet?.date).format('dddd'))} ${MiladiToJalaliConvertor(flightDet?.date)}`}</span>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div style={{paddingTop:'15px',display:'flex',columnGap:'5px'}}>
                            <p style={{margin:'0',padding:'0',fontSize:'13px',fontWeight:'800',whiteSpace:'nowrap'}}>کد رفرنس: </p>

                            <p style={{fontSize:'14px',fontWeight:'bolder'}}>

                                {refcode}
                            </p>
                        </div>

                    </div>
                    {/* border */}
                    <div className="border-style-tour isMobile" style={{display:"none"}}></div>
                    {/* c info */}
                    <div className="c-info__tour bg-white d-flex align-items-center justify-content-center box-shadow-sm col-xl-12 col-lg-12 col-12 my-4 m-my-20">
                        <div className="border-box box-right"></div>
                        <div className="text flex-between-mobi w-100-mobi d-flex align-items-center justify-content-center m-justify-content-between px-2 m-px-0 bg-white rounded shadow-sm h-25 py-2" style={{zIndex:1000}}>
                            <div className="text d-flex align-items-center m-pr-6">
                                <div className="image ms-2 isMobile" style={{display:"none"}}>
                                    <svg id="Moon_2" data-name="Moon 2" xmlns="http://www.w3.org/2000/svg" width="20.292" height="20.759" viewBox="0 0 35.292 36.759">
                                        <path id="Path_1046" data-name="Path 1046" d="M33.821,24.779l1.36.559a1.471,1.471,0,0,0-2.018-1.874ZM14.728,1.471l1.187.868a1.471,1.471,0,0,0-1.5-2.3ZM27.05,24.905A14.006,14.006,0,0,1,13.172,10.774H10.231A16.947,16.947,0,0,0,27.05,27.846Zm6.113-1.441a13.611,13.611,0,0,1-6.113,1.441v2.941a16.552,16.552,0,0,0,7.43-1.752Zm-.7.756a15.358,15.358,0,0,1-14.168,9.6v2.941A18.3,18.3,0,0,0,35.181,25.338Zm-14.168,9.6A15.493,15.493,0,0,1,2.941,18.187H0A18.434,18.434,0,0,0,18.293,36.759ZM2.941,18.187a15.574,15.574,0,0,1,12.1-15.28L14.413.034A18.515,18.515,0,0,0,0,18.187Zm10.231-7.413a14.232,14.232,0,0,1,2.742-8.435L13.541.6a17.173,17.173,0,0,0-3.31,10.172Z" transform="translate(0 0)" fill="#646564"/>
                                        <path id="Path_1047" data-name="Path 1047" d="M19.238,2.989a1.029,1.029,0,0,1,1.931,0l1.253,3.387a1.029,1.029,0,0,0,.608.608l3.387,1.253a1.029,1.029,0,0,1,0,1.931L23.03,11.422a1.029,1.029,0,0,0-.608.608l-1.253,3.387a1.029,1.029,0,0,1-1.931,0L17.984,12.03a1.029,1.029,0,0,0-.608-.608l-3.387-1.253a1.029,1.029,0,0,1,0-1.931l3.387-1.253a1.029,1.029,0,0,0,.608-.608Z" transform="translate(6.265 1.09)" fill="none" stroke="#137cb6" stroke-linecap="round" stroke-width="2"/>
                                    </svg>
                                </div>
                                <span className="font-13-mobi text-danger bold-900-mobi font-bold">مدت اقامت</span>
                            </div>
                            <div className="image w-50-mobi flex-center-mobi  d-flex align-items-center mx-3 isDesktop">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                     viewBox="0 0 43.84 45.663">
                                    <g id="Moon_2" data-name="Moon 2" transform="translate(0 0)">
                                        <path id="Path_1046" data-name="Path 1046"
                                              d="M42.014,30.781l1.689.695A1.827,1.827,0,0,0,41.2,29.147ZM18.3,1.827l1.474,1.079A1.827,1.827,0,0,0,17.9.043ZM33.6,30.938A17.4,17.4,0,0,1,16.363,13.383H12.709A21.052,21.052,0,0,0,33.6,34.591Zm7.594-1.79a16.909,16.909,0,0,1-7.594,1.79v3.653a20.562,20.562,0,0,0,9.23-2.177Zm-.872.939a19.078,19.078,0,0,1-17.6,11.923v3.653A22.731,22.731,0,0,0,43.7,31.476Zm-17.6,11.923A19.246,19.246,0,0,1,3.653,22.592H0a22.9,22.9,0,0,0,22.725,23.07ZM3.653,22.592A19.347,19.347,0,0,1,18.687,3.611L17.9.043A23,23,0,0,0,0,22.592Zm12.709-9.209A17.679,17.679,0,0,1,19.769,2.906L16.821.748a21.333,21.333,0,0,0-4.111,12.636Z"
                                              transform="translate(0 0)" fill="#ff4422" />
                                        <path isd="Path_1047" data-name="Path 1047"
                                              d="M20.672,3.152a1.279,1.279,0,0,1,2.4,0L24.627,7.36a1.279,1.279,0,0,0,.756.755L29.59,9.672a1.279,1.279,0,0,1,0,2.4l-4.208,1.557a1.279,1.279,0,0,0-.756.755L23.07,18.59a1.279,1.279,0,0,1-2.4,0l-1.557-4.208a1.278,1.278,0,0,0-.755-.755L14.152,12.07a1.279,1.279,0,0,1,0-2.4L18.36,8.115a1.278,1.278,0,0,0,.755-.755Z"
                                              transform="translate(11.009 1.915)" fill="none" stroke="#ff2233"
                                              strokeLinecap="round" strokeWidth={3} />
                                    </g>
                                </svg>
                            </div>
                            <div className="text">
                                <span className="ps-1 font-bold font-13-mobi">{+stayCount}  شب</span>
                                <span className="pe-1 font-bold ps-2 p-0-mobi font-13-mobi">{+stayCount + 1} روز</span>
                            </div>
                        </div>
                        <div className="border-box box-left"></div>
                    </div>
                    {/* border */}
                    <div className="border-style-tour isMobile" style={{display:"none"}}></div>
                    {/* c info */}
                    <div className="c-info__tour d-flex flex-row-reverse align-items-center col-xl-12 col-lg-12 col-12">
                        <div className="bg-white py-3">
                            <div className="image d-flex align-items-center bg-white rounded shadow-sm py-3 px-3 isDesktop">

                                <img src={flightDet?.flight.airline_thumb?.url} width={"35px"} height={"35px"} alt="company" style={{ objectFit: 'cover' }} />

                            </div>
                        </div>
                        <div className="text w-90-mobi m-flex-100 p-0-mobi pe-2 ps-3">
                            <div className="m-main-data  flex-between-mobi d-flex flex-row-reverse align-items-center pb-1 m-pt-15">

                                <div className="m-main-data d-flex flex-between-mobi align-items-center ">

                                    <div className="val pe-2 m-pr-15 mb-0">
                                        <div className="d-flex justify-content-between">
                                            <p className='px-2 py-0' style={{margin:0, padding:0,fontSize:'14px',fontWeight:'600'}}>
                                                {flightDet?.origin_name}
                                            </p>
                                            <p style={{margin:0, padding:0,fontSize:'14px',fontWeight:'600'}}>به</p>
                                            <p className='px-2 py-0'style={{margin:0, padding:0,fontSize:'14px',fontWeight:'600'}}>
                                                {flightDet?.destination_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="val pe-2 m-pr-15 mb-2">
                                <div className="d-flex justify-content-lg-end">
                                    <p className='px-2 py-0' style={{margin:0, padding:0,fontSize:'14px',fontWeight:'600'}}>
                                        {flightDet?.flight?.airline_name
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="m-main-data flex-between-mobi d-flex flex-row-reverse align-items-center pb-1 m-pb-7">

                                <div className="prop d-flex align-items-center pe-2">
                                    <div className="image ms-2 isMobile" style={{display:"none"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18.976" height="18.41" viewBox="0 0 29.976 32.41">
                                            <g id="Up-Down-3" transform="translate(2.121 1.5)">
                                                <path id="Path_1175" data-name="Path 1175" d="M1,21.219l9.191,9.191V1" transform="translate(-1 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}/>
                                                <path id="Path_1176" data-name="Path 1176" d="M19.191,10.191,10,1V30.41" transform="translate(6.543 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}/>
                                            </g>
                                        </svg>
                                    </div>
                                    <span className="font-bold text-danger font-13-mobi bold-900-mobi" style={{fontSize:'14px'}}>تاریخ و ساعت پرواز برگشت</span>
                                </div>
                                <div className="val pe-2">
                                    <span className="font-13-mobi bold-900-mobi" style={{fontSize:'13px', fontWeight:'600'}}>{` ${dateReform(flightDet?.flight.time)} | ${getDayInPersian(moment(flightDet?.flight?.date).format('dddd'))} ${MiladiToJalaliConvertor(flightDet?.flight?.date)}`}</span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TourDetailLabel;
