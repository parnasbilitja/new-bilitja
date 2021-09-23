import React from "react";
import Head from 'next/head'
//import Styles from '../../styles/icon.module.scss'
//import '../../styles/manager.module.scss'

import Home from "./Home.page";

import NavBar from "./component/NavBar.component";
import NavBarMobile from "./component/NavBarMobile.component";
import Footer from "./component/Footer.component";
import MessageBox from "./component/MessageBox.component";
import PopUp from "./component/PopUp.component";
import Account from "./account/Account.component";

import { connect } from "react-redux";
import { selcetAccountBox } from "../Redux/UI/ui.reselect";
import { accountBoxModify } from "../Redux/UI/ui.action";

import VillaPage from "./villa/villa.page";
import VillaList from "./villa_list/villaList.page";
import VillaReserve from "./villa/villaReserve.page";
import VillaReceipt from "./villa/villaReceipt.page";

import GetFlightList from "./flight_List/GetFlightList.page";
import FlightReserve from "./flight_reserve/FlightReseve.page";
import FlightReciept from "./flight_receipt/FlightReciept.page";
import TrackOrder from "./report/TrackOrder.page";

import BecomeMizban from "./account/BecomeMizban.page";
import { withRouter } from "next/router";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      width: 1024,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  mainRouter(pathName) {
    pathName = decodeURI(pathName);
    switch (this.props.mainRoute) {
      case "index": {
        return <Home></Home> ;
      }
      case "flights": {
        if (pathName.indexOf("info") > 0) {
          console.log("flightreserve from home");
          return <FlightReserve />;
        } else if (pathName.indexOf("receipt") > 0) {
          return <FlightReciept />;
        } else if (pathName.indexOf("order") > 0) {
          return <TrackOrder />;
        } else {
          return <GetFlightList />;
        }
      }
      case "villa": {
        if (pathName.indexOf("intro") > 0) {
          return <BecomeMizban />;
        }
        if (pathName.indexOf("reserve") > 0) {
          return <VillaReserve />;
        }
        if (pathName.indexOf("receipt") > 0) {
          return <VillaReceipt />;
        }
        if (pathName.length < 7) {
          return <VillaPage />;
        } else {
          return <VillaList />;
        }
      }

      default:
        return <div> <Contextmytitle.Provider value="dark"/><Home></Home></div>;
    }
  }

  setTitleMeta(pathName) {
    var src="";
    var dest="";
    pathName = decodeURI(pathName);
    switch (this.props.mainRoute) {
      case "index": {
        return   "خرید اینترنتی بلیط ارزان هواپیما |بلیط استانبول|بلیط جا|02184279999" 
        +"/"+
        "ارزانترین قیمت بلیط های هواپیما به استانبول آنتالیا  دنیزلی اسپارتا دبی از1میلیون و 500 هزارتومان و کیش مشهد قشم شیراز را از 300هزار تومان در بین بلیت های ماجستجو و آنلاین خرید کنید|بلیط جا" 
        +"/"+
        "بلیط ارزان هواپیما|خرید اینترنتی بلیط هواپیما|بلیط هواپیما تهران به استانبول|بلیط هواپیما کیش|بلیط هواپیما دبی|بلیط هواپیما مشهد|رزرو اینترنتی بلیط هواپیما مشهد"
        ;
      }
      case "flights": {
        if (pathName.indexOf("info") > 0) {
          
          return "بلیطجا";     //<FlightReserve />;
        } else if (pathName.indexOf("receipt") > 0) {
          return "بلیطجا";     //<FlightReciept />;
        } else if (pathName.indexOf("order") > 0) {
          return "بلیطجا";     //<TrackOrder />;
        } else {
          src = decodeURI(pathName.split("/")[2]);
          dest = decodeURI(pathName.split("/")[3]);
           
          return " خرید اینترنتی بلیط هواپیما "+src+"-"+dest+" با ارزانترین قیمت|20درصد تخفیف بلیطجا  "
          +"/"+
          "خرید اینترنتی بلیط هواپیما "+src+" به "+dest+" به بهترین نرخ با امکان رزرو آنلاین و اینترنتی  به همراه ارزانترین قیمت  بلیط هواپیما و هتل در سایت بلیط جا امکان پذیر است . 02184279999 "
          +"/"+
          " بلیط ارزان هواپیما "+src+" به "+dest+"|خرید اینترنتی بلیط هواپیما "+src+" به "+dest+""
          
          ;     //<GetFlightList />;
        }
      }
      case "villa": {
        if (pathName.indexOf("intro") > 0) {
          return  "بلیطجا";     //<BecomeMizban />;
        }
        if (pathName.indexOf("reserve") > 0) {
          return  "بلیطجا";     //<VillaReserve />;
        }
        if (pathName.indexOf("receipt") > 0) {
          return  "بلیطجا";     //<VillaReceipt />;
        }
        if (pathName.length < 7) {
          return  "رزرو آنلاین و اینترنتی اقامتگاه و ویلا در سراسر ایران|بلیط جا 0184279999 "
          +"/"+
          "ویلا و اقامتگاه مورد نیاز خود را ازبین هزاران ویلا و اقامتگاه تمیز و اکونومی موجوداز شبی 100هزار تومان در بلیط جا با بهترین میزبان ها در تمام شهرهای ایران جستجو و آنلاین خرید کنید"
          +"/"+
          "خرید اینترنتی اقامتگاه|رزرو آنلاین ویلا|اقامتگاه لوکس و تمیز"
          ;     //<VillaPage />;
        } else {
          return  "رزرو آنلاین و اینترنتی اقامتگاه و ویلا در سراسر ایران|بلیط جا 0184279999 "
          +"/"+
          "ویلا و اقامتگاه مورد نیاز خود را ازبین هزاران ویلا و اقامتگاه تمیز و اکونومی موجوداز شبی 100هزار تومان در بلیط جا با بهترین میزبان ها در تمام شهرهای ایران جستجو و آنلاین خرید کنید"
          +"/"+
          "خرید اینترنتی اقامتگاه|رزرو آنلاین ویلا|اقامتگاه لوکس و تمیز"
          ;     //<VillaList />;
        }
      }

      default:
        return  "خرید اینترنتی بلیط ارزان هواپیما |بلیط استانبول|بلیط جا|02184279999" 
        +"/"+
        "ارزانترین قیمت بلیط های هواپیما به استانبول آنتالیا دنیزلی اسپارتااز1میلیون تومان و کیش مشهد قشم شیراز را از 300هزار تومان را در بین بلیت های ما آنلاین خرید کنید|بلیط جا" 
        +"/"+
        "بلیط ارزان هواپیما|خرید اینترنتی بلیط هواپیما|بلیط هواپیما تهران به استانبول|بلیط هواپیما کیش|بلیط هواپیما دبی|بلیط هواپیما مشهد|رزرو اینترنتی بلیط هواپیما مشهد"
        ;     //<Home></Home>;
    }
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }
  render() {
    return (
      <div className="bodyVar">
        {this.state.width <= 826 ? <NavBarMobile /> : null}
        {this.state.width >= 826 ? <NavBar /> : null}
        <div
          style={
            this.state.width <= 826 ? { marginTop: 110 } : { marginTop: 90 }
          }
          className="font-"
        >
          {
            this.mainRouter(this.props.router.asPath)
            //console.log(this.props.router)
            //   this.props.router.push("/flights")
          }
          <MessageBox />
          <Footer />
          <Head>
        <title>{ 
        // {`بلیطجا ${decodeURI(this.props.router.asPath).replace('-',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ')}`}
         this.setTitleMeta(this.props.router.asPath).split("/")[0]
        } </title>
         <meta name="title" property="og:title" content={
            this.setTitleMeta(this.props.router.asPath).split("/")[0]
         }  />

         <meta name="description" property="og:description" content={
            this.setTitleMeta(this.props.router.asPath).split("/")[1]
         }  />
         <meta name="keywords" property="og:keywords" content={
            this.setTitleMeta(this.props.router.asPath).split("/")[2]
         }  />
      </Head>
        </div>
        <PopUp
          opened={this.props.accountBox.state}
          closePopUp={() => {
            this.props.accountBoxModify({
              state: false,
            });
          }}
        >
          <Account />
        </PopUp>
      </div>
    );
  }
}
const mapStatesToProps = (state) => ({
  accountBox: selcetAccountBox(state),
});
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
export default withRouter(connect(mapStatesToProps, mapDispatchesToProps)(App));
