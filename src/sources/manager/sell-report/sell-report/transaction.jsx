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


function createData({
  reqNo,
  reqPnr,
  nameFamily,
  stat,
  mobileNo,
  bankName,
  authority,
  resCode,
  saleOrderId,
  saleReferenceId,
  dateTimeSabt,
  dsc,
  knd,
  amount,

}) {
  return {
    reqNo,
    reqPnr,
    nameFamily,
    stat,
    mobileNo,
    bankName,
    authority,
    resCode,
    saleOrderId,
    saleReferenceId,
    dateTimeSabt,
    dsc,
    knd,
    amount,
  };
}

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
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const getRows = async () => {
  const list = await fetchedList();
  const array = list.data.map((option) =>
    createData({
      reqNo: option.reqNo,
      reqPnr: option.reqPnr,
      nameFamily: option.nameFamily,
      stat: option.stat,
      amount: option.amount,
      mobileNo: option.mobileNo,
      bankName: option.bankName,
      dateTimeSabt: option.dateTimeSabt,
      dsc: option.dsc,
      knd: option.knd,

      authority: option.authority,
      resCode: option.resCode,
      saleOrderId: option.saleOrderId,
      saleReferenceId: option.saleReferenceId,

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
    id: "reqno",
    numeric: true,
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
    id: "protein",
    numeric: false,
    disablePadding: true,
    label: "نام سرپرست",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: true,
    label: "وضعیت",
  },
  {
    id: "path",
    numeric: false,
    disablePadding: true,
    label: "مبلغ",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "بانک",
  },
  {
    id: "mobile",
    numeric: true,
    disablePadding: true,
    label: "موبایل",
  },
  {
    id: "carbs",
    numeric: false,
    disablePadding: true,
    label: "تاریخ ثبت",
  },

  {
    id: "airline",
    numeric: false,
    disablePadding: true,
    label: "شرح",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "نوع",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "authority",
  },
  {
    id: "flightDate",
    numeric: false,
    disablePadding: true,
    label: "resCode",
  },
  {
    id: "flightDate",
    numeric: true,
    disablePadding: true,
    label: "saleOrderId",
  },
  {
    id: "flightDate",
    numeric: true,
    disablePadding: true,
    label: "saleReferenceId",
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
            style={{ background: "green", color: "#fff", fontWeight: 600 }}
          >
            <p className={style["title-table"]}>ردیف</p>
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              style={{ background: "green", color: "#fff", fontWeight: 600 }}
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

const Transaction = () => {
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
    amount: 0,
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
          amount: option.amount,
        };
      });
    let amount = 0;

    for (let i = 0; i < prices.length; i++) {
      amount += prices[i].amount;
    }
    return {
      amount,
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
    <section>
      <div>
        <div class="position-relative">
          <h5 className="mt-0">
            <span class="font-size-13 font-bold-iransanse mx-2">گــزارش تراکــنشها</span>
          </h5>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3 align-items-center w-100 mb-4">
          <div className={style['parent-buttons']}>
            <Link href="/panel/flight-sell-report">
              <button>همه </button>
            </Link>
            <Link href="/panel/Sales-report">
              <button>گزارش فروش</button>
            </Link>
            <Link href="/panel/Consular-report">
              <button>گزارش کنسلی</button>
            </Link>
            <Link href="/panel/reserving">
              <button>در حال رزرو </button>
            </Link>
            <Link href="/panel/transaction">
              <button>تراکنش ها</button>
            </Link>
          </div>
        </div>

        {/*<TopFilter />*/}
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
                            <h6 className={style['normal-size']}>

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
    </section>
  );
};

export default Transaction;
