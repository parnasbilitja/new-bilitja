import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Footer from '../../sources/component/Footer.component';
import HomePicture from '../../sources/component/HomePicture';
import PageTabls from '../../sources/component/PageTabs.component';
import PictureBase from '../../sources/component/PictureBase';
import Scrolltoprefresh from '../../sources/component/Scrolltoprefresh';
import CitiesSuggest from '../../sources/tour/CitiesSuggest';
import HotelsSuggest from '../../sources/tour/HotelsSuggest';
import List from '../../sources/tour/List';
import SearchBox from '../../sources/tour/SearchBox';
import NavHandler from '../share/NavHandler';
import styles from "../../../styles/Home.module.scss";
import Posts from '../../sources/tour/Posts';
import OfferdTours from '../../sources/tour/OfferdTours';

const ToursBase = () => {
    const [state,setState] = useState({
        open: false,
        searchReset:false,
        dateSelected: null,
        dateSelected2: null,
        width: 100,
        city:''
      });
      const [type, setType] = useState(2) 
    useEffect(()=>{
        
        setState({...state,
          width: window.innerWidth,
        });
    },[])
    const [tourData, SetTourData ] = useState([])

    const toursHandler = (search) => {
      setState({...state, city:search.slug})
      axios.post('https://api.hamnavaz.com/api/v1/tour/getTours',{city:state.city})
        .then(res=>{SetTourData(res.data.data)})
        .catch((err)=>SetTourData(err.message))
    }

    const myRef = useRef(null)
    const executeScroll = () => { myRef.current.scrollIntoView()}
    return (
        <div className={"mt-1"}>
         <PictureBase/>
                <NavHandler />
        <div className={`${styles["heor-main-container"]}`} style={{marginTop: state.width>=826?'-1rem':'5rem' }}>
            <Head>
                <title>بلیطجا | لیست تورها</title>
            </Head>
          <Scrolltoprefresh />
          <PageTabls type={type} setType={setType} />
          <div className="row justify-content-center">
            <div className={`col-md-10 ${styles["width-mobile-search"]}`}>
              <SearchBox 
              dateSelected={state.dateSelected2}
              executeScroll={executeScroll} 
              toursHandler={toursHandler} 
              setState={setState} 
              state={state}  
               />
            </div>
              <div ref={myRef}>
                  <HomePicture state={state} />
              </div>
          </div>
          </div>
                <div className="col-md-10 m-auto">
                  <OfferdTours/>
                  <List ref={myRef} tourData={tourData} />
                  <HotelsSuggest />
                  <CitiesSuggest />
                  <Posts />
                </div>
            <Footer />   
        </div>
    );
};

export default ToursBase;