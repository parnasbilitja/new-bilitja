import useSWR from "swr";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import globals from "../../../sources/Global";
import Packages from "../../../sources/component/Packages";
import { Loading, Shimmers3 } from "../../../Components/NewTours/Components/subComponents/Shimmers";
import NotFound from "../../NotFound";
import NavHandler from "../../../Components/share/NavHandler";
import Footer from "../../../sources/component/Footer.component";
import Scrolltoprefresh from "../../../sources/component/Scrolltoprefresh";
import { getRandomNumber } from "../../../Utils/newTour";

const PackageListPage = () => {
  const router = useRouter();
  const [isParamsReady, setIsParamsReady] = useState(false);
  const [apiParams, setApiParams] = useState(null);

  useEffect(() => {
    if (router.isReady && router.query) {
      
      
      setApiParams({
        origin: router.query.origin.split("-")[0],
        destination: router.query.destination.split("-")[0],
        month: "",
        stayCount:router.query.nights === "null" || !router.query.nights
            ? ""
            : router.query.nights,
        ordering: 1,
        req_type: "package",
        date: router.query.date,
      });
      setIsParamsReady(true);
    }
  }, [router.isReady, router.query]);

  const fetcher = async ([url, data]) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-app-key": "1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05",
      },
    });
    return response.json();
  };

  const {
    data: initialData,
    error: initialError,
    isLoading: toursLoading,
  } = useSWR(
    isParamsReady ? [`${globals.tourPackagesnew}packages`, apiParams] : null,
    fetcher
  );

  const {
    data: tourData,
    error: tourError,
    isLoading,
  } = useSWR(
    () =>
      initialData?.data
        ? initialData.data.map((item) => [
            `${globals.tourPackagesnew}packages/${item.id}`,
            { flat: true },
          ])
        : null,
    (urls) => Promise.all(urls.map(fetcher))
  );

  // if (!isParamsReady) {
  //     return <div > Loading... < /div>; / / Or your loading component
  // }

  const mergedData = useMemo(() => {
    if (!tourData || tourData.length === 0) {
      return { allFlights: [], allTours: [] };
    } else {
      // console.log('tourData',tourData)

      return tourData
        .filter((tour) => tour.isDone === true)
        ?.reduce(
          (acc, tour) => ({
            tour_info: {
              title: initialData?.data[0]?.title,
              checkin: initialData?.data[0]?.checkin,
              checkout: initialData?.data[0]?.checkout,
              day_num: initialData?.data[0]?.day_num,
              night_num: initialData?.data[0]?.night_num,
            },
            allFlights: [
              ...acc?.allFlights,
              ...tour?.data?.flights?.map((flight) => ({
                ...flight,
                tour_id: tour?.data?.id,
                agency: { name: tour?.data?.agency, id: tour?.data?.agency_id },
              })),
            ],

            allTours: [
              ...acc?.allTours,
              ...tour?.data?.packages?.map((pkg) => ({
                ...pkg,
                rooms: pkg?.rooms?.map((room) => {
                  return {
                    ...room,
                    agency: {
                      name: tour?.data?.agency,
                      id: tour?.data?.agency_id,
                    },
                    package_id: pkg?.id,
                    tour_id: tour?.data?.id,
                  };
                }),
                check_in: tour?.data?.checkin,
                check_out: tour?.data?.checkout,
                tour_id: tour?.data?.id,
                agency: { name: tour?.data?.agency, id: tour?.data?.agency_id },
              })),
            ],
          }),
          { allFlights: [], allTours: [] }
        );
    }
  }, [tourData]);

  const related_agency_rooms_merger = (hotels) => {
    let new_hotel = Object.keys(hotels).map((item) => {
      return hotels[item].map((hotel) => {
        return {
          hotel: {
            ...hotel,
            rooms: hotel.rooms.map((room) => {
              return {
                ...room,
                agency: hotel.agency,
              };
            }),
          },
        };
      });
    });

    // console.log('hi',new_hotel)
  };

  const hotelsrooms_merger = (hotels) => {
    let all_hotels = [];

    Object.keys(hotels).map((item) => {
      let hotel_profile = hotels[item][0];
      all_hotels.push(hotel_profile);
    });
    // related_agency_rooms_merger(hotels);
    let merged_rooms = [];
    all_hotels = all_hotels.map((hotel) => {
      merged_rooms = [];

      hotels[hotel?.hotel_nameEn]?.forEach((item) => {
        merged_rooms.push(...item?.rooms);
      });
      return {
        ...hotel,
        rooms: merged_rooms,
      };
    });

    return all_hotels;
  };
  
  const tags = ["ترانسفر رایگان", "بیمه مسافرتی رایگان", "پرواز رفت و برگشت"];
  const tagsGen=(numList)=>{

    let list =[tags[numList[0]],tags[numList[1]]]


return list

  }

  const optimizedPackages = useMemo(() => {
    // console.log(mergedData.allTours);

    const groupedTours = mergedData.allTours?.reduce((acc, tour) => {
      if (!acc[tour.hotel_nameEn]) acc[tour.hotel_nameEn] = [];
      acc[tour.hotel_nameEn].push(tour);
      return acc;
    }, {});

    let new_merged = hotelsrooms_merger(groupedTours);

    if (!groupedTours) return [];

    // let final=Array.from(new Map(
    //     Object.values(groupedTours)
    //         .map(tours => tours.reduce((cheapest, tour) =>
    //             tour?.min_price < cheapest?.min_price ? tour : cheapest))
    //         .map(item => [item?.hotel_nameEn, item])
    // ).values());

    // console.log(new_merged)

    new_merged=new_merged.map(pack=>{
      return {
        ...pack,
        feature:tagsGen(getRandomNumber(3))
      }
    })
    return new_merged;
  }, [mergedData.allTours]);



  return (
    <>
      <Scrolltoprefresh />
      <NavHandler mobileFixed={true} />
      {optimizedPackages.length > 0 && !toursLoading && !isLoading ? (
        <Packages
          tourdata={optimizedPackages}
          all_data={mergedData}
          tour_type={router.query.tour_type}
          isLoading={isLoading}
        />
      ) : toursLoading || isLoading ? (
        <div className={"container"} style={{ marginTop: "120px" }}>
          <Shimmers3 />
          <Shimmers3 />
          <Shimmers3 />
          <Shimmers3 />
          <Shimmers3 />
                      <Loading title={`درحال جستجو تورهای`+' ' + router.query?.origin?.split('-')[1] +' '+'به' +' '+ router.query?.destination?.split('-')[1] + router?.query?.nights +' '+ 'شب' + '....'}/>
          
        </div>
      ) : (
        <NotFound title={"متاسفانه توری یافت نشد"} />
      )}
      <Footer />
    </>
  );
};
export default PackageListPage;
