import React from 'react';
import BirthdayCalendar from './BDCalendarShamsi';
import BirthdayCalenderMiladi from './BDCalenderMiladi';

const BirthDayParentCl = (props) => {
    return (
        <div>
            {/* {props.calend ? */}
                {/* <BirthdayCalendar
                    typePassenger={"ADL"}
                    setBirthday={(value) => {
                        props.setBirthdayb(value)
                    }}
                    closePopUpCalendar={props.closePopUpCalendar}
                /> */}
                
                <BirthdayCalenderMiladi
                    typePassenger={"INF"}
                    setBirthday={(value) => {
                        props.setBirthdayb(value)
                    }}
                    closePopUpCalendar={props.closePopUpCalendar}
                />
            
        </div>
    );
};

export default BirthDayParentCl;