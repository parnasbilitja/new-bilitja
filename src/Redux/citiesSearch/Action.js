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
                "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP'
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
