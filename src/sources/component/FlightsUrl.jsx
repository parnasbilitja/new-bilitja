import React from 'react';
import styles from "../../../styles/Home.module.scss";

const FlightsUrl = ({flightsData}) => {
    return (
        <div className={` ${styles["home-flight-suggestion"]} text-center container`}>
          <h2 className="font-bold-iransanse">بلیط هواپیمـا</h2>
          <h4 className="mb-3">قیمت های لحظه آخری بلیطـجا</h4>
          <div className="col-xl-12 col-lg-12 col-sm-12 d-flex flex-wrap align-items-center justify-content-between">
            <div className={`${styles["suggestion-list"]} col-xl-6 col-lg-6 col-sm-6 col-6`}>
              {flightsData[0].map((item,index)=>(
                <div className="py-2 mb-2" key={index}>
                  <a href={`flights/${item.url}`}>
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
            <div className={`${styles["suggestion-list"]} col-xl-6 col-lg-6 col-sm-6 col-6`}>
            {flightsData[1].map((item,index)=>(
                <div className="py-2 mb-2" key={index}>
                  <a href={`flights/${item.url}`}>
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
    );
};

export default FlightsUrl;