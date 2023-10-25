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
    const numberSorter=(arr)=>{

        return arr.sort((a, b) => +a - +b);
    }

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
                setSearchInput('')
            })
            .catch((err) => {
                console.log(err);
            });
        props.setShowFilter(!props.showFilter)

    }
    ////////based on (cheapest or most expensive) or hotels name that went to search
    const checkedClick = (checkValue, num, searchtype) => {

        console.log(typeof num)
        dispatch(setLoader(true))
        axios
            .post("https://hotelobilit-api.iran.liara.run/api/v1/hotels/search", {
                date: props.date,
                destination: props.destination,
                keywords: searchInput,
                orderBy: searchtype === "order" ? num : null,
                origin: props.origin,
                stars: (searchtype === "star" && num !== 'همه') ? num : null,
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
    const closeModal=(e)=>{
        props.setShowFilter()

    }
    return (
        <>
            <AnimatePresence>
                <div className={styles['p-sidebar']}
                     onClick={(e)=>closeModal(e)}
                >


                    <motion.div variants={variants} initial='initial' animate='animate' exit='exit'
                                className={styles.sidebar}>
                        <div style={{
                            marginBottom: '15px',
                            borderBottom: '2px solid #dee2e6',
                            // padding: '5px 0 2px 0',
                            display:'flex',
                            justifyContent:'space-between'
                        }}>
                            <strong style={{margin:'0',padding:'0' ,display:'flex',alignItems:'center'}}>
                                فیلتر ها
                            </strong>
                            <div className={styles['btn-container']}>

                                <button onClick={()=>{reset()}}>
                                    حذف فیلتر
                                </button>
                            </div>
                        </div>

                        <CollapseSearchComponent searchTab={searchTab}
                                                 setSearchTab={(value) => setSearchTab(value)}
                                                 title='جستجوی نام هتل یااقامتگاه'
                                                 svg={<svg enable-background="new 0 0 300 300" height="28px" id="Layer_1" version="1.1" viewBox="0 0 300 300" width="28px"  xmlns="http://www.w3.org/2000/svg" ><g><rect fill="none" height="21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="21" x="155" y="80"/><rect fill="none" height="21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="21" x="115" y="80"/><rect fill="none" height="21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="21" x="155" y="117"/><rect fill="none" height="21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="21" x="115" y="117"/><rect fill="none" height="21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="21" x="155" y="153"/><rect fill="none" height="21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="21" x="115" y="153"/><polyline fill="none" points="   162,229 162,196 129,196 129,229  " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><g><rect fill="none" height="19" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="19" x="227" y="104"/><rect fill="none" height="19" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="19" x="227" y="138"/><rect fill="none" height="18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="19" x="227" y="171"/><path d="    M203,241h52.807c1.487,0,2.193-1.706,2.193-3.193V229.5V80.193c0-1.487-0.706-2.193-2.193-2.193H203" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><polyline fill="none" points="    203,189 211,189 211,171 203,171   " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><rect fill="none" height="18" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="19" x="227" y="201"/><polyline fill="none" points="    203,219 211,219 211,201 203,201   " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><polyline fill="none" points="    203,157 211,157 211,138 203,138   " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><polyline fill="none" points="    203,123 211,123 211,104 203,104   " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/></g><g><rect fill="none" height="16" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="16" x="50" y="119"/><rect fill="none" height="16" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="16" x="50" y="148"/><rect fill="none" height="15" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="16" x="50" y="177"/><path d="    M87,241H43.042c-1.282,0-4.042-2.622-4.042-3.903V101.222c0-1.283,2.759-1.222,4.042-1.222H88" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><polyline fill="none" points="    88,192 80,192 80,177 88,177   " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><rect fill="none" height="16" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" width="16" x="50" y="202"/><polyline fill="none" points="    87,218 80,218 80,202 87,202   " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><polyline fill="none" points="    88,164 80,164 80,148 87,148   " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/><polyline fill="none" points="    87,135 80,135 80,119 88,119   " stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/></g><path d="   M191,63c0-1.657-1.343-3-3-3h-85c-1.657,0-3,1.343-3,3v175c0,1.657,1.343,3,3,3h85c1.657,0,3,0.657,3-1V63z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6"/></g><line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" x1="92" x2="199" y1="60" y2="60"/><line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" x1="32" x2="88" y1="100" y2="100"/><line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="6" x1="208" x2="264" y1="78" y2="78"/></svg>}
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
                                                 svg={<svg viewBox="0 0 512 512" width='25px' height='25px' xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M370.24,425.59a14.89,14.89,0,0,1-7-1.72L257,368,150.74,423.87A15,15,0,0,1,129,408.06l20.3-118.32-86-83.8a15,15,0,0,1,8.31-25.59l118.81-17.26L243.55,55.43a15,15,0,0,1,26.9,0l53.13,107.66,118.8,17.26a15,15,0,0,1,8.32,25.59l-86,83.8L385,408.06a15,15,0,0,1-14.78,17.53ZM106,205.67l69.85,68.09A15,15,0,0,1,180.17,287l-16.49,96.14L250,337.78a15,15,0,0,1,14,0l86.34,45.39L333.83,287a15,15,0,0,1,4.31-13.27L408,205.67l-96.53-14a15,15,0,0,1-11.29-8.2L257,96l-43.17,87.47a15,15,0,0,1-11.3,8.2Z"/></g></svg>}
                                                 inputType='select'
                        >
                            <select
                                name=""
                                id=""
                                onChange={(e) => {
                                    checkedClick(null, e.target.value, "star");
                                    props.setShowFilter()
                                }}

                                onClick={(e)=>  e.stopPropagation()}
                            >
                                <option selected value='همه'>
                                    همه
                                </option>
                                {numberSorter([...new Set(props.stars)])?.map((star) => {
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
            </AnimatePresence>



        </>


    );
};


export default HotelsSideBarSearch;
