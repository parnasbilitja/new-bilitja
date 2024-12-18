import useSWR from "swr";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import globals from "../../../sources/Global";
import Packages from "../../../sources/component/Packages";
import {Shimmers3} from "../../../Components/NewTours/Components/subComponents/Shimmers";
import NotFound from "../../NotFound";
import NavHandler from "../../../Components/share/NavHandler";
import Footer from "../../../sources/component/Footer.component";

const PackageListPage = () => {
    const router = useRouter();
    const [isParamsReady, setIsParamsReady] = useState(false);
    const [apiParams, setApiParams] = useState(null);

    // const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (router.isReady && router.query.packages) {
            setApiParams({
                origin: router.query.packages[0].split('-')[0],
                destination: router.query.packages[0].split('-')[1],
                month: '',
                stayCount: router.query.nights,
                ordering: 1,
                req_type: 'package',
                date: router.query.date
            });
            setIsParamsReady(true);
        }
    }, [router.isReady, router.query]);

    const fetcher = async([url, data]) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05'
            }
        });
        return response.json();
    }

    const { data: initialData, error: initialError ,isLoading:toursLoading} = useSWR(
        isParamsReady ? [`${globals.tourPackagesnew}packages`, apiParams] : null,
        fetcher
    );

    const { data: tourData, error: tourError,isLoading } = useSWR(
        () => initialData?.data ? initialData.data.map((item) => [`${globals.tourPackagesnew}packages/${item.id}`, { flat: true }]) : null,
        (urls) => Promise.all(urls.map(fetcher))
    );

    // if (!isParamsReady) {
    //     return <div > Loading... < /div>; / / Or your loading component
    // }

    const mergedData = useMemo(() => {

        if (!tourData || tourData.length === 0 || tourData[0].isDone === false) {
            return { allFlights: [], allTours: [] }
        } else {

            return tourData?.reduce((acc, tour) => ({
                tour_info: { title: initialData?.data[0]?.title, checkin: initialData?.data[0]?.checkin, checkout: initialData?.data[0]?.checkout, day_num: initialData?.data[0]?.day_num, night_num: initialData?.data[0]?.night_num },
                allFlights: [...acc?.allFlights, ...tour?.data?.flights ?.map((flight) => ({
                    ...flight,
                    tour_id: tour?.data?.id,
                    agency: { name: tour?.data?.agency, id: tour?.data?.agency_id }
                }))],
                allTours: [...acc?.allTours, ...tour?.data?.packages?.map((pkg) => ({
                    ...pkg,
                    check_in: tour?.data?.checkin,
                    check_out: tour?.data?.checkout,
                    tour_id: tour?.data?.id,
                    agency: { name: tour?.data?.agency, id: tour?.data?.agency_id }
                }))]
            }), { allFlights: [], allTours: [] })
        }

    }, [tourData])

    const optimizedPackages = useMemo(() => {
        const groupedTours = mergedData.allTours?.reduce((acc, tour) => {
            if (!acc[tour.hotel_nameEn]) acc[tour.hotel_nameEn] = [];
            acc[tour.hotel_nameEn].push(tour);
            return acc;
        }, {}); // Provide an initial empty object

        // Handle the case where groupedTours might still be undefined
        if (!groupedTours) return [];

        return Array.from(new Map(
            Object.values(groupedTours)
            .map(tours => tours.reduce((cheapest, tour) =>
                tour?.min_price < cheapest?.min_price ? tour : cheapest))
            .map(item => [item?.hotel_nameEn, item])
        ).values());

    }, [mergedData.allTours]);

    useEffect(() => {
        console.log(mergedData)
    }, [mergedData])
    return ( <>
            <NavHandler mobileFixed={true}/>
            {(optimizedPackages.length>0 && (!toursLoading && !isLoading))  ?<Packages tourdata={optimizedPackages}
                                                                                       all_data={mergedData}
                       tour_type={router.query.tour_type} isLoading={isLoading}/>:toursLoading || isLoading?

            <div className={'container'} style={{marginTop:'120px'}}>

                <Shimmers3/>
                <Shimmers3/>
                <Shimmers3/>
                <Shimmers3/>
                <Shimmers3/>
            </div> :        <NotFound title={'متاسفانه توری یافت نشد'}/>

            }
            <Footer/>

        </>
    )
}
export default PackageListPage;
