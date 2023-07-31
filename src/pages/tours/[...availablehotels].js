import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourSearchBox from "../../Components/NewTours/Components/TourSearchBox";
import styles from "../../../styles/AvailableHotels.module.scss";
import Image from "next/image";
import {
  setDestLoc,
  setFlightDate,
  setOrgLoc,
} from "../../Redux/newTours/Action";
import {
  jalaliDateReformater,
  jalaliToMiladiConvertor,
  numberWithCommas,
  startBuilder,
} from "../../Utils/newTour";
import NavHandler from "../../Components/share/NavHandler";
import { Loader } from "../../Utils/Loader";
import HotelsSideBarSearch from "../../Components/NewTours/Components/subComponents/HotelsSideBarSearch.component";

const AvFlight = dynamic(() =>
  import("../../Components/NewTours/AvailableFlightBasedonSelectedTour")
);

const availableHotels = () => {
  //router page
  const router = useRouter();
  //////
  const [routerDet, setRouterDet] = useState([]);
  const dispatch = useDispatch();
  /////////set date from url to state
  const [date, setDate] = useState();
  const [destination, setDestination] = useState();
  const [origin, setOrigin] = useState();
  const [night, setNight] = useState();
  const [jalaliDate, setJalaliDate] = useState();
  const [stars, setStars] = useState();
  /////////////////////////////
  const searchData = useSelector((state) => state.destandoriginCitiesTour);

  useEffect(() => {
    console.log("f", searchData);
  }, [searchData]);
  //state for getting av hotel from api
  const [hotels, setHotels] = useState([]);

  const hotelstarPicker = (hotelsArr) => {
    const stars = [];
    hotelsArr.map((hotel) => stars.push(hotel.stars));
    return stars;
  };

  const [selectedSrc, setSelectedSrc] = useState([]);
  const [selectedDest, setSelectedDest] = useState([]);

  // console.log(router);
  useEffect(() => {
    setRouterDet(router.query?.availablehotels?.length > 1);
    ///get date from url
    const newDate = router.query.stDate?.slice(0, 10);
    setJalaliDate(newDate);
    /////convert jalali to miladi
    const finalDate = jalaliToMiladiConvertor(newDate);
    setDate(finalDate);
    setDestination(router.query?.dest);
    setOrigin(router.query?.origin);
    setNight(router.query?.night);

    if (date && destination && origin && night) {
      axios
        .post("https://hotelobilit-api.iran.liara.run/api/v1/hotels/search", {
          date: date,
          destination: destination,
          keywords: null,
          orderBy: 1,
          origin: origin,
          stars: null,
          stayCount: night,
        })
        .then((res) => {
          setHotels(res?.data?.data);
          setStars(hotelstarPicker(res?.data?.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (destination && origin) {
      axios
        .post("https://hotelobilit-api.iran.liara.run/api/v1/cities", {
          hasHotel: 1,
          hasFlight: 0,
        })
        .then((res) => {
          const destLoc = res.data.data;
          const finddest = destLoc.find((o) => o.code === destination);
          dispatch(setDestLoc(finddest));
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post("https://hotelobilit-api.iran.liara.run/api/v1/cities", {
          hasHotel: 0,
          hasFlight: 1,
        })
        .then((res) => {
          const orgLoc = res.data.data;
          const findsrc = orgLoc.find((o) => o.code === origin);
          dispatch(setOrgLoc(findsrc));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    dispatch(
      setFlightDate({
        persianDate: newDate,
        miladiDate: finalDate,
      })
    );
  }, [router, destination, origin, date, night]);

  useEffect(() => {}, []);
  useEffect(() => {
    console.log("popsd", hotels);
  }, [hotels]);

  //////////////////width

  const [widthMobi, setWidthMobi] = useState(
    typeof window !== "undefined" && getWindowSize()
  );
  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }
  useEffect(() => {
    function handleWindowResize() {
      setWidthMobi(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className={styles["main-section"]}>
      <NavHandler />
      {router.query.availablehotels?.length === 1 ? (
        <div className={styles.hotels}>
          <div className={styles.searchContainer}>
            <TourSearchBox
              selectedDest={selectedDest}
              selectedSrc={selectedSrc}
              night={night}
            />
          </div>
          <div className={styles["p-available"]}>
            <HotelsSideBarSearch
              date={date}
              destination={destination}
              origin={origin}
              night={night}
              setHotels={(value) => setHotels(value)}
              stars={stars}
              hotels={hotels}
              widthMobi={widthMobi}
            />

            <div className={styles.content}>
              {hotels?.length === 0 ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                hotels?.map((hotel) => {
                  return (
                    <div className={styles.hotelContainer}>
                      <div className={styles.hotelDetail}>
                        {/* <Image src="" width={162} height={170}></Image> */}
                        <div className={styles.imageContainer}>
                          <Image
                            src={hotel.gallery[0].url}
                            width={500}
                            height={500}
                            alt="Picture of the hotel"
                          />
                        </div>
                        <div className={styles.hotelNameDetail}>
                          {hotel.is_domestic ? (
                            <div>
                              <h2 className={styles.faName}>{hotel.title}</h2>
                              <h2 className={styles.enName}>{hotel.titleEn}</h2>
                            </div>
                          ) : (
                            <div>
                              <h2 className={styles.faName}>{hotel.titleEn}</h2>
                              <h2 className={styles.enName}>{hotel.title}</h2>
                            </div>
                          )}

                          <div className={styles.pStar}>
                            {startBuilder(+hotel.stars)?.map((x) => {
                              return x;
                            })}
                          </div>
                          {/* <div className={styles.stars}>{hotel.stars}stars</div> */}
                          <div className={styles.services}>
                            <label htmlFor="">منطقه :</label>
                            <p>
                              {hotel.location ? hotel.location : "ثبت نشده"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.priceandbtnContainer}>
                        <p className={styles.priceTitle}>
                          قیمت برای هر نفر 6 شب از :
                        </p>
                        <div className={styles.priceParent}>
                          <strong className={styles.price}>
                            {numberWithCommas(hotel.totalRoomPrice)}
                          </strong>
                          <span>تومان</span>
                        </div>
                        <div className={styles.btnContainer}>
                          <button
                            onClick={() => {
                              const jalalurlReformat =
                                jalaliDateReformater(jalaliDate);

                              router.push(
                                `/tours/${origin}-${destination}/flight/${hotel?.slug}?origin=${origin}&dest=${destination}&stDate=${jalalurlReformat}&night=${night}`
                              );
                            }}
                          >
                            {" "}
                            انتخاب هتل و رزرو
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : (
        <AvFlight widthmobi={widthMobi} night={night} />
      )}
    </div>
  );
};

export default availableHotels;
