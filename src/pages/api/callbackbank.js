import { redirect } from "next/dist/next-server/server/api-utils";
import globals from "../../sources/Global";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    //{"message":{"State":"Canceled By User","StateCode":"-1","ResNum":"28284","MID":"10916111","RefNum":"","CID":"","TRACENO":"","RRN":"","SecurePan":""}}
    //    [Route("api/appCallBackBank/saman/{state}/{refNum}/{resNum}/{mid}")]

    var refNum = "";

    if (body.RefNum == "") {
      refNum = "0";
    } else {
      refNum = body.RefNum;
    }

    switch (body.StateCode) {
      case 1:
        `http://${req.headers.host}/callbackbank-error?status=1`;
        break;
      case 3:
        `http://${req.headers.host}/callbackbank-error?status=3`;
        break;
      case 4:
        `http://${req.headers.host}/callbackbank-error?status=4`;
        break;
      case 5:
        `http://${req.headers.host}/callbackbank-error?status=5`;
        break;
      case 6:
        `http://${req.headers.host}/callbackbank-error?status=6`;
        break;
      case 7:
        `http://${req.headers.host}/callbackbank-error?status=7`;
        break;
      default:
        const response = await fetch(
          `${globals.baseUrl}appCallBackBank/saman/${body.StateCode}/${refNum}/${body.ResNum}/${body.MID}`
        );
        const data = await response.json();

        switch (data.status) {
          case "-100":
            res.redirect(`http://${req.headers.host}/callbackbank-error?-100`);
            break;
          case "-101":
            res.redirect(
              `http://${req.headers.host}/callbackbank-error?status=-101`
            );
            break;

          case "-102":
            res.redirect(
              `http://${req.headers.host}/callbackbank-error?status=-102`
            );
            break;

          case "-103":
            res.redirect(
              `http://${req.headers.host}/callbackbank-error?status=-103`
            );
            break;

          case "-104":
            res.redirect(
              `http://${req.headers.host}/callbackbank-error?status=-104`
            );
            break;

          case "-105":
            res.redirect(
              `http://${req.headers.host}/callbackbank-error?status=-105`
            );
            break;

          default: {
            const reqNo = String(data.status).split("|")[0];
            const reqPnr = String(data.status).split("|")[1];
            res.redirect(
              `http://${req.headers.host}/payment-receipt?reqPnr${reqPnr}&reqNo=${reqNo}`
            );
            break;
          }
        }
    }
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
            const reqNo = String(data.status).split("|")[0];
            const reqPnr = String(data.status).split("|")[1];
            //res.send(data.status) ;
            // if (data.status.search("|") != -1) {

            //   // router.push(`/payment-receipt/?reqPnr=${reqPnr}&reqNo=${reqNo}`);
            // } else {
            //   res.send("بانک تراکنش شما را تایید نکرد");
            // }
            break;
          }
        }
      });
  }
}
