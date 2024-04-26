import React, {useEffect} from 'react';
import Hotels from '../../Components/hotel/Hotels';
import {fetchAllHotels} from "@/Redux/allHotels/Action";
import axios from "axios";

const hotels = () => {


    return (
        <div>
            <Hotels/>
        </div>
    );
};

export default hotels;
