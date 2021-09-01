import getRawBody from 'raw-body';
function convertUtftoAscii(str){
    str=str.replaceAll('%24','$');
    str=str.replaceAll('%26','&');
    str=str.replaceAll('%2B','+');
    str=str.replaceAll('%2C',',');
    str=str.replaceAll('%2F','/');
    str=str.replaceAll('%3A',':');
    str=str.replaceAll('%3B',';');
    str=str.replaceAll('%3D','=');
    str=str.replaceAll('%3F','?');
    str=str.replaceAll('%40','@');
    str=str.replaceAll('%3C','<');
    str=str.replaceAll('%3E','>');
    str=str.replaceAll('%23','#');
    str=str.replaceAll('%25','%');
    str=str.replaceAll('%20',' ');
   return str;

}
function Page({ data }) {
  var a="GmshtyjwKSun20WdgeTQP%2BPKL8GFh5Thg3P3xX7qDy"
  console.log("startt"); 
  a=convertUtftoAscii(a);
 console.log(a.toString("utf-8"));
console.log( decodeURI(a.toString("utf-8")));
console.log("end"); 

  // Render data...
  return( <div>{data}</div>)
}

//This gets called on every request
export async function getServerSideProps({req}) {
  // Fetch data from external API
 
  //const data = req.headers["content-type"];
  //const data = req.formdata;

  // Pass data to the page via props
  //return { props: { data } }
  //if (req.method == "POST") {
    
  const body = await getRawBody(req)
    console.log("ssdjdsds")
    console.log(body.toString("utf-8"))
    
   // console.log(body.toJSON())
    console.log("ssdjdsdsaasasaasas")
    const data=JSON.stringify(body.toString());
  //}
  return { props: {data}  }
}

export default Page

// import { useRouter } from "next/router";
// import React from "react";

// const CallbackbankError = () => {
//   const router = useRouter();

//   var error = "";
//  console.log(router);a
//   switch (router.query.status) {
//     case "-1":
//       error = "شما از تراکنش انصراف داده اید.";
//       break;
//     case "-3":
//       error =
//         "پرداخت انجام نشد، در صورت کسر وجه مبلغ با 72 ساعت به حساب شما بازگشت داده می شود.";
//       break;
//     case "-4":
//       error = "متاسفانه مدت زمان انجام تراکنش به اتمام رسیده است.";
//       break;
//     case "-5":
//       error = "اطلاعات ارسال شده نا معتبر است.";
//       break;
//     case "-6":
//       error =
//         "در موارد چند تراکنشی، ازطلاعات موفق از طریق سرویس دیگری ارسال می شود.";
//       break;
//     case "-7":
//       error = "در موارد چند تراکنشی، تمام تراکنش ها پرداخت ناموفق داشته اند.";
//       break;
//     case "-100":
//       error = "کد دریافتی از طرف بانک معتبر نیست.";
//       break;
//     case "-101":
//       error = "کد دریافتی از طرف بانک معتبر نیست.";
//       break;

//     case "-102":
//       error = "کد دریافتی از طرف بانک معتبر نیست.";
//       break;

//     case "-103":
//       error = "بانک تراکنش شما را تایید نکرد";
//       break;

//     case "-104":
//       error = "تراکنش انجام نشد. رزرو برای شما ثبت نشده است";
//       break;

//     case "-105":
//       error =
//         "متاسفانه خطا رخ داده است. ممکن است بلیط صادر شده باشد. خواهشمندیم جهت پیگیری رزرو خود حتما با تلفن پشتیبانی تماس حاصل فرمایید";

//       break;
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         background: "#ccc",
//       }}
//     >
//       <div className="row">
//         <div className="col-12 text-center mb-5">
//           <img src="../../../Images/bilitja.png" className="img-fluid " />
//         </div>
//         <br />
//         <div>
//           <h6 className="font-bold-iransanse text-center alert alert-danger">
//             {" "}
//             خطا: {JSON.stringify(router)}
//           </h6>
//         </div>
//         <div className="mt-5 text-center">
//           <a className="font-bold-iransanse text-center text-danger" href="/">
//             بازگشت به صفحه اصلی
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallbackbankError;
