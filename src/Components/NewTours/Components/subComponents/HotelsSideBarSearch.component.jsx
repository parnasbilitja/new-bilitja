import React, {useEffect, useState} from "react";
import styles from "../../../../../styles/newTour/components/subComponent/HotelSidebarSearch.module.scss";
import axios from "axios";
import {motion,AnimatePresence} from 'framer-motion'

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
        initial:{height:0},
        animate:{height: 'auto',transition:{duration:.725}},
        exit:{height: 0,transition:{duration:.725}}


    }
useEffect(()=>{  console.log('width',props.widthMobi)},[props.widthMobi])


    return (
        <div className={styles['p-sidebar']}>
            {props.widthMobi < 868 && <div>
                <button className={styles.btnFilter} onClick={()=>{
                    setShowFilter(!showFilter)
                }}>فیلتر</button>
                <AnimatePresence>
                    {showFilter?
                            <motion.div className={styles.sidebarcontainer} variants={variants} initial='initial' animate='animate' exit='exit' transition={{duration:1}}>
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
                                </div>
                            </motion.div>


                        :null}
                </AnimatePresence>

            </div>}
            {props.widthMobi > 869&& <div className={styles.sidebar}>
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
            </div>}

        </div>
    );
};

export default HotelsSideBarSearch;
