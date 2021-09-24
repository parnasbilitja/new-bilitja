import React from "react";

import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { selectArilines } from "../../Redux/Search/search.reselect";
import { connect } from "react-redux";
import globals from "../Global";
import styles from "../../../styles/Flight.module.scss";

import {
  addCredentials,
  addAirlineToSearchObject,
  removeAirlineFromSearchObject,
} from "../../Redux/Search/search.action";

class Filters extends React.Component {
  constructor(props) {
    super(props);
  }
  //change sort criteria, by price, by time
  sortableChanged = (e) => {
    this.props
      .addCredentials({
        sortable: e.currentTarget.value,
      })
      .then(() => {
        this.props.getData();
      });
  };
  //change time filter in order to show only flights in those times
  timeOfFlightChanged = (e) => {
    const { name, checked } = e.currentTarget;
    this.props
      .addCredentials({
        [name]: checked,
        withFilters: false,
      })
      .then(() => {
        this.props.getData();
      });
  };
  //check specific airlines to show only their flights
  airlineFilter = (e) => {
    const { name, checked } = e.currentTarget;
    if (checked) {
      this.props.addAirlineToSearchObject(name).then(() => {
        this.props.getData();
      });
    } else {
      this.props.removeAirlineFromSearchObject(name).then(() => {
        this.props.getData();
      });
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
        />
        <hr />
        <div className={styles["filter-list-sort"]}>
          <strong>جستجو براساس</strong>
          <form>
            <div>
              <div className="radio">
                <input
                  type="radio"
                  name="sortable"
                  value="1"
                  className="radio"
                  id="cheapest"
                  onChange={this.sortableChanged}
                />
              </div>
              <label className="font-size-14" htmlFor="cheapest">
                {" "}
                کمترین قیمت
              </label>
            </div>
            <div>
              <div className="radio">
                <input
                  type="radio"
                  name="sortable"
                  value="2"
                  className="radio"
                  onChange={this.sortableChanged}
                  id="earlieast"
                />
              </div>
              <label className="font-size-14" htmlFor="earlieast">
                نزدیک ترین ساعت
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
                onChange={this.timeOfFlightChanged}
                className="radio"
                name="earlyMorning"
                id="earlyMorning"
              />
            </div>
            <label className="font-size-14" htmlFor="earlyMorning">
              بامداد (04:59 - 00:00)
            </label>
          </div>
          <div>
            <div className="radio">
              <input
                type="checkbox"
                onChange={this.timeOfFlightChanged}
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
                onChange={this.timeOfFlightChanged}
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
                onChange={this.timeOfFlightChanged}
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
          {this.props.airlines.airlines
            ? this.props.airlines.airlines.map((oneAirline) => (
                <div key={oneAirline.airlineIataCode}>
                  <div className="radio">
                    <input
                      onChange={this.airlineFilter}
                      name={oneAirline.airlineIataCode}
                      type="checkbox"
                      className="radio"
                      id={oneAirline.airline}
                    />
                  </div>
                  <img
                    src={
                      globals.website +
                      `Airlines/${oneAirline.airlineIataCode}.png?ver=1`
                    }
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
const mapStatesToProps = (state) => ({
  airlines: selectArilines(state),
});
const mapDispatchesToProps = (dispatch) => ({
  addCredentials: async (value) => dispatch(addCredentials(value)),
  addAirlineToSearchObject: async (value) =>
    dispatch(addAirlineToSearchObject(value)),
  removeAirlineFromSearchObject: async (value) =>
    dispatch(removeAirlineFromSearchObject(value)),
});
export default connect(mapStatesToProps, mapDispatchesToProps)(Filters);
