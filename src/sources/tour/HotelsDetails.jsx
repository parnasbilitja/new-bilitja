import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { moneyFormat, moneyFormatrial } from '../../Utils/SimpleTasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {Err, NotifAlert} from "../../Components/NewTours/Components/NotifAlert.component";
// import {usePostHog} from "posthog-js/react";
import {set} from "react-hook-form";
import {getcurrencyfa, numberWithCommas} from "../../Utils/newTour";

const HotelsDetails = ({setIsReserve,hotel,pack,data,setPackData,setShow,currency,infPrc,cwb,setHotel,flightId}) => {
    const [width, setWidth] = useState(0)
    const [seeMore, setSeeMore] = useState(true);
    useEffect(()=>{
        setWidth(window.innerWidth)
        setTimeout(() => {
            if (width>=826) {
                setSeeMore(true)
            }
        }, 100);
    },[])

    // const posthog=usePostHog()

    useEffect(()=>{
        if (flightId){

      getHotelRooms(pack)
        }

        // console.log(flightId)
    },[flightId,pack])

    const[rooms,setRooms]=useState([])
    const getHotelRooms= (roomsArr)=>{


                if(data?.is_bundle===true){
                    setRooms(roomsArr)

                    // foundRoom=roomsArr.filter(room=>room.id===roomTypeID)

                }else{
                    // debugger
                    let foundrooms=roomsArr.filter(room=>(room.flight_id.toString()+room.return_flight_id.toString())===flightId)

                    setRooms(foundrooms)
                    // foundRoom=rooms.filter(room=>room.roomTypeId===roomTypeID)

                }



    }

    const roomFinder=(roomTypeID)=>{
        // debugger
        // let foundRoom

        return rooms.filter(room=>room.roomTypeId===roomTypeID)

    }

    //
    // useEffect(()=>{
    //     console.log(cwb)
    // },[cwb])

    return (
        <div className={width<=826 ? 'w-100' : 'p-data w-100'}>



            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',justifyContent:'center'}}
            className={'w-100 bg-white py-2 px-2 hidden-desktop'}>
                <div className="c-detail">
                    <div className="info-price position-relative d-flex align-items-start ">
                        <div className="text w-100 py-3">


                            {
                                roomFinder(148)[0]?.price?
                                    <>
                                        <p
                                            className="font-size-16 font-bold  m-0 price-color" style={{fontWeight:'bold'}}>{moneyFormatrial(roomFinder(148)[0]?.price)}

                                            <span className="font-size-14 font-bold px-1  m-0 color-gray">
                                {!data.is_bundle?'تومان':getcurrencyfa(currency)}
                            </span>
                                        </p>

                                        {/*<p className="px-2 font-size-13 m-0 text-center font-blue text-center"> {getcurrencyfa(currency) } </p>*/}
                                    </>:
                                    <span className="font-bold font-size-13 font-bold color-gray"> عدم موجودی</span>

                            }



                        </div>
                    </div>
                </div>


                <div className="c-detail">
                    <div className="info-price position-relative d-flex align-items-start ">
                        <div
                            className="text w-100 py-3">

                            <>
                                {roomFinder(494)[0]?.price? <>

                                        <p
                                            className="font-size-16 font-bold  m-0 mx-1 price-color" style={{fontWeight:'bold'}}>{moneyFormatrial(roomFinder(494)[0].price)}


                                            <span className="font-size-14 font-bold px-1  m-0 color-gray">
                                {!data.is_bundle?'تومان':getcurrencyfa(currency)}
                            </span>
                                        </p>
                                        {/*<p className="px-2 font-size-13 m-0 text-center font-blue"> {getcurrencyfa(currency) } </p>*/}

                                </>:

                                    <span className="font-bold font-size-13 font-bold color-gray">عدم موجودی</span>
                                }





                                </>


                        </div>
                    </div>
                </div>


                <div className="c-detail">
                    <div className="info-price position-relative ">
                        <div className="text w-100 py-3">
                            {data?.is_bundle?
                                <>
                                    <p className="font-size-16 font-bold  m-0 price-color" style={{fontWeight:'bold'}}>{'0' }
                                        <span className="font-size-14 font-bold  m-0 color-gray px-1">
                                {getcurrencyfa(currency)}
                            </span>
                                    </p>
                                    {/*<p className="px-2 font-size-13 m-0 text-center font-blue"> {getcurrencyfa(currency) } </p>*/}
                                </>  :

                                <>{roomFinder(148)[0]?.chd_w_price?
                                    <p className="font-size-16 font-bold  m-0 price-color"
                                       style={{fontWeight: 'bold'}}>{data.is_bundle ? '0' : moneyFormatrial(roomFinder(148)[0]?.chd_w_price)}
                                        <span className="font-size-14 font-bold  m-0 color-gray px-1">

                                            {getcurrencyfa(currency)}
                            </span>
                                    </p>:                                <span className="font-bold font-size-13 font-bold color-gray"> عدم موجودی</span>
                            }
                                    {/*<p className="px-2 font-size-13 m-0 text-center font-blue"> {getcurrencyfa(currency) } </p>*/}
                                </>
                            }



                        </div>
                    </div>
                </div>

                <div className="c-detail">
                    <div className="info-price position-relative d-flex align-items-start ">
                        <div className="text w-100 py-3">
<>
    {data.is_bundle ? <>
        {
             <>{infPrc?

                 <p className="font-size-16 m-0 price-color" style={{fontWeight: 'bold'}}>{numberWithCommas(infPrc)}

                     <span className="font-size-14 font-bold  m-0 color-gray px-1">
                                {getcurrencyfa(currency)}
                            </span>
                 </p>:<span className="font-bold font-size-13 font-bold color-gray"> عدم موجودی</span>
             }
                    {/*<p className="px-2 font-size-13 m-0 text-center font-blue">{getcurrencyfa(currency) }</p>*/}

                </>
        }

    </>: <>

        {
           ( roomFinder(148)[0]?.chd_n_price) ?<>

                    <p className="font-size-16 m-0 price-color" style={{fontWeight:'bold'}}>{moneyFormatrial(roomFinder(148)[0]?.chd_n_price)}

                        <span className="font-size-14 font-bold  m-0 color-gray px-1">
                                {!data.is_bundle?'تومان':getcurrencyfa(currency)}
                            </span>
                    </p>
                    {/*<p className="px-2 font-size-13 m-0 text-center font-blue">{getcurrencyfa(currency) }</p>*/}
                </>:
                <span className="font-bold font-size-13 font-bold color-gray"> عدم موجودی</span>
        }


    </> }

</>


                        </div>
                    </div>
                </div>
                {/*<div className="c-detail child-number d-flex text-center ml-3 py-3">*/}

                {/*    <span className="font-size-16 font-bold ">{hotel?.child_age? hotel?.child_age :'---'}</span>*/}
                {/*</div>*/}
                {/*<div className=" w-100 c-btn d-flex justify-content-center align-items-center  request-data position-relative" style={{right:'30px'}} >*/}
                {/*    <button className="ancher text-white font-size-13 py-2 px-3 rounded-3 me-2"*/}
                {/*            style={{backgroundColor: '#069e2c',height:"50px",whiteSpace:'nowrap',width:'47%',fontSize:'200px'}} onClick={() => {*/}
                {/*        setShow(true);*/}
                {/*        // posthog.capture("TourPackageHotelSelect")*/}
                {/*        // setPackData({tourId: pack.id});*/}
                {/*        setHotel(hotel)*/}

                {/*    }}>*/}
                {/*        اتاق های بیشتر*/}
                {/*    </button>*/}

                {/*    <button className="ancher text-white font-size-13 py-2 px-3 rounded-3  me-2"  onClick={()=> {*/}
                {/*        setIsReserve(true)*/}
                {/*        setHotel(hotel)*/}
                {/*    }} style={{backgroundColor: '#e20000',whiteSpace:'nowrap',height:"50px",width:'80%',fontWeight:'800'}}>*/}

                {/*    <p style={{fontSize:'20px',margin:0,padding:0,letterSpacing:'1px'}}>رزرو</p>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

        </div>
    );
};

export default HotelsDetails;
