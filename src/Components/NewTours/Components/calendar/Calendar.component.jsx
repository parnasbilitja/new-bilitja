import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addCredentials } from "../../../../Redux/Search/search.action";
import JalaliDays from "./JalaliDays";
import GarigorianDays from "./GarigorianDays";

const CalendarComponent = (props) => {
  const [state, setState] = useState({
    typeOfCalendar: "GAR",
  });
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(window.innerWidth);
    setState({
      ...state,
      typeOfCalendar: "JAL",
    });
    // console.log("from calendar", props.dateandnight);
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      style={{
        height: width > 826 ? "330px" : "406",
        overflowY: "auto",
      }}
    >
      <div className="rtl text-center mb-2">
        <button
          className="py-2 px-4 no-margin"
          //   onClick={
          //     () => {
          //     setState({
          //       ...state,
          //       typeOfCalendar: state.typeOfCalendar == "JAL" ? "GAR" : "JAL",
          //     });
          //   }
          //   }
        >
          {/* &nbsp; {state.typeOfCalendar == "JAL" ? "تقویم میلادی" : "تقویم شمسی"} */}
          &nbsp;تقویم شمسی{" "}
          {/* {state.typeOfCalendar == "JAL" ? "تقویم میلادی" : "تقویم شمسی"} */}
        </button>
      </div>

      <JalaliDays
        setDate={props.setDate}
        closePopUpCalendar={props.closePopUpCalendar}
        dateandnight={props.dateandnight}
        setFlightDate={(value) => props.setFlightDate(value)}
      />
      {/* {state.typeOfCalendar == "JAL" ? (
      ) : 
      (
        <GarigorianDays
          setDate={props.setDate}
          closePopUpCalendar={props.closePopUpCalendar}
        />
      )
      } */}
    </div>
  );
};

const mapDispatchesToProps = (dispatch) => ({
  addCredentials: (value) => dispatch(addCredentials(value)),
});
export default connect(null, mapDispatchesToProps)(CalendarComponent);
