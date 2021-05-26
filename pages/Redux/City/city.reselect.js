import {createSelector} from 'reselect'

const cities = state=> state.cities 

export const selectCities = createSelector([cities], cities => cities.cities)
