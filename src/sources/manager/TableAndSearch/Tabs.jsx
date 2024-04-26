import React from 'react';
import style from "../sell-report/sell-report/Descktop.module.scss";
import Link from 'next/link';
const Tabs = ({active}) => {
    return (
      <div className="d-flex w-100 justify-content-end" style={{transform:'translateX(60px)'}}>
        <div className="d-flex justify-content-between mt-3 align-items-center w-10 mb-4 flex-wrap">
          <div className={"col-6 col-md-1 my-1"}>
            <Link href="/panel/flight-sell-report">
              <button
                className={`${
                  active == "Sell" ? style["active"] : style["button"]
                }`}
              >
                گزارش فروش
              </button>
            </Link>
          </div>
          <div className={"col-6 col-md-1 my-1"}>
            <Link href="/panel/Consular-report">
              <button
                className={`${
                  active == "cancell" ? style["active"] : style["button"]
                }`}
              >
                گزارش کنسلی
              </button>
            </Link>
          </div>
          <div className={"col-6 col-md-1 my-1"}>
            <Link href="/panel/reserving">
              <button
                className={`${
                  active == "Reserving" ? style["active"] : style["button"]
                }`}
              >
                در حال رزرو{" "}
              </button>
            </Link>
          </div>
          <div className={"col-6 col-md-1 my-1"}>
            <Link href="/panel/transaction">
              <button
                className={`${
                  active == "Transaction" ? style["active"] : style["button"]
                }`}
              >
                تراکنش ها
              </button>
            </Link>
          </div>
          {/* </div> */}
        </div>
      </div>
    );
};

export default Tabs;