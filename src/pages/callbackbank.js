import getRawBody from "raw-body";
import { useRouter } from "next/router";
import globals from "../sources/Global";
import React from "react";
import PaymentReceiptPage from "../sources/payment_receipt/PaymentReceiptPage1.js";
function convertUtftoAscii(str) {
  // 
  while (str.indexOf("%") > 0) {
    str = String(str).replace("%24", "$");
    str = String(str).replace("%26", "&");
    str = String(str).replace("%2B", "+");
    str = String(str).replace("%2C", ",");
    str = String(str).replace("%2F", "/");
    str = String(str).replace("%3A", ":");
    str = String(str).replace("%3B", ";");
    str = String(str).replace("%3D", "=");
    str = String(str).replace("%3F", "?");
    str = String(str).replace("%40", "@");
    str = String(str).replace("%3C", "<");
    str = String(str).replace("%3E", ">");
    str = String(str).replace("%23", "#");
    str = String(str).replace("%25", "%");
    str = String(str).replace("%20", " ");
  }
  return str;
}

function Page({ data, PaymentInfo }) {
//const Page({ data, PaymentInfo }) {
  // data = {
  //   "State": "OK",
  //   "StateCode": "0",
  //   "ResNum": "448",
  //   "MID": "12744533",
  //   "RefNum": "GmshtyjwKSvL23GuW46io1Zwg6svwf92r+PpzMuu2+",
  //   "CID": "375A208E1003F49985E3A945BD477CE2AFFD84FEA3617391FB1878F7E3389FFC",
  //   "TRACENO": "490537",
  //   "RRN": "",
  //   "Amount": "161000",
  //   "website": "bilitja.com",
  //   "SecurePan": "621986******8151"
  // }
  // PaymentInfo = {
  //   "referenceEbank": {
  //       "reqNo": 2943,
  //       "reqPnr": "y3bhb8",
  //       "customerId": "1a157116-a01a-4027-ab10-74098ac63815",
  //       "amount": 161000,
  //       "stat": "پرداخت موفق",
  //       "bankName": "بانک سامان",
  //       "authority": "448",
  //       "resCode": "OK",
  //       "saleOrderId": "448",
  //       "saleReferenceId": "GmshtyjwKSvL23GuW46io1Zwg6svwf92r+PpzMuu2+",
  //       "dateTimeSabt": "1401-12-17",
  //       "nameFamily": "AFSARPOUR",
  //       "mobileNo": "09172545290",
  //       "dsc": null,
  //       "knd": 1
  //   },
  //   "referenceFlight": [
  //       {
  //           "reqNo": 2943,
  //           "reqPnr": "Y3BHB8",
  //           "airport1": "تهران",
  //           "airport2": "قشم",
  //           "airline": "چابهار",
  //           "flightDay": "پنج شنبه",
  //           "flightDate": "1401-12-18",
  //           "flightTime": "17:50",
  //           "flightDateTime": "2023-03-09T17:50:00",
  //           "flightNo": "8774",
  //           "flightClass": "اکونومی",
  //           "pathKind": 1,
  //           "numADL": 1,
  //           "numCHD": 0,
  //           "numINF": 0,
  //           "priceADL": 161000,
  //           "priceCHD": 161000,
  //           "priceINF": 51000,
  //           "feeGet": 161000,
  //           "name": "hossein",
  //           "family": "afsarpour",
  //           "nameEn": "HOSSEIN",
  //           "familyEn": "AFSARPOUR",
  //           "meliCode": "4220745191",
  //           "ticketName": "بزرگسال",
  //           "ticketNo": "564441",
  //           "sex": 1,
  //           "meliat": "IR",
  //           "ticketPrice": 161000,
  //           "mobileNo": "09172545290"
  //       }
  //   ],
  //   "referenceHotel": null,
  //   "referenceBus": null,
  //   "status": "0",
  //   "message": "OK"
  // }
  // 
  // 
  // 
  // 


  return (
    <div>
      {data.RRN == "" ? <PaymentReceiptPage {...PaymentInfo} /> : null}

      {data.RRN != "" ? (
        <div className="callback-bank-container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <img
                width=""
                height=""
                alt=""
                src="../../Images/bilitja.webp"
                className="img-fluid "
              />
            </div>
            <br />
            <div>
              <h6 className="font-bold-iransanse text-center alert alert-danger">
                {" "}
                خطا: {data.RRN}
              </h6>
            </div>
            <div className="mt-5 text-center">
              <a
                className="font-bold-iransanse text-center text-danger"
                href="/"
              >
                بازگشت به صفحه اصلی
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

//This gets called on every request
//export const getServerSideProps = async (req) => {
export async function getServerSideProps({ req }) {
  // 
  if (req.method == "POST")
  {
    const body = await getRawBody(req);
    //  console.log("start")
    //    console.log(body.toString("utf-8"))
    var data = {};
    var responsedatapnr = {};
    //var body2="State=Canceled+By+User&StateCode=-1&ResNum=28333&MID=10916111&RefNum=&CID=&TRACENO=&RRN=&SecurePan=";
    String(body.toString())
      .split("&")
      .map((x) => (data[x.split("=")[0]] = x.split("=")[1]));

    // 
    // 
    // 
    // console.log("end3")
    var refNum = "";
    var error = "";
    //data.RefNum="sdsssdds%2F%2B%2F%2B";

    if (data.RefNum == "") {
      refNum = "0";
    } else {
      data.RefNum = convertUtftoAscii(data.RefNum);
      refNum = data.RefNum;
    }
    data.RRN = "";
    // 
    data.StateCode ="0" ; // موقت برای تست

    switch (data.StateCode) {
      case "-1":
        data.RRN = "شما از تراکنش انصراف داده اید.";
        break;
      case "-3":
        data.RRN =
          "پرداخت انجام نشد، در صورت کسر وجه مبلغ با 72 ساعت به حساب شما بازگشت داده می شود.";
        break;
      case "-4":
        data.RRN = "متاسفانه مدت زمان انجام تراکنش به اتمام رسیده است.";
        break;
      case "-5":
        data.RRN = "اطلاعات ارسال شده نا معتبر است.";
        break;
      case "-6":
        data.RRN =
          "در موارد چند تراکنشی، ازطلاعات موفق از طریق سرویس دیگری ارسال می شود.";
        break;
      case "-7":
        data.RRN =
          "در موارد چند تراکنشی، تمام تراکنش ها پرداخت ناموفق داشته اند.";
        break;

      case "0":
        const response = await fetch(
          `${globals.baseUrlNew}appCallBackBank/AppCallBackBank/saman`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              state: data.State,
              refNum: refNum,
              resNum: data.ResNum,
              mid: data.MID,
              userId: "",//localStorage.getItem("token"),
              customerId: "1a157116-a01a-4027-ab10-74098ac63815",
              hostname: "bilitja.com",
              agencyName: "بلیطجا",
              telNumber: "02157874"

            }),
          }
        );

        const responsedata = await response.json();

        switch (responsedata.status) {
          case "-100":
            data.RRN = "کد دریافتی از طرف بانک معتبر نیست.";
            break;
          case "-101":
            data.RRN = "کد دریافتی از طرف بانک معتبر نیست.";
            break;

          case "-102":
            data.RRN = "کد دریافتی از طرف بانک معتبر نیست.";
            break;

          case "-103":
            data.RRN = "بانک تراکنش شما را تایید نکرد";
            break;

          case "-104":
            data.RRN = "تراکنش انجام نشد. رزرو برای شما ثبت نشده است";
            break;

          case "-105":
            data.RRN =
              "متاسفانه خطا رخ داده است. ممکن است بلیط صادر شده باشد. خواهشمندیم جهت پیگیری رزرو خود حتما با تلفن پشتیبانی تماس حاصل فرمایید";
            break;

          default: {
            if (String(responsedata.status).indexOf("|") > 0) {
              const reqNo = String(responsedata.status).split("|")[0];
              const reqPnr = String(responsedata.status).split("|")[1];
              const responsePnr = await fetch(
                `${globals.baseUrlNew}OnlinePay/api/onlinePay/reference/${reqPnr}/1a157116-a01a-4027-ab10-74098ac63815`
              );
              responsedatapnr = await responsePnr.json();
              data.RRN = "";
            } else {
              data.RRN =
                "خطای ناشناخته : متاسفانه خطا رخ داده است. ممکن است بلیط صادر شده باشد. خواهشمندیم جهت پیگیری رزرو خود حتما با تلفن پشتیبانی تماس حاصل فرمایید" +
                responsedata.status;
            }
            break;
          }
        }
    }
    return {
      props: {
        data: data,
        PaymentInfo: responsedatapnr,
      },
    };
  }

//  return { props: {PaymentInfo: responsedatapnr2} };
  return { props: {} };
}

export default Page;
