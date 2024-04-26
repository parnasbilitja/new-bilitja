import axios from 'axios';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import moment from 'moment-jalaali'
import NavHandler from '../Components/share/NavHandler';
import Footer from '../sources/component/Footer.component';
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh';
import TourData from '../sources/tour/TourData';
import TourList from '../sources/tour/TourList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCity} from '../Redux/citiesSuggest/Action';
import Head from 'next/head';
import {tourName} from "../Utils/data";
import router from "next/router";
import TourSearchBox from "../Components/NewTours/Components/TourSearchBox";
// import OfferdTours from "../sources/tour/OfferdTours";
import {fetchOfferdTour} from "../Redux/OfferdTours/Action";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import NotFound from "./NotFound";
import {isEmpty, jalaliMonthName} from "@/Utils/newTour";

const OfferdTours = dynamic(() => import("../sources/tour/OfferdTours"));

const CityTour = (props) => {
    // console.log(props.Pathname.CityTour.slice(4,props.Pathname.CityTour.length));
    let city = useSelector(state => state.CityReducer)
    const dispatch = useDispatch()
    // const [currentCity, setCurrentCity] = useState(props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length))
    const [search, setSearch] = useState(false)
    const refreshData = (val) => {
        setCurrentCity(val.target.value)
    }
    const router=useRouter()

    // console.log('possr',props)
    // useEffect(()=>{
    //     if(!router.query.CityTour.includes('تور-')){
    //         router.push(`/تور-${router.query.CityTour}`)
    //     }
    //     console.log(router)
    // },[router])
    // useEffect(() => {
    //     // console.log(city);
    //     if (city?.data?.length < 1) {
    //         dispatch(fetchCity())
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     setCurrentCity(props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length))
    // }, [props.Pathname])




    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [newData, setNewData] = useState([])
    const [notfound, setNotFound] = useState(false)
    let getData = useSelector(state => state.DataReducer)





    // useEffect(() => {
    //     if(props.Pathname){
    //
    //     getData1(props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length))
    //     }else{
    //         return false
    //     }
    //
    // }, [props.Pathname])

    // useEffect(() => {
    //     if (getData?.data?.length < 1) {
    //         dispatch(fetchOfferdTour())
    //     }
    //     setData(getData)
    // }, [])

    // useEffect(() => {
    //     if (data.length < 1) {
    //         setData(getData.data)
    //     }
    // }, [getData])
    //
    // useEffect(() => {
    //     if (data) {
    //
    //         setNewData(data?.filter(city => city.endCity.name === props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length)))
    //     }
    // }, [data])
    const pageNavigate=(page)=>{
        router.push(props.tourName+`?page=${page}`)


    }

    // const [widthMobi, setWidthMobi] = useState(
    //     typeof window !== "undefined" && getWindowSize()
    // );
    //
    // function getWindowSize() {
    //     const {innerWidth} = window;
    //     return innerWidth;
    // }
    //
    // useEffect(() => {
    //     function handleWindowResize() {
    //         setWidthMobi(getWindowSize());
    //     }
    //
    //     window.addEventListener("resize", handleWindowResize);
    // }, []);

    const [isModal, setIsmodal] = useState(false)

    // useEffect(() => {
    //     const handleRouteChange = (url, { shallow }) => {
    //         if (url !== router.asPath) {
    //             // This will run when leaving the current page on back/forward actions
    //             // Add your logic here, like toggling the modal state
    //             router.back()
    //         }
    //     }
    //
    //     router.beforePopState(handleRouteChange)
    //
    //     // Cleanup function to remove the event listener when the component unmounts
    //     return () => {
    //         router.beforePopState(() => true)
    //     }
    // }, [router])

    const[code,setCode]=useState(null)
    return (
        <>

            {/*{(notfound === true) && <NotFound/>}*/}

            {
                // (data1 && notfound === false) &&
                <>
                    <Head>
                        <title>  لیست‌ تور‌های شهر {props.cityInfo.name} | آژانس مسافرتی بلبطجا
                        </title>
                        <meta name="description" content={`تور‌های ${props.cityInfo.name} ماه ${jalaliMonthName(moment().locale('fa').format('jMMMM')) } با ایرلاین‌های معتبر و هتل دلخواه شما. شروع قیمت‌ تور‌های ${props.cityInfo.name} از ${props.tourMinPrice+ ' ' + 'تومان'}. رزرو تور از سایت مسافرتی بلبطجا.`} />
                    </Head>
                    <NavHandler/>
                    <div style={{padding:'1.5rem 2rem'}} className=' margin-top margin-topsm-1rem d-lg-flex justify-lg-content-center '>
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
                                                          transform="translate(-4.468 -2.262)" fill="none" stroke="#053742"
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
                                <TourSearchBox/>
                            </div>
                            {isModal && <div className='modalContainer'>
                                <div className='modal12'>
                                    <div style={{display: 'flex', justifyContent: "flex-end", width: '100%'}}>
                                        <div className='close' onClick={() => setIsmodal(false)}>X</div>
                                    </div>
                                    <TourSearchBox/>
                                </div>

                            </div>}


                            <div className=" m-auto parent-info-city">
                                {/*<div className="search search-city-info w-100">*/}
                                {/*    <ul className="tab-ul-list">*/}
                                {/*        <li className="li-city"><a href="#about-tour" className="about-tab">تور ها</a></li>*/}
                                {/*        <li className="li-city"><a href="#blog" className="news-tab">اخبار گردشگری </a></li>*/}
                                {/*        <li className="li-city"><a href="#questions" className="question-tab">سوالات متداول</a></li>*/}
                                {/*        <li className="b-none"><a href="#tours" className="tour-tab">توضیحات*/}
                                {/*            تور</a></li>*/}
                                {/*        <li className="border-floating"></li>*/}
                                {/*    </ul>*/}
                                {/*    <div className="box-search justify-content-end px-sm-2 " >*/}
                                {/*        <div className="inp-form">*/}
                                {/*            <select name="" id="" onChange={(val)=> {*/}
                                {/*                refreshData(val)*/}
                                {/*            }} value={currentCity}>*/}
                                {/*                {!search && <option value="" selected> شهر خود را انتخاب کنید</option>}*/}

                                {/*                {city.data.map((item) => (*/}
                                {/*                    <option key={item.name} value={item.name}>{item.name}</option>*/}
                                {/*                ))}*/}
                                {/*            </select>*/}
                                {/*        </div>*/}
                                {/*        <Link href={`تور-${currentCity}/`}>*/}
                                {/*            <button className="btn-search btn-search-city" onClick={()=>setSearch(true)}>جستجو</button>*/}
                                {/*        </Link>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className='mx-3'>
                                    <button className='toursearch' onClick={() => setIsmodal(true)}>
                                        <svg width='25' height='25' id="Glyph" version="1.1" viewBox="0 0 32 32"
                                             xmlns="http://www.w3.org/2000/svg" fill='#e20000'>
                                            <path
                                                d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                                                id="XMLID_223_"/>
                                        </svg>

                                        تورِ تو آنلاین بگیر!
                                    </button>
                                    {/*{newData.length > 0 && <div className=''>*/}
                                    {/*    <OfferdTours data={newData}/>*/}
                                    {/*</div>}*/}
                                    <TourList citycode={props.cityInfo.nameEn} name={props.cityInfo.name} city={props.placeId} data={props.tour} func={(page)=>{pageNavigate(page)}}/>
                                    <TourData cityInfo={props} city={props.placeId}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='isDesktop'>
                            <div className='fixed-info'>
                                <div style={{ columnGap: '10px',padding:"0 15px"}}>
                                    {/*<div className='svganim'>*/}
                                    {/*    <svg xmlns="http://www.w3.org/2000/svg" width="20.457" height="20.474"*/}
                                    {/*         viewBox="0 0 20.457 20.474">*/}
                                    {/*        <path id="_003-telephone" data-name="003-telephone"*/}
                                    {/*              d="M13.437,20.475C5.234,20.413-4.377,8.46,2.646,1.432c.25-.254.514-.5.785-.725A2.981,2.981,0,0,1,7.46.878l.01.01L8.823,2.294A2.933,2.933,0,0,1,7.86,7.057a6.457,6.457,0,0,0-1.068.527c-.745.759-1.219,1.992,1.567,4.783.9.906,2.243,2.11,3.429,2.11a1.893,1.893,0,0,0,1.349-.622,6.213,6.213,0,0,0,.494-1.023A2.927,2.927,0,0,1,18.4,11.85l1.389,1.345.01.01a2.987,2.987,0,0,1,.179,4.023c-.212.254-.439.5-.674.738A8.113,8.113,0,0,1,13.437,20.475ZM5.356,1.6a1.392,1.392,0,0,0-.9.33c-.232.2-.459.4-.673.622C.042,6.356,2.1,11.55,5.7,15.106c3.564,3.547,8.732,5.486,12.471,1.73.2-.2.4-.415.577-.632a1.381,1.381,0,0,0-.078-1.864l-1.389-1.344-.01-.01a1.317,1.317,0,0,0-2.155.443,6.163,6.163,0,0,1-.823,1.534,3.472,3.472,0,0,1-2.5,1.115c-1.76,0-3.362-1.378-4.561-2.579-1.819-1.745-3.921-4.72-1.547-7.063a6.35,6.35,0,0,1,1.576-.858,1.323,1.323,0,0,0,.43-2.158l-.01-.01L6.324,2a1.37,1.37,0,0,0-.968-.4ZM19.87,9.56a.8.8,0,0,1-.8-.728A7.98,7.98,0,0,0,11.84,1.6.8.8,0,0,1,11.983,0a9.649,9.649,0,0,1,8.684,8.684.8.8,0,0,1-.725.868C19.919,9.559,19.894,9.56,19.87,9.56Zm-6.229,0a.8.8,0,0,0,.505-1.012,3.235,3.235,0,0,0-1.968-2.02.8.8,0,0,0-.533,1.508,1.625,1.625,0,0,1,.984,1.018.8.8,0,0,0,1.011.505Zm3.141-.007a.8.8,0,0,0,.678-.9,6.441,6.441,0,0,0-5.436-5.436A.8.8,0,0,0,11.8,4.794a4.834,4.834,0,0,1,4.079,4.079.8.8,0,0,0,.9.678Z"*/}
                                    {/*              transform="translate(-0.214 -0.001)" fill="#fff"/>*/}
                                    {/*    </svg>*/}
                                    {/*</div>*/}

                                    <ul style={{listStyleType:'circle'}}>
                                        <li style={{fontSize:'16px', textAlign:'justify'}}>بهترین قیمت تور و رزرو</li>
                                        <li style={{fontSize:'16px', textAlign:'justify'}}>بهترین هتل‌های لوکس</li>
                                        <li style={{fontSize:'16px', textAlign:'justify'}}>از تمام نقاط کشور</li>
                                        <li style={{fontSize:'16px', textAlign:'justify'}}>با مشاوره‌ی متخصصین بلبطجا</li>
                                    </ul>
                                    <div style={{ padding:'1rem',marginTop:"20px",borderTop:'1px solid white',display:'flex',justifyContent:'center'}}>
                                        <div style={{backgroundColor:'white',color:'#e20000',width:'100%',borderRadius:'20px',padding:'10px',display:'flex',flexDirection:'column',justifyContent:'center'}}>

                                            <p className='m-0' style={{fontSize:'16px',textAlign:'center'}}>ارتباط با کارشناسان ما</p>
                                            <a href="tel:02184278" style={{textAlign: 'center'}}>021-84279000</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>


                    <Footer/>

                </>
            }
            {/*.slice(4, props.Pathname.CityTour.length)*/}

        </>
    );
};

