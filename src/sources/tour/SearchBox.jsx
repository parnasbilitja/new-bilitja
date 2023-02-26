import React, { useEffect, useState } from "react";
import styles from "../../../styles/FlightSearchBox.module.scss";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../component/PrimaryButton.component";
import PrimaryTextInputMobile from "../component/PrimaryTextInputMobile";
import {months} from '../../Utils/data'
import Scrolltoprefresh from "../component/Scrolltoprefresh";
import InputValues from "./InputValues";
import axios from "axios";
//import BirthdayCalendar from "../calendar/BirthdayCalendar.component"

const SearchBox = ({state, setState,toursHandler, executeScroll}) =>{
    const [cities,setCities] = useState([])
    const [search,setSearch] = useState({
      month:'',
      value:'',
      slug:'',
    })
  const [list, setList] = useState({})

    const handleFocusOut = (event) => {
      const { name,value } = event.target;
      // setSearch({...search,[name]:list[name]});
      
    };
    const handleChange = (event) => {
      const { name, value } = event.target;
      setSearch({...search,[name]:value});
    };
    const handleFocus = (event) => {
      console.log(search);
      const { name,value } = event.target;
      setList({...list, [name]:value});
      setSearch({...search,[name]:''});
      
    };
    useEffect(() => {
        const getData =async () => {
            let data = await axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{hasTour:true})
            .then((response) => {setCities(response.data.data),console.log(response.data)})
            return data 
        }
        getData()
    },[])
  const [width, setWidth]   = useState();
  useEffect(() => {
    setWidth(window.innerWidth)
  },[])
  useEffect(() => {
    setState && setState({...state, city:search.slug})
  },[search.slug])
    return (
      <div className={'row justify-content-between'}>
        <Scrolltoprefresh />
          <div className={`col-12 custom-col-md-5 form-input-border ${styles["form-input-border-private"]} `}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mx-2 tour-input-icon" />
            <PrimaryTextInputMobile
              value={search.slug==" "?'همه':search.slug}
              name={'slug'}
              onFocus={handleFocus}
              onBlur={handleFocusOut}
              // onChange={handleChange}
              onClick={(e) => {
                console.log(e.target.value);
              }}
              placeholder={"شهر خود را انتخاب کنید"}
            />
            <InputValues
                type="cities"
                name='slug'
                search={search}
                setSearch={setSearch}
                months={[{
                  "name": "همه",
                  "slug": " ",
              },...cities]}
                
            />
          
        </div>
        <div className={`col-12 custom-col-md-5 form-input-border ${styles["form-input-border-private"]} `}>
            {/* <i className="bilitja icon-plane-departure form-input-icon rotate-y-180"></i> */}
            <FontAwesomeIcon icon={faCalendarAlt} className="mx-2 tour-input-icon" />
            <PrimaryTextInputMobile
              value={search.value}
              name={'month'}
              onFocus={handleFocus}
              onBlur={handleFocusOut}
              onChange={handleChange}
              onClick={(e) => {
                console.log(e.target.value);
              }}
              placeholder={"چه ماهی میخواید سفر کنید"}
            />
            <InputValues
                type="months"
                name='month'
                search={search}
                setSearch={setSearch}
                months={months}
            />
          </div>

        <div className="col-12 col-md-2 without-focus px-0">
          <PrimaryButton className={`px-0`}
            style={{ height: "45px", marginTop: "7px" }}
            value={ "جستجو" }
            onClick={() =>{toursHandler(search),executeScroll()}}
          />
        </div>
        
      </div>
    );
  }
export default SearchBox

