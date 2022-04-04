import React from "react";
import style from "./Filter.module.scss";

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
    <div>
      <div className={style["headerlist"]}>
        <div>
          <label>عنوان چارتر کننده:</label>
          <input onChange={findByName} defaultValue={""} />
        </div>
        <div>
          <label>وضعیت آژانس</label>
          <select value={activeStatus} onChange={findByStatus}>
            <option value="Active">فعال</option>
            <option value="Not-Active">غیر فعال</option>
            <option value="Cancel">حذف فیلتر</option>
          </select>
        </div>
        <div>
          <label>درصد افزایش کلی:</label>
          <input
            onChange={(e) => setAllPrecent(e.target.value)}
            value={allprecent}
          />
        </div>
        <div>
          <label>مبلغ افزایش کلی:</label>
          <input
            onChange={(e) => setAllPrice(e.target.value)}
            value={allprice}
          />
        </div>
        <div>
          <button onClick={changeAll}> تغییر کلی</button>
        </div>
        <div>
          <button onClick={cancel}>حذف فیلتر ها</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
