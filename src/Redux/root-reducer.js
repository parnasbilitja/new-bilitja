import AirportReducer from './Airports/airport.reducer';
import cityReducer from './City/city.reducer';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import airportReducer from './Airports/airport.reducer';
import searchReducer from './Search/search.reducer';
import searchvillaReducer from './Searchvilla/search_villa.reducer';
import reserveReducer from './Reserve/reserve.reducer';
import reservevillaReducer from './Reservevilla/reserve_villa.reducer'
import UIReducer from './UI/ui.reducer'
import accountReducer from './Account/account.reducer'
const persistConfig = {
    key: 'root',
    storage,
    whitelist:['airports','account','cities']
} 
const rootReducer = combineReducers({
    airports  : airportReducer,
    cities:cityReducer,
    search : searchReducer,
    searchvilla:searchvillaReducer,
    reserve:reserveReducer,
    reservevilla:reservevillaReducer,
    ui: UIReducer,
    account:accountReducer
});
export default persistReducer(persistConfig,rootReducer);