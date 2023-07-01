import dynamic from "next/dynamic";
import axios from "axios";
import moment from "moment-jalaali";
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
  /////////////////////////////

  //state for getting av hotel from api
  const [hotels, setHotels] = useState([]);

  const search = (e) => {
    if (e.key === "Enter") {
      axios
        .post("https://hotelobilit-api.iran.liara.run/api/v1/hotels/search", {
          date: date,
          destination: destination,
          keywords: searchInput,
          orderBy: 1,
          origin: origin,
          stars: null,
          stayCount: night,
        })
        .then((res) => {
          setHotels(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [selectedSrc, setSelectedSrc] = useState([]);
  const [selectedDest, setSelectedDest] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [check, setCheck] = useState("");
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
  }, [router, date, destination, origin, night]);

  const checkedClick = (checkValue, num) => {
    axios
      .post("https://hotelobilit-api.iran.liara.run/api/v1/hotels/search", {
        date: date,
        destination: destination,
        keywords: searchInput,
        orderBy: num,
        origin: origin,
        stars: null,
        stayCount: night,
      })
      .then((res) => {
        setHotels(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setCheck(checkValue);
  };

  return (
    <>
      {router.query.availablehotels?.length === 1 ? (
        <div className={styles.hotels}>
          <div className={styles.searchContainer}>
            <TourSearchBox
              selectedDest={selectedDest}
              selectedSrc={selectedSrc}
            />
          </div>

          <div className={styles["p-available"]}>
            <div className={styles.sidebar}>
              <div className={styles.hotelSearchInput}>
                <p>جستجوی نام هتل یا اقامتگاه</p>

                <input
                  type="text"
                  placeholder="نام هتل را وارد کنید"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => search(e)}
                />
              </div>
              <div className={styles.hotelSearchStars}>
                <p>ستاره های هتل</p>
                <select name="" id="">
                  <option value="1" selected>
                    همه
                  </option>
                  <option value="1">1 ستاره</option>
                  <option value="2">2 ستاره</option>
                  <option value="3">3 ستاره</option>
                  <option value="4">4 ستاره</option>
                  <option value="0">5 ستاره</option>
                </select>
              </div>
              <div className={styles.hotelSearchOrder}>
                <p>مرتب سازی براساس</p>
                <div>
                  <input
                    type="checkbox"
                    name="ارزان ترین"
                    id=""
                    onClick={() => checkedClick("cheap", 1)}
                    checked={check === "cheap" ? true : false}
                  />
                  <p htmlFor="">ارزان ترین</p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="گران ترین"
                    id=""
                    checked={check === "expensive" ? true : false}
                    onClick={() => checkedClick("expensive", 2)}
                  />
                  <p htmlFor="">گران ترین</p>
                </div>
              </div>
            </div>

            <div className={styles.content}>
              {hotels?.map((hotel) => {
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
                        <h2 className={styles.faName}>{hotel.title}</h2>
                        <h2 className={styles.enName}>{hotel.titleEn}</h2>
                        <div className={styles.pStar}>
                          {startBuilder(+hotel.stars)?.map((x) => {
                            return x;
                          })}
                        </div>
                        {/* <div className={styles.stars}>{hotel.stars}stars</div> */}
                        <div className={styles.services}>
                          <label htmlFor="">خدمات :</label>
                          <p>ثبت نشده</p>
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
                              `http://localhost:3008/newtour/${origin}-${destination}/flight/${hotel?.slug}?origin=${origin}&dest=${destination}&stDate=${jalalurlReformat}&night=${night}`
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
              })}
            </div>
          </div>
        </div>
      ) : (
        <AvFlight />
      )}
    </>
  );
};

export default availableHotels;
