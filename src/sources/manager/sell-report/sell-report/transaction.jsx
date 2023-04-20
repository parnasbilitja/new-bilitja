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
  console.log("hello");
  console.log(response);
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
    console.log(list);
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
        {/*<TopFilter />*/}
        {/* <Box>
          <Paper>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={
                    flights.filter_sell_report == null
                      ? []
                      : flights.filter_sell_report.length
                  }
                />

                <TableBody>
                  {stableSort(
                    flights.filter_sell_report == null
                      ? []
                      : flights.filter_sell_report,
                    getComparator(order, orderBy)
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                          className={style["tablerow"]}
                          onClick={async () => {
                            await setReqNo(row.reqNo);
                            await setReqPnr(row.reqPnr);
                            setOpenInfo(true);
                          }}
                        >
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['id']}>{i++}</h6>
                          </TableCell>

                          <TableCell
                            className={style["tablerowfont"]}
                            align="center"
                          >
                            <h6 className={style['normal-size']}>

                              {row.reqNo}</h6>
                          </TableCell>

                          <TableCell
                            className={style["tablerowfont"]}
                            align="center"
                          >
                            <h6 className={'fontEn'}>

                              {row.reqPnr}</h6>
                          </TableCell>
                          <TableCell
                            className={style["tablerowfont"]}
                            align="center"
                          >
                            <h6 className={style['en-font']}>{row.nameFamily}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['en-font']}>{row.stat}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>
                              {moneyFormat(row.amount)}
                            </h6>
                          </TableCell>

                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.bankName}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.mobileNo}</h6>
                          </TableCell>

                          <TableCell
                            className={style["tablerowfont"]}
                            align="center"
                          >
                            <h6 className={style['date']}>
                              <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M19,2h-1V1c0-.552-.447-1-1-1s-1,.448-1,1v1H8V1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5ZM5,4h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3V10H22v9c0,1.654-1.346,3-3,3Zm0-8c0,.552-.447,1-1,1H6c-.553,0-1-.448-1-1s.447-1,1-1h12c.553,0,1,.448,1,1Zm-7,4c0,.552-.447,1-1,1H6c-.553,0-1-.448-1-1s.447-1,1-1h5c.553,0,1,.448,1,1Z" /></svg>
                              {row.dateTimeSabt}</h6>
                          </TableCell>

                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.dsc}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>
                              {row.knd}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.authority}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>

                              {row.resCode}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.saleOrderId}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>

                              {row.saleReferenceId}</h6>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow tabIndex={-1} className="bg-muted">
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>

                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell className={style["tablerowfont"]} align="center">
                      <h6 className={style['normal-size']}>
                        {moneyFormat(prices.amount)} ریال
                      </h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>
                    <TableCell align="center">
                      <h6 className="font-size-14"></h6>
                    </TableCell>


                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className={style['style-number-view-item']}
              dir="ltr"
            >
              <TablePagination className={style['child-style-number-view-item']}
                rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                component="div"
                count={
                  flights.filter_sell_report == null
                    ? []
                    : flights.filter_sell_report.length
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="آیتم نمایشی هر صفحه"
              />
            </div>
          </Paper>
        </Box> */}

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
