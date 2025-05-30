import {createSelector} from 'reselect'

const search = state=> state.search 

export const selectCredentials = createSelector([search], search => ({
    sourceName: search.searchObject.sourceName,
    destinationName: search.searchObject.destinationName,
    sourceNameEn: search.searchObject.sourceNameEn,
    destinationNameEn: search.searchObject.destinationNameEn,

    source: search.searchObject.source,
    dest: search.searchObject.dest,
    flightDatePersian: search.searchObject.flightDatePersian,
    stDate:search.searchObject.stDate,
    typeOfCalendar:search.searchObject.typeOfCalendar,
}))

export const selectSearchObject = createSelector([search], search => ({
    source: search.searchObject.source,
    dest: search.searchObject.dest,
    stDate: search.searchObject.stDate,
    withFilters: search.searchObject.withFilters,
    currentPage: `${search.searchObject.currentPage}`,
    sortable: search.searchObject.sortable,
    earlyMorning: search.searchObject.earlyMorning,
    morning: search.searchObject.morning,
    afternoon: search.searchObject.afternoon,
    evening: search.searchObject.evening,
    airlines:search.searchObject.airlines,
    flightDateNext:search.searchObject.flightDateNext,
    flightDatePrev:search.searchObject.flightDatePrev,
    customerId: "1a157116-a01a-4027-ab10-74098ac63815",
}))

export const selectArilines= createSelector([search],search=>({
    airlines : search.filters.airlines
}))
