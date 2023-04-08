const initialState = {
    data:[],
    loading:true,
    error:'',
}
const PostsReducer = (state = initialState, action) =>{
    switch (action.type){
        case 'getPostsRequest':
            return{
                ...state,
                loading:true,
            }
        case 'getPostsSucces':
            return{
                ...state,
                data: action.payload,
                loading:false,
            }
            case 'getPostsFailures':
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
export default PostsReducer;