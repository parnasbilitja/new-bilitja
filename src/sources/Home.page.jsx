import React, { useState } from "react";
import FlightSearchBox from "./flight_List/FlightSearchBox.component";
import PageTabls from "./component/PageTabs.component";
import moment from "moment-jalaali";
import styles from "../../styles/Home.module.scss";

import { selectAirports } from "../Redux/Airports/airport.reselect";
import { selectAccount } from "../Redux/Account/account.reselect";
import {
  addAccountProperties,
  checkUserLogged,
  getUserInfo,
} from "../Redux/Account/account.action";
import { loadAirports } from "../Redux/Airports/airport.action";
import { connect } from "react-redux";
import { compareTwoStringDates } from "../Utils/SimpleTasks";
import Scrolltoprefresh from "./component/Scrolltoprefresh";
import { useEffect } from "react";

import SearchBox from "./tour/SearchBox";
import HomeDetails from "./flight/HomeDetails";
import List from "./tour/List";
import HomePicture from "./component/HomePicture";

const Home =(props) => {
    const [state,setState] = useState({
      open: false,
      dateSelected: null,
      dateSelected2: null,
      width: 100,
    });
    const [type, setType] = useState(1) 
  useEffect(()=>{
      if (!props.airports) {
        props.setAirports(null);
      } else {
        if (
          !props.airports[0] ||
          !props.airports[0].Version ||
          props.airports[0].Version != "1.7"
        ) {
          props.setAirports(null);
        }
      }
      props.checkUserLogged();
      props.getUserInfo({
        mobile: localStorage.getItem("mobile"),
      });
      if (props.account) {
        if (
          compareTwoStringDates(
            props.account.dateLogin,
            moment().format("YYYY/MM/DD")
          ) == -1
        ) {
          props.addAccountProperties(null);
        }
      }
      setState({...state,
        width: window.innerWidth,
      });
  },[])
  
    return (
      <div>
        {state.width >= 826 ? (
          <div className="hidden-xs hidden-sm row">
            <div className="col-md-4">
              <img
                width=""
                height=""
                alt="بلیطجا- لوگو"
                src="../../../Images/map.webp"
                className={`${styles["hero-image-2"]} pull-right`}
              />
            </div>
            <div className="text-center col-md-4 pt-10 mt-5">
              <img
                width=""
                height=""
                alt="بلیطجا - لوگو"
                src="../../../Images/bilitja.webp"
                className={styles["hero-image-center"]}
              />
            </div>
            <div className="col-md-4">
              <img
                width=""
                height=""
                alt="بلیطجا - قطب نما"
                src="../../../Images/earth.webp"
                className={`${styles["hero-image-1"]} pull-left`}
              />
            </div>
          </div>
        ) : null}

        <div className={`${styles["heor-main-container"]}`}>
          <Scrolltoprefresh />
            {type == 1? 
            <>
            <div style={{marginRight: '10px'}}>
                <PageTabls type={type} setType={setType} />
            </div>
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 px-0">
              <div className={`${styles["padingSearchBox"]} ps-0`}>
                <FlightSearchBox dateSelected={state.dateSelected} />
              </div>
            </div>
              <HomeDetails state={state} />
            </div>
          
            </>
            :
            <>
              <SearchBox  dateSelected={state.dateSelected2} />
              <HomePicture state={state} />
              <List/>
            </>
            }
        </div>
     
      </div >
    );
  }

const mapStateToProps = (state) => ({
  airports: selectAirports(state),
  account: selectAccount(state),
});
const mapDispatchToProps = (dispatch) => ({
  setAirports: (value) => dispatch(loadAirports(value)),
  addAccountProperties: (value) => dispatch(addAccountProperties(value)),
  getUserInfo: (value) => dispatch(getUserInfo(value)),
  checkUserLogged: () => dispatch(checkUserLogged()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
