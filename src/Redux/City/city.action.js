import CityType from './city.type'
export const addCities = (value)=>{
    return {
        type: CityType.ADD_CITIES,
        payload: value
    }
} 