import axios from 'axios';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import NavHandler from '../../Components/share/NavHandler';
import Footer from '../../sources/component/Footer.component';
import Scrolltoprefresh from '../../sources/component/Scrolltoprefresh';
import TourData from '../../sources/tour/TourData';
import TourList from '../../sources/tour/TourList';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCity} from '../../Redux/citiesSuggest/Action';
import Head from 'next/head';
import {tourName} from "../../Utils/data";
import router, {useRouter} from "next/router";
import TourSearchBox from "../../Components/NewTours/Components/TourSearchBox";
// import OfferdTours from "../../sources/tour/OfferdTours";
import {fetchOfferdTour} from "../../Redux/OfferdTours/Action";
import dynamic from "next/dynamic";
import Menubar from "../../sources/component/Menubar";
import styles from "../../../styles/Menubar.module.scss";
const OfferdTours = dynamic(() => import("../../sources/tour/OfferdTours"));

const CityTour = (props) => {
    // console.log(props.Pathname.CityTour.slice(4,props.Pathname.CityTour.length));
    // let city = useSelector(state => state.CityReducer)
    // const dispatch = useDispatch()
    //
    // const [currentCity, setCurrentCity] = useState(props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length))
    // const [search, setSearch] = useState(false)
    // const refreshData = (val) => {
    //     setCurrentCity(val.target.value)
    // }
    // useEffect(() => {
    //     // console.log(city);
    //     if (city?.data?.length < 1) {
    //         dispatch(fetchCity())
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     setCurrentCity(props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length))
    // }, [props.Pathname])
    //
    // useEffect(() => {
    //
    //     console.log(currentCity)
    // }, [currentCity])
    //
    //
    // const [data, setData] = useState([])
    // const [newData, setNewData] = useState([])
    // let getData = useSelector(state => state.DataReducer)
    // // const dispatch=useDispatch()
    //
    //
    // useEffect(() => {
    //     if (getData?.data?.length < 1) {
    //         dispatch(fetchOfferdTour())
    //     }
    //     // callData();
    //     setData(getData)
    //
    //     // setWidth(window.innerWidth)
    // }, [])
    //
    // useEffect(() => {
    //     if (data.length < 1) {
    //         setData(getData.data)
    //     }
    // }, [getData])
    //
    // useEffect(() => {
    //     if (data) {
    //         setNewData(data?.filter(city => city.endCity.name === props.Pathname.CityTour.slice(4, props.Pathname.CityTour.length)))
    //     }
    //
    // }, [data])

    const router= useRouter()

    // const [widthMobi, setWidthMobi] = useState(
    //     typeof window !== "undefined" && getWindowSize()
    // );
    //
    // function getWindowSize() {
    //     const {innerWidth} = window;
    //     return innerWidth;
    // }
    //
    // useEffect(() => {
    //     function handleWindowResize() {
    //         setWidthMobi(getWindowSize());
    //     }
    //
    //     window.addEventListener("resize", handleWindowResize);
    // }, []);

    const [isModal, setIsmodal] = useState(false)

    useEffect(()=>{
        console.log(router)
        if(router.asPath.includes('cityTour')){
            router.push(`/${router.query.CityTour}`)
        }
    },[router])
    return (
        <>
        </>
    );
};

CityTour.getInitialProps = ({query}) => {
    return {
        Pathname: query
    }
}

export default CityTour;