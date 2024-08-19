import React, {useEffect, useState} from "react";
import ToursBase from "../../Components/tours/ToursBase";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import {useRouter} from "next/router";
import axios from "axios";

const index = () => {
    const router=useRouter()
    const [tourSwitch, setTourSwitch] = useState("package-tour");
    const setTourType=(val,url)=>{
        setTourSwitch(val)
        router.push(url)

    }
    useEffect(()=>{
        // dispatch(fetchAllHotels(city,search.hotel,page))

        axios.get(`https://api.hotelobilit.com/api/v2/hotels?city=`, {
            headers: {
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05'
            }
        })
            .then(response =>{
                const tours = response.data.data
                console.log('32746',response)
                // dispatch(fetchAllHotelsSuccess(tours))
            })
            .catch(error=>{
                const errMsg = error.message
                // dispatch(fetchAllHotelsFailures(errMsg))
            })
    },[router])

    return (
        <div className="mt-90 bodyVar">
            <Scrolltoprefresh/>
            <ToursBase tourSwitch={tourSwitch}  setTourType={(val,url)=> setTourType(val,url)} />
        </div>
    );
};

export default index;
