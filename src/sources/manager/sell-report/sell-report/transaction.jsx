import * as React from "react";

import DesktopInfoSell from "./DesktopInfoSell";
import { moneyFormat } from "../../../../Utils/SimpleTasks";
import {
  _filterSellReport,
  _getSellReport,
} from "../../../../Redux/Reports/reports.action";
import router from "next/router";
import Link from "next/link";
import { Loader } from "../../../../Utils/Loader";
import { useState } from "react";
import { useEffect } from "react";
import TableCustom from "../../TableAndSearch/Table";
import Tabs from "../../TableAndSearch/Tabs";

const fetchedList = async () => {
  const fetched = await fetch("/api/report/getReportBank", {
    method: "POST",
    body: JSON.stringify({
      customerId: "1a157116-a01a-4027-ab10-74098ac63815",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetched.json();
  // console.log("hello");
  // console.log(response);
  return response;
};
const Transaction = () => {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [reqNo, setReqNo] = React.useState("");
  const [reqPnr, setReqPnr] = React.useState("");
  
  
  const [list,setList] = useState([])
  useEffect(()=>{
    const getList = async()=>{
      const list = await fetchedList();
      setList(list)
    }
    getList()
    // console.log(list);
  },[])
  const header = [
    {
      title: 'ردیف',
      name:'num',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'رفرنس',
      name:'reqPnr',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'درخواست',
      name:'reqNo',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'نام سرپرست',
      name:'nameFamily',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'تعداد',
      name:'count',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'تاریخ فروش',
      name:'dateTimeSabt',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'موبایل',
      name:'mobileNo',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'مبلغ',
      name:'amount',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'درگاه',
      name:'bankName',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'وضعیت',
      name:'stat',
      flex: 12,
      mFlex:25,
    },
    
  ]
  return (
    <section>
      <div>
        <div class="position-relative">
          <h6 className="mt-0 font-bold-iransanse">
            گــزارش تراکــنشها
          </h6>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
        <Tabs active='Transaction' />
        {list.status=='success'?
      <>
        <TableCustom list2={list.data} 
        setOpenInfo={setOpenInfo}
        setReqPnr={setReqPnr}
        setReqNo={setReqNo}
        Transaction={true}
        header={header}
         />
      </>
      :<Loader/>}
       
        {openInfo ? (
          <DesktopInfoSell
            open={openInfo}
            close={() => setOpenInfo(false)}
            reqNo={reqNo}
            reqPnr={reqPnr}
          />
        ) : null}
      </div>
    </section>
  );
};

export default Transaction;
