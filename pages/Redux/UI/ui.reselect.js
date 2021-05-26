import {createSelector} from 'reselect'

const ui = state=> state.ui 

export const selectMessageBox = createSelector([ui], ui => (ui.messageBox))

export const selcetAccountBox=createSelector([ui],ui=>(ui.accountBox))
