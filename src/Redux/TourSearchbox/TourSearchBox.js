
const initialState = {
  selectedOrigin: {name:'',code:''},
  selectedDestination: {name:'',code:''}    ,
  selectedDate: {miladiDate:'',persianDate:''},
  selectedNight: null,
  searchboxStep:'',
  tour_type: 'hotel'
};

const TourSearchBox = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ORG_LOC":
      return {
        ...state,
        selectedOrigin: action.payload,
      };
    case "SET_DEST_LOC":
      return {
        ...state,
        selectedDestination: action.payload,
      };
    case "SET_FLIGHT_DATE":
      return {
        ...state,
        selectedDate: action.payload,
      };

    case "SET_NIGHT_NUMBER":
      return {
        ...state,
        selectedNight: action.payload,
      };
      case "SET_SEARCH_STEP":
      return {
        ...state,
        searchboxStep:action.payload,
      };
      case "SET_TOUR_TYPE":

      return {
        ...state,
        tour_type:action.payload,
      };
    default:
      return state;
  }
};
export default TourSearchBox;
