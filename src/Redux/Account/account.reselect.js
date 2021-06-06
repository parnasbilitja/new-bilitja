import {createSelector} from 'reselect'

const acocunt = state=> state.account 

export const selectAccount = createSelector([acocunt], account => account.properties)
