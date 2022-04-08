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
import { FilterFields } from "./Filter.jsx";
import { useSelector, useDispatch } from "react-redux";
import DesktopInfoSell from "./DesktopInfoSell";
import TopFilter from "./TopFilter";
import { moneyFormat } from "../../../../Utils/SimpleTasks";
import {
  _filterSellReport,
  _getSellReport,
} from "../../../../Redux/Reports/reports.action";

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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "مشتری",
  },
  {
    id: "calories",
    numeric: false,
    disablePadding: true,
    label: "درخواست",
  },
  {
    id: "fat",
    numeric: false,
    disablePadding: true,
    label: "رفرنس",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: true,
    label: "تایخ فروش",
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
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "تاریخ پرواز",
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
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "کاربر",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "سرویس",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "PNR سرویس",
  },
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
          >
            <p className={style["title-table"]}>ردیف</p>
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              style={{ background: "#279692", color: "#fff", fontWeight: 600 }}
              key={headCell.id}
              align="center"
              padding="none"
            >
              <p className={style["title-table"]}>{headCell.label}</p>
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

  return (
    <div className="container pt-2 pb-2 pe-2 ps-2">
      <div className={style["header-title"]}>گزارشات فروش پرواز</div>
      <TopFilter />
      <Box>
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
                          <h6 className="font-size-14 ">{i++}</h6>
                        </TableCell>
                        <TableCell
                          className={style["tablerowfont"]}
                          align="center"
                        >
                          <h6 className="font-size-16">{row.customerName}</h6>
                        </TableCell>
                        <TableCell
                          className={style["tablerowfont"]}
                          align="center"
                        >
                          <h6 className="font-size-16">{row.reqNo}</h6>
                        </TableCell>
                        <TableCell
                          className={style["tablerowfont"]}
                          align="center"
                        >
                          <h6 className="font-size-16">{row.reqPnr}</h6>
                        </TableCell>
                        <TableCell
                          className={style["tablerowfont"]}
                          align="center"
                        >
                          <h6 className="font-size-16">{row.dateTimeSabt}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-15">{row.nameFamilyEn}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.numFr}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.mobileNo}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.route}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.flightNo}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.flightDate}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.airline}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.className}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.kndSysName}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">
                            {moneyFormat(row.feeGetKh)}
                          </h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">
                            {moneyFormat(row.feeGet)}
                          </h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">
                            {moneyFormat(row.stock)}
                          </h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.userFr}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.serviceName}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.servicePnr}</h6>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={style["tablerowfont"]}
                        >
                          <h6 className="font-size-16">{row.pathKind}</h6>
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
                  <TableCell align="center">
                    <h6 className="font-size-14"></h6>
                  </TableCell>
                  <TableCell className={style["tablerowfont"]} align="center">
                    <h6 className="font-size-14">
                      {moneyFormat(prices.kharidAll)} ریال
                    </h6>
                  </TableCell>
                  <TableCell className={style["tablerowfont"]} align="center">
                    <h6 className="font-size-14">
                      {moneyFormat(prices.foroshAll)} ریال
                    </h6>
                  </TableCell>
                  <TableCell className={style["tablerowfont"]} align="center">
                    <h6 className="font-size-14">
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
          <div
            className="d-flex justify-content-start pe-1 ps-1 font-size-16"
            dir="ltr"
          >
            <TablePagination
              style={{
                fontSize: 20,
                textAlign: "center",
                fontFamily: "BYekan",
              }}
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
              labelRowsPerPage="آیتم نمایشی هر صفحه:"
            />
          </div>
        </Paper>
      </Box>

      {openInfo ? (
        <DesktopInfoSell
          open={openInfo}
          close={() => setOpenInfo(false)}
          reqNo={reqNo}
          reqPnr={reqPnr}
        />
      ) : null}
    </div>
  );
};

export default FlightSellReport;
