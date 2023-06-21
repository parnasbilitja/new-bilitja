import React, { useEffect, useState } from "react";
import Row from "./Row";
import axios from "axios";
import globals from "../../../../sources/Global";
import style from "./Charetr.module.scss";
const CharterList = () => {
  const [agency, setAgency] = useState(null);

  const getList = async () => {
    const { data } = await axios.get(
      `${globals.baseUrlNew}BilitAirLines/GetAzhansList`
    );
    setAgency(data);
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <section>
        <div class="position-relative">
          <h6 className="mt-0 font-bold-iransanse">
            لیـست آژانس های چارتــر
          </h6>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div className={style["header-title"]}>
                <div className={style['item']}>کد</div>
                <div className={style['item']}>نام</div>
                <div className={style['item']}>آدرس سایت</div>
                <div className={style['item']}>رفتن به سایت</div>
              </div>

              {agency != null ? (
                agency.map((option, index) => (
                  <Row option={option} index={index} key={index} />
                ))
              ) : (
                <div className="text-center pt-2 pb-2">
                  <h5 className="text-dark">درحال پردازش...</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharterList;
