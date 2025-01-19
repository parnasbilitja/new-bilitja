import React, {useEffect, useState} from "react";
import styles from "../../../../styles/TourSearchBox.module.scss";
import PrimaryButton from "../../../sources/component/PrimaryButton.component";
import PrimaryTextInput from "../../../sources/component/PrimaryTextInput.component";
import Cities from "./subComponents/Cities.component";
import PopUpWide from "./subComponents/PopUpWide.component";
import CalendarComponent from "./calendar/Calendar.component";
import {connect} from "react-redux";
import {selectCredentials} from "../../../Redux/Search/search.reselect";
import {
    addCredentials,
    switchRoute,
} from "../../../Redux/Search/search.action";
import {messageBoxModify} from "../../../Redux/UI/ui.action";
import {useRouter, withRouter} from "next/router";
import Scrolltoprefresh from "../../../sources/component/Scrolltoprefresh";
import axios from "axios";
import {
    setOrgLoc,
    setDestLoc,
    setFlightDate,
    setNightNumber, setLoader,
} from "../../../Redux/newTours/Action";
import DropdownComponent from "./subComponents/Dropdown.component";
import {isEmpty, jalaliDateReformater} from "../../../Utils/newTour";
import {Err, NotifAlert} from "./NotifAlert.component";
import NewLoader from "./subComponents/NewLoader";
// import {usePostHog} from "posthog-js/react";

