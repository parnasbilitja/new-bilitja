import React from "react";

import styles from "../../../../../styles/AirportsMobile.module.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from "react-redux";
import { selectAirports } from "../../../../Redux/Airports/airport.reselect";
import { selectCredentials } from "../../../../Redux/Search/search.reselect";
import { addCredentials } from "../../../../Redux/Search/search.action";
class AirportsMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.props.handleChange(value);
  };

  changeRoute = (oneAirport) => {
    let credentialObject;
    // check if this component sets airport for source or destination

    if (this.props.credenrialType == "source") {
      credentialObject = {
        sourceName: oneAirport.airportName,
        sourceNameEn: oneAirport.airportNameEn,
        source: oneAirport.airportCode,
      };
    } else {
      credentialObject = {
        destinationName: oneAirport.airportName,
        destinationNameEn: oneAirport.airportNameEn,
        dest: oneAirport.airportCode,
      };
    }

    this.props.setCredentials(credentialObject);
    this.props.closePopUp(false);
  };

  render() {
    return (
      <div className={styles["mobile-suggestions"]}>
        <div className={styles["mobile-suggestion-heading"]}>
          <span>{this.props.title}</span>
          <span
            className="pull-left exit-form"
            onClick={() => {
              this.props.closePopUp(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </div>
        <input
          name="searchTerm"
          autoFocus={false}
          value={this.props.searchTerm}
          autoComplete="false"
          className={`${styles["input-search-private"]} input-search `}
          onChange={this.handleChange}
          placeholder="مبدا خود را وارد کنید"
        />
        <div className={styles["mobile-airport-list"]}>
          {
            //fill airports
            this.props.airports
              ? this.props.credenrialType != "source"
                ? //to remove source airport from destination airport list
                  this.props.airports
                    .filter(
                      (oneAirport) =>
                        oneAirport.airportName !=
                          this.props.credentials.sourceName &&
                        oneAirport.airportKey.includes(this.props.searchTerm)
                    )
                    .map((oneAirport) => (
                      <div
                        key={oneAirport.airportKey}
                        onClick={() => {
                          this.changeRoute(oneAirport);
                        }}
                      >
                        <span>{oneAirport.airportName}</span>
                        <span className="pull-left">
                          {oneAirport.airportCode}
                        </span>
                      </div>
                    ))
                : this.props.airports
                    .filter((oneAirport) =>
                      oneAirport.airportKey.includes(this.props.searchTerm)
                    )
                    .map((oneAirport) => (
                      <div
                        key={oneAirport.airportKey}
                        onClick={() => {
                          this.changeRoute(oneAirport);
                        }}
                      >
                        <span>{oneAirport.airportName}</span>
                        <span className="pull-left">
                          {oneAirport.airportCode}
                        </span>
                      </div>
                    ))
              : null
          }
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => ({
  airports: selectAirports(state),
  credentials: selectCredentials(state),
});
const mapDispatchesToProps = (dispatch) => ({
  setCredentials: (value) => dispatch(addCredentials(value)),
});
export default connect(mapStatesToProps, mapDispatchesToProps)(AirportsMobile);
