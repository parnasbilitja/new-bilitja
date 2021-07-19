import UIType from './ui.type'
const INITIAL_STATE = {
    messageBox:{
        state:false,
        message:''
    },
    accountBox:{
        state:false,
        type:'login'
    },
    accountBox:{
        state:false,
        type:'register'
    }
}

const UIReducer = (state= INITIAL_STATE,action)=>{
    switch(action.type){
        case UIType.MESSAGEBOX_MODIFY:{
            return {
                ...state,
                messageBox:action.payload
            }
        }
        case UIType.ACCOUNTBOX_MODIFY:{
            return {
                ...state,
                accountBox:action.payload
            }
        }
        default:{
            return state
        }
    }
}
export default UIReducer 