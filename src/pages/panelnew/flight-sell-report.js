import React from "react";
import Layout from "./Layout";
import Reports from "./manager/reports/Reports";
import FlightSellReport from "./manager/sell-report/sell-report/DesktopFlightSellReport";


const FlightSellReportPage = () => {
  return <FlightSellReport />;
};
FlightSellReportPage.PageLayout = Layout;

export default FlightSellReportPage;
