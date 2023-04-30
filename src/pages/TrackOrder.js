import React, { useState } from 'react'
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PrimaryTextInput from '../sources/component/PrimaryTextInput.component'
import PrimaryButton from '../sources/component/PrimaryButton.component'
import globals from '../sources/Global'
import Table from '../sources/component/Table'
import NavHandler from '../Components/share/NavHandler'
import Footer from '../sources/component/Footer.component'
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh' 
import { tableData, tableData2 } from '../Utils/data'
const TrackOrder = () =>{
        const [state,setState] = useState({
            trackRef:'',
            err:'لطفا کد پیگیری را وارد کنید ',
            errSate:false
        })
    
    const checkTheRefrence = () => {
        state.trackRef !== '' ?
        fetch(`${globals.baseUrlNew}OnlinePay/api/onlinePay/reference/${state.trackRef}/1a157116-a01a-4027-ab10-74098ac63815`).then(res => res.json())
            .then(data => {
                setState({ ...state,...data })
            }):setState({...state,errSate:true})
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        state.trackRef == '' && setState({...state,errSate:true})
        setState({...state,errSate:false,[name]: value})
    }
    console.log(state)
    return (
        <div className="mt-130">
            <NavHandler/>
            <div className="">
            <Scrolltoprefresh />
                    <div className="col-12 mt-4 container">
                        <div className="title-order d-flex align-items-center">
                            <FontAwesomeIcon className="color-textpill icon-size" icon={faCalendarCheck} />
                            <h2 className={'title-track-order'}>پیگیری خرید</h2>
                        </div>
                        <div className="row border-bottom-black-track d-flex align-items-center">
                            <div className="col-lg-12 col-md-12 col-sm-10 col-10 text-right font-size-14">
                                <p className="track-order-second-title">جهت پیگیری رزرو، کد 6 رقمی رفرنس را وارد نمایید و بروی دکمه جستجو  کلیک کنید</p>
                            </div>
                            <div className="w-100 row">
                                <div className="col-8 col-md-3 form-input-border height-short-input">
                                    <PrimaryTextInput placeholder="رفرنس پیگیری" name="trackRef" onChange={(e)=>handleChange(e)} />
                                    <span className='text-danger font-bold'>{state.errSate? state.err:state.message== 'OK' ?'' :state.message}</span>
                                </div>
                                <div className="col-4 col-md-2">
                                <div className="form-input-border height-short-input without-focus">
                                    <PrimaryButton defaultValue={"جستجو"} onClick={() => {checkTheRefrence()}} >{"جستجو"}</PrimaryButton>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
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
