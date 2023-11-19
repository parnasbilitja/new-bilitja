import axios from "axios";
import React, {useEffect, useState} from "react";
import {Err, ErrSuccess, NotifAlert} from "../NewTours/Components/NotifAlert.component";
import PrimaryTextInput from "../../sources/component/PrimaryTextInput.component";
import {usePostHog} from "posthog-js/react";
// import "../../../styles/AccommodationReceipt.module.scss";
const RequestTour = ({ messages, setMessages, setShow, setPackData, packData, setOpen,datatitle }) => {

    const posthog=usePostHog()
    const [passsengerCount,setPassengerCount]=useState({
        adl:0,
        chd:0,
        inf:0
    })
    const valueHandler = (e) => {
        setPackData({ ...packData, [e.target.name]:e.target.value })
    }


    useEffect(()=>{

        setPackData({ ...packData, count: passsengerCount.adl+passsengerCount.chd+passsengerCount.inf })
    },[passsengerCount])

    const data = {
        noPackage: false,
        package_id: packData.tourId,
        city_id: null,
        phone: packData.number,
        name: null,
        month: null,
        count: packData.count ? packData.count : 1
    }

    const dataHandler = async () => {
        await axios.post('https://api.hamnavaz.com/api/v1/reserve/createReserve', data)
            .then(response => {
                setMessages({ ...messages, isDone: response.data.isDone, message: response.data.message });
                ErrSuccess('درخواست رزرو با موفقیت ثبت شد. منتظر تماس کارشناسان ما باشید.')
            })
        setShow(false);
        setOpen(true)
    }

    useEffect(()=>{
        console.log('asdas32432',packData)
    },[])

    const passcount=(type,countertype)=>{
        if(countertype==='inc'){
            if(type==='adl'){
                setPassengerCount({
                    chd: passsengerCount.chd,
                    inf: passsengerCount.inf,
                    adl: passsengerCount.adl +1
                })

            }else if(type==='chd'){
                setPassengerCount({
                    chd: passsengerCount.chd+1,
                    inf: passsengerCount.inf,
                    adl: passsengerCount.adl
                })
            }else{
                setPassengerCount({
                    chd: passsengerCount.chd,
                    inf: passsengerCount.inf+1,
                    adl: passsengerCount.adl
                })
            }
        }else{
            if(type==='adl'){
                if(passsengerCount.adl===0){

                    setPassengerCount({
                        chd: passsengerCount.chd,
                        inf: passsengerCount.inf,
                        adl:0
                    })
                } else{
                    setPassengerCount({
                        chd: passsengerCount.chd,
                        inf: passsengerCount.inf,
                        adl: passsengerCount.adl-1
                    })
                }

            }else if(type==='chd'){
                if(passsengerCount.adl===0){

                    setPassengerCount({
                        chd: 0,
                        inf: passsengerCount.inf,
                        adl:passsengerCount.adl
                    })
                } else{
                    setPassengerCount({
                        chd: passsengerCount.chd-1,
                        inf: passsengerCount.inf,
                        adl: passsengerCount.adl
                    })
                }
            }else{
                if(passsengerCount.inf===0){

                    setPassengerCount({
                        chd: passsengerCount.chd,
                        inf: 0,
                        adl:passsengerCount.adl
                    })
                } else{
                    setPassengerCount({
                        chd: passsengerCount.chd,
                        inf: passsengerCount.inf-1,
                        adl: passsengerCount.adl
                    })
                }
            }
        }


    }

    return (
        <div>
            {/*<NotifAlert/>*/}
            <div className="modal-content col-xl-12 col-lg-12 col-12 position-relative">
                {/* <div className="closeModal d-flex justify-content-end mt-2 ps-2 w-100" onClick={()=>setShow(false)}>
                    <svg width="35" height="35" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="23.1287" cy="23.0799" rx="17.2108" ry="17.2537" stroke="#ff0000" strokeWidth={2} />
                        <path d="M17.3906 28.8301L28.8645 17.3276" stroke="#ff0000" strokeWidth={2} />
                        <path d="M28.8633 28.8301L17.3894 17.3276" stroke="#ff0000" stroke-width={2} />
                    </svg>
                </div> */}
                <div onClick={() =>{setShow(false)}} className="ic-close position-absolute cursor-pointer" style={{ left: "15px", top: "15px" ,width:'30px',height:'30px',border:'2px solid #e20000',borderRadius:'5px',color:'#e20000',display:'flex',justifyContent:"center",alignItems:'center'}}>
                    x
                </div>
                <div className="d-flex flex-wrap col-xl-12 col-lg-12 col-12 w-100 mt-4 py-4">
                    <div className="text d-flex flex-column align-items-center w-100 px-2 mb-2">
                        <p className="text-center font-yekan font-bold font-size-14 mb-0">
                            با تشکر از انتخاب شما
                            لطفا جهت رزرو تور با شماره تلفن:<div className="d-flex justify-content-center ltr text-right px-2"><a style={{color:'black'}} href='tel:02184278'>021-84278</a></div>تماس حاصل فرمایید
                        </p>
                        <span className="text-center font-yekan font-bold font-size-14 py-2">یا</span>
                        <p className="text-center font-yekan font-bold font-size-14">
                            جهت تماس با شما از طریق کارشناسان  همنواز اطلاعات درخواستی زیر را تکمیل و ارسال فرمایید.
                        </p>
                    </div>
                    <div className="in-data w-75 d-flex flex-column align-items-stretch justify-content-center m-auto mb-2">
                        <label htmlFor="" className="pb-2 font-yekan font-bold">شماره تلفن همراه</label>
                        <div className='form-input-border'>
                            <PrimaryTextInput type="text" value={packData.number} onChange={e => valueHandler(e)} name="number" className="w-100 px-2 rounded-3 border-secondary font-yekan" placeholder="شماره همراه خود را وارد کنید" style={{ height: "40px", outline: "none" }} />
                        </div>
                    </div>

                    <div className="bedcount-container">
                        <div className="bedcount">
                            {/*<label htmlFor="" className="pb-2 font-yekan font-bold">تعداد مسافر</label>*/}
                            {/*<select className="w-100 px-2 rounded-3 border-secondary" value={packData.count} onChange={e => valueHandler(e)} name="count" id="" style={{ height: "40px", outline: "none" }}>*/}
                            {/*    <option value="1">1</option>*/}
                            {/*    <option value="2">2</option>*/}
                            {/*    <option value="3">3</option>*/}
                            {/*    <option value="4">4</option>*/}
                            {/*    <option value="5">5</option>*/}
                            {/*    <option value="6">6</option>*/}
                            {/*    <option value="7">7</option>*/}
                            {/*    <option value="8">8</option>*/}
                            {/*    <option value="9">9</option>*/}
                            {/*</select>*/}

                            <div className='passengercount'>
                                <p style={{fontSize:'14px',margin:'0',padding:'0',textAlign:'center',marginBottom:'8px'}}>تعداد بزرگسال</p>
                                <div className='count'>

                                    <div className="decin" onClick={()=>passcount('adl','inc')}>
                                        +
                                    </div>
                                    <p>{passsengerCount.adl}</p>
                                    <div className="decin" onClick={()=>passcount('adl','dec')}>
                                        -
                                    </div>
                                </div>
                            </div> <div className='passengercount'>
                            <p style={{fontSize:'14px',margin:'0',padding:'0',textAlign:'center',marginBottom:'8px'}}>تعداد کودک</p>
                            <div className='count'>

                                <div className="decin" onClick={()=>passcount('chd','inc')}>
                                    +
                                </div>
                                <p>{passsengerCount.chd}</p>
                                <div className="decin" onClick={()=>passcount('chd','dec')}>
                                    -
                                </div>
                            </div>
                        </div> <div className='passengercount'>
                            <p style={{fontSize:'14px',margin:'0',padding:'0',textAlign:'center',marginBottom:'8px'}}>تعداد نوزاد</p>
                            <div className='count'>

                                <div className="decin" onClick={()=>passcount('inf','inc')}>
                                    +
                                </div>
                                <p>{passsengerCount.inf}</p>
                                <div className="decin" onClick={()=>passcount('inf','dec')}>
                                    -
                                </div>
                            </div>
                        </div>



                        </div>
                    </div>

                    <div className="c-btn request-data my-3 font-yekan m-auto w-100 d-flex justify-content-center">
                        <button style={{width:'130px',height:'50px',backgroundColor:'#069e2c !important'}} className={`ancher bg-success text-white font-size-13 py-2 px-4 rounded-3 mt-2 foc01`} onClick={()=> {
                            dataHandler()
                            posthog.capture("FormEndTourPackage",{BLTPhone:packData.number,BLTPassengerCount:packData.count})
                            posthog.identify(packData.number)

                        }}>
                            درخواست رزرو
                        </button>
                    </div>
                </div>
            </div>
            {/*${datatitle.endCity.name==='استانبول' && 'ist'} ${datatitle.endCity.name==='آنتالیا' && 'ayt'}*/}
        </div>
    );
}


export default RequestTour;
