import React, { useEffect, useState } from "react";
import styles from "../../../styles/FlightSearchBox.module.scss";

import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import PrimaryButton from "../../sources/component/PrimaryButton.component";
import PrimaryTextInputMobile from "../../sources/component/PrimaryTextInputMobile";
import Scrolltoprefresh from "../../sources/component/Scrolltoprefresh";
import InputValues from "../../sources/tour/InputValues";

const HotelsSearchBox = ({searchHotel,setCity,search,setSearch}) =>{
    const [cities,setCities] = useState([])
    const [list, setList] = useState({})

    const handleFocusOut = (event) => {
        const { name,value } = event.target;
        setCity(search.id);
        setSearch({...search,hotel:''})
      
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        if (name=='slug') {
            setCity(search.id);
            setSearch({...search,hotel:''})
        }else{

            setSearch({...search,[name]:value});
            setCity('')
        }
    };
    const handleFocus = (event) => {
      console.log(search);
      const { name,value } = event.target;
      setList({...list, [name]:value});
      setSearch({...search,[name]:''});
      setCity(search.id);
            setSearch({...search,hotel:''})
    };
    const [width, setWidth]   = useState();
  useEffect(() => {
    setWidth(window.innerWidth)
        const getData =async () => {
            let data = await axios.post('https://api.hamnavaz.com/api/v1/city/getCities')
            .then((response) => {setCities(response.data.data),console.log(response.data)})
            return data 
        }
        getData()
    },[])
  useEffect(() => {
    setCity(search.id)
    // setSearch({...search,hotel:''})
    console.log(search);
  },[search])
    return (
      <div className={'row justify-content-between'}>
        <Scrolltoprefresh />
          <div className={`col-12 custom-col-md-5 form-input-border ${styles["prs-input"]} `} style={{width:width>=826?'40%':'100%',marginTop: "5px"}}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mx-2 tour-input-icon" />
            <PrimaryTextInputMobile
              value={search.slug==" "?'همه':search.slug}
              name={'slug'}
              onFocus={handleFocus}
              onBlur={handleFocusOut}
              onChange={handleChange}
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
                months={[...cities]}
                
            />
          
        </div>
        <div className={`col-12 custom-col-md-5 form-input-border ${styles["prs-input"]} `} style={{width:width>=826?'40%':'100%',marginTop: "5px"}}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mx-2 tour-input-icon" />
            <PrimaryTextInputMobile
              value={search.hotel}
              name={'hotel'}
              onChange={handleChange}
              onClick={(e) => {
                console.log(e.target.value);
              }}
              placeholder={"نام هتل را وارد کنید"}
            />
          </div>

        <div className="col-12 col-md-2 without-focus px-0">
          <PrimaryButton className={`px-0`}
            style={{ height: "55px", marginTop: "0px",fontSize:'14px',fontWeight:'600',textAlign:'center',borderRadius: "10px"}}
            value={ "جستجو" }
            onClick={() =>{searchHotel()}}
          />
        </div>
        
      </div>
    );
  }
export default HotelsSearchBox;