import AccountType from './account.type'

const INITIAL_STATE = {
    properties : null
}

const accountReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case AccountType.ADD_ACCOUNT_PROPERTIES:{
            return {
                ...state,
                properties : action.payload
            }
            
        }
        default:{
            return state
        }
    }
}
export default accountReducer 