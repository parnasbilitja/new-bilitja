import React from 'react';

const Row = ({props}) => {
    return (
        <div className="d-detail d-flex align-items-center" >
                {/* <div className="detail flex-5 m-flex-10"></div> */}
                <div className="detail flex-7 m-flex-15">
                  <span className="font-size-14">100056</span>
                </div>
                <div className="detail flex-25 m-flex-50">
                  <span className="font-size-14">{props.nameFamily}</span>
                </div>
                <div className="detail flex-14 m-flex-20">
                  <span className="font-size-14">{props.mobileNo}</span>
                </div>
                <div className="detail flex-14 m-flex-20">
                  <span className="font-size-14">{props.dateTimeSabt}</span>
                </div>
                <div className="detail flex-14 m-flex-20">
                  <span className="font-size-14">{props.amount} تومان</span>
                </div>
                <div className="detail flex-14 m-flex-20">
                  <span className="font-size-14"></span>
                </div>
                <div className="detail flex-14 m-flex-20">
                  <span className="font-size-14"></span>
                </div>
                <div className="detail flex-14 m-flex-20">
                  <span className="font-size-14">{props.stat}</span>
                </div>
              </div>
    );
};

export default Row;