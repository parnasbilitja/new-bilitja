import React, { useEffect, useState } from "react";
import styles from "../../../../styles/TourSearchBox.module.scss";
import PrimaryButton from "../../../sources/component/PrimaryButton.component";
import PrimaryTextInputMobile from "../../../sources/component/PrimaryTextInputMobile";
import PrimaryTextInput from "../../../sources/component/PrimaryTextInput.component";
import Cities from "./subComponents/Cities.component";
import PopUpWide from "./subComponents/PopUpWide.component";
import CalendarComponent from "./calendar/Calendar.component";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectCredentials } from "../../../Redux/Search/search.reselect";
import {
  addCredentials,
  switchRoute,
} from "../../../Redux/Search/search.action";
import { messageBoxModify } from "../../../Redux/UI/ui.action";
import { useRouter, withRouter } from "next/router";
import Scrolltoprefresh from "../../../sources/component/Scrolltoprefresh";
import axios from "axios";
import {
  setOrgLoc,
  setDestLoc,
  setFlightDate,
  setNightNumber,
} from "../../../Redux/newTours/Action";
import DropdownComponent from "./subComponents/Dropdown.component";
import { isEmpty, jalaliDateReformater } from "../../../Utils/newTour";
import { Err, ErrSuccess, NotifAlert } from "./NotifAlert.component";

