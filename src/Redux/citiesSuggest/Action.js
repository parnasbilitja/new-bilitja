import axios from "axios";

export const fetchCityRequest = () =>{
    return {type:'getCityRequest'};
}
export const fetchCitySucces = (data) =>{
    return {type:'getCitySucces',payload:data};
}
export const fetchCityFailures = (error) =>{ 
    return {type:'getCityFailures',payload:error};
}

export const fetchCity = () =>{
    return (dispatch) =>{
        // dispatch(fetchListTourRequest())
        axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{hasTour:true})
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