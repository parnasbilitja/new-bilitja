import React from "react";
import { connect } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
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
      checked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      checked: this.state.checked,
    });
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
    if (checked === true) {
      console.log("checkeds :", checked);

      if (lowMood === true) {
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
        checked: false,
        lowPrice: null,
      });
      console.log("checkeds :", checked);
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
  handledropdown = () => {};

  render() {
    return (
      <div className={styles["filter-list-box"]}>
        <Accordion style={{ width: "94%", marginRight: 15 }}>
          <Accordion.Item>
            <Accordion.Button className={styles["none"]}>
              <div className={styles["filter-list-heading"]}>
                <strong className={`${styles["color-textpill"]} text-muted `}>
                  <strong className={styles["filter-list-sort-4"]}>
                    فیلترها
                  </strong>
                </strong>
              </div>
            </Accordion.Button>
            <Accordion.Body style={{ background: " rgb(243, 243, 243)" }}>
              <input
                style={{ marginRight: 15 }}
                type="text"
                placeholder="جستجوی شماره پرواز"
                className={`${styles["filter-list-input"]} input-search mt-3 flight-filter-input`}
                onChange={this.handleFindByFlightNo}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion defaultActiveKey="0" className={styles["filter-list-sort"]}>
          <Accordion.Item eventKey="0">
            <Accordion.Button className={styles["none"]}>
              <strong className={styles["filter-list-sort-1"]}>
                جستجو براساس
              </strong>
            </Accordion.Button>
            <Accordion.Body>
              <div>
                <form>
                  <div>
                    <div className="radio ">
                      <input
                        type="checkbox"
                        name="sortable"
                        value="1"
                        className="checkbox"
                        id="cheapest"
                        onChange={(e) => this.handleFindByPrice(true, e)}
                        checked={
                          this.state.lowPrice != null &&
                          this.state.lowPrice == true
                            ? true
                            : false
                        }
                      />
                    </div>
                    <label className="font-size-14" htmlFor="cheapest">
                      ارزانترین
                    </label>
                  </div>
                  <div>
                    <div className="radio">
                      <input
                        type="checkbox"
                        name="sortable"
                        value="2"
                        className="checkbox"
                        onChange={(e) => this.handleFindByPrice(false, e)}
                        checked={
                          this.state.lowPrice != null &&
                          this.state.lowPrice == false
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
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Button className={styles["none"]}>
              <strong className={styles["filter-list-sort-2"]}>
                زمان پرواز
              </strong>
            </Accordion.Button>
            <Accordion.Body>
              <div style={{ marginTop: 10 }}>
                <div className="radio">
                  <input
                    type="checkbox"
                    className="radio"
                    id="exampleCheck1"
                    onChange={(e) =>
                      this.handleFilterByTime("00:00", "04:59", e)
                    }
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
                    onChange={(e) =>
                      this.handleFilterByTime("05:00", "11:59", e)
                    }
                    checked={this.state.endtime == "11:59" ? true : false}
                    className="radio"
                    name="morning"
                    id="morning"
                  />
                </div>
                <label className="font-size-14" htmlFor="morning">
                  صبح (11:59 - 05:00)
                </label>

                <div>
                  <div className="radio">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        this.handleFilterByTime("12:00", "17:59", e)
                      }
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
                      onChange={(e) =>
                        this.handleFilterByTime("18:00", "23:59", e)
                      }
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
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Button className={styles["none"]}>
              <strong className={styles["filter-list-sort-3"]}>ایرلاین</strong>
            </Accordion.Button>
            <Accordion.Body>
              <div className={styles["filter-list-airlines"]}>
                {this.props.Airlines != undefined && this.props.Airlines != null
                  ? this.props.Airlines.map((oneAirline) => (
                      <div key={oneAirline.airlineIataCode}>
                        <div className="radio">
                          <input
                            onChange={(e) =>
                              this.handleSelectAirline(
                                oneAirline.airlineIataCode,
                                e
                              )
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
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
