import { SetUserInformation } from "./profile.action";
import ProfileType from "./profile.type";

export const ProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case ProfileType.SET_USER_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
