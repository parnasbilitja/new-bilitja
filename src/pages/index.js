import React from "react";
import Head from "next/head";
//import Styles from '../../styles/icon.module.scss'
//import '../../styles/manager.module.scss'

import dynamic from "next/dynamic";
const Home = dynamic(() => import("./../sources/Home.page"));
// const NavBar = dynamic(() => import("./../sources/component/NavBar.component"));
// const NavBarMobile = dynamic(() =>
//   import("./../sources/component/NavBarMobile.component")
// );
const Footer = dynamic(() => import("./../sources/component/Footer.component"));
const MessageBox = dynamic(() =>
  import("./../sources/component/MessageBox.component")
);
const PopUp = dynamic(() => import("./../sources/component/PopUp.component"));
const Account = dynamic(() => import("./../sources/account/Account.component"));

import { connect } from "react-redux";
import { selcetAccountBox } from "../Redux/UI/ui.reselect";
import { accountBoxModify } from "../Redux/UI/ui.action";
import { withRouter } from "next/router";
import NavHandler from "../Components/share/NavHandler";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 1024,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // mainRouter(pathName) {
  //   pathName = decodeURI(pathName);
  //   switch (this.props.mainRoute) {
  //     case "index": {
  //       return <Home></Home>;
  //     }

  //     default:
  //       return (
  //         <div>
  //           {" "}
  //           {/* <Contextmytitle.Provider value="dark" /> */}
  //           <Home></Home>
  //         </div>
  //       );
  //   }
  // }

  setTitleMeta(pathName) {
    var src = "";
    var dest = "";
    pathName = decodeURI(pathName);
    switch (this.props.mainRoute) {
      case "index": {
        return (
          "خرید اینترنتی بلیط ارزان هواپیما |بلیط استانبول|بلیط جا|02184279999" +
          "/" +
          "ارزانترین قیمت بلیط های هواپیما به استانبول آنتالیا  دنیزلی اسپارتا دبی از1میلیون و 500 هزارتومان و کیش مشهد قشم شیراز را از 300هزار تومان در بین بلیت های ماجستجو و آنلاین خرید کنید|بلیط جا" +
          "/" +
          "بلیط ارزان هواپیما|خرید اینترنتی بلیط هواپیما|بلیط هواپیما تهران به استانبول|بلیط هواپیما کیش|بلیط هواپیما دبی|بلیط هواپیما مشهد|رزرو اینترنتی بلیط هواپیما مشهد"
        );
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
        <NavHandler />
        <div className={this.state.width <= 826 ? "mt-100" : "mt-90"}>
          {
            // this.mainRouter(this.props.router.asPath)
            //console.log(this.props.router)
            //   this.props.router.push("/flights")
            <Home />
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
