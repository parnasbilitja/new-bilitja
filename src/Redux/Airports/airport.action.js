import AirportType from "./airport.type";

export const addAirports = (value) => {
  return {
    type: AirportType.ADD_AIRPORTS,
    payload: value,
  };
};

export const GetAirportsList = () => {
  return {
    type: AirportType.GET_AIRPORTS_LIST,
  };
};
