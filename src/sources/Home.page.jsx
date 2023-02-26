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
import PictureBase from "./component/PictureBase";

const Home = (props) => {
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
  }, [])

  return (
    <div>
      {/*<div className="col-md-10 mx-auto pt-4 pb-4">*/}
      {/*    <Swiper*/}
      {/*        slidesPerView={4}*/}
      {/*        spaceBetween={30}*/}
      {/*        pagination={{*/}
      {/*            clickable: false,*/}
      {/*        }}*/}
      {/*        navigation={false} modules={[Navigation]}*/}
      {/*        className="mySwiper"*/}
      {/*    >*/}
      {/*        <SwiperSlide>*/}
      {/*            <div className="box-special-tour">*/}
      {/*                <div className="img-special-tour">*/}
      {/*                    <a href="">*/}
      {/*                        <div className="hover-info-img animated pulse">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="16.085" height="22.888"*/}
      {/*                                 viewBox="0 0 16.085 22.888">*/}
      {/*                                <path id="Attachment_1" data-name="Attachment 1"*/}
      {/*                                      d="M15.129,2.531s.8,2.8-1.01,9.564c-2.459,9.176-5.038,11.074-8.9,10.038S.069,18.166,2.528,8.99,10.11.909,11.36,3.074c1.414,2.449-.88,9.082-.88,9.082s-1.5,5.291-3.838,4.666c-3.381-.906.4-9.211.4-9.211"*/}
      {/*                                      transform="translate(-0.285 -0.488)" fill="none" stroke="#fff"/>*/}
      {/*                            </svg>*/}
      {/*                            <a href="" className="view-details-more text-white" rel="noreferrer">مشاهده*/}
      {/*                                جزئیات بیشتر</a>*/}
      {/*                        </div>*/}
      {/*                        <img*/}
      {/*                            src=""*/}
      {/*                            alt=""/>*/}
      {/*                    </a>*/}
      {/*                </div>*/}
      {/*                <div className="top-info-tour-special">*/}
      {/*                    <div className="day">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                             viewBox="0 0 24 24.998">*/}
      {/*                            <path id="Moon_1" data-name="Moon 1"*/}
      {/*                                  d="M23,16.851l.925.38a1,1,0,0,0-1.372-1.275ZM10.016,1l.807.591A1,1,0,0,0,9.8.023ZM18.4,16.937a9.525,9.525,0,0,1-9.437-9.61h-2A11.525,11.525,0,0,0,18.4,18.937Zm4.157-.98a9.256,9.256,0,0,1-4.157.98v2a11.256,11.256,0,0,0,5.053-1.192Zm-.477.514A10.444,10.444,0,0,1,12.441,23v2a12.444,12.444,0,0,0,11.484-7.767ZM12.441,23A10.536,10.536,0,0,1,2,12.368H0A12.536,12.536,0,0,0,12.441,25ZM2,12.368A10.591,10.591,0,0,1,10.23,1.977L9.8.023A12.591,12.591,0,0,0,0,12.368ZM8.958,7.327a9.678,9.678,0,0,1,1.865-5.736L9.209.409A11.679,11.679,0,0,0,6.958,7.327Z"*/}
      {/*                                  transform="translate(0 0)" fill="#212135"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>3 روز و 12 شب</span>*/}
      {/*                    </div>*/}
      {/*                    <div className="location">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"*/}
      {/*                             height="20">*/}
      {/*                            <path*/}
      {/*                                d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"/>*/}
      {/*                            <path*/}
      {/*                                d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>تهران-آنتالیا</span>*/}
      {/*                    </div>*/}
      {/*                </div>*/}
      {/*                <div className="mid-info-tour-special">*/}
      {/*                    <div className="inner-mid-info-tour-special w-75">*/}
      {/*                        <a href="" rel="noreferrer">*/}
      {/*                            <h2 className="title-tour-special">تور انتالیا</h2>*/}
      {/*                        </a>*/}
      {/*                        <div className="date-special">*/}
      {/*    <span*/}
      {/*        className="from">25/25/25</span>*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16.828"*/}
      {/*                                 viewBox="0 0 18 16.828">*/}
      {/*                                <g id="Left_Right_2" data-name="Left Right 2"*/}
      {/*                                   transform="translate(0 0.414)">*/}
      {/*                                    <path id="Path_1005" data-name="Path 1005" d="M6,1,1,6H17" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                    <path id="Path_1006" data-name="Path 1006" d="M12,15l5-5H1" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}

      {/*                            <span className="to">25/25/25</span>*/}
      {/*                        </div>*/}
      {/*                    </div>*/}
      {/*                    <div className="bottom-info-tour-special">*/}
      {/*                        <div className="title-price">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                                 viewBox="0 0 24.109 24">*/}
      {/*                                <g id="Ticket" transform="translate(-0.023)">*/}
      {/*                                    <path id="Path_1168" data-name="Path 1168"*/}
      {/*                                          d="M2.532,9.817a4.474,4.474,0,0,1-.727-.022l-.21.978.21-.978A1.033,1.033,0,0,1,1.031,9a3.974,3.974,0,0,1,0-.682,10.8,10.8,0,0,1,.479-3.428,5.241,5.241,0,0,1,2.48-3.015C5,1.307,6.574,1,9.778,1h4.444c3.2,0,4.781.307,5.789.872a5.241,5.241,0,0,1,2.48,3.015,10.8,10.8,0,0,1,.479,3.428,3.976,3.976,0,0,1,0,.682l.984.18L22.969,9a1.033,1.033,0,0,1-.774.8,4.473,4.473,0,0,1-.727.022,2.334,2.334,0,0,0-2.186,2.456,2.334,2.334,0,0,0,2.186,2.456,4.352,4.352,0,0,1,.713.022,1.048,1.048,0,0,1,.778.815,3.662,3.662,0,0,1-.008.647,9.522,9.522,0,0,1-.459,2.9,5.241,5.241,0,0,1-2.48,3.015C19,22.693,17.426,23,14.222,23H9.778c-3.2,0-4.781-.307-5.789-.872a5.241,5.241,0,0,1-2.48-3.015,9.522,9.522,0,0,1-.459-2.9,3.649,3.649,0,0,1-.008-.647,1.048,1.048,0,0,1,.778-.815,4.351,4.351,0,0,1,.712-.022,2.334,2.334,0,0,0,2.186-2.456A2.334,2.334,0,0,0,2.532,9.817Z"*/}
      {/*                                          fill="none" stroke="#212135" stroke-width="2"/>*/}
      {/*                                    <path id="Path_1169" data-name="Path 1169"*/}
      {/*                                          d="M15,4a1,1,0,0,1,1,1V7a1,1,0,0,1-2,0V5A1,1,0,0,1,15,4Zm0,6a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V11A1,1,0,0,1,15,10Zm1,7a1,1,0,0,0-2,0v2a1,1,0,0,0,2,0Z"*/}
      {/*                                          fill="#212135" fill-rule="evenodd"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}
      {/*                            <span>شروع قیمت از :</span>*/}
      {/*                        </div>*/}
      {/*                        <div className="d-flex align-items-center">*/}
      {/*                            <strong className="price-tour-special ml-2 mr-2">13000</strong>*/}
      {/*                            <strong className="price-tour-special ">*/}
      {/*                                تومان </strong>*/}
      {/*                        </div>*/}

      {/*                    </div>*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </SwiperSlide>*/}
      {/*        <SwiperSlide>*/}
      {/*            <div className="box-special-tour">*/}
      {/*                <div className="img-special-tour">*/}
      {/*                    <a href="">*/}
      {/*                        <div className="hover-info-img animated pulse">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="16.085" height="22.888"*/}
      {/*                                 viewBox="0 0 16.085 22.888">*/}
      {/*                                <path id="Attachment_1" data-name="Attachment 1"*/}
      {/*                                      d="M15.129,2.531s.8,2.8-1.01,9.564c-2.459,9.176-5.038,11.074-8.9,10.038S.069,18.166,2.528,8.99,10.11.909,11.36,3.074c1.414,2.449-.88,9.082-.88,9.082s-1.5,5.291-3.838,4.666c-3.381-.906.4-9.211.4-9.211"*/}
      {/*                                      transform="translate(-0.285 -0.488)" fill="none" stroke="#fff"/>*/}
      {/*                            </svg>*/}
      {/*                            <a href="" className="view-details-more text-white" rel="noreferrer">مشاهده*/}
      {/*                                جزئیات بیشتر</a>*/}
      {/*                        </div>*/}
      {/*                        <img*/}
      {/*                            src=""*/}
      {/*                            alt=""/>*/}
      {/*                    </a>*/}
      {/*                </div>*/}
      {/*                <div className="top-info-tour-special">*/}
      {/*                    <div className="day">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                             viewBox="0 0 24 24.998">*/}
      {/*                            <path id="Moon_1" data-name="Moon 1"*/}
      {/*                                  d="M23,16.851l.925.38a1,1,0,0,0-1.372-1.275ZM10.016,1l.807.591A1,1,0,0,0,9.8.023ZM18.4,16.937a9.525,9.525,0,0,1-9.437-9.61h-2A11.525,11.525,0,0,0,18.4,18.937Zm4.157-.98a9.256,9.256,0,0,1-4.157.98v2a11.256,11.256,0,0,0,5.053-1.192Zm-.477.514A10.444,10.444,0,0,1,12.441,23v2a12.444,12.444,0,0,0,11.484-7.767ZM12.441,23A10.536,10.536,0,0,1,2,12.368H0A12.536,12.536,0,0,0,12.441,25ZM2,12.368A10.591,10.591,0,0,1,10.23,1.977L9.8.023A12.591,12.591,0,0,0,0,12.368ZM8.958,7.327a9.678,9.678,0,0,1,1.865-5.736L9.209.409A11.679,11.679,0,0,0,6.958,7.327Z"*/}
      {/*                                  transform="translate(0 0)" fill="#212135"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>3 روز و 12 شب</span>*/}
      {/*                    </div>*/}
      {/*                    <div className="location">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"*/}
      {/*                             height="20">*/}
      {/*                            <path*/}
      {/*                                d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"/>*/}
      {/*                            <path*/}
      {/*                                d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>تهران-آنتالیا</span>*/}
      {/*                    </div>*/}
      {/*                </div>*/}
      {/*                <div className="mid-info-tour-special">*/}
      {/*                    <div className="inner-mid-info-tour-special w-75">*/}
      {/*                        <a href="" rel="noreferrer">*/}
      {/*                            <h2 className="title-tour-special">تور انتالیا</h2>*/}
      {/*                        </a>*/}
      {/*                        <div className="date-special">*/}
      {/*    <span*/}
      {/*        className="from">25/25/25</span>*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16.828"*/}
      {/*                                 viewBox="0 0 18 16.828">*/}
      {/*                                <g id="Left_Right_2" data-name="Left Right 2"*/}
      {/*                                   transform="translate(0 0.414)">*/}
      {/*                                    <path id="Path_1005" data-name="Path 1005" d="M6,1,1,6H17" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                    <path id="Path_1006" data-name="Path 1006" d="M12,15l5-5H1" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}

      {/*                            <span className="to">25/25/25</span>*/}
      {/*                        </div>*/}
      {/*                    </div>*/}
      {/*                    <div className="bottom-info-tour-special">*/}
      {/*                        <div className="title-price">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                                 viewBox="0 0 24.109 24">*/}
      {/*                                <g id="Ticket" transform="translate(-0.023)">*/}
      {/*                                    <path id="Path_1168" data-name="Path 1168"*/}
      {/*                                          d="M2.532,9.817a4.474,4.474,0,0,1-.727-.022l-.21.978.21-.978A1.033,1.033,0,0,1,1.031,9a3.974,3.974,0,0,1,0-.682,10.8,10.8,0,0,1,.479-3.428,5.241,5.241,0,0,1,2.48-3.015C5,1.307,6.574,1,9.778,1h4.444c3.2,0,4.781.307,5.789.872a5.241,5.241,0,0,1,2.48,3.015,10.8,10.8,0,0,1,.479,3.428,3.976,3.976,0,0,1,0,.682l.984.18L22.969,9a1.033,1.033,0,0,1-.774.8,4.473,4.473,0,0,1-.727.022,2.334,2.334,0,0,0-2.186,2.456,2.334,2.334,0,0,0,2.186,2.456,4.352,4.352,0,0,1,.713.022,1.048,1.048,0,0,1,.778.815,3.662,3.662,0,0,1-.008.647,9.522,9.522,0,0,1-.459,2.9,5.241,5.241,0,0,1-2.48,3.015C19,22.693,17.426,23,14.222,23H9.778c-3.2,0-4.781-.307-5.789-.872a5.241,5.241,0,0,1-2.48-3.015,9.522,9.522,0,0,1-.459-2.9,3.649,3.649,0,0,1-.008-.647,1.048,1.048,0,0,1,.778-.815,4.351,4.351,0,0,1,.712-.022,2.334,2.334,0,0,0,2.186-2.456A2.334,2.334,0,0,0,2.532,9.817Z"*/}
      {/*                                          fill="none" stroke="#212135" stroke-width="2"/>*/}
      {/*                                    <path id="Path_1169" data-name="Path 1169"*/}
      {/*                                          d="M15,4a1,1,0,0,1,1,1V7a1,1,0,0,1-2,0V5A1,1,0,0,1,15,4Zm0,6a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V11A1,1,0,0,1,15,10Zm1,7a1,1,0,0,0-2,0v2a1,1,0,0,0,2,0Z"*/}
      {/*                                          fill="#212135" fill-rule="evenodd"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}
      {/*                            <span>شروع قیمت از :</span>*/}
      {/*                        </div>*/}
      {/*                        <div className="d-flex align-items-center">*/}
      {/*                            <strong className="price-tour-special ml-2 mr-2">13000</strong>*/}
      {/*                            <strong className="price-tour-special ">*/}
      {/*                                تومان </strong>*/}
      {/*                        </div>*/}

      {/*                    </div>*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </SwiperSlide>*/}
      {/*        <SwiperSlide>*/}
      {/*            <div className="box-special-tour">*/}
      {/*                <div className="img-special-tour">*/}
      {/*                    <a href="">*/}
      {/*                        <div className="hover-info-img animated pulse">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="16.085" height="22.888"*/}
      {/*                                 viewBox="0 0 16.085 22.888">*/}
      {/*                                <path id="Attachment_1" data-name="Attachment 1"*/}
      {/*                                      d="M15.129,2.531s.8,2.8-1.01,9.564c-2.459,9.176-5.038,11.074-8.9,10.038S.069,18.166,2.528,8.99,10.11.909,11.36,3.074c1.414,2.449-.88,9.082-.88,9.082s-1.5,5.291-3.838,4.666c-3.381-.906.4-9.211.4-9.211"*/}
      {/*                                      transform="translate(-0.285 -0.488)" fill="none" stroke="#fff"/>*/}
      {/*                            </svg>*/}
      {/*                            <a href="" className="view-details-more text-white" rel="noreferrer">مشاهده*/}
      {/*                                جزئیات بیشتر</a>*/}
      {/*                        </div>*/}
      {/*                        <img*/}
      {/*                            src=""*/}
      {/*                            alt=""/>*/}
      {/*                    </a>*/}
      {/*                </div>*/}
      {/*                <div className="top-info-tour-special">*/}
      {/*                    <div className="day">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                             viewBox="0 0 24 24.998">*/}
      {/*                            <path id="Moon_1" data-name="Moon 1"*/}
      {/*                                  d="M23,16.851l.925.38a1,1,0,0,0-1.372-1.275ZM10.016,1l.807.591A1,1,0,0,0,9.8.023ZM18.4,16.937a9.525,9.525,0,0,1-9.437-9.61h-2A11.525,11.525,0,0,0,18.4,18.937Zm4.157-.98a9.256,9.256,0,0,1-4.157.98v2a11.256,11.256,0,0,0,5.053-1.192Zm-.477.514A10.444,10.444,0,0,1,12.441,23v2a12.444,12.444,0,0,0,11.484-7.767ZM12.441,23A10.536,10.536,0,0,1,2,12.368H0A12.536,12.536,0,0,0,12.441,25ZM2,12.368A10.591,10.591,0,0,1,10.23,1.977L9.8.023A12.591,12.591,0,0,0,0,12.368ZM8.958,7.327a9.678,9.678,0,0,1,1.865-5.736L9.209.409A11.679,11.679,0,0,0,6.958,7.327Z"*/}
      {/*                                  transform="translate(0 0)" fill="#212135"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>3 روز و 12 شب</span>*/}
      {/*                    </div>*/}
      {/*                    <div className="location">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"*/}
      {/*                             height="20">*/}
      {/*                            <path*/}
      {/*                                d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"/>*/}
      {/*                            <path*/}
      {/*                                d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>تهران-آنتالیا</span>*/}
      {/*                    </div>*/}
      {/*                </div>*/}
      {/*                <div className="mid-info-tour-special">*/}
      {/*                    <div className="inner-mid-info-tour-special w-75">*/}
      {/*                        <a href="" rel="noreferrer">*/}
      {/*                            <h2 className="title-tour-special">تور انتالیا</h2>*/}
      {/*                        </a>*/}
      {/*                        <div className="date-special">*/}
      {/*    <span*/}
      {/*        className="from">25/25/25</span>*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16.828"*/}
      {/*                                 viewBox="0 0 18 16.828">*/}
      {/*                                <g id="Left_Right_2" data-name="Left Right 2"*/}
      {/*                                   transform="translate(0 0.414)">*/}
      {/*                                    <path id="Path_1005" data-name="Path 1005" d="M6,1,1,6H17" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                    <path id="Path_1006" data-name="Path 1006" d="M12,15l5-5H1" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}

      {/*                            <span className="to">25/25/25</span>*/}
      {/*                        </div>*/}
      {/*                    </div>*/}
      {/*                    <div className="bottom-info-tour-special">*/}
      {/*                        <div className="title-price">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                                 viewBox="0 0 24.109 24">*/}
      {/*                                <g id="Ticket" transform="translate(-0.023)">*/}
      {/*                                    <path id="Path_1168" data-name="Path 1168"*/}
      {/*                                          d="M2.532,9.817a4.474,4.474,0,0,1-.727-.022l-.21.978.21-.978A1.033,1.033,0,0,1,1.031,9a3.974,3.974,0,0,1,0-.682,10.8,10.8,0,0,1,.479-3.428,5.241,5.241,0,0,1,2.48-3.015C5,1.307,6.574,1,9.778,1h4.444c3.2,0,4.781.307,5.789.872a5.241,5.241,0,0,1,2.48,3.015,10.8,10.8,0,0,1,.479,3.428,3.976,3.976,0,0,1,0,.682l.984.18L22.969,9a1.033,1.033,0,0,1-.774.8,4.473,4.473,0,0,1-.727.022,2.334,2.334,0,0,0-2.186,2.456,2.334,2.334,0,0,0,2.186,2.456,4.352,4.352,0,0,1,.713.022,1.048,1.048,0,0,1,.778.815,3.662,3.662,0,0,1-.008.647,9.522,9.522,0,0,1-.459,2.9,5.241,5.241,0,0,1-2.48,3.015C19,22.693,17.426,23,14.222,23H9.778c-3.2,0-4.781-.307-5.789-.872a5.241,5.241,0,0,1-2.48-3.015,9.522,9.522,0,0,1-.459-2.9,3.649,3.649,0,0,1-.008-.647,1.048,1.048,0,0,1,.778-.815,4.351,4.351,0,0,1,.712-.022,2.334,2.334,0,0,0,2.186-2.456A2.334,2.334,0,0,0,2.532,9.817Z"*/}
      {/*                                          fill="none" stroke="#212135" stroke-width="2"/>*/}
      {/*                                    <path id="Path_1169" data-name="Path 1169"*/}
      {/*                                          d="M15,4a1,1,0,0,1,1,1V7a1,1,0,0,1-2,0V5A1,1,0,0,1,15,4Zm0,6a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V11A1,1,0,0,1,15,10Zm1,7a1,1,0,0,0-2,0v2a1,1,0,0,0,2,0Z"*/}
      {/*                                          fill="#212135" fill-rule="evenodd"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}
      {/*                            <span>شروع قیمت از :</span>*/}
      {/*                        </div>*/}
      {/*                        <div className="d-flex align-items-center">*/}
      {/*                            <strong className="price-tour-special ml-2 mr-2">13000</strong>*/}
      {/*                            <strong className="price-tour-special ">*/}
      {/*                                تومان </strong>*/}
      {/*                        </div>*/}

      {/*                    </div>*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </SwiperSlide>*/}
      {/*        <SwiperSlide>*/}
      {/*            <div className="box-special-tour">*/}
      {/*                <div className="img-special-tour">*/}
      {/*                    <a href="">*/}
      {/*                        <div className="hover-info-img animated pulse">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="16.085" height="22.888"*/}
      {/*                                 viewBox="0 0 16.085 22.888">*/}
      {/*                                <path id="Attachment_1" data-name="Attachment 1"*/}
      {/*                                      d="M15.129,2.531s.8,2.8-1.01,9.564c-2.459,9.176-5.038,11.074-8.9,10.038S.069,18.166,2.528,8.99,10.11.909,11.36,3.074c1.414,2.449-.88,9.082-.88,9.082s-1.5,5.291-3.838,4.666c-3.381-.906.4-9.211.4-9.211"*/}
      {/*                                      transform="translate(-0.285 -0.488)" fill="none" stroke="#fff"/>*/}
      {/*                            </svg>*/}
      {/*                            <a href="" className="view-details-more text-white" rel="noreferrer">مشاهده*/}
      {/*                                جزئیات بیشتر</a>*/}
      {/*                        </div>*/}
      {/*                        <img*/}
      {/*                            src=""*/}
      {/*                            alt=""/>*/}
      {/*                    </a>*/}
      {/*                </div>*/}
      {/*                <div className="top-info-tour-special">*/}
      {/*                    <div className="day">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                             viewBox="0 0 24 24.998">*/}
      {/*                            <path id="Moon_1" data-name="Moon 1"*/}
      {/*                                  d="M23,16.851l.925.38a1,1,0,0,0-1.372-1.275ZM10.016,1l.807.591A1,1,0,0,0,9.8.023ZM18.4,16.937a9.525,9.525,0,0,1-9.437-9.61h-2A11.525,11.525,0,0,0,18.4,18.937Zm4.157-.98a9.256,9.256,0,0,1-4.157.98v2a11.256,11.256,0,0,0,5.053-1.192Zm-.477.514A10.444,10.444,0,0,1,12.441,23v2a12.444,12.444,0,0,0,11.484-7.767ZM12.441,23A10.536,10.536,0,0,1,2,12.368H0A12.536,12.536,0,0,0,12.441,25ZM2,12.368A10.591,10.591,0,0,1,10.23,1.977L9.8.023A12.591,12.591,0,0,0,0,12.368ZM8.958,7.327a9.678,9.678,0,0,1,1.865-5.736L9.209.409A11.679,11.679,0,0,0,6.958,7.327Z"*/}
      {/*                                  transform="translate(0 0)" fill="#212135"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>3 روز و 12 شب</span>*/}
      {/*                    </div>*/}
      {/*                    <div className="location">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"*/}
      {/*                             height="20">*/}
      {/*                            <path*/}
      {/*                                d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"/>*/}
      {/*                            <path*/}
      {/*                                d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>تهران-آنتالیا</span>*/}
      {/*                    </div>*/}
      {/*                </div>*/}
      {/*                <div className="mid-info-tour-special">*/}
      {/*                    <div className="inner-mid-info-tour-special w-75">*/}
      {/*                        <a href="" rel="noreferrer">*/}
      {/*                            <h2 className="title-tour-special">تور انتالیا</h2>*/}
      {/*                        </a>*/}
      {/*                        <div className="date-special">*/}
      {/*    <span*/}
      {/*        className="from">25/25/25</span>*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16.828"*/}
      {/*                                 viewBox="0 0 18 16.828">*/}
      {/*                                <g id="Left_Right_2" data-name="Left Right 2"*/}
      {/*                                   transform="translate(0 0.414)">*/}
      {/*                                    <path id="Path_1005" data-name="Path 1005" d="M6,1,1,6H17" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                    <path id="Path_1006" data-name="Path 1006" d="M12,15l5-5H1" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}

      {/*                            <span className="to">25/25/25</span>*/}
      {/*                        </div>*/}
      {/*                    </div>*/}
      {/*                    <div className="bottom-info-tour-special">*/}
      {/*                        <div className="title-price">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                                 viewBox="0 0 24.109 24">*/}
      {/*                                <g id="Ticket" transform="translate(-0.023)">*/}
      {/*                                    <path id="Path_1168" data-name="Path 1168"*/}
      {/*                                          d="M2.532,9.817a4.474,4.474,0,0,1-.727-.022l-.21.978.21-.978A1.033,1.033,0,0,1,1.031,9a3.974,3.974,0,0,1,0-.682,10.8,10.8,0,0,1,.479-3.428,5.241,5.241,0,0,1,2.48-3.015C5,1.307,6.574,1,9.778,1h4.444c3.2,0,4.781.307,5.789.872a5.241,5.241,0,0,1,2.48,3.015,10.8,10.8,0,0,1,.479,3.428,3.976,3.976,0,0,1,0,.682l.984.18L22.969,9a1.033,1.033,0,0,1-.774.8,4.473,4.473,0,0,1-.727.022,2.334,2.334,0,0,0-2.186,2.456,2.334,2.334,0,0,0,2.186,2.456,4.352,4.352,0,0,1,.713.022,1.048,1.048,0,0,1,.778.815,3.662,3.662,0,0,1-.008.647,9.522,9.522,0,0,1-.459,2.9,5.241,5.241,0,0,1-2.48,3.015C19,22.693,17.426,23,14.222,23H9.778c-3.2,0-4.781-.307-5.789-.872a5.241,5.241,0,0,1-2.48-3.015,9.522,9.522,0,0,1-.459-2.9,3.649,3.649,0,0,1-.008-.647,1.048,1.048,0,0,1,.778-.815,4.351,4.351,0,0,1,.712-.022,2.334,2.334,0,0,0,2.186-2.456A2.334,2.334,0,0,0,2.532,9.817Z"*/}
      {/*                                          fill="none" stroke="#212135" stroke-width="2"/>*/}
      {/*                                    <path id="Path_1169" data-name="Path 1169"*/}
      {/*                                          d="M15,4a1,1,0,0,1,1,1V7a1,1,0,0,1-2,0V5A1,1,0,0,1,15,4Zm0,6a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V11A1,1,0,0,1,15,10Zm1,7a1,1,0,0,0-2,0v2a1,1,0,0,0,2,0Z"*/}
      {/*                                          fill="#212135" fill-rule="evenodd"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}
      {/*                            <span>شروع قیمت از :</span>*/}
      {/*                        </div>*/}
      {/*                        <div className="d-flex align-items-center">*/}
      {/*                            <strong className="price-tour-special ml-2 mr-2">13000</strong>*/}
      {/*                            <strong className="price-tour-special ">*/}
      {/*                                تومان </strong>*/}
      {/*                        </div>*/}

      {/*                    </div>*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </SwiperSlide>*/}
      {/*        <SwiperSlide>*/}
      {/*            <div className="box-special-tour">*/}
      {/*                <div className="img-special-tour">*/}
      {/*                    <a href="">*/}
      {/*                        <div className="hover-info-img animated pulse">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="16.085" height="22.888"*/}
      {/*                                 viewBox="0 0 16.085 22.888">*/}
      {/*                                <path id="Attachment_1" data-name="Attachment 1"*/}
      {/*                                      d="M15.129,2.531s.8,2.8-1.01,9.564c-2.459,9.176-5.038,11.074-8.9,10.038S.069,18.166,2.528,8.99,10.11.909,11.36,3.074c1.414,2.449-.88,9.082-.88,9.082s-1.5,5.291-3.838,4.666c-3.381-.906.4-9.211.4-9.211"*/}
      {/*                                      transform="translate(-0.285 -0.488)" fill="none" stroke="#fff"/>*/}
      {/*                            </svg>*/}
      {/*                            <a href="" className="view-details-more text-white" rel="noreferrer">مشاهده*/}
      {/*                                جزئیات بیشتر</a>*/}
      {/*                        </div>*/}
      {/*                        <img*/}
      {/*                            src=""*/}
      {/*                            alt=""/>*/}
      {/*                    </a>*/}
      {/*                </div>*/}
      {/*                <div className="top-info-tour-special">*/}
      {/*                    <div className="day">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                             viewBox="0 0 24 24.998">*/}
      {/*                            <path id="Moon_1" data-name="Moon 1"*/}
      {/*                                  d="M23,16.851l.925.38a1,1,0,0,0-1.372-1.275ZM10.016,1l.807.591A1,1,0,0,0,9.8.023ZM18.4,16.937a9.525,9.525,0,0,1-9.437-9.61h-2A11.525,11.525,0,0,0,18.4,18.937Zm4.157-.98a9.256,9.256,0,0,1-4.157.98v2a11.256,11.256,0,0,0,5.053-1.192Zm-.477.514A10.444,10.444,0,0,1,12.441,23v2a12.444,12.444,0,0,0,11.484-7.767ZM12.441,23A10.536,10.536,0,0,1,2,12.368H0A12.536,12.536,0,0,0,12.441,25ZM2,12.368A10.591,10.591,0,0,1,10.23,1.977L9.8.023A12.591,12.591,0,0,0,0,12.368ZM8.958,7.327a9.678,9.678,0,0,1,1.865-5.736L9.209.409A11.679,11.679,0,0,0,6.958,7.327Z"*/}
      {/*                                  transform="translate(0 0)" fill="#212135"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>3 روز و 12 شب</span>*/}
      {/*                    </div>*/}
      {/*                    <div className="location">*/}
      {/*                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"*/}
      {/*                             height="20">*/}
      {/*                            <path*/}
      {/*                                d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"/>*/}
      {/*                            <path*/}
      {/*                                d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z"/>*/}
      {/*                        </svg>*/}

      {/*                        <span>تهران-آنتالیا</span>*/}
      {/*                    </div>*/}
      {/*                </div>*/}
      {/*                <div className="mid-info-tour-special">*/}
      {/*                    <div className="inner-mid-info-tour-special w-75">*/}
      {/*                        <a href="" rel="noreferrer">*/}
      {/*                            <h2 className="title-tour-special">تور انتالیا</h2>*/}
      {/*                        </a>*/}
      {/*                        <div className="date-special">*/}
      {/*    <span*/}
      {/*        className="from">25/25/25</span>*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16.828"*/}
      {/*                                 viewBox="0 0 18 16.828">*/}
      {/*                                <g id="Left_Right_2" data-name="Left Right 2"*/}
      {/*                                   transform="translate(0 0.414)">*/}
      {/*                                    <path id="Path_1005" data-name="Path 1005" d="M6,1,1,6H17" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                    <path id="Path_1006" data-name="Path 1006" d="M12,15l5-5H1" fill="none"*/}
      {/*                                          stroke="#212135"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}

      {/*                            <span className="to">25/25/25</span>*/}
      {/*                        </div>*/}
      {/*                    </div>*/}
      {/*                    <div className="bottom-info-tour-special">*/}
      {/*                        <div className="title-price">*/}
      {/*                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"*/}
      {/*                                 viewBox="0 0 24.109 24">*/}
      {/*                                <g id="Ticket" transform="translate(-0.023)">*/}
      {/*                                    <path id="Path_1168" data-name="Path 1168"*/}
      {/*                                          d="M2.532,9.817a4.474,4.474,0,0,1-.727-.022l-.21.978.21-.978A1.033,1.033,0,0,1,1.031,9a3.974,3.974,0,0,1,0-.682,10.8,10.8,0,0,1,.479-3.428,5.241,5.241,0,0,1,2.48-3.015C5,1.307,6.574,1,9.778,1h4.444c3.2,0,4.781.307,5.789.872a5.241,5.241,0,0,1,2.48,3.015,10.8,10.8,0,0,1,.479,3.428,3.976,3.976,0,0,1,0,.682l.984.18L22.969,9a1.033,1.033,0,0,1-.774.8,4.473,4.473,0,0,1-.727.022,2.334,2.334,0,0,0-2.186,2.456,2.334,2.334,0,0,0,2.186,2.456,4.352,4.352,0,0,1,.713.022,1.048,1.048,0,0,1,.778.815,3.662,3.662,0,0,1-.008.647,9.522,9.522,0,0,1-.459,2.9,5.241,5.241,0,0,1-2.48,3.015C19,22.693,17.426,23,14.222,23H9.778c-3.2,0-4.781-.307-5.789-.872a5.241,5.241,0,0,1-2.48-3.015,9.522,9.522,0,0,1-.459-2.9,3.649,3.649,0,0,1-.008-.647,1.048,1.048,0,0,1,.778-.815,4.351,4.351,0,0,1,.712-.022,2.334,2.334,0,0,0,2.186-2.456A2.334,2.334,0,0,0,2.532,9.817Z"*/}
      {/*                                          fill="none" stroke="#212135" stroke-width="2"/>*/}
      {/*                                    <path id="Path_1169" data-name="Path 1169"*/}
      {/*                                          d="M15,4a1,1,0,0,1,1,1V7a1,1,0,0,1-2,0V5A1,1,0,0,1,15,4Zm0,6a1,1,0,0,1,1,1v2a1,1,0,0,1-2,0V11A1,1,0,0,1,15,10Zm1,7a1,1,0,0,0-2,0v2a1,1,0,0,0,2,0Z"*/}
      {/*                                          fill="#212135" fill-rule="evenodd"/>*/}
      {/*                                </g>*/}
      {/*                            </svg>*/}
      {/*                            <span>شروع قیمت از :</span>*/}
      {/*                        </div>*/}
      {/*                        <div className="d-flex align-items-center">*/}
      {/*                            <strong className="price-tour-special ml-2 mr-2">13000</strong>*/}
      {/*                            <strong className="price-tour-special ">*/}
      {/*                                تومان </strong>*/}
      {/*                        </div>*/}

      {/*                    </div>*/}
      {/*                </div>*/}
      {/*            </div>*/}
      {/*        </SwiperSlide>*/}
      {/*    </Swiper>*/}

      {/*</div>*/}
      <PictureBase/>
      <div className={`${styles["heor-main-container"]}`}>
        <Scrolltoprefresh />
        <div style={{ marginRight: '2px',marginTop: '-1rem' }}>
              <PageTabls type={type} setType={setType} />
            </div>
            <div className="row justify-content-center">
              <div className="col-md-10 px-0 d-flex justify-content-center">
                <div className={`px-0 ${styles["width-mobile-search"]} w-100`}>
                  <FlightSearchBox dateSelected={state.dateSelected} />
                </div>
              </div>
              <HomeDetails state={state} type={props.type} />
            </div>
      </div>
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
