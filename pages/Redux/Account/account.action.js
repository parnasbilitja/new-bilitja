import AccountType from './account.type'
export const addAccountProperties = (value)=>{
    return {
        type: AccountType.ADD_ACCOUNT_PROPERTIES,
        payload: value
    }
} 