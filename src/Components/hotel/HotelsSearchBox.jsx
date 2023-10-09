import React, { useEffect, useState } from "react";
import styles from "../../../styles/FlightSearchBox.module.scss";

import { faCalendarAlt, faCity } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import PrimaryButton from "../../sources/component/PrimaryButton.component";
import PrimaryTextInputMobile from "../../sources/component/PrimaryTextInputMobile";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import InputValues from "../../sources/tour/InputValues";
import { useDispatch, useSelector } from "react-redux";
import {fetchCitySearch, fetchCitySucces} from "../../Redux/citiesSearch/Action";
import searchBox from "../../sources/tour/SearchBox";

const HotelsSearchBox = ({searchHotel,setCity,search,setSearch,scroll}) =>{
    let cities = useSelector(state => state.CitySearchReducer)
    const [cities1,setCities1]=useState([])
    const dispatch = useDispatch()
    const [list, setList] = useState({})
    const [searchInput,setSearchInput]=useState('')
    const [isSearchbox,setIsSearchbox]=useState(false)

    const handleFocusOut = (event) => {
        const { name,value } = event.target;
        setCity(search.id);
        setSearch({...search,hotel:''})

    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchInput(value)
    };

    const handleChange1 = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        if (name=='slug') {
            setCity(search.id);
            setSearch({...search,hotel:''})
        }else{

            setSearch({...search,[name]:value});
            setCity('')
        }
        console.log(value)
    };

    useEffect(()=>{

        if(searchInput===''){
            setCities1(cities.data)
        }else{
            const filtered=cities.data.filter(city=> city.name.indexOf(searchInput)!==-1)
            console.log(filtered)
            setCities1(filtered)
        }
    },[searchInput])
    const handleFocus = (event) => {
        const { name,value } = event.target;
        setSearchInput('')
        setList({...list, [name]:value});
        setSearch({...search,[name]:''});
        setCity(search.id);
        setSearch({...search,hotel:''})
    };
    const [width, setWidth]   = useState();
    useEffect(() => {
        dispatch(fetchCitySearch())
        setWidth(window.innerWidth)
    },[])
    useEffect(()=>{
        setCities1(cities?.data)
    },[cities.data])
    useEffect(() => {
        setCity(search.id)
    },[search])
    useEffect(()=>{
        console.log(width)
    },[width])

    return (
        <div className="row justify-content-center pt-0 mx-1">
            <div className="col-md-10 px-2">
                <div className={'row justify-content-between'}>
                    <Scrolltoprefresh />
                    <div className={`col-12 custom-col-md-5 form-input-border ${styles["prs-input"]} `} style={{width:width>=826?'40%':'100%'}}>
                        <FontAwesomeIcon icon={faCity} style={{height:'30px'}} className="mx-2 tour-input-icon" />
                        <PrimaryTextInputMobile
                            value={searchInput}
                            name={'slug'}
                            onFocus={handleFocus}
                            onBlur={handleFocusOut}
                            onChange={(e)=>handleChange(e)}
                            onClick={() => {
                                setIsSearchbox(true)
                                // console.log(e.target.value);
                            }}
                            placeholder={"مقصد خود را انتخاب کنید"}
                        />
                        <InputValues
                            type="cities"
                            name='slug'
                            search={search}
                            setSearch={setSearch}
                            months={cities1}
                            setSearchInput={(val)=>setSearchInput(val)}
                            issearchbox={isSearchbox}
                            setIsSearchbox={()=>setIsSearchbox(false)}
                            searchInput={searchInput}
                            handleChange={(val)=>handleChange(val)}
                        />

                    </div>
                    <div className={`col-12 custom-col-md-5 form-input-border ${styles["prs-input"]} `} style={{width:width>=826?'40%':'100%'}}>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{height:'30px'}} className="mx-2 tour-input-icon" />
                        <PrimaryTextInputMobile
                            value={search.hotel}
                            name={'hotel'}
                            onChange={handleChange1}
                            onClick={(e) => {
                                // console.log(e.target.value);
                            }}
                            placeholder={"نام هتل را وارد کنید"}
                        />
                    </div>

                    <div className="col-12 col-md-2 without-focus px-0">
                        <PrimaryButton className={`px-0`}
                                       style={{ height: "55px", marginTop: "7px",fontSize:'14px',fontWeight:'600',textAlign:'center',borderRadius: "10px"}}
                                       value={ "جستجو" }
                                       onClick={() =>{searchHotel()
                                           scroll()
                                       }}
                        >{ "جستجو" }</PrimaryButton>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default HotelsSearchBox;