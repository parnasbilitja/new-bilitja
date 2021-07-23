import AirportType from "./airport.type";

export const addAirports = (value) => {
  return {
    type: AirportType.ADD_AIRPORTS,
    payload: value,
  };
};
