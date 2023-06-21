// import axios from "axios";

// const fetchOriginLocSuccess = (originLoc) => {
//   return {
//     type: "FETCH_ORIGINLOC_SUCCESS",
//     payload: originLoc,
//   };
// };
// const fetchOriginLocFailure = (err) => {
//   return {
//     type: "FETCH_ORIGINLOC_FAILURE",
//     payload: err,
//   };
// };
// const fetchDestLocSuccess = (originLoc) => {
//   return {
//     type: "FETCH_DESTLOC_SUCCESS",
//     payload: originLoc,
//   };
// };
// const fetchDestLocFailure = (err) => {
//   return {
//     type: "FETCH_DESTLOC_FAILURE",
//     payload: err,
//   };
// };

// export const fetchOriginLoc = () => {
//   return (dispatch) => {
//     axios
//       .post("https://hotelobilit-api.iran.liara.run/api/v1/cities", {
//         hasHotel: 0,
//         hasFlight: 1,
//       })
//       .then((res) => {
//         const originLoc = res.data;
//         dispatch(fetchOriginLocSuccess(originLoc));
//       })
//       .catch((error) => {
//         const errMsg = error.message;
//         fetchOriginLocFailure(errMsg);
//       });
//   };
// };

// export const fetchDestLoc = () => {
//   return (dispatch) => {
//     axios
//       .post("https://hotelobilit-api.iran.liara.run/api/v1/cities", {
//         hasHotel: 1,
//         hasFlight: 0,
//       })
//       .then((res) => {
//         const destLoc = res.data;
//         dispatch(fetchDestLocSuccess(destLoc));
//       })
//       .catch((error) => {
//         const errMsg = error.message;
//         fetchDestLocFailure(errMsg);
//       });
//   };
// };

export const setOrgLoc = (orgLoc) => {
  return {
    type: "SET_ORG_LOC",
    payload: orgLoc,
  };
};
export const setDestLoc = (destLoc) => {
  return {
    type: "SET_DEST_LOC",
    payload: destLoc,
  };
};

export const setFlightDate = (date) => {
  return {
    type: "SET_FLIGHT_DATE",
    payload: date,
  };
};

export const setNightNumber = (night) => {
  return {
    type: "SET_NIGHT_NUMBER",
    payload: night,
  };
};
