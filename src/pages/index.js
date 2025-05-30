import React, {useEffect} from "react";
import Base from "../Components/home/Base";
import Ticket from "../Components/ticket/Ticket";
import Account from "../sources/account/Account.component";
import PopUp from "../sources/component/PopUp.component";
import {selcetAccountBox} from "../Redux/UI/ui.reselect";
import {accountBoxModify} from "../Redux/UI/ui.action";
import {withRouter} from "next/router";
import {connect} from "react-redux";
import NavHandler from "../Components/share/NavHandler";
import NewNavBar from "../sources/component/NewNavbar";
const App = (props) =>  {


    return (
      <div className="bodyVar">
          <NavHandler/>

          {/* <NewNavBar/> */}
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
    connect(mapStatesToProps, mapDispatchesToProps)(App)
);

