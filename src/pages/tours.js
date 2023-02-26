import React, { useEffect, useRef, useState } from 'react';
import dynamic from "next/dynamic";
import styles from "../../styles/Home.module.scss";

import SearchBox from '../sources/tour/SearchBox';
import Scrolltoprefresh from '../sources/component/Scrolltoprefresh';
import HomePicture from '../sources/component/HomePicture';
import { Loader } from '../Utils/Loader';
import PictureBase from '../sources/component/PictureBase';
import ToursBase from '../Components/tours/ToursBase';
const List = dynamic(()=>import( "../sources/tour/List"), {
  loading: () => <Loader/>,
});
const HotelsSuggest = dynamic(()=>import( "../sources/tour/HotelsSuggest"), {
  loading: () => <Loader/>,
});
const CitiesSuggest = dynamic(()=>import( "../sources/tour/CitiesSuggest"), {
  loading: () => <Loader/>,
});
const Posts = dynamic(()=>import( "../sources/tour/Posts"), {
  loading: () => <Loader/>,
});


const tours = () => {
    

    return (
        <div className='mt-5 pt-5 bodyVar'>
        <ToursBase/>
        </div>
    );
};

export default tours;