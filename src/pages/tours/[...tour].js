import React, {useEffect, useRef, useState} from 'react';
// mui
import styles from '../../../styles/TourPackage/PackageTourDetails.module.scss'
import {moneyFormatrial} from "../../Utils/SimpleTasks";
import axios from 'axios';
import Link from 'next/link';
import NavHandler from '../../Components/share/NavHandler';
import Footer from '../../sources/component/Footer.component';
import Slider from '../../Components/slider/Slider';
import RequestTour from '../../Components/modal/RequestTour';
import PopUp from '../../sources/component/PopUp.component';
import {Loader} from '../../Utils/Loader';
import Head from 'next/head';
import Scrolltoprefresh from '../../sources/component/Scrolltoprefresh';
import globals from '../../sources/Global'
import {Err, NotifAlert} from "../../Components/NewTours/Components/NotifAlert.component";
import router, {useRouter} from "next/router";
import {
    chdAgeStr,
    getcurrencyfa, isEmpty,
    numberWithCommas,
} from "../../Utils/newTour";
import PopUpWide from "../../sources/component/PopUpWide.component";
import PackageReserve from "../../Components/modal/PackageReserve";

import dynamic from "next/dynamic";
import {Shimmers1, Shimmers3, Shimmers4} from "../../Components/NewTours/Components/subComponents/Shimmers";
import PopUp2 from "../../sources/component/PopUp2";
// import error from "@/pages/error";
import {useDispatch, useSelector} from "react-redux";
// import {fetchCity, fetchCityFailures, fetchCitySucces} from "@/Redux/citiesSuggest/Action";
import NotFound from "../NotFound";

const TransfersList = dynamic(() =>
        import("../../sources/component/TransfersList"),
    {
        ssr: false
    }
);
const MapComponent = dynamic(() =>
        import('../../sources/component/Map.component'),
    {
        ssr: false
    }
);


