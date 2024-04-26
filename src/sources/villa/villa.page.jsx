import React from "react";
import VillaSearchBox from "./villaSearchBox.component";
import PageTabls from "../component/PageTabs.component";
//import earth from '../../../Images/earth.webp'
//import map from '../../../Images/map.png'
//import bilitja from '../../../Images/bilitja.webp'
//import vilaIndex from '../../../Images/villa-index.png'
//import hotelView from '../../../Images/hotel_view.jpg'
import moment from "moment-jalaali";

import styles from "../../../styles/villa.module.scss";
import globals from "../Global";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { selectCities } from "../../Redux/City/city.reselect";
import { selectAccount } from "../../Redux/Account/account.reselect";
import { addAccountProperties } from "../../Redux/Account/account.action";
import { addCities } from "../../Redux/City/city.action";
import { connect } from "react-redux";
import { compareTwoStringDates } from "../../Utils/SimpleTasks";
import { useEffect } from "react";
import { useState } from "react";
import PictureBase from "../component/PictureBase";
const villa = (props) => {
    const [state, setState] = useState({
      open: false,
      dateSelected: null,
      width:1024,
    });
    const [type, setType] = useState(4) 
  useEffect(() => {
    if (!props.cities) {
      // fetch(`${globals.baseUrl}bj/city/view`)
      //   .then((res) => res.json())
      //   .then((json) => {
      //     props.setCities(json.City);
      //   });
    }

    if (props.account) {
      if (
        compareTwoStringDates(
          props.account.dateLogin,
          moment().format("YYYY/MM/DD")
        ) == -1
      ) {
        props.addAccountProperties(null);
      }
    }setState({...state,
        width: window.innerWidth,
      });
  },[])

    return (
      <div className="mt-5 bodyVar">
        <PictureBase/>

        <div className={`${styles["heor-main-container"]} container-fuild`}>
        <PageTabls type={type} setType={setType} />
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <VillaSearchBox dateSelected={state.dateSelected} />
            </div>
          </div>
        </div>
        <div className={styles["hero-big-image"]}>
          <img
            width=""
            height=""
            alt="بلبطجا - لوگو پذیرش میزبان"
            src="../../../Images/villa-index.webp"
          />
        </div>

        <div className={styles["home-become-host"]}>
          <div>
            <h2>ویلا و اقامتگاه خود را در بلبطجا ثبت کنید و میزبان شوید</h2>
            <p>
              عکس بگیرید و اطلاعات خود را در بلیطجا به رایگان به نمایش بگذارید و
              میزبان مسافران بلیطجا باشید
            </p>
            <a href="#" className={styles["btn-secondary-outlined"]}>
              میزبان شوید
            </a>
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-12 padding-5px text-center">
          <br />
          <br />
          <h3 className="font-bold-iransanse">
            <span className="color-primary">ارزانترین نرخ &nbsp;</span>
            <span>رزرو اقامتگاه ها</span>
          </h3>
          <p className="color-textpill font-size-14">
            مشاهده و جستجوی نرخ های روز ، ویژه و لحظه آخری و رزرو سریع آنلاین
            ویلا ها
          </p>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 text-right">
              <div
                className={`${styles["acco-tab"]} ${styles["home-tab-active"]}`}
              >
                <div className="pull-right">
                  <span className="cursor-pointer font-size-14"> تهران </span>
                </div>
              </div>
              <div className={styles["acco-tab"]}>
                <div className="pull-right">
                  <span className="cursor-pointer font-size-14"> مشهد </span>
                </div>
              </div>
              <div className={styles["acco-tab"]}>
                <div className="pull-right">
                  <span className="cursor-pointer font-size-14"> کیش </span>
                </div>
              </div>
              <div className={styles["acco-tab"]}>
                <div className="pull-right">
                  <span className="cursor-pointer font-size-14"> اصفهان </span>
                </div>
              </div>
              <div className={styles["acco-tab"]}>
                <div className="pull-right">
                  <span className="cursor-pointer font-size-14"> شیراز </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-1 col-0"></div>
            <div className="col-lg-10 col-md-10 col-12 text-right">
              <div className={styles["vila-item"]}>
                <div
                  className={`col-lg-3 col-md-3 col-sm-6 col-12 ${styles["villa-suggestion"]}`}
                >
                  <img
                    width=""
                    height=""
                    alt="بلبطجا - پیش نمایش ویلا"
                    src="Images/picture3.jpg"
                  />
                  <p className={styles["vilia-desc"]}>
                    ویلایی . 3 خوابه . تهران، رودهن
                  </p>
                  <div className={styles["vilia-desc-title"]}>
                    استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
                  </div>
                  <div className={styles["vila-price"]}>
                    هر شب از 3٫500٫000 تومان
                  </div>{" "}
                  <div className={styles["star-vila"]}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
                <div
                  className={`col-lg-3 col-md-3 col-sm-6 col-12 ${styles["villa-suggestion"]}`}
                >
                  <img
                    width=""
                    height=""
                    alt="بلبطجا - پیش نمایش ویلا"
                    src="Images/picture3.jpg"
                  />
                  <p className={styles["vilia-desc"]}>
                    ویلایی . 3 خوابه . تهران، رودهن
                  </p>
                  <div className={styles["vilia-desc-title"]}>
                    استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
                  </div>
                  <div className={styles["vila-price"]}>
                    هر شب از 3٫500٫000 تومان
                  </div>{" "}
                  <div className={styles["star-vila"]}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
                <div
                  className={`col-lg-3 col-md-3 col-sm-6 col-12 ${styles["villa-suggestion"]}`}
                >
                  <img
                    width=""
                    height=""
                    alt="بلبطجا - پیش نمایش ویلا"
                    src="Images/picture3.jpg"
                  />
                  <p className={styles["vilia-desc"]}>
                    ویلایی . 3 خوابه . تهران، رودهن
                  </p>
                  <div className={styles["vilia-desc-title"]}>
                    استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
                  </div>
                  <div className={styles["vila-price"]}>
                    هر شب از 3٫500٫000 تومان
                  </div>{" "}
                  <div className={styles["star-vila"]}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
                <div
                  className={`col-lg-3 col-md-3 col-sm-6 col-12 ${styles["villa-suggestion"]}`}
                >
                  <img
                    width=""
                    height=""
                    alt="بلبطجا - پیش نمایش ویلا"
                    src="Images/picture3.jpg"
                  />
                  <p className={styles["vilia-desc"]}>
                    ویلایی . 3 خوابه . تهران، رودهن
                  </p>
                  <div className={styles["vilia-desc-title"]}>
                    استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
                  </div>
                  <div className={styles["vila-price"]}>
                    هر شب از 3٫500٫000 تومان
                  </div>{" "}
                  <div className={styles["star-vila"]}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
                <div
                  className={`col-lg-3 col-md-3 col-sm-6 col-12 ${styles["villa-suggestion"]}`}
                >
                  <img
                    width=""
                    height=""
                    alt="بلبطجا - پیش نمایش ویلا"
                    src="Images/picture3.jpg"
                  />
                  <p className={styles["vilia-desc"]}>
                    ویلایی . 3 خوابه . تهران، رودهن
                  </p>
                  <div className={styles["vilia-desc-title"]}>
                    استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
                  </div>
                  <div className={styles["vila-price"]}>
                    هر شب از 3٫500٫000 تومان
                  </div>{" "}
                  <div className={styles["star-vila"]}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
                <div
                  className={`col-lg-3 col-md-3 col-sm-6 col-12 ${styles["villa-suggestion"]}`}
                >
                  <img
                    width=""
                    height=""
                    alt="بلبطجا - پیش نمایش ویلا"
                    src="Images/picture3.jpg"
                  />
                  <p className={styles["vilia-desc"]}>
                    ویلایی . 3 خوابه . تهران، رودهن
                  </p>
                  <div className={styles["vilia-desc-title"]}>
                    استخر سرپوشیده آبگرم با جکوزی و امکانات سرگرمی
                  </div>
                  <div className={styles["vila-price"]}>
                    هر شب از 3٫500٫000 تومان
                  </div>{" "}
                  <div className={styles["star-vila"]}>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

const mapStateToProps = (state) => ({
  cities: selectCities(state),
  account: selectAccount(state),
});
const mapDispatchToProps = (dispatch) => ({
  setCities: (value) => dispatch(addCities(value)),
  addAccountProperties: (value) => dispatch(addAccountProperties(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(villa);
