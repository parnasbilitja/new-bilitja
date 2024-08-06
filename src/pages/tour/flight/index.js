import React from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import NavHandler from "../../../Components/share/NavHandler";

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
                <title>بلیطجا | تور</title>
            </Head>
            <NavHandler/>
            <AvFlight/>


        </>
    );
};



export default AvailableFlight;
