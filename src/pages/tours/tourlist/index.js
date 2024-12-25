import React, {useEffect, useMemo, useState} from 'react';
import NavHandler from "../../../Components/share/NavHandler";
import List from '../../../sources/tour/List'
import axios from "axios";
// import Paginate from "@/Components/NewTours/Components/subComponents/Paginate";
import Scrolltoprefresh from "../../../sources/component/Scrolltoprefresh";
import styles from '../../../../styles/allTours.module.scss'
import {useRouter} from "next/router";
import globals from "../../../sources/Global";
import useSWR from "swr";
import TourListData from "../../../Components/NewTours/TourListData";
import {Shimmers, Shimmers6} from "../../../Components/NewTours/Components/subComponents/Shimmers";
import ReactPaginate from "react-paginate";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';


function Index(props) {

    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);

    const [tour,setTour]=useState([])
    const [isParamsReady, setIsParamsReady] = useState(false);
    const [apiParams, setApiParams] = useState(null);
    const [meta,setMeta]=useState([])
    const [isFilter_mobile,setISFilter_nobile]=useState(false)

    const [nightsList,setNightsList]=useState([])


    const [filter, setFilters] = useState({
        airline: {
            departure: '',
            return: ''
        },
        nights: '',
        tour_id: ''


    })
    const [airlines, setAirlines] = useState({

        departure: [],
        return: []


    })




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
    useEffect(()=>{

        if(router.isReady && router.query){
            setApiParams({
                destination:router.query.destination,
                origin: router.query?.origin,
                month:'',
                stayCount:+router.query?.nights ,
                ordering:1,
                req_type:'package',
                date:router.query?.date ,
            })
            setIsParamsReady(true)
        }
    },[router.isReady,router.query])
    const { data: initialData, error: initialError ,isLoading:toursLoading} = useSWR(
        isParamsReady ? [`${globals.tourPackagesnew}packages?page=${page}`, apiParams] : null,
        fetcher
    );


