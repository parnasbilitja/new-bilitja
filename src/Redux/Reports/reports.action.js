import { ReportsTypes } from "./reports.types";

export const _getSellReport = (payload) => {
  return {
    type: ReportsTypes.GET_SELL_REPORT,
    payload,
  };
};
export const _filterSellReport = (payload) => {
  return {
    type: ReportsTypes.FILTER_SELL_REPORT,
    payload,
  };
};
export const _getDetailsSellReport = (payload) => {
  return {
    type: ReportsTypes.GET_DETAILS_SELL_REPORT,
    payload,
  };
};
export const _filterDetailsSellReport = (payload) => {
  return {
    type: ReportsTypes.FILTER_DETAILS_SELL_REPORT,
    payload,
  };
};
