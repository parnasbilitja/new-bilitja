import React from "react";
import Footer from "./../component/Footer.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

const PaymentReceiptPage = (props) => {
  let i = 1;

  return (
    <>
      <div className="container text-center">
        <img src="/Images/check.png" className="mt-5 text-center" />
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
      <div className="container pt-4">
        <button className="btn btn-success font-yekan mb-3">
          <FontAwesomeIcon icon={faPrint} /> چاپ بلیط
        </button>
        <div className="card">
          <div className="row py-3">
            <div className="col-lg-11">
              <div className="table-responsive">
                <table class="table table-striped font-bold-iransanse text-center">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">نام</th>
                      <th scope="col">نام خانوادگی</th>
                      <th scope="col">مبدا / مقصد</th>
                      <th scope="col">شماره پرواز</th>
                      <th scope="col">ایرلاین</th>
                      <th scope="col">تاریخ</th>
                      <th scope="col">ساعت</th>
                      <th scope="col">رفرنس</th>
                      <th scope="col">ملیت</th>
                      <th scope="col">جنسیت</th>
                      <th scope="col">قیمت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.referenceFlight.map((option) => (
                      <tr className="text-muted" style={{ fontSize: "12px" }}>
                        <th scope="row">
                          {i++}-{option.ticketName}
                        </th>
                        <td>{option.nameEn}</td>
                        <td>{option.familyEn}</td>
                        <td>
                          <strong>{option.airport1}</strong>{" "}
                          <strong className="text-danger">به </strong>
                          <strong>{option.airport2}</strong>
                        </td>
                        <td>{option.flightNo}</td>
                        <td>{option.airline}</td>
                        <td>{option.flightDate}</td>
                        <td>{option.flightTime}</td>
                        <td>#{option.reqPnr}</td>
                        <td>{option.meliat}</td>
                        <td>{option.sex == 1 ? "مرد" : "زن"}</td>
                        <td>{option.ticketPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-1 text-center d-none d-lg-block">
              <img
                src="../../../../../Images/barcode.png"
                className="imgbarcode"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentReceiptPage;
