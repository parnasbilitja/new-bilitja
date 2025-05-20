import { useRouter } from "next/router";
import { useEffect } from "react";
import TourList from "../../../Components/tours/TourList";
import TourPackages from "../../../Components/tours/TourPackages";

const Search=()=>{


      const router = useRouter();
            const { query } = router;

            useEffect(()=>{
                console.log(query);
                
            },[query])
    return <>


        {
            query.tour_type==='hotel'?<TourPackages params={query}/>:<><TourList params={query}/></>
        }
    </>
}

export default Search