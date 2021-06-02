import React from 'react'

import FlightSearchBox from '../../Components/flight_search_box/FlightSearchBox.component'
import FlightList from '../../Components/flight_list/FlightList.component'
import FilterList from '../../Components/filter_list/FilterList.component'
import SlideIn from '../../Components/slide_in/SlideIn.component'
import MobileFlightList from '../../Components/mobile_flight_list/MobileFlightList.component'
import PopUp from '../../Components/pop_up/PopUp.component'
import PopupFlightReserve from '../../Components/pop_up_flight_reserve/PopupFlightReserve.component'

import styles from  '../../../styles/Flight.module.scss'

import globals from '../../Globals/Global'

import { connect } from 'react-redux'
import { selectSearchObject } from '../../Redux/Search/search.reselect'
import { selectAirports } from '../../Redux/Airports/airport.reselect'
import { messageBoxModify } from '../../Redux/UI/ui.action'
import { addFilters, addCredentials } from '../../Redux/Search/search.action'

import { faAngleRight, faAngleLeft, faFilter, faSearch, faHome, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import moment from 'jalali-moment'
import Loading from '../../Components/loading/Loading.component'
import MinimumPriceCalendar from '../../Components/minimum_price_calendar/MinimumPriceCalendar.component'

import {getCustomFormat} from '../../Utils/SimpleTasks'
import { withRouter } from 'next/router'

class Flight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flights: null,
            loading: true,
            slide: false,
            open: false,
            openReserve: false,
            reserveBoxData: null,
            showMessageBox: false
        }
    }
    componentDidUpdate() {
        const path = this.props.router.asPath;
        const src = decodeURI(path.split('/')[2]);
        const dest = decodeURI(path.split('/')[3]);

        window.onpopstate = e => {
            const source = this.props.airports.find(x => x.airportName == src)
            const destinationn = this.props.airports.find(x => x.airportName == dest)
            this.props.addCredentials({
                sourceName: source.airportName,
                destinationName: destinationn.airportName,
                source: source.airportCode,
                dest: destinationn.airportCode,
                withFilters: true,
                currentPage: 1
            }).then(() => {
                this.getData()
            })
        }
    }
    componentDidMount() {
      //  if (this.props.credentials.source == '') {
            // console.log(this.props.router.asPath);

            const path = this.props.router.asPath;
            const src = decodeURI(path.split('/')[2]);
            const dest = decodeURI(path.split('/')[3]);

            // console.log("abc");
            // console.log(src);
            // console.log(dest);

            if (this.props.credentials.source == '') {
                if (!this.props.airports) {
                     fetch(`${globals.baseUrl}flights/getAirports`).then(res => res.json()).then(json => {
                         this.props.setAirports(json.flightAirportsModel);
                         const source = json.flightAirportsModel.find(x => x.airportName == src)
                 const destinationn = json.flightAirportsModel.find(x => x.airportName == dest)
                 this.props.addCredentials({
                     sourceName: source.airportName,
                     destinationName: destinationn.airportName,
                     source: source.airportCode,
                     dest: destinationn.airportCode,
                     stDate: getCustomFormat(moment().startOf('day'), true),
                     flightDatePersian: getCustomFormat(moment().startOf('day'), false),
                 }).then(() => {
                    this.setState({
                        loading:false
                    })
                 })
                     });
                 }else{
                         const source = this.props.airports.find(x => x.airportName == src )
                     const destinationn = this.props.airports.find(x => x.airportName == dest)
                     this.props.addCredentials({
                         sourceName: source.airportName,
                         destinationName: destinationn.airportName,
                         source: source.airportCode,
                         dest: destinationn.airportCode,
                         stDate: getCustomFormat(moment().startOf('day'), true),
                         flightDatePersian: getCustomFormat(moment().startOf('day'), false),
                     }).then(() => {
                     this.setState({
                         loading:false
                     })
                     })
                 }
                 
             }else {
            this.getData()
        }
    }

    managePopUpSearch = (value) => {
        this.setState({
            open: value
        })
    }

    managePopUpReserve = (value) => {
        this.setState({
            openReserve: value
        })
    }

    getData = () => {
        
        this.setState({ loading: true, open: false })
        fetch(`${globals.baseUrl}flights/getFlights`, {
            method: "POST",
            body: JSON.stringify({ ...this.props.credentials }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(data => {
            if (data.message == "OK") {
                if (this.props.credentials.withFilters == "true") {
                    this.props.addFilters({ airlines: data.airlines })
                    this.props.addCredentials({
                        flightDateNext: data.flightDateNext,
                        flightDatePrev: data.flightDatePrev
                    })
                }
                this.setState({
                    flights: data.flights,
                    loading: false
                })
            } else {
                this.props.messageBoxModify({
                    state: true,
                    message: data.message
                })

            }
        })
    }

    changeDate = (date) => {
        const changedDateGregorian = moment(date, 'jYYYY/jMM/jDD').local('en').format('MM/DD/YYYY')
        this.props.addCredentials({
            withFilters: true,
            currentPage: 1,
            stDate: changedDateGregorian,
            flightDatePersian: String(date).replace("-", "/").replace("-", "/")
        }).then(() => {
            this.getData()
        })
    }

    setReserveBoxData = (oneFlight) => {
        this.setState({ reserveBoxData: oneFlight, openReserve: true })
    }

    render() {
        return (
            <div className={`container-fluid ${styles['flight-container']}`}>
                <div className={`row text-right ${styles['hidden-xs-flight']}`}>
                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-11 col-sm-11">
                        <div className="row">
                            <div className="col-lg-10 col-md-11 col-sm-11 padding-5px">
                                <FlightSearchBox refreshAction={this.getData} />
                            </div>
                            <div className="col-lg-2 col-md-3 col-sm-4 padding-5px flight-change-day">
                                <a className="btn-outlined" onClick={() => {
                                    const date_ = this.props.credentials.flightDatePrev
                                    if (date_ != null) {
                                        this.changeDate(date_)
                                    }
                                }}>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <span>قبل</span>
                                </a>
                                <a className="btn-outlined" onClick={() => {
                                    const date_ = this.props.credentials.flightDateNext
                                    if (date_ != null) {
                                        this.changeDate(date_)
                                    }
                                }}>
                                    <span>بعد</span>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1"></div>
                    <div className="col-lg-10 col-md-11 col-sm-12">
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-sm-8 col-12 padding-5px">
                                {
                                    this.state.loading ?
                                        <Loading />
                                        :
                                        this.state.flights ?
                                            <div>
                                                <div className="visible-xs">
                                                    <MobileFlightList setReserveBoxData={this.setReserveBoxData} flightList={this.state.flights} />
                                                </div>
                                                <div className={styles['hidden-xs-flight']}>
                                                    <FlightList setReserveBoxData={this.setReserveBoxData} flightList={this.state.flights} />
                                                </div>
                                            </div>
                                            :
                                            <MinimumPriceCalendar refreshAction={this.getData}/>
                                }
                            </div>
                            <div className={`col-lg-3 col-md-4 col-sm-4 ${styles['hidden-xs-flight']} padding-5px`}>
                                <FilterList getData={this.getData} />
                            </div>
                        </div>
                    </div>

                </div>

                <PopUp opened={this.state.open} closePopUp={this.managePopUpSearch}>
                    <div className="popup-content-container">
                        <div className="popup-heading">
                            <span>جستجو مجدد</span>
                            <span className="pull-left exit-form" onClick={() => {
                                this.managePopUpSearch(false)
                            }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>

                        </div>
                        <FlightSearchBox showSwitch={true} refreshAction={this.getData} />
                    </div>
                </PopUp>

                {
                    this.state.reserveBoxData ?
                        <PopUp opened={this.state.openReserve} closePopUp={this.managePopUpReserve}>
                            <div className="popup-content-container">
                                <div className="popup-heading">
                                    <span>انتخاب تعداد مسافران</span>
                                    <span className="pull-left exit-form" onClick={() => {
                                        this.managePopUpReserve(false)
                                    }}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </span>

                                </div>
                                <PopupFlightReserve {...this.state.reserveBoxData} />
                            </div>
                        </PopUp>
                        : null
                }
                <SlideIn slide={this.state.slide} close={() => {
                    this.setState({
                        slide: false
                    })
                }}>
                    <FilterList getData={this.getData} />
                </SlideIn>

                <div className={styles['visible-xs-flight-footer']}>
                    <div onClick={() => {
                        this.setState({
                            slide: true
                        })
                    }}>
                        <FontAwesomeIcon icon={faFilter} />
                        <p>فیلتر</p>
                    </div>
                    <div onClick={() => {
                        const date_ = this.props.credentials.flightDatePrev
                        if (date_ != null) {
                            this.changeDate(date_)
                        }
                    }}>
                        <FontAwesomeIcon icon={faAngleRight} />
                        <p>قبل</p>
                    </div>
                    <div onClick={() => {
                        this.managePopUpSearch(true)
                    }}>
                        <FontAwesomeIcon icon={faSearch} />
                        <p>جستجو</p>
                    </div>
                    <div onClick={() => {
                        const date_ = this.props.credentials.flightDateNext
                        if (date_ != null) {
                            this.changeDate(date_)
                        }
                    }}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                        <p>بعد</p>
                    </div>
                    <div onClick={() => {
                        this.props.router.push("/")
                    }}>
                        <FontAwesomeIcon icon={faHome} />
                        <p>خانه</p>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatesToProps = (state) => ({
    credentials: selectSearchObject(state),
    airports: selectAirports(state)
})

const mapDispatchesToProps = (dispatch) => ({
    setAirports: value => dispatch(addAirports(value)),
    addFilters: value => dispatch(addFilters(value)),
    addCredentials: async value => dispatch(addCredentials(value)),
    messageBoxModify: value => dispatch(messageBoxModify(value))
})
export default withRouter(connect(mapStatesToProps, mapDispatchesToProps)(Flight))