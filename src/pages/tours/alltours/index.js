import React, {useEffect, useState} from 'react';
import NavHandler from "../../../Components/share/NavHandler";
import List from '../../../sources/tour/List'
import axios from "axios";
// import Paginate from "@/Components/NewTours/Components/subComponents/Paginate";
import Scrolltoprefresh from "../../../sources/component/Scrolltoprefresh";
import styles from '../../../../styles/allTours.module.scss'


function Index(props) {
    const [tour,setTour]=useState([])
    const [meta,setMeta]=useState([])
   let loading=false
const AlltoursHandler = (page=1) => {
        setTour([])
    axios
        .post(`https://api.hotelobilit.com/api/v2/tours?page=${page}`, {

            req_type:'package'
        }, {
            headers: {
                "x-app-key": '498|dNk7pOSiwfVlyX6uNWejkZ136Oy9U5iJTpne87PP' //the token is a variable which holds the token
            }
        })
        .then((res) => {
            setTour(res.data.data)
            setMeta(res?.data?.meta)
        })
        // .catch((err) =>r);
};
useEffect(()=>{
    AlltoursHandler()
},[])

    function scrollToTop() {
        var body =document.getElementsByTagName("body")
        body[0].scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    return (
        <>
        <NavHandler/>

            <div className={styles['alltour']}>
                <div>
                <Scrolltoprefresh/>

                <List scrollToTop={true} hideShowMore={false} tourData={tour} shimmerNumber={15} />
                </div>
            </div>
        </>
        // <div>fuck</div>
    );
}

export default Index;
