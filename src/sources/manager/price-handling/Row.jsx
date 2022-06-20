import React from "react";
import globals from "./../../Global";
import style from "./Filter.module.scss";

const Row = ({ option, index, filters }) => {
  const [data, setData] = React.useState(null);
  const [precent, setPrecent] = React.useState(0);
  const [reserveStatus, setReserveStatus] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [loader, setLoader] = React.useState(false);
  const [change, setChange] = React.useState(0);

  const handleSave = async (option) => {
    const info = {
      customerId: "1a157116-a01a-4027-ab10-74098ac63815",
      kndSys: option.kndsys,
      reserveStat: reserveStatus,
      markupPercent: precent,
      markupPrice: price,
      userIdSabt: "1a157116-a01a-4027-ab10-74098ac63815",
    };
    setLoader(true);
    const feteched = await fetch(
      `${globals.baseUrlNew}BilitAirLines/SetRavisKndSysDeclare`,
      {
        method: "POST",
        body: JSON.stringify(info),
        headers: { "Content-Type": "application/json" },
      }
    );
    const response = await feteched.json();
    setLoader(false);
    setChange(1);
    if (response.status == "0") {
      alert("ثبت با موفقیت انجام شد");
    } else {
      alert("در ثبت خطایی رخ داده است");
    }
  };

  React.useEffect(() => {
    setReserveStatus(option.reserveStat);
    setPrice(+option.markupPrice);
    setPrecent(+option.markupPercent);
    setData(option);
  }, [option, filters]);

  return (
    <div className={style["price"]}>
      <div className={style["price-items"]} key={index}>
        <div>
          <input className={style['inp-checkbox']}
            type="checkbox"
            checked={reserveStatus == 1 ? true : false}
            onChange={(e) =>
              e.target.checked ? setReserveStatus(1) : setReserveStatus(0)
            }
          />
        </div>
        <div  className={style['id-parent']}>
          <h6 className="text-dark"> {data != null ? data.kndsys : ""}</h6>
        </div>
        <div className={style['title-chart']}>
          <h6 className="text-dark"> {data != null ? data.azhansNam : ""}</h6>
        </div>
        <div>
          <input
            type="text"
            placeholder={precent}
            onChange={(e) => setPrecent(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <button onClick={() => handleSave(data)}>
            {loader ? "منتظر بمانید" : "ثبت"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Row;
