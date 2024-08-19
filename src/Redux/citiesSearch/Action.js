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
        axios.post('https://api.hotelobilit.com/api/v1/cities',{hasHotel :1},{
            headers:{
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05'
            }
        })
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
