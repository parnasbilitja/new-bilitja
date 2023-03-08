import moment from 'moment-jalaali';
import React from 'react';
import styles from "../../../styles/Home.module.scss";

const FlightsUrl = ({flightsData, flightsDataHotel}) => {
  let date = moment().format('jYYYY/jM/jD')
  // console.log(date);
    return (
      <div className="row justify-content-center">
        <div className="col-md-10" >
          <div className="row justify-content-center">
            <div className={`col-12 col-lg-6 ${styles["home-flight-suggestion"]} text-center container`}>
              <h2 className="font-bold-iransanse font-size-20">بلیط هواپیمـا</h2>
              <h4 className="mb-3 font-size-18">قیمت های لحظه آخری بلیطـجا</h4>
              <div className="col-sm-12 d-flex row flex-wrap align-items-center justify-content-between">
                <div className={`${styles["suggestion-list"]} col-6`}>
                  {flightsData[0].map((item,index)=>(
                    <div className="py-2 mb-2" key={index}>
                      <a href={`flights/${item.url}#${date}`}>
                        <i className="bilitja font-size-24 icon-plane-departure pull-right"></i>
                        <span
                          style={{ marginRight: 10 }}
                          className="pull-right font-size-12">
                          <strong>بلیط هواپیما {item.name}</strong>
                        </span>
                      </a>
                      <div className="clear"></div>
                    </div>
                  ))}
                </div>
                <div className={`${styles["suggestion-list"]} col-6`}>
                {flightsData[1].map((item,index)=>(
                    <div className="py-2 mb-2" key={index}>
                      <a href={`flights/${item.url}#${date}`}>
                        <i className="bilitja font-size-24 icon-plane-departure pull-right"></i>
                        <span
                          style={{ marginRight: 10 }}
                          className="pull-right font-size-12">
                          <strong>بلیط هواپیما {item.name}</strong>
                        </span>
                      </a>
                      <div className="clear"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={`col-12 col-lg-6 ${styles["home-flight-suggestion"]} text-center container`}>
              <h2 className="font-bold-iransanse font-size-20">رزرو هتل</h2>
              <h4 className="mb-3 font-size-18">قیمت های لحظه آخری هتل ها</h4>
              <div className="col-sm-12 d-flex flex-wrap align-items-center justify-content-between">
                <div className={`${styles["suggestion-list"]} col-6`}>
                  {flightsDataHotel[0].map((item,index)=>(
                    <div className="py-2 mb-2" key={index}>
                      <a href={`/${item.url}`}>
                        <i className="bilitja font-size-24 icon-plane-departure pull-right"></i>
                        <span
                          style={{ marginRight: 10 }}
                          className="pull-right font-size-12">
                          <strong>هتل های شهر {item.name}</strong>
                        </span>
                      </a>
                      <div className="clear"></div>
                    </div>
                  ))}
                </div>
                <div className={`${styles["suggestion-list"]} col-6`}>
                {flightsDataHotel[1].map((item,index)=>(
                    <div className="py-2 mb-2" key={index}>
                      <a href={`/${item.url}`}>
                        <i className="bilitja font-size-24 icon-plane-departure pull-right"></i>
                        <span
                          style={{ marginRight: 10 }}
                          className="pull-right font-size-12">
                          <strong>هتل های شهر {item.name}</strong>
                        </span>
                      </a>
                      <div className="clear"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FlightsUrl;