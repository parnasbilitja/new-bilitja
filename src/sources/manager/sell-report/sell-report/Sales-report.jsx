import React from "react";
import style from "./Descktop.module.scss";
import Link from "next/link";


const SalesReport = () => {
    return (
        <div>
            <section>
                <div class="position-relative">
                    <h5 className="mt-0">
                        <span class="font-size-13 font-bold-iransanse mx-2">گـزارشات فروش</span>
                    </h5>
                    <div class="d-flex align-items-center">
                        <div class="box-through"></div>
                        <div class="aside-through"></div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3 align-items-center w-100 mb-4">
                    <div className={style['parent-buttons']}>
                        <Link href="/panel/flight-sell-report">
                            <button>همه </button>
                        </Link>
                        <Link href="/panel/Sales-report">
                            <button>گزارش فروش</button>
                        </Link>
                        <Link href="/panel/Consular-report">
                            <button>گزارش کنسلی</button>
                        </Link>
                        <Link href="/panel/reserving">
                            <button>در حال رزرو </button>
                        </Link>
                        <Link href="/panel/transaction">
                            <button>تراکنش ها</button>
                        </Link>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center  w-100">
                    <div className={style['parent-sales-report']}>
                        <div className={style['header-parent-sales-report']}>
                            <span className="font-bold-iransanse font-size-12">شماره درخواست </span>
                            <span className="font-bold-iransanse font-size-12">نام و نام خانوادگی</span>
                            <span className="font-bold-iransanse font-size-12"> رفرنس بلیطجا</span>
                            <span className="font-bold-iransanse font-size-12">رفرنس آژانس</span>
                            <span className="font-bold-iransanse font-size-12">شماره بلیط </span>
                            <span className="font-bold-iransanse font-size-12">قیمت خرید</span>
                            <span className="font-bold-iransanse font-size-12">فروش </span>
                            <span className="font-bold-iransanse font-size-12">شماره همراه رزرو گیرنده </span>
                            <span className="font-bold-iransanse font-size-12">سود </span>
                            <span className="font-bold-iransanse font-size-12">بلیط های صادر شده </span>
                            <span className="font-bold-iransanse font-size-12">ip رزرو    </span>
                            <span className="font-bold-iransanse font-size-12">بلیط های صادر شده </span>
                            <span className="font-bold-iransanse font-size-12">  سیستم سرویس  </span>
                            <span className="font-bold-iransanse font-size-12">   نام آژانس  </span>
                        </div>
                        <div className={style['body-search-report']}>
                            <span>...</span>
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />

                        </div>
                        <div className={style['body-parent-report']}>
                            <span className="id">2 </span>
                            <span className="font-bold-iransanse font-size-12">نام و نام خانوادگی</span>
                            <span className="font-bold-iransanse font-size-12"> رفرنس بلیطجا</span>
                            <span className="font-bold-iransanse font-size-12">رفرنس آژانس</span>
                            <span className="font-bold-iransanse font-size-12">شماره بلیط </span>
                            <span className="font-bold-iransanse font-size-12">قیمت خرید</span>
                            <span className="font-bold-iransanse font-size-12">فروش </span>
                            <span className="font-bold-iransanse font-size-12">شماره همراه رزرو گیرنده </span>
                            <span className="font-bold-iransanse font-size-12">سود </span>
                            <span className="font-bold-iransanse font-size-12">بلیط های صادر شده </span>
                            <span className="font-bold-iransanse font-size-12">ip رزرو    </span>
                            <span className="font-bold-iransanse font-size-12">بلیط های صادر شده </span>
                            <span className="font-bold-iransanse font-size-12">  سیستم سرویس  </span>
                            <span className="font-bold-iransanse font-size-12">   نام آژانس  </span>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
export default SalesReport;
