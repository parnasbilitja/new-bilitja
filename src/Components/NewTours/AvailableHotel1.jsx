import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourSearchBox from "../../Components/NewTours/Components/TourSearchBox";
import styles from "../../../styles/AvailableHotels.module.scss";
import Image from "next/image";
import {
    setDestLoc,
    setFlightDate,
    setLoader,
    setOrgLoc,
    setNightNumber
} from "../../Redux/newTours/Action";
import {
    jalaliDateReformater,
    jalaliToMiladiConvertor,
    numberRounder,
    numberWithCommas,
    startBuilder,
} from "../../Utils/newTour";

import HotelsSideBarSearch from "../../Components/NewTours/Components/subComponents/HotelsSideBarSearch.component";
import Footer from "../../sources/component/Footer.component";
import NewLoader from "../../Components/NewTours/Components/subComponents/NewLoader";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import MapPopUpComponent from "./Components/subComponents/MapPopUp.component";

const newLoad = dynamic(() =>
        import("../../Components/NewTours/Components/subComponents/NewLoader"),
    {
        ssr: false
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
    const [selectedDate, setselectedDate] = useState(null);

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
    const[loading,setLoading]=useState(false)


    const [showInMap,setShowInMap]=useState({status:false,
    coordinates:[]
    })




    const HotelCall = (page = 1) => {

        dispatch(setLoader(true));
        const newDate = router.query.stdate?.slice(0, 10);
        const finalDate = jalaliToMiladiConvertor(newDate);
        axios
            .post(
                `https://api.hotelobilit.com/api/v3/packages`,
                {
                    date: finalDate,
                    destination: router.query?.dest,
                    keywords: null,
                    orderBy: 1,
                    origin: router.query?.org,
                    stars: null,
                    stayCount: router.query?.night,
                },
                {
                    headers: {
                        "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
                    }
                }
            )
            .then((res) => {


                setHotels(res?.data?.data);
                setTotalPage(res.data.data.last_page);
                setStars(hotelstarPicker(res?.data?.data?.data));
                dispatch(setLoader(false));
            })
            .catch((err) => {
                //
                dispatch(setLoader(false));
            });
    };


    useEffect(()=>{

    },[hotels])

    useEffect(() => {
        ///get date from url
        const newDate = router.query.stdate?.slice(0, 10);
        const finalDate = jalaliToMiladiConvertor(newDate);
        setDate(finalDate);
        setDestination(router.query?.dest);
        setOrigin(router.query?.org);
        setNight(router.query?.night);


    }, [router]);

    useEffect(()=>{
        const newDate = router.query.stdate?.slice(0, 10);
        setJalaliDate(newDate);
        const finalDate = jalaliToMiladiConvertor(newDate);
        setDate(finalDate);
        /////convert jalali to miladi
        if (finalDate && router.query?.dest && router.query?.org && router.query?.night) {
            HotelCall();
            setNightNumber(night)
        }

        if (router.query?.dest && router.query?.org) {
            setFlightDate({
                persianDate: '',
                miladiDate: '',
            })
            dispatch(setNightNumber(''))

            dispatch(setOrgLoc({name:'',code:''}));

            dispatch(setDestLoc({name:'',code:''}));

            axios
                .get("https://api.hotelobilit.com/api/v2/tours/active-routes",{
                    headers: {
                        "x-app-key":  '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
                    }
                })
                .then((res) => {
                    const src = res.data.data.filter(city=>city.code===router.query?.org)
                    const dest=src[0].destinations.filter(dest=>dest.code===router.query?.dest)
                    dispatch(setNightNumber(router.query?.night))
                    setSelectedSrc(src)
                    dispatch(setOrgLoc({name:src[0].name,code:src[0].code}));
                    dispatch(setDestLoc({name:dest[0].name,code:dest[0].code}));
                    setSelectedDest(dest)

                    if(dest){

                        setselectedDate(dest[0]?.dates)
                    }
                })
                .catch((err) => {

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
        if (showFilter && widthMobi < 500) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "visible";
        }
    }, [showFilter]);

//////////////////////////////SEARCH/////////////////////////////////////////

    const [searchInput, setSearchInput] = useState("");
    const [check, setCheck] = useState("");

    const search = (e) => {
        if (e.key === "Enter") {
            dispatch(setLoader(true))
            axios
                .post(`https://api.hotelobilit.com/api/v2/packages`, {
                    date: date,
                    destination: destination,
                    keywords: searchInput,
                    orderBy: 1,
                    origin: origin,
                    stars: null,
                    stayCount: night,
                },   {
                    headers: {
                        "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
                    }
                })
                .then((res) => {
                   setHotels([])
                   setHotels(res?.data?.data);
                    dispatch(setLoader(false))
                })
                .catch((err) => {

                });
        }
    };
    const numberSorter=(arr)=>{

        return arr.sort((a, b) => +a - +b);
    }

    const reset=()=>{
        dispatch(setLoader(true))
        axios
            .post(`https://api.hotelobilit.com/api/v2/packages`, {
                date: date,
                destination: destination,
                keywords: '',
                orderBy: 1,
                origin: origin,
                stars: null,
                stayCount: night,
            },   {
                headers: {
                    "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
                }
            })
            .then((res) => {
               setHotels([])
                setHotels(res?.data?.data);
                dispatch(setLoader(false))
                setSearchInput('')
            })
            .catch((err) => {

            });
        // props.setShowFilter(!props.showFilter)

    }
    ////////based on (cheapest or most expensive) or hotels name that went to search
    const checkedClick = (checkValue, num, searchtype) => {
        dispatch(setLoader(true))
        axios
            .post(`https://api.hotelobilit.com/api/v2/packages`, {
                    date: date,
                    destination:destination,
                    keywords: searchInput,
                    orderBy: searchtype === "order" ? num : null,
                    origin: origin,
                    stars: (searchtype === "star" && num !== 'همه') ? num : null,
                    stayCount: night,
                },
                {
                    headers: {
                        "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
                    }
                }
            )
            .then((res) => {
                setHotels(res?.data?.data);
                dispatch(setLoader(false))
            })
            .catch((err) => {

            });
        setCheck(checkValue);

    };

    let searchElement=[{
        title:'جستجوی نام هتل یااقامتگاه',
        svg:<svg enableBackground="new 0 0 300 300" height="28px" id="Layer_1" version="1.1" viewBox="0 0 300 300" width="28px"  xmlns="http://www.w3.org/2000/svg" ><g><rect fill="none" height="21" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="21" x="155" y="80"/><rect fill="none" height="21" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="21" x="115" y="80"/><rect fill="none" height="21" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="21" x="155" y="117"/><rect fill="none" height="21" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="21" x="115" y="117"/><rect fill="none" height="21" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="21" x="155" y="153"/><rect fill="none" height="21" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="21" x="115" y="153"/><polyline fill="none" points="   162,229 162,196 129,196 129,229  " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><g><rect fill="none" height="19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="19" x="227" y="104"/><rect fill="none" height="19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="19" x="227" y="138"/><rect fill="none" height="18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="19" x="227" y="171"/><path d="    M203,241h52.807c1.487,0,2.193-1.706,2.193-3.193V229.5V80.193c0-1.487-0.706-2.193-2.193-2.193H203" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><polyline fill="none" points="    203,189 211,189 211,171 203,171   " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><rect fill="none" height="18" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="19" x="227" y="201"/><polyline fill="none" points="    203,219 211,219 211,201 203,201   " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><polyline fill="none" points="    203,157 211,157 211,138 203,138   " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><polyline fill="none" points="    203,123 211,123 211,104 203,104   " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/></g><g><rect fill="none" height="16" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="16" x="50" y="119"/><rect fill="none" height="16" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="16" x="50" y="148"/><rect fill="none" height="15" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="16" x="50" y="177"/><path d="    M87,241H43.042c-1.282,0-4.042-2.622-4.042-3.903V101.222c0-1.283,2.759-1.222,4.042-1.222H88" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><polyline fill="none" points="    88,192 80,192 80,177 88,177   " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><rect fill="none" height="16" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" width="16" x="50" y="202"/><polyline fill="none" points="    87,218 80,218 80,202 87,202   " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><polyline fill="none" points="    88,164 80,164 80,148 87,148   " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/><polyline fill="none" points="    87,135 80,135 80,119 88,119   " stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/></g><path d="   M191,63c0-1.657-1.343-3-3-3h-85c-1.657,0-3,1.343-3,3v175c0,1.657,1.343,3,3,3h85c1.657,0,3,0.657,3-1V63z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6"/></g><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" x1="92" x2="199" y1="60" y2="60"/><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" x1="32" x2="88" y1="100" y2="100"/><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="6" x1="208" x2="264" y1="78" y2="78"/></svg>,
        inputType:'input',
        inputTag:   <input
            type="text"
            placeholder="نام هتل را وارد کنید"

            value={searchInput}
            onClick={(e)=>{
                e.stopPropagation()
            }}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
                search(e)
            }}
        />
    },
        {
        title:'جستجوی براساس ستاره',

        svg:<svg viewBox="0 0 512 512" width='25px' height='25px' xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M370.24,425.59a14.89,14.89,0,0,1-7-1.72L257,368,150.74,423.87A15,15,0,0,1,129,408.06l20.3-118.32-86-83.8a15,15,0,0,1,8.31-25.59l118.81-17.26L243.55,55.43a15,15,0,0,1,26.9,0l53.13,107.66,118.8,17.26a15,15,0,0,1,8.32,25.59l-86,83.8L385,408.06a15,15,0,0,1-14.78,17.53ZM106,205.67l69.85,68.09A15,15,0,0,1,180.17,287l-16.49,96.14L250,337.78a15,15,0,0,1,14,0l86.34,45.39L333.83,287a15,15,0,0,1,4.31-13.27L408,205.67l-96.53-14a15,15,0,0,1-11.29-8.2L257,96l-43.17,87.47a15,15,0,0,1-11.3,8.2Z"/></g></svg>
        ,
        inputType:'select',
        inputTag:<select
            name=""
            id=""
            onChange={(e) => {
                checkedClick(null, e.target.value, "star");
               setShowFilter()
            }}

            onClick={(e)=>  e.stopPropagation()}
        >
            <option key={'همه'} selected value='همه'>
                همه
            </option>
            {numberSorter([1,2,3,4,5])?.map((star) => {
                return <option key={star} value={star}>{star} ستاره </option>;
            })}
        </select>
    },
        {
        title:'مرتب سازی براساس',
        svg:<svg enableBackground="new 0 0 48 48" height="18px"
                 version="1.1" viewBox="0 0 48 48" width="18px"
                 xmlns="http://www.w3.org/2000/svg">
            <g id="Guides"/>
            <g id="Layer_3">
                <polygon
                    points="27,17.906 30.115,17.906 24.083,7.937 18.052,17.905 21.083,17.905 21.084,30.016 18.017,30.016 24.049,39.985    30.08,30.015 27,30.015  "/>
                <rect height="6" width="40" x="4"/>
                <rect height="6" width="39.951" x="4.024" y="42"/>
            </g>
        </svg>,
        inputType:'checkbox',
        inputTag: <div>

            <div className={styles.checkboxcontainer}    onClick={() => {
                checkedClick("cheap", 1, "order")
                setShowFilter(!showFilter)
            }}>
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="ارزان ترین"
                    id=""
                    onClick={() => {
                        checkedClick("cheap", 1, "order")
                       setShowFilter(!showFilter)
                    }}
                    checked={check === "cheap" ? true : false}
                />
                <p style={{whiteSpace:"nowrap"}}>ارزان ترین</p>
            </div>
            <div className={styles.checkboxcontainer}

                 onClick={() => {
                     checkedClick("expensive", 2, "order")
                     setShowFilter(!showFilter)

                 }


            }

            >
                <input
                    className={styles.checkbox}
                    type="checkbox"
                    name="گران ترین"
                    id=""
                    checked={check === "expensive" ? true : false}
                    onClick={() => checkedClick("expensive", 2, "order")}
                />
                <p style={{whiteSpace:"nowrap"}}>گران ترین</p>
            </div>
        </div>
    },

    ]

    ///////////////////////////


    return (
        <>
            {/*<NavHandler />*/}

            <div className={styles["main-section"]}>
                <Scrolltoprefresh/>
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
                                            fill="#e20000"
                                        >
                                            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles["tour"]}>
                                    <TourSearchBox
                                        // selectedDest={selectedDest}
                                        // selectedSrc={selectedSrc}
                                        selecteddates={selectedDate}
                                        night={night}
                                        isCity={true}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : widthMobi > 868 ? (
                        <div className={styles.searchContainer}>
                            <TourSearchBox
                                // selectedDest={selectedDest}
                                // selectedSrc={selectedSrc}
                                iscity={true}
                                night={night}
                            />
                        </div>
                    ) : null}

                    <div className={styles.hotels}>
                        <div className={styles["p-available"]}>
                            <div className={styles.content}>
                                {searchData?.loader === true ? (
                                    <div style={{height: '90vh',display:'flex',alignItems:'center'}}>
                                        <Scrolltoprefresh/>
                                        <NewLoader title="بلیطجا در حال یافتن بهترین نتیجه طبق درخواست شماست...."/>
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
                                        {widthMobi < 868 && (
                                            <div
                                                style={{
                                                    margin: "15px 0 15px 0",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    // columnGap: "8px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        padding: "0 5px",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                    }}
                                                >

                                                </div>
                                                <div
                                                    className={styles["search-header"]}
                                                    onClick={() => {
                                                        setShowSearchBox(!showSearchBox);
                                                    }}
                                                >
                                                    <div className={styles["travelinfo"]}>
                                                        <p>{selectedSrc[0].name}</p>
                                                        <p>به</p>
                                                        <p>{selectedDest[0].name}</p>
                                                        <p>{router.query?.stdate.slice(0,10)}</p>
                                                        <label htmlFor=""> ({night} شب )</label>
                                                    </div>
                                                    <div>
                                                        <svg
                                                            height="25"
                                                            viewBox="0 0 512 512"
                                                            width="25"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <title />
                                                            <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <Scrolltoprefresh />
                                        {hotels &&
                                            hotels?.map((hotel) => {
                                                return (
                                                    <div className={styles.hotelContainer} key={hotel?.hotel?.id}>
                                                        <div className={styles.hotelDetail}>
                                                            {/* <Image src="" width={162} height={170}></Image> */}
                                                            <div
                                                                className={`imageContainer ${styles["imageContainer"]}`}
                                                            >
                                                                {hotel.hotel?.gallery.length>0 ?
                                                                    <Swiper
                                                                    modules={[Navigation, Scrollbar, A11y]}
                                                                    spaceBetween={50}
                                                                    slidesPerView={1}
                                                                    navigation
                                                                    pagination={{clickable: true}}
                                                                    scrollbar={{draggable: false}}
                                                                    loop={true}
                                                                >
                                                                    {hotel.hotel.gallery.map((img) => {
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
                                                                                <Image
                                                                                    height={'200px'}
                                                                                    width={'300px'}
                                                                                    src={img.url}
                                                                                    alt="Picture of the hotel"

                                                                                />
                                                                            </SwiperSlide>
                                                                        );
                                                                    })}
                                                                </Swiper>:    <img
                                                                    height={'200px'}
                                                                    width={'300px'}
                                                                    src='../../../Images/noPicture.png'
                                                                    alt="Picture of the hotel"

                                                                />}
                                                            </div>

                                                        </div>
                                                        <div className={styles["hotelDetprice"]}>
                                                            <div className={styles.hotelNameDetail}>
                                                                {hotel?.hotel?.is_domestic ? (
                                                                    <div className={styles.nameCon}>
                                                                        <p className={styles.faName}>
                                                                            {hotel?.hotel?.title}
                                                                        </p>
                                                                        <h2 className={styles.enName}>
                                                                            {hotel?.hotel?.titleEn}
                                                                        </h2>
                                                                    </div>
                                                                ) : (
                                                                    <div className={styles.nameCon}>
                                                                        <h2 className={styles.faName}>
                                                                            {hotel?.hotel?.titleEn}
                                                                        </h2>
                                                                        <h2 className={styles.enName}>
                                                                            {hotel?.hotel?.title}
                                                                        </h2>
                                                                    </div>
                                                                )}

                                                                <div className={styles.pStar}>
                                                                    {startBuilder(+hotel?.hotel?.stars)?.map((x) => {
                                                                        return x;
                                                                    })}
                                                                </div>
                                                                {/*<div className={styles.stars}>{hotel.stars}stars</div> */}
                                                                <div className={styles.services}>
                                                                    <label htmlFor="">منطقه :</label>
                                                                    <p>
                                                                        {hotel?.hotel?.location
                                                                            ? hotel?.hotel?.location
                                                                            : "ثبت نشده"}
                                                                    </p>
                                                                    <p style={{color:'#e20000',marginRight:'6px',cursor:'pointer'}} onClick={()=>setShowInMap({status: true,coordinates: hotel.hotel.coordinates})}> (نمایش بر روی نقشه)</p>
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
                                                                                +hotel?.total_price
                                                                            )}
                                                                        </strong>
                                                                        <span>تومان</span>
                                                                    </div>
                                                                </div>

                                                                <div className={styles.btnContainer}>
                                                                    <a
                                                                        href={`/tour/flight?org=${origin}&dest=${destination}&stdate=${jalaliDateReformater(jalaliDate)}&night=${night}&hotel=${hotel?.hotel?.slug}`}
                                                                        onClick={() => {

                                                                            if(!loading) {
                                                                                setLoading(true)

                                                                                // const jalalurlReformat = jalaliDateReformater(jalaliDate);
                                                                                //
                                                                                // router.push(
                                                                                //     `/tour/flight/${origin}-${destination}/${hotel.hotel?.slug}?origin=${origin}&dest=${destination}&stDate=${jalalurlReformat}&night=${night}&hotel=${hotel.hotel.slug}&night=${night}`
                                                                                // );
                                                                            }else {
                                                                                return null
                                                                            }
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        {loading ? 'لطفا منتظر بمانید....'  : ' انتخاب هتل و رزرو'}

                                                                    </a>
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
                                searchElement={searchElement}
                                reset={()=>reset()}


                            />
                        ) : widthMobi > 868 ? (
                            <div style={{ width: "27%", transform: "translateY(-22px)" }}>
                                <HotelsSideBarSearch

                                    setShowFilter={(value) => setShowFilter(value)}
                                    showFilter={showFilter}
                                    searchElement={searchElement}
                                    reset={()=>reset()}
                                />
                            </div>
                        ) : null}

                        {/*<Paginate to={totalPage}/>*/}
                    </div>
                    {
                        (showInMap.status && showInMap.coordinates.length>0) && <MapPopUpComponent coordinates={showInMap.coordinates}  setShowInMap={(val)=>setShowInMap(val)}/>
                    }
                </>

            </div>

            <Footer/>
        </>
    );
};

export default AvailableHotel1;
