import SearchType from './search.type'
export const addCredentials = (value)=>{
    return {
        type: SearchType.ADD_CREDENTIALS,
        payload: value
    }
} 

export const addFilters=(value)=>{
    return{
        type : SearchType.ADD_FILTERS,
        payload: value
    }
}

export const addAirlineToSearchObject=(value)=>{
    return{
        type : SearchType.ADD_AIRLINE,
        payload: value
    }
}

export const removeAirlineFromSearchObject=(value)=>{
    return{
        type : SearchType.REMOVE_AIRLINE,
        payload: value
    }
}
export const switchRoute=()=>{
    return {
        type:SearchType.SWITCH_ROUTE
    }
}