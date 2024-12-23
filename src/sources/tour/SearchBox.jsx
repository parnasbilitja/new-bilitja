import React, { useEffect, useState } from "react";
import styles from "../../../styles/FlightSearchBox.module.scss";

import {faCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryTextInputMobile from "../component/PrimaryTextInputMobile";
import Scrolltoprefresh from "../component/Scrolltoprefresh";
import InputValues from "./InputValues";
import axios from "axios";
import styles1 from "../../../styles/PrimaryButton.module.scss";

import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {
    setFlightDate,
    setDestLoc,
    setNightNumber,
    setOrgLoc,
    setSearchStep,
    setTourType
} from "../../Redux/TourSearchbox/Action";
import {Err, NotifAlert} from "../../Components/NewTours/Components/NotifAlert.component";
import CalendarComponent from "../../Components/NewTours/Components/calendar/Calendar.component";
import {motion} from "framer-motion";
import Modal from "@mui/material/Modal";
import PopUpWide from "../../Components/NewTours/Components/subComponents/PopUpWide.component";
const SearchBox = ({state, setState,toursHandler, executeScroll}) =>{
    const toursData=useSelector(state=>state.TourSearchBox)
    const dispatch =useDispatch()
    const [origins,setOrigins]=useState([])
    const [destinations,setDestinations]=useState([])
    const [AvDates, setAvDates] = useState([]);
    const [nights, setNights] = useState([]);




    let router=useRouter()
    const [searchInput,setSearchInput]=useState('')
    const [isSearchbox,setIsSearchbox]=useState(false)
    const [cities,setCities] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [search,setSearch] = useState({
        month:'',
        destination:'',

    })

    useEffect(()=>{
        setIsLoading(false)
    },[isLoading])
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchInput(value)
        setSearch({...search,[name]:value});


    };

    useEffect(()=>{
        if(searchInput===''){
            getData()
        }else{

            const filtered=cities.filter(d=>d.name.includes(searchInput))

            setCities(filtered)
        }
    },[searchInput])
    const getData =async () => {
        let data = await axios.get('https://api.hotelobilit.com/api/v2/tours/destinations',{
            headers: {
                "x-app-key":  '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
            }
        })
            .then((response) => {
                //
                // let allDest=[]
                // response.data.data.map(dest=>{
                //     allDest.push(...dest.destinations)
                // })
                //
                // let uniqueData = Array.from(
                //     allDest.reduce((map, item) => {
                //         if (!map.has(item.name)) {
                //             map.set(item.name, item);
                //         } else {
                //             // If you want to keep the item with the largest 'dates' array
                //             let existingItem = map.get(item.name);
                //             if (item.dates.length > existingItem.dates.length) {
                //                 map.set(item.name, item);
                //             }
                //         }
                //         return map;
                //     }, new Map()).values()
                // );

                setOrigins(response.data.data)
                    let dest=[]
                response.data.data.map(org=>{
                        dest.push(...org.destinations)
                    })

                    setDestinations(removeDuplicateObj(dest,'code'))

                // console.log('newdest',uniqueData)
            })
        return data
    }
    const removeDuplicateObj = (data, prop) => {
        // debugger
        const seenIds = {}; // Helper object to keep track of seen IDs

        const filteredData = data.filter((obj) => {
            if (!seenIds[obj[prop]]) {
                seenIds[obj[prop]] = true; // Mark the ID as seen
                return true; // Keep the object in the filtered data
            }
            return false; // Ignore the object as duplicate
        });
        return filteredData;
    };
    useEffect(() => {
        getData()
    },[])
    const [width, setWidth]   = useState();
    useEffect(() => {
        setWidth(window.innerWidth)

    },[search])
    useEffect(() => {
        setState({...state, city:search.slug})
    },[search.slug])

    const handleFocus=()=>{
        setSearchInput('')
    }
    useEffect(()=>{
        // console.log(cities[0].destinations)
    },[cities])
    // const posthog=usePostHog()
    const setSearchBoxState = (
        actionCreator,
        payload,
        nextStep,
        additionalResets = []
    ) => {
        dispatch(actionCreator(payload));
        additionalResets.forEach(reset => dispatch(reset()));
        dispatch(setSearchStep(nextStep));
    };

    const setOrigin = (org) => {

        setSearchBoxState(setOrgLoc, org, 'dest', [
            () => setDestLoc({name: '', code: ''}),
            () => setFlightDate({miladiDate: '', persianDate: ''}),
            () => setNightNumber(null)
        ]);
    };

    const setDestination = (dest) => {
        setSearchBoxState(setDestLoc, dest, 'date', [
            () => setFlightDate({miladiDate: '', persianDate: ''}),
            () => setNightNumber(null)
        ]);
    };

    const setNight = (night) => {
        setSearchBoxState(setNightNumber, night, '');
    };

    const setDates = (date) => {
        setSearchBoxState(setFlightDate, date, 'night', [
            () => setNightNumber(null)
        ]);
    };


    useEffect(() => {

        if(toursData.selectedOrigin){

            let foundOrg=origins.filter((org)=>org.code===toursData.selectedOrigin.code)[0]?.destinations

            setDestinations(foundOrg)


        }
    }, [toursData.selectedOrigin]);

    useEffect(()=>{

        setAvDates(toursData.selectedDestination.dates)

    },[toursData.selectedDestination])

    useEffect(()=>{
        let foundDate=AvDates?.filter((date)=>date?.date===toursData.selectedDate?.miladiDate)
        setNights(foundDate?.length>0 ?foundDate[0]?.nights :[])

    },[toursData.selectedDate])


    const SearchBoxSteps = (step) => {
        switch (step) {
            case 'org':
                dispatch(setSearchStep(step));
                break;
            case 'dest':
                // if(
                //    toursData.selectedOrigin.name && toursData.selectedOrigin.code
                // ){
                    dispatch(setSearchStep(step));
                // }else{
                //     Err('لطفا مبدا خود را انتخاب کنید')
                // }
                break;
            case 'date':
                if(toursData.selectedDestination.name && toursData.selectedDestination.code){
                    dispatch(setSearchStep(step));
                }else{
                    Err('لطفا مقصد خود را انتخاب کنید')
                }
                break;
            case 'night':
                if(toursData.selectedDate.miladiDate && toursData.selectedDate.persianDate){
                    dispatch(setSearchStep(step));
                }else{
                    Err('لطفا تاریخ خود را انتخاب کنید')
                }
                break;
            default:
                break;
        }

    };

    useEffect(()=>{
        console.log(toursData)
    },[toursData])

    return (
        <>
            <NotifAlert/>
            <Scrolltoprefresh/>

            <div>


                <div
                    className={styles['tour_type']}
                >
                    <div
                        className={`${styles['type_hotel']} ${styles['type']} ${
                            toursData.tour_type === "hotel"
                                ? styles['type_active']
                                : ""
                        }`}
                        onClick={() =>dispatch(setTourType("hotel") )}
                    >
                        <p
className='p-0 m-0'
                        >
                            هتلی{" "}
                        </p>
                    </div>
                    <div
                        className={`${styles['type_package']} ${styles['type']}  ${
                            toursData.tour_type === "package"
                                ? styles['type_active']
                                : ""
                        }`}
                        onClick={() =>dispatch(setTourType("package")) }
                    >
                        <p
                            className='p-0 m-0'
                        >
                            پکیجی
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles['search_box_container']} style={{padding: '0 10px', columnGap: '12px'}}>

                <div className={'w-100'}>
                    <div className={` form-input-border ${styles["prs-input"]} `}>


                        <PrimaryTextInputMobile
                            value={toursData?.selectedOrigin?.name}
                            name={'slug'}
                            onFocus={handleFocus}
                            // onBlur={handleFocusOut}
                            onChange={handleChange}
                            onClick={(e) => {
                                e.stopPropagation();
                                SearchBoxSteps('org')
                                setIsSearchbox(true)
                            }}
                            placeholder={"مبدا خود را انتخاب کنید"}
                        />
                        <div className={'d-flex align-items-center justify-content-between gap-2 ml-2 px-2'}>
                            {toursData.selectedOrigin.name && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                                   onClick={()=>dispatch(setOrgLoc({name:'',code:''}))}
                                  width={15}
                                  height={15}
                                                                   className={'cursor-pointer'}
                                                                   style={{cursor: 'pointer'}}
                                  stroke="#e20000" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                id="_044-Departures"
                                data-name="044-Departures"
                                width="25"
                                height="25"
                                viewBox="0 0 39.655 27.135"
                                // style={{zIndex: 100, left: '9px', position: 'absolute', top: '15px'}}
                            >
                                <path
                                    id="Path_1760"
                                    data-name="Path 1760"
                                    d="M.782,406.966h38.09a.782.782,0,1,1,0,1.564H.782a.782.782,0,1,1,0-1.564Z"
                                    transform="translate(0 -381.396)"
                                    fill="#b9b9b9"
                                />
                                <path
                                    id="Path_1761"
                                    data-name="Path 1761"
                                    d="M39.736,93.474l-5.765,3.94a7.742,7.742,0,0,1-7.611.621l-5.68-2.654a.782.782,0,0,1,.662-1.417l5.679,2.654a6.172,6.172,0,0,0,6.066-.5l4.768-3.259-2.146-1.316L30.189,93.38a.782.782,0,0,1-.58-.035l-6.58-3.1a.782.782,0,0,1-.151-1.322L30.139,83.2l-2.824-1.441L14.254,85.893a.783.783,0,0,1-.569-.038L4.948,81.749a2.117,2.117,0,0,0-2.666,1.01,2.04,2.04,0,0,0,.962,2.762l11.739,5.484a.782.782,0,1,1-.662,1.417L2.581,86.939a3.6,3.6,0,0,1-1.7-4.879,3.7,3.7,0,0,1,4.691-1.744l.026.012,8.475,3.982,13.075-4.137a.782.782,0,0,1,.591.049l4.2,2.142a.782.782,0,0,1,.129,1.311L24.84,89.369,29.993,91.8l5.571-1.848a.783.783,0,0,1,.655.076L39.7,92.162a.782.782,0,0,1,.032,1.312Z"
                                    transform="translate(-0.462 -80.036)"
                                    fill="#b9b9b9"
                                />
                                <path
                                    id="Path_1762"
                                    data-name="Path 1762"
                                    d="M275.938,238.18a.781.781,0,1,1-1.038.377A.781.781,0,0,1,275.938,238.18Z"
                                    transform="translate(-258.229 -225.743)"
                                    fill="#b9b9b9"
                                />
                            </svg>


                        </div>


                    </div>
                    {toursData.searchboxStep === 'org' &&
                        <InputValues
                            type="cities"
                            name='destination'
                            search={search}
                            setSearch={setSearch}
                            months={[...origins]}
                            // issearchbox={toursData.searchboxStep === 'org'}
                            // setIsSearchbox={() => SearchBoxSteps('org')}
                            setsearchInput={(val) => setSearchInput(val)}
                            searchInput={searchInput}
                            handleChange={(val) => setOrigin(val)}


                        />}
                </div>

                <div className={'w-100'}>
                    <div className={` form-input-border ${styles["prs-input"]} `}
                        // style={{width: '300px'}}
                    >

                        <PrimaryTextInputMobile
                            value={toursData?.selectedDestination?.name}
                            name={'slug'}
                            onFocus={handleFocus}
                            // onBlur={handleFocusOut}
                            onChange={handleChange}
                            onClick={(e) => {
                                e.stopPropagation();

                                SearchBoxSteps('dest')
                                setIsSearchbox(true)
                            }}
                            placeholder={"مقصد خود را انتخاب کنید"}
                        />

                        <div
                            className={'d-flex align-items-center justify-content-between gap-2 ml-2 px-2'}>
                            {toursData.selectedDestination.name && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                                   onClick={()=> {
                                                                       dispatch(setDestLoc({name: '', code: ''}))

                                                                            dispatch(setFlightDate({miladiDate:'',persianDate:''}))
                                                                            dispatch(setNightNumber(null))
                                                                   }
                            }
                                                                   width={15}
                                                                   height={15}
                                                                   className={'cursor-pointer'}
                                                                   style={{cursor: 'pointer'}}
                                                                   stroke="#e20000" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 37.922 29.591"
                                // style={{zIndex: 100, left: '9px', position: 'absolute', top: '15px'}}
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
                                        fill="#b9b9b9"

                                    />
                                    <path
                                        id="Path_1768"
                                        data-name="Path 1768"
                                        d="M237.923,268.478a.747.747,0,1,1-.916-.526A.747.747,0,0,1,237.923,268.478Z"
                                        transform="translate(-217.713 -252.051)"
                                        fill="#b9b9b9"
                                    />
                                    <path
                                        id="Path_1769"
                                        data-name="Path 1769"
                                        d="M.748,431.31H37.174a.748.748,0,0,1,0,1.5H.748a.748.748,0,1,1,0-1.5Z"
                                        transform="translate(0 -403.214)"
                                        fill="#b9b9b9"
                                    />
                                </g>
                            </svg>
                        </div>

                    </div>
                    {toursData.searchboxStep === 'dest' &&
                        <InputValues
                            type="cities"
                            name='destination'
                            search={search}
                            setSearch={setSearch}
                            months={destinations}
                            // issearchbox={toursData.searchboxStep === 'dest'}
                            // setIsSearchbox={() => SearchBoxSteps('dest')}
                            setsearchInput={(val) => setSearchInput(val)}
                            searchInput={searchInput}
                            handleChange={(val) => setDestination(val)}


                        />}
                </div>

                <div className={'w-100 '}>
                    <div className={`form-input-border ${styles["prs-input"]} `}
                        // style={{width: '100%'}}
                    >

                        <PrimaryTextInputMobile
                            value={toursData.selectedDate.persianDate}
                            name={'slug'}
                            onFocus={handleFocus}
                            // onBlur={handleFocusOut}
                            onChange={handleChange}
                            onClick={(e) => {
                                e.stopPropagation();

                                SearchBoxSteps('date')
                                setIsSearchbox(true)
                            }}
                            placeholder={"تاریخ رفت خود را انتخاب کنید"}
                        />
                        <svg
                            // style={{position: 'absolute', left: '10px', top: '14px'}}
                            width="27" height="27"
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" fill="white"/>
                            <g filter="url(#filter0_d_15_268)">
                                <path
                                    d="M3 8.26667V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V8.26667M3 8.26667V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V8.26667M3 8.26667H21"
                                    stroke="#b9b9b9" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter1_d_15_268)">
                                <path d="M7 2V5" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter2_d_15_268)">
                                <path d="M17 2V5" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter3_d_15_268)">
                                <path d="M18 11H16" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter4_d_15_268)">
                                <path d="M18 17H16" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter5_d_15_268)">
                                <path d="M13 11H11" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter6_d_15_268)">
                                <path d="M13 17H11" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter7_d_15_268)">
                                <path d="M8 11H6" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter8_d_15_268)">
                                <path d="M8 17H6" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter9_d_15_268)">
                                <path d="M18 14H16" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter10_d_15_268)">
                                <path d="M13 14H11" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <g filter="url(#filter11_d_15_268)">
                                <path d="M8 14H6" stroke="#b9b9b9" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_15_268" x="1.5" y="3.5" width="21" height="19"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter1_d_15_268" x="5.5" y="1.5" width="3" height="6"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter2_d_15_268" x="15.5" y="1.5" width="3" height="6"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter3_d_15_268" x="14.5" y="10.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter4_d_15_268" x="14.5" y="16.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter5_d_15_268" x="9.5" y="10.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter6_d_15_268" x="9.5" y="16.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter7_d_15_268" x="4.5" y="10.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter8_d_15_268" x="4.5" y="16.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter9_d_15_268" x="14.5" y="13.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter10_d_15_268" x="9.5" y="13.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                                <filter id="filter11_d_15_268" x="4.5" y="13.5" width="5" height="3"
                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix"
                                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                   result="hardAlpha"/>
                                    <feOffset dy="1"/>
                                    <feGaussianBlur stdDeviation="0.5"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_268"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_268"
                                             result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div className="isDesktop">
                        {toursData.searchboxStep === 'date' ? <motion.div
                            initial={{opacity: 0, x: 150}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.3}}
                            style={{
                                position: 'absolute',
                                top: '110px',
                                left: '0',
                                right: '20%',
                                bottom: '0',
                                zIndex: '999',
                                width: 'fit-content',
                                height: 'fit-content',
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                padding: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                            <CalendarComponent setDate={(value) => {

                            }}
                                               closePopUpCalendar={() => SearchBoxSteps('')}
                                               dateandnight={AvDates}
                                               setFlightDate={(value) => setDates(value)}/>

                        </motion.div> : ''}
                    </div>

                </div>

                <div className={'w-100'}>
                    <div className={` form-input-border ${styles["prs-input"]} `}
                        // style={{width: '300px'}}
                    >

                        <PrimaryTextInputMobile
                            value={toursData.selectedNight ? toursData.selectedNight + ' ' + 'شب' : ''}
                            name={'slug'}
                            onFocus={handleFocus}
                            // onBlur={handleFocusOut}
                            onChange={handleChange}
                            onClick={(e) => {
                                e.stopPropagation();

                                SearchBoxSteps('night')
                                setIsSearchbox(true)
                            }}
                            placeholder={"تعداد شب خود را انتخاب کنید"}
                        />
                        <svg width="25"
                             height="25" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke-width="1.5" stroke="#b9b9b9" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
                        </svg>
                    </div>
                    {toursData.searchboxStep === 'night' &&
                        <InputValues
                            type="cities"
                            name='destination'
                            search={search}
                            setSearch={setSearch}
                            months={nights}
                            // issearchbox={toursData.searchboxStep === 'dest'}
                            // setIsSearchbox={() => SearchBoxSteps('dest')}
                            setsearchInput={(val) => setSearchInput(val)}
                            searchInput={searchInput}
                            handleChange={(val) => setNight(val)}


                        />}
                </div>


                <div className="col-12 without-focus px-0">
                    <button className={`${styles1['primary-button']} px-0 soc01`}
                            style={{
                                width: '100%',
                                height: "55px",
                                marginTop: "7px",
                                fontSize: '14px',
                                fontWeight: '600',
                                textAlign: 'center',
                                borderRadius: "10px"
                            }}
                            value={"جستجو"}
                            onClick={() => {
                                // posthog.capture("FormStartTourPackage", {HMNCity: search.slug})

                                if (isLoading === false) {
                                    setIsLoading(true)
                                    // if (search.destination === 'همه') {

                                    if (toursData.tour_type === 'package') {
                                        router.push(`/tours/tourlist?origin=${toursData.selectedOrigin.code}&destination=${toursData.selectedDestination.code}&date=${toursData.selectedDate.miladiDate}&nights=${toursData.selectedNight}&tour_type=${toursData.tour_type}`);

                                    } else {
                                        router.push(`/tours/packagelist/${toursData.selectedOrigin.code}-${toursData.selectedDestination.code}?date=${toursData.selectedDate.miladiDate}&nights=${toursData.selectedNight}&tour_type=${toursData.tour_type}`);

                                    }

                                }

                            }}
                    >{isLoading === false ? "جستجو" : 'لطفا صبر کنید...'}</button>
                </div>
                {toursData.searchboxStep === 'date' &&

                    <div className={'isMobile'}>
                        <PopUpWide
                            opened={toursData.searchboxStep === 'date'}
                        >

                            <div style={{
                                // position: 'absolute',
                                // top: '70px',
                                // left: '0',
                                // right: '20%',
                                // bottom: '0',
                                // zIndex: '999',
                                width: 'fit-content',
                                height: 'fit-content',

                                marginTop: '100px',
                                // transform:'translateX(-25px)',

                                backgroundColor: 'white',
                                borderRadius: '20px',
                                padding: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <CalendarComponent setDate={(value) => {

                                }}
                                                   closePopUpCalendar={() => SearchBoxSteps('')}
                                                   dateandnight={AvDates}
                                                   setFlightDate={(value) => setDates(value)}/>

                            </div>


                        </PopUpWide>
                    </div>

                }


            </div>


        </>
    );
}
export default SearchBox

