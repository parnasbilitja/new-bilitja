import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  faArchway,
  faBars,
  faChartLine,
  faDollarSign,
  faHandshake,
  faInfoCircle,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/ManagerNav.module.scss";

const DashboardNav = () => {
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
        className={`${styles["manager-nav-main-container"]} ${
          isOpend ? styles["slidein-manager"] : ""
        }`}
      >
        <div className={styles["manager-nav-header"]}>
          <img src="../../../Images/bilitja-logo.png" />
        </div>
        <div
          className={
            myRouter.asPath === "/dashboard/profile"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/profile");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faUserAlt} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              پروفایل
            </p>
            <p className="no-margin font-size-13 color-textpill">{mobile}</p>
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
            myRouter.asPath === "/dashboard/orders"
              ? `${styles["manager-nav-one-row"]} dashboard-menu-item-active cursor-pointer`
              : `${styles["manager-nav-one-row"]} dashboard-menu-item cursor-pointer`
          }
          onClick={() => {
            myRouter.push("/dashboard/orders");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              گزارشات
            </p>
            <p className="no-margin font-size-13 color-textpill">Orders</p>
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
          }}
        >
          <div>
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">مالی</p>
            <p className="no-margin font-size-13 color-textpill">Wallet</p>
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
          }}
        >
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              اقامتگاه
            </p>
            <p className="no-margin font-size-13 color-textpill">Villas</p>
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
          }}
        >
          <div>
            <FontAwesomeIcon icon={faHandshake} />
          </div>
          <div>
            <p className="no-margin font-size-13 font-bold-iransanse">
              همکاری با ما
            </p>
            <p className="no-margin font-size-13 color-textpill">Cooperation</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardNav;
