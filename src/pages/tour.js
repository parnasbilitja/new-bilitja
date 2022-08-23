import React, { useEffect, useState } from 'react';
// mui
import { Alert, Snackbar } from '@mui/material';

import axios from 'axios';
import { useAtom } from 'jotai';
import { tourSlug } from '../jotai/jotai';
import Link from 'next/link';
import NavBar from "./../sources/component/NavBar.component";
import Footer from '../sources/component/Footer.component';
import Slider from '../Components/slider/Slider';
import RequestTour from '../Components/modal/RequestTour';
import PopUp from '../sources/component/PopUp.component';

const tour = () => {
    // mui
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null)
    const [slug, setSlug] = useAtom(tourSlug)
    const [show,setShow] = useState(false);
    const [tourId,setTourId] = useState(null);
    const [packData,setPackData] = useState({
        number:'',
        count:'1',
        tourId:tourId,
    })
    const [messages,setMessages] = useState({
        isDone: false,
        message:''
    })
    const getData = async () => {
        const val = await axios.get(`https://api.hamnavaz.com/api/v1/tour/getTour/${slug ? slug : JSON.parse(localStorage.getItem("slug"))}`)
        setData(val.data.data)

    }
    useEffect(() => {
        getData();
        console.log(data);
    }, [slug])
    

    const slugHandler = (slug) => {
        setSlug(slug)
        localStorage.setItem("slug", JSON.stringify(slug))
    }
    return (
        <div>
            <div className="mt-5 bodyVar">
                <NavBar />
                {/* section 1 */}
                <section className="mt-5 pt-5">
                    <div className="container">
                        <div className="m-main-data detail-title col-xl-12 col-lg-12 col-12 d-flex justify-content-between border-bottom pb-2">
                            <div className="title d-flex align-items-center">
                                <svg className="ms-3" xmlns="http://www.w3.org/2000/svg" width="30.643" height="30.68" viewBox="0 0 19.643 19.68">
                                    <g id="Ticket-index" transform="translate(-0.022)">
                                        <path id="Path_1168" data-name="Path 1168" d="M2.235,8.086a3.6,3.6,0,0,1-.584-.018l-.169.786.169-.786a.83.83,0,0,1-.622-.641,3.194,3.194,0,0,1,0-.548,8.679,8.679,0,0,1,.385-2.755A4.211,4.211,0,0,1,3.406,1.7C4.216,1.247,5.483,1,8.058,1h3.571c2.575,0,3.842.247,4.652.7a4.211,4.211,0,0,1,1.993,2.423,8.675,8.675,0,0,1,.385,2.755,3.2,3.2,0,0,1,0,.548l.791.144-.791-.144a.83.83,0,0,1-.622.641,3.6,3.6,0,0,1-.584.018A1.876,1.876,0,0,0,15.7,10.059a1.876,1.876,0,0,0,1.757,1.974,3.5,3.5,0,0,1,.573.018.843.843,0,0,1,.625.655,2.943,2.943,0,0,1-.006.52,7.652,7.652,0,0,1-.369,2.331,4.212,4.212,0,0,1-1.993,2.423c-.811.454-2.077.7-4.652.7H8.058c-2.575,0-3.842-.247-4.652-.7a4.212,4.212,0,0,1-1.993-2.423,7.652,7.652,0,0,1-.369-2.331,2.933,2.933,0,0,1-.006-.52.842.842,0,0,1,.625-.655,3.5,3.5,0,0,1,.573-.018,1.876,1.876,0,0,0,1.757-1.974A1.876,1.876,0,0,0,2.235,8.086Z" fill="none" stroke="#ff0000" strokeWidth={1}></path>
                                        <path id="Path_1169" data-name="Path 1169" d="M14.8,4a.8.8,0,0,1,.8.8V6.411a.8.8,0,0,1-1.607,0V4.8A.8.8,0,0,1,14.8,4Zm0,4.822a.8.8,0,0,1,.8.8v1.607a.8.8,0,0,1-1.607,0V9.625A.8.8,0,0,1,14.8,8.822Zm.8,5.625a.8.8,0,1,0-1.607,0v1.607a.8.8,0,0,0,1.607,0Z" transform="translate(-2.549 -0.589)" fill="#279692" fillRule="evenodd"></path>
                                    </g>
                                </svg>
                                <div className="text">
                                    <h5 className="font-bold" >{data && data.title}</h5>
                                    <span className="font-bold">قیمت: {data && data.minPrice}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-around me-auto mt-2">
                                <div className="d-flex">
                                    <div className="text">
                                        <span className="font-bold">ایرلاین رفت :</span>
                                    </div>
                                    <div className="text pe-2">
                                        {data &&
                                            <span>{data.transfers[0].transfer}</span>
                                        }
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="text">
                                        <span className="font-bold">ایرلاین برگشت :</span>
                                    </div>
                                    <div className="text pe-2">
                                        {data &&
                                            <span>
                                                {data.transfers[1].transfer}
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-tour col-xl-12 col-lg-12 col-12 d-flex flex-wrap justify-content-between border-bottom py-4">
                            <div className="right col-xl-5 col-lg-5 col-12">
                                <div className="gallery-image">
                                    <div className="image">
                                        <Slider data={data && data.endCity.images}/>
                                    </div>
                                </div>
                            </div>
                            <div className="left position-relative col-xl-7 col-lg-7 col-12">
                                <div className="vertical-data" style={{ display: "none" }}></div>
                                <div className="p-info__tour d-flex flex-wrap align-items-center justify-content-between col-xl-12 col-lg-12 me-3">
                                    <div className="c-info__tour d-flex align-items-center col-xl-12 col-gl-12">
                                        <div className="bg-white py-3">
                                            <div className="image d-flex align-items-center bg-white rounded shadow-sm py-3 px-3">
                                                <img src={data && data.transfers[0].logo} width={"35px"} height={"35px"} alt="company" />
                                            </div>
                                        </div>
                                        <div className="text pe-2">
                                            <div className="m-main-data d-flex align-items-center pb-1">
                                                <div className="prop pe-2">
                                                    <span className="font-bold">اطلاعات مبدا</span>
                                                </div>
                                                <div className="val pe-2">
                                                    <span>{data && data.stCity.name}</span>
                                                </div>
                                            </div>
                                            <div className="m-main-data d-flex align-items-center pb-1">
                                                <div className="prop pe-2">
                                                    <span className="font-bold">تاریخ و ساعت پرواز رفت</span>
                                                </div>
                                                <div className="val pe-2">
                                                    <span>{data && data.transfers[0].dateTime}</span>
                                                </div>
                                            </div>
                                            <div className="m-main-data d-flex align-items-center pb-1">
                                                <div className="prop pe-2">
                                                    <span className="font-bold">تاریخ ورود به هتل</span>
                                                </div>
                                                <div className="val pe-2">
                                                    <span className="ps-2">{data && data.stDate.split(' ')[0]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="c-info__tour bg-white d-flex align-items-center justify-content-center box-shadow-sm col-xl-12 col-lg-12 col-12 my-4">
                                        <div className="border-box box-right"></div>
                                        <div className="text d-flex align-items-center justify-content-center px-2">
                                            <div className="text">
                                                <span>مدت اقامت</span>
                                            </div>
                                            <div className="image d-flex align-items-center mx-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38"
                                                    viewBox="0 0 43.84 45.663">
                                                    <g id="Moon_2" data-name="Moon 2" transform="translate(0 0)">
                                                        <path id="Path_1046" data-name="Path 1046"
                                                            d="M42.014,30.781l1.689.695A1.827,1.827,0,0,0,41.2,29.147ZM18.3,1.827l1.474,1.079A1.827,1.827,0,0,0,17.9.043ZM33.6,30.938A17.4,17.4,0,0,1,16.363,13.383H12.709A21.052,21.052,0,0,0,33.6,34.591Zm7.594-1.79a16.909,16.909,0,0,1-7.594,1.79v3.653a20.562,20.562,0,0,0,9.23-2.177Zm-.872.939a19.078,19.078,0,0,1-17.6,11.923v3.653A22.731,22.731,0,0,0,43.7,31.476Zm-17.6,11.923A19.246,19.246,0,0,1,3.653,22.592H0a22.9,22.9,0,0,0,22.725,23.07ZM3.653,22.592A19.347,19.347,0,0,1,18.687,3.611L17.9.043A23,23,0,0,0,0,22.592Zm12.709-9.209A17.679,17.679,0,0,1,19.769,2.906L16.821.748a21.333,21.333,0,0,0-4.111,12.636Z"
                                                            transform="translate(0 0)" fill="#f5c238" />
                                                        <path isd="Path_1047" data-name="Path 1047"
                                                            d="M20.672,3.152a1.279,1.279,0,0,1,2.4,0L24.627,7.36a1.279,1.279,0,0,0,.756.755L29.59,9.672a1.279,1.279,0,0,1,0,2.4l-4.208,1.557a1.279,1.279,0,0,0-.756.755L23.07,18.59a1.279,1.279,0,0,1-2.4,0l-1.557-4.208a1.278,1.278,0,0,0-.755-.755L14.152,12.07a1.279,1.279,0,0,1,0-2.4L18.36,8.115a1.278,1.278,0,0,0,.755-.755Z"
                                                            transform="translate(11.009 1.915)" fill="none" stroke="#347557"
                                                            strokeLinecap="round" strokeWidth={3} />
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="text">
                                                <span className="ps-1 font-bold">{data && data.nightNum} شب</span>
                                                <span className="pe-1 font-bold ps-2">{data && data.dayNum} روز</span>
                                            </div>
                                        </div>
                                        <div className="border-box box-left"></div>
                                    </div>
                                    <div className="c-info__tour d-flex flex-row-reverse align-items-center col-xl-12 col-lg-12 col-12">
                                        <div className="bg-white py-3">
                                            <div className="image d-flex align-items-center bg-white rounded shadow-sm py-3 px-3">
                                                <img src={data && data.transfers[1].logo} width={"35px"} height={"35px"} alt="company" />
                                            </div>
                                        </div>
                                        <div className="text pe-2 ps-3">
                                            <div className="m-main-data d-flex flex-row-reverse align-items-center pb-1">
                                                <div className="prop pe-2">
                                                    <span className="font-bold">اطلاعات مقصد</span>
                                                </div>
                                                <div className="val pe-2">
                                                    <span className="">{data && data.endCity.name}</span>
                                                </div>
                                            </div>
                                            <div className="m-main-data d-flex flex-row-reverse align-items-center pb-1">
                                                <div className="prop pe-2">
                                                    <span className="font-bold">تاریخ و ساعت پرواز برگشت</span>
                                                </div>
                                                <div className="val pe-2">
                                                    <span>{data && data.transfers[1].dateTime}</span>
                                                </div>
                                            </div>
                                            <div className="m-main-data d-flex flex-row-reverse align-items-center pb-1">
                                                <div className="prop pe-2">
                                                    <span className="font-bold">تاریخ خروج از هتل</span>
                                                </div>
                                                <div className="val ps-2">
                                                    <span className="">{data && data.stDate.split(' ')[0]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* section 2 */}
                <section className="select-hotel mt-4">
                    <div className="container">
                        <div className="p-data">
                            <div className="title d-flex align-items-center justify-content-between">
                                <div className="d-flex justify-content-start ps-2 ms-2">
                                    <div className="d-flex align-items-center text-4b ps-2 pb-2">
                                        <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="30.401" height="30.401" viewBox="0 0 17.401 17.401">
                                            <g id="Document_Align_Center_1" data-name="Document Align Center 1" transform="translate(1 1)">
                                                <path id="Path_895" data-name="Path 895" d="M1,8.7a19.485,19.485,0,0,0,.323,4.079A4.335,4.335,0,0,0,2.4,15a4.336,4.336,0,0,0,2.22,1.078A19.488,19.488,0,0,0,8.7,16.4a19.488,19.488,0,0,0,4.079-.323A4.335,4.335,0,0,0,15,15a4.335,4.335,0,0,0,1.078-2.22A19.488,19.488,0,0,0,16.4,8.7a19.488,19.488,0,0,0-.323-4.079A4.336,4.336,0,0,0,15,2.4a4.335,4.335,0,0,0-2.22-1.078A19.485,19.485,0,0,0,8.7,1a19.485,19.485,0,0,0-4.079.323A4.335,4.335,0,0,0,2.4,2.4a4.335,4.335,0,0,0-1.078,2.22A19.485,19.485,0,0,0,1,8.7Z" transform="translate(-1 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                                <path id="Path_896" data-name="Path 896" d="M10,7h2.8" transform="translate(-3.699 -2.8)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                                <path id="Path_897" data-name="Path 897" d="M7,12h7" transform="translate(-2.8 -4.299)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                                <path id="Path_898" data-name="Path 898" d="M10,17h2.8" transform="translate(-3.699 -5.799)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                            </g>
                                        </svg>
                                        <h5 className="font-bold mb-0">انـتخاب هــتل</h5>
                                    </div>
                                </div>
                                {/* <div className="c-btn">
                                    <button
                                        className="ancher f-15 btn-effect bg-custom-color text-dark font-ExtraBold py-2 ps-2 pe-3 f-bold">
                                        <div className="line-effect bg-dark-light"></div>
                                        <svg className="ml-30" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 24 24">
                                            <g id="Right" transform="translate(1 1)">
                                                <path id="Path_1110" data-name="Path 1110"
                                                    d="M23,12a27.833,27.833,0,0,1-.462,5.827A6.193,6.193,0,0,1,21,21a6.193,6.193,0,0,1-3.172,1.54A27.838,27.838,0,0,1,12,23a27.838,27.838,0,0,1-5.827-.462A6.193,6.193,0,0,1,3,21a6.193,6.193,0,0,1-1.54-3.172A27.838,27.838,0,0,1,1,12a27.838,27.838,0,0,1,.462-5.827A6.193,6.193,0,0,1,3,3a6.193,6.193,0,0,1,3.172-1.54A27.833,27.833,0,0,1,12,1a27.833,27.833,0,0,1,5.827.462A6.193,6.193,0,0,1,21,3a6.193,6.193,0,0,1,1.54,3.172A27.833,27.833,0,0,1,23,12Z"
                                                    transform="translate(-1 -1)" fill="none" stroke="#292929"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}></path>
                                                <path id="Path_1111" data-name="Path 1111" d="M14,8l-4,4,4,4"
                                                    transform="translate(-1 -1)" fill="none" stroke="#292929"
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}></path>
                                            </g>
                                        </svg>
                                        دانلود فایل PDF
                                    </button>
                                </div> */}
                            </div>
                            <div className="p-info__tour col-xl-12 col-lg-12 col-12 mt-2 border-bottom pb-4">
                                <div className="p-thead d-flex align-items-center col-xl-12 col-lg-12 col-12">
                                    <div className="c-thead text-center rounded py-2 me-2 isDesktop">
                                        <span className="font-bold font-size-16">اطلاعات هتل</span>
                                    </div>
                                    <div className="c-thead text-center rounded py-2 me-2 isDesktop">
                                        <span className="font-bold font-size-16">دو تخته(هرنفر)</span>
                                    </div>
                                    <div className="c-thead text-center rounded py-2 me-2 isDesktop">
                                        <span className="font-bold font-size-16">سینگل</span>
                                    </div>
                                    <div className="c-thead text-center rounded py-2 me-2 isDesktop">
                                        <span className="font-bold font-size-16">کودک با تخت</span>
                                    </div>
                                    <div className="c-thead text-center rounded py-2 me-2 isDesktop">
                                        <span className="font-bold font-size-16">کودک بدون تخت</span>
                                    </div>
                                    <div className="c-thead text-center rounded py-2 me-2 isDesktop">
                                        <span className="font-bold font-size-16">سن کودک</span>
                                    </div>
                                </div>
                                {data && data.packages.map((pack)=>(
                                    <div className="p-detail col-xl-12 col-lg-12 mt-2" key={pack.id}>
                                        <div className="d-detail position-relative col-xl-12 col-lg-12 col-12 d-flex flex-wrap align-items-center bg-white py-2 px-2 mb-2">
                                            <div className="c-detail ms-2">
                                                {pack.offered &&
                                                <div className="position-absolute bg-danger py-1 px-1 rounded-2">
                                                    <div className="text">
                                                        <span className="text-white font-size-16">ویژه</span>
                                                    </div>
                                                </div>
                                                }
                                                <div className="info-detail pos-relative d-flex align-items-center">
                                                    <a href="">
                                                        <div className="image d-flex align-items-center">
                                                            <img src={pack.hotel.thumbnail} width="100px" height="100px" className="rounded-2" alt="" />
                                                        </div>
                                                    </a>
                                                    <div className="text d-flex flex-column justify-content-between mt-2 pe-2 w-100">
                                                        <span className="font-bold pb-1 font-size-13">{pack.hotel.nameEn}</span>
                                                        <span className="font-bold pb-1">{pack.hotel.name}</span>
                                                        <div className="star d-flex align-items-center pb-1">
                                                            <div className="d-flex align-items-center">
                                                                <div className="image d-flex align-items-center">
                                                                {Array.from(Array(parseInt(pack.hotel.stars)), (e, i) => {
                                                                return (
                                                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="19"
                                                                        height="19" viewBox="0 0 21.443 21.387">
                                                                        <path id="Star"
                                                                            d="M10.749,1c.915,0,2.352,4.154,2.871,5.751a.916.916,0,0,0,.84.632c1.666.057,5.983.3,5.983,1.273s-3.077,3.38-4.335,4.328A.915.915,0,0,0,15.789,14c.512,1.585,1.742,5.7.952,6.343s-4.1-1.885-5.447-2.963a.919.919,0,0,0-1.147,0c-1.35,1.078-4.669,3.6-5.392,2.964s.431-4.772.912-6.351a.914.914,0,0,0-.324-1C4.093,12.047,1,9.619,1,8.655S5.326,7.438,6.988,7.382a.916.916,0,0,0,.838-.625C8.357,5.165,9.833,1,10.749,1Z"
                                                                            fill="#f7db06" stroke="#f7db06"
                                                                            strokeLinecap="round" strokeLinejoin="round"
                                                                            strokeWidth={2} />
                                                                    </svg>)
                                                            })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            {/* {(parseInt(pack.hotel.stars))} */}
                                                            
                                                                <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="20"
                                                                    height="20" viewBox="0 0 23.528 26.039">
                                                                    <g id="Location" transform="translate(0.028)">
                                                                        <path id="Path_1011" data-name="Path 1011"
                                                                            d="M1.152,12.976a14.6,14.6,0,0,0,4.131,7.545,25.71,25.71,0,0,0,5.471,4.223,1.912,1.912,0,0,0,1.962,0,25.71,25.71,0,0,0,5.471-4.223,14.6,14.6,0,0,0,4.131-7.545,10.842,10.842,0,0,0-1.656-7.829C19.058,2.823,16.236,1,11.736,1S4.413,2.823,2.809,5.147A10.842,10.842,0,0,0,1.152,12.976Z"
                                                                            transform="translate(0 0)" fill="none"
                                                                            stroke="#333333" strokeLinecap="round"
                                                                            strokeLinejoin="round" strokeWidth={2}>
                                                                        </path>
                                                                        <circle id="Ellipse_49" data-name="Ellipse 49"
                                                                            cx="2.928" cy="2.928" r="2.928"
                                                                            transform="translate(14.663 12.712) rotate(180)"
                                                                            fill="none" stroke="#333333" strokeWidth={2}>
                                                                        </circle>
                                                                    </g>
                                                                </svg>
                                                            
                                                            <span className="f-18 text-33 f-bold pr-4">{pack.hotel.location}</span>
                                                        </div>
                                                    </div>
                                                    <div className="image left-border-line">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1" height="110"
                                                            viewBox="0 0 1 186.408">
                                                            <line id="Line_87" data-name="Line 87" y2="186.408"
                                                                transform="translate(0.5)" fill="none" stroke="#333"
                                                                strokeWidth={1} strokeDasharray={10} />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="c-detail">
                                                <div className="info-price position-relative d-flex align-items-start mx-2">
                                                    <div className="text d-flex flex-column align-items-center w-100 py-3">
                                                        <span className="text-show-m mb-2 color-base-color font-bold d-none">دو تخته (هر نفر)</span>
                                                        {data.defineTour &&<span className="font-font-size-14 font-bold">{ pack.prices.twinRate} تومان</span>}
                                                        {!data.defineTour &&<span className="font-font-size-14 font-bold">{pack.prices.twin} {pack.rate.name}</span>}
                                                        {/* <span className="font-font-size-16 font-bold">تومان</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {data && data.type && <>
                                            <div className="c-detail">
                                                <div className="info-price position-relative d-flex align-items-start mx-2">
                                                    <div className="text d-flex flex-column align-items-center w-100 py-3">
                                                        <span className="text-show-m mb-2 color-base-color font-bold d-none">سه تخته (هر نفر)</span>
                                                        {data.defineTour &&<span className="font-font-size-14 font-bold">{ pack.prices.tripleRate} تومان</span>}
                                                        {!data.defineTour &&<span className="font-font-size-14 font-bold">{pack.prices.triple} {pack.rate.name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="c-detail">
                                                <div className="info-price position-relative d-flex align-items-start mx-2">
                                                    <div className="text d-flex flex-column align-items-center w-100 py-3">
                                                        <span className="text-show-m mb-2 color-base-color font-bold d-none">چهار تخته (هر نفر)</span>
                                                        {data.defineTour &&<span className="font-font-size-14 font-bold">{ pack.prices.quadRate} تومان</span>}
                                                        {!data.defineTour &&<span className="font-font-size-14 font-bold">{pack.prices.quad} {pack.rate.name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                            }

                                            {data && !data.type && 
                                            <div className="c-detail">
                                                <div className="info-price position-relative d-flex align-items-start mx-2">
                                                    <div
                                                        className="text d-flex flex-column align-items-center w-100 py-3">
                                                        <span className="text-show-m mb-2 color-base-color font-bold d-none"> سینگل</span>
                                                        {data.defineTour &&<span className="font-font-size-14 font-bold">{ pack.prices.singleRate} تومان</span>}
                                                        {!data.defineTour &&<span className="font-font-size-14 font-bold">{pack.prices.single} {pack.rate.name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            {data && !data.type && 

                                            <div className="c-detail">
                                                <div className="info-price position-relative d-flex align-items-start mx-2">
                                                    <div className="text d-flex flex-column align-items-center w-100 py-3">
                                                        <span className="text-show-m mb-2 color-base-color font-bold d-none">کودک با تخت</span>
                                                        {data.defineTour &&<span className="font-font-size-14 font-bold">{ pack.prices.cwbRate} تومان</span>}
                                                        {!data.defineTour &&<span className="font-font-size-14 font-bold">{pack.prices.cwb} {pack.rate.name}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            <div className="c-detail">
                                                <div className="info-price position-relative d-flex align-items-start mx-2">
                                                    <div className="text d-flex flex-column align-items-center w-100 py-3">
                                                        <span className="text-show-m mb-2 color-base-color font-bold d-none">کودک بدون تخت</span>
                                                        <span className="font-font-size-14 font-bold">{ pack.prices.cnb} تومان</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="c-detail child-number d-flex flex-column text-center ml-3 py-3">
                                                <span className="text-show-m mb-2 color-base-color font-bold d-none">سن کودک</span>
                                                <span className="font-size-16 font-bold">{pack.prices.age}</span>
                                            </div>
                                            <div className="c-btn request-data">
                                                <button className="ancher bg-success text-white font-size-13 py-2 px-4 rounded-3 mt-2" onClick={() =>{setShow(true);setPackData({tourId:pack.id});console.log(pack.id);}}>
                                                    درخواست رزرو
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                 ))} 
                            </div>
                        </div>
                    </div>
                </section>
                {/* section 3 */}
                <section className="description mt-4">
                    <div className="container">
                        <div className="p-data">
                            <div className="title d-flex align-items-center justify-content-between">
                                <div className="d-flex justify-content-start ps-2 ms-2 pb-2">
                                    <div className="d-flex align-items-center text-4b ps-2 pb-2">
                                        <h5 className="font-bold mb-0">توضیــحات بیشتر</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="p-info__descrip flex-100 mt-2 border-bottom pb-4">
                                <div className="p-descrip">
                                    <div
                                        className="c-descrip bg-white border-base-color d-flex align-items-start pt-3 pb-3 px-3 mb-3">
                                        <div className="image ps-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85"
                                                viewBox="0 0 183.266 183.266">
                                                <g id="Credit_Card" data-name="Credit Card" transform="translate(5 5)"
                                                    opacity="0.8">
                                                    <path id="Path_883" data-name="Path 883"
                                                        d="M1,87.633c0,19.277,1.043,34.23,3.635,45.892C7.207,145.1,11.2,152.939,16.762,158.5s13.407,9.556,24.979,12.128c11.661,2.591,26.615,3.635,45.892,3.635s34.23-1.044,45.892-3.635c11.572-2.572,19.414-6.563,24.979-12.128s9.556-13.407,12.128-24.979c2.591-11.662,3.635-26.614,3.635-45.892s-1.044-34.23-3.635-45.892c-2.572-11.572-6.563-19.414-12.128-24.979S145.1,7.207,133.524,4.635C121.863,2.043,106.91,1,87.633,1S53.4,2.043,41.741,4.635C30.169,7.207,22.327,11.2,16.762,16.762S7.207,30.169,4.635,41.741C2.043,53.4,1,68.356,1,87.633Z"
                                                        transform="translate(-1 -1)" fill="none" stroke="#279692"
                                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={10} />
                                                    <path id="Path_884" data-name="Path 884" d="M2.5,8H152.138"
                                                        transform="translate(9.314 47.13)" fill="none" stroke="#279692"
                                                        strokeLinecap="square" strokeLinejoin="round" strokeWidth={10} />
                                                    <path id="Path_885" data-name="Path 885" d="M14,18H45.5"
                                                        transform="translate(88.384 115.887)" fill="none" stroke="#279692"
                                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={10} />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text">
                                            <div className="title py-3">
                                                <span className="font-size-23 font-bold text-base-color">مدارک لازم</span>
                                            </div>
                                            <div className="paragraph pt-2 pe-3">
                                                <p className="font-size-16 font-bold">
                                                    {data && data.documents}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="c-descrip bg-white border-base-color d-flex align-items-start pt-3 pb-3 px-3 mb-3">
                                        <div className="image ps-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85"
                                                viewBox="0 0 183.266 183.266">
                                                <g id="Verified" transform="translate(5 5)" opacity="0.8">
                                                    <path id="Path_1193" data-name="Path 1193"
                                                        d="M64.13,10,24.751,49.379,9,33.627"
                                                        transform="translate(54.006 60.881)" fill="none" stroke="#279692"
                                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={10} />
                                                    <path id="Path_1194" data-name="Path 1194"
                                                        d="M73.385,8.077a17.88,17.88,0,0,1,28.5,0l8.937,11.785a8.941,8.941,0,0,0,8.342,3.455L133.812,21.3a17.881,17.881,0,0,1,20.15,20.15l-2.015,14.653a8.941,8.941,0,0,0,3.455,8.342l11.786,8.937a17.881,17.881,0,0,1,0,28.5L155.4,110.817a8.942,8.942,0,0,0-3.455,8.342l2.015,14.653a17.881,17.881,0,0,1-20.15,20.15l-14.653-2.015a8.942,8.942,0,0,0-8.342,3.455l-8.937,11.786a17.881,17.881,0,0,1-28.5,0L64.448,155.4a8.941,8.941,0,0,0-8.342-3.455l-14.653,2.015a17.881,17.881,0,0,1-20.15-20.15l2.015-14.653a8.941,8.941,0,0,0-3.455-8.342L8.077,101.881a17.88,17.88,0,0,1,0-28.5l11.785-8.937a8.94,8.94,0,0,0,3.455-8.342L21.3,41.454A17.881,17.881,0,0,1,41.454,21.3l14.653,2.015a8.94,8.94,0,0,0,8.342-3.455Z"
                                                        transform="translate(-1 -1)" fill="none" stroke="#279692"
                                                        strokeWidth={10} />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text">
                                            <div className="title py-3">
                                                <span className="font-size-23 font-bold text-base-color">خدمات آژانس</span>
                                            </div>
                                            <div className="paragraph pt-2 pe-2">
                                                <p className="font-size-16 font-bold">
                                                    {data && data.services}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="c-descrip bg-white border-second-color d-flex align-items-start pt-3 pb-3 px-3 mb-3">
                                        <div className="image ps-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85"
                                                viewBox="0 0 183.266 183.266">
                                                <g id="Message_Align_Left" data-name="Message Align Left"
                                                    transform="translate(5 5)" opacity="0.8">
                                                    <path id="Path_1028" data-name="Path 1028"
                                                        d="M87.633,1c19.315,0,34.352.877,46.112,3.14,11.721,2.255,19.6,5.78,25.12,10.644,10.965,9.665,15.4,27.131,15.4,62.348,0,22.694-2.037,39.393-7.524,50.271a26.145,26.145,0,0,1-10.163,11.345c-4.24,2.472-9.926,4.014-17.753,4.014-10.09,0-17.663,2.266-23.585,6.278-5.78,3.917-9.267,9.044-11.86,13.126q-.588.925-1.107,1.752c-2.174,3.452-3.582,5.686-5.536,7.439-1.741,1.563-4.174,2.909-9.1,2.909s-7.363-1.346-9.1-2.909C76.578,169.6,75.17,167.37,73,163.918q-.521-.828-1.107-1.753c-2.594-4.081-6.081-9.208-11.861-13.125-5.922-4.012-13.5-6.278-23.585-6.278-7.785,0-13.452-1.581-17.692-4.1A26.8,26.8,0,0,1,8.538,127.092C3.032,116.08,1,99.352,1,77.132c0-34.769,4.424-52.281,15.425-62.06,5.535-4.92,13.427-8.511,25.133-10.823C53.307,1.928,68.334,1,87.633,1Z"
                                                        transform="translate(-1 -1)" fill="none" stroke="#ff0000"
                                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={10} />
                                                    <path id="Path_1029" data-name="Path 1029" d="M7,9H38.5"
                                                        transform="translate(40.254 54.006)" fill="none" stroke="#ff0000"
                                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={10} />
                                                    <path id="Path_1030" data-name="Path 1030" d="M7,13H85.757"
                                                        transform="translate(40.254 81.508)" fill="none" stroke="#ff0000"
                                                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={10} />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="text">
                                            <div className="title py-3">
                                                <span className="font-size-23 font-bold">توضیحات</span>
                                            </div>
                                            <div className="paragraph pt-2 pe-2">
                                                <p className="font-size-16 font-bold">
                                                {data && data.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* section 4 */}
                <section className="mt-4">
                    <div className="container">
                        <div className="p-data">
                            <div className="title d-flex align-items-center justify-content-between">
                                <div className="d-flex justify-content-start ps-2 ms-2 pb-2">
                                    <div className="d-flex align-items-center text-4b ps-2 pb-2">
                                        <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="30.436" height="30.432" viewBox="0 0 52.436 49.432">
                                            <g id="Notification_2" data-name="Notification 2" transform="translate(-0.473)">
                                                <path id="Path_1062" data-name="Path 1062" d="M9,25.606C13.021,28.2,18.947,26.893,20.851,23" transform="translate(8.316 21.455)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                                <path id="Path_1063" data-name="Path 1063" d="M28.365,16.851A11.411,11.411,0,0,0,16.513,5" transform="translate(15.643 3.901)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                                <path id="Path_1064" data-name="Path 1064" d="M36.266,20.752C36.266,8.9,28.365,1,16.513,1" transform="translate(15.643)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                                <path id="Path_1065" data-name="Path 1065" d="M14.625,4.94q-.011-.05-.024-.1a1.975,1.975,0,0,0-3.816,1.022q.013.05.029.1C4.673,8.593.588,17.387,3.683,25.147c1.148,2.321-.049,4.034-1.294,5.817C1.212,32.649-.008,34.4.665,36.779c.9,3.35,3.292,4.655,6.334,4.8,0,0,5.656.587,14.9-1.889S35.74,33.882,35.74,33.882c2.56-1.651,3.957-4.07,3.083-7.328-.646-2.411-2.576-3.315-4.427-4.182-1.961-.919-3.835-1.8-4-4.382C29.194,9.722,21.259,4.149,14.625,4.94ZM7.73,29.355a7.819,7.819,0,0,0-.423-5.787,11.653,11.653,0,0,1,.385-9.025,9.156,9.156,0,0,1,5.487-5.232l1.072-.287a9.156,9.156,0,0,1,7.368,1.788,11.653,11.653,0,0,1,4.846,7.624,7.821,7.821,0,0,0,2.508,5.212,13.438,13.438,0,0,0,3.511,2.193l.067.031c2.215,1.04,2.336,1.262,2.455,1.706a2.231,2.231,0,0,1-.028,1.594A3.553,3.553,0,0,1,33.6,30.562l-.09.058-.074.054-.006,0-.1.067c-.1.067-.271.178-.513.326-.482.294-1.246.733-2.291,1.251a52.254,52.254,0,0,1-9.655,3.558,52.266,52.266,0,0,1-10.14,1.746c-1.164.074-2.045.076-2.61.062-.282-.007-.486-.018-.607-.025L7.4,37.653H7.391L7.3,37.643l-.107-.005a3.613,3.613,0,0,1-1.9-.493,2.235,2.235,0,0,1-.812-1.388l-.007-.025L4.467,35.7c-.107-.378-.154-.592,1.266-2.628l.043-.061h0A13.57,13.57,0,0,0,7.73,29.355Z" transform="translate(0 2.317)" fill="#279692" fillRule="evenodd" />
                                            </g>
                                        </svg>
                                        <h5 className="font-bold mb-0">تــورهای مشابــه</h5>
                                    </div>
                                </div>
                            </div>
                            {/* parent data */}
                            <div className="w-100 col-xl-12 col-lg-12 w-100 d-flex flex-column">
                                {/* child data */}
                                {data && data.tours.map((item,index)=>(
                                    <div className="tour-item col-xl-12 col-lg-12 mb-2" key={index} onClick={() => slugHandler(item.slug)}>
                                        {/* {console.log(item)} */}
                                        <div className="tour-city">
                                            <svg className="ms-3" xmlns="http://www.w3.org/2000/svg" width="41.265" height="48.155" viewBox="0 0 41.265 48.155">
                                                <g id="location2" transform="translate(1.549 1.5)">
                                                    <path id="Path_1011" data-name="Path 1011" d="M1.271,23.5A27.9,27.9,0,0,0,8.614,37.67,46.066,46.066,0,0,0,18.34,45.6a3.243,3.243,0,0,0,3.487,0,46.066,46.066,0,0,0,9.725-7.932A27.9,27.9,0,0,0,38.895,23.5,21.308,21.308,0,0,0,35.951,8.79C33.1,4.425,28.083,1,20.083,1S7.067,4.425,4.215,8.79A21.308,21.308,0,0,0,1.271,23.5Z" transform="translate(-1 -1)" fill="none" stroke="#e0e0e0" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                                    <circle id="Ellipse_49" data-name="Ellipse 49" cx="5.204" cy="5.204" r="5.204" transform="translate(24.288 23.697) rotate(180)" fill="none" stroke="#e0e0e0" strokeWidth={2} />
                                                </g>
                                            </svg>
                                            <div className="info-tour-city">
                                                <Link href={'/tour'}>
                                                    <strong>{item.title}</strong>
                                                </Link>
                                                <div className="text-price pt-1">
                                                    <small className="title-price">شروع قیمت از :</small>
                                                    <strong className="price-tour color-base-color me-2">
                                                        {item.minPrice}
                                                        <small className="pe-1">تومان </small>
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tour-days">
                                            <div className="night mb-2">
                                                <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="15.437" height="16.078" viewBox="0 0 15.437 16.078">
                                                    <path id="Moon_1" data-name="Moon 1" d="M14.794,10.838l.595.245a.643.643,0,0,0-.883-.82ZM6.442.643l.519.38A.643.643,0,0,0,6.3.015Zm5.39,10.25a6.126,6.126,0,0,1-6.07-6.181H4.475a7.413,7.413,0,0,0,7.356,7.467Zm2.674-.63a5.954,5.954,0,0,1-2.674.63V12.18a7.24,7.24,0,0,0,3.25-.766Zm-.307.33a6.717,6.717,0,0,1-6.2,4.2v1.286a8,8,0,0,0,7.387-5ZM8,14.792A6.777,6.777,0,0,1,1.287,7.955H0a8.063,8.063,0,0,0,8,8.123ZM1.287,7.955A6.812,6.812,0,0,1,6.58,1.271L6.3.015A8.1,8.1,0,0,0,0,7.955ZM5.762,4.712a6.225,6.225,0,0,1,1.2-3.689L5.923.263A7.512,7.512,0,0,0,4.475,4.712Z" transform="translate(0)" fill="#279692" />
                                                </svg>
                                                <span>{item.nightNum} شب</span>
                                            </div>
                                            <div className="day d-flex justify-content-start">
                                                <svg className="ms-2" id="Sun" xmlns="http://www.w3.org/2000/svg" width="21.159" height="21.159" viewBox="0 0 21.159 21.159">
                                                    <path id="Path_1144" data-name="Path 1144" d="M7,12.3c-.024,2.225.347,3.463,1.064,4.18s1.973,1.1,4.225,1.1,3.492-.382,4.205-1.1,1.084-1.96,1.084-4.19-.37-3.471-1.084-4.19S14.542,7,12.289,7,8.811,7.382,8.1,8.1,7.024,10.063,7,12.3Z" transform="translate(-1.71 -1.71)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                                    <path id="Path_1145" data-name="Path 1145" d="M14.511.756A.756.756,0,0,0,13,.756ZM13,2.267a.756.756,0,0,0,1.511,0ZM13,.756V2.267h1.511V.756Z" transform="translate(-3.176)" fill="#279692" />
                                                    <path id="Path_1146" data-name="Path 1146" d="M14.511,24.756a.756.756,0,0,0-1.511,0ZM13,26.267a.756.756,0,0,0,1.511,0Zm0-1.511v1.511h1.511V24.756Z" transform="translate(-3.176 -5.864)" fill="#279692" />
                                                    <path id="Path_1147" data-name="Path 1147" d="M26.267,14.511a.756.756,0,0,0,0-1.511ZM24.756,13a.756.756,0,0,0,0,1.511Zm1.511,0H24.756v1.511h1.511Z" transform="translate(-5.864 -3.176)" fill="#279692" />
                                                    <path id="Path_1148" data-name="Path 1148" d="M2.267,14.511a.756.756,0,0,0,0-1.511ZM.756,13a.756.756,0,0,0,0,1.511Zm1.511,0H.756v1.511H2.267Z" transform="translate(0 -3.176)" fill="#279692" />
                                                    <path id="Path_1149" data-name="Path 1149" d="M4.29,3.221A.756.756,0,0,0,3.221,4.29Zm0,2.137A.756.756,0,0,0,5.359,4.29ZM3.221,4.29,4.29,5.359,5.359,4.29,4.29,3.221Z" transform="translate(-0.733 -0.733)" fill="#279692" />
                                                    <path id="Path_1150" data-name="Path 1150" d="M4.29,24.359A.756.756,0,1,1,3.221,23.29Zm0-2.137A.756.756,0,0,1,5.359,23.29ZM3.221,23.29,4.29,22.221,5.359,23.29,4.29,24.359Z" transform="translate(-0.733 -5.375)" fill="#279692" />
                                                    <path id="Path_1151" data-name="Path 1151" d="M23.29,3.221A.756.756,0,1,1,24.359,4.29Zm0,2.137A.756.756,0,0,1,22.221,4.29ZM24.359,4.29,23.29,5.359,22.221,4.29,23.29,3.221Z" transform="translate(-5.375 -0.733)" fill="#279692" />
                                                    <path id="Path_1152" data-name="Path 1152" d="M23.29,24.359a.756.756,0,1,0,1.069-1.069Zm0-2.137a.756.756,0,0,0-1.069,1.069Zm1.069,1.069L23.29,22.221,22.221,23.29l1.069,1.069Z" transform="translate(-5.375 -5.375)" fill="#279692" />
                                                </svg>
                                                <span> {data.dayNum} روز</span>
                                            </div>
                                        </div>
                                        <div className="tour-night d-flex align-items-center">
                                            <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="21.429" height="17.709" viewBox="0 0 21.429 17.709">
                                                <g id="Up_Down_1" data-name="Up Down 1" transform="translate(21.015 17.294) rotate(180)">
                                                    <path id="Path_1173" data-name="Path 1173" d="M1,11.23l4.65,4.65m0,0V1m0,14.88,4.65-4.65" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                                    <path id="Path_1174" data-name="Path 1174" d="M11,5.65,15.65,1m0,0V15.88M15.65,1,20.3,5.65" transform="translate(-0.7)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                                </g>
                                            </svg>
                                            <div className="d-flex flex-column">
                                                <span className="from text-dark">{item.createdAt.split('T')[0]}</span>
                                                <span className="to text-dark">{item.expireDate.split(' ')[0]}</span>
                                            </div>
                                        </div>
                                        <div className="type">
                                            <img width="28" src={data && data.transfers[0].logo} />
                                            <span className="text-dark me-2">{item.transfers[0].transfer}</span>
                                        </div>
                                            <div className="ino-tour-btn" >
                                        <a href={'/tour'}>
                                                {/* <span className="text-mobi-btn">جزییات</span> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="27.414" height="18.453" viewBox="0 0 27.414 18.453">
                                                    <path id="Right_Arrow_2" data-name="Right Arrow 2" d="M18.188,1,26,8.812m0,0H1m25,0-7.812,7.813" transform="translate(27.414 18.039) rotate(180)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                                </svg>
                                        </a>
                                            </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* footer */}
                <Footer />
            </div>
            {show && 
            <PopUp opened={show} closePopUp={setShow}>
                <RequestTour setOpen={setOpen} messages={messages} setMessages={setMessages} setShow={setShow} packData={packData} setPackData={setPackData} />
            </PopUp>
            }
            {/* {messages.message !=='' &&
                    <div> */}
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {messages.message}
                    </Alert>
                </Snackbar>
                    {/* </div>
            } */}
        </div>
    );
};

export default tour;