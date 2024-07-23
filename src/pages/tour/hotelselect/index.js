import dynamic from "next/dynamic";
import Footer from "../../../sources/component/Footer.component";
import React, {useEffect} from "react";
import NavHandler from "../../../Components/share/NavHandler";
import Head from "next/head";



const AvHotel = dynamic(() =>
        import("../../../Components/NewTours/AvailableHotel1"),
    {
        ssr: false
    }
);



const availablehotels = () => {
    return (
        <>
            <Head>
                <title>بلیطجا | تور</title>
            </Head>
            <NavHandler/>
            <AvHotel/>
        </>
    )

};

export default availablehotels;
