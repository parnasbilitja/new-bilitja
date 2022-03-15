import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { moneyFormat } from "../../../../Utils/SimpleTasks";

const headCells = [
  {
    label: "نام",
  },
  {
    label: "نام خانوادگی",
  },
  {
    label: "کد ملی",
  },
  {
    label: "کلاس سنی",
  },
  {
    label: "شماره بلیط",
  },
  {
    label: "وضعیت",
  },
  {
    label: "جنسیت",
  },
  {
    label: "تاریخ تولد",
  },
  {
    label: "شماره گذر",
  },
  {
    label: "اعتبار گذر",
  },
  {
    label: "ملیت",
  },
  {
    label: "فروش",
  },
  {
    label: "فروش Fare",
  },
  {
    label: "خرید",
  },
  {
    label: "سود",
  },
  {
    label: "جریمه استرداد",
  },
  {
    label: "زمان استرداد",
  },
  {
    label: "IP استرداد",
  },
  {
    label: "جریمه ویرایش ",
  },
  {
    label: "زمان ویرایش ",
  },
  {
    label: "IP ویرایش ",
  },
];

function createData({
  reqNo,
  reqNoRow,
  name,
  family,
  nameEn,
  familyEn,
  meliCode,
  ticketName,
  ticketNo,
  sex,
  birthDate,
  pasNo,
  pasDateSt,
  pasDateEnd,
  meliat,
  ticketPrice,
  ticketPriceFare,
  ticketPriceKh,
  stock,
  changeNameFlag,
  changeStatFlag,
  changeStat,
  finePrice,
  changeTime,
  changeUser,
  changeIp,
  changeStatName,
  finePriceName,
  changeTimeName,
  changeUserName,
  changeIpName,
  isSystem,
  reqNoMain,
  reqPnrMain,
}) {
  return {
    reqNo,
    reqNoRow,
    name,
    family,
    nameEn,
    familyEn,
    meliCode,
    ticketName,
    ticketNo,
    sex,
    birthDate,
    pasNo,
    pasDateSt,
    pasDateEnd,
    meliat,
    ticketPrice,
    ticketPriceFare,
    ticketPriceKh,
    stock,
    changeNameFlag,
    changeStatFlag,
    changeStat,
    finePrice,
    changeTime,
    changeUser,
    changeIp,
    changeStatName,
    finePriceName,
    changeTimeName,
    changeUserName,
    changeIpName,
    isSystem,
    reqNoMain,
    reqPnrMain,
  };
}

const EnhancedTableHead = (props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">
          <h6 className="text-dark font-size-12">ردیف</h6>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center" padding="none">
            <h6 className="text-dark font-size-11">{headCell.label}</h6>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const DesktopInfoSell = ({ open, close, reqNo, reqPnr }) => {
  let i = 1;
  const [data, setData] = React.useState([]);

  const fetchedList = async () => {
    const fetched = await fetch(
      `/api/report/getReportInfo?reqNo=${reqNo}&reqPnr=${reqPnr}`
    );
    const response = await fetched.json();
    const array = response.data.map((option) =>
      createData({
        reqNo: option.reqNo,
        reqNoRow: option.reqNoRow,
        name: option.name,
        family: option.family,
        nameEn: option.nameEn,
        familyEn: option.familyEn,
        meliCode: option.meliCode,
        ticketName: option.ticketName,
        ticketNo: option.ticketNo,
        sex: option.sex,
        birthDate: option.birthDate,
        pasNo: option.pasNo,
        pasDateSt: option.pasDateSt,
        pasDateEnd: option.pasDateEnd,
        meliat: option.meliat,
        ticketPrice: option.ticketPrice,
        ticketPriceFare: option.ticketPriceFare,
        ticketPriceKh: option.ticketPriceKh,
        stock: option.stock,
        changeNameFlag: option.changeNameFlag,
        changeStatFlag: option.changeStatFlag,
        changeStat: option.changeStat,
        finePrice: option.finePrice,
        changeTime: option.changeTime,
        changeUser: option.changeUser,
        changeIp: option.changeIp,
        changeStatName: option.changeStatName,
        finePriceName: option.finePriceName,
        changeTimeName: option.changeTimeName,
        changeUserName: option.changeUserName,
        changeIpName: option.changeIpName,
        isSystem: option.isSystem,
        reqNoMain: option.reqNoMain,
        reqPnrMain: option.reqPnrMain,
      })
    );
    setData(array);
  };

  React.useEffect(() => {
    fetchedList();
  }, [open]);

  return (
    <Dialog open={open} maxWidth="lg">
      <DialogContent>
        <div className="d-flex mb-3 align-items-center">
          <div className="col-11">
            <h3 className="text-dark">مشخصات فروش</h3>
          </div>
          <div className="col-1">
            <button className="btn btn-primary-1" onClick={close}>
              بستن
            </button>
          </div>
        </div>
        <div className="col-12">
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size="small"
              sx={{ minWidth: 1024 }}
            >
              <EnhancedTableHead />
              <TableBody>
                {data.map((row, index) => {
                  return (
                    <TableRow
                      tabIndex={-1}
                      key={row.name}
                      className="cursor-pointer hover-tabel-row"
                    >
                      <TableCell align="center">
                        <h6 className="font-size-11">{i++}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.nameEn}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.familyEn}</h6>
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
                        <h6 className="font-size-11">{row.changeStat}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.sex}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.birthDate}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.pasNo}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.pasDateEnd}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.meliat}</h6>
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
                        <h6 className="font-size-11">{row.finePrice}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.changeTime}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.changeIp}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.finePriceName}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.changeTimeName}</h6>
                      </TableCell>
                      <TableCell align="center">
                        <h6 className="font-size-11">{row.changeIpName}</h6>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesktopInfoSell;
