import React from 'react'
import Image from 'next/image'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import HotelView from '../../../public/images/hotel_view.jpg'
import { withRouter } from 'react-router-dom'

const AccommodationListDesktop = ({ history, accommodationList }) => {
    return (
        <div className="hidden-xs">
            {
                accommodationList ?
                    accommodationList.map(accommodation => {
                        let highest = 0
                        accommodation.Rooms.forEach(room => {
                            if(room.StartPrice > highest) {highest= room.StartPrice} 
                        }, {
                            amount: Number.MIN_SAFE_INTEGER
                        })
                        return (
                            <div className="hotel_row">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <img src='../../../public/images/hotel_view.jpg' />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                                        <div className="row">
                                            <div className="col-lg-9 col-md-9 col-sm-9 no-padding">
                                                <p className="font-bold-iransanse no-margin">{accommodation.Name}</p>
                                                <p className="font-bold-iransanse no-margin">تهران</p>
                                                <span className="pull-right start-box">
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <FontAwesomeIcon icon={faStar} />
                                                    <FontAwesomeIcon icon={faStar} />
                                                </span><br />
                                                <p className="font-size-12">موقعیت:{accommodation.AddressName}</p>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-3">
                                                <p className="font-size-13 color-textpill">کد:{accommodation.EghamatId}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 text-center border-right-pill" style={{ paddingRight: 5 }}>
                                        <br />
                                        <p className="no-margin font-size-13">شروع قیمت</p>
                                        <p className="no-margin font-size-13">از شبی {highest}</p>
                                        <p className="no-margin font-size-13" >تومان</p>

                                        <a className="btn-outlined-cancle"
                                            style={{ marginTop: 8, height: 20 }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                history.push(`/reserve/ویلا/تهران/${accommodation.EghamatId}`)
                                            }}>رزرو</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    :
                    <div className="alert alert-warning text-right"> لیست ویلاها خالی می‌باشد </div>
            }
        </div>
    )
}

export default withRouter(AccommodationListDesktop)