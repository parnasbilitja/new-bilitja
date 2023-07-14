import React from "react";
import BirthdayCalendar from "./BDCalendarShamsi";
import BirthdayCalenderMiladi from "./BDCalenderMiladi";
const BirthDayParentCl = (props) => {
  // console.log("from birth cal", props);
  return (
    <div>
      {props.calend ? (
        <BirthdayCalendar
          typePassenger={props.typePassenger}
          setBirthday={(value) => {
            props.setBirthdayb(value);
          }}
          closePopUpCalendar={props.closePopUpCalendar}
          dateMaker={(fdate) => {
            props.dateMaker(fdate);
          }}
          roomInfo={props.roomInfo}
          Birthdate={(date, index, type, roomid, roomTypeid,datetype) =>
            props.Birthdate(date, index, type, roomid, roomTypeid,datetype)
          }
        />
      ) : (
        <BirthdayCalenderMiladi
          typePassenger={props.typePassenger}
          setBirthday={(value) => {
            props.setBirthdayb(value);
          }}
          closePopUpCalendar={props.closePopUpCalendar}
        />
      )}
    </div>
  );
};

export default BirthDayParentCl;
