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
    // debugger
    return (dispatch) =>{
    dispatch(fetchAllHotelsRequest())
        axios.get(`https://api.hotelobilit.com/api/v2/hotels?city=&page=${page}`, {
            headers: {
                "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP'
            }
        })
        .then(response =>{
            const tours = response.data
            console.log(response)
            dispatch(fetchAllHotelsSuccess(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchAllHotelsFailures(errMsg))
        })
    }
}
