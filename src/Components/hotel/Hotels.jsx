import React, { useEffect, useRef, useState } from 'react';import axios from 'axios';
import Link from 'next/link';
import { Loader } from '../../Utils/Loader';
import HotelsSearchBox from './HotelsSearchBox';
import PageTabls from '../../sources/component/PageTabs.component';
import styles from "../../../styles/Home.module.scss";
import Head from 'next/head';
import NavHandler from '../share/NavHandler';
import Footer from '../../sources/component/Footer.component';
import PictureBase from '../../sources/component/PictureBase';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHotels } from '../../Redux/allHotels/Action';
import { fetchCitySearch } from '../../Redux/citiesSearch/Action';
import NewLoader from "../NewTours/Components/subComponents/NewLoader";
const Hotels = () => {
    let hotels = useSelector(state => state.AllHotelReducer)
    console.log(hotels);
    const dispatch = useDispatch()
    const [city, setCity] = useState(null);
    const [width, setWidth] = useState();
    const [search,setSearch] = useState({
        hotel:null,
        value:'',
        slug:'',
    })
    const [paginate,setPaginate] = useState({activePage:1});
    const [page,setPage] = useState(1);
    useEffect(() => {
        dispatch(fetchCitySearch())
        setWidth(window.innerWidth)
    },[])
    const searchHotel = ()=>{
        dispatch(fetchAllHotels(city,search.hotel,page))
        console.log(city,search.hotel,page);
    }
    useEffect(()=>{
        dispatch(fetchAllHotels(city,search.hotel,page))
    },[])
    useEffect(() => {
        dispatch(fetchAllHotels(city,search.hotel,page))
    },[page])

    const [type, setType] = useState(3)
    const myRef = useRef(null)
    const executeScroll = () => { myRef.current.scrollIntoView()}
    return (
        <div className="mt-90 bodyVar" >
            <Head>
                <title> لیست هتل ها | همنواز</title>
            </Head>
            <NavHandler />
            <div className="row justify-content-center" style={{marginTop: width>=826? '0rem':'-0.7rem' }}>
                <div style={{background: '#F7F7F7'}}>
                    <PictureBase/>
                    <PageTabls type={type} setType={setType} />
                    <h2 style={{margin:'2rem 0 0 0'}} className="font-bold-iransanse font-size-22 font-bold text-center ">
                        <span>رزرو هتل&nbsp;</span>
                        <span className="color-primary font-bold-iransanse"  ref={myRef}>
                        با چند کلیک
                      </span>
                    </h2>
                    <div className="row justify-content-center">
                        <div className={`col-10 col-md-12 ${width<=826&&"mt-3"} px-0`}>
                            <HotelsSearchBox searchHotel={searchHotel} setCity={setCity} search={search} setSearch={setSearch}/>
                        </div>
                    </div>
                    <div className={`${styles["parentbackFight"]}`}>
                        {width>=826 &&
                            <div className={`${styles["parentbackFight"]} container w-100`}>
                                <img
                                    width=""
                                    height=""
                                    alt="همنواز-اسلایدر"
                                    src="../../../../Images/hotel-bg-new.png"
                                />
                            </div>}
                        {width < 826 ? (
                            <div className={`${styles["hero-big-image"]} container`}>
                                <img
                                    width=""
                                    height=""
                                    alt="همنواز-اسلایدر"
                                    src="../../../Images/hotel-bg-new.png"
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="col-md-10 mx-2">
                    <>
                        <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-4 col-12">
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <div className="d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.326" height="20.086" viewBox="0 0 14.326 17.086">
                                        <g id="Bookmark" transform="translate(1 1)">
                                            <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#053742" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                            <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#053742" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        </g>
                                    </svg>
                                    <div className="text mx-2">
                                        <p className="font-bold title-custom p-0 my-0 d-flex align-items-center" style={{marginTop:`${width>826?'2px':'4px'}`,fontSize:'18px',padding:'0',fontWeight:'bolder !important'}}>هتل های آفری و ارزان قیمت</p>
                                        <h6 className="subtitle-custom m-0">مشاهده مناسب ترین هتل ها</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bottom d-flex align-items-center mt-3 mb-3">
                            <div className="border-right"></div>
                            <div className="border-left"></div>
                        </div>
                        {hotels.data?.loading ?
                            <NewLoader/> :
                            hotels.data?.data?.length>0 && !hotels.data?.loading?
                                <div className="row justify-content-center"
                                >
                                    {hotels.data?.data?.map((item)=>(
                                        <Link href={`/hotels/${item.slug}`}>
                                            <div className="col-12 col-md-3 d-flex justify-content-center">
                                                <div class="box-hotel" style={{width: '95%'}}>
                                                    <img  class="img-blog" src={item?.thumbnail}/>
                                                    <div class="opacity-bg-parent">
                                                        <div class="info-img">
                                                            <svg id="Information" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 26.17 26.17">
                                                                <path id="Path_991" data-name="Path 991" d="M1,13.085a30.578,30.578,0,0,0,.507,6.4A6.8,6.8,0,0,0,3.2,22.971a6.8,6.8,0,0,0,3.484,1.692,30.584,30.584,0,0,0,6.4.507,30.584,30.584,0,0,0,6.4-.507,6.8,6.8,0,0,0,3.484-1.692,6.8,6.8,0,0,0,1.692-3.484,30.584,30.584,0,0,0,.507-6.4,30.584,30.584,0,0,0-.507-6.4A6.8,6.8,0,0,0,22.971,3.2a6.8,6.8,0,0,0-3.484-1.692A30.578,30.578,0,0,0,13.085,1a30.579,30.579,0,0,0-6.4.507A6.8,6.8,0,0,0,3.2,3.2,6.8,6.8,0,0,0,1.507,6.683,30.579,30.579,0,0,0,1,13.085Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                                                <path id="Path_992" data-name="Path 992" d="M13.2,17.986a1.1,1.1,0,0,1-2.2,0V11.395a1.1,1.1,0,0,1,2.2,0ZM12.1,9.2a1.1,1.1,0,1,1,1.1-1.1A1.1,1.1,0,0,1,12.1,9.2Z" transform="translate(0.986 0.592)" fill="#fff" fill-rule="evenodd"/>
                                                            </svg>
                                                        </div>
                                                        <div class="info-hotel">
                                                            <span x-text="hotel.name">{item.name}</span>
                                                            <div class="footer-hotel-info">
                                                                <div class="location-hotel">
                                                                    <img src="../../../Images/Location-white.svg" width="17" alt="آدرس-هتل"/>
                                                                    <span x-text="hotel.city + ' - ' + hotel.location" style={{marginBottom: "0"}}>{item.location}</span>
                                                                </div>
                                                                <div className="star d-flex align-items-center pb-1">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="image d-flex align-items-center">
                                                                            {(() => {
                                                                                let stars = [];
                                                                                for (let i = 1; i <= parseInt(item.stars); i++) {
                                                                                    stars.push(
                                                                                        <svg className="mx-1" xmlns="http://www.w3.org/2000/svg" width="12"
                                                                                             height="12" viewBox="0 0 21.443 21.387">
                                                                                            <path id="Star"
                                                                                                  d="M10.749,1c.915,0,2.352,4.154,2.871,5.751a.916.916,0,0,0,.84.632c1.666.057,5.983.3,5.983,1.273s-3.077,3.38-4.335,4.328A.915.915,0,0,0,15.789,14c.512,1.585,1.742,5.7.952,6.343s-4.1-1.885-5.447-2.963a.919.919,0,0,0-1.147,0c-1.35,1.078-4.669,3.6-5.392,2.964s.431-4.772.912-6.351a.914.914,0,0,0-.324-1C4.093,12.047,1,9.619,1,8.655S5.326,7.438,6.988,7.382a.916.916,0,0,0,.838-.625C8.357,5.165,9.833,1,10.749,1Z"
                                                                                                  fill="#f7db06" stroke="#f7db06"
                                                                                                  strokeLinecap="round" strokeLinejoin="round"
                                                                                                  strokeWidth={2} />
                                                                                        </svg>
                                                                                    );
                                                                                }
                                                                                return stars;
                                                                            })()}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    {console.log(hotels)}
                                </div>
                                : hotels.data.data?.length == 0 ?
                                    <div className="hotelNotFound">متاسفانه هتلی موجود نیست</div>:<NewLoader/>}
                        <div className="d-flex mt-5 justify-content-center">
                            {hotels.data?.meta?.links?.map((item)=>(
                                <>
                            <span className={`px-1 cursor-pointer border rounded py-1 ${page == parseInt(item.label) && 'font-bold-iransanse' }`}
                                  onClick={()=>{setPage(item.label),executeScroll()}}
                                  dangerouslySetInnerHTML={{__html:item.label}}
                                  style={{margin:'auto 2px', color:'#137cb6'}} />
                                </>
                            ))}
                        </div>
                    </>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Hotels;
