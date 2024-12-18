import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import HotelDet from "../../../sources/hotels/hotelInfo/HotelDet";
import NavHandler from "../../../Components/share/NavHandler";
import Footer from "../../../sources/component/Footer.component";
import FlightListTour from "../../../sources/flight/FlightList_tour";

const TourData = () => {
const [data,setData] = useState();
    const router = useRouter();
    useEffect(()=>{
        fetchCachedPackage(router.query.tourdata)
    },[router])
    const fetchCachedPackage = async (hotelId) => {
        try {debugger
            const response = await fetch(`/api/cache?key=${hotelId}`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            setData(data)

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
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

    <div className={'container'} style={{paddingTop:'10rem'}}>
        {data &&
            <>
                <HotelDet hotel={data?.hotel_info}/>
                <FlightListTour default_hotel={data?.default_hotel}/>
            </>
   }

    </div>
    <Footer/>
</>
    // <>tour-hotel</>
    )
}

export default TourData
