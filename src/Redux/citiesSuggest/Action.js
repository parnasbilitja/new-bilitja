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
        axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{hasTour:false})
        .then(response =>{
            // debugger
            const tours = response.data.data.filter(t=>t?.name==='استانبول' || t?.name==='آنتالیا' || t?.name==='مارماریس' || t?.name==='آلانیا' || t?.name==='دبی')

            dispatch(fetchCitySucces(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchCityFailures(errMsg))
        })
    }
}
