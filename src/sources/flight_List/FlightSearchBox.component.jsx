import React, { useEffect, useState } from "react";
import styles from "../../../styles/FlightSearchBox.module.scss";
import PrimaryButton from "../component/PrimaryButton.component";
import PrimaryTextInputMobile from "../component/PrimaryTextInputMobile";
import PrimaryTextInput from "../component/PrimarySelectInput.component";
import Airports from "../base/Airports.component";
import AirportsMobile from "../base/AirportsMobile.component";
import PopUp from "../component/PopUp.component";
import PopUpWide from "../component/PopUpWide.component";
import CalendarComponent from "../calendar/Calendar.component";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import { selectCredentials } from "../../Redux/Search/search.reselect";
import { addCredentials, switchRoute } from "../../Redux/Search/search.action";
import { messageBoxModify } from "../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import Scrolltoprefresh from "../component/Scrolltoprefresh";
//import BirthdayCalendar from "../calendar/BirthdayCalendar.component"

const FlightSearchBox = (props) => {
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])
  const [state, setState] = useState({
    searchBool: false,
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
      setState({
        ...state,
        searchTermSource: value,
      });
    } else {
      setState({
        ...state,
        searchTermDestination: value,
      });
    }
  };
  const [list, setList] = useState({})
  const handleFocusOut = (event) => {
    console.log(list);
    const { name, value } = event.target;
    setList({ ...list, [name]: value });
    props.addCredentials({
      [name]: list[name],
    });
  };
  const handleFocus = (event) => {
    console.log(list);
    const { name, value } = event.target;
    setList({ ...list, [name]: value });
    props.addCredentials({
      [name]: '',
    });
  };
  // for mobile
  const managePopUpCalendar = (value) => {
    setState({
      ...state,
      open: value,
    });
  };
  // for mobile
  const managePopUpSource = (value) => {
    setState({
      ...state,
      openSource: value,
      mobileSearchTerm: "",
    });
  };
  // for mobile
  const managePopUpDestination = (value) => {
    setState({
      ...state,
      openDestination: value,
      mobileSearchTerm: "",
    });
  };
  // for mobile
  const mobileHandleSearchTerm = (value) => {
    setState({
      ...state,
      mobileSearchTerm: value,
    });
  };
  // for desktop
  const manageSuggestSource = (value) => {
    setState({
      ...state,
      suggestSource: value,
      searchTermSource: "",
    });
  };
  // for desktop
  const manageSuggestDestination = (value) => {
    setState({
      ...state,
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
    <div style={{marginTop:'12px'}} className={`${styles["home-flight-form"]}`}>
      <div className="position-relative">
        <Scrolltoprefresh />
        <div
          className={` form-input-border  ${styles["prs-input"]} `}>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="23" viewBox="0 0 39.655 27.135">
            <g id="_044-Departures" data-name="044-Departures" transform="translate(0 0)">
              <path id="Path_1760" data-name="Path 1760" d="M38.872,406.966H.782a.782.782,0,1,0,0,1.564h38.09a.782.782,0,1,0,0-1.564Z" transform="translate(0 -381.396)" fill="#808285"/>
              <path id="Path_1761" data-name="Path 1761" d="M.84,93.474,6.6,97.414a7.741,7.741,0,0,0,7.611.621l5.68-2.654a.782.782,0,0,0-.662-1.417l-5.679,2.654a6.172,6.172,0,0,1-6.066-.5L2.719,92.864l2.146-1.316,5.522,1.832a.782.782,0,0,0,.58-.035l6.58-3.1a.782.782,0,0,0,.151-1.322L10.437,83.2l2.824-1.441,13.061,4.132a.783.783,0,0,0,.569-.038l8.738-4.106a2.117,2.117,0,0,1,2.666,1.01,2.04,2.04,0,0,1-.962,2.762L25.594,91.005a.782.782,0,1,0,.662,1.417l11.738-5.484a3.6,3.6,0,0,0,1.7-4.879A3.7,3.7,0,0,0,35,80.316l-.026.012L26.5,84.31,13.427,80.173a.782.782,0,0,0-.591.049l-4.2,2.142a.782.782,0,0,0-.129,1.311l7.227,5.695L10.583,91.8,5.012,89.949a.783.783,0,0,0-.655.076L.872,92.162A.782.782,0,0,0,.84,93.474Z" transform="translate(-0.46 -80.037)" fill="#808285"/>
              <path id="Path_1762" data-name="Path 1762" d="M275.277,238.18a.781.781,0,1,0,1.038.377A.781.781,0,0,0,275.277,238.18Z" transform="translate(-253.331 -225.743)" fill="#808285"/>
            </g>
          </svg>

          <PrimaryTextInputMobile
            value={sourceName}
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
      {/* <div className="position-absolute isMobile" style={{ display: "none", top: 275, left: 65, zIndex: 2, transform: "rotate(90deg)" }}>
        <div className="image d-flex align-items-center bg-white check-r py-2 px-2"
          onClick={() => {
            props.switchRoute();
          }}>
          <FontAwesomeIcon
            icon={faExchangeAlt}
            className={`${styles["home-swtich-button"]} exchange-icon font-size-17`}
          />
        </div>
      </div> */}
      <div className="position-relative d-flex align-items-center justify-content-center">
        <div style={{width:'100%',background:'#fff',height:'55px',borderRadius:'10px'}}
          className={`${props.showSwitch ? null : ""
            } form-input-border d-flex align-items-center justify-content-center back-fa text-center ${styles["home-swtich-button-container"]
            }`}
          onClick={() => {
            props.switchRoute();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 18.828 22.828">
            <g id="Left_Right_1" data-name="Left Right 1" transform="translate(0.414 0.414)">
              <path id="Path_1003" data-name="Path 1003" d="M12,21l5-5m0,0H1m16,0-5-5" fill="none" stroke="#4b4b4b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              <path id="Path_1004" data-name="Path 1004" d="M6,11,1,6M1,6H17M1,6,6,1" fill="none" stroke="#4b4b4b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </g>
          </svg>

        </div>
      </div>

      <div>
        <div
          className={` form-input-border  ${styles["prs-input"]} `}
        >
          {" "}
          <svg id="_046-arrivals" data-name="046-arrivals" xmlns="http://www.w3.org/2000/svg" width="33" height="25" viewBox="0 0 37.922 29.591">
            <path id="Path_1767" data-name="Path 1767" d="M31.575,65.451a7.4,7.4,0,0,0,5.178,5.15l5.787,1.565a.748.748,0,1,0,.391-1.444l-5.787-1.565a5.9,5.9,0,0,1-4.127-4.1l-1.473-5.323,2.38.362,2.9,4.746a.748.748,0,0,0,.445.332l6.72,1.8a.748.748,0,0,0,.926-.873l-1.775-8.66,2.952.689L53.091,69.2a.748.748,0,0,0,.439.323l8.918,2.391A2.025,2.025,0,0,1,63.772,74.3a1.951,1.951,0,0,1-2.407,1.425l-11.96-3.236a.748.748,0,1,0-.391,1.444l11.96,3.236a3.47,3.47,0,0,0,.908.122,3.452,3.452,0,0,0,3.343-2.639,3.541,3.541,0,0,0-2.351-4.168l-.026-.007L54.2,68.152l-7-11.089a.747.747,0,0,0-.462-.329l-4.388-1.025a.748.748,0,0,0-.9.879l1.767,8.619L37.949,63.8l-2.93-4.787a.748.748,0,0,0-.525-.349l-3.865-.588a.748.748,0,0,0-.833.939Z" transform="translate(-27.541 -55.689)" fill="#808285"/>
            <path id="Path_1768" data-name="Path 1768" d="M236.481,268.478a.747.747,0,1,0,.916-.526A.747.747,0,0,0,236.481,268.478Z" transform="translate(-218.769 -252.051)" fill="#808285"/>
            <path id="Path_1769" data-name="Path 1769" d="M37.174,431.31H.748a.748.748,0,0,0,0,1.5H37.174a.748.748,0,1,0,0-1.5Z" transform="translate(0 -403.215)" fill="#808285"/>
          </svg>

          <PrimaryTextInputMobile
            value={destinationName}
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
        className={` form-input-border  ${styles["prs-input"]} `}
      >
        <svg id="_014-directional_sign" data-name="014-directional sign" xmlns="http://www.w3.org/2000/svg" width="19" height="29" viewBox="0 0 24.713 35.125">
          <path id="Path_1671" data-name="Path 1671" d="M99.009,14.833H89.746V13.475H94.9a.694.694,0,0,0,.4-.126l4.108-2.881A.694.694,0,0,0,99.4,9.327L95.294,6.511A.694.694,0,0,0,94.9,6.39H89.746V5.021h4.566a.694.694,0,0,0,.694-.694V.694A.694.694,0,0,0,94.311,0H80.381a.694.694,0,0,0-.694.694V4.327a.694.694,0,0,0,.694.694h4.566V6.39H75.684a.694.694,0,0,0-.694.694v5.7a.694.694,0,0,0,.694.694h9.263v1.358H79.791a.694.694,0,0,0-.4.126L75.285,17.84a.694.694,0,0,0,.006,1.141L79.4,21.8a.694.694,0,0,0,.392.122h5.155V34.43a.694.694,0,0,0,.694.694h3.411a.694.694,0,0,0,.694-.694V21.918h9.263a.694.694,0,0,0,.694-.694v-5.7A.694.694,0,0,0,99.009,14.833ZM81.075,1.388H93.617V3.633H81.075V1.388Zm5.26,3.633h2.022V6.39H86.335Zm-9.957,5.612H82a.694.694,0,1,0,0-1.388H76.378V7.778H94.686l3.1,2.128-3.108,2.18h-18.3Zm9.957,2.841h2.022v1.358H86.335Zm2.022,20.261H86.335V21.918h2.022Zm.694-13.206H80.006L76.9,18.4l3.108-2.18h18.3v1.456H92.692a.694.694,0,0,0,0,1.388h5.623V20.53Z" transform="translate(-74.99)" fill="#808285"/>
          <circle id="Ellipse_211" data-name="Ellipse 211" cx="0.694" cy="0.694" r="0.694" transform="translate(9.42 9.208)" fill="#808285"/>
          <circle id="Ellipse_212" data-name="Ellipse 212" cx="0.694" cy="0.694" r="0.694" transform="translate(13.88 17.608)" fill="#808285"/>
        </svg>


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
      <div className=" without-focus">
        {/* {console.log(props)} */}
        <PrimaryButton type={'index'}
          style={{ height: "55px", marginTop: "7px",fontSize:'14px',fontWeight:'600',textAlign:'center',borderRadius: "10px"}}
          value={
            state.searchReset == false ? "جستجو" : "لطفا صبر کنید..."
          }
          onClick={() => {
            setState({ ...state, searchReset: true })
            if (!validation()) {
              setState({ ...state, searchReset: false })
              props.messageBoxModify({
                state: true,
                color: false,
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
                setState({ ...state, searchReset: true })
                props
                  .addCredentials({
                    withFilters: false,
                    currentPage: 1,
                  })
                  .then(() => {
                    props.router.push(
                      `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                    );
                    props.refreshAction();
                  });
              } else {
                props.router.push(
                  `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                );
              }
            } else {
              setState({ ...state, searchReset: false })
              props
                .addCredentials({
                  withFilters: false,
                  currentPage: 1,
                })
                .then(() => {
                  console.log('props.type', props.type)
                  if (props.type == 'panel') {
                    return
                  } else {
                    props.router.push(
                      `/flights/${props.credentials.sourceNameEn}-to-${props.credentials.destinationNameEn}/airfares-${props.credentials.source}-${props.credentials.dest}#${props.credentials.flightDatePersian}`
                    );
                  }
                  props.refreshAction();
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
