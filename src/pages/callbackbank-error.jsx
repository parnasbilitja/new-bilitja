import { useRouter, withRouter } from "next/router";
import React from "react";

const CallbackbankError = () => {
  const router = useRouter();

  var error = "";

  switch (router.query.status) {
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
          <img src="/images/bilitja.png" className="img-fluid " />
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
};

export default withRouter(CallbackbankError);
