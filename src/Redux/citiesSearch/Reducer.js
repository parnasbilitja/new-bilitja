const initialState = {
    data:[],
    loading:true,
    error:'',
}
const CitySearchReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'getCitySearchRequest':
            return{
                ...state,
                loading:true,
            }
        case 'getCitySearchSucces':
            return{
                ...state,
                data: action.payload,
                loading:false,
            }
            case 'getCitySearchFailures':
                return{
                    ...state,
                    data: [],
                    error: action.payload,
                    loading:false,
                }
            default:
                return state
    }
}
export default CitySearchReducer;