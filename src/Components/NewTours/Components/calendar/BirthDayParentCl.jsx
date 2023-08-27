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
          Birthdate={(date, passId, type, roomid, roomTypeid, datetype, id,reserve_id) =>
            props.Birthdate(
              date,
              passId,
              type,
              roomid,
              roomTypeid,
              datetype,
              id,
                reserve_id
            )
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
