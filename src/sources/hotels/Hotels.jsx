import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Navigation } from 'swiper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { Loader } from '../../Utils/Loader';
import NewLoader from "../../Components/NewTours/Components/subComponents/NewLoader";

const Hotels = () => {
    const swiperRef = useRef();
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true)
    const [hotels, setHotels] = useState([]);
    const [city, setCity] = useState('1');
    const [width, setWidth] = useState();
    useEffect(() => {
        setWidth(window.innerWidth)
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/city/getCities')
            .then(res => {setCities(res.data.data)})
        }
        getData()
        

    },[])
    useEffect(()=>{
        setLoading(true)
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/hotel/getHotels',{isAdmin:0,city:city})
            .then(res => {setHotels(res.data.data),setLoading(false)})
        }
        
        
        getData()
        
        
        
    },[city])
    useEffect(()=>{
        setLoading(true)
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/hotel/getHotels',{isAdmin:0,city:city})
            .then(res => {setHotels(res.data.data),setLoading(false)})
        }
        
        getData()
        
        
        
    },[])

    return (
        <div className="">
                    <div className="d-flex flex-wrap align-items-center justify-content-between mt-5">
                        <div className="d-flex mt-2 flex-column col-12 col-xl-8 col-lg-8 col-sm-6">
                            <div className="d-flex col-12 align-items-center justify-content-between">
                                <div className="d-flex align-items-center px-2">
                                    <svg className="ms-3 col-1" xmlns="http://www.w3.org/2000/svg" width="30.326" height="30.086" viewBox="0 0 14.326 17.086">
                                        <g id="Bookmark" transform="translate(1 1)">
                                            <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                            <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                        </g>
                                    </svg>
                                    <div className="text col-12 col-sm-10 d-flex">
                                        <h5 className="font-bold p-0" style={{marginTop:`${width>826?'2px':'4px'}`,fontSize:'2px'}}>هتل های برگزیده شهر</h5>
                                        <select style={{width: '20%',marginBottom: '8px',color: '#279692'}}
                                         className="selectCity font-bold" value={city} onChange={(val) => setCity(val.target.value)}>
                                            {cities.map(item=>(
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {width>826&&
                            <div className='col-12 col-md-2 d-flex justify-content-end'>
                                <button className="prevNextbtnSwiper" onClick={() => swiperRef.current?.slidePrev()}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                                <button className="prevNextbtnSwiper" onClick={() => swiperRef.current?.slideNext()}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                            </div>
                        }
                    </div>
                    <div className="bottom d-flex align-items-center mt-3 mb-3">
                        <div className="border-right"></div>
                        <div className="border-left"></div>
                    </div>
                    {loading ?
                    <NewLoader/> :
                    hotels.length>0 && !loading?
                    <Swiper
                    slidesPerView={'auto'}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={10}
                    slidesPerGroup={1}
                    breakpoints={{
                    0: {
                        slidesPerView: 1.3,
                    },    
                    700: {
                        slidesPerView: 2.3,
                    },
                    850: {
                        slidesPerView: 3.3,
                    },
                    1024: {
                        spaceBetween: 10,
                        slidesPerView: 4.3,
                    },
                    1180: {
                        slidesPerView: 4.3,
                    },
                    1300: {
                        slidesPerView: 5.3,
                    },
                    }}
                    >
                        {hotels.map((item)=>(
                            <SwiperSlide>
                                <div>
                                    <div class="box-hotel">
                                        <img  class="img-blog" src={item.thumbnail}/>
                                        <Link href={`/hotel/${item.slug}`}>
                                            <div class="opacity-bg-parent">
                                                <div class="info-img"><img src="https://hamnavaz.com/img/Information.svg" width="22" alt="توضیحات-هتل"/>
                                                </div>
                                                <div class="info-hotel">
                                                    <span x-text="hotel.name">{item.name}</span>
                                                    <div class="footer-hotel-info">
                                                        <div class="location-hotel">
                                                            <img src="https://hamnavaz.com/img/Location-white.svg" width="17" alt="آدرس-هتل"/>
                                                            <span x-text="hotel.city + ' - ' + hotel.location" style={{marginBottom: "0"}}>{item.location}</span>
                                                        </div>
                                                        <div className="star d-flex align-items-center pb-1">
                                                            <div className="d-flex align-items-center">
                                                                <div className="image d-flex align-items-center">
                                                                {(() => {
                                                                    let stars = [];
                                                                    for (let i = 1; i <= parseInt(item.stars); i++) {
                                                                    stars.push(
                                                                        <svg className="mx-1" xmlns="http://www.w3.org/2000/svg" width="16"
                                                                            height="16" viewBox="0 0 21.443 21.387">
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
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    
                    </Swiper>
                    : hotels.length == 0 ?
                    <div className="hotelNotFound">متاسفانه هتلی موجود نیست</div>:<NewLoader/>
}
        </div>
    );
};

export default Hotels;
