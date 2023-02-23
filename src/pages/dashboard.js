import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import DashboardNav from "../sources/dashboard/DashboardNav.component";
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
import { store } from "../Redux/store";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/ManagerNav.module.scss";
import { useRouter } from 'next/router';

import { connect } from "react-redux";
import { selcetAccountBox } from "../Redux/UI/ui.reselect";
import { accountBoxModify,messageBoxModify }  from "../Redux/UI/ui.action";
import { withRouter } from "next/router";

const Dashboard = (props) => {
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
    // console.log("Test Path", path);
    switch (path) {
      case "/dashboard":
        return <Profile />;
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
  const [checker,setChecker] = useState(false)
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setChecker(false)
      router.push({
        pathname: '/',})
        setTimeout(() => {
        props.messageBoxModify({
          state: true,
          message: 'ابتدا وارد حساب خود شوید',
        });
      }, 2000);
      }else{
        setChecker(true)
      }
  },[])
  return (
    <div>
      <Provider store={store}>
        {checker &&
        <>
        <DashboardNav open={open} setOpen={setOpen}>
          <div className={styles["manager-small-screen-top-bar"]}>
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                setOpen(!open);
                // console.log(open);
              }}
            />
          </div>
        </DashboardNav>
        <div className="panel-manager-main-container">
          <div className="dashboard-manager-content-container">
            {mainRouter(myRouter.asPath)}
            <MessageBox />
          </div>
        </div>
        </>}
      </Provider>
    </div>
  );
};
const mapStateToProps = (state) => ({
  // messageBox: selectMessageBox(state),
  user: state.user,
});
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});
export default withRouter(connect(mapStateToProps, mapDispatchesToProps)(Dashboard));
