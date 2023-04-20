import React from 'react';
import style from "../sell-report/sell-report/Descktop.module.scss";
import Link from 'next/link';
const Tabs = ({active}) => {
    console.log(active);
    return (
        <div className="d-flex justify-content-end mt-3 align-items-center w-100 mb-4">
          <div className={style['parent-buttons']}>
            <Link href="/panel/flight-sell-report">
              <button className={`${active == 'Sell'? style['active']:style['button']}`}>گزارش فروش</button>
            </Link>
            <Link href="/panel/Consular-report">
              <button className={`${active == 'cancell'? style['active']:style['button']}`}>گزارش کنسلی</button>
            </Link>
            <Link href="/panel/reserving">
              <button className={`${active == 'Reserving'? style['active']:style['button']}`}>در حال رزرو </button>
            </Link>
            <Link href="/panel/transaction">
              <button className={`${active == 'Transaction'? style['active']:style['button']}`}>تراکنش ها</button>
            </Link>
          </div>
        </div>
    );
};

export default Tabs;