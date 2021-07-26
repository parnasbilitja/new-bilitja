import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/ManagerNav.module.scss";
//import logo from '../../../Images/bilitja-logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchway,
  faBars, 
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
        className={`${styles["manager-nav-main-container"]} ${
          isOpend ? styles["slidein-manager"] : ""
        }`}
      >
        <div className={styles["manager-nav-header"]}>
          <img src="../../../Images/bilitja-logo.png" />
        </div>
        <div className={styles["manager-small-screen-top-bar"]}>
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => {
              setOpend(!isOpend);
            }}
          />
        </div>
        <div className={styles["manager-nav-one-row"]}>
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
        </div>
      </div>
    </div>
  );
};
export default ManagerNav;
