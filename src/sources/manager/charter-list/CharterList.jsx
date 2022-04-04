import React from "react";
import Row from "./Row";
import axios from "axios";
import globals from "./../../Global";
import style from "./Charetr.module.scss";
const CharterList = () => {
  const [agency, setAgency] = React.useState(null);

  const getList = async () => {
    const { data } = await axios.get(
      `${globals.baseUrlNew}BilitAirLines/GetAzhansList`
    );
    setAgency(data);
  };

  React.useEffect(() => {
    getList();
  }, []);
  return (
    <div className="container pt-2 pb-2 pe-2 ps-2">
      <h2 className="text-dark">لیست آژانس های چارتر</h2>

      <div>
        <div>
          <div>
            <div className={style["header-title"]}>
              <div>کد</div>
              <div>نام</div>
              <div>آدرس</div>
              <div>رفتن به سایت</div>
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
    </div>
  );
};

export default CharterList;
