import ReserveType from './reserve_accommodation.type'
export const addReservationProperties = (value)=>{
    return {
        type: ReserveType.ADD_PROPERTIES,
        payload: value
    }
} 

