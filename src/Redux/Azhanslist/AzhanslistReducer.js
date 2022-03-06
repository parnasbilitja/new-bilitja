import ActionTypes from "./ActionType";

const INITIALL_STATE = {
  azhans: [],
  error: null,
  loading: true,
};

export const AzhanslistReducer = (state = INITIALL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GETAZHANSLOADING:
      return { ...state, loading: true };

    case ActionTypes.GETAZHANSLISTDATA:
      return { ...state, loading: false, azhans: action.payload };

    case ActionTypes.GETAZHANSLISTERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
