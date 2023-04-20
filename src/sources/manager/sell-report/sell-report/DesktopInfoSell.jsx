import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import style from "./Descktop.module.scss";

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
        <TableCell align="center" className={style["tablerowfont"]}>
          <p className={style["list-title"]}>ردیف</p>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center" padding="none">
            <p className={style["tablerowfont"]}>{headCell.label}</p>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const DesktopInfoSell = ({ open, close, reqNo, reqPnr }) => {
  console.log(reqNo, reqPnr);
  let i = 1;
  const [data, setData] = React.useState([]);

  const fetchedList = async () => {
    const fetched = await fetch(
      `/api/report/getReportInfo?reqNo=${reqNo}&reqPnr=${reqPnr}`
    );
    const response = await fetched.json();
    console.log(response.data);
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
            <p className={style["header-title"]}>مشخصات فروش</p>
          </div>
          <div className={style["header-buttn"]}>
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
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-14">{i++}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.nameEn}</h6>
                      </TableCell>
                      <TableCell
                        className={style["tablerowfont"]}
                        align="center"
                      >
                        <h6 className="font-size-16">{row.familyEn}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.meliCode}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.ticketName}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.ticketNo}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.changeStat}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.sex}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.birthDate}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.pasNo}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.pasDateEnd}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.meliat}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">
                          {moneyFormat(row.ticketPrice)}
                        </h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">
                          {moneyFormat(row.ticketPriceFare)}
                        </h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">
                          {moneyFormat(row.ticketPriceKh)}
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
                        <h6 className="font-size-16">{row.finePrice}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.changeTime}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.changeIp}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.finePriceName}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.changeTimeName}</h6>
                      </TableCell>
                      <TableCell
                        align="center"
                        className={style["tablerowfont"]}
                      >
                        <h6 className="font-size-16">{row.changeIpName}</h6>
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
