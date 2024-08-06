import axios from "axios";
import { useEffect, useState } from "react";
import globals from "../Global";
import style from "../../../styles/Vilalist.module.scss";
import PopUpWide from "../component/PopUpWide.component";
import CalendarComponent from "../calendar/Calendar.component";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Vilialistmobile from "./Vilialistmobile";

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
  
  let datalist2 = new Date().getTime(datalistback);
  

  const [width, setWidth] = useState();
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  

  useEffect(() => {
    try {
      axios.get(`${globals.baseUrl}bj/eghamatEmkanat/view/`).then((res) => {
        
        setEmkanat(res.data);
        
      });
    } catch (e) {
      
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(`${globals.baseUrl}bj/eghamat/view/`).then((res) => {
        
        setListvila(res.data);
        
      });
    } catch (e) {
      
    }
  }, []);
  useEffect(() => {
    try {
      axios.get(`${globals.baseUrl}bj/eghamatRoom/view/`).then((res) => {
        
        setListvilatwo(res.data);
        
      });
    } catch (e) {
      
    }
  }, []);
  

  const handeldata = (value) => {
    setOpen(value);
  };
  const handeldataback = (value) => {
    setOpenback(value);
  };

  const increment = () => {
    // debugger;
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

  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 0,
  };
  const [opens, setOpens] = useState(false);
  const handleOpen = () => setOpens(true);
  const handleClose = () => setOpens(false);
  return (
    <div className={style["home"]}>
      <div>
        {" "}
        {/* <div className={style["title-header"]}>
        <div>هتل پابلیک استانبول</div>
        <span>The Public HOTEL</span>
      </div>
      <div className={style["border-header"]}></div>
      <div className={style["title-header-title"]}>
        <span>شهر و منطقه : استانبول Istanbul</span>
        <span>درجه هتل : *****</span>
      </div>
      <div className={style["picture-box"]}>
        <div className={style["picture-box-right"]}>
          <img
            className={style["picture-box-item1"]}
            src="/Images/picture1.jpg"
            alt="تصویر-1"
            width={240}
            height={190}
          />
          <img
            src="/Images/picture2.jpg"
            alt="تصویر-1"
            width={240}
            height={190}
          />
          <img
            className={style["picture-box-item3"]}
            src="/Images/picture3.jpg"
            alt="تصویر-1"
            width={240}
            height={190}
          />
          <img
            src="/Images/picture4.jpg"
            alt="تصویر-1"
            width={240}
            height={190}
          />
        </div>
        <div className={style["picture-box-left"]}>
          <img
            className={style["picture-box-item6"]}
            src="/Images/picture5.jpg"
            alt="تصویر-1"
            width={610}
            height={390}
          />
        </div>
      </div>
      <div className={style["border"]}></div>
      <div className={style["desc"]}>
        <div className={style["desc-right"]}>
          {" "}
          <div className={style["desc-right-img"]}>
            <img
              className={style["picture-box-item6"]}
              src="/Images/picture5.jpg"
              alt="تصویر-1"
              width={320}
              height={200}
            />
            <div className={style["button"]}>مسیر یابی از مبدا شما !</div>
          </div>
          <div className={style["desc-right-address"]}>
            <span className={style["icon"]}>
              <i className="bilitja icon-phone"></i>
            </span>
            <span className={style["adress"]}>
              Istiklal Cad. Turnacıbasi Sokak No:1 Taksim / Beyoglu, Beyoglu,
              34433 Istanbul, Turkey
            </span>
          </div>
          <div className={style["desc-right-tel"]}>
            <span className={style["icon"]}>
              <i className="bilitja icon-phone"></i>
            </span>
            <span className={style["adress"]}>02177145366</span>
          </div>
        </div>
        <div className={style["desc-left"]}>
          <p>درباره هتل پابلیک استانبول بیشتر بدانید :</p>
          The Public که در قلب تقسیم قرار دارد، در یک ساختمان تاریخی که توسط
          معمار مشهور هوسپ آزناوور در سال 1901 طراحی شده است، واقع شده است.
          همچنین در خیابان پر جنب و جوش استقلال قرار دارد که کافه ها، رستوران
          ها، مراکز خرید و گالری های هنری متعددی را در خود جای داده است.
          <br />
          <br /> دسترسی به وای فای رایگان در تمام قسمت های هتل موجود است.
          واحدهای The Public دارای طراحی معاصر با آجرهای سفالی آتشین و دیوارهای
          سنگی خاکستری و مبلمان مدرن و سبک هستند. <br />
          <br />
          هر کدام دارای تهویه مطبوع، مینی بار و تلویزیون هستند. قهوه ساز و کتری
          برقی نیز ارائه شده است. حمام خصوصی دارای دوش، سشوار و لوازم آرایش
          رایگان نیز می باشد. در The Public یک میز پذیرش 24 ساعته خواهید داشت که
          خدمات اتاق ارائه می دهد. خدمات خشکشویی، اتو با هزینه اضافی ارائه می
          شود.
          <br />
          <br /> یک فروشگاه نیز در محل وجود دارد. می توانید وعده های غذایی خود
          را در رستوران هتل میل کنید. همچنین رستوران های زیادی در اطراف وجود
          دارد. بار در محل برای نوشیدن یک نوشیدنی و استراحت در پایان روز ایده آل
          است.
          <br />
          <br /> برای رفتن به دیگر مکان‌های مرکزی شهر از جمله منطقه تاریخی سلطان
          احمد، می‌توانید با یک پیاده‌روی کوتاه از مترو تکسیم استفاده کنید. مرکز
          خرید Demiroren چند قدم دورتر است. برج نمادین گالاتا 0.7 مایل با هتل و
          مرکز کنگره لطفی کردار 2 مایل فاصله دارد. خدمات ترانسفر به فرودگاه
          آتاتورک در 14 مایل دورتر نیز در صورت درخواست با هزینه اضافی ترتیب داده
          می شود.
          <br />
          <br /> فرودگاه استانبول 30 مایل با شما فاصله دارد.
        </div>
      </div>
      <div className={style["option"]}>
        <p className={style["option-title"]}>
          امکانات هتل ، اتاق ها و خدمات دیگر در یک نگاه
        </p>
        <span></span>
      </div>
      <div className={style["border"]}></div>
      <div className={style["tour-item"]}>
        <div className={style["tour-item-right"]}>
          <div>تور استانبول ویژه 2 اردیبهشت</div>
          <span>
            شروع قیمت از :
            <span style={{ color: "#489692",fontSize:16,fontWeight:600 }}> 5,960,000 تومان</span>
          </span>
        </div>
        <div className={style["tour-item-center"]}>
          <div className={style["tour-item-center-roz"]}>
            <div>4 شب</div>
            <div>5 روز</div>
          </div>
          <div className={style["tour-item-center-date"]}>
            <div>
              <div className={style["icon-switch"]}>
                <FontAwesomeIcon
                  style={{ color: "#489692" }}
                  icon={faExchangeAlt}
                  className={`${style["home-swtich-button"]} exchange-icon`}
                />
              </div>
            </div>
            <div>
              <div>1401/02/02</div>
              <div>1401/02/06</div>
            </div>
          </div>
          <div className={style["tour-item-center-airplan"]}>معراج</div>
        </div>
        <div className={style["tour-item-left"]}>
          <button>buy</button>
        </div>
      </div> */}
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={opens}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={opens}>
            <Box sx={styles}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              ></Typography>
              <Typography id="transition-modal-description">
                <Swiper
                  style={{ height: 400, color: "white" }}
                  pagination={{
                    type: "fraction",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                >
                  <SwiperSlide>
                    <img
                      className={style["picture-box-item6"]}
                      src="/Images/picture1.jpg"
                      alt="تصویر-1"
                      width={820}
                      height={400}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className={style["picture-box-item6"]}
                      src="/Images/picture2.jpg"
                      alt="تصویر-1"
                      width={820}
                      height={400}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className={style["picture-box-item6"]}
                      src="/Images/picture3.jpg"
                      alt="تصویر-1"
                      width={820}
                      height={400}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className={style["picture-box-item6"]}
                      src="/Images/picture4.jpg"
                      alt="تصویر-1"
                      width={820}
                      height={400}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      className={style["picture-box-item6"]}
                      src="/Images/picture5.jpg"
                      alt="تصویر-1"
                      width={820}
                      height={400}
                    />
                  </SwiperSlide>
                </Swiper>
              </Typography>
            </Box>
          </Fade>
        </Modal>
        <div className={style["vila"]}>
          <div className={style["title-header"]}>
            <div>هتل پابلیک استانبول</div>
          </div>
          <div className={style["border-header"]}></div>
          <div className={style["title-header-title"]}>
            <span>شهر و منطقه : استانبول Istanbul</span>
            <span>
              درجه هتل : <span style={{ color: "gold" }}>*****</span>
            </span>
          </div>
          {width >= 769 ? (
            <div className={style["picture-box"]}>
              <div className={style["picture-box-right"]}>
                <img
                  className={style["picture-box-item1"]}
                  src="/Images/picture1.jpg"
                  alt="تصویر-1"
                  width={240}
                  height={190}
                />
                <img
                  src="/Images/picture2.jpg"
                  alt="تصویر-1"
                  width={240}
                  height={190}
                />
                <img
                  className={style["picture-box-item3"]}
                  src="/Images/picture3.jpg"
                  alt="تصویر-1"
                  width={240}
                  height={190}
                />
                <img
                  src="/Images/picture4.jpg"
                  alt="تصویر-1"
                  width={240}
                  height={190}
                />
              </div>
              <div className={style["picture-box-left"]}>
                <div className={style["box-items-image-button"]}>
                  <img
                    className={style["picture-box-item6"]}
                    src="/Images/picture5.jpg"
                    alt="تصویر-1"
                    width={610}
                    height={390}
                  />
                </div>
                <div
                  onClick={handleOpen}
                  className={style["picture-box-left-button"]}
                >
                  <button> مشاهده تمام تصاویر</button>
                </div>
              </div>
            </div>
          ) : (
            <Vilialistmobile />
          )}

          <div className={style["vila-index"]}>
            <div className={style["vila-right"]}>
              <div className={style["vila-header"]}>
                <div className={style["vila-name"]}></div>
                <div className={style["vila-adress"]}></div>

                <div className={style["vila-mizban"]}>
                  میزبان :
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
                              {item.EghamatId ===
                              listvila?.Eghamat[27]?.EghamatId
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
                              {item.EghamatId ===
                              listvila?.Eghamat[27]?.EghamatId
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
                              {item.EghamatId ===
                              listvila?.Eghamat[27]?.EghamatId
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
                              {item.EghamatId ===
                              listvila?.Eghamat[27]?.EghamatId
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
            <div className={style["vila-left"]}>
              <div className={style["vila-left-home"]}>
                <div className={style["vila-box-header"]}>
                  <div className={style["header-title"]}>
                    <p> قیمت هر شب از: 500٫000 تومان</p>{" "}
                  </div>
                </div>

                <div className={style["vila-box-date"]}>
                  <span style={{ fontSize: 16, fontWeight: 800 }}>
                    تاریخ سفر
                  </span>
                  <span
                    onClick={() => handeldeleted(datalist)}
                    style={{ color: "blue", fontSize: 13, fontWeight: 800 }}
                  >
                    پاک کردن تاریخ
                  </span>
                </div>
                <div className={style["flight-data"]}>
                  <button onClick={() => handeldata(true)}>
                    <span
                      style={{
                        fontSize: 14,
                        color: "#279692",
                        fontWeight: 600,
                      }}
                    >
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
                    <span
                      style={{ fontSize: 14, color: "red", fontWeight: 600 }}
                    >
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
                              setDatelistback.typeOfCalendar =
                                value.typeOfCalendar;
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
                    <span className={style["button-inc"]}>
                      <div>
                        <button onClick={() => increment()}>+</button>
                      </div>
                      <span className={style["amount"]}>{amount}</span>
                      <div>
                        <button onClick={() => decrement()}>-</button>
                      </div>
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
              <div className={style["desc-right"]}>
                <div className={style["desc-right-img"]}>
                  <img
                    className={style["picture-box-item6"]}
                    src="/Images/picture5.jpg"
                    alt="تصویر-1"
                    width={320}
                    height={200}
                  />
                  <div className={style["button"]}>مسیر یابی از مبدا شما !</div>
                </div>
                <div className={style["desc-right-address"]}>
                  <span className={style["icon"]}>
                    <i className="bilitja icon-phone"></i>
                  </span>
                  <span className={style["adress"]}>
                    Istiklal Cad. Turnacıbasi Sokak No:1 Taksim / Beyoglu,
                    Beyoglu, 34433 Istanbul, Turkey
                  </span>
                </div>
                <div className={style["desc-right-tel"]}>
                  <span className={style["icon"]}>
                    <i className="bilitja icon-phone"></i>
                  </span>
                  <span className={style["adress"]}>02177145366</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vilalist;
