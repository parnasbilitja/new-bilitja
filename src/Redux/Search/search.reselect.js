import {createSelector} from 'reselect'

const search = state=> state.search 

export const selectCredentials = createSelector([search], search => ({
    sourceName: search.searchObject.sourceName,
    destinationName: search.searchObject.destinationName,
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
    withFilters: `${search.searchObject.withFilters}`,
    currentPage: `${search.searchObject.currentPage}`,
    sortable: search.searchObject.sortable,
    earlyMorning: search.searchObject.earlyMorning,
    morning: search.searchObject.morning,
    afternoon: search.searchObject.afternoon,
    evening: search.searchObject.evening,
    airlines:search.searchObject.airlines,
    flightDateNext:search.searchObject.flightDateNext,
    flightDatePrev:search.searchObject.flightDatePrev
}))

export const selectArilines= createSelector([search],search=>({
    airlines : search.filters.airlines
}))
