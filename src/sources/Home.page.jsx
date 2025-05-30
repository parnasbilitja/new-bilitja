import React, { useState, useEffect } from "react";
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

import HomeDetails from "./flight/HomeDetails";
import PictureBase from "./component/PictureBase";
import { motion } from 'framer-motion';


const Home = (props) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
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
        setHeight(window.screen.availHeight);
    }, [])
    

    return (
        <div>
            <div style={{background: '#F7F7F7',marginTop: width>=826? '0rem':'-0.7rem' }}>


                <PictureBase/>

                <div className={`${styles["heor-main-container"]}`}>
                    <Scrolltoprefresh/>
                    <div>
                        <div style={{marginRight: '2px', marginTop: width>=826? '-0.7rem':'-0.7rem'}}>
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
                                    <FlightSearchBox/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <motion.div  
                    initial="pageInitial" animate="pageAnimate" variants={{
                        pageInitial: {
                          opacity: 0
                        },
                        pageAnimate: {
                          opacity: 1,
                        },}}
                >
                    <div className={`${styles["parentbackFight"]} hidden-desktop`}>
                    <div className="d-flex w-100 align-items-center justify-content-center" style={{padding:'16px 0'}}>
                        <img
                            className={`${styles[""]}`}
                            width="50%"
                            height=""
                            alt="بلیطجا-اسلایدر"
                            src="../../../Images/fly-bg-new.png"
                        />
                    </div>
                    </div>
                    <div className={`${styles["hero-big-image"]} container hidden-mobile-head`}>
                        <img
                            width=""
                            height=""
                            alt="بلیطجا-اسلایدر2"
                            src="../../../Images/fly-bg-new.png"
                        />
                    </div>
                </motion.div>

            </div>
            <HomeDetails type={props.type}/>
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
