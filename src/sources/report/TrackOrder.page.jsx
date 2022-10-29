import React, { useState } from 'react'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PrimaryTextInput from '../../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../../sources/component/PrimaryButton.component'
import globals from '../Global'
import { moneyFormat } from "../../Utils/SimpleTasks";

const TrackOrder = () =>{
        const [state,setState] = useState({
            trackRef:''
        })
    
    const checkTheRefrence = () => {
        fetch(`${globals.baseUrlNew}OnlinePay/api/onlinePay/reference/${state.trackRef}/1a157116-a01a-4027-ab10-74098ac63815`).then(res => res.json())
            .then(data => {
                setState({ ...state,...data })
                console.log(state)
                console.log(data)
            })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setState({
            [name]: value
        })
    }
        return (
            <div className="container-fluid mt-130">
                <div className="container">
                    <div className="d-flex align-items-center col-xl-12 col-lg-12 col-sm-12 mx-auto">
                        <div className="col-lg-3 details-order mt-4">
                            <div className="title-order d-flex align-items-center">
                                <FontAwesomeIcon className="color-textpill icon-size" icon={faCalendarCheck} />
                                <h2 className={'title-track-order'}>پیگیری خرید</h2>
                            </div>
                            <div className="row border-bottom-black-track">
                                <div className="col-lg-10 col-md-10 col-sm-10 col-10 text-right font-size-14">
                                    <p className="track-order-second-title">جهت پیگیری رزرو، کد 6 رقمی رفرنس را وارد نمایید و بروی دکمه جستجو  کلیک کنید</p>
                                </div>
                                <div className="w-100">
                                    <div className="col-md-10 form-input-border height-short-input">
                                        <PrimaryTextInput placeholder="رفرنس پیگیری" name="trackRef" onChange={(e)=>handleChange(e)} />
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                    <div className="form-input-border height-short-input without-focus">
                                        <PrimaryButton defaultValue={"جستجو"} onClick={() => {
                                            checkTheRefrence()
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className=" col-lg-9">
                                {
                                    state.referenceEbank ?
                                <div className="controller-table mt-3 scroller">
                                {/* head */}
                                <div className="thead">
                                  {/* <div className="head flex-5 m-flex-15"></div> */}
                                  <div className="head flex-7 m-flex-15">
                                    <span className="font-size-14 font-bold-iransanse">شناسه</span>
                                  </div>
                                  <div className="head flex-25 m-flex-50">
                                    <span className="font-size-14 font-bold-iransanse">نام و نام خانوادگی</span>
                                  </div>
                                  <div className="head flex-14 m-flex-20">
                                    <span className="font-size-14 font-bold-iransanse">موبایل</span>
                                  </div>
                                  <div className="head flex-14 m-flex-20">
                                    <span className="font-size-14 font-bold-iransanse">تاریخ</span>
                                  </div>
                                  <div className="head flex-14 m-flex-20">
                                    <span className="font-size-14 font-bold-iransanse">قیمت خرید</span>
                                  </div>
                                  <div className="head flex-14 m-flex-20">
                                    <span className="font-size-14 font-bold-iransanse">وضعیت</span>
                                  </div>
                                  <div className="head flex-14 m-flex-20">
                                    <span className="font-size-14 font-bold-iransanse">بانک</span>
                                  </div>
                                  <div className="head flex-14 m-flex-20">
                                    <span className="font-size-14 font-bold-iransanse">رفرنس</span>
                                  </div>
                                </div>
                                <div className="d-detail py-5">
                                    <div className="detail flex-7 m-flex-15">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.reqNo}</span>
                                    </div>
                                    <div className="detail flex-25 m-flex-50">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.nameFamily}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.mobileNo}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.dateTimeSabt}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && moneyFormat(state.referenceEbank.amount)} تومان</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.stat}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.bankName}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.reqPnr}</span>
                                    </div>
                                </div>
                            </div>:
                         <div className="col-lg-6 img">
                                    <img className="img-fluid-1" src="/Images/Exploring-pana.svg" height="350" width="100%" alt="" />
                                </div>
                        }
                            </div>

                    </div>
                </div>
            </div>
        )
    
}

export default TrackOrder
