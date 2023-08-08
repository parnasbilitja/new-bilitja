import {loader} from "next/dist/build/webpack/config/helpers";

const initialState = {
  origin: {name:'',code:''},
  destination: {name:'',code:''},
  date: {},
  night: "",

  loader:false
};

const NewTourReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORG_LOC":
      return {
        ...state,
        origin: action.payload,
      };
    case "SET_DEST_LOC":
      return {
        ...state,
        destination: action.payload,
      };
    case "SET_FLIGHT_DATE":
      return {
        ...state,
        date: action.payload,
      };

    case "SET_NIGHT_NUMBER":
      return {
        ...state,
        night: action.payload,
      };
      case "SET_LOADER":
      return {
        ...state,
        loader:action.payload,
      };
    default:
      return state;
  }
};
export default NewTourReducer;
