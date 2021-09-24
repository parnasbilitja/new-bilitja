import React from "react";
import moment from "moment-jalaali";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/villaReserveCalendar.module.scss";
import globals from "../Global";

class villaReserveCalendar extends React.Component {
  currentYear = 1405;

  constructor(props) {
    super(props);
    const today = moment().format("jYYYY/jMM/jDD");
    const date = today.split("/");
    this.currentYear = parseInt(date[0]) + 5;
    this.state = {
      myId: this.props.router.asPath.substr(21),
      stage: 3,
      year: parseInt(date[0]),
      month: parseInt(date[1]),
      today: today,
      days: [],
      firstDate: null,
      secondDate: null,
      selectedDaysArray: [],
    };
  }

  componentDidMount() {
    this.getDays();
  }

  getDays = () => {
    fetch(`${globals.baseUrl}bj/datePrice/viewCalendar`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        EghamatId: this.props.router.asPath.substr(21),
        RoomRow: 1,
        Year: this.state.year,
        month: this.state.month,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          days: json.CalendarModel,
        });
      });
  };

  //title on top of each month
  getDateTitle = () => {
    const firstYear = parseInt(this.state.year);
    const firstMonth = parseInt(this.state.month);

    let secondMonth = firstMonth + 1;
    let secondYear = firstYear;

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
    if (secondMonth > 12) {
      secondMonth = 1;
      secondYear = firstYear + 1;
    }
    const dates = [[monthes[firstMonth], firstYear]];

    return dates;
  };
  //check date is after today or not,the proccess occures in current month
  checkDateIsAfterToday = (day) => {
    if (day.flag == false) {
      return "BEFORE";
    }
    if (day.minPrice == 0) {
      return "BEFORE";
    }
    if (day.offset == "+") {
      return "AFTER";
    } else if (day.offset == "-") {
      return "BEFORE";
    } else {
      return "TODAY";
    }
  };

  checkDateIsContained = (day) => {
    const { year, month } = this.state;
    let date =
      year + "/" + ("0" + month).slice(-2) + "/" + ("0" + day.day).slice(-2);

    const isContained = this.state.selectedDaysArray.filter(
      (x) => x[0] == date
    )[0];

    if ((isContained != null || isContained != undefined) && day.flag == true) {
      return "selected-day";
    }
  };

  decreaseMonth = async () => {
    let month = parseInt(this.state.month) - 1;
    if (month < 1) {
      await this.setState({
        month: "12",
        year: parseInt(this.state.year) - 1,
      });
    } else {
      await this.setState({
        month: month,
      });
    }
    this.getDays();
  };

  increaseMonth = async () => {
    let month = parseInt(this.state.month) + 1;
    if (month > 12) {
      await this.setState({
        month: "01",
        year: parseInt(this.state.year) + 1,
      });
    } else {
      await this.setState({
        month: month,
      });
    }
    this.getDays();
  };

  fillSelectedDate = () => {
    const duration = this.state.days.slice(
      this.state.firstDate,
      this.state.secondDate + 1
    );
    const selectedDate = [];
    duration.forEach((oneRow) => {
      const m = moment(
        `${this.state.year}/${this.state.month}/${oneRow.day}`,
        "jYYYY/jMM/jDD"
      );
      const persianDate = m.format("jYYYY/jMM/jDD");

      selectedDate.push([persianDate, oneRow.minPrice]);
    });
    this.setState(
      {
        selectedDaysArray: selectedDate,
      },
      () => {
        this.props.setDate(this.state.selectedDaysArray);
      }
    );
  };

  render() {
    let currentAndNextDate = this.getDateTitle();

    return (
      <div className="villa-calendar-reserve">
        <div>
          <div className="row calendar-header m-0">
            <div className="col-lg-1 col-1 no-padding no-margin">
              <FontAwesomeIcon
                icon={faAngleRight}
                onClick={this.decreaseMonth}
              />
            </div>

            <div className="col-lg-10 col-10 no-padding no-margin">
              <p className="padding-5px font-size-14 black-color font-bold-iransanse text-center">
                {`${currentAndNextDate[0][0]} ${currentAndNextDate[0][1]}`}
              </p>
            </div>

            <div className="col-lg-1 col-1 no-padding no-margin">
              <FontAwesomeIcon
                icon={faAngleLeft}
                onClick={this.increaseMonth}
              />
            </div>
          </div>

          <div>
            <div className="villa-calendar-reserve-day-container">
              <div className="font-size-13 color-black">شنبه</div>
              <div className="font-size-13 color-black">1شنبه</div>
              <div className="font-size-13 color-black">2شنبه</div>
              <div className="font-size-13 color-black">3شنبه</div>
              <div className="font-size-13 color-black">4شنبه</div>
              <div className="font-size-13 color-black">5شنبه</div>
              <div className="font-size-13 color-black">جمعه</div>
              {this.state.days.map((day, index) => {
                const compareToToday = this.checkDateIsAfterToday(day);
                const isSelected = this.checkDateIsContained(day);
                return (
                  <div
                    className={`calendar-item ${compareToToday} ${isSelected}`}
                    onClick={() => {
                      if (compareToToday == "BEFORE") {
                        return;
                      }

                      if (this.state.firstDate == null) {
                        this.setState({
                          firstDate: index,
                        });
                      } else if (this.state.secondDate == null) {
                        this.setState(
                          {
                            secondDate: index,
                          },
                          () => {
                            this.fillSelectedDate();
                          }
                        );
                      } else {
                        this.setState({
                          firstDate: index,
                          secondDate: null,
                          selectedDaysArray: [],
                        });
                      }
                    }}
                  >
                    <div>{day.day}</div>
                    <div>{day.minPrice}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default villaReserveCalendar;
