import React, { useEffect, useState } from "react";
//import logo from '../../../Images/logo512.png'
//import footerLogo from '../../../Images/bilitja-light-logo.webp'
import styles from "../../../styles/NavBarMobile.module.scss";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SlideIn from "./SlideIn.component";
import Link from "next/link";

import { accountBoxModify } from "../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import { connect } from "react-redux";

const NavBarMobile = (props) => {
  const [state, setState] = useState({
    isMenuOpen: false,
    slide: false,
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

  const handleLogoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mobile");
    localStorage.removeItem("token");
    setState({ ...state, logged: false })
      props.user.logged = false;
  }
  // console.log(props);
    const [scrollPosition, setScrollPosition] = useState(0);



    useEffect(() => {
        window.addEventListener('scroll', ()=> console.log('sdas'));

    }, [window]);


    useEffect(()=>{
        console.log(scrollPosition)
    },[scrollPosition])


  return (
    <nav className={`${styles["nav-mobile"]} hidden-mobile-head`}  >
      {/* <div className={styles['error-mobile']}> hghgshghgsd</div> */}
      <div className={styles["nav-text-detail-mobile"]}>
        <div className="pull-right">
        <div
                  className={
                    state.logged === true
                      ? "user-mobile-content align-center"
                      : styles["nav-detail-first-line"]
                  }
                >
                  {state.logged == true ? (
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
                      {/* <div>
                          <a
                            style={{ fontSize: 12 }}
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              props.accountBoxModify({
                                state: true,
                                type: "login",
                              });
                            }}
                          >
                            <i className="bilitja icon-login"></i>
                            <span>ورود کاربر</span>
                          </a>
                        </div> */}
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
                          <i className="bilitja icon-login font-size-14 ms-1"></i>
                          <span className="font-bold-iransanse font-size-13">ورود / ثبت نام</span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
        </div>
        <div className="pull-left">
          <a href="tel:021-84279999" className="color-black font-bold-iransanse">
            {/* <span className="text-dark mx-2">مشاوره تلفنی</span> */}
            <span className="text-dark font-size-14" style={{direction:'ltr'}}> &nbsp;021-8427 9999</span>
            <i className="bilitja icon-phone font-size-16"></i>
          </a>
        </div>
      </div>
      <div className={styles["nav-logo-container-mobile"]}>
        <div className="pull-right d-flex mb-0">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => {
              setState({
                slide: true,
              });
            }}
            className="mobile-nav-barsicon"
          />
          <h1 className="font-bold-iransanse font-size-11 mb-0 d-flex align-center" style={{alignItems: 'center'}}>
            {" "}
            خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه{" "}
          </h1>
        </div>
        <Link href="/">
          <img
            width=""
            height=""
            alt="بلیطجا - لوگو"
            src="../../../Images/logo512.webp"
            className="pull-left"
          />
        </Link>
      </div>

      <SlideIn
        slide={state.slide}
        close={() => {
          setState({
            slide: false,
          });
        }}
      >
        <div className={styles["nav-items-container-mobile"]}>
          <div className={styles["logo-menu-mobile"]}>
            <a href="/">
              <img
                width=""
                height=""
                alt="بلیطجا - لوگو - موبایل"
                src="../../../Images/bilitja-light-logo.webp"
              />
            </a>
            <p className="no-margin color-white">
              ارزان ترین بلیط های هواپیما
            </p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                setState({
                  slide: false,
                });
              }}
              className="mt-2 ms-2 mobile-nav-timesicon"
            />
          </div>

          <ul className="mt-2">
            <li>
              <div>
                <a href="/ticket" className="d-flex" style={{alignItems: 'center'}}>
                <svg id="_017-airplane" data-name="017-airplane" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 54.227 51.709">
                          <path id="Path_1675" data-name="Path 1675" d="M51.6,139.936a9.98,9.98,0,0,0-7.528-2.806H31.147L18.4,126.921a2.711,2.711,0,0,0-3.927,3.652l4.458,6.557H7.092c-.349-2.777-1.049-5.353-3.1-6.45a2.7,2.7,0,0,0-3.207.479A2.757,2.757,0,0,0,0,133.1v10.649a4.322,4.322,0,0,0,4.317,4.317H7.087a1.079,1.079,0,1,0,0-2.159H4.317a2.161,2.161,0,0,1-2.159-2.159V133.1a.586.586,0,0,1,.155-.414.554.554,0,0,1,.659-.1c1.4.748,1.827,3.2,2.081,5.734a1.079,1.079,0,0,0,1.074.972H44.07a7.934,7.934,0,0,1,5.956,2.127A7.9,7.9,0,0,1,52,145.9H30.52a1.08,1.08,0,0,0-.823.381L19.125,158.749a.91.91,0,0,1-1.234.14.942.942,0,0,1-.258-1.153l4.757-10.3a1.079,1.079,0,0,0-.98-1.532H16.782a1.079,1.079,0,1,0,0,2.159h2.941l-4.049,8.768a3.108,3.108,0,0,0,.931,3.791,3.073,3.073,0,0,0,4.166-.477l10.249-12.082H53.146a1.079,1.079,0,0,0,1.078-1.033,10.48,10.48,0,0,0-2.625-7.094Zm-30.057-2.806-5.283-7.771a.565.565,0,0,1,.08-.726.541.541,0,0,1,.712-.027l10.643,8.524Z" transform="translate(0 -113.957)" fill="#363535"/>
                          <path id="Path_1676" data-name="Path 1676" d="M5.082,20.5h2.3a3.875,3.875,0,0,0,3.049,1.479h4.387a3.882,3.882,0,0,0,0-7.763H13.778a4.4,4.4,0,0,0-4.008-2.554H5.082a4.419,4.419,0,0,0,0,8.838Zm-1.6-6.017a2.242,2.242,0,0,1,1.6-.662H9.771a2.249,2.249,0,0,1,2.2,1.726,1.079,1.079,0,0,0,1.049.827h1.807a1.723,1.723,0,1,1,0,3.446H10.435a1.721,1.721,0,0,1-1.519-.91,1.079,1.079,0,0,0-.951-.569H5.082a2.26,2.26,0,0,1-1.6-3.859Z" transform="translate(-0.591 -11.665)" fill="#363535"/>
                          <path id="Path_1677" data-name="Path 1677" d="M310.965,386.716h-1.43a4.8,4.8,0,0,0-1.082-2.059,3.85,3.85,0,0,0-2.906-1.207H298.62a4.159,4.159,0,1,0,0,8.319h4.412a4.7,4.7,0,0,0,.976,2.156,3.945,3.945,0,0,0,3.025,1.109h3.933a4.159,4.159,0,1,0,0-8.318Zm0,6.159h-3.933a2,2,0,0,1-1.443-.42,4.1,4.1,0,0,1-.554-1.853,1.079,1.079,0,0,0-1.076-.992H298.62a2,2,0,0,1,0-4h6.928a1.684,1.684,0,0,1,1.623.939c.312.573.309,1.669.632,2.006a1.141,1.141,0,0,0,.819.321h2.345a2,2,0,1,1,0,4Z" transform="translate(-262.68 -343.325)"/>
                          <ellipse id="Ellipse_220" data-name="Ellipse 220" cx="1.113" cy="1.113" rx="1.113" ry="1.113" transform="translate(16.113 27.086)"/>
                          <ellipse id="Ellipse_221" data-name="Ellipse 221" cx="1.113" cy="1.113" rx="1.113" ry="1.113" transform="translate(20.566 27.086)"/>
                          <ellipse id="Ellipse_222" data-name="Ellipse 222" cx="1.113" cy="1.113" rx="1.113" ry="1.113" transform="translate(25.019 27.086)"/>
                          <path id="Path_1678" data-name="Path 1678" d="M274.186,264.859a1.113,1.113,0,1,0-1.113-1.113A1.113,1.113,0,0,0,274.186,264.859Z" transform="translate(-243.601 -235.547)"/>
                          <ellipse id="Ellipse_223" data-name="Ellipse 223" cx="1.113" cy="1.113" rx="1.113" ry="1.113" transform="translate(33.925 27.086)"/>
                          <ellipse id="Ellipse_224" data-name="Ellipse 224" cx="1.113" cy="1.113" rx="1.113" ry="1.113" transform="translate(38.377 27.086)"/>
                          <ellipse id="Ellipse_225" data-name="Ellipse 225" cx="1.113" cy="1.113" rx="1.113" ry="1.113" transform="translate(10.557 32.293) rotate(-16.858)"/>
                        </svg>
                  <span className="pull-right font-size-14 color-black me-2">
                    بلیط هواپیما
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li>
            <li className="">
              <div>
                <a href="/hotels" className="d-flex" style={{alignItems: 'center'}}>
                  <svg id="_004-hotel" data-name="004-hotel" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 54.937 52.918">
                          <path id="Path_1621" data-name="Path 1621" d="M410.728,46.681a1.089,1.089,0,0,0-1.088,1.088v2h-2.092v-2a1.089,1.089,0,0,0-2.177,0v6.184a1.089,1.089,0,0,0,2.177,0v-2h2.092v2a1.088,1.088,0,1,0,2.177,0V47.769A1.089,1.089,0,0,0,410.728,46.681Z" transform="translate(-361.247 -42.609)"/>
                          <path id="Path_1622" data-name="Path 1622" d="M52.155,9.273h-9.63a2.785,2.785,0,0,0-2.782,2.782v4.382h-2.08V10.4a1.089,1.089,0,0,0-1.088-1.088H1.088A1.088,1.088,0,0,0,0,10.4V61.1a1.088,1.088,0,0,0,1.088,1.088H36.575A1.089,1.089,0,0,0,37.663,61.1V41.682a1.088,1.088,0,0,0-2.177,0V60.014H24.818v-5.95a1.088,1.088,0,0,0-1.088-1.088h-9.8a1.088,1.088,0,0,0-1.088,1.088v5.95H2.177V11.489H35.486V31.7a1.088,1.088,0,0,0,2.177,0V18.614h2.08v4.35a2.785,2.785,0,0,0,2.782,2.782h9.63a2.785,2.785,0,0,0,2.782-2.782V12.055a2.785,2.785,0,0,0-2.782-2.782ZM15.022,55.152h7.619v4.862H15.022ZM52.76,22.964a.606.606,0,0,1-.6.6h-9.63a.606.606,0,0,1-.6-.6V12.055a.606.606,0,0,1,.6-.6h9.63a.606.606,0,0,1,.6.6Z" transform="translate(0 -9.273)"/>
                          <path id="Path_1623" data-name="Path 1623" d="M62.454,69.691A1.088,1.088,0,0,0,61.366,68.6H56.431a1.088,1.088,0,0,0-1.088,1.088v4.934a1.088,1.088,0,0,0,1.088,1.088h4.934a1.088,1.088,0,0,0,1.088-1.088Zm-2.177,3.846H57.52V70.78h2.757Z" transform="translate(-49.319 -62.145)"/>
                          <path id="Path_1624" data-name="Path 1624" d="M147.787,69.691A1.088,1.088,0,0,0,146.7,68.6h-4.934a1.088,1.088,0,0,0-1.088,1.088v4.934a1.088,1.088,0,0,0,1.088,1.088H146.7a1.088,1.088,0,0,0,1.088-1.088Zm-2.177,3.846h-2.757V70.78h2.757Z" transform="translate(-125.364 -62.145)"/>
                          <path id="Path_1625" data-name="Path 1625" d="M232.45,69.691a1.089,1.089,0,0,0-1.088-1.088h-4.934a1.088,1.088,0,0,0-1.089,1.088v4.934a1.088,1.088,0,0,0,1.089,1.088h4.934a1.089,1.089,0,0,0,1.088-1.088Zm-2.177,3.846h-2.757V70.78h2.757Z" transform="translate(-200.811 -62.145)"/>
                          <path id="Path_1626" data-name="Path 1626" d="M62.454,154.73a1.088,1.088,0,0,0-1.088-1.088H56.431a1.088,1.088,0,0,0-1.088,1.088v4.934a1.088,1.088,0,0,0,1.088,1.088h4.934a1.088,1.088,0,0,0,1.088-1.088Zm-2.177,3.846H57.52v-2.757h2.757Z" transform="translate(-49.319 -137.928)"/>
                          <path id="Path_1627" data-name="Path 1627" d="M147.787,154.73a1.088,1.088,0,0,0-1.088-1.088h-4.934a1.088,1.088,0,0,0-1.088,1.088v4.934a1.088,1.088,0,0,0,1.088,1.088H146.7a1.088,1.088,0,0,0,1.088-1.088Zm-2.177,3.846h-2.757v-2.757h2.757Z" transform="translate(-125.364 -137.928)"/>
                          <path id="Path_1628" data-name="Path 1628" d="M232.45,154.73a1.089,1.089,0,0,0-1.088-1.088h-4.934a1.088,1.088,0,0,0-1.089,1.088v4.934a1.088,1.088,0,0,0,1.089,1.088h4.934a1.089,1.089,0,0,0,1.088-1.088Zm-2.177,3.846h-2.757v-2.757h2.757Z" transform="translate(-200.811 -137.928)"/>
                          <path id="Path_1629" data-name="Path 1629" d="M62.454,239.77a1.088,1.088,0,0,0-1.088-1.088H56.431a1.088,1.088,0,0,0-1.088,1.088V244.7a1.088,1.088,0,0,0,1.088,1.088h4.934a1.088,1.088,0,0,0,1.088-1.088Zm-2.177,3.846H57.52v-2.757h2.757Z" transform="translate(-49.319 -213.711)"/>
                          <path id="Path_1630" data-name="Path 1630" d="M147.787,239.77a1.088,1.088,0,0,0-1.088-1.088h-4.934a1.088,1.088,0,0,0-1.088,1.088V244.7a1.088,1.088,0,0,0,1.088,1.088H146.7a1.088,1.088,0,0,0,1.088-1.088Zm-2.177,3.846h-2.757v-2.757h2.757Z" transform="translate(-125.364 -213.711)"/>
                          <path id="Path_1631" data-name="Path 1631" d="M232.45,239.77a1.089,1.089,0,0,0-1.088-1.088h-4.934a1.088,1.088,0,0,0-1.089,1.088V244.7a1.088,1.088,0,0,0,1.089,1.088h4.934a1.089,1.089,0,0,0,1.088-1.088Zm-2.177,3.846h-2.757v-2.757h2.757Z" transform="translate(-200.811 -213.711)"/>
                          <path id="Path_1632" data-name="Path 1632" d="M61.366,323.721H56.431a1.088,1.088,0,0,0-1.088,1.088v4.934a1.088,1.088,0,0,0,1.088,1.089h4.934a1.088,1.088,0,0,0,1.088-1.089v-4.934A1.088,1.088,0,0,0,61.366,323.721Zm-1.088,4.934H57.52V325.9h2.757Z" transform="translate(-49.319 -289.494)"/>
                          <path id="Path_1633" data-name="Path 1633" d="M146.7,323.721h-4.934a1.088,1.088,0,0,0-1.088,1.088v4.934a1.088,1.088,0,0,0,1.088,1.089H146.7a1.088,1.088,0,0,0,1.088-1.089v-4.934A1.088,1.088,0,0,0,146.7,323.721Zm-1.088,4.934h-2.757V325.9h2.757Z" transform="translate(-125.364 -289.494)"/>
                          <path id="Path_1634" data-name="Path 1634" d="M231.362,323.721h-4.934a1.088,1.088,0,0,0-1.089,1.088v4.934a1.088,1.088,0,0,0,1.089,1.089h4.934a1.089,1.089,0,0,0,1.088-1.089v-4.934A1.089,1.089,0,0,0,231.362,323.721Zm-1.088,4.934h-2.757V325.9h2.757Z" transform="translate(-200.811 -289.494)"/>
                          <circle id="Ellipse_197" data-name="Ellipse 197" cx="1.088" cy="1.088" r="1.088" transform="translate(35.489 26.377)" fill="#d5d5d5"/>
                        </svg>
                  <span className="pull-right font-size-14 color-black" style={{marginRight:'0.8rem'}}>
                    هتل
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li>
            <li>
              <div>
                <a href="/tours" className="d-flex" style={{alignItems: 'center'}}>
                  <svg id="_010-beach" data-name="010-beach" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 57 52.018" className="pull-right">
                    <path id="Path_1649" data-name="Path 1649" d="M56.989,197.207a25.669,25.669,0,0,0-2.34-7.194c-2.48-4.9-6.206-7.618-10.774-7.857-6.746-.352-10.125,2.307-11.531,3.908-3.453-3.053-7.807-6.34-14.847-6.594l-2.02-6.568,8.778-2.7A1.138,1.138,0,0,0,25,168.795a10.138,10.138,0,0,0-2.794-4.454,1.127,1.127,0,0,0-1.532,1.653,7.861,7.861,0,0,1,1.763,2.41l-17.4,5.352a7.828,7.828,0,0,1,5.213-8.677l1.938-.608a1.127,1.127,0,0,0-.674-2.151l-1.933.606a9.665,9.665,0,0,0-5.753,4.886,10.187,10.187,0,0,0-.692,7.707,1.138,1.138,0,0,0,1.408.746l8.778-2.7,1.831,5.952c-5.423.464-9.719,3.531-12.48,8.943a27.24,27.24,0,0,0-2.667,8.8,1.127,1.127,0,0,0,1.122,1.236H55.873a1.127,1.127,0,0,0,1.116-1.285Zm-54.552-.968a25.386,25.386,0,0,1,2.244-6.754c2.5-4.9,6.251-7.506,11.153-7.756l1.793,5.83a6.457,6.457,0,0,0-2.719,2.534,1.143,1.143,0,0,0,.618,1.618,1.184,1.184,0,0,0,1.387-.581,5.038,5.038,0,0,1,3.54-2.13,7.307,7.307,0,0,1,2.486.17c.74.165,1.556-.157,1.571-1.034.017-1.047-1.11-1.2-1.908-1.324a8.782,8.782,0,0,0-2.841.019L18.2,181.767c6.351.469,10.151,3.726,13.481,6.732.047.052,4.995,5.427,9.579,5.427a1.141,1.141,0,0,0,1.162-1.09,1.127,1.127,0,0,0-1.09-1.162c-2.706-.087-4.881-1.909-7.321-4.106,1.032-1.194,3.8-3.47,9.742-3.16,3.753.2,6.733,2.408,8.856,6.574a23.8,23.8,0,0,1,1.887,5.257H2.436Z" transform="translate(0 -146.474)" fill="black"/>
                    <ellipse id="Ellipse_205" data-name="Ellipse 205" cx="1.127" cy="1.127" rx="1.127" ry="1.127" transform="translate(15.738 15.306)" fill="black"/>
                    <path id="Path_1650" data-name="Path 1650" d="M235.843,32.288h4.288a6.8,6.8,0,0,0,1.359,3.3,6.2,6.2,0,0,0,4.332,1.612h5.071a5.86,5.86,0,1,0,0-11.719h-.522a5.128,5.128,0,0,0-4.8-3.381h-9.733a5.092,5.092,0,1,0,0,10.184Zm-2.007-7.1a2.82,2.82,0,0,1,2.007-.831h9.733a2.853,2.853,0,0,1,2.808,2.418,1.127,1.127,0,0,0,1.115.962h1.4a3.606,3.606,0,0,1,0,7.212h-5.071A3.987,3.987,0,0,1,243.084,34a7.516,7.516,0,0,1-.866-2.912,1.139,1.139,0,0,0-1.124-1.051h-5.25a2.839,2.839,0,0,1-2.007-4.846Z" transform="translate(-204.749 -22.104)" fill="black"/>
                  </svg>
                  <span className="pull-right font-size-14 color-black" style={{marginRight:'0.8rem'}}>
                    تور
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li>
            <li>
              {/* <div>
                  <a href="/blog">
                    <i className="bilitja font-size-24 icon-blog pull-right rotate-y-180"></i>
                    <span className="pull-right font-size-14 color-black">
                      بلاگ
                    </span>
                  </a>
                  <div className="clear"></div>
                </div> */}
            </li>
            <li>
              <div>
                <a href="/TrackOrder">
                  <i className="bilitja font-size-14 icon-refrence pull-right rotate-y-180 text-dark"></i>
                  <span className="pull-right font-size-14 color-black">
                    پیگیری خرید
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li>
            {/* <li>
              <div>
                <a href="#">
                  <i className="bilitja font-size-24 icon-refrence pull-right rotate-y-180"></i>
                  <span className="pull-right font-size-14 color-black">
                    درباره ما
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li> */}
          </ul>
        </div>
      </SlideIn>
    </nav>
  );
}
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, mapDispatchesToProps)(NavBarMobile));
