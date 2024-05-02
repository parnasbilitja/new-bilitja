import React, {useEffect, useState} from 'react'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PrimaryTextInput from '../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../sources/component/PrimaryButton.component'
// import globals from '../sources/Global'
import Table from '../sources/component/Table'
import NavHandler from '../Components/share/NavHandler'
import Footer from '../sources/component/Footer.component'
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh'
import { tableData, tableData2 } from '../Utils/data'
import Head from "next/head";
import axios from "axios";
import {
    isEmpty,
    jalaliToMiladiConvertor,
    MiladiToJalaliConvertor,
    MiladiToJalaliConvertorInc,
    startBuilder,
    timeFixer
} from "../Utils/newTour";
import {useRouter} from "next/router";
import moment from "moment-jalaali";
import styles from '../../styles/TrackOrder.module.scss'
import {ErrSuccess} from "../Components/NewTours/Components/NotifAlert.component";
const TrackOrder = () =>{
        const [state,setState] = useState({
            trackRef:'',
            err:'لطفا کد پیگیری را وارد کنید ',
            errSate:false
        })
    const [tourState,setTourState] = useState({
            trackRef:'',
            err:'لطفا کد پیگیری را وارد کنید ',
            errSate:false
        })
    const [tour,setTour] = useState([])

    const checkTheRefrence = () => {
        state.trackRef !== '' ?
        fetch(`${globals.baseUrlNew}OnlinePay/api/onlinePay/reference/${state.trackRef}/1a157116-a01a-4027-ab10-74098ac63815`).then(res => res.json())
            .then(data => {
                setState({ ...state,...data })
            }):setState({...state,errSate:true})
    }
    const checkTourRefrence = () => {
            // debugger
        axios.get(
            `https://api.hotelobilit.com/api/v2/reserves/${tourState?.trackRef
            }`,
            {
                headers: {
                    "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
                }
            }
        ).then(res=>{
            // console.log(res.data.data)
           setTour(res.data.data)
            // setHoteldet(res?.data);
        })
    }
    const router=useRouter()
    const handleChange = (e) => {
        const { name, value } = e.target
        state.trackRef == '' && setState({...state,errSate:true})
        setState({...state,errSate:false,[name]: value})
    }
    const tourhandleChange = (e) => {
        const { name, value } = e.target
        // console.log(value)
        tourState.trackRef == '' && setTourState({...tourState,errSate:true})
        setTourState({...tourState,errSate:false,[name]: value})
    }
// useEffect(()=>{
//     // console.log(tour)
// },[tour])
    const statusColor=(color)=>{
switch (color) {
    case 'danger':
        return '#e20000'
    case 'success':
        return '#5cb85c'
    case 'info':
        return '#e20000'

}
    }

    const printVoucher=(refcode)=>{
        axios.get(`https://api.hotelobilit.com/api/v2/reserves/voucher/${refcode}`,{},{
            headers: {
                "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
            }
        }).then(res=>{
            // console.log(res)
        })
    }

    const buttonrender=(status)=>{
            // debugger
            switch (status.id) {
                case 501:
                    return <button onClick={()=>{
                            router.push(
                                `/tour/reserve/${tour.hotel.id}/${tour?.flight?.departure?.id}/${tour?.flight?.return?.id}?checkin=${tour?.hotel?.checkin}&checkout=${tour?.hotel?.checkout}&ref_code=${tour?.information?.ref_code}`
                            );
                        }
                        } style={{backgroundColor:statusColor(status.color),color:'white',padding:'10px 15px',borderRadius:'5px'}}>{`صفحه ${status?.label}`}</button>


                case 502:
                    return  <button onClick={()=>{

                        let staycount= moment(tour?.hotel?.checkout).diff(tour?.hotel?.checkin, "days")
                        router.push(`/tour/reserve/reserveconfirmation/${tour.hotel.id}?ref_code=${tour?.information?.ref_code}&staycount=${staycount}`);
                    }

                    } style={{backgroundColor:statusColor(status.color),color:'white',padding:'10px 15px',borderRadius:'5px',whiteSpace:'nowrap'}}>{`صفحه ${status?.label}`}</button>

                case 470:
                    return <>

                    </>
                case 471:
                    return <div>


                        <button style={{backgroundColor:'green',color:'white',padding:'10px 15px',borderRadius:'5px',whiteSpace:'nowrap'}}>پرداخت</button>                    </div>
                case 472:
                    return <div>
                        <button onClick={()=>{
                            printVoucher(tour?.information.ref_code)
                        }}  style={{backgroundColor:'#e20000',color:'white',padding:'10px 15px',borderRadius:'5px',whiteSpace:'nowrap'}}>چاپ ووچر</button>                    </div>
            }

    }
    return (
        <div >
            <Head>
                <title> پیگیری خرید | بلیطجا</title>
            </Head>
            <NavHandler/>
            <div style={{marginTop:'140px'}}>
            <Scrolltoprefresh />
<div className={styles['trackordercontainer']}>

    <div className={styles['track-con']}>
    <div className={styles['track']}>
        <div className={styles['track-title']}>
            <FontAwesomeIcon className="color-textpill icon-size" icon={faCalendarCheck} />
            <h2 >پیگیری خرید تور</h2>
            {/*className={'title-track-order'}*/}
        </div>
        <div className={styles['track-input-con']}>
            <div className={styles['track-desc']}>
                <p>جهت پیگیری رزرو، کد 6 رقمی رفرنس را وارد نمایید و بروی دکمه جستجو  کلیک کنید</p>
            </div>
            <div className={styles['track-input']}>
                <div style={{width:'320px',border:'1px solid #cecece',borderRadius:"5px",overflow:'hidden'}} >
                    <PrimaryTextInput placeholder="رفرنس پیگیری" name="trackRef" onChange={(e)=>tourhandleChange(e)} />
                    <span className='text-danger font-bold'>{state.errSate? state.err:state.message== 'OK' ?'' :state.message}</span>
                </div>
                <div className={styles['buttoncon']}>

                        <PrimaryButton  defaultValue={"جستجو"} onClick={() => {checkTourRefrence()}} >{"جستجو"}</PrimaryButton>

                </div>
            </div>

        </div>
    </div>
    </div>
    <div>

    <div className={styles['track-con']}>

    <div className={styles['track']}>
        <div className={styles['track-title']}>
            <FontAwesomeIcon className="color-textpill icon-size" icon={faCalendarCheck} />
            <h2 >پیگیری خرید</h2>
        </div>
        <div className={styles['track-input-con']}>
            <div className={styles['track-desc']}>
                <p >جهت پیگیری رزرو، کد 6 رقمی رفرنس را وارد نمایید و بروی دکمه جستجو  کلیک کنید</p>
            </div>
            <div className={styles['track-input']}>
                <div style={{width:'320px',border:'1px solid #cecece',borderRadius:"5px",overflow:'hidden'}}>
                    <PrimaryTextInput placeholder="رفرنس پیگیری" name="trackRef" onChange={(e)=>handleChange(e)} />
                    {/*<span className='text-danger font-bold'>{state.errSate? state.err:state.message== 'OK' ?'' :state.message}</span>*/}
                </div>
                <div>
                    <div className={styles['buttoncon']}>
                        <PrimaryButton defaultValue={"جستجو"} onClick={() => {checkTheRefrence()}} >{"جستجو"}</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>


    </div>




</div>

                { !isEmpty(tour)&&
                    <div style={{display:'flex', width:'100%',justifyContent:'center',padding:'0 80px',marginBottom:'40px'}}>
                        <div className={styles['tourDetailsContainer']}>
                            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)' ,height:'30px',width:'100%',backgroundColor:'rgba(86,152,189,0.29)',padding:'0 10px',fontSize:'14px',fontWeight:'700',alignItems:'center',justifyContent:'space-between'}}>
                                <p style={{margin:'0',padding:'0',textAlign:'center'}}>اطلاعات پرواز</p>
                                <p style={{margin:'0',padding:'0',textAlign:'center'}}>اطلاعات هتل</p>
                                <p style={{margin:'0',padding:'0',textAlign:'center'}}>وضعیت</p>
                            </div>
                            <div style={{padding:'10px', display:'grid',width:'100%',gridTemplateColumns:'repeat(3,1fr)'}}>

                                <div className={styles['flight-item']} style={{padding:'10px' }}>
                                    <div className={styles['airline-det']} style={{borderLeft:'1px solid #d4d4d4'}}>
                                        {/*<div>*/}
                                        {/*    <div className='image-con'>*/}

                                        {/*        <img width={'20px'} height={'20px'} src={tour?.flights?.departure?.airline_logo?.url} alt=""/>*/}
                                        {/*    </div>*/}
                                        {/*    <p>*/}
                                        {/*        {tour.flights.departure?.origin_airline}*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}
                                        <div className={styles['det']}>
                                            <div className={styles['image-con']}>
                                                <img width={'20px'} height={'20px'} src={tour?.flights?.departure?.airline_logo?.url} alt=""/>
                                            </div>
                                            <p>{tour?.flights?.departure?.origin_name}</p>
                                            {/*<p>{transfer.origin}</p>*/}
                                            {/*<p>{transfer.origin_airline }</p>*/}
                                            <div style={{columnGap:'3px'}}>
                                                <p style={{fontSize:'14px !important'}}>{timeFixer(tour?.flights?.departure?.time)}</p>
                                                <p>
                                                    {MiladiToJalaliConvertor(tour?.flights?.departure?.date)}
                                                </p>
                                            </div>
                                            {/*<div className='flight-number'>*/}
                                            {/*    <p>ش.پ (رفت) :</p>*/}
                                            {/*    <p>{transfer.origin_flight_number}</p>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className={styles['middle-det']}>
                                        <div className='cap'>
                                            <p style={{padding:'0',margin:'0'}}>{tour?.flights?.return.capacity}</p>
                                        </div>
                                        <div className={styles['f']}>
                                            <div>
                                                <div className={styles['separator']}>
                                                    <div className={styles['dot']}></div>
                                                    <div className={styles['dash']} ></div>
                                                    <div  className={styles['flightlogo']}>
                                                        {/*<img src="../../../Images/flightlogo" alt=""/>*/}
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30"
                                                            height="30"
                                                        >
                                                            <g>
                                                                <path d="M0 0h24v24H0z" fill="none"/>
                                                                <path
                                                                    d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"/>
                                                            </g>
                                                        </svg>

                                                        {/*<svg viewBox="0 0 24 24" fill="#e20000"  width="30" height="30" style="transform: rotate(270deg);"><g><path d="M0 0h24v24H0z" fill="none"></path><path d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"></path></g></svg>*/}
                                                    </div>
                                                </div>

                                                {/*<div>*/}
                                                {/*    <p style={{textAlign:'center',color:'#e20000', fontSize:'14px',padding:'0',margin:'0',fontWeight:700}}>*/}
                                                {/*        {data.nightNum} شب و  {data.dayNum} روز*/}
                                                {/*    </p>*/}
                                                {/*</div>*/}
                                                <div className={styles['separator']}>
                                                    <div className={styles['flightlogo']}>
                                                        {/*<img src="../../../Images/flightlogo" alt=""/>*/}
                                                        <svg
                                                            style={{transform: "rotate(-270deg)",position:'relative',top:'3px'}}
                                                            viewBox="0 0 24 24"
                                                            // fill="#e20000"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="30"
                                                            height="30"
                                                        >
                                                            <g>
                                                                <path d="M0 0h24v24H0z" fill="none"/>
                                                                <path
                                                                    d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"/>
                                                            </g>
                                                        </svg>

                                                        {/*<svg viewBox="0 0 24 24" fill="#e20000"  width="30" height="30" style="transform: rotate(270deg);"><g><path d="M0 0h24v24H0z" fill="none"></path><path d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"></path></g></svg>*/}
                                                    </div>
                                                    <div className={styles['dash']}></div>

                                                    <div className={styles['dot']}></div>
                                                </div>


                                            </div>
                                        </div>

                                        {/*<div className='show-det'>*/}
                                        {/*    <button > مشاهده جزییات</button>*/}
                                        {/*</div>*/}

                                    </div>
                                    <div className={styles['airline-det']} style={{borderRight:'1px solid #d4d4d4'}}>
                                        <div className={styles['det']}>
                                            <div className={styles['image-con']}>
                                                <img src={tour?.flights?.return?.airline_logo?.url} alt=""/>
                                            </div>
                                            <p style={{whiteSpace:'nowrap'}}>{tour?.flights?.return.destination_name} </p>


                                            <div style={{columnGap:'3px'}}>
                                                <p style={{fontSize:'14px !important'}}>{timeFixer(tour?.flights?.return?.time)}</p>
                                                <p>
                                                    {MiladiToJalaliConvertor(tour?.flights?.return?.date)}
                                                </p>
                                            </div>

                                            {/*<div className='flight-number'>*/}
                                            {/*    <p>ش.پ (برگشت) :</p>*/}
                                            {/*    <p>{transfer.destination_flight_number}</p>*/}
                                            {/*</div>*/}
                                        </div>
                                        {/*<div>*/}
                                        {/*    <div className='image-con'>*/}

                                        {/*        <img src={transfer.origin_airline_thumb.url} alt=""/>*/}
                                        {/*    </div>*/}
                                        {/*    <p>*/}

                                        {/*        {transfer.destination_airline}*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}

                                    </div>

                                </div>
                                <div style={{margin:'10px 0',display:'flex',columnGap:'20px',padding:'10px 20px'}}>
                                    <div style={{width:'180px',height:'190px',overflow:'hidden',borderRadius:'20px'}}>
                                        <img width='100%' height='100%' src={tour?.hotel?.thumbnail.url} alt=""/>
                                    </div>
                                    <div >
                                        <div style={{fontSize:'13px',fontWeight:'700'}}>
                                            <div style={{marginBottom:'5px'}}>{startBuilder(tour?.hotel?.stars)}</div>
                                            <p style={{padding:'0',margin:'0'}}>{tour?.hotel?.titleEn}</p>
                                            <p style={{fontSize:'10px !important',fontWeight:'500',padding:'0',margin:'0'}}>{tour?.hotel?.title}</p>
                                        </div>
                                        <div style={{display:'flex',fontSize:'14px',fontWeight:'700',columnGap:'10px',marginTop:'15px',width:'100%',height:'40px',backgroundColor:'#cecece',borderRadius:'20px',justifyContent:'center',alignItems:'center'}}>
                                            <p style={{fontSize:'10px !important',fontWeight:'500',padding:'0',margin:'0'}}>تاریخ ورود:</p>
                                            <p style={{padding:'0',margin:'0'}}>{MiladiToJalaliConvertor(tour?.hotel?.checkin)}</p>
                                        </div>  <div  style={{display:'flex',fontSize:'14px',fontWeight:'700',columnGap:'10px',marginTop:'15px',width:'100%',height:'40px',backgroundColor:'#cecece',borderRadius:'20px',justifyContent:'center',alignItems:'center'}}>
                                        <p style={{fontSize:'10px !important',fontWeight:'500',padding:'0',margin:'0'}}>تاریخ خروج:</p>
                                        <p style={{padding:'0',margin:'0'}}>{MiladiToJalaliConvertor(tour?.hotel?.checkout)}</p>
                                    </div>
                                    </div>
                                </div>



                                    <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>

                                        <div style={{display:'flex',fontSize:'14px',fontWeight:'700',justifyContent:'center'}}>
                                            <p style={{fontSize:'10px !important',fontWeight:'500',padding:'0',margin:'0'}}>تاربخ درخواست :</p>
                                            <p style={{padding:'0',margin:'0',whiteSpace:'nowrap',color:statusColor(tour?.information?.status?.color),fontWeight:'700'}}>{MiladiToJalaliConvertorInc(moment(tour?.information.created_at).format('YYYY/MM/DD'))  }</p>
                                        </div>
                                        <div style={{display:'flex',fontSize:'14px',fontWeight:'700',columnGap:'10px',width:'100%',justifyContent:'center',flexWrap:'nowrap'}}>
                                            <p style={{fontSize:'10px !important',fontWeight:'500',padding:'0',margin:'0'}}>وضعیت :</p>
                                            <p style={{padding:'0',margin:'0',whiteSpace:'nowrap',color:statusColor(tour?.information?.status?.color),fontWeight:'700'}}>{tour?.information?.status?.label}</p>
                                        </div>
                                        <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',justifyContent:'end'}}>

                                            <div style={{width:'100%',display:'flex',justifyContent:'center',columnGap:'20px'}}>

                                            {
                                                buttonrender(tour?.information?.status)
                                            }
                                            </div>


                                        </div>


                                </div>
                            </div>









                        </div>

                    </div>

                }

                <div className="container px-0">
                    <div className="col-12">
                        {state.referenceEbank ?
                            <div className="justify-content-center">
                                <Table tableData={tableData} state={state.referenceEbank} />
                                {state.referenceFlight.length >0 &&
                                    <Table tableData={tableData2} state={state.referenceFlight[0]} />
                                }
                            </div>
                            :<div className="col-12 img me-auto">
                                <img className="img-fluid-1" src="/Images/Exploring-pana.svg" height="350" width="100%" alt="" />
                            </div>}
                    </div>
                </div>

                </div>
            <Footer/>
        </div>
    )
}
export default TrackOrder
