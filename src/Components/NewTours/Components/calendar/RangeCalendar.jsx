import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import style from "./Clanedr.module.scss";

const RangeCalendar = ({ open, close, selected }) => {
  const defaultValue = {
    from: null,
    to: null,
  };
  const [selectedDay, setSelectedDay] = React.useState(defaultValue);

  const handleGetDay = () => {
    if (selectedDay.from != null && selectedDay.to != null) {
      const fromDay = `${selectedDay.from.year}/${
        selectedDay.from.month < 10
          ? `0${selectedDay.from.month}`
          : selectedDay.from.month
      }/${
        selectedDay.from.day < 10
          ? `0${selectedDay.from.day}`
          : selectedDay.from.day
      }`;
      const toDay = `${selectedDay.to.year}/${
        selectedDay.to.month < 10
          ? `0${selectedDay.to.month}`
          : selectedDay.to.month
      }/${
        selectedDay.to.day < 10 ? `0${selectedDay.to.day}` : selectedDay.to.day
      }`;

      const dates = {
        from: fromDay,
        to: toDay,
        reslong: selectedDay.to.day - selectedDay.from.day,
      };
      selected(dates);
      close();
    }
  };

  React.useEffect(() => {
    return () => {
      setSelectedDay(defaultValue);
    };
  }, []);
  return (
    <Dialog
      className={style["header-title"]}
      open={open}
      onClose={close}
      dir="rtl"
    >
      <DialogContent>
        <div className="d-flex mb-2">
          <div className="col-lg-12">
            <span className={style["header-title"]}>
              تاریخ شروع رزرو پایان رزرو را مشخص کنید:
            </span>
          </div>
        </div>
        <Calendar
          className={style["header-title"]}
          value={selectedDay}
          onChange={setSelectedDay}
          shouldHighlightWeekends
          locale="fa" // add this
          colorPrimary="#00ca99"
        />
        <div className={style["header-title"]}>
          <button className="btn btn-primary col-12" onClick={handleGetDay}>
            تایید تاریخ
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RangeCalendar;
