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
import Paper from "@mui/material/Paper";
import style from "../sell-report/Descktop.module.scss";
import { FilterFields } from "./Filter.jsx";
import { useSelector, useDispatch } from "react-redux";
import { headCells, getRows } from "./data";
import { EndRow } from "./EndRow";
import TopFilter from "./TopFilter";
import { moneyFormat } from "./../../../../Utils/SimpleTasks";
import {
  _filterDetailsSellReport,
  _getDetailsSellReport,
} from "./../../../../Redux/Reports/reports.action";

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

const EnhancedTableHead = (props) => {
  const { all_details_sell_report } = useSelector((state) => state.reports);

  const dispatch = useDispatch();

  const handleChnage = (e) => {
    const { name, value } = e.target;
    const allData =
      all_details_sell_report != null ? [...all_details_sell_report] : [];
    const finded = allData.filter((res) =>
      res[name]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase())
    );
    dispatch(_filterDetailsSellReport(finded));
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell align="center">
            <h6 className="text-dark font-size-12">ردیف</h6>
          </TableCell>
          <TableCell align="center"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="center"
              padding="none"
            // className="pt-1 pb-1"
            >
              <h6 className="text-dark font-size-11">{headCell.label}</h6>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableHead>
        <TableRow>
          <TableCell align="center"></TableCell>
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
                  className="report-sell-flight-field"
                  name={option.name}
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

const AllFlightSellReport = () => {
  let i = 1;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [prices, setPrices] = React.useState({
    kharidAll: 0,
    foroshAll: 0,
    foroshFareAll: 0,
    soodAll: 0,
  });

  const dispatch = useDispatch();

  const flights = useSelector((state) => state.reports);

  const managePrice = () => {
    const allData =
      flights.filter_details_sell_report != null
        ? [...flights.filter_details_sell_report]
        : [];
    const prices = allData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((option) => {
        return {
          kharid: option.ticketPriceKh,
          frosh: option.ticketPrice,
          froshFare: option.ticketPriceFare,
          sood: option.stock,
        };
      });
    let kharidAll = 0;
    let foroshAll = 0;
    let foroshFareAll = 0;
    let soodAll = 0;

    for (let i = 0; i < prices.length; i++) {
      kharidAll += prices[i].kharid;
      foroshAll += prices[i].frosh;
      foroshFareAll += prices[i].frosh;
      soodAll += prices[i].sood;
    }
    return {
      kharidAll,
      foroshAll,
      foroshFareAll,
      soodAll,
    };
  };

  const fethed = async () => {
    const response = await getRows();
    await dispatch(_getDetailsSellReport(response));
    await dispatch(_filterDetailsSellReport(response));
  };

  React.useEffect(() => {
    fethed();
  }, []);

  React.useEffect(() => {
    const pricesSum = managePrice();
    setPrices(pricesSum);
  }, [
    rowsPerPage,
    flights.all_details_sell_report,
    flights.filter_details_sell_report,
  ]);

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
            <span class="font-size-13 font-bold-iransanse mx-2">ریز گــزارشات فـروش پـرواز</span>
          </h5>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
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
                    flights.filter_details_sell_report == null
                      ? []
                      : flights.filter_details_sell_report.length
                  }
                />
                <TableBody>
                  {stableSort(
                    flights.filter_details_sell_report == null
                      ? []
                      : flights.filter_details_sell_report,
                    getComparator(order, orderBy)
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);

                      return (
                        <TableRow
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                          className="cursor-pointer hover-tabel-row"
                        >
                          <TableCell align="center">
                            <h6 className="font-size-11">{i++}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.changeStat}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.customerName}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.reqNo}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.reqPnr}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.dateTimeSabt}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.changeStat}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.reqNoRow}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.nameFamilyEn}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.meliCode}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.ticketName}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.ticketNo}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.sex}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.userFr}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">
                              {moneyFormat(row.ticketPrice)}
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">
                              {moneyFormat(row.ticketPriceFare)}
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">
                              {moneyFormat(row.ticketPriceKh)}
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">
                              {moneyFormat(row.stock)}
                            </h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.route}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.flightNo}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.flightDate}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.airline}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.className}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.kndSysName}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.serviceName}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.servicePnr}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.pathKind}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.finePrice}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.changeTime}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.changeUser}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.changeIp}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.changeStatName}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.finePriceName}</h6>
                          </TableCell>
                          <TableCell align="center">
                            <h6 className="font-size-11">{row.changeTimeName}</h6>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <EndRow
                    ticketPrice={prices.foroshAll}
                    ticketPriceFare={prices.foroshFareAll}
                    ticketPriceKh={prices.kharidAll}
                    stock={prices.soodAll}
                  />
                </TableBody>
              </Table>
            </TableContainer>
            <div
              className={`d-flex justify-content-start pe-1 ps-1 font-size-16${style["title"]}`}
              dir="ltr"
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                component="div"
                count={
                  flights.filter_details_sell_report == null
                    ? []
                    : flights.filter_details_sell_report.length
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
      </div>
    </section>
  );
};

export default AllFlightSellReport;
