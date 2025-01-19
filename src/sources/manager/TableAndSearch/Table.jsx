import React, { useEffect, useState } from "react";
import Row from "./Row";
import { Loader } from "../../../Utils/Loader";
import useTable from "./UseTable";
import TableFooter from "./TableFooter";
import Search from "./Search";
import { moneyFormatrial } from "../../../Utils/SimpleTasks";
import PricesRow from "./PricesRow";
import NewLoader from "../../../Components/NewTours/Components/subComponents/NewLoader";
import {useRouter} from "next/router";
const Table = ({
  list2,
  setOpenInfo,
  setReqPnr,
  setReqNo,
  header,
  Transaction,
  reserving,
}) => {
  const [searchBar, setSearchBar] = useState("");
  const [perPage, setPerPage] = useState(5);
  let data = list2.length > 1 && {
    ...list2.filter((item) =>
      item["reqPnr"].toLowerCase().includes(searchBar.toLowerCase())
    ),
  };
  const[paymentstat,setPaymentstats] = useState('پرداخت ناموفق');
  const [page, setPage] = useState(1);
  const [inputNum, setInputNum] = useState(1);
  let len = data.length;
  const {
    slice,
    range,
    foroshAll,
    buyAll,
    Profit,
    foroshAll2,
    buyAll2,
    Profit2,
  } = useTable(list2, page, perPage, searchBar);

  const[newdata,setNewData] = useState([]);
  useEffect(()=>{
    if(router.asPath.includes('transaction') ){
      
      if(slice.length > 0){
        let newdata=slice?.filter((item) => item.stat===paymentstat)
        setNewData(newdata)
      }
    }else {
      setNewData(slice)
    }

  },[paymentstat,slice])
  const router =useRouter()

  return (
    <>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-md-3" >
          <Search searchBar={searchBar} setSearchBar={setSearchBar} />
          {
              router.asPath.includes('transaction') &&
              <select style={{height:'45px',border:'1px solid #cecece',borderRadius:'10px',marginTop:'5px',fontSize:'14px'}} name="" id="" defaultValue={paymentstat} onChange={e => setPaymentstats(e.target.value)}>
                <option value="پرداخت موفق">پرداخت موفق</option>
                <option value="پرداخت ناموفق">پرداخت ناموفق</option>
              </select>
          }

        </div>
        <div className="col-12 col-md-9">
          {/*<div className="row justify-content-md-end justify-content-center">*/}
          {/*  <div*/}
          {/*      className="col-10 my-1 col-md-3 mx-2 text-white p-2 rounded"*/}
          {/*      style={{*/}
          {/*      backgroundColor: "#090026",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    کل فروش :{moneyFormatrial(foroshAll2)}*/}
          {/*  </div>*/}
          {/*  {isNaN(buyAll2) == false && (*/}
          {/*    <div*/}
          {/*      className="col-10 my-1 col-md-3 mx-2 text-white p-2 rounded"*/}
          {/*      style={{*/}
          {/*        backgroundColor: "#090026",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      کل خرید:{moneyFormatrial(buyAll2)}*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*  {isNaN(Profit2) == false && (*/}
          {/*    <div*/}
          {/*      className="col-10 my-1 col-md-3 mx-2 text-white p-2 rounded"*/}
          {/*      style={{*/}
          {/*        backgroundColor: "#090026",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      کل سود:{moneyFormatrial(Profit2)}*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="controller-table mt-3 scroller" style={{scrollbarWidth: '90px'}}>
        <div className="thead d-flex align-items-center">
          {header.map((item, i) => (
            <div className={`head flex-${item.flex} m-flex-${item.mFlex}`}>
              <span className="font-size-14 font-bold-iransanse">
                {item.title}
              </span>
            </div>
          ))}
        </div>
        <div className="data-detail">
          {newdata ? (
            <>
              {newdata.map((item, index) => (
                <div
                  onDoubleClick={() => {
                    setOpenInfo(true);
                    setReqNo(item.reqNo);
                    setReqPnr(item.reqPnr);
                  }}
                >
                  <Row
                    header={header}
                    item={item}
                    setOpenInfo={setOpenInfo}
                    setReqNo={setReqNo}
                    setReqPnr={setReqPnr}
                    index={index}
                  />
                </div>
              ))}
              <PricesRow
                reserving={reserving}
                Transaction={Transaction}
                foroshAll={foroshAll}
                buyAll={buyAll}
                Profit={Profit}
              />
            </>
          ) : (
            <NewLoader />
          )}
        </div>
      </div>
      <div className="d-flex row justify-content-center">
        <div className="col-12 col-md-2">
          تعداد ایتم نمایشی:
          <select
            className="border rounded mx-2"
            onChange={(e) => setPerPage(e.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
          </select>
        </div>
        <div className="col-12 col-md-7 px-4">
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </div>

        {/* <div className="col-md-3 d-flex" style={{ alignSelf: "center" }}>
          <p className="col-md-3 m-0" >
            برو به :
          </p>
          <input
            className="col-md-2"
            type="number"
            onChange={(e) => setInputNum(e.target.value)}
          />

          <button
            className="col-md-3 m-0"

            onClick={() => {
              setPage(inputNum);

            }}
          >
            برو
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Table;
