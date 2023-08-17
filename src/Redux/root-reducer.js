import cityReducer from "./City/city.reducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import airportReducer from "./Airports/airport.reducer";
import searchReducer from "./Search/search.reducer";
import { searchboxReducer } from "./Searchazhans/SearchboxReducer";
import searchvillaReducer from "./Searchvilla/search_villa.reducer";
import reserveReducer from "./Reserve/reserve.reducer";
import reservevillaReducer from "./Reservevilla/reserve_villa.reducer";
import { AzhanslistReducer } from "./Azhanslist/AzhanslistReducer";
import UIReducer from "./UI/ui.reducer";
import accountReducer from "./Account/account.reducer";
import { userReducer } from "./Account/account.reducer";
import { ProfileReducer } from "./Dashboard/Profile/profile.reducer";
import ReportReducer from "./Reports/reports.reducer";
import DataReducer from "./OfferdTours/Reducer";
import ListDataReducer from "./ListTours/Reducer";
import PostDataReducer from "./posts/Reducer";
import CityReducer from "./citiesSuggest/Reducer";
import HotelReducer from "./hotels/Reducer";
import CitySearchReducer from "./citiesSearch/Reducer";
import AllHotelReducer from "./allHotels/Reducer";
import NewTourReducer from "./newTours/newToursReducer";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["airports", "account", "cities"],
};
const rootReducer = combineReducers({
  airports: airportReducer,
  CitySearchReducer: CitySearchReducer,
  AllHotelReducer: AllHotelReducer,
  HotelReducer: HotelReducer,
  DataReducer: DataReducer,
  ListDataReducer: ListDataReducer,
  PostDataReducer: PostDataReducer,
  CityReducer: CityReducer,
  cities: cityReducer,
  search: searchReducer,
  searchvilla: searchvillaReducer,
  reserve: reserveReducer,
  reservevilla: reservevillaReducer,
  ui: UIReducer,
  account: accountReducer,
  user_information: ProfileReducer,
  user: userReducer,
  searchboxReducer: searchboxReducer,
  AzhanslistReducer: AzhanslistReducer,
  reports: ReportReducer,
  destandoriginCitiesTour: NewTourReducer,

});
export default persistReducer(persistConfig, rootReducer);