const TourSearchBox = (props) => {

    // const posthog=usePostHog()



    const router = useRouter();
    const [width, setWidth] = useState();
    const [isNight,setIsNight]=useState(false)
    const [citiesData, setCitiesData] = useState({
        origin: {},
        destination: {},
        date: {},
        night: "",
    });
    const [cities, setCities] = useState([]);
    const [destStat, setDestStat] = useState([]);
    //to get available date & night
    const [dateAndNight, setDateAndNight] = useState([]);
    const [nights, setNights] = useState([]);
    const [inputSearchDest,setInputSearchDest]=useState('')
    const [inputSearchOrg,setInputSearchOrg]=useState('')
    const [isDate,setIsDate]=useState(false)
// const [prevDest,setPrevDest]=useState({})
    const getDestandOrgCities = () => {
        axios
            .get("https://api.hotelobilit.com/api/v2/tours/active-routes",{
                headers: {
                    "x-app-key":  '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
                }
            })
            .then((res) => {
                const cities = res.data.data;
                setCities(cities);
            })
            .catch((err) => {
                
            });


    };



    useEffect(() => {
        
        setWidth(window.innerWidth);
        getDestandOrgCities();
        ///////////////////////
    }, [props.iscity]);





    const [state, setState] = useState({
        searchBool: false,
        sourceSearch: "",
        destinationSearch: "",
        width: width,
        open: false,
        openSource: false,
        openDestination: false,
        suggestSource: false,
        suggestDestination: false,
        mobileSearchTerm: "",
        searchTermSource: "",
        searchTermDestination: "",
        searchReset: false,
    });


    const [list, setList] = useState({});
    const handleFocusOut = (event) => {
        // 
        const {name, value} = event.target;
        setList({...list, [name]: value});
        props.addCredentials({
            [name]: list[name],
        });
    };
    const handleFocus = (event) => {
        // 
        const {name, value} = event.target;
        setList({...list, [name]: value});
        props.addCredentials({
            [name]: "",
        });
    };
    // for mobile
    const managePopUpCalendar = (value) => {
        setState({...state, open: value});
    };
    // for mobile

    // for mobile

    // for desktop
    const manageSuggestSource = (value) => {
        setState({...state, suggestSource: value, searchTermSource: ""});
    };
    // for desktop
    const manageSuggestDestination = (value) => {
        setState({
            ...state,
            suggestDestination: value,
            searchTermDestination: "",
        });
    };



    useEffect(()=>{
        props.setLoader(false)
    },[])
    const validation = (valinputType) => {
        const {
            destandorgcities: {origin, destination, date, night},
        } = props;

        // let obj ={
        //     org:origin,
        //     dest:destination,
        //     date:date,
        //     night:night
        // }



        if (!origin.code || !destination.code  || (!date.miladiDate && !date.persianDate) ||!night) {
            if (!night) {
                
                Err('لطفا مدت اقامت را وارد کنید')
                setIsNight(true)
                return false;
            }else{
                setIsNight(false)
            }

            return false;
        }



        // if (!destination.code) {
        //     return false;
        // }
        // if (date === {} || (!date.miladiDate && !date.persianDate)) {
        //     setIsDate(true)
        //     return false;
        // }else{
        //     setIsDate(false)
        // }
        // if (!night) {
        //     
        //     Err('لطفا مدت اقامت را وارد کنید')
        //     setIsNight(true)
        //     return false;
        // }else{
        //     setIsNight(false)
        //
        // }

        return true;
    };

    const valid2=()=>{
        const {
            destandorgcities: {date},
        } = props;
        if (!date.persianDate) {
            Err('لطفا تاریخ را وارد کنید')
            setIsDate(true)
            return false;
        }else{
            setIsDate(false)
        }
    }

    useEffect(()=> {


        if(props.destandorgcities.origin.code){
            

            let dest=cities?.filter(city=>city.code===props.destandorgcities.origin.code)

            if(dest.length>0){

                setDestStat(dest[0]?.destinations)
            }
        }
    },[props.destandorgcities.origin.code])

    useEffect(() => {
        /////get avalaible dates and night number based on Org & Dest
        if (
           ( props.destandorgcities.destination.code &&
            props.destandorgcities.origin.code)
        ) {
            
            if(destStat.length>0){
                let currentDestinationDates=destStat.filter(city=>city.code=== props.destandorgcities.destination.code)[0]?.dates
            setDateAndNight(currentDestinationDates)
            }

        }


        setInputSearchDest(props.destandorgcities.destination.name)
        setInputSearchOrg(props.destandorgcities.origin.name)

    }, [
        props.destandorgcities.destination,
        props.destandorgcities.origin,
       destStat

    ]);

    useEffect(()=>{
        
        if (props.destandorgcities.date.miladiDate && dateAndNight.length>0) {
            const nightsNumber = dateAndNight?.filter(
                (datenight) => datenight?.date === props.destandorgcities.date.miladiDate
            );
            setNights(nightsNumber[0]?.nights);
        }
    },[ props.destandorgcities.date.miladiDate,dateAndNight])


    return (
        <>
            <NotifAlert/>
            <div className={styles["home-flight-form"]} >
                <div style={{position: "relative"}} >
                    <Scrolltoprefresh/>
                    <div
                        className={` form-input-border  ${styles["form-input-border-private"]} `}
                    >

                        <PrimaryTextInput
                            value={inputSearchOrg}
                            name="sourceName"
                            onClick={(e) => {
                                manageSuggestSource(true);
                            }}
                            onChange={(e)=> setInputSearchOrg(e.target.value)}
                            // onChange={handleChangeCre}
                            onFocus={()=> props.setOrgLoc({name:'',code:''})}
                            onBlur={handleFocusOut}
                            // onFocus={()=>setInputSearchOrg('')}
                            placeholder={"مبدا خود را وارد کنید"}
                            autoComplete='off'
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="_044-Departures"
                            data-name="044-Departures"
                            width="25"
                            height="25"
                            viewBox="0 0 39.655 27.135"
                            style={{zIndex:100,left:'9px',position:'absolute',top:'15px'}}
                        >
                            <path
                                id="Path_1760"
                                data-name="Path 1760"
                                d="M.782,406.966h38.09a.782.782,0,1,1,0,1.564H.782a.782.782,0,1,1,0-1.564Z"
                                transform="translate(0 -381.396)"
                                fill="#808285"
                            />
                            <path
                                id="Path_1761"
                                data-name="Path 1761"
                                d="M39.736,93.474l-5.765,3.94a7.742,7.742,0,0,1-7.611.621l-5.68-2.654a.782.782,0,0,1,.662-1.417l5.679,2.654a6.172,6.172,0,0,0,6.066-.5l4.768-3.259-2.146-1.316L30.189,93.38a.782.782,0,0,1-.58-.035l-6.58-3.1a.782.782,0,0,1-.151-1.322L30.139,83.2l-2.824-1.441L14.254,85.893a.783.783,0,0,1-.569-.038L4.948,81.749a2.117,2.117,0,0,0-2.666,1.01,2.04,2.04,0,0,0,.962,2.762l11.739,5.484a.782.782,0,1,1-.662,1.417L2.581,86.939a3.6,3.6,0,0,1-1.7-4.879,3.7,3.7,0,0,1,4.691-1.744l.026.012,8.475,3.982,13.075-4.137a.782.782,0,0,1,.591.049l4.2,2.142a.782.782,0,0,1,.129,1.311L24.84,89.369,29.993,91.8l5.571-1.848a.783.783,0,0,1,.655.076L39.7,92.162a.782.782,0,0,1,.032,1.312Z"
                                transform="translate(-0.462 -80.036)"
                                fill="#808285"
                            />
                            <path
                                id="Path_1762"
                                data-name="Path 1762"
                                d="M275.938,238.18a.781.781,0,1,1-1.038.377A.781.781,0,0,1,275.938,238.18Z"
                                transform="translate(-258.229 -225.743)"
                                fill="#808285"
                            />
                        </svg>
                        {state.suggestSource ? (
                            <Cities
                                credenrialType="source"
                                closeSuggest={manageSuggestSource}
                                searchTerm={state.searchTermSource}
                                cities={cities}
                                setCities={(value) => props.setOrgLoc(value)}
                                setcitiesData={(val) => setCitiesData(val)}
                                setFlightDate={(value) => props.setFlightDate(value)}
                                setNights={(value) => setNights(value)}
                                searchInputval={inputSearchOrg}
                                setSearchInput={(val)=>setInputSearchOrg(val)}
                                closemange={()=>   manageSuggestSource(false)}
                                citystat='مبدا'
                            />
                        ) : null}
                    </div>
                </div>

                <div >
                    <div
                        className={` form-input-border  ${styles["form-input-border-private"]}  `}
                    >
                        {" "}

                        <PrimaryTextInput
                            value={inputSearchDest}
                            name="destinationName"
                            onClick={(e) => {
                                manageSuggestDestination(true);
                            }}
                            // onChange={handleChangeCre}
                            onChange={(e)=> setInputSearchDest(e.target.value)}
                            // onFocus={handleFocus}
                            onFocus={()=> {
                                props.setDestLoc({name:'',code:''})
                            }}
                            // onBlur={()=>setInputSearchDest(props.destandorgcities.destination.name)}
                            placeholder={"مقصد خود را وارد کنید"}
                            autoComplete='off'
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 37.922 29.591"
                            style={{zIndex:100,left:'9px',position:'absolute',top:'15px'}}
                        >
                            <g
                                id="_046-arrivals"
                                data-name="046-arrivals"
                                transform="translate(0 0)"

                            >
                                <path
                                    id="Path_1767"
                                    data-name="Path 1767"
                                    d="M63.513,65.451a7.4,7.4,0,0,1-5.178,5.15l-5.787,1.565a.748.748,0,1,1-.391-1.444l5.787-1.565a5.9,5.9,0,0,0,4.127-4.1l1.473-5.323-2.38.362-2.9,4.746a.748.748,0,0,1-.445.332l-6.72,1.8a.748.748,0,0,1-.926-.873l1.775-8.66-2.952.689L42,69.2a.748.748,0,0,1-.439.323l-8.918,2.391A2.025,2.025,0,0,0,31.317,74.3a1.951,1.951,0,0,0,2.407,1.425l11.96-3.236a.748.748,0,1,1,.391,1.444l-11.96,3.236a3.47,3.47,0,0,1-.908.122,3.452,3.452,0,0,1-3.343-2.639,3.541,3.541,0,0,1,2.351-4.168l.026-.007,8.649-2.319,7-11.089a.747.747,0,0,1,.462-.329l4.388-1.025a.748.748,0,0,1,.9.879l-1.767,8.619L57.14,63.8l2.93-4.787a.748.748,0,0,1,.525-.349l3.865-.588a.748.748,0,0,1,.833.939Z"
                                    transform="translate(-29.626 -55.689)"
                                    fill="#808285"

                                />
                                <path
                                    id="Path_1768"
                                    data-name="Path 1768"
                                    d="M237.923,268.478a.747.747,0,1,1-.916-.526A.747.747,0,0,1,237.923,268.478Z"
                                    transform="translate(-217.713 -252.051)"
                                    fill="#808285"
                                />
                                <path
                                    id="Path_1769"
                                    data-name="Path 1769"
                                    d="M.748,431.31H37.174a.748.748,0,0,1,0,1.5H.748a.748.748,0,1,1,0-1.5Z"
                                    transform="translate(0 -403.214)"
                                    fill="#808285"
                                />
                            </g>
                        </svg>
                        {state.suggestDestination ? (
                            <Cities
                                credenrialType="destination"
                                closeSuggest={manageSuggestDestination}
                                searchTerm={state.searchTermDestination}
                                cities={destStat}
                                setCities={(value) => props.setDestLoc(value)}
                                setFlightDate={(value) => props.setFlightDate(value)}
                                setNights={(value) => setNights(value)}
                                searchInputval={inputSearchDest}
                                closemange={()=>   manageSuggestDestination(false)}
                                citystat='مقصد'
                                // setSearchInput={(val)=>setInputSearchDest(val)}
                            />
                        ) : null}
                    </div>
                </div>

                <div
                    className={` form-input-border  ${styles["form-input-border-private"]}  ${(isDate  && !props.destandorgcities.date.persianDate) && 'select-custom1'}`}
                >


                    <PrimaryTextInput
                        placeholder={" تاریخ پرواز رفت"}
                        readOnly="true"
                        value={props.destandorgcities.date.persianDate}
                        onClick={(e) => {
                            e.preventDefault();
                            if(props.destandorgcities.origin.name ==='' && props.destandorgcities.destination.name==='') {
                                Err('در حال حاضر پروازی برای مبدا و مقصد انتخاب شده، موجود نیست')
                            }else {
                                managePopUpCalendar(true);
                            }
                        }}
                    />
                    <svg style={{position:'absolute',left:'10px',top:'14px'}} width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="white"/>
                        <g filter="url(#filter0_d_15_268)">
                            <path d="M3 8.26667V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V8.26667M3 8.26667V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V8.26667M3 8.26667H21" stroke="#000000" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter1_d_15_268)">
                            <path d="M7 2V5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter2_d_15_268)">
                            <path d="M17 2V5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter3_d_15_268)">
                            <path d="M18 11H16" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter4_d_15_268)">
                            <path d="M18 17H16" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter5_d_15_268)">
                            <path d="M13 11H11" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter6_d_15_268)">
                            <path d="M13 17H11" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter7_d_15_268)">
                            <path d="M8 11H6" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter8_d_15_268)">
                            <path d="M8 17H6" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter9_d_15_268)">
                            <path d="M18 14H16" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter10_d_15_268)">
                            <path d="M13 14H11" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <g filter="url(#filter11_d_15_268)">
                            <path d="M8 14H6" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_15_268" x="1.5" y="3.5" width="21" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter1_d_15_268" x="5.5" y="1.5" width="3" height="6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter2_d_15_268" x="15.5" y="1.5" width="3" height="6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter3_d_15_268" x="14.5" y="10.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter4_d_15_268" x="14.5" y="16.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter5_d_15_268" x="9.5" y="10.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter6_d_15_268" x="9.5" y="16.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter7_d_15_268" x="4.5" y="10.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter8_d_15_268" x="4.5" y="16.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter9_d_15_268" x="14.5" y="13.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter10_d_15_268" x="9.5" y="13.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                            <filter id="filter11_d_15_268" x="4.5" y="13.5" width="5" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="1"/>
                                <feGaussianBlur stdDeviation="0.5"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268" result="shape"/>
                            </filter>
                        </defs>
                    </svg>
                </div>
                <div style={{padding: ".5rem 0"}} >
                    <DropdownComponent
                        nights={nights}
                        setNight={(value) => props.setNightNumber(value)}
                        night={props?.night}
                        valid={()=>validation()}
                        isNight={isNight}
                        flightDate={props.destandorgcities.date}
                    />
                </div>
                <div  className={`without-focus`}>
                    <PrimaryButton
                        style={{height: "55px", marginTop: "9px", borderRadius: "10px"}}
                        value={props.searchReset == false ? "جستجو" : "لطفا صبر کنید..."}

                        onClick={(e) => {
                            valid2()
                            if (validation() === false ) {
                                Err("لطفا اطلاعات را کامل وارد کنید");
                            } else {
                                e.preventDefault();
                                const stDate = jalaliDateReformater(
                                    props.destandorgcities.date.persianDate
                                );
                                ;
                                // 

                                router.push(
                                    `/tour/hotelselect?org=${props.destandorgcities.origin.code}&dest=${props.destandorgcities.destination.code}&stdate=${stDate}&night=${props.destandorgcities?.night}`
                                );
                                props.setLoader(true)
                            }

                            // posthog.capture("FormStartTour", {HMNOrigin: props.destandorgcities.origin.code, HMNDest: props.destandorgcities.destination.code,HMNDate:props.destandorgcities.date.miladiDate,HMNNight:props.destandorgcities.night })


                        }}


                    >
                        {props.destandorgcities.loader?'لطفا صبر کنید...':"جستجو"}
                    </PrimaryButton>

                </div>

                <PopUpWide opened={state.open} closePopUp={managePopUpCalendar}>

                    {
                        dateAndNight?.length===0 ?
                            <div style={{width:'910px',height:'370px !important',backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <NewLoader/>
                            </div>

                            :<div className={styles["flight-search-box-calendar-container"]}>
                                <CalendarComponent
                                    setDate={(value) => {
                                        props.addCredentials({
                                            stDate: value.garigorian,
                                            flightDatePersian: value.jalali,
                                            typeOfCalendar: value.typeOfCalendar,
                                            dateAndNight:dateAndNight
                                        });
                                    }}
                                    closePopUpCalendar={managePopUpCalendar}
                                    dateandnight={dateAndNight}
                                    setFlightDate={(value) => props.setFlightDate(value)}
                                />
                            </div>
                    }

                </PopUpWide>
            </div>
        </>
    );
};

const mapStatesToProps = (state) => ({
    credentials: selectCredentials(state),
    destandorgcities: state.destandoriginCitiesTour,
});
const mapDispatchesToProps = (dispatch) => ({
    addCredentials: async (value) => dispatch(addCredentials(value)),
    switchRoute: async () => dispatch(switchRoute()),
    messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
    cityTourOrg: async (value) => dispatch(fet(value)),
    setOrgLoc: async (value) => dispatch(setOrgLoc(value)),
    setDestLoc: async (value) => dispatch(setDestLoc(value)),
    setFlightDate: async (value) => dispatch(setFlightDate(value)),
    setNightNumber: async (value) => dispatch(setNightNumber(value)),
    setLoader:async(value)=>dispatch(setLoader(value))
});
export default withRouter(
    connect(mapStatesToProps, mapDispatchesToProps)(TourSearchBox)
);
