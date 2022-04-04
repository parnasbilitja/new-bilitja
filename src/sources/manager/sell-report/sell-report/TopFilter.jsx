import React from "react";
// import RangeCalendar from "../../../../../../common/calendars/range-calendar/RangeCalendar";
import { useSelector, useDispatch } from "react-redux";
import { _filterSellReport } from "../../../../Redux/Reports/reports.action";
import RangeCalendar from "../../../calendar/RangeCalendar";

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
      flights.all_sell_report == null ? [] : flights.all_sell_report;
    const finded = allData.filter(
      (res) => res.dateTimeSabt >= from && res.dateTimeSabt <= to
    );
    dispatch(_filterSellReport(finded));
  };

  const deleteFilter = () => {
    dispatch(_filterSellReport(flights.all_sell_report));
    setDate("");
  };

  return (
    <div className="container mt-2 mb-2">
      <div className="d-flex">
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
