import ReserveType from './reserve.type'
const INITIAL_STATE = {
    
}

const reserveReducer = (state= INITIAL_STATE,action)=>{
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
export default reserveReducer 