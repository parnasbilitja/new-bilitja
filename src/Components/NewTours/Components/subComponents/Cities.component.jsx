import React, { useEffect } from "react";
import { selectAirports } from "../../../../Redux/Airports/airport.reselect";
import { connect } from "react-redux";
import { selectCredentials } from "../../../../Redux/Search/search.reselect";
import { addCredentials } from "../../../../Redux/Search/search.action";
import { setDestLoc, setOrgLoc } from "../../../../Redux/newTours/Action";
const Cities = (props) => {
  // console.log("hi", props);

  return (
    <div
      style={{
        maxHeight: 100,
        overflowY: "auto",
        // position: "absolute",
        background: "#fff",
        borderRadius: 8,
        width: "100%",
        marginTop: 5,
        padding: "0 12px",
        cursor: "pointer",
      }}
      className="suggestion-box"
    >
      {/* {console.log(props.airports)} */}
      {/* //fill airport */}

      {props.cities?.map((city) => (
        <div
          // key={oneAirport.airportKey}
          // onClick={() => {
          //   // check if this component sets airport for source or destination
          //   let credentialObject;
          //   if (props.credenrialType == "source") {
          //     credentialObject = {
          //       sourceName: oneAirport.airportName,
          //       sourceNameEn: oneAirport.airportNameEn,
          //       source: oneAirport.airportCode,
          //     };
          //   } else {
          //     credentialObject = {
          //       destinationName: oneAirport.airportName,
          //       destinationNameEn: oneAirport.airportNameEn,
          //       dest: oneAirport.airportCode,
          //     };
          //   }

          //   props.setCredentials(credentialObject);
          //   props.closeSuggest(false);
          // }}
          onClick={() => {
            props.setCities({ name: city.name, code: city.code });
          }}
        >
          <span className="font-size-14">{city.name} </span>
          <span className="pull-left font-size-13 color-textpill">
            {city.code}
          </span>
        </div>
      ))}

      <div
      // key={oneAirport.airportKey}
      // onClick={() => {
      //   let credentialObject;
      //   if (props.credenrialType == "source") {
      //     credentialObject = {
      //       sourceName: oneAirport.airportName,
      //       sourceNameEn: oneAirport.airportNameEn,
      //       source: oneAirport.airportCode,
      //     };
      //   } else {
      //     credentialObject = {
      //       destinationName: oneAirport.airportName,
      //       destinationNameEn: oneAirport.airportNameEn,
      //       dest: oneAirport.airportCode,
      //     };
      //   }

      //   props.setCredentials(credentialObject);
      //   props.closeSuggest(false);
      // }}
      >
        <span className="font-size-14"></span>
        <span className="pull-left font-size-13 color-textpill"></span>
      </div>
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
