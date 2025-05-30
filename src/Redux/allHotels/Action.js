import axios from "axios";

export const fetchAllHotelsRequest = () =>{
    return {type:'getAllHotelsRequest'};
}
export const fetchAllHotelsSuccess = (data) =>{
    return {type:'getAllHotelsSuccess',payload:data};
}
export const fetchAllHotelsFailures = (error) =>{
    return {type:'getAllHotelsFailures',payload:error};
}

export const fetchAllHotels = (city,hotel,page) =>{
    
    return (dispatch) =>{
    dispatch(fetchAllHotelsRequest())
        axios.get(`https://api.hotelobilit.com/api/v2/hotels?q=${hotel}&city=${city}&page=${page}`, {
            headers: {
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05'
            }
        })
        .then(response =>{
            const tours = response.data
     
            dispatch(fetchAllHotelsSuccess(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchAllHotelsFailures(errMsg))
        })
    }
}
