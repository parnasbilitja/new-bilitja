import React from "react"
import "../../../styles/AccommodationSearchBox.module.scss"

import PrimaryButton from '../primary_button/PrimaryButton.component'
import PrimaryTextInput from '../primaty_text_input/PrimaryTextInput.component'
import Cities from '../cities/Cities.component'
import CitiesMobile from '../cities_mobile/CitiesMobile.component'
import PopUp from "../pop_up/PopUp.component"
import PopUpWide from '../pop_up_wide/PopUpWide.component'
import CalendarComponent from '../calendar/Calendar.component'
import NumberDayStay from '../number_day_stay/NumberDayStay.component'

import { connect } from 'react-redux'
import { selectCredentials } from '../../Redux/SearchAccommodation/search_accommodation.reselect'
import { addCredentials } from '../../Redux/SearchAccommodation/search_accommodation.action'
import { messageBoxModify } from '../../Redux/UI/ui.action'

import { withRouter } from 'react-router-dom'

import moment from 'jalali-moment'

class AccommodationSearchBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            openGo: false,
            openReturn: false,
            openDestination: false,
            suggestDestination: false,
            mobileSearchTerm: '',
            searchTermDestination: '',
            dateReturn: '',
            numberStay: 1
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
    handleChangeCre = (event) => {
        const { name, value } = event.target
        this.props.addCredentials({
            [name]: value
        })

        this.setState({
            searchTermDestination: value
        })

    }

    calculateDayStay = () => {
        let dateGo = moment(this.props.credentials.dateStart, 'jYYYY/jMM/jDD').doAsGregorian()
        let dateReturn = moment(this.props.credentials.dateEnd, 'jYYYY/jMM/jDD').doAsGregorian()
        if (this.props.credentials.dateStart && this.props.credentials.dateEnd) {
            let second = new Date(dateReturn.year(), dateReturn.month(), dateReturn.date())
            let first = new Date(dateGo.year(), dateGo.month(), dateGo.date())
            const diffTime = second - first
            const distance = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            if (distance > 0 && distance < 9) {
                this.setState({
                    numberStay: distance
                })
            } else if (distance <= 0) {
                this.props.messageBoxModify({
                    state: true,
                    message: 'روز بازگشت باید بعد از روز رفت باشد'
                })
                this.calculateReturnDay()
            } else if (distance > 9) {
                this.props.messageBoxModify({
                    state: true,
                    message: 'تعداد روز های اقامت نمیتواند بیشتر از 9 روز باشد'
                })
                this.setState({
                    numberStay: 9
                }, () => {
                    this.calculateReturnDay()
                })
            }

        }
    }

    calculateReturnDay = () => {
        let dateGo = moment(this.props.credentials.dateStart, 'jYYYY/jMM/jDD').doAsGregorian()
        // let dateReturn = moment(this.props.credentials.dateEnd, 'jYYYY/jMM/jDD').doAsGregorian()
        if (this.props.credentials.dateStart) {
            let date = new Date(dateGo.year(), dateGo.month(), dateGo.date())
            date.setDate(date.getDate() + this.state.numberStay)
            this.props.addCredentials({
                dateEnd: moment(`${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`, "YYYY/MM/DD").format("jYYYY/jMM/jDD"),
            })
            
        }
    }

    managePopUpCalendarGo = (value) => {
        this.setState({
            openGo: value
        })
    }

    managePopUpCalendarReturn = (value) => {
        this.setState({
            openReturn: value
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
            mobileSearchTerm: value
        })
    }

    // for desktop
    manageSuggestDestination = (value) => {
        this.setState({
            suggestDestination: value,
            searchTermDestination: ''
        })
    }
    validation = () => {
        // const { credentials: { sourceName, destinationName, flightDatePersian, source, dest } } = this.props
        // if (sourceName == "" || source == "") {
        //     return false
        // }

        // if (destinationName == "" || dest == "") {
        //     return false
        // }
        // if (flightDatePersian == "") {
        //     return false
        // }
        // return true
    }
    render() {
        const mobileSize = 626
        const { credentials: { cityName, dateStart, dateEnd } } = this.props

        return (
            <div className="home-villa-form">
                <div>
                    <div className="form-input-border">

                        <PrimaryTextInput value={cityName} readOnlyAttr={this.state.width <= mobileSize} name="cityName" onFocus={(e) => {
                            // for mobile
                            if (this.state.width <= mobileSize) {
                                e.preventDefault()
                                this.managePopUpDestination(true)
                            } else {
                                this.manageSuggestDestination(true)
                            }
                        }} onChange={this.handleChangeCre} placeholder={"شهر مقصد"} />

                        {
                            this.state.width > mobileSize && this.state.suggestDestination ?
                                <Cities searchTerm={this.state.searchTermDestination} closeSuggest={this.manageSuggestDestination} />
                                : null
                        }
                    </div>
                </div>

                <div>
                    <div className="form-input-border">
                        <i className="kilo-font icon-calendar form-input-icon-larger"></i>

                        <PrimaryTextInput placeholder={"تاریخ رفت"} readOnly value={dateStart} onFocus={(e) => {
                            e.preventDefault();
                            this.managePopUpCalendarGo(true)
                        }} />

                    </div>
                </div>

                <div className="form-input-border">
                    <i className="kilo-font icon-calendar form-input-icon-larger"></i>

                    <PrimaryTextInput placeholder={"تاریخ برگشت"} readOnly value={dateEnd} onFocus={(e) => {
                        e.preventDefault();
                        this.managePopUpCalendarReturn(true)
                    }} />

                </div>

                <div>
                    <div className="form-input-border">
                        <PrimaryTextInput readOnlyAttr={this.state.width <= mobileSize} value={this.state.numberStay} />
                        <NumberDayStay index={this.state.numberStay} handleChange={(value) => {
                            this.setState({
                                numberStay: value
                            }, () => {
                                this.calculateReturnDay()
                            })
                        }} />
                    </div>
                </div>
                <div className="form-input-border without-focus">
                    <PrimaryButton defaultValue={"جستجو"} onClick={() => {
                        this.props.history.push("/ویلا/تهران")
                        // this.props.addCredentials({
                        //     dateStart:dateGo,
                        //     dateEnd:dateReturn
                        // }).then(()=>{

                        // })

                    }} />
                </div>
                <PopUpWide opened={this.state.openGo} closePopUp={this.managePopUpCalendarGo}>
                    <div className="flight-search-box-calendar-container">
                        <CalendarComponent setDate={(value) => {
                            this.props.addCredentials({
                                dateStart: value.jalali,
                            }).then(() => {
                                this.calculateReturnDay()
                            })
                        }} closePopUpCalendar={this.managePopUpCalendarGo} />
                    </div>
                </PopUpWide>

                <PopUpWide opened={this.state.openReturn} closePopUp={this.managePopUpCalendarReturn}>
                    <div className="flight-search-box-calendar-container">
                        <CalendarComponent setDate={(value) => {
                             this.props.addCredentials({
                                dateEnd: value.jalali,
                            }).then(() => {
                                this.calculateDayStay()
                            })

                        }} closePopUpCalendar={this.managePopUpCalendarReturn} />
                    </div>
                </PopUpWide>
                {
                    // for mobile
                    this.state.width <= mobileSize ?
                        <PopUp opened={this.state.openDestination} closePopUp={this.managePopUpDestination}>
                            <CitiesMobile searchTerm={this.state.mobileSearchTerm} handleChange={this.mobileHandleSearchTerm} closePopUp={this.managePopUpDestination} title="شهر مقصد" />
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
    messageBoxModify: async value => dispatch(messageBoxModify(value))

})
export default withRouter(connect(mapStatesToProps, mapDispatchesToProps)(AccommodationSearchBox))