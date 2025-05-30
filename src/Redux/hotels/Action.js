import axios from "axios";

export const fetchHotelsRequest = () =>{
    return {type:'getHotelsRequest'};
}
export const fetchHotelsSucces = (data) =>{
    return {type:'getHotelsSucces',payload:data};
}
export const fetchHotelsFailures = (error) =>{
    return {type:'getHotelsFailures',payload:error};
}

export const fetchHotels = (city) =>{
    return (dispatch) =>{
        dispatch(fetchHotelsRequest())
        axios.get(`https://api.hotelobilit.com/api/v2/hotels?city=${city}`,{
            headers:{
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05'
            }
        })
        .then(response =>{
            const tours = response.data.data
            dispatch(fetchHotelsSucces(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchHotelsFailures(errMsg))
        })
    }
}
