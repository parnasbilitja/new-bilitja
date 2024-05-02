import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/ManagerNav.module.scss";
//import logo from '../../../Images/bilitja-logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchway,
  faBars,
  faBuilding,
  faChartLine,
  faLocationArrow,
  faMapMarked,
  faPlaneDeparture,
  faUser,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const ManagerNav = (props) => {
  const myRouter = useRouter();
  const [isOpend, setOpend] = useState(true);
  const [mobile, setMobile] = useState();
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setMobile(localStorage.getItem("mobile"));
    setWidth(window.innerWidth)
    console.log(width);
      width>826?
      setOpend(true)
      :
      setOpend(false)
  }, [width]);

  return (
    <div>
      <div className={styles["manager-small-screen-top-bar"]}>
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => {
            setOpend(!isOpend);
          }}
        />
      </div>
      {isOpend &&
      <div
        className={`${styles["manager-nav-main-container"]} ${isOpend ? styles["slidein-manager"] : ""
          }`}
      >
        <div className={styles["manager-nav-header"]} >
          <a href="/" target='_blank' style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <img
              width=""
              height=""
              alt="بلیطجا - لوگو"
              src="../../../Images/hamnavaz-logo.webp"
            />
          </a>
        </div>

        <div className={styles["manager-small-screen-top-bar"]}>
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => {
              setOpend(!isOpend);
            }}
          />
        </div>
        <div
          className={
            myRouter.asPath === "/panel/profile"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active mt-2`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item mt-2`
          }
          onClick={() => {
            myRouter.push("/panel/profile");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
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
            <p className="no-margin font-size-13 color-textpill">09138409764</p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/panel/dashboard"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`
          }
          onClick={() => {
            myRouter.push("/panel/dashboard");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faChartLine} /> */}
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4H20V10H12V4ZM12 21V11H20V21H12ZM3 21V15H11V21H3ZM3 14V4H11V14H3ZM4 5V13H10V5H4ZM13 5V9H19V5H13ZM13 12V20H19V12H13ZM4 16V20H10V16H4Z" fill="#013136" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              داشبورد
            </p>
            <p className="no-margin font-size-13 color-textpill">Dashboard</p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/panel/flight-sell-report"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`
          }
          onClick={() => {
            myRouter.push("/panel/flight-sell-report");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faChartLine} /> */}
            <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32.6172 17.8203L25.9245 27.8844C25.4988 28.5245 24.5401 28.4649 24.197 27.777L21.9143 23.2003C21.5712 22.5124 20.6125 22.4528 20.1868 23.0929L13.4941 33.157" stroke="#013136" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <rect x="5.84766" y="6.31836" width="34.4215" height="34.5075" rx="2" stroke="#013136" strokeWidth={2} />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              گزارشات
            </p>
            <p className="no-margin font-size-13 color-textpill">Reports</p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/panel/price-handling"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`
          }
          onClick={() => {
            myRouter.push("/panel/price-handling");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >

          <div>
            {/* <FontAwesomeIcon icon={faPlaneDeparture} /> */}
            <svg width="25" height="25" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.19989 64.9966H68.9634V70.7363H1.19989V64.9966ZM63.2724 9.06397C59.9706 7.8954 56.4605 7.97827 53.3891 9.29714L53.2629 9.35095L44.0725 14.9005L17.2521 1.3534C16.0813 0.755724 14.8019 0.587839 13.5596 0.868867C12.3174 1.14989 11.1622 1.86854 10.2257 2.94294L6.63509 7.03211C6.2563 7.46358 5.95885 7.99788 5.7648 8.59537C5.57076 9.19286 5.4851 9.8382 5.51419 10.4835C5.54328 11.1288 5.68637 11.7575 5.93284 12.3229C6.17931 12.8884 6.52283 13.376 6.93791 13.7497L23.5636 28.7192L17.1863 32.9635L12.1358 27.1006C11.1702 25.9818 9.97077 25.2411 8.68179 24.9675C7.3928 24.6938 6.06904 24.8989 4.86957 25.5581L2.12303 27.071C1.69375 27.3074 1.30765 27.6541 0.989052 28.0894C0.670453 28.5247 0.426261 29.0391 0.27186 29.6002C0.117459 30.1613 0.0561953 30.757 0.0919284 31.3497C0.127661 31.9424 0.259617 32.5192 0.479482 33.0439L10.7599 57.586L66.747 22.5246C70.0993 20.5199 70.508 17.315 69.7708 14.9807C68.9537 12.3928 66.5848 10.2363 63.2724 9.06397V9.06397ZM64.8112 17.3386L64.7902 17.3512L12.6906 49.9778L5.04237 31.7184L6.66587 30.8239C7.0657 30.6041 7.50697 30.5358 7.93665 30.627C8.36632 30.7182 8.76612 30.9651 9.08799 31.3381L16.4765 39.9152L32.1932 29.455L10.704 10.1061L13.2411 7.21686C13.5532 6.85877 13.9383 6.61925 14.3523 6.52557C14.7664 6.4319 15.1929 6.48784 15.5831 6.68702L44.2334 21.1584L54.9556 14.6842C57.1376 13.7858 59.7362 13.7578 62.1077 14.6101C64.0607 15.3122 65.0981 16.332 65.4496 16.8669C65.251 17.0532 65.037 17.2115 64.8115 17.3392L64.8112 17.3386Z" fill="#013136" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">پرواز</p>
            <p className="no-margin font-size-13 color-textpill">Flights</p>
          </div>
        </div>
        <div
          className={myRouter.asPath === "/panel/villas/search"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/villas/search");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faBuilding} /> */}
            <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 15C9.79667 15 10.0867 15.088 10.3334 15.2528C10.58 15.4176 10.7723 15.6519 10.8858 15.926C10.9994 16.2001 11.0291 16.5017 10.9712 16.7926C10.9133 17.0836 10.7704 17.3509 10.5607 17.5607C10.3509 17.7704 10.0836 17.9133 9.79264 17.9712C9.50167 18.0291 9.20007 17.9993 8.92598 17.8858C8.65189 17.7723 8.41762 17.58 8.2528 17.3334C8.08797 17.0867 8 16.7967 8 16.5C8 16.1022 8.15804 15.7206 8.43934 15.4393C8.72065 15.158 9.10218 15 9.5 15ZM9.5 13C8.80777 13 8.13108 13.2053 7.55551 13.5899C6.97993 13.9744 6.53133 14.5211 6.26642 15.1606C6.00152 15.8001 5.9322 16.5039 6.06725 17.1828C6.2023 17.8617 6.53564 18.4854 7.02513 18.9749C7.51461 19.4644 8.13825 19.7977 8.81718 19.9327C9.49612 20.0678 10.1999 19.9985 10.8394 19.7336C11.4789 19.4687 12.0256 19.0201 12.4101 18.4445C12.7947 17.8689 13 17.1922 13 16.5C13 15.5717 12.6313 14.6815 11.9749 14.0251C11.3185 13.3687 10.4283 13 9.5 13V13Z" fill="#013136" />
              <path d="M25 13.9993H17C16.4696 13.9993 15.9609 14.21 15.5858 14.5851C15.2107 14.9601 15 15.4689 15 15.9993V21.9993H4V10.5993L16 4.13929L28.53 10.8793L29.47 9.11929L16.47 2.11929C16.3253 2.04225 16.1639 2.00195 16 2.00195C15.8361 2.00195 15.6747 2.04225 15.53 2.11929L2.53 9.11929C2.37032 9.20431 2.2367 9.33106 2.14336 9.48603C2.05003 9.641 2.00048 9.81838 2 9.99929V29.9993H4V23.9993H28V29.9993H30V18.9993C30 17.6732 29.4732 16.4014 28.5355 15.4638C27.5979 14.5261 26.3261 13.9993 25 13.9993ZM17 21.9993V15.9993H25C25.7956 15.9993 26.5587 16.3154 27.1213 16.878C27.6839 17.4406 28 18.2036 28 18.9993V21.9993H17Z" fill="#013136" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">هتل</p>
            <p className="no-margin font-size-13 color-textpill">Hotels</p>
          </div>
        </div>
        <div
          className={myRouter.asPath === "/panel/villas/search"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/villas/search");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faMapMarked} /> */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 22V2H7V4H21L19 9L21 14H7V22H5ZM7 6V12V6ZM12.5 11C13.05 11 13.521 10.804 13.913 10.412C14.3043 10.0207 14.5 9.55 14.5 9C14.5 8.45 14.3043 7.979 13.913 7.587C13.521 7.19567 13.05 7 12.5 7C11.95 7 11.4793 7.19567 11.088 7.587C10.696 7.979 10.5 8.45 10.5 9C10.5 9.55 10.696 10.0207 11.088 10.412C11.4793 10.804 11.95 11 12.5 11V11ZM7 12H18.05L16.85 9L18.05 6H7V12Z" fill="#013136" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">تور</p>
            <p className="no-margin font-size-13 color-textpill">Tours</p>
          </div>
        </div>
        <div
          className={myRouter.asPath === "/panel/villas/search"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/villas/search");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faArchway} /> */}
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21V8L16 3V12H17C17 11.45 17.1957 10.979 17.587 10.587C17.979 10.1957 18.45 10 19 10C19.55 10 20.021 10.1957 20.413 10.587C20.8043 10.979 21 11.45 21 12V21H3ZM5 19H9V12H14V5.9L5 9.375V19ZM11 19H14V16H16V19H19V14H11V19Z" fill="#013136" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">ویلا</p>
            <p className="no-margin font-size-13 color-textpill">villa</p>
          </div>
        </div>
        <div
          className={myRouter.asPath === "/panel/city/show"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/city/show");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faArchway} /> */}
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 9.01L7.01 8.999M11 9.01L11.01 8.999M7 13.01L7.01 12.999M11 13.01L11.01 12.999M7 17.01L7.01 16.999M11 17.01L11.01 16.999M15 21H3.6C3.44087 21 3.28826 20.9368 3.17574 20.8243C3.06321 20.7117 3 20.5591 3 20.4V5.6C3 5.44087 3.06321 5.28826 3.17574 5.17574C3.28826 5.06321 3.44087 5 3.6 5H9V3.6C9 3.44087 9.06321 3.28826 9.17574 3.17574C9.28826 3.06321 9.44087 3 9.6 3H14.4C14.5591 3 14.7117 3.06321 14.8243 3.17574C14.9368 3.28826 15 3.44087 15 3.6V9M15 21H20.4C20.5591 21 20.7117 20.9368 20.8243 20.8243C20.9368 20.7117 21 20.5591 21 20.4V9.6C21 9.44087 20.9368 9.28826 20.8243 9.17574C20.7117 9.06321 20.5591 9 20.4 9H15M15 21V17M15 9V13M15 13H17M15 13V17M15 17H17" stroke="#013136" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">شهر</p>
            <p className="no-margin font-size-13 color-textpill">City</p>
          </div>
        </div>
        <div
          className={myRouter.asPath === "/panel/facility/show"
          ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
          : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/facility/show");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faArchway} /> */}
            <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.57851 13.3078V13.3078C6.57851 11.6345 6.57851 10.7979 6.90289 10.1582C7.19121 9.58968 7.65312 9.12777 8.22164 8.83945C8.8613 8.51507 9.69794 8.51507 11.3712 8.51507L38.0877 8.51507C38.5591 8.51507 38.7948 8.51507 38.9412 8.66151C39.0877 8.80796 39.0877 9.04366 39.0877 9.51507V12.1005C39.0877 14.9289 39.0877 16.3431 38.209 17.2218C37.3303 18.1005 35.9161 18.1005 33.0877 18.1005L29.5262 18.1005M6.57851 13.3078V13.3078C6.57851 14.981 6.57851 15.8177 6.90289 16.4573C7.19121 17.0259 7.65312 17.4878 8.22164 17.7761C8.8613 18.1005 9.69794 18.1005 11.3712 18.1005L39 18.1005C39.9428 18.1005 40.4142 18.1005 40.7071 18.3934C41 18.6863 41 19.1577 41 20.1005L41 25.7688M6.57851 13.3078L6.57851 37.1055C6.57851 38.9911 6.57851 39.9339 7.1643 40.5197C7.75008 41.1055 8.69289 41.1055 10.5785 41.1055L39 41.1055C39.9428 41.1055 40.4142 41.1055 40.7071 40.8126C41 40.5197 41 40.0483 41 39.1055L41 33.4371M41 33.4371H31.5262C30.5834 33.4371 30.112 33.4371 29.8191 33.1442C29.5262 32.8514 29.5262 32.3799 29.5262 31.4371V27.7688C29.5262 26.826 29.5262 26.3546 29.8191 26.0617C30.112 25.7688 30.5834 25.7688 31.5262 25.7688H41M41 33.4371L41 25.7688" stroke="#013136" strokeWidth={2} />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              امکانات
            </p>
            <p className="no-margin font-size-13 color-textpill">Facility</p>
          </div>
        </div>
        <div
          className={myRouter.asPath === "/panel/rule/show"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/rule/show");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faArchway} /> */}
            <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="11.8516" y="8.16797" width="24.86" height="32.5904" rx="2" stroke="#013136" strokeWidth={2} />
              <path d="M29.0625 19.6699V15.8358" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
              <path d="M8.02734 17.7539H15.6766" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
              <path d="M8.02734 25.4219H15.6766" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
              <path d="M8.02734 33.0898H15.6766" stroke="#013136" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">قوانین</p>
            <p className="no-margin font-size-13 color-textpill">Rules</p>
          </div>
        </div>
        <div
          className={myRouter.asPath === "/"
              ? `${styles["active-tab"]} ${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} d-flex align-items-center flex-row-reverse cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/");
            if (width <= 826) {
              setOpend(false)
            }
          }}
        >
          <div>
            {/* <FontAwesomeIcon icon={faDoorOpen} /> */}
            <svg width="25" height="25" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7656 14.0122V8.7875C13.7656 6.64092 13.7656 5.56763 14.4555 4.96953C15.1453 4.37142 16.2078 4.52358 18.3327 4.8279L35.3885 7.27053C37.8437 7.62215 39.0713 7.79796 39.8046 8.64375C40.5379 9.48955 40.5379 10.7297 40.5379 13.2099V33.4794C40.5379 35.9596 40.5379 37.1998 39.8046 38.0456C39.0713 38.8913 37.8437 39.0672 35.3885 39.4188L18.3327 41.8614C16.2078 42.1657 15.1453 42.3179 14.4555 41.7198C13.7656 41.1217 13.7656 40.0484 13.7656 37.9018V33.0565" stroke="#013136" strokeWidth={2} />
              <path d="M30.9766 23.3452L31.7582 22.7214L32.2559 23.3452L31.7582 23.9689L30.9766 23.3452ZM8.02889 24.3452C7.47661 24.3452 7.02889 23.8975 7.02889 23.3452C7.02889 22.7929 7.47661 22.3452 8.02889 22.3452V24.3452ZM24.109 13.136L31.7582 22.7214L30.1949 23.9689L22.5457 14.3835L24.109 13.136ZM31.7582 23.9689L24.109 33.5543L22.5457 32.3068L30.1949 22.7214L31.7582 23.9689ZM30.9766 24.3452H8.02889V22.3452H30.9766V24.3452Z" fill="#013136" />
            </svg>
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">خروج</p>
            <p className="no-margin font-size-13 color-textpill">exit</p>
          </div>
        </div>
      </div>
      }
    </div>
  );
};
export default ManagerNav;
