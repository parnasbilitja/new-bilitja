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
import TableCustom from "../../TableAndSearch/Table";
import { moneyFormat } from "../../../../Utils/SimpleTasks";
import {
  _filterSellReport,
  _getSellReport,
} from "../../../../Redux/Reports/reports.action";
import router from "next/router";
import Link from "next/link";
import { Loader } from "../../../../Utils/Loader";
import Tabs from "../../TableAndSearch/Tabs";

function createData({
  customerName,
  reqNo,
  reqPnr,
  nameFamilyEn,
  numFr,
  mobileNo,
  route,
  flightDate,
  flightNo,
  airline,
  className,
  kndSysName,
  feeGet,
  feeGetKh,
  stock,
  serviceName,
  servicePnr,
  userFr,
  pathKind,
  dateTimeSabt,
}) {
  return {
    customerName,
    reqNo,
    reqPnr,
    nameFamilyEn,
    numFr,
    mobileNo,
    route,
    flightDate,
    flightNo,
    airline,
    className,
    kndSysName,
    feeGet,
    feeGetKh,
    stock,
    serviceName,
    servicePnr,
    userFr,
    pathKind,
    dateTimeSabt,
  };
}

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
  console.log(response);
  return response;

};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const getRows = async () => {
  const list = await fetchedList();
  const array = list.data.map((option) =>
    createData({
      customerName: option.customerName,
      reqNo: option.reqNo,
      reqPnr: option.reqPnr,
      nameFamilyEn: option.nameFamilyEn,
      numFr: option.numFr,
      mobileNo: option.mobileNo,
      route: option.route,
      flightDate: option.flightDate,
      flightNo: option.flightNo,
      airline: option.airline,
      className: option.className,
      kndSysName: option.kndSysName,
      feeGet: option.feeGet,
      feeGetKh: option.feeGetKh,
      stock: option.stock,
      serviceName: option.serviceName,
      servicePnr: option.servicePnr,
      userFr: option.userFr,
      pathKind: option.pathKind,
      dateTimeSabt: option.dateTimeSabt,
    })
  );
  return array;
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "fat",
    numeric: false,
    disablePadding: true,
    label: "رفرنس",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: true,
    label: "درخواست",
  },
  {
    id: "protein",
    numeric: false,
    disablePadding: true,
    label: "نام سرپرست",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: true,
    label: "تعداد",
  },

  {
    id: "carbs",
    numeric: false,
    disablePadding: true,
    label: "تاریخ فروش",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "تاریخ پرواز",
  },
  // {
  //   id: "name",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "فروشنده",
  // },
  {
    id: "mobile",
    numeric: true,
    disablePadding: true,
    label: "موبایل",
  },
  {
    id: "path",
    numeric: false,
    disablePadding: true,
    label: "مسیر",
  },
  {
    id: "reqNo",
    numeric: true,
    disablePadding: true,
    label: "شماره پرواز",
  },
  {
    id: "airline",
    numeric: false,
    disablePadding: true,
    label: "ایرلاین",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "کلاس",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "خرید از",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "فروش",
  },
  {
    id: "flightDate",
    numeric: true,
    disablePadding: true,
    label: "خرید",
  },
  {
    id: "flightDate",
    numeric: true,
    disablePadding: true,
    label: "سود",
  },
  // {
  //   id: "flightDate",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "کاربر",
  // },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "سرویس",
  },
  // {
  //   id: "flightDate",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "PNR سرویس",
  // },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "نوع مسیر",
  },
];

const EnhancedTableHead = (props) => {
  const { all_sell_report } = useSelector((state) => state.reports);

  const dispatch = useDispatch();

  const handleChnage = (e) => {
    const { name, value } = e.target;
    const allData = all_sell_report != null ? [...all_sell_report] : [];
    const finded = allData.filter((res) =>
      res[name]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase())
    );
    dispatch(_filterSellReport(finded));
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell
            align="center"
            style={{ background: "#279692", color: "#fff", fontWeight: 600 }}
            sx={{ width: 10 }}
            padding="0.5"
          >
            <p className={style["title-table"]}>ردیف</p>
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              style={{ background: "#279692", color: "#fff", fontWeight: 600 }}
              key={headCell.id}
              align="center"
              padding="none"
              sx={{ width: 100 }}
            >
              <p className={style["title-table"]} >{headCell.label}</p>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableHead>
        <TableRow>
          <TableCell align="center"></TableCell>
          {FilterFields.map((option, index) => (
            <TableCell
              key={index}
              align="center"
              padding="none"
              sx={{ width: 25 }}
              className="pt-1 pb-1 me-1"
            >
              <div className="me-1">
                <input
                  className={style["input"]}
                  name={option.name}
                  placeholder="جستجو..."
                  defaultValue=""
                  onChange={handleChnage}
                />
              </div>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const FlightSellReport = () => {
  let i = 1;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [reqNo, setReqNo] = React.useState("");
  const [reqPnr, setReqPnr] = React.useState("");
  const [prices, setPrices] = React.useState({
    kharidAll: 0,
    foroshAll: 0,
    soodAll: 0,
  });

  const dispatch = useDispatch();

  const flights = useSelector((state) => state.reports);

  const managePrice = () => {
    const allData =
      flights.filter_sell_report != null ? [...flights.filter_sell_report] : [];
    const prices = allData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((option) => {
        return {
          kharid: option.feeGet,
          frosh: option.feeGetKh,
          sood: option.stock,
        };
      });
    let kharidAll = 0;
    let foroshAll = 0;
    let soodAll = 0;

    for (let i = 0; i < prices.length; i++) {
      kharidAll += prices[i].kharid;
      foroshAll += prices[i].frosh;
      soodAll += prices[i].sood;
    }
    return {
      kharidAll,
      foroshAll,
      soodAll,
    };
  };

  const fethed = async () => {
    const response = await getRows();
    await dispatch(_getSellReport(response));
    await dispatch(_filterSellReport(response));
  };

  React.useEffect(() => {
    fethed();
  }, []);

  React.useEffect(() => {
    const pricesSum = managePrice();
    setPrices(pricesSum);
  }, [rowsPerPage, flights.all_sell_report, flights.filter_sell_report]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  let foroshAll = 0;
  const [list,setList] = React.useState([])
  React.useEffect(()=>{
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
      flex: 7,
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
      :<Loader/>}
        {/*<TopFilter />*/}
        {/* <Box>
          <Paper>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size="small"
                sx={{ width: 480 ,display:'grid'}}
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
                            <h6 className={'fontEn'}>
                              {row.reqPnr}
                              </h6>
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
                            <h6 className={style['en-font']}>{row.nameFamilyEn}</h6>
                          </TableCell>
                          <TableCell
                            className={style["tablerowfont"]}
                            align="center"
                          >
                            <h6 className={style['normal-size']}>{row.numFr}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['date']}>
                              <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M19,2h-1V1c0-.552-.447-1-1-1s-1,.448-1,1v1H8V1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5ZM5,4h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3V10H22v9c0,1.654-1.346,3-3,3Zm0-8c0,.552-.447,1-1,1H6c-.553,0-1-.448-1-1s.447-1,1-1h12c.553,0,1,.448,1,1Zm-7,4c0,.552-.447,1-1,1H6c-.553,0-1-.448-1-1s.447-1,1-1h5c.553,0,1,.448,1,1Z" /></svg>
                              {row.dateTimeSabt}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.flightDate}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.mobileNo}</h6>
                            
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.route}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>
                              {row.flightNo}</h6>
                            
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['airline']}>
                              <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20"><path d="M10.689,24a2.688,2.688,0,0,1-2.546-3.547L10.083,15H6.158l-1.08,1.646A2.993,2.993,0,0,1,2.569,18h0a2.556,2.556,0,0,1-2.4-3.434L1.1,12,.159,9.44A2.555,2.555,0,0,1,.46,7.1a2.811,2.811,0,0,1,4.6.247L6.155,9h3.928L8.147,3.563a2.7,2.7,0,0,1,.359-2.442,2.883,2.883,0,0,1,4.817.442L17.58,9h3.313a3.084,3.084,0,0,1,3.067,2.5A3,3,0,0,1,21,15H17.58l-4.267,7.454A2.989,2.989,0,0,1,10.689,24ZM5.618,13H11.5a1.006,1.006,0,0,1,.942,1.335l-2.41,6.773a.676.676,0,0,0,.1.605.9.9,0,0,0,1.437-.234L16.132,13.5A1,1,0,0,1,17,13h4a1,1,0,0,0,.985-1.175A1.083,1.083,0,0,0,20.893,11H17a1,1,0,0,1-.868-.5L11.577,2.539a.894.894,0,0,0-1.447-.252.684.684,0,0,0-.093.621l2.4,6.757A1.006,1.006,0,0,1,11.5,11H5.618a1,1,0,0,1-.834-.448l-1.393-2.1c-.228-.421-1.034-.637-1.29-.21a.541.541,0,0,0-.065.51l1.072,2.906a1,1,0,0,1,0,.69l-1.066,2.91A.556.556,0,0,0,2.564,16h0a1,1,0,0,0,.837-.452l1.376-2.1A1,1,0,0,1,5.618,13Z" /></svg>

                              {row.airline}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.className}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>

                              {row.kndSysName}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>
                            {moneyFormat(row.feeGet)}
                            </h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>
                              
                              {moneyFormat(row.feeGetKh)}
                            </h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>
                              {moneyFormat(row.stock)}
                            </h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.serviceName}</h6>
                          </TableCell>
                          <TableCell
                            align="center"
                            className={style["tablerowfont"]}
                          >
                            <h6 className={style['normal-size']}>{row.pathKind}</h6>
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
                    <TableCell className={style["tablerowfont"]} align="center">
                      <h6 className={style['normal-size']}>
                        {moneyFormat(prices.kharidAll)} ریال
                      </h6>
                    </TableCell>
                    <TableCell className={style["tablerowfont"]} align="center">
                      <h6 className={style['normal-size']}>
                        {moneyFormat(prices.foroshAll)} ریال
                      </h6>
                    </TableCell>
                    <TableCell className={style["tablerowfont"]} align="center">
                      <h6 className={style['normal-size']}>
                        {moneyFormat(prices.soodAll)} ریال
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
          </Paper>rLoader        </Box> */}

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
