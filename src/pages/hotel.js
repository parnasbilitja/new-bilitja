import React, { useEffect, useState } from 'react';
// mui
import { Alert, Snackbar } from '@mui/material';

import NavBar from "./../sources/component/NavBar.component";
import Footer from '../sources/component/Footer.component';
import RequestTour from '../Components/modal/RequestTour';
import PopUp from '../sources/component/PopUp.component';

const hotel = () => {
    // mui
    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };

    // const [open, setOpen] = useState(false);
    // const [data, setData] = useState(null)
    // const [slug, setSlug] = useAtom(tourSlug)
    // const [show, setShow] = useState(false);
    // const [tourId, setTourId] = useState(null);
    // const [packData, setPackData] = useState({
    //     number: '',
    //     count: '1',
    //     tourId: tourId,
    // })
    // const [messages, setMessages] = useState({
    //     isDone: false,
    //     message: ''
    // })
    // const getData = async () => {
    //     const val = await axios.get(`https://api.hamnavaz.com/api/v1/tour/getTour/${slug ? slug : JSON.parse(localStorage.getItem("slug"))}`)
    //     setData(val.data.data)

    // }
    // useEffect(() => {
    //     getData();
    //     console.log(data);
    // }, [slug])


    // const slugHandler = (slug) => {
    //     setSlug(slug)
    //     localStorage.setItem("slug", JSON.stringify(slug))
    // }
    return (
        <div>
            <div className="mt-5 bodyVar">
                <NavBar />
                {/* detail hotel container base */}
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
                                    <h5 className="font-bold" >هتل نووتل فرودگاه امام تهران</h5>
                                    <span className="font-bold">Novotel Hotel in Tehran</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column justify-content-around me-auto mt-2">
                                <div className="d-flex">
                                    <div className="text">
                                        <span className="font-bold">شهر و منطقه :</span>
                                    </div>
                                    <div className="text pe-2">
                                        <span>
                                            تهران Tehran
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-tour col-xl-12 col-lg-12 col-12 d-flex flex-wrap justify-content-between py-4">
                            <div className="right col-xl-6 col-lg-6 col-12">
                                <div className="gallery-image">
                                    <div className="image">
                                        {/* <Slider data={data && data.endCity.images} /> */}
                                        <img src="/images/picture2.jpg" width={"100%"} height={"410px"} style={{ borderRadius: 8 }} />
                                    </div>
                                </div>
                            </div>
                            <div className="left position-relative col-xl-6 col-lg-6 col-12">
                                {/* collection gallery */}
                                <div className="collection-gallery d-flex flex-wrap me-3">
                                    {/* child */}
                                    <div className="image col-xl-6 col-lg-6 mb-2">
                                        <img src="images/picture2.jpg" width={"97%"} height={"200px"} />
                                    </div>
                                    {/* child */}
                                    <div className="image col-xl-6 col-lg-6 mb-2">
                                        <img src="images/picture3.jpg" width={"100%"} height={"200px"} />
                                    </div>
                                    {/* child */}
                                    <div className="image col-xl-6 col-lg-6 mb-2">
                                        <img src="images/picture4.jpg" width={"97%"} height={"200px"} />
                                    </div>
                                    {/* child */}
                                    <div className="image col-xl-6 col-lg-6 mb-2">
                                        <img src="images/picture1.jpg" width={"100%"} height={"200px"} />
                                    </div>
                                </div>
                            </div>
                            <div className="data-hotel d-flex align-items-start col-xl-12 col-lg-12 mt-4">
                                <div className="col-xl-9 col-lg-9">
                                    {/* ROW 1 ذرباره آن هتل */}
                                    <div className="description border-bottom">
                                        <div className="text">
                                            <h5 className="font-bold"> درباره هتل نووتل فرودگاه امام تهران</h5>
                                            <p className="pt-2" style={{ lineHeight: '37px', textAlign: 'justify' }}>
                                                گروه فرانسوی مالک هتل‌های لوکس در سال 1393 در ایران برای طرفداران خود مجموع هتل‌های نووتل و ایبیس را بنا کرده‌اند. چیزی که این هتل‌ها را از دیگر هتل‌های متمایز می‌کند، دکوراسیون و وسایل خاصش می‌باشد. هتل نووتل فرودگاه امام دارای 300 واحد اقامتی در ظرفیت‌های مختلف می‌باشد. از جمله امکانات این هتل، سوئیت‌های لوکس، اتاق ویژه معلولین، استخر، خدمات اسپا، جکوزی، سالن ورزشی، پارکینگ رایگان و ... می‌باشد. در رستوران‌های این هتل انواع غذاهای بین‌المللی و سنتی برای مهمانان سرو می‌شود. با راه‌اندازی این گروه هتل‌ها؛ دیگر نیازی به نگرانی برای رسیدن به پروازهای نیمه شب و اول صبح وجود ندارد و میهمانان می‌توانند با خیال آسوده از خدمات بین‌المللی و استاندارد این هتل استفاده نمایند. در حین اقامتتان می‌توانید از دیدنی‌های این شهر از جمله کاروانسرای خانات، سرای کاظمی، کوچه لولاگر، موزه فرش، موزه رضا عباسی، موزه زمان، موزه قصر، نمایشگاه شهر آفتاب، موزه عبرت، تالار آینه کاخ گلستان، موزه ملی ملک و ... دیدن نمایید.
                                            </p>
                                        </div>
                                    </div>
                                    {/* ROW 2 امکانات رفاهی هتل */}
                                    <div className="description border-bottom pt-4">
                                        <div className="text">
                                            <h5 className="font-bold">امکانات رفاهی هتل</h5>
                                        </div>
                                        <ul className="ul-list d-flex flex-wrap align-items-center col-xl-12 col-lg-12 pt-3">
                                            <li className="li-list col-xl-2 col-lg-2 text-base-color-1 font-bold">تاکسی سرویس</li>
                                            <li className="li-list col-xl-2 col-lg-2 text-base-color-1 font-bold">تاکسی</li>
                                            <li className="li-list col-xl-2 col-lg-2 text-base-color-1 font-bold">نمونه تستی</li>
                                            <li className="li-list col-xl-2 col-lg-2 text-base-color-1 font-bold">تستی</li>
                                        </ul>
                                    </div>
                                    {/* ROW 3 اتاق های قابل رزرو */}
                                    <div className="description border-bottom pt-4">
                                        <div className="text">
                                            <h5 className="font-bold">اتاق های قابل رزرو</h5>
                                        </div>
                                        {/* parent */}
                                        <div className="p-room col-xl-12 col-lg-12 pt-3 pb-3">
                                            {/* child */}
                                            <div className="c-room d-flex flex-wrap align-items-start col-xl-12 col-lg-12 mb-3">
                                                <div className="image col-xl-2 col-lg-2">
                                                    <img src="images/picture2.jpg" width={"100%"} height={"145px"} />
                                                </div>
                                                <div className="title d-flex flex-column justify-content-between col-xl-7 col-lg-7 py-3 px-2">
                                                    <div className="">
                                                        <div className="text">
                                                            <h5 className="font-bold pb-1">عنوان هتل خود در این قسمت وارد شود</h5>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <span className="text-base-color-1">
                                                                <svg className="ms-1" width="20" height="20" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M38.932 39.1547C39.521 39.0317 39.8713 38.4179 39.6201 37.8711C38.5087 35.4515 36.5253 33.3236 33.8945 31.7497C30.8888 29.9513 27.206 28.9766 23.4173 28.9766C19.6286 28.9766 15.9458 29.9513 12.94 31.7497C10.3093 33.3236 8.3259 35.4515 7.21448 37.8711C6.96329 38.4179 7.31352 39.0316 7.90258 39.1547L15.2369 40.687C20.6322 41.8143 26.2023 41.8143 31.5977 40.687L38.932 39.1547Z" fill="#090026" />
                                                                    <ellipse cx="23.417" cy="15.5581" rx="9.56153" ry="9.58541" fill="#090026" />
                                                                </svg>
                                                                شش نفره
                                                            </span>
                                                            <span className="text-base-color-1 pe-3">
                                                                <svg className="ms-1" width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5 28C4.73478 28 4.48043 28.1054 4.29289 28.2929C4.10536 28.4804 4 28.7348 4 29C4 29.2652 4.10536 29.5196 4.29289 29.7071C4.48043 29.8946 4.73478 30 5 30H8C8 32.1217 8.84285 34.1566 10.3431 35.6569C11.8434 37.1571 13.8783 38 16 38H32C34.1217 38 36.1566 37.1571 37.6569 35.6569C39.1571 34.1566 40 32.1217 40 30H43C43.2652 30 43.5196 29.8946 43.7071 29.7071C43.8946 29.5196 44 29.2652 44 29C44 28.7348 43.8946 28.4804 43.7071 28.2929C43.5196 28.1054 43.2652 28 43 28H5Z" fill="#090026" />
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M23.1067 10.0527L24.0017 10.4997L24.8967 10.9467L24.8947 10.9497L24.8827 10.9747L24.8327 11.0847C24.5655 11.6814 24.3643 12.3054 24.2327 12.9457C23.9967 14.1247 24.0837 15.1677 24.7087 15.7927C26.0837 17.1677 25.9967 19.1247 25.7327 20.4457C25.5605 21.2872 25.29 22.1055 24.9267 22.8837L24.9067 22.9267L24.8997 22.9397L24.8977 22.9447L24.8967 22.9457L24.0017 22.4997L23.1067 22.0527L23.1087 22.0497L23.1207 22.0247L23.1707 21.9147C23.4379 21.3181 23.6391 20.6941 23.7707 20.0537C24.0067 18.8747 23.9197 17.8317 23.2947 17.2067C21.9197 15.8317 22.0067 13.8747 22.2707 12.5537C22.4429 11.7123 22.7135 10.894 23.0767 10.1157L23.0967 10.0727L23.1037 10.0597L23.1057 10.0557L23.1067 10.0537V10.0527ZM15.1717 12.4407L16.0017 13.0007C16.8307 13.5597 16.8317 13.5587 16.8317 13.5587V13.5577V13.5587L16.8187 13.5787C16.731 13.7187 16.6489 13.8621 16.5727 14.0087C16.3837 14.3676 16.2328 14.7453 16.1227 15.1357C15.8827 16.0277 15.9687 16.7317 16.5967 17.1957C18.2187 18.3977 18.1327 20.1947 17.8107 21.3857C17.6635 21.915 17.4607 22.4272 17.2057 22.9137C17.0942 23.1281 16.9731 23.3373 16.8427 23.5407L16.8347 23.5527L16.8327 23.5567L16.8317 23.5577C16.8317 23.5577 16.8307 23.5597 16.0017 22.9997C15.1727 22.4397 15.1717 22.4407 15.1717 22.4407L15.1847 22.4217L15.2387 22.3357C15.306 22.2229 15.37 22.1082 15.4307 21.9917C15.5857 21.6937 15.7637 21.2937 15.8807 20.8637C16.1207 19.9717 16.0347 19.2687 15.4067 18.8037C13.7847 17.6017 13.8707 15.8057 14.1927 14.6137C14.3577 14.0017 14.6017 13.4637 14.7977 13.0857C14.9093 12.8718 15.0305 12.6629 15.1607 12.4597L15.1677 12.4477L15.1707 12.4427L15.1727 12.4407H15.1717ZM32.1717 12.4407L33.0017 13.0007C33.8307 13.5597 33.8317 13.5587 33.8317 13.5587V13.5577V13.5587L33.8187 13.5787C33.731 13.7187 33.6489 13.8621 33.5727 14.0087C33.3837 14.3676 33.2328 14.7453 33.1227 15.1357C32.8827 16.0277 32.9687 16.7317 33.5967 17.1957C35.2187 18.3977 35.1327 20.1947 34.8107 21.3857C34.6635 21.915 34.4607 22.4272 34.2057 22.9137C34.0945 23.1281 33.9737 23.3373 33.8437 23.5407L33.8357 23.5527L33.8327 23.5567L33.8317 23.5577C33.8317 23.5577 33.8307 23.5597 33.0017 22.9997C32.1727 22.4397 32.1717 22.4407 32.1717 22.4407L32.1847 22.4217L32.2387 22.3357C32.306 22.2229 32.37 22.1082 32.4307 21.9917C32.5857 21.6937 32.7637 21.2937 32.8807 20.8637C33.1207 19.9717 33.0347 19.2687 32.4067 18.8037C30.7847 17.6017 30.8707 15.8057 31.1927 14.6137C31.3577 14.0017 31.6017 13.4637 31.7977 13.0857C31.909 12.8718 32.0298 12.6629 32.1597 12.4597L32.1677 12.4477L32.1707 12.4427L32.1727 12.4407H32.1717Z" fill="#090026" />
                                                                </svg>
                                                                با صبحانه ، نهار ، شام
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <span className="text-base-color-1 font-bold">قیمت برای هر شب : 10.000.000</span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-3 col-lg-3 d-flex flex-column align-items-center justify-content-end ps-3 pt-4">
                                                    <div className="prices d-flex align-items-center">
                                                        <div className="pb-1">
                                                            <span className="font-bold">جمع قیمت برای</span>
                                                            <span className="font-bold">3 شب :</span>
                                                        </div>
                                                        <div className="pb-2 pe-2">
                                                            <span className="font-bold font-size-18 text-base-color">10.000.000</span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center me-auto me-3 mb-2">
                                                        <div className="text">
                                                            <span className="text-base-color-1 font-bold line-through">32000000</span>
                                                        </div>
                                                        <div className="d-flex align-items-center bg-danger rounded-pill py-1 px-2 me-1 ltr">
                                                            <span className="text-white font-size-12 pe-1">27</span>
                                                            <span className="text-white font-size-12">%</span>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-base-color-1 py-2 px-5 text-white me-auto mb-2">انـتخاب اتــاق</button>
                                                </div>
                                                <div className="mt-2 mb-2 col-xl-12 col-lg-12 col-12 d-flex justify-content-between border-top pt-2 px-2">
                                                    <div className="d-flex align-items-center">
                                                        <div className="ms-2">
                                                            <span className="font-bold">تـعداد اتـاق :</span>
                                                        </div>
                                                        <div className="max bg-danger rounded-3 px-1">
                                                            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M17 15V8H15V15H8V17H15V24H17V17H24V15H17Z" fill="#fff" />
                                                            </svg>
                                                        </div>
                                                        <div className="text mx-2">
                                                            <span className="text-base-color-1">2</span>
                                                        </div>
                                                        <div className="min bg-danger rounded-3 px-1">
                                                            <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M25.5469 13.8867H4.45312C4.32422 13.8867 4.21875 13.9922 4.21875 14.1211V15.8789C4.21875 16.0078 4.32422 16.1133 4.45312 16.1133H25.5469C25.6758 16.1133 25.7812 16.0078 25.7812 15.8789V14.1211C25.7812 13.9922 25.6758 13.8867 25.5469 13.8867Z" fill="#fff" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-primary py-2 px-2 text-white ms-2">
                                                            قـیمت شـب هـای دیـگر
                                                            <svg className="me-2" width="20" height="20" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M22.948 28.7559L23.656 29.4621L22.948 30.1718L22.24 29.4621L22.948 28.7559ZM35.1299 17.9596L23.656 29.4621L22.24 28.0496L33.7139 16.5471L35.1299 17.9596ZM22.24 29.4621L10.7662 17.9596L12.1822 16.5471L23.656 28.0496L22.24 29.4621Z" fill="#fff" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* detail show data */}
                                                <div className="date-show col-xl-12 col-lg-12 col-sm-12 col-12 d-flex flex-wrap align-items-start my-2">
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 start-date py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 end-date py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>{/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 complete-capacity py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                    {/* child */}
                                                    <div className="c-date-show border border-1 rounded-2 py-2 ms-1 mb-1">
                                                        <div className="text d-flex flex-column align-items-center pb-2">
                                                            <span className="font-size-14 text-color-base-1">12 فروردین</span>
                                                            <span className="font-size-14 text-color-base-1">یکشنبه</span>
                                                        </div>
                                                        <div className="text d-flex px-1">
                                                            <span className="font-size-14 text-color-base-1">150.000.000</span>
                                                            <span className="font-size-14 pe-1">تومان</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ROW 3  قوانین هتل */}
                                    <div className="description border-bottom pt-4">
                                        <div className="text">
                                            <h5 className="font-bold">قوانین و مقررات هتل</h5>
                                        </div>
                                        {/* parent */}
                                        <div className="p-room col-xl-12 col-lg-12 pt-3 pb-3">

                                        </div>
                                    </div>
                                    {/* ROW 3  دیدگاه کاربران */}
                                    <div className="description border-bottom pt-4">
                                        <div className="text">
                                            <h5 className="font-bold">دیدگاه کاربران در مورد این هتل</h5>
                                        </div>
                                        {/* parent */}
                                        <div className="p-comment col-xl-12 col-lg-12 pt-3 pb-3">
                                            {/* child */}
                                            <div className="c-comment col-xl-12 col-lg-12 col-sm-12 col-12 px-2 py-2 mb-2">
                                                <div className="d-flex align-items-start position-relative">
                                                    <div className="avatar">
                                                        <img src="images/picture2.jpg" width="80px" height="80px"></img>
                                                    </div>
                                                    <div className="d-flex flex-column align-items-start">
                                                        <div className="text mt-2 me-3">
                                                            <span className="font-size-16 font-bold">محمد رضایی</span>
                                                        </div>
                                                        <div className="d-flex align-items-start mt-1 me-2">
                                                            <div className="image d-flex align-items-center position-absolute top-0" style={{ left: 0 }}>
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
                                                            <div className="text me-2">
                                                                <span className="text font-size-14 font-bold ps-2">امــتیاز به این هتل:</span>
                                                                <span className="text-base-color-1 font-size-14 ps-1">(4.2)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="paragraph pt-3 pe-3">
                                                    <p className="font-size-16 text-color-base-1 font-bold">این یک متن تستی است از طرف دیتای کاربر در مورد آن هتل</p>
                                                </div>
                                            </div>
                                            {/* child */}
                                            <div className="c-comment col-xl-12 col-lg-12 col-sm-12 col-12 px-2 py-2 mb-2">
                                                <div className="d-flex align-items-start position-relative">
                                                    <div className="avatar">
                                                        <img src="images/picture2.jpg" width="80px" height="80px"></img>
                                                    </div>
                                                    <div className="d-flex flex-column align-items-start">
                                                        <div className="text mt-2 me-3">
                                                            <span className="font-size-16 font-bold">محمد رضایی</span>
                                                        </div>
                                                        <div className="d-flex align-items-start mt-1 me-2">
                                                            <div className="image d-flex align-items-center position-absolute top-0" style={{ left: 0 }}>
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
                                                            <div className="text me-2">
                                                                <span className="text font-size-14 font-bold ps-2">امــتیاز به این هتل:</span>
                                                                <span className="text-base-color-1 font-size-14 ps-1">(4.2)</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="paragraph pt-3 pe-3">
                                                    <p className="font-size-16 text-color-base-1 font-bold">این یک متن تستی است از طرف دیتای کاربر در مورد آن هتل</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sticky-datalist col-xl-3 col-lg-3 pe-3">
                                    <div className="c-datalist d-flex flex-wrap align-items-center justify-content-between py-3">
                                        <div className="col-xl-5 col-lg-5 col-sm-5 col-12 d-flex flex-column align-items-start border border-1 rounded-3 text-base-color-1 py-1">
                                            <div className="property pb-1 pe-2">
                                                <span className="start">تاریخ ورود</span>
                                            </div>
                                            <div className="value m-auto">
                                                <span className="font-bold text">1401/09/10</span>
                                            </div>
                                        </div>
                                        <div className="col-xl-5 col-lg-5 col-sm-5 col-12 d-flex flex-column align-items-start border border-1 rounded-3 text-base-color-1 py-1">
                                            <div className="property pb-1 pe-2">
                                                <span className="start">تاریخ خروج</span>
                                            </div>
                                            <div className="value m-auto">
                                                <span className="font-bold text">1401/09/10</span>
                                            </div>
                                        </div>
                                        <div className="btn-data mt-3 m-auto">
                                            <button className="btn btn-base-color-1 py-2 px-3 text-white me-auto">مشاهــده اتــاق های مـوجـود</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* footer */}
                <Footer />
            </div>
        </div>
    );
};

export default hotel;