const TourSearchBox = (props) => {
  const getDestandOrgCities = () => {
    axios
      .post("https://hotelobilit-api.iran.liara.run/api/v1/cities", {
        hasHotel: 1,
        hasFlight: 0,
      })
      .then((res) => {
        const destLoc = res.data.data;
        setDestCities(destLoc);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("https://hotelobilit-api.iran.liara.run/api/v1/cities", {
        hasHotel: 0,
        hasFlight: 1,
      })
      .then((res) => {
        const orgLoc = res.data.data;

        setOrgCities(orgLoc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [width, setWidth] = useState();
  const [citiesData, setCitiesData] = useState({
    origin: {},
    destination: {},
    date: {},
    night: "",
  });
  const [destCities, setDestCities] = useState([]);
  const [orgCities, setOrgCities] = useState([]);
  //to get available date & night
  const [dateAndNight, setDateAndNight] = useState([]);
  const [nights, setNights] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setWidth(window.innerWidth);
    getDestandOrgCities();

    // if (props.selectedSrc && props.selectedDest) {
    //   // console.log("from tour", props);
    // }

    ///////////////////////
  }, [props.selectedSrc, props.selectedDest]);

  useEffect(() => {
    /////get avalaible dates and night number based on Org & Dset
    if (
      !isEmpty(props.destandorgcities.destination) &&
      !isEmpty(props.destandorgcities.origin)
    ) {
      axios
        .get(
          `https://hotelobilit-api.iran.liara.run/api/v1/cities/getDates/${props.destandorgcities.origin.code}/${props.destandorgcities.destination.code}`
        )
        .then((res) => {
          setDateAndNight(res.data.data);
        });
    }
    // else {
    //   return false;
    // }
    if (props.destandorgcities.date.miladiDate) {
      const nightsNumber = dateAndNight.filter(
        (datenight) => datenight.date === props.destandorgcities.date.miladiDate
      );
      setNights(nightsNumber);
    }
    // else {
    //   return false;
    // }
  }, [
    props.destandorgcities.destination,
    props.destandorgcities.origin,
    props.destandorgcities.date.miladiDate,
  ]);

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
      setState({ ...state, searchTermSource: value });
    } else {
      setState({ ...state, searchTermDestination: value });
    }
  };
  const [list, setList] = useState({});
  const handleFocusOut = (event) => {
    // console.log(list);
    const { name, value } = event.target;
    setList({ ...list, [name]: value });
    props.addCredentials({
      [name]: list[name],
    });
  };
  const handleFocus = (event) => {
    // console.log(list);
    const { name, value } = event.target;
    setList({ ...list, [name]: value });
    props.addCredentials({
      [name]: "",
    });
  };
  // for mobile
  const managePopUpCalendar = (value) => {
    setState({ ...state, open: value });
  };
  // for mobile
  const managePopUpSource = (value) => {
    setState({ ...state, openSource: value, mobileSearchTerm: "" });
  };
  // for mobile
  const managePopUpDestination = (value) => {
    setState({ ...state, openDestination: value, mobileSearchTerm: "" });
  };
  // for mobile
  const mobileHandleSearchTerm = (value) => {
    setState({ ...state, mobileSearchTerm: value });
  };
  // for desktop
  const manageSuggestSource = (value) => {
    setState({ ...state, suggestSource: value, searchTermSource: "" });
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
      destandorgcities: { origin, destination, date, night },
    } = props;
    if (!origin.code) {
      return false;
    }

    if (!destination.code) {
      return false;
    }
    if (date === {} || (!date.miladiDate && !date.persianDate)) {
      return false;
    }
    if (!night) {
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

  return (
    <>
      <NotifAlert />
      <div className={styles["home-flight-form"]}>
        <div style={{ position: "relative" }}>
          <Scrolltoprefresh />
          <div
            className={` form-input-border  ${styles["form-input-border-private"]} `}
          >
            <i
              className="bilitja icon-plane-departure form-input-icon rotate-y-180"
              style={{ marginTop: "3px" }}
            ></i>
            <PrimaryTextInput
              value={props.destandorgcities.origin.name}
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
          </div>
          {state.suggestSource ? (
            <Cities
              credenrialType="source"
              closeSuggest={manageSuggestSource}
              searchTerm={state.searchTermSource}
              cities={orgCities}
              setCities={(value) => props.setOrgLoc(value)}
              setcitiesData={(val) => setCitiesData(val)}
              setFlightDate={(value) => props.setFlightDate(value)}
              setNight={(value) => props.setNightNumber(value)}
            />
          ) : null}
        </div>

        <div style={{ position: "relative" }}>
          <div
            className={` form-input-border  ${styles["form-input-border-private"]} `}
          >
            {" "}
            <i
              style={{
                color: "black",
                fontSize: 32,
                fontWeight: 500,
                marginTop: "3px",
              }}
              className="bilitja  icon-plane-departure form-input-icon rotate-upsidedown-reverse "
            ></i>
            <PrimaryTextInput
              value={props.destandorgcities.destination.name}
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
          </div>
          {width > mobileSize && state.suggestDestination ? (
            <Cities
              credenrialType="destination"
              closeSuggest={manageSuggestDestination}
              searchTerm={state.searchTermDestination}
              cities={destCities}
              setCities={(value) => props.setDestLoc(value)}
              setFlightDate={(value) => props.setFlightDate(value)}
              setNight={(value) => props.setNightNumber(value)}
            />
          ) : null}
        </div>

        <div
          className={` form-input-border  ${styles["form-input-border-private"]} `}
        >
          <i
            className="bilitja icon-calendar form-input-icon-larger "
            style={{ marginTop: "5px" }}
          ></i>
          <PrimaryTextInput
            placeholder={" تاریخ پرواز رفت"}
            readOnly="true"
            value={props.destandorgcities.date.persianDate}
            onFocus={(e) => {
              e.preventDefault();
              managePopUpCalendar(true);
            }}
          />
        </div>
        <div style={{ padding: ".5rem 0" }}>
          <DropdownComponent
            nights={nights}
            setNight={(value) => props.setNightNumber(value)}
          />
        </div>
        <div className="without-focus">
          <PrimaryButton
            style={{ height: "52px", marginTop: "9px", borderRadius: "5px" }}
            value={props.searchReset == false ? "جستجو" : "لطفا صبر کنید..."}
            onClick={(e) => {
              if (validation() === false) {
                // props.setSearchReset(false);
                // props.messageBoxModify({
                //   state: true,
                //   color: false,
                //   message: "لطفا اطلاعات را کامل وارد کنید",
                // });
                Err("لطفا اطلاعات را کامل وارد کنید");
                console.log("valis", validation());
              } else {
                // ErrSuccess("به صفحه بعد منتقل می‌شوید");
                e.preventDefault();
                const stDate = jalaliDateReformater(
                  props.destandorgcities.date.persianDate
                );

                router.push(
                  `/tours/${props.destandorgcities.origin.code}-${props.destandorgcities.destination.code}?origin=${props.destandorgcities.origin.code}&dest=${props.destandorgcities.destination.code}&stDate=${stDate}%2F03&night=${props.destandorgcities.night}`
                );
                console.log("vali", validation());
              }
            }}
          >
            {"جستجو"}
          </PrimaryButton>
        </div>

        <PopUpWide opened={state.open} closePopUp={managePopUpCalendar}>
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
              dateandnight={dateAndNight}
              setFlightDate={(value) => props.setFlightDate(value)}
            />
          </div>
        </PopUpWide>
      </div>
    </>
  );
};

const mapStatesToProps = (state) => ({
  credentials: selectCredentials(state),
  destandorgcities: state.destandoriginCitiesTour,
});
const mapDispatchesToProps = (dispatch) => ({
  addCredentials: async (value) => dispatch(addCredentials(value)),
  switchRoute: async () => dispatch(switchRoute()),
  messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
  cityTourOrg: async (value) => dispatch(fet(value)),
  setOrgLoc: async (value) => dispatch(setOrgLoc(value)),
  setDestLoc: async (value) => dispatch(setDestLoc(value)),
  setFlightDate: async (value) => dispatch(setFlightDate(value)),
  setNightNumber: async (value) => dispatch(setNightNumber(value)),
});
export default withRouter(
  connect(mapStatesToProps, mapDispatchesToProps)(TourSearchBox)
);
