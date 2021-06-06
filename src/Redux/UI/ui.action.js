import UIType from './ui.type'
export const messageBoxModify = (value)=>{
    return {
        type: UIType.MESSAGEBOX_MODIFY,
        payload: value
    }
} 

export const accountBoxModify=(value)=>{
    return {
        type:UIType.ACCOUNTBOX_MODIFY,
        payload:value
    }
}

