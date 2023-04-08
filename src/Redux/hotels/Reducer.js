const initialState = {
    data:[],
    loading:true,
    error:'',
}
const hotelReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'getHotelsRequest':
            return{
                ...state,
                loading:true,
            }
        case 'getHotelsSucces':
            return{
                ...state,
                data: action.payload,
                loading:false,
            }
            case 'getHotelsFailures':
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
export default hotelReducer;