import React from 'react'
import Image from 'next/image'
//import HotelView from '../../../public/images/hotel_view.jpg'
import { withRouter } from 'react-router-dom'


const AccommodationListMobile = ({ history, accommodationList }) => {
    return (
        <div className="visible-xs">
            {
                accommodationList ?
                accommodationList.map(accommodation =>{
                    let highest = 0
                        accommodation.Rooms.forEach(room => {
                            if(room.StartPrice > highest) {highest= room.StartPrice} 
                        }, {
                            amount: Number.MIN_SAFE_INTEGER
                        })
                    return(
                    <div className="hotel_row_mobile">
                        <div className="row">
                            <div className="col-5">
                                <img src='../../../public/images/hotel_view.jpg' />
                            </div>
                            <div className="col-7 text-right no-padding">
                                <div className="row">
                                    <div className="col-7">
                                        <p className="font-bold-iransanse no-margin text-overflow">{accommodation.Name}</p>
                                        <p className="font-bold-iransanse no-margin">تهران</p>
                                        <p className="font-size-12">موقعیت:{accommodation.AddressName}</p>
                                        <p className="font-size-12">هر شب از {highest} تومان</p>
                                    </div>
                                    <div className="col-4">
                                        <p className="font-size-13 color-textpill">کد:{accommodation.EghamatId}</p>
                                        <p className="font-size-13 color-textpill no-margin">1 شب</p>
                                        <a className="btn-outlined-cancle"
                                            style={{ marginTop: 8, height: 20 }}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                history.push("/reserve/ویلا/تهران")
                                            }}
                                        >رزرو</a>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )})
                :
                <div className="alert alert-warning text-right"> لیست ویلاها خالی می‌باشد </div>

            }

        </div>
    )
}

export default withRouter(AccommodationListMobile)