import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// Import Swiper styles
import 'swiper/css';
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { useState } from 'react';
import { useEffect } from 'react';
import { Loader } from '../../Utils/Loader';
import moment from 'moment-jalaali';
import Link from 'next/link';
import { useSelector ,useDispatch } from 'react-redux';
import { fetchOfferdTour } from '../../Redux/OfferdTours/Action';

const OfferdTours = (props) => {
    let getData = useSelector(state => state.DataReducer)
    const dispatch = useDispatch()

    const [width, setWidth] = useState(0)
    const swiperRef = useRef();
    const [data, setData] = useState([])
    
    useEffect(() => {
        if (getData?.data?.length<1) {
            dispatch(fetchOfferdTour())
        }
        // callData();
        setData(getData)
        
        setWidth(window.innerWidth)
    }, [])
    useEffect(() => {
        if (data.length<1) {
            setData(getData.data)
        }
    },[getData])
    
    function moneyFormat(input) {
        return parseFloat(input)
          .toFixed(1)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
          .split(".")[0];
      }
    return (
        <div className="pb-4 mx-2 mt-5">
            <div className="d-flex flex-wrap align-items-center justify-content-between mt-2">
                        <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-4 col-12">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <svg className="ms-3" xmlns="http://www.w3.org/2000/svg" width="30.326" height="30.086" viewBox="0 0 14.326 17.086">
                                        <g id="Bookmark" transform="translate(1 1)">
                                            <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#ff0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                            <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#279692" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} />
                                        </g>
                                    </svg>
                                    <div className="text">
                                        <h5 className="font-bold title-custom">تور لحظه آخری و آفری و ارزان قیمت</h5>
                                        <p className="subtitle-custom font-size-13">مشاهده مناسب ترین تور های لحظه آخری</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {width>=826 &&
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
            <Loader/> :
          <Swiper
          spaceBetween={20}
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
              slidesPerView: 4.7,
          },
          }}
              pagination={{
                  clickable: false,
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
            }}
              navigation={false} modules={[Navigation]}
              className="mySwiper"
          >
            {data?.map((item)=>(
              <SwiperSlide key={item.id}>
                  <div className="box-special-tour" key={item.id}>
                      <div className="img-special-tour">
                      <Link  href={item.slug}>
                          <a>
                              <div className="hover-info-img animated pulse">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16.085" height="22.888"
                                       viewBox="0 0 16.085 22.888">
                                      <path id="Attachment_1" data-name="Attachment 1"
                                            d="M15.129,2.531s.8,2.8-1.01,9.564c-2.459,9.176-5.038,11.074-8.9,10.038S.069,18.166,2.528,8.99,10.11.909,11.36,3.074c1.414,2.449-.88,9.082-.88,9.082s-1.5,5.291-3.838,4.666c-3.381-.906.4-9.211.4-9.211"
                                            transform="translate(-0.285 -0.488)" fill="none" stroke="#fff"/>
                                  </svg>
                                  <Link href={item.slug} className="view-details-more text-white" rel="noreferrer">
                                        مشاهده جزئیات بیشتر
                                    </Link>
                              </div>
                              <img
                                  src={item.endCity.images[Math.floor(Math.random()*item.endCity.images.length)] }
                                  alt={item.title}/>
                          </a>
                          </Link>
                      </div>
                      <div className="top-info-tour-special">
                          <div className="day">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                   viewBox="0 0 24 24.998">
                                  <path id="Moon_1" data-name="Moon 1"
                                        d="M23,16.851l.925.38a1,1,0,0,0-1.372-1.275ZM10.016,1l.807.591A1,1,0,0,0,9.8.023ZM18.4,16.937a9.525,9.525,0,0,1-9.437-9.61h-2A11.525,11.525,0,0,0,18.4,18.937Zm4.157-.98a9.256,9.256,0,0,1-4.157.98v2a11.256,11.256,0,0,0,5.053-1.192Zm-.477.514A10.444,10.444,0,0,1,12.441,23v2a12.444,12.444,0,0,0,11.484-7.767ZM12.441,23A10.536,10.536,0,0,1,2,12.368H0A12.536,12.536,0,0,0,12.441,25ZM2,12.368A10.591,10.591,0,0,1,10.23,1.977L9.8.023A12.591,12.591,0,0,0,0,12.368ZM8.958,7.327a9.678,9.678,0,0,1,1.865-5.736L9.209.409A11.679,11.679,0,0,0,6.958,7.327Z"
                                        transform="translate(0 0)" fill="#212135"/>
                              </svg>

                              <span>{item.dayNum} روز و {item.nightNum} شب</span>
                          </div>
                          <div className="location">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"
                                   height="20">
                                  <path
                                      d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"/>
                                  <path
                                      d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z"/>
                              </svg>

                              <span>{item.stCity.name}-{item.endCity.name}</span>
                          </div>
                      </div>
                      <div className="mid-info-tour-special">
                          <div className="inner-mid-info-tour-special w-100">
                              <Link href={item.slug} rel="noreferrer" className='cursor-pointer'>
                                <a>
                                    <h2 className="title-tour-special cursor-pointer " style={{fontSize: '15px'}}>{item.title}</h2>
                                </a>
                              </Link>
                              <div className="date-special">
                                <span 
                                    className="from">{moment((item.transfers[0].dateTime.split(' ')[0])).locale('en').format('jYYYY/jMM/jDD')}</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16.828"
                                       viewBox="0 0 18 16.828">
                                      <g id="Left_Right_2" data-name="Left Right 2"
                                         transform="translate(0 0.414)">
                                          <path id="Path_1005" data-name="Path 1005" d="M6,1,1,6H17" fill="none"
                                                stroke="#212135"/>
                                          <path id="Path_1006" data-name="Path 1006" d="M12,15l5-5H1" fill="none"
                                                stroke="#212135"/>
                                      </g>
                                  </svg>

                                  <span className="to">{moment((item.transfers[1].dateTime.split(' ')[0])).locale('en').format('jYYYY/jMM/jDD')}</span>
                              </div>
                          </div>
                          <div className="bottom-info-tour-special">
                              <div className="title-price">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                       viewBox="0 0 24.109 24">
                                      <g id="Ticket" transform="translate(-0.023)">
                                          <path id="Path_1168" data-name="Path 1168"
                                                d="M2.532,9.817a4.474,4.474,0,0,1-.727-.022l-.21.978.21-.978A1.033,1.033,0,0,1,1.031,9a3.974,3.974,0,0,1,0-.682,10.8,10.8,0,0,1,.479-3.428,5.241,5.241,0,0,1,2.48-3.015C5,1.307,6.574,1,9.778,1h4.444c3.2,0,4.781.307,5.789.872a5.241,5.241,0,0,1,2.48,3.015,10.8,10.8,0,0,1,.479,3.428,3.976,3.976,0,0,1,0,.682l.984.18L22.969,9a1.033,1.033,0,0,1-.774.8,4.473,4.473,0,0,1-.727.022,2.334,2.334,0,0,0-2.186,2.456,2.334,2.334,0,0,0,2.186,2.456,4.352,4.352,0,0,1,.713.022,1.048,1.048,0,0,1,.778.815,3.662,3.662,0,0,1-.008.647,9.522,9.522,0,0,1-.459,2.9,5.241,5.241,0,0,1-2.48,3.015C19,22.693,17.426,23,14.222,23H9.778c-3.2,0-4.781-.307-5.789-.872a5.241,5.241,0,0,1-2.48-3.015,9.522,9.522,0,0,1-.459-2.9,3.649,3.649,0,0,1-.008-.647,1.048,1.048,0,0,1,.778-.815,4.351,4.351,0,0,1,.712-.022,2.334,2.334,0,0,0,2.186-2.456A2.334,2.334,0,0,0,2.532,9.817Z"
                                                fill="none" stroke="#212135" stroke-width="2"/>
                                          <path id="Path_1169" data-name="Path 1169"
                                                d="M15,4a1,1,0,0,1,1,1V7a1,1,0,0,1-2,0V5A1,1,0,0,1,15,4Zm0,6a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V11A1,1,0,0,1,15,10Zm1,7a1,1,0,0,0-2,0v2a1,1,0,0,0,2,0Z"
                                                fill="#212135" fillRule="evenodd"/>
                                      </g>
                                  </svg>
                                  <span>شروع قیمت از :</span>
                              </div>
                              <div className="d-flex align-items-center">
                                  <strong className="price-tour-special ml-2 mr-2">{moneyFormat(item.minPrice)}</strong>
                                  <strong className="price-tour-special " ref={props.myRef}>
                                      تومان </strong>
                              </div>

                          </div>
                      </div>
                  </div>
              </SwiperSlide>
              ))}
          </Swiper>
        }
      </div>
    );
};

export default OfferdTours;
