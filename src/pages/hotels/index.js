import React, {useEffect} from 'react';
import Hotels from '../../Components/hotel/Hotels';
// import {fetchAllHotels} from "@/Redux/allHotels/Action";
import axios from "axios";
import { useRouter } from 'next/router';



    const hotels = () => {
        const router = useRouter();
        const { query } = router;

        useEffect(() => {
            console.log('Page parameters:', query);
        }, [query]);
    return (
        <div>
            <Hotels id={query.id}/>
        </div>
    );
};


export default hotels;
