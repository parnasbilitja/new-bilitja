import React, {useEffect, useState} from "react";
import styles from "../../../../../styles/newTour/components/subComponent/HotelSidebarSearch.module.scss";
import axios from "axios";
import {motion, AnimatePresence} from 'framer-motion'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {collapseVariants} from "../../../../Utils/newTour";
import CollapseSearchComponent from "./CollapseSearch.component";

const HotelsSideBarSearch = (props) => {
    const [searchInput, setSearchInput] = useState("");

    const [check, setCheck] = useState("");
    const [searchTab, setSearchTab] = useState('input');


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
            props.setShowFilter(!props.showFilter)
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
                props.setShowFilter(!props.showFilter)
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

    useEffect(() => {
        console.log('width', props.widthMobi)
    }, [props.widthMobi])

    return (
        <>
    <AnimatePresence>
                    <div className={styles['p-sidebar']}
                    >
                        <div className={styles.sidebarcontainer}>
                            <motion.div variants={variants} initial='initial' animate='animate' exit='exit'
                                        className={styles.sidebar}>
                                <div style={{marginBottom: '20px'}}>
                                    <strong>
                                        فیلتر ها
                                    </strong>
                                </div>

                                <CollapseSearchComponent searchTab={searchTab}
                                                         setSearchTab={(value) => setSearchTab(value)}
                                                         title='جستجوی نام هتل یااقامتگاه'
                                                         svg={<svg viewBox="0 0 512 512"
                                                                   xmlns="http://www.w3.org/2000/svg" width='20px'
                                                                   height='20px'><title/>
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
                                                         svg={<svg version="1.1" viewBox="0 0 24 24" width="20px"
                                                                   height='20px'>
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
                                        onClick={(e) => {
                                            e.stopPropagation()
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
                                </CollapseSearchComponent>


                                <CollapseSearchComponent searchTab={searchTab}
                                                         setSearchTab={(value) => setSearchTab(value)}
                                                         title='مرتب سازی براساس'
                                                         svg={<svg id="Layer_1" viewBox="0 0 100 100"
                                                                   xmlns="http://www.w3.org/2000/svg" height="35px"
                                                                   width="35px">
                                                             <g>
                                                                 <rect fill="none" height="5.9" width="20px" x="32.4"
                                                                       y="42.7"/>
                                                                 <rect fill="none" height="5.9" width="28.7" x="32.4"
                                                                       y="51.2"/>
                                                                 <rect fill="#010101" height="2.5" width="28.7" x="32.4"
                                                                       y="48.6"/>
                                                                 <rect fill="#010101" height="2.5" width="28.7" x="32.4"
                                                                       y="40.2"/>
                                                                 <rect fill="#010101" height="2.5" width="28.7" x="32.4"
                                                                       y="57.1"/>
                                                                 <g>
                                                                     <polygon
                                                                         points="24.4,26 24.2,26.2 15.1,35.3 16.1,36.3 16.2,36.4 16.4,36.6 16.6,36.8 23.5,29.8 23.5,60.9 24.9,60.9 25.1,60.9     25.3,60.9 25.6,60.9 25.6,29.8 32.5,36.8 33,36.3 33.5,35.8 33.6,35.7 33.8,35.5 34,35.3 24.6,25.9   "/>
                                                                     <polygon
                                                                         points="75.4,64.6 75.3,64.5 74.8,64.1 74.5,63.7 74.4,63.6 67.4,70.5 67.4,39.4 66.9,39.4 66.7,39.4 65.6,39.4     65.3,39.4 65.3,70.5 58.4,63.6 58,63.9 57.9,64.1 56.9,65 66,74.1 66.2,74.3 66.4,74.5 66.6,74.3 75.8,65   "/>
                                                                 </g>
                                                             </g>
                                                         </svg>}
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



            {/*{props.widthMobi > 869 &&*/}
            {/*    <div className={styles['p-sidebar']}>*/}
            {/*        <div className={styles.sidebar}>*/}
            {/*            <div className={styles.hotelSearchInput}>*/}
            {/*                <p>جستجوی نام هتل یا اقامتگاه</p>*/}

            {/*                <input*/}
            {/*                    type="text"*/}
            {/*                    placeholder="نام هتل را وارد کنید"*/}
            {/*                    value={searchInput}*/}
            {/*                    onChange={(e) => setSearchInput(e.target.value)}*/}
            {/*                    onKeyDown={(e) => search(e)}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className={styles.hotelSearchStars}>*/}
            {/*                <p>ستاره های هتل</p>*/}
            {/*                <select*/}
            {/*                    name=""*/}
            {/*                    id=""*/}
            {/*                    onClick={(e) => {*/}
            {/*                        checkedClick(null, e.target.value, "star");*/}
            {/*                    }}*/}
            {/*                >*/}
            {/*                    <option selected disabled>*/}
            {/*                        همه*/}
            {/*                    </option>*/}
            {/*                    {props.stars?.map((star) => {*/}
            {/*                        return <option value={star}>{star} ستاره </option>;*/}
            {/*                    })}*/}
            {/*                </select>*/}
            {/*            </div>*/}
            {/*            <div className={styles.hotelSearchOrder}>*/}
            {/*                <p>مرتب سازی براساس</p>*/}
            {/*                <div className={styles['p-checkbox']}>*/}
            {/*                    <input*/}
            {/*                        type="checkbox"*/}
            {/*                        name="ارزان ترین"*/}
            {/*                        id=""*/}
            {/*                        onClick={() => checkedClick("cheap", 1, "order")}*/}
            {/*                        checked={check === "cheap" ? true : false}*/}
            {/*                    />*/}
            {/*                    <p htmlFor="">ارزان ترین</p>*/}
            {/*                </div>*/}
            {/*                <div className={styles['p-checkbox']}>*/}
            {/*                    <input*/}
            {/*                        type="checkbox"*/}
            {/*                        name="گران ترین"*/}
            {/*                        id=""*/}
            {/*                        checked={check === "expensive" ? true : false}*/}
            {/*                        onClick={() => checkedClick("expensive", 2, "order")}*/}
            {/*                    />*/}
            {/*                    <p htmlFor="">گران ترین</p>*/}
            {/*                </div>*/}
            {/*                /!*<FormGroup>*!/*/}
            {/*                /!*    <FormControlLabel required control={<Checkbox />} label="Required" />*!/*/}
            {/*                /!*</FormGroup>*!/*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}
        </>


    );
};


export default HotelsSideBarSearch;
