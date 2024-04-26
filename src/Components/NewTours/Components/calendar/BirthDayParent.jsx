import React from "react";
import BirthdayCalendar from "./BirthdayCalendar.component";
import BirthdayCalenderMiladi from "./BirthdayCalenderMiladi";

const BirthDayParent = (props) => {
    return (
        <div>
            {props.calend ? (
                <BirthdayCalendar
                    type={props.type}
                    numBase={props.numBase}
                    num={props.numSh}
                    placeholder={props.placeholder}
                    typePassenger={props.typePassenger}
                    // setBirthday={(value) => {
                    //     props.setBirthdayb(value);
                    // }}
                    closePopUpCalendar={props.closePopUpCalendar}
                    roomInfo={props.roomInfo}
                    Birthdate={(date, passId, type, roomid, roomTypeid, datetype, id,    reserve_id,  passindex,roomindex) =>
                        props.Birthdate(
                            date,
                            passId,
                            type,
                            roomid,
                            roomTypeid,
                            datetype,
                            id,
                            reserve_id,  passindex,roomindex
                        )
                    }
                />
            ) : (
                <BirthdayCalenderMiladi
                    num={props.numMi}
                    numBase={props.numMiBase}
                    placeholder={props.placeholder}
                    title={props.title}
                    typePassenger={props.typePassenger}
                    // setBirthday={(value) => {
                    //     props.setBirthdayb(value);
                    // }}
                    closePopUpCalendar={props.closePopUpCalendar}
                    roomInfo={props.roomInfo}
                    Birthdate={(date, passId, type, roomid, roomTypeid, datetype, id,    reserve_id,  passindex,roomindex) =>
                        props.Birthdate(
                            date,
                            passId,
                            type,
                            roomid,
                            roomTypeid,
                            datetype,
                            id,
                            reserve_id,  passindex,roomindex
                        )
                    }
                />
            )}
        </div>
    );
};

export default BirthDayParent;
