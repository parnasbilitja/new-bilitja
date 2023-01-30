import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Footer from '../../sources/component/Footer.component';
import NavHandler from '../../Components/share/NavHandler';
import Scrolltoprefresh from '../../sources/component/Scrolltoprefresh';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PopUp from '../../sources/component/PopUp.component';
// import Swiper core and required modules
import { Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';

const hotel = (props) => {
    const [hotel, setHotel] = useState({})
    const [show, setShow] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        const getData = async () => {
            await axios.post(`https://api.hamnavaz.com/api/v1/hotel/getHotel/${props.Pathname.hotel}`,{isAdmin:0})
            .then(res => {setHotel(res.data.data)})
        }
        getData()
    },[])
    console.log(hotel);
    return (
        <>
        <NavHandler />
        <Scrolltoprefresh/>
        <div className="col-md-10 m-auto parent-info-hotel" style={{marginTop:'120px!important'}}>
            <div class="title-info-hotel">
                <div class="right">
                    <img src="/Images/Tag.png" width="35" alt="اطلاعات-هتل"/>
                    <div class="text">
                        <h2 class="title-fa">{hotel.name}</h2>
                        <h2 class="title-en">{hotel.nameEn}</h2>
                    </div>
                </div>
            </div>
            <div class="title-hotel">
                <div class="name-city-country">
                    <img src="/Images/Location.png" width="20" alt="آدرس-شهر و منطقه"/>
                    <span class="title-small-fa">شهر و منطقه :</span>
                    <span class="title-fa mr-2">{ hotel.city?.name}</span>
                    <span class="title-fa mr-2">{ hotel.city?.nameEn}</span>
                </div>
                <div class="rate-star">
                    <span class="title-small-fa">درجه هتل :</span>
                    <div className="star d-flex align-items-center pb-1">
                        <div className="d-flex align-items-center">
                            <div className="image d-flex align-items-center">
                            {(() => {
                                let stars = [];
                                for (let i = 1; i <= parseInt(hotel.stars); i++) {
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
            <div class="parent-gallery">
                <div class="right-gallery">
                    {hotel.images?.map((item,index)=>(
                        <>
                        {index >= 1 && index < 5 &&
                            <img class="top-right" src={item} alt=""/>
                        }
                        </>
                    ))}
                </div>
                <div class="left-gallery" style={{backgroundImage: `url(${hotel.images && hotel.images[0] && hotel.images[0]})`}}>
                    <div class="parent-view-all-photo">
                        <div class="btn-photos" onClick={() =>setShow(true)}>
                            <img class="d-none" src="https://api.hamnavaz.com/source/jadid/اس8.jpg" alt="مشاهده-عکس ها"/>
                            <img src="https://hamnavaz.com/img/Menu-hotel.svg" width="20" alt=""/>
                            <span class="text-dark">مشاهده همه عکس ها</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="about-hotel">
                <div class="map">
                    <div class="no-map">
                        <span>نقشه موجود نیست</span>
                    </div>
                    
                    <a class="btn-map">مسیریابی از مبدا شما !</a>
                    <div class="address">
                        <img src="https://hamnavaz.com/img/008-maps.svg" width="20" alt="آدرس-روی-نقشه"/>
                        <p class="text-en">{hotel.address}</p>
                    </div>
                    {/* <div class="telephone">
                        <img src="https://hamnavaz.com/img/003-telephone.svg" width="20" alt="تلفن-تماس"/>
                        <p> -</p>
                    </div> */}
                </div>
                <div class="info-about-hotel">
                    <h2>درباره {hotel.name} بیشتر بدانید :</h2>
                    <div class="scrollbar" id="style-1"></div>
                    <span class="editor">
                        <p dir="RTL" style={{marginBottom:"0cm",textAlign:'justify',lineHeight:'normal'}}>
                        {hotel.city?.description}
                        </p></span>
                </div>
            </div>
            <div className="">
                <div class="notes-hotel">
                    <div class="option">
                        <h2>امکانات هتل ، اتاق ها و خدمات دیگر در یک نگاه</h2>
                        <div class="d-flex flex-wrap align-items-center mt-5">
                            {hotel?.services && hotel?.services[0]?.services?.map(service =>(
                                <div key={service.id} class="col-6 col-sm-4 col-md-3">
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                    <span className="text-dark">{service.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Footer />
            <PopUp opened={show} closePopUp={setShow}>
                <Swiper
        // install Swiper modules
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    >
                        {hotel.images?.map(image => (
                            <SwiperSlide>
                                <div style={{paddingBottom: '30px'}}>
                                    <Image class="img-blog" src={image} width='800%' height='800%' />     
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </PopUp>
        </>
    );
};

hotel.getInitialProps = ({ query }) => {
    return {
      Pathname: query
    }
  }

export default hotel;