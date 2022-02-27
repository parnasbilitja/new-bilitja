import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import { Modal, Button } from "antd";
import style from "./Flightlist.module.scss";

const Flightlist = () => {
  const [flightlist, setFlightlist] = useState([]);
  const [changevalue, setChangevalue] = useState([]);
  const [azhansid, setAzhansid] = useState(false);
  const [valuechangesrv, setValuechangesrv] = useState([]);
  const [valuechangesrvprice, setValuechangesrvprice] = useState([]);
  const [checkedallbox, setCheckedall] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [azhanskndsys, setAzhanskndsys] = useState([]);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  console.log(" azhanskndsys :", azhanskndsys);
  useEffect(() => {
    try {
      axios
        .get(
          `https://tpa.ravis.ir/api/BilitAirLines/getRavisKndSysDeclare/1a157116-a01a-4027-ab10-74098ac63815`
        )
        .then((res) => {
          console.log("response", res);
          setFlightlist(res.data);
          console.log("flight list :", flightlist);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(url).then((res) => {
        console.log("res", res);
        setData(res.data);
        console.log("data list :", data);
      });
    } catch (e) {
      console.log(e);
    }
  }, [url]);

  const percentmony = () => {
    setChecked(!checked);
  };

  const search = (url) => {
    setUrl(url);
  };
  const getid = (item) => {
    setAzhanskndsys(item.kndsys);
    if (checked === true) {
      setValuechangesrv((item.srv = parseInt(changevalue)));
    } else if (checked === false) {
      setValuechangesrvprice((item.srvPrice = parseInt(changevalue)));
    }
  };
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };
  return (
    <div>
      {/* <Modal
        title="تغییر قیمت"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <p style={{ fontSize: 18 }}>آیا میخواهید تغییرات اعمال شود</p>
        <div className={style["button-modal"]}>
          <button onClick={handleCancel}>کنسل</button>

          <button
            onClick={() =>
              search("https://tpa.ravis.ir/api/BilitAirLines/GetAzhansList")
            }
          >
            تایید
          </button>
        </div>
      </Modal> */}
      <div>
        <div className={style["azhans"]}>
          <span className={style["search-box"]}>
            <button>تغییر قیمت</button>
          </span>
          <span>
            <input
              type="number"
              placeholder="تغییر قیمت ..."
              value={changevalue}
              onChange={(e) => setChangevalue(e.target.value)}
            />
            <p style={{ marginRight: 144, marginTop: -25 }}>
              <i class="fa-solid fa-dollar-sign"></i>
            </p>
          </span>
          <span>
            <input
              className={style["azhans-checkbox"]}
              type="checkbox"
              value={checked}
              onChange={percentmony}
            />
            <p style={{ marginRight: 26, marginTop: -33 }}>
              {" "}
              <i class="fas fa-solid fa-percent"></i>
            </p>
          </span>
        </div>
        {flightlist.map((item, index) => (
          <div className={style["azhans-list"]} key={index}>
            <input type="checkbox" onClick={() => getid(item)} />
            <span>{item.azhansNam}</span>
            <span> {item.srv} %</span>
            <span> {item.srvPrice} $</span>
            <span>{azhansid === true ? changevalue : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Flightlist;
