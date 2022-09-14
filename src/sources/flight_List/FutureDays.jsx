import React from "react";
import StyleCalendarPrice from "../../../styles/MinimumPriceCalendar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import globals from "../Global";
import moment from "jalali-moment";
import { connect } from "react-redux";
import { selectCredentials } from "../../Redux/Search/search.reselect";
import { addCredentials } from "../../Redux/Search/search.action";
import { withRouter } from "next/router";

class FtureDays extends React.Component {
  constructor(props) {
    super(props);
    let year, month,toDay;
    if (this.props.credentials.flightDatePersian == "") {
      const currentMoment = moment().format("jYYYY,jMM,jDD");
      year = currentMoment.split(",")[0];
      month = currentMoment.split(",")[1];
      toDay = currentMoment.split(",")[2];
    } else {
      const currentMoment = this.props.credentials.flightDatePersian;
      year = currentMoment.split("/")[0];
      month = currentMoment.split("/")[1];
      toDay = currentMoment.split("/")[2];
    }

    this.state = {
      firstMonth: null,
      year: year,
      month: month,
      toDay: toDay,
    };
  }

  componentDidMount() {
    this.getData(true);
}
componentDidUpdate(){
      console.log(this.props);
  }

  //check if there is any available day left for the current month
  checkLastDays = (days = []) => {
    let flag = false;
    days.forEach((day) => {
      if (day.minPrice != null && day.minPrice > 0) {
        flag = true;
      }
    });
    return flag;
  };
  // get data of a month with prices. source and destination come from redux
  getData = (idInitReq = false) => {
    const requestParams1 = {
      airport1: this.props.credentials.source,
      airport2: this.props.credentials.dest,
    };
    fetch(
      `${globals.baseUrl2}BilitAirLines/getFlightCalendar/${requestParams1.airport1}/${requestParams1.airport2}/${this.state.year}/${this.state.month}?customerId=1a157116-a01a-4027-ab10-74098ac63815`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // check if this is from componentdidmount or not
        if (idInitReq) {
          if (!this.checkLastDays(data[0])) {
            const year =
              parseInt(this.state.month) + 1 > 12
                ? parseInt(this.state.year) + 1
                : parseInt(this.state.year);
            const month =
              parseInt(this.state.month) + 1 > 12
                ? 1
                : parseInt(this.state.month) + 1;

            const requestParams2 = {
              airport1: this.props.credentials.source,
              airport2: this.props.credentials.dest,
              year: year,
              month: month,
            };
            fetch(
              `${globals.baseUrl2}BilitAirLines/getFlightCalendar/${requestParams1.airport1}/${requestParams1.airport2}/${this.state.year}/${this.state.month}/customerId=1a157116-a01a-4027-ab10-74098ac63815`
            )
              .then((res) => res.json())
              .then((data) => {
                this.setState({
                  firstMonth: data[0],
                  year: year,
                  month: month,
                });
              });
          } else {
            this.setState({
              firstMonth: data[0],
            });
          }
        } else {
          this.setState({
            firstMonth: data[0],
          });
        }
      });
  };

  getTitle = () => {
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
    return `${monthes[parseInt(this.state.month)]} ${this.state.year}`;
  };

  decreaseMonth = () => {
    let month = parseInt(this.state.month) - 1;
    if (month < 1) {
      this.setState(
        {
          month: 12,
          year: parseInt(this.state.year) - 1,
        },
        this.getData
      );
    } else {
      this.setState(
        {
          month: month,
        },
        this.getData
      );
    }
  };
  increaseMonth = () => {
    let month = parseInt(this.state.month) + 1;
    if (month == 12) {
      this.setState(
        {
          month: 1,
          year: parseInt(this.state.year) + 1,
        },
        this.getData
      );
    } else {
      this.setState(
        {
          month: month,
        },
        this.getData
      );
    }
  };
  render() {
    return (
      <div className="row mt-5 mx-2">
        {/* <div className="row">
              <div className="col-lg-1 col-1">
                <FontAwesomeIcon
                  icon={faAngleRight}
                  onClick={this.decreaseMonth}
                />
              </div>

              <div className="col-lg-2 col-2">
                <p className="no-margin-vertical font-size-14 black-color font-bold-iransanse text-center">
                  {this.getTitle()}
                </p>
              </div>

              <div className="col-lg-1 col-1">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  onClick={this.increaseMonth}
                />
              </div>
            </div> */}
        {/* <div className="col-lg-3 col-md-3 col-sm-1 col-0"></div> */}
        {this.state.firstMonth ? (
          <div className="col-lg-12 col-md-12 col-md-12 col-12 mt-3">
            <div className={`date-show `}  style={{height: "fit-content" , display: "flex" , justifyContent: "center"}}>
              {console.log(this.props.credentials.flightDatePersian.split('/'))}
              {this.state.firstMonth.map((day) => (<>
                {
                //  day.minPrice !== null && day.minPrice > 0 &&
                  parseInt(this.props.credentials.flightDatePersian.split('/')[2]) <= day.day 
                && 
                  (parseInt(this.props.credentials.flightDatePersian.split('/')[1]) == parseInt(day.month) 
                || 
                  parseInt(this.props.credentials.flightDatePersian.split('/')[1]) == parseInt(day.month) + 1)
                && 
                  (
                    parseInt(this.props.credentials.flightDatePersian.split('/')[2]) + 6 >= day.day
                  )
                  
                 ? 
                <div className={`c-date-show border border-1 rounded-2 ${parseInt(this.props.credentials.flightDatePersian.split('/')[2]) == day.day && 'end-date'}  py-2 ms-1 mb-1 p-3 cursor-pointer`}
                  key={day.dayOfWeek + "/" + day.day}  style={{height: "fit-content"}}
                  onClick={() => {
                    if (day.minPrice == null || day.minPrice <= 0) {
                      return;
                    }
                    const m = moment(
                      `${this.state.year}/${this.state.month}/${day.day}`,
                      "jYYYY/jMM/jDD"
                    );
                    const persianDate = m.format("jYYYY/jMM/jDD");
                    const miladidate = m.format("YYYY/MM/DD");

                    if (this.props.refreshAction) {
                      this.props
                        .addCredentials({
                          stDate: miladidate,
                          flightDatePersian: persianDate,
                        })
                        .then(() => {
                          this.props.router.push(
                            `/flights/${this.props.credentials.sourceNameEn}-to-${this.props.credentials.destinationNameEn}/airfares-${this.props.credentials.source}-${this.props.credentials.dest}#${this.props.credentials.flightDatePersian}`
                          );
                          this.props.refreshAction();
                        });
                    } else {
                      this.props.router.push(
                        `/flights/${this.props.credentials.sourceNameEn}-to-${this.props.credentials.destinationNameEn}/airfares-${this.props.credentials.source}-${this.props.credentials.dest}#${this.props.credentials.flightDatePersian}`
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
}
const mapStatesToProps = (state) => ({
  credentials: selectCredentials(state),
});
const mapDispatchesToProps = (dispatch) => ({
  addCredentials: async (value) => dispatch(addCredentials(value)),
});

export default withRouter(
  connect(mapStatesToProps, mapDispatchesToProps)(FtureDays)
);
