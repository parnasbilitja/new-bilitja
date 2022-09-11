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
            typeOfCalendar: "GAR"
        }

        console.log('Cosntructor GAR')
    }
    componentDidMount() {
        console.log('componentDidMount JAL')
        this.setState({
            typeOfCalendar: "JAL"
        });
    }
    render() {

        return (
            <div onClick={(e) => {
                e.stopPropagation()
            }}>


                {
                    this.state.typeOfCalendar == "JAL" ?

                        <JalaliDays setDate={this.props.setDate} closePopUpCalendar={this.props.closePopUpCalendar} />
                        :
                        <GarigorianDays setDate={this.props.setDate} closePopUpCalendar={this.props.closePopUpCalendar} />
                }
                <div className="rtl text-right">
                    <label className="no-margin" onClick={() => {
                        this.setState({
                            typeOfCalendar: this.state.typeOfCalendar == "JAL" ? "GAR" : "JAL"
                        })
                    }} >&nbsp;{this.state.typeOfCalendar == "JAL" ? "Christian month" : "تقویم شمسی"}</label>
                </div>
            </div>
        )
    }
}

const mapDispatchesToProps = (dispatch) => ({
    addCredentials: value => dispatch(addCredentials(value))
})
export default connect(null, mapDispatchesToProps)(CalendarComponent)


