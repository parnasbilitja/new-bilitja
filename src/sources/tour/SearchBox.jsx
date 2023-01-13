import React, { useEffect, useState } from "react";
import styles from "../../../styles/FlightSearchBox.module.scss";
import PrimaryButton from "../component/PrimaryButton.component";
import PrimaryTextInputMobile from "../component/PrimaryTextInputMobile";
import {months} from '../../Utils/data'
import Scrolltoprefresh from "../component/Scrolltoprefresh";
import InputValues from "./InputValues";
import axios from "axios";
//import BirthdayCalendar from "../calendar/BirthdayCalendar.component"

const SearchBox = ({state}) =>{
    const [cities,setCities] = useState([])
    useEffect(() => {
        const getData =async () => {
            let data = await axios.post('https://api.hamnavaz.com/api/v1/city/getCities',{hasTour:true})
            .then((response) => {setCities(response.data.data)})
            return data 
        }
        console.log(getData(),cities);
    },[])
  const [width, setWidth]   = useState();
  useEffect(() => {
    setWidth(window.innerWidth)
  },[])
    
  const [search,setSearch] = useState({
    month:'',
    value:'',
    slug:''
  })

  const mobileSize = 628;

    return (
        <>
      <div className={styles["home-tour-form"]}>
        <div>
          <Scrolltoprefresh />
          <div className={` form-input-border  ${styles["form-input-border-private"]} `}>
            <i className="bilitja icon-plane-departure form-input-icon rotate-y-180"></i>
            <PrimaryTextInputMobile
              value={search.slug}
              name={'slug'}
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
                months={cities}
            />
          </div>
        </div>
        <div className={` form-input-border  ${styles["form-input-border-private"]} `}>
            <i className="bilitja icon-plane-departure form-input-icon rotate-y-180"></i>
            <PrimaryTextInputMobile
              value={search.value}
              name={'month'}
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

        <div className=" without-focus">
          <PrimaryButton className={`${styles['w-200']}`}
            style={{ height: "45px", marginTop: "7px" }}
            value={
            //   state.searchReset == false  ? " جستجو کن!" :
               "لطفا صبر کنید..."
            }
            onClick={() =>console.log(search)}
          />
        </div>
        
      </div>
        </>
    );
  }
export default SearchBox

