import React from "react";

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
import villaPage from "./villa/villa.page";
import villaList from "./villa_list/villaList.page";
import villaReserve from "./villa/villaReserve.page";
import villaReceipt from "./villa/villaReceipt.page";

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
      width: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  mainRouter(pathName) {
    pathName = decodeURI(pathName);
    switch (this.props.mainRoute) {
      case "index": {
        return <Home></Home>;
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
          return <villaReserve />;
        }
        if (pathName.indexOf("receipt") > 0) {
          return <villaReceipt />;
        }
        if (pathName.length < 7) {
          return <villaPage />;
        } else {
          return <villaList />;
        }
      }

      default:
        return <Home></Home>;
    }
    /*
   <Switch>
                  </Switch> */
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
        {this.state.width <= 826 ? <NavBarMobile /> : <NavBar />}
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
