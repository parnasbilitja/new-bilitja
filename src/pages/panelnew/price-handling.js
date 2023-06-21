import React from "react";
import Layout from "./Layout";
import PriceHandling from "./manager/price-handling/PriceHandling";

const priceHandling = () => {
  return <PriceHandling />;
};

priceHandling.PageLayout = Layout;
export default priceHandling;
