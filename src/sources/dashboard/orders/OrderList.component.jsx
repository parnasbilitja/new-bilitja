import { withRouter } from "next/router";

const OrderList = () => {
  return (
    <section>
      <div className="border-bottom-black panel-header">
        <div>
          &nbsp;&nbsp;
          <span className="no-margin font-size-13 font-bold-iransanse">
            سفارشات
          </span>
        </div>
      </div>
      <div className={'parent-order-dashboard'}>
        <div className={'header-parent'}>
          <span className="font-bold-iransanse font-size-12">شماره درخواست </span>
          <span className="font-bold-iransanse font-size-12">نام و نام خانوادگی</span>
          <span className="font-bold-iransanse font-size-12">رفرنس</span>
          <span className="font-bold-iransanse font-size-12">مسیر</span>
          <span className="font-bold-iransanse font-size-12">قیمت خرید</span>
          <span className="font-bold-iransanse font-size-12">وضعیت</span>
          <span className="font-bold-iransanse font-size-12">چاپ بلیط</span>
          <span className="font-bold-iransanse font-size-12">گزارش تراکنش</span>
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
        </div>


      </div>

    </section>
  );
};

export default withRouter(OrderList);
