import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import NavHandler from '../Components/share/NavHandler';
import Footer from '../sources/component/Footer.component';
import PageTabls from '../sources/component/PageTabs.component';
import dynamic from "next/dynamic";
import styles from "../../styles/Home.module.scss";

import SearchBox from '../sources/tour/SearchBox';
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh';
import HomePicture from '../sources/component/HomePicture';
import { Loader } from '../Utils/Loader';
const List = dynamic(()=>import( "../sources/tour/List"), {
  loading: () => <Loader/>,
});
const HotelsSuggest = dynamic(()=>import( "../sources/tour/HotelsSuggest"), {
  loading: () => <Loader/>,
});
const CitiesSuggest = dynamic(()=>import( "../sources/tour/CitiesSuggest"), {
  loading: () => <Loader/>,
});
const Posts = dynamic(()=>import( "../sources/tour/Posts"), {
  loading: () => <Loader/>,
});


const tours = () => {
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
        <div className='mt-5 pt-5 bodyVar'>
              {state.width >= 826 ? (
          <div className="hidden-xs mt-1 hidden-sm row">
            <div className="col-md-4">
              <img
                width=""
                height=""
                alt="بلیطجا- لوگو"
                src="../../../Images/map.webp"
                className={`${styles["hero-image-2"]} pull-right`}
              />
            </div>
            <div className="text-center col-md-4 pt-10 mt-5">
              <img
                width=""
                height=""
                alt="بلیطجا - لوگو"
                src="../../../Images/bilitja.webp"
                className={styles["hero-image-center"]}
              />
            </div>
            <div className="col-md-4">
              <img
                width=""
                height=""
                alt="بلیطجا - قطب نما"
                src="../../../Images/earth.webp"
                className={`${styles["hero-image-1"]} pull-left`}
              />
            </div>
          </div>
        ) : null}

        <div className={`${styles["heor-main-container"]}`}>
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
            <NavHandler />
                <div className="col-md-10 m-auto">
                <List ref={myRef} tourData={tourData} />
                <HotelsSuggest />
                <CitiesSuggest />
                  <Posts/>
                </div>
            <Footer />
        </div>
    );
};

export default tours;