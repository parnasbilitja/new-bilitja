import ProfileType from "./profile.type";

export const SetUserInformation = (payload) => {
  return {
    type: ProfileType.SET_USER_INFO,
    payload: payload,
  };
};
