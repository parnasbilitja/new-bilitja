import React from "react";
import Image from "next/image";
//import logo from '../../../Images/logo512.png'
import styles from "../../../styles/NavBar.module.scss";
import Link from "next/link";

//import '../../../public/kilofont.svg'

import { connect } from "react-redux";
import { accountBoxModify } from "../../Redux/UI/ui.action";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (
      <nav className={styles.navVar}>
        <div className={styles["nav-text-detail"]}>
          <div>
            {/* <a
              href="/villa/intro"
              className={`font-size-10 btn-outlined ${styles["btn-nav-hosting"]}`}
            >
              میزبان شوید
            </a> */}
          </div>
          <div className="font-size-12">
            <div
              className={
                this.props.user.logged === true
                  ? "user-mobile-content"
                  : styles["nav-detail-first-line"]
              }
            >
              {this.props.user.logged === true ? (
                <>
                  <div>
                    <Link href="/dashboard">
                      <a href="#">
                        <i className="kilo-font icon-login"></i>
                        {this.props.user.user_info.mobile}
                      </a>
                    </Link>
                  </div>
                  <span className="mx-2"> /</span>
                  <div>
                    <a
                      href="/"
                      onClick={this.handleLogoutUser}
                      className="cursor-pointer"
                    >
                      خروج
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.accountBoxModify({
                          state: true,
                          type: "login",
                        });
                      }}
                    >
                      <i className="kilo-font icon-login"></i>
                      <span>ورود کاربر</span>
                    </a>
                  </div>
                  <div className="border-right">
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.accountBoxModify({
                          state: true,
                          type: "register",
                        });
                      }}
                    >
                      <i className="kilo-font icon-register"></i>
                      <span>ثبت نام</span>
                    </a>
                  </div>
                </>
              )}
            </div>
            <div className={styles["nav-detail-second-line"]}>
              <a href="#">
                <span>مشاوره تلفنی : </span>
                <i className="kilo-font icon-phone"></i>
                <span>۰۲۱۵۷۸۷۴</span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles["nav-items-container"]}>
          <ul className={styles["navbar-items"]}>
            <li>
              <a href="/">
                <i
                  className={`kilo-font icon-plane-departure  ${styles["nav-icon"]} rotate-y-180`}
                ></i>
                بلیط هواپیما
              </a>
            </li>
            {/* <li>
              <a href="/villa">
                <i
                  className={`kilo-font icon-villa ${styles["nav-icon"]} `}
                ></i>
                اقامتگاه
              </a>
            </li> */}
            <li>
              <a href="/blog">
                <i className={`kilo-font icon-blog ${styles["nav-icon"]} `}></i>
                بلاگ
              </a>
            </li>
            <li>
              <a href="/flights/order">
                <i
                  className={`kilo-font icon-refrence ${styles["nav-icon"]} `}
                ></i>
                پیگیری خرید
              </a>
            </li>
          </ul>
        </div>
        <div className={styles["nav-logo-container"]}>
          <div>
            <a href="/">
              <img
                width=""
                height=""
                className={styles["logo"]}
                src="../../../Images/logo512.webp"
                alt="بلیطجا - لوگو"
              />
            </a>
            <h1 className="font-size-8">
              خرید اینترنتی بلیط هواپیما و رزرو اقامتگاه
            </h1>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchesToProps)(NavBar);
