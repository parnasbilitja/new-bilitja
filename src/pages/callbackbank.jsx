import getRawBody from 'raw-body';
import { useRouter } from "next/router";
function Page({ body }) {
  const myRouter = useRouter();
 // myRouter.push(`./callbackbank-error?status=-1`);

  var refNum = "";

  if (body.RefNum == "") {
    refNum = "0";
  } else {
    refNum = body.RefNum;
  }
console.log(body.StateCode);
  switch (body.StateCode) {
    case "-1":
      myRouter.push(`./callbackbank-error?status=-1`);
      
      break;
    case "-3":
      myRouter.push(`./callbackbank-error?status=-3`);
      break;
    case "-4":
      myRouter.push(`./callbackbank-error?status=-4`);
      break;
    case "-5":
      myRouter.push(`./callbackbank-error?status=-5`);
      break;
    case "-6":
      myRouter.push(`./callbackbank-error?status=-6`);
      break;
    case "-7":
      myRouter.push(`./callbackbank-error?status=-7`);
      break;
    default:
      fetch(`${globals.baseUrl}appCallBackBank/saman/${body.StateCode}/${refNum}/${body.ResNum}/${body.MID}`)
      .then(res => res.json()).then(data => { 
                switch (data.status) {
                  case "-100":
                    myRouter.push(`./callbackbank-error?status=-100`);
                    break;
                  case "-101":
                    myRouter.push(
                      `./callbackbank-error?status=-101`
                    );
                    break;

                  case "-102":
                    myRouter.push(
                      `./callbackbank-error?status=-102`
                    );
                    break;

                  case "-103":
                    myRouter.push(
                      `./callbackbank-error?status=-103`
                    );
                    break;

                  case "-104":
                    myRouter.push(
                      `./callbackbank-error?status=-104`
                    );
                    break;

                  case "-105":
                    myRouter.push(
                      `./callbackbank-error?status=-105`
                    );
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

  return( <div>
    <div>
    {data}
    </div>
   
    </div>)
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
      //    console.log(data.ResNum);
      // console.log("end3")
        return { props: {data}  }
  }
  return { props: {}  }
}

export default Page

