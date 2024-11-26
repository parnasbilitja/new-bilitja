import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "../../sources/component/Footer.component";
import HomePicture from "../../sources/component/HomePicture";
import PageTabls from "../../sources/component/PageTabs.component";
import PictureBase from "../../sources/component/PictureBase";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
const CitiesSuggest = dynamic(() => import("../../sources/tour/CitiesSuggest"));
const HotelsSuggest = dynamic(() => import("../../sources/tour/HotelsSuggest"));
import List from "../../sources/tour/List"
const Posts = dynamic(() => import("../../sources/tour/Posts"));
const OfferdTours = dynamic(() => import("../../sources/tour/OfferdTours"));
import NavHandler from "../share/NavHandler";
import styles from "../../../styles/Home.module.scss";
import axios from "axios";
import { motion } from "framer-motion";
import SearchBox from "../../sources/tour/SearchBox";
import router, {useRouter, withRouter} from "next/router";
import {connect, useDispatch, useSelector} from "react-redux";

import {
  setDestLoc,
  setFlightDate,
  setNightNumber,
  setOrgLoc,
} from "../../Redux/newTours/Action";
import TourSearchBox from "../NewTours/Components/TourSearchBox";
import {fetchOfferdTour} from "../../Redux/OfferdTours/Action";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";


