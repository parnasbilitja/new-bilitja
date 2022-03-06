import SearchType from './search.type'
import {removeAirline} from './search.utils'


const INITIAL_STATE = {
    searchObject : {
        sourceName:'',
        destinationName:'',
        sourceNameEn:'',
        destinationNameEn:'',
        source:'',
        dest:'',
        stDate:'',
        flightDatePersian:'',
        currentPage :1,
        withFilters:false,
        sortable:1,
        earlyMorning: false,
        morning: false,
        afternoon: false,
        evening: false,
        airlines:[],
        flightDateNext:null,
        flightDatePrev:null,
        typeOfCalendar:'',
        customerId: "1a157116-a01a-4027-ab10-74098ac63815",
    },
    filters : {
        arilines:[]
    }
}

const searchReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case SearchType.ADD_CREDENTIALS:{
            return {
                ...state,
                searchObject : {...state.searchObject,...action.payload}
            }
            
        }
        case SearchType.REMOVE_AIRLINE:{
            return {
                ...state,
                searchObject : {...state.searchObject,withFilters:false,airlines:removeAirline(state.searchObject.airlines,action.payload)}
            }
            
        }
        case SearchType.ADD_AIRLINE:{
            state.searchObject.airlines.push(action.payload)
            return {
                ...state,
                searchObject : {...state.searchObject,withFilters:false,airlines:state.searchObject.airlines}
            }
            
        }
        case SearchType.ADD_FILTERS:{
            return{
                ...state,
                filters:{...state.filters,...action.payload}
            }
        }
        case SearchType.SWITCH_ROUTE:{
            return{
                ...state,
                searchObject : {
                    ...state.searchObject,
                    destinationName:state.searchObject.sourceName,
                    sourceName:state.searchObject.destinationName,
                    destinationNameEn:state.searchObject.sourceNameEn,
                    sourceNameEn:state.searchObject.destinationNameEn,
                    source:state.searchObject.dest,
                    dest:state.searchObject.source}
            }
        }
        default:{
            return state
        }
    }
}
export default searchReducer 