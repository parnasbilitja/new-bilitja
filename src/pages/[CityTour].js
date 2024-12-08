import axios from 'axios';
import React, {useEffect, useState} from 'react';
import moment from 'moment-jalaali'
import NavHandler from '../Components/share/NavHandler';
import Footer from '../sources/component/Footer.component';
import TourList from '../sources/tour/TourList';
import Head from 'next/head';
import {jalaliMonthName,  MiladiToJalaliConvertor} from "../Utils/newTour";
import styles from "../../styles/AvailableHotels.module.scss";
import HotelsSideBarSearch from "../Components/NewTours/Components/subComponents/HotelsSideBarSearch.component";
import NewLoader from "../Components/NewTours/Components/subComponents/NewLoader";
import CalendarComponent from "../Components/NewTours/Components/calendar/Calendar.component";
import PopUpWide from "../Components/NewTours/Components/subComponents/PopUpWide.component";
import globals from "../sources/Global";
import { motion} from "framer-motion";
import Loader1 from "../Components/NewTours/Components/subComponents/Loader1";
import {useRouter} from "next/router";

const CityTour = (props) => {
    const[orgs,setOrgs]=useState([])
    const[selectedOrigin,setSelectedOrigin]=useState({name:'',code:''})
    const [nightsList,setNightsList]=useState([])
    const [order,setOrder]=useState(1)
    const [staycount,setStayCount]=useState(null)
    const [page,setPage]=useState(1)
    const [showFilter, setShowFilter] = useState(false);
    const [isModal, setIsmodal] = useState(false)
    const [isLoading, setISLoading] = useState(false)
    const [tours,setTours]=useState({})
    const [datesList,setDatesList]=useState([])
    const [flightDate,setFlightDate]=useState({
        persianDate: '', miladiDate: ''
    })
    const router=useRouter()


    const getTour = async (cityCode,page=1) => {
        setISLoading(true)
        setTours({})
        try {
            const response = await axios.post(`${globals.tourPackagesnew}packages?page=${router.query.page}`, {
                destination:cityCode,
                origin: router.query?.org?router?.query?.org.split('-')[1]:'',
                month:'',
                stayCount:router?.query?.night ?router.query?.night :'',
                ordering:order,
                req_type:'package',
                date:router.query?.date ? router.query?.date : '',
            },{
                headers: {"x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05',
                    referer:'hamnavaz.com'
                },


            });

            setISLoading(false)

            setTours(response.data)
            // return response.data;
        } catch (error) {
            setISLoading(false)

            console.error("Error fetching data:", error);
            throw error;
        }

    }

    let searchElement=[

        {
            title: 'مرتب سازی براساس تاریخ ورود به هتل',
            svg: <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path
                    d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
            </svg>
            ,
            inputType: 'checkbox',
            inputTag:
                <div>

                    <div className={styles.checkboxcontainer}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            name="نزدیک ترین"
                            id=""
                            onClick={() => {
                                setOrder(1)
                                setShowFilter(!showFilter)
                            }
                            }
                            checked={order === 1 ? true : false}
                        />
                        <p style={{whiteSpace: 'nowrap'}}>نزدیک ترین</p>
                    </div>
                    <div className={styles.checkboxcontainer}>
                        <input
                            className={styles.checkbox}
                            type="checkbox"
                            name="دور ترین"
                            id=""
                            checked={order === 2 ? true : false}
                            onClick={() => {

                                setOrder(2)
                                setShowFilter(!showFilter)
                            }

                            }

                        />
                        <p style={{whiteSpace: 'nowrap'}}>دور ترین</p>
                    </div>
                </div>
        }, {
            title: 'تعداد شب',
            svg: <svg width="28px" height="28px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none"
                      stroke="#000000" stroke-width="3.136">

                <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                <g id="SVGRepo_iconCarrier">

                    <path d="M46 44a26 26 0 0 1-24.94-33.36 24 24 0 1 0 32.3 32.3A26.24 26.24 0 0 1 46 44z"/>

                </g>

            </svg>,
            inputType: 'select',
            inputTag: <select
                name=""
                id=""
                onChange={(e) => {
                    setStayCount(e.target.value)

                }}

                onClick={(e) => e.stopPropagation()}
            >
                <option key={'همه'} selected value='همه'>
                    همه
                </option>
                {nightsList?.map((night) => {
                    return <option key={night} value={night}>{night} شب </option>;
                })}
            </select>
        },
        {
            title: 'تاریخ پرواز',
            svg: <svg width='28px' height='28px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" id="flight-date">
                <path
                    d="M303.41 816.85H276a16 16 0 01-15.41-20.29l39-140.27L215 652.34l-42.76 40.22a16 16 0 01-13.83 4.09l-15.58-2.84a16 16 0 01-12.25-21l20.87-59.9L130.58 553a16 16 0 0112.25-21l15.58-2.83a16 16 0 0113.83 4.08L215 573.47l84.62-3.94-39-140.28A16 16 0 01276 409h27.39a16 16 0 0113.44 7.31L413 565a391.47 391.47 0 0144.2 1.74C499 571 523.44 582.31 532 601.36a28.34 28.34 0 010 23.1c-8.51 19-33 30.36-74.75 34.6a389.52 389.52 0 01-44.2 1.75L316.85 809.53A16 16 0 01303.41 816.85zM209 620.05h.74l111.45 5.2a16 16 0 0114.67 20.27L298.88 778.39 391 635.86a15.94 15.94 0 0114.27-7.29 364.67 364.67 0 0049-1.38c30.5-3.13 43.6-9.87 47.43-14.28-3.85-4.44-17-11.2-47.76-14.32a363.65 363.65 0 00-48.67-1.34A16 16 0 01391 590L298.88 447.42l36.95 132.87a16 16 0 01-14.67 20.27l-111.45 5.19a15.94 15.94 0 01-11.7-4.33l-24.8-23.32 10.29 29.55a16.07 16.07 0 010 10.52l-10.29 29.55L198 624.39A16 16 0 01209 620.05zM723 243H550.78a16 16 0 010-32H723a16 16 0 010 32z"></path>
                <path
                    d="M900,891.86H100a16,16,0,0,1-16-16V227a16,16,0,0,1,16-16h75.41a16,16,0,0,1,0,32H116V859.86H884V243H824.58a16,16,0,0,1,0-32H900a16,16,0,0,1,16,16V875.86A16,16,0,0,1,900,891.86Z"></path>
                <path
                    d="M449.22 243H277a16 16 0 010-32H449.22a16 16 0 010 32zM900 366H100a16 16 0 010-32H900a16 16 0 010 32zM672 523.66H565.82a16 16 0 01-16-16V401.49a16 16 0 0116-16H672a16 16 0 0116 16V507.66A16 16 0 01672 523.66zm-90.17-32H656V417.49H581.82zM834.56 523.66H728.39a16 16 0 01-16-16V401.49a16 16 0 0116-16H834.56a16 16 0 0116 16V507.66A16 16 0 01834.56 523.66zm-90.17-32h74.17V417.49H744.39zM672 682.35H565.82a16 16 0 01-16-16V560.19a16 16 0 0116-16H672a16 16 0 0116 16V666.35A16 16 0 01672 682.35zm-90.17-32H656V576.19H581.82zM834.56 682.35H728.39a16 16 0 01-16-16V560.19a16 16 0 0116-16H834.56a16 16 0 0116 16V666.35A16 16 0 01834.56 682.35zm-90.17-32h74.17V576.19H744.39zM672 841H565.82a16 16 0 01-16-16V718.88a16 16 0 0116-16H672a16 16 0 0116 16V825A16 16 0 01672 841zm-90.17-32H656V734.88H581.82zM834.56 841H728.39a16 16 0 01-16-16V718.88a16 16 0 0116-16H834.56a16 16 0 0116 16V825A16 16 0 01834.56 841zm-90.17-32h74.17V734.88H744.39z"></path>
                <path
                    d="M226.2 300.82A66.85 66.85 0 01159.42 234V174.92a66.78 66.78 0 11133.55 0V234A66.85 66.85 0 01226.2 300.82zm0-160.68a34.82 34.82 0 00-34.78 34.78V234A34.78 34.78 0 10261 234V174.92A34.81 34.81 0 00226.2 140.14zM500 300.82A66.86 66.86 0 01433.22 234V174.92a66.78 66.78 0 11133.56 0V234A66.86 66.86 0 01500 300.82zm0-160.68a34.82 34.82 0 00-34.78 34.78V234a34.78 34.78 0 1069.56 0V174.92A34.82 34.82 0 00500 140.14zM773.8 300.82A66.85 66.85 0 01707 234V174.92a66.78 66.78 0 11133.55 0V234A66.85 66.85 0 01773.8 300.82zm0-160.68A34.81 34.81 0 00739 174.92V234a34.78 34.78 0 1069.55 0V174.92A34.82 34.82 0 00773.8 140.14z"></path>
            </svg>
            ,
            inputType: 'input',
            inputTag: <input readOnly={true} placeholder='تاریخ پرواز را وترد کنید' value={flightDate.persianDate}
                             type='text' onClick={() => {
                managePopUpCalendar(true);

            }}/>
        }

    ]




    function removeDuplicatesByDate(bookings) {
        return bookings.reduce((unique, booking) => {
            if (!unique.some(item => item.date === booking.date)) {
                unique.push(booking);
            }
            return unique;
        }, []);
    }
    // function scrollToTop() {
    //     var body = document.getElementsByTagName("body")
    //     body[0].scrollTo({top: 0, left: 0, behavior: "smooth"});
    // }


    useEffect(()=>{


        setSelectedOrigin({name:router.query?.org?router.query?.org.split('-')[0]:'' ,code:router.query?.org?router.query.org.split('-')[1]:''})
        setStayCount(router.query?.night ? router.query?.night:'')
        setFlightDate({miladiDate: router.query?.date  ? router.query.date:'',persianDate:router.query?.date?MiladiToJalaliConvertor(router.query.date):''})
        setPage(router.query?.page ? router.query.page : 1)
        getTour(props.cityInfo.code)

        getData()

    },[router.query,order])
//
// useEffect(()=>{
//     if()
// },[selectedOrigin])


    let getlistofNight = (dest) => {
        let nights = []
        dest?.map(date => {
            date.nights.map(night => {
                let findNightIndex = nights.findIndex(el => el === night)
                if (findNightIndex >= 0) {
                    nights.splice(findNightIndex, 1)
                    nights.push(night)

                } else {
                    nights.push(night)
                }
            })
        })
        setNightsList(nights.sort((a, b) => a - b))
    }

    const getData = async () => {

        let data = await axios.get('https://api.hotelobilit.com/api/v2/tours/destinations', {
            headers: {
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
            }
        }, {
            
            destination: props.cityInfo.code
        })
            .then((response) => {



                let relatedOrg =[]
                response.data.data.map(org=>{
                    org.destinations.map(dest=>{
                        if(dest.code===props.cityInfo.code){

                            relatedOrg.push(org)

                        }else{
                            return null
                        }
                    })
                })

                setOrgs(relatedOrg)

                let destTime =[]
// debugger
                if(selectedOrigin.name.length>0 && selectedOrigin.code.length>0){
                    let foundOrg=relatedOrg.filter(org=>org.code===selectedOrigin.code)[0]
                    let foundDest=foundOrg.destinations.filter(dest=>dest.code===props.cityInfo.code)[0]
                    destTime.push(...foundDest.dates)
                    getlistofNight(destTime)
                    setDatesList(destTime)

                }else{
                    relatedOrg.map(org=>{
                        org.destinations.map(dest=>{
                            if(dest.code===props.cityInfo.code){
                                destTime.push(dest.dates)
                            }
                        })
                    })

                    destTime=removeDuplicatesByDate(destTime.flat())
                    getlistofNight(destTime)

                    setDatesList(destTime)
                }





            })
        return data
    }
    const [state, setState] = useState({
        searchBool: false,
        sourceSearch: "",
        destinationSearch: "",
        // width: width,
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
    const managePopUpCalendar = (value) => {
        setState({...state, open: value});
    };


    return (
        <>

            {/*{(notfound === true) && <NotFound/>}*/}

            {
                // (data1 && notfound === false) &&
                <>
                    <Head>
                        <title> لیست‌ تور‌های شهر {props.cityInfo.name} | آژانس مسافرتی بلیطجا
                        </title>
                        <meta name="description"
                              content={`تور‌های ${props.cityInfo.name} ماه ${jalaliMonthName(moment().locale('fa').format('jMMMM'))} با ایرلاین‌های معتبر و هتل دلخواه شما. شروع قیمت‌ تور‌های ${props.cityInfo.name} از ${props.tourMinPrice + ' ' + 'تومان'}. رزرو تور از سایت مسافرتی بلیطجا.`}/>
                    </Head>
                    <NavHandler/>
                    <div className='padd margin-top margin-topsm-1rem d-lg-flex justify-lg-content-center '
                         style={{marginTop: '5rem',position:"relative"}}>
                        {/*<Scrolltoprefresh/>*/}
                        <div className='widre100'>

                            <div style={{padding: '0 1rem'}} className='hidestat'>
                                <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-4 col-12 ">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17.326" height="20.086"
                                                 viewBox="0 0 14.326 17.086">
                                                <g id="Bookmark" transform="translate(1 1)">
                                                    <path id="Path_835" data-name="Path 835"
                                                          d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z"
                                                          transform="translate(-1 -1)" fill="none" stroke="#053742"
                                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                                    <path id="Path_836" data-name="Path 836"
                                                          d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911"
                                                          transform="translate(-4.468 -2.262)" fill="none"
                                                          stroke="#053742"
                                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
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

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '.2fr 1fr 1fr 1fr 1fr .2fr',
                                    backgroundColor: '#cecece',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    width: '100%',
                                    columnGap: "10px",
                                    alignItems: 'center'
                                }}>

                                    <div style={{fontSize: '13px', color: 'black'}}>
                                        <p style={{
                                            padding: '0',
                                            margin: '0',
                                            fontWeight: '700',
                                            whiteSpace: 'wrap'
                                        }}>فیلتر ها :</p>
                                    </div>
                                    <select
                                        name=""
                                        id=""
                                        onChange={(e) => {

                                            let foundOrg=orgs.filter(org=>org.code===e.target.value)[0]
                                            setSelectedOrigin(foundOrg)

                                            setFlightDate({miladiDate:'',persianDate:''})
                                            setStayCount(null)
                                            router.push(props.tourName+`?org=${foundOrg.name+'-'+foundOrg.code}&night=${''}&date=${''}&page=${1}`)
                                            // setPage(1)

                                        }}
                                        style={{
                                            width: '100%',
                                            height: '50px',
                                            borderRadius: '10px',
                                            outline: 'none',
                                            border: '1px solid #cecece'
                                        }}

                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option selected>مبدا</option>
                                        {/*<option key={'همه'} value='همه'>*/}
                                        {/*    همه*/}
                                        {/*</option>*/}
                                        {orgs?.map((org) => {
                                            return <option key={org.code} value={org.code}
                                            >{org.name}  </option>;
                                        })}
                                    </select>
                                    <input readOnly={true} placeholder='تاریخ پرواز را وارد کنید'
                                           value={flightDate.persianDate}
                                           style={{
                                               width: '100%',
                                               height: '50px',
                                               borderRadius: '10px',
                                               outline: 'none',
                                               border: '1px solid #cecece',
                                               padding: '0 2px'
                                           }}
                                           type='text' onClick={() => {
                                        managePopUpCalendar(true);
                                    }}/>
                                    <select
                                        name=""
                                        id=""
                                        onChange={(e) => {
                                            setStayCount(e.target.value)
                                            router.push(props.tourName+`?org=${selectedOrigin.name+'-'+selectedOrigin.code}&night=${e.target.value}&date=${flightDate.miladiDate}&page=${1}`)
                                            // setPage(1)


                                        }}
                                        style={{
                                            width: '100%',
                                            height: '50px',
                                            borderRadius: '10px',
                                            outline: 'none',
                                            border: '1px solid #cecece'
                                        }}

                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <option selected>شب</option>
                                        {/*<option key={'همه'} value='همه'>*/}
                                        {/*    همه*/}
                                        {/*</option>*/}
                                        {nightsList?.map((night) => {
                                            return <option key={night} value={night}>{night} شب </option>;
                                        })}
                                    </select>
                                    <div style={{display: 'flex'}}>


                                        <select
                                            name=""
                                            id=""
                                            onChange={(e) => {
                                                setOrder(e.target.value)


                                            }}
                                            style={{
                                                width: '100%',
                                                height: '50px',
                                                borderRadius: '10px',
                                                outline: 'none',
                                                border: '1px solid #cecece'
                                            }}

                                            onClick={(e) => {
                                                e.stopPropagation()

                                            }}
                                        >

                                            <option selected>ورود به هتل</option>

                                            <option key={1} value={1}>نزدیک ترین</option>
                                            ;
                                            <option key={2} value={2}>دور ترین</option>;

                                        </select>
                                        {/*<div className={styles.checkboxcontainer}>*/}
                                        {/*    <input*/}
                                        {/*        className={styles.checkbox}*/}
                                        {/*        type="checkbox"*/}
                                        {/*        name="نزدیک ترین"*/}
                                        {/*        id=""*/}
                                        {/*        onClick={() => {*/}
                                        {/*            setOrder(1)*/}
                                        {/*            setShowFilter(!showFilter)*/}
                                        {/*        }*/}
                                        {/*        }*/}
                                        {/*        checked={order === 1 ? true : false}*/}
                                        {/*    />*/}
                                        {/*    <p style={{whiteSpace: 'nowrap'}}>نزدیک ترین</p>*/}
                                        {/*</div>*/}
                                        {/*<div className={styles.checkboxcontainer}>*/}
                                        {/*    <input*/}
                                        {/*        className={styles.checkbox}*/}
                                        {/*        type="checkbox"*/}
                                        {/*        name="دور ترین"*/}
                                        {/*        id=""*/}
                                        {/*        checked={order === 2 ? true : false}*/}
                                        {/*        onClick={() => {*/}

                                        {/*            setOrder(2)*/}
                                        {/*            setShowFilter(!showFilter)*/}
                                        {/*        }*/}

                                        {/*        }*/}
                                        {/*    />*/}
                                        {/*    <p style={{whiteSpace: 'nowrap'}}>دور ترین</p>*/}
                                        {/*</div>*/}
                                    </div>
                                    {isLoading &&
                                        <div style={{display: 'flex', justifyContent: 'center',}}>
                                            <Loader1/>

                                        </div>
                                    }


                                </div>
                                {/*<TourSearchBox/>*/}
                            </div>
                            {/*{isModal && <div className='modalContainer'>*/}
                            {/*    <div className='modal12'>*/}
                            {/*        <div style={{display: 'flex', justifyContent: "flex-end", width: '100%'}}>*/}
                            {/*            <div className='close' onClick={() => setIsmodal(false)}>X</div>*/}
                            {/*        </div>*/}
                            {/*        <TourSearchBox/>*/}
                            {/*    </div>*/}

                            {/*</div>}*/}


                            <div className=" m-auto parent-info-city">

                                <div className='mx-3'>
                                    <button className='toursearch' onClick={() => setIsmodal(true)}>
                                        <svg width='25' height='25' id="Glyph" version="1.1" viewBox="0 0 32 32"
                                             xmlns="http://www.w3.org/2000/svg" fill='#137cb6'>
                                            <path
                                                d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                                                id="XMLID_223_"/>
                                        </svg>

                                        تورِ تو آنلاین بگیر!
                                    </button>
                                    <TourList setShowFilter={() => setShowFilter(true)} citycode={props.cityInfo.code}
                                              name={props.cityInfo.name}
                                              city={props.placeId} data={tours} func={(page) => {
                                        // setPage(page)
                                        router.push(props.tourName+`?org=${selectedOrigin.name+'-'+selectedOrigin.code}&night=${staycount}&date=${flightDate.miladiDate}&page=${page}`)

                                    }}/>

                                    {/*<TourData cityInfo={props} city={props.placeId}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        </div>

                        <div className='isDesktop'>


                            <div className='sticky-section'>

                                <div style={{
                                    position: "relative",
                                    height: '100%'
                                    , width: '100%'
                                }}>


                                    <motion.div
                                        initial={{position: 'absolute', top: '40px', width: '100%',height:'100%'}}
                                        animate={showFilter ? {
                                            position: 'absolute',
                                            top: '-400px',
                                            width: '100%'
                                        } : {top: '40px'}}
                                    >
                                        <div
                                            className='fixed-info' style={{marginBottom: '20px'}}>
                                            <div style={{columnGap: '10px', padding: "0 15px"}}>
                                                <ul style={{listStyleType: 'circle'}}>
                                                    <li style={{fontSize: '16px', textAlign: 'justify'}}>بهترین قیمت تور
                                                        و
                                                        رزرو
                                                    </li>
                                                    <li style={{fontSize: '16px', textAlign: 'justify'}}>بهترین هتل‌های
                                                        لوکس
                                                    </li>
                                                    <li style={{fontSize: '16px', textAlign: 'justify'}}>از تمام نقاط
                                                        کشور
                                                    </li>
                                                    <li style={{fontSize: '16px', textAlign: 'justify'}}>با مشاوره‌ی
                                                        متخصصین
                                                        بلیطجا
                                                    </li>
                                                </ul>
                                                <div style={{
                                                    padding: '1rem',
                                                    marginTop: "20px",
                                                    borderTop: '1px solid white',
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                    <div style={{
                                                        backgroundColor: 'white',
                                                        color: '#137cb6',
                                                        width: '100%',
                                                        borderRadius: '20px',
                                                        padding: '10px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center'
                                                    }}>

                                                        <p className='m-0'
                                                           style={{fontSize: '16px', textAlign: 'center'}}>ارتباط با
                                                            کارشناسان
                                                            ما</p>
                                                        <a href="tel:02184278"
                                                           style={{textAlign: 'center'}}>021-84279000</a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>









                                </div>


                            </div>
                        </div>

                        <div className='isMobile'>
                            {
                                showFilter &&
                                <HotelsSideBarSearch
                                    reset={() => {
                                        setOrder(0)
                                        setPage(1)
                                        setStayCount(null)
                                    }}
                                    setShowFilter={() => setShowFilter(false)}
                                    searchElement={searchElement}
                                />
                            }

                        </div>

                    </div>


                    <div style={{position: 'relative', zIndex: '999'}}>

                        <Footer/>
                    </div>

                </>

            }
            {/*.slice(4, props.Pathname.CityTour.length)*/}
            <PopUpWide
                opened={state.open} closePopUp={managePopUpCalendar}
            >

                {
                    datesList?.length === 0 ?
                        <div style={{
                            width: '910px',
                            height: '370px !important',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <NewLoader/>
                        </div>

                        : <div className={styles["flight-search-box-calendar-container"]}>
                            <CalendarComponent
                                setDate={(value) => {

                                }}
                                closePopUpCalendar={managePopUpCalendar}
                                dateandnight={datesList}
                                setFlightDate={(value) => {
                                    setFlightDate(value)
                                    router.push(props.tourName+`?org=${selectedOrigin.name+'-'+selectedOrigin.code}&night=${staycount}&date=${value.miladiDate}&page=${1}`)
                                    // setPage(1)

                                }

                                }
                            />
                        </div>
                }

            </PopUpWide>

        </>
    );
};


export const getCityInfo = async (city) => {
    const res = await fetch(`https://api.hamnavaz.com/api/v1/city/getCity/${city}`)
    const data = await res.json()
    return data
}

const getdest =async (cityname) => {

    let res = await fetch(`https://api.hotelobilit.com/api/v1/cities/${cityname}`,{
        headers: {
            "x-app-key":  '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
        }
    })

    let data =await res.json()


    return data
}


export async function getServerSideProps(context) {

    let city
    const placeId = context.params.CityTour.slice(4, context.params.CityTour.length);
    try {
        city=await getdest(placeId)
    } catch (error) {
        console.error('Error fetching city info:', error);
        return {
            notFound: true,
        };
    }

    // if (!cityInfo?.isDone) {
    //     return {
    //         notFound: true,
    //     };
    // }

    return {
        props: {
            cityInfo: city.data,
            placeId,
            tourName: context.query.CityTour
        },
    };
}

export default CityTour;

