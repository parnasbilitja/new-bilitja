import {createSelector} from 'reselect'

const reserve = state=> state.reserve 

export const selectProperties = createSelector([reserve], reserve => ({
    reqNo: reserve.reqNo,
    reqPnr: reserve.reqPnr
}))

