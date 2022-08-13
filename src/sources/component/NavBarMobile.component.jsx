import React from "react";
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
class NavBarMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      slide: false,
      mobile: "",
      logged: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const user_mobile = localStorage.getItem("mobile");
      const current_state = { ...this.state };
      current_state.logged = true;
      current_state.mobile = user_mobile;
      this.setState(current_state);
    }
  }

  handleLogoutUser() {
    localStorage.removeItem("mobile");
    localStorage.removeItem("token");
  }
  render() {
    console.log(this.props);
    return (
      /*<div className={styles['error-mobile']}> hghgshghgsd</div>*/
      <nav className={styles["nav-mobile"]}>
        <div className={styles["nav-text-detail-mobile"]}>
          <div className="pull-right">
            {this.props.user.logged === true ? (
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
                    <span className="font-bold-iransanse">
                      شماره موبایل : {this.props.user.user_info.mobile}{" "}
                    </span>
                  </a>
                </Link>
                <span className="mx-2">/</span>

                <a
                  href="/"
                  className="mx-2 text-dark"
                  onClick={this.handleLogoutUser}
                >
                  خروج از حساب کاربری
                </a>
              </>
            ) : (
              <>
                {" "}
                <a
                  href=""
                  className="font-size-13 color-black"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.accountBoxModify({
                      state: true,
                      type: "login",
                    });
                  }}
                >
                  {" "}
                  <i className="bilitja icon-login font-size-14 text-dark"></i>{" "}
                  &nbsp;
                  <span className="font-bold-iransanse text-dark mr-2">
                    ورود{" "}
                  </span>
                  /
                </a>
                <a
                  href=""
                  className="color-black font-size-13"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.accountBoxModify({
                      state: true,
                      type: "register",
                    });
                  }}
                >
                  <i className="bilitja icon-register font-size-14 text-dark"></i>
                  &nbsp;
                  <span className="font-bold-iransanse text-dark">ثبت نام</span>
                </a>
              </>
            )}

            {this.props.user.logged === false ? (
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
            )}
          </div>
          <div className="pull-left">
            <a href="#" className="color-black font-bold-iransanse">
              <span className="text-dark">مشاوره تلفنی : </span>
              <i className="bilitja icon-phone font-size-14"></i>
              <span className="font-size-17 text-dark"> &nbsp;۰۲۱-۵۷۸۷۴</span>
            </a>
          </div>
        </div>
        <div className={styles["nav-logo-container-mobile"]}>
          <div className="pull-right">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => {
                this.setState({
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
          slide={this.state.slide}
          close={() => {
            this.setState({
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
                  this.setState({
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
}
const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
});
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, mapDispatchesToProps)(NavBarMobile);
