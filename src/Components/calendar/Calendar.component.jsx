import React from 'react'
//import styles from '../../../styles/Calendar.module.scss'
import { connect } from 'react-redux'
import { addCredentials } from '../../Redux/Search/search.action'
import JalaliDays from './JalaliDays'
import GarigorianDays from './GarigorianDays'
class CalendarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOfCalendar: "JAL"
        }
    }
    // componentDidMount(){
    //     this.state = {
    //         typeOfCalendar: "JAL"
    //     }
    // }
    render() {

        return (
            <div onClick={(e) => {
                e.stopPropagation()
            }}>
               

                {
                    this.state.typeOfCalendar == "JAL" ?
                        
                        <JalaliDays setDate={this.props.setDate} closePopUpCalendar={this.props.closePopUpCalendar}/>
                        :
                        <GarigorianDays setDate={this.props.setDate} closePopUpCalendar={this.props.closePopUpCalendar}/>
                }
                 <div className="rtl text-right">
                    <label className="no-margin" onClick={() => {
                        this.setState({
                            typeOfCalendar: this.state.typeOfCalendar == "JAL" ? "GAR" : "JAL"
                        })
                    }} >&nbsp;{this.state.typeOfCalendar == "JAL" ? "تقویم میلادی" : "تقویم شمسی"}</label>
                </div>
            </div>
        )
    }
}

const mapDispatchesToProps = (dispatch) => ({
    addCredentials: value => dispatch(addCredentials(value))
})
export default connect(null, mapDispatchesToProps)(CalendarComponent)





// class CalendarComponent extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             value: moment(),

//         };
//         this.enabledRange = {
//             min: moment().startOf('day'),
//         };
//     }
//     componentDidMount() {
//         this.updateTitles()
//     }
//     updateTitles = () => {

//         document.getElementsByClassName('today')[0].classList.add("today_")
//         document.getElementsByClassName('today')[0].classList.remove("today")

//     }

//     render() {
//         return (
//             <div>
//                 <Calendar
//                     min={this.enabledRange.min}
//                     timePicker={false}
//                     showTodayButton={false}
//                     isGregorian={false}

//                     onChange={value => {
//                         let datePersian = getCustomFormat(value, false)
//                         let date = getCustomFormat(value, true)

//                         this.setState({ value })
//                         this.props.addCredentials({
//                             stDate: date,
//                             flightDatePersian:datePersian
//                         })
//                         this.props.closePopUpCalendar(false)
//                     }}
//                     value={this.state.value}
//                 />
//             </div>
//         )
//     }
// }