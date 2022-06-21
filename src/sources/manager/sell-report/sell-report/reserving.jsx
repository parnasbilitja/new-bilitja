import React from "react";
import style from "./Descktop.module.scss";
import Link from "next/link";


const Reserving = () => {
    return (
        <>
            <div className="d-flex flex-column align-items-center  w-100">
                <div className={style["title-page-sales-report"]}>  <h6>در حال رزرو</h6>
                    <div className={style['parent-buttons']}>
                        <Link href="/panel/flight-sell-report">
                            <button>همه </button>
                        </Link>                        <Link href="/panel/Sales-report">
                            <button>گزارش فروش</button>
                        </Link>
                        <Link href="/panel/Consular-report">
                            <button>گزارش کنسلی</button>
                        </Link>
                        <Link href="/panel/reserving">
                            <button>در حال رزرو</button>
                        </Link>
                        <Link href="/panel/transaction">
                            <button>تراکنش ها  </button>
                        </Link>
                    </div>
                </div>
                <div className={style['parent-sales-report']}>
                    <div className={style['header-parent-sales-report-reserve']}>
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
                        <span className="font-bold-iransanse font-size-12">   وضعیت   </span>
                        <span className="font-bold-iransanse font-size-12">   URL صفحه   </span>
                    </div>
                    <div className={style['body-search-report-reserve']}>
                        <span>...</span>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                    </div>
                    <div className={style['body-parent-report-reserve']}>
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
                        <span className="font-bold-iransanse font-size-12">   وضعیت   </span>
                        <span className="font-bold-iransanse font-size-12">   URL صفحه   </span>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Reserving;
