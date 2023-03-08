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
import PopUp from "./PopUp.component";

import Account from '../account/Account.component'
const NavBar = (props) => {
// console.log(props);
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
    localStorage.removeItem("mobile");
    localStorage.removeItem("token");
    setState({ ...state, logged: false })
      props.user.logged = false;
  }
  return (
    <div className="col-xl-12 col-lg-12">
      <nav className={styles.navVar}>
          <div className="d-flex flex-row-reverse justify-content-between">
            <div className={` ${styles["nav-text-detail"]}`}>
              <div>
                {/* <a
              href="/villa/intro"
              className={`font-size-10 btn-outlined ${styles["btn-nav-hosting"]}`}
            >
              میزبان شوید
            </a> */}
              </div>
              <div className="font-size-12 d-flex flex-column justify-content-center">
                <div
                  className={
                    props.user.logged === true
                      ? "user-mobile-content"
                      : styles["nav-detail-first-line"]
                  }
                >
                  {props.user.logged == true ? (
                    <>
                      <div>
                        <Link href="/dashboard">
                          <a>
                            <i className="bilitja icon-login"></i>
                            {state.mobile}
                          </a>
                        </Link>
                      </div>
                      <span className="mx-2">&nbsp;/</span>
                      <div>
                        <a
                          // href={props.router.route}
                          href={'#'}
                          style={{ fontSize: 12 }}
                          onClick={(e) => handleLogoutUser(e)}
                          className="cursor-pointer font-bold-iransanse"
                        >
                          خروج
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="border-right pb-2">
                        <a
                          style={{ fontSize: 12 }}
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            props.accountBoxModify({
                              state: true,
                              type: "register",
                            });
                          }}
                        >
                          {/* <i className="bilitja icon-register"></i> */}
                          <i className="bilitja icon-login"></i>
                          <span className="font-bold-iransanse font-size-14">ورود / ثبت نام</span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles["nav-detail-second-line"]}>
                  <a href="#" style={{ fontSize: 12 }}>
                    <span className="font-bold-iransanse">مشاوره تلفنی : </span>
                    <i className="bilitja icon-phone"></i>
                    <a href="tel:02184279999">021-8427 9999</a>
                  </a>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              <div className={"nav-items-container"}>
                <ul className={styles["navbar-items"]}>
                  <li>
                    <Link href="/ticket" >
                      <a>
                        <i
                          className={`bilitja icon-plane-departure  ${styles["nav-icon"]} rotate-y-180`}
                        ></i>
                        بلیط هواپیما
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/tours">
                      <a>
                        {/* <i
                          className={`bilitja icon-tours  ${styles["nav-icon"]} rotate-y-180`}
                        ></i> */}
                        <div className="mb-2 mt-1">
                        <svg id="_010-beach" data-name="010-beach" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 57 52.018">
                          <path id="Path_1649" data-name="Path 1649" d="M56.989,197.207a25.669,25.669,0,0,0-2.34-7.194c-2.48-4.9-6.206-7.618-10.774-7.857-6.746-.352-10.125,2.307-11.531,3.908-3.453-3.053-7.807-6.34-14.847-6.594l-2.02-6.568,8.778-2.7A1.138,1.138,0,0,0,25,168.795a10.138,10.138,0,0,0-2.794-4.454,1.127,1.127,0,0,0-1.532,1.653,7.861,7.861,0,0,1,1.763,2.41l-17.4,5.352a7.828,7.828,0,0,1,5.213-8.677l1.938-.608a1.127,1.127,0,0,0-.674-2.151l-1.933.606a9.665,9.665,0,0,0-5.753,4.886,10.187,10.187,0,0,0-.692,7.707,1.138,1.138,0,0,0,1.408.746l8.778-2.7,1.831,5.952c-5.423.464-9.719,3.531-12.48,8.943a27.24,27.24,0,0,0-2.667,8.8,1.127,1.127,0,0,0,1.122,1.236H55.873a1.127,1.127,0,0,0,1.116-1.285Zm-54.552-.968a25.386,25.386,0,0,1,2.244-6.754c2.5-4.9,6.251-7.506,11.153-7.756l1.793,5.83a6.457,6.457,0,0,0-2.719,2.534,1.143,1.143,0,0,0,.618,1.618,1.184,1.184,0,0,0,1.387-.581,5.038,5.038,0,0,1,3.54-2.13,7.307,7.307,0,0,1,2.486.17c.74.165,1.556-.157,1.571-1.034.017-1.047-1.11-1.2-1.908-1.324a8.782,8.782,0,0,0-2.841.019L18.2,181.767c6.351.469,10.151,3.726,13.481,6.732.047.052,4.995,5.427,9.579,5.427a1.141,1.141,0,0,0,1.162-1.09,1.127,1.127,0,0,0-1.09-1.162c-2.706-.087-4.881-1.909-7.321-4.106,1.032-1.194,3.8-3.47,9.742-3.16,3.753.2,6.733,2.408,8.856,6.574a23.8,23.8,0,0,1,1.887,5.257H2.436Z" transform="translate(0 -146.474)" fill="#363535"/>
                          <ellipse id="Ellipse_205" data-name="Ellipse 205" cx="1.127" cy="1.127" rx="1.127" ry="1.127" transform="translate(15.738 15.306)" fill="#363535"/>
                          <path id="Path_1650" data-name="Path 1650" d="M235.843,32.288h4.288a6.8,6.8,0,0,0,1.359,3.3,6.2,6.2,0,0,0,4.332,1.612h5.071a5.86,5.86,0,1,0,0-11.719h-.522a5.128,5.128,0,0,0-4.8-3.381h-9.733a5.092,5.092,0,1,0,0,10.184Zm-2.007-7.1a2.82,2.82,0,0,1,2.007-.831h9.733a2.853,2.853,0,0,1,2.808,2.418,1.127,1.127,0,0,0,1.115.962h1.4a3.606,3.606,0,0,1,0,7.212h-5.071A3.987,3.987,0,0,1,243.084,34a7.516,7.516,0,0,1-.866-2.912,1.139,1.139,0,0,0-1.124-1.051h-5.25a2.839,2.839,0,0,1-2.007-4.846Z" transform="translate(-204.749 -22.104)" fill="#363535"/>
                        </svg>
                        </div>
                        رزرو تور
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/" >
                      <a className="" style={{color: 'gray'}}>
                        <i
                          className={`bilitja icon-tours  ${styles["nav-icon"]} rotate-y-180`}
                        ></i>
                        رزرو هتل
                      </a>
                    </Link>
                  </li>
                  <li>
              <a href="/blog">
                <i className={`bilitja icon-blog ${styles["nav-icon"]} `}></i>
                بلاگ
              </a>
            </li>
                  <li>
                    <Link href="/flights/order" >
                      <a>
                        <i
                          className={`bilitja icon-refrence ${styles["nav-icon"]} `}
                        ></i>
                        پیگیری خرید
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles["nav-logo-container"]}>
                <div>
                  <Link href="/" >
                    <img
                      width=""
                      height=""
                      className={styles["logo"]}
                      src="../../../Images/logo512.webp"
                      alt="بلیطجا - لوگو"
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
      <PopUp
          opened={props.accountBox.state}
          closePopUp={() => {
            props.accountBoxModify({
              state: false,
            });
          }}
        >
          <Account />
        </PopUp>
    </div>
  );
}

const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
const mapStateToProps = (state) => ({
  user: state.user,
  accountBox: selcetAccountBox(state),
});

export default withRouter(connect(mapStateToProps, mapDispatchesToProps)(NavBar));
