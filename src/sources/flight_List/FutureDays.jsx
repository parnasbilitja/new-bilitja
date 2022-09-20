import React, { useEffect, useState } from "react";
import StyleCalendarPrice from "../../../styles/MinimumPriceCalendar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import globals from "../Global";
import moment from "jalali-moment";
import { connect } from "react-redux";
import { selectCredentials } from "../../Redux/Search/search.reselect";
import { addCredentials } from "../../Redux/Search/search.action";
import { withRouter } from "next/router";

const FutureDays = (props) => {
    let year, month,month2,toDay;
    console.log(props.credentials.flightDatePersian);

    // useEffect(() => {
      if (props.credentials.flightDatePersian != "") {
        let currentMoment = props.credentials.flightDatePersian;
        year = currentMoment.split("/")[0];
        month = currentMoment.split("/")[1];
        month2 = '0'+(parseInt(currentMoment.split("/")[1])+1).toString();
        toDay = currentMoment.split("/")[2];
      } else {
        let currentMoment = moment().format("jYYYY,jMM,jDD");
        year = currentMoment.split(",")[0];
        month = currentMoment.split(",")[1];
        month2 = '0'+(parseInt(currentMoment.split(",")[1])+1).toString();
        toDay = currentMoment.split(",")[2];
      }
    // },[])

    useEffect(() => {
      if (props.credentials.flightDatePersian != "") {
        let currentMoment = props.credentials.flightDatePersian;
        year = currentMoment.split("/")[0];
        month = currentMoment.split("/")[1];
        month2 = '0'+(parseInt(currentMoment.split("/")[1])+1).toString();
        toDay = currentMoment.split("/")[2];
      } else {
        let currentMoment = moment().format("jYYYY,jMM,jDD");
        year = currentMoment.split(",")[0];
        month = currentMoment.split(",")[1];
        month2 = '0'+(parseInt(currentMoment.split(",")[1])+1).toString();
        toDay = currentMoment.split(",")[2];
      }
    },[props.credentials.flightDatePersian])


    const [state, setState] = useState({
      firstMonth: null,
      year: year,
      month: month,
      month2: month2,
      toDay: toDay,
    });

    useEffect(() => {
      getData(true);
      console.log(state);
    },[props.credentials.flightDatePersian])

  const checkLastDays = (days = []) => {
    let flag = false;
    days.forEach((day) => {
      if (day.minPrice != null && day.minPrice > 0) {
        flag = true;
      }
    });
    return flag;
  };
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
        console.log(data);
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

            fetch(
              `${globals.baseUrl2}BilitAirLines/getFlightCalendar/${requestParams1.airport1}/${requestParams1.airport2}/${state.year}/${state.month}?customerId=1a157116-a01a-4027-ab10-74098ac63815`
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setState({...state,
                  firstMonth: data,
                  year: year,
                  month: month,
                });
              });
          } else {
            setState({...state,
              firstMonth: data,
            });
          }
        } else {
          setState({...state,
            firstMonth: data,
          });
        }
      });
  };

    return (
      <div className="row mt-5 mx-2">
        {state.firstMonth ? (
          <div className="col-lg-12 col-md-12 col-md-12 col-12 mt-3">
            <div className={`date-show `}  style={{height: "fit-content" , display: "flex" , justifyContent: "center"}}>
              {console.log(props.credentials.flightDatePersian.split('/'))}
              {state.firstMonth[0] && state.firstMonth[0].map((day) => (<>
                {
                  parseInt(props.credentials.flightDatePersian.split('/')[2]) <= day.day 
                && 
                  parseInt(props.credentials.flightDatePersian.split('/')[1]) == parseInt(day.month)
                &&
                    parseInt(props.credentials.flightDatePersian.split('/')[2]) + 6 >= day.day
                 ? 
                <div className={`c-date-show border border-1 rounded-2 ${parseInt(props.credentials.flightDatePersian.split('/')[2]) == day.day && 'end-date'}  py-2 ms-1 mb-1 p-3 cursor-pointer`}
                  key={day.dayOfWeek + "/" + day.day}  style={{height: "fit-content"}}
                  onClick={() => {
                    if (day.minPrice == null || day.minPrice <= 0) {
                      return;
                    }
                    const m = moment(
                      `${state.year}/${state.month}/${day.day}`,
                      "jYYYY/jMM/jDD"
                    );
                    console.log(state);
                    console.log(day.day);
                    // console.log(m);
                    const persianDate = m.format("jYYYY/jMM/jDD");
                    const miladidate = m.format("YYYY/MM/DD");

                    if (props.refreshAction) {
                      props
                        .addCredentials({
                          stDate: miladidate,
                          flightDatePersian: persianDate,
                        })
                        .then(() => {
                          props.router.push(
                            `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                          );
                          props.refreshAction();
                        });
                    } else {
                      props.router.push(
                        `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                      );
                    }
                  }}>
                        <div className="text d-flex flex-column align-items-center pb-2">
                            <span className="font-size-14 text-color-base-1">{`${day.year}/${day.month}/${day.day}`}</span>
                        </div>
                        <div className="text d-flex px-1">
                            <span className={`font-size-14 text-color-base-1 ${
                              day.minPrice != null && day.minPrice > 0
                                ? ''
                                : "color-secondary"
                            }`}>{day.minPrice == null || day.minPrice == 0
                              ?'ناموجود': day.minPrice}</span>
                            <span className={`font-size-14 pe-1 ${day.minPrice == null || day.minPrice == 0 && 'd-none'}`}>تومان</span>
                        </div>
                    </div>
                 :""
                }
                </>
              ))}


              {state.firstMonth[1] && state.firstMonth[1].map((day) => (<>
                {
                  // day.month != state.month2 
                  // && 
                  (
                  parseInt(props.credentials.flightDatePersian.split('/')[2]) == 27 && day.day < 4 ||
                  parseInt(props.credentials.flightDatePersian.split('/')[2]) == 28 && day.day < 5 ||
                  parseInt(props.credentials.flightDatePersian.split('/')[2]) == 29 && day.day < 6 ||
                  parseInt(props.credentials.flightDatePersian.split('/')[2]) == 30 && day.day < 7 ||
                  parseInt(props.credentials.flightDatePersian.split('/')[2]) == 31 && day.day < 7 ||
                  parseInt(props.credentials.flightDatePersian.split('/')[2]) >= 30 && day.day < 5 
                  )
                  // day.day < 5 
                  &&
                   day.month != 0
                 ? 
                <div className={`c-date-show border border-1 rounded-2 ${parseInt(props.credentials.flightDatePersian.split('/')[2]) == day.day && 'end-date'}  py-2 ms-1 mb-1 p-3 cursor-pointer`}
                  key={day.dayOfWeek + "/" + day.day}  style={{height: "fit-content"}}
                  onClick={() => {
                    // setState({month: state.month2})
                    if (day.minPrice == null || day.minPrice <= 0) {
                      return;
                    }
                    const m = moment(
                      `${state.year}/${state.month2}/${day.day}`,
                      "jYYYY/jMM/jDD"
                    );
                    const persianDate = m.format("jYYYY/jMM/jDD");
                    const miladidate = m.format("YYYY/MM/DD");

                    if (props.refreshAction) {
                      props
                        .addCredentials({
                          stDate: miladidate,
                          flightDatePersian: persianDate,
                        })
                        .then(() => {
                          props.router.push(
                            `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                          );
                          props.refreshAction();
                        });
                    } else {
                      props.router.push(
                        `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                      );
                    }
                  }}>
                        <div className="text d-flex flex-column align-items-center pb-2">
                            <span className="font-size-14 text-color-base-1">{`${day.year}/${day.month}/${day.day}`}</span>
                        </div>
                        <div className="text d-flex px-1">
                            <span className={`font-size-14 text-color-base-1 ${
                              day.minPrice != null && day.minPrice > 0
                                ? ''
                                : "color-secondary"
                            }`}>{day.minPrice == null || day.minPrice == 0
                              ?'ناموجود': day.minPrice}</span>
                            <span className={`font-size-14 pe-1 ${day.minPrice == null || day.minPrice == 0 && 'd-none'}`}>تومان</span>
                        </div>
                    </div>
                 :""
                }
                </>
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
  connect(mapStatesToProps, mapDispatchesToProps)(FutureDays)
);

















// const getTitle = () => {
//   const monthes = [
//     "",
//     "فروردین",
//     "اردیبهشت",
//     "خرداد",
//     "تیر",
//     "مرداد",
//     "شهریور",
//     "مهر",
//     "آبان",
//     "آذر",
//     "دی",
//     "بهمن",
//     "اسفند",
//   ];
//   return `${monthes[parseInt(state.month)]} ${state.year}`;
// };

// const decreaseMonth = () => {
//   let month = parseInt(state.month) - 1;
//   if (month < 1) {
//     setState(
//       {...state,
//         month: 12,
//         year: parseInt(state.year) - 1,
//       },
//       getData
//     );
//   } else {
//     setState(
//       {...state,
//         month: month,
//       },
//       getData
//     );
//   }
// };
// const increaseMonth = () => {
//   let month = parseInt(state.month) + 1;
//   if (month == 12) {
//     setState(
//       {...state,
//         month: 1,
//         year: parseInt(state.year) + 1,
//       },
//       getData
//     );
//   } else {
//     setState(
//       {...state,
//         month: month,
//       },
//       getData
//     );
//   }
// };