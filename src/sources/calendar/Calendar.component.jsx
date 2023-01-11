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
    }
    componentDidMount() {
        this.setState({
            typeOfCalendar: "JAL"
        });
    }
    render() {

        return (
            <div onClick={(e) => {
                e.stopPropagation()
            }}>

                <div className="rtl text-right">
                    <button className="py-2 px-4 no-margin" onClick={() => {
                        this.setState({
                            typeOfCalendar: this.state.typeOfCalendar == "JAL" ? "GAR" : "JAL"
                        })
                    }} >&nbsp;  {this.state.typeOfCalendar == "JAL" ? "میلادی" : " شمسی"}</button>
                </div>
                    
                                    {
                                        this.state.typeOfCalendar == "JAL" ?
                    
                                            <JalaliDays setDate={this.props.setDate} closePopUpCalendar={this.props.closePopUpCalendar} />
                                            :
                                            <GarigorianDays setDate={this.props.setDate} closePopUpCalendar={this.props.closePopUpCalendar} />
                                    }
            </div>
        )
    }
}

const mapDispatchesToProps = (dispatch) => ({
    addCredentials: value => dispatch(addCredentials(value))
})
export default connect(null, mapDispatchesToProps)(CalendarComponent)


