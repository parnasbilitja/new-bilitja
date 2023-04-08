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
        axios.post('https://api.hamnavaz.com/api/v1/hotel/getHotels',{isAdmin:0,city:city, search:hotel, page:page,paginate:true,perPage:12})
        .then(response =>{
            const tours = response.data.data
            dispatch(fetchAllHotelsSuccess(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchAllHotelsFailures(errMsg))
        })
    }
}