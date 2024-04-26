import axios from "axios";
import React, {useEffect, useState} from "react";
import {Err, ErrSuccess, NotifAlert} from "../NewTours/Components/NotifAlert.component";
import PrimaryTextInput from "../../sources/component/PrimaryTextInput.component";
// import {usePostHog} from "posthog-js/react";
import {getcurrencyfa, numberWithCommas} from "../../Utils/newTour";
// import "../../../styles/AccommodationReceipt.module.scss";
const RequestTour = ({isBundle,infPrc,currency, selectedHotelID,messages, setMessages, setShow, setPackData, packData, setOpen,datatitle,selectedpinZeroRoom,selectedHotel,flightId }) => {

    // const posthog=usePostHog()
const [passsengerCount,setPassengerCount]=useState({
    adl:0,
    chd:0,
    inf:0
})
    const valueHandler = (e) => {
        setPackData({ ...packData, [e.target.name]:e.target.value })
    }

    const[rooms,setRooms]=useState([])

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


    useEffect(() => {
        if(isBundle){
          setRooms(selectedHotel.prices.filter(p=>p.pin===0))

        }else{

            let filteredRoomsBasedOnFlightId=selectedHotel.prices.filter(room=>(room.flight_id.toString()+room.return_flight_id.toString())===flightId)
            setRooms(getCheapestRoom(filteredRoomsBasedOnFlightId))
        }
        // console.log(isBundle)
    }, [isBundle]);

    // useEffect(()=>{
    //    let h=targetHotel.filter(hotel=>hotel.hotel_id===selectedHotelID)
    //     console.log(h)
    // },[])

    const removeDuplicateObj = (data, prop) => {
        // debugger
        const seenIds = {}; // Helper object to keep track of seen IDs

        const filteredData = data.filter((obj) => {
            if (!seenIds[obj.roomTypeId]) {
                seenIds[obj.roomTypeId] = true; // Mark the ID as seen
                return true; // Keep the object in the filtered data
            }
            return false; // Ignore the object as duplicate
        });
        return filteredData;
    };
    const getCheapestRoom=(roomsArr)=>{

        let chepestRooms=[]
        roomsArr.map(room=>{
            let roomtypeId=room.roomTypeId

            let filteredRoom= roomsArr?.filter(room=>room.roomTypeId===roomtypeId)
            let minprc= filteredRoom.reduce((min, obj) => (obj.price < min.price ? obj : min),filteredRoom[0]);
            chepestRooms.push(minprc)
        })




       return removeDuplicateObj(chepestRooms)

    }



    useEffect(()=>{

        console.log('ds۲۳۴۲fds',rooms)
    },[rooms])
    return (
        <div className='req-container'  style={{padding:'2rem 3rem',overflowX:'scroll',maxWidth:'1200px',margin:'0 auto'}} >
            <div style={{width:'100%',display:'flex',justifyContent:'end'}}>

            <div onClick={()=>setShow()} className="ic-close  cursor-pointer my-3" style={{bottom:'10px', width:'30px',height:'30px',border:'2px solid #e20000',borderRadius:'5px',color:'#e20000',display:'flex',justifyContent:"center",alignItems:'center'}}>
                x
            </div>
            </div>

            {
                rooms.length>0 ?  <div className="col-xl-12 col-lg-12 col-12  position-relative" >
                    <div >
                        <div className='rooms'>
                            <div className='room-title'>
                                <div className='title'>
                                    <p>اتاق</p>
                                </div>
                                <div className='title'>
                                    <p>قیمت اتاق </p>
                                </div>
                                {!isBundle&&

                                    <div className='title'>
                                        <p>تخت اضافه</p>
                                    </div>
                                }

                                <div className='title'>
                                    <p>کودک با تخت</p>
                                </div>

                                <div className='title'>
                                    <p>کودک بدون تخت</p>
                                </div>
                                <div className='title'>
                                    <p>نوزاد</p>
                                </div>

                            </div>
                            {rooms.map(price=>{
                                return(
                                    <div className='room-description'>
                                        {isBundle?<div className='description'>
                                                <p style={{color: '#e20000', fontWeight: 700}}>{price.name}</p>
                                                {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                            </div>:

                                            <div className='description'>
                                                <p style={{color: '#e20000', fontWeight: 700}}>{price.roomName}</p>
                                                {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                            </div>
                                        }
                                        <div className='description'>
                                            <p >{numberWithCommas(price.price)}</p>
                                            <span>{getcurrencyfa(currency)}</span>

                                            {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                        </div>
                                        {
                                            !isBundle&&

                                            <div className='description'>
                                                <p >{price.extra_bed_price===0||price.extra_bed_count===0?'عدم موجودی':numberWithCommas( price.extra_bed_price)}</p>
                                                <span>{(price.extra_bed_price===0||price.extra_bed_count===0)
                                                    ?null:getcurrencyfa(currency) }</span>

                                                {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                            </div>

                                        }


                                        {isBundle?
                                            <div className='description'>
                                                <p >{numberWithCommas(selectedHotel.cwb) }</p>
                                                <span>{getcurrencyfa(currency)}</span>

                                                {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                            </div>:
                                            <div className='description'>
                                                <p >{price.chd_w_price===0||price.roomChdCapacity===0?'عدم موجودی':numberWithCommas(price.chd_w_price)}</p>
                                                <span>{(price.chd_w_price===0||price.roomChdCapacity===0)
                                                    ?null:getcurrencyfa(currency) }</span>
                                                {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                            </div>
                                        }
                                        {isBundle?
                                            <div className='description'>
                                                <p >{numberWithCommas(selectedHotel.cnb) }</p>
                                                <span>{getcurrencyfa(currency)}</span>

                                                {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                            </div>:
                                            <div className='description'>
                                               <p> {price.chd_n_price===0||price.roomChdCapacity===0?'عدم موجودی':numberWithCommas(price.chd_n_price)}</p>
                                                {price.chd_n_price===0 || price.roomChdCapacity===0
                                                    ?null: <span>{getcurrencyfa(currency)} </span>}

                                                {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                            </div>
                                        }


                                        {
                                            isBundle?
                                                <div className='description'>
                                                    <p >{numberWithCommas(infPrc)}</p>
                                                    <span>{getcurrencyfa(currency)}</span>

                                                    {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                                </div>:
                                                <div className='description'>
                                                    <p >{numberWithCommas(price.inf_price) }</p>
                                                    <span>{getcurrencyfa(currency)}</span>

                                                    {/*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*/}
                                                </div>

                                        }

                                        {/*<div className='description'>*/}
                                        {/*    <p >{numberWithCommas(price.inf_price) }</p>*/}
                                        {/*    <span>تومان</span>*/}
                                        {/*    /!*<p className='text-center' style={{color:'#e20000',fontSize:'14px',fontWeight:700}}>{numberWithCommas(price?.price) }</p>*!/*/}
                                        {/*</div>*/}
                                        {/*<div className='count'>*/}
                                        {/*    <div className='decin' onClick={()=>IncRoom1(flightOpen,price,hotel.hotel_id)}>+</div>*/}
                                        {/*    <div>  {hotel.hotel_id===selectedHotelId ? roomCounter1(price?.roomTypeId):0}</div>*/}
                                        {/*    <div className='decin' onClick={()=>decRoom1(price?.roomTypeId)}>-</div>*/}
                                        {/*</div>*/}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <div className="closeModal d-flex justify-content-end mt-2 ps-2 w-100" onClick={()=>setShow(false)}>
            <svg width="35" height="35" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="23.1287" cy="23.0799" rx="17.2108" ry="17.2537" stroke="#ff0000" strokeWidth={2} />
                <path d="M17.3906 28.8301L28.8645 17.3276" stroke="#ff0000" strokeWidth={2} />
                <path d="M28.8633 28.8301L17.3894 17.3276" stroke="#ff0000" strokeWidth={2} />
            </svg>
        </div> */}
                    {/*<div onClick={() =>{setShow(false)}} className="ic-close position-absolute cursor-pointer" style={{ left: "15px", top: "15px" ,width:'30px',height:'30px',border:'2px solid #e20000',borderRadius:'5px',color:'#e20000',display:'flex',justifyContent:"center",alignItems:'center'}}>*/}
                    {/*x*/}
                    {/*</div>*/}
                    {/*<div className="d-flex flex-wrap col-xl-12 col-lg-12 col-12 w-100 mt-4 py-4">*/}
                    {/*    <div className="text d-flex flex-column align-items-center w-100 px-2 mb-2">*/}
                    {/*        <p className="text-center font-yekan font-bold font-size-14 mb-0">*/}
                    {/*            با تشکر از انتخاب شما*/}
                    {/*            لطفا جهت رزرو تور با شماره تلفن:<div className="d-flex justify-content-center ltr text-right px-2"><a style={{color:'black'}} href='tel:02184278'>021-84278</a></div>تماس حاصل فرمایید*/}
                    {/*        </p>*/}
                    {/*        <span className="text-center font-yekan font-bold font-size-14 py-2">یا</span>*/}
                    {/*        <p className="text-center font-yekan font-bold font-size-14">*/}
                    {/*            جهت تماس با شما از طریق کارشناسان  بلبطجا اطلاعات درخواستی زیر را تکمیل و ارسال فرمایید.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*    <div className="in-data w-75 d-flex flex-column align-items-stretch justify-content-center m-auto mb-2">*/}
                    {/*        <label htmlFor="" className="pb-2 font-yekan font-bold">شماره تلفن همراه</label>*/}
                    {/*        <div className='form-input-border'>*/}
                    {/*            <PrimaryTextInput type="text" value={packData.number} onChange={e => valueHandler(e)} name="number" className="w-100 px-2 rounded-3 border-secondary font-yekan" placeholder="شماره همراه خود را وارد کنید" style={{ height: "40px", outline: "none" }} />*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*        <div className="bedcount-container">*/}
                    {/*            <div className="bedcount">*/}
                    {/*                /!*<label htmlFor="" className="pb-2 font-yekan font-bold">تعداد مسافر</label>*!/*/}
                    {/*                /!*<select className="w-100 px-2 rounded-3 border-secondary" value={packData.count} onChange={e => valueHandler(e)} name="count" id="" style={{ height: "40px", outline: "none" }}>*!/*/}
                    {/*                /!*    <option value="1">1</option>*!/*/}
                    {/*                /!*    <option value="2">2</option>*!/*/}
                    {/*                /!*    <option value="3">3</option>*!/*/}
                    {/*                /!*    <option value="4">4</option>*!/*/}
                    {/*                /!*    <option value="5">5</option>*!/*/}
                    {/*                /!*    <option value="6">6</option>*!/*/}
                    {/*                /!*    <option value="7">7</option>*!/*/}
                    {/*                /!*    <option value="8">8</option>*!/*/}
                    {/*                /!*    <option value="9">9</option>*!/*/}
                    {/*                /!*</select>*!/*/}

                    {/*                <div className='passengercount'>*/}
                    {/*                    <p style={{fontSize:'14px',margin:'0',padding:'0',textAlign:'center',marginBottom:'8px'}}>تعداد بزرگسال</p>*/}
                    {/*                    <div className='count'>*/}

                    {/*                        <div className="decin" onClick={()=>passcount('adl','inc')}>*/}
                    {/*                            +*/}
                    {/*                        </div>*/}
                    {/*                        <p>{passsengerCount.adl}</p>*/}
                    {/*                        <div className="decin" onClick={()=>passcount('adl','dec')}>*/}
                    {/*                            -*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div> <div className='passengercount'>*/}
                    {/*                <p style={{fontSize:'14px',margin:'0',padding:'0',textAlign:'center',marginBottom:'8px'}}>تعداد کودک</p>*/}
                    {/*                <div className='count'>*/}

                    {/*                    <div className="decin" onClick={()=>passcount('chd','inc')}>*/}
                    {/*                        +*/}
                    {/*                    </div>*/}
                    {/*                    <p>{passsengerCount.chd}</p>*/}
                    {/*                    <div className="decin" onClick={()=>passcount('chd','dec')}>*/}
                    {/*                        -*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div> <div className='passengercount'>*/}
                    {/*                <p style={{fontSize:'14px',margin:'0',padding:'0',textAlign:'center',marginBottom:'8px'}}>تعداد نوزاد</p>*/}
                    {/*                <div className='count'>*/}

                    {/*                    <div className="decin" onClick={()=>passcount('inf','inc')}>*/}
                    {/*                        +*/}
                    {/*                    </div>*/}
                    {/*                    <p>{passsengerCount.inf}</p>*/}
                    {/*                    <div className="decin" onClick={()=>passcount('inf','dec')}>*/}
                    {/*                        -*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}



                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*    <div className="c-btn request-data my-3 font-yekan m-auto w-100 d-flex justify-content-center">*/}
                    {/*        <button style={{width:'130px',height:'50px',backgroundColor:'#069e2c !important'}} className={`ancher bg-success text-white font-size-13 py-2 px-4 rounded-3 mt-2 foc01`} onClick={()=> {*/}
                    {/*            dataHandler()*/}
                    {/*            posthog.capture("FormEndTourPackage",{HMNPhone:packData.number,HMNPassengerCount:packData.count})*/}
                    {/*            posthog.identify(packData.number)*/}
                    {/*        }}>*/}
                    {/*            درخواست رزرو*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>:<div>
                    <p style={{padding:0,margin:0}}>متاسفانه اتاقی یافت نشد.</p>
                </div>
            }
            {/*<NotifAlert/>*/}

            {/*${datatitle.endCity.name==='استانبول' && 'ist'} ${datatitle.endCity.name==='آنتالیا' && 'ayt'}*/}
        </div>



    );
}


export default RequestTour;
