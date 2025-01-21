import styles from "../../../styles/FlightListTour.module.scss";
import React, { useEffect, useState } from "react";
import {
  getDayInPersian,
  MiladiToJalaliConvertor,
  numberWithCommas,
  timeFixer,
} from "../../Utils/newTour";
import { motion } from "framer-motion";
import Modal from "react-modal";
import PackageReserve from "../../Components/modal/PackageReserve";
import moment from "moment-jalaali";
import AvailableFlightMobile from "../../Components/NewTours/Components/AvailableFlightMobile";

const FlightListTour = (props) => {
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [isFilter_mobile, setISFilter_nobile] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [airlines, setAirlines] = useState({
    departure: [],
    return: [],
  });
  // const [flightNumber,setAirlines]=useState({departure:[],return:[]})
  const [filter, setFilters] = useState({
    airline: {
      departure: "",
      return: "",
    },
    flight_number: {
      departure: "",
      return: "",
    },
  });

  const [flights, setFlights] = useState(
    props?.default_hotel[0]?.related_flights
  );

  function removeDuplicatesByName(arr) {
    const seen = new Map();
    return arr.filter((obj) => {
      const objName = obj.name;
      if (!seen.has(objName)) {
        seen.set(objName, true);
        return true;
      }
      return false;
    });
  }

  const getAirlines = (way) => {
    let airlines = props?.default_hotel[0]?.related_flights?.map((flight) => ({
      name: flight[way].airline,
      thumb: flight[way].airline_thumb,
    }));
    airlines = removeDuplicatesByName(airlines);
    return airlines;
  };
  useEffect(() => {
    setAirlines({
      departure: getAirlines("departure_flight"),
      return: getAirlines("return_flight"),
    });
  }, [props?.default_hotel[0]?.related_flights]);

  // useEffect(()=>{
  //     console.log(SelectedAirlines)
  // },[SelectedAirlines])

  const compositionFilter = () => {
    let filteredData = [...flight_list_sort()];

    // Filter by airline names
    if (filter.airline.departure || filter.airline.return) {
      filteredData = filteredData.filter(
        (data) =>
          (!filter.airline.departure ||
            data?.departure_flight?.airline === filter.airline.departure) &&
          (!filter.airline.return ||
            data.return_flight?.airline === filter.airline.return)
      );
    }

    // Filter by flight numbers
    if (filter.flight_number) {
      // const [departureFn, returnFn] = this.compositionListObj.flight_number.split('-');

      filteredData = filteredData.filter((data) => {
        if (filter.flight_number.departure && filter.flight_number.return) {
          return (
            +data.departure_flight?.flight_number.includes(
              +filter.flight_number.departure
            ) &&
            +data.return_flight?.flight_number.includes(
              +filter.flight_number.return
            )
          );
        } else if (filter.flight_number.departure) {
          return +data.departure_flight?.flight_number.includes(
            +filter.flight_number.departure
          );
        } else if (filter.flight_number.return) {
          return +data.return_flight?.flight_number.includes(
            +filter.flight_number.return
          );
        }
        return true;
      });
    }

    setFlights(filteredData);
    // return  filteredData;
  };

  useEffect(() => {
    compositionFilter();
  }, [filter]);

  const rooms_flightBase_finder = (flight_id, roomId) => {
    let found_room = props.default_hotel[0]?.rooms.filter(
      (room) => +room.flight_id === +flight_id && +room.room_type_id === +roomId
    );

    return found_room;
  };

  const flight_list_sort = () => {
    let room148 = props.default_hotel[0].rooms.filter(
      (room) => +room?.room_type_id === 148
    );

    let newFlight = props?.default_hotel[0]?.related_flights.map((flight) => {
      // Iterate over room148 to find a matching room and update flight
      room148.forEach((room) => {
        if (flight.id === room.flight_id) {
          flight.room_prc = room.price;
        }
      });
      return flight; // Ensure the updated flight object is returned
    });

    let cheapest148room = newFlight.sort((a, b) => +a.room_prc - b.room_prc);

    return cheapest148room;
  };
  const rooms_flightBase_finder2 = (flight_id) => {
    let rooms = [];

    let found_room = props.default_hotel[0]?.rooms.filter(
      (room) => +room.flight_id === +flight_id
    );

    let cheapest148rooms = found_room
      .filter((room) => +room.room_type_id === 148)
      .sort((a, b) => +a.price - b.price);
    let OtherRooms = found_room.filter(
      (room) =>
        +room.room_type_id !== 148 &&
        +room.package_id === +cheapest148rooms[0]?.package_id && +room.tour_id === +cheapest148rooms[0]?.tour_id
    );

    rooms = [cheapest148rooms[0], ...OtherRooms];

    console.log(rooms);
    

    return rooms;
  };

  useEffect(() => {
    setFlights(flight_list_sort());
  }, [props?.default_hotel[0]?.related_flights]);

  return (
    <>
      <div className={styles["flights"]}>
        <div
          className={`${styles["filterbox_container"]} ${
            isFilter_mobile && styles["filter_open"]
          }`}
        >
          <div className={styles["filter_box"]}>
            <div className={styles["flight_title"]}>

            <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  stroke="#e20000"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
                <p>فیلتر پرواز</p>
              </div>

            <div
                              className="isDesktop"

              >
              <button
              className={styles['remove-btn']}
                onClick={() => {
                  setFilters({
                    airline: { departure: "", return: "" },
                    flight_number: { departure: "", return: "" },
                  });
                }}
              >
                حذف فیلتر
              </button>

              </div>
            </div>
         


         

              <svg
                className="isMobile"
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="#e20000"
                viewBox="0 0 24 24"
              >
                <path d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>

            <div className={styles["filter_item"]}>
              <div className={styles["title"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                  width={15}
                  height={15}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>

                <p className={`${styles["title"]} font-bold-iransanse`}>
                  {" "}
                  ایرلاین های رقت
                </p>
              </div>
              <div className={`${styles["airline_list"]}`}>
                {airlines.departure.map((airline) => (
                  <div
                    className={`${styles["airline_item"]} `}
                    onClick={() => {
                      
                      // setFilters(prev => ({...prev, airline: {departure: airline.name, ...prev.airline}}))
                      setFilters((prev) => ({
                        ...prev,
                        airline: {
                          ...prev.airline,
                          departure: airline.name,
                        },
                      }));

                      // compositionFilter()
                    }}
                  >
                    <input
                      className={"radio"}
                      type="checkbox"
                      // value={filter.expense}
                      checked={filter.airline.departure === airline.name}
                    />
                    {/* <input
                      type="radio"
                      checked={filter.airline.departure === airline.name}
                    /> */}

                    <div className={styles["img_container"]}>
                      <img
                        src={airline.thumb.url}
                        alt={airline.name}
                        width={25}
                        height={25}
                      />
                    </div>

                    <p className="text-xs text-third-color">{airline.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles["filter_item"]}>
              <div className={styles["title"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                  width={15}
                  height={15}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>

                <p className={`${styles["title"]} font-bold-iransanse`}>
                  {" "}
                  ایرلاین های برگشت
                </p>
              </div>
              <div className={styles["airline_list"]}>
                {airlines.return.map((airline) => (
                  <div
                    className={`${styles["airline_item"]} `}
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        airline: {
                          ...prev.airline,
                          return: airline.name,
                        },
                      }));
                    }}
                  >
                    <input
                      className={"radio"}
                      type="checkbox"
                      // value={filter.expense}
                      checked={filter.airline.return === airline.name}
                    />
                    <div>
                      <img
                        src={airline.thumb.url}
                        alt={airline.name}
                        width={25}
                        height={25}
                      />
                    </div>

                    <p className="text-xs text-third-color">{airline.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles["filter_item"]}>
              <div className={styles["title"]} style={{ marginBottom: "15px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                  width={15}
                  height={15}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>

                <p className={`${styles["title"]} font-bold-iransanse`}>
                  {" "}
                  شماره پرواز
                </p>
              </div>
              <div className={styles["flight_number"]}>
                <input
                  type="text"
                  placeholder={"شماره پرواز رفت"}
                  onChange={(e) => {
                    

                    // console.log(e.target.value)
                    setFilters((prev) => ({
                      ...prev,
                      flight_number: {
                        ...prev.flight_number,
                        departure: e.target.value,
                      },
                    }));
                  }}
                />
                <input
                  type="text"
                  placeholder={"شماره پرواز برگشت"}
                  onChange={(e) => {
                    

                    // console.log(e.target.value)
                    setFilters((prev) => ({
                      ...prev,
                      flight_number: {
                        ...prev.flight_number,
                        return: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>

            <div
              className={"isMobile"}
              style={{ justifySelf: "flex-end", marginTop: "50px" }}
            >
              <div
                className={"d-flex justify-content-center gap-2"}
                onClick={() => {
                  setISFilter_nobile(false);
                }}
              >
                <button
                  style={{
                    width: "130px",
                    height: "40px",
                    backgroundColor: "#e20000",
                    borderRadius: "10px",
                    color: "white",
                  }}
                >
                  جستجو
                </button>
                <button
                  style={{
                    width: "130px",
                    height: "40px",
                    backgroundColor: "#e20000",
                    borderRadius: "10px",
                    color: "white",
                  }}
                  onClick={() => {
                    setFilters({
                      airline: {
                        departure: "",
                        return: "",
                      },
                      flight_number: {
                        departure: "",
                        return: "",
                      },
                    });

                    setISFilter_nobile(false);
                  }}
                >
                  حذف فیلتر
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["flight_container"]}>
          <div className={styles["flight_title"]}>
            <div className={"d-flex align-items-center gap-1"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
                width={20}
                height={20}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>

              <p className={"font-size-13 text-nowrap"}>
                انتخاب پرواز هاي قابل ارائه با اين تور{" "}
              </p>
            </div>

            <div className={"isMobile"}>
              <button
                style={{
                  width: "100px",
                  height: "30px",
                  backgroundColor: "#e20000",
                  borderRadius: "10px",
                  color: "white",
                }}
                onClick={() => {
                  setISFilter_nobile(true);
                }}
              >
                فیلتر پرواز
              </button>
            </div>
          </div>
          <div className={"isDesktop"}>
            <div className={styles["flight_list"]}>
              {flights?.map((flight) => {
                return (
                  <motion.div
                    className={styles["flightDet_container"]}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setSelectedRoom(rooms_flightBase_finder2(flight.id));
                      setIsOpen(true);
                      setSelectedFlight(flight.id);
                    }}
                  >
                    <div className={styles["flightDet"]}>
                      <div className={styles["flightDet_loc"]}>
                        <p>
                          {flight?.departure_flight?.origin} به{" "}
                          {flight?.departure_flight?.destination}
                        </p>
                      </div>
                      <div className={styles["flightDet_timedate"]}>
                        <span>
                          {MiladiToJalaliConvertor(
                            flight?.departure_flight.date
                          )}{" "}
                          -{" "}
                          {getDayInPersian(
                            moment(flight?.departure_flight.date).format("dddd")
                          )}
                        </span>

                        <span>|</span>
                        <span
                          style={{
                            fontWeight: "900",
                          }}
                        >
                          {timeFixer(flight?.departure_flight?.time)}
                        </span>
                      </div>

                      <div className={"d-flex justify-content-center gap-3"}>
                        <div className={styles["flightDet_timedate"]}>
                          <span>ش.پ:</span>
                          <span>{flight?.departure_flight?.flight_number}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={"d-flex flex-column justify-content-center "}
                    >
                      <div className={styles["flight_company_remaintour"]}>
                        <p
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          موجودی :
                          <span
                            style={{
                              color: "#e20000",
                              fontWeight: "900",
                              fontSize: "15px",
                            }}
                          >
                            {flight?.capacity}
                          </span>
                        </p>
                      </div>
                      <div className={styles["flight_company"]}>
                        <div className={styles["flight_company_logo"]}>
                          <div className={styles["image_container"]}>
                            {flight?.departure_flight?.airline_thumb?.url ? (
                              <img
                                src={
                                  flight?.departure_flight?.airline_thumb?.url
                                }
                                alt={flight?.departure_flight?.airline_code}
                              />
                            ) : (
                              <img
                                src="Images/noPicture.png"
                                alt="no-picture"
                              />
                            )}
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "12px",
                                padding: "0",
                                marginBottom: "2px",
                              }}
                            >
                              {flight.departure_flight.airline}{" "}
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            // alignItems: "center",
                            padding: "0",
                          }}
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

                        <div className={styles["flight_company_logo"]}>
                          <div className={styles["image_container"]}>
                            {flight?.return_flight?.airline_thumb?.url ? (
                              <img
                                src={flight?.return_flight?.airline_thumb?.url}
                                alt={flight?.return_flight?.airline_code}
                              />
                            ) : (
                              <img
                                src="/Images/noPicture.png"
                                alt="no-picture"
                              />
                            )}
                          </div>
                          <div style={{ marginBottom: "10px" }}>
                            <p
                              style={{
                                fontSize: "12px",
                                padding: "0",
                                marginBottom: "2px",
                              }}
                            >
                              {flight.return_flight.airline}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className={styles["date_night"]}></div>
                    </div>

                    <div className={styles["flightDet"]}>
                      <div className={styles["flightDet_loc"]}>
                        <p>
                          {flight?.return_flight?.origin} به{" "}
                          {flight?.return_flight?.destination}
                        </p>
                      </div>
                      <div className={styles["flightDet_timedate"]}>
                        <span>
                          {MiladiToJalaliConvertor(flight?.return_flight.date)}{" "}
                          -{" "}
                          {getDayInPersian(
                            moment(flight?.return_flight.date).format("dddd")
                          )}
                        </span>

                        <span>|</span>
                        <span style={{}}>
                          {flight?.return_flight?.time.slice(0, 5)}
                        </span>
                      </div>

                      <div className={"d-flex justify-content-center gap-3"}>
                        <div className={styles["flightDet_timedate"]}>
                          <span>ش.پ:</span>
                          <span>{flight?.return_flight?.flight_number}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles["btn-con"]}>
                      <div className={styles["price"]}>
                        <p>قیمت هتل + پرواز (هرنفر)</p>
                        <p className={"font-bold"} style={{color:'#e20000'}}>
                          {numberWithCommas(
                            rooms_flightBase_finder(flight.id, 148)[0].price
                          ) +
                            " " +
                            "تومان"}
                        </p>
                      </div>
                      <button> انتخاب پرواز</button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className={"isMobile"}>
            {flights.map((flight) => {
              return (
                <AvailableFlightMobile
                  setSelectedRoom={() =>
                    setSelectedRoom(rooms_flightBase_finder2(flight.id))
                  }
                  setIsOpen={() => setIsOpen(true)}
                  setSelectedFlight={() => setSelectedFlight(flight.id)}
                  flight={flight}
                  price={numberWithCommas(
                    rooms_flightBase_finder(flight.id, 148)[0].price
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="Modal-2"
        overlayClassName="Overlay"
      >
        <PackageReserve

        tour_id={selectedRoom[0]?.tour_id}
          target_rooms={selectedRoom}
          hotel={props.default_hotel[0]}
          selectedFlight={selectedFlight}
          close={(val) => setIsOpen(val)}
        />
      </Modal>
    </>
  );
};

export default FlightListTour;
