import AirportReducer from './Airports/airport.reducer';
import cityReducer from './City/city.reducer';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import airportReducer from './Airports/airport.reducer';
import searchReducer from './Search/search.reducer';
import searchAccommodationReducer from './SearchAccommodation/search_accommodation.reducer';
import reserveReducer from './Reserve/reserve.reducer';
import reserveAccommodationReducer from './ReserveAccommodation/reserve_accommodation.reducer'
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
    searchAccommodation:searchAccommodationReducer,
    reserve:reserveReducer,
    reserveAccommodation:reserveAccommodationReducer,
    ui: UIReducer,
    account:accountReducer
});
export default persistReducer(persistConfig,rootReducer);