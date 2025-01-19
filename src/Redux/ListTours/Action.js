import axios from "axios";

export const fetchListTourRequest = () =>{
    return {type:'getListDataRequest'};
}
export const fetchListTourSucces = (data) =>{
    return {type:'getListDataSucces',payload:data};
}
export const fetchListTourFailures = (error) =>{ 
    return {type:'getListDataFailures',payload:error};
}

export const fetchListTour = () =>{
    return (dispatch) =>{
        // dispatch(fetchListTourRequest())
        axios.post('https://api.hamnavaz.com/api/v1/tour/getTours',{limit:10})
        .then(response =>{
        
            const tours = response.data.data
            dispatch(fetchListTourSucces(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchListTourFailures(errMsg))
        })
    }
}