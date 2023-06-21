import React from 'react';
import BirthdayCalendar from './BDCalendarShamsi';
import BirthdayCalenderMiladi from './BDCalenderMiladi';
const BirthDayParentCl = (props) => {
    return (
        <div>
            {props.calend ?
                <BirthdayCalendar
                    typePassenger={props.typePassenger}
                    setBirthday={(value) => {
                        props.setBirthdayb(value)
                    }}
                    closePopUpCalendar={props.closePopUpCalendar}
                />
                :
                <BirthdayCalenderMiladi
                    typePassenger={props.typePassenger}
                    setBirthday={(value) => {
                        props.setBirthdayb(value)
                    }}
                    closePopUpCalendar={props.closePopUpCalendar}
                />
                }
        </div>
    );
};

export default BirthDayParentCl;