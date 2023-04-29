import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import style from "./Descktop.module.scss";
import Paper from "@mui/material/Paper";
import salesReport from "./Sales-report"
import { FilterFields } from "./Filter.jsx";
import { useSelector, useDispatch } from "react-redux";
import DesktopInfoSell from "./DesktopInfoSell";
import TopFilter from "./TopFilter";
import { moneyFormat } from "../../../../Utils/SimpleTasks";
import {
  _filterSellReport,
  _getSellReport,
} from "../../../../Redux/Reports/reports.action";
import router from "next/router";
import Link from "next/link";
import TableCustom from '../../TableAndSearch/Table'
import { useState } from "react";
import { useEffect } from "react";
import { Loader } from "../../../../Utils/Loader";
import Tabs from "../../TableAndSearch/Tabs";


const fetchedList = async () => {
  const fetched = await fetch("/api/report/getReportReserve", {
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

const FlightSellReport = () => {
  
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
  },[])
  const header = [
    {
      title: 'ردیف',
      name:'num',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'پیام',
      name:'message',
      flex: 25,
      mFlex:25,
    },
    {
      title: 'رفرنس',
      name:'reqPnr',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'درخواست',
      name:'reqNo',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'نام سرپرست',
      name:'nameFamilyEn',
      flex: 12,
      mFlex:25,
    },
    {
      title: 'تعداد',
      name:'count',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'تاریخ فروش',
      name:'dateTimeSabt',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'تاریخ پرواز',
      name:'flightDate',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'موبایل',
      name:'mobileNo',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'مسیر',
      name:'route',
      flex: 15,
      mFlex:25,
    },
    {
      title: 'شماره پرواز',
      name:'flightNo',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'ایرلاین',
      name:'airline',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'کلاس',
      name:'className',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'خرید از',
      name:'kndSysName',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'فروش',
      name:'feeGet',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'خرید',
      name:'feeGetKh',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'سود',
      name:'Profit',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'سرویس',
      name:'serviceName',
      flex: 7,
      mFlex:25,
    },
    {
      title: 'نوع مسیر',
      name:'pathKind',
      flex: 7,
      mFlex:25,
    },
    
  ]
  
  return (
    <section>
      <div>
        <div class="position-relative">
          <h6 className="mt-0 font-bold-iransanse">
            گـزارشات رزرو
          </h6>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
        <Tabs active='Reserving' />
      {list.status=='success'?
      <>
        <TableCustom list2={list.data} 
        setOpenInfo={setOpenInfo}
        setReqPnr={setReqPnr}
        setReqNo={setReqNo}
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

export default FlightSellReport;
