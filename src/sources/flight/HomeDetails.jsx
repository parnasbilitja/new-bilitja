import React from 'react';
import styles from "../../../styles/Home.module.scss";
import {flightsData, homeText} from '../../Utils/data';
import FlightsUrl from "./../component/FlightsUrl";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const HomeDetails = ({state}) => {
    return (
        <div>
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

        <div className="row padding-xs-5-15" style={{justifyContent: 'center'}}>
          <div className="col-md-10 px-0">
              <div className="col-lg-4 col-md-5 col-sm-12 padding-5px">
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
              <div className="col-lg-4 col-md-5 col-sm-12 padding-5px">
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
              <div className="col-lg-4 col-md-5 col-sm-12 padding-5px">
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
        <div className="row d-flex justify-content-center">
          <div className={`col-11 col-md-10 ${styles["home-tour-intro"]} mx-4`}>
            <div className="row">
              <div className={'col-8 col-md-10'}>
                <p>دیدن تور های ویژه</p>
                <div className="align-center font-size-10">
                  <p>
                    تور های ویژه گردشگری ، بازدید از موزه ها و مکان های دیدنی کشور
                    ها
                  </p>
                  
                </div>
              </div>
              <div className={`col-4 col-md-2 justify-content-end ${styles["tour-intro-button"]}`} >
              <a
                  href="https://www.hamnavaz.com/"
                  className="pull-left font-size-13 btn-fiiled mx-2  py-3 col-lg-2 mb-4 text-center"
                >
                  جستجوی مقاصد
                </a>
            </div>
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
        </div>
    );
};

export default HomeDetails;