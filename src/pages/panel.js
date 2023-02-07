import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../Redux/store";
import AddVilla from "../sources/manager/villa/AddVilla.page";
import Villa from "../sources/manager/villa/Villa.page";
import { useRouter } from "next/router";
import ManagerNav from "../sources/manager/ManagerNav.component";
import MessageBox from "../sources/component/MessageBox.component";
import AddVila from "../sources/manager/villa/AddVilla.page";
import AddCity from "../sources/manager/city/AddCity.page";
import AddRule from "../sources/manager/rule/AddRule.page";
import AddFacility from "../sources/manager/facility/AddFacility.page";
import ShowallCities from "../sources/manager/city/ShowAllCities.page";
import UpdateCity from "../sources/manager/city/UpdateCity.page";
import ShowallFacilities from "../sources/manager/facility/ShowAllFacilities.page";
import UpdateFacility from "../sources/manager/facility/UpdateFacility.page";
import ShowallRules from "../sources/manager/rule/ShowAllRules.page";
import UpdateRule from "../sources/manager/rule/UpdateRule.page";
import UpdateVila from "../sources/manager/villa/UpdateVila.page";
import VilaDetial from "../sources/manager/villa/VilaDetail.page";
import VilaReservation from "../sources/manager/villa/VilaReservation.page";
import Profile from "../sources/manager/profile/Profile.component";
import ComplateProfile from "../sources/manager/profile/ComplateProfile.component";
import EditProfile from "../sources/manager/profile/EditProfile.component";
import ChangePassword from "../sources/manager/profile/ChangePassword.components";
import Dashboard from "../sources/manager/dashboard/Dashboard";
import Reports from "../sources/manager/reports/Reports";
import Flightlist from "../sources/manager/flightlist/Flightlist";
import PriceHandling from "../sources/manager/price-handling/PriceHandling";
import CharterList from "../sources/manager/charter-list/CharterList";
import FlightSellReport from "../sources/manager/sell-report/sell-report/DesktopFlightSellReport";
import AllFlightSellReport from "./../sources/manager/sell-report/all-sell-report/DesktopFlightSellReport";
import SalesReport from "../sources/manager/sell-report/sell-report/Sales-report";
import ConsularReport from "../sources/manager/sell-report/sell-report/Consular-report";
import Reserving from "../sources/manager/sell-report/sell-report/reserving";
import Transaction from "../sources/manager/sell-report/sell-report/transaction";
import Flights from "../sources/manager/flights/Flights";

const ManagePanel = () =>{
  const myRouter = useRouter();
  const [width, setWidth] = useState(0);
  const [myid, setmyId] = useState(0);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function mainRouter(pathName) {
    var path = decodeURI(pathName);
    console.log(path);

    if (path.indexOf("villas/search/") > 0) {
      //console.log(path.substr(21));
      if (path.substr(21) == "") {
        return <Villa />;
      } else {
        return <UpdateVila />;
      }
    }
    if (path.indexOf("villas/detail/") > 0) {
      if (path.substr(21) == "") {
        return <Villa />;
      } else {
        return <VilaDetial />;
      }
    }
    if (path.indexOf("city/show/") > 0) {
      if (path.substr(17) == "") {
        return <ShowallCities />;
      } else {
        return <UpdateCity />;
      }
    }
    if (path.indexOf("/panel/rule/show/") > 0) {
      if (path.substr(17) == "") {
        return <ShowallRules />;
      } else {
        return <UpdateRule />;
      }
    }
    if (path.indexOf("/panel/facility/show/") > 0) {
      if (path.substr(21) == "") {
        return <ShowallFacilities />;
      } else {
        return <UpdateFacility />;
      }
    }
    switch (path) {
      case "/panel/index":
        return <Dashboard />;
      case "/panel/villas/add":
        return <AddVilla />;
      case "/panel/reports":
        return <Reports />;
      case "/panel/villas/search":
        return <Villa />;
      case "/panel/flightlist":
        return <Flightlist />;
      case "/panel/villas/add":
        return <AddVila />;
      //case '/panel/villas/search/:id' : return <UpdateVila/>  ;
      //       case '/panel/villas/detail/:id' : return <VilaDetial/>  ;
      case "/panel/villas/getReservation":
        return <VilaReservation />;
      case "/panel/Sales-report":
        return <SalesReport/>;
      case "/panel/city/add":
        return <AddCity />;
      case "/panel/city/show":
        return <ShowallCities />;
      //       case '/panel/city/show/:id' : return <UpdateCity/>  ;

      case "/panel/rule/add":
        return <AddRule />;
      case "/panel/rule/show":
        return <ShowallRules />;
      //       case '/panel/rule/show/:id' : return <UpdateRule/>  ;

      case "/panel/facility/add":
        return <AddFacility />;
      case "/panel/facility/show":
        return <ShowallFacilities />;
      //   case '/panel/facility/show/:id' : return <UpdateFacility/>  ;
      case "/panel/profile":
        return <Profile />;
      case "/panel":
        return <Profile />;
      case "/panel/complate-profile":
        return <ComplateProfile />;
      case "/panel/edit-profile":
        return <EditProfile />;
      case "/panel/change-password":
        return <ChangePassword />;
      case "/panel/dashboard":
        return <CharterList />;
      case "/panel/charter-list":
        return <CharterList />;
      case "/panel/flight-sell-report":
        return <FlightSellReport />;
      case "/panel/price-handling":
        return <PriceHandling />;
      case "/panel/flight":
        return <Flights />;
      case "/panel/all-flight-sell-report":
        return <AllFlightSellReport />;
      case "/panel/Consular-report":
        return <ConsularReport/>;
      case "/panel/reserving":
        return <Reserving/>;
      case "/panel/transaction":
        return <Transaction/>;
      default:
        return <div />;
    }
  }

  return (
    <Provider store={store}>
      <ManagerNav />
      <div className="panel-manager-main-container">
        <div className="panel-manager-content-container">
          {mainRouter(myRouter.asPath)}
          <MessageBox />
        </div>
      </div>
    </Provider>
  );
}


export default ManagePanel;