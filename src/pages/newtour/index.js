import React, { useEffect } from "react";
import NewTourBase from "../../Components/NewTours/NewTourBase";
import MessageBoxComponent from "../../sources/component/MessageBox.component";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDestLoc } from "../../Redux/newTours/Action";
const index = () => {
  // const dispatch = useDispatch();
  // const cityOrg = useSelector((state) => state.tour);
  // useEffect(() => {
  //   dispatch(fetchDestLoc());

  //   console.log("from pouy", cityOrg);
  // }, []);
  return (
    <div className="mt-90 bodyVar">
      <MessageBoxComponent />
      <NewTourBase />
    </div>
  );
};

export default index;
