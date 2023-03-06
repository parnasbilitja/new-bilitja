import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { moneyFormat } from '../../Utils/SimpleTasks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
const HotelsDetails = ({pack,data,setPackData,setShow}) => {
    const [width, setWidth] = useState(0)
    const [seeMore, setSeeMore] = useState(false);
    useEffect(()=>{
        setWidth(window.innerWidth)
        setTimeout(() => {
            
            if (width>=826) {
                setSeeMore(true)
            }
        }, 100);
    },[])
    return (
        <div>
            {width<=826 &&
                    <div className="d-flex justify-content-center my-2 font-bold-iransanse" style={{color:'#279692',alignItems:"center"}} onClick={()=>setSeeMore(!seeMore)}><span className='font-bold-iransanse'>{' '}مشاهده جزئیات بیشتر{' '}</span><FontAwesomeIcon className="font-bold-iransanse" icon={faAngleDown} /></div>
                }
                <div className={`${seeMore?'position-relative d-flex flex-wrap align-items-center bg-white py-2 px-2 mb-2':'d-none' }`}>
                <div className="c-detail">
                    <div className="info-price position-relative d-flex align-items-start mx-2">
                        <div className="text d-flex flex-column align-items-center w-100 py-3">
                            <span className="text-show-m mb-2 color-base-color font-bold d-none">دو تخته (هر نفر)</span>
                            {data.defineTour && <span className="font-size-13 font-bold color-gray">{moneyFormat(pack.prices.twinRate)} تومان</span>}
                            {!data.defineTour && <span className="font-size-14 font-bold color-gray">{moneyFormat(pack.prices.twin)} {pack.rate.name}</span>}
                            {/* <span className="font-font-size-16 font-bold">تومان</span> */}
                        </div>
                    </div>
                </div>
                {data && data.type && <>
                    <div className="c-detail">
                        <div className="info-price position-relative d-flex align-items-start mx-2">
                            <div className="text d-flex flex-column align-items-center w-100 py-3">
                                <span className="text-show-m mb-2 color-base-color font-bold d-none">سه تخته (هر نفر)</span>
                                {data.defineTour && <span className="font-size-13 font-bold color-gray"> {moneyFormat(pack.prices.tripleRate)} تومان</span>}
                                {!data.defineTour && <span className="font-size-14 font-bold color-gray">{moneyFormat(pack.prices.triple)} {pack.rate.name}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="c-detail">
                        <div className="info-price position-relative d-flex align-items-start mx-2">
                            <div className="text d-flex flex-column align-items-center w-100 py-3">
                                <span className="text-show-m mb-2 color-base-color font-bold d-none">چهار تخته (هر نفر)</span>
                                {data.defineTour && <span className="font-size-13 font-bold color-gray"> {moneyFormat(pack.prices.quadRate)} تومان</span>}
                                {!data.defineTour && <span className="font-size-14 font-bold color-gray">{moneyFormat(pack.prices.quad)} {pack.rate.name}</span>}
                            </div>
                        </div>
                    </div>
                </>
                }
                {data && !data.type &&
                    <div className="c-detail">
                        <div className="info-price position-relative d-flex align-items-start mx-2">
                            <div
                                className="text d-flex flex-column align-items-center w-100 py-3">
                                <span className="text-show-m mb-2 color-base-color font-bold d-none"> سینگل</span>
                                {data.defineTour && <span className="font-size-13 font-bold color-gray"> {moneyFormat(pack.prices.singleRate)} تومان</span>}
                                {!data.defineTour && <span className="font-size-14 font-bold color-gray">{moneyFormat(pack.prices.single)} {pack.rate.name}</span>}
                            </div>
                        </div>
                    </div>
                }
                {data && !data.type &&
                    <div className="c-detail">
                        <div className="info-price position-relative d-flex align-items-start mx-2">
                            <div className="text d-flex flex-column align-items-center w-100 py-3">
                                <span className="text-show-m mb-2 color-base-color font-bold d-none">کودک با تخت</span>
                                {data.defineTour && <span className="font-size-13 font-bold color-gray"> {moneyFormat(pack.prices.cwbRate)} تومان</span>}
                                {!data.defineTour && <span className="font-size-14 font-bold color-gray">{moneyFormat(pack.prices.cwb)} {pack.rate.name}</span>}
                            </div>
                        </div>
                    </div>
                }
                <div className="c-detail">
                    <div className="info-price position-relative d-flex align-items-start mx-2">
                        <div className="text d-flex flex-column align-items-center w-100 py-3">
                            <span className="text-show-m mb-2 color-base-color font-bold d-none">کودک بدون تخت</span>{console.log(pack.prices.cnb)}
                            <span className="font-size-14 font-bold color-gray">{undefined == undefined?'--': pack.prices.cnb?.includes(',') == true ?`${pack.prices.cnb} تومان`: `${moneyFormat(`${pack.prices.cnb}0`)}تومان` } </span>
                        </div>
                    </div>
                </div>
                <div className="c-detail child-number d-flex flex-column text-center ml-3 py-3">
                    <span className="text-show-m mb-2 color-base-color font-bold d-none">سن کودک</span>
                    <span className="font-size-16 font-bold color-gray">{pack.prices.age}</span>
                </div>
                <div className="c-btn request-data">
                    <button className="ancher text-white font-size-13 py-2 px-4 rounded-3 mt-2" style={{backgroundColor:'#279692'}} onClick={() => { setShow(true); setPackData({ tourId: pack.id });  }}>
                        درخواست رزرو
                    </button>
                </div>
                </div>
        </div>
    );
};

export default HotelsDetails;