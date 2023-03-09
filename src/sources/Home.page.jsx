import React, {useState} from "react";
import FlightSearchBox from "./flight_List/FlightSearchBox.component";
import PageTabls from "./component/PageTabs.component";
import moment from "moment-jalaali";
import styles from "../../styles/Home.module.scss";

import {selectAirports} from "../Redux/Airports/airport.reselect";
import {selectAccount} from "../Redux/Account/account.reselect";
import {
    addAccountProperties,
    checkUserLogged,
    getUserInfo,
} from "../Redux/Account/account.action";
import {loadAirports} from "../Redux/Airports/airport.action";
import {connect} from "react-redux";
import {compareTwoStringDates} from "../Utils/SimpleTasks";
import Scrolltoprefresh from "./component/Scrolltoprefresh";
import {useEffect} from "react";

import SearchBox from "./tour/SearchBox";
import HomeDetails from "./flight/HomeDetails";
import List from "./tour/List";
import HomePicture from "./component/HomePicture";
import PictureBase from "./component/PictureBase";

const Home = (props) => {
    const [width, setWidth] = useState(0)
    const [state, setState] = useState({
        open: false,
        dateSelected: null,
        dateSelected2: null,
    });
    const [type, setType] = useState(1)
    useEffect(() => {
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
        setWidth(window.innerWidth)
    }, [])

    return (
        <div>
            <div style={{background: '#F7F7F7'}}>
                <PictureBase/>
                <div className={`${styles["heor-main-container"]}`}>
                    <Scrolltoprefresh/>
                    <div>
                        <div style={{marginRight: '2px', marginTop: width>=826? '-0.7rem':''}}>
                            <PageTabls type={type} setType={setType}/>
                        </div>
                        <h2 style={{margin:'2rem 0 0 0'}} className="font-bold-iransanse font-size-22 font-bold text-center ">
                            <span>خرید بلیط هواپیما &nbsp;</span>
                            <span className="color-primary font-bold-iransanse">
                        با چند کلیک
                      </span>
                        </h2>
                        <div className="row justify-content-center">
                            <div className="col-md-10 px-0 d-flex justify-content-center">
                                <div className={`px-0 ${styles["width-mobile-search"]} w-100`}>
                                    <FlightSearchBox dateSelected={state.dateSelected}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HomeDetails state={state} type={props.type}/>
        </div>
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
