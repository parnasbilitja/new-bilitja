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
        // dispatch(fetchHotelsRequest())
        axios.post('https://api.hamnavaz.com/api/v1/hotel/getHotels',{isAdmin:0,city:city})
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