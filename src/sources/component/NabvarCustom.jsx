import React, { useState, useEffect } from "react";
import Image from "next/image";
//import logo from '../../../Images/logo512.png'
import styles from "../../../styles/NavBar.module.scss";
import Link from "next/link";

//import '../../../public/kilofont.svg'
import { connect } from "react-redux";
import { selcetAccountBox } from "../../Redux/UI/ui.reselect";
import { withRouter } from "next/router";
import { accountBoxModify } from "../../Redux/UI/ui.action";

const NavBar = (props) => {

  const [state, setState] = useState({
    mobile: '',
    logged: false,
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      const user_mobile = localStorage.getItem("mobile");
      setState({
        ...state,
        logged: true,
        mobile: user_mobile,
      });
    }
    // if (state.logged) {
    //   props.user.logged = state.logged;
    //   props.user.user_info = { mobile: state.mobile }
    // }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setState({
        ...state,
        mobile: localStorage.getItem("mobile"),
        logged: true
      })
    }
  }, [props.user])

  // if (state.logged) {
  //   var hours = 1;
  //   var now = new Date().getTime();
  //   var setupTime = localStorage.getItem('setupTime');
  //   if (setupTime == null) {
  //     localStorage.setItem('setupTime', now)
  //   } else {
  //     if (now - setupTime > hours * 6 * 6 * 1) {
  //       localStorage.clear()
  //       localStorage.setItem('setupTime', now);
  //       localStorage.removeItem("mobile")
  //     }
  //   }
  // }


  const handleLogoutUser = (e) => {
    e.preventDefault();
    // localStorage.removeItem("mobile");
    localStorage.removeItem("token");
    localStorage.removeItem("mobile");
    setState({ ...state, logged: false })
  }
  return (
    <div className="col-xl-12 col-lg-12">
      <nav className={styles.navVar}>
          <div className="d-flex flex-row-reverse justify-content-center">
            <div className="d-flex flex-row-reverse">
              
              <div className={styles["nav-logo-container"]}>
                <div>
                  <Link href="/" >
                    <img
                      width=""
                      height=""
                      className={styles["logo"]}
                      src="/Images/hamnavaz-logo.webp"
                      alt="بلبطجا - لوگو"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                  <h1 className="font-size-10 font-bold-iransanse pt-1">
                    خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه
                  </h1>
                </div>
              </div>
            </div>
            
          </div>
        
      </nav>
    </div>
  );
}

const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, mapDispatchesToProps)(NavBar));
