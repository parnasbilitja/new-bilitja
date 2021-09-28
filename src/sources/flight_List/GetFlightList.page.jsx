import React from "react";

import FlightSearchBox from "./FlightSearchBox.component";
import ShowFlightList from "./ShowFlightList.component";
import Filters from "./Filters.component";
import SlideIn from "../component/SlideIn.component";
import ShowFlightListMobile from "./ShowFlightListMobile.component";
import PopUp from "../component/PopUp.component";
import PopupFlightReserve from "../flight_reserve/PopupFlightReserve.component";

import styles from "../../../styles/Flight.module.scss";

import globals from "../Global";

import { connect } from "react-redux";
import { selectSearchObject } from "../../Redux/Search/search.reselect";
import { selectAirports } from "../../Redux/Airports/airport.reselect";
import { messageBoxModify } from "../../Redux/UI/ui.action";
import { addFilters, addCredentials } from "../../Redux/Search/search.action";
import { addAirports } from "../../Redux/Airports/airport.action";

import {
  faAngleRight,
  faAngleLeft,
  faFilter,
  faSearch,
  faHome,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import moment from "jalali-moment";
import Loading from "../component/Loading.component";
import MinimumPriceCalendar from "./MinimumPriceCalendar.component";

import { getCustomFormat } from "../../Utils/SimpleTasks";
import { withRouter } from "next/router";

class GetFlightList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: null,
      loading: true,
      slide: false,
      open: false,
      openReserve: false,
      reserveBoxData: null,
      showMessageBox: false,
      sourceName: "",
      destinationName: "",
    };
  }

  closeSide = () => {
    this.setState({
      slide: false,
    });
  };

  componentDidUpdate() {
    const path = this.props.router.asPath;
    const src = decodeURI(path.split("/")[2]);
    const dest = decodeURI(path.split("/")[3]);
    window.onpopstate = (e) => {
      const source = this.props.mohammadsalehAirportsList.find(
        (x) => x.airportName == src
      );
      const destinationn = this.props.mohammadsalehAirportsList.find(
        (x) => x.airportName == dest
      );

      this.props
        .addCredentials({
          sourceName: source.airportName,
          destinationName: destinationn.airportName,
          source: source.airportCode,
          dest: destinationn.airportCode,
          withFilters: true,
          currentPage: 1,
        })
        .then(() => {
          this.getData();
        });
    };
  }
  componentDidMount() {
    //  if (this.props.credentials.source == '') {
    // console.log(this.props.router.asPath);

    const path = this.props.router.asPath;
    const src = decodeURI(path.split("/")[2]);
    const dest = decodeURI(path.split("/")[3]);
    this.setState({
      sourceName: src,
      destinationName: dest,
    });
    // console.log("abc");
    // console.log(src);
    // console.log(dest);
    //////////////////////////
    //
    //  استخراج لیست فرودگاهها
    //
    //////////////////////////

    // Mohammadsaleh
    if (this.props.credentials.source == "") {
      if (this.props.mohammadsalehAirportsList) {
        const source = this.props.mohammadsalehAirportsList.find(
          (x) => x.airportName == src
        );
        const destinationn = this.props.mohammadsalehAirportsList.find(
          (x) => x.airportName == dest
        );
        this.props
          .addCredentials({
            sourceName: source.airportName,
            destinationName: destinationn.airportName,
            source: source.airportCode,
            dest: destinationn.airportCode,
            stDate: getCustomFormat(moment().startOf("day"), true),
            flightDatePersian: getCustomFormat(moment().startOf("day"), false),
            typeOfCalendar: this.props.typeOfCalendar,
          })
          .then(() => {
            // Get Flights List
            this.setState({ loading: true, open: false });
            fetch(`${globals.baseUrl}flights/getFlights`, {
              method: "POST",
              body: JSON.stringify({ ...this.props.credentials }),
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message == "OK") {
                  if (this.props.credentials.withFilters == "true") {
                    this.props.addFilters({ airlines: data.airlines });
                    this.props.addCredentials({
                      flightDateNext: data.flightDateNext,
                      flightDatePrev: data.flightDatePrev,
                    });
                  }
                  this.setState({
                    flights: data.flights,
                    loading: false,
                  });
                } else {
                  this.props.messageBoxModify({
                    state: true,
                    message: data.message,
                  });
                }
              });
          });
      }
    } else if (this.props.credentials.source != "") {
      this.setState({ loading: true, open: false });
      fetch(`${globals.baseUrl}flights/getFlights`, {
        method: "POST",
        body: JSON.stringify({ ...this.props.credentials }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message == "OK") {
            if (this.props.credentials.withFilters == "true") {
              this.props.addFilters({ airlines: data.airlines });
              this.props.addCredentials({
                flightDateNext: data.flightDateNext,
                flightDatePrev: data.flightDatePrev,
              });
            }
            // Get Flights List
            this.setState({ loading: true, open: false });
            fetch(`${globals.baseUrl}flights/getFlights`, {
              method: "POST",
              body: JSON.stringify({ ...this.props.credentials }),
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message == "OK") {
                  if (this.props.credentials.withFilters == "true") {
                    this.props.addFilters({ airlines: data.airlines });
                    this.props.addCredentials({
                      flightDateNext: data.flightDateNext,
                      flightDatePrev: data.flightDatePrev,
                    });
                  }
                  this.setState({
                    flights: data.flights,
                    loading: false,
                  });
                } else {
                  this.props.messageBoxModify({
                    state: true,
                    message: data.message,
                  });
                }
              });
            this.setState({
              flights: data.flights,
              loading: false,
            });
          } else {
            this.props.messageBoxModify({
              state: true,
              message: data.message,
            });
          }
        });
    }
    //----------------------------
    //if (this.props.credentials.source == "") {
    //     if (!this.props.airports) {
    //       fetch(`${globals.baseUrl}flights/getAirports`)
    //         .then((res) => res.json())
    //         .then((json) => {
    //           this.props.setAirports(json.flightAirportsModel);
    //           const source = json.flightAirportsModel.find(
    //             (x) => x.airportName == src
    //           );
    //           const destinationn = json.flightAirportsModel.find(
    //             (x) => x.airportName == dest
    //           );
    //           this.props
    //             .addCredentials({
    //               sourceName: source.airportName,
    //               destinationName: destinationn.airportName,
    //               source: source.airportCode,
    //               dest: destinationn.airportCode,
    //               stDate: getCustomFormat(moment().startOf("day"), true),
    //               flightDatePersian: getCustomFormat(
    //                 moment().startOf("day"),
    //                 false
    //               ),
    //               typeOfCalendar: this.props.typeOfCalendar,
    //             })
    //             .then(() => {
    //               this.setState({
    //                 loading: false,
    //               });
    //             });
    //         });
    //     } else {
    //       const source = this.props.airports.find((x) => x.airportName == src);
    //       const destinationn = this.props.airports.find(
    //         (x) => x.airportName == dest
    //       );
    //       this.props
    //         .addCredentials({
    //           sourceName: source.airportName,
    //           destinationName: destinationn.airportName,
    //           source: source.airportCode,
    //           dest: destinationn.airportCode,
    //           stDate: getCustomFormat(moment().startOf("day"), true),
    //           flightDatePersian: getCustomFormat(moment().startOf("day"), false),
    //           typeOfCalendar: this.props.typeOfCalendar,
    //         })
    //         .then(() => {
    //           this.setState({
    //             loading: false,
    //           });
    //         });
    //     }
    //   } else {
    //     this.getData();
    //   }
  }

  managePopUpSearch = (value) => {
    this.setState({
      open: value,
    });
  };

  managePopUpReserve = (value) => {
    this.setState({
      openReserve: value,
    });
  };

  getData = () => {
    //////////////////////////
    //
    //  استخراج لیست پروازها
    //
    //////////////////////////
    this.setState({ loading: true, open: false });
    fetch(`${globals.baseUrl}flights/getFlights`, {
      method: "POST",
      body: JSON.stringify({ ...this.props.credentials }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "OK") {
          if (this.props.credentials.withFilters == "true") {
            this.props.addFilters({ airlines: data.airlines });
            this.props.addCredentials({
              flightDateNext: data.flightDateNext,
              flightDatePrev: data.flightDatePrev,
            });
          }
          this.setState({
            flights: data.flights,
            loading: false,
          });
        } else {
          this.props.messageBoxModify({
            state: true,
            message: data.message,
          });
        }
      });
  };

  changeDate = (date) => {
    const changedDateGregorian = moment(date, "jYYYY/jMM/jDD")
      .local("en")
      .format("MM/DD/YYYY");
    this.props
      .addCredentials({
        withFilters: true,
        currentPage: 1,
        stDate: changedDateGregorian,
        flightDatePersian: String(date).replace("-", "/").replace("-", "/"),
      })
      .then(() => {
        this.getData();
      });
  };

  setReserveBoxData = (oneFlight) => {
    this.setState({ reserveBoxData: oneFlight, openReserve: true });
  };

  render() {
    const path = this.props.router.asPath;
    const src = decodeURI(path.split("/")[2]);
    const dest = decodeURI(path.split("/")[3]);

    return (
      <div className={`container-fluid ${styles["flight-container"]}`}>
        <div className={`row text-right ${styles["hidden-xs-flight"]}`}>
          <div className="col-lg-1 col-md-1 col-sm-1"></div>
          <div className="col-lg-10 col-md-11 col-sm-11">
            <div className="row">
              <div className="col-lg-10 col-md-11 col-sm-11 padding-5px">
                <FlightSearchBox refreshAction={this.getData} />
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 padding-5px">
                <div className="row mt-2">
                  <div className="col-lg-6">
                    <a
                      className="btn btn-outlined col-12 btn-block prev-next-btn"
                      onClick={() => {
                        const date_ = this.props.credentials.flightDatePrev;
                        if (date_ != null) {
                          this.changeDate(date_);
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className="prev-icon"
                      />
                      <span>قبل</span>
                    </a>
                  </div>
                  <div className="col-lg-6">
                    <a
                      className="btn btn-outlined col-12 btn-block  prev-next-btn"
                      onClick={() => {
                        const date_ = this.props.credentials.flightDateNext;
                        if (date_ != null) {
                          this.changeDate(date_);
                        }
                      }}
                    >
                      <span>بعد</span>
                      <FontAwesomeIcon
                        icon={faAngleLeft}
                        className="next-icon"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-1 col-md-1 col-sm-1"></div>
          <div className="col-lg-10 col-md-11 col-sm-12">
            <div className="row">
              <div className="col-lg-9 col-md-8 col-sm-8 col-12 padding-5px">
                {this.state.loading ? (
                  <div className="mt-4">
                    <Loading />
                  </div>
                ) : this.state.flights ? (
                  <div>
                    <div className="visible-xs">
                      <ShowFlightListMobile
                        setReserveBoxData={this.setReserveBoxData}
                        flightList={this.state.flights}
                      />
                    </div>
                    <div className={styles["hidden-xs-flight"]}>
                      <ShowFlightList
                        setReserveBoxData={this.setReserveBoxData}
                        flightList={this.state.flights}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-center mx-3">
                      متاسفانه هیچ پروازی از{" "}
                      <strong className="text-danger">{src}</strong>{" "}
                      <strong>به </strong>
                      <strong className="text-danger">{dest}</strong> یافت نشد
                      لطفا از تقویم زیر انتخاب کنید.
                    </p>
                    <MinimumPriceCalendar refreshAction={this.getData} />
                  </>
                )}
              </div>
              <div
                className={`col-lg-3 col-md-4 col-sm-4 ${styles["hidden-xs-flight"]} padding-5px`}
              >
                <Filters getData={this.getData} closeSide={this.closeSide} />
              </div>
            </div>
          </div>
        </div>

        <PopUp opened={this.state.open} closePopUp={this.managePopUpSearch}>
          <div className="popup-content-container">
            <div className="popup-heading">
              <span>جستجو مجدد</span>
              <span
                className="pull-left exit-form"
                onClick={() => {
                  this.managePopUpSearch(false);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
            <FlightSearchBox showSwitch={true} refreshAction={this.getData} />
          </div>
        </PopUp>

        {this.state.reserveBoxData ? (
          <PopUp
            opened={this.state.openReserve}
            closePopUp={this.managePopUpReserve}
          >
            <div className="popup-content-container">
              <div className="popup-heading">
                <span className="font-bold-iransanse">
                  انتخاب تعداد مسافران
                </span>
                <span
                  className="pull-left exit-form"
                  onClick={() => {
                    this.managePopUpReserve(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </div>
              <PopupFlightReserve {...this.state.reserveBoxData} />
            </div>
          </PopUp>
        ) : null}
        <SlideIn
          slide={this.state.slide}
          close={() => {
            this.setState({
              slide: false,
            });
          }}
        >
          <Filters
            getData={this.getData}
            closeSide={() => {
              this.setState({
                slide: false,
              });
            }}
          />
        </SlideIn>

        <div className={styles["visible-xs-flight-footer"]}>
          <div
            onClick={() => {
              this.setState({
                slide: true,
              });
            }}
          >
            <FontAwesomeIcon icon={faFilter} />
            <p>فیلتر</p>
          </div>
          <div
            onClick={() => {
              const date_ = this.props.credentials.flightDatePrev;
              if (date_ != null) {
                this.changeDate(date_);
              }
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
            <p>قبل</p>
          </div>
          <div
            onClick={() => {
              this.managePopUpSearch(true);
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
            <p>جستجو</p>
          </div>
          <div
            onClick={() => {
              const date_ = this.props.credentials.flightDateNext;
              if (date_ != null) {
                this.changeDate(date_);
              }
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
            <p>بعد</p>
          </div>
          <div
            onClick={() => {
              this.props.router.push("/");
            }}
          >
            <FontAwesomeIcon icon={faHome} />
            <p>خانه</p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStatesToProps = (state) => ({
  credentials: selectSearchObject(state),
  airports: selectAirports(state),
  mohammadsalehAirportsList: state.mohammadsalehAirports,
});

const mapDispatchesToProps = (dispatch) => ({
  setAirports: (value) => dispatch(addAirports(value)),
  addFilters: (value) => dispatch(addFilters(value)),
  addCredentials: async (value) => dispatch(addCredentials(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(
  connect(mapStatesToProps, mapDispatchesToProps)(GetFlightList)
);
