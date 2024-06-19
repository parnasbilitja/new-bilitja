import React from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import NavHandler from "../../../Components/share/NavHandler";
// import {jalaliToMiladiConvertor} from "@/Utils/newTour";
const AvFlight = dynamic(() =>
        import("../../../Components/NewTours/AvailableFlightBasedonSelectedTour"),
    {
        ssr:false
    }
);
const AvailableFlight = () => {
    return (
        <>
            <Head>
                <title>همنواز | تور</title>
            </Head>
            <NavHandler/>
            <AvFlight/>


        </>
    );
};

// export async function getServerSideProps(context) {
//     // Fetch data from an API or a database
//     let srcdest=context.query?.availablehotels[0]?.split('-')
//     let hotel
//     // let date =context.query.stDate.slice(0, 10)
//     const finalDate = jalaliToMiladiConvertor(context.query.stDate);
//     console.log(finalDate)
//     let options={
//         date: finalDate,
//         destination: srcdest[1],
//         keywords: null,
//         orderBy: 1,
//         origin: srcdest[0],
//         stars: null,
//         stayCount: context.query?.night,
//     }
//     hotel= await HotelCall(options)
//     // const res = await fetch(`https://.../posts/${params.id}`);
//     // const post = await res.json();
//     if (!hotel) {
//         // If the data does not exist, return { notFound: true }
//         return {
//             notFound: true,
//         };
//     }
//     return {
//         props:{
//             hotels:hotel,
//             options:options
//         }
//         // props: { post },
//         // Revalidate the page every 10 seconds
//         // revalidate: 10,
//     };
// }

export default AvailableFlight;
