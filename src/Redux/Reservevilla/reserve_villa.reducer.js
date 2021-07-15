import ReserveType from './reserve_villa.type'
const INITIAL_STATE = {
    
}

const reservevillaReducer = (state= INITIAL_STATE,action)=>{
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
export default reservevillaReducer 