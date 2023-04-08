import axios from "axios";

export const fetchPostsRequest = () =>{
    return {type:'getPostsRequest'};
}
export const fetchPostsSucces = (data) =>{
    return {type:'getPostsSucces',payload:data};
}
export const fetchPostsFailures = (error) =>{ 
    return {type:'getPostsFailures',payload:error};
}

export const fetchPosts = () =>{
    return (dispatch) =>{
        // dispatch(fetchListTourRequest())
        axios.post('https://api.hamnavaz.com/api/v1/post/getPosts',{isAdmin:0,paginate:1})
        .then(response =>{
            const tours = response.data.data
            dispatch(fetchPostsSucces(tours))
        })
        .catch(error=>{
            const errMsg = error.message
            dispatch(fetchPostsFailures(errMsg))
        })
    }
}