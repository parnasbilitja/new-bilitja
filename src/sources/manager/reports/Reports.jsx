import { useEffect } from "react";
import { useState } from "react";
// import { Menu, Dropdown } from "antd";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
// import "antd/dist/antd.css";
import style from "./Reports.module.scss";
const Reports = () => {
  const [data, setData] = useState([]);
  const [itemselected, setItemselected] = useState({});
  const [databank, setDatabank] = useState([]);
  const [checkeded, setCheckeded] = useState(false);
  const [checkededcancel, setCheckededcancel] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.bilitja.com/api/Auth/reports/dfe64807-341f-44f8-9e6a-34c8cc8b3504/1a157116-a01a-4027-ab10-74098ac63815`
        )
        .then((response) => {
          setData(response.data);
        });
    } catch (e) {
      // console.log(e);
    }
  }, []);
  useEffect(() => {
    try {
      axios
        .get(
          `https://api.bilitja.com/api/Auth/reports/dfe64807-341f-44f8-9e6a-34c8cc8b3504/1a157116-a01a-4027-ab10-74098ac63815`
        )
        .then((response) => {
          setDatabank(response.data);
        });
    } catch (e) {
    
    }
  }, []);
  const getitem = (index) => {
  
    setItemselected(data?.reportFlightFrLst[index]);
    // console.log("dataasdas", data?.reportFlightFrLst[index]);

  };
  const handelchange = () => {
    if (!checkeded) {
      setCheckeded(true);
   
    } else {
      setCheckeded(false);
  
    }
  };
  const handelchangecancel = () => {
    if (!checkededcancel) {
      setCheckededcancel(true);
    
    } else {
      setCheckededcancel(false);
  
    }
  };
  const menu = (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Button
          className={style["accordian-button"]}
          style={{ width: 1020, height: 80 }}
        >
          <div className={style["table-header-list"]}>
            <p>ردیف</p>
            <p>اسامی مسافران </p>
            <p> گروه سنی</p>
            <p> شماره بلیط</p>
            <p> قیمت</p>
            <p> شماره ملی </p>
            <p>عملیات</p>
            <p>وضعیت</p>
          </div>
        </Accordion.Button>
        <Accordion.Body className={style["drop-icon"]}>
          {itemselected ? (
            <div className={style["table-body-list"]}>
              <span> {itemselected.airline} </span>
              <span>{itemselected.route}</span>
              <span>{itemselected.flightDate}</span>
              <span>{itemselected.flightNo}</span>
              <span>sdasd</span>
              <span>asdasd</span>
              <span>sadas</span>
              <span>sgsf</span>
            </div>
          ) : (
            "null"
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <input
            type="checkbox"
            onChange={(e) => handelchange(e.target.value)}
          />
          فروش
        </div>

        <div>
          <input
            type="checkbox"
            onChange={(e) => handelchangecancel(e.target.value)}
          />
          کنسل
        </div>
        <div>
          <input type="checkbox" />
          درحال رزرو
        </div>
      </div>
      <div className={style["table-header"]}>
        <p>
          شماره درخواست<p>رفرنس</p>
        </p>
        <p>نام گروه</p>
        <p> تامین کننده</p>
        <p> فروش به</p>
        <p>
          تاریخ رزرو<p>تاریخ ساعت</p>
        </p>
        <p>تاریخ پرواز </p>
        <p>مسیر</p>
        <p>
          ایرلاین<p>شماره پرواز</p>
        </p>
        <p>تعداد مسافر </p>
      </div>
      <div>
        {data?.reportFlightFrLst?.map((item1, index) => (
          <div className={style["table-body"]}>
            <div className={style["table-body-icon"]}>
              {/* <div className={style["icon"]}>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <DownOutlined onClick={() => getitem(index)} />
                </Dropdown>
              </div> */}
              <div className={style["table-body-request"]}>
                <span className={style["table-body-compare"]}>
                  {index?.ticketNo}
                </span>

                <span>
                  {databank.reportEbank
                    ?.filter((x) => item1.reqPnr === x.reqPnr)
                    .map((item) => (
                      <span style={{ background: "#eee" }}>
                        <div key={item.id}>
                          {checkeded == true && item.stat === "پرداخت موفق"
                            ? item.stat
                            : ""}
                        </div>
                      </span>
                    ))}
                </span>
              </div>
            </div>
            <span>qweqw</span>
            <span>qwe</span>
            <span>qweq</span>
            <span>wwq</span>

            <span>{item1?.flightDate}</span>

            <span>{item1?.route}</span>
            <span>
              {item1?.airline}
              {item1?.flightNo}
            </span>
            <span>asdfas</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reports;
