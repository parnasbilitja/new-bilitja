import React, { useEffect,useState } from "react";
import StyleCalendarPrice from "../../../../styles/MinimumPriceCalendar.module.scss";
// import globals from "../Global";
import moment from "moment-jalaali";
import { connect } from "react-redux";
import { selectCredentials } from "../../../Redux/Search/search.reselect";
import { addCredentials } from "../../../Redux/Search/search.action";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "next/router";
import globals from "../../Global";

const Calendar = (props) => { 

    let year, month,day;
    if (props.credentials.flightDatePersian == "") {
      const currentMoment = moment().format("jYYYY,jMM,jDD");
      year = currentMoment.split(",")[0];
      month = currentMoment.split(",")[1];
      day = currentMoment.split(",")[2];
    } else {
      const currentMoment = props.credentials.flightDatePersian;
      year = currentMoment.split("/")[0];
      month = currentMoment.split("/")[1];
      day = currentMoment.split("/")[2];
    }
    useEffect(() => {
        props.setDate({
          year:year,
          month:month,
          day:day,
        })

    },[year,month,day])

    const [state,setState] = useState({
      firstMonth: null,
      year: year,
      month: month,
    });
  // get data of a month with prices. source and destination come from redux
  const getData = (idInitReq = false) => {
    const requestParams1 = {
      airport1: props.credentials.source,
      airport2: props.credentials.dest,
    };
    fetch(
      `${globals.baseUrl2}BilitAirLines/getFlightCalendar/${requestParams1.airport1}/${requestParams1.airport2}/${state.year}/${state.month}?customerId=1a157116-a01a-4027-ab10-74098ac63815`
    )
      .then((res) => res.json())
      .then((data) => {
        // check if this is from componentdidmount or not
        if (idInitReq) {
          if (!checkLastDays(data[0])) {
            const year =
              parseInt(state.month) + 1 > 12
                ? parseInt(state.year) + 1
                : parseInt(state.year);
            const month =
              parseInt(state.month) + 1 > 12
                ? 1
                : parseInt(state.month) + 1;

            const requestParams2 = {
              airport1: props.credentials.source,
              airport2: props.credentials.dest,
              year: year,
              month: month,
            };
            fetch(
              `${globals.baseUrl2}BilitAirLines/getFlightCalendar/${requestParams1.airport1}/${requestParams1.airport2}/${state.year}/${state.month}?customerId=1a157116-a01a-4027-ab10-74098ac63815`
            )
              .then((res) => res.json())
              .then((data) => {
                setState({...state,
                  firstMonth: data[0],
                  year: year,
                  month: month,
                });
              });
          } else {
            setState({...state,
              firstMonth: data[0],
            });
          }
        } else {
          setState({...state,
            firstMonth: data[0],
          });
        }
      });
  };

    useEffect(()=>{
        getData(true);
    },[])
  //check if there is any available day left for the current month
  const checkLastDays = (days = []) => {
    let flag = false;
    days.forEach((day) => {
      if (day.minPrice != null && day.minPrice > 0) {
        flag = true;
      }
    });
    return flag;
  };
  

  const getTitle = () => {
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
    return `${monthes[parseInt(state.month)]} ${state.year}`;
  };

  const decreaseMonth = () => {
    let month = parseInt(state.month) - 1;
    if (month < 1) {
        setState({...state,month: 12,year: parseInt(state.year) - 1});
        getData(true)
    } else {
        setState({...state,month: month,});
        getData(true)
    }
  };
  const increaseMonth = () => {
    let month = parseInt(state.month) + 1;
    if (month > 12) {
        setState({...state,month: 1,year: parseInt(state.year) + 1,})
        getData(true);
    } else {
      setState({...state,month: month,});
        getData(true)
    }
  };
  const ClickDay = (day) => {
    if (day.minPrice == null || day.minPrice <= 0) {
      return;
    }
    const m = moment(`${state.year}/${state.month}/${day.day}`,"jYYYY/jMM/jDD");
    const persianDate = m.format("jYYYY/jMM/jDD");
    const miladidate = m.format("YYYY/MM/DD");
    props.addCredentials({
        stDate: miladidate,
        flightDatePersian: persianDate,
      })
    //   props.refreshAction();
    }


    // useEffect(()=>{
    //     props.refreshAction()
    // },[day])

    return (
      <div className="row mt-5 mx-2" style={{justifyContent: 'center'}}>
        <div className="col-lg-3 col-md-3 col-sm-1 col-0"></div>
        {state.firstMonth ? (
          <div className="col-lg-6 col-md-6 col-md-10 col-12">
            <div className="row">
              <div className="col-lg-1 col-1">
                <FontAwesomeIcon
                  icon={faAngleRight}
                  onClick={decreaseMonth}
                />
              </div>
              <div className="col-lg-10 col-10">
                <p className="no-margin-vertical font-size-14 black-color font-bold-iransanse text-center border-bottom-black">
                  {getTitle()}
                </p>
              </div>
              <div className="col-lg-1 col-1">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  onClick={increaseMonth}
                />
              </div>
            </div>
            <div className={StyleCalendarPrice["min-price-calendar-container"]}>
              <div className="font-size-13 color-black">شنبه</div>
              <div className="font-size-13 color-black">1شنبه</div>
              <div className="font-size-13 color-black">2شنبه</div>
              <div className="font-size-13 color-black">3شنبه</div>
              <div className="font-size-13 color-black">4شنبه</div>
              <div className="font-size-13 color-black">5شنبه</div>
              <div className="font-size-13 color-black">جمعه</div>
              {state.firstMonth.map((day) => (
                <div className={`${day.offset == "-" || day.flag == false
                      ? StyleCalendarPrice["disable"]
                      : StyleCalendarPrice["available"]
                  }`}
                  key={day.dayOfWeek + "/" + day.day}
                  onClick={() => ClickDay(day)}
                >
                  <div>{day.day}</div>
                  <div className={`${day.minPrice != null && day.minPrice > 0 ? "color-secondary": null} font-size-13`}>
                    {Math.floor(day.minPrice / 10000)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

const mapStatesToProps = (state) => ({
  credentials: selectCredentials(state),
});
const mapDispatchesToProps = (dispatch) => ({
  addCredentials: async (value) => dispatch(addCredentials(value)),
});

export default withRouter(
  connect(mapStatesToProps, mapDispatchesToProps)(Calendar)
);
