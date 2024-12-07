export const setOrgLoc = (orgLoc) => {
    return {
        type: "SET_ORG_LOC",
        payload: orgLoc,
    };
};
export const setDestLoc = (destLoc) => {
    return {
        type: "SET_DEST_LOC",
        payload: destLoc,
    };
};

export const setFlightDate = (date) => {
    return {
        type: "SET_FLIGHT_DATE",
        payload: date,
    };
};

export const setNightNumber = (night) => {
    return {
        type: "SET_NIGHT_NUMBER",
        payload: night,
    };
};
export const setSearchStep = (step) => {
    return {
        type: "SET_SEARCH_STEP",
        payload: step,
    };
};
