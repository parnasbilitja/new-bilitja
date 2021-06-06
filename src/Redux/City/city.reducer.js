import CityType from './city.type'

const INITIAL_STATE = {
    cities : null
}

const cityReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case CityType.ADD_CITIES:{
            return {
                ...state,
                cities : action.payload
            }
            
        }
        default:{
            return state
        }
    }
}
export default cityReducer 