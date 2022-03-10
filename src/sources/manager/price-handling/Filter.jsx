import React from "react";

const Filter = ({ list, cancel, setFilter, filters }) => {
  const [data, setData] = React.useState(list);
  const [activeStatus, setActiveStatus] = React.useState("Cancel");

  const [allprecent, setAllPrecent] = React.useState(0);
  const [allprice, setAllPrice] = React.useState(0);

  const changeAll = () => {
    const newList = [];
    const lastList = [...filters];
    for (let i = 0; i < lastList.length; i++) {
      lastList[i].markupPrice = allprice;
      lastList[i].markupPercent = allprecent;
      newList.push(lastList[i]);
    }
    setFilter(newList);
  };

  const findByName = async (e) => {
    const finded = data.filter((res) => res.azhansNam.includes(e.target.value));
    setFilter(finded);
  };
  const findByStatus = async (e) => {
    if (e.target.value == "Active") {
      setActiveStatus("Active");
      const finded = data.filter((res) => +res.reserveStat == 1);
      setFilter(finded);
    } else if (e.target.value == "Not-Active") {
      setActiveStatus("Not-Active");
      const finded = data.filter((res) => res.reserveStat == 0);
      setFilter(finded);
    } else {
      setFilter(list);
      setActiveStatus("Cancel");
      setData(list);
    }
  };

  React.useEffect(() => {
    setData(list);
  }, [list, filters]);

  return (
    <div className="mt-2">
      <div className="d-flex align-items-center">
        <div className="col-2 text-center pe-1 ps-1">
          <label>عنوان چارتر کننده:</label>
          <input onChange={findByName} defaultValue={""} />
        </div>
        <div className="col-2 text-start pe-1 ps-1">
          <label>وضعیت آژانس</label>
          <select value={activeStatus} onChange={findByStatus}>
            <option value="Active">فعال</option>
            <option value="Not-Active">غیر فعال</option>
            <option value="Cancel">حذف فیلتر</option>
          </select>
        </div>
        <div className="col-2 text-center pe-1 ps-1">
          <label>درصد افزایش کلی:</label>
          <input
            onChange={(e) => setAllPrecent(e.target.value)}
            value={allprecent}
          />
        </div>
        <div className="col-2 text-center pe-1 ps-1">
          <label>مبلغ افزایش کلی:</label>
          <input
            onChange={(e) => setAllPrice(e.target.value)}
            value={allprice}
          />
        </div>
        <div className="col-2 text-center pe-1 ps-1">
          <button
            onClick={changeAll}
            className="btn btn-primary-0 col-12 mt-2 font-size-11"
          >
            {" "}
            تغییر کلی
          </button>
        </div>
        <div className="col-2 text-center pe-1 ps-1">
          <button onClick={cancel} className="btn btn-primary-1 col-12 mt-2">
            {" "}
            حذف فیلتر ها
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
