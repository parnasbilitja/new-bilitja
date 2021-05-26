import AirportType from './airport.type'

const INITIAL_STATE = {
    airports : null
}

const airportReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case AirportType.ADD_AIRPORTS:{
            return {
                ...state,
                airports : action.payload
            }
            
        }
        default:{
            return state
        }
    }
}
export default airportReducer 