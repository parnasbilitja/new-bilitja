import getRawBody from 'raw-body';
import { useRouter } from "next/router";
import globals from '../sources/Global'
import React from "react";
import PaymentReceiptPage from "./../sources/payment_receipt/PaymentReceipt.page";

function  Page({ data,PaymentInfo }) {
  
  
 console.log("top"); 
 console.log(data);
 console.log(PaymentInfo);
 console.log("top2"); 
     
  
  return (
    <div >
  { data.RRN=="" ? 

      <PaymentReceiptPage {...PaymentInfo} />: null
     }

    {data.RRN!="" ?
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#ccc",
    }}>
      <div className="row">
        <div className="col-12 text-center mb-5">
          <img src="../../Images/bilitja.png" className="img-fluid " />
        </div>
        <br />
        <div>
          <h6 className="font-bold-iransanse text-center alert alert-danger">
            {" "}
            خطا: {data.RRN}
          </h6>
        </div>
        <div className="mt-5 text-center">
          <a className="font-bold-iransanse text-center text-danger" href="/">
            بازگشت به صفحه اصلی
          </a>
        </div>
      </div>
      </div>
      : null
}
    </div>
  );


}

//This gets called on every request
export async function getServerSideProps({req}) {
  if(req.method=="POST"){
      const body = await getRawBody(req);
      //  console.log("start")
    //    console.log(body.toString("utf-8"))
        var data={};
        var responsedatapnr ={};
        //var body2="State=Canceled+By+User&StateCode=-1&ResNum=28333&MID=10916111&RefNum=&CID=&TRACENO=&RRN=&SecurePan=";
        String(body.toString("utf-8")).split('&').map(x=>( data[x.split('=')[0]] =x.split('=')[1]));
        console.log("bottom");   
        console.log(data);
        console.log("bottom2");   
      // console.log("end3")
      var refNum = "";
      var error="";
       if (data.RefNum == "") {
         refNum = "0";
       } else {
         refNum = data.RefNum;
       }
       data.RRN="";
     console.log(data.StateCode);
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
          data.RRN = "در موارد چند تراکنشی، تمام تراکنش ها پرداخت ناموفق داشته اند.";
           break;
        
        case "0":
          const response = await fetch(
            `${globals.baseUrl}appCallBackBank/saman/${data.State}/${refNum}/${data.ResNum}/${data.MID}`
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
                         // only for test
                      //   const reqNo = 1;  
                      //   const reqPnr ='qomg9l';
                      //   const responsePnr = await fetch(
                      //    `${globals.baseUrl}onlinePay/reference/${reqPnr}`
                      //  );
                      //   responsedatapnr = await responsePnr.json();
                      //  data.RRN ="";
                      //   break;
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
                         const reqNo = String(responsedata.status).split("|")[0];
                         const reqPnr = String(responsedata.status).split("|")[1];
                         const responsePnr = await fetch(
                          `${globals.baseUrl}onlinePay/reference/${reqPnr}`
                        );
                        responsedatapnr = await responsePnr.json();
                        data.RRN ="";
                         break;
                       }
                     }
                 
             
  }
  return { 
    props: {
    data: data,
    PaymentInfo: responsedatapnr,
  } 
}
}
  return { props: {}  }

}

export default Page

