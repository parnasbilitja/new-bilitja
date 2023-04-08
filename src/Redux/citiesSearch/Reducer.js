const initialState = {
    data:[],
    loading:true,
    error:'',
}
const CitySearchReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'getCityRequest':
            return{
                ...state,
                loading:true,
            }
        case 'getCitySucces':
            return{
                ...state,
                data: action.payload,
                loading:false,
            }
            case 'getCityFailures':
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