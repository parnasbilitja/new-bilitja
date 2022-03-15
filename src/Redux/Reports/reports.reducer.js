import { ReportsTypes } from "./reports.types";

const InitialState = {
  all_sell_report: null,
  filter_sell_report: null,
  all_details_sell_report: null,
  filter_details_sell_report: null,
};

const ReportReducer = (state = InitialState, action) => {
  switch (action.type) {
    case ReportsTypes.GET_SELL_REPORT:
      return { ...state, all_sell_report: action.payload };
    case ReportsTypes.FILTER_SELL_REPORT:
      return { ...state, filter_sell_report: action.payload };
    case ReportsTypes.GET_DETAILS_SELL_REPORT:
      return { ...state, all_details_sell_report: action.payload };
    case ReportsTypes.FILTER_DETAILS_SELL_REPORT:
      return { ...state, filter_details_sell_report: action.payload };
    default:
      return state;
  }
};

export default ReportReducer;
