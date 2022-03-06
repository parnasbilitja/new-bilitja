import Actiontype from "./Actiontype";

const INITIAL_STATE = {
  searchdatalist: [],
};

export const searchboxReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actiontype.SEARCHTEMP:
      return { ...state, searchdatalist: action.payload };

    default:
      return state;
  }
};
