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

const DashboardNav = (props) => {
  const myRouter = useRouter();
  const [mobile, setMobile] = useState();

  useEffect(() => {
    setMobile(localStorage.getItem("mobile"));
  }, [props.open]);

  return (
    <div>
      {props.children}
      <div
        className={`${styles["manager-nav-main-container"]} ${
          props.open === true ? styles["slidein-manager"] : ""
        }`}
      >
        <div className={styles["manager-nav-header"]}>
          <img
            width=""
            height=""
            width=""
            height=""
            alt="بلیطجا - لوگو"
            src="../../../Images/bilitja-logo.png"
          />
        </div>
        <div
          className={
            myRouter.asPath === "/dashboard/profile"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/profile");
            props.onClose();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faUserAlt} />
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
        <div
          className={
            myRouter.asPath === "/dashboard/index"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/index");
            props.onClose();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              داشبورد
            </p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              Dashboard
            </p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/dashboard/orders"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/orders");
            props.onClose();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              گزارشات
            </p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              Orders
            </p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/dashboard/wallet"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/wallet");
            props.onClose();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">مالی</p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              Wallet
            </p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/dashboard/agency"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/agency");
            props.onClose();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">agency</p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              agency
            </p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/dashboard/my-villa"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/my-villa");
            props.onClose();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              اقامتگاه
            </p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              Villas
            </p>
          </div>
        </div>
        <div
          className={
            myRouter.asPath === "/dashboard/coopration"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/profile");
            props.onClose();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faHandshake} />
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
        <div
          className={`${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer dashboard-exit w-100`}
          onClick={() => {
            myRouter.push("/");
            props.onClose();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">خروج</p>
            <p className="no-margin font-size-13 color-textpill iran-sans">
              Exit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardNav;
