import axios from "axios";

export const fetchCityRequest = () =>{
    return {type:'getCitySearchRequest'};
}
export const fetchCitySucces = (data) =>{
    return {type:'getCitySearchSucces',payload:data};
}
export const fetchCityFailures = (error) =>{ 
    return {type:'getCitySearchFailures',payload:error};
}

export const fetchCitySearch = () =>{
    return (dispatch) =>{
        // dispatch(fetchListTourRequest())
        axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{offered :1})
        .then(response =>{
            const tours = response.data.data
            dispatch(fetchCitySucces(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchCityFailures(errMsg))
        })
    }
}