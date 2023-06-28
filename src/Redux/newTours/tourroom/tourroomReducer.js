const initialState = {
  origin: {},
  destination: {},
  date: {},
  night: "",
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

    default:
      return state;
  }
};
export default NewTourReducer;
