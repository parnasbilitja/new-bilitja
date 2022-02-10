import { withRouter } from "next/router";
import { useState, useEffect } from "react";
import globals from "../../Global";
import { moneyFormat, getweekday } from "../../../Utils/SimpleTasks";
import Airports from "../../base/Airports.component";
import style1 from "./Wallet.module.scss";
import axios from "axios";
const WalletBalanc = () => {
  const [post, setPost] = useState({});
  const [param, setParam] = useState("");
  const [cond, setCond] = useState(false);
  const [agency, setAgency] = useState([]);
  const [flightlist, setFlightlist] = useState();
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  console.log(post);
  const search = (param) => {
    setParam(param);
    setCond((prev) => !prev);
  };
  useEffect(() => {
    fetch(param, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: post.start,
        dest: post.Destination,
        stDate: post.date,
        withFilters: false,
      }),
    })
      .then((res) => res.json())
      .then((res) => setFlightlist(res));

    console.log("flightlist: ", flightlist);
  }, [cond]);

  useEffect(() => {
    try {
      axios.get(url).then((res) => {
        console.log(res);
        setAgency(res.data);
        console.log("agency :", agency);
      });
    } catch (e) {
      console.log(e);
    }
  }, [url]);

  const searchdatakndsys = (url) => {
    setUrl(url);
  };
  return (
    <div>
      <div className={style1["search-box"]}>
        <div>
          <input
            type="text"
            placeholder="مبدا را وارد کنید "
            value={post.start}
            onChange={(e) => setPost({ ...post, start: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="مقصد را وارد کنید "
            value={post.Destination}
            onChange={(e) => setPost({ ...post, Destination: e.target.value })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="تاریخ را وارد کنید "
            value={post.date}
            onChange={(e) => setPost({ ...post, date: e.target.value })}
          />
        </div>

        <button
          onClick={() =>
            search("https://tpa.ravis.ir/api/BilitAirLines/GetFlights")
          }
        >
          جستجو
        </button>
        <button
          onClick={() =>
            searchdatakndsys(
              "https://tpa.ravis.ir/api/BilitAirLines/GetAzhansList"
            )
          }
        >
          جستجوآژانس
        </button>
      </div>

      <div>
        <input
          style={{
            margin: "5px 860px",
            border: "1px solid",
            borderRadius: 5,
            height: 33,
          }}
          type="number"
          onChange={(e) => setInput(e.target.value)}
          placeholder="عدد را وارد کنید "
        />
        {flightlist?.map((item1, index) => (
          <div key={index} className={style1["flight-list-one-row"]}>
            <div className={style1["one-row-price"]}>
              <div>
                <span style1={{ fontWeight: 900 }} className="font-size-20">
                  {moneyFormat(item1?.priceView)}
                </span>
                <span style1={{ color: "blue" }} className=" font-size-14 p-1">
                  تومان
                </span>
              </div>
            </div>
            <div className={style1["one-row-detail"]}>
              <div>
                <span className="color-secondary font-bold-iransanse">
                  {item1.source}
                </span>
                <span>به</span>
                <span className="color-secondary font-bold-iransanse">
                  {item1.destinate}
                </span>
              </div>
              <div className="p-1">
                <span>ش.پرواز : {item1.flightNo}</span>
              </div>
              <div>
                <span>{item1.kndSys}</span>
              </div>
            </div>
            <div className={style1["one-row-provider"]}>
              <img
                className={style1["img-airplan"]}
                src={
                  globals.website +
                  `Airlines/${item1.airlineIataCode}.png?ver=1`
                }
                alt="بلیطجا - لوگو ایرلاین"
              />
              <p>{item1.airline}</p>
            </div>
            <div className={style1["one-row-date"]}>
              <div> {getweekday(item1.flightDay)}</div>
              <div style={{ marginTop: 8 }}>
                <div>{item1.flightDate}</div>
                <div dir="ltr">{item1.flightDateM}</div>
              </div>
            </div>
            <div className={style1["one-row-time"]}>
              <div>
                <i className="kilo-font icon-clock"></i>
              </div>
              <span className="font-size-18">
                {String(item1.flightDateTime).split("T")[1].slice(0, 5)}
              </span>
            </div>
            <div className={style1["one-row-cap"]}>
              <div>
                <i className="kilo-font icon-seat"></i>
              </div>
              <span className="font-size-18">{item1.cap + " صندلی خالی"}</span>
            </div>
            <div className={style1["one-row-cap"]}>
              {agency.map((item) => (
                <div>{item.kndsys === item1.kndSys ? item.azhansNam : ""}</div>
              ))}

              <div
                style={{ marginTop: 15, background: "#eee", borderRadius: 5 }}
              >
                {input === ""
                  ? ""
                  : item1?.priceView * 0.1 * input + item1?.priceView}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(WalletBalanc);
