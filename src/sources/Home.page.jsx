import React, { useState } from "react";
import FlightSearchBox from "./flight_List/FlightSearchBox.component";
import PageTabls from "./component/PageTabs.component";
import moment from "moment-jalaali";
import styles from "../../styles/Home.module.scss";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import {flightsData, homeText} from '../Utils/data';
import FlightsUrl from "./component/FlightsUrl";

const Home =(props) => {
    const [state,setState] = useState({
      open: false,
      dateSelected: null,
      width: 100,
    });
  
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
          <PageTabls tabActice={1} />
          <Scrolltoprefresh />
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <FlightSearchBox dateSelected={state.dateSelected} />
            </div>
          </div>
        </div>
        {state.width >= 826 ? (
          <div className={`${styles["hero-big-image"]} container`}>
            <img
              width=""
              height=""
              alt="بلیطجا-اسلایدر"
              src="../../../Images/flight-index.webp"
            />
          </div>
        ) : null}
        {state.width < 826 ? (
          <div className={`${styles["hero-big-image"]} container`}>
            <img
              width=""
              height=""
              alt="بلیطجا-اسلایدر"
              src="../../../Images/flight-index-mobile.webp"
            />
          </div>
        ) : null}

        <div className="row padding-xs-5-15">
          <div className="col-lg-2 col-md-1 hidden-xs"></div>
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="row">
              <div className="col-lg-1 hidden-sm col-sm-12 hidden-xs"></div>
              <div className="col-lg-5 col-md-6 col-sm-12 padding-5px">
                <div className={styles["home-value-propsal"]}>
                  <img
                    width=""
                    height=""
                    alt="بلیطجا-لوگو خرید بلیط هواپیما"
                    src="../../../Images/service1.webp"
                  />
                  <h2 className="font-bold-iransanse font-size-22 font-bold ">
                    <span>خرید بلیط هواپیما &nbsp;</span>
                    <span className="color-primary font-bold-iransanse">
                      با چند کلیک
                    </span>
                  </h2>
                  <p className="color-textpill font-size-15">
                    کافیست در صفحه خرید بلیط هواپیما مبدا، مقصد و روز را وارد
                    کرده و ارزانترین بلیط هواپیما را از میان پروازهای چارتری،
                    سیستمی و لحظه آخری انتخاب کنید.
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 padding-5px">
                <div className={styles["home-value-propsal"]}>
                  <img
                    width=""
                    height=""
                    alt="بلیطجا- لوگو پذیرش میزبانی"
                    src="../../../Images/service3.webp"
                  />
                  <h2 className="font-bold-iransanse font-size-22 font-bold">
                    <span className="color-primary font-bold-iransanse">
                      پذیرش میزبانی &nbsp;
                    </span>
                    <span>ویلا و اقامتگاه</span>
                  </h2>
                  <p className="color-textpill font-size-15">
                    با عضویت در سامانه بلیطجا شما هم میتوانید ویلا یا اقامتگاه
                    خود را در معرض بازدید و رزرو گردشگران و سایر آژانس های
                    گردشگردی قرار دهید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["home-become-host"]}>
          <div>
            <h2>ویلا و اقامتگاه خود را در بلیطجا ثبت کنید و میزبان شوید</h2>
            <p>
              عکس بگیرید و اطلاعات خود را در بلیطجا به رایگان به نمایش بگذارید و
              میزبان مسافران بلیطجا باشید
            </p>
            <a href="#" className={styles["btn-secondary-outlined"]}>
              میزبان شوید
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className={`col-md-10 ${styles["home-tour-intro"]} `}>
            <p>دیدن تور های ویژه</p>
            <div className="align-center">
              <p>
                تور های ویژه گردشگری ، بازدید از موزه ها و مکان های دیدنی کشور
                ها
              </p>
              <a
                href="https://www.hamnavaz.com/"
                className="pull-left font-size-13 btn-fiiled mx-2  py-3 col-lg-2 mb-4 text-center"
              >
                جستجوی مقاصد
              </a>
            </div>
          </div>
        </div>

        <FlightsUrl flightsData={flightsData} />

        <div className="row padding-xs-5-25">
          <div className="col-lg-1 col-md-1 col-sm-1 hidden-xs"></div>
          <div
            className={`col-lg-10 col-md-10 col-sm-10 col-12 ${styles["home-flight-content"]}`}
          >
            <h3>
              <FontAwesomeIcon icon={faPlane} />
              خرید بلیط هواپیما
            </h3>
            <p className={'description-shop-ticket'}>
              {homeText}
            </p>
          </div>
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
