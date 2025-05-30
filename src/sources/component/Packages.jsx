import {
  Err,
  NotifAlert,
} from "../../Components/NewTours/Components/NotifAlert.component";
import Head from "next/head";
import styles from "../../../styles/TourPackage/PackageTourDetails.module.scss";
import {
  getRandomNumber,
  isEmpty,
  MiladiToJalaliConvertor,
  timeFixer,
} from "../../Utils/newTour";
import { Shimmers4 } from "../../Components/NewTours/Components/subComponents/Shimmers";
import Modal from "react-modal";
import { moneyFormatrial } from "../../Utils/SimpleTasks";
import { Loader } from "../../Utils/Loader";
import RequestTour from "../../Components/modal/RequestTour";
import React, { useEffect, useState } from "react";
import axios from "axios";
import globals from "../Global";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import RoomSelection from "../../Components/NewTours/Rooms/RoomSelection";

const Packages = (props) => {
  const router = useRouter();
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [TargetFlight, setTargetFlight] = useState({});
  const [filter, setFilter] = useState({
    search_input: "",
    // sort_by: "2",
    star: false,
    cheapest: false,
    expense: false,
  });

  useEffect(()=>{
console.log(props,'djgshadj');

  },[props])

  const [isdownload, setIsDownload] = useState(false);
  const [data, setData] = useState({});
  const [packages, setPackages] = useState([]);
  const [show, setShow] = useState(false);
  const [reqReserve, setReqReserve] = useState(false);
  const [flightList, setFlightList] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);


  useEffect(()=>{
    console.log(props.selected_flight);

  },[props.selected_flight])
  const roomFinder1 = (rooms, roomTypeID) => {
let cheapest
    let foundRoom = rooms?.filter((room) => room?.room_type_id === roomTypeID);
   if(props.tour_type==='hotel'){
    cheapest = foundRoom.reduce(
      (min, obj) => (obj.price < min.price ? obj : min),
      foundRoom[0]
    );
   }else{
    debugger
  cheapest=  foundRoom.filter((room)=>+room.flight_id === +props.selected_flight)[0]
   }

    return cheapest;
  };

  const compositionFilter = () => {
    let filteredData = [...packages];

    // Filter by airline names
    if (filter.search_input !== "") {
      filteredData = filteredData.filter(
        (data) =>
          data.hotel_name.includes(filter.search_input) ||
          data.hotel_nameEn
            .toUpperCase()
            .includes(filter.search_input.toUpperCase())
      );
    } else {
      filteredData =
        props.tour_type === "package"
          ? props.tourdata?.packages
          : props.tourdata;
    }

    if (filter.star && !filter.cheapest && !filter.expense) {
      filteredData = filteredData.sort(
        (a, b) => +a.hotel_stars - +b.hotel_stars
      );
    }else if (filter.cheapest && filter.star) {
      let list = [];
      for (let i = 1; i < 7; i++) {
        let filterdHotelBystar = filteredData.filter(
          (hotel) => +hotel.hotel_stars === i
        );
        list.push(
          ...filterdHotelBystar.sort(
            (a, b) =>
              +roomFinder1(a.rooms, 148)?.price -
              +roomFinder1(b.rooms, 148)?.price
          )
        );
      }

      filteredData = list;
    } else if (filter.cheapest && !filter.star) {
      filteredData = filteredData.sort(
        (a, b) =>
          roomFinder1(a.rooms, 148)?.price - roomFinder1(b.rooms, 148)?.price
      );
    }else if (filter.expense && filter.star) {
      let list = [];
      for (let i = 1; i < 7; i++) {
        let filterdHotelBystar = filteredData.filter(
          (hotel) => +hotel.hotel_stars === i
        );
        list.push(
          ...filterdHotelBystar.sort(
            (a, b) =>
              +roomFinder1(b.rooms, 148)?.price -
              +roomFinder1(a.rooms, 148)?.price
          )
        );
      }

      filteredData = list;
    } else if(filter.expense && !filter.star) {
      filteredData = filteredData.sort(
        (a, b) =>
          roomFinder1(b?.rooms, 148)?.price - roomFinder1(a?.rooms, 148)?.price
      );
    }
    let with0ut148=[]
    let with148=[]
    filteredData.map((pack)=>{
      let foundRoom=pack.rooms.filter((room)=>room.room_type_id===148)
      if(foundRoom.length===0){
        with0ut148.push(pack)
      }else{
        with148.push(pack)
      }
    })
    
    return [...with148,...with0ut148];
  };

  const [selectedRooms, setSelectedRoom] = useState(0);
  const [targetHotel, setTargetHotel] = useState({});
  const foundRooms = (pack) => {

    let rooms=[]
    if(props.tour_type==='hotel'){


      if(pack.length>0){
        let foundRoom = pack?.filter((room) => +room?.room_type_id === 148);

        if(foundRoom.length>0){
          let cheapest148room = foundRoom?.reduce(
              (min, obj) => (obj.price < min.price ? obj : min),
              foundRoom[0]
          );
          rooms = [cheapest148room];
          let OtherRoom = pack?.filter(
              (room) =>
                  room?.flight_id === cheapest148room?.flight_id &&
                  +room?.room_type_id !== 148
              // &&
              // +cheapest148room.package_id === +room.package_id
          );

          rooms.push(...OtherRoom);
        }else{
          let cheapestRoom=pack?.reduce(
              (min, obj) => (obj.price < min.price ? obj : min),
              pack[0]
          );
          rooms=[cheapestRoom]
          let OtherRoom = pack?.filter(
              (room) =>
                  room?.flight_id === cheapestRoom?.flight_id &&
                  +room?.room_type_id !== cheapestRoom.room_type_id
              // &&
              // +cheapest148room.package_id === +room.package_id
          );

          rooms.push(...OtherRoom)
        }
      }


    }else{
      let foundRoom= pack.filter(room=>+room.flight_id===+props.selected_flight)

      rooms=foundRoom
    }


    setSelectedRoom(rooms);
  };

  useEffect(() => {
    setData(null);
    setData(props.tourdata);
    setPackages(
      props.tour_type === "package" ? props.tourdata?.packages : props.tourdata
    );

    if (props.tour_type === "package") {
      setSelectedFlight(props.tourdata?.selected_flight);
      let foundFlight = props.tourdata?.flights?.filter(
        (flight) => flight?.id === props.tourdata?.selected_flight
      );

      setFlightList(props.tourdata?.flights);
    }
  }, [props.tourdata]);

  function removeDuplicatesByName(arr) {
    const seen = new Map();
    return arr.filter((obj) => {
      const objName = obj.id;
      if (!seen.has(objName)) {
        seen.set(objName, true);
        return true;
      }
      return false;
    });
  }

  const hotel_flight_merger = (hotels, flights) => {

    return hotels.map((hotel) => {
      let related_flights = [];
      hotel.rooms = hotel.rooms.map((room) => {
        flights?.forEach((flight) => {
          if (flight.id === room.flight_id) {
            related_flights.push(flight);
          }
        });
        return { ...room }; // Return the modified room
      });
      return {
        ...hotel,
        related_flights: removeDuplicatesByName(related_flights),
      }; // Return the modified hotel
    });
  };

  const handlePackageClick = async (pack) => {

    setSelectedHotel(pack.id);

    let default_hotel =
      props.tour_type === "package" ? [{ ...pack }] : [{ ...pack }];

    default_hotel =
      props.tour_type === "package"
        ? hotel_flight_merger(default_hotel, flightList)
        : hotel_flight_merger(default_hotel, props?.all_data?.allFlights);
    if (props.tour_type === "package") {
      default_hotel[0].tour_id = props.tourId;
    }





    if (default_hotel.length > 0) {
      try {
        // Cache the selected package
        const response = await fetch("/api/cache", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            default_hotel,
            hote_slug: pack.hotel_slug,
          }),
        });
        const data = await response.json();

        if (response.ok) {
          const { key } = data;
          setSelectedHotel(pack.id);
          router.push(`/tours/tourdetails/${key}`);
        } else {
          console.error("Error caching package:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  function handleDownload(pdfLink) {
    const url = window.URL.createObjectURL(
      new Blob([pdfLink], { type: "application/pdf" })
    );
    const link = document.createElement("a");
    link.href = pdfLink;
    link.setAttribute("download", "downloaded-file.pdf"); // Set the desired filename
    link.download = "tours.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const downloadHandler = async () => {
    setIsDownload(true);
    axios
      .post(
        `${globals.tourPackagesnew}packages/${props.tourId}`,
        {
          flight_id: data.selected_flight,
          pdf: true,
        },
        {
          headers: {
            "x-app-key":
              "1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05",
          },
        }
      )
      .then((res) => {
        setIsDownload(false);
        handleDownload(res.data.data.url);
      })
      .catch((err) => {
        setIsDownload(false);
        Err("مشکلی در دانلود pdf بوجود آمده");
      });
  };

  const tags = ["ترانسفر رایگان", "بیمه مسافرتی رایگان", "پرواز رفت و برگشت"];
  useEffect(() => {
    setTargetFlight(
      flightList.filter((flight) => flight.id === selectedFlight)[0]
    );
  }, [flightList]);



  const handleCheckbox = (e, type) => {
    if(type==='cheapest' &&  e.target.checked){
      setFilter((prev) => ({
        ...prev,
        [type]: e.target.checked,
        expense:false


      }));
    }else if(type==='expense' &&  e.target.checked){
      setFilter((prev) => ({
        ...prev,
        [type]: e.target.checked,
        cheapest:false


      }));
    }else{
      setFilter((prev) => ({
        ...prev,
        [type]: e.target.checked,


      }));
    }

  };


  return (
    <>
      <div>
        <NotifAlert />

        <Head>
          <title>
            {" "}
            {props.tour_type === "package"
              ? data?.title
              : props.all_data?.tour_info?.title}{" "}
            بلیطجا|{" "}
          </title>
        </Head>
        <div className={styles["tours"]}>
          <div style={{ position: "relative !important" }}>
            <section className="mt-8">
              {
                <div className={styles["tour"]}>
                  <div className={styles["p-data"]}>
                    <div>
                      <div className="p-info__tour col-xl-12 col-lg-12 col-12 mt-3 border-bottom pb-4 ">
                        <div className={"isMobile"}>
                          <div className={styles["title_info"]}>
                            <div>
                              <p
                                className={`p-0 m-0 text-center mb-1 font-bold  ${styles["title"]}`}
                                style={{ marginBottom: "3px !important" }}
                              >{`هتل های ${
                                props.tour_type === "package"
                                  ? data?.title
                                  : props.all_data?.tour_info?.title ? props.all_data?.tour_info?.title :'لیست تور'
                              }`}</p>
                            </div>

                            <div className={"d-flex justify-content-between"}>
                              <div className={styles["checkin_checkout"]}>
                                <p className={"p-0 m-0"}>تاریخ ورود به هتل:</p>
                                <p className={"p-0 m-0"}>
                                  {" "}
                                  {MiladiToJalaliConvertor(
                                    props.tour_type === "package"
                                      ? data.checkin
                                      : props.all_data?.tour_info?.checkin
                                  )}
                                </p>
                              </div>
                              <div className={styles["checkin_checkout"]}>
                                <p className={"p-0 m-0"}>تاریخ خروج از هتل:</p>
                                <p className={"p-0 m-0"}>
                                  {" "}
                                  {MiladiToJalaliConvertor(
                                    props.tour_type === "package"
                                      ? data.checkout
                                      : props.all_data?.tour_info?.checkout
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {props.tour_type === "package" &&
                          !isEmpty(TargetFlight) && (
                            <div>
                              <div className="d-flex align-items-center w-100 gap-2 mb-2">
                                <svg
                                  style={{ rotate: "270deg" }}
                                  viewBox="0 0 24 24"
                                  // fill="#e20000"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="#e20000"
                                >
                                  <g>
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z" />
                                  </g>
                                </svg>

                                <p
                                  className="font-size-14 p-0 m-0 font-bold"
                                  style={{ color: "#e20000" }}
                                >
                                  اطلاعات پرواز این تور
                                </p>
                              </div>
                              <motion.div
                                className={styles["flight_card"]}
                                style={{ cursor: "pointer" }}
                              >
                                <div className={styles["dep_return"]}>
                                  <div className={styles["item_details"]}>
                                    <div className={styles["img_container"]}>
                                      <img
                                        src={
                                          TargetFlight?.departure_flight
                                            ?.airline_thumb?.url
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <div className={styles["item"]}>
                                      <p>
                                        {
                                          TargetFlight?.departure_flight
                                            ?.airline
                                        }
                                      </p>
                                    </div>
                                  </div>

                                  <div className={styles["item_details"]}>
                                    <div className={styles["item"]}>
                                      <p className={"font-bold"}>
                                        {TargetFlight?.departure_flight?.origin}{" "}
                                        به{" "}
                                        {
                                          TargetFlight?.departure_flight
                                            ?.destination
                                        }
                                      </p>
                                    </div>
                                    <div className={styles["item"]}>
                                      <p> ش.پ:</p>
                                      <p className={"font-bold"}>
                                        {
                                          TargetFlight?.departure_flight
                                            ?.flight_number
                                        }
                                      </p>
                                    </div>
                                  </div>

                                  <div className={styles["item_details"]}>
                                    <div className={styles["item"]}>
                                      <p>زمان پرواز:</p>
                                      <p>
                                        {MiladiToJalaliConvertor(
                                          TargetFlight?.departure_flight?.date
                                        )}{" "}
                                        |{" "}
                                        {timeFixer(
                                          TargetFlight?.departure_flight?.time
                                        )}
                                      </p>
                                    </div>
                                    <div className={styles["item"]}>
                                      <p>مدت پرواز:</p>
                                      <p>
                                        {
                                          TargetFlight?.departure_flight
                                            ?.flight_duration
                                        }{" "}
                                        ساعت
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    "d-flex justify-content-center  align-content-center"
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#e20000"
                                    viewBox="0 0 24 24"
                                    width={25}
                                    className={styles["svg"]}
                                    height={25}
                                    stroke-width="1.5"
                                    stroke="#e20000"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                                    />
                                  </svg>
                                </div>
                                <div className={styles["dep_return"]}>
                                  <div className={styles["item_details"]}>
                                    <div className={styles["img_container"]}>
                                      <img
                                        src={
                                          TargetFlight?.return_flight
                                            ?.airline_thumb?.url
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <div className={styles["item"]}>
                                      <p>
                                        {TargetFlight?.return_flight?.airline}
                                      </p>
                                    </div>
                                  </div>

                                  <div className={styles["item_details"]}>
                                    <div className={styles["item"]}>
                                      <p className={"font-bold"}>
                                        {TargetFlight?.return_flight?.origin} به{" "}
                                        {
                                          TargetFlight?.return_flight
                                            ?.destination
                                        }
                                      </p>
                                    </div>
                                    <div className={styles["item"]}>
                                      <p> ش.پ:</p>
                                      <p className={"font-bold"}>
                                        {
                                          TargetFlight?.return_flight
                                            ?.flight_number
                                        }
                                      </p>
                                    </div>
                                  </div>

                                  <div className={styles["item_details"]}>
                                    <div className={styles["item"]}>
                                      <p>زمان پرواز:</p>
                                      <p>
                                        {MiladiToJalaliConvertor(
                                          TargetFlight?.return_flight?.date
                                        )}{" "}
                                        |{" "}
                                        {timeFixer(
                                          TargetFlight?.return_flight?.time
                                        )}
                                      </p>
                                    </div>
                                    <div className={styles["item"]}>
                                      <p>مدت پرواز:</p>
                                      <p>
                                        {
                                          TargetFlight?.return_flight
                                            ?.flight_duration
                                        }{" "}
                                        ساعت
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          )}

                        {packages.length > 0 ? (
                          compositionFilter()
                            ?.map((pack) => (
                              <motion.div
                                className={styles["hotel-item"]}
                                key={pack.id}
                                whileHover={{ translateX: "10px" }}
                                // animate={{translateX:'100px'}}
                              >
                                <div className="d-detail position-relative col-xl-12 col-lg-12 col-12  bg-white">
                                  <div>
                                    <div className="info-detail pos-relative d-flex align-items-center w-100">
                                      <div className="image w-100">
                                        {data ? (
                                          <div className={styles["hotelDet"]}>
                                            <div className={styles["img-con"]}>
                                              {pack?.offered && (
                                                <div
                                                  className={styles["offered"]}
                                                >
                                                  <p>نرخ ویژه</p>
                                                </div>
                                              )}
                                              {pack?.thumbnail !== null ? (
                                                <img
                                                  src={pack?.thumbnail?.url}
                                                  alt=""
                                                  style={{
                                                    position: "relative",
                                                    overflow: "hidden",
                                                  }}
                                                />
                                              ) : (
                                                <img
                                                  src="../../../Images/noPicture.png"
                                                  alt=""
                                                  style={{
                                                    position: "relative",
                                                    overflow: "hidden",
                                                  }}
                                                  width={"290px"}
                                                  height={"180px"}
                                                />
                                              )}
                                            </div>

                                            <div className={"pb-1 pt-2"}>
                                              <div
                                                className={styles["details"]}
                                              >
                                                <div
                                                  className={styles["names"]}
                                                >
                                                  <div>
                                                    <div>
                                                      <div
                                                        className="star"
                                                        style={{
                                                          display: "flex",
                                                          marginBottom: "5px",
                                                        }}
                                                      >
                                                        <div className="d-flex align-items-center">
                                                          <div className="image d-flex align-items-center">
                                                            {(() => {
                                                              let stars = [];
                                                              for (
                                                                let i = 1;
                                                                i <=
                                                                parseInt(
                                                                  pack?.hotel_stars
                                                                );
                                                                i++
                                                              ) {
                                                                stars.push(
                                                                  <svg
                                                                    width="20px"
                                                                    height="20px"
                                                                    viewBox="0 0 24 24"
                                                                    fill="#F8CF15"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                  >
                                                                    <path
                                                                      d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                                                                      stroke="#F8CF15"
                                                                      strokeWidth="1"
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                    />
                                                                  </svg>
                                                                );
                                                              }
                                                              return stars;
                                                            })()}

                                                            <div
                                                              style={{
                                                                marginRight:
                                                                  "10px",
                                                                padding: "3px",
                                                                backgroundColor:
                                                                  "#e20000",
                                                                borderRadius:
                                                                  "10px",
                                                                width: "60px",
                                                                height: "20px",
                                                                color: "white",
                                                                display: "flex",
                                                                justifyContent:
                                                                  "center",
                                                                fontSize:
                                                                  "13px",
                                                              }}
                                                            >
                                                              {pack?.board_type}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                      }}
                                                      onClick={() =>
                                                        props.tour_type ===
                                                          "hotel" &&
                                                        handlePackageClick(pack)
                                                      }
                                                    >
                                                      <p
                                                        // href={`/hotels/${pack?.hotel_slug}`}
                                                        style={{
                                                          color: "#000",
                                                          fontWeight: "900",
                                                        }}
                                                      >
                                                        {pack?.hotel_nameEn}
                                                      </p>
                                                      <p
                                                        // href={`/hotels/${pack.hotel_slug}`}
                                                        style={{
                                                          color:
                                                            "rgb(101,101,101)",
                                                          fontSize: "13px",
                                                        }}
                                                      >
                                                        {pack?.hotel_name}
                                                      </p>
                                                    </div>
                                                  </div>

                                                  {/*</Link>*/}

                                                  <div
                                                    className={
                                                      styles["roomsDet"]
                                                    }
                                                  >
                                                    <div>
                                                      {
                                                        <div
                                                          className={
                                                            styles[
                                                              "rooms-title"
                                                            ]
                                                          }
                                                        >
                                                          <div
                                                            className={
                                                              styles["room-prc"]
                                                            }
                                                          >
                                                            <div
                                                              className={
                                                                styles[
                                                                  "room-title"
                                                                ]
                                                              }
                                                            >
                                                              <span
                                                                className={
                                                                  styles[""]
                                                                }
                                                              >

                                                                دو تخته (هرنفر){" "}
                                                              </span>
                                                            </div>
                                                            <div
                                                              className={
                                                                styles["room"]
                                                              }
                                                            >
                                                              <div className=" d-flex align-items-start ">
                                                                <div className=" w-100">
                                                                  {
                                                                    // getHotelRooms(pack)
                                                                    roomFinder1(
                                                                      pack.rooms,
                                                                      148
                                                                    )?.price &&   roomFinder1(
                                                                      pack.rooms,
                                                                      148
                                                                    ).available_room_count > 0 ? (
                                                                      <>
                                                                        <p
                                                                          className="font-size-16   m-0 price-color"
                                                                          style={{
                                                                            fontWeight:
                                                                              "600",
                                                                          }}
                                                                        >
                                                                          {moneyFormatrial(
                                                                            roomFinder1(
                                                                              pack.rooms,
                                                                              148
                                                                            )
                                                                              .price
                                                                          )}

                                                                          <span className="font-size-14 font-bold px-1  m-0 color-gray">
                                                                            تومان
                                                                          </span>
                                                                        </p>

                                                                        {/*<p className="px-2 font-size-13 m-0 text-center font-blue text-center"> {getcurrencyfa(currency) } </p>*/}
                                                                      </>
                                                                    ) : (
                                                                      <span className="font-bold font-size-13 font-bold color-gray">
                                                                        {" "}


                                                                        عدم
                                                                        موجودی
                                                                      </span>
                                                                    )
                                                                  }
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      }
                                                    </div>
                                                  </div>
                                                </div>

                                                <div
                                                  className={
                                                    styles["service-btn"]
                                                  }
                                                >
                                                  <div
                                                    className={
                                                      "d-flex gap-3 align-items-center justify-content-center"
                                                    }
                                                  >
                                                    {pack?.feature?.map(
                                                      (item, index) => (
                                                        <div
                                                          style={{
                                                            width:
                                                              "fit-content",
                                                            padding: "6px",
                                                            height: "30px",
                                                            backgroundColor:
                                                              "rgb(236,236,236)",
                                                            borderRadius:
                                                              "20px",
                                                          }}
                                                        >
                                                          <p
                                                            className={
                                                              "font-size-8 m-0 p-0"
                                                            }
                                                            style={{
                                                              fontSize: "11px",
                                                              color:
                                                                "white !important",
                                                              fontWeight: "900",
                                                            }}
                                                          >
                                                            {item}
                                                          </p>
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                  <div
                                                    className={
                                                      styles["btn-con"]
                                                    }
                                                  >
                                                    <button
                                                      className=""
                                                      onClick={() => {
                                                        setShow(true);
                                                        // posthog.capture("TourPackageHotelSelect")
                                                        // setPackData({tourId: pack.id});
                                                        // setSelectedHotel(pack)


                                                        foundRooms(pack.rooms);
                                                      }}
                                                    >
                                                      اتاق های دیگر
                                                    </button>
                                                    {
                                                      <button
                                                        className=""
                                                        style={{
                                                          fontWeight: "700",
                                                        }}
                                                        onClick={() => {
                                                          
                                                          if (
                                                            props.tour_type ===
                                                            "package"
                                                          ) {

                                                            setTargetHotel(pack)
                                                            foundRooms(pack.rooms);

                                                            setReqReserve(true);
                                                          } else {
                                                            // setIsReserve(true)
                                                            setSelectedHotel(
                                                              pack.id
                                                            );
                                                            handlePackageClick(
                                                              pack
                                                            );
                                                          }
                                                        }}
                                                      >
                                                        {+selectedHotel ===
                                                        +pack.id
                                                          ? "منتظر بمانید..."
                                                          : "رزرو"}
                                                      </button>
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <Loader />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))
                            .sort((a, b) => parseInt(a.star) - parseInt(b.star))
                            .reverse()
                            .sort((a, b) =>
                              a.prices?.twinRate
                                ? parseInt(a.prices.twinRate)
                                : parseInt(a.prices?.twin) - b.prices?.twinRate
                                ? parseInt(b.prices.twinRate)
                                : parseInt(b.prices?.twin)
                            )
                            .reverse()
                        ) : (
                          <Loader />
                        )}
                      </div>
                      {props.tour_type === "package" && (
                        <div className={styles["tourdesc"]}>
                          <div className={styles["service_document"]}>
                            {props.tourdata.documents && (
                              <div className={styles["con"]}>
                                <p>مدارک لازم</p>
                                <div className={styles["item"]}>
                                  <ul>
                                    {props.tourdata?.documents
                                      ?.split("\n")
                                      .map((item) => (
                                        <li>{item}</li>
                                      ))}
                                  </ul>

                                  <svg
                                    width="100px"
                                    height="100px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                      stroke="#cecece"
                                      strokeWidth="1.5"
                                    />
                                    <path
                                      d="M8 10H16"
                                      stroke="#cecece"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M8 14H13"
                                      stroke="#cecece"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}

                            {props.tourdata?.service && (
                              <div className={styles["con"]}>
                                <p>خدمات آژانس</p>
                                <div className={styles["item"]}>
                                  <ul>
                                    {props.tourdata?.service
                                      ?.split("\n")
                                      .map((item) => (
                                        <li>{item}</li>
                                      ))}
                                  </ul>
                                  <svg
                                    width="100px"
                                    height="100px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H14.5C17.5376 13 20 15.4624 20 18.5V21M8 21V18M16 21V18M11 9H7.5C6.67157 9 6 8.32843 6 7.5V6.5C6 5.16725 6.57938 3.96983 7.5 3.14585M18 8.00001V6.50001C18 5.16726 17.4206 3.96983 16.5 3.14585M20 7.5V6M4 7.5V6M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                                      stroke="#cecece"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.4"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                          {props.tourdata?.description && (
                            <div className={styles["servicescon"]}>
                              <p>توضیحات تکمیلی</p>
                              <div className={styles["item"]}>
                                <ul>
                                  {props.tourdata?.description
                                    ?.split("\n")
                                    .map((item) => (
                                      <li>{item}</li>
                                    ))}
                                </ul>

                                <div
                                  style={{
                                    alignSelf: "end",
                                    justifySelf: "end",
                                    height: "auto",
                                  }}
                                >
                                  <svg
                                    fill="#cecece"
                                    width="100px"
                                    height="100px"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M15,16H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM9,10h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm6,2H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4.71,3.29a1,1,0,0,0-.33-.21.92.92,0,0,0-.76,0,1,1,0,0,0-.33.21,1.15,1.15,0,0,0-.21.33,1,1,0,0,0,.21,1.09A1,1,0,0,0,19,17a1,1,0,0,0,.38-.08,1.15,1.15,0,0,0,.33-.21,1,1,0,0,0,.21-1.09A1.15,1.15,0,0,0,19.71,15.29ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,13.05,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3h8a1,1,0,0,0,0-2H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3v2a1,1,0,0,0,2,0V9S20,9,20,8.94ZM15,8a1,1,0,0,1-1-1V5.41L16.59,8Zm4,10a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,19,18Z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/*<div className={'isDesktop'}>*/}
                  {props.tourdata ? (
                    <div className={styles["tour_details_container"]}>
                      <div className={styles["tour_details"]}>
                        <div className="ps-2 ms-2 w-100">
                          {(props.tour_type === "package" ||
                            (props.tour_type === "hotel" &&
                              router.query.date &&
                              router.query.nights !== "null")) && (
                            <div
                              className={`isDesktop ${styles["tour_info"]} w-full`}
                            >
                              {
                                <div className="d-flex align-items-center justify-content-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 17.401 17.401"
                                  >
                                    <g
                                      id="Document_Align_Center_1"
                                      data-name="Document Align Center 1"
                                      transform="translate(1 1)"
                                    >
                                      <path
                                        id="Path_895"
                                        data-name="Path 895"
                                        d="M1,8.7a19.485,19.485,0,0,0,.323,4.079A4.335,4.335,0,0,0,2.4,15a4.336,4.336,0,0,0,2.22,1.078A19.488,19.488,0,0,0,8.7,16.4a19.488,19.488,0,0,0,4.079-.323A4.335,4.335,0,0,0,15,15a4.335,4.335,0,0,0,1.078-2.22A19.488,19.488,0,0,0,16.4,8.7a19.488,19.488,0,0,0-.323-4.079A4.336,4.336,0,0,0,15,2.4a4.335,4.335,0,0,0-2.22-1.078A19.485,19.485,0,0,0,8.7,1a19.485,19.485,0,0,0-4.079.323A4.335,4.335,0,0,0,2.4,2.4a4.335,4.335,0,0,0-1.078,2.22A19.485,19.485,0,0,0,1,8.7Z"
                                        transform="translate(-1 -1)"
                                        fill="none"
                                        stroke="#646564"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      />
                                      <path
                                        id="Path_896"
                                        data-name="Path 896"
                                        d="M10,7h2.8"
                                        transform="translate(-3.699 -2.8)"
                                        fill="none"
                                        stroke="#646564"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      />
                                      <path
                                        id="Path_897"
                                        data-name="Path 897"
                                        d="M7,12h7"
                                        transform="translate(-2.8 -4.299)"
                                        fill="none"
                                        stroke="#646564"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      />
                                      <path
                                        id="Path_898"
                                        data-name="Path 898"
                                        d="M10,17h2.8"
                                        transform="translate(-3.699 -5.799)"
                                        fill="none"
                                        stroke="#646564"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                      />
                                    </g>
                                  </svg>

                                  <p className={styles["title"]}>{`هتل های ${
                                    props.tour_type === "package"
                                      ? data?.title
                                      : props.all_data?.tour_info?.title
                                  }`}</p>
                                </div>
                              }

                              <hr className={"p-0 mt-2"} />

                              <div className={styles["date_time"]}>
                                <div>
                                  <div className={styles["checkin_checkout"]}>
                                    <p>تاریخ ورود به هتل:</p>
                                    <p>
                                      {" "}
                                      {MiladiToJalaliConvertor(
                                        props.tour_type === "package"
                                          ? data.checkin
                                          : props.all_data?.tour_info?.checkin
                                      )}
                                    </p>
                                  </div>
                                  <div className={styles["checkin_checkout"]}>
                                    <p>تاریخ خروج از هتل:</p>
                                    <p>
                                      {" "}
                                      {MiladiToJalaliConvertor(
                                        props.tour_type === "package"
                                          ? data.checkout
                                          : props.all_data?.tour_info?.checkout
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <div className={styles["night"]}>
                                  <p className="text-xs text-secondary-color font-black">
                                    {props.tour_type === "package"
                                      ? data.night_num
                                      : props.all_data?.tour_info
                                          ?.night_num}{" "}
                                    شب
                                  </p>
                                  <p className="text-xs text-secondary-color font-black">
                                    و
                                  </p>
                                  <p className="text-xs text-secondary-color font-black">
                                    {props.tour_type === "package"
                                      ? data.day_num
                                      : props.all_data?.tour_info?.day_num}{" "}
                                    روز
                                  </p>
                                </div>
                              </div>
                              {props.tour_type === "package" && <hr />}

                              {props.tour_type === "package" && (
                                <>
                                  <div
                                    className={"d-flex justify-content-between"}
                                  >
                                    <p className={"font-size-14"}>نام آژانس:</p>
                                    <p className={"font-size-15 font-bold"}>
                                      {data?.agency}
                                    </p>
                                  </div>

                                  <div
                                    className={
                                      "d-flex justify-content-center align-items-center gap-3 cursor-pointer"
                                    }
                                    style={{
                                      width: "100%",
                                      padding: "10px",
                                      border: "1px solid #e20000",
                                      borderRadius: "20px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      width={20}
                                      height={20}
                                      stroke="#e20000"
                                      className="size-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                      />
                                    </svg>

                                    <a
                                      href={`tel:${data.agency_tell}`}
                                      className={
                                        "p-0 m-0 font-bold cursor-pointer"
                                      }
                                    >
                                      {data.agency_tell}
                                    </a>
                                  </div>
                                </>
                              )}
                            </div>
                          )}

                          <div
                            className={`${styles["tour_info"]} ${
                              isOpenFilter && styles["filter_active"]
                            }`}
                          >
                            <div>
                              <p className={"p-0 m-0 mb-2 font-size-15"}>فیلترها</p>
                            </div>

                            <hr className={"p-0 mt-2 mb-2"} />

                            <div
                              style={{
                                border: "1px solid #cecece",
                                borderRadius: "10px",
                                height: "50px",
                                width: "100%",
                                padding: "2px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <input
                                placeholder="جستجو براساس نام هتل"
                                style={{
                                  width: "100%",
                                  // , height: '100%'
                                  border: "none",
                                  outline: "none",
                                  fontSize: "13px",
                                }}
                                onChange={(e) =>
                                  setFilter((prev) => ({
                                    ...prev,
                                    search_input: e.target.value,
                                  }))
                                }
                              />

                              <svg
                                width="25px"
                                height="25px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                                  stroke="#cecece"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </div>

                            <hr />
                            <div>
                              {/* <p className="m-0 p-0 font-size-13">
                                فیلتر براساس
                              </p> */}

                              <div className=" d-flex align-items-center gap-1 " >
                              <input
                               className={
                                  'checkbox'
                                }
                                  type="checkbox"
                                  value={filter.cheapest}
                                  checked={filter.cheapest}
                                  onChange={(e) => handleCheckbox(e, "cheapest")}
                                />
                                <label className="font-size-13">
                                  ارزان ترین
                                </label>

                              </div>
                              <div className=" d-flex align-items-center gap-1 " >
                              <input
                                   className={
                                  'checkbox'
                                }
                                  type="checkbox"
                                  value={filter.expense}
                                  checked={filter.expense}

                                  onChange={(e) =>
                                    handleCheckbox(e, "expense")
                                  }
                                />
                                <label  className="font-size-13">گران ترین</label>

                              </div>
                              <div className="d-flex align-items-center gap-1 " >
                              <input
                                    className={
                                  'checkbox'
                                }
                                  type="checkbox"
                                  value={filter.star}
                                  checked={filter.star}

                                  onChange={(e) => handleCheckbox(e, "star")}
                                />
                                <label  className="font-size-13">ستاره </label>

                              </div>
                              {/* <div
                                className="c-input col-xl-3 col-lg-3 col-sm-3 col-12 position-relative "
                                style={{
                                  width: "100%",
                                  height: "50px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "1px solid #cecece",
                                  borderRadius: "10px",
                                }}
                              >
                                <select
                                  name=""
                                  style={{
                                    outline: "none",
                                    border: "none",
                                    width: "100%",
                                    fontSize: "13px",
                                    // color:'red'
                                  }}
                                  id=""
                                  onChange={(e) =>
                                    setFilter((prev) => ({
                                      ...prev,
                                      sort_by: e.target.value,
                                    }))
                                  }
                                  value={filter.sort_by}
                                >
                                  <option value="" disabled={true}>
                                    فیلتر براساس....
                                  </option>
                                  <option value="0">ستاره</option>
                                  <option value="1"> قیمت</option>
                                  <option value="2"> ستاره + قیمت</option>
                                </select>
                              </div> */}
                            </div>

                            <hr />

                            <div>
                              <div
                                className={
                                  " d-flex gap-3 justify-content-center"
                                }
                              >
                                {props.tour_type === "package" && (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <button
                                      id="openWindowButton"
                                      className="pdfbtn"
                                      onClick={() => {
                                        if (isdownload === false) {
                                          downloadHandler();

                                          // console.log(`The user is browsing with ${browserName} version ${browserVersion}`)
                                        } else {
                                          return null;
                                        }
                                      }}
                                    >
                                      <>
                                        {isdownload === false ? (
                                          <>
                                            <svg
                                              height="24"
                                              viewBox="0 0 24 24"
                                              width="24"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="#fff"
                                            >
                                              <path
                                                d="M18,19 L18,17 C19.6568542,17 21,15.6568542 21,14 C21,12.3431458 19.6568542,11 18,11 C17.9686786,11.0001061 17.9686786,11.0001061 17.9374883,11.0006341 L17.0737589,11.0181765 L16.9309417,10.1661557 C16.5303438,7.77626335 14.4511274,6 12,6 C10.1923998,6 8.55429829,6.96642863 7.6664163,8.50398349 L7.39066076,8.98151234 L6.83965518,9.0031404 C4.69934052,9.08715198 3,10.8504451 3,13 C3,14.8638394 4.27477279,16.4299397 6,16.8739825 L6,18.9170416 C3.16228666,18.4409635 1,15.9729963 1,13 C1,9.95876977 3.26703071,7.43346119 6.21989093,7.05027488 C7.50901474,5.16507238 9.65343535,4 12,4 C15.1586186,4 17.8750012,6.1056212 18.7254431,9.0522437 C21.1430685,9.40362782 23,11.4849591 23,14 C23,16.7614237 20.7614237,19 18,19 Z M11,18.2532546 L11,12 L13,12 L13,18.2532546 L15.2928932,16.0092816 L16.7071068,17.3933221 L12,22 L7.29289322,17.3933221 L8.70710678,16.0092816 L11,18.2532546 Z"
                                                fill-rule="evenodd"
                                              />
                                            </svg>
                                            دانلود فایل PDF
                                          </>
                                        ) : (
                                          <div className="w-100 text-center d-flex justify-content-center align-items-center">
                                            لطفا صبر کنید...
                                          </div>
                                        )}
                                      </>
                                    </button>
                                  </div>
                                )}

                                <button
                                  onClick={() => setIsOpenFilter(false)}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  className="pdfbtn isMobile"
                                >
                                  جستجو هتل
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Shimmers4 />
                  )}
                  {/*</div>*/}
                </div>
              }
            </section>
          </div>

          {/* footer */}
        </div>
        <div className={styles["date_mobile"]}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              className={
                "w-100 d-flex justify-content-center align-items-center gap-2"
              }
            >
              <a
                href={`tel:${data.agency_tell}`}
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#e20000",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                تماس
              </a>
              <button
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#e20000",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
                onClick={() => setIsOpenFilter(!isOpenFilter)}
              >
                فیلتر
              </button>
            </div>
          </div>
        </div>
        {show && (
          <Modal
            isOpen={show}
            onRequestClose={() => setShow(false)}
            className={"Modal-rooms "}
            overlayClassName={"Overlay"}
            contentLabel="Example Modal"
          >
            <RequestTour rooms={selectedRooms} />
          </Modal>
        )}

        {
          <Modal
            isOpen={reqReserve}
            onRequestClose={() => setReqReserve(false)}
            className={"Modal-2"}
            overlayClassName={"Overlay"}
            contentLabel="Example Modal"
          >

            <RoomSelection rooms={selectedRooms} hotel={targetHotel} flight_id={TargetFlight?.id}/>
          </Modal>
        }
      </div>
    </>
  );
};

export default Packages;
{
  /* <PopUpWide opened={show} closePopUp={setShow}>
            <RequestTour rooms={selectedRooms} />
          </PopUpWide> */
}
