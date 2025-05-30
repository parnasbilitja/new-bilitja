import React from "react";
import BirthdayCalendar from "./BDCalendarShamsi";
import BirthdayCalenderMiladi from "./BDCalenderMiladi";
const BirthDayParentCl = (props) => {
  // 
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
          Birthdate={(date, passId, type, roomid, roomTypeid, datetype, id,reserve_id,passindex,roomindex) =>
            props.Birthdate(
              date,
              passId,
              type,
              roomid,
              roomTypeid,
              datetype,
              id,
                reserve_id,passindex,roomindex
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

          dateMaker={(fdate) => {
            props.dateMaker(fdate);
          }}
          roomInfo={props.roomInfo}
          Birthdate={(date, passId, type, roomid, roomTypeid, datetype, id,reserve_id,passindex,roomindex) =>
              props.Birthdate(
                  date,
                  passId,
                  type,
                  roomid,
                  roomTypeid,
                  datetype,
                  id,
                  reserve_id,
                  passindex,roomindex
              )
          }
        />
      )}
    </div>
  );
};

export default BirthDayParentCl;
