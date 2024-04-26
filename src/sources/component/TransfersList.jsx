import React, {useEffect, useState} from 'react';
import {MiladiToJalaliConvertor, timeFixer} from "../../Utils/newTour";

const TransfersList = (props) => {
    const [widthMobi, setWidthMobi] = useState(
        typeof window !== "undefined" && getWindowSize()
    );
    function getWindowSize() {
        const { innerWidth } = window;
        return innerWidth;
    }
    useEffect(() => {
        function handleWindowResize() {
            setWidthMobi(getWindowSize());
        }
        window.addEventListener("resize", handleWindowResize);
    }, []);

    return (
        <>
            {
                widthMobi<868 &&
                <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'12px',marginBottom:'40px'}}>
                    <button style={{padding:'.725rem', backgroundColor:'#e20000',borderRadius:'10px',color:'white',fontSize:'15px'}} onClick={()=>{props.setShowTransfers(!props.showTransfers)}}>نمایش پرواز های بیشتر</button>
                </div>


            }


            {(props.showTransfers || widthMobi>868) &&
                <div className="left position-relative col-lg-5 col-lg-5 col-12 mb-1">
                    <div style={{display:'flex',columnGap:'7px',justifyContent:'center'}}>
                        <svg
                            style={{position:'relative',bottom:'3px'}}
                            viewBox="0 0 24 24"
                            // fill="#e20000"
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill='#e20000'
                        >
                            <g>
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"/>
                            </g>
                        </svg>
                    <p style={{textAlign:'center',fontSize:'14px',color:'#000',margin:'0',padding:'0',fontWeight:'700'}}>لطفا پرواز خود را انتخاب کنید.</p>

                    </div>

                    <div
                         style={{height: '50% !important',border:'1px solid #d4d4d4',borderRadius:'20px',padding:'10px'}}
                    >
                        <div className='header-left-container'>
                            {props.transfers&&props.transfers?.map((transfer,index)=>{
                                return(
                                    <div key={transfer.id.toString() + transfer.return_id.toString()} className={props.selectedFlight===transfer.id.toString() + transfer.return_id.toString()?'header activeflight':'header'} onClick={()=> {
                                        // hotelGen(transfer.id.toString() + transfer.return_id.toString(), index)
                                        props.setSelectedFlight(transfer.id.toString() + transfer.return_id.toString())
                                        props.setInfPrice(transfer.chd_price)
                                        props.setFlightId({
                                            depratureId: transfer.id,
                                            returnId: transfer.return_id
                                        })
                                    }}>
                                        {props.selectedFlight===transfer.id.toString() + transfer.return_id.toString()&&<div style={{
                                            position: 'absolute',
                                            left: '-2px',
                                            width: '5px',
                                            height: '85px',
                                            backgroundColor: '#e20000',
                                            top: '25px',
                                            borderRadius: '20px'
                                        }}></div>}
                                        <div className='flight-item' >
                                            <div className='airline-det' style={{borderLeft:'1px solid #d4d4d4'}}>
                                                {/*<div>*/}
                                                {/*    <div className='image-con'>*/}

                                                {/*        <img src={transfer.origin_airline_thumb.url} alt=""/>*/}
                                                {/*    </div>*/}
                                                {/*    <p>*/}
                                                {/*        {transfer.origin_airline}*/}
                                                {/*    </p>*/}
                                                {/*</div>*/}
                                                <div className='det'>
                                                    <div className='image-con'>
                                                        <img src={transfer.origin_airline_thumb.url} alt=""/>
                                                    </div>
                                                    {/*<p>{transfer.origin} </p>*/}
                                                    {/*<p>{transfer.origin}</p>*/}
                                                    <p>{transfer.origin_airline }</p>
                                                    <div style={{columnGap:'3px'}}>
                                                        <p style={{fontSize:'1px !important'}}>{timeFixer(transfer.origin_time)}</p>
                                                        <p>
                                                            {MiladiToJalaliConvertor(transfer.origin_date)}
                                                        </p>
                                                    </div>
                                                    {/*<div className='flight-number'>*/}
                                                    {/*    <p>ش.پ (رفت) :</p>*/}
                                                    {/*    <p>{transfer.origin_flight_number}</p>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                            <div className='middle-det'>
                                                {/*<div className='cap'>*/}
                                                {/*    <p>{transfer.capacity}</p>*/}
                                                {/*</div>*/}
                                                <div className='f'>
                                                    <div>
                                                        <div className='separator'>
                                                            <div className='dot'></div>
                                                            <div className='dash' ></div>
                                                            <div  className='flightlogo'>
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
                                                        <div className='separator'>
                                                            <div className='flightlogo'>
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
                                                            <div className='dash'></div>

                                                            <div className='dot'></div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='airline-det' style={{borderRight:'1px solid #d4d4d4'}}>
                                                <div className='det'>
                                                    <div className='image-con'>
                                                        <img src={transfer.destination_airline_thumb.url} alt=""/>
                                                    </div>
                                                    {/*<p>{transfer.destination} </p>*/}
                                                    {/*<p>{transfer.destination}</p>*/}
                                                    <p>{transfer.destination_airline}  </p>

                                                    <div >
                                                        <p>{timeFixer(transfer.destination_time)}</p>
                                                        <p>
                                                            {MiladiToJalaliConvertor(transfer.destination_date)}
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

                                            {/*<div className='show-det'>*/}
                                            {/*    <button > مشاهده جزییات</button>*/}
                                            {/*</div>*/}
                                        </div>

                                    </div>
                                )
                            })}



                        </div>

                    </div>
                </div>

            }
        </>
    );
};

export default TransfersList;
