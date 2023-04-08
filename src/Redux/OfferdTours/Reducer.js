const initialState = {
    data:[],
    loading:true,
    error:'',
}
const DataReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'getDataRequest':
            return{
                ...state,
                loading:true,
            }
        case 'getDataSucces':
            return{
                ...state,
                data: action.payload,
                loading:false,
            }
            case 'getDataFailures':
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
export default DataReducer;