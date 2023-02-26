import React, { useEffect, useState } from "react";
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
import VillaBase from '../Components/villa/Villa'

const Villa = (props) => {
    const [state,setState] = useState({width: 1024});

  useEffect(()=>{
    setState({ width: window.innerWidth });
  },[])
    return (
      <div className="bodyVar">
        <VillaBase {...props} />

      </div>
    );
  
}
const mapStatesToProps = (state) => ({
  accountBox: selcetAccountBox(state),
});
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
export default withRouter(connect(mapStatesToProps, mapDispatchesToProps)(Villa));
