import React from "react";

import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import globals from "../Global";
import styles from "../../../styles/Flight.module.scss";

import {
  addCredentials,
  addAirlineToSearchObject,
  removeAirlineFromSearchObject,
} from "../../Redux/Search/search.action";
import { messageBoxModify } from "../../Redux/UI/ui.action";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airlines: [],
      lowPrice: null,
      endtime: "",
    };
  }

  handleFindByFlightNo = (e) => {
    if (e.target.value != "") {
      const searched = this.props.realData.filter((res) =>
        res.flightNo.toLowerCase().includes(e.target.value.toLowerCase())
      );
      this.props.setFilter(searched);
    } else {
      this.props.setFilter(this.props.realData);
    }
  };

  handleSelectAirline = async (airline, event) => {
    const { checked } = event.target;
    const prevTickets = [...this.props.realData];

    if (checked == true) {
      const newSelected = [...this.state.airlines, airline];
      const finedTicket = prevTickets.filter((ticket) =>
        newSelected.includes(ticket.airlineIataCode)
      );
      this.props.setFilter(finedTicket);
      this.setState({
        airlines: newSelected,
      });
    } else {
      const prevSelect = [...this.state.airlines];
      const findedIndex = prevSelect.indexOf(airline);
      prevSelect.splice(findedIndex, 1);

      if (prevSelect.length != 0) {
        this.setState({
          airlines: prevSelect,
        });
        const finedTicket = prevTickets.filter((ticket) =>
          prevSelect.includes(ticket.airlineIataCode)
        );
        this.props.setFilter(finedTicket);
      } else {
        this.props.setFilter(prevTickets);
        this.setState({
          airlines: [],
        });
      }
    }
  };

  handleFindByPrice = (lowMood, e) => {
    const { checked } = e.target;
    if (checked == true) {
      if (lowMood == true) {
        this.setState({
          lowPrice: true,
        });
        const prevTickets = [...this.props.realData];
        const filtring = prevTickets.sort((a, b) => a.priceView - b.priceView);
        this.props.setFilter(filtring);
      } else {
        this.setState({
          lowPrice: false,
        });
        const prevTickets = [...this.props.realData];
        const filtring = prevTickets.sort((a, b) => a.priceView - b.priceView);
        const reversed = filtring.reverse();
        this.props.setFilter(reversed);
      }
    } else {
      this.setState({
        lowPrice: null,
      });
      this.props.setFilter(this.props.realData);
    }
  };

  handleFilterByTime = (st, en, e) => {
    const { checked } = e.target;
    if (checked == true) {
      this.setState({
        endtime: en,
      });
      const prevTickets = [...this.props.realData];
      const filtring = prevTickets.filter(
        (res) => res.flightTime > st && res.flightTime < en
      );
      if (filtring.length != 0) {
        this.props.setFilter(filtring);
      } else {
        this.props.messageBoxModify({
          state: true,
          message: "متاسفانه در این ساعت پروازی وجود ندارد.",
        });

        this.setState({
          endtime: "",
        });
      }
    } else {
      this.setState({
        endtime: "",
      });
      this.props.setFilter(this.props.realData);
    }
  };
  render() {
    return (
      <div className={styles["filter-list-box"]}>
        <div onClick={this.props.closeSide}>
          <FontAwesomeIcon icon={faTimes} className="f-left" />
        </div>

        <div className={`styles['filter-list-heading'] mt-2`}>
          <span className={`${styles["color-textpill"]} text-muted `}>
            <FontAwesomeIcon icon={faCog} />
            <span className="mx-2">فیلترها</span>
          </span>
        </div>

        <input
          type="text"
          placeholder="جستجوی شماره پرواز"
          className={`${styles["filter-list-input"]} input-search mt-3 flight-filter-input`}
          onChange={this.handleFindByFlightNo}
        />
        <hr />
        <div className={styles["filter-list-sort"]}>
          <strong>جستجو براساس</strong>
          <form>
            <div>
              <div className="radio">
                <input
                  type="checkbox"
                  name="sortable"
                  value="1"
                  className="radio"
                  id="cheapest"
                  onChange={(e) => this.handleFindByPrice(true, e)}
                  checked={
                    this.state.lowPrice != null && this.state.lowPrice == true
                      ? true
                      : false
                  }
                />
              </div>
              <label className="font-size-14" htmlFor="cheapest">
                {" "}
                ارزانترین
              </label>
            </div>
            <div>
              <div className="radio">
                <input
                  type="checkbox"
                  name="sortable"
                  value="2"
                  className="radio"
                  onChange={(e) => this.handleFindByPrice(false, e)}
                  checked={
                    this.state.lowPrice != null && this.state.lowPrice == false
                      ? true
                      : false
                  }
                  id="earlieast"
                />
              </div>
              <label className="font-size-14" htmlFor="earlieast">
                گرانترین
              </label>
            </div>
          </form>
        </div>
        <hr />
        <div className={styles["filter-list-time-in-day"]}>
          <strong>زمان پرواز</strong>

          <div>
            <div className="radio">
              <input
                type="checkbox"
                className="radio"
                id="exampleCheck1"
                onChange={(e) => this.handleFilterByTime("00:00", "04:59", e)}
                checked={this.state.endtime == "04:59" ? true : false}
              />
            </div>

            <label className="form-check-label" htmlFor="exampleCheck1">
              بامداد (00:00 - 04:59)
            </label>
          </div>
          <div>
            <div className="radio">
              <input
                type="checkbox"
                onChange={(e) => this.handleFilterByTime("05:00", "11:59", e)}
                checked={this.state.endtime == "11:59" ? true : false}
                className="radio"
                name="morning"
                id="morning"
              />
            </div>
            <label className="font-size-14" htmlFor="morning">
              صبح (11:59 - 05:00)
            </label>
          </div>
          <div>
            <div className="radio">
              <input
                type="checkbox"
                onChange={(e) => this.handleFilterByTime("12:00", "17:59", e)}
                checked={this.state.endtime == "17:59" ? true : false}
                className="radio"
                name="afternoon"
                id="afternoon"
              />
            </div>
            <label className="font-size-14" htmlFor="afternoon">
              بعدازظهر (17:59 - 12:00)
            </label>
          </div>
          <div>
            <div className="radio">
              <input
                type="checkbox"
                onChange={(e) => this.handleFilterByTime("18:00", "23:59", e)}
                checked={this.state.endtime == "23:59" ? true : false}
                className="radio"
                name="evening"
                id="evening"
              />
            </div>
            <label className="font-size-14" htmlFor="evening">
              شب (23:59 - 18:00)
            </label>
          </div>
        </div>
        <hr />
        <div className={styles["filter-list-airlines"]}>
          <strong>ایرلاین</strong>
          {this.props.Airlines != undefined && this.props.Airlines != null
            ? this.props.Airlines.map((oneAirline) => (
                <div key={oneAirline.airlineIataCode}>
                  <div className="radio">
                    <input
                      onChange={(e) =>
                        this.handleSelectAirline(oneAirline.airlineIataCode, e)
                      }
                      name={oneAirline.airlineIataCode}
                      type="checkbox"
                      className="radio"
                      id={oneAirline.airline}
                    />
                  </div>
                  <img
                    width=""
                    height=""
                    src={
                      globals.website +
                      `Airlines/${oneAirline.airlineIataCode}.png?ver=1`
                    }
                    alt="بلیطجا - لوگو ایرلاین"
                  />
                  <label className="font-size-14" htmlFor="cheapest">
                    {oneAirline.airline}
                  </label>
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapDispatchesToProps = (dispatch) => ({
  addCredentials: async (value) => dispatch(addCredentials(value)),
  addAirlineToSearchObject: async (value) =>
    dispatch(addAirlineToSearchObject(value)),
  removeAirlineFromSearchObject: async (value) =>
    dispatch(removeAirlineFromSearchObject(value)),
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
});
export default connect(null, mapDispatchesToProps)(Filters);
