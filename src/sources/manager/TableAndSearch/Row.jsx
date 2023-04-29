import React from 'react';
import {moneyFormatrial} from '../../../Utils/SimpleTasks'
import style from "../sell-report/sell-report/Descktop.module.scss";

const Row = (props) => {
  // console.log(props.item);
  return (
    <div className="d-detail d-flex align-items-center" >
      {props.header.map((item,index)=>(
        <>
          {item.name=='count'?
            <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
              <span className="font-size-14">{props.item.numAdl?props.item.numInf+props.item.numChd+props.item.numAdl:'عدم دریافت'}</span>
            </div>
          :item.name=='num'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-14">
              {props.index+1}

              <button onClick={()=>{
                props.setOpenInfo(true)
                props.setReqNo(props.item.reqNo)
                props.setReqPnr(props.item.reqPnr)
              }}
               className={style['details']}>جزئیات</button>
              </span>
          </div>
          :item.name=='Profit'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-14">{moneyFormatrial(props.item.feeGet-props.item.feeGetKh)}</span>
          </div>
          :item.name=='feeGetKh'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-14">{moneyFormatrial(props.item.feeGetKh)}</span>
          </div>
          :item.name=='feeGet'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-14">{moneyFormatrial(props.item.feeGet)}</span>
          </div>
        :
        
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-14">{props.item[item.name]}</span>
          </div>}
        </>
        ))}
    </div>
  );
};

export default Row;