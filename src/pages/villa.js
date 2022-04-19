import React from "react";
import Head from "next/head";
import NavBar from "./../sources/component/NavBar.component";
import NavBarMobile from "./../sources/component/NavBarMobile.component";
import Footer from "./../sources/component/Footer.component";
import MessageBox from "./../sources/component/MessageBox.component";
import PopUp from "./../sources/component/PopUp.component";
import Account from "./../sources/account/Account.component";
import { connect } from "react-redux";
import { selcetAccountBox } from "../Redux/UI/ui.reselect";
import { accountBoxModify } from "../Redux/UI/ui.action";
import VillaPage from "./../sources/villa/villa.page";
import VillaList from "./../sources/villa_list/villaList.page";
import VillaReserve from "./../sources/villa/villaReserve.page";
// import Vilialist from "./../sources/villa/Vilialist";
import VillaReceipt from "./../sources/villa/villaReceipt.page";
import BecomeMizban from "./../sources/account/BecomeMizban.page";
import { withRouter } from "next/router";
import Vilalistitem from "../sources/villa/Vilalistitem";

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
    if (pathName.indexOf("intro") > 0) {
      return <BecomeMizban />;
    }
    if (pathName.indexOf("reserve") > 0) {
      return <Vilalistitem />;
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

  setTitleMeta(pathName) {
    var src = "";
    var dest = "";
    pathName = decodeURI(pathName);
    switch (this.props.mainRoute) {
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
        <div className={this.state.width <= 826 ? "mt-110" : "mt-90"}>
          {
            this.mainRouter(this.props.router.asPath)
            //console.log(this.props.router)
            //   this.props.router.push("/flights")
          }
          <MessageBox />
          <Footer />
          <Head>
            <title>
              {
                // {`بلیطجا ${decodeURI(this.props.router.asPath).replace('-',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ').replace('/',' ')}`}
                this.setTitleMeta(this.props.router.asPath).split("/")[0]
              }{" "}
            </title>
            <meta
              name="title"
              property="og:title"
              content={
                this.setTitleMeta(this.props.router.asPath).split("/")[0]
              }
            />

            <meta
              name="description"
              property="og:description"
              content={
                this.setTitleMeta(this.props.router.asPath).split("/")[1]
              }
            />
            <meta
              name="keywords"
              property="og:keywords"
              content={
                this.setTitleMeta(this.props.router.asPath).split("/")[2]
              }
            />
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
