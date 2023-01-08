import React from 'react';

const Table = () => {
    const tableData = [
        {
            name: 'شناسه',
            value:'reqNo',
        },
        {
            name: 'نام و نام خانوادگی',
            value:'nameFamily',
        },
        {
            name: 'موبایل',
        },
        {
            name: 'تاریخ',
        },
        {
            name: 'قیمت خرید',
        },
        {
            name: 'وضعیت',
        },
        {
            name: 'بانک',
        },
        {
            name: 'رفرنس',
        },
        
    ];
    return (
        <div className="controller-table mt-3 scroller">
                                {/* head */}
                                <div className="thead">
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
                                    <span className="font-size-14 font-bold-iransanse">بانک</span>
                                  </div>
                                  <div className="head flex-14 m-flex-20">
                                    <span className="font-size-14 font-bold-iransanse">رفرنس</span>
                                  </div>
                                </div>
                                <div className="d-detail py-5">
                                    <div className="detail flex-7 m-flex-15">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.reqNo}</span>
                                    </div>
                                    <div className="detail flex-25 m-flex-50">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.nameFamily}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.mobileNo}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.dateTimeSabt}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && moneyFormat(state.referenceEbank.amount)} تومان</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.stat}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.bankName}</span>
                                    </div>
                                    <div className="detail flex-14 m-flex-20">
                                        <span className="font-size-14">{state.referenceEbank && state.referenceEbank.reqPnr}</span>
                                    </div>
                                </div>
                                </div>
    );
};

export default Table;