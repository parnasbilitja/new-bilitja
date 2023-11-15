import React, {useState} from "react";
import ToursBase from "../../Components/tours/ToursBase";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import {useRouter} from "next/router";
import Head from "next/head";

const index = () => {
    const router=useRouter()
    const [tourSwitch, setTourSwitch] = useState("package-tour");
    const setTourType=(val,url)=>{
        setTourSwitch(val)
        router.push(url)

    }
    return (
        <div className="mt-90 bodyVar">
            <Head>
                <title>بلیطجا | لیست تورها</title>
            </Head>
            <Scrolltoprefresh/>
            <ToursBase tourSwitch={tourSwitch}  setTourType={(val,url)=> setTourType(val,url)} />
        </div>
    );
};

export default index;
