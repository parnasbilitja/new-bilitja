import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import BecomeMizban from '../../sources/account/BecomeMizban.page';
import Footer from '../../sources/component/Footer.component';
import MessageBoxComponent from '../../sources/component/MessageBox.component';
import NavBarComponent from '../../sources/component/NavBar.component';
import NavBarMobileComponent from '../../sources/component/NavBarMobile.component';
import Vilalistitem from '../../sources/villa/Vilalistitem';
import VillaPage from '../../sources/villa/villa.page';
import VillaReceiptPage from '../../sources/villa/villaReceipt.page';

const Villa = (props) => {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.innerWidth)
    },[])
    const [type, setType] = useState(4) 

    const mainRouter = (pathName) => {
      pathName = decodeURI(pathName);
      if (pathName.indexOf("intro") > 0) {
        return <BecomeMizban />;
      }
      if (pathName.indexOf("reserve") > 0) {
        return <Vilalistitem />;
      }
      if (pathName.indexOf("receipt") > 0) {
        return <VillaReceiptPage />;
      }
      if (pathName.length < 7) {
        return <VillaPage />;
      } else {
        return <VillaList />;
      }
    }
  
    const setTitleMeta = (pathName) => {
      var src = "";
      var dest = "";
      pathName = decodeURI(pathName);
      switch (props.mainRoute) {
        case "villa": {
          if (pathName.indexOf("intro") > 0) {
            return "بلیطجا"; //<BecomeMizban />;
          }
          if (pathName.indexOf("reserve") > 0) {
            return "بلیطجا"; //<VillaReserve />;
          }
          if (pathName.indexOf("receipt") > 0) {
            return "بلیطجا"; //<VillaReceipt />;
          }
          if (pathName.length < 7) {
            return (
              "رزرو آنلاین و اینترنتی اقامتگاه و ویلا در سراسر ایران|بلیط جا 0184279999 " +
              "/" +
              "ویلا و اقامتگاه مورد نیاز خود را ازبین هزاران ویلا و اقامتگاه تمیز و اکونومی موجوداز شبی 100هزار تومان در بلیط جا با بهترین میزبان ها در تمام شهرهای ایران جستجو و آنلاین خرید کنید" +
              "/" +
              "خرید اینترنتی اقامتگاه|رزرو آنلاین ویلا|اقامتگاه لوکس و تمیز"
            ); //<VillaPage />;
          } else {
            return (
              "رزرو آنلاین و اینترنتی اقامتگاه و ویلا در سراسر ایران|بلیط جا 0184279999 " +
              "/" +
              "ویلا و اقامتگاه مورد نیاز خود را ازبین هزاران ویلا و اقامتگاه تمیز و اکونومی موجوداز شبی 100هزار تومان در بلیط جا با بهترین میزبان ها در تمام شهرهای ایران جستجو و آنلاین خرید کنید" +
              "/" +
              "خرید اینترنتی اقامتگاه|رزرو آنلاین ویلا|اقامتگاه لوکس و تمیز"
            ); //<VillaList />;
          }
        }
  
        default:
          return (
            "خرید اینترنتی بلیط ارزان هواپیما |بلیط استانبول|بلیط جا|02184279999" +
            "/" +
            "ارزانترین قیمت بلیط های هواپیما به استانبول آنتالیا دنیزلی اسپارتااز1میلیون تومان و کیش مشهد قشم شیراز را از 300هزار تومان را در بین بلیت های ما آنلاین خرید کنید|بلیط جا" +
            "/" +
            "بلیط ارزان هواپیما|خرید اینترنتی بلیط هواپیما|بلیط هواپیما تهران به استانبول|بلیط هواپیما کیش|بلیط هواپیما دبی|بلیط هواپیما مشهد|رزرو اینترنتی بلیط هواپیما مشهد"
          ); //<Home></Home>;
      }
    }
    return (
        <>
         {width <= 826 ? <NavBarMobileComponent /> : null}
        {width >= 826 ? <NavBarComponent /> : null}
        <div className={width <= 826 ? "mt-100" : "mt-100"}>
        
          {
            mainRouter(props.router.asPath)
            //console.log(props.router)
            //   props.router.push("/flights")
          }
          <MessageBoxComponent />
          <Footer />
          <Head>
            <title>
              {
                // {`بلیطجا ${decodeURI(props.router.asPath).replace('-',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ')}`}
                setTitleMeta(props.router.asPath).split("/")[0]
              }{" "}
            </title>
            <meta
              name="title"
              property="og:title"
              content={
                setTitleMeta(props.router.asPath).split("/")[0]
              }
            />

            <meta
              name="description"
              property="og:description"
              content={
                setTitleMeta(props.router.asPath).split("/")[1]
              }
            />
            <meta
              name="keywords"
              property="og:keywords"
              content={
                setTitleMeta(props.router.asPath).split("/")[2]
              }
            />
          </Head>
        </div>   
        </>
    );
};

export default Villa;