useEffect(()=>{
    setMeta(initialData?.meta)
    setCurrentPage(initialData?.meta?.current_page)
    // console.log(initialData)
},[initialData])
    const handlePageChange = (selectedItem) => {
       setPage(selectedItem)
        setIsParamsReady(true)

     // Update state to reflect the current page
        // Update meta?.current_page in the parent component if necessary
    };
    useEffect(()=>{
        console.log(meta)
    },[meta])
    const { data: tourData, error: tourError,isLoading } = useSWR(
        () => initialData?.data ? initialData.data.map((item) => [`${globals.tourPackagesnew}packages/${item.id}`, { flat: true }]) : null,
        (urls) => Promise.all(urls.map(fetcher))
    );



    const new_tour_list= useMemo(()=>{

        let final_Tour=[]

        if(tourData?.length>0){
            tourData?.forEach(tour=>{
                tour?.data?.flights?.forEach(flight=>{

                    let t={
                        ...tour.data,
                        flightData:{
                            ...flight
                        }
                    }

                    delete t.flights
                    delete t.packages
                    final_Tour.push(t)
                })
            })
        }


        return final_Tour

    },[tourData])





    function removeDuplicatesByName(arr) {
        const seen = new Map();
        return arr?.filter((obj) => {
            const objName = obj.name;
            if (!seen.has(objName)) {
                seen.set(objName, true);
                return true;
            }
            return false;
        });
    }
    const getAirlines = (way) => {

        let airlines = new_tour_list?.map((flight) => ({
            name: flight?.flightData[way].airline,
            thumb: flight?.flightData[way].airline_thumb
        }))
        airlines = removeDuplicatesByName(airlines)
        return airlines
    }
    const compositionFilter = () => {


        let filteredData = [...new_tour_list];

        // Filter by airline names
        if (filter.airline.departure || filter.airline.return) {
            filteredData = filteredData.filter(data =>
                (!filter.airline.departure || data?.flightData?.departure_flight?.airline === filter.airline.departure) &&
                (!filter.airline.return || data?.flightData.return_flight?.airline === filter.airline.return)
            );
        }


        if(filter.nights){
            filteredData = filteredData.filter(data =>data.night_num===filter.nights)
        }

        if(filter.tour_id !==''){

            filteredData = filteredData.filter(data =>data?.id?.toString()?.includes(filter?.tour_id?.toString()));

        }


        setTour(filteredData);
    }

    useEffect(()=>{
        compositionFilter()

    },[filter])

    useEffect(() => {

        // console.log(getAirlines('departure_flight'))
        setAirlines({departure: getAirlines('departure_flight'), return: getAirlines('return_flight')})
setTour(new_tour_list)
    }, [new_tour_list])

    useEffect(()=>{
            let nights=[]
        if(initialData?.data?.length>0){
            initialData?.data.map(tour=>{
                if(!nights.includes(tour.night_num)){
                    nights.push(tour.night_num)
                }
            })
        }

        setNightsList(nights.sort((a, b) => a - b))
    },[initialData])

    function scrollToTop() {
        var body =document.getElementsByTagName("body")
        body[0].scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    useEffect(()=>{
        console.log(filter)
    },[filter])
    return (
        <>
        <NavHandler/>

            <div className={styles['alltour']}>
                <div>
                <Scrolltoprefresh/>


                    <div style={{marginTop:'5rem'}}>
                        {
                            isLoading || toursLoading?
                                <>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>
                                <Shimmers6 selectedHeight={110}/>

                                </>:

                                <div className={styles['list_container']}>
                                    <div
                                        className={`${styles['filterbox_container']} ${isFilter_mobile && styles['filter_open']}`}>
                                        <div className={styles['filter_box']}>
                                            <div className={styles['flight_title']}
                                                 style={{display: 'flex', justifyContent: 'space-between'}}
                                                 onClick={() => setISFilter_nobile(false)}>

                                                <div className={'d-flex align-items-center gap-2'}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         width={20}
                                                         height={20}
                                                         stroke-width="1.5" stroke="#e20000" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/>
                                                    </svg>

                                                    <p>فیلتر پرواز</p>
                                                </div>

                                                <div className={'isDesktop'} style={{justifySelf: 'flex-end'}}>
                                                    <div className={'d-flex justify-content-center'} onClick={() => {
                                                        // setISFilter_nobile(false)
                                                    }}>
                                                        <button style={{
                                                            width: '70px',
                                                            height: '35px',
                                                            backgroundColor: '#e20000',
                                                            borderRadius: '10px',
                                                            color: 'white',
                                                            fontSize: '13px'
                                                        }}

                                                                onClick={() => {
                                                                    setFilters({
                                                                        airline: {
                                                                            departure: '',
                                                                            return: ''
                                                                        },
                                                                        nights:'',
                                                                        tour_id: ''



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
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke-width="1.5"
                                                         stroke="currentColor" className="size-6" width={15}
                                                         height={15}>
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                                    </svg>


                                                    <p className={`${styles['title']} font-bold-iransanse`}> ایرلاین های
                                                        رفت</p>
                                                </div>
                                                <div className={`${styles['airline_list']}`}>
                                                    {airlines.departure.map((airline) => (
                                                        <div
                                                            className={`${styles['airline_item']} ${filter.airline.departure === airline.name && styles['selected_airline']}`}
                                                            onClick={() => {
                                                                // debugger
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
                                                                <img src={airline.thumb.url} alt={airline.name}
                                                                     width={25} height={25}/>
                                                            </div>

                                                            <p className="text-xs text-third-color">{airline.name}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                            <div className={styles['filter_item']}>
                                                <div className={styles['title']}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke-width="1.5"
                                                         stroke="currentColor" className="size-6" width={15}
                                                         height={15}>
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                                    </svg>


                                                    <p className={`${styles['title']} font-bold-iransanse`}> ایرلاین های
                                                        برگشت</p>
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
                                                                compositionFilter()

                                                            }

                                                            }
                                                        >
                                                            <div>
                                                                <img src={airline.thumb.url} alt={airline.name}
                                                                     width={25} height={25}/>
                                                            </div>

                                                            <p className="text-xs text-third-color">{airline.name}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>

                                            <div className={styles['filter_item']}>
                                                <div className={styles['title']}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke-width="1.5"
                                                         stroke="currentColor" className="size-6" width={15}
                                                         height={15}>
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                                    </svg>


                                                    <p className={`${styles['title']} font-bold-iransanse`}>   جستجو براساس تعداد شب
                                                        </p>
                                                </div>

                                            <div className={'mt-3'}>
                                                <select value={filter.nights} onChange={(e)=>{
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        nights:+e.target.value
                                                    }));
                                                }} style={{width:'100%' ,height:'40px',outline:'none', border :'1px solid #cecece',borderRadius:'10px'}} className={'input'} name="" id="">
                                                    <option value="''" disabled selected={filter.nights!==''}>انتخاب شب</option>
                                                    {
                                                        nightsList.map((n) => (
                                                            <option value={n}>{n} شب </option>

                                                        ))
                                                    }

                                                </select>
                                            </div>


                                            </div>
                                            <div className={styles['filter_item']}>
                                                <div className={styles['title']}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         stroke-width="1.5"
                                                         stroke="currentColor" className="size-6" width={15}
                                                         height={15}>
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                                    </svg>


                                                    <p className={`${styles['title']} font-bold-iransanse`}>  جستجو براساس شناسه تور
                                                        </p>
                                                </div>

                                            <div className={'mt-3'}>
                                                <input value={filter.tour_id}
                                                       placeholder={'شناسه تور'}
                                                       onChange={(e)=>{
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        tour_id:+e.target.value
                                                    }));
                                                }} style={{width:'100%' ,height:'40px',outline:'none', border :'1px solid #cecece',borderRadius:'10px'}} className={'input'} name="" id=""/>


                                            </div>


                                            </div>

                                            <div className={'isMobile'}
                                                 style={{justifySelf: 'flex-end', marginTop: '50px'}}>
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
                                                                    nights:'',
                                                                    tour_id: ''

                                                                })

                                                                setISFilter_nobile(false)
                                                            }}>
                                                        حذف فیلتر
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <>

                                        <div className={`isMobile ${styles['btn-con']}`}>

                                        <button className={styles['btn-con']} onClick={()=>{setISFilter_nobile(true)}}>
                                            فیلتر ها
                                        </button>
                                        </div>
                                    <TourListData tours={tour}/>
                                    </>



                                </div>
                        }

                    </div>
                    {
                        tour.length>5 &&
                        <ResponsivePagination
                            current={currentPage}
                            total={meta?.last_page}
                            onPageChange={(e)=>handlePageChange(e)}
                        />
                    }

                    {/*<List scrollToTop={true} scroll_top={()=>scrollToTop()} hideShowMore={false} tourData={tour} shimmerNumber={15} />*/}
                </div>
            </div>
        </>
        // <div>fuck</div>
    );
}

export default Index;
