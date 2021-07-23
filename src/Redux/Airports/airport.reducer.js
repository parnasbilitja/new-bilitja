import AirportType from "./airport.type";
import { AirportsList } from "../../../public/static-data/airports-mohammadsaleh.json";

const INITIAL_STATE = {
  airports: null,
  airports_list: AirportsList,
};

const airportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AirportType.ADD_AIRPORTS: {
      return {
        ...state,
        airports: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default airportReducer;

export const mohammadsalehAirportsReduser = (
  state = INITIAL_STATE.airports_list,
  action
) => {
  switch (action.type) {
    case AirportType.GET_AIRPORTS_LIST: {
      return state;
    }
    default:
      return state;
  }
};
