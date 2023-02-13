import React from "react";
import dynamic from "next/dynamic";
const Home = dynamic(() => import("./../sources/Home.page"));
const Footer = dynamic(() => import("./../sources/component/Footer.component"));
const MessageBox = dynamic(() =>import("./../sources/component/MessageBox.component"));
const PopUp = dynamic(() => import("./../sources/component/PopUp.component"));
const Account = dynamic(() => import("./../sources/account/Account.component"));
const List = dynamic(()=>import( "../sources/tour/List"));
const HotelsSuggest = dynamic(()=>import( "../sources/tour/HotelsSuggest"));
const CitiesSuggest = dynamic(()=>import( "../sources/tour/CitiesSuggest"));
const Posts = dynamic(()=>import( "../sources/tour/Posts"));

import { connect } from "react-redux";
import { selcetAccountBox } from "../Redux/UI/ui.reselect";
import { accountBoxModify } from "../Redux/UI/ui.action";
import { withRouter } from "next/router";
import NavHandler from "../Components/share/NavHandler";
import Scrolltoprefresh from "../sources/component/Scrolltoprefresh";
import HeadSeo from "../sources/component/HeadSeo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { homeText } from "../Utils/data";
import styles from "../../styles/Home.module.scss";
const App = (props) =>  {
    return (
      <div className="bodyVar">
        <NavHandler />
        <Scrolltoprefresh/>
        <div className={"mt-100"}>
          <Home type={'index'} />
          <List  />
          <div className="col-md-10 m-auto">
          <HotelsSuggest />
          <CitiesSuggest />
            <Posts/>
          </div>
          <div className="row padding-xs-5-25">
          <div className="col-lg-1 col-md-1 col-sm-1 hidden-xs"></div>
          <div
            className={`col-lg-10 col-md-10 col-sm-10 col-12 ${styles["home-flight-content"]}`}
          >
            <h3>
              <FontAwesomeIcon icon={faPlane} />
              خرید بلیط هواپیما
            </h3>
            <p className={'description-shop-ticket'}>
              {homeText}
            </p>
          </div>
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
