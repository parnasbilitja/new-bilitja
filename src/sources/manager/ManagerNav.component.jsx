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
  const [isOpend, setOpend] = useState(false);
  const [mobile, setMobile] = useState();

  useEffect(() => {
    setMobile(localStorage.getItem("mobile"));
  }, []);

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
      <div
        className={`${styles["manager-nav-main-container"]} ${isOpend ? styles["slidein-manager"] : ""
          }`}
      >
        <div className={styles["manager-nav-header"]}>
          <a href="/" target='_blank'>
            <img
              width=""
              height=""
              alt="بلیطجا - لوگو"
              src="../../../Images/bilitja-logo.webp"
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
              ? `${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item-active mt-2`
              : `${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item mt-2`
          }
          onClick={() => {
            myRouter.push("/panel/profile");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faUser} />
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
            myRouter.asPath === "/panel/index"
              ? `${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`
          }
          onClick={() => {
            myRouter.push("/panel/dashboard");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faChartLine} />
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
            myRouter.asPath === "/panel/reports"
              ? `${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item-active`
              : `${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`
          }
          onClick={() => {
            myRouter.push("/panel/flight-sell-report");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              گزارشات
            </p>
            <p className="no-margin font-size-13 color-textpill">Reports</p>
          </div>
        </div>
        <div
          className={`${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/price-handling");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faPlaneDeparture} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">پرواز</p>
            <p className="no-margin font-size-13 color-textpill">Flights</p>
          </div>
        </div>
        <div
          className={`${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/villas/search");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">هتل</p>
            <p className="no-margin font-size-13 color-textpill">Hotels</p>
          </div>
        </div>
        <div
          className={`${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/villas/search");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faMapMarked} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">تور</p>
            <p className="no-margin font-size-13 color-textpill">Tours</p>
          </div>
        </div>
        <div
          className={`${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/villas/search");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">ویلا</p>
            <p className="no-margin font-size-13 color-textpill">villa</p>
          </div>
        </div>
        <div
          className={`${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/city/show");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">شهر</p>
            <p className="no-margin font-size-13 color-textpill">City</p>
          </div>
        </div>
        <div
          className={`${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/facility/show");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              امکانات
            </p>
            <p className="no-margin font-size-13 color-textpill">Facility</p>
          </div>
        </div>
        <div
          className={`${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/panel/rule/show");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">قوانین</p>
            <p className="no-margin font-size-13 color-textpill">Rules</p>
          </div>
        </div>
        <div
          className={`${styles["manager-nav-one-row"]} cursor-pointer panel-menu-item`}
          onClick={() => {
            myRouter.push("/logout");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faDoorOpen} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">خروج</p>
            <p className="no-margin font-size-13 color-textpill">exit</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManagerNav;
