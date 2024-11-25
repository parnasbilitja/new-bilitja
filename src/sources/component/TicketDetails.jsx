import React, { useEffect, useState } from 'react';
import styles from "../../../styles/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { homeText } from "../../Utils/data";
import {FAQ} from "../../Utils/data";
import {AnimatePresence,motion} from "framer-motion";


const TicketDetails = () => {
    const [width, setWidth] = useState();
    useEffect(() => {
        setWidth(window.innerWidth)
    },[])
    const[collpaseId,setCollapseId]=useState(1)
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
    return (
        <div className="row justify-content-center px-2 " >
          <div
            className={`col-lg-10 col-md-10 col-sm-10 col-12 ${styles["home-flight-content"]}`}

          >
          <div className="d-flex flex-wrap align-items-center justify-content-between" >
                        <div className="d-flex mt-2 flex-column col-xl-5 col-lg-5 col-sm-9 col-12">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17.326" height="20.086" viewBox="0 0 14.326 17.086">
                                        <g id="Bookmark" transform="translate(1 1)">
                                            <path id="Path_835" data-name="Path 835" d="M3.213,15.826h0l-.007,0a1.265,1.265,0,0,1-2-.941C1.121,13.721,1,11.579,1,8.464V8.408H1c0-1.236,0-2.314.089-3.213A5.283,5.283,0,0,1,1.795,2.8C2.7,1.413,4.432,1.011,7.16,1s4.469.388,5.372,1.787a5.329,5.329,0,0,1,.705,2.4c.088.9.089,1.982.089,3.219v.056c0,3.115-.121,5.257-.211,6.426a1.265,1.265,0,0,1-1.995.941h0l-.007,0c-.707-.483-1.361-1-1.87-1.41l-.009-.007c-.232-.184-.442-.352-.607-.474a3.743,3.743,0,0,0-.807-.482,1.755,1.755,0,0,0-1.313,0,3.744,3.744,0,0,0-.807.482h0c-.165.122-.375.29-.607.474l-.009.007C4.574,14.822,3.92,15.343,3.213,15.826Z" transform="translate(-1 -1)" fill="none" stroke="#053742" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Path_836" data-name="Path 836" d="M12,5a1.727,1.727,0,0,1,1.541.51c.514.512.514,2.227.514,2.911" transform="translate(-4.468 -2.262)" fill="none" stroke="#053742" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                        </g>
                                    </svg>
                                    <div className="text mx-2">
                                        <p className="font-bold title-custom p-0 my-0 d-flex align-items-center" style={{marginTop:`${width>826?'2px':'4px'}`,fontSize:'18px',padding:'0',fontWeight:'bold',color:'#e20000'}}>درباره بلیطجا</p>
                                        <h6 className="subtitle-custom mt-1">#بفرمائید‌ـ سفر</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

            </div>
            <div className="bottom d-flex align-items-center justify-content-between mt-3 mb-3">
                <div className="border-right"></div>
                <div className="border-left"></div>
            </div>

              <div className='container' >
                  <div className='row' >

                  <div className='col-lg-6 mb-4 info-hamnavaz'>
                      <div className='description p-0 px-sm-1'>
                          <p className='text-justify text-dark'>
                              سایت بلیطجا با ۱۴ سال سابقه وبادارا بودن مجوز های بند الف و ب از سازمان میراث فرهنگی و گردشگری و سازمان هواپیمایی کشوری همواره بر آن بوده است که بهترین خدمات فروش بلیط هواپیما و تور مسافرتی را به مسافرین محترم و همکاران عزیز عرضه نماید . وب‌سایت همنوازطبق قوانین جمهوری اسلامی ایران، قوانین جرایم اینترنتی و مجموعه‌ی قوانین و مقررات تجارت الکترونیکی فعالیت می‌کند. خدمات و محتوای عرضه شده توسط وب‌سایت همنوازجهت استفاده‌ در این وب‌سایت تولید می‌شوند. هر گونه سوءاستفاده از اطلاعات، متن‌ها، عکس‌ها، نقشه‌ها، طرح‌ها، لوگو و… از این وب‌سایت پیگرد قانونی دارد و هیچ فرد حقیقی یا حقوقی اجازه‌ی سوء استفاده از مطالب این وب‌سایت را ندارد. ذکر مطالب این وب‌سایت در اینترنت، تنها با ذکر نام و نشانی اینترنتی وب‌سایت همنوازو لینک به مطلب ذکر شده مجاز است و در رسانه‌های کاغذی، با کسب اجازه‌ی کتبی از مسئولان وب‌سایت امکان پذیر است .
                          </p>
                      </div>
                      <div className='w-100 d-flex justify-content-center align-items-center mt-5'>
                          <div className='d-flex flex-column align-items-center justify-content-center'>
                              <div className='mb-3' >
                                  <img src="../../../Images/Unlock.svg" alt="unlock" style={{width:'56px', height:'56px'}}/>
                              </div>
                              <p className='font-bold text-center px-4'>امنیت در سفر</p>
                          </div>
                          <div className='d-flex flex-column align-items-center justify-content-center'>
                              <div className='mb-3'>
                                  <img src="../../../Images/Add Menu.svg" alt="" style={{width:'56px', height:'56px'}}/>
                              </div>
                              <p  className='font-bold text-center px-4'>خدمات ویژه سفر</p>
                          </div>
                          <div className='d-flex flex-column align-items-center justify-content-center'>
                              <div className='mb-3'>
                                  <img src="../../../Images/Headphone.svg" alt="headphone" style={{width:'56px', height:'56px'}}/>
                              </div>
                              <p className='font-bold text-center px-4'>پشتیبانی تا پایان سفر</p>
                          </div>
                      </div>
                  </div>
                  <div className='col-lg-6 faq-con'>
                      {FAQ.map(faq=>{
                          return(
                              <div className='mb-2'>
                                  <div className='w-100 h-25 d-flex justify-content-between p-2' style={{borderRadius:"40px",border:"3px solid #e0e0e0",cursor:'pointer'}} onClick={()=>setCollapseId(faq.id)}>
                                      <p className='m-0 font-size-12' style={{color:'#646564', fontWeight:"600", fontSize:'14px'}}>{faq.title}</p>
                                      <div className='d-flex align-items-center justify-content-center'>
                                        <svg height="18px" id="Layer_1"  version="1.1" viewBox="0 0 512 512" width="18px"  xmlns="http://www.w3.org/2000/svg" ><polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "/></svg>
                                      </div>
                                  </div>
                              <AnimatePresence>
                                  {collpaseId===faq.id && <motion.div
                                        variants={variants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        style={{ overflowX: "auto" }}
                                        >
                                      <div className='p-3'>
                                         <p className='m-0' style={{color:'#e20000', fontSize:'14px'}}>{faq.description}</p>
                                      </div>
                                  </motion.div>}
                              </AnimatePresence>

                              </div>


                          )
                      })}

                  </div>
                  </div>
              </div>
              {/*{homeText}*/}
          </div>
          </div>
    );
};

export default TicketDetails;
