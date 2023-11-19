import React, {useEffect, useRef, useState} from "react";
import styles from "../../../styles/newTour/AvailableFlightBasedonSelectedTour.module.scss";
import {useRouter} from "next/router";
import axios from "axios";
import {AnimatePresence, motion} from "framer-motion";
import {
  MiladiToJalaliConvertor,
  MiladiToJalaliConvertorDec,
  MiladiToJalaliConvertorInc,
  chdPrcGen,
  dateDiffChecker,
  extBedPrcGen,
  flightDateChecker,
  jalaliToMiladiConvertor,
  numberWithCommas,
  roomPrcGen,
  startBuilder,
  numberRounder,
  getRandomRounded,
  getCheapestRoom, getDayInPersian,
} from "../../Utils/newTour";
import Image from "next/image";
import PictureModal from "./Components/subComponents/PictureModal";
import {Err, ErrSuccess, NotifAlert} from "./Components/NotifAlert.component";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import Shimmers from "./Components/subComponents/Shimmers";
import Head from "next/head";
import HeadSeo from "../../sources/component/HeadSeo";
import AvailableFlightMobile from "./Components/AvailableFlightMobile";
import MapComponent from "../../sources/component/Map.component";
import PopUp from "./Components/subComponents/PopUp.component";
import PopUpWide from "./Components/subComponents/PopUpWide.component";
import MapPopUpComponent from "./Components/subComponents/MapPopUp.component";
import moment from "moment-jalaali";
import NewLoader from "./Components/subComponents/NewLoader";

