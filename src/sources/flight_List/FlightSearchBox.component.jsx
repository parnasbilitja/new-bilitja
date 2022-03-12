import React from "react";
import styles from "../../../styles/FlightSearchBox.module.scss";
import PrimaryButton from "../component/PrimaryButton.component";
import PrimaryTextInputMobile from "../component/PrimaryTextInputMobile";
import PrimaryTextInput from "../component/PrimarySelectInput.component";
import Airports from "../base/Airports.component";
import AirportsMobile from "../base/AirportsMobile.component";
import PopUp from "../component/PopUp.component";
import PopUpWide from "../component/PopUpWide.component";
import CalendarComponent from "../calendar/Calendar.component";
import Filters from "./Filters.component";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import { selectCredentials } from "../../Redux/Search/search.reselect";
import { addCredentials, switchRoute } from "../../Redux/Search/search.action";
import { messageBoxModify } from "../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import Scrolltoprefresh from "../component/Scrolltoprefresh";

//import BirthdayCalendar from "../calendar/BirthdayCalendar.component"

class FlightSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceSearch: "",
      destinationSearch: "",
      width: 0,
      open: false,
      openSource: false,
      openDestination: false,
      suggestSource: false,
      suggestDestination: false,
      mobileSearchTerm: "",
      searchTermSource: "",
      searchTermDestination: "",
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    // window.addEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.props.addCredentials({
      [name]: value,
    });
  };
  handleChangeCre = (event) => {
    const { name, value } = event.target;
    this.props.addCredentials({
      [name]: value,
    });
    if (name == "sourceName") {
      this.setState({
        searchTermSource: value,
      });
    } else {
      this.setState({
        searchTermDestination: value,
      });
    }
  };
  // for mobile
  managePopUpCalendar = (value) => {
    this.setState({
      open: value,
    });
  };
  // for mobile
  managePopUpSource = (value) => {
    this.setState({
      openSource: value,
      mobileSearchTerm: "",
    });
  };
  // for mobile
  managePopUpDestination = (value) => {
    this.setState({
      openDestination: value,
      mobileSearchTerm: "",
    });
  };
  // for mobile
  mobileHandleSearchTerm = (value) => {
    this.setState({
      mobileSearchTerm: value,
    });
  };
  // for desktop
  manageSuggestSource = (value) => {
    this.setState({
      suggestSource: value,
      searchTermSource: "",
    });
  };
  // for desktop
  manageSuggestDestination = (value) => {
    this.setState({
      suggestDestination: value,
      searchTermDestination: "",
    });
  };
  validation = () => {
    const {
      credentials: {
        sourceName,
        destinationName,
        sourceNameEn,
        destinationNameEn,
        flightDatePersian,
        source,
        dest,
        stDate,
        typeOfCalendar,
      },
    } = this.props;
    if (sourceName == "" || source == "") {
      return false;
    }

    if (destinationName == "" || dest == "") {
      return false;
    }
    if (flightDatePersian == "") {
      return false;
    }
    return true;
  };
  render() {
    const mobileSize = 626;
    const {
      credentials: {
        sourceName,
        destinationName,
        sourceNameEn,
        destinationNameEn,

        flightDatePersian,
        stDate,
        typeOfCalendar,
      },
      history,
    } = this.props;
    console.log("flightDatePersian");
    console.log(flightDatePersian);
    return (
      <div className={styles["home-flight-form"]}>
        <div>
          <Scrolltoprefresh />
          <div
            className={` form-input-border  ${styles["form-input-border-private"]} `}
          >
            <i className="bilitja icon-plane-departure form-input-icon rotate-y-180"></i>
            {/* className={`bilitja icon-plane-departure  ${styles["nav-icon"]} rotate-y-180`} */}
            <PrimaryTextInputMobile
              value={sourceName}
              // readonlyattr={this.state.width <= mobileSize ? "true" : "false"}
              name="sourceName"
              onFocus={(e) => {
                // for mobile
                if (this.state.width <= mobileSize) {
                  e.preventDefault();
                  this.managePopUpSource(true);
                } else {
                  this.manageSuggestSource(true);
                }
              }}
              onChange={this.handleChangeCre}
              placeholder={"مبدا خود را وارد کنید"}
            />

            {this.state.suggestSource ? (
              <Airports
                credenrialType="source"
                closeSuggest={this.manageSuggestSource}
                searchTerm={this.state.searchTermSource}
              />
            ) : null}
          </div>
        </div>

        <div
          className={`${
            this.props.showSwitch ? null : "hidden-xs"
          } form-input-border text-center ${
            styles["home-swtich-button-container"]
          }`}
          onClick={() => {
            this.props.switchRoute();
          }}
        >
          <FontAwesomeIcon
            icon={faExchangeAlt}
            className={`${styles["home-swtich-button"]} exchange-icon`}
          />
        </div>

        <div>
          <div
            className={` form-input-border  ${styles["form-input-border-private"]} `}
          >
            <i className="bilitja ltr icon-plane-departure form-input-icon rotate-upsidedown-reverse rotate-x-180"></i>
            <PrimaryTextInputMobile
              value={destinationName}
              // readonlyattr={this.state.width <= mobileSize ? "true" : "false"}
              name="destinationName"
              onFocus={(e) => {
                // for mobile
                if (this.state.width <= mobileSize) {
                  e.preventDefault();
                  this.managePopUpDestination(true);
                } else {
                  this.manageSuggestDestination(true);
                }
              }}
              onChange={this.handleChangeCre}
              placeholder={"مقصد خود را وارد کنید"}
            />
            {this.state.width > mobileSize && this.state.suggestDestination ? (
              <Airports
                credenrialType="destination"
                closeSuggest={this.manageSuggestDestination}
                searchTerm={this.state.searchTermDestination}
              />
            ) : null}
          </div>
        </div>

        <div
          className={` form-input-border  ${styles["form-input-border-private"]} `}
        >
          <i className="bilitja icon-calendar form-input-icon-larger "></i>

          <PrimaryTextInputMobile
            placeholder={" تاریخ پرواز رفت"}
            readOnly
            value={typeOfCalendar == "GAR" ? stDate : flightDatePersian}
            onFocus={(e) => {
              e.preventDefault();
              this.managePopUpCalendar(true);
            }}
          />
        </div>
        <div className=" without-focus">
          <PrimaryButton
            style={{ height: "45px", marginTop: "7px" }}
            defaultValue={"جستجو"}
            onClick={() => {
              if (!this.validation()) {
                this.props.messageBoxModify({
                  state: true,
                  message: "لطفا اطلاعات را کامل وارد کنید",
                });
                return;
              }

              const pathquery = this.props.router.asPath;
              const path = pathquery.split("#")[0];
              const src = decodeURI(path.split("/")[2]).split("-to-")[0];
              const srccod = decodeURI(path.split("/")[3]).split("-")[1];
              const dest = decodeURI(path.split("/")[2]).split("-to-")[1];
              const destcod = decodeURI(path.split("/")[3]).split("-")[2];

              if (
                src != this.props.credentials.sourceNameEn ||
                dest != this.props.credentials.destinationNameEn
              ) {
                if (this.props.refreshAction) {
                  this.props
                    .addCredentials({
                      withFilters: false,
                      currentPage: 1,
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
              } else {
                this.props
                  .addCredentials({
                    withFilters: false,
                    currentPage: 1,
                  })
                  .then(() => {
                    this.props.router.push(
                      `/flights/${this.props.credentials.sourceNameEn}-to-${this.props.credentials.destinationNameEn}/airfares-${this.props.credentials.source}-${this.props.credentials.dest}#${this.props.credentials.flightDatePersian}`
                    );
                    this.props.refreshAction();
                  });
              }
            }}
          />
        </div>

        <PopUpWide
          opened={this.state.open}
          closePopUp={this.managePopUpCalendar}
        >
          <div className={styles["flight-search-box-calendar-container"]}>
            <CalendarComponent
              setDate={(value) => {
                this.props.addCredentials({
                  stDate: value.garigorian,
                  flightDatePersian: value.jalali,
                  typeOfCalendar: value.typeOfCalendar,
                });
              }}
              closePopUpCalendar={this.managePopUpCalendar}
            />
          </div>
        </PopUpWide>
        {
          // for mobile
          this.state.width <= mobileSize ? (
            <PopUp
              opened={this.state.openSource}
              closePopUp={this.managePopUpSource}
            >
              <AirportsMobile
                credenrialType="source"
                searchTerm={this.state.mobileSearchTerm}
                handleChange={this.mobileHandleSearchTerm}
                closePopUp={this.managePopUpSource}
                title="مبدا"
              />
            </PopUp>
          ) : null
        }
        {
          // for mobile
          this.state.width <= mobileSize ? (
            <PopUp
              opened={this.state.openDestination}
              closePopUp={this.managePopUpDestination}
            >
              <AirportsMobile
                credenrialType="destination"
                searchTerm={this.state.mobileSearchTerm}
                handleChange={this.mobileHandleSearchTerm}
                closePopUp={this.managePopUpDestination}
                title="مقصد"
              />
            </PopUp>
          ) : null
        }
      </div>
    );
  }
}

const mapStatesToProps = (state) => ({
  credentials: selectCredentials(state),
});
const mapDispatchesToProps = (dispatch) => ({
  addCredentials: async (value) => dispatch(addCredentials(value)),
  switchRoute: async () => dispatch(switchRoute()),
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(
  connect(mapStatesToProps, mapDispatchesToProps)(FlightSearchBox)
);
