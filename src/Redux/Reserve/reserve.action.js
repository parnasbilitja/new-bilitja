import ReserveType from './reserve.type'
export const addReservationProperties = (value)=>{
    return {
        type: ReserveType.ADD_PROPERTIES,
        payload: value
    }
} 

