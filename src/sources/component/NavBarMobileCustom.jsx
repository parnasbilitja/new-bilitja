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
    localStorage.removeItem("token");
    localStorage.removeItem("mobile");
    setState({ ...state, logged: false })
  }
  //
  return (
    <nav className={`${styles["nav-mobile"]} hidden-mobile-head`}>
      <div className={styles["nav-logo-container-mobile"]}>
        <Link href="/">
          <img
            width=""
            height=""
            alt="بلیطجا - لوگو"
            src="../../../Images/bilitja.webp"
            className="pull-left"
          />
        </Link>
      <a href="tel:021-84279999" className="color-black font-bold-iransanse">
            {/* <span className="text-dark mx-2">مشاوره تلفنی</span> */}
            <i className="bilitja icon-phone font-size-16"></i>
            <span className="text-dark font-size-14"> &nbsp;021-84278</span>
          </a>
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
            <Link href="/">
              <img
                width=""
                height=""
                alt="بلیطجا - لوگو"
                src="../../../Images/bilitja.webp"
              />
            </Link>
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
                <a href="/ticket">
                  <i className="bilitja font-size-24 icon-plane-departure pull-right rotate-y-180"></i>
                  <span className="pull-right font-size-14 color-black">
                    بلیط هواپیما
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li>
            <li>
              <div>
                <a href="/villa">
                  <i className="bilitja font-size-24 icon-villa pull-right rotate-y-180"></i>
                  <span className="pull-right font-size-14 color-black">
                    اقامتگاه
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
                <a href="/src/pages/TrackOrder">
                  {/*<i className="bilitja font-size-24 icon-refrence pull-right rotate-y-180"></i>*/}
                  <svg className='mb-3' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160v-516L82-846l72-34 94 202h464l94-202 72 34-78 170v516H160Zm240-280h160q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520H400q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440ZM240-240h480v-358H240v358Zm0 0v-358 358Z"/></svg>

                  <span className="pull-right font-size-14 color-black">
                    پیگیری خرید
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li>
            <li>
              <div>
                <a href="#">
                  <i className="bilitja font-size-24 icon-refrence pull-right rotate-y-180"></i>
                  <span className="pull-right font-size-14 color-black">
                    درباره ما
                  </span>
                </a>
                <div className="clear"></div>
              </div>
            </li>
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