const tour = (props) => {

    const [selectedHotel, setSelectedHotel] = useState(null)
    const [selectedFlight, setSelectedFlight] = useState(null)
    const [infPrice, setInfPrice] = useState(null)
    const ref = useRef(null);
    const [isdownload, setIsDownload] = useState(false)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null)
    const [packages, setPackages] = useState([])
    const [show, setShow] = useState(false);
    const [flightList, setFlightList] = useState([])
    const [tourId, setTourId] = useState(null);
    // const [packageId, setPackageID] = useState('');
    const [showTransfers, setShowTransfers] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [isReserve, setIsReserve] = useState(false)
    const [filterStats,setFilterStats] = useState('2')
    const [packData, setPackData] = useState({
        number: '',
        count: '1',
        tourId: tourId,
    })
    const [messages, setMessages] = useState({
        isDone: false,
        message: ''
    })
    const getData = async (flightId = 0) => {
        setIsLoading(true)
        setData(null)

        axios.post(`${globals.tourPackagesnew}packages/${props.Pathname.tour[0]}`, {flight_id:flightId}, {
            headers: {
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
            }
        }).then((res) => {
            setIsLoading(false)

            setData(res.data.data)
            setPackages(res.data?.data?.packages)
            setSelectedFlight(res.data.data?.selected_flight)
            let foundFlight = res.data.data?.flights.filter(flight => flight.id === res.data.data?.selected_flight);

            setFlightId({
                depratureId: foundFlight[0].departure_flight.id,
                returnId: foundFlight[0].return_flight.id,
            })
            setFlightList(res.data.data?.flights)


        }).catch((err) => {
            setIsLoading(false)
        })


    }


    useEffect(() => {
        getData();
    }, [props.Pathname.tour])


    const dispatch = useDispatch()


    const downloadHandler = async () => {
        setIsDownload(true)
        axios.post(`${globals.tourPackagesnew}packages/${props.Pathname.tour[0]}`, {
                flight_id: selectedFlight,
                pdf: true
            },
            {
                headers: {
                    "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05'
                }
            }

        ).then(res => {


            setIsDownload(false)
            handleDownload(res.data.data.url)


        }).catch((err) => {
            debugger
            setIsDownload(false)
            Err('مشکلی در دانلود pdf بوجود آمده')
        })

    }

    function handleDownload(pdfLink) {

        // window.open(pdfLink, '_blank');

        const url = window.URL.createObjectURL(new Blob([pdfLink], {type: 'application/pdf'}));
        const link = document.createElement('a');
        link.href = pdfLink;
        link.setAttribute('download', 'downloaded-file.pdf'); // Set the desired filename
        link.download = 'tours.pdf'
        // link.target = '_blank'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    const [flightId, setFlightId] = useState({
        depratureId: null,
        returnId: null
    })


    const roomFinder1 = (rooms, roomTypeID) => {

        return rooms?.filter(room => room?.room_type_id === roomTypeID)
    }


    const getroomsTitle = (rooms) => {


        return rooms?.filter(room => room.pin === 0)
    }


    const hotelSearch = (searchTerm) => {
        let filteredHotel = data?.packages.filter(pack => pack.hotel_name.includes(searchTerm) || pack.hotel_nameEn.toUpperCase().includes(searchTerm.toUpperCase()))
        setPackages(filteredHotel)

    }

    const sortByStars = (hotellist) => {
        let filteredHotel = []
        if(filterStats==='0'){
            // for (let i = 1; i < 7; i++) {
                let filterdHotelBystar = hotellist.sort((a,b)=>(+a.hotel_stars)-(+b.hotel_stars))
                filteredHotel.push(...filterdHotelBystar)
            // }
        }else if(filterStats==='1'){
            // for (let i = 1; i < 7; i++) {
            //     let filterdHotelBystar = hotellist.filter(hotel => +hotel.hotel_stars === i)
                filteredHotel.push(...hotellist.sort((a, b) => roomFinder1(a.rooms, 148)[0]?.price - roomFinder1(b.rooms, 148)[0]?.price))
            // }
        }else{
            for (let i = 1; i < 7; i++) {
                let filterdHotelBystar = hotellist.filter(hotel => +hotel.hotel_stars === i)
                filteredHotel.push(...filterdHotelBystar.sort((a, b) => roomFinder1(a.rooms, 148)[0]?.price - roomFinder1(b.rooms, 148)[0]?.price))
            }
        }

        return filteredHotel
    }



    return (
        <div>
            {/*{*/}
            {/*    open &&*/}
            {/*    <NotifAlert/>*/}
            {/*}*/}
            <NotifAlert/>
            <NavHandler mobileFixed={true}/>
            <Head>
                <title> {data && `${data.title} | `} بلیطجا</title>
            </Head>
            <div ref={ref}></div>
            <div className={styles['tours']}>
                {/* section 1 */}

                <div className='padd' style={{padding: '0 2rem'}}>
                    <section className=" mt-2-mobi pt-3-mobi pt-5 " style={{marginTop: '4rem'}}>
                        <Scrolltoprefresh/>
                        <div className="container mt-2 ">
                            {(isEmpty(data) && isLoading) ?
                                <>
                                    <Shimmers1/>
                                </>: (isEmpty(data) && !isLoading) ?
                                    null:
                                    <div
                                        className="detail-tour col-xl-12 col-lg-12 col-12 d-flex flex-wrap justify-content-between border-bottom py-1">



                                        <>
                                            <TransfersList setShowTransfers={(val) => {
                                                setShowTransfers(val)

                                            }}
                                                           hotelInfo={data}
                                                           isLoading={isLoading}
                                                           index={flightList.findIndex((transfer) => selectedFlight === transfer.id)}
                                                           transfers={flightList && flightList}
                                                           showTransfers={showTransfers}
                                                           setFlightId={(val) => setFlightId(val)} setInfPrice={(val) => {
                                                setInfPrice(val)

                                            }} setSelectedFlight={(val) => getData(val)}
                                                           selectedFlight={selectedFlight}/>

                                        </>



                                    </div>}
                        </div>
                    </section>


                    <section className="mt-4">

                        {(isEmpty(data) && isLoading) ?
                            <>

                                <div className='container'>
                                    <div className='padd'>
                                        <Shimmers3/>
                                        <Shimmers3/>
                                        <Shimmers3/>
                                        <Shimmers3/>
                                        <Shimmers3/>
                                        <Shimmers3/>
                                    </div>


                                </div>
                            </> : (isEmpty(data) && !isLoading) ?

                                <>
                                    <NotFound title={'متاسفانه توری یافت نشد'}/>
                                    {/*<img src="../../../Images/hamnavaz-logo.webp" alt=""/>*/}
                                    {/*<p style={{textAlign:'center',fontSize:'2rem',color:'red'}}>متاسفانه توری یافت نشد</p>*/}
                                </>
                                :

                                <div className="container">
                                    <div className={styles['p-data']}>


                                        {data ?
                                            <div className={styles['pdfbtntitle']}>
                                                <div className="d-flex justify-content-between ps-2 ms-2 w-100">
                                                    <div className="d-flex align-items-center text-4b ps-2 pb-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                             viewBox="0 0 17.401 17.401">
                                                            <g id="Document_Align_Center_1"
                                                               data-name="Document Align Center 1"
                                                               transform="translate(1 1)">
                                                                <path id="Path_895" data-name="Path 895"
                                                                      d="M1,8.7a19.485,19.485,0,0,0,.323,4.079A4.335,4.335,0,0,0,2.4,15a4.336,4.336,0,0,0,2.22,1.078A19.488,19.488,0,0,0,8.7,16.4a19.488,19.488,0,0,0,4.079-.323A4.335,4.335,0,0,0,15,15a4.335,4.335,0,0,0,1.078-2.22A19.488,19.488,0,0,0,16.4,8.7a19.488,19.488,0,0,0-.323-4.079A4.336,4.336,0,0,0,15,2.4a4.335,4.335,0,0,0-2.22-1.078A19.485,19.485,0,0,0,8.7,1a19.485,19.485,0,0,0-4.079.323A4.335,4.335,0,0,0,2.4,2.4a4.335,4.335,0,0,0-1.078,2.22A19.485,19.485,0,0,0,1,8.7Z"
                                                                      transform="translate(-1 -1)" fill="none"
                                                                      stroke="#646564"
                                                                      strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth="2"/>
                                                                <path id="Path_896" data-name="Path 896" d="M10,7h2.8"
                                                                      transform="translate(-3.699 -2.8)" fill="none"
                                                                      stroke="#646564" strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="2"/>
                                                                <path id="Path_897" data-name="Path 897" d="M7,12h7"
                                                                      transform="translate(-2.8 -4.299)" fill="none"
                                                                      stroke="#646564" strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="2"/>
                                                                <path id="Path_898" data-name="Path 898" d="M10,17h2.8"
                                                                      transform="translate(-3.699 -5.799)" fill="none"
                                                                      stroke="#646564" strokeLinecap="round"
                                                                      strokeLinejoin="round" strokeWidth="2"/>
                                                            </g>
                                                        </svg>

                                                        <h5 className="font-bold mb-0 mx-2">{`هتل های ${data && data.title}`}</h5>
                                                    </div>

                                                    <div style={{
                                                        display: 'flex',
                                                        columnGap: '10px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <div className={'isDesktop'}>
                                                            <div style={{
                                                                border: "1px solid #cecece",
                                                                borderRadius: '10px',
                                                                height: '50px',
                                                                width: "220px",
                                                                padding: '2px',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}>
                                                                
                                                                <input placeholder='جستجو براساس نام هتل'
                                                                       style={{
                                                                           width: '100%'
                                                                           // , height: '100%'
                                                                           , border: 'none'
                                                                           , outline: 'none',
                                                                           fontSize: '13px',
                                                                       }}
                                                                       onChange={(e) => hotelSearch(e.target.value)}/>

                                                                <svg width="25px" height="25px" viewBox="0 0 24 24"
                                                                     fill="none"
                                                                     xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                                                        stroke="#cecece" stroke-width="2"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"/>
                                                                </svg>
                                                            </div>

                                                        </div>
                                                        <div
                                                            className="c-input col-xl-3 col-lg-3 col-sm-3 col-12 position-relative "
                                                            style={{
                                                                width: '180px',
                                                                height: "50px",
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                border: '1px solid #cecece',
                                                                borderRadius: '10px'
                                                            }}>
                                                            <select name="" style={{
                                                                outline: 'none',
                                                                border: 'none',
                                                                width: '90%'
                                                            }} id=""
                                                                    onChange={(e) => setFilterStats(e.target.value)}
                                                                    value={filterStats}
                                                                    >
                                                                <option value="" disabled={true}>فیلتر براساس....
                                                                </option>
                                                                <option value="0">ستاره</option>
                                                                <option value="1"> قیمت</option>
                                                                <option value="2"> هردو</option>
                                                            </select>
                                                        </div>


                                                        <div>

                                                            <button id="openWindowButton" className='pdfbtn'
                                                                    onClick={() => {
                                                                        if (isdownload === false) {

                                                                            downloadHandler()

                                                                            // console.log(`The user is browsing with ${browserName} version ${browserVersion}`)
                                                                        } else {
                                                                            return null
                                                                        }
                                                                    }}>

                                                                <>
                                                                    {isdownload === false ?
                                                                        <>
                                                                            <svg height="24" viewBox="0 0 24 24"
                                                                                 width="24"
                                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                                 fill='#fff'>
                                                                                <path
                                                                                    d="M18,19 L18,17 C19.6568542,17 21,15.6568542 21,14 C21,12.3431458 19.6568542,11 18,11 C17.9686786,11.0001061 17.9686786,11.0001061 17.9374883,11.0006341 L17.0737589,11.0181765 L16.9309417,10.1661557 C16.5303438,7.77626335 14.4511274,6 12,6 C10.1923998,6 8.55429829,6.96642863 7.6664163,8.50398349 L7.39066076,8.98151234 L6.83965518,9.0031404 C4.69934052,9.08715198 3,10.8504451 3,13 C3,14.8638394 4.27477279,16.4299397 6,16.8739825 L6,18.9170416 C3.16228666,18.4409635 1,15.9729963 1,13 C1,9.95876977 3.26703071,7.43346119 6.21989093,7.05027488 C7.50901474,5.16507238 9.65343535,4 12,4 C15.1586186,4 17.8750012,6.1056212 18.7254431,9.0522437 C21.1430685,9.40362782 23,11.4849591 23,14 C23,16.7614237 20.7614237,19 18,19 Z M11,18.2532546 L11,12 L13,12 L13,18.2532546 L15.2928932,16.0092816 L16.7071068,17.3933221 L12,22 L7.29289322,17.3933221 L8.70710678,16.0092816 L11,18.2532546 Z"
                                                                                    fill-rule="evenodd"/>
                                                                            </svg>
                                                                            دانلود فایل PDF
                                                                        </> :
                                                                        <div
                                                                            className='w-100 text-center d-flex justify-content-center align-items-center'>
                                                                            لطفا صبر کنید...
                                                                        </div>
                                                                    }
                                                                </>


                                                            </button>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>


                                            : <Shimmers4/>}

                                        <div className={'isMobile'}>
                                            <div style={{
                                                border: "1px solid #cecece",
                                                borderRadius: '10px',
                                                height: '50px',
                                                width: "100%",
                                                padding: '2px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <input placeholder='جستجو براساس نام هتل'
                                                       style={{
                                                           width: '100%'
                                                           // , height: '100%'
                                                           , border: 'none'
                                                           , outline: 'none',
                                                           fontSize: '13px',
                                                       }}
                                                       onChange={(e) => hotelSearch(e.target.value)}/>

                                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                                        stroke="#cecece" stroke-width="2" stroke-linecap="round"
                                                        stroke-linejoin="round"/>
                                                </svg>
                                            </div>

                                        </div>

                                        <div>
                                            <div
                                                className="p-info__tour col-xl-12 col-lg-12 col-12 mt-2 border-bottom pb-4 ">


                                                {packages.length > 0 ? sortByStars(packages)?.map((pack) => (
                                                        <div className={styles['hotel-item']} key={pack.id}>
                                                            <div
                                                                className="d-detail position-relative col-xl-12 col-lg-12 col-12  bg-white py-2 ">
                                                                <div className="ms-2">

                                                                    <div
                                                                        className="info-detail pos-relative d-flex align-items-center w-100"

                                                                    >
                                                                        <div className="image w-100 px-2">

                                                                            {data ?

                                                                                <div className={styles['hotelDet']}>


                                                                                    <div>
                                                                                        <div className={styles['img-con']}>
                                                                                            {pack?.offered && <div
                                                                                                className={styles['offered']}>
                                                                                                <p>
                                                                                                    نرخ
                                                                                                    ویژه
                                                                                                </p>
                                                                                            </div>}
                                                                                            {pack?.thumbnail !== null ?
                                                                                                <img
                                                                                                    src={pack?.thumbnail?.url}
                                                                                                    alt="" style={{
                                                                                                    position: 'relative',
                                                                                                    overflow: 'hidden'
                                                                                                }}
                                                                                                /> :

                                                                                                <img
                                                                                                    src='../../../Images/noPicture.png'
                                                                                                    alt="" style={{
                                                                                                    position: 'relative',
                                                                                                    overflow: 'hidden'
                                                                                                }}
                                                                                                    width={'290px'}
                                                                                                    height={'180px'}
                                                                                                />
                                                                                            }


                                                                                        </div>

                                                                                    </div>

                                                                                    <div>

                                                                                        <div style={{
                                                                                            display: 'flex',
                                                                                            justifyContent: 'space-between'
                                                                                        }}>
                                                                                            <div
                                                                                                className={styles['names']}>
                                                                                                <div>
                                                                                                    <div className="star"
                                                                                                         style={{
                                                                                                             display: 'flex',
                                                                                                             marginBottom: '5px'
                                                                                                         }}>
                                                                                                        <div
                                                                                                            className="d-flex align-items-center">
                                                                                                            <div
                                                                                                                className="image d-flex align-items-center">
                                                                                                                {(() => {
                                                                                                                    let stars = [];
                                                                                                                    for (let i = 1; i <= parseInt(pack.hotel_stars); i++) {
                                                                                                                        stars.push(
                                                                                                                            // <svg className="mx-1"
                                                                                                                            //      key={i}
                                                                                                                            //      xmlns="http://www.w3.org/2000/svg"
                                                                                                                            //      width="15"
                                                                                                                            //      height="15"
                                                                                                                            //      viewBox="0 0 21.443 21.387">
                                                                                                                            //     <path id="Star"
                                                                                                                            //           d="M10.749,1c.915,0,2.352,4.154,2.871,5.751a.916.916,0,0,0,.84.632c1.666.057,5.983.3,5.983,1.273s-3.077,3.38-4.335,4.328A.915.915,0,0,0,15.789,14c.512,1.585,1.742,5.7.952,6.343s-4.1-1.885-5.447-2.963a.919.919,0,0,0-1.147,0c-1.35,1.078-4.669,3.6-5.392,2.964s.431-4.772.912-6.351a.914.914,0,0,0-.324-1C4.093,12.047,1,9.619,1,8.655S5.326,7.438,6.988,7.382a.916.916,0,0,0,.838-.625C8.357,5.165,9.833,1,10.749,1Z"
                                                                                                                            //           fill="#f7db06"
                                                                                                                            //           stroke="#f7db06"
                                                                                                                            //           strokeLinecap="round"
                                                                                                                            //           strokeLinejoin="round"
                                                                                                                            //           strokeWidth={2}/>
                                                                                                                            // </svg>

                                                                                                                            <svg
                                                                                                                                width="20px"
                                                                                                                                height="20px"
                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                fill="#F8CF15"
                                                                                                                                xmlns="http://www.w3.org/2000/svg">
                                                                                                                                <path
                                                                                                                                    d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                                                                                                                                    stroke="#F8CF15"
                                                                                                                                    strokeWidth="1"
                                                                                                                                    strokeLinecap="round"
                                                                                                                                    strokeLinejoin="round"/>
                                                                                                                            </svg>
                                                                                                                        );
                                                                                                                    }
                                                                                                                    return stars;
                                                                                                                })()}

                                                                                                                <div style={{marginRight:'10px',padding:'3px',backgroundColor:'#137cb6',borderRadius:'10px',width:'60px',height:'20px',color:'white',display:'flex',justifyContent:'center',fontSize:'13px'}}>
                                                                                                                    {pack.board_type}

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>


                                                                                                </div>
                                                                                                {/*<Link href={`/hotels/dshgfj`}>*/}

                                                                                                <div style={{
                                                                                                    display: 'flex',
                                                                                                    flexDirection: 'column'
                                                                                                }}>
                                                                                                    <a href={`/hotels/${pack.hotel_slug}`}
                                                                                                       style={{
                                                                                                           color: "#000",
                                                                                                           fontWeight: '900'
                                                                                                       }}>{pack.hotel_nameEn}</a>
                                                                                                    <a href={`/hotels/${pack.hotel_slug}`}
                                                                                                       style={{color: "rgb(101,101,101)"}}>{pack.hotel_name}</a>
                                                                                                </div>

                                                                                                {/*</Link>*/}
                                                                                                <div>
                                                                                                    <div
                                                                                                        className="d-flex align-items-center mt-1">
                                                                                                        <svg
                                                                                                            className="ms-1"
                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                            width="15"
                                                                                                            height="15"
                                                                                                            viewBox="0 0 23.528 26.039">
                                                                                                            <g id="Location"
                                                                                                               transform="translate(0.028)">
                                                                                                                <path
                                                                                                                    id="Path_1011"
                                                                                                                    data-name="Path 1011"
                                                                                                                    d="M1.152,12.976a14.6,14.6,0,0,0,4.131,7.545,25.71,25.71,0,0,0,5.471,4.223,1.912,1.912,0,0,0,1.962,0,25.71,25.71,0,0,0,5.471-4.223,14.6,14.6,0,0,0,4.131-7.545,10.842,10.842,0,0,0-1.656-7.829C19.058,2.823,16.236,1,11.736,1S4.413,2.823,2.809,5.147A10.842,10.842,0,0,0,1.152,12.976Z"
                                                                                                                    transform="translate(0 0)"
                                                                                                                    fill="none"
                                                                                                                    stroke="#000"
                                                                                                                    strokeLinecap="round"
                                                                                                                    strokeLinejoin="round"
                                                                                                                    strokeWidth={2}>
                                                                                                                </path>
                                                                                                                <circle
                                                                                                                    id="Ellipse_49"
                                                                                                                    data-name="Ellipse 49"
                                                                                                                    cx="2.928"
                                                                                                                    cy="2.928"
                                                                                                                    r="2.928"
                                                                                                                    transform="translate(14.663 12.712) rotate(180)"
                                                                                                                    fill="none"
                                                                                                                    stroke="#000"
                                                                                                                    strokeWidth={2}>
                                                                                                                </circle>
                                                                                                            </g>
                                                                                                        </svg>
                                                                                                        <span
                                                                                                            className="font-bold font-size-12">{pack.location}</span>
                                                                                                    </div>
                                                                                                </div>


                                                                                            </div>
                                                                                            <div className='isDesktop'>
                                                                                                <div
                                                                                                    className={styles['btn-con']}>
                                                                                                    <button className=""
                                                                                                            onClick={() => {
                                                                                                                setShow(true);
                                                                                                                // posthog.capture("TourPackageHotelSelect")
                                                                                                                // setPackData({tourId: pack.id});
                                                                                                                setSelectedHotel(pack)

                                                                                                            }}>
                                                                                                        اتاق های دیگر
                                                                                                    </button>

                                                                                                    <button className=""
                                                                                                            style={{fontWeight: '700'}}
                                                                                                            onClick={() => {
                                                                                                                setIsReserve(true)
                                                                                                                setSelectedHotel(pack)
                                                                                                            }}>

                                                                                                        رزرو
                                                                                                    </button>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>

                                                                                        <div className={styles['roomsDet']}>

                                                                                            <div>
                                                                                                {
                                                                                                    <div
                                                                                                        className={styles['rooms-title']}>
                                                                                                        <div
                                                                                                            className={styles['room-prc']}>

                                                                                                            <div
                                                                                                                className={styles['room-title']}>
                                                                                            <span
                                                                                                className={styles['']}>دو تخته (هرنفر)</span>


                                                                                                            </div>
                                                                                                            <div
                                                                                                                className={styles['room']}>
                                                                                                                <div
                                                                                                                    className=" d-flex align-items-start ">
                                                                                                                    <div
                                                                                                                        className=" w-100">


                                                                                                                        {
                                                                                                                            // getHotelRooms(pack)
                                                                                                                            roomFinder1(pack.rooms, 148)[0]?.price ?
                                                                                                                                <>
                                                                                                                                    <p
                                                                                                                                        className="font-size-16 font-bold  m-0 price-color"
                                                                                                                                        style={{fontWeight: 'bold'}}>{moneyFormatrial(roomFinder1(pack.rooms, 148)[0]?.price)}

                                                                                                                                        <span
                                                                                                                                            className="font-size-14 font-bold px-1  m-0 color-gray">تومان
                                                                                                                    </span>
                                                                                                                                    </p>

                                                                                                                                    {/*<p className="px-2 font-size-13 m-0 text-center font-blue text-center"> {getcurrencyfa(currency) } </p>*/}
                                                                                                                                </> :
                                                                                                                                <span
                                                                                                                                    className="font-bold font-size-13 font-bold color-gray"> عدم موجودی</span>

                                                                                                                        }


                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <div
                                                                                                            className={styles['room-prc']}>

                                                                                                            <div
                                                                                                                className={styles['room-title']}>
                                                                                    <span
                                                                                        className={styles['']}>سینگل</span>
                                                                                                            </div>
                                                                                                            <div
                                                                                                                className={styles['room']}>
                                                                                                                <div
                                                                                                                    className=" position-relative d-flex align-items-start ">
                                                                                                                    <div
                                                                                                                        className=" w-100 ">

                                                                                                                        <>
                                                                                                                            {roomFinder1(pack.rooms, 494)[0]?.price ? <>

                                                                                                                                    <p
                                                                                                                                        className="font-size-16 font-bold  m-0 mx-1 price-color"
                                                                                                                                        style={{fontWeight: 'bold'}}>{moneyFormatrial(roomFinder1(pack.rooms, 494)[0].price)}


                                                                                                                                        <span
                                                                                                                                            className="font-size-14 font-bold px-1  m-0 color-gray">
                                                                                                                                تومان
                                                                                                                            </span>
                                                                                                                                    </p>
                                                                                                                                    {/*<p className="px-2 font-size-13 m-0 text-center font-blue"> {getcurrencyfa(currency) } </p>*/}

                                                                                                                                </> :

                                                                                                                                <span
                                                                                                                                    className="font-bold font-size-13 font-bold color-gray">عدم موجودی</span>
                                                                                                                            }


                                                                                                                        </>


                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <div
                                                                                                            className={styles['room-prc']}>
                                                                                                            <div
                                                                                                                className={styles['room-title']}>

                                                                                                            <span
                                                                                                                className={styles['']}> کودک با تخت </span>
                                                                                                                {pack?.with_bed_child_ages.length > 0 &&
                                                                                                                    <small
                                                                                                                        style={{marginRight: '3px'}}>({chdAgeStr(pack?.with_bed_child_ages[0], pack?.with_bed_child_ages[1])})</small>}

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className={styles['room']}>
                                                                                                                <div
                                                                                                                    className=" position-relative ">
                                                                                                                    <div
                                                                                                                        className=" w-100 ">
                                                                                                                        {
                                                                                                                            <>
                                                                                                                                <p className="font-size-16 font-bold  m-0 price-color"
                                                                                                                                   style={{fontWeight: 'bold'}}>{moneyFormatrial(roomFinder1(pack.rooms, 148)[0]?.chd_w_price)}
                                                                                                                                    <span
                                                                                                                                        className="font-size-14 font-bold  m-0 color-gray px-1">
                                {getcurrencyfa(data?.currencies)}
                            </span>
                                                                                                                                </p>
                                                                                                                            </>

                                                                                                                        }


                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        </div>

                                                                                                        <div
                                                                                                            className={styles['room-prc']}>
                                                                                                            <div
                                                                                                                className={styles['room-title']}>
                                                                                                <span
                                                                                                    className={styles['']}>کودک بدون تخت</span>

                                                                                                                {pack?.no_bed_child_ages?.length > 0 &&
                                                                                                                    <small
                                                                                                                        style={{marginRight: '3px'}}>({chdAgeStr(pack?.no_bed_child_ages[0], pack?.no_bed_child_ages[1])})</small>
                                                                                                                }

                                                                                                            </div>
                                                                                                            <div
                                                                                                                className={styles['room']}>
                                                                                                                <div
                                                                                                                    className=" d-flex align-items-start ">
                                                                                                                    <div
                                                                                                                        className=" w-100 ">
                                                                                                                        <>
                                                                                                                            {data.is_bundle ?
                                                                                                                                <>
                                                                                                                                    {
                                                                                                                                        <>{roomFinder1(pack.rooms, 148)[0]?.chd_n_price ?

                                                                                                                                            <p className="font-size-16 m-0 price-color"
                                                                                                                                               style={{fontWeight: 'bold'}}>{moneyFormatrial(roomFinder1(pack.rooms, 148)[0]?.chd_n_price)}

                                                                                                                                                <span
                                                                                                                                                    className="font-size-14 font-bold  m-0 color-gray px-1">
                                                                                                                                            تومان
                            </span>
                                                                                                                                            </p> :
                                                                                                                                            <span
                                                                                                                                                className="font-bold font-size-13 font-bold color-gray"> عدم موجودی</span>
                                                                                                                                        }
                                                                                                                                            {/*<p className="px-2 font-size-13 m-0 text-center font-blue">{getcurrencyfa(currency) }</p>*/}

                                                                                                                                        </>
                                                                                                                                    }

                                                                                                                                </> : <>

                                                                                                                                    {
                                                                                                                                        (roomFinder1(pack.rooms, 148)[0]?.chd_n_price) ? <>

                                                                                                                                                <p className="font-size-16 m-0 price-color"
                                                                                                                                                   style={{fontWeight: 'bold'}}>{moneyFormatrial(roomFinder1(pack.rooms, 148)[0]?.chd_n_price)}

                                                                                                                                                    <span
                                                                                                                                                        className="font-size-14 font-bold  m-0 color-gray px-1">
                                تومان
                            </span>
                                                                                                                                                </p>
                                                                                                                                                {/*<p className="px-2 font-size-13 m-0 text-center font-blue">{getcurrencyfa(currency) }</p>*/}
                                                                                                                                            </> :
                                                                                                                                            <span
                                                                                                                                                className="font-bold font-size-13 font-bold color-gray"> عدم موجودی</span>
                                                                                                                                    }


                                                                                                                                </>}

                                                                                                                        </>


                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                        </div>

                                                                                                    </div>}

                                                                                                <div className='isMobile'>
                                                                                                    <div
                                                                                                        className={styles['btn-con']}>
                                                                                                        <button className=""
                                                                                                                onClick={() => {
                                                                                                                    setShow(true);
                                                                                                                    setSelectedHotel(pack)
                                                                                                                }}>
                                                                                                            اتاق های بیشتر
                                                                                                        </button>

                                                                                                        <button className=""
                                                                                                                style={{fontWeight: '700'}}

                                                                                                                onClick={() => {
                                                                                                                    setIsReserve(true)
                                                                                                                    setSelectedHotel(pack)
                                                                                                                }}>

                                                                                                            رزرو
                                                                                                        </button>
                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>



                                                                                            <div
                                                                                                className={styles['rooms-title']}>
                                                                                                {getroomsTitle(pack.rooms).map(t => (
                                                                                                    <div
                                                                                                        className={styles['room-prc']}>

                                                                                                        <div
                                                                                                            className={styles['room-title']}>
                                                                                                <span
                                                                                                    className={styles['']}>{t.name}</span>


                                                                                                        </div>
                                                                                                        <div
                                                                                                            className={styles['room']}>
                                                                                                            <div
                                                                                                                className=" d-flex align-items-start ">
                                                                                                                <div
                                                                                                                    className=" w-100 py-3">


                                                                                                                    {
                                                                                                                        // getHotelRooms(pack)
                                                                                                                        t.price ?
                                                                                                                            <>
                                                                                                                                <p
                                                                                                                                    className="font-size-16 font-bold  m-0 price-color"
                                                                                                                                    style={{fontWeight: 'bold'}}>{t?.price}

                                                                                                                                    <span
                                                                                                                                        className="font-size-14 font-bold px-1  m-0 color-gray">
                                                                                                                   تومان
                                                                                                                </span>
                                                                                                                                </p>

                                                                                                                                {/*<p className="px-2 font-size-13 m-0 text-center font-blue text-center"> {getcurrencyfa(currency) } </p>*/}
                                                                                                                            </> :
                                                                                                                            <span
                                                                                                                                className="font-bold font-size-13 font-bold color-gray"> عدم موجودی</span>

                                                                                                                    }


                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                ))}




                                                                                            </div>

                                                                                        </div>
                                                                                        {/*<div className={styles['moreinfocon']} style={{display:'flex',columnGap:'20px',justifyContent:'center',alignItems:'end',marginTop:'10px'}}>*/}
                                                                                        {/*    <div className={styles['info']} onClick={()=> {*/}
                                                                                        {/*        setMoreInfoTab('amenities')*/}
                                                                                        {/*        setHotelId(pack.hotel_id)*/}
                                                                                        {/*    }}>*/}
                                                                                        {/*        <p>امکانات</p>*/}
                                                                                        {/*    </div>*/}
                                                                                        {/*    <div className={styles['info']}  onClick={()=> {*/}
                                                                                        {/*        setMoreInfoTab('map')*/}
                                                                                        {/*        setHotelId(pack.hotel_id)*/}
                                                                                        {/*    }}>*/}
                                                                                        {/*        <p>نقشه</p>*/}
                                                                                        {/*    </div>*/}
                                                                                        {/*    <div className={styles['info']}  onClick={()=> {*/}
                                                                                        {/*        setMoreInfoTab('services')*/}
                                                                                        {/*        setHotelId(pack.hotel_id)*/}
                                                                                        {/*    }}>*/}
                                                                                        {/*        <p>خدمات</p>*/}
                                                                                        {/*    </div>*/}
                                                                                        {/*</div>*/}
                                                                                    </div>


                                                                                    {/*<div className='isDesktop'>*/}
                                                                                    {/*    <div className="star" style={{display:'flex',justifyContent:"center",  paddingTop:'40px'}}>*/}
                                                                                    {/*        <div className="d-flex align-items-center">*/}
                                                                                    {/*            <div*/}
                                                                                    {/*                className="image d-flex align-items-center">*/}
                                                                                    {/*                {(() => {*/}
                                                                                    {/*                    let stars = [];*/}
                                                                                    {/*                    for (let i = 1; i <= parseInt(pack.hotel_stars); i++) {*/}
                                                                                    {/*                        stars.push(*/}
                                                                                    {/*                            <svg className="mx-1"*/}
                                                                                    {/*                                 key={i}*/}
                                                                                    {/*                                 xmlns="http://www.w3.org/2000/svg"*/}
                                                                                    {/*                                 width="20"*/}
                                                                                    {/*                                 height="20"*/}
                                                                                    {/*                                 viewBox="0 0 21.443 21.387">*/}
                                                                                    {/*                                <path id="Star"*/}
                                                                                    {/*                                      d="M10.749,1c.915,0,2.352,4.154,2.871,5.751a.916.916,0,0,0,.84.632c1.666.057,5.983.3,5.983,1.273s-3.077,3.38-4.335,4.328A.915.915,0,0,0,15.789,14c.512,1.585,1.742,5.7.952,6.343s-4.1-1.885-5.447-2.963a.919.919,0,0,0-1.147,0c-1.35,1.078-4.669,3.6-5.392,2.964s.431-4.772.912-6.351a.914.914,0,0,0-.324-1C4.093,12.047,1,9.619,1,8.655S5.326,7.438,6.988,7.382a.916.916,0,0,0,.838-.625C8.357,5.165,9.833,1,10.749,1Z"*/}
                                                                                    {/*                                      fill="#f7db06"*/}
                                                                                    {/*                                      stroke="#f7db06"*/}
                                                                                    {/*                                      strokeLinecap="round"*/}
                                                                                    {/*                                      strokeLinejoin="round"*/}
                                                                                    {/*                                      strokeWidth={2}/>*/}
                                                                                    {/*                            </svg>*/}
                                                                                    {/*                        );*/}
                                                                                    {/*                    }*/}
                                                                                    {/*                    return stars;*/}
                                                                                    {/*                })()}*/}
                                                                                    {/*            </div>*/}
                                                                                    {/*        </div>*/}
                                                                                    {/*    </div>*/}


                                                                                    {/*</div>*/}


                                                                                </div>

                                                                                : <Loader/>}


                                                                            {/*<div className='d-sm-flex justify-content-between'>*/}


                                                                            {/*    */}


                                                                            {/*</div>*/}


                                                                            {/*<div className="text-price d-lg-none d-sm-flex w-100  d-flex justify-content-between align-items-center">*/}
                                                                            {/*    <p className="title-price m-0" style={{fontSize:'12px'}}>شروع قیمت از :</p>*/}
                                                                            {/*    <div style={{width: '40%', borderBottom:'1px dashed black'}} ></div>*/}
                                                                            {/*    <p className="price-tour color-base-color m-0" style={{color:' #e20000',fontSize:'15px'}}>*/}
                                                                            {/*        {moneyFormat(pack.min_price)}*/}
                                                                            {/*        <small*/}
                                                                            {/*            // className="pe-1"*/}
                                                                            {/*        >تومان </small>*/}
                                                                            {/*    </p>*/}
                                                                            {/*</div>*/}

                                                                        </div>

                                                                        {/*<div className="image left-border-line">*/}
                                                                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width="1"*/}
                                                                        {/*         height="110"*/}
                                                                        {/*         viewBox="0 0 1 186.408">*/}
                                                                        {/*        <line id="Line_87" data-name="Line 87" y2="186.408"*/}
                                                                        {/*              transform="translate(0.5)" fill="none"*/}
                                                                        {/*              stroke="#333"*/}
                                                                        {/*              strokeWidth={1} strokeDasharray={10}/>*/}
                                                                        {/*    </svg>*/}
                                                                        {/*</div>*/}
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            {/*{hotelid === pack.hotel_id &&*/}
                                                            {/*    <div style={{borderTop: "1px solid #cecece", padding: '15px'}}>*/}

                                                            {/*        <>*/}
                                                            {/*            {*/}
                                                            {/*                moreInfoTab === 'amenities' && <div>1</div>*/}
                                                            {/*            } {*/}
                                                            {/*            moreInfoTab === 'map' &&*/}
                                                            {/*            <div style={{*/}
                                                            {/*                display: 'flex',*/}
                                                            {/*                justifyContent: 'space-between',*/}
                                                            {/*                padding: "0 1.125rem 10px 1.125rem"*/}
                                                            {/*            }}>*/}

                                                            {/*                <div>*/}

                                                            {/*                    address*/}

                                                            {/*                </div>*/}
                                                            {/*                <div style={{height: '300px', width: '700px'}}>*/}
                                                            {/*                    <MapComponent*/}
                                                            {/*                        coordinates={[35.718971, 51.435673]}/>*/}

                                                            {/*                </div>*/}

                                                            {/*            </div>*/}
                                                            {/*        }*/}
                                                            {/*            {*/}
                                                            {/*                moreInfoTab === 'services' && <div>3</div>*/}
                                                            {/*            }</>*/}


                                                            {/*    </div>}*/}

                                                        </div>
                                                    ))
                                                        .sort((a, b) => parseInt(a.star) - parseInt(b.star)).reverse()
                                                        .sort((a, b) => a.prices?.twinRate ? parseInt(a.prices.twinRate) : parseInt(a.prices?.twin) - b.prices?.twinRate ? parseInt(b.prices.twinRate) : parseInt(b.prices?.twin)).reverse()
                                                    :
                                                    // <Loader />
                                                    ''
                                                }


                                            </div>
                                            <div className={styles['tourdesc']}>
                                                <div className={styles['service_document']}>
                                                    {data.documents && <div className={styles['con']}>
                                                        <p>مدارک لازم</p>
                                                        <div className={styles['item']}>


                                                            <ul>
                                                                {data?.documents?.split('\n').map(item => (
                                                                    <li>{item}</li>
                                                                ))}
                                                            </ul>

                                                            <svg width="100px" height="100px" viewBox="0 0 24 24"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                                                    stroke="#cecece" strokeWidth="1.5"/>
                                                                <path d="M8 10H16" stroke="#cecece" strokeWidth="1.5"
                                                                      strokeLinecap="round"/>
                                                                <path d="M8 14H13" stroke="#cecece" strokeWidth="1.5"
                                                                      strokeLinecap="round"/>
                                                            </svg>
                                                        </div>
                                                    </div>}


                                                    {data?.service && <div className={styles['con']}>
                                                        <p>خدمات آژانس</p>
                                                        <div className={styles['item']}>

                                                            <ul>
                                                                {data?.service?.split('\n').map(item => (
                                                                    <li>{item}</li>
                                                                ))}
                                                            </ul>
                                                            <svg width="100px" height="100px" viewBox="0 0 24 24"
                                                                 fill="none"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H14.5C17.5376 13 20 15.4624 20 18.5V21M8 21V18M16 21V18M11 9H7.5C6.67157 9 6 8.32843 6 7.5V6.5C6 5.16725 6.57938 3.96983 7.5 3.14585M18 8.00001V6.50001C18 5.16726 17.4206 3.96983 16.5 3.14585M20 7.5V6M4 7.5V6M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                                                    stroke="#cecece" strokeLinecap="round"
                                                                    strokeLinejoin="round" strokeWidth="1.4"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                                {data?.description && <div className={styles['servicescon']}>
                                                    <p>توضیحات تکمیلی</p>
                                                    <div className={styles['item']}>
                                                        <ul>
                                                            {data?.description?.split('\n').map(item => (
                                                                <li>{item}</li>
                                                            ))}
                                                        </ul>

                                                        <div style={{alignSelf: 'end', justifySelf: 'end', height: 'auto'}}>

                                                            <svg fill="#cecece" width="100px" height="100px"
                                                                 viewBox="0 0 24 24"
                                                                 xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M15,16H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM9,10h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm6,2H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4.71,3.29a1,1,0,0,0-.33-.21.92.92,0,0,0-.76,0,1,1,0,0,0-.33.21,1.15,1.15,0,0,0-.21.33,1,1,0,0,0,.21,1.09A1,1,0,0,0,19,17a1,1,0,0,0,.38-.08,1.15,1.15,0,0,0,.33-.21,1,1,0,0,0,.21-1.09A1.15,1.15,0,0,0,19.71,15.29ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,13.05,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3h8a1,1,0,0,0,0-2H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3v2a1,1,0,0,0,2,0V9S20,9,20,8.94ZM15,8a1,1,0,0,1-1-1V5.41L16.59,8Zm4,10a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,19,18Z"/>
                                                            </svg>
                                                        </div>

                                                    </div>

                                                </div>}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                        }

                    </section>

                </div>

                {/* footer */}
            </div>
            {show &&
                <PopUpWide opened={show} closePopUp={setShow}>
                    <RequestTour setOpen={setOpen} messages={messages} setMessages={setMessages} setShow={setShow}
                                 packData={packData} setPackData={setPackData} datatitle={data && data}
                        // selectedHotelID={selectedHotelId}
                                 currency={data?.currencies}
                                 isBundle={data.is_bundle}
                                 flightId={selectedFlight}
                                 selectedHotel={selectedHotel}
                                 infPrc={infPrice}
                                 setShow={() => setShow(false)}


                    />
                </PopUpWide>
            }

            {
                isReserve &&
                <>

                    {!data.is_bundle ? <PopUp2 opened={isReserve} closePopUp={setIsReserve}>
                        <PackageReserve tourId={props.Pathname.tour[0]} isreserve={isReserve} isBundle={data.is_bundle}
                                        setOpen={setOpen} messages={messages} setMessages={setMessages}
                                        setShow={setShow}
                                        transfers={flightList && flightList}
                                        packData={packData} setPackData={setPackData} datatitle={data && data}
                                        setIsReserve={(val) => setIsReserve(val)}
                                        selectedHotel={selectedHotel}
                                        flightId={selectedFlight}
                                        flightIds={flightId}
                                        tourData={data}
                                        tranfers={data.tranfers}
                        />
                    </PopUp2> : <PopUp opened={isReserve} closePopUp={setIsReserve}>
                        <PackageReserve isreserve={isReserve} isBundle={data.is_bundle}
                                        setOpen={setOpen} messages={messages} setMessages={setMessages}
                                        setShow={setShow}
                                        transfers={flightList && flightList}
                                        packData={packData} setPackData={setPackData} datatitle={data && data}
                                        setIsReserve={(val) => setIsReserve(val)}
                                        selectedHotel={selectedHotel}
                                        flightId={selectedFlight}
                                        flightIds={flightId}
                                        tourData={data}

                        />
                    </PopUp>}
                </>


            }

            <Footer/>
        </div>

    );
};

tour.getInitialProps = ({query}) => {
    return {
        Pathname: query
    }
}

export default tour;
