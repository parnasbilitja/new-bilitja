import React, { useEffect } from "react";
import MessageBoxComponent from "../../sources/component/MessageBox.component";
import TourBg from "../../../public/Images/tour-bg-new.png";
import Image from "next/image";
import HomePicture from "../../sources/component/HomePicture";
import NewTourBase from "../../Components/NewTours/NewTourBase";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDestLoc } from "../../Redux/newTours/Action";
const index = () => {
  // const dispatch = useDispatch();
  // const cityOrg = useSelector((state) => state.tour);
  // useEffect(() => {
  //   dispatch(fetchDestLoc());

  //   console.log("from pouy", cityOrg);
  // }, []);
  const state = {
    width: 826,
  };
  return (
    <div style={{ marginTop: "6rem", paddingBottom: "2rem" }}>
      <MessageBoxComponent />
      <NewTourBase />
      <HomePicture state={state} />
    </div>
  );
};

export default index;
