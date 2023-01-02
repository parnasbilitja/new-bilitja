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
            width: 1024,
            airlines: [],
            lowPrice: null,
            endtime: "",
            checked: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
  componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener("resize", this.updateWindowDimensions);
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions);
    }
  
    updateWindowDimensions() {
      this.setState({ width: window.innerWidth });
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
                    color: false,
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
    handledropdown = () => {
    };

    render() {
        return (
            <div className={styles["filter-list-box"]}>
                <div className="title-filter">
                    <h3>فیلتر ها</h3>
                </div>
                {console.log(this.props)}
                <Accordion style={{ width: "94%", marginRight: 15, }}>
                    <Accordion.Item className={`${styles["text"]} accordion-item-prs `}>
                        <Accordion.Button className={'acr-btn'} style={{ background: " rgb(243, 243, 243)", paddingRight: 10, paddingLeft: 10 }}>
                            <div className={styles["filter-list-heading"]}>
                                <strong className={`${styles["color-textpill"]} text-muted `}>
                                    <strong className={styles["filter-list-sort-4"]}>
                                        <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22"
                                            height="22">
                                            <path
                                                d="M23.96,11.5A3.084,3.084,0,0,0,20.893,9h-3.3L13.446,1.563A3,3,0,0,0,10.812,0H7.069l3.038,9H6.985l-1.1-1.657A2.994,2.994,0,0,0,3.388,6H.027L2.24,12l-2.2,6H3.4a2.991,2.991,0,0,0,2.5-1.347L6.988,15h3.119L7.069,24h3.743a3,3,0,0,0,2.63-1.556L17.588,15H21a3,3,0,0,0,2.96-3.5Zm-2.2,1.144A1,1,0,0,1,21,13H16.412L11.69,21.479a1,1,0,0,1-.878.521H9.854l3.039-9H5.908L4.233,15.552A1,1,0,0,1,3.4,16H2.906l1.465-4L2.9,8h.492a1,1,0,0,1,.833.448L5.911,11h6.982L9.854,2h.958a1,1,0,0,1,.882.529L16.412,11h4.481a1.083,1.083,0,0,1,1.092.825A1,1,0,0,1,21.763,12.647Z" />
                                        </svg>
                                        <span className={'mr-8px'}>جستجوی شماره پرواز</span>
                                    </strong>
                                </strong>
                            </div>
                        </Accordion.Button>
                        <Accordion.Body style={{ background: "#fff;", paddingRight: 0, paddingLeft: 0 }}>
                            <input
                                style={{ marginRight: 15 }}
                                type="text"
                                placeholder="جستجوی شماره پرواز"
                                className={`${styles["filter-list-input"]} input-filter-search input-search mt-3 flight-filter-input`}
                                onChange={this.handleFindByFlightNo}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion style={{ marginTop: 7 }} defaultActiveKey="0" className={styles["filter-list-sort"]}>
                    <Accordion.Item className={`${styles["text"]} accordion-item-prs `} eventKey="0">
                        <Accordion.Button style={{ background: " rgb(243, 243, 243)", paddingRight: 10, paddingLeft: 10 }}>
                            <strong className={styles["filter-list-sort-1"]}>
                                <svg id="Layer_1" height="22" viewBox="0 0 24 24" width="22" data-name="Layer 1">
                                    <path
                                        d="m16 6a1 1 0 0 1 0 2h-8a1 1 0 0 1 0-2zm7.707 17.707a1 1 0 0 1 -1.414 0l-2.407-2.407a4.457 4.457 0 0 1 -2.386.7 4.5 4.5 0 1 1 4.5-4.5 4.457 4.457 0 0 1 -.7 2.386l2.407 2.407a1 1 0 0 1 0 1.414zm-6.207-3.707a2.5 2.5 0 1 0 -2.5-2.5 2.5 2.5 0 0 0 2.5 2.5zm-4.5 2h-6a3 3 0 0 1 -3-3v-14a3 3 0 0 1 3-3h12a1 1 0 0 1 1 1v8a1 1 0 0 0 2 0v-8a3 3 0 0 0 -3-3h-12a5.006 5.006 0 0 0 -5 5v14a5.006 5.006 0 0 0 5 5h6a1 1 0 0 0 0-2z" />
                                </svg>
                                <span className={'mr-8px'}>جستجو براساس</span>
                            </strong>
                        </Accordion.Button>
                        <Accordion.Body style={{ background: "#fff" }}>
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
                                                id="earlieast"
                                                onChange={(e) => this.handleFindByPrice(false, e)}
                                                checked={
                                                    this.state.lowPrice !== null &&
                                                        this.state.lowPrice != true
                                                        ? true
                                                        : false
                                                }
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

                    <Accordion.Item className={`${styles["text"]} accordion-item-prs `} eventKey="1">
                        <Accordion.Button style={{ background: " rgb(243, 243, 243)", paddingRight: 10, paddingLeft: 10 }}>
                            <strong className={styles["filter-list-sort-2"]}>
                                <svg id="Layer_1" height="22" viewBox="0 0 24 24" width="22" data-name="Layer 1">
                                    <path
                                        d="m21 24h-18v-3a12.2 12.2 0 0 1 4.442-9 12.2 12.2 0 0 1 -4.442-9 3 3 0 0 1 3-3h12a3 3 0 0 1 3 3 12.221 12.221 0 0 1 -4.425 9 12.221 12.221 0 0 1 4.425 9zm-16-2h14v-1c0-3.774-2.5-6.552-4.592-8.217l-.984-.783.984-.783c2.092-1.665 4.592-4.443 4.592-8.217a1 1 0 0 0 -1-1h-12a1 1 0 0 0 -1 1c0 3.774 2.508 6.551 4.612 8.216l.988.784-.991.784c-2.101 1.665-4.609 4.442-4.609 8.216zm7.018-6.018a10.065 10.065 0 0 1 1.943 2.018h-3.893m1.946-4.487c-1.637 1.073-4.429 3.33-4.934 6.487h9.842c-.5-3.184-3.288-5.43-4.908-6.487z" />
                                </svg>
                                <span className={'mr-8px'}>زمان پرواز</span>
                            </strong>
                        </Accordion.Button>
                        <Accordion.Body style={{ background: "#fff" }}>
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
                    <Accordion.Item className={`${styles["text"]} accordion-item-prs `} eventKey="2">
                        <Accordion.Button style={{ background: " rgb(243, 243, 243)", paddingRight: 10, paddingLeft: 10 }}>
                            <strong className={styles["filter-list-sort-3"]}>
                                <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="22" height="22">
                                    <path
                                        d="M23.96,11.5A3.084,3.084,0,0,0,20.893,9h-3.3L13.446,1.563A3,3,0,0,0,10.812,0H7.069l3.038,9H6.985l-1.1-1.657A2.994,2.994,0,0,0,3.388,6H.027L2.24,12l-2.2,6H3.4a2.991,2.991,0,0,0,2.5-1.347L6.988,15h3.119L7.069,24h3.743a3,3,0,0,0,2.63-1.556L17.588,15H21a3,3,0,0,0,2.96-3.5Zm-2.2,1.144A1,1,0,0,1,21,13H16.412L11.69,21.479a1,1,0,0,1-.878.521H9.854l3.039-9H5.908L4.233,15.552A1,1,0,0,1,3.4,16H2.906l1.465-4L2.9,8h.492a1,1,0,0,1,.833.448L5.911,11h6.982L9.854,2h.958a1,1,0,0,1,.882.529L16.412,11h4.481a1.083,1.083,0,0,1,1.092.825A1,1,0,0,1,21.763,12.647Z" />
                                </svg>
                                <span className={'mr-8px'}>ایرلاین</span>
                            </strong>
                        </Accordion.Button>
                        <Accordion.Body style={{ background: "#fff", paddingRight: 10, paddingLeft: 10, marginRight: 0 }}>
                            <div className={styles["filter-list-airlines"]}>
                                {this.props.Airlines != undefined && this.props.Airlines != null
                                    ? this.props.Airlines.map((oneAirline) => (
                                        <div className={'parent-type-airline'} key={oneAirline.airlineIataCode}>
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
                                            <label className="font-size-14 " htmlFor="cheapest">
                                                {oneAirline.airline}
                                            </label>
                                        </div>
                                    ))
                                    : null}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                { this.state.width <= 826 &&
                    <div className="text-center">
                        <button onClick={this.props.closeSide}>اعمال فیلتر</button>
                    </div>
                }
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
