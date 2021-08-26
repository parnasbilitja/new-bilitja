import getRawBody from 'raw-body';
import { useRouter } from "next/router";
function  Page({ data }) {
  const myRouter = useRouter();
 // myRouter.push(`./callbackbank-error?status=-1`);
 console.log("top"); 
 console.log(data);
 console.log("top2"); 
  var refNum = "";
 var error="";
  if (data.RefNum == "") {
    refNum = "0";
  } else {
    refNum = data.RefNum;
  }
console.log(data.StateCode);
  switch (data.StateCode) {
    // case "-1":
    //   myRouter.push(`./callbackbank-error?status=-1`);
      
    //   break;
    // case "-3":
    //   myRouter.push(`./callbackbank-error?status=-3`);
    //   break;
    // case "-4":
    //   myRouter.push(`./callbackbank-error?status=-4`);
    //   break;
    // case "-5":
    //   myRouter.push(`./callbackbank-error?status=-5`);
    //   break;
    // case "-6":
    //   myRouter.push(`./callbackbank-error?status=-6`);
    //   break;
    // case "-7":
    //   myRouter.push(`./callbackbank-error?status=-7`);
    //   break;
    case "-1":
      error = "شما از تراکنش انصراف داده اید.";
      break;
    case "-3":
      error =
        "پرداخت انجام نشد، در صورت کسر وجه مبلغ با 72 ساعت به حساب شما بازگشت داده می شود.";
      break;
    case "-4":
      error = "متاسفانه مدت زمان انجام تراکنش به اتمام رسیده است.";
      break;
    case "-5":
      error = "اطلاعات ارسال شده نا معتبر است.";
      break;
    case "-6":
      error =
        "در موارد چند تراکنشی، ازطلاعات موفق از طریق سرویس دیگری ارسال می شود.";
      break;
    case "-7":
      error = "در موارد چند تراکنشی، تمام تراکنش ها پرداخت ناموفق داشته اند.";
      break;
   
    default:
      fetch(`${globals.baseUrl}appCallBackBank/saman/${data.StateCode}/${refNum}/${data.ResNum}/${data.MID}`)
      .then(res => res.json()).then(data => { 
                switch (data.status) {
                  case "-100":
                    error = "کد دریافتی از طرف بانک معتبر نیست.";
                    break;
                  case "-101":
                    error = "کد دریافتی از طرف بانک معتبر نیست.";
                    break;
              
                  case "-102":
                    error = "کد دریافتی از طرف بانک معتبر نیست.";
                    break;
              
                  case "-103":
                    error = "بانک تراکنش شما را تایید نکرد";
                    break;
              
                  case "-104":
                    error = "تراکنش انجام نشد. رزرو برای شما ثبت نشده است";
                    break;
              
                  case "-105":
                    error =
                      "متاسفانه خطا رخ داده است. ممکن است بلیط صادر شده باشد. خواهشمندیم جهت پیگیری رزرو خود حتما با تلفن پشتیبانی تماس حاصل فرمایید";
                    break;

                  default: {
                    const reqNo = String(data.status).split("|")[0];
                    const reqPnr = String(data.status).split("|")[1];
                    myRouter.push(
                      `./payment-receipt?reqPnr${reqPnr}&reqNo=${reqNo}`
                    );
                    break;
                  }
                }
      })
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#ccc",
      }}
    >
      <div className="row">
        <div className="col-12 text-center mb-5">
          <img src="../../../Images/bilitja.png" className="img-fluid " />
        </div>
        <br />
        <div>
          <h6 className="font-bold-iransanse text-center alert alert-danger">
            {" "}
            خطا: {error}
          </h6>
        </div>
        <div className="mt-5 text-center">
          <a className="font-bold-iransanse text-center text-danger" href="/">
            بازگشت به صفحه اصلی
          </a>
        </div>
      </div>
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
        //var body2="State=Canceled+By+User&StateCode=-1&ResNum=28333&MID=10916111&RefNum=&CID=&TRACENO=&RRN=&SecurePan=";
        String(body.toString("utf-8")).split('&').map(x=>( data[x.split('=')[0]] =x.split('=')[1]));
        console.log("bottom");   
        console.log(data);
        console.log("bottom2");   
      // console.log("end3")
        return { props: {data}  }
  }
  return { props: {}  }
}


export default Page

