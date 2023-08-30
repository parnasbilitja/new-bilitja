import React, {useEffect, useState} from "react";
import styles from "../../../../../styles/newTour/components/subComponent/HotelSidebarSearch.module.scss";
import axios from "axios";
import {motion, AnimatePresence} from 'framer-motion'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {collapseVariants} from "../../../../Utils/newTour";
import CollapseSearchComponent from "./CollapseSearch.component";
import {setLoader} from "../../../../Redux/newTours/Action";
import {useDispatch} from "react-redux";

const HotelsSideBarSearch = (props) => {
    const dispatch=useDispatch()

    const [searchInput, setSearchInput] = useState("");

    const [check, setCheck] = useState("");
    const [searchTab, setSearchTab] = useState('input');
    const [stars, setStars] = useState(null)


    const search = (e) => {
        if (e.key === "Enter") {
        dispatch(setLoader(true))
            axios
                .post("https://hotelobilit-api.iran.liara.run/api/v1/hotels/search", {
                    date: props.date,
                    destination: props.destination,
                    keywords: searchInput,
                    orderBy: 1,
                    origin: props.origin,
                    stars: null,
                    stayCount: props.night,
                })
                .then((res) => {
                    props?.setHotels([])
                    props?.setHotels(res?.data?.data?.data);
                    dispatch(setLoader(false))
                })
                .catch((err) => {
                    console.log(err);
                });
            props.setShowFilter(!props.showFilter)
        }
    };

    const reset=()=>{
        dispatch(setLoader(true))
        axios
            .post("https://hotelobilit-api.iran.liara.run/api/v1/hotels/search", {
                date: props.date,
                destination: props.destination,
                keywords: '',
                orderBy: 1,
                origin: props.origin,
                stars: null,
                stayCount: props.night,
            })
            .then((res) => {
                props?.setHotels([])
                props?.setHotels(res?.data?.data?.data);
                dispatch(setLoader(false))
            })
            .catch((err) => {
                console.log(err);
            });
        props.setShowFilter(!props.showFilter)

    }
    ////////based on (cheapest or most expensive) or hotels name that went to search
    const checkedClick = (checkValue, num, searchtype) => {
        dispatch(setLoader(true))
        axios
            .post("https://hotelobilit-api.iran.liara.run/api/v1/hotels/search", {
                date: props.date,
                destination: props.destination,
                keywords: searchInput,
                orderBy: searchtype === "order" ? num : null,
                origin: props.origin,
                stars: searchtype === "star" ? num : null,
                stayCount: props.night,
            })
            .then((res) => {
                props.setHotels(res?.data?.data?.data);
                props.setShowFilter(!props.showFilter)
                dispatch(setLoader(false))
            })
            .catch((err) => {
                console.log(err);
            });
        setCheck(checkValue);

    };
    const variants = {
        initial: {
            right: '-400px',
        },
        animate: {
            right: 0
            , transition: {duration: .5}
        },
        exit: {right: '-400px', transition: {duration: .5}}
    }
    return (
        <>
            <AnimatePresence>
                <div className={styles['p-sidebar']}
                >
                    <div className={styles.sidebarcontainer}>
                        <motion.div variants={variants} initial='initial' animate='animate' exit='exit'
                                    className={styles.sidebar}>
                            <div style={{
                                marginBottom: '15px',
                                borderBottom: '2px solid #dee2e6',
                                padding: '5px 0 8px 0',
                                display:'flex',
                                justifyContent:'space-between'
                            }}>
                                <strong style={{margin:'0',padding:'0' ,display:'flex',alignItems:'center'}}>
                                    فیلتر ها
                                </strong>
                                <div className={styles['btn-container']}>

                                    <button onClick={()=>{reset()}}>
                                        همه
                                    </button>
                                </div>
                            </div>

                            <CollapseSearchComponent searchTab={searchTab}
                                                     setSearchTab={(value) => setSearchTab(value)}
                                                     title='جستجوی نام هتل یااقامتگاه'
                                                     svg={<svg viewBox="0 0 512 512"
                                                               xmlns="http://www.w3.org/2000/svg" width='18px'
                                                               height='18px'><title/>
                                                         <g id="Hotel">
                                                             <path
                                                                 d="M461.8812,29.9019h-228A17.0965,17.0965,0,0,0,216.783,47V465a17.0965,17.0965,0,0,0,17.0982,17.0981h76.0046V351h76V482.0981h75.9954A17.0965,17.0965,0,0,0,478.9793,465V47A17.0965,17.0965,0,0,0,461.8812,29.9019ZM304.1826,299.2255a28.5,28.5,0,1,1,28.5-28.5A28.4992,28.4992,0,0,1,304.1826,299.2255Zm0-80.2746a28.5,28.5,0,1,1,28.5-28.5A28.5007,28.5007,0,0,1,304.1826,218.9509Zm0-80.2745a28.5,28.5,0,1,1,28.5-28.5A28.4992,28.4992,0,0,1,304.1826,138.6764Zm87.3983,160.5491a28.5,28.5,0,1,1,28.5-28.5A28.4993,28.4993,0,0,1,391.5809,299.2255Zm0-80.2746a28.5,28.5,0,1,1,28.5-28.5A28.5007,28.5007,0,0,1,391.5809,218.9509Zm0-80.2745a28.5,28.5,0,1,1,28.5-28.5A28.4993,28.4993,0,0,1,391.5809,138.6764Z"/>
                                                             <path
                                                                 d="M176.3825,385.2728l-40.1836-5.3321-17.9714-33.2454c-3.7434-6.9255-14.56-6.9255-18.3031,0L81.9531,379.9407l-40.1837,5.3321c-8.37,1.111-11.7126,10.5043-5.6557,15.8944l29.0775,25.8792-6.864,36.5411c-1.43,7.6121,7.3209,13.4174,14.8078,9.8224l35.9415-17.2512L145.017,473.41c7.488,3.595,16.2388-2.21,14.8089-9.8224l-6.8652-36.5411,29.0775-25.8792C188.0952,395.7771,184.753,386.3838,176.3825,385.2728Z"/>
                                                             <path
                                                                 d="M176.3825,233.2728l-40.1836-5.3321-17.9714-33.2454c-3.7434-6.9255-14.56-6.9255-18.3031,0L81.9531,227.9407l-40.1837,5.3321c-8.37,1.111-11.7126,10.5043-5.6557,15.8944l29.0775,25.8792-6.864,36.5411c-1.43,7.6121,7.3209,13.4174,14.8078,9.8224l35.9415-17.2512L145.017,321.41c7.488,3.595,16.2388-2.21,14.8089-9.8224l-6.8652-36.5411,29.0775-25.8792C188.0952,243.7771,184.753,234.3838,176.3825,233.2728Z"/>
                                                             <path
                                                                 d="M176.3825,81.2728l-40.1836-5.3321L118.2275,42.6953c-3.7434-6.9255-14.56-6.9255-18.3031,0L81.9531,75.9407,41.7694,81.2728c-8.37,1.111-11.7126,10.5043-5.6557,15.8944l29.0775,25.8792-6.864,36.5411c-1.43,7.6121,7.3209,13.4174,14.8078,9.8224l35.9415-17.2512L145.017,169.41c7.488,3.595,16.2388-2.21,14.8089-9.8224l-6.8652-36.5411,29.0775-25.8792C188.0952,91.7771,184.753,82.3838,176.3825,81.2728Z"/>
                                                         </g>
                                                     </svg>}
                                                     inputType='input'
                            >
                                <input
                                    type="text"
                                    placeholder="نام هتل را وارد کنید"

                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        search(e)
                                    }}
                                />
                            </CollapseSearchComponent>


                            <CollapseSearchComponent searchTab={searchTab}
                                                     setSearchTab={(value) => setSearchTab(value)}
                                                     title='جستجوی براساس ستاره'
                                                     svg={<svg version="1.1" viewBox="0 0 24 24" width="18px"
                                                               height='18px'>
                                                         <g id="info"/>
                                                         <g id="icons">
                                                             <path
                                                                 d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z"
                                                                 id="favorite"/>
                                                         </g>
                                                     </svg>}
                                                     inputType='select'
                            >
                                <select
                                    name=""
                                    id=""
                                    onChange={(e) => {
                                        e.stopPropagation()
                                        checkedClick(null, e.target.value, "star");
                                    }}
                                >
                                    <option selected disabled>
                                        همه
                                    </option>
                                    {[...new Set(props.stars)]?.map((star) => {
                                        return <option value={star}>{star} ستاره </option>;
                                    })}
                                </select>
                            </CollapseSearchComponent>


                            <CollapseSearchComponent searchTab={searchTab}
                                                     setSearchTab={(value) => setSearchTab(value)}
                                                     title='مرتب سازی براساس'
                                                     svg={
                                                         <svg enable-background="new 0 0 48 48" height="18px"
                                                              version="1.1" viewBox="0 0 48 48" width="18px"
                                                              xmlns="http://www.w3.org/2000/svg">
                                                             <g id="Guides"/>
                                                             <g id="Layer_3">
                                                                 <polygon
                                                                     points="27,17.906 30.115,17.906 24.083,7.937 18.052,17.905 21.083,17.905 21.084,30.016 18.017,30.016 24.049,39.985    30.08,30.015 27,30.015  "/>
                                                                 <rect height="6" width="40" x="4"/>
                                                                 <rect height="6" width="39.951" x="4.024" y="42"/>
                                                             </g>
                                                         </svg>
                                                     }
                                                     inputType='checkbox'
                            >

                                <div>

                                    <div className={styles.checkboxcontainer}>
                                        <input
                                            className={styles.checkbox}
                                            type="checkbox"
                                            name="ارزان ترین"
                                            id=""
                                            onClick={() => {
                                                checkedClick("cheap", 1, "order")
                                                props.setShowFilter(!props.showFilter)
                                            }}
                                            checked={check === "cheap" ? true : false}
                                        />
                                        <p>ارزان ترین</p>
                                    </div>
                                    <div className={styles.checkboxcontainer}>
                                        <input
                                            className={styles.checkbox}
                                            type="checkbox"
                                            name="گران ترین"
                                            id=""
                                            checked={check === "expensive" ? true : false}
                                            onClick={() => checkedClick("expensive", 2, "order")}
                                        />
                                        <p>گران ترین</p>
                                    </div>
                                </div>


                            </CollapseSearchComponent>
                        </motion.div>
                    </div>


                </div>
            </AnimatePresence>



        </>


    );
};


export default HotelsSideBarSearch;