const AvailableFlightBasedonSelectedTour = (props) => {
  const router = useRouter();
  const [hotel, setHotel] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectedRoom2, setSelectedRoom2] = useState([]);
  const [isOpen, setIsOpen] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [ismodal, setIsModal] = useState(null);
  const ref = useRef(null);
  const [showInMap, setShowInMap] = useState(false)


  const handleClickRef = () => {
    ref.current?.scrollIntoView({behavior: "smooth"});
  };

  const roomCounter1 = (roomTypeId) => {
    const room = selectedRoom?.filter(
        (room) => room?.room_type_id === roomTypeId
    );
    return room?.length;
  };

  ///count every selected room based on their type =>:دوتخته , سه تخته , ...........
  const roomCounter = (roomTypeId) => {
    const room = selectedRoom?.filter(
        (room) => room?.room_type_id === roomTypeId
    );
    return room.length > 0 ? room[0]?.passCount?.length : 0;
  };

  const minAvRoom = (rates) =>
      Math.min(
          ...rates.map((a) => {
            return a.available_room_count;
          })
      );

  const IncRoom1 = (flightId, room) => {
    let minAvRoom = Math.min(
        ...room.rates?.map((a) => {
          return a.available_room_count;
        })
    );

    if (minAvRoom > roomCounter1(room.room_type_id)) {
      setIsOpen(flightId);
      setSelectedRoom([
        ...selectedRoom,
        {
          id: Math.random() * 1000,
          room_type_id: room.room_type_id,
          room_id: room.id,
          room_type: room.room_type,
          Adl_capacity: room.Adl_capacity,
          extra_bed_count: 0,
          inf_count: 0,
          chd_count: 0,
          chd_capacity: room.chd_capacity,
          extra_bed_capacity: room.extra_bed_count,
          total_extra_count: room.total_extra_count,
        },
      ]);
    } else {
      // console.log("noooooooooooooo!");
      // setIsOpen(0);
      Err("تعداد اتاق انتخابی بیش از ظرفیت موجود نیست");
    }
  };

  useEffect(() => {
    console.log(selectedRoom);
  }, [selectedRoom]);

  ///decrease room => :دو تخته , سه تخته , ...........
  const decRoom1 = (roomTypeId) => {
    if (roomCounter(roomTypeId) === 0) {
      return null;
    } else {
      const removedRoom = [];
      const getRooms = selectedRoom.filter(
          (room) => room.room_type_id === roomTypeId
      );
      const finalRoom = getRooms.pop();
      removedRoom.push(finalRoom);
      const anoRooms = selectedRoom.filter(
          (selectroom) => removedRoom[0].id !== selectroom.id
      );
      setSelectedRoom([...anoRooms]);
    }

    // roomCounter(roomTypeId) ===
    if (selectedRoom.length <= 1) {
      setIsOpen(0);
    }
  };

  ////inc chd, inf,ext number
  const incDet1 = (room, type) => {
    debugger;
    if (type === "ext_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x?.id === room?.id) {
          if (x?.chd_count + x?.extra_bed_count >= x?.total_extra_count) {
            Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
            return x;
          } else {
            if (x.extra_bed_count < x.extra_bed_capacity) {
              return {
                ...x,
                extra_bed_count: x.extra_bed_count + 1,
              };
            } else {
              Err("تخت اضافه بیش از تعداد انتخاب شده موجود نیست");
              return x;
            }
          }
        } else {
          return x;
        }
      });

      setSelectedRoom(findRoom);
    } else if (type === "inf_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x?.id === room?.id) {
          if (x.inf_count < x.Adl_capacity) {
            return {
              ...x,
              inf_count: x.inf_count + 1,
            };
          } else {
            Err("گنجایش نوزاد بیش از تعداد انتخاب شده موجود نیست");
            return x;
          }
        } else {
          return x;
        }
      });

      setSelectedRoom(findRoom);
    } else if (type === "chd_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x?.id === room?.id) {
          if (x?.chd_count + x?.extra_bed_count >= x?.total_extra_count) {
            Err("به دلیل نبود ظرفیت امکان اضافه کردن وجود ندارد");
            return x;
          } else {
            if (x?.chd_count < x?.chd_capacity) {
              return {
                ...x,
                chd_count: x?.chd_count + 1,
              };
            } else {
              Err("گنجایش کودک بیش از تعداد انتخاب شده موجود نیست");
              return x;
            }
          }
        } else {
          return x;
        }
      });

      setSelectedRoom(findRoom);
    }
    // console.log(selectedRoom);
  };





  const[isHover,setIsHover]=useState({ticket:false,room:false})
  const onmouseEnter=(type)=>{
    if(type==='ticket'){
      setIsHover({
        ticket:true,rooms:false
      })
    }else if(type==='rooms') {
      setIsHover({
        ticket: false, rooms: true
      })
    }

  }


  const onmouseLeave=(type)=>{
    if(type==='ticket'){
      setIsHover({
        ticket:false,rooms:false
      })
    }else if(type==='rooms') {
      setIsHover({
        ticket: false, rooms: false
      })
    }
  }
  ////dec chd, inf,ext number
  const decDet1 = (id, type) => {
    if (type === "ext_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x?.id === id) {
          if (x.extra_bed_count > 0) {
            return {
              ...x,
              extra_bed_count: x.extra_bed_count - 1,
            };
          } else {
            return {
              ...x,
              extra_bed_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelectedRoom(findRoom);
    } else if (type === "inf_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x?.id === id) {
          if (x.inf_count) {
            return {
              ...x,
              inf_count: x.inf_count - 1,
            };
          } else {
            return {
              ...x,
              inf_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelectedRoom(findRoom);
    } else if (type === "chd_count") {
      const findRoom = selectedRoom.map((x) => {
        if (x?.id === id) {
          if (x?.chd_count) {
            return {
              ...x,
              chd_count: x?.chd_count - 1,
            };
          } else {
            return {
              ...x,
              chd_count: 0,
            };
          }
        } else {
          return x;
        }
      });
      setSelectedRoom(findRoom);
    }
    // console.log(selectedRoom);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///MOOOOOOOOOOOOOOOOOOOOOOOOBBBBBBBBBBBBBBBBBBIIIIIIIIIIIIIIILLLLLLLLLLLLEEEEEEEEEEEEEEEEEEEEEEEEEEEE/////////////////////
  ///increase room => :دوتخته , سه تخته , ...........

  // useEffect(() => {
  //   console.log(selectedRoom);
  // }, [selectedRoom]);


  ////inc chd, inf,ext number

  ///MOOOOOOOOOOOOOOOOOOOOOOOOBBBBBBBBBBBBBBBBBBIIIIIIIIIIIIIIILLLLLLLLLLLLEEEEEEEEEEEEEEEEEEEEEEEEEEEE/////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////remove room
  useEffect(() => {
    console.log(showInMap)
  }, [showInMap])
  const removeRoom = (id) => {
    const newSelectedRoom = selectedRoom.filter((room) => room.id !== id);
    setSelectedRoom(newSelectedRoom);
  };

  useEffect(() => {
    const hotelFnName = router?.query?.availablehotels;
    const hotelName =
        hotelFnName && hotelFnName.length > 2 ? hotelFnName[2] : null;
    if (hotelName) {
      // debugger
      axios
          .post(
              `https://hotelobilit-api.iran.liara.run/api/v1/hotels/search/${hotelName}`,
              {
                origin: router.query.origin,
                dest: router.query.dest,
                stayCount: router.query.night,
                date: jalaliToMiladiConvertor(router.query.stDate),
              }
          )
          .then((res) => {
            setHotel(res.data?.data);
            // console.log(res.data?.data);
          });
    }
  }, [router]);

  const reservePrc = (rooms, flight) => {
    let fiPrice;
    rooms.map((room) => {
      if (room.room_type_id === 148) {
        fiPrice = roomPrcGen(room, flight);
      }
    });
    if (fiPrice) {
      return fiPrice;
    } else {
      fiPrice = Math.min(
          rooms.map((room) => {
            return roomPrcGen(room, flight);
          })
      );
      return fiPrice;
    }
  };

  const roomsGen = (selectedRoom) => {
    const rooms = [];
    selectedRoom.map((room) => {
      rooms.push({
        adl_count: room.Adl_capacity,
        chd_count: room.chd_count,
        inf_count: room.inf_count,
        room_id: room.room_id,
        extra_count: room.extra_bed_count,
        count: 1,
      });
    });

    return rooms;
  };

  const picGen = (picsNum) => {
    const gallary = [];
    let number = picsNum >= 3 ? 3 : picsNum;
    let fiNum = props.widthmobi <= 868 ? 2 : number;

    for (let i = 1; i <= fiNum; i++) {
      gallary.push(
          <motion.div
              whileHover={{translateY: "-15px"}}
              onClick={() => {
                setIsModal(hotel?.gallery[i]?.url);
              }}
              layoutId={hotel?.gallery[i]?.url}
          >
            <motion.img src={hotel?.gallery[i]?.url} height={100} width={100}/>
          </motion.div>
      );
    }
    return gallary;
  };

  //f==flight//
  const tourReserve = (
      fCheckin,
      fCheckout,
      goneDate,
      arrivalDate,
      fId,
      hotelId
  ) => {
    let routerParam = router.query;
    let checkin = fCheckin
        ? MiladiToJalaliConvertorInc(goneDate)
        : MiladiToJalaliConvertor(goneDate);
    let checkout = fCheckout
        ? MiladiToJalaliConvertorDec(arrivalDate)
        : MiladiToJalaliConvertor(arrivalDate);
    let stayCount = routerParam.night;
    let rooms = [...roomsGen(selectedRoom)];


    if (selectedRoom.length > 0) {
      setIsLoading(true)
      axios
          .post(
              "https://hotelobilit-api.iran.liara.run/api/v2/reserves/checking",
              {
                checkin: jalaliToMiladiConvertor(checkin),
                checkout: jalaliToMiladiConvertor(checkout),
                hotel_id: hotelId,
                flight_id: fId,
                rooms,
              }
          )
          .then((res) => {
            // console.log(res.data)
            ErrSuccess("به صفحه تکمیل اطلاعات و رزرو منتقل می‌شوید");
            router.push(
                `/tour/reserve/${hotelId}/${fId}?checkin=${checkin}&checkout=${checkout}&rooms=${JSON.stringify(
                    rooms
                )}&ref_code=${res.data.data.ref_code}`
            );
          })
          .catch((err) => {
            setIsLoading(false)
            Err("این پرواز با این تعداد اتاق انتخابی موجودی ندارد");
          });
    } else {
      setIsLoading(false)
      Err("لطفا پرواز و اتاق مورد نظر خود راانتخاب کنید");
    }
  };

  const AllSelectedPassengerNumber = () => {
    // debugger
    let allPassCounts = [];

    selectedRoom.map((room) =>
        allPassCounts.push({
          Adl_capacity: room?.Adl_capacity,
          extra_bed_count: room.extra_bed_count,
          inf_count: room.inf_count,
          chd_count: room.chd_count
        })
    );

    let allpassvalue = [];
    allPassCounts.map((pass) => {
      let passvalue = Object.values(pass);
      allpassvalue.push(...passvalue);
    });

    return allpassvalue.reduce((accumulator, pass) => accumulator + pass, 0);
  };



  const Variants = {
    initial: {
      color: 'rgba(131, 131, 131, 0.78)',
      fill:'rgba(131, 131, 131, 0.78)'
    },
    animate: {
      color: '#000',
      fill: '#000',
      transition: { duration: 0.2 },
    },
    exit: { color: 'rgba(131, 131, 131, 0.78)', transition: { duration: 0.5 } },
  };
  return (
      <>
        <NotifAlert/>
        {ismodal && (
            <PictureModal
                url={ismodal}
                gallery={hotel?.gallery}
                setIsModal={() => setIsModal()}
            />
        )}

        <div className={styles["container"]}>
          <Head>
            {hotel.length === 0 ? (
                <title>همنواز | تور</title>
            ) : (
                <title> همنواز {`|  ${hotel?.title}`}</title>
            )}
          </Head>
          <Scrolltoprefresh/>
          <div className={styles["hotelDet_container"]}>
            {hotel?.gallery ? (
                <div className={styles["hotelDet"]}>
                  <div className={styles["right"]}>
                    <div className={styles["hotelDet-image"]}>
                      {hotel?.gallery && (
                          <Image
                              src={hotel?.gallery[0].url}
                              height={200}
                              width={300}
                          />
                      )}
                    </div>
                    <div className={styles["hotelDet-names"]}>
                      <div className={styles["hotelDet-names_star"]}>
                        {startBuilder(+hotel?.stars).map((x) => {
                          return x;
                        })}
                      </div>

                      <p className={styles["hotelDet-names_faName"]}>
                        {hotel.is_domestic ? hotel.title : hotel.titleEn}
                      </p>
                      <p className={styles["hotelDet-names_enName"]}>
                        {hotel.is_domestic ? hotel.titleEn : hotel.title}
                      </p>
                      <div className={styles["hotelDet-names_zoneservice"]}>
                        <label htmlFor="">خدمات:</label>
                        <p>ثبت نشده</p>
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "6px"}}>

                        <div className={styles["hotelDet-names_zoneservice"]}>
                          <label htmlFor="">منطقه:</label>
                          <p>{hotel?.location ? hotel?.location : "ثبت نشده"}</p>
                        </div>
                        <p style={{fontSize: "12px", color: "#e20000", margin: '0'}}
                           onClick={() => setShowInMap(true)}>(نمایش برروی نقشه)</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles["left"]}>
                    {hotel?.gallery && (
                        <div className={styles["image_container"]}>
                          <div className={styles["images"]}>
                            {picGen(hotel?.gallery.length - 1).map((pic) => {
                              return pic;
                            })}
                            <motion.div
                                className={styles["morePic"]}
                                onClick={() => {
                                  setIsModal(hotel?.gallery[0]?.url);
                                }}
                                layoutId={hotel?.gallery[0]?.url}
                            >
                              <div className={styles['dots-container']}>
                                <div className={styles["dots"]}>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                                <label> تصاویر بیشتر</label>
                              </div>
                              <Image
                                  src={hotel?.gallery[0].url}
                                  height={100}
                                  width={100}
                              />
                            </motion.div>
                          </div>
                          {/*{props.widthmobi > 868 && (*/}
                          {/*    // <div className={styles["imgbig_container"]}>*/}
                          {/*<Image*/}
                          {/*  className={styles["img-big"]}*/}
                          {/*  src={hotel?.gallery[1].url}*/}
                          {/*  layout="responsive"*/}
                          {/*  height={205}*/}
                          {/*  width={200}*/}
                          {/*/>*/}
                          {/*<MapComponent/>*/}
                          {/*// </div>*/}
                          {/*)}*/}
                        </div>
                    )}
                  </div>
                </div>
            ) : (
                <Shimmers/>
            )}
          </div>
          <div className={styles["subscription"]}>
            <p className={styles["p-title-page"]}>
              با بررسی زمان پرواز و قیمت اتاق ها تور خود را انتخاب کنید
            </p>
          </div>

          {hotel?.flights ? (
              hotel?.flights?.map((flight) => {
                return props.widthmobi > 868 ? (
                    dateDiffChecker(
                        flightDateChecker(flight).checkin,
                        flightDateChecker(flight).checkout,
                        props?.night
                    ) ? (
                        <div className={styles["ticket_container"]}>
                          <div className={styles["container"]}>
                            {isOpen === 0 ? null : isOpen === flight.id ? null : (
                                <motion.div
                                    className={styles["blur"]}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{ease: "easeOut", duration: 0.4}}
                                ></motion.div>
                            )}
                            <div className={styles["ticket"]}>
                              {/* title col1 */}
                              <div className={styles["ticket_titles"]}>
                                <div
                                    className={styles["ticket_titles_info"]}
                                    style={isOpen === flight.id ? {padding: 0} : null}

                                >
                                  <motion.svg  height="24" id="Layer_2" viewBox="0 0 100 100" width="24" variants={Variants} initial='initial'  animate={isHover.ticket ?'animate':'exit' } ><title/><path d="M86.8,50.11l-10.8-3V42a3,3,0,0,0-6,0v3.44L59,42.38V20a9,9,0,0,0-9-9,9,9,0,0,0-9,9V42.39l-11,3V42a3,3,0,0,0-6,0v5.11l-10.8,3A3,3,0,0,0,11,53V63a3,3,0,0,0,3.8,2.89L41,58.62V72.46l-1.47.41A9.05,9.05,0,0,0,33,81.53V86a3,3,0,0,0,3.82,2.88L50,85.12l13.18,3.76A2.86,2.86,0,0,0,64,89a3.07,3.07,0,0,0,1.81-.6A3,3,0,0,0,67,86V81.52a9,9,0,0,0-6.52-8.65L59,72.45V58.62l26.2,7.27A3,3,0,0,0,89,63V53A3,3,0,0,0,86.8,50.11Z"/></motion.svg>


                                  <motion.p variants={Variants} initial='initial'  animate={isHover.ticket ?'animate':'exit' }   style={{whiteSpace:'nowrap'}}>

                                    اطلاعات پرواز
                                  </motion.p>

                                </div>
                                <div className={styles["ticket_titles_info"]}>
                                  {/*<svg height="30" viewBox="0 0 512 512" width="30" ><title/><path d="M384,240H96V136a40.12,40.12,0,0,1,40-40H376a40.12,40.12,0,0,1,40,40V240Z"/><path d="M48,416V304a64.19,64.19,0,0,1,64-64H400a64.19,64.19,0,0,1,64,64V416" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M48,416v-8a24.07,24.07,0,0,1,24-24H440a24.07,24.07,0,0,1,24,24v8" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M112,240V224a32.09,32.09,0,0,1,32-32h80a32.09,32.09,0,0,1,32,32v16" /><path d="M256,240V224a32.09,32.09,0,0,1,32-32h80a32.09,32.09,0,0,1,32,32v16"/></svg>*/}
                                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><motion.path d="M6.75 4H17.25C18.7125 4 19.9084 5.1417 19.995 6.58248L20 6.75L20.0006 10.1037C21.0968 10.414 21.9147 11.3872 21.9937 12.5628L22 12.75V20.25C22 20.6642 21.6642 21 21.25 21C20.8703 21 20.5565 20.7178 20.5068 20.3518L20.5 20.25V18H3.5V20.25C3.5 20.6297 3.21785 20.9435 2.85177 20.9932L2.75 21C2.3703 21 2.05651 20.7178 2.00685 20.3518L2 20.25V12.75C2 11.4911 2.84596 10.4297 4.00044 10.1034L4 6.75C4 5.28747 5.1417 4.0916 6.58248 4.00502L6.75 4ZM19.25 11.5H4.75C4.10279 11.5 3.57047 11.9919 3.50645 12.6222L3.5 12.75V16.5H20.5V12.75C20.5 12.1028 20.0081 11.5705 19.3778 11.5065L19.25 11.5ZM17.25 5.5H6.75C6.10279 5.5 5.57047 5.99187 5.50645 6.62219L5.5 6.75V10H7C7 9.44772 7.44772 9 8 9H10C10.5128 9 10.9355 9.38604 10.9933 9.88338L11 10H13C13 9.44772 13.4477 9 14 9H16C16.5128 9 16.9355 9.38604 16.9933 9.88338L17 10H18.5V6.75C18.5 6.10279 18.0081 5.57047 17.3778 5.50645L17.25 5.5Z"  variants={Variants} initial='initial'  animate={isHover.rooms ?'animate':'exit' } /></svg>
                                  <motion.p variants={Variants} initial='initial'  animate={isHover.rooms ?'animate':'exit' }  style={{whiteSpace:'nowrap'}}>اطلاعات اتاق </motion.p>
                                </div>
                              </div>
                              {/* ticketdet col2 */}
                              <div className={styles["ticket_flight"]} >
                                <div className={styles["flightDet_container"]} onMouseEnter={()=>onmouseEnter('ticket')} onMouseLeave={()=>onmouseLeave('ticket')}>
                                  <div className={styles["flightDet"]}>
                                    <div className={styles["flightDet_title"]}>
                                      <p>پرواز رفت</p>
                                    </div>
                                    <div className={styles["flightDet_loc"]}>
                                      <p>
                                        {flight.origin_name} به{" "}
                                        {flight.destination_name}
                                      </p>
                                    </div>
                                    <div className={styles["flightDet_timedate"]}>
                                      {/*<span>ساعت :</span>*/}
                                      <span
                                          style={{
                                            color: '#e20000',
                                            fontSize: '17px'
                                          }}>{flight.time.slice(0, 5)}</span>
                                      <span>و</span>
                                      <span>
                             {getDayInPersian(moment(flight.date).format('dddd')) } {MiladiToJalaliConvertor(flight.date)}
                              </span>
                                    </div>
                                    <div className={styles["flightDet_hotelEnt"]}>
                                      <label htmlFor="">ورود به هتل :</label>
                                      <p>
                                        {flight.checkin_tomorrow
                                            ? MiladiToJalaliConvertorInc(flight.date)
                                            : MiladiToJalaliConvertor(flight.date)}
                                      </p>
                                    </div>
                                  </div>

                                  <div className={styles["flight_company"]}>
                                    <div className={styles["flight_company_logo"]}>
                                      <div className={styles["image_container"]}>
                                        <img src={flight?.airline_thumb?.url} alt=""/>
                                      </div>
                                      <p>{flight.airline_name}</p>
                                    </div>
                                    <div className={styles["flight_company_remaintour"]}>
                                      <p style={{whiteSpace: "nowrap"}}>
                                        تعداد موجودی پرواز :<span style={{
                                        color: '#e20000',
                                        fontWeight: '900',
                                        fontSize: '15px'
                                      }}>{flight.capacity}</span>
                                      </p>
                                      <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            padding: "0",
                                          }}
                                      >
                                        <div className={styles["dot"]}></div>
                                        <div className={styles["seprator"]}></div>
                                        <svg
                                            style={{transform: "rotate(270deg)"}}
                                            viewBox="0 0 24 24"
                                            fill="#e20000"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                        >
                                          <g>
                                            <path d="M0 0h24v24H0z" fill="none"/>
                                            <path
                                                d="M14 8.947L22 14v2l-8-2.526v5.36l3 1.666V22l-4.5-1L8 22v-1.5l3-1.667v-5.36L3 16v-2l8-5.053V3.5a1.5 1.5 0 0 1 3 0v5.447z"/>
                                          </g>
                                        </svg>
                                      </div>
                                      <p>
                                                                <span style={{
                                                                  color: '#e20000',
                                                                  fontWeight: '900',
                                                                  fontSize: '15px'
                                                                }}> {props?.night}</span> شب و{" "}
                                        <span style={{
                                          color: '#e20000',
                                          fontWeight: '900',
                                          fontSize: '15px'
                                        }}> {+props?.night + 1}</span>
                                        روز
                                      </p>
                                    </div>
                                    <div className={styles["flight_company_logo"]}>
                                      <div className={styles["image_container"]}>
                                        <img
                                            src={flight?.flight?.airline_thumb?.url}
                                            alt=""
                                        />
                                      </div>
                                      <p>{flight?.flight?.airline_name}</p>
                                    </div>
                                  </div>

                                  <div className={styles["flightDet"]}>
                                    <div className={styles["flightDet_title"]}>
                                      <p>پرواز برگشت</p>
                                    </div>
                                    <div className={styles["flightDet_loc"]}>
                                      <p>
                                        {flight?.flight?.origin_name} به{" "}
                                        {flight?.flight?.destination_name}
                                      </p>
                                    </div>
                                    <div className={styles["flightDet_timedate"]}>
                                      {/*<span>ساعت :</span>*/}
                                      <span
                                          style={{
                                            color: '#e20000',
                                            fontSize: '17px'
                                          }}>{flight?.flight?.time.slice(0, 5)}</span>
                                      <span>و</span>
                                      <span>
                                                   {getDayInPersian(moment(flight?.flight?.date).format('dddd')) } {MiladiToJalaliConvertor(flight?.flight?.date)}
                                                  </span>
                                    </div>
                                    <div className={styles["flightDet_hotelEnt"]}>
                                      <label htmlFor="">خروج از هتل:</label>
                                      <p>
                                        {" "}
                                        {flight.checkout_yesterday === true
                                            ? MiladiToJalaliConvertorDec(
                                                flight?.flight?.date
                                            )
                                            : MiladiToJalaliConvertor(
                                                flight?.flight?.date
                                            )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className={styles["roomDet_container"]}>
                                  {getCheapestRoom(hotel?.rooms, flight)?.map(
                                      (room) => {
                                        return (
                                            <div className={styles["roomDetcard"]} onMouseEnter={()=>onmouseEnter('rooms')} onMouseLeave={()=>onmouseLeave('rooms')}>
                                              <div
                                                  className={styles["roomDetcard_roomnum"]}
                                              >
                                                <label htmlFor=""
                                                       style={{whiteSpace: 'nowrap'}}>{room.room_type}</label>
                                                <div
                                                    className={
                                                      styles["roomDetcard_roomnum_indec"]
                                                    }
                                                >
                                                  <div
                                                      className={
                                                        minAvRoom(room.rates) <=
                                                        roomCounter1(room.room_type_id)
                                                            ? styles["dec-none"]
                                                            : styles["in"]
                                                      }
                                                      onClick={() => {
                                                        IncRoom1(flight.id, room);
                                                        handleClickRef();
                                                      }}
                                                  >
                                                    +
                                                  </div>
                                                  <span>
                                        {roomCounter1(room.room_type_id)}
                                      </span>
                                                  <div
                                                      className={
                                                        roomCounter1(room.room_type_id) === 0
                                                            ? styles["dec-none"]
                                                            : styles["dec"]
                                                      }
                                                      onClick={() => {
                                                        decRoom1(room.room_type_id);
                                                      }}
                                                  >
                                                    -
                                                  </div>
                                                </div>
                                              </div>

                                              <div
                                                  className={styles["roomDetcard_price"]}
                                                  style={{justifyContent: "center"}}
                                              >
                                                <p>
                                      <span style={{color: " #e20000"}}>
                                        {numberWithCommas(
                                            numberRounder(
                                                roomPrcGen(room, flight)
                                            )
                                        )}
                                      </span>
                                                  تومان
                                                </p>
                                              </div>
                                            </div>
                                        );
                                      }
                                  )}
                                </div>
                              </div>
                              {/* reserve col 3 */}
                              <div className={styles["ticket_reserve"]}>
                                <div className="d-flex flex-column align-items-center">
                                  <p className={styles["priceTitle"]}>
                                    قیمت برای هر نفر:
                                  </p>
                                  <div className={styles["ticket_reserve_price"]}>
                                    <p>
                              <span>
                                {numberWithCommas(
                                    numberRounder(
                                        reservePrc(hotel?.rooms, flight)
                                    )
                                )}
                              </span>
                                      تومان
                                    </p>
                                  </div>
                                </div>
                                <div className={styles["btn-container"]}>
                                  {selectedRoom.length === 0 ? (
                                      <small>
                                        لطفا اتاق مورد نظر خود را انتخاب کنید.
                                      </small>
                                  ) : null}
                                  <button
                                      onClick={() => {
                                        if(!isLoading){

                                          tourReserve(
                                              flight?.checkin_tomorrow,
                                              flight?.checkout_yesterday,
                                              flight?.date,
                                              flight?.flight?.date,
                                              flight.id,
                                              hotel.id
                                          );

                                        }
                                      }}
                                      className={`${
                                          selectedRoom.length === 0
                                              ? styles["ticket_reserve_btn"]
                                              : styles["ticket_reserve_btn_active"]
                                      }`}
                                  >
                                    {
                                      isLoading ?

                                          <span>لطفا منتطر بمانید....</span>:
                                          <span>
                                                        {`رزرو تور برای ${AllSelectedPassengerNumber()} رزرو`}

                                                        </span>
                                    }
                                  </button>
                                </div>
                              </div>
                              <div ref={ref}></div>
                            </div>
                          </div>
                          {flight.id === isOpen ? (
                              <AnimatePresence>
                                <motion.div
                                    initial={{height: 0}}
                                    animate={{height: "auto"}}
                                    transition={{
                                      type: "spring",
                                      stiffness: 100,
                                      duration: 0.5,
                                    }}
                                    className={styles["roomcountdet_roomnum"]}
                                >
                                  {selectedRoom.map((room) => {
                                    return (
                                        <div className={styles["roomcountDet_container"]}>
                                          <div className={styles["roomcountDet"]}>
                                            <div
                                                className={styles["roomcountDet_remove"]}
                                                onClick={() => {
                                                  if (selectedRoom.length === 1) {
                                                    removeRoom(room.id);
                                                    setIsOpen(0);
                                                  } else {
                                                    removeRoom(room.id);
                                                    setIsOpen(flight.id);
                                                  }
                                                }}
                                            >
                                              <svg
                                                  data-name="Layer 1"
                                                  height="150"
                                                  id="Layer_1"
                                                  viewBox="0 0 200 200"
                                                  width="150"
                                                  xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <title/>
                                                <path
                                                    fill="#e20000"
                                                    d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"
                                                />
                                                <path
                                                    fill="#e20000"
                                                    d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"
                                                />
                                              </svg>
                                            </div>
                                            <div className={styles["roomcountDet_name"]}>
                                              <p>{room?.room_type}</p>
                                            </div>
                                            <div
                                                className={styles["roomcountDet_AdlCount"]}
                                            >
                                              <p>تعداد بزرگسال</p>
                                              <p>{room?.Adl_capacity}</p>
                                            </div>
                                            {room.extra_bed_capacity > 0 &&
                                                <div
                                                    className={`${
                                                        styles["roomcountDet_bedcount"]
                                                    } ${
                                                        styles[
                                                            room?.extra_bed_count > 0
                                                                ? "borderActive"
                                                                : "bordernoneActive"
                                                            ]
                                                    }`}
                                                >
                                                  <p className={styles["bedtype"]}>
                                                    تعداد تخت اضافه
                                                  </p>
                                                  <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(
                                                        numberRounder(
                                                            extBedPrcGen(
                                                                hotel?.rooms,
                                                                flight,
                                                                room?.room_type_id
                                                            )
                                                        )
                                                    )}{" "}
                                                    تومان
                                                  </p>

                                                  <div
                                                      className={
                                                        styles["roomcountDet_bedcount_count"]
                                                      }
                                                  >
                                                    <div
                                                        className={
                                                          styles[
                                                              room.extra_bed_count >=
                                                              room?.extra_bed_capacity
                                                                  ? "dis_decin"
                                                                  : "decin"
                                                              ]
                                                        }
                                                        onClick={() => {
                                                          incDet1(room, "ext_count");
                                                        }}
                                                    >
                                                      +
                                                    </div>
                                                    <span>{room?.extra_bed_count}</span>
                                                    <div
                                                        className={
                                                          styles[
                                                              room?.extra_bed_count === 0
                                                                  ? "dis_decin"
                                                                  : "decin"
                                                              ]
                                                        }
                                                        onClick={() =>
                                                            decDet1(room?.id, "ext_count")
                                                        }
                                                    >
                                                      -
                                                    </div>
                                                  </div>
                                                </div>
                                            }


                                            {room.chd_capacity > 0 &&

                                                <div
                                                    className={`${
                                                        styles["roomcountDet_bedcount"]
                                                    } ${
                                                        styles[
                                                            room?.chd_count > 0
                                                                ? "borderActive"
                                                                : "bordernoneActive"
                                                            ]
                                                    }`}
                                                >
                                                  <p className={styles["bedtype"]}>
                                                    تعداد کودک
                                                  </p>
                                                  <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(
                                                        numberRounder(
                                                            chdPrcGen(
                                                                hotel?.rooms,
                                                                flight,
                                                                room?.room_type_id
                                                            )
                                                        )
                                                    )}{" "}
                                                    تومان
                                                  </p>
                                                  <div
                                                      className={
                                                        styles["roomcountDet_bedcount_count"]
                                                      }
                                                  >
                                                    <div
                                                        className={
                                                          styles[
                                                              room?.chd_count >= room?.chd_capacity
                                                                  ? "dis_decin"
                                                                  : "decin"
                                                              ]
                                                        }
                                                        onClick={() => incDet1(room, "chd_count")}
                                                    >
                                                      +
                                                    </div>
                                                    <span>{room?.chd_count}</span>
                                                    <div
                                                        className={
                                                          styles[
                                                              room?.chd_count === 0
                                                                  ? "dis_decin"
                                                                  : "decin"
                                                              ]
                                                        }
                                                        onClick={() =>
                                                            decDet1(room?.id, "chd_count")
                                                        }
                                                    >
                                                      -
                                                    </div>
                                                  </div>
                                                </div>
                                            }

                                            {room.Adl_capacity > 0 &&

                                                <div
                                                    className={`${
                                                        styles["roomcountDet_bedcount"]
                                                    } ${
                                                        styles[
                                                            room?.inf_count > 0
                                                                ? "borderActive"
                                                                : "bordernoneActive"
                                                            ]
                                                    }`}
                                                >
                                                  <p className={styles["bedtype"]}>
                                                    تعداد نوزاد
                                                  </p>
                                                  <p className={styles["bedtypeprc"]}>
                                                    {numberWithCommas(
                                                        numberRounder(flight.inf_price)
                                                    )}{" "}
                                                    تومان
                                                  </p>
                                                  <div
                                                      className={
                                                        styles["roomcountDet_bedcount_count"]
                                                      }
                                                  >
                                                    <div
                                                        className={
                                                          styles[
                                                              room?.inf_count >= room?.Adl_capacity
                                                                  ? "dis_decin"
                                                                  : "decin"
                                                              ]
                                                        }
                                                        onClick={() => incDet1(room, "inf_count")}
                                                    >
                                                      +
                                                    </div>
                                                    <span>{room?.inf_count}</span>
                                                    <div
                                                        className={
                                                          styles[
                                                              room?.inf_count === 0
                                                                  ? "dis_decin"
                                                                  : "decin"
                                                              ]
                                                        }
                                                        onClick={() =>
                                                            decDet1(room?.id, "inf_count")
                                                        }
                                                    >
                                                      -
                                                    </div>
                                                  </div>
                                                </div>
                                            }
                                          </div>
                                        </div>
                                    );
                                  })}
                                </motion.div>
                              </AnimatePresence>
                          ) : null}
                        </div>
                    ) : null
                ) : dateDiffChecker(
                    flightDateChecker(flight)?.checkin,
                    flightDateChecker(flight)?.checkout,
                    props?.night
                ) ? (
                    <AvailableFlightMobile
                        isOpen={isOpen}
                        flight={flight}
                        night={props?.night}
                        hotel={hotel}
                        selectedRoom={selectedRoom}
                        setSelectedRoom={(val) => setSelectedRoom(val)}
                        setIsOpen={val => setIsOpen(val)}
                        isLoading={isLoading}
                        setIsLoading={(val)=>setIsLoading(val)}
                    />
                ) : null;
              })
          ) : (
              <Shimmers/>
          )}
        </div>

        {
            showInMap && <MapPopUpComponent setShowInMap={(val) => setShowInMap(val)}/>
        }

      </>
  );
};

export default AvailableFlightBasedonSelectedTour;