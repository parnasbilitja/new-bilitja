import React, { useState, useEffect } from "react";
import Head from "next/head";
import NavHandler from "../share/NavHandler";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import PictureBase from "../../sources/component/PictureBase";
import PageTabls from "../../sources/component/PageTabs.component";

import TourSearchBox from "./Components/TourSearchBox";
import { useSelector } from "react-redux";

const newTourBase = () => {
  // const loc = useSelector((state) => state.destandoriginCitiesTour);
  // useEffect(() => {
  //   console.log("from hi", loc);
  // }, []);
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
  const toursHandler = (search) => {
    setState({ ...state, city: search.slug });
    axios
      .post("https://api.hamnavaz.com/api/v1/tour/getTours", {
        city: state.city,
      })
      .then((res) => {
        SetTourData(res.data.data);
      })
      .catch((err) => SetTourData(err.message));
  };
  const handleClickScroll = () => {
    const element = document.getElementById("list");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
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
          <div style={{ background: "#F7F7F7" }}>
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
      <div className="px-6">
        <TourSearchBox />
      </div>
    </div>
  );
};

export default newTourBase;
