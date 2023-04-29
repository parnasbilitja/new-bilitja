import React from 'react';
import { moneyFormat, moneyFormatrial } from '../../../Utils/SimpleTasks';

const Row = ({ props, index }) => {
  return (
    <div className="d-detail d-flex align-items-center" >
      {/* <div className="detail flex-5 m-flex-10"></div> */}
      <div className="detail flex-7 m-flex-20">
        <span className="font-size-14">{index+1}</span>
      </div>
      <div className="detail flex-25 m-flex-100">
        <span className="font-size-14">{props.nameFamily}</span>
      </div>
      <div className="detail flex-14 m-flex-80">
        <span className="font-size-14">{props.mobileNo}</span>
      </div>
      <div className="detail flex-14 m-flex-60">
        <span className="font-size-14">{props.dateTimeSabt}</span>
      </div>
      <div className="detail flex-14 m-flex-60">
        <span className="font-size-14">{moneyFormat(props.amount)} تومان</span>
      </div>
      <div className="detail flex-14 m-flex-60">
        <span className="font-size-14">{props.reqPnr}</span>
      </div>
      <div className="detail flex-14 m-flex-60">
        <span className={`font-size-14 ${props.stat==='پرداخت موفق'?'text-success':'text-danger'}`}>{props.stat}</span>
      </div>
      {/* <div className="detail flex-14 m-flex-60">
        <span className={`font-size-14 ${props.stat==='پرداخت موفق'?'text-success':'text-danger'}`}>{props.stat}</span>
      </div> */}
    </div>
  );
};

export default Row;