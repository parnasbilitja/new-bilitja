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
import { jalaliToMiladiConvertor, numberWithCommas } from "../../Utils/newTour";

const availableHotels = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [destination, setDestination] = useState();
  const [origin, setOrigin] = useState();
  const [night, setNight] = useState();
  const [hotels, setHotels] = useState([]);

  const selectedDestAndOrg = useSelector(
    (state) => state.destandoriginCitiesTour
  );
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
    const newDate = router.query.stDate?.slice(0, 10);
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

    //https://hotelobilit-api.iran.liara.run/api/v1/cities/getDates/THR/AYT
    dispatch(
      setFlightDate({
        persianDate: newDate,
        miladiDate: finalDate,
      })
    );
    // const fi = src.filter((s) => s.code === origin);
    // console.log("hgj", fi);
  }, [router, date, destination, origin, night]);

  useEffect(() => {
    if (selectedDest && selectedSrc) {
      console.log("hsgdfjas", selectedDest, selectedSrc);
    }
  }, [selectedDest]);

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
    <div className={styles.hotels}>
      <div className={styles.searchContainer}>
        <TourSearchBox selectedDest={selectedDest} selectedSrc={selectedSrc} />
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Filled"
                        viewBox="0 0 24 24"
                        width="17"
                        height="17"
                      >
                        <path
                          fill="#edb143"
                          d="M1.327,12.4,4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6a3.227,3.227,0,0,0-1.9-5.832H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832Z"
                        />
                      </svg>
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
                    <button> انتخاب هتل و رزرو</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default availableHotels;
