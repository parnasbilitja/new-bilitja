const initialState = {
    data:[],
    loading:true,
    error:'',
}
const ListDataReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'getListDataRequest':
            return{
                ...state,
                loading:true,
            }
        case 'getListDataSucces':
            return{
                ...state,
                data: action.payload,
                loading:false,
            }
            case 'getListDataFailures':
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
export default ListDataReducer;