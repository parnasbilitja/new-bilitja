import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import style from "./Style.module.scss";
const Listtiketssold = () => {
  const [data, setData] = useState([]);
  const [databank, setDatabank] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(
          `https://tpa.ravis.ir/api/Auth/reports/dfe64807-341f-44f8-9e6a-34c8cc8b3504/1a157116-a01a-4027-ab10-74098ac63815`
        )
        .then((response) => {
          console.log("response", response);
          setData(response.data);
          console.log("Data", data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    try {
      axios
        .get(
          `https://tpa.ravis.ir/api/Auth/reports/dfe64807-341f-44f8-9e6a-34c8cc8b3504/1a157116-a01a-4027-ab10-74098ac63815`
        )
        .then((response) => {
          console.log("response", response);
          setDatabank(response.data);
          console.log("Data", databank);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div className={style["table-header"]}>
        <p>شماره درخواست/رفرنس </p>
        <p>نام گروه</p>
        <p> تامین کننده</p>
        <p> فروش به</p>
        <p> تاریخ رزرو/ساعت</p>
        <p>تاریخ پرواز </p>
        <p>مسیر</p>
        <p>ایرلاین/شماره پرواز</p>
        <p>تعداد مسافر </p>
      </div>
      <div>
        {data?.reportFlightFrLst?.map((item1) => (
          <div className={style["table-body"]}>
            <span> {item1?.ticketNo}</span>
            <p>
              {databank.reportEbank?.map((item) => (
                <p>
                  {item1?.reqPnr === item?.reqPnr
                    ? item?.reqPnr && item1?.reqPnr
                    : ""}
                </p>
              ))}
            </p>
            <p></p>
            <p>{item1?.airline}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Listtiketssold;
