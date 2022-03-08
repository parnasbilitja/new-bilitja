import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Modal, Button } from "antd";
import style from "./Flightlist.module.scss";
import { SearchAction } from "../../../Redux/Searchazhans/SearchAction";
import { moneyFormat } from "../../../Utils/SimpleTasks";
import Loader from "../../../Utils/Loader";
import { getLocationOrigin } from "next/dist/shared/lib/utils";

const Flightlist = () => {
  const [flightlist, setFlightlist] = useState([]);
  const [changevalue, setChangevalue] = useState("");
  const [changevaluepercent, setChangevaluepercent] = useState("");
  const [reservestate, setreservestate] = useState();
  const [valuechangesrv, setValuechangesrv] = useState();
  const [valuechangesrvprice, setValuechangesrvprice] = useState(0);
  const [azhanskndsys, setAzhanskndsys] = useState([]);
  const [data, setData] = useState();
  const [searchbox, setSearchbox] = useState([""]);
  const [list, setList] = useState([]);
  const { searchdatalist } = useSelector((state) => state.searchboxReducer);
  const [change, setChange] = useState({});
  const [param, setParam] = useState("");
  const [url, setUrl] = useState("");
  const [flightchangemony, SetFlightchangemony] = useState();
  const [flightchangemonyall, SetFlightchangemonyall] = useState();
  const [cond, setCond] = useState(false);
  const marcuopersent = parseInt(valuechangesrv);
  const marcupprice = parseInt(valuechangesrvprice);
  const reservestats = parseInt(reservestate);
  const [condurl, setCondurl] = useState(false);
  // console.log("change :", change);
  // console.log("valuechangesrvssss :", valuechangesrv);
  // console.log("valuechangesrvprice :", valuechangesrvprice);
  // console.log("azhanskndsys :", azhanskndsys);
  // console.log("flightchangemony :", flightchangemony);
  // console.log("reserve state :", reservestate);
  console.log(flightlist);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      axios
        .get(
          `https://tpa.ravis.ir/api/BilitAirLines/getRavisKndSysDeclare/1a157116-a01a-4027-ab10-74098ac63815`
        )
        .then((res) => {
          setFlightlist(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getid = (item) => {
    list.push(item);
    setAzhanskndsys(item.kndsys);
    setValuechangesrv((item.markupPercent = parseInt(changevaluepercent)));
    setValuechangesrvprice((item.markupPrice = parseInt(changevalue)));
    setreservestate(item.reserveStat);
  };

  const getiditem = (item) => {
    console.log("getiditem :", getiditem);
    alert("ثبت شد");
    setAzhanskndsys(item.kndsys);
    setValuechangesrv((item.markupPercent = parseInt(changevaluepercent)));
    setValuechangesrvprice((item.markupPrice = parseInt(changevalue)));
    setreservestate(item.reserveStat);
  };
  const changesrvitem = (url) => {
    setUrl(url);
    setCondurl((prev) => !prev);
  };
  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CustomerId: "1a157116-a01a-4027-ab10-74098ac63815",
        KndSys: azhanskndsys,
        reservestat: reservestats,
        markupPercent: marcuopersent,
        markupPrice: marcupprice,
        UserIdSabt: "",
      }),
    })
      .then((res) => res.json())
      .then((res) => SetFlightchangemony(res));
  }, [condurl]);

  useEffect(() => {
    if (!searchbox) {
      dispatch(SearchAction());
    } else {
      const searchtemp = flightlist.filter((item) =>
        item?.flightlist?.azhansNam
          .toLowerCase()
          .includes(searchbox.toLowerCase())
      );
      setData(searchtemp);
      console.log("searchdata", searchdatalist);
      dispatch(SearchAction(data));
    }
  }, [searchbox]);

  const changesrv = (param) => {
    setParam(param);
    setCond((prev) => !prev);
  };

  useEffect(() => {
    for (let i = 0; i < list.length; i++) {
      console.log("list i", list[i]);
      let item = {
        CustomerId: "1a157116-a01a-4027-ab10-74098ac63815",
        KndSys: list[i].kndsys,
        reservestat: list[i].reserveStat,
        markupPercent: list[i].markupPercent,
        markupPrice: list[i].markupPrice,
        UserIdSabt: "",
      };
      fetch(param, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((res) => console.log("resssss :", res))
        .then((res) => SetFlightchangemonyall(res));
    }
  }, [cond]);

  return (
    <div>
      <div>
        <div className={style["azhans-border"]}>
          <div className={style["azhans-border-header"]}>
            <span> وضعیت</span>{" "}
            <span>
              تامین کننده
              <div className={style["azhans"]}>
                <input
                  type="text"
                  placeholder="آژانس ..."
                  value={searchbox}
                  onChange={(e) => setSearchbox(e.target.value)}
                />
              </div>
            </span>
            <span>روکشی(درصد)</span>
            <span>روکشی(واحد)</span>
            <span className={style["buy-button-all"]}>
              <button
                onClick={() =>
                  changesrv(
                    "https://tpa.ravis.ir/api/BilitAirLines/SetRaviskndSysDeclare"
                  )
                }
              >
                تایید
              </button>
            </span>
          </div>

          {flightlist?.map((item, index) => (
            <div key={index}>
              <span className={style["azhabs-list-mobile"]}>
                {item?.azhansNam == searchbox ? (
                  <div className={style["azhans-list"]}>
                    <span>{item?.azhansNam}</span>
                    <span>
                      <input
                        type="number"
                        min="-100"
                        max="100"
                        placeholder={moneyFormat(item.markupPercent)}
                        onChange={(e) => setChangevaluepercent(e.target.value)}
                      />
                    </span>
                    <span style={{ marginRight: 5 }}>
                      <input
                        type="number"
                        placeholder={moneyFormat(item.markupPrice)}
                        onChange={(e) => setChangevalue(e.target.value)}
                      />
                    </span>
                    <span>
                      <input type="checkbox" onClick={() => getid(item)} />
                    </span>
                    <span className={style["buy-button"]}>
                      <button
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => {
                          getiditem(item);
                          changesrvitem(
                            "https://tpa.ravis.ir/api/BilitAirLines/SetRaviskndSysDeclare"
                          );
                        }}
                      >
                        تایید
                      </button>
                    </span>
                  </div>
                ) : (
                  searchdatalist || (
                    <div className={style["azhans-list"]}>
                      <input type="checkbox" onClick={() => getid(item)} />
                      <span>{item.azhansNam}</span>
                      <span>
                        <input
                          type="number"
                          min="-100"
                          max="100"
                          placeholder={moneyFormat(item.markupPercent)}
                          onChange={(e) =>
                            setChangevaluepercent(e.target.value)
                          }
                        />
                      </span>
                      <span style={{ marginRight: 5 }}>
                        <input
                          type="number"
                          placeholder={moneyFormat(item.markupPrice)}
                          onChange={(e) => setChangevalue(e.target.value)}
                        />
                      </span>
                      <span className={style["buy-button"]}>
                        <button
                          onClick={() => {
                            getiditem(item);
                            changesrvitem(
                              "https://tpa.ravis.ir/api/BilitAirLines/SetRaviskndSysDeclare"
                            );
                          }}
                        >
                          تایید
                        </button>
                      </span>
                    </div>
                  )
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Flightlist;
