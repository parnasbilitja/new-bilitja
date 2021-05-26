import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchway, faStar, faTimes, faEye, faDollarSign, faEdit, faCog } from '@fortawesome/free-solid-svg-icons'
import ManagerTopActionBox from '../../../Components/manager_top_action_box/ManagerTopActionBox.component'
import globals from '../../../Globals/Global'
import Switch from "react-switch";
import "./../../../../styles/Vila.module.scss"

class Villa extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            vilas: []
        }
    }

    componentDidMount() {
        this.getData()
    }
    getData=()=>{
        fetch(`${globals.baseUrl}bj/eghamat/view`)
        .then(res => res.json())
        .then(data => this.setState({ vilas: data.Eghamat }))
    }
    render() {
        return (
            <div>

                <div className="border-bottom-black panel-header">
                    <div>
                        <FontAwesomeIcon icon={faArchway} className="color-textpill" />
                        &nbsp;&nbsp;
                        <span className="no-margin font-size-13 font-bold-iransanse">ویلا</span>
                    </div>
                    <div style={{ direction: 'ltr' }} className="text-left">
                        <ManagerTopActionBox handleClick={() => {
                            this.props.history.push("/panel/villas/add")
                        }} />
                    </div>
                </div>

                <div className="row margin-top-10px padding-5px">
                <div className="col-lg-3 visible-xs">
                        <div className="filter-list-box background-white">
                            <div className="filter-list-heading">
                                <span className="color-textpill">
                                    <FontAwesomeIcon icon={faCog} />
                                     فیلترها
                                </span>
                            </div>

                            <input type="text" placeholder="جستجو براساس شهر نام یا کد ویلا" className="input-search filter-list-input" />

                            <div className="filter-list-management">
                                <strong>فیلتر بر اساس وضعیت ویلا</strong>

                                <div>
                                    <div className="radio">
                                        <input type="checkbox" className="radio" name="accepted" id="accepted" />
                                    </div>
                                    <label className="font-size-14" htmlFor="accepted">تایید شده</label>
                                </div>

                                <div>
                                    <div className="radio">
                                        <input type="checkbox" className="radio" name="unaccepted" id="unaccepted" />
                                    </div>
                                    <label className="font-size-14" htmlFor="unaccepted">تایید نشده</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {
                            this.state.vilas.map(vila => (
                                <div className="margin-top-10px vila-one-row">
                                    <div className="row">
                                        <div className="col-lg-2 col-5">
                                            <img src="http://kilo.website/Files/69a3656b-6b79-445d-82b5-dd10df2eba1f_نما 5.jpg" />
                                        </div>
                                        <div className="col-lg-3 col-6">
                                            <p className="font-size-14 font-bold-iransanse no-margin">{vila.Name}</p>
                                            <p className="font-size-13 no-margin">{vila.CityName}</p>
                                            <p className="color-textpill font-size-13 visible-xs">(کد :1746)</p>
                                            <div className="text-right visible-xs">
                                                <a className="management-black-outlined-button">
                                                    <FontAwesomeIcon icon={faEye} />
                                                </a>
                                                <a className="management-black-outlined-button">
                                                    <FontAwesomeIcon icon={faDollarSign} />
                                                </a>
                                                <a className="management-black-outlined-button">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </a>
                                            </div>
                                            <p className="start-box no-margin hidden-xs">
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                                <FontAwesomeIcon icon={faStar} />
                                            </p>
                                        </div>
                                        <div className="col-lg-4 hidden-xs">
                                            <p className="font-size-13 no-margin">موقعیت: {vila.AddressName}</p>
                                            <p className="font-size-13 no-margin">کد موقت ویلا: 0</p>
                                            <p className="font-size-13 no-margin">نام صاحب ویلا: {vila.AdminName}</p>
                                        </div>
                                        <div className="col-lg-3 hidden-xs">
                                            <div className="text-left">
                                                <Switch height={20} />
                                                <span className="font-size-13 font-bold-iransanse">فعال</span>
                                            </div>
                                            <div className="text-left">
                                                <a className="management-black-outlined-button">
                                                    <FontAwesomeIcon icon={faTimes} onClick={()=>{
                                                        fetch(`${globals.baseUrl}bj/eghamat/delete`,{
                                                            headers:{"Content-Type":'application/json'},
                                                            method:"POST",
                                                            body:JSON.stringify({EghamatId:vila.EghamatId})
                                                        }).then(res=>res.json())
                                                        .then(data=>{
                                                            if(data.status === "OK"){
                                                                this.getData()
                                                            }
                                                            
                                                        })
                                                    }}/>
                                                </a>
                                                <a className="management-black-outlined-button" onClick={()=>{
                                                        this.props.history.push(`/panel/villas/getReservation`)
                                                    }}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </a>
                                                <a className="management-black-outlined-button" onClick={()=>{
                                                        this.props.history.push(`/panel/villas/detail/${vila.EghamatId}`)
                                                    }}>
                                                    <FontAwesomeIcon icon={faDollarSign} />
                                                </a>
                                                <a className="management-black-outlined-button">
                                                    <FontAwesomeIcon icon={faEdit} onClick={()=>{
                                                        this.props.history.push(`${this.props.match.url}/${vila.EghamatId}`)
                                                    }}/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-lg-3 hidden-xs">
                        <div className="filter-list-box background-white">
                            <div className="filter-list-heading">
                                <span className="color-textpill">
                                    <FontAwesomeIcon icon={faCog} />
                                     فیلترها
                                </span>
                            </div>

                            <input type="text" placeholder="جستجو براساس شهر نام یا کد ویلا" className="input-search filter-list-input" />

                            <div className="filter-list-management">
                                <strong>فیلتر بر اساس وضعیت ویلا</strong>

                                <div>
                                    <div className="radio">
                                        <input type="checkbox" className="radio" name="accepted" id="accepted" />
                                    </div>
                                    <label className="font-size-14" htmlFor="accepted">تایید شده</label>
                                </div>

                                <div>
                                    <div className="radio">
                                        <input type="checkbox" className="radio" name="unaccepted" id="unaccepted" />
                                    </div>
                                    <label className="font-size-14" htmlFor="unaccepted">تایید نشده</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Villa