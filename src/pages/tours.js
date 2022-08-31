import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { tourSlug } from '../jotai/jotai';
import Link from 'next/link';
import NavBar from "./../sources/component/NavBar.component";

import Footer from '../sources/component/Footer.component';
//import '../../styles/manager.module.scss'

const tours = () => {
    const [data, setData] = useState(null)
    const [slug, setSlug] = useAtom(tourSlug)
    const getData = async () => {
        const val = await axios.post('https://api.hamnavaz.com/api/v1/tour/getTours')
        setData(val.data.data)
    }
    useEffect(() => {
        getData();
        console.log(data);
    }, [])
    const slugHandler = (slug) => {
        setSlug(slug)
        localStorage.setItem("slug", JSON.stringify(slug))
    }
    return (
        <div>
            <div className="mt-5 bodyVar">
                <NavBar />
                <div className="container mt-5 pt-4">
                    <div className="d-flex flex-column mb-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <svg className="ms-3" xmlns="http://www.w3.org/2000/svg" width="30.326" height="30.086" viewBox="0 0 14.326 17.086">
                                    <g id="Bookmark" transform="translate(1 1)">
                                        <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                        <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                    </g>
                                </svg>
                                <div className="text">
                                    <h5 className="font-bold">لیست تورها</h5>
                                    <h6>مشاهده مناسب ترین تور های لحظه آخری</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bottom d-flex align-items-center mt-3">
                            <div className="border-right"></div>
                            <div className="border-left"></div>
                        </div>
                    </div>
                    {/* <div  classNameName="m-2" > */}
                    {data && data.map((item) => (
                        <div onClick={() => slugHandler(item.slug)} key={item.id} className="w-100 col-xl-12 col-lg-12 w-100 d-flex flex-column">
                            <div className="tour-item col-xl-12 col-lg-12 mb-3">
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
                                        <span className="font-size-14">{item.nightNum} شب</span>
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
                                        <span className="font-size-14">{item.dayNum} روز</span>
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
                                        <span className="from text-dark font-size-14 pt-1">{item.transfers[0].dateTime.split(' ')[0]}</span>
                                        <span className="to text-dark font-size-14 pt-1">{item.transfers[1].dateTime.split(' ')[0]}</span>
                                    </div>
                                </div>
                                <div className="type">
                                    <img width="28" src={item.transfers[0].logo} />
                                    <span className="text-dark me-2 font-size-14">{item.transfers[0].transfer}</span>
                                </div>
                                <Link href={'/tour'}>
                                    <div className="ino-tour-btn">
                                        {/* <span className="text-mobi-btn">جزییات</span> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27.414" height="18.453" viewBox="0 0 27.414 18.453">
                                            <path id="Right_Arrow_2" data-name="Right Arrow 2" d="M18.188,1,26,8.812m0,0H1m25,0-7.812,7.813" transform="translate(27.414 18.039) rotate(180)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                    {/* </div> */}
                </div>



                {/* hotel */}
                <div className="container mt-5 pt-4">
                    <div className="d-flex flex-column mb-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <svg className="ms-3" xmlns="http://www.w3.org/2000/svg" width="30.326" height="30.086" viewBox="0 0 14.326 17.086">
                                    <g id="Bookmark" transform="translate(1 1)">
                                        <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                        <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                    </g>
                                </svg>
                                <div className="text">
                                    <h5 className="font-bold">لیست هتل ها</h5>
                                    <h6>مشاهده تمامی هتل ها</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bottom d-flex align-items-center mt-3">
                            <div className="border-right"></div>
                            <div className="border-left"></div>
                        </div>
                    </div>
                    {/* patent hotel */}
                    <div className="hotel-list d-flex align-items-center flex-wrap">
                        {/* child */}
                        <div className="c-hotel mb-3">
                            <div className="gallery">
                                <div className="image">
                                    <img src="/images/picture2.jpg" width={'100%'} height={'280px'} />
                                </div>
                            </div>
                            <div className="py-3 px-2">
                                {/* text */}
                                <div className="text-title">
                                    <h6 className="font-bold">عنوان هتل برای تست</h6>
                                </div>
                                {/* map */}
                                <div className="map d-flex align-items-center mb-2" style={{ height: 50 }}>
                                    <div className="image ps-2">
                                        <svg className="rotate-data" width="30" height="30" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.7773 14.7178C19.9496 15.3347 21.7046 16.2898 23.3767 17.3204C24.4074 17.9558 25.3897 18.6094 26.179 19.2218C27.0002 19.8589 27.5026 20.3693 27.6957 20.7046C27.8887 21.0398 28.0785 21.7312 28.2183 22.7627C28.3527 23.7542 28.4262 24.9338 28.4596 26.1463C28.5139 28.1134 28.4615 30.1145 28.4083 31.4408C27.236 30.8238 25.4811 29.8687 23.809 28.8381C22.7782 28.2028 21.7959 27.5492 21.0066 26.9368C20.1854 26.2996 19.6831 25.7892 19.49 25.454C19.2969 25.1187 19.1072 24.4274 18.9674 23.3958C18.833 22.4044 18.7595 21.2248 18.726 20.0122C18.6718 18.0452 18.7242 16.044 18.7773 14.7178Z" stroke="#279692" strokeWidth={2} />
                                            <ellipse cx="23.5936" cy="23.0799" rx="17.2108" ry="17.2537" stroke="#ff0000" strokeWidth={2} />
                                        </svg>
                                    </div>
                                    <div className="text">
                                        <p className="mb-0">مشهد ، هتل فرودس متن تستی برای کار با دیتا</p>
                                    </div>
                                </div>
                                {/* start */}
                                <div className="star d-flex justify-content-end">
                                    <div className="image d-flex align-items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5588 21.0002C17.3989 21.0008 17.2411 20.9631 17.0988 20.8902L11.9988 18.2202L6.89879 20.8902C6.73318 20.9773 6.54646 21.0162 6.35986 21.0024C6.17326 20.9887 5.99426 20.9228 5.84321 20.8124C5.69217 20.702 5.57513 20.5514 5.5054 20.3778C5.43567 20.2041 5.41606 20.0144 5.44879 19.8302L6.44879 14.2002L2.32879 10.2002C2.20024 10.0719 2.10906 9.91107 2.06501 9.7349C2.02097 9.55872 2.02573 9.37388 2.07879 9.2002C2.13675 9.02248 2.24336 8.86456 2.38654 8.74436C2.52971 8.62417 2.70371 8.54651 2.88879 8.5202L8.58879 7.6902L11.0988 2.5602C11.1807 2.39113 11.3085 2.24855 11.4677 2.14878C11.6269 2.04901 11.8109 1.99609 11.9988 1.99609C12.1866 1.99609 12.3707 2.04901 12.5299 2.14878C12.689 2.24855 12.8169 2.39113 12.8988 2.5602L15.4388 7.6802L21.1388 8.5102C21.3239 8.53651 21.4979 8.61417 21.641 8.73436C21.7842 8.85456 21.8908 9.01248 21.9488 9.1902C22.0018 9.36388 22.0066 9.54872 21.9626 9.7249C21.9185 9.90107 21.8273 10.0619 21.6988 10.1902L17.5788 14.1902L18.5788 19.8202C18.6145 20.0077 18.5958 20.2015 18.5249 20.3787C18.454 20.5559 18.3339 20.7091 18.1788 20.8202C17.9977 20.9471 17.7797 21.0104 17.5588 21.0002V21.0002Z" fill="#F1F504" />
                                        </svg>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5588 21.0002C17.3989 21.0008 17.2411 20.9631 17.0988 20.8902L11.9988 18.2202L6.89879 20.8902C6.73318 20.9773 6.54646 21.0162 6.35986 21.0024C6.17326 20.9887 5.99426 20.9228 5.84321 20.8124C5.69217 20.702 5.57513 20.5514 5.5054 20.3778C5.43567 20.2041 5.41606 20.0144 5.44879 19.8302L6.44879 14.2002L2.32879 10.2002C2.20024 10.0719 2.10906 9.91107 2.06501 9.7349C2.02097 9.55872 2.02573 9.37388 2.07879 9.2002C2.13675 9.02248 2.24336 8.86456 2.38654 8.74436C2.52971 8.62417 2.70371 8.54651 2.88879 8.5202L8.58879 7.6902L11.0988 2.5602C11.1807 2.39113 11.3085 2.24855 11.4677 2.14878C11.6269 2.04901 11.8109 1.99609 11.9988 1.99609C12.1866 1.99609 12.3707 2.04901 12.5299 2.14878C12.689 2.24855 12.8169 2.39113 12.8988 2.5602L15.4388 7.6802L21.1388 8.5102C21.3239 8.53651 21.4979 8.61417 21.641 8.73436C21.7842 8.85456 21.8908 9.01248 21.9488 9.1902C22.0018 9.36388 22.0066 9.54872 21.9626 9.7249C21.9185 9.90107 21.8273 10.0619 21.6988 10.1902L17.5788 14.1902L18.5788 19.8202C18.6145 20.0077 18.5958 20.2015 18.5249 20.3787C18.454 20.5559 18.3339 20.7091 18.1788 20.8202C17.9977 20.9471 17.7797 21.0104 17.5588 21.0002V21.0002Z" fill="#F1F504" />
                                        </svg>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5588 21.0002C17.3989 21.0008 17.2411 20.9631 17.0988 20.8902L11.9988 18.2202L6.89879 20.8902C6.73318 20.9773 6.54646 21.0162 6.35986 21.0024C6.17326 20.9887 5.99426 20.9228 5.84321 20.8124C5.69217 20.702 5.57513 20.5514 5.5054 20.3778C5.43567 20.2041 5.41606 20.0144 5.44879 19.8302L6.44879 14.2002L2.32879 10.2002C2.20024 10.0719 2.10906 9.91107 2.06501 9.7349C2.02097 9.55872 2.02573 9.37388 2.07879 9.2002C2.13675 9.02248 2.24336 8.86456 2.38654 8.74436C2.52971 8.62417 2.70371 8.54651 2.88879 8.5202L8.58879 7.6902L11.0988 2.5602C11.1807 2.39113 11.3085 2.24855 11.4677 2.14878C11.6269 2.04901 11.8109 1.99609 11.9988 1.99609C12.1866 1.99609 12.3707 2.04901 12.5299 2.14878C12.689 2.24855 12.8169 2.39113 12.8988 2.5602L15.4388 7.6802L21.1388 8.5102C21.3239 8.53651 21.4979 8.61417 21.641 8.73436C21.7842 8.85456 21.8908 9.01248 21.9488 9.1902C22.0018 9.36388 22.0066 9.54872 21.9626 9.7249C21.9185 9.90107 21.8273 10.0619 21.6988 10.1902L17.5788 14.1902L18.5788 19.8202C18.6145 20.0077 18.5958 20.2015 18.5249 20.3787C18.454 20.5559 18.3339 20.7091 18.1788 20.8202C17.9977 20.9471 17.7797 21.0104 17.5588 21.0002V21.0002Z" fill="#F1F504" />
                                        </svg>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5588 21.0002C17.3989 21.0008 17.2411 20.9631 17.0988 20.8902L11.9988 18.2202L6.89879 20.8902C6.73318 20.9773 6.54646 21.0162 6.35986 21.0024C6.17326 20.9887 5.99426 20.9228 5.84321 20.8124C5.69217 20.702 5.57513 20.5514 5.5054 20.3778C5.43567 20.2041 5.41606 20.0144 5.44879 19.8302L6.44879 14.2002L2.32879 10.2002C2.20024 10.0719 2.10906 9.91107 2.06501 9.7349C2.02097 9.55872 2.02573 9.37388 2.07879 9.2002C2.13675 9.02248 2.24336 8.86456 2.38654 8.74436C2.52971 8.62417 2.70371 8.54651 2.88879 8.5202L8.58879 7.6902L11.0988 2.5602C11.1807 2.39113 11.3085 2.24855 11.4677 2.14878C11.6269 2.04901 11.8109 1.99609 11.9988 1.99609C12.1866 1.99609 12.3707 2.04901 12.5299 2.14878C12.689 2.24855 12.8169 2.39113 12.8988 2.5602L15.4388 7.6802L21.1388 8.5102C21.3239 8.53651 21.4979 8.61417 21.641 8.73436C21.7842 8.85456 21.8908 9.01248 21.9488 9.1902C22.0018 9.36388 22.0066 9.54872 21.9626 9.7249C21.9185 9.90107 21.8273 10.0619 21.6988 10.1902L17.5788 14.1902L18.5788 19.8202C18.6145 20.0077 18.5958 20.2015 18.5249 20.3787C18.454 20.5559 18.3339 20.7091 18.1788 20.8202C17.9977 20.9471 17.7797 21.0104 17.5588 21.0002V21.0002Z" fill="#F1F504" />
                                        </svg>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5588 21.0002C17.3989 21.0008 17.2411 20.9631 17.0988 20.8902L11.9988 18.2202L6.89879 20.8902C6.73318 20.9773 6.54646 21.0162 6.35986 21.0024C6.17326 20.9887 5.99426 20.9228 5.84321 20.8124C5.69217 20.702 5.57513 20.5514 5.5054 20.3778C5.43567 20.2041 5.41606 20.0144 5.44879 19.8302L6.44879 14.2002L2.32879 10.2002C2.20024 10.0719 2.10906 9.91107 2.06501 9.7349C2.02097 9.55872 2.02573 9.37388 2.07879 9.2002C2.13675 9.02248 2.24336 8.86456 2.38654 8.74436C2.52971 8.62417 2.70371 8.54651 2.88879 8.5202L8.58879 7.6902L11.0988 2.5602C11.1807 2.39113 11.3085 2.24855 11.4677 2.14878C11.6269 2.04901 11.8109 1.99609 11.9988 1.99609C12.1866 1.99609 12.3707 2.04901 12.5299 2.14878C12.689 2.24855 12.8169 2.39113 12.8988 2.5602L15.4388 7.6802L21.1388 8.5102C21.3239 8.53651 21.4979 8.61417 21.641 8.73436C21.7842 8.85456 21.8908 9.01248 21.9488 9.1902C22.0018 9.36388 22.0066 9.54872 21.9626 9.7249C21.9185 9.90107 21.8273 10.0619 21.6988 10.1902L17.5788 14.1902L18.5788 19.8202C18.6145 20.0077 18.5958 20.2015 18.5249 20.3787C18.454 20.5559 18.3339 20.7091 18.1788 20.8202C17.9977 20.9471 17.7797 21.0104 17.5588 21.0002V21.0002Z" fill="#F1F504" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer */}
                <Footer />
            </div>

        </div >
    );
};

export default tours;