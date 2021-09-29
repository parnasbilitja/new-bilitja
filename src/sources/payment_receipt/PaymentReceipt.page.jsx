import React from "react";
import Footer from "./../component/Footer.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import globals from "./../Global";
import PaymentReceiptDesktopHeader from "./PaymentReceiptDesktopHeader.component";
import PaymentReciptMobileHeader from "./PaymentReceiptMobileHeader.component";

const PaymentReceiptPage = (props) => {
  const [btn_disabel, setBtnDisabel] = React.useState(false);
  let i = 1;

  const handlePrint = (reqNo, reqPnr) => {
    setBtnDisabel(true);
    fetch(
      `https://bilitja.ravis.ir/Eticket/Ticket?reqNo=${reqNo}&reqPnr=${reqPnr}`
    )
      .then((res) => res.blob())
      .then((blob) => {
        setBtnDisabel(false);
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      });
  };

  return (
    <>
      <div className="container text-center">
        <img
          width=""
          height=""
          alt="بلیطجا - لوگو پرداخت موفقیت آمیز"
          src="/Images/check.webp"
          className="mt-5 text-center"
        />
        <br />
        <h6 className="font-bold-iransanse mt-3">
          {props.referenceEbank.stat} - {props.referenceEbank.bankName} - کد
          پیگیری: {props.referenceEbank.reqPnr}
        </h6>
        <h6 className="font-bold-iransanse">
          {props.referenceEbank.dateTimeSabt}
        </h6>
        <h6 className="font-bold-iransanse">
          مبلغ: {props.referenceEbank.amount}
        </h6>
      </div>
      <PaymentReceiptDesktopHeader info={props} />
      <PaymentReciptMobileHeader info={props} />
      <div className="container pt-4">
        <div className="card">
          <div className="table-responsive">
            <table class="table table-striped font-bold-iransanse text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">نام</th>
                  <th scope="col">نام خانوادگی</th>
                  <th scope="col">رفرنس</th>
                  <th scope="col">ملیت</th>
                  <th scope="col">قیمت</th>
                </tr>
              </thead>
              <tbody>
                {props.referenceFlight.map((option) => (
                  <tr className="text-muted font-size-12">
                    <th scope="row">
                      {i++}-{option.ticketName}
                    </th>
                    <td>{option.nameEn}</td>
                    <td>{option.familyEn}</td>

                    <td>{option.reqPnr}</td>
                    <td>{option.meliat}</td>

                    <td>{option.ticketPrice}</td>
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
          onClick={() =>
            handlePrint(props.referenceEbank.reqNo, props.referenceEbank.reqPnr)
          }
          disabled={btn_disabel}
        >
          <FontAwesomeIcon icon={faPrint} /> چاپ بلیط
        </button>
      </div>
      <Footer />
    </>
  );
};

export default PaymentReceiptPage;
