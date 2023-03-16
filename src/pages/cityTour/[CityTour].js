import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavHandler from '../../Components/share/NavHandler';
import Footer from '../../sources/component/Footer.component';
import Scrolltoprefresh from '../../sources/component/Scrolltoprefresh';
import Posts from '../../sources/tour/Posts';
import Questions from '../../sources/tour/Questions';
import TourData from '../../sources/tour/TourData';
import TourList from '../../sources/tour/TourList';

const CityTour = (props) => {
    const [ city, setCity ] = useState([])
    const [currentCity, setCurrentCity] = useState(props.Pathname.CityTour)
    const [search, setSearch] = useState(false)
    const refreshData = (val) => {
        setCurrentCity(val.target.value)
    }
    useEffect(() => {
        const getData = async () => {
            await axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{hasTour:true})
            .then(res => setCity(res.data.data))
        }
        getData()
    },[])
    return (
        <>
          <Scrolltoprefresh />
            <NavHandler/>
            <div className="mt-90 col-md-10 m-auto parent-info-city">
                <div class="search search-city-info w-100">
                    <ul class="tab-ul-list">
                        <li class="li-city"><a href="#about-tour" class="about-tab">تور ها</a></li>
                        <li class="li-city"><a href="#blog" class="news-tab">اخبار گردشگری </a></li>
                        <li class="li-city"><a href="#questions" class="question-tab">سوالات متداول</a></li>
                        <li class="b-none"><a href="#tours" class="tour-tab">توضیحات
                                تور</a></li>
                        <li class="border-floating"></li>
                    </ul>
                    <div class="box-search justify-content-end">
                        <div class="inp-form">
                            <select name="" id="" onChange={(val)=>refreshData(val)} value={currentCity}>
                                {city.map((item) => (
                                    <option key={item.name} value={item.name}>{item.name}</option>
                                ))}
                        </select>
                        </div>
                        <Link href={`/cityTour/${currentCity}`}>
                            <button class="btn-search btn-search-city" onClick={()=>setSearch(true)}>جستجو</button>
                        </Link>
                    </div>
                </div>
                <div className='mx-3'>
                    <TourList name={props.Pathname.CityTour} />
                    <TourData currentCity={currentCity} search={search} setSearch={setSearch} />
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