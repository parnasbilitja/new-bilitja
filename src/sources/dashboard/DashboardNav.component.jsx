import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  faArchway,
  faChartLine,
  faDollarSign,
  faHandshake,
  faInfoCircle,
  faSignOutAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/ManagerNav.module.scss";
import Link from "next/link";

const DashboardNav = (props) => {
  const handleLogoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mobile");
    localStorage.removeItem("token");
    // setState({...state,logged:false})
  }
  const myRouter = useRouter();
  const [mobile, setMobile] = useState();

  useEffect(() => {
    setMobile(localStorage.getItem("mobile"));
  }, [props.open]);

  return (
    <div>
      {props.children}
      {!props.open?
      <div
        className={`${styles["manager-nav-main-container"]} ${props.open === true ? styles["slidein-manager"] : ""
          }`}
      >
        <div className="w-100 d-flex justify-content-between rounded-3">
          <div className={styles["manager-nav-header"]} style={{ width: "100%", display: "flex", flexDirection: 'row-reverse', justifyContent: "space-between" }}>
            <Link href={'/'} passHref>
              <img
                width=""
                height=""
                alt="بلیطجا - لوگو"
                src="../../../Images/bilitja-logo.webp"
              />
            </Link>
            <div
              className={`${styles[""]} d-flex align-items-center flex-row-reverse cursor-pointer`}
              onClick={(e) => {handleLogoutUser(e)
                myRouter.push("/");
                props.onClose();
              }}
            >
              <div>
                <p className="no-margin font-size-12 font-bold-iransanse">خروج</p>
                <p className="no-margin font-size-12 color-textpill iran-sans">
                  Exit
                </p>
              </div>
              <div className="d-flex">
                {/* <FontAwesomeIcon className={'text-danger'} icon={faSignOutAlt} /> */}
                <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.6773 36.5873C18.003 37.9334 20.6411 38.6421 23.3265 38.6421C26.012 38.6421 28.6501 37.9334 30.9758 36.5873C33.3014 35.2413 35.2327 33.3052 36.5754 30.9737C37.9181 28.6423 38.625 25.9976 38.625 23.3054C38.625 20.6133 37.9181 17.9685 36.5754 15.6371C35.2327 13.3056 33.3014 11.3695 30.9758 10.0235C28.6501 8.6774 26.012 7.96875 23.3266 7.96875C20.6411 7.96875 18.003 8.6774 15.6773 10.0235" stroke="#ff0000" strokeWidth={2} />
                  <path d="M4.20312 23.3061L3.4215 22.6824L2.92374 23.3061L3.4215 23.9299L4.20312 23.3061ZM21.4139 24.3061C21.9662 24.3061 22.4139 23.8584 22.4139 23.3061C22.4139 22.7538 21.9662 22.3061 21.4139 22.3061V24.3061ZM11.0707 13.097L3.4215 22.6824L4.98475 23.9299L12.634 14.3444L11.0707 13.097ZM3.4215 23.9299L11.0707 33.5153L12.634 32.2678L4.98475 22.6824L3.4215 23.9299ZM4.20312 24.3061H21.4139V22.3061H4.20312V24.3061Z" fill="#ff0000" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="line-horizontal"></div>
        <div
          className={
            myRouter.asPath === "/dashboard/profile"
              ? `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/profile");
            props.onClose();
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faUserAlt} /> */}
            <svg width="25" height="25" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.057 39.7095C38.1832 37.4675 36.2577 35.4864 33.5793 34.0734C30.9008 32.6604 27.619 31.8945 24.2429 31.8945C20.8668 31.8945 17.585 32.6604 14.9065 34.0734C12.2281 35.4864 10.3026 37.4675 9.42884 39.7095" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
              <ellipse cx="24.2425" cy="18.475" rx="7.66833" ry="7.66833" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
              <ellipse cx="24.2433" cy="24.2257" rx="23.005" ry="23.005" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              پروفایل
            </p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              {mobile}
            </p>
          </div>
        </div>
        {/*<div*/}
        {/*  className={*/}
        {/*    myRouter.asPath === "/dashboard/index"*/}
        {/*      ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`*/}
        {/*      : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`*/}
        {/*  }*/}
        {/*  onClick={() => {*/}
        {/*    myRouter.push("/dashboard/index");*/}
        {/*    props.onClose();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <div>*/}
        {/*    <FontAwesomeIcon icon={faChartLine} />*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <p className="no-margin font-size-13 font-bold-iransanse">*/}
        {/*      داشبورد*/}
        {/*    </p>*/}
        {/*    <p className="no-margin font-size-13 color-textpill iran-sans">*/}
        {/*      Dashboard*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div
          className={
            myRouter.asPath === "/dashboard/orders"
              ? `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/orders");
            props.onClose();
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
            {/* <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.6172 17.8203L25.9245 27.8844C25.4988 28.5245 24.5401 28.4649 24.197 27.777L21.9143 23.2003C21.5712 22.5124 20.6125 22.4528 20.1868 23.0929L13.4941 33.157" stroke="#013136" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <rect x="5.84766" y="6.31836" width="34.4215" height="34.5075" rx="2" stroke="#013136" strokeWidth={2} />
            </svg> */}
            <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.31641 10.7246C8.31641 8.83899 8.31641 7.89618 8.90219 7.3104C9.48798 6.72461 10.4308 6.72461 12.3164 6.72461H34.9133C36.7989 6.72461 37.7417 6.72461 38.3275 7.3104C38.9133 7.89618 38.9133 8.83899 38.9133 10.7246V31.2321C38.9133 35.9461 38.9133 38.3032 37.4488 39.7676C35.9844 41.2321 33.6273 41.2321 28.9133 41.2321H18.3164C13.6024 41.2321 11.2453 41.2321 9.78087 39.7676C8.31641 38.3032 8.31641 35.9461 8.31641 31.2321V10.7246Z" stroke="#013136" strokeWidth={2} />
              <path d="M29.6055 35.4805L29.6055 41.2317M18.103 35.4805L18.103 41.2317" stroke="#013136" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M14.2695 16.3086H33.4404" stroke="#013136" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M20.0195 27.8125H27.6879" stroke="#013136" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M16.1875 22.0605L31.5242 22.0605" stroke="#013136" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              سفارش ها
            </p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              Orders
            </p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/dashboard/wallet"
              ? `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/wallet");
            props.onClose();
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faDollarSign} /> */}
            <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6.58203" y="12.002" width="34.4215" height="24.9221" rx="2" stroke="#013136" strokeWidth={2} />
              <path d="M14.2305 29.2559H14.2494" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
              <path d="M8.49219 21.5879H41.0014" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">مالی</p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              Wallet
            </p>
          </div>
        </div>
        {/*<div*/}
        {/*  className={*/}
        {/*    myRouter.asPath === "/dashboard/agency"*/}
        {/*      ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`*/}
        {/*      : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`*/}
        {/*  }*/}
        {/*  onClick={() => {*/}
        {/*    myRouter.push("/dashboard/agency");*/}
        {/*    props.onClose();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <div>*/}
        {/*    <FontAwesomeIcon icon={faDollarSign} />*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <p className="no-margin font-size-13 font-bold-iransanse">agency</p>*/}
        {/*    <p className="no-margin font-size-13 color-textpill iran-sans">*/}
        {/*      agency*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className={*/}
        {/*    myRouter.asPath === "/dashboard/my-villa"*/}
        {/*      ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`*/}
        {/*      : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`*/}
        {/*  }*/}
        {/*  onClick={() => {*/}
        {/*    myRouter.push("/dashboard/my-villa");*/}
        {/*    props.onClose();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <div>*/}
        {/*    <FontAwesomeIcon icon={faArchway} />*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <p className="no-margin font-size-13 font-bold-iransanse">*/}
        {/*      اقامتگاه*/}
        {/*    </p>*/}
        {/*    <p className="no-margin font-size-13 color-textpill iran-sans">*/}
        {/*      Villas*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div
          className={
            myRouter.asPath === "/dashboard/coopration"
              ? `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/profile");
            props.onClose();
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faHandshake} /> */}
            <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.0563 39.1479L8.43489 20.8256C8.10363 20.4104 7.93799 20.2029 7.89347 19.9529C7.84896 19.703 7.93274 19.451 8.10031 18.947L10.6721 11.2125C11.1114 9.89119 11.3311 9.23052 11.8551 8.85256C12.379 8.47461 13.0753 8.47461 14.4677 8.47461H31.6448C33.0373 8.47461 33.7335 8.47461 34.2575 8.85256C34.7814 9.23052 35.0011 9.89119 35.4405 11.2125L38.0122 18.947C38.1798 19.451 38.2636 19.703 38.219 19.9529C38.1745 20.2029 38.0089 20.4105 37.6776 20.8256L23.0563 39.1479ZM23.0563 39.1479L29.7493 18.06M23.0563 39.1479L16.3632 18.06M37.3986 19.9771L29.7493 18.06M29.7493 18.06L26.8809 10.3917M29.7493 18.06H16.3632M19.2316 10.3917L16.3632 18.06M16.3632 18.06L8.71397 19.9771" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              همکاری با ما
            </p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              Cooperation
            </p>
          </div>
        </div>
      </div>
      :''}
    </div>
  );
};
export default DashboardNav;
