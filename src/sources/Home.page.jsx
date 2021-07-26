import React from "react";
import Image from "next/image";
import FlightSearchBox from "./flight_List/FlightSearchBox.component";
import PageTabls from "./component/PageTabs.component";

//import earth from '../../../Images/earth.png'
//import map from "../../../Images/map.png"
//import bilitja from '../../../Images/bilitja.png'
//import flightIndex from '../../../Images/flight-index.png'
//import srvice3 from "../../../Images/service3.png"
//import srvice1 from "../../../Images/service1.png"
import moment from "moment-jalaali";

import styles from "../../styles/Home.module.scss";
import globals from "./Global";

import { faPlaneDeparture, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { selectAirports } from "../Redux/Airports/airport.reselect";
import { selectAccount } from "../Redux/Account/account.reselect";
import { addAccountProperties } from "../Redux/Account/account.action";
import { addAirports } from "../Redux/Airports/airport.action";
import { connect } from "react-redux";
import { compareTwoStringDates } from "../Utils/SimpleTasks";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dateSelected: null,
    };
  }
  componentDidMount() {
    //   Mohammadsaleh Dispatch and Get Airports List
    this.props.setAirports(this.props.mohammadsalehAirportsList);

    // Last Code
    // ----------------
    // window.addEventListener('resize', this.updateWindowDimensions);
    // if (!this.props.airports) {
    //   fetch(`${globals.baseUrl}flights/getAirports`)
    //     .then((res) => res.json())
    //     .then((json) => {
    //       this.props.setAirports(json.flightAirportsModel);
    //     });
    // }

    if (this.props.account) {
      if (
        compareTwoStringDates(
          this.props.account.dateLogin,
          moment().format("YYYY/MM/DD")
        ) == -1
      ) {
        this.props.addAccountProperties(null);
      }
    }
  }

  render() {
    return (
      <div>
        <div className="hidden-xs hidden-sm row">
          <div className="col-md-4">
            <img
              src="../../../Images/map.png"
              className={`${styles["hero-image-2"]} pull-right`}
            />
          </div>

          <div className="text-center col-md-4" style={{ paddingTop: 10 }}>
            <img
              src="../../../Images/bilitja.png"
              className={styles["hero-image-center"]}
            />
          </div>
          <div className="col-md-4">
            <img
              src="../../../Images/earth.png"
              className={`${styles["hero-image-1"]} pull-left`}
            />
          </div>
        </div>

        <div className={`${styles["heor-main-container"]} container-fuild`}>
          <PageTabls tabActice={1} />

          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <FlightSearchBox dateSelected={this.state.dateSelected} />
            </div>
          </div>
        </div>
        <div className={styles["hero-big-image"]}>
          <img src="../../../Images/flight-index.png" />
        </div>

        <div className="row padding-xs-5-15">
          <div className="col-lg-2 col-md-1 hidden-xs"></div>
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="row">
              <div className="col-lg-1 hidden-sm col-sm-12 hidden-xs"></div>
              <div className="col-lg-5 col-md-6 col-sm-12 padding-5px">
                <div className={styles["home-value-propsal"]}>
                  <img src="../../../Images/service1.png" />
                  <h3 className="font-bold-iransanse">
                    <span>خرید بلیط هواپیما &nbsp;</span>
                    <span className="color-primary">با چند کلیک</span>
                  </h3>
                  <p className="color-textpill font-size-14">
                    کافیست در صفحه خرید بلیط هواپیما مبدا، مقصد و روز را وارد
                    کرده و ارزانترین بلیط هواپیما را از میان پروازهای چارتری،
                    سیستمی و لحظه آخری انتخاب کنید.
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12 padding-5px">
                <div className={styles["home-value-propsal"]}>
                  <img src="../../../Images/service3.png" />
                  <h3 className="font-bold-iransanse">
                    <span className="color-primary">پذیرش میزبانی &nbsp;</span>
                    <span>ویلا و اقامتگاه</span>
                  </h3>
                  <p className="color-textpill font-size-14">
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
                href="#"
                className="pull-left btn-fiiled mx-2  py-3 col-lg-2 mb-4 text-center"
                style={{ fontSize: "13px" }}
              >
                جستجوی مقاصد
              </a>
            </div>
          </div>
        </div>

        <div className={` ${styles["home-flight-suggestion"]} text-center`}>
          <h2 className="font-bold-iransanse font-size-25">بلیط هواپیما</h2>
          <p>قیمت های لحظه آخری بلیطـجا</p>

          <div>
            <div className={styles["suggestion-list"]}>
              <div>
                <a href="بلیط-هواپیما/تهران/مشهد/">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما مشهد
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/اصفهان">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما کیش
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/مشهد">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما اصفهان
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/اهواز">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما اهواز
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/تبریز">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما تبریز
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/شیراز">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما شیراز
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </div>
            <div className={styles["suggestion-list"]}>
              <div>
                <a href="بلیط-هواپیما/تهران/استانبول">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-13">
                    بلیط هواپیما استانبول
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/دبی">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما دبی
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/تفلیس">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما تفلیس
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/مشهد">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما مشهد
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/باکو">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما باکو
                  </span>
                </a>
                <div className="clear"></div>
              </div>
              <div>
                <a href="بلیط-هواپیما/تهران/نجف">
                  <i className="kilo-font font-size-24 icon-plane-departure pull-right"></i>
                  <span className="pull-right font-size-14">
                    بلیط هواپیما نجف
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="row padding-xs-5-25">
          <div className="col-lg-1 col-md-1 col-sm-1 hidden-xs"></div>
          <div
            className={`col-lg-10 col-md-10 col-sm-10 col-12 ${styles["home-flight-content"]}`}
          >
            <h3>
              <FontAwesomeIcon icon={faPlane} />
              خرید بلیط هواپیما{" "}
            </h3>
            <p>
              در دنیای امروزی با توجه به گسترش خرید بلیط هواپیما به صورت آنلاین
              و جستجوی کاربران برای بلیط چارتری و بلیط ارزان هواپیما و افزایش
              تمایل مردم برای سفر با هواپیما و از طرفی به صرفه بودن سفر با
              هواپیما شرکت های زیادی اقدام به فروش بلیط هواپیما به صورت بلیط
              چارتر و بلیط سیستمی و هم چنین اقدام به پدید آوردن بستری مناسب جهت
              رزرو آنلاین هتل نموده اند، لذا با توجه به نیاز مردم به رزرو آنلاین
              بلیط هواپیما و رزرو آنلاین هتل در داخل و خارج جهت آسایش و راحتی
              مسافران گرامی اقدام به ایجاد یک سیستم رزرواسیون به نام بلیط جا با
              امکان رزرو آنلاین بلیط هواپیما و هم چنین خرید بلیط ارزان هواپیما و
              رزرو آنلاین هتل در تهران، رزرو هتل مشهد و کیش، قشم، شیراز و دیگر
              شهرهای داخل ایران و امکان رزرو آنلاین هتل تفلیس گرجستان و رزرو هتل
              استانبول نموده ایم تا قدم کوچکی در راه بهبود ارائه خدمات رزرو
              آنلاین هتل و خرید آنلاین بلیط هواپیما داشته باشیم.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  airports: selectAirports(state),
  account: selectAccount(state),
  mohammadsalehAirportsList: state.mohammadsalehAirports,
});
const mapDispatchToProps = (dispatch) => ({
  setAirports: (value) => dispatch(addAirports(value)),
  addAccountProperties: (value) => dispatch(addAccountProperties(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
