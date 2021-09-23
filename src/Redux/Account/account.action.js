import AccountType from "./account.type";
export const addAccountProperties = (value) => {
  return {
    type: AccountType.ADD_ACCOUNT_PROPERTIES,
    payload: value,
  };
};
export const checkUserLogged = () => {
  const token = localStorage.getItem("token");
  return {
    type: AccountType.CHECK_USER_LOGGED,
    payload: token ? true : false,
  };
};
export const getUserInfo = (value) => {
  return {
    type: AccountType.GET_USER_INFO,
    payload: value,
  };
};