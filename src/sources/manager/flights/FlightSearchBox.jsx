import React, { useEffect, useState } from "react";
import styles from "../../../../styles/FlightSearchBox.module.scss";
import PrimaryButton from "../../component/PrimaryButton.component";
import PrimaryTextInputMobile from "../../component/PrimaryTextInputMobile";
import PrimaryTextInput from "../../component/PrimarySelectInput.component";
import Airports from "../../base/Airports.component";
import AirportsMobile from "../../base/AirportsMobile.component";
import PopUp from "../../component/PopUp.component";
import PopUpWide from "../../component/PopUpWide.component";
import CalendarComponent from "../../calendar/Calendar.component";
// import Filters from "./Filters.component";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import { selectCredentials } from "../../../Redux/Search/search.reselect";
import { addCredentials, switchRoute } from "../../../Redux/Search/search.action";
import { messageBoxModify } from "../../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import Scrolltoprefresh from "../../component/Scrolltoprefresh";

const FlightSearchBox = (props) =>{
    console.log(props);
  const [width, setWidth]   = useState();
  useEffect(() => {
    setWidth(window.innerWidth)
  },[])
    const [state, setState] = useState({
      searchBool:false,
      sourceSearch: "",
      destinationSearch: "",
      width: width,
      open: false,
      openSource: false,
      openDestination: false,
      suggestSource: false,
      suggestDestination: false,
      mobileSearchTerm: "",
      searchTermSource: "",
      searchTermDestination: "",
      searchReset: false,
    });

  const handleChangeCre = (event) => {
    const { name, value } = event.target;
    props.addCredentials({
      [name]: value,
    });
    if (name == "sourceName") {
      setState({...state,
        searchTermSource: value,
      });
    } else {
      setState({...state,
        searchTermDestination: value,
      });
    }
  };
  const [list, setList] = useState({})
  const handleFocusOut = (event) => {
    console.log(list);
    const { name,value } = event.target;
    setList({...list,[name]:value});
    props.addCredentials({
      [name]: list[name],
    });
  };
  const handleFocus = (event) => {
    console.log(list);
    const { name,value } = event.target;
    setList({...list,[name]:value});
    props.addCredentials({
      [name]: '',
    });
  };
  // for mobile
  const managePopUpCalendar = (value) => {
    setState({...state,
      open: value,
    });
  };
  // for mobile
  const managePopUpSource = (value) => {
    setState({...state,
      openSource: value,
      mobileSearchTerm: "",
    });
  };
  // for mobile
  const managePopUpDestination = (value) => {
    setState({...state,
      openDestination: value,
      mobileSearchTerm: "",
    });
  };
  // for mobile
  const mobileHandleSearchTerm = (value) => {
    setState({...state,
      mobileSearchTerm: value,
    });
  };
  // for desktop
  const manageSuggestSource = (value) => {
    setState({...state,
      suggestSource: value,
      searchTermSource: "",
    });
  };
  // for desktop
  const manageSuggestDestination = (value) => {
    setState({...state,
      suggestDestination: value,
      searchTermDestination: "",
    });
  };
  const validation = () => {
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
    } = props;
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
    } = props;
    // console.log("flightDatePersian");
    // console.log(flightDatePersian);
    return (
      <div className={styles["home-flight-form"]}>
        <div>
          <Scrolltoprefresh />
          <div
            className={` form-input-border  ${styles["form-input-border-private"]} `}
          >
            <i className="bilitja icon-plane-departure form-input-icon rotate-y-180"></i>
            <PrimaryTextInputMobile
              value={sourceName}
              // readonly={state.width <= mobileSize ? "false" : "true"}
              name="sourceName"
              onClick={(e) => {
                // for mobile
                if (width <= mobileSize) {
                  e.preventDefault();
                  managePopUpSource(true);
                } else {
                  manageSuggestSource(true);
                }
              }}
              onChange={handleChangeCre}
              onFocus={handleFocus}
              onBlur={handleFocusOut}
              placeholder={"مبدا خود را وارد کنید"}
            />

            {state.suggestSource ? (
              <Airports
                credenrialType="source"
                closeSuggest={manageSuggestSource}
                searchTerm={state.searchTermSource}
              />
            ) : null}
          </div>
        </div>

        <div
          className={`${
            props.showSwitch ? null : "hidden-xs"
          } form-input-border text-center ${
            styles["home-swtich-button-container"]
          }`}
          onClick={() => {
            props.switchRoute();
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
            {" "}
            <i
              style={{ color: "black", fontSize: 32, fontWeight: 500 }}
              className="bilitja  icon-plane-departure form-input-icon rotate-upsidedown-reverse "
            ></i>
            <PrimaryTextInputMobile
              value={destinationName}
              // readonly={state.width <= mobileSize ? "false" : "true"}
              name="destinationName"
              onClick={(e) => {
                // for mobile
                if (width <= mobileSize) {
                  e.preventDefault();
                  managePopUpDestination(true);
                } else {
                  manageSuggestDestination(true);
                }
              }}
              onChange={handleChangeCre}
              onFocus={handleFocus}
              onBlur={handleFocusOut}
              placeholder={"مقصد خود را وارد کنید"}
            />
            {width > mobileSize && state.suggestDestination ? (
              <Airports
                credenrialType="destination"
                closeSuggest={manageSuggestDestination}
                searchTerm={state.searchTermDestination}
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
            readOnly='true'
            value={typeOfCalendar == "GAR" ? stDate : flightDatePersian}
            onFocus={(e) => {
              e.preventDefault();
              managePopUpCalendar(true);
            }}
          />
        </div>
        <div className="without-focus">
          <PrimaryButton
            style={{ height: "45px", marginTop: "7px" }}
            value={
              props.searchReset == false  ? "جستجو" : "لطفا صبر کنید..."
            }
            onClick={() => {
                props.setSearchReset(true)
                props.seachData()
              if (!validation()) {
                props.setSearchReset(false)
                props.messageBoxModify({
                  state: true,
                  color:false,
                  message: "لطفا اطلاعات را کامل وارد کنید",
                });
                return;
              }

              const pathquery = props.router.asPath;
              const path = pathquery.split("#")[0];
              const src = decodeURI(path.split("/")[2]).split("-to-")[0];
              const srccod = decodeURI(path.split("/")[3]).split("-")[1];
              const dest = decodeURI(path.split("/")[2]).split("-to-")[1];
              const destcod = decodeURI(path.split("/")[3]).split("-")[2];

              if (
                src != props.credentials.sourceNameEn ||
                dest != props.credentials.destinationNameEn
              ) {
                if (props.refreshAction) {
                setState({...state, searchReset:true})
                  props
                    .addCredentials({
                      withFilters: false,
                      currentPage: 1,
                    })
                    .then(() => {
                    //   props.router.push(
                    //     `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                    //   );
                    //   props.refreshAction();
                    });
                } else {
                //   props.router.push(
                //     `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                //   );
                }
              } else {
                setState({...state, searchReset:false})
                props
                  .addCredentials({
                    withFilters: false,
                    currentPage: 1,
                  })
                  .then(() => {
                    
                    // props.refreshAction();
                  });
              }
            }}
          />
        </div>

        <PopUpWide
          opened={state.open}
          closePopUp={managePopUpCalendar}
        >
          <div className={styles["flight-search-box-calendar-container"]}>
            <CalendarComponent
              setDate={(value) => {
                props.addCredentials({
                  stDate: value.garigorian,
                  flightDatePersian: value.jalali,
                  typeOfCalendar: value.typeOfCalendar,
                });
              }}
              closePopUpCalendar={managePopUpCalendar}
            />
          </div>
        </PopUpWide>
        {
          // for mobile
          width <= mobileSize ? (
            <PopUp
              opened={state.openSource}
              closePopUp={managePopUpSource}
            >
              <AirportsMobile
                credenrialType="source"
                searchTerm={state.mobileSearchTerm}
                handleChange={mobileHandleSearchTerm}
                closePopUp={managePopUpSource}
                title="مبدا"
              />
            </PopUp>
          ) : null
        }
        {
          // for mobile
          width <= mobileSize ? (
            <PopUp
              opened={state.openDestination}
              closePopUp={managePopUpDestination}
            >
              <AirportsMobile
                credenrialType="destination"
                searchTerm={state.mobileSearchTerm}
                handleChange={mobileHandleSearchTerm}
                closePopUp={managePopUpDestination}
                title="مقصد"
              />
            </PopUp>
          ) : null
        }
      </div>
    );
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
