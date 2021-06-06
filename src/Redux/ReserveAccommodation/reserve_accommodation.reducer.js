import ReserveType from './reserve_accommodation.type'
const INITIAL_STATE = {
    
}

const reserveAccommodationReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case ReserveType.ADD_PROPERTIES:{
            return {
                ...state,
                ...action.payload
            }
            
        }
        default:{
            return state
        }
    }
}
export default reserveAccommodationReducer 