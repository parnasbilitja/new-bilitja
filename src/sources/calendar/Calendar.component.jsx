import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addCredentials } from '../../Redux/Search/search.action'
import JalaliDays from './JalaliDays'
import GarigorianDays from './GarigorianDays'
const CalendarComponent = (props) => {

    const [state,setState] = useState({
            typeOfCalendar: "GAR"
        })
    useEffect(()=>{
        setState({...state,
            typeOfCalendar: "JAL"
        });

    },[])

    return (
        <div onClick={(e) => {
            e.stopPropagation()
        }}
        style={{height: '330px',
            overflowY: 'auto'}}
        >

            <div className="rtl text-right">
                <button className="py-2 px-4 no-margin" onClick={() => {
                    setState({...state,
                        typeOfCalendar: state.typeOfCalendar == "JAL" ? "GAR" : "JAL"
                    })
                }} >&nbsp;  {state.typeOfCalendar == "JAL" ? "میلادی" : " شمسی"}</button>
            </div>
                
            {state.typeOfCalendar == "JAL" ?
                <JalaliDays setDate={props.setDate} closePopUpCalendar={props.closePopUpCalendar} />:
                <GarigorianDays setDate={props.setDate} closePopUpCalendar={props.closePopUpCalendar} />
            }
        </div>
    )        
}


const mapDispatchesToProps = (dispatch) => ({
    addCredentials: value => dispatch(addCredentials(value))
})
export default connect(null, mapDispatchesToProps)(CalendarComponent)


