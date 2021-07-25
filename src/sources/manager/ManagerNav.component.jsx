import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/ManagerNav.module.scss";
//import logo from '../../../Images/bilitja-logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchway,
  faBars,
  faChartLine,
  faDollarSign,
  faHandshake,
  faInfoCircle,
  faUserAlt,
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
    <>
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
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faUserAlt} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/profile");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">
              پروفایل
            </p>
            <p className="no-margin font-size-13 color-textpill">{mobile}</p>
          </div>
        </div>
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/profile");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">
              داشبورد
            </p>
            <p className="no-margin font-size-13 color-textpill">Dashboard</p>
          </div>
        </div>
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/orders");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">
              گزارشات
            </p>
            <p className="no-margin font-size-13 color-textpill">Orders</p>
          </div>
        </div>
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/wallet");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">مالی</p>
            <p className="no-margin font-size-13 color-textpill">Wallet</p>
          </div>
        </div>
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/my-villa");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">
              اقامتگاه
            </p>
            <p className="no-margin font-size-13 color-textpill">Villas</p>
          </div>
        </div>
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faHandshake} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/profile");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">
              همکاری با ما
            </p>
            <p className="no-margin font-size-13 color-textpill">Cooperation</p>
          </div>
        </div>
        {/* <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/villas/search");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">ویلا</p>
            <p className="no-margin font-size-13 color-textpill">villa</p>
          </div>
        </div>
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/city/show");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">شهر</p>
            <p className="no-margin font-size-13 color-textpill">City</p>
          </div>
        </div>
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/facility/show");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">
              امکانات
            </p>
            <p className="no-margin font-size-13 color-textpill">Facility</p>
          </div>
        </div>
        <div className={styles["manager-nav-one-row"]}>
          <div>
            <FontAwesomeIcon icon={faArchway} />
          </div>
          <div
            onClick={() => {
              myRouter.push("/panel/rule/show");
            }}
          >
            <p className="no-margin font-size-13 font-bold-iransanse">قوانین</p>
            <p className="no-margin font-size-13 color-textpill">Rules</p>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default ManagerNav;
