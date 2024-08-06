import React, { useState } from "react";
import moment from "moment-jalaali";
import styles from "../../../styles/BirthdayCalendar.module.scss";
const BirthdayCalenderMiladi = (props) => {
  let current = 2022;
  const today = moment().format("YYYY/MM/DD");
  const date = today.split("/");
  current = parseInt(date[0]);
  const [state, setState] = useState({
    stage: 1,
    year: "",
    month: "",
  });

  const getYears = () => {
    if (props.typePassenger == "ADL") {
      return new Array(current - 11 - props.numBase)
        .fill()
        .map((x, index) => {
          return parseInt(today.split("/")[0]) + index;
        })
        .reverse();
    } else if (props.typePassenger == "CHD") {
      return new Array(current - 11 - 1379)
        .fill()
        .map((x, index) => {
          return 2010 + index;
        })
        .reverse();
    } else if (props.typePassenger == "INF") {
      return new Array(current - 11 - 1387)
        .fill()
        .map((x, index) => {
          return 2020 + index;
        })
        .reverse();
    }
  };
  //calculate days in a month, month and year are defined in previous steps!
  const getDays = () => {
    let arrayOfdays;
    if (parseInt(state.month) >= 1 && state.month <= 6) {
      arrayOfdays = Array.from({ length: 31 }, (_, i) => i + 1);
    } else if (parseInt(state.month) >= 7 && state.month <= 11) {
      arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1);
    } else {
      if ((current - 1331) % 4 == 0) {
        arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1);
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
    // 
    if (
      parseInt(state.year) == parseInt(today.split("/")[0]) &&
      parseInt(state.month) == parseInt(today.split("/")[1])
    ) {
      // console.log(today,state)

      revArrayOfDay
        .reverse()
        .map((item) =>
          parseInt(item) >= parseInt(today.split("/")[2])
            ? data.push(item)
            : data.push(undefined)
        );
      return data;
    } else {
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
          <p
            onClick={() => setState({ ...state, stage: 1 })}
            className="font-size-14 black-color font-bold-iransanse text-center"
          >
            Please enter your desired month
          </p>
          <div className={`font-en ${styles["birthday-month-container"]}`}>
            {stageMonth.map((item) => (
              <>
                {parseInt(state.year) == parseInt(today.split("/")[0]) &&
                parseInt(item.month) >= parseInt(today.split("/")[1]) ? (
                  <div
                    className={styles["birthday-item"]}
                    onClick={() => {
                      setState({
                        ...state,
                        month: item.month,
                        stage: item.stage,
                      });
                    }}
                  >
                    {item.title}
                  </div>
                ) : parseInt(state.year) != parseInt(today.split("/")[0]) ? (
                  <div
                    className={styles["birthday-item"]}
                    onClick={() => {
                      setState({
                        ...state,
                        month: item.month,
                        stage: item.stage,
                      });
                    }}
                  >
                    {item.title}
                  </div>
                ) : null}
              </>
            ))}
          </div>
        </div>
      ) : null}
      {state.stage == 3 ? (
        <div>
          <p
            onClick={() => setState({ ...state, stage: 1 })}
            className="font-size-14 black-color font-bold-iransanse text-center border-bottom-black"
          >
            {getMonth()}&nbsp;&nbsp;{state.year}
          </p>
          <div className={styles["birthday-day-container"]}>
            <div className="font-size-13 color-black">Sat</div>
            <div className="font-size-13 color-black">Sun</div>
            <div className="font-size-13 color-black">Mon</div>
            <div className="font-size-13 color-black">Tues</div>
            <div className="font-size-13 color-black">Wednes</div>
            <div className="font-size-13 color-black">Thurs</div>
            <div className="font-size-13 color-black">Fri</div>

            {getDays().map((x, i) => (
              <div key={i}>
                {x != undefined ? (
                  <div
                    className={styles["birthday-item"]}
                    style={{
                      fontFamily:
                        "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                    }}
                    onClick={() => {
                      const m = moment(
                        `${state.year + "/" + state.month + "/" + x}`,
                        "jYYYY/jMM/jDD"
                      );
                      const date = m.format("jYYYY/jMM/jDD");
                      // 
                      props.setBirthday(date);
                      props.closePopUpCalendar(false);
                      setState({ ...state, stage: 1 });
                      
                      const dasheddateformat = m.format("jYYYY-jMM-jDD");
                      // props.Birthdate(
                      //   dasheddateformat,
                      //   props.roomInfo.passId,
                      //   props.roomInfo.type,
                      //   props.roomInfo.roomId,
                      //   props.roomInfo.roomTypeId,
                      //   "expired_passport",
                      //   props.roomInfo.id
                      // );
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
