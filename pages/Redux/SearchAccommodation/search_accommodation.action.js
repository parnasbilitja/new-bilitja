import SearchAccommodationType from './search_accommodation.type'
export const addCredentials = (value)=>{
    return {
        type: SearchAccommodationType.ADD_CREDENTIALS,
        payload: value
    }
} 