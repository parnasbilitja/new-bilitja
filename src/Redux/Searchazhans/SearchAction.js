import Actiontype  from "./Actiontype";

export const SearchAction = (data) => ({
  type: Actiontype.SEARCHTEMP,
  payload: data,
});
