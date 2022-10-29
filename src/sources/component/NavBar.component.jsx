import React, {useState, useEffect} from "react";
import Image from "next/image";
//import logo from '../../../Images/logo512.png'
import styles from "../../../styles/NavBar.module.scss";
import Link from "next/link";

//import '../../../public/kilofont.svg'
import { connect } from "react-redux";
import { selcetAccountBox } from "../../Redux/UI/ui.reselect";
import { withRouter } from "next/router";
import { accountBoxModify } from "../../Redux/UI/ui.action";

const NavBar = (props) =>{

  const [state,setState] = useState({
    mobile: '',
    logged: false,
  });

  useEffect(() =>{
    let token = localStorage.getItem("token");
    if (token) {
      const user_mobile = localStorage.getItem("mobile");
      setState({...state,
        logged : true,
        mobile : user_mobile,
      });
    }
    if (state.logged) {
      props.user.logged = state.logged;
      props.user.user_info = {mobile: state.mobile}
    }
  },[])

  useEffect (() => {
    if (localStorage.getItem("token")) { 
      setState({...state,
        mobile:localStorage.getItem("mobile"),
        logged : true
      })
    }
  },[props.user])

  if (state.logged) {
    var hours = 1; // to clear the localStorage after 1 hour
               // (if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
  }


  const handleLogoutUser = (e) => {
    e.preventDefault();
    // localStorage.removeItem("mobile");
    localStorage.removeItem("token");
    localStorage.removeItem("mobile");
    setState({...state,logged:false})
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
                <div className="font-size-12">
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
                            <a href="#">
                              <i className="bilitja icon-login"></i>
                              {state.mobile}
                            </a>
                          </Link>
                        </div>
                        <span className="mx-2"> /</span>
                        <div>
                          <a 
                            // href={props.router.route}
                            href={'#'}
                            style={{ fontSize: 12 }}
                            onClick={(e)=>handleLogoutUser(e)}
                            className="cursor-pointer"
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
                        <div className="border-right">
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
                            <span>ورود / ثبت نام</span>
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles["nav-detail-second-line"]}>
                    <a href="#" style={{ fontSize: 12 }}>
                      <span>مشاوره تلفنی : </span>
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
                        <i
                          className={`bilitja icon-tours  ${styles["nav-icon"]} rotate-y-180`}
                          ></i>
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
                      />
                    </Link>
                    <h1 className="font-size-8">
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
