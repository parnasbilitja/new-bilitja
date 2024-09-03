import React from 'react';
import {moneyFormat} from '../../../Utils/SimpleTasks'
import style from "../sell-report/sell-report/Descktop.module.scss";

const Row = (props) => {
  // console.log(props.item);
  return (
    <div className="d-detail d-flex align-items-center" >
      {props.header.map((item)=>(
        <>
          {item.name=='count'?
            <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
              <span className="font-size-13">{props.item.numAdl?props.item.numInf+props.item.numChd+props.item.numAdl:'عدم دریافت'}</span>
            </div>
          :item.name=='num'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-13">
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
            <span className="font-size-13">{moneyFormat(props.item.feeGet-props.item.feeGetKh)}</span>
          </div>
          // :item.name=='feeGetKh'?
          // <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
          //   <span className="font-size-13">{moneyFormat(props.item.feeGetKh)}</span>
          // </div>
          :item.name=='feeGet'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-13">{moneyFormat(props.item.feeGetKh)}</span>
            <br/>
            <span className="font-size-13">{moneyFormat(props.item.feeGet)}</span>
          </div>
          :item.name=='amount'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-13">{moneyFormat(props.item.amount)}</span>
          </div>
                              :item.name=='kndSysName'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-13">{props.item.kndSysName}</span>
            <br/>
            <span className="font-size-13">{props.item.serviceName}</span>

          </div>
                                  :item.name=='route'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-13">{props.item.route}</span>
            <br/>
            <span className="font-size-13">{props.item.pathKind}</span>

          </div>
          :item.name=='stat'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className={`font-size-13 ${props.item.stat=='پرداخت موفق'?'text-success':'text-danger'}`}>{props.item.stat}</span>
          </div>
          :item.name=='nameFamilyEn'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className={`font-size-13 `}>{props.item.nameFamilyEn?.split(',').map(item=>(<div>{item}</div>))}</span>
            <span className={`font-size-13 `}>{props.item?.mobileNo}</span>
          </div>
          :item.name=='reqPnr'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className={`font-size-14 fontEn`}>{props.item.reqPnr}</span>
            <br/>
            <span className={`font-size-14 fontEn`}>{props.item.reqNo}</span>

          </div> :item.name=='flightDate'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className={`font-size-14 fontEn`}>{props.item.flightDate}</span>
          </div> :item.name=='airline'?
          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className={`font-size-14 fontEn`}>{props.item.airline}</span>
            <br/>
            <span className={`font-size-14 fontEn`}>{props.item.flightNo}</span>
          </div>
        :

          <div className={`detail flex-${item.flex} m-flex-${item.mFlex}`}>
            <span className="font-size-13">{props.item[item.name]}</span>
          </div>}
        </>
        ))}
    </div>
  );
};

export default Row;