const ToursBase = (props) => {
  const [state, setState] = useState({
    open: false,
    searchReset: false,
    dateSelected: null,
    dateSelected2: null,
    width: 100,
    city: "",
  });
  const [type, setType] = useState(4);
  useEffect(() => {
    setState({ ...state, width: window.innerWidth });
  }, []);
  const [tourData, SetTourData] = useState([]);
  const [offeredtourData, setOfferedtourData] = useState([]);


  const router = useRouter();
  const toursHandler = (search) => {


    setState({ ...state, city: search?.slug ?search?.slug:null  });
    router.push(`تور-${search?.destination}/`)

  };



  const AlltoursHandler = (search,offered) => {


    setState({ ...state, city: search?.slug ?search?.slug:null  });
    axios
        .post("https://api.hotelobilit.com/api/v3.1/packages", {
          offered:offered,
          ...search,
          req_type:'package'
        }, {
          headers: {
            "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
          }
        })
        .then((res) => {
          if(offered===true){
            debugger
            setOfferedtourData(res.data)
          }else{
            SetTourData(res?.data?.data);

          }
        })
        .catch((err) => SetTourData(err.message));
  };
  const swiperRef = useRef();

  const myRef = useRef(null);
  const executeScroll = () =>
      myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  const handleClickScroll = () => {
    const element = document.getElementById("list");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    props.setOrgLoc({ name: "", code: "" });
    props.setDestLoc({ name: "", code: "" });
    props.setFlightDate({
      persianDate: "",
      miladiDate: "",
    });
    props.setNightNumber("");
    // toursHandler()
    // AlltoursHandler()
    AlltoursHandler(null,true)
  }, [router]);


  const [data, setData] = useState([])
  let getData = useSelector(state => state.DataReducer)
  const [width, setWidth] = useState();

  const dispatch=useDispatch()


  useEffect(() => {
    setWidth(window.innerWidth)

    if (getData?.data?.length<1) {
      dispatch(fetchOfferdTour())
    }
    // callData();
    setData(getData)

    // setWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    if (data.length<1) {
      setData(getData.data)
    }
  },[getData])



  const [widthMobi, setWidthMobi] = useState(
      typeof window !== "undefined" && getWindowSize()
  );
  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }
  useEffect(() => {
    function handleWindowResize() {
      setWidthMobi(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
  }, []);
  const[cities,setCities] = useState([])

  useEffect(() => {
    axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{hasTour:false})
        .then(response =>{
          // debugger
          const tours = response.data.data.filter(t=>t?.name==='استانبول' || t?.name==='آنتالیا'  || t?.name==='آلانیا' )
          debugger
          setCities(tours)
          // dispatch(fetchCitySucces(tours))
        })
        .catch(error=>{
          const errMsg = error.message
          // dispatch(fetchCityFailures(errMsg))
        })
    // setData(getData.data)

  }, [])

  useEffect(() => {
    console.log('pouya',cities)
  }, [cities]);

  let tourCities =[{name:'استانبول' , code:'IST',slug:'istanbul',image:'../../../../Images/istanbul.jpg'},{name:'آنتالیا' , code:'AYT',slug:'antalya',image:'../../../../Images/antalya.jpg'},{name:'آلانیا' , code:'GZP',slug:'alanya',image:'../../../../Images/alanya.jpg'}, {name:'دبی' , code:'"DXB"',slug:'dubai',image:'../../../../Images/dubai.jpg'},]
  return (
      <div className={""}>

        <Head>
          <title>بلیطجا | لیست تورها</title>
          {/*<meta name="google-site-verification" content="google-site-verification=z-i-kKLHqUdTjsvja701WQg4UWXrnyoIcqHXhygx0do" />*/}
        </Head>
        <NavHandler />
        <div
            className={``}
            style={{ marginTop: state.width >= 826 ? "" : "-0.8rem" }}
        >
          <Scrolltoprefresh />
          <div style={{ background: "#F7F7F7" }}>
            <div style={{transform:'translateY(14px)'}}>
              <PictureBase />

            </div>
            <PageTabls type={type} setType={setType} />
            <h2
                style={{ margin: "2rem 0 0 0" }}
                className="font-bold-iransanse font-size-22 font-bold text-center "
            >
              {router.asPath === '/tour' || router.asPath === '/' ? <>
                <span>رزرو تور &nbsp;</span>
                <span className="color-primary font-bold-iransanse">
              با چند کلیک
              </span>
              </> : <>
                <span>پکیج تور &nbsp;</span>
                <span className="color-primary font-bold-iransanse">
لحظه آخری و لاکچری              </span>
              </>}
            </h2>
            <div className="row justify-content-center">
              <div className={`col-md-10 ${styles["width-mobile-search"]}`}>
                {/* switch between tours type */}
                {/*<div*/}
                {/*  className={`d-flex ${styles["checkboxs_container"]} ${styles["w-100-mobi"]}`}*/}
                {/*>*/}
                {/*  <div className={styles["check"]}>*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        name=""*/}
                {/*        id=""*/}
                {/*        onChange={() => {*/}
                {/*          props.setTourType("tour",'/tour')*/}
                {/*          // props.setTourSwitch("tour")*/}
                {/*          // router.push('/tour')*/}
                {/*        }}*/}
                {/*        checked={props.tourSwitch === "tour" ? true : false}*/}
                {/*    />*/}
                {/*    <p htmlFor="">تور </p>*/}
                {/*  </div>*/}
                {/*  <div className={styles["check"]}>*/}
                {/*    <input*/}
                {/*      type="checkbox"*/}
                {/*      name="ارزان ترین"*/}
                {/*      id=""*/}
                {/*      onChange={() => {*/}
                {/*        props.setTourType("package-tour",'/tours')*/}
                {/*        // props.setTourSwitch("package-tour")*/}
                {/*        // router.push('/tours')*/}
                {/*      }*/}

                {/*    }*/}

                {/*      checked={props.tourSwitch === "package-tour" ? true : false}*/}

                {/*    />*/}
                {/*    <p htmlFor="">پکیج تور </p>*/}
                {/*  </div>*/}

                {/*</div>*/}
                {/* ////////////// */}
                {router.asPath === '/tours' || router.asPath === '/' ? (
                    <div className={styles['flight-container']} >
                      <SearchBox
                          dateSelected={state.dateSelected2}
                          executeScroll={handleClickScroll}
                          toursHandler={toursHandler}
                          setState={setState}
                          state={state}
                      />
                    </div>
                ) : (

                    <TourSearchBox />

                )}
              </div>
              <div>

                {router.asPath === '/tours' || router.asPath === '/' ?

                    <>
                      {width > 827 ?
                          <div className={`${styles["parentbackFight"]}`}>

                            <div style={{display: 'flex', justifyContent: 'center', columnGap: '12px', marginTop: '20px'}}>
                              {tourCities?.map((city, index) => (
                                  <a href={`تور-${city.name}/`}>
                                    <div style={{
                                      marginBottom: '2px',
                                      borderRadius: '50%',
                                      padding: '3px',
                                      background: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)'
                                    }}>
                                      <div style={{

                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        backgroundColor: 'white',
                                        padding: '2px'

                                      }}>
                                        <img style={{
                                          width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%',
                                        }} src={city.image}
                                             alt=""/>
                                      </div>
                                    </div>


                                    <p className={'text-center'} style={{fontWeight: "bold"}}>
                                      تور{city.name}
                                    </p>
                                  </a>


                              ))}

                            </div>


                          </div> :

                          <Swiper
                              modules={[Navigation]}
                              onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                              }}
                              slidesPerView={3}
                              spaceBetween={1}
                              slidesPerGroup={1}
                              centeredSlidesBounds={true}
                              breakpoints={{
                                0: {
                                  spaceBetween:1,
                                  slidesPerView: 2.2,
                                },
                                480: {
                                  spaceBetween:1,

                                  slidesPerView: 3,
                                },
                                855: {
                                  spaceBetween: 1,
                                  slidesPerView: 4,
                                },
                                1210: {
                                  spaceBetween: 1,
                                  slidesPerView: 5,
                                },

                              }}
                          >
                            <div className={`${styles["parentbackFight"]}`}>

                              <div
                                  style={{display: 'flex', justifyContent: 'center', columnGap: '12px', marginTop: '60px'}}>
                                {tourCities?.map((city, index) => (
                                    <SwiperSlide>
                                      <a href={`تور-${city.name}/`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column', marginTop:'10px'}}>
                                        <div style={{
                                          marginBottom: '2px',
                                          borderRadius: '50%',
                                          padding: '3px',
                                          width:'108px',
                                          height:'108px',
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          background: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)'
                                        }}>
                                          <div style={{

                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            overflow: 'hidden',
                                            backgroundColor: 'white',
                                            padding: '2px'

                                          }}>
                                            <img style={{
                                              width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%',
                                            }} src={city.image}
                                                 alt=""/>
                                          </div>
                                        </div>


                                        <p className={'text-center'} style={{fontWeight: "bold"}}>
                                          تور{city.name}
                                        </p>
                                      </a>
                                    </SwiperSlide>


                                ))}

                              </div>


                            </div>
                          </Swiper>
                      }






                    </>




                    :
                    <motion.div
                        initial="pageInitial"
                        animate="pageAnimate"
                        variants={{
                          pageInitial: {
                            opacity: 0,
                          },
                          pageAnimate: {
                            opacity: 1,
                          },
                        }}
                    >
                      <HomePicture state={state}/>
                    </motion.div>

                }

              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10 m-auto px-3 padd">
          <OfferdTours data={offeredtourData?.data}/>
          <CitiesSuggest/>

          <div id="list">
            <List ref={myRef} city={state.city} hideShowMore={true} shimmerNumber={5}/>
          </div>
          <HotelsSuggest/>
          {/*<Posts/>*/}
        </div>
        <Footer/>
      </div>
  );
};

const mapDispatchesToProps = (dispatch) => ({
  setOrgLoc: async (value) => dispatch(setOrgLoc(value)),
  setDestLoc: async (value) => dispatch(setDestLoc(value)),
  setFlightDate: async (value) => dispatch(setFlightDate(value)),
  setNightNumber: async (value) => dispatch(setNightNumber(value)),
});
export default withRouter(connect(null, mapDispatchesToProps)(ToursBase));