// CityTour.getInitialProps = ({query}) => {
//     return {
//         Pathname: query
//     }
// }

export const getCityInfo = async (city) => {
    const res = await fetch(`https://api.hamnavaz.com/api/v1/city/getCity/${city}`)
    const data=await res.json()
    return data
}
const getTour = async (cityCode,page=1) => {

    // Request options
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
    //
    //     },
    //     body: JSON.stringify({
    //         destination:cityCode,
    //         month:'',
    //         req_type:'package'
    //     })
    //
    // };

    try {
        const response = await axios.post(`https://api.hotelobilit.com/api/v2/tours?page=${page}`, {
            destination:cityCode,
            month:'',
            req_type:'package'
        },{
            headers: {"x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP',
            referer:'hamnavaz.com'
            },

        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }

    // Send the POST request
    // const res =await fetch(`https://api.hotelobilit.com/api/v2/tours?page=${page}`, options)
    // if (!res.ok) {
    //     // If not OK, attempt to read the response as text
    //     const text = await res.text();
    //     console.error('Error response:', text);
    //     if(res.status===404){
    //         return []
    //     }
    //     // throw new Error(`HTTP error! status: ${res.status}`);
    // }
    //
    // // Attempt to parse the response as JSON
    // try {
    //     const data = await res.json();
    //     return data;
    // } catch (error) {
    //     // If parsing fails, log the error and the raw response text
    //     console.error('Error parsing JSON:', error);
    //     // const text = await res.text();
    //     // console.error('Raw response text:', text);
    //     throw error; // Rethrow the error after logging
    // }

}
export async function getServerSideProps(context) {
   // Access the query parameter

    let cityInfo
    let tour
    const placeId = context.params.CityTour.slice(4,context.params.CityTour.length);
    cityInfo =await getCityInfo(placeId)

        // console.log('pouya',cityInfo)
    if (!cityInfo.isDone) {

        // If data is not found, return a 404 status code
        return {
            notFound: true,
        };
    }else{
        tour= await getTour(cityInfo.data.nameEn,context.query.page)

    }
    return {
        props: {
            cityInfo:cityInfo.data,
            placeId
            ,tour,
            tourMinPrice:tour?.data?.length>0&&Math.min(...tour?.data?.map(item => item.min_price)),
            tourName:context.query.CityTour
        },
    };
}

export default CityTour;

