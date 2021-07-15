import SearchvillaType from './search_villa.type'


const INITIAL_STATE = {
    searchObject : {
        cityName:'',
        city: '',
        dateStart: '',
        dateEnd:''
    },
   
} 

const searchvillaReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case SearchvillaType.ADD_CREDENTIALS:{
            return {
                ...state,
                searchObject : {...state.searchObject,...action.payload}
            }
        }
        default:{
            return state
        }
    }
}
export default searchvillaReducer 