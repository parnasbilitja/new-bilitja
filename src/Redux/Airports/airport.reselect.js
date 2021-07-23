import { createSelector } from "reselect";

const airports = (state) => state.airports;

export const selectAirports = createSelector(
  [airports],
  (airports) => airports.airports
);
