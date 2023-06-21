import Layout from "../Layout";
import ProfileComponent from "../manager/profile/Profile.component";
import React from "react";

const index = () => {
  return <ProfileComponent />;
};
index.PageLayout = Layout;
export default index;
