import React from "react";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("./../sources/Home.page"));
const Footer = dynamic(() => import("./../sources/component/Footer.component"));
const MessageBox = dynamic(() =>import("./../sources/component/MessageBox.component"));
const PopUp = dynamic(() => import("./../sources/component/PopUp.component"));
const Account = dynamic(() => import("./../sources/account/Account.component"));

import { connect } from "react-redux";
import { selcetAccountBox } from "../Redux/UI/ui.reselect";
import { accountBoxModify } from "../Redux/UI/ui.action";
import { withRouter } from "next/router";
import NavHandler from "../Components/share/NavHandler";
import Scrolltoprefresh from "../sources/component/Scrolltoprefresh";
import HeadSeo from "../sources/component/HeadSeo";
import List from "../sources/tour/List";
import HotelsSuggest from "../sources/tour/HotelsSuggest";
import CitiesSuggest from "../sources/tour/CitiesSuggest";
import Posts from "../sources/tour/Posts";

const App = (props) =>  {
    return (
      <div className="bodyVar">
        <NavHandler />
        <Scrolltoprefresh/>
        <div className={"mt-85"}>
          <Home />
          <List  />
          <div className="col-md-10 m-auto">
          <HotelsSuggest />
          <CitiesSuggest />
            <Posts/>
          </div>
          <MessageBox />
          <Footer />
          <HeadSeo props={props} pathName={props.router.asPath} />
        </div>
        <PopUp
          opened={props.accountBox.state}
          closePopUp={() => {props.accountBoxModify({state: false,})}}>
          <Account />
        </PopUp>
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
