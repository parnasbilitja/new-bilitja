import * as React from "react";

import DesktopInfoSell from "./DesktopInfoSell";
import TableCustom from "../../TableAndSearch/Table";
import {
  _filterSellReport,
  _getSellReport,
} from "../../../../Redux/Reports/reports.action";
import { Loader } from "../../../../Utils/Loader";
import Tabs from "../../TableAndSearch/Tabs";
import NewLoader from "../../../../Components/NewTours/Components/subComponents/NewLoader";
import {useEffect} from "react";



const fetchedList = async () => {
  const fetched = await fetch("/api/report/getReport", {
    method: "POST",
    body: JSON.stringify({
      customerId: "1a157116-a01a-4027-ab10-74098ac63815",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await fetched.json();
  // console.log(response);
  return response;

};

const FlightSellReport = () => {

  const [openInfo, setOpenInfo] = React.useState(false);
  const [reqNo, setReqNo] = React.useState("");
  const [reqPnr, setReqPnr] = React.useState("");


  const [list,setList] = React.useState([])
  React.useEffect(()=>{
    const getList = async()=>{
      const list = await fetchedList();
      setList(list)

    }
    getList()
  },[])

  useEffect(()=>{
    console.log(list)
  },[list])
  const header = [
    {
      title: 'ردیف',
      name:'num',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'رفرنس/درخواست',
      name:'reqPnr',
      flex: 7,
      mFlex:35,
    },
    // {
    //   title: 'درخواست',
    //   name:'reqNo',
    //   flex: 7,
    //   mFlex:35,
    // },
    {
      title: 'نام سرپرست / موبایل',
      name:'nameFamilyEn',
      flex: 12,
      mFlex:50,
    },
    {
      title: 'تعداد',
      name:'count',
      flex: 7,
      mFlex:35,
    },
    {
      title: 'تاریخ فروش',
      name:'dateTimeSabt',
      flex: 7,
      mFlex:35,
    },
    {
      title: 'تاریخ پرواز',
      name:'flightDate',
      flex: 7,
      mFlex:35,
    },
    // {
    //   title: 'موبایل',
    //   name:'mobileNo',
    //   flex: 7,
    //   mFlex:35,
    // },
    {
      title: 'مسیر',
      name:'route',
      flex: 15,
      mFlex:35,
    },
    // {
    //   title: 'شماره پرواز',
    //   name:'flightNo',
    //   flex: 7,
    //   mFlex:35,
    // },
    {
      title: 'ایرلاین',
      name:'airline',
      flex: 7,
      mFlex:35,
    },
    {
      title: 'کلاس',
      name:'className',
      flex: 7,
      mFlex:35,
    },
    {
      title: 'خرید از / سرویس',
      name:'kndSysName',
      flex: 7,
      mFlex:35,
    },
    {
      title: 'خرید/فروش',
      name:'feeGet',
      flex: 7,
      mFlex:35,
    },
    // {
    //   title: 'خرید',
    //   name:'feeGetKh',
    //   flex: 7,
    //   mFlex:35,
    // },
    {
      title: 'سود',
      name:'Profit',
      flex: 7,
      mFlex:35,
    },
    // {
    //   title: 'سرویس',
    //   name:'serviceName',
    //   flex: 7,
    //   mFlex:35,
    // },
    // {
    //   title: 'نوع مسیر',
    //   name:'pathKind',
    //   flex: 7,
    //   mFlex:25,
    // },

  ]
  return (
    <section>
      <div>
        <div class="position-relative">
          <h6 className="mt-0 font-bold-iransanse">
            گـزارشات  رزرو
          </h6>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
        <Tabs active='Sell' />
        {list.status=='success'?
      <>
        <TableCustom list2={list.data}
        setReqPnr={setReqPnr}
        setReqNo={setReqNo}
        setOpenInfo={setOpenInfo}
        header={header}
         />
      </>
      :<NewLoader/>}

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

export default FlightSellReport;
