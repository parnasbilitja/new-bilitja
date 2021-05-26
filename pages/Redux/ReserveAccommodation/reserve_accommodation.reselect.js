import { createSelector } from 'reselect'

const reserve = state => state.reserve

export const selectProperties = createSelector([reserve], reserve => ({
    EghamatId: reserve.EghamatId,
    RoomRow: reserve.RoomRow,
    DateInc: reserve.DateInc,
    NightCount: reserve.NightCount,
    selectedDaysArray: reserve.selectedDaysArray,
    Address: reserve.Address,
    CityName: reserve.CityName,
    AddressName: reserve.AddressName
}))

