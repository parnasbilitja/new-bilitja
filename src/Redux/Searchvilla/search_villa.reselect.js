import {createSelector} from 'reselect'

const search = state=> state.searchvilla 

export const selectCredentials = createSelector([search], search => ({
    cityName: search.searchObject.cityName,
    city: search.searchObject.city,
    dateStart: search.searchObject.dateStart,
    dateEnd:search.searchObject.dateEnd
}))

