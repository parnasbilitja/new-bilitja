import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import styles from "../../../../../styles/BirthdayCalendar.module.scss";
import {jalaliToMiladiConvertor} from "../../../../Utils/newTour";
const BirthdayCalenderMiladi = (props) => {
  const { typePassenger } = props;
  let current = 2022;
  const today = moment().format("YYYY/MM/DD");
  const date = today.split("/");
  current = parseInt(date[0]);

  const [month, setMonth] = useState([]);
  const [state, setState] = useState({
    stage: 1,
    year: "",
    month: "",
  });
  const [CHDage,setCHDage]=useState('')

  // let CHDage = moment().add(-12, "years").format("YYYY/MM/DD");
  let INFage = moment().add(-2, "years").format("YYYY/MM/DD");
  let month31 = [1, 3, 5, 7, 8, 10, 12];
  let month30 = [4, 6, 9, 11];

  useEffect(()=>{
    // debugger
    let chdagewith=typePassenger==='CHD' && props.roomInfo.chdages[props?.roomInfo?.chdType][1]
    let chdage=moment().add(-(chdagewith+1), "years").format("YYYY/MM/DD")
    setCHDage(chdage)

    // console.log(chdage)
  },[typePassenger,props.roomInfo?.chdType])
  const getYears = () => {

    if (typePassenger == "ADL") {
      return new Array(current - 1931).fill().map((x, index) => {
        return current - 12 - index;
      });
    } else if (typePassenger == "CHD") {
      return new Array(props.roomInfo.chdages[props.roomInfo?.chdType][1]-props.roomInfo.chdages[props.roomInfo.chdType][0]+2)
        .fill()
        .map((x, index) => {
          return parseInt(CHDage.split("/")[0]) + index;
        })
        .reverse();
    } else if (typePassenger == "INF") {
      return new Array(3)
        .fill()
        .map((x, index) => {
          return parseInt(INFage.split("/")[0]) + index;
        })
        .reverse();
    }
  };
  //calculate days in a month, month and year are defined in previous steps!
  const getDays = () => {
    let arrayOfdays = [];

    if (month31.filter((x) => x == parseInt(state.month)) == true) {
      arrayOfdays = Array.from({ length: 31 }, (_, i) => i + 1);
    } else if (month30.filter((x) => x == parseInt(state.month)) == true) {
      arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1);
    } else {
      if (
        state.year % 4 == 0 &&
        state.year % 100 == 0 &&
        state.year % 400 == 0
      ) {
        arrayOfdays = Array.from({ length: 28 }, (_, i) => i + 1);
      } else {
        arrayOfdays = Array.from({ length: 29 }, (_, i) => i + 1);
      }
    }
    const firstDaymonth = moment(
      `${state.year + "/" + state.month + "/" + 1}`,
      "jYYYY/jMM/jDD"
    ).weekday();
    let revArrayOfDay = arrayOfdays.reverse();
    for (let i = 0; i <= firstDaymonth; i++) {
      revArrayOfDay.push(undefined);
    }

    let data = [];
    if (typePassenger == "INF") {
      if (parseInt(INFage.split("/")[0]) == parseInt(state.year)) {
        revArrayOfDay
          .reverse()
          .map((item) =>
            parseInt(INFage.split("/")[1]) == parseInt(state.month) &&
            parseInt(INFage.split("/")[2]) <= parseInt(item)
              ? data.push(item)
              : parseInt(INFage.split("/")[1]) < parseInt(state.month)
              ? data.push(item)
              : data.push(undefined)
          );
        return data;
      } else if (moment().jYear() == parseInt(state.year)) {
        revArrayOfDay
          .reverse()
          .map((item) =>
            parseInt(INFage.split("/")[1]) == parseInt(state.month) &&
            parseInt(INFage.split("/")[2]) >= parseInt(item)
              ? data.push(item)
              : parseInt(INFage.split("/")[1]) > parseInt(state.month)
              ? data.push(item)
              : data.push(undefined)
          );
        return data;
      } else {
        revArrayOfDay.reverse().map((item) => data.push(item));
        return data;
      }
    } else if (
      typePassenger == "CHD" &&
      parseInt(CHDage.split("/")[0]) == parseInt(state.year)
    ) {
      revArrayOfDay
        .reverse()
        .map((item) =>
          parseInt(CHDage.split("/")[1]) == parseInt(state.month) &&
          parseInt(CHDage.split("/")[2]) <= parseInt(item)
            ? data.push(item)
            : parseInt(INFage.split("/")[0]) == parseInt(state.year) &&
              parseInt(INFage.split("/")[1]) == parseInt(state.month) &&
              parseInt(INFage.split("/")[2]) >= parseInt(item)
            ? data.push(item)
            : data.push(undefined)
        );
      return data;
    } else if (
      typePassenger == "ADL" &&
      parseInt(CHDage.split("/")[0]) == parseInt(state.year)
    ) {
      parseInt(CHDage.split("/")[1]) == parseInt(state.month)
        ? revArrayOfDay
            .reverse()
            .map((item) =>
              parseInt(CHDage.split("/")[2]) <= parseInt(item)
                ? data.push(item)
                : data.push(undefined)
            )
        : (data = revArrayOfDay.reverse());
      return data;
    } else if (typePassenger) {
      return revArrayOfDay.reverse();
    }
  };
  const getMonth = () => {
    var monthes = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var mS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthes[parseInt(state.month)];
  };
  const stageMonth = [
    {
      month: "1",
      stage: 3,
      title: "January",
    },
    {
      month: "2",
      stage: 3,
      title: "February",
    },
    {
      month: "3",
      stage: 3,
      title: "March",
    },
    {
      month: "4",
      stage: 3,
      title: "April",
    },
    {
      month: "5",
      stage: 3,
      title: "May",
    },
    {
      month: "6",
      stage: 3,
      title: "June",
    },
    {
      month: "7",
      stage: 3,
      title: "July",
    },
    {
      month: "8",
      stage: 3,
      title: "August",
    },
    {
      month: "9",
      stage: 3,
      title: "September",
    },
    {
      month: "10",
      stage: 3,
      title: "October",
    },
    {
      month: "11",
      stage: 3,
      title: "November",
    },
    {
      month: "12",
      stage: 3,
      title: "December",
    },
  ];

  const ageTypeValidate=(chdtype,daynum)=> {
    if (typePassenger === 'ADL' || typePassenger === 'INF') {
      return true
    } else {
      const m = moment(
          `${state.year + "/" + state.month + "/" + daynum}`,
          "jYYYY/jMM/jDD"
      );
      const date = m.format("jYYYY/jMM/jDD");

      let checkin = props.roomInfo.checkin

      if (moment(jalaliToMiladiConvertor(date)).isAfter(moment(checkin).add(-(props.roomInfo.chdages[props.roomInfo.chdType][1] + 1), "years").format("YYYY-MM-DD"))) {
        return true
      } else {
        return false
      }

    }
  }
  const checkMonth = () => {
    let data = [];
    if (typePassenger === "INF") {
      if (parseInt(INFage.split("/")[0]) === parseInt(state.year)) {
        stageMonth.map((item) =>
          parseInt(INFage.split("/")[1]) <= parseInt(item.month)
            ? data.push(item)
            : null
        );
      } else {
        data = stageMonth;
      }
    } else if (typePassenger === "CHD") {
      if (parseInt(CHDage.split("/")[0]) == parseInt(state.year)) {
        stageMonth.map((item) =>
          parseInt(CHDage.split("/")[1]) <= parseInt(item.month)
            ? data.push(item)
            : null
        );
      } else if (parseInt(INFage.split("/")[0]) == parseInt(state.year)) {
        stageMonth.map((item) =>
          parseInt(INFage.split("/")[1]) <= parseInt(item.month)
            ? data.push(item)
            : null
        );
      } else {
        data = stageMonth;
      }
    } else if (typePassenger === "ADL") {
      if (parseInt(CHDage.split("/")[0]) == parseInt(state.year)) {
        stageMonth.map((item) =>
          parseInt(CHDage.split("/")[1]) <= parseInt(item.month)
            ? data.push(item)
            : null
        );
      } else {
        data = stageMonth;
      }
    }
    setMonth([...data]);
  };
  useEffect(() => {
    setMonth([]);
    checkMonth();
  }, [state]);

  return (
    <div className={styles["birthday-calendar"]}>
      {state.stage == 1 ? (
        <div>
          <p className="font-size-14 black-color font-bold-iransanse text-center">
            {props.title}
          </p>

          <div className={styles["birthday-year-container"]}>
            {getYears().map((x, i) => (
              <div
                key={i}
                className={styles["birthday-item"]}
                style={{
                  fontFamily:
                    "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                }}
                onClick={() => {
                  setState({ ...state, year: x, stage: 2 });
                }}
              >
                {x}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {state.stage == 2 ? (
        <div>
          <span
            className="font-size-14 black-color font-bold-iransanse text-center border-bottom-black"
            onClick={() => {
              setState({ ...state, stage: 1 });
            }}
          >
            {state.year}
          </span>
          <p className="font-size-14 black-color font-bold-iransanse text-center">
            Please enter your desired month
          </p>
          <div className={`font-en ${styles["birthday-month-container"]}`}>
            {month.map((item) => (
              <div
                className={styles["birthday-item"]}
                onClick={() => {
                  setState({ ...state, month: item.month, stage: item.stage });
                }}
              >
                <span className='mx-1'>{item.month}</span>



                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {state.stage == 3 ? (
        <div>
          <p className="font-size-14 black-color font-bold-iransanse text-center border-bottom-black">
            <span
              className="font-size-14 black-color font-bold-iransanse text-center border-bottom-black"
              onClick={() => {
                setState({ ...state, stage: 1 });
              }}
            >
              {state.year}
            </span>
            &nbsp;&nbsp;
            <span
              className="font-size-14 black-color font-bold-iransanse text-center border-bottom-black"
              onClick={() => {
                setState({ ...state, stage: 2 });
              }}
            >
              {getMonth()}
            </span>
          </p>
          <div className={styles["birthday-day-container"]}>
            <div className="font-size-13 color-black">شنبه</div>
            <div className="font-size-13 color-black">یکشنبه</div>
            <div className="font-size-13 color-black">دوشنبه</div>
            <div className="font-size-13 color-black">سه شنبه</div>
            <div className="font-size-13 color-black">چهارشنبه</div>
            <div className="font-size-13 color-black">پنج شنبه</div>
            <div className="font-size-13 color-black">جمعه</div>

            {getDays().map((x, i) => (
              <div key={i}>
                {x != undefined &&  ageTypeValidate(props.roomInfo.passId,x) ? (
                  <div
                    className={styles["birthday-item"]}
                    style={{
                      fontFamily:
                        "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                    }}
                    onClick={() => {
                      // debugger
                      const m = moment(
                        `${state.year + "/" + state.month + "/" + x}`,
                        "jYYYY/jMM/jDD"
                      );
                      const date = m.format("jYYYY/jMM/jDD");
                      const dasheddateformat = m.format("jYYYY-jMM-jDD");

                      // props.setBirthday(date);
                      props.closePopUpCalendar(false);
                      setState({ ...state, stage: 1 });


                      props.Birthdate(
                          dasheddateformat,
                          props.roomInfo.passId,
                          props.roomInfo.type,
                          props.roomInfo.roomId,
                          props.roomInfo.roomTypeId,
                          "birth_day",
                          props.roomInfo.id,
                          props.roomInfo.reserve_id,
                          props.roomInfo.passindex,
                          props.roomInfo.roomindex,

                      );
                      //

                    }}
                  >
                    {x}
                  </div>
                ) : (
                  <div>{x}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BirthdayCalenderMiladi;

// <Calendar
//                     timePicker={false}
//                     showTodayButton={false}
//                     isGregorian={false}
//                     onChange={value => {
//                         let datePersian = getCustomFormat(value, false)
//                         let date = getCustomFormat(value, true)

//                         setState({ value })
//                         props.setBirthday(date)
//                         props.closePopUpCalendar(false)
//                     }}
//                     value={state.value}
//                 />
