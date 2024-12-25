import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import HotelDet from "../../../sources/hotels/hotelInfo/HotelDet";
import NavHandler from "../../../Components/share/NavHandler";
import Footer from "../../../sources/component/Footer.component";
import FlightListTour from "../../../sources/flight/FlightList_tour";
import {Shimmers6} from "../../../Components/NewTours/Components/subComponents/Shimmers";
import {isEmpty} from "../../../Utils/newTour";
import NotFound from "../../NotFound";
import Scrolltoprefresh from "../../../sources/component/Scrolltoprefresh";

const TourData = () => {
const [data,setData] = useState({});
const [isloading,setLoading]=useState(true);
    const router = useRouter();
    useEffect(()=>{
        fetchCachedPackage(router.query.tourdata)
    },[router])
    const fetchCachedPackage = async (hotelId) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/cache?key=${hotelId}`, { cache: 'no-store' });
            if (!response.ok) {
                setLoading(false);
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
setLoading(false);
            setData(data)

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            setLoading(false);
            console.error('Error fetching cached package:', error);
            return null;
        }
    };

    useEffect(()=>{
        console.log(data)
    },[data])

return(

<>
    <NavHandler/>
    <Scrolltoprefresh/>


    <div className={'container'} style={{paddingTop:'10rem'}}>
        {!isloading && !isEmpty(data) ?
            <div style={{height: '100%'}}>
                <HotelDet hotel={data?.hotel_info}/>
                <FlightListTour default_hotel={data?.default_hotel}/>
            </div>

            : (isloading && isEmpty(data) )?
            <>
                <Shimmers6 selectedHeight={800}/>
            </>:
                <NotFound/>
        }

    </div>
    <Footer/>
</>
    // <>tour-hotel</>
)
}

export default TourData
