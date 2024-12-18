import React, {useEffect, useRef, useState} from 'react';
// mui
import styles from '../../../styles/TourPackage/PackageTourDetails.module.scss'
import {moneyFormatrial} from "../../Utils/SimpleTasks";
import axios from 'axios';
import Link from 'next/link';
import NavHandler from '../../Components/share/NavHandler';
import Footer from '../../sources/component/Footer.component';
import Slider from '../../Components/slider/Slider';
import RequestTour from '../../Components/modal/RequestTour';
import PopUp from '../../sources/component/PopUp.component';
import {Loader} from '../../Utils/Loader';
import Head from 'next/head';
import Scrolltoprefresh from '../../sources/component/Scrolltoprefresh';
import globals from '../../sources/Global'
import {Err, NotifAlert} from "../../Components/NewTours/Components/NotifAlert.component";
import router, {useRouter} from "next/router";
import {
    chdAgeStr,
    getcurrencyfa, isEmpty,
    numberWithCommas,
} from "../../Utils/newTour";
import PopUpWide from "../../sources/component/PopUpWide.component";
import PackageReserve from "../../Components/modal/PackageReserve";

import dynamic from "next/dynamic";
import {Shimmers1, Shimmers3, Shimmers4} from "../../Components/NewTours/Components/subComponents/Shimmers";
import PopUp2 from "../../sources/component/PopUp2";
// import error from "@/pages/error";
import {useDispatch, useSelector} from "react-redux";
// import {fetchCity, fetchCityFailures, fetchCitySucces} from "@/Redux/citiesSuggest/Action";
import NotFound from "../NotFound";
import Packages from "../../sources/component/Packages";

const TransfersList = dynamic(() =>
        import("../../sources/component/TransfersList"),
    {
        ssr: false
    }
);
const MapComponent = dynamic(() =>
        import('../../sources/component/Map.component'),
    {
        ssr: false
    }
);


const tour = (props) => {
const router=useRouter()
    const [selectedHotel, setSelectedHotel] = useState(null)
    const [selectedFlight, setSelectedFlight] = useState(null)
    const [infPrice, setInfPrice] = useState(null)
    const ref = useRef(null);
    const [isdownload, setIsDownload] = useState(false)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null)
    const [packages, setPackages] = useState([])
    const [show, setShow] = useState(false);
    const [flightList, setFlightList] = useState([])
    const [tourId, setTourId] = useState(null);
    // const [packageId, setPackageID] = useState('');
    const [showTransfers, setShowTransfers] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [isReserve, setIsReserve] = useState(false)
    const [filterStats,setFilterStats] = useState('2')
    const [packData, setPackData] = useState({
        number: '',
        count: '1',
        tourId: tourId,
    })
    const [messages, setMessages] = useState({
        isDone: false,
        message: ''
    })


    useEffect(()=>{
            getData()

        console.log(props.Pathname)
    },[props.Pathname])
    const getData = async (flightId = 0) => {

        setIsLoading(true)
        setData(null);
        setPackages([]);
        axios
            .post(
                `${globals.tourPackagesnew}packages/${props.Pathname.tour[0]}`,
                { flight_id: flightId },
                {
                    headers: {
                        "x-app-key":
                            "1673|m1lGLn82YxUIpOQTfg2RrOdEuPeg6BP0XQ0dwshE2de4b92d", //the token is a variable which holds the token
                    },
                }
            )
            .then((res) => {

                setData(res.data.data);
                setPackages(res.data?.data?.packages);
                setSelectedFlight(res.data.data?.selected_flight);
                let foundFlight = res.data.data?.flights.filter(
                    (flight) => flight.id == res.data.data?.selected_flight
                );

                setFlightId({
                    depratureId: foundFlight[0].departure_flight.id,
                    returnId: foundFlight[0].return_flight.id,
                });
                setFlightList(res.data.data?.flights);
                setIsLoading(false)

            }).catch(err=>{
                setIsLoading(false)
                console.log(err)
        });
    };


    // useEffect(() => {
    //     getData();
    // }, [props.Pathname.tour])


    const dispatch = useDispatch()


    const downloadHandler = async () => {
        setIsDownload(true)
        axios.post(`${globals.tourPackagesnew}packages/${props.Pathname.tour[0]}`, {
                flight_id: selectedFlight,
                pdf: true
            },
            {
                headers: {
                    "x-app-key": '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05'
                }
            }

        ).then(res => {


            setIsDownload(false)
            handleDownload(res.data.data.url)


        }).catch((err) => {
            debugger
            setIsDownload(false)
            Err('مشکلی در دانلود pdf بوجود آمده')
        })

    }

    function handleDownload(pdfLink) {

        // window.open(pdfLink, '_blank');

        const url = window.URL.createObjectURL(new Blob([pdfLink], {type: 'application/pdf'}));
        const link = document.createElement('a');
        link.href = pdfLink;
        link.setAttribute('download', 'downloaded-file.pdf'); // Set the desired filename
        link.download = 'tours.pdf'
        // link.target = '_blank'
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    const [flightId, setFlightId] = useState({
        depratureId: null,
        returnId: null
    })


    const roomFinder1 = (rooms, roomTypeID) => {

        return rooms?.filter(room => room?.room_type_id === roomTypeID)
    }


    const getroomsTitle = (rooms) => {


        return rooms?.filter(room => room.pin === 0)
    }


    const hotelSearch = (searchTerm) => {
        let filteredHotel = data?.packages.filter(pack => pack.hotel_name.includes(searchTerm) || pack.hotel_nameEn.toUpperCase().includes(searchTerm.toUpperCase()))
        setPackages(filteredHotel)

    }

    const sortByStars = (hotellist) => {
        let filteredHotel = []
        if(filterStats==='0'){
            // for (let i = 1; i < 7; i++) {
                let filterdHotelBystar = hotellist.sort((a,b)=>(+a.hotel_stars)-(+b.hotel_stars))
                filteredHotel.push(...filterdHotelBystar)
            // }
        }else if(filterStats==='1'){
            // for (let i = 1; i < 7; i++) {
            //     let filterdHotelBystar = hotellist.filter(hotel => +hotel.hotel_stars === i)
                filteredHotel.push(...hotellist.sort((a, b) => roomFinder1(a.rooms, 148)[0]?.price - roomFinder1(b.rooms, 148)[0]?.price))
            // }
        }else{
            for (let i = 1; i < 7; i++) {
                let filterdHotelBystar = hotellist.filter(hotel => +hotel.hotel_stars === i)
                filteredHotel.push(...filterdHotelBystar.sort((a, b) => roomFinder1(a.rooms, 148)[0]?.price - roomFinder1(b.rooms, 148)[0]?.price))
            }
        }

        return filteredHotel
    }



    return (
        <>
            <NavHandler mobileFixed={true}/>

            {
               (data ) ?
                    <Packages getData={(val)=>getData(val)} tourdata={data} tourId={props.Pathname.tour[0]} selected_flight={selectedFlight}
                              tour_type={props.Pathname.tour_type} isLoading={isLoading}
                              setIsLoading={(val) => setIsLoading(val)}/> : isLoading ?
                        <div className={'container'}>

                            <Shimmers3/>
                            <Shimmers3/>
                            <Shimmers3/>
                            <Shimmers3/>
                            <Shimmers3/>
                        </div>:
                        <NotFound title={'متاسفانه توری یافت نشد'}/>


            }
            <Footer/>

        </>


    );
};

tour.getInitialProps = ({query}) => {
    return {
        Pathname: query
    }
}

export default tour;
