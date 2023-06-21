import { withRouter, useRouter } from "next/router";
import { useState, useEffect } from "react";
import { moneyFormat, getweekday } from "../../../../Utils/SimpleTasks";
import axios from "axios";
import style1 from "./Dashboard.module.scss";
import { useSelector } from "react-redux";
import Airports from "../../../../sources/base/Airports.component";
import PopUpWide from "../../../../sources/component/PopUpWide.component";
import globals from "../../../../sources/Global";
import CalendarComponent from "../../../../sources/calendar/Calendar.component";

const Dashboard = () => {
  const [post, setPost] = useState({});
  const [datelist, setDatelist] = useState({});
  const [valuechange, setValuechange] = useState([]);
  const [changemony, setChangemony] = useState([]);
  const [itemselected, setItemselected] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sugest, setSugest] = useState(false);
  const [sugestdest, setSugestdest] = useState(false);
  const [iditems, setIditems] = useState({});
  const [open, setOpen] = useState(false);
  const [param, setParam] = useState("");
  const [cond, setCond] = useState(false);
  const [agency, setAgency] = useState([]);
  const [flightlist, setFlightlist] = useState();
  const { searchObject } = useSelector((state) => state.search);
  const mayRouter = useRouter();
  const mony = parseInt(changemony);
  const monyselect = parseInt(itemselected);
  console.log("flight list :", flightlist);
  //////////////
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
        source: searchObject.source,
        dest: searchObject.dest,
        stDate: setDatelist.flightDatePersian,
        withFilters: false,
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
      }),
    })
      .then((res) => res.json())
      .then((res) => setFlightlist(res));

    console.log("flightlist: ", flightlist);
  }, [cond]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://tpa.ravis.ir/api/BilitAirLines/getRavisKndSysDeclare/1a157116-a01a-4027-ab10-74098ac63815`
        )
        .then((res) => {
          console.log(res);
          setAgency(res.data);
          console.log("agency :", agency);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const managestart = (value) => {
    setSugest(value);
  };
  const managedest = (value) => {
    setSugestdest(value);
  };
  const managedate = (value) => {
    setOpen(value);
  };
  const handlecick = (index) => {
    console.log("e :", index);
    setIditems(index);
    console.log("id items :", iditems);
  };

  const getitem = (item1) => {
    console.log("index : ", item1);
    setItemselected(item1);
    if (itemselected && checked === true) {
      setValuechange(moneyFormat(item1 * 0.01 * changemony + item1));
    } else if (itemselected && checked === false) {
      setValuechange(moneyFormat(item1 + mony));
    }
  };

  return (
    <div>
      <div className={style1["search-box"]}>
        <div>
          <input
            type="text"
            onFocus={(e) => managestart(true) || managedest(false)}
            placeholder="مبدا را وارد کنید "
            value={searchObject.sourceName}
            onChange={(e) => setPost({ ...post, start: e.target.value })}
          />
          {sugest ? (
            <div onClick={() => handlecick()}>
              <Airports
                credenrialType="source"
                closeSuggest={managestart}
                searchTerm={""}
              />
            </div>
          ) : null}
        </div>

        <div>
          <input
            type="text"
            onFocus={(e) => managestart(false) || managedest(true)}
            placeholder="مقصد را وارد کنید "
            value={searchObject.destinationName}
            onChange={(e) => setPost({ ...post, Destination: e.target.value })}
            required
          />
          {sugestdest ? (
            <Airports
              credenrialType="destination"
              closeSuggest={managedest}
              searchTerm={""}
            />
          ) : null}
        </div>
        <div>
          <input
            required
            type="text"
            placeholder="تاریخ را وارد کنید "
            value={
              setDatelist.typeOfCalendar == "GAR"
                ? searchObject
                : setDatelist.flightDatePersian
            }
            onFocus={(e) =>
              managestart(false) || managedest(false) || managedate(true)
            }
            onChange={(e) => setDatelist({ ...datelist, date: e.target.value })}
          />
          {open ? (
            <PopUpWide opened={open} closePopUp={managedate}>
              <div>
                <CalendarComponent
                  setDate={(value) => {
                    setDatelist.gar = value.garigorian;
                    setDatelist.flightDatePersian = value.jalali;
                    setDatelist.typeOfCalendar = value.typeOfCalendar;
                  }}
                  closePopUpCalendar={managedate}
                />
              </div>
            </PopUpWide>
          ) : null}
        </div>

        <button
          onClick={() =>
            search("https://tpa.ravis.ir/api/BilitAirLines/GetFlights")
          }
        >
          جستجو
        </button>
      </div>

      <div className={style1["search-boxs"]}></div>

      <div>
        {flightlist?.map((item1, index) => (
          <div key={index} className={style1["flight-list-one-row"]}>
            <div className={style1["one-row-price"]}>
              <span style1={{ fontWeight: 900 }} className="font-size-20">
                {moneyFormat(item1.priceView)}
                <span style1={{ color: "blue" }} className=" font-size-14 p-1">
                  تومان
                </span>
              </span>
              <div></div>
            </div>
            <div className={style1["one-row-detail"]}>
              <div className={style1["one-row-detail-div"]}>
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
                <i className="bilitja icon-clock"></i>
              </div>
              <span className="font-size-18">
                {String(item1.flightDateTime).split("T")[1].slice(0, 5)}
              </span>
            </div>
            <div className={style1["one-row-cap"]}>
              <div>
                <i className="bilitja icon-seat"></i>
              </div>
              <span className="font-size-18">{item1.cap + " صندلی خالی"}</span>
            </div>
            <div style={{ fontSize: 18 }} className={style1["one-row-cap"]}>
              {agency.map((item) => (
                <div>
                  <span style={{ fontSize: 18, color: "red", fontWeight: 600 }}>
                    {item.kndsys !== item1.kndSys ? null : item.azhansNam}
                  </span>
                  <div
                    style={{ color: "#279692", fontWeight: 600, fontSize: 20 }}
                  >
                    {item.kndsys !== item1.kndSys ? null : (
                      <div>
                        <span
                          style={{
                            fontSize: 18,
                            color: "#279692",
                            fontWeight: 500,
                          }}
                        >
                          {moneyFormat(
                            item.markupPrice +
                              ((item.markupPercent * item1.priceView) / 100 +
                                item1.priceView)
                          )}
                          تومان
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
