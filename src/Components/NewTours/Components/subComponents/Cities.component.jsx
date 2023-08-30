import React, {useEffect, useState} from "react";
import { selectAirports } from "../../../../Redux/Airports/airport.reselect";
import { connect } from "react-redux";
import { selectCredentials } from "../../../../Redux/Search/search.reselect";
import { addCredentials } from "../../../../Redux/Search/search.action";
import { setDestLoc, setOrgLoc } from "../../../../Redux/newTours/Action";
import { Loader } from "../../../../Utils/Loader";
import NewLoader from "./NewLoader";

const Cities = (props) => {
    const[Cities,setCities]=useState([])
  useEffect(() => {
    console.log("hi", props);
  }, [props.searchInputval]);

  useEffect(()=>{
      setCities(props.cities)
  },[props.cities])

    useEffect(()=>{
        if(props.searchInputval){
        let findCities=props.cities?.filter(city=>city?.name.includes(props.searchInputval))
            if (findCities){
            setCities(findCities)
            }else{
                setCities(props.cities)
            }

        }else {
            setCities(props.cities)
        }
    },[props.searchInputval])
  return (
    <div
      style={{
        height: "auto",
        maxHeight: "300px",
        overflowY: "auto",
        // position: "absolute",
        background: "#fff",
        borderRadius: 8,
        width: "100%",
        marginTop: "12px",
        padding: "5px 12px",
        cursor: "pointer",
        position: "absolute",
        zIndex: "1000",
      }}
      className="suggestion-box"
    >
      {/* //fill airport */}

      {Cities.length===0 ? (
          <NewLoader/>
      ) : (
        Cities?.map((city) => (
          <div
            onClick={() => {
                props.setCities({name:'',code:''})
              props.setCities({ name: city.name, code: city.code });
              // props.setSearchInput(city.name)
              props.closeSuggest(false);
              props.setFlightDate({
                persianDate: "",
                miladiDate: "",
              });
              props.setNights([]);
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

export default connect(mapStatesToProps, null)(Cities);
