import React from "react";
import style from "./Descktop.module.scss";
import Link from "next/link";
import Tabs from "../../TableAndSearch/Tabs";


const ConsularReport = () => {
    return (
        <div>
            <section>
                <div class="position-relative">
                    <h6 className="mt-0 font-bold-iransanse">
                        گـزارشات لغو شده
                    </h6>
                    <div class="d-flex align-items-center">
                        <div class="box-through"></div>
                        <div class="aside-through"></div>
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-3 align-items-center w-100 mb-4">
                    <Tabs active='cancell' />

                </div>
                <div className="d-flex flex-column align-items-center w-100">
                    <div className={style['parent-sales-report']}>
                        <div className={style['header-parent-sales-report-two']}>
                            <span className=" head font-bold-iransanse font-size-12">شماره درخواست </span>
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
                            <span className="font-bold-iransanse font-size-12">     جریمه کنسلی دریافت </span>
                            <span className="font-bold-iransanse font-size-12">   پرداختی   </span>
                            <span className="font-bold-iransanse font-size-12">   قابل استرداد   </span>
                            <span className="font-bold-iransanse font-size-12">    قابل دریافت تامین کننده  </span>
                            <span className="font-bold-iransanse font-size-12">   کاربر کنسلی   </span>
                            <span className="font-bold-iransanse font-size-12">    IP کنسلی   </span>
                        </div>
                        <div className={style['body-search-report-two']}>
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
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>
                        {/*<div className={style['body-parent-report-two']}>*/}
                        {/*    <span className="id">2 </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">نام و نام خانوادگی</span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12"> رفرنس بلیطجا</span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">رفرنس آژانس</span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">شماره بلیط </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">قیمت خرید</span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">فروش </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">شماره همراه رزرو گیرنده </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">سود </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">بلیط های صادر شده </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">ip رزرو    </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">بلیط های صادر شده </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">  سیستم سرویس  </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">   نام آژانس  </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">     جریمه کنسلی دریافت </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">   پرداختی   </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">   قابل استرداد   </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">    قابل دریافت تامین کننده  </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">   کاربر کنسلی   </span>*/}
                        {/*    <span className="font-bold-iransanse font-size-12">    IP کنسلی   </span>*/}
                        {/*</div>*/}

                    </div>
                </div>
            </section>
        </div>
    )
}
export default ConsularReport;
