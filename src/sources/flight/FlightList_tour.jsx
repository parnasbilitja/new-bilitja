import styles from '../../../styles/FlightListTour.module.scss'
import React, {useEffect, useState} from "react";
import {MiladiToJalaliConvertor, numberWithCommas, timeFixer} from "../../Utils/newTour";
import {motion} from "framer-motion";
import Modal from "react-modal";
import PackageReserve from "../../Components/modal/PackageReserve";

const FlightListTour = (props) => {

    const [selectedRoom,setSelectedRoom]=useState([])
    const [isFilter_mobile,setISFilter_nobile]=useState(false)
    const [selectedFlight,setSelectedFlight]=useState('')
    const [isOpen,setIsOpen]=useState(false);
    const [airlines, setAirlines] = useState({

        departure: [],
        return: []


    })
    // const [flightNumber,setAirlines]=useState({departure:[],return:[]})
    const [filter, setFilters] = useState({
        airline: {
            departure: '',
            return: ''
        },
        flight_number: {
            departure: '',
            return: ''
        }

    })

    const [flights, setFlights] = useState(props?.default_hotel[0]?.related_flights)

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
            thumb: flight[way].airline_thumb
        }))
        airlines = removeDuplicatesByName(airlines)
        return airlines
    }
    useEffect(() => {
        setAirlines({departure: getAirlines('departure_flight'), return: getAirlines('return_flight')})
    }, [props?.default_hotel[0]?.related_flights])

    // useEffect(()=>{
    //     console.log(SelectedAirlines)
    // },[SelectedAirlines])

    const compositionFilter = () => {

        let filteredData = [...flight_list_sort()];

        // Filter by airline names
        if (filter.airline.departure || filter.airline.return) {
            filteredData = filteredData.filter(data =>
                (!filter.airline.departure || data?.departure_flight?.airline === filter.airline.departure) &&
                (!filter.airline.return || data.return_flight?.airline === filter.airline.return)
            );
        }

        // Filter by flight numbers
        if (filter.flight_number) {

            // const [departureFn, returnFn] = this.compositionListObj.flight_number.split('-');

            filteredData = filteredData.filter(data => {
                if (filter.flight_number.departure && filter.flight_number.return) {
                    return +data.departure_flight?.flight_number.includes(+filter.flight_number.departure)  && +data.return_flight?.flight_number.includes(+filter.flight_number.return);
                } else if (filter.flight_number.departure) {
                    return +data.departure_flight?.flight_number.includes(+filter.flight_number.departure) ;
                } else if (filter.flight_number.return) {
                    return +data.return_flight?.flight_number.includes(+filter.flight_number.return);
                }
                return true;
            });
        }
        //
        // // Filter by week day
        // if (this.compositionListObj.day) {
        //     filteredData = filteredData.filter(data =>
        //         this.calendar.getWeekDay(data.departure.date) === this.compositionListObj.day ||
        //         this.calendar.getWeekDay(data.return.date) === this.compositionListObj.day
        //     );
        // }
        //
        // // Filter by mixed status
        // if (this.compositionListObj.is_mixed !== null) {
        //     const isMixed = this.compositionListObj.is_mixed === 'true';
        //     filteredData = filteredData.filter(data => data.is_mix === isMixed);
        // }
        //
        // // Filter by agency
        // if (this.compositionListObj.agency) {
        //     const agencyId = +this.compositionListObj.agency;
        //     filteredData = filteredData.filter(data =>
        //         +data.departure.agency_id === agencyId &&
        //         +data.return.agency_id === agencyId
        //     );
        // }
        setFlights(filteredData);
        // return  filteredData;
    }


    useEffect(() => {
        compositionFilter()
    }, [filter])



    const rooms_flightBase_finder=(flight_id ,roomId)=>{
       let found_room= props.default_hotel[0]?.rooms.filter(room=>+room.flight_id===+flight_id && +room.room_type_id===+roomId)


return found_room
    }

    // const flight_list_sort=()=>{
    //  let room148=props.default_hotel[0].rooms.filter(room=>+room?.room_type_id===148)
    //
    //    let newFlight= flights.map(flight=>{
    //         room148.map(room=>{
    //             if(flight.id===room.flight_id){
    //                flight.room_prc= room.price
    //             }
    //
    //
    //         })
    //     })
    //
    //
    //     console.log(newFlight)
    // }
    const flight_list_sort = () => {
        let room148 = props.default_hotel[0].rooms.filter(room => +room?.room_type_id === 148);

        let newFlight = props?.default_hotel[0]?.related_flights.map(flight => {
            // Iterate over room148 to find a matching room and update flight
            room148.forEach(room => {
                if (flight.id === room.flight_id) {
                    flight.room_prc = room.price;
                }
            });
            return flight; // Ensure the updated flight object is returned
        });

        let cheapest148room=newFlight.sort((a, b) => (+a.room_prc) - (b.room_prc) );

        return cheapest148room
        // console.log(cheapest148room)
    };
    const rooms_flightBase_finder2=(flight_id )=>{
       let found_room= props.default_hotel[0]?.rooms.filter(room=>+room.flight_id===+flight_id)


return found_room
    }

    useEffect(()=>{
                setFlights(flight_list_sort());
    },[props?.default_hotel[0]?.related_flights])

    return (
        <>
            <div className={styles['flights']}>
                    <div className={`${styles['filterbox_container']} ${isFilter_mobile && styles['filter_open']}`}>
                        <div className={styles['filter_box']}>
                            <div className={styles['flight_title']}
                                 style={{display: 'flex', justifyContent: 'space-between'}}
                                 onClick={() => setISFilter_nobile(false)}>
                                <p>فیلتر پرواز</p>

                                <div className={'isDesktop'} style={{justifySelf: 'flex-end'}}>
                                    <div className={'d-flex justify-content-center'} onClick={() => {
                                        setISFilter_nobile(false)
                                    }}>
                                        <button style={{
                                            width: '70px',
                                            height: '35px',
                                            backgroundColor: '#e20000',
                                            borderRadius: '10px',
                                            color: 'white',
                                            fontSize:'13px'
                                        }}

                                        onClick={()=>{
                                            setFilters({
                                                airline: {
                                                    departure: '',
                                                    return: ''
                                                },
                                                flight_number: {
                                                    departure: '',
                                                    return: ''
                                                }

                                            })
                                        }}>
                                            حذف فیلتر
                                        </button>

                                    </div>

                                </div>

                                <div className={'isMobile'}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width={30}
                                         height={30}
                                         fill="#e20000" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="#e20000"
                                         className="size-6">
                                        <path stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M6 18 18 6M6 6l12 12"/>
                                    </svg>
                                </div>


                            </div>

                            <div className={styles['filter_item']}>
                                <div className={styles['title']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" className="size-6" width={15} height={15}>
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                    </svg>


                                    <p className={styles['title']}> ایرلاین های برگشت</p>
                                </div>
                                <div className={`${styles['airline_list']}`}>
                                    {airlines.departure.map((airline) => (
                                        <div
                                            className={`${styles['airline_item']} ${filter.airline.departure === airline.name && styles['selected_airline']}`}
                                            onClick={() => {
                                                // debugger
                                                // setFilters(prev => ({...prev, airline: {departure: airline.name, ...prev.airline}}))
                                                setFilters(prev => ({
                                                    ...prev,
                                                    airline: {
                                                        ...prev.airline,
                                                        departure: airline.name
                                                    }
                                                }));

                                                // compositionFilter()
                                            }}>
                                            <div className={styles['img_container']}>
                                                <img src={airline.thumb.url} alt={airline.name} width={25} height={25}/>
                                            </div>

                                            <p className="text-xs text-third-color">{airline.name}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className={styles['filter_item']}>
                                <div className={styles['title']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" className="size-6" width={15} height={15}>
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                    </svg>


                                    <p className={styles['title']}> ایرلاین های برگشت</p>
                                </div>
                                <div className={styles['airline_list']}>
                                    {airlines.return.map((airline) => (
                                        <div
                                            className={`${styles['airline_item']} ${filter.airline.return === airline.name && styles['selected_airline']}`}
                                            // onClick={()=>dispatch(SetReturnFlight(airline.name))}
                                            //  onClick={() => setFilters(prev => ({ ...prev, airline: { return: airline.name, ...prev.airline } }))}

                                            onClick={() => {
                                                setFilters(prev => ({
                                                    ...prev,
                                                    airline: {
                                                        ...prev.airline,
                                                        return: airline.name
                                                    }
                                                }));
                                                // compositionFilter()

                                            }

                                            }
                                        >
                                            <div>
                                                <img src={airline.thumb.url} alt={airline.name} width={25} height={25}/>
                                            </div>

                                            <p className="text-xs text-third-color">{airline.name}</p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className={styles['filter_item']}>
                                <div className={styles['title']}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor" className="size-6" width={15} height={15}>
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                    </svg>


                                    <p className={styles['title']}> شماره پرواز</p>
                                </div>
                                <div className={styles['flight_number']}>
                                    <input type="text" placeholder={'شماره پرواز رفت'} onChange={(e) => {
                                        // debugger

                                        // console.log(e.target.value)
                                        setFilters(prev => ({
                                            ...prev,
                                            flight_number: {
                                                ...prev.flight_number,
                                                departure: e.target.value
                                            }
                                        }));
                                    }}/>
                                    <input type="text" placeholder={'شماره پرواز برگشت'}
                                           onChange={(e) => {
                                               // debugger

                                               // console.log(e.target.value)
                                               setFilters(prev => ({
                                                   ...prev,
                                                   flight_number: {
                                                       ...prev.flight_number,
                                                       return: e.target.value
                                                   }
                                               }));
                                           }}
                                    />
                                </div>


                            </div>

                            <div className={'isMobile'}  style={{justifySelf:'flex-end',marginTop:'50px'}}>
                                <div className={'d-flex justify-content-center gap-2'} onClick={() => {
                                    setISFilter_nobile(false)
                                }}>
                                    <button style={{
                                        width: '130px',
                                        height: '40px',
                                        backgroundColor: '#e20000',
                                        borderRadius: '10px',
                                        color: 'white'
                                    }}>
                                        جستجو
                                    </button>
                                    <button style={{
                                        width: '130px',
                                        height: '40px',
                                        backgroundColor: '#e20000',
                                        borderRadius: '10px',
                                        color: 'white'
                                    }}

                                            onClick={() => {
                                                setFilters({
                                                    airline: {
                                                        departure: '',
                                                        return: ''
                                                    },
                                                    flight_number: {
                                                        departure: '',
                                                        return: ''
                                                    }

                                                })

                                                setISFilter_nobile(false)
                                            }}>
                                        حذف فیلتر
                                    </button>

                                </div>

                            </div>

                        </div>
                    </div>


                <div className={styles['flight_container']}>
                    <div className={styles['flight_title']}>
                        <p>
                            انتخاب پرواز
                        </p>

                        <div className={'isMobile'}>
                            <button style={{
                                width: '120px',
                                height: '40px',
                                backgroundColor: '#e20000',
                                borderRadius: '10px',
                                color: 'white'
                            }} onClick={() => {
                                setISFilter_nobile(true)
                            }}>
                                فیلتر پرواز
                            </button>
                        </div>
                    </div>


                    <div className={styles['flight_list']}>
                        {flights?.map(flight => {
                            return (

                                <motion.div className={styles['flight_card']} style={{cursor:'pointer'}} whileHover={{scale: 1.02}}
                                            onClick={() => {
                                                setSelectedRoom(rooms_flightBase_finder2(flight.id))
                                                setIsOpen(true)
                                                setSelectedFlight(flight.id)
                                            }}>

                                    <div className={styles['dep_return']}>
                                        <div className={styles['item_details']}>
                                            <div className={styles['img_container']}>
                                                <img src={flight?.departure_flight?.airline_thumb?.url} alt=""/>

                                            </div>
                                            <div className={styles['item']}>
                                                <p>{flight?.departure_flight?.origin}-{flight?.departure_flight?.destination}</p>
                                            </div>
                                        </div>

                                        <div className={styles['item_details']}>
                                            <div className={styles['item']}>
                                                <p>نام ایرلاین:</p>
                                                <p className={'font-bold'}>{flight?.departure_flight?.airline}</p>
                                            </div>
                                            <div className={styles['item']}>
                                                <p> ش.پ:</p>
                                                <p className={'font-bold'}>{flight?.departure_flight?.flight_number}</p>
                                            </div>
                                        </div>

                                        <div className={styles['item_details']}>
                                            <div className={styles['item']}>
                                                <p>زمان پرواز:</p>
                                                <p>{MiladiToJalaliConvertor(flight?.departure_flight?.date)} | {timeFixer(flight?.departure_flight?.time)}</p>
                                            </div>
                                            <div className={styles['item']}>
                                                <p>مدت پرواز:</p>
                                                <p>{flight?.departure_flight?.flight_duration} ساعت</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={'d-flex justify-content-center  align-content-center'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#e20000" viewBox="0 0 24 24"
                                             width={25}
                                             className={styles['svg']}
                                             height={25}
                                             stroke-width="1.5" stroke="#e20000">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
                                        </svg>

                                    </div>
                                    <div className={styles['dep_return']}>
                                        <div className={styles['item_details']}>
                                            <div className={styles['item']}>
                                                <p>{flight?.return_flight?.origin}-{flight?.return_flight?.destination}</p>
                                            </div>
                                            <div className={styles['img_container']}>
                                                <img src={flight?.return_flight?.airline_thumb?.url} alt=""/>

                                            </div>

                                        </div>

                                        <div className={styles['item_details']}>
                                            <div className={styles['item']}>
                                                <p>نام ایرلاین:</p>
                                                <p className={'font-bold'}>{flight?.return_flight?.airline}</p>
                                            </div>
                                            <div className={styles['item']}>
                                                <p> ش.پ:</p>
                                                <p className={'font-bold'}>{flight?.return_flight?.flight_number}</p>
                                            </div>
                                        </div>

                                        <div className={styles['item_details']}>
                                            <div className={styles['item']}>
                                                <p>زمان پرواز:</p>
                                                <p>{MiladiToJalaliConvertor(flight?.return_flight?.date)} | {timeFixer(flight?.return_flight?.time)}</p>
                                            </div>
                                            <div className={styles['item']}>
                                                <p>مدت پرواز:</p>
                                                <p>{flight?.return_flight?.flight_duration} ساعت</p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className={styles['btn-con']}>
                                        <div className={styles['price']}>
                                            <p>
                                                قیمت هتل + پرواز (هرنفر)
                                            </p>
                                            <p className={'font-bold'}>
                                                {numberWithCommas(rooms_flightBase_finder(flight.id, 148)[0].price) + ' ' + 'تومان'}
                                            </p>
                                        </div>
                                        <button> انتخاب پرواز</button>
                                    </div>
                                </motion.div>


                            )
                        })}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                className={"Modal-2"}
                overlayClassName={"Overlay"}
                contentLabel="Example Modal">
                <PackageReserve target_rooms={selectedRoom} hotel={props.default_hotel[0]} selectedFlight={selectedFlight} close={(val)=>setIsOpen(val)}/>

            </Modal>
        </>


    )
}

export default FlightListTour;
