import AirportType from "./airport.type";
import  AirportsJson  from "../../../public/static-data/airports-mohammadsaleh.json";

const INITIAL_STATE = {
  airports: null
};

const airportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AirportType.LOAD_AIRPORTS: {
      return {
        ...state,    //  merge data in record airportsRecords into state airports 
        airports: AirportsJson.AirportsList,   //  airports.airports
        
        
        //action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default airportReducer;


