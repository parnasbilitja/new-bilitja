import React, { useEffect, useState } from "react";
import styles from "../../../styles/FlightSearchBox.module.scss";

import { faCalendarAlt ,faCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../component/PrimaryButton.component";
import PrimaryTextInputMobile from "../component/PrimaryTextInputMobile";
import {months} from '../../Utils/data'
import Scrolltoprefresh from "../component/Scrolltoprefresh";
import InputValues from "./InputValues";
import axios from "axios";
import styles1 from "../../../styles/PrimaryButton.module.scss";
// import {usePostHog} from "posthog-js/react";
// import MonthValues from "@/sources/tour/MonthValues";
import {useRouter} from "next/router";
//import BirthdayCalendar from "../calendar/BirthdayCalendar.component"

const SearchBox = ({state, setState,toursHandler, executeScroll}) =>{

    let router=useRouter()
    const [searchInput,setSearchInput]=useState('')
    const [isSearchbox,setIsSearchbox]=useState(false)
    const [cities,setCities] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [search,setSearch] = useState({
      month:'',
      destination:'',

    })

    useEffect(()=>{
        setIsLoading(false)
    },[isLoading])
    const handleChange = (event) => {
      const { name, value } = event.target;
        setSearchInput(value)
      setSearch({...search,[name]:value});


    };

    useEffect(()=>{
        if(searchInput===''){
            getData()
        }else{
debugger
        const filtered=cities.filter(d=>d.name.includes(searchInput))

        setCities(filtered)
        }
    },[searchInput])
    const getData =async () => {
        let data = await axios.get('https://api.hotelobilit.com/api/v2/tours/destinations',{
            headers: {
                "x-app-key":  '1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05' //the token is a variable which holds the token
            }
        })
            .then((response) => {

                let allDest=[]
                response.data.data.map(dest=>{
                    allDest.push(...dest.destinations)
                })

                let uniqueData = Array.from(
                    allDest.reduce((map, item) => {
                        if (!map.has(item.name)) {
                            map.set(item.name, item);
                        } else {
                            // If you want to keep the item with the largest 'dates' array
                            let existingItem = map.get(item.name);
                            if (item.dates.length > existingItem.dates.length) {
                                map.set(item.name, item);
                            }
                        }
                        return map;
                    }, new Map()).values()
                );
                setCities(uniqueData)
                console.log('newdest',uniqueData)
            })
        return data
    }
    useEffect(() => {
        getData()
    },[])
  const [width, setWidth]   = useState();
  useEffect(() => {
    setWidth(window.innerWidth)

  },[search])
  useEffect(() => {
    setState({...state, city:search.slug})
  },[search.slug])

    const handleFocus=()=>{
      setSearchInput('')
    }
    useEffect(()=>{
        // console.log(cities[0].destinations)
    },[cities])
    // const posthog=usePostHog()
    return (
      <div className={'row justify-content-center'} style={{padding:'0 10px',columnGap:'12px'}}>
        <Scrolltoprefresh />
          <div className={`col-12 custom-col-md-5 form-input-border ${styles["prs-input"]} `} style={{width:width>=826?'40%':'100%'}}>
            <FontAwesomeIcon icon={faCity} style={{height:'30px'}} className="mx-2 tour-input-icon" />
            <PrimaryTextInputMobile
              value={searchInput}
              name={'slug'}
              onFocus={handleFocus}
              // onBlur={handleFocusOut}
              onChange={handleChange}
              onClick={(e) => {
                //
                  setIsSearchbox(true)
              }}
              placeholder={"مقصد خود را انتخاب کنید"}
            />
            <InputValues
                type="cities"
                name='destination'
                search={search}
                setSearch={setSearch}
                months={[{
                  "name": "همه",
                  "code": " ",
              },...cities]}
                issearchbox={isSearchbox}
                setIsSearchbox={()=>setIsSearchbox(false)}
                setsearchInput={(val)=>setSearchInput(val)}
                searchInput={searchInput}
                handleChange={(val)=>handleChange(val)}


            />

        </div>
        {/*<div className={`col-12 custom-col-md-5 form-input-border ${styles["prs-input"]} `} style={{width:width>=826?'40%':'100%'}}>*/}
        {/*    /!* <i className="bilitja icon-plane-departure form-input-icon rotate-y-180"></i> *!/*/}
        {/*    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>*/}
        {/*    <PrimaryTextInputMobile*/}
        {/*      value={months?.filter(m=>m.value===search.month)[0]?.name}*/}
        {/*      name={'month'}*/}
        {/*      // onFocus={handleFocus}*/}
        {/*      // onBlur={handleFocusOut}*/}
        {/*      onChange={handleChange}*/}
        {/*      // onClick={(e) => {*/}
        {/*      //*/}
        {/*      // }}*/}
        {/*      placeholder={" در چه ماهی میخواهید سفر کنید"}*/}
        {/*    />*/}
        {/*    <MonthValues*/}
        {/*        type="months"*/}
        {/*        name='month'*/}
        {/*        search={search}*/}
        {/*        setSearch={setSearch}*/}
        {/*        months={months}*/}
        {/*    />*/}
        {/*  </div>*/}

        <div className="col-12 col-md-2 without-focus px-0">
          <button className={`${styles1['primary-button']} px-0 soc01`}
            style={{ height: "55px", marginTop: "7px",fontSize:'14px',fontWeight:'600',textAlign:'center',borderRadius: "10px"}}
            value={ "جستجو" }
            onClick={() =>{
                // posthog.capture("FormStartTourPackage", {HMNCity: search.slug})

                if(isLoading===false){
                    setIsLoading(true)
                    if(search.destination==='همه'){
                        router.push('/tours/alltours')
                    }else{
                        toursHandler(search);
                    }

                // executeScroll();
                }
                    // debugger

                // if(state.city==='استانبول'){
                //     posthog.capture("pouya", { to:"ist"})
                //
                // }
            }}
          >{isLoading===false? "جستجو" :'لطفا صبر کنید...'}</button>
        </div>

      </div>
    );
  }
export default SearchBox

