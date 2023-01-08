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
    if (state.logged) {
      props.user.logged = state.logged;
      props.user.user_info = { mobile: state.mobile }
    }
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

  if (state.logged) {
    var hours = 1; // to clear the localStorage after 1 hour
    // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
      localStorage.setItem('setupTime', now)
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
        localStorage.removeItem("mobile")
      }
    }
  }


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
        {/* <NavHandler/> */}
        {/* <button onClick={handleLog}>check</button> */}
        <div className="container">
          <div className="d-flex flex-row-reverse justify-content-between">
            <div className={styles["nav-text-detail"]}>
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
                    state.logged === true
                      ? "user-mobile-content"
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
                    <a href="tel:02184279999">02184279999</a>
                  </a>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              <div className={styles["nav-items-container"]}>
                <ul className={styles["navbar-items"]}>
                  <li>
                    <Link href="/" >
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24.002">
                            <g id="Tag" transform="translate(0 0.001)">
                              <path id="Path_1163" dataName="Path 1163" d="M2.157,17.294a4.467,4.467,0,0,1-1.146-3.6,15.516,15.516,0,0,1,1.3-4.989A32.381,32.381,0,0,1,4.688,4.162a18,18,0,0,1,1.579-2.23,1.566,1.566,0,0,1,.194-.073,6.862,6.862,0,0,1,.84-.194c.718-.128,1.661-.234,2.715-.323,2.1-.176,4.55-.272,6.332-.34a2.763,2.763,0,0,1,2.427,1.412c.864,1.568,2,3.722,2.88,5.618.443.951.814,1.817,1.058,2.505a7.123,7.123,0,0,1,.25.834,1.616,1.616,0,0,1,.037.239,7.066,7.066,0,0,1-.309.809c-.2.455-.471,1.033-.815,1.688a32.015,32.015,0,0,1-2.755,4.368A15.281,15.281,0,0,1,15.443,22.1a4.293,4.293,0,0,1-3.662.742A36.45,36.45,0,0,1,6.8,20.337c-1.034-.593-2.048-1.208-2.887-1.756A13.643,13.643,0,0,1,2.157,17.294Z" fill="none" stroke="#888888" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}></path>
                              <circle id="Ellipse_63" dataName="Ellipse 63" cx="2.029" cy="2.029" r="2.029" transform="translate(13.398 4.837) rotate(30)" fill="none" stroke="#888888" strokeWidth={1}></circle>
                              <rect id="Rectangle_188" dataName="Rectangle 188" width="10.1" height="1.02" rx="1.01" transform="translate(5.224 12.955) rotate(30)" fill="#888888"></rect>
                            </g>
                          </svg>
                        </div>
                        رزرو تور
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/hotels" >
                      <a>
                        <i
                          className={`bilitja icon-tours  ${styles["nav-icon"]} rotate-y-180`}
                        ></i>
                        رزرو هتل
                      </a>
                    </Link>
                  </li>
                  {/* <li>
              <a href="/blog">
                <i className={`bilitja icon-blog ${styles["nav-icon"]} `}></i>
                بلاگ
              </a>
            </li> */}
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
                  <h1 className="font-size-13 font-bold-iransanse pt-1">
                    خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه
                  </h1>
                </div>
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
