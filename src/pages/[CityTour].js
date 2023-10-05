import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavHandler from '../Components/share/NavHandler';
import Footer from '../sources/component/Footer.component';
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh';
import TourData from '../sources/tour/TourData';
import TourList from '../sources/tour/TourList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCity } from '../Redux/citiesSuggest/Action';
import Head from 'next/head';
import {tourName} from "../Utils/data";
import router from "next/router";

const CityTour = (props) => {
    // console.log(props.Pathname.CityTour.slice(4,props.Pathname.CityTour.length));
    let city = useSelector(state => state.CityReducer)
    const dispatch = useDispatch()

    const [currentCity, setCurrentCity] = useState(props.Pathname.CityTour.slice(4,props.Pathname.CityTour.length))
    const [search, setSearch] = useState(false)
    const refreshData = (val) => {
        setCurrentCity(val.target.value)
    }
    useEffect(() => {
        // console.log(city);
        if (city?.data?.length<1) {
            dispatch(fetchCity())
        }
    }, [])

    useEffect(()=>{
        setCurrentCity(props.Pathname.CityTour.slice(4,props.Pathname.CityTour.length))
    },[props.Pathname])

    useEffect(()=>{

        console.log(currentCity)
    },[currentCity])

    return (
        <>
            <Head>
                <title> تور {props.Pathname.CityTour.slice(4,props.Pathname.CityTour.length)} | بلیطجا </title>
            </Head>
            <NavHandler/>
            <div>
                <Scrolltoprefresh />
                <div className='padd'>
                    <div className="mt-90 col-md-10 m-auto parent-info-city">
                        <div className="search search-city-info w-100">
                            <ul className="tab-ul-list">
                                <li className="li-city"><a href="#about-tour" className="about-tab">تور ها</a></li>
                                <li className="li-city"><a href="#blog" className="news-tab">اخبار گردشگری </a></li>
                                <li className="li-city"><a href="#questions" className="question-tab">سوالات متداول</a></li>
                                <li className="b-none"><a href="#tours" className="tour-tab">توضیحات
                                    تور</a></li>
                                <li className="border-floating"></li>
                            </ul>
                            <div className="box-search justify-content-end px-sm-2 " >
                                <div className="inp-form">
                                    <select name="" id="" onChange={(val)=> {
                                        refreshData(val)
                                    }} value={currentCity}>
                                        {!search && <option value="" selected> شهر خود را انتخاب کنید</option>}

                                        {city.data.map((item) => (
                                            <option key={item.name} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <Link href={`تور-${currentCity}/`}>
                                    <button className="btn-search btn-search-city" onClick={()=>setSearch(true)}>جستجو</button>
                                </Link>
                            </div>
                        </div>
                        <div className='mx-3'>
                            <TourList name={props.Pathname.CityTour} />
                            <TourData currentCity={currentCity} search={search} setSearch={setSearch} route={props.Pathname.CityTour.slice(4,props.Pathname.CityTour.length)} />
                        </div>
                    </div>
                </div>
            </div>


            <Footer/>
        </>
    );
};

CityTour.getInitialProps = ({ query }) => {
    return {
        Pathname: query
    }
}

export default CityTour;