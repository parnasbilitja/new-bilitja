import { useRouter, withRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";
import { connect } from "react-redux";
import globals from "../../Global";

import { accountBoxModify, messageBoxModify } from "../../../Redux/UI/ui.action";



const RouteButtons = (props) => {
  const router = useRouter();
  const [state, setState] = useState({
    mobile: localStorage.getItem("mobile"),
  });

  const changePassword = () => {
    // setState({...state, btn_text: "در حال پردازش..." });
    fetch(`${globals.baseUrlNew}auth/getMobile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: state.mobile,
        register: 0,
        token: "",
        password: "",
        hostname : "bilitja.com",
        customerId : "1a157116-a01a-4027-ab10-74098ac63815",
        agencyName : "بلیطجا",
        telNumber : "02157874",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 0) {
          setState({...state, get_code: true, btn_text: "تایید کد احراز هویت" });
          props.messageBoxModify({
            state: true,
            color:true,
            message: "کد احراز هویت برای شما ارسال شد.",
          });
        } else if (data.status == -111) {
          setState({...state, btn_text: "دریافت کد احراز هویت" });
          props.messageBoxModify({
            color:false,
            state: true,
            message: "چنین کاربری در سامانه یافت نشد، لطفا ثبت نام کنید.",
          });
        }
      });
  };



  const path = router.asPath;
  return (
    <section>
      <ul className="nav nav-pills justify-content-end" id="pills-tab" role="tablist">
        {props.user_information.name === null ? (
          <li className="nav-item" role="presentation">
            <Link href="/dashboard/complate-profile">
              <button
                className={
                  path === "/dashboard/complate-profile"
                    ? "menu-btn nav-link mx-2 active-menu"
                    : "menu-btn nav-link mx-2"
                }
              >
                تکمیل اطلاعات
              </button>
            </Link>
          </li>
        ) : null}
        {props.user_information.name !== null ? (
          <li className="nav-item" role="presentation">
            <Link href="/dashboard/edit-profile">
              <button
                className={
                  path === "/dashboard/edit-profile"
                    ? "menu-btn nav-link mx-2 active-menu"
                    : "menu-btn nav-link mx-2"
                }
              >
                ویرایش اطلاعات
              </button>
            </Link>
          </li>
        ) : null}

        <li className="nav-item" role="presentation">
          <Link href="/dashboard/change-password">
            <button
            onClick={() =>changePassword()}
            
              className={
                path === "/dashboard/change-password"
                  ? "menu-btn nav-link mx-2 active-menu"
                  : "menu-btn nav-link mx-2"
              }
            >
              تغییر گذرواژه
            </button>
          </Link>
        </li>
      </ul>
    </section>
  );
};

const mapStateToProps = (state) => ({
  user_information: state.user_information,
});

const mapDispatchesToProps = (dispatch) => ({
  accountBoxModify: (value) => dispatch(accountBoxModify(value)),
  messageBoxModify: (value) => dispatch(messageBoxModify(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchesToProps)(RouteButtons));
