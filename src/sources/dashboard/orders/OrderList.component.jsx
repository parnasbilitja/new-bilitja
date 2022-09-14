import axios from "axios";
import globals from "./../../Global";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import Table from "./Table";

const OrderList = () => {

  const [state,setState] = useState(null)

  const getList = async () => {
     await axios.get(`${globals.baseUrlNew}Auth/reports/${localStorage.getItem("token")}/1a157116-a01a-4027-ab10-74098ac63815`
    ).then((r) => {setState(r.data)})
    // setState(data)
  };

  useEffect(() => {
    getList();
    console.log(state);
  }, []);


  return (
    <section>
      <div className="position-relative">
        <h6 className="mt-0 font-bold-iransanse">
          پیگیری
        </h6>
        <div className="d-flex align-items-center">
          <div className="box-through"></div>
          <div className="aside-through"></div>
        </div>
      </div>
      {/* <div className={'parent-order-dashboard'}>
        <div className={'header-parent'}>
          <span className="font-bold-iransanse font-size-12">شماره درخواست </span>
          <span className="font-bold-iransanse font-size-12">نام و نام خانوادگی</span>
          <span className="font-bold-iransanse font-size-12">موبایل</span>
          <span className="font-bold-iransanse font-size-12">تاریخ</span>
          <span className="font-bold-iransanse font-size-12">قیمت خرید</span>
          <span className="font-bold-iransanse font-size-12">وضعیت</span>
          <span className="font-bold-iransanse font-size-12">چاپ بلیط</span>
          <span className="font-bold-iransanse font-size-12">گزارش تراکنش</span>
        </div> */}
        
        
        <Table props={state && state.reportEbank} />
        
        
        
        {/* <div className={'body-parent'}>
          <span className={'id'}>3</span>
          <span>میلاد کرد</span>
          <span>refrens</span>
          <span>masir</span>
          <span className={'price-order'}>
            <strong>13,700,000</strong>
            <small>تومان</small>
          </span>
          <span>status</span>
          <span>ticket</span>
          <span>transaction</span>
        </div>
        <div className={'body-parent'}>
          <span className={'id'}>3</span>
          <span>میلاد کرد</span>
          <span>refrens</span>
          <span>masir</span>
          <span className={'price-order'}>
            <strong>13,700,000</strong>
            <small>تومان</small>
          </span>
          <span>status</span>
          <span>ticket</span>
          <span>transaction</span>
        </div> */}


      {/* </div> */}

    </section>
  );
};

export default withRouter(OrderList);
