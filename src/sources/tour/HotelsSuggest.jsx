import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Navigation } from 'swiper';

// import styles from '../../../styles/HotelsSuggest.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels } from '../../Redux/hotels/Action';
import { fetchCitySearch } from '../../Redux/citiesSearch/Action';
import NewLoader from "../../Components/NewTours/Components/subComponents/NewLoader";
import {Shimmers6} from "../../Components/NewTours/Components/subComponents/Shimmers";

const HotelsSuggest = () => {
    let getData = useSelector(state => state.HotelReducer)
    let CitySearch = useSelector(state => state.CitySearchReducer)
    const dispatch = useDispatch()

    const swiperRef = useRef();
    const [hotels, setHotels] = useState([]);
    const [city, setCity] = useState('276');
    const [width, setWidth] = useState();
    useEffect(() => {
        setWidth(window.innerWidth)
        dispatch(fetchCitySearch())
    },[])
    useEffect(() => {
        setWidth(window.innerWidth)
        dispatch(fetchHotels(city))
        setHotels(getData.data)


    }, [city])

    useEffect(() => {
        if (hotels?.length<1) {
            setHotels(getData.data)
        }
    },[getData,city])

    return (
        <div className="mx-2">
                    <div className="d-flex flex-wrap align-items-center justify-content-between mt-5">
                        <div className="d-flex mt-2 flex-column col-12 col-xl-8 col-lg-8 col-sm-6">
                            <div className="d-flex col-12 align-items-center justify-content-between">
                                <div className="d-flex align-items-center px-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.326" height="20.086" viewBox="0 0 14.326 17.086">
                                        <g id="Bookmark" transform="translate(1 1)">
                                            <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#053742" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#053742" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                        </g>
                                    </svg>

                                    <div className="text col-12 col-sm-10 d-flex w-100">
                                        <p className="font-bold title-custom p-0 mx-2 my-0 d-flex align-items-center" style={{marginTop:`${width>826?'2px':'4px'}`,fontSize:'18px',padding:'0',fontWeight:'bold',whiteSpace:'nowrap'}}>هتل های برگزیده شهر</p>
                                        <select style={{width: '30%',color: 'black'}}
                                         className="selectCity font-bold" value={city} onChange={(val) => setCity(val.target.value)}>
                                            {CitySearch.data.map(item=>(
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
                    {getData.loading ?
                        <div className='mt-5'>
                            <Shimmers6 selectedHeight={'400px'}/>
                        </div>
                     :
                    getData.data.length>0 && !getData.loading?
                    <Swiper
                    slidesPerView={'auto'}
                    modules={[Navigation]}
                    //     centeredSlides={true}
                    // centeredSlidesBounds= {true}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={28}
                    slidesPerGroup={1}

                    breakpoints={{
                    0: {
                        slidesPerView: 1.3,
                    },
                    700: {
                        slidesPerView: 2.3,
                    },
                    850: {
                        slidesPerView: 3,
                    },
                    1024: {
                        spaceBetween: 10,
                        slidesPerView: 3,
                    },
                    1180: {
                        slidesPerView: 3,
                    },
                    1300: {
                        slidesPerView:4,
                    },1700: {
                        slidesPerView:5,
                    },
                    }}
                   centeredSlidesBounds={true}
                    >
                        {getData.data.map((item)=>(
                            <div key={item}>
                                <SwiperSlide item={item.id} >
                                    <div item={item.id}>
                                        <div class="box-hotel">
                                            {!item.thumbnail? <img className="img-blog" src='../../../Images/noPicture.png' alt='no-picture'/>:
                                                <img className="img-blog" src={item.thumbnail.url} alt={item.id}/> }

                                            <Link href={`/hotels/${item.slug}`}>
                                                <div class="opacity-bg-parent">
                                                    <div class="info-img">

                                                    </div>
                                                    <div class="info-hotel">
                                                        <span className="font-bold" x-text="hotel.name">{item.title}</span>
                                                        <div class="footer-hotel-info">
                                                            <div class="location-hotel">
                                                                <img src="../../../Images/Location-white.svg" width="17" alt="آدرس-هتل"/>
                                                                <span x-text="hotel.city + ' - ' + hotel.location" style={{marginBottom: "0",fontSize:'13px'}}>{item.location}</span>
                                                            </div>
                                                            <div className="star d-flex align-items-center pb-1">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="image p-star-tour d-flex align-items-center">
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
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </div>

                        ))}

                    </Swiper>
                    : hotels.length == 0 ?
                    <div className="hotelNotFound">متاسفانه هتلی موجود نیست</div>:<NewLoader/>
}
        </div>
    );
};

export default HotelsSuggest;
