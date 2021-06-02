import React from "react"
import styles from "../../../styles/FlightSearchBox.module.scss"

import PrimaryButton from '../../Components/primary_button/PrimaryButton.component'
import PrimaryTextInput from '../../Components/primaty_text_input/PrimaryTextInput.component'
import Airports from '../../Components/airports/Airports.component'
import AirportsMobile from '../airports_mobile/AirportsMobile.component'
import PopUp from "../pop_up/PopUp.component"
import PopUpWide from '../pop_up_wide/PopUpWide.component'
import CalendarComponent from '../calendar/Calendar.component'

import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'
import { selectCredentials } from '../../Redux/Search/search.reselect'
import { addCredentials, switchRoute } from '../../Redux/Search/search.action'
import { messageBoxModify } from '../../Redux/UI/ui.action'
import { withRouter } from 'next/router'



import BirthdayCalendar from "../birthday_calendar/BirthdayCalendar.component"


class FlightSearchBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sourceSearch: "",
            destinationSearch: "",
            width: 0,
            open: false,
            openSource: false,
            openDestination: false,
            suggestSource: false,
            suggestDestination: false,
            mobileSearchTerm: '',
            searchTermSource:'',
            searchTermDestination:''
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        // window.addEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.props.addCredentials({
            [name]: value
        })
    }
    handleChangeCre=(event)=>{
        const { name, value } = event.target
        this.props.addCredentials({
            [name]: value
        })
        if(name=="sourceName"){
            this.setState({
                searchTermSource:value
            })
        }else{
            this.setState({
                searchTermDestination:value
            })
        }
    }
    // for mobile
    managePopUpCalendar = (value) => {
        this.setState({
            open: value
        })
    }
    // for mobile
    managePopUpSource = (value) => {
        this.setState({
            openSource: value,
            mobileSearchTerm: ''
        })
    }
    // for mobile
    managePopUpDestination = (value) => {
        this.setState({
            openDestination: value,
            mobileSearchTerm: ''
        })
    }
    // for mobile
    mobileHandleSearchTerm = (value) => {
        this.setState({
            mobileSearchTerm:value
        })
    }
    // for desktop
    manageSuggestSource = (value) => {
        this.setState({
            suggestSource: value,
            searchTermSource:''
        })
    }
    // for desktop
    manageSuggestDestination = (value) => {
        this.setState({
            suggestDestination: value,
            searchTermDestination:''
        })
    }
    validation = () => {
        const { credentials: { sourceName, destinationName, flightDatePersian, source, dest } } = this.props
        if (sourceName == "" || source == "") {
            return false
        }

        if (destinationName == "" || dest == "") {
            return false
        }
        if (flightDatePersian == "") {
            return false
        }
        return true
    }
    render() {
        const mobileSize = 626
        const { credentials: { sourceName, destinationName, flightDatePersian }, history } = this.props

        return (
            <div className={styles['home-flight-form']} >
                <div>
                    <div className="form-input-border">
                        <i className="kilo-font icon-plane-departure form-input-icon"></i>
                        <PrimaryTextInput value={sourceName} readOnlyAttr={this.state.width <= mobileSize} name="sourceName" onFocus={(e) => {
                            // for mobile
                            if (this.state.width <= mobileSize) {
                                e.preventDefault()
                                this.managePopUpSource(true)
                            } else {
                                this.manageSuggestSource(true)
                            }
                        }} onChange={this.handleChangeCre} placeholder={"مبدا خود را وارد کنید"} />

                        {
                            this.state.width > mobileSize && this.state.suggestSource ?
                                <Airports credenrialType="source" closeSuggest={this.manageSuggestSource} searchTerm={this.state.searchTermSource} />
                                : null
                        }
                    </div>
                </div>

                <div style={{ textAlign: "center" }} className={`${this.props.showSwitch ? null : 'hidden-xs'} form-input-border ${styles['home-swtich-button-container']}`} onClick={() => {
                    this.props.switchRoute()
                }}>

                    <FontAwesomeIcon icon={faExchangeAlt} className={styles['home-swtich-button']} />
                </div>

                <div>
                    <div className="form-input-border">

                        <i className="kilo-font icon-plane-departure form-input-icon rotate-upsidedown-reverse"></i>
                        <PrimaryTextInput value={destinationName} readOnlyAttr={this.state.width <= mobileSize} name="destinationName"
                            onFocus={(e) => {
                                // for mobile
                                if (this.state.width <= mobileSize) {
                                    e.preventDefault()
                                    this.managePopUpDestination(true)
                                } else {
                                    this.manageSuggestDestination(true)
                                }
                            }}
                            onChange={this.handleChangeCre} placeholder={"مقصد خود را وارد کنید"} />
                        {
                            this.state.width > mobileSize && this.state.suggestDestination ?
                                <Airports credenrialType="destination" closeSuggest={this.manageSuggestDestination} searchTerm={this.state.searchTermDestination} />
                                : null
                        }

                    </div>
                </div>

                <div className="form-input-border">
                    <i className="kilo-font icon-calendar form-input-icon-larger"></i>

                    <PrimaryTextInput placeholder={" تاریخ پرواز پرواز رفت"} readOnly value={flightDatePersian} onFocus={(e) => {
                        e.preventDefault();
                        this.managePopUpCalendar(true)
                    }} />

                </div>
                <div className="form-input-border without-focus">
                    <PrimaryButton defaultValue={"جستجو"} onClick={() => {
                        if (!this.validation()) {
                            this.props.messageBoxModify({
                                state: true,
                                message: 'لظفا اطلاعات را کامل وارد کنید'
                            })
                            return
                        }
                        const path = this.props.router.asPath;
                        const src = decodeURI(path.split('/')[2]);
                        const dest = decodeURI(path.split('/')[3]);
            
                        if(src != this.props.credentials.sourceName ||
                             dest != this.props.credentials.destinationName){
                                if (this.props.refreshAction) {
                                    this.props.addCredentials({
                                        withFilters: true,
                                        currentPage: 1
                                    }).then(() => {
                                        this.props.router.push(`/بلیط-هواپیما/${this.props.credentials.sourceName}/${this.props.credentials.destinationName}`)
                                        this.props.refreshAction()
                                    })
                                }else{
                                    this.props.router.push(`/بلیط-هواپیما/${this.props.credentials.sourceName}/${this.props.credentials.destinationName}`)
                                }
                        }else{
                            this.props.addCredentials({
                                withFilters: true,
                                currentPage: 1
                            }).then(() => {
                                this.props.refreshAction()
                            })
                        }
                        
                    }} />
                </div>

                
                <PopUpWide opened={this.state.open} closePopUp={this.managePopUpCalendar}>
                <div className={styles['flight-search-box-calendar-container']}>
                    <CalendarComponent setDate={(value) => {
                            this.props.addCredentials({
                                stDate: value.garigorian,
                                flightDatePersian: value.jalali
                            })
                        }} closePopUpCalendar={this.managePopUpCalendar} />
                </div>
                </PopUpWide>
                {
                    // for mobile
                    this.state.width <= mobileSize ?
                        <PopUp opened={this.state.openSource} closePopUp={this.managePopUpSource}>
                            <AirportsMobile credenrialType="source" searchTerm={this.state.mobileSearchTerm} handleChange={this.mobileHandleSearchTerm} closePopUp={this.managePopUpSource} title="مبدا" />
                        </PopUp> :
                        null
                }
                {
                    // for mobile
                    this.state.width <= mobileSize ?
                        <PopUp opened={this.state.openDestination} closePopUp={this.managePopUpDestination}>
                            <AirportsMobile credenrialType="destination" searchTerm={this.state.mobileSearchTerm} handleChange={this.mobileHandleSearchTerm} closePopUp={this.managePopUpDestination} title="مقصد" />
                        </PopUp> :
                        null
                }

            </div>
        )
    }

}

const mapStatesToProps = (state) => ({
    credentials: selectCredentials(state)
})
const mapDispatchesToProps = (dispatch) => ({
    addCredentials: async value => dispatch(addCredentials(value)),
    switchRoute: async () => dispatch(switchRoute()),
    messageBoxModify: async value => dispatch(messageBoxModify(value))

})
export default withRouter( connect(mapStatesToProps, mapDispatchesToProps)(FlightSearchBox))