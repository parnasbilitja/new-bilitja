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
