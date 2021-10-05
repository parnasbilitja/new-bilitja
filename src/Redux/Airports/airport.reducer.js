import AirportType from "./airport.type";
import { AirportsList } from "../../../public/static-data/airports-mohammadsaleh.json";

const INITIAL_STATE = {
  airports: null
};

const airportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AirportType.LOAD_AIRPORTS: {
      return {
        ...state,    //  add airports to state(airports)
        airports: AirportsList,   //  airports.airports
        
        
        //action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default airportReducer;


