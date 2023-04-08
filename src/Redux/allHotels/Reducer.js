const initialState = {
    data:[],
    loading:true,
    error:'',
}
const AllHotelReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'getAllHotelsRequest':
            return{
                ...state,
                loading:true,
            }
        case 'getAllHotelsSuccess':
            return{
                ...state,
                data: action.payload,
                loading:false,
            }
            case 'getAllHotelsFailures':
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
export default AllHotelReducer;