import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

import { store, persistor } from "../Redux/store";
import AddVilla from "../../src/sources/manager/villa/AddVilla.page";
import Villa from "../../src/sources/manager/villa/Villa.page";
import VillaDetial from "../../src/sources/manager/villa/VilaDetail.page";
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
import EditProfile from "./../sources/manager/profile/EditProfile.component";
import ChangePassword from "../sources/manager/profile/ChangePassword.components";
import OrderList from "../sources/manager/orders/OrderList.component";
import WalletBalanc from "../sources/manager/wallet/Wallet.component";
import MyVilla from "./../sources/manager/villa/MyVilla.component";

export default function ManagePanel() {
  const myRouter = useRouter();
  const [width, setWidth] = useState(0);
  const [myid, setmyId] = useState(0);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // var path= decodeURI( pathName) ;
    // if(path.indexOf('villas/search/')>0)
    //   {
    //     setmyId(path.substr(21));
    //   }
    //setWidth(window.innerWidth);
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
      case "/panel/villas/add":
        return <AddVilla></AddVilla>;
      case "/panel/villas/search":
        return <Villa />;
      case "/panel/villas/add":
        return <AddVila />;
      //case '/panel/villas/search/:id' : return <UpdateVila/>  ;
      //       case '/panel/villas/detail/:id' : return <VilaDetial/>  ;
      case "/panel/villas/getReservation":
        return <VilaReservation />;

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
      case "/panel/complate-profile":
        return <ComplateProfile />;
      case "/panel/edit-profile":
        return <EditProfile />;
      case "/panel/change-password":
        return <ChangePassword />;

      case "/panel/orders":
        return <OrderList />;

      case "/panel/wallet":
        return <WalletBalanc />;

      case "/panel/my-villa":
        return <MyVilla />;

      default:
        return <div />;
    }
  }

  return (
    <Provider store={store}>
      <ManagerNav />
      <div className="panel-manager-main-container">
        <div className="panel-manager-content-container">
          {console.log(myRouter.asPath)}
          {mainRouter(myRouter.asPath)}
          <MessageBox />
        </div>
      </div>
    </Provider>
  );
}

/*
  
            <Route exact={false} path='/panel' component={() => {
            return (
              <>
                <ManagerNav />
                <div className="panel-manager-main-container">
                  <div className="panel-manager-content-container">
                    <Switch>
                      <Route exact path='/panel/villas/search' component={Villa} />
                      <Route exact path='/panel/villas/add' component={AddVila} />
                      <Route exact path='/panel/villas/search/:id' component={UpdateVila} />
                      <Route exact path='/panel/villas/detail/:id' component={VilaDetial} />
                      <Route exact path='/panel/villas/getReservation' component={VilaReservation} />
                      


                      <Route exact path='/panel/city/add' component={AddCity} />
                      <Route exact path='/panel/city/show' component={ShowallCities} />
                      <Route exact path='/panel/city/show/:id' component={UpdateCity} />

                      <Route exact path='/panel/rule/add' component={AddRule} />
                      <Route exact path='/panel/rule/show' component={ShowallRules} />
                      <Route exact path='/panel/rule/show/:id' component={UpdateRule} />


                      <Route exact path='/panel/facility/add' component={AddFacility} />
                      <Route exact path='/panel/facility/show' component={ShowallFacilities} />
                      <Route exact path='/panel/facility/show/:id' component={UpdateFacility} />

                    </Switch>
                    <MessageBox />

                  </div>
                </div>
              </>
            )
          }} />

  */
