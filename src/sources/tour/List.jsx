import  React, { useEffect, useState } from 'react';
import Link from 'next/link';


import dynamic from "next/dynamic";

import { moneyFormatrial } from '../../Utils/SimpleTasks';
import {useRouter} from "next/router";
import {getcurrencyfa, getRandomNumber, getRandomRounded, MiladiToJalaliConvertor} from "../../Utils/newTour";
import {Shimmers, Shimmers6} from "../../Components/NewTours/Components/subComponents/Shimmers";
import axios from "axios";
import Paginate from "../../Components/NewTours/Components/subComponents/Paginate";
import globals from "../../sources/Global";
import scrolltoprefresh from "../component/Scrolltoprefresh";
import {useSelector} from "react-redux";

const Account = dynamic(() => import("./../../sources/account/Account.component"));

const List = (props) => {
const router=useRouter()

    const {tour_type}=useSelector(state=>state.TourSearchBox)

    const [data, setData] = useState([])
    const [dest, setDest] = useState([])
    const [city, setCity] = useState('')
    const [meta, setMeta] = useState({})
    const [sortStat, setSortStat] = useState('1')
    const[loading,setLoading]=useState(false)



    useEffect(() => {

        setLoading(true)
        if(props.tourData){
            setData(props.tourData)
            setLoading(false)
        }


    }, [props.tourData])



    // useEffect(() => {
    //
    //     if (props.name !== 'hotel' ) {
    //         if (!getData.loading && getData?.data?.length>0) {
    //             setData(getData.data)
    //
    //         }
    //     }else{
    //         setData(props.tourData)
    //     }
    // },[props.name])

    // useEffect(() => {
    //     props.tourData !==null && props.tourData !==[] &&
    //     setData(props.tourData)
    // },[props.tourData])
    const slugHandler = (slug) => {
        localStorage.setItem("slug", JSON.stringify(slug))
    }
    // const [searchBar, setSearchBar] = useState('')
    // useEffect(() => {
    //     if(props.city !== undefined){
    //
    //     setSearchBar(props.city)
    //     }
    //
    // },[props.city])
    // const searchBarHandler = (e) =>{
    //     e.preventDefault();
    //     setSearchBar(e.target.value);
    //   };

    // useEffect(()=>{
    //     if(data){
    //         if(searchBar===''){
    //             setData(getData.data)
    //         }else{
    //         let filteredData= data?.filter(post => (post.title.includes(searchBar)))
    //         setData(filteredData)
    //         }
    //     }
    // },[searchBar])
      //
      //


    const getdest =async () => {
        let data = await axios.get('https://api.hotelobilit.com/api/v2/tours/destinations',{
            headers: {
                "x-app-key":  '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
            }
        })
            .then((response) => {
                setDest(prevstate=>[{code:'',name:'همه'},...response.data.data[0].destinations])
                    // console.log('73267846328736482',response.data)
            })
        return data
    }



    const getTour = async (cityCode,ordering=null,page=1) => {
        setLoading(true)
        setData([])


        try {
            const response = await axios.post(`${globals.tourPackagesnew}packages?page=${page}`, {
                destination:cityCode,
                // month:'',
                // req_type:'package',
                ordering:ordering,


            },{
                headers: {"x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05',
                    referer:'hamnavaz.com'
                },

            });
            setLoading(false)
            setMeta(response.data.meta)
            setData(response.data.data)
        } catch (error) {
            setLoading(false)
            console.error("Error fetching data:", error);
            throw error;
        }



    }
  const sortData=(stattype,data)=>{

      if(stattype===''){
          return data
      }else if(stattype==='dptdate'){
           return  sortedDptdate(data)
        }else {
            return data?.sort((a,b)=>a?.min_price-b?.min_price)
        }

  }

  // useEffect(()=>{
  //         sortData(sortStat,data)
  // },[sortStat,data,city])

    useEffect(()=>{
        getdest()
    },[])


    // useEffect(()=>{
    //
    //     if(props.isHotel){
    //         getTour(props.code,sortStat)
    //     }else{
    //
    //
    //         getTour(city,sortStat)
    //     }
    // },[city,sortStat,props.isHotel])

    const sortedDptdate =(data)=>{

      let newdata= data.sort((a, b) => {
          const now = new Date();
          return new Date(a.departure_date) - now - (new Date(b.departure_date) - now);
        })

          return newdata
    }


    const tags=['مجری مستقیم','بهترین قیمت','لیدر فارسی زبان','خدمات ویژه','لاکچری','پرواز بدون تغییر','لحظه آخری','رزرو آنلاین تلفنی']

    const [isShowMore,setISShowMore]=useState(false)

    return (
        <div ref={props.myRef} className='mx-2'>
            <div className="mt-5 bodyVar">
                <div className="">
                    <div className="d-flex flex-wrap align-items-center justify-content-between mt-5">
                        <div className="d-flex mt-3 flex-column col-xl-3 col-lg-3 col-sm-3 col-12">
                            <div className='d-flex align-items-center justify-content-between'>
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
                                        <div className="text mx-2 d-flex justify-content-center flex-column">
                                            <p className="font-bold title-custom p-0 mx-2 my-0 d-flex align-items-center"
                                               style={{fontSize: '18px', padding: '0', fontWeight: 'bold'}}>لیست
                                                تورها</p>
                                            <p className="subtitle-custom font-size-13 m-0">مشاهده مناسب ترین تور های
                                                لحظه آخری</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='isMobile'
                                     style={{marginLeft: '0', width: '80px', color: 'white', borderRadius: '10px'}}>
                                    <div className='d-flex justify-content-center' style={{padding: '5px'}}>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                                 width="24">
                                                <path
                                                    d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/>
                                            </svg>
                                        </div>
                                        <select name="" style={{outline: 'none', border: 'none', width: '20px'}} id=""
                                                value={sortStat} onChange={(e) => setSortStat(e.target.value)}>
                                            <option value="" disabled={true}>فیلتر براساس....</option>
                                            <option value="3">قیمت</option>
                                            <option value="1">تاریخ رفت</option>
                                        </select>
                                    </div>
                                </div>


                            </div>


                        </div>

                        <div style={{display: 'flex', justifyContent: 'flex-end', columnGap: '12px'}}>
                            {!props.isHotel && <div className="c-input col-xl-3 col-lg-3 col-sm-3 col-12 position-relative " style={{
                                width: '180px',
                                height: "50px",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid #cecece',
                                borderRadius: '10px'
                            }}>
                                <select name="" style={{outline: 'none', border: 'none', width: '90%'}} id=""
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}>
                                    <option value="" disabled={true}>شهر....</option>

                                    {dest.map(d => <option value={d.code} className={city === d.code && 'city-active'}
                                    >
                                        {d.name}
                                    </option>)}

                                </select>
                            </div>}
                            <div className='isDesktop'>

                                <div className="c-input col-xl-3 col-lg-3 col-sm-3 col-12 position-relative " style={{
                                    width: '180px',
                                    height: "50px",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #cecece',
                                    borderRadius: '10px'
                                }}>
                                    <select name="" style={{outline: 'none', border: 'none', width: '90%'}} id=""
                                            value={sortStat} onChange={(e) => setSortStat(e.target.value)}>
                                        <option value="" disabled={true}>فیلتر براساس....</option>
                                        <option value="3">قیمت</option>
                                        <option value="1">تاریخ رفت</option>
                                    </select>
                                </div>

                            </div>

                        </div>


                        {/*<div className="c-input col-xl-6 col-lg-6 col-sm-6 col-12 position-relative pt-2">*/}
                        {/*    <>*/}
                        {/*        <ul className='city-list' style={{columnGap:"6px"}}>{dest.map(d=>  <li className={city===d.code && 'city-active'} onClick={()=> {*/}

                        {/*                setCity(d.code)                                }}*/}
                        {/*        >*/}
                        {/*            {d.name}*/}
                        {/*        </li>*/}
                        {/*        )*/}
                        {/*          }*/}
                        {/*        </ul>*/}
                        {/*    </>*/}

                        {/*</div>*/}
                    </div>
                    <div className="bottom d-flex align-items-center mt-3 mb-3">
                        <div className="border-right"></div>
                        <div className="border-left"></div>
                    </div>

                    <div
                        className={`${isShowMore || !Array.isArray(data) || data?.length === 0 || !props.hideShowMore ? 'auto' : 'listH'}`}
                        style={{overflowY: 'hidden', position: 'relative', padding: '8px'}}>
                        {
                            loading && data.length === 0 ?

                                <>{
                                    [...Array(props.shimmerNumber)].map(i => (
                                        <div style={{marginBottom: '24px'}}>
                                            <Shimmers6 selectedHeight={'95px'}/>
                                        </div>
                                    ))
                                }</> :
                                (!loading && (!Array.isArray(data) || data?.length === 0)) ?
                                    [...Array(props.shimmerNumber)].map(i => (
                                        <div style={{marginBottom: '24px'}}>
                                            <Shimmers6 selectedHeight={'95px'}/>
                                        </div>
                                    )) :
                                    ( data?.map((item) => (
                                           <Link href={`/tours/${item?.id}?tour_type=${router.query.tour_type}`} onClick={() => slugHandler(item?.id)}
                                                 key={item?.id}
                                                 className="w-100 col-xl-12 col-lg-12 w-100 d-flex flex-column">
                                               <div className="tour-item col-xl-12 col-lg-12 mb-4"
                                                    style={{cursor: 'pointer'}}>
                                                   <div className="tour-city">
                                                       <svg xmlns="http://www.w3.org/2000/svg" width="41.265"
                                                            height="48.155" viewBox="0 0 41.265 48.155">
                                                           <g id="location2" transform="translate(1.549 1.5)">
                                                               <path id="Path_1011" data-name="Path 1011"
                                                                     d="M1.271,23.5A27.9,27.9,0,0,0,8.614,37.67,46.066,46.066,0,0,0,18.34,45.6a3.243,3.243,0,0,0,3.487,0,46.066,46.066,0,0,0,9.725-7.932A27.9,27.9,0,0,0,38.895,23.5,21.308,21.308,0,0,0,35.951,8.79C33.1,4.425,28.083,1,20.083,1S7.067,4.425,4.215,8.79A21.308,21.308,0,0,0,1.271,23.5Z"
                                                                     transform="translate(-1 -1)" fill="none"
                                                                     stroke="#e20000" strokeLinecap="round"
                                                                     strokeLinejoin="round" strokeWidth="3"/>
                                                               <circle id="Ellipse_49" data-name="Ellipse 49" cx="5.204"
                                                                       cy="5.204" r="5.204"
                                                                       transform="translate(24.288 23.697) rotate(180)"
                                                                       fill="none" stroke="#e20000" strokeWidth="3"/>
                                                           </g>
                                                       </svg>

                                                       <div className="info-tour-city mr-2">
                                                           <Link href={`/tours/${item.id}?tour_type=${router.query.tour_type}`}>
                                                               <>
                                                                   <strong
                                                                       style={{fontSize: '14px'}}>{item.title}</strong>
                                                                   <small
                                                                       style={{marginRight: '5px'}}>({item.id})</small>
                                                               </>
                                                           </Link>
                                                           <div className="text-price pt-1">
                                                               <small className="title-price"
                                                                      style={{fontSize: '13px'}}>شروع قیمت از :</small>
                                                               <strong className="price-tour color-base-color me-2"
                                                                       style={{color: ' #e20000', fontSize: '15px'}}>
                                                                   {moneyFormatrial(item.min_price)}
                                                                   <small
                                                                       className="pe-1">{getcurrencyfa(item?.currencies)} </small>
                                                               </strong>
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="tour-days">
                                                       <div className="night mb-2">
                                                           <svg className="ms-2" xmlns="http://www.w3.org/2000/svg"
                                                                width="15.437" height="16.078"
                                                                viewBox="0 0 15.437 16.078" fill='#e20000'>
                                                               <path id="Moon_1" data-name="Moon 1"
                                                                     d="M14.794,10.838l.595.245a.643.643,0,0,0-.883-.82ZM6.442.643l.519.38A.643.643,0,0,0,6.3.015Zm5.39,10.25a6.126,6.126,0,0,1-6.07-6.181H4.475a7.413,7.413,0,0,0,7.356,7.467Zm2.674-.63a5.954,5.954,0,0,1-2.674.63V12.18a7.24,7.24,0,0,0,3.25-.766Zm-.307.33a6.717,6.717,0,0,1-6.2,4.2v1.286a8,8,0,0,0,7.387-5ZM8,14.792A6.777,6.777,0,0,1,1.287,7.955H0a8.063,8.063,0,0,0,8,8.123ZM1.287,7.955A6.812,6.812,0,0,1,6.58,1.271L6.3.015A8.1,8.1,0,0,0,0,7.955ZM5.762,4.712a6.225,6.225,0,0,1,1.2-3.689L5.923.263A7.512,7.512,0,0,0,4.475,4.712Z"
                                                                     transform="translate(0)" fill="#e20000"/>
                                                           </svg>
                                                           <span
                                                               className="font-size-14 font-bold">{item.night_num} شب</span>
                                                       </div>
                                                       <div className="day d-flex justify-content-start">
                                                           <svg className="ms-2" id="Sun"
                                                                xmlns="http://www.w3.org/2000/svg" width="21.159"
                                                                height="21.159" viewBox="0 0 21.159 21.159">
                                                               <path id="Path_1144" data-name="Path 1144"
                                                                     d="M7,12.3c-.024,2.225.347,3.463,1.064,4.18s1.973,1.1,4.225,1.1,3.492-.382,4.205-1.1,1.084-1.96,1.084-4.19-.37-3.471-1.084-4.19S14.542,7,12.289,7,8.811,7.382,8.1,8.1,7.024,10.063,7,12.3Z"
                                                                     transform="translate(-1.71 -1.71)" fill="none"
                                                                     stroke="#e20000" strokeLinecap="round"
                                                                     strokeLinejoin="round" strokeWidth={2}/>
                                                               <path id="Path_1145" data-name="Path 1145"
                                                                     d="M14.511.756A.756.756,0,0,0,13,.756ZM13,2.267a.756.756,0,0,0,1.511,0ZM13,.756V2.267h1.511V.756Z"
                                                                     transform="translate(-3.176)" fill="#e20000"/>
                                                               <path id="Path_1146" data-name="Path 1146"
                                                                     d="M14.511,24.756a.756.756,0,0,0-1.511,0ZM13,26.267a.756.756,0,0,0,1.511,0Zm0-1.511v1.511h1.511V24.756Z"
                                                                     transform="translate(-3.176 -5.864)"
                                                                     fill="#e20000"/>
                                                               <path id="Path_1147" data-name="Path 1147"
                                                                     d="M26.267,14.511a.756.756,0,0,0,0-1.511ZM24.756,13a.756.756,0,0,0,0,1.511Zm1.511,0H24.756v1.511h1.511Z"
                                                                     transform="translate(-5.864 -3.176)"
                                                                     fill="#e20000"/>
                                                               <path id="Path_1148" data-name="Path 1148"
                                                                     d="M2.267,14.511a.756.756,0,0,0,0-1.511ZM.756,13a.756.756,0,0,0,0,1.511Zm1.511,0H.756v1.511H2.267Z"
                                                                     transform="translate(0 -3.176)" fill="#e20000"/>
                                                               <path id="Path_1149" data-name="Path 1149"
                                                                     d="M4.29,3.221A.756.756,0,0,0,3.221,4.29Zm0,2.137A.756.756,0,0,0,5.359,4.29ZM3.221,4.29,4.29,5.359,5.359,4.29,4.29,3.221Z"
                                                                     transform="translate(-0.733 -0.733)"
                                                                     fill="#e20000"/>
                                                               <path id="Path_1150" data-name="Path 1150"
                                                                     d="M4.29,24.359A.756.756,0,1,1,3.221,23.29Zm0-2.137A.756.756,0,0,1,5.359,23.29ZM3.221,23.29,4.29,22.221,5.359,23.29,4.29,24.359Z"
                                                                     transform="translate(-0.733 -5.375)"
                                                                     fill="#e20000"/>
                                                               <path id="Path_1151" data-name="Path 1151"
                                                                     d="M23.29,3.221A.756.756,0,1,1,24.359,4.29Zm0,2.137A.756.756,0,0,1,22.221,4.29ZM24.359,4.29,23.29,5.359,22.221,4.29,23.29,3.221Z"
                                                                     transform="translate(-5.375 -0.733)"
                                                                     fill="#e20000"/>
                                                               <path id="Path_1152" data-name="Path 1152"
                                                                     d="M23.29,24.359a.756.756,0,1,0,1.069-1.069Zm0-2.137a.756.756,0,0,0-1.069,1.069Zm1.069,1.069L23.29,22.221,22.221,23.29l1.069,1.069Z"
                                                                     transform="translate(-5.375 -5.375)"
                                                                     fill="#e20000"/>
                                                           </svg>
                                                           <span
                                                               className="font-size-14 font-bold">{item.day_num} روز</span>
                                                       </div>
                                                   </div>
                                                   <div className="tour-night d-flex align-items-center">
                                                       <svg className="ms-2" xmlns="http://www.w3.org/2000/svg"
                                                            width="21.429" height="17.709" viewBox="0 0 21.429 17.709">
                                                           <g id="Up_Down_1" data-name="Up Down 1"
                                                              transform="translate(21.015 17.294) rotate(180)">
                                                               <path id="Path_1173" data-name="Path 1173"
                                                                     d="M1,11.23l4.65,4.65m0,0V1m0,14.88,4.65-4.65"
                                                                     fill="none" stroke="#e20000" strokeLinecap="round"
                                                                     strokeLinejoin="round" strokeWidth={2}/>
                                                               <path id="Path_1174" data-name="Path 1174"
                                                                     d="M11,5.65,15.65,1m0,0V15.88M15.65,1,20.3,5.65"
                                                                     transform="translate(-0.7)" fill="none"
                                                                     stroke="#e20000" strokeLinecap="round"
                                                                     strokeLinejoin="round" strokeWidth={2}/>
                                                           </g>
                                                       </svg>
                                                       <div className="d-flex flex-column">
                                                           <span
                                                               className="to text-dark font-size-14 pt-1">{MiladiToJalaliConvertor(item?.departure_date)}</span>
                                                           <span
                                                               className="from text-dark font-size-14 pt-1">{MiladiToJalaliConvertor(item?.return_date)}</span>
                                                       </div>
                                                   </div>
                                                   <div className="type">
                                                       <div className={'isDesktop'}>
                                                           {<div style={{
                                                               display: 'flex',
                                                               columnGap: '3px',
                                                               justifyContent: 'center'
                                                           }}>
                                                               {!item.offered ? getRandomNumber(8).map(num => (
                                                                   <div style={{
                                                                       padding: '4px',
                                                                       width: '110px',
                                                                       backgroundColor: "#efefef",
                                                                       color: "#a9a9a9",
                                                                       borderRadius: '5px',
                                                                       fontSize: '13px',
                                                                       fontWeight: '700',
                                                                       textAlign: 'center',
                                                                       whiteSpace: 'nowrap'
                                                                   }}>{tags[num]}</div>

                                                               )) : <div style={{
                                                                   padding: '4px',
                                                                   width: '110px',
                                                                   backgroundColor: "#e20000",
                                                                   color: "white",
                                                                   borderRadius: '5px',
                                                                   fontSize: '13px',
                                                                   fontWeight: '700',
                                                                   textAlign: 'center',
                                                                   whiteSpace: 'nowrap'
                                                               }}>ویژه</div>}
                                                           </div>}


                                                       </div>
                                                       {/*<img width="45" src={item.transfers[0].logo} alt={item.title} />*/}
                                                       {/*<span className="text-dark me-2 font-size-14">{item.transfers[0].transfer}</span>*/}
                                                   </div>
                                                   <Link href={`/tours/${item.id}?tour_type=${router.query.tour_type}`}>
                                                       <div className="ino-tour-btn">
                                                           <span
                                                               className="text-white isMobile ms-2 font-bold-iransanse"
                                                               style={{display: "none"}}>جزییات</span>
                                                           <svg xmlns="http://www.w3.org/2000/svg" width="27.414"
                                                                height="18.453" viewBox="0 0 27.414 18.453">
                                                               <path id="Right_Arrow_2" data-name="Right Arrow 2"
                                                                     d="M18.188,1,26,8.812m0,0H1m25,0-7.812,7.813"
                                                                     transform="translate(27.414 18.039) rotate(180)"
                                                                     fill="none" stroke="#fff" strokeLinecap="round"
                                                                     strokeLinejoin="round" strokeWidth={2}/>
                                                           </svg>
                                                       </div>
                                                   </Link>
                                               </div>
                                           </Link>
                                       ))
                                   )

                            // <Loader />
                        }

                    </div>
                    <div style={{display: 'flex', justifyContent:'space-between',alignItems:'center',width:'100%'}}>
                    <Paginate scrollToTop={props.scrollToTop}  apiCall={(page)=> {
                        getTour(city, sortStat, page)
                        props.scroll_top()
                    }} to={meta.last_page}/>
                        <div className='endlessscroll' onClick={()=> {

                                router.push('/tours/alltours')

                        }}>
                            {props.hideShowMore &&
                                <div style={{
                                    width: '110px',
                                    height: '50px',
                                    color: '#e20000',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid #e20000',
                                    borderRadius: '20px'
                                }}>
                                    <p className='text-center p-0 m-0'
                                       style={{fontWeight: '900', fontSize: '14px'}}>مشاهده همه</p>
                                </div>}
                        </div>
                    </div>


                </div>
            </div>

        </div >
    );
};

export default List;
