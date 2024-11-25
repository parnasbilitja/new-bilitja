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
import {
  selectCredentials,
  selectSearchObject,
} from "../../Redux/Search/search.reselect";
import { selectAirports } from "../../Redux/Airports/airport.reselect";
import { messageBoxModify } from "../../Redux/UI/ui.action";
import { addFilters, addCredentials } from "../../Redux/Search/search.action";
import {
  getUserInfo,
  checkUserLogged,
} from "../../Redux/Account/account.action";
import { loadAirports } from "../../Redux/Airports/airport.action";

import {
  faAngleRight,
  faAngleLeft,
  faFilter,
  faSearch,
  faHome,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import moment from "moment-jalaali";
import MinimumPriceCalendar from "./MinimumPriceCalendar.component";

import {getCustomFormat, getweekday} from "../../Utils/SimpleTasks";
import { withRouter } from "next/router";
import Descflightlist from "./Descflitlist";
import FutureDays from "./FutureDays";
import Scrolltoprefresh from "../component/Scrolltoprefresh";
import { Loader } from "../../Utils/Loader";
import NewLoader from "../../Components/NewTours/Components/subComponents/NewLoader";

class GetFlightList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: null,
      Allflights: [],
      loading: true,
      slide: false,
      open: false,
      openReserve: false,
      reserveBoxData: null,
      showMessageBox: false,
      sourceName: "",
      destinationName: "",
      sourceNameEn: "",
      destinationNameEn: "",
      airlines: [],
    };
  }

  closeSide = () => {
    this.setState({
      slide: false,
    });
  };

  hashchange() {
    var flightdate = location.hash.substring(1);
    location.reload();
  }

  getingAirlines = () => {
    const airlines =
      this.state.flights != null
        ? this.state.flights.map(
            ({ airlineIataCode, priceView, airline, kndSys }) => ({
              airline,
              airlineIataCode,
              priceView,
              kndSys,
            })
          )
        : [];

    this.setState({
      airlines: airlines,
    });
  };

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashchange, false);
  }
  componentDidUpdate() {
    const pathquery = this.props.router.asPath;


    const path = pathquery.split("#")[0];
    const src = decodeURI(path.split("/")[2]).split("-to-")[0];
    const srccod = decodeURI(path.split("/")[3]).split("-")[1];
    const dest = decodeURI(path.split("/")[2]).split("-to-")[1];
    const destcod = decodeURI(path.split("/")[3]).split("-")[2];

    const flightdate =
      pathquery.split("#")[1] != null
        ? pathquery.split("#")[1]
        : getCustomFormat(moment().startOf("day"), false);

    window.onpopstate = (e) => {
      //  when back or forward in browser occured
      // const source = srccod;
      // const destinationn = destcod;

      const source = this.props.airports.find((x) => x.airportNameEn == src);
      const destinationn = this.props.airports.find(
        (x) => x.airportNameEn == dest
      );

      if (pathquery.includes("#")) {
        const flightdate = pathquery.split("#")[1];
        this.props
          .addCredentials({
            sourceName: source.airportName,
            destinationName: destinationn.airportName,
            sourceNameEn: src, //source.airportNameEn,
            destinationNameEn: dest, //destinationn.airportNameEn,
            source: srccod, //source.airportCode,
            dest: destcod, //destinationn.airportCode,
            withFilters: false,
            currentPage: 1,
            flightDatePersian: flightdate,
            customerId: "1a157116-a01a-4027-ab10-74098ac63815",
          })
          .then(() => {
            this.getData();
          });
      } else {
        this.props
          .addCredentials({
            sourceName: source.airportName,
            destinationName: destinationn.airportName,
            sourceNameEn: src, //source.airportNameEn,
            destinationNameEn: dest, //destinationn.airportNameEn,
            source: srcco, //source.airportCode,
            dest: destcod, //destinationn.airportCode,
            withFilters: false,
            currentPage: 1,
            customerId: "1a157116-a01a-4027-ab10-74098ac63815",
          })
          .then(() => {
            this.getData();
          });
      }
    };
  }
  componentDidMount() {
    this.props.checkUserLogged();
    this.props.getUserInfo({
      mobile: localStorage.getItem("mobile"),
    });
    localStorage.removeItem("reqNo");
    window.addEventListener("hashchange", this.hashchange, false);
    //  if (this.props.searchobject.source == '') {
    const pathquery = this.props.router.asPath;
    const path = pathquery.split("#")[0];
    const src = decodeURI(path.split("/")[2]).split("-to-")[0];
    const srccod = decodeURI(path.split("/")[3]).split("-")[1];
    const dest = decodeURI(path.split("/")[2]).split("-to-")[1];
    const destcod = decodeURI(path.split("/")[3]).split("-")[2];

    const flightdate =
      pathquery.split("#")[1] != null
        ? pathquery.split("#")[1]
        : getCustomFormat(moment().startOf("day"), false);
    const m = moment(flightdate, "jYYYY/jMM/jDD");
    const flightdatemiladi = m.format("YYYY/MM/DD");

    // this.setState({
    //   sourceNameEn: src,
    //   destinationNameEn: dest,
    //   flightDatePersian: flightdate,
    // });

    //   if(pathquery.includes("#")){

    //   }else{

    //   this.setState({
    //     sourceNameEn: src,
    //     destinationNameEn: dest,
    //   });
    // }
    //////////////////////////
    //
    //  استخراج لیست فرودگاهها
    //
    //////////////////////////

    if (this.props.searchobject.source == "") {
      if (!this.props.airports) {
        this.props.setAirports(null);
      } else {
        if (
          !this.props.airports[0] ||
          !this.props.airports[0].Version ||
          this.props.airports[0].Version != "1.7"
        ) {
          this.props.setAirports(null);
        }
      }

      if (this.props.airports) {
        // const source = srccod;
        // const destinationn = destcod;
        const source = this.props.airports.find((x) => x.airportNameEn == src);
        const destinationn = this.props.airports.find(
          (x) => x.airportNameEn == dest
        );
        this.props
          .addCredentials({
            sourceName: source.airportName,
            destinationName: destinationn.airportName,
            sourceNameEn: src, //source.airportNameEn,
            destinationNameEn: dest, //destinationn.airportNameEn,
            source: srccod, //source.airportCode,
            dest: destcod, //destinationn.airportCode,
            stDate: flightdatemiladi,
            flightDatePersian: flightdate,
            typeOfCalendar: this.props.typeOfCalendar,
            customerId: "1a157116-a01a-4027-ab10-74098ac63815",
          })
          .then(() => {
            // Get Flights List
            this.setState({ loading: true, open: false });
            fetch(`${globals.baseUrl2}BilitAirLines/getFlights`, {
              method: "POST",
              body: JSON.stringify({ ...this.props.searchobject }),
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.length != 0 && data != undefined) {
                  this.props.addCredentials({
                    flightDateNext: data[0]?.flightDateNext,
                    flightDatePrev: data[0]?.flightDatePrev,
                  });
                  // if (this.props.searchobject.withFilters == "true") {
                  //   this.props.addFilters({ airlines: data.airlines });
                  // const prevTickets = [...this.props.realData];
                  // }
                  this.setState(
                    {
                      flights: data,
                      Allflights: data.sort(
                        (a, b) => a.priceView - b.priceView
                      ),
                      loading: false,
                    },
                    () => this.getingAirlines()
                  );
                } else {
                  this.setState({
                    flights: null,
                    Allflights: null,
                    loading: false,
                  });
                  this.props.messageBoxModify({
                    state: true,
                    color: false,
                    message: "لطفا از تقویم روز دیگری را انتخاب کنید",
                  });
                }
              });
          });
      } else {
        this.props
          .addCredentials({
            sourceNameEn: src, //source.airportNameEn,
            destinationNameEn: dest, //destinationn.airportNameEn,

            source: srccod, //source.airportCode,
            dest: destcod, //destinationn.airportCode,
            stDate: flightdatemiladi,
            flightDatePersian: flightdate,
            typeOfCalendar: this.props.typeOfCalendar,
            customerId: "1a157116-a01a-4027-ab10-74098ac63815",
          })
          .then(() => {
            // Get Flights List
            this.setState({ loading: true, open: false, sourceName: src });
            fetch(`${globals.baseUrl2}BilitAirLines/getFlights`, {
              method: "POST",
              body: JSON.stringify({ ...this.props.searchobject }),
              headers: { "Content-Type": "application/json" },
            })
              .then((res) => res.json())
              .then((data) => {
                if (!this.props.searchobject.sourceName) {
                  const source = this.props.airports.find(
                    (x) => x.airportNameEn == src
                  );
                  const destinationn = this.props.airports.find(
                    (x) => x.airportNameEn == dest
                  );
                  this.props.addCredentials({
                    sourceName: source.airportName,
                    destinationName: destinationn.airportName,
                  });
                }

                if (data.length != 0 && data != undefined) {
                  this.props.addCredentials({
                    flightDateNext: data[0].flightDateNext,
                    flightDatePrev: data[0].flightDatePrev,
                  });
                  // if (this.props.searchobject.withFilters == "true") {
                  //   this.props.addFilters({ airlines: data.airlines });

                  // }
                  this.setState(
                    {
                      flights: data,
                      Allflights: data,
                      loading: false,
                    },
                    () => this.getingAirlines()
                  );
                } else {
                  this.setState({
                    flights: null,
                    Allflights: null,

                    loading: false,
                  });
                  this.props.messageBoxModify({
                    state: true,
                    color: false,
                    message: "لطفا از تقویم روز دیگری را انتخاب کنید",
                  });
                }
              });
          });
      }
    } else if (this.props.searchobject.source != "") {
      this.setState({
        loading: true,
        open: false,
        flightDatePersian: flightdate,
        sourceName: src,
      });

      // fetch(`${globals.baseUrl2}BilitAirLines/getFlights`, {
      //   method: "POST",
      //   body: JSON.stringify({ ...this.props.searchobject }),
      //   headers: { "Content-Type": "application/json" },
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.length != 0 && data != undefined) {
      //       this.props.addCredentials({
      //         flightDateNext: data[0].flightDateNext,
      //         flightDatePrev: data[0].flightDatePrev,
      //       });

      //       if (this.props.searchobject.withFilters == "true") {
      //         this.props.addFilters({ airlines: data.airlines });

      //       }
      // Get Flights List
      //      this.setState({ loading: true, open: false });
      fetch(`${globals.baseUrl2}BilitAirLines/getFlights`, {
        method: "POST",
        body: JSON.stringify({ ...this.props.searchobject }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {

          if (data.length != 0 && data != undefined) {
            this.props.addCredentials({
              flightDateNext: data[0].flightDateNext,
              flightDatePrev: data[0].flightDatePrev,
            });
            // if (this.props.searchobject.withFilters == "true") {
            //   this.props.addFilters({ airlines: data.airlines });

            // }
            this.setState(
              {
                flights: data,
                loading: false,
                Allflights: data,
              },
              () => this.getingAirlines()
            );
          } else {
            this.setState({
              flights: null,
              Allflights: null,
              loading: false,
            });
            this.props.messageBoxModify({
              state: true,
              color: false,
              message: "لطفا از تقویم روز دیگری را انتخاب کنید",
            });
          }
        });
    }
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
    fetch(`${globals.baseUrl2}BilitAirLines/getFlights`, {
      method: "POST",
      body: JSON.stringify({ ...this.props.searchobject }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length != 0 && data != undefined) {
          this.props.addCredentials({
            flightDateNext: data[0].flightDateNext,
            flightDatePrev: data[0].flightDatePrev,
          });
          // if (this.props.searchobject.withFilters == "true") {
          //   this.props.addFilters({ airlines: data.airlines });

          // }
          this.setState(
            {
              flights: data,
              loading: false,
              Allflights: data,
            },
            () => this.getingAirlines()
          );
        } else {
          this.setState({
            flights: null,
            Allflights: null,

            loading: false,
          });
          this.props.messageBoxModify({
            state: true,
            color: false,
            message: "لطفا از تقویم روز دیگری را انتخاب کنید",
          });
        }
      });
  };

  changeDate = (date) => {
    const changedDateGregorian = moment(date, "jYYYY/jMM/jDD")
      .local("en")
      .format("YYYY/MM/DD");
    this.props
      .addCredentials({
        withFilters: false,
        currentPage: 1,
        stDate: changedDateGregorian,
        flightDatePersian: String(date).replace("-", "/").replace("-", "/"),
      })
      .then(() => {
        if (history.pushState) {
          history.pushState(
            null,
            null,
            `#${String(date).replace("-", "/").replace("-", "/")}`
          );
        } else {
          location.hash = `#${String(date)
            .replace("-", "/")
            .replace("-", "/")}`;
        }

        this.getData();
      });
    // .then(() => {
    //   this.getData();
    // });
  };

  setReserveBoxData = (oneFlight) => {
    this.setState({ reserveBoxData: oneFlight, openReserve: true });
  };

  getUniqData = (array) => {
    const twoDArray = array.map((data) => [data.airlineIataCode, data]);
    const uniqMap = new Map(twoDArray);

    return Array.from(uniqMap.values());
  };

  handleFindTickets = (tickets) => {
    this.setState({
      flights: tickets,
    });
  };

  render() {
    const pathquery = this.props.router.asPath;
    const path = pathquery.split("#")[0];
    const src = decodeURI(path.split("/")[2]).split("-to-")[0];
    const srccod = decodeURI(path.split("/")[3]).split("-")[1];
    const dest = decodeURI(path.split("/")[2]).split("-to-")[1];
    const destcod = decodeURI(path.split("/")[3]).split("-")[2];

    return (
      <div className="container">
        <Scrolltoprefresh />
        {!this.state.loading && (
          <div className="row text-right">
            {window.innerWidth > 826 ? (
              <div className="col-xl-12 mt-2 col-lg-12 col-md-12 col-sm-12 mt-1">
                <div className="row">
                  <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 padding-5px">
                    <FlightSearchBox
                      refreshAction={this.getData}
                      len={this.state.flights}
                    />
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 padding-5px m-auto">
                    <div className="row">
                      <div className="col-lg-6 col-6">
                        <a
                          className="btn-outlined col-12 btn-block prev-next-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            let today = moment()
                              .format("jYYYY/jMM/jDD")
                              .split("/")[2];
                            const date_ =
                              this.props.searchobject.flightDatePrev;
                            if (
                              date_ != null &&
                              parseInt(today) <= parseInt(date_.split("-")[2])
                            ) {
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
                      <div className="col-lg-6 col-6">
                        <a
                          className="btn-outlined col-12 btn-block  prev-next-btn"
                          onClick={() => {
                            const date_ =
                              this.props.searchobject.flightDateNext;
                            if (date_ != null) {
                              this.changeDate(date_);
                              // window.Filters.reload();
                              localStorage.clear();
                            }
                            // this.Filters.checked == false;
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
            ) : null}
          </div>
        )}



        <div className="row">
          {/* <div className="col-lg-1 col-md-1 col-sm-1"></div> */}
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row min-height">
              <div className="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-12 padding-5px">
                {/* <FutureDays refreshAction={this.getData}  /> */}
                {this.state.loading ? (
                  <div className="mt-5 d-flex h-50 justify-content-center align-items-center">
                    <NewLoader
                      title={`بلیطجا در حال یافتن بهترین پرواز از ${this.props.credentials.sourceName} به ${this.props.credentials.destinationName} در تاریخ ${this.props.credentials.flightDatePersian} است...`}
                    />
                  </div>
                ) : this.state.flights != null ? (
                  <div>
                    {/*{window.innerWidth < 826 ? (*/}
                    {/*  <div className="visible-xs">*/}
                    {/*    <ShowFlightListMobile*/}
                    {/*      setReserveBoxData={this.setReserveBoxData}*/}
                    {/*      flightList={this.state.flights}*/}
                    {/*      search={() => this.managePopUpSearch(true)}*/}
                    {/*      filter={() =>*/}
                    {/*        this.setState({*/}
                    {/*          slide: true,*/}
                    {/*        })*/}
                    {/*      }*/}
                    {/*    />*/}
                    {/*  </div>*/}
                    {/*) : null}*/}

                    {/*{window.innerWidth >= 826 ? (*/}
                    {/*  <div className={styles["hidden-xs-flight"]}>*/}
                      <div className={'isMobile'} style={{marginTop:'20px'}}>
                          <div
                              className={` ${styles["mobile-flight-list-header"]} font-bold-iransanse`}
                          >
                              <p className="font-light-iransans pt-1 pb-3">
                                  خريد بليط هواپيما{" "}
                                  <span className="color-secondary font-bold-iransanse">
                {this.state.flights.length != 0
                    ? this.state.flights[0]?.source
                    : ""}
              </span>{" "}
                                  به{" "}
                                  <span className="color-secondary font-bold-iransanse">
                {this.state.flights.length != 0
                    ? this.state.flights[0]?.destinate
                    : ""}
              </span>
                              </p>
                              <p className={`${styles["date-style"]}`}>
                                  {this.state.flights.length != 0
                                      ? getweekday(this.state.flights[0]?.flightDay)
                                      : ""}{" "}
                                  &nbsp;
                                  {this.state.flights.length != 0
                                      ? `${this.state.flights[0]?.flightDate}`
                                      : ""}
                              </p>
                          </div>
                      </div>
                      <ShowFlightList
                          setReserveBoxData={this.setReserveBoxData}
                          flightList={this.state.flights}
                      />
                      {/*</div>*/}
                      {/*) : null}*/}
                  </div>
                ) : (
                    <>
                        <p style={{marginTop: 40}} className="text-center mx-3">
                            متاسفانه هیچ پروازی از{" "}
                            <strong style={{color: "#e20000"}}>
                                {
                                    this.props.airports.find(
                                        (x) => x.airportNameEn == src
                                    ).airportName
                                }
                            </strong>{" "}
                            <strong>به </strong>
                            <strong style={{color: "#e20000"}}>
                                {
                                    this.props.airports.find(
                                        (x) => x.airportNameEn == dest
                                    ).airportName
                                }
                      </strong>{" "}
                      یافت نشد لطفا از تقویم انتخاب کنید.
                    </p>
                    <MinimumPriceCalendar refreshAction={this.getData} />
                  </>
                )}
              </div>
              <div
                className={`col-xl-3 col-lg-3 col-md-3 col-sm-4 ${styles["flight-filter-box"]} ${styles["hidden-xs-flight"]}`}
              >
                <div className={styles["marginLeftFilter"]}>
                  <Filters
                    getData={this.getData}
                    closeSide={() => {
                      this.setState({
                        slide: false,
                      });
                    }}
                    Airlines={this.getUniqData(this.state.airlines)}
                    realData={this.state.Allflights}
                    setFilter={this.handleFindTickets}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <PopUp opened={this.state.open} closePopUp={this.managePopUpSearch}>
          <div className="popup-content-container">
            <div className="popup-heading d-flex align-items-center justify-content-between my-2">
              <span>جستجو مجدد</span>
              <span
                className="closeBtn"
                onClick={() => {
                  this.managePopUpSearch(false);
                }}
              >
                <div
                  style={{ color: "#e20000" }}
                  className="font-bold font-size-15"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="15"
                    height="15"
                    viewBox="0 0 30 30"
                    fill="#e20000"
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                </div>
              </span>
            </div>
            <div className="flight">
              <FlightSearchBox
                showSwitch={true}
                refreshAction={this.getData}
                length={this.state.flights}
              />
            </div>
          </div>
        </PopUp>

        {this.state.reserveBoxData ? (
          <PopUp
            opened={this.state.openReserve}
            closePopUp={this.managePopUpReserve}
          >
            <div className="popup-content-container">
              <div className="d-flex align-items-center justify-content-between">
                <span className="font-iransanse">انتخاب تعداد مسافران</span>
                <span
                  className="exit-form pb-1Important"
                  onClick={() => {
                    this.managePopUpReserve(false);
                  }}
                >
                  <div
                    style={{ color: "#2083b9" }}
                    className="font-bold font-size-15"
                  >
                    x
                  </div>
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
            Airlines={this.getUniqData(this.state.airlines)}
            realData={this.state.Allflights}
            setFilter={this.handleFindTickets}
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
              const date_ = this.props.searchobject.flightDatePrev;
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
              const date_ = this.props.searchobject.flightDateNext;
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
  searchobject: selectSearchObject(state),
  airports: selectAirports(state),
  credentials: selectCredentials(state),
});

const mapDispatchesToProps = (dispatch) => ({
  setAirports: (value) => dispatch(loadAirports(value)),
  addFilters: (value) => dispatch(addFilters(value)),
  addCredentials: async (value) => dispatch(addCredentials(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
  getUserInfo: (value) => dispatch(getUserInfo(value)),
  checkUserLogged: () => dispatch(checkUserLogged()),
});
export default withRouter(
  connect(mapStatesToProps, mapDispatchesToProps)(GetFlightList)
);
