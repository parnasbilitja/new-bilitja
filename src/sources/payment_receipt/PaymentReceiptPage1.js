import React from "react";
import Footer from "./../component/Footer.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faInfoCircle, faPrint, faUser } from "@fortawesome/free-solid-svg-icons";
import globals from "./../Global";
import PaymentReceiptDesktopHeader from "./PaymentReceiptDesktopHeader.component";
import PaymentReciptMobileHeader from "./PaymentReceiptMobileHeader.component";
import FlightReserveDesktopHeader from "./FlightReserveDesktopHeader.component";
import FlightReserveMobileHeader from "./FlightReserveMobileHeader.component";
import { moneyFormat, moneyFormatrial } from "../../Utils/SimpleTasks";
import styles from "../../../styles/FlightReciept.module.scss";
import axios from "axios";
const PaymentReceiptPage = (props) => {
  const [btn_disabel, setBtnDisabel] = React.useState(false);
  let i = 1;

  const handlePrint = (reqNo, reqPnr) => {
    console.log(reqNo, reqPnr);
    setBtnDisabel(true);
    axios.get(`http://tpa.ravis24.ir/Eticket/Ticket?reqNo=${reqNo}&reqPnr=${reqPnr}`)
      .then((blob) => {
        setBtnDisabel(false);
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      })
      .catch((error) => {console.log(error)})
  };
  return (
    <>
      <div className="container text-center mt-4">
        <div className="row ">
          <div className="col-lg-12 border-pill border-pill-lg px-4">
            <div className="row justify-content-center">
              <div className="text-center col-2 justify-content-center" style={{flexWrap:'wrap',alignContent: 'center'}}>
                <img
                  className="my-2"
                  width="auto"
                  height="80px"
                  alt="بلیطجا - لوگو پرداخت موفقیت آمیز"
                  src="/Images/check.webp"
                  />
                  <br/>
                  <span className="font-bold" style={{color: "#279692"}}>{props.referenceEbank.stat}</span>
              </div>
              <div className="col-12 col-sm-9 col-md-6 col-lg-4 text-center">
                <h6 className="font-bold-iransanse mt-3">
                  <img src={'../../../Images/sep.png'} alt="sep" width={'50px'} height={'30px'} />{'    '}
                  {props.referenceEbank.bankName} - کد
                  پیگیری: <span className="fontEn">{props.referenceEbank.reqPnr}</span>
                </h6>
                <div className="row justify-content-center mt-3">
                  <div className="text-center col-6" style={{flexWrap:'wrap',alignContent: 'center'}}>
                    <h6 className="font-bold-iransanse">
                      {props.referenceEbank.dateTimeSabt}
                    </h6>
                  </div>
                  <div className="text-center col-6" style={{flexWrap:'wrap',alignContent: 'center'}}>
                    <h6 className="font-bold-iransanse">
                      مبلغ: {moneyFormatrial(props.referenceEbank.amount)} ریال
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-1">
      <FlightReserveDesktopHeader {...props} />
      <FlightReserveMobileHeader {...props} />

        <div className="row ">
        <div className="col-lg-12 no-padding-xs border-pill-lg px-4">
          <p
            className={`text-right font-size-14 ${styles["pcolor-textpill"]} mx-2 `}
          >
            <FontAwesomeIcon icon={faUser} />
            مشخصات مسافرین
          </p>
          <table
            className={`table my-2 text-right ${styles["passenger-list-last-payment"]} `}
          >
            <thead>
              <tr className="font-bold-iransanse font-size-13 hidden-xs">
                <th>#</th>
                <th>نام</th>
                <th>نام‌خانوادگی</th>
                <th>ملیت</th>
                <th>رفرنس</th>
                <th>کدملی/گذرنامه</th>
                {props.referenceFlight[0].pasEndDate && <th>انقضای گذرنامه</th>}
                {/* <th>تاریخ پرواز</th> */}
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody>
              {props.referenceFlight.map((option, index) => (
                  <tr className="font-size-13">
                    <td className="hidden-xs">
                    {index+1}-{option.ticketName} ({option.sex == 1?'مرد':'زن'})
                    </td>
                     <td className="px-0">
                      <div className="hidden-xs">
                        {option.nameEn}
                      </div>
                      <div className="visible-xs font-bold-iransanse px-2 mx-1 ">
                        <span>
                          <FontAwesomeIcon icon={faUser} />
                          {`${option.nameEn} ${option.familyEn
                            } (${
                              option.ticketName
                            })`}
                        </span>
                        <p className="pt-2">
                          <FontAwesomeIcon icon={faInfoCircle} />
                          {option.meliCode ? option.meliCode : option.pasNo}
                        </p>
                      </div>
                    </td>
                    <td className="hidden-xs">
                      {option.familyEn}
                    </td>
                    <td className="hidden-xs">
                      {option.meliat == "IR"
                        ? "ایرانی"
                        : "خارجی"}
                    </td>
                    <td className="hidden-xs fontEn">{option.reqPnr}</td>
                    <td className="hidden-xs">
                      {option.meliCode ? option.meliCode : option.pasNo}
                    </td>
                    {option.pasEndDate &&
                      <td className="hidden-xs">
                        {option.pasEndDate}
                      </td>
                    }

                    <td className="visible-xs font-bold-iransanse">
                      <div className="visible-xs font-bold-iransanse">
                        <p className="pt-1 pb-4">
                          {moneyFormatrial(option.ticketPrice)} ریال
                        </p>
                      </div>
                    </td>
                              
                    <td className="hidden-xs">
                        {moneyFormatrial(option.ticketPrice)} ریال
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>



        <button
          className={
            btn_disabel === true
              ? "btn btn-success font-yekan my-3 cursor-progress "
              : "btn btn-success font-yekan my-3"
          }
          onClick={() =>{
            handlePrint(props.referenceEbank.reqNo, props.referenceEbank.reqPnr)}
          }
          // disabled={btn_disabel}
        >
          <FontAwesomeIcon icon={faPrint} /> چاپ بلیط
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PaymentReceiptPage;
