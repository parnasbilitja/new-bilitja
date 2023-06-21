import React from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";
import dynamic from "next/dynamic";
import Dashboard from "./manager/dashboard/Dashboard";
import CharterList from "./manager/charter-list/CharterList";

const index = () => {
  return <CharterList />;
};
index.PageLayout = Layout;

export default index;
