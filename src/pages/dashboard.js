import React, { useEffect, useState } from "react";
import { connect, Provider } from "react-redux";
import DashboardNav from "../sources/dashboard/DashboardNav.component";
import GetFlightList from "../sources/flight_List/GetFlightList.page";
import MessageBox from "../sources/component/MessageBox.component";
import Profile from "../sources/dashboard/profile/Profile.component";
import ComplateProfile from "../sources/dashboard/profile/ComplateProfile.component";
import EditProfile from "../sources/dashboard/profile/EditProfile.component";
import ChangePassword from "../sources/dashboard/profile/ChangePassword.components";
import OrderList from "../sources/dashboard/orders/OrderList.component";
import WalletBalanc from "../sources/dashboard/wallet/Wallet.component";
import MyVilla from "../sources/dashboard/villa/MyVilla.component";
import Requset from "../sources/dashboard/request/Requset";
import Agency from "../sources/dashboard/agency/Agency";
import { useRouter, withRouter } from "next/router";
import { store } from "../Redux/store";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/ManagerNav.module.scss";
import ShowFlightList from "../sources/flight_List/ShowFlightList.component";

const Dashboard = () => {
  const myRouter = useRouter();
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(false);

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
    console.log("Test Path", path);
    switch (path) {
      case "/dashboard/profile":
        return <Profile />;
      case "/dashboard/index":
        return <Requset />;
      case "/dashboard/agency":
        return <Agency />;
      case "/dashboard/complate-profile":
        return <ComplateProfile />;
      case "/dashboard/edit-profile":
        return <EditProfile />;
      case "/dashboard/change-password":
        return <ChangePassword />;
      case "/dashboard/orders":
        return <OrderList />;
      case "/dashboard/wallet":
        return <WalletBalanc />;
     
      case "/dashboard/my-villa":
        return <MyVilla />;
      default:
        return <div />;
    }
  }
  return (
    <div>
      <Provider store={store}>
        <DashboardNav open={open} onClose={() => setOpen(false)}>
          <div className={styles["manager-small-screen-top-bar"]}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
        </DashboardNav>
        <div className="panel-manager-main-container">
          <div
            className="dashboard-manager-content-container"
            onClick={() => {
              setOpen(false);
            }}
          >
            {mainRouter(myRouter.asPath)}
            <MessageBox />
          </div>
        </div>
      </Provider>
    </div>
  );
};

export default Dashboard;
