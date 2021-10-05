import AirportType from "./airport.type";

export const loadAirports = (value) => {
  return {
    type: AirportType.LOAD_AIRPORTS,
    payload: value,
  };
};
