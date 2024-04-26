import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Loader } from '../../Utils/Loader';
import Posts from './Posts';
import Questions from './Questions';
import NewLoader from "../../Components/NewTours/Components/subComponents/NewLoader";
import {FAQ} from "../../Utils/data";
import {AnimatePresence, motion} from "framer-motion";
import Scrolltoprefresh from "../component/Scrolltoprefresh";
import Head from "next/head";
import {Shimmers5} from "@/Components/NewTours/Components/subComponents/Shimmers";

const TourData = ({currentCity, search, setSearch,route,setCode,cityInfo,city}) => {
    const [ data, setData ] = useState([])
    const [loading, setLoading] = useState(true)
    const[collpaseId,setCollapseId]=useState(1)

    const getData = async (city) => {

        let slugarr=city.split('-')
        let slug=slugarr.length>1?slugarr[1]:slugarr[0]

        // console.log(city)

        setLoading(true)
        await axios.get(`https://api.hamnavaz.com/api/v1/city/getCity/${slug}`)
            .then(res => {
                // console.log(currentCity,res.data)
                setData(res?.data?.data)
                setLoading(false)

                setCode(res?.data?.data?.nameEn)
            })

    }
    // useEffect(() => {
    //     getData(currentCity)
    // },[])
    // useEffect(() => {
    //
    //     if (search) {
    //         getData(currentCity)
    //     }
    //     setSearch(false)
    // },[currentCity,search])

    // useEffect(()=>{
    //     getData(currentCity)
    // },[currentCity])
    //
    // useEffect(()=>{
    //     getData(route)
    // },[route])

    const variants = {
        initial: {
            height: 0,

        },
        animate: {
            height: "auto",
            transition: {
                duration: 0.5,
            },
        },
        exit: {
            height: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const[schema,setschema]=useState([])

    useEffect(()=>{
        let Entity=data?.faq?.map(i=>{
            return  {
                '@type': 'Question',
                name: i.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: i?.answer
                }
            }

        })


        // console.log(Entity)

        let generatedSchema={
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: Entity

        }
        setschema(generatedSchema)
    },[data.faq])


    return (
        <>
            {
                // loading?
                // <Shimmers5/>:
                <>
                    <Head>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                        />
                    </Head>
                    <div className="about-city">
                        <Scrolltoprefresh/>
                        <div className="title-s2" id="tours">
                            <div className="text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32.812" height="32.812" viewBox="0 0 49.812 49.812">
                                    <g id="Document-align-2" transform="translate(0.5 0.5)">
                                        <path id="Path_902" data-name="Path 902" d="M24.406,47.812a59.235,59.235,0,0,1-12.4-.982,13.178,13.178,0,0,1-6.749-3.277A13.176,13.176,0,0,1,1.982,36.8,59.224,59.224,0,0,1,1,24.406a59.224,59.224,0,0,1,.982-12.4A13.177,13.177,0,0,1,5.259,5.259a13.177,13.177,0,0,1,6.749-3.276A59.224,59.224,0,0,1,24.406,1a59.224,59.224,0,0,1,12.4.982,13.176,13.176,0,0,1,6.749,3.276,13.178,13.178,0,0,1,3.277,6.749,59.235,59.235,0,0,1,.982,12.4,59.234,59.234,0,0,1-.982,12.4,13.177,13.177,0,0,1-3.277,6.749A13.177,13.177,0,0,1,36.8,46.83,59.234,59.234,0,0,1,24.406,47.812Z" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                        <path id="Path_903" data-name="Path 903" d="M7,7h6.383" transform="translate(6.767 6.767)" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                        <path id="Path_904" data-name="Path 904" d="M7,12H28.278" transform="translate(6.767 12.406)" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                        <path id="Path_905" data-name="Path 905" d="M14,17h6.383" transform="translate(14.662 18.045)" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                    </g>
                                </svg>
                                <div className='mr-2' style={{fontWeight:'600'}}> تور ارزان {city}</div>
                            </div>
                        </div>
                        <div class="parent-gallery">
                            <div class="right-gallery">
                                {cityInfo.cityInfo?.images?.map((item,index)=>(
                                    <>
                                        {index >= 1 && index < 5 &&
                                            <img class="top-right" src={item} alt=""/>
                                        }
                                    </>
                                ))}
                            </div>
                            <div class="left-gallery" style={{backgroundImage: `url(${cityInfo.cityInfo.images && cityInfo.cityInfo.images[0] && cityInfo.cityInfo.images[0]})`}}>
                            </div>
                        </div>
                        <div className="p-collapse-info-city" style={{textAlign:'justify !important'}}>
                            <div className="bg-text" style={{textAlign:'justify !important'}} dangerouslySetInnerHTML={{__html:cityInfo.cityInfo.description}} />
                        </div>

                    </div>
                    <div id='blog'>
                        <Posts/>
                    </div>
                    {
                        data?.faq?.length>1 &&    <div className='col-lg-12 faq-con mt-4'>
                            <div className="title-faq mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32.8" height="32.8" viewBox="0 0 49.812 49.812">
                                    <g id="Document-align-2" transform="translate(0.5 0.5)">
                                        <path id="Path_902" data-name="Path 902" d="M24.406,47.812a59.235,59.235,0,0,1-12.4-.982,13.178,13.178,0,0,1-6.749-3.277A13.176,13.176,0,0,1,1.982,36.8,59.224,59.224,0,0,1,1,24.406a59.224,59.224,0,0,1,.982-12.4A13.177,13.177,0,0,1,5.259,5.259a13.177,13.177,0,0,1,6.749-3.276A59.224,59.224,0,0,1,24.406,1a59.224,59.224,0,0,1,12.4.982,13.176,13.176,0,0,1,6.749,3.276,13.178,13.178,0,0,1,3.277,6.749,59.235,59.235,0,0,1,.982,12.4,59.234,59.234,0,0,1-.982,12.4,13.177,13.177,0,0,1-3.277,6.749A13.177,13.177,0,0,1,36.8,46.83,59.234,59.234,0,0,1,24.406,47.812Z" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                        <path id="Path_903" data-name="Path 903" d="M7,7h6.383" transform="translate(6.767 6.767)" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                        <path id="Path_904" data-name="Path 904" d="M7,12H28.278" transform="translate(6.767 12.406)" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                        <path id="Path_905" data-name="Path 905" d="M14,17h6.383" transform="translate(14.662 18.045)" fill="none" stroke="#e20000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                    </g>
                                </svg>

                                <div className="text">
                                    <h2 className='font-bold' style={{fontSize: "18px",margin:'0'}}>&nbsp; سوالات متداول
                                        تور {data.name}</h2>
                                </div>
                            </div>
                            {data?.faq?.map((faq,i)=>{
                                return(
                                    <div className='mb-2'>
                                        <div className='w-100 h-25 d-flex justify-content-between p-2' style={{borderRadius:"40px",border:"3px solid #e0e0e0",cursor:'pointer'}} onClick={()=>setCollapseId(i)}>
                                            <div style={{display:"flex"}}>
                                                <div style={{width:'20px',height:'20px'}}>

                                                    <img src="../../../Images/FAQ.svg" alt="" style={{width:'100%',height:'100%'}}/>
                                                </div>
                                                <p className='m-0 px-2 font-size-12' style={{color:'#646564', fontWeight:"600", fontSize:'14px'}}>{faq.question}</p>

                                            </div>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <svg height="15px" id="Layer_1"  version="1.1" viewBox="0 0 512 512" width="15px"  xmlns="http://www.w3.org/2000/svg" ><polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "/></svg>
                                            </div>
                                        </div>

                                        {collpaseId===i && <div

                                        >
                                            <div className='p-2'>
                                                <p className='m-0' style={{color:'#e20000', fontSize:'14px'}}>{faq.answer}</p>
                                            </div>
                                        </div>}


                                    </div>


                                )
                            })}

                        </div>
                    }

                    {data===null && <div>یافت نشد</div>}

                </>
            }
        </>

    );
};

export default TourData;
