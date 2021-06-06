import SearchAccommodationType from './search_accommodation.type'


const INITIAL_STATE = {
    searchObject : {
        cityName:'',
        city: '',
        dateStart: '',
        dateEnd:''
    },
   
} 

const searchAccommodationReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case SearchAccommodationType.ADD_CREDENTIALS:{
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
export default searchAccommodationReducer 