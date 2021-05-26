import React from 'react'
import Image from 'next/image'
import AccommodationSearchBox from '../../Components/accommodation_search_box/AccommodationSearchBox.component'
import PageTabls from '../../Components/page_tabs/PageTabs.component'
//import earth from '../../../images/earth.png'
//import map from '../../../images/map.png'
//import bilitja from '../../../images/bilitja.png'
//import vilaIndex from '../../../images/villa-index.png'
//import hotelView from '../../../images/hotel_view.jpg'
import moment from 'moment-jalaali'

import "../../../styles/Accommodation.module.scss"
import globals from '../../Globals/Global'

import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { selectCities } from '../../Redux/City/city.reselect'
import { selectAccount } from '../../Redux/Account/account.reselect'
import { addAccountProperties } from '../../Redux/Account/account.action'
import { addCities } from '../../Redux/City/city.action'
import { connect } from 'react-redux'
import { compareTwoStringDates } from '../../Utils/SimpleTasks'
class Accommodation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            dateSelected: null
        }
    }
    componentDidMount() {
        // window.addEventListener('resize', this.updateWindowDimensions);
        if (!this.props.cities) {
            fetch(`${globals.baseUrl}bj/city/view`).then(res => res.json()).then(json => {
                
                this.props.setCities(json.City)
            });
        }

        if (this.props.account) {
            if (compareTwoStringDates(this.props.account.dateLogin, moment().format("YYYY/MM/DD")) == -1) {
                this.props.addAccountProperties(null)
            }
        }


    }

    render() {
        return (
            <div>
                <div className="hidden-xs hidden-sm row">
                    <div className="col-md-4">
                        <img src="../../../images/map.png" className="hero-image-2 pull-right" />
                    </div>

                    <div className="text-center col-md-4" style={{ paddingTop: 10 }}>
                        <img src="../../../images/bilitja.png" className="hero-image-center" />
                    </div>
                    <div className="col-md-4">
                        <img src="../../../images/earth.png" className="hero-image-1 pull-left" />
                    </div>
                </div>

                <div className="heor-main-container container-fuild">
                    <PageTabls tabActice={2}/>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <AccommodationSearchBox dateSelected={this.state.dateSelected} />
                        </div>
                    </div>
                </div>
                <div className="hero-big-image">
                    <img src='../../../images/villa-index.png' />
                </div>

                <div className="home-become-host">
                    <div>
                        <h2>ویلا و اقامتگاه خود را در بلیطجا ثبت کنید و میزبان شوید</h2>
                        <p>عکس بگیرید و اطلاعات خود را در بلیطجا به رایگان به نمایش بگذارید و میزبان مسافران بلیطجا باشید</p>
                        <a href="#" className="btn-secondary-outlined">میزبان شوید</a>
                    </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-12 padding-5px text-center">
                    <br /><br />
                    <h3 className="font-bold-iransanse">
                        <span className="color-primary">ارزانترین نرخ &nbsp;</span>
                        <span>رزرو اقامتگاه ها</span>
                    </h3>
                    <p className="color-textpill font-size-14">مشاهده و جستجوی نرخ های روز ، ویژه و لحظه آخری و رزرو سریع آنلاین ویلا ها</p>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10 text-right">
                            <div className="acco-tab home-tab-active">
                                <div className="pull-right">
                                    <span className="font-size-14"> تهران </span>
                                </div>
                            </div>
                            <div className="acco-tab">
                                <div className="pull-right">
                                    <span className="font-size-14"> مشهد </span>
                                </div>
                            </div>
                            <div className="acco-tab">
                                <div className="pull-right">
                                    <span className="font-size-14"> کیش </span>
                                </div>
                            </div>
                            <div className="acco-tab">
                                <div className="pull-right">
                                    <span className="font-size-14"> اصفهان </span>
                                </div>
                            </div>
                            <div className="acco-tab">
                                <div className="pull-right">
                                    <span className="font-size-14"> شیراز </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1 col-0"></div>
                        <div className="col-lg-10 col-md-10 col-12 text-right">
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-6 col-12 accommodation-suggestion">
                                    <img src='../../../images/hotel_view.jpg' />
                                    <p className="font-size-13 no-margin">ویلا</p>
                                    <span className="pull-right">
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    <span className="pull-left font-size-13">000 تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    cities: selectCities(state),
    account: selectAccount(state)
})
const mapDispatchToProps = (dispatch) => ({
    setCities: value => dispatch(addCities(value)),
    addAccountProperties: value => dispatch(addAccountProperties(value))
})
export default connect(mapStateToProps, mapDispatchToProps)(Accommodation) 