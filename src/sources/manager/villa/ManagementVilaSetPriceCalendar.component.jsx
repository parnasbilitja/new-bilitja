import React from "react";
import moment from "moment-jalaali";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../../styles/ManagementVilaSetPriceCalendar.module.scss";
import globals from "../../Global";

class ManagementVilaSetPriceCalendar extends React.Component {
  currentYear = 1405;

  constructor(props) {
    super(props);
    const today = moment().format("jYYYY/jMM/jDD");
    const date = today.split("/");
    this.currentYear = parseInt(date[0]) + 5;
    this.state = {
      stage: 3,
      year: parseInt(date[0]),
      month: parseInt(date[1]),
      days: [],
      today: today,
      daysWithPrice: [],
    };
  }

  componentDidMount() {
    this.getDays();
  }

  //calculate days in a month, month and year are defined in previous steps!
  getDays = () => {
    let arrayOfdays;
    if (parseInt(this.state.month) >= 1 && this.state.month <= 6) {
      arrayOfdays = Array.from({ length: 31 }, (_, i) => i + 1);
    } else if (parseInt(this.state.month) >= 7 && this.state.month <= 11) {
      arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1);
    } else {
      if ((this.state.year - 1331) % 4 == 0) {
        arrayOfdays = Array.from({ length: 30 }, (_, i) => i + 1);
      } else {
        arrayOfdays = Array.from({ length: 29 }, (_, i) => i + 1);
      }
    }

    const d1 = `${this.state.year}${("0" + this.state.month).slice(-2)}${(
      "0" + arrayOfdays[0]
    ).slice(-2)}`;
    const d2 = `${this.state.year}${("0" + this.state.month).slice(-2)}${(
      "0" + arrayOfdays[arrayOfdays.length - 1]
    ).slice(-2)}`;
    fetch(
      `${globals.baseUrl}bj/datePrice/view/${this.props.villaId}/1/${d1}/${d2}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          daysWithPrice: data.DatePrice,
        });
      });
    const m = moment(
      `${this.state.year}/${this.state.month}/01`,
      "jYYYY/jMM/jDD"
    ).weekday();
    let revArrayOfDay = arrayOfdays.reverse();
    for (let i = 0; i <= m; i++) {
      revArrayOfDay.push(undefined);
    }

    this.setState({
      days: revArrayOfDay.reverse(),
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
    const { year, month } = this.state;
    let date = year + "" + ("0" + month).slice(-2) + "" + ("0" + day).slice(-2);
    const today = parseInt(this.state.today.replace("/", "").replace("/", ""));
    date = parseInt(date);
    if (date > today) {
      return "AFTER";
    } else if (date < today) {
      return "BEFORE";
    } else {
      return "TODAY";
    }
  };

  checkDateIsContained = (day) => {
    const { year, month } = this.state;
    let date =
      year + "/" + ("0" + month).slice(-2) + "/" + ("0" + day).slice(-2);

    const isContained = this.props.selectedDaysArray.filter(
      (x) => x == date
    )[0];
    if (isContained != null || isContained != undefined) {
      return "selected-day";
    }
  };

  decreaseMonth = () => {
    let month = parseInt(this.state.month) - 1;
    if (month < 1) {
      this.setState({
        month: "12",
        year: parseInt(this.state.year) - 1,
      });
    } else {
      this.setState({
        month: month,
      });
    }
  };
  increaseMonth = () => {
    let month = parseInt(this.state.month) + 1;
    if (month > 12) {
      this.setState({
        month: "01",
        year: parseInt(this.state.year) + 1,
      });
    } else {
      this.setState({
        month: month,
      });
    }
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
              {this.state.days.map((x) => {
                const compareToToday = this.checkDateIsAfterToday(x);
                const isSelected = this.checkDateIsContained(x);
                let price;
                try {
                  price = this.state.daysWithPrice.filter(
                    (oneDay) =>
                      oneDay.DateM ==
                      `${this.state.year}/${this.state.month}/${x}`
                  )[0].Price;
                } catch (error) {
                  price = "خالی";
                }

                return x != undefined ? (
                  <div
                    className={`manager-calendar-item ${compareToToday} ${isSelected}`}
                    onClick={() => {
                      if (compareToToday == "BEFORE") {
                        return;
                      }
                      const m = moment(
                        `${this.state.year}/${this.state.month}/${x}`,
                        "jYYYY/jMM/jDD"
                      );
                      const persianDate = m.format("jYYYY/jMM/jDD");
                      const date = m.format("YYYY/MM/DD");
                      this.props.setDate({
                        jalali: persianDate,
                        garigorian: date,
                        typeOfCalendar: "JAL",
                      });
                      this.getDays();
                    }}
                  >
                    <div>{x}</div>
                    <div>{price}</div>
                  </div>
                ) : (
                  <div>{x}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagementVilaSetPriceCalendar;
