import axios from "axios";

export const fetchOfferdTourRequest = () =>{
    return {type:'getDataRequest'};
}
export const fetchOfferdTourSucces = (data) =>{
    return {type:'getDataSucces',payload:data};
}
export const fetchOfferdTourFailures = (error) =>{ 
    return {type:'getDataFailures',payload:error};
}

export const fetchOfferdTour = () =>{
    return (dispatch) =>{
        // dispatch(fetchOfferdTourRequest())
        axios.post('https://api.hamnavaz.com/api/v1/tour/getTours',{offered :1})
        .then(response =>{
            const tours = response.data.data
            dispatch(fetchOfferdTourSucces(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchOfferdTourFailures(errMsg))
        })
    }
}