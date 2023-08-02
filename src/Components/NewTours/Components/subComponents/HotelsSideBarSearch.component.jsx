import React, {useEffect, useState} from "react";
import styles from "../../../../../styles/newTour/components/subComponent/HotelSidebarSearch.module.scss";
import axios from "axios";
import {motion,AnimatePresence} from 'framer-motion'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const HotelsSideBarSearch = (props) => {
    const [searchInput, setSearchInput] = useState("");

    const [check, setCheck] = useState("");
    const [showFilter, setShowFilter] = useState(false);


  const search = (e) => {
        if (e.key === "Enter") {
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
                    props.setHotels(res?.data?.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    ////////based on (cheapest or most expensive) or hotels name that went to search
    const checkedClick = (checkValue, num, searchtype) => {
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
                props.setHotels(res?.data?.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setCheck(checkValue);
    };

    const variants={
        initial:{
            right:'-400px',
           },
        animate:{
            right:0
            ,transition:{duration:.5}},
        exit:{right:'-400px',transition:{duration:.5}}
    }
useEffect(()=>{  console.log('width',props.widthMobi)},[props.widthMobi])

    return (
<>
            {props.widthMobi < 868 &&
                        <AnimatePresence>
                            <div className={styles['p-sidebar']} onClick={()=>{
                                props.setShowFilter(!props.showFilter)
                            }}>
                            <div  className={styles.sidebarcontainer} >
                                <motion.div variants={variants} initial='initial' animate='animate' exit='exit' className={styles.sidebar}>
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
                                        <select
                                            name=""
                                            id=""
                                            onClick={(e) => {
                                                checkedClick(null, e.target.value, "star");
                                            }}
                                        >
                                            <option selected disabled>
                                                همه
                                            </option>
                                            {props.stars?.map((star) => {
                                                return <option value={star}>{star} ستاره </option>;
                                            })}
                                        </select>
                                    </div>
                                    <div className={styles.hotelSearchOrder}>
                                        <p>مرتب سازی براساس</p>
                                        <div>
                                            <input
                                                type="checkbox"
                                                name="ارزان ترین"
                                                id=""
                                                onClick={() => checkedClick("cheap", 1, "order")}
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
                                                onClick={() => checkedClick("expensive", 2, "order")}
                                            />
                                            <p htmlFor="">گران ترین</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            </div>
                        </AnimatePresence>

            }
            {props.widthMobi > 869&&
            <div className={styles['p-sidebar']}>
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
                    <select
                        name=""
                        id=""
                        onClick={(e) => {
                            checkedClick(null, e.target.value, "star");
                        }}
                    >
                        <option selected disabled>
                            همه
                        </option>
                        {props.stars?.map((star) => {
                            return <option value={star}>{star} ستاره </option>;
                        })}
                    </select>
                </div>
                <div className={styles.hotelSearchOrder}>
                    <p>مرتب سازی براساس</p>
                    <div className={styles['p-checkbox']}>
                        <input
                            type="checkbox"
                            name="ارزان ترین"
                            id=""
                            onClick={() => checkedClick("cheap", 1, "order")}
                            checked={check === "cheap" ? true : false}
                        />
                        <p htmlFor="">ارزان ترین</p>
                    </div>
                    <div className={styles['p-checkbox']}>
                        <input
                            type="checkbox"
                            name="گران ترین"
                            id=""
                            checked={check === "expensive" ? true : false}
                            onClick={() => checkedClick("expensive", 2, "order")}
                        />
                        <p htmlFor="">گران ترین</p>
                    </div>
                    {/*<FormGroup>*/}
                    {/*    <FormControlLabel required control={<Checkbox />} label="Required" />*/}
                    {/*</FormGroup>*/}
                </div>
            </div>
                </div>
            }
</>


    );
};

export default HotelsSideBarSearch;
