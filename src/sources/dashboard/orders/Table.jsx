import React from 'react';
import Row from './Row';

const Table = ({props}) => {
    console.log(props);
    return (
        <div className="controller-table mt-3 scroller">
            {/* head */}
            <div className="thead d-flex align-items-center">
              {/* <div className="head flex-5 m-flex-15"></div> */}
              <div className="head flex-7 m-flex-15">
                <span className="font-size-14 font-bold-iransanse">شناسه</span>
              </div>
              <div className="head flex-25 m-flex-50">
                <span className="font-size-14 font-bold-iransanse">نام و نام خانوادگی</span>
              </div>
              <div className="head flex-14 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">موبایل</span>
              </div>
              <div className="head flex-14 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">تاریخ</span>
              </div>
              <div className="head flex-14 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">قیمت خرید</span>
              </div>
              <div className="head flex-14 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">وضعیت</span>
              </div>
              <div className="head flex-14 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">رفرنس</span>
              </div>
              <div className="head flex-14 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">چاپ بلیط</span>
              </div>
              <div className="head flex-14 m-flex-20">
                <span className="font-size-14 font-bold-iransanse">گزارش تراکنش</span>
              </div>
            </div>
            <div className="data-detail">

              {console.log(props)}
              {props && props.map((item)=>(
                  <Row props={item} />
              ))}
            </div>
          </div>
    );
};

export default Table;