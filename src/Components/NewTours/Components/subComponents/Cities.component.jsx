import React, { useEffect } from "react";
import { selectAirports } from "../../../../Redux/Airports/airport.reselect";
import { connect } from "react-redux";
import { selectCredentials } from "../../../../Redux/Search/search.reselect";
import { addCredentials } from "../../../../Redux/Search/search.action";
import { setDestLoc, setOrgLoc } from "../../../../Redux/newTours/Action";
import { Loader } from "../../../../Utils/Loader";
import zIndex from "@mui/material/styles/zIndex";
const Cities = (props) => {
  useEffect(() => {
    console.log("hi", props);
  }, []);

  return (
    <div
      style={{
        maxHeight: 800,
        overflowY: "auto",
        // position: "absolute",
        background: "#fff",
        borderRadius: 8,
        width: "100%",
        height: "80px",
        marginTop: "7px",
        padding: "5px 12px",
        cursor: "pointer",
        position: "absolute",
        zIndex: "1000",
      }}
      className="suggestion-box"
    >
      {/* //fill airport */}

      {!props.cities ? (
        <Loader />
      ) : (
        props.cities?.map((city) => (
          <div
            onClick={() => {
              props.setCities({ name: city.name, code: city.code });
              props.closeSuggest(false);
              props.setFlightDate({
                persianDate: "",
                miladiDate: "",
              });
              props.setNight("");
            }}
            style={{ padding: "5px" }}
          >
            <span className="font-size-14">{city.name} </span>
            <span className="pull-left font-size-13 color-textpill">
              {city.code}
            </span>
          </div>
        ))
      )}
    </div>
  );
};
const mapStatesToProps = (state) => ({
  airports: selectAirports(state),
  credentials: selectCredentials(state),
  dest: state.destandoriginCitiesTour,
});
const mapDispatchesToProps = (dispatch) => ({
  setCredentials: (value) => dispatch(addCredentials(value)),
});
export default connect(mapStatesToProps, mapDispatchesToProps)(Cities);
