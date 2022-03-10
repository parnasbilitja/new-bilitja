import React from "react";
import globals from "./../../Global";

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
    <div>
      <div
        className={
          change == 0
            ? index % 2 == 0
              ? "row bg-light align-items-center  pt-1 pb-1"
              : "row bg-muted align-items-center  pt-1 pb-1"
            : "row bg-green align-items-center  pt-1 pb-1"
        }
        key={index}
      >
        <div className="col-2 text-center">
          <input
            type="checkbox"
            checked={reserveStatus == 1 ? true : false}
            onChange={(e) =>
              e.target.checked ? setReserveStatus(1) : setReserveStatus(0)
            }
          />
        </div>
        <div className="col-2 text-center">
          <h6 className="text-dark"> {data != null ? data.kndsys : ""}</h6>
        </div>
        <div className="col-2 text-center">
          <h6 className="text-dark"> {data != null ? data.azhansNam : ""}</h6>
        </div>
        <div className="col-2 text-center pe-1 ps-1">
          <input
            type="text"
            value={precent}
            onChange={(e) => setPrecent(e.target.value)}
          />
        </div>
        <div className="col-2 text-center pe-1 ps-1">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-2 text-center pe-1">
          <button
            className={
              change == 0
                ? "btn btn-primary-0 col-12"
                : "btn btn-primary-1 col-12"
            }
            onClick={() => handleSave(data)}
          >
            {loader ? "منتظر بمانید" : "ثبت"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Row;
