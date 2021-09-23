import AccountType from "./account.type";

const INITIAL_STATE = {
  properties: null,
  logged: false,
  user_info: null,
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccountType.ADD_ACCOUNT_PROPERTIES: {
      return {
        ...state,
        properties: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default accountReducer;

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccountType.CHECK_USER_LOGGED: {
      return {
        ...state,
        logged: action.payload,
      };
    }
    case AccountType.GET_USER_INFO: {
      return {
        ...state,
        user_info: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
