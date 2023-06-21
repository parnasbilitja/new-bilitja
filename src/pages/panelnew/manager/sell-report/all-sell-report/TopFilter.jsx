import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createData, fetchedList } from "./data";
import { _filterDetailsSellReport } from "../../../../Redux/Reports/reports.action";
import RangeCalendar from "./../../../calendar/RangeCalendar";

const TopFilter = () => {
  const [date, setDate] = React.useState("");
  const [openCalendar, setOpenCalendar] = React.useState(false);

  const flights = useSelector((state) => state.reports);

  const dispatch = useDispatch();

  const selectedDate = (ctx) => {
    const from = ctx.from.replaceAll("/", "-");
    const to = ctx.to.replaceAll("/", "-");
    setDate(`${from} - ${to}`);
    const allData =
      flights.all_details_sell_report == null
        ? []
        : flights.all_details_sell_report;
    const finded = allData.filter(
      (res) => res.dateTimeSabt >= from && res.dateTimeSabt <= to
    );
    dispatch(_filterDetailsSellReport(finded));
  };

  const deleteFilter = () => {
    dispatch(_filterDetailsSellReport(flights.all_details_sell_report));
    setDate("");
  };

  const chnageStatus = async (value) => {
    const list = await fetchedList(value);
    const array = list.data.map((option) =>
      createData({
        reqNoRow: option.reqNoRow,
        reqNo: option.reqNo,
        reqPnr: option.reqPnr,
        customerName: option.customerName,
        nameFamilyEn: option.nameFamilyEn,
        meliCode: option.meliCode,
        ticketName: option.ticketName,
        ticketNo: option.ticketNo,
        sex: option.sex,
        changeFlag: option.changeFlag,
        changeStat: option.changeStat,
        finePrice: option.finePrice,
        changeTime: option.changeTime,
        changeUser: option.changeUser,
        changeIp: option.changeIp,
        changeNameFlag: option.changeNameFlag,
        changeStatName: option.changeStatName,
        finePriceName: option.finePriceName,
        changeTimeName: option.changeTimeName,
        changeUserName: option.changeUserName,
        changeIpName: option.changeIpName,
        route: option.route,
        flightDate: option.flightDate,
        flightNo: option.flightNo,
        airline: option.airline,
        className: option.className,
        kndSysName: option.kndSysName,
        serviceName: option.serviceName,
        servicePnr: option.servicePnr,
        userFr: option.userFr,
        pathKind: option.pathKind,
        dateTimeSabt: option.dateTimeSabt,
        ticketPrice: option.ticketPrice,
        ticketPriceFare: option.ticketPriceFare,
        ticketPriceKh: option.ticketPriceKh,
        stock: option.stock,
        isSystem: option.isSystem,
        reqNoMain: option.reqNoMain,
        reqPnrMain: option.reqPnrMain,
      })
    );
    dispatch(_filterDetailsSellReport(array));
  };

  return (
    <div className="container mt-2 mb-2">
      <div className="d-flex">
        <div className="col-2 me-1">
          <select onChange={(e) => chnageStatus(e.target.value)}>
            <option value={0}>وضعیت</option>
            <option value={0}>فروش</option>
            <option value={1}>استرداد</option>
          </select>
        </div>
        <div className="col-6">
          <div className="d-flex">
            <div className="col-8 me-1">
              <input
                placeholder="از تاریخ تا تاریخ"
                value={date}
                onClick={() => setOpenCalendar(true)}
              />
            </div>
            {date != "" ? (
              <div className="col-2 ms-1">
                <button
                  className="col-12 btn btn-primary-0"
                  onClick={deleteFilter}
                >
                  حذف
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <RangeCalendar
        open={openCalendar}
        close={() => setOpenCalendar(false)}
        selected={selectedDate}
      />
    </div>
  );
};

export default TopFilter;
