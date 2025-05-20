

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
// const Home = dynamic(() => import("../sources/Home.page"));
// const Footer = dynamic(() => import("../sources/component/Footer.component"));
// const MessageBox = dynamic(() =>
//   import("../sources/component/MessageBox.component")
// );

const PopUp = dynamic(() => import("../../component/PopUp.component"));
const Account = dynamic(() => import("../../account/Account.component"));
// import PopUp from "../../component/PopUp.component";
// import AccountComponent from "../../account/Account.component";

import { connect } from "react-redux";
import { selcetAccountBox } from "../../../Redux/UI/ui.reselect";

import { accountBoxModify } from "../../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import NavHandler from "../../../Components/share/NavHandler";
import Scrolltoprefresh from "../../component/Scrolltoprefresh";
// import HeadSeo from "../sources/component/HeadSeo";
import Ticket from "../../../Components/ticket/Ticket";
// import moment from "moment-jalaali";
const FlightBase=(props)=>{
    return (
        <div className="bodyVar">
          <NavHandler />
          <Scrolltoprefresh />
          <Ticket {...props} />
          <PopUp
            opened={props.accountBox.state}
            closePopUp={() => {
              props.accountBoxModify({ state: false });
            }}
          >
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
export default withRouter(
  connect(mapStatesToProps, mapDispatchesToProps)(FlightBase)
);