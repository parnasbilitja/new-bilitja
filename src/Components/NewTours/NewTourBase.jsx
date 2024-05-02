import React, { useState, useEffect } from "react";
import Head from "next/head";
import NavHandler from "../share/NavHandler";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import PictureBase from "../../sources/component/PictureBase";
import PageTabls from "../../sources/component/PageTabs.component";
import TourSearchBox from "./Components/TourSearchBox";

const NewTourBase = () => {
  const [state, setState] = useState({
    open: false,
    searchReset: false,
    dateSelected: null,
    dateSelected2: null,
    width: 100,
    city: "",
  });
  const [type, setType] = useState(4);
  useEffect(() => {
    setState({ ...state, width: window.innerWidth });
  }, []);


  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <Head>
          <title>بلیطجا | لیست تورها</title>
        </Head>
        <NavHandler />
        <div
          className={``}
          style={{ marginTop: state.width >= 826 ? "" : "-0.8rem" }}
        >
          <Scrolltoprefresh />
          <div style={{ background: "#F7F7F7", height: "100%" }}>
            <PictureBase />
            <PageTabls type={type} setType={setType} />
            <h2
              style={{ margin: "2rem 0 0 0" }}
              className="font-bold-iransanse font-size-22 font-bold text-center "
            >
              <span>رزرو تور جدید &nbsp;</span>
              <span className="color-primary font-bold-iransanse">
                با چند کلیک
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          padding: "0 2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TourSearchBox />
      </div>
    </div>
  );
};

export default NewTourBase;
