import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Loader } from '../../Utils/Loader';

const CitiesSuggest = () => {
    const [loading, setLoading] = useState(true)
    const [ data, setData ] = useState([])
    useEffect(() => {
        setLoading(true)
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{hasTour:true})
            .then(res => {setData(res.data.data),setLoading(false)})
        }
        getData()
    },[])
    const swiperRef = useRef();
    return (
        <div className="marginLeftRight">
            <div className="d-flex flex-wrap align-items-center justify-content-between mt-5">
                        <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-9 col-9">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <svg className="ms-3" xmlns="http://www.w3.org/2000/svg" width="30.326" height="30.086" viewBox="0 0 14.326 17.086">
                                        <g id="Bookmark" transform="translate(1 1)">
                                            <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                            <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                        </g>
                                    </svg>
                                    <div className="text">
                                        <h5 className="font-bold">نمایش تور بر اساس شهر</h5>
                                        <h6>مشاهده مناسب ترین تور های لحظه آخری</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex'}}>
                            <button className="prevNextbtnSwiper" onClick={() => swiperRef.current?.slidePrev()}>
                                <FontAwesomeIcon onClick={() => swiperRef.current?.slidePrev()} icon={faAngleRight} />
                            </button>
                            <button className="prevNextbtnSwiper" onClick={() => swiperRef.current?.slideNext()}>
                                <FontAwesomeIcon onClick={() => swiperRef.current?.slidePrev()} icon={faAngleLeft} />
                            </button>
                        </div>
                    </div>
                    <div className="bottom d-flex align-items-center mt-3 mb-3">
                        <div className="border-right"></div>
                        <div className="border-left"></div>
                    </div>
                    {
                        loading?
                        <Loader/>:
                        data.length>0?
                    
            <Swiper
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                slidesPerView={2}
                spaceBetween={10}
                slidesPerGroup={1}
                breakpoints={{
                    0: {
                        spaceBetween: 20,
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                    850: {
                        spaceBetween: 20,
                        slidesPerView: 3,
                    },
                    1024: {
                        spaceBetween: 10,
                        slidesPerView: 5,
                    },
                
                }}
            >
                
                {data.map(item=>(
                    <SwiperSlide>
                    <div class="swiper-slide" >
                        <div class="box-sort-tour-city">
                            <div class="img-sort-tour-city">
                                <div class="info-img-sort-tour-city animated fadeInDown">
                                    <img class="img-hover-child" src="https://hamnavaz.com/img/Attachment%201.svg" width="30" alt="جزئیات بیشتر"/>
                                    <Link class="view-details-more" href={`/cityTour/${item.slug}`}>مشاهده جزئیات بیشتر</Link>
                                </div>
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div class="text-sort-tour-city">
                                <h2>
                                    <Link class="view-details-more" href={`/cityTour/${item.slug}`}>
                                        {`تور ${item.name}`}
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    </div>
                    </SwiperSlide>
                ))}
            </Swiper>    
            :
            <div className="hotelNotFound">متاسفانه هیج توری موجود نیست</div>
            }
        </div>
    );
};

export default CitiesSuggest;