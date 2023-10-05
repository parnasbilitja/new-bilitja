import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Footer from "../../sources/component/Footer.component";
import HomePicture from "../../sources/component/HomePicture";
import PageTabls from "../../sources/component/PageTabs.component";
import PictureBase from "../../sources/component/PictureBase";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
const CitiesSuggest = dynamic(() => import("../../sources/tour/CitiesSuggest"));
const HotelsSuggest = dynamic(() => import("../../sources/tour/HotelsSuggest"));
// const List = dynamic(() => import("../../sources/tour/List"));
import List from "../../sources/tour/List"
const Posts = dynamic(() => import("../../sources/tour/Posts"));
const OfferdTours = dynamic(() => import("../../sources/tour/OfferdTours"));
import NavHandler from "../share/NavHandler";
import styles from "../../../styles/Home.module.scss";
import axios from "axios";
import { motion } from "framer-motion";
import SearchBox from "../../sources/tour/SearchBox";
import router, { withRouter } from "next/router";
import { connect } from "react-redux";
import {
  setDestLoc,
  setFlightDate,
  setNightNumber,
  setOrgLoc,
} from "../../Redux/newTours/Action";
import TourSearchBox from "../NewTours/Components/TourSearchBox";
// const TourSearchBox = dynamic(() =>
//   import("../NewTours/Components/TourSearchBox")
// );

const ToursBase = (props) => {
  const [state, setState] = useState({
    open: false,
    searchReset: false,
    dateSelected: null,
    dateSelected2: null,
    width: 100,
    city: "",
  });
  const [type, setType] = useState(2);
  useEffect(() => {
    setState({ ...state, width: window.innerWidth });
  }, []);
  const [tourData, SetTourData] = useState([]);

  // const [tourSwitch, setTourSwitch] = useState("package-tour");

  const toursHandler = (search) => {

    setState({ ...state, city: search?.slug ?search?.slug:null  });
    axios
        .post("https://api.hamnavaz.com/api/v1/tour/getTours", {
          city: state.city,
        })
        .then((res) => {
          SetTourData(res.data.data);
        })
        .catch((err) => SetTourData(err.message));
  };

  const myRef = useRef(null);
  const executeScroll = () =>
      myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  const handleClickScroll = () => {
    const element = document.getElementById("list");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    props.setOrgLoc({ name: "", code: "" });
    props.setDestLoc({ name: "", code: "" });
    props.setFlightDate({
      persianDate: "",
      miladiDate: "",
    });
    props.setNightNumber("");


    toursHandler()
  }, []);
  return (
      <div className={""}>
        <Head>
          <title>همنواز | لیست تورها</title>
        </Head>
        <NavHandler />
        <div
            className={``}
            style={{ marginTop: state.width >= 826 ? "" : "-0.8rem" }}
        >
          <Scrolltoprefresh />
          <div style={{ background: "#F7F7F7" }}>
            <div style={{transform:'translateY(14px)'}}>
              <PictureBase />

            </div>
            <PageTabls type={type} setType={setType} />
            <h2
                style={{ margin: "2rem 0 0 0" }}
                className="font-bold-iransanse font-size-22 font-bold text-center "
            >
              <span>رزرو تور &nbsp;</span>
              <span className="color-primary font-bold-iransanse">
              با چند کلیک
            </span>
            </h2>
            <div className="row justify-content-center">
              <div className={`col-md-10 ${styles["width-mobile-search"]}`}>
                {/* switch between tours type */}
                <div
                    className={`d-flex justify-content-between ${styles["checkboxs_container"]} ${styles["w-100-mobi"]}`}
                >
                  <div className={styles["check"]}>
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        onClick={() => {
                          props.setTourType("tour",'/tour')
                          // props.setTourSwitch("tour")
                          // router.push('/tour')
                        }}
                        checked={props.tourSwitch === "tour" ? true : false}
                    />
                    <p htmlFor="">تور </p>
                  </div>
                  <div className={styles["check"]}>
                    <input
                        type="checkbox"
                        name="ارزان ترین"
                        id=""
                        onClick={() => {
                          props.setTourType("package-tour",'/tours')
                          // props.setTourSwitch("package-tour")
                          // router.push('/tours')
                        }

                        }
                        checked={props.tourSwitch === "package-tour" ? true : false}

                    />
                    <p htmlFor="">پکیج تور </p>
                  </div>

                </div>
                {/* ////////////// */}
                {props.tourSwitch === "package-tour" ? (
                    <div className={styles['flight-container']}>
                      <SearchBox
                          dateSelected={state.dateSelected2}
                          executeScroll={handleClickScroll}
                          toursHandler={toursHandler}
                          setState={setState}
                          state={state}
                      />
                    </div>
                ) : (

                    <TourSearchBox />
                )}
              </div>
              <div>
                <motion.div
                    initial="pageInitial"
                    animate="pageAnimate"
                    variants={{
                      pageInitial: {
                        opacity: 0,
                      },
                      pageAnimate: {
                        opacity: 1,
                      },
                    }}
                >
                  <HomePicture state={state} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10 m-auto px-3 padd">
          <OfferdTours />
          <div id="list">
            <List ref={myRef} tourData={tourData} city={state.city} />
          </div>
          <HotelsSuggest />
          <CitiesSuggest />
          <Posts />
        </div>
        <Footer />
      </div>
  );
};

const mapDispatchesToProps = (dispatch) => ({
  setOrgLoc: async (value) => dispatch(setOrgLoc(value)),
  setDestLoc: async (value) => dispatch(setDestLoc(value)),
  setFlightDate: async (value) => dispatch(setFlightDate(value)),
  setNightNumber: async (value) => dispatch(setNightNumber(value)),
});
export default withRouter(connect(null, mapDispatchesToProps)(ToursBase));
