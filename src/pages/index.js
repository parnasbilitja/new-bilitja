import React from "react";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("./../sources/Home.page"), { ssr: false });
const Footer = dynamic(() => import("./../sources/component/Footer.component"), { ssr: false });
const MessageBox = dynamic(() =>import("./../sources/component/MessageBox.component"), { ssr: false });
const PopUp = dynamic(() => import("./../sources/component/PopUp.component"), { ssr: false });
const Account = dynamic(() => import("./../sources/account/Account.component"), { ssr: false });
const List = dynamic(()=>import( "../sources/tour/List"), { ssr: false });
const HotelsSuggest = dynamic(()=>import( "../sources/tour/HotelsSuggest"), { ssr: false });
const CitiesSuggest = dynamic(()=>import( "../sources/tour/CitiesSuggest"), { ssr: false });
const Posts = dynamic(()=>import( "../sources/tour/Posts"), { ssr: false });

import { connect } from "react-redux";
import { selcetAccountBox } from "../Redux/UI/ui.reselect";
import { accountBoxModify } from "../Redux/UI/ui.action";
import { withRouter } from "next/router";
import NavHandler from "../Components/share/NavHandler";
import Scrolltoprefresh from "../sources/component/Scrolltoprefresh";
import HeadSeo from "../sources/component/HeadSeo";
import TicketDetails from "../sources/component/TicketDetails";
import Head from "next/head";
import BirthDayParentCl from "../sources/calendar/BirthDayParentCl";
const App = (props) =>  {
    return (
      <div className="bodyVar">
        <NavHandler />
        <Scrolltoprefresh/>
        <div className={"mt-100"}>
          <Home type={'index'} />
          <div className="col-md-10 m-auto">
          <List  />
          <HotelsSuggest />
          <CitiesSuggest />
            <Posts/>
          </div>
          <TicketDetails/>
          <MessageBox />
          <Footer />
          <HeadSeo props={props} pathName={props.router.asPath} />
        </div>
        <PopUp
          opened={props.accountBox.state}
          closePopUp={() => {props.accountBoxModify({state: false,})}}>
          <Account />
        </PopUp>
        <Head>
                <title>بلیطجا | خرید بلیط هواپیما و رزرو اقامتگاه</title>
            </Head>
      </div>
    );
  }

const mapStatesToProps = (state) => ({
  accountBox: selcetAccountBox(state),
});
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
export default withRouter(connect(mapStatesToProps, mapDispatchesToProps)(App));
