import ReserveType from './reserve_villa.type'
export const addReservationProperties = (value)=>{
    return {
        type: ReserveType.ADD_PROPERTIES,
        payload: value
    }
} 

