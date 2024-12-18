import React, {useEffect, useState} from 'react';
import NavHandler from "../../../Components/share/NavHandler";
import List from '../../../sources/tour/List'
import axios from "axios";
// import Paginate from "@/Components/NewTours/Components/subComponents/Paginate";
import Scrolltoprefresh from "../../../sources/component/Scrolltoprefresh";
import styles from '../../../../styles/allTours.module.scss'
import {useRouter} from "next/router";
import globals from "../../../sources/Global";


function Index(props) {

    const router = useRouter();
    const [tour,setTour]=useState([])
    const [meta,setMeta]=useState([])
   let loading=false
const AlltoursHandler = (page=1) => {
        setTour([])



    axios.post(`${globals.tourPackagesnew}packages?page=${page}`, {
            destination:router.query.destination,
            origin: router.query?.origin,
            month:'',
            stayCount:+router.query?.nights ,
            ordering:1,
            req_type:'package',
            date:router.query?.date ,
    }, {
            headers: {
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
            }
        })
        .then((res) => {
            setTour(res.data.data)
            setMeta(res?.data?.meta)

            console.log('end')
        })
        // .catch((err) =>r);
};


useEffect(()=>{
    AlltoursHandler()
},[router.query])

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

                <List scrollToTop={true} scroll_top={()=>scrollToTop()} hideShowMore={false} tourData={tour} shimmerNumber={15} />
                </div>
            </div>
        </>
        // <div>fuck</div>
    );
}

export default Index;
