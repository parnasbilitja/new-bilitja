import { useRouter } from "next/dist/client/router";
import { redirect } from "next/dist/next-server/server/api-utils";
import globals from "../../sources/Global";

export default function handler(req, res) {
  const router = useRouter();
  if (req.method == "POST") {
    const body = JSON.parse(req.body);

    //{"message":{"State":"Canceled By User","StateCode":"-1","ResNum":"28284","MID":"10916111","RefNum":"","CID":"","TRACENO":"","RRN":"","SecurePan":""}}
    //    [Route("api/appCallBackBank/saman/{state}/{refNum}/{resNum}/{mid}")]
    fetch(
      `${globals.baseUrl}appCallBackBank/saman/${body.message.StateCode}/${body.message.RefNum}/${body.message.ResNum}/${body.message.MID}`
    )
      .then((res) => res.json())
      .then((data) => {
        //res.status(200).send(body.message.State);
        switch (data.status) {
          case "-100":
            res.send("کد دریافتی از طرف بانک معتبر نیست.");
            break;
          case "-101":
            res.send("کد دریافتی از طرف بانک معتبر نیست.");
            break;

          case "-102":
            res.send("کد دریافتی از طرف بانک معتبر نیست.");
            break;

          case "-103":
            res.send("بانک تراکنش شما را تایید نکرد");
            break;

          case "-104":
            res.send("تراکنش انجام نشد. رزرو برای شما ثبت نشده است");
            break;

          case "-105":
            res.send(
              "متاسفانه خطا رخ داده است. ممکن است بلیط صادر شده باشد. خواهشمندیم جهت پیگیری رزرو خود حتما با تلفن پشتیبانی تماس حاصل فرمایید"
            );
            break;

          default: {
            //res.send(data.status) ;
            if (data.status.search("|") != -1) {
              reqNo = String(data.status).split("|")[0];
              reqPnr = String(data.status).split("|")[1];
              router.push(`/payment-receipt/?reqPnr=${reqPnr}&reqNo=${reqNo}`);
            } else {
              res.send("بانک تراکنش شما را تایید نکرد");
            }

            break;
          }
        }
      });
  } else {
    //const body2=JSON.parse(req.query);

    //res.send(req.query.ResNum);
    //  res.status(200).send({message :req.query});
    // http://localhost:3000/api/callbackbank?StateCode=-1&ResNum=28284&MID=10916111&RefNum=1
    //   res.send( body.StateCode)

    fetch(
      `${globals.baseUrl}appCallBackBank/saman/${req.query.StateCode}/${req.query.RefNum}/${req.query.ResNum}/${req.query.MID}`
    )
      .then((res) => res.json())
      .then((data) => {
        // res.send(data);
        switch (data.status) {
          case "-100":
            res.send(data.message);
            break;
          case "-101":
            res.send(data.message);
            break;

          case "-102":
            res.send(data.message);
            break;

          case "-103":
            res.send("-103");
            break;

          case "-104":
            res.send(data.message);
            break;

          case "-105":
            res.send(data.message);
            break;

          default: {
            res.send(data.status);
            fetch(
              `${globals.baseUrl}onlinePay/reference/${this.state.trackRef}`
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                this.setState({ ...data });
              });
            break;
          }
        }
      });
  }
}
