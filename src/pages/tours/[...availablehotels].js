import dynamic from "next/dynamic";
import axios from "axios";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TourSearchBox from "../../Components/NewTours/Components/TourSearchBox";
import styles from "../../../styles/AvailableHotels.module.scss";
import Image from "next/image";
import {setDestLoc, setFlightDate, setOrgLoc,} from "../../Redux/newTours/Action";
import {jalaliDateReformater, jalaliToMiladiConvertor, numberWithCommas, startBuilder,} from "../../Utils/newTour";
import NavHandler from "../../Components/share/NavHandler";
import {Loader} from "../../Utils/Loader";
import HotelsSideBarSearch from "../../Components/NewTours/Components/subComponents/HotelsSideBarSearch.component";
import {motion} from 'framer-motion'
import Footer from "../../sources/component/Footer.component";

const AvFlight = dynamic(() =>
    import("../../Components/NewTours/AvailableFlightBasedonSelectedTour")
);

const availableHotels = () => {
  //router page
  const router = useRouter();

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


  const [showFilter, setShowFilter] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  return (
      <div className={styles["main-section"]}>

        <NavHandler />
        {router.query.availablehotels?.length === 1 ? (
            <div className={styles.hotels}>
              {widthMobi<868&&

                  <div  className={styles.menubarcontainer} >
                <div style={{}} className={styles.menubar}>
                 <div className={styles.menubarItem}  onClick={()=> {
                     setShowSearchBox(!showSearchBox)

                 }}>
                     <svg  id="Glyph" version="1.1" viewBox="0 0 32 32" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" ><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>

                  <p>جستجو</p>
                 </div>

                    <div className={styles.menubarItem} onClick={()=> {
                        router.push('/tours')
                    }}>
                       <svg baseProfile="tiny" height="20px" id="Layer_1" version="1.2" viewBox="0 0 24 24" width="20px"  xmlns="http://www.w3.org/2000/svg" ><path d="M12,3c0,0-6.186,5.34-9.643,8.232C2.154,11.416,2,11.684,2,12c0,0.553,0.447,1,1,1h2v7c0,0.553,0.447,1,1,1h3  c0.553,0,1-0.448,1-1v-4h4v4c0,0.552,0.447,1,1,1h3c0.553,0,1-0.447,1-1v-7h2c0.553,0,1-0.447,1-1c0-0.316-0.154-0.584-0.383-0.768  C18.184,8.34,12,3,12,3z"/></svg>
                          <p >خانه</p>
                    </div>

                    <div className={styles.menubarItem} onClick={()=> {
                        setShowFilter(!showFilter)
                        console.log(showFilter)
                    }}>
                       <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M0 0h24v24H0z" fill="none" width="16px" height="16px"/><path d="M10 14L4 5V3h16v2l-6 9v6l-4 2z"/></g></svg>
                          <p >فیلتر</p>
                    </div>
                </div>
              </div>}

              {widthMobi< 868 && showSearchBox?
                  <div className={styles['searchboxContainer']}>
                    <div className={styles.searchContainer}>
                        <div>

                      <div className={styles['closeBtn']} onClick={()=>setShowSearchBox(!showSearchBox)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 30 30" fill="#e20000">
                          <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                      </svg></div>
                      <TourSearchBox
                          selectedDest={selectedDest}
                          selectedSrc={selectedSrc}
                          night={night}
                      />
                        </div>
                    </div>
                  </div>
                  : widthMobi>868?
                      <div className={styles.searchContainer}>
                        <TourSearchBox
                            selectedDest={selectedDest}
                            selectedSrc={selectedSrc}
                            night={night}
                        />
                      </div>:null}


              <div className={styles["p-available"]}>



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
                                        <h2 className={styles.faName}>{hotel?.title}</h2>
                                        <h2 className={styles.enName}>{hotel?.titleEn}</h2>
                                      </div>
                                  ) : (
                                      <div>
                                        <h2 className={styles.faName}>{hotel?.titleEn}</h2>
                                        <h2 className={styles.enName}>{hotel?.title}</h2>
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
                                      {hotel?.location ? hotel?.location : "ثبت نشده"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className={styles.priceandbtnContainer}>
                                <p className={styles.priceTitle}>
                                  {`قیمت برای هر نفر ${night} شب از :`}
                                </p>
                                <div className={styles.priceParent}>
                                  <strong className={styles.price}>
                                    {numberWithCommas(hotel?.totalRoomPrice)}
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
                  {showFilter && widthMobi<868?

                      <HotelsSideBarSearch
                          date={date}
                          destination={destination}
                          origin={origin}
                          night={night}
                          setHotels={(value) => setHotels(value)}
                          stars={stars}
                          hotels={hotels}
                          widthMobi={widthMobi}
                          setShowFilter={(value)=>setShowFilter(value)}
                          showFilter={showFilter}
                      />

                      : widthMobi>868?
                          <HotelsSideBarSearch
                              date={date}
                              destination={destination}
                              origin={origin}
                              night={night}
                              setHotels={(value) => setHotels(value)}
                              stars={stars}
                              hotels={hotels}
                              widthMobi={widthMobi}
                              setShowFilter={(value)=>setShowFilter(value)}
                              showFilter={showFilter}
                          />:null
                  }
              </div>
            </div>
        ) : (
            <AvFlight widthmobi={widthMobi} night={night} />
        )}

          <Footer/>
      </div>
  );
};

export default availableHotels;
