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
const Hotels = () => {
    const swiperRef = useRef();
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true)
    const [hotels, setHotels] = useState([]);
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
        setWidth(window.innerWidth)
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/city/getCities')
            .then(res => {setCities(res.data.data)})
        }
        getData()
    },[])
    const getData = async () => {
        await axios.post('https://api.hamnavaz.com/api/v1/hotel/getHotels',{isAdmin:0,city:city, search:search.hotel, page:page,paginate:true,perPage:12})
        .then(res => {setHotels(res.data.data),setLoading(false),console.log(res),setPaginate(res.data.meta)})
    }
    const searchHotel = ()=>{
        setLoading(true)
        console.log(city);
        console.log(hotels);
        getData()
        
        console.log(loading);
    }
    useEffect(()=>{
        setLoading(true)
        getData()
        
    },[])
    useEffect(() => {
        setLoading(true)
        getData()
        console.log(hotels);
    },[page])
    const [type, setType] = useState(3)
    const myRef = useRef(null)
    const executeScroll = () => { myRef.current.scrollIntoView()}
    return (
            <div className="mt-90 bodyVar">
            <Head>
            <title>بلیطجا | رزرو هتل</title>
        </Head>
            <NavHandler />
        <div className="row justify-content-center">
            <div style={{background: '#F7F7F7'}}>
                    <PictureBase/>
                    <PageTabls type={type} setType={setType} />
                    <h2 style={{margin:'2rem 0'}} className="font-bold-iransanse font-size-22 mt-3-mobi font-bold text-center ">
                        <span>رزرو هتل&nbsp;</span>
                        <span className="color-primary font-bold-iransanse"  ref={myRef}>
                        با چند کلیک
                      </span>
                    </h2>
                    <HotelsSearchBox searchHotel={searchHotel} setCity={setCity} search={search} setSearch={setSearch}/>
                    <div className={`${styles["hero-big-image"]} container`}>
                        <img
                        width=""
                        height=""
                        alt="بلیطجا-اسلایدر"
                        src="../../../../Images/hotel-bg-new.png"
                        />
                    </div>
                </div>
            <div className="col-md-10 mx-2">
                    {loading ?
                    <Loader/> :
                    hotels.length>0 && !loading?
                        <div className="row justify-content-center"
                        >
                            {hotels.map((item)=>(
                                            <Link href={`/hotel/${item.slug}`}>
                                    <div className="col-12 col-md-3 d-flex justify-content-center">
                                        <div class="box-hotel" style={{width: '95%'}}>
                                            <img  class="img-blog" src={item.thumbnail}/>
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
                                        </div>
                                    </div>
                                
                                            </Link>
                            ))}
                        </div>
                    : hotels.length == 0 ?
                    <div className="hotelNotFound">متاسفانه هتلی موجود نیست</div>:<Loader/>}
                    <div className="d-flex mt-5 justify-content-center">
                    {paginate?.links?.map((item)=>(
                        <>
                        {/* <span>{item.label}</span> */}
                        <span className={`px-1 cursor-pointer border rounded py-1 ${paginate.current_page == parseInt(item.label) && 'text-danger font-bold-iransanse' }`} 
                        onClick={()=>{setPage(item.label),executeScroll()}} 
                        dangerouslySetInnerHTML={{__html:item.label}} 
                        style={{margin:'auto 2px'}} />
                        

                        </>
                    ))}
                    </div>
                    </div>
        </div>
        <Footer />
            </div>
    );
};

export default Hotels;