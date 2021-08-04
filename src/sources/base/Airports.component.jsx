import React from "react";
import { selectAirports } from "../../Redux/Airports/airport.reselect";
import { connect } from "react-redux";
import { selectCredentials } from "../../Redux/Search/search.reselect";

import { addCredentials } from "../../Redux/Search/search.action";
const Airports = (props) => {
  return (
    <div className="suggestion-box">
      {
        //fill airport
        props.airports
          ? props.credenrialType != "source"
            ? //to remove source airport from destination airport list
              props.airports
                .filter(
                  (oneAirport) =>
                    oneAirport.airportKey
                      .toLowerCase()
                      .includes(props.searchTerm) &&
                    oneAirport.airportName.toLowerCase() !=
                      props.credentials.sourceName.toLowerCase()
                )
                .map((oneAirport) => (
                  <div
                    key={oneAirport.airportKey}
                    onClick={() => {
                      // check if this component sets airport for source or destination
                      let credentialObject;
                      if (props.credenrialType == "source") {
                        credentialObject = {
                          sourceName: oneAirport.airportName,
                          source: oneAirport.airportCode,
                        };
                      } else {
                        credentialObject = {
                          destinationName: oneAirport.airportName,
                          dest: oneAirport.airportCode,
                        };
                      }

                      props.setCredentials(credentialObject);
                      props.closeSuggest(false);
                    }}
                  >
                    <span className="font-size-14">
                      {oneAirport.airportName}
                    </span>
                    <span className="pull-left font-size-13 color-textpill">
                      {oneAirport.airportCode}
                    </span>
                  </div>
                ))
            : props.airports
                .filter((oneAirport) =>
                  oneAirport.airportKey.toLowerCase().includes(props.searchTerm)
                )
                .map((oneAirport) => (
                  <div
                    key={oneAirport.airportKey}
                    onClick={() => {
                      let credentialObject;
                      if (props.credenrialType == "source") {
                        credentialObject = {
                          sourceName: oneAirport.airportName,
                          source: oneAirport.airportCode,
                        };
                      } else {
                        credentialObject = {
                          destinationName: oneAirport.airportName,
                          dest: oneAirport.airportCode,
                        };
                      }

                      props.setCredentials(credentialObject);
                      props.closeSuggest(false);
                    }}
                  >
                    <span className="font-size-14">
                      {oneAirport.airportName}
                    </span>
                    <span className="pull-left font-size-13 color-textpill">
                      {oneAirport.airportCode}
                    </span>
                  </div>
                ))
          : null
      }
    </div>
  );
};

const mapStatesToProps = (state) => ({
  airports: selectAirports(state),
  credentials: selectCredentials(state),
});
const mapDispatchesToProps = (dispatch) => ({
  setCredentials: (value) => dispatch(addCredentials(value)),
});
export default connect(mapStatesToProps, mapDispatchesToProps)(Airports);
