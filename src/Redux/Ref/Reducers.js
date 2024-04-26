const initialState = {
 myRef:'hj'
}
const RefReducer = (state = initialState, action) =>{
    switch (action.type){

        case 'GET_MY_REF':
            return{
               myRef: action.payload
            }

        default:
            return state
    }
}
export default RefReducer;