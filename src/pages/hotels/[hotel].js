import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
import List from '../../sources/tour/List';
import Head from "next/head";
import {isEmpty} from "../../Utils/newTour";
// import MapComponent from "@/sources/component/Map.component";
import dynamic from "next/dynamic";
// import {getCityInfo} from "@/pages/[CityTour]";
const MapComponent = dynamic(() =>
        import("../../sources/component/Map.component"),
    {
        ssr: false
    }
);
const hotel = (props) => {
    const router=useRouter()
    // const [hotel, setHotl] = useState({})
    const [show, setShow] = useState(false)
    //     const getData = async () => {
    //     debugger
    //         await axios.get(`https://api.hotelobilit.com/api/v2/hotels/${props.Pathname.hotel}`,{
    //             headers:{
    //                 "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP'
    //             }
    //         })
    //         .then(res => {
    //             console.log(res.data)
    //
    //             setHotel(res.data.data)})
    //     }
    // useEffect(()=>{
    //     getData()
    //     //
    // },[])
    // //
    return (
        <>
                <NavHandler />
            <div className='padd'>
                <Scrolltoprefresh/>
                <div className="col-md-10 m-auto parent-info-hotel marginTop120 my-5">
                    <Head>

                        {
                            isEmpty(props.hotel) ? <title> لیست هتل ها | بلیطجا</title> :<title> {`${props.hotel?.title} | ${props.hotel.titleEn}`} | بلیطجا</title>
                        }

                    </Head>
                    <div className="title-info-hotel">
                        <div className="right">
                            <img src="/Images/Tag1.png" width="35" alt="اطلاعات-هتل" className='mx-2'/>
                            <div className="text">
                                <h2 className="title-fa" style={{whiteSpace:'nowrap'}}>{props.hotel?.title}</h2>
                                <h2 className="title-en">{props.hotel?.titleEn}</h2>
                            </div>
                        </div>
                        <div className='w-100 d-flex justify-content-end'>
                            {
                                props.hotel?.city?.slug &&
                                <button style={{padding:'1rem',backgroundColor:'#e20000' ,borderRadius:'15px',color:'#fff'}} onClick={()=>{
                                    let citytour= '/' + 'تور-' +props.hotel?.city?.name
                                    router.push(citytour)
                                }}>{`تور لاکچری با بهترین قیمت  ${props.hotel?.city?.name}`}</button>
                            }

                        </div>
                    </div>
                    <div className="title-hotel">
                        <div className="name-city-country">
                            <img src="/Images/Location.svg" width="20" alt="آدرس-شهر و منطقه"/>
                            <span className="title-small-fa">آدرس و منطقه :</span>
                            <span className="title-fa mr-2">{ props.hotel?.address}</span>
                            <span className="title-fa mr-2">{ props.hotel?.location}</span>
                        </div>
                        <div className="rate-star">
                            <span className="title-small-fa">درجه هتل :</span>
                            <div className="star d-flex align-items-center pb-1">
                                <div className="d-flex align-items-center">
                                    <div className="image d-flex align-items-center">
                                        {(() => {
                                            let stars = [];
                                            for (let i = 1; i <= parseInt(props.hotel?.stars); i++) {
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
                    <div className="parent-gallery">
                        <div className="right-gallery">
                            {props.hotel.gallery?.map((item,index)=>(
                                <>
                                    {index >= 1 && index < 5 &&
                                        <img className="top-right" src={item.url} alt=""/>
                                    }
                                </>
                            ))}
                        </div>
                        <div className="left-gallery" style={{backgroundImage: `url(${props.hotel?.gallery && props.hotel?.gallery[0]?.url && props.hotel.gallery[0]?.url})`}}>
                            <img src={props.hotel.thumbnail?.url ? props.hotel.thumbnail?.url:props.hotel.gallery[0]?.url} style={{width:'100%',height:'100%',position:'absolute', zIndex:'-1'}} alt=""/>
                            <div className="parent-view-all-photo">
                                <div className="btn-photos" onClick={() =>setShow(true)}>
                                    <img className="d-none" src="https://api.hamnavaz.com/source/jadid/اس8.jpg" alt="مشاهده-عکس ها"/>
                                    <img src="../../../Images/Menu-hotel.svg" width="20" alt=""/>
                                    <span className="text-dark" style={{cursor:'pointer'}}>&nbsp;مشاهده همه عکس ها</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-hotel">
                        <div className="map">
                            <div className="no-map">
                                {props.hotel?.coordinates && <MapComponent coordinates={props.hotel?.coordinates}/>}
                            </div>
                            <a className="btn-map">مسیریابی از مبدا شما !</a>
                            <div className="address">
                                <img src="../../../Images/008-maps.svg" width="20" alt="آدرس-روی-نقشه"/>
                                <p className="text-en" style={{textAlign:'justify'}}>{props.hotel?.address}</p>
                            </div>
                            {/* <div class="telephone">
                        <img src="https://hamnavaz.com/img/003-telephone.svg" width="20" alt="تلفن-تماس"/>
                        <p> -</p>
                    </div> */}
                        </div>
                        <div className="info-about-hotel">
                            <h2>درباره {props.hotel.title} بیشتر بدانید :</h2>
                            <div className="scrollbar" id="style-1"></div>
                            <span className="editor">
                        <p dir="RTL" style={{marginBottom:"0cm",textAlign:'justify',lineHeight:'normal'}} className='font-size-15' >{props.hotel?.description}</p>
                                {/* {hotel.city?.description} */}
                                {/* </p> */}
                        </span>
                        </div>
                    </div>
                    <div className="">
                        <div className="notes-hotel">
                            <div className="option">
                                <h2 className="font-size-15 font-bold mb-4">امکانات هتل ، اتاق ها و خدمات دیگر در یک نگاه</h2>
                                <div className="d-flex flex-wrap align-items-center" style={{rowGap:'10px'}}>
                                    {props.hotel?.facilities
                                        && props.hotel?.
                                            facilities?.map(service =>(
                                        <div key={service.id} className="col-6 col-sm-4 col-md-3 d-flex">
                                            <FontAwesomeIcon icon={faAngleLeft} className='p-0 m-0' />
                                            <p className="text-center font-size-14 font-bold m-0 p-0 px-2">{' '} {service.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {props.hotel.tours?.length > 0 &&
                    <div className="row justify-content-center">
                        <div className='col-10'>
                            <List name='hotel' tourData={props.hotel.tours}/>
                        </div>
                    </div>
                }

                <PopUp opened={show} closePopUp={setShow}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {props.hotel.gallery?.map(image => (
                            <SwiperSlide>
                                <div style={{paddingBottom: '30px'}}>
                                    <Image class="img-blog" src={image.url} width='1200%' height='1200%' />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </PopUp>
            </div>
            <Footer />
        </>

    );
};

const getData = async (hotelslug) => {
    try {
        const response = await axios.get(`https://api.hotelobilit.com/api/v2/hotels/${hotelslug}`, {
            headers: {"x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP',
                referer:'hamnavaz.com'
            },

        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }


        }
export async function getServerSideProps(context) {
    // Access the query parameter

    console.log('again',context.query)
    let hotel =await getData(encodeURIComponent(context.query.hotel))
    console.log('end',hotel)
    return {
        props: {
            hotel:hotel
        },
    };
}

// hotel.getInitialProps = ({ query }) => {
//     return {
//       Pathname: query
//     }
//   }

export default hotel;
