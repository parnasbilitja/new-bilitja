import React, { useEffect, useState } from "react";
//import logo from '../../../Images/logo512.png'
//import footerLogo from '../../../Images/bilitja-light-logo.webp'
import styles from "../../../styles/NavBarMobile.module.scss";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SlideIn from "./SlideIn.component";
import Link from "next/link";

import { connect } from "react-redux";
import { accountBoxModify } from "../../Redux/UI/ui.action";
import router from "next/router";
const NavBarMobile = (props) => {
  const [state, setState] = useState({
    isMenuOpen: false,
    slide: false,
    mobile: "",
    logged: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user_mobile = localStorage.getItem("mobile");
      const current_state = { ...state };
      current_state.logged = true;
      current_state.mobile = user_mobile;
      setState(current_state);
    }
  }, [])

  // componentDidMount() {
  // }

  const handleLogoutUser = () => {
    localStorage.removeItem("mobile");
    localStorage.removeItem("token");
  }
  console.log(props);
  return (
    /*<div className={styles['error-mobile']}> hghgshghgsd</div>*/
    <nav className={styles["nav-mobile"]}>
      <div className={styles["nav-text-detail-mobile"]}>
        <div className="pull-right mb-1">
          {props.user.logged === true ? (
            <>
              <Link href="/dashboard">
                <a
                  href=""
                  className="font-size-13 color-black"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/dashboard");
                  }}
                >
                  {/* <span className="font-bold-iransanse">
                    شماره موبایل : {props.user.user_info && props.user.user_info.mobile}{" "}
                  </span> */}
                  <div className="image">
                    <svg width="30" height="30" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="23.3268" cy="20.0852" rx="5.73692" ry="5.75125" stroke="#333" strokeWidth={2} strokeLinecap="round" />
                      <ellipse cx="23.3279" cy="23.9198" rx="17.2108" ry="17.2537" stroke="#333" strokeWidth={2} />
                      <path d="M34.3813 37.0045C34.6235 36.8712 34.738 36.5832 34.6358 36.3263C33.8987 34.4727 32.4778 32.8403 30.5566 31.6507C28.4821 30.3662 25.9403 29.6699 23.3254 29.6699C20.7105 29.6699 18.1687 30.3662 16.0942 31.6507C14.173 32.8403 12.7521 34.4727 12.015 36.3263C11.9128 36.5832 12.0273 36.8712 12.2695 37.0045C19.1532 40.7932 27.4976 40.7932 34.3813 37.0045Z" fill="#333" />
                    </svg>
                  </div>
                </a>
              </Link>
              <span className="mx-2 ms-0 font-size-16">/</span>

              <a
                href="/"
                className="mx-2 text-danger"
                onClick={handleLogoutUser}
              >
                خروج
              </a>
            </>
          ) : (
            <>
              {/* {" "}
                <a
                  href=""
                  className="font-size-13 color-black"
                  onClick={(e) => {
                    e.preventDefault();
                    props.accountBoxModify({
                      state: true,
                      type: "login",
                    });
                  }}
                >
                  {" "}
                </a> */}
              <i className="bilitja icon-login font-size-14 text-dark"></i>
              <a
                href=""
                className="color-black font-size-13"
                onClick={(e) => {
                  e.preventDefault();
                  props.accountBoxModify({
                    state: true,
                    type: "register",
                  });
                }}
              >
                {/* <i className="bilitja icon-register font-size-14 text-dark"></i> */}
                &nbsp;
                <span className="font-bold-iransanse text-dark">ورود / ثبت نام</span>
              </a>
            </>
          )}

          {/* {props.user.logged === false ? (
              ""
            ) : (
              // <a href="/villa/intro" className="font-size-10 btn-outlined">
              //   میزبان شوید
              // </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/dashboard");
                }}
                className="font-size-13 btn-outlined px-2 "
              >
                داشبورد
              </a>
            )} */}
        </div>
        <div className="pull-left mt-1">
          <a href="tel:021-84279999" className="color-black font-bold-iransanse">
            {/* <span className="text-dark mx-2">مشاوره تلفنی</span> */}
            <i className="bilitja icon-phone font-size-16"></i>
            <span className="font-size-17 text-dark"> &nbsp;021-84279999</span>
          </a>
        </div>
      </div>
      <div className={styles["nav-logo-container-mobile"]}>
        <div className="pull-right">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => {
              setState({
                slide: true,
              });
            }}
            className="mobile-nav-barsicon"
          />
          <h1 className="font-bold-iransanse">
            {" "}
            خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه{" "}
          </h1>
        </div>
        <a href="/">
          <img
            width=""
            height=""
            alt="بلیطجا - لوگو"
            src="../../../Images/logo512.webp"
            className="pull-left"
          />
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
            <a href="/">
              <img
                width=""
                height=""
                alt="بلیطجا - لوگو"
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
                <a href="/">
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
                <a href="/flights/order">
                  <i className="bilitja font-size-24 icon-refrence pull-right rotate-y-180"></i>
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
export default connect(mapStateToProps, mapDispatchesToProps)(NavBarMobile);
