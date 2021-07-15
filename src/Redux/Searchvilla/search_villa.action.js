import SearchvillaType from './search_villa.type'
export const addCredentials = (value)=>{
    return {
        type: SearchvillaType.ADD_CREDENTIALS,
        payload: value
    }
} 