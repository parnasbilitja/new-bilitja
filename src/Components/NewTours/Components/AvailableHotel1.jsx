import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourSearchBox from "../../NewTours/Components/TourSearchBox";
import styles from "../../../../styles/AvailableHotels.module.scss";
import Image from "next/image";
import {
    setDestLoc,
    setFlightDate,
    setLoader,
    setOrgLoc,
    setNightNumber
} from "../../../Redux/newTours/Action";
import {
    jalaliDateReformater,
    jalaliToMiladiConvertor,
    numberRounder,
    numberWithCommas,
    startBuilder,
} from "../../../Utils/newTour";
import NavHandler from "../../../Components/share/NavHandler";
// import { Loader } from "../../Utils/Loader";
import HotelsSideBarSearch from "../../../Components/NewTours/Components/subComponents/HotelsSideBarSearch.component";
import { motion } from "framer-motion";
import Footer from "../../../sources/component/Footer.component";
import NewLoader from "../../../Components/NewTours/Components/subComponents/NewLoader";
import Scrolltoprefresh from "../../../sources/component/Scrolltoprefresh";
// import Paginate from "../../Components/NewTours/Components/subComponents/Paginate";
import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MapPopUpComponent from "../Components/subComponents/MapPopUp.component";

const AvFlight = dynamic(() =>
        import("../../../Components/NewTours/AvailableFlightBasedonSelectedTour"),
    {
        ssr:false
    }
);

const AvailableHotel1 = () => {
    //router page
    const router = useRouter();

    const dispatch = useDispatch();
    /////////set date from url to state
    const [date, setDate] = useState();
    const [destination, setDestination] = useState();
    const [origin, setOrigin] = useState();
    const [night, setNight] = useState();
    const [jalaliDate, setJalaliDate] = useState();
    const [stars, setStars] = useState();
    const [totalPage, setTotalPage] = useState(1);

    /////////////////////////////
    const searchData = useSelector((state) => state.destandoriginCitiesTour);

    //state for getting av hotel from api
    const [hotels, setHotels] = useState([]);

    const hotelstarPicker = (hotelsArr) => {
        const stars = [];
        hotelsArr.map((hotel) => stars.push(hotel.stars));
        return stars;
    };

    const [selectedSrc, setSelectedSrc] = useState([]);
    const [selectedDest, setSelectedDest] = useState([]);


    const [showInMap,setShowInMap]=useState(false)
    const HotelCall = (page = 1) => {
        const newDate = router.query.stDate?.slice(0, 10);
        const finalDate = jalaliToMiladiConvertor(newDate);
        axios
            .post(
                `https://hotelobilit-api.iran.liara.run/api/v1/hotels/search?page=${page}`,
                {
                    date: finalDate,
                    destination: router.query?.dest,
                    keywords: null,
                    orderBy: 1,
                    origin: router.query?.origin,
                    stars: null,
                    stayCount: router.query?.night,
                }
            )
            .then((res) => {
                setHotels(res?.data?.data?.data);
                setTotalPage(res.data.data.last_page);
                setStars(hotelstarPicker(res?.data?.data?.data));
                dispatch(setLoader(false));
            })
            .catch((err) => {
                console.log(err);
            });
    };



    useEffect(() => {
        ///get date from url
        const newDate = router.query.stDate?.slice(0, 10);
        const finalDate = jalaliToMiladiConvertor(newDate);
        setDate(finalDate);
        setDestination(router.query?.dest);
        setOrigin(router.query?.origin);
        setNight(router.query?.night);

        console.log(router)
    }, [router]);

    useEffect(()=>{
        dispatch(setLoader(true));
        const newDate = router.query.stDate?.slice(0, 10);
        setJalaliDate(newDate);
        const finalDate = jalaliToMiladiConvertor(newDate);
        setDate(finalDate);
        /////convert jalali to miladi

        if (finalDate && router.query?.dest && router.query?.origin && router.query?.night) {
            HotelCall();
            setNightNumber(night)
        }

        if (router.query?.dest && router.query?.origin) {
            axios
                .post("https://hotelobilit-api.iran.liara.run/api/v1/cities", {
                    hasHotel: 1,
                    hasFlight: 0,
                })
                .then((res) => {
                    const destLoc = res.data.data;
                    const finddest = destLoc.find((o) => o.code === router.query?.dest);
                    // setSelectedDest(finddest)
                    dispatch(setDestLoc(finddest));
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .post("https://hotelobilit-api.iran.liara.run/api/v1/cities", {
                    hasHotel: 0,
                    hasFlight: 1,
                })
                .then((res) => {
                    const orgLoc = res.data.data;
                    const findsrc = orgLoc.find((o) => o.code === router.query?.origin);
                    // setSelectedSrc(findsrc)
                    dispatch(setOrgLoc(findsrc));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        dispatch(
            setFlightDate({
                persianDate: newDate,
                miladiDate: finalDate,
            })
        );
    },[router?.query])
    //////////////////width
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
    const [showFilter, setShowFilter] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);

    useEffect(() => {
        console.log(hotels);
    }, [hotels]);

    useEffect(() => {
        if (showFilter && widthMobi < 500) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showFilter]);

    return (
        <>
            <NavHandler />

            <div className={styles["main-section"]}>
                <Head>
                    <title>بلیطجا | تور</title>
                </Head>

                {router.query.availablehotels?.length === 1 ? (
                    <>

                        {widthMobi<868&&

                            <div  className={styles.menubarcontainer} >
                                <div style={{}} className={styles.menubar}>
                                    <div className={styles.menubarItem}  onClick={()=> {
                                        setShowSearchBox(!showSearchBox)

                                    }}>
                                        <svg  id="Glyph" version="1.1" viewBox="0 0 32 32" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" ><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
                                        <p>جستجو</p>
                                    </div>

                                    <div className={styles.menubarItem} onClick={()=> {
                                        router.push('/tours')
                                    }}>
                                        <svg baseProfile="tiny" height="20px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="20px"  xmlns="http://www.w3.org/2000/svg" ><path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z"/></svg>
                                        <p >خانه</p>
                                    </div>

                                    <div className={styles.menubarItem} onClick={()=> {
                                        setShowFilter(!showFilter)
                                        console.log(showFilter)
                                    }}>
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none" width="16px" height="16px"/><path d="M10 14L4 5V3h16v2l-6 9v6l-4 2z"/></g></svg>
                                        <p >فیلتر</p>
                                    </div>
                                </div>
                            </div>}
                        {widthMobi < 868 && showSearchBox ? (
                            <div className={styles["searchboxContainer"]}>
                                <div className={styles.searchContainer}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%",
                                            padding: "0 1.725rem",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <p>جستجو مجدد</p>

                                        <div
                                            className={styles["closeBtn"]}
                                            onClick={() => setShowSearchBox(!showSearchBox)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                width="15"
                                                height="15"
                                                viewBox="0 0 30 30"
                                                fill="#137cb6"
                                            >
                                                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className={styles["tour"]}>
                                        <TourSearchBox
                                            // selectedDest={selectedDest}
                                            // selectedSrc={selectedSrc}
                                            night={night}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : widthMobi > 868 ? (
                            <div className={styles.searchContainer}>
                                <TourSearchBox
                                    // selectedDest={selectedDest}
                                    // selectedSrc={selectedSrc}
                                    night={night}
                                />
                            </div>
                        ) : null}

                        <div className={styles.hotels}>
                            <div className={styles["p-available"]}>
                                <div className={styles.content}>
                                    {searchData?.loader === true ? (
                                        <div className={styles["loader-container"]}>
                                            <NewLoader title="بلیطجا در حال یافتن بهترین نتیجه طبق درخواست شماست...." />
                                        </div>
                                    ) : hotels?.length === 0 && searchData.loader === false ? (
                                        <div className={styles["err"]}>
                                            <div className={styles["image-container"]}>
                                                <img src="../../../Images/no-hotel.png" alt="" />
                                            </div>
                                            <p> متاسفانه نتیجه مورد نظر یافت نشد. </p>
                                        </div>
                                    ) : (
                                        <div style={{ width: "100%" }}>
                                            {/*{widthMobi < 868 && (*/}
                                            {/*  <div*/}
                                            {/*    style={{*/}
                                            {/*      margin: "10px 0 15px 0",*/}
                                            {/*      display: "flex",*/}
                                            {/*      justifyContent: "center",*/}
                                            {/*      alignItems: "center",*/}
                                            {/*      columnGap: "8px",*/}
                                            {/*    }}*/}
                                            {/*  >*/}
                                            {/*    <div*/}
                                            {/*      style={{*/}
                                            {/*        padding: "0 5px",*/}
                                            {/*        display: "flex",*/}
                                            {/*        justifyContent: "space-between",*/}
                                            {/*      }}*/}
                                            {/*    >*/}
                                            {/*      <div*/}
                                            {/*        style={{*/}
                                            {/*          width: "90px",*/}
                                            {/*          height: "45px",*/}
                                            {/*          border: "2px solid #137cb6",*/}
                                            {/*          color: "#137cb6",*/}
                                            {/*          borderRadius: "512px",*/}
                                            {/*          display: "flex",*/}
                                            {/*          columnGap: "8px",*/}
                                            {/*          justifyContent: "center",*/}
                                            {/*          alignItems: "center",*/}
                                            {/*          fontSize: "16px",*/}
                                            {/*          padding: "0 10px",*/}
                                            {/*        }}*/}
                                            {/*        onClick={() => {*/}
                                            {/*          setShowFilter(!showFilter);*/}
                                            {/*          console.log(showFilter);*/}
                                            {/*        }}*/}
                                            {/*      >*/}
                                            {/*        فیلتر*/}
                                            {/*        <svg*/}
                                            {/*          width="18px"*/}
                                            {/*          height="18px"*/}
                                            {/*          enable-background="new 0 0 32 32"*/}
                                            {/*          id="Editable-line"*/}
                                            {/*          version="1.1"*/}
                                            {/*          viewBox="0 0 32 32"*/}
                                            {/*          xmlns="http://www.w3.org/2000/svg"*/}
                                            {/*        >*/}
                                            {/*          <path*/}
                                            {/*            d="  M3.241,7.646L13,19v9l6-4v-5l9.759-11.354C29.315,6.996,28.848,6,27.986,6H4.014C3.152,6,2.685,6.996,3.241,7.646z"*/}
                                            {/*            fill="none"*/}
                                            {/*            id="XMLID_6_"*/}
                                            {/*            stroke="#137cb6"*/}
                                            {/*            stroke-linecap="round"*/}
                                            {/*            stroke-linejoin="round"*/}
                                            {/*            stroke-miterlimit="10"*/}
                                            {/*            stroke-width="2"*/}
                                            {/*          />*/}
                                            {/*        </svg>*/}
                                            {/*      </div>*/}
                                            {/*    </div>*/}
                                            {/*    <div*/}
                                            {/*      className={styles["search-header"]}*/}
                                            {/*      onClick={() => {*/}
                                            {/*        setShowSearchBox(!showSearchBox);*/}
                                            {/*      }}*/}
                                            {/*    >*/}
                                            {/*      <div className={styles["travelinfo"]}>*/}
                                            {/*        <p>{router.query?.fasrc}</p>*/}
                                            {/*        <p>به</p>*/}
                                            {/*        <p>{router.query?.fadest}</p>*/}
                                            {/*        <label htmlFor=""> ({night} شب )</label>*/}
                                            {/*        /!* <p>|</p>*/}
                                            {/*        <p>{jalaliDate}</p> *!/*/}
                                            {/*      </div>*/}
                                            {/*      <div>*/}
                                            {/*        <svg*/}
                                            {/*          height="25"*/}
                                            {/*          viewBox="0 0 512 512"*/}
                                            {/*          width="25"*/}
                                            {/*          xmlns="http://www.w3.org/2000/svg"*/}
                                            {/*        >*/}
                                            {/*          <title />*/}
                                            {/*          <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />*/}
                                            {/*        </svg>*/}
                                            {/*      </div>*/}
                                            {/*    </div>*/}
                                            {/*  </div>*/}
                                            {/*)}*/}
                                            <Scrolltoprefresh />
                                            {hotels &&
                                                hotels?.map((hotel) => {
                                                    return (
                                                        <div className={styles.hotelContainer}>
                                                            <div className={styles.hotelDetail}>
                                                                {/* <Image src="" width={162} height={170}></Image> */}
                                                                <div
                                                                    className={`imageContainer ${styles["imageContainer"]}`}
                                                                >
                                                                    <Swiper
                                                                        modules={[Navigation, Scrollbar, A11y]}
                                                                        spaceBetween={50}
                                                                        slidesPerView={1}
                                                                        navigation
                                                                        pagination={{ clickable: true }}
                                                                        scrollbar={{ draggable: false }}
                                                                        onSwiper={(swiper) => console.log(swiper)}
                                                                        // onSlideChange={() => console.log("slide change")}
                                                                        loop={true}
                                                                    >
                                                                        {hotel.gallery.map((img) => {
                                                                            return (
                                                                                <SwiperSlide
                                                                                    style={{
                                                                                        height: "auto",
                                                                                        // borderRadius: "20px",
                                                                                        // overflow: "hidden",
                                                                                        display: "flex",
                                                                                        justifyContent: "center",
                                                                                    }}
                                                                                >
                                                                                    <img
                                                                                        src={img.url}
                                                                                        alt="Picture of the hotel"
                                                                                    />
                                                                                </SwiperSlide>
                                                                            );
                                                                        })}
                                                                    </Swiper>
                                                                </div>
                                                            </div>
                                                            <div className={styles["hotelDetprice"]}>
                                                                <div className={styles.hotelNameDetail}>
                                                                    {hotel.is_domestic ? (
                                                                        <div className={styles.nameCon}>
                                                                            <p className={styles.faName}>
                                                                                {hotel?.title}
                                                                            </p>
                                                                            <h2 className={styles.enName}>
                                                                                {hotel?.titleEn}
                                                                            </h2>
                                                                        </div>
                                                                    ) : (
                                                                        <div className={styles.nameCon}>
                                                                            <h2 className={styles.faName}>
                                                                                {hotel?.titleEn}
                                                                            </h2>
                                                                            <h2 className={styles.enName}>
                                                                                {hotel?.title}
                                                                            </h2>
                                                                        </div>
                                                                    )}

                                                                    <div className={styles.pStar}>
                                                                        {startBuilder(+hotel.stars)?.map((x) => {
                                                                            return x;
                                                                        })}
                                                                    </div>
                                                                    {/*<div className={styles.stars}>{hotel.stars}stars</div> */}
                                                                    <div className={styles.services}>
                                                                        <label htmlFor="">منطقه :</label>
                                                                        <p>
                                                                            {hotel?.location
                                                                                ? hotel?.location
                                                                                : "ثبت نشده"}
                                                                        </p>
                                                                        <p style={{color:'#137cb6',marginRight:'6px',cursor:'pointer'}} onClick={()=>setShowInMap(true)}> (نمایش بر روی نقشه)</p>
                                                                    </div>
                                                                </div>

                                                                <div className={styles.priceandbtnContainer}>
                                                                    <div>
                                                                        <p className={styles.priceTitle}>
                                                                            {`قیمت برای هر نفر ${night} شب از :`}
                                                                        </p>
                                                                        <div className={styles.priceParent}>
                                                                            <strong className={styles.price}>
                                                                                {numberWithCommas(
                                                                                    numberRounder(+hotel?.totalRoomPrice)
                                                                                )}
                                                                            </strong>
                                                                            <span>تومان</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className={styles.btnContainer}>
                                                                        <button
                                                                            onClick={() => {
                                                                                const jalalurlReformat =
                                                                                    jalaliDateReformater(jalaliDate);

                                                                                router.push(
                                                                                    `/tour/${origin}-${destination}/flight/${hotel?.slug}?origin=${origin}&dest=${destination}&stDate=${jalalurlReformat}&night=${night}`
                                                                                );
                                                                            }}
                                                                        >
                                                                            {" "}
                                                                            انتخاب هتل و رزرو
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {showFilter && widthMobi < 868 ? (
                                <HotelsSideBarSearch
                                    date={date}
                                    destination={destination}
                                    origin={origin}
                                    night={night}
                                    setHotels={(value) => setHotels(value)}
                                    stars={stars}
                                    hotels={hotels}
                                    widthMobi={widthMobi}
                                    setShowFilter={(value) => setShowFilter(value)}
                                    showFilter={showFilter}
                                />
                            ) : widthMobi > 868 ? (
                                <div style={{ width: "27%", transform: "translateY(-22px)" }}>
                                    <HotelsSideBarSearch
                                        date={date}
                                        destination={destination}
                                        origin={origin}
                                        night={night}
                                        setHotels={(value) => setHotels(value)}
                                        stars={stars}
                                        hotels={hotels}
                                        widthMobi={widthMobi}
                                        setShowFilter={(value) => setShowFilter(value)}
                                        showFilter={showFilter}
                                    />
                                </div>
                            ) : null}

                            {/*<Paginate to={totalPage}/>*/}
                        </div>
                        {
                            showInMap && <MapPopUpComponent setShowInMap={(val)=>setShowInMap(val)}/>
                        }
                    </>
                ) : (
                    <AvFlight widthmobi={widthMobi} night={night} />
                )}
            </div>
            <Footer />
        </>
    );
};

export default AvailableHotel1;