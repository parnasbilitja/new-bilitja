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
        res.redirect(`../callbackbank-error?status=1`);
        break;
      case 3:
        res.redirect(`../callbackbank-error?status=3`);
        break;
      case 4:
        res.redirect(`../callbackbank-error?status=4`);
        break;
      case 5:
        res.redirect(`../callbackbank-error?status=5`);
        break;
      case 6:
        res.redirect(`../callbackbank-error?status=6`);
        break;
      case 7:
        res.redirect(`../callbackbank-error?status=7`);
        break;
      default:
        const response = await fetch(
          `${globals.baseUrl}appCallBackBank/saman/${body.StateCode}/${refNum}/${body.ResNum}/${body.MID}`
        );
        const data = await response.json();

        switch (data.status) {
          case "-100":
            res.redirect(`../callbackbank-error?-100`);
            break;
          case "-101":
            res.redirect(
              `../callbackbank-error?status=-101`
            );
            break;

          case "-102":
            res.redirect(
              `../callbackbank-error?status=-102`
            );
            break;

          case "-103":
            res.redirect(
              `../callbackbank-error?status=-103`
            );
            break;

          case "-104":
            res.redirect(
              `../callbackbank-error?status=-104`
            );
            break;

          case "-105":
            res.redirect(
              `../callbackbank-error?status=-105`
            );
            break;

          default: {
            const reqNo = String(data.status).split("|")[0];
            const reqPnr = String(data.status).split("|")[1];
            res.redirect(
              `../payment-receipt?reqPnr${reqPnr}&reqNo=${reqNo}`
            );
            break;
          }
        }
    }
  } 
}
