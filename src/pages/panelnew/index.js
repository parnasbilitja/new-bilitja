import React, { Children, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";

const index = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    router.push("/panelnew/profile");
  }, []);
  return true;
};

index.PageLayout = Layout;
export default index;
