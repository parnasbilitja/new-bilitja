import axios from "axios";
import { useEffect, useState } from "react";
import globals from "../Global";
import style from "../../../styles/Vilalist.module.scss";
import PopUpWide from "../component/PopUpWide.component";
import CalendarComponent from "../calendar/Calendar.component";

const Vilalist = () => {
  const [listvila, setListvila] = useState();
  const [listvilatwo, setListvilatwo] = useState();
  const [open, setOpen] = useState(false);
  const [openback, setOpenback] = useState(false);
  const [datalist, setDatelist] = useState();
  const [amount, setAmnount] = useState(1);
  const [datalistback, setDatelistback] = useState();
  const [emkanat, setEmkanat] = useState();

  let datelist = new Date().getTime(datalist);
  console.log("data :", datelist);
  let datalist2 = new Date().getTime(datalistback);
  console.log("data 2 :", datalist2);

  useEffect(() => {
    try {
      axios.get(`${globals.baseUrl}bj/eghamatEmkanat/view/`).then((res) => {
        console.log("res :", res);
        setEmkanat(res.data);
        console.log("emkanat :", emkanat);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(`${globals.baseUrl}bj/eghamat/view/`).then((res) => {
        console.log(" vilia data :", res);
        setListvila(res.data);
        console.log("vila :", listvila);
      });
    } catch (e) {
      console.log("e", e);
    }
  }, []);
  useEffect(() => {
    try {
      axios.get(`${globals.baseUrl}bj/eghamatRoom/view/`).then((res) => {
        console.log(" vilia data2 :", res);
        setListvilatwo(res.data);
        console.log("vila2 :", listvilatwo);
      });
    } catch (e) {
      console.log("e", e);
    }
  }, []);
  console.log("asdasda 2", listvilatwo);

  const handeldata = (value) => {
    setOpen(value);
  };
  const handeldataback = (value) => {
    setOpenback(value);
  };

  const increment = () => {
    debugger;
    if (amount === 3) {
      return null;
    } else {
      let result = amount + 1;
      setAmnount(result);
    }
  };
  const decrement = () => {
    if (amount == 1) {
      return null;
    } else {
      let result = amount - 1;

      setAmnount(result);
    }
  };
  const handeldeleted = (datalist) => {
    const update = datalist?.filter((item) => item.id !== id);
    setDatelist(update);
  };
  return (
    <div className={style["home"]}>
      <div className={style["vila"]}>
        <div className={style["vila-right"]}>
          <div className={style["vila-header"]}>
            <div className={style["vila-name"]}>
              <span>{listvila?.Eghamat[27]?.Name}</span>
            </div>
            <div className={style["vila-adress"]}>
              <p>{listvila?.Eghamat[27]?.AddressName}</p>
            </div>

            <div className={style["vila-mizban"]}>
              میزبان :{" "}
              <span style={{ fontSize: 18 }}>
                {listvila?.Eghamat[27]?.AdminName}
              </span>
            </div>
            <div className={style["vila-code"]}>
              <span style={{ marginRight: 20 }}> کد آگهی : </span>
              <span style={{ color: "#FFF" }}>
                {listvila?.Eghamat[27]?.ProvinceId}
              </span>
            </div>

            <div className={style["border"]}></div>
          </div>
          <div className={style["vila-header"]}>
            <div className={style["vila-info"]}> درباره این مکان</div>

            <div className={style["vila-dsc"]}>
              {listvila?.Eghamat[27]?.Dsc}
            </div>

            <div className={style["border"]}></div>
          </div>
          <div className={style["vila-header"]}>
            <div className={style["title-header"]}> فضای اقامتگاه</div>
            <div className={style["vila-info-content"]}>
              <div>
                {" "}
                <span className={style["vila-cap"]}>
                  <div>
                    ظرفیت استاندارد :{" "}
                    <span style={{ color: "rgb(88, 88, 88)" }}>
                      {listvilatwo?.EghamatRoom?.map((item) => (
                        <span>
                          {item.EghamatId === listvila?.Eghamat[27]?.EghamatId
                            ? item.Cap
                            : null}
                        </span>
                      ))}
                      نفر
                    </span>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    {" "}
                    حداکثر ظرفیت :
                    <span style={{ color: "rgb(88, 88, 88)" }}>
                      {" "}
                      {listvilatwo?.EghamatRoom?.map((item) => (
                        <span>
                          {item.EghamatId === listvila?.Eghamat[27]?.EghamatId
                            ? item.CapMax
                            : null}
                        </span>
                      ))}{" "}
                      نفر
                    </span>
                  </div>
                </span>
              </div>
              <div>
                {" "}
                <div className={style["vila-metraj"]}>
                  <span>
                    متراژ بنا :
                    <span style={{ color: "rgb(88, 88, 88)" }}>
                      {" "}
                      {listvila?.Eghamat[27]?.Metraj} متر{" "}
                    </span>
                  </span>
                </div>
                <div className={style["vila-Information"]}>
                  منطقه :
                  <span style={{ color: "rgb(88, 88, 88)" }}>
                    {listvila?.Eghamat[27]?.RostaFlag
                      ? " ویلایی دربست - بدون سرایدار/نگهبان "
                      : listvila?.Eghamat[27]?.SahelFlag
                      ? " ویلایی-دربست/ساحلی "
                      : listvila?.Eghamat[27]?.ShahrFlag
                      ? " ویلایی دربست -شهری "
                      : listvila?.Eghamat[27]?.ShahrakFlag
                      ? " ویلایی دربست -شهرکی "
                      : null}
                  </span>
                </div>
              </div>
            </div>
            <div className={style["vila-cap"]} style={{ marginTop: 30 }}>
              هزینه هر نفر اضافه{" "}
              <span style={{ color: "rgb(88, 88, 88)" }}>70,000</span> تومان
            </div>
            <div className={style["border"]}></div>
          </div>

          <div className={style["vila-header"]}>
            <div className={style["room-title"]}>
              فضای خواب :
              <span className={style["room-count"]}>
                <span>
                  {listvilatwo?.EghamatRoom?.map((item) => (
                    <span>
                      {item.EghamatId === listvila?.Eghamat[27]?.EghamatId
                        ? item.RoomCount
                        : null}{" "}
                    </span>
                  ))}{" "}
                </span>
                <span> اتاق خواب </span>
              </span>
            </div>
            <div className={style["room-information"]}>
              <div style={{ marginTop: 30 }}>
                <div className={style["room-border"]}>
                  <span>
                    <div className={style["room-style"]}>
                      {listvilatwo?.EghamatRoom?.map((item) => (
                        <span>
                          {item.EghamatId === listvila?.Eghamat[27]?.EghamatId
                            ? item.Takht1Count
                            : null}
                        </span>
                      ))}
                      <span style={{ marginRight: 5 }}> تخت یک نفره </span>
                    </div>
                  </span>
                  <span>
                    <div className={style["room-style"]}>
                      {" "}
                      {listvilatwo?.EghamatRoom?.map((item) => (
                        <span>
                          {item.EghamatId === listvila?.Eghamat[27]?.EghamatId
                            ? item.Takht2Count
                            : null}
                        </span>
                      ))}
                      <span style={{ marginRight: 5 }}> تخت دو نفره </span>
                    </div>
                  </span>
                </div>

                <div className={style["border"]}></div>
              </div>

              <div className={style["vila-cap"]}>
                حداقل مدت اقامت 1 شب
                <div className={style["room-information"]}>
                  تحویل کلید از 16:00 تا 00:00
                </div>
              </div>
              <div className={style["border"]}></div>
            </div>
          </div>

          <div className={style["vila-header"]}>
            <div className={style["vila-info"]}> امکانات </div>

            <div className={style["border"]}></div>
          </div>
        </div>
      </div>

      <div className={style["vila-left"]}>
        <div className={style["vila-left-home"]}>
          <div className={style["vila-box-header"]}>
            <div className={style["header-title"]}>
              <p> قیمت هر شب از: 500٫000 تومان</p>{" "}
            </div>
          </div>

          <div className={style["vila-box-date"]}>
            <span style={{ fontSize: 16, fontWeight: 800 }}>تاریخ سفر</span>
            <span
              onClick={() => handeldeleted(datalist)}
              style={{ color: "blue", fontSize: 13, fontWeight: 800 }}
            >
              پاک کردن تاریخ
            </span>
          </div>
          <div className={style["flight-data"]}>
            <button onClick={() => handeldata(true)}>
              <span style={{ fontSize: 14, color: "#279692", fontWeight: 600 }}>
                {" "}
                تاریخ ورود
              </span>
              <label htmlFor="">
                {setDatelist.typeOfCalendar == "GAR"
                  ? setDatelist.flightDatePersian
                  : setDatelist.flightDatePersian}
              </label>
              {open ? (
                <PopUpWide opened={open} closePopUp={handeldata}>
                  <div>
                    <CalendarComponent
                      setDate={(value) => {
                        setDatelist.gar = value.garigorian;
                        setDatelist.flightDatePersian = value.jalali;
                        setDatelist.typeOfCalendar = value.typeOfCalendar;
                      }}
                      closePopUpCalendar={handeldata}
                    />
                  </div>
                </PopUpWide>
              ) : null}
            </button>
            <button onClick={() => handeldataback(true)}>
              <span style={{ fontSize: 14, color: "red", fontWeight: 600 }}>
                تاریخ برگشت
              </span>
              <label htmlFor="">
                {datalist2 > datelist
                  ? " "
                  : setDatelistback.typeOfCalendar == "GAR"
                  ? setDatelistback.flightDatePersian
                  : setDatelistback.flightDatePersian}
              </label>
              {openback ? (
                <PopUpWide opened={openback} closePopUp={handeldataback}>
                  <div>
                    <CalendarComponent
                      setDate={(value) => {
                        setDatelistback.gar = value.garigorian;
                        setDatelistback.flightDatePersian = value.jalali;
                        setDatelistback.typeOfCalendar = value.typeOfCalendar;
                      }}
                      closePopUpCalendar={handeldataback}
                    />
                  </div>
                </PopUpWide>
              ) : null}
            </button>
          </div>

          <div className={style["box-number"]}>
            <span
              style={{
                marginTop: 20,
                color: "black",
                fontWeight: 800,
                marginRight: 10,
              }}
            >
              تعداد نفرات
            </span>
            <div className={style["numbers"]}>
              <span className={style["amount"]}>{amount}</span>
              <span className={style["button-inc"]}>
                <button onClick={() => increment()}>+</button>
                <button onClick={() => decrement()}>-</button>
              </span>
            </div>
          </div>
          <div className={style["button-buy"]}>
            <button>ارسال درخواست آنلاین </button>
          </div>

          <div className={style["box-title"]}>
            <span>همراه با گفتگوی آنلاین با میزبان قبل از پرداخت</span>
          </div>
          <div className={style["Contact-support"]}>
            <span className={style["suport"]}>ارتباط با پشتیبانی</span>
            <a
              href="tel:02157874"
              style={{ marginRight: 10 }}
              className={style["suport"]}
            >
              02157874
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vilalist;
