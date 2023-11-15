import axios from 'axios';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import NavHandler from '../Components/share/NavHandler';
import Footer from '../sources/component/Footer.component';
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh';
import TourData from '../sources/tour/TourData';
import TourList from '../sources/tour/TourList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCity} from '../Redux/citiesSuggest/Action';
import Head from 'next/head';
import {tourName} from "../Utils/data";
import router from "next/router";
import TourSearchBox from "../Components/NewTours/Components/TourSearchBox";
// import OfferdTours from "../sources/tour/OfferdTours";
import {fetchOfferdTour} from "../Redux/OfferdTours/Action";
import dynamic from "next/dynamic";
const OfferdTours = dynamic(() => import("../sources/tour/OfferdTours"));

const CityTour = (props) => {
    // console.log(props.Pathname.CityTour.slice(4,props.Pathname.CityTour.length));
    let city = useSelector(state => state.CityReducer)
    const dispatch = useDispatch()

    const [currentCity, setCurrentCity] = useState(props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length))
    const [search, setSearch] = useState(false)
    const refreshData = (val) => {
        setCurrentCity(val.target.value)
    }
    useEffect(() => {
        // console.log(city);
        if (city?.data?.length < 1) {
            dispatch(fetchCity())
        }
    }, [])

    useEffect(() => {
        setCurrentCity(props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length))
    }, [props.Pathname])

    useEffect(() => {

        console.log(currentCity)
    }, [currentCity])


    const [data, setData] = useState([])
    const [newData, setNewData] = useState([])
    let getData = useSelector(state => state.DataReducer)
    // const dispatch=useDispatch()


    useEffect(() => {
        if (getData?.data?.length < 1) {
            dispatch(fetchOfferdTour())
        }
        // callData();
        setData(getData)

        // setWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        if (data.length < 1) {
            setData(getData.data)
        }
    }, [getData])

    useEffect(() => {
        if (data) {
            setNewData(data?.filter(city => city.endCity.name === props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length)))
        }

    }, [data])



    // const [widthMobi, setWidthMobi] = useState(
    //     typeof window !== "undefined" && getWindowSize()
    // );
    //
    // function getWindowSize() {
    //     const {innerWidth} = window;
    //     return innerWidth;
    // }
    //
    // useEffect(() => {
    //     function handleWindowResize() {
    //         setWidthMobi(getWindowSize());
    //     }
    //
    //     window.addEventListener("resize", handleWindowResize);
    // }, []);

    const [isModal, setIsmodal] = useState(false)

    return (
        <>
            <Head>
                <title> تور {props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length)} | بلیطجا </title>
            </Head>
            <NavHandler/>
            <div className='mt-lg-5 margin-topsm-1rem'>
                <button className='toursearch' onClick={() => setIsmodal(true)}>
                    تورِ تو آنلاین بگیر!
                </button>
                <Scrolltoprefresh/>
                <div className='padd'>
                    <div style={{ padding: '0 7rem'}} className='hidestat'>
                        <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-4 col-12 ">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.326" height="20.086"
                                         viewBox="0 0 14.326 17.086">
                                        <g id="Bookmark" transform="translate(1 1)">
                                            <path id="Path_835" data-name="Path 835"
                                                  d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z"
                                                  transform="translate(-1 -1)" fill="none" stroke="#053742"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                            <path id="Path_836" data-name="Path 836"
                                                  d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911"
                                                  transform="translate(-4.468 -2.262)" fill="none" stroke="#053742"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        </g>
                                    </svg>
                                    <div className="text mx-2">
                                        <h5 className="font-bold m-0 title-custom">تورِ تو آنلاین بگیر! </h5>
                                        {/*<p className='subtitle-custom m-0'>ارزان ترین و با کیفیت ترین ها</p>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom d-flex align-items-center mt-3 mb-3">
                            <div className="border-right"></div>
                            <div className="border-left"></div>
                        </div>
                        <TourSearchBox/>
                    </div>
                    {isModal &&
                        <div className='modalContainer'>
                            <div className='modal12'>
                                <div style={{display: 'flex', justifyContent: "flex-end", width: '100%'}}>
                                    <div className='close' onClick={() => setIsmodal(false)}>X</div>
                                </div>
                                <TourSearchBox/>
                            </div>

                        </div>}

                    {newData.length>0 &&
                        <div className='padding-lg-6'>
                            <OfferdTours data={newData}/>
                        </div>
                    }
                    <div className="col-md-10 m-auto parent-info-city">
                        {/*<div className="search search-city-info w-100">*/}
                        {/*    <ul className="tab-ul-list">*/}
                        {/*        <li className="li-city"><a href="#about-tour" className="about-tab">تور ها</a></li>*/}
                        {/*        <li className="li-city"><a href="#blog" className="news-tab">اخبار گردشگری </a></li>*/}
                        {/*        <li className="li-city"><a href="#questions" className="question-tab">سوالات متداول</a></li>*/}
                        {/*        <li className="b-none"><a href="#tours" className="tour-tab">توضیحات*/}
                        {/*            تور</a></li>*/}
                        {/*        <li className="border-floating"></li>*/}
                        {/*    </ul>*/}
                        {/*    <div className="box-search justify-content-end px-sm-2 " >*/}
                        {/*        <div className="inp-form">*/}
                        {/*            <select name="" id="" onChange={(val)=> {*/}
                        {/*                refreshData(val)*/}
                        {/*            }} value={currentCity}>*/}
                        {/*                {!search && <option value="" selected> شهر خود را انتخاب کنید</option>}*/}

                        {/*                {city.data.map((item) => (*/}
                        {/*                    <option key={item.name} value={item.name}>{item.name}</option>*/}
                        {/*                ))}*/}
                        {/*            </select>*/}
                        {/*        </div>*/}
                        {/*        <Link href={`تور-${currentCity}/`}>*/}
                        {/*            <button className="btn-search btn-search-city" onClick={()=>setSearch(true)}>جستجو</button>*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className='mx-3'>
                            <TourList name={props.Pathname.CityTour}/>
                            <TourData currentCity={currentCity} search={search} setSearch={setSearch}
                                      route={props.Pathname.CityTour}/>
                        </div>
                    </div>
                </div>
            </div>


            <Footer/>
        </>
    );
};

CityTour.getInitialProps = ({query}) => {
    return {
        Pathname: query
    }
}

export default CityTour;