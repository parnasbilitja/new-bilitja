import React from "react";
import "../../../styles/PageTabs.module.scss";
import styles from "../../../styles/Home.module.scss";

import { useRouter } from "next/router";

const PageTabls = (props) => {
  const myRouter = useRouter();
  return (
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10 mb-2">
        <div className={styles["tab-container"]}>
          <div
            className={`${styles["home-tab"]} cursor-pointer ${props.tabActice == 1 ? styles["home-tab-active"] : null
              }`}
            onClick={() => {
              myRouter.push("/");
            }}
          >
            <div className="pull-right">
              <i className="bilitja font-size-24 icon-plane-departure"></i>
            </div>
            <div className="pull-right">
              <span className="font-size-15 "> بلیط هواپیما </span>
            </div>
          </div>
          <div
            className={`${styles["home-tab"]} cursor-pointer ${props.tabActice == 2 ? styles["home-tab-active"] : null
              }`}
            onClick={() => {
              myRouter.push("/tours");
            }}
          >
            <div className="pull-right icon-container">
              <i className="bilitja font-size-20 icon-villa"></i>
            </div>
            <div className="pull-right">
              <span className="font-size-15 "> تور </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTabls;
