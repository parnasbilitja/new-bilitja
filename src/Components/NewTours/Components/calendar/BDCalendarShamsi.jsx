import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import styles from "../../../../../styles/BirthdayCalendar.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {jalaliToMiladiConvertor} from "../../../../Utils/newTour";
const BirthdayCalendar = (props) => {
  //
  const { typePassenger } = props;

  useEffect(()=>{
    console.log(props)},[props])
  let current = 1401;
  const today = moment().format("jYYYY/jMM/jDD");
  const date = today.split("/");
  current = parseInt(date[0]);
  const [month, setMonth] = useState([]);
  const [state, setState] = useState({
    stage: 1,
    year: "",
    month: "",
  });

  useEffect(()=>{
    console.log(props)
  },[props.roomInfo])
  const [CHDage,setCHDage]=useState('')
useEffect(()=>{
  // debugger
let chdagewith=typePassenger==='CHD' && props.roomInfo.chdages[props?.roomInfo?.chdType][1]
  let chdage=moment().add(-(chdagewith+1), "jyears").format("jYYYY/jMM/jDD")
  setCHDage(chdage)

  // console.log(chdage)
},[typePassenger,props.roomInfo?.chdType])

  let INFage = moment().add(-2, "jyears").format("jYYYY/jMM/jDD");
  //
  const getYears = () => {
    if (typePassenger == "ADL") {
      return new Array(current - 1311)
        .fill()
        .map((x, index) => {
          return 1300 + index;
        })
        .reverse();
    } else if (typePassenger == "CHD") {
      return new Array(props.roomInfo?.chdType==='withbed'?13:props.roomInfo.chdages[props.roomInfo?.chdType][1]-props.roomInfo.chdages[props.roomInfo.chdType][0]+2)
        .fill()
        .map((x, index) => {
          return parseInt(CHDage.split("/")[0]) + index;
        })
        .reverse()
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

    let arrayOfdays;
    if (parseInt(state.month) >= 1 && state.month <= 6) {
      arrayOfdays = Array.from({ length: 31 }, (_, i) => i + 1);
    } else if (parseInt(state.month) >= 7 && state.month <= 11) {
      arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1);
    } else {
      const check_years = [1, 5, 9, 13, 17, 22, 26, 30];

      if (check_years.includes(state.year % 33)) {
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
            : data.push(item)
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
  const stageMonth = [
    {
      month: "1",
      stage: 3,
      title: "فروردین",
    },
    {
      month: "2",
      stage: 3,
      title: "اردیبهشت",
    },
    {
      month: "3",
      stage: 3,
      title: "خرداد",
    },
    {
      month: "4",
      stage: 3,
      title: "تیر",
    },
    {
      month: "5",
      stage: 3,
      title: "مرداد",
    },
    {
      month: "6",
      stage: 3,
      title: "شهریور",
    },
    {
      month: "7",
      stage: 3,
      title: "مهر",
    },
    {
      month: "8",
      stage: 3,
      title: "آبان",
    },
    {
      month: "9",
      stage: 3,
      title: "آذر",
    },
    {
      month: "10",
      stage: 3,
      title: "دی",
    },
    {
      month: "11",
      stage: 3,
      title: "بهمن",
    },
    {
      month: "12",
      stage: 3,
      title: "اسفند",
    },
  ];
  const getMonth = () => {
    const monthes = [
      "",
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    return monthes[parseInt(state.month)];
  };
  const ageTypeValidate=(chdtype,daynum)=>{
if(typePassenger==='ADL'||typePassenger==='INF'){
  return true
}else{
  const m = moment(
      `${state.year + "/" + state.month + "/" + daynum}`,
      "jYYYY/jMM/jDD"
  );
  // debugger
  const date = m.format("jYYYY/jMM/jDD");

  let checkin=props.roomInfo.checkin

    if(moment(jalaliToMiladiConvertor(date)).isAfter(moment(checkin).add(-(props.roomInfo.chdages[props.roomInfo.chdType][1]+1), "years").format("YYYY-MM-DD"))){
      return true
    }else{
      return false
    }

}


  }

  const checkMonth = () => {
    let data = [];

    if (typePassenger === "INF") {
      if (parseInt(INFage.split("/")[0]) == parseInt(state.year)) {
        stageMonth.map((item) =>
          parseInt(INFage.split("/")[1]) <= parseInt(item.month)
            ? data.push(item)
            : null
        );
      } else if (moment().jYear() == parseInt(state.year)) {
        stageMonth.map((item) =>
          parseInt(INFage.split("/")[1]) >= parseInt(item.month)
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
            {props.placeholder}
          </p>

          <div className={styles["birthday-year-container"]}>
            {getYears().map((x) => (
              <div
                className={styles["birthday-item"]}
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

          <div style={{display:'flex' ,justifyContent:'space-between',padding:'0 1rem 0 4.5rem'}}>
            <button className="prevNextbtnSwiper2" onClick={() => {
              setState({ ...state, stage: 1 });
            }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <p className="font-size-14 black-color font-bold-iransanse text-center">
              <div
                  onClick={() => {
                    setState({ ...state, stage: 1 });
                  }}
              >
                {state.year}
              </div>
              لطفا ماه تولد خود را وارد کنید
            </p>


            <div></div>
          </div>

          <div className={styles["birthday-month-container"]}>
            {month.map((item, index) => (
              <>
                <div
                  key={index}
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
              </>
            ))}
          </div>
        </div>
      ) : null}
      {state.stage == 3 ? (
        <div>
          <div style={{display:'flex' ,justifyContent:'space-between',padding:'0 .5rem 0 4.5rem',borderBottom:'1px solid black'}}>
            <button className="prevNextbtnSwiper2" onClick={() => {
              setState({ ...state, stage: 2 });
            }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          <p className="font-size-14 black-color font-bold-iransanse text-center"
             style={{marginTop:'25px'}}
          >
            <span
              className="font-size-14 black-color font-bold-iransanse text-center "
              onClick={() => {
                setState({ ...state, stage: 1 });
              }}
            >
              {state.year}
            </span>

            <span
              className="font-size-14 black-color font-bold-iransanse text-center padding-r-5"
              onClick={() => {
                setState({ ...state, stage: 2 });
              }}
            >
              {getMonth()}
            </span>
          </p>

            <div></div>

          </div>
          <div className={styles["birthday-day-container"]}>
            <div className="font-size-13 color-black">شنبه</div>
            <div className="font-size-13 color-black">1شنبه</div>
            <div className="font-size-13 color-black">2شنبه</div>
            <div className="font-size-13 color-black">3شنبه</div>
            <div className="font-size-13 color-black">4شنبه</div>
            <div className="font-size-13 color-black">5شنبه</div>
            <div className="font-size-13 color-black">جمعه</div>

            {getDays().map((x) =>
              x != undefined &&  ageTypeValidate(props.roomInfo.passId,x)? (
                <div
                  className={styles["birthday-item"]}
                  onClick={() => {
                    const m = moment(
                      `${state.year + "/" + state.month + "/" + x}`,
                      "jYYYY/jMM/jDD"
                    );
                    const date = m.format("jYYYY/jMM/jDD");

                    const miladi=jalaliToMiladiConvertor(date)
                    const dasheddateformat = m.format("jYYYY-jMM-jDD");
                    // props.setBirthday(date);
                    props.closePopUpCalendar(false);
                    setState({ ...state, stage: 1 });

                    // props.dateMaker(dasheddateformat);
                    // debugger
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
                  {/*{*/}

                  {/*    props.roomInfo.type==='CHD'?*/}
                  {/*        childTypeValidate(props.roomInfo.passId,x):*/}
                  {/*        x*/}
                  {/*}*/}
                  {x}
                </div>
              ) : (
                <div>{x}</div>
              )
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BirthdayCalendar;
