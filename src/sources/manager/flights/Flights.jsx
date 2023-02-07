import React, { useEffect, useState } from "react";
import FlightSearchBox from './FlightSearchBox'
import GetFlightListPage from "../../flight_List/GetFlightList.page";
import ShowFlightList from "../../flight_List/ShowFlightList.component";
import { connect } from "react-redux";
import { selectCredentials } from "../../../Redux/Search/search.reselect";
import { addCredentials, switchRoute } from "../../../Redux/Search/search.action";
import { messageBoxModify } from "../../../Redux/UI/ui.action";
import { withRouter } from "next/router";
import globals from "../../Global";
import { Loader } from "../../../Utils/Loader";
import MiniClaender from "./MiniClaender";
import ShowFlightListMobile from "../../flight_List/ShowFlightListMobile.component";


const Flights = (props) => {
    const [ data, setData ] = useState([])
    const [ searchReset, setSearchReset ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [state, setState] = useState({...props.credentials})
    const [width, setWidth] = useState(0)
    const [date,setDate] = useState({
      year:'',
      month:'',
      day:'',
    })
    useEffect(() => {
      setState({...props.credentials})
    },[props.credentials])
    
    useEffect(() => {
      setWidth(window.innerWidth)
        setLoading(true)
        fetch(`${globals.baseUrl2}BilitAirLines/getFlights`, {
            method: "POST",
            body: JSON.stringify({ ...state }),
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setData(data)
              setLoading(false)
              setSearchReset(false)
              if (data.length != 0 && data != undefined) {
                props.addCredentials({
                  flightDateNext: data[0]?.flightDateNext,
                  flightDatePrev: data[0]?.flightDatePrev,
                });
                if (props.searchobject?.withFilters == "true") {
                  props.addFilters({ airlines: data.airlines });
      
                }
                
              } else {
                setSearchReset(false)
                props.messageBoxModify({
                  state: true,
                  color: false,
                  message: "لطفا از تقویم روز دیگری را انتخاب کنید",
                });
              }
            });
    },[])
    
    const seachData = async() => {
      console.log('props.credentials',props.credentials)
      setLoading(true)
      await fetch(`${globals.baseUrl2}BilitAirLines/getFlights`, {
          method: "POST",
          body: JSON.stringify({ ...state }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            setLoading(false)
            setData(data)
            setSearchReset(false)
            if (data.length != 0 && data != undefined) {
              props.addCredentials({
                flightDateNext: data[0]?.flightDateNext,
                flightDatePrev: data[0]?.flightDatePrev,
              });
              if (props.searchobject?.withFilters == "true") {
                props.addFilters({ airlines: data.airlines });
              }
            } else {
              setSearchReset(false)
              props.messageBoxModify({
                state: true,
                color: false,
                message: "لطفا از تقویم روز دیگری را انتخاب کنید",
              });
            }
          });
    }
    useEffect(() => {
      setState({...state,
        flightDatePersian:`${date.year}/${date.month}/${date.day}`,
      })
      seachData()
    },[date.day,date.month,date.year])
  return (
    <section>
      <div>
        <div class="position-relative">
          <h6 className="mt-0 font-bold-iransanse">
            پرواز ها
          </h6>
          <div class="d-flex align-items-center">
            <div class="box-through"></div>
            <div class="aside-through"></div>
          </div>
        </div>
        <FlightSearchBox seachData={seachData} searchReset={searchReset} setSearchReset={setSearchReset} type='panel' />
        <div className="mt-5">
          {
            loading?
            <Loader/>
            :
            data.length>0 ?
            <>
            {width>826 ?
              <ShowFlightList flightList={data} />
              :
              <ShowFlightListMobile flightList={data}/>
            }
            </>
            :
            data.length==[]?
            <MiniClaender setDate={setDate} {...props.credentials} seachData={seachData} />:''
          }
          </div>
         {/* } */}
      </div>
    </section>
  );
};

const mapStatesToProps = (state) => ({
    credentials: selectCredentials(state),
  });
  const mapDispatchesToProps = (dispatch) => ({
    addCredentials: async (value) => dispatch(addCredentials(value)),
    switchRoute: async () => dispatch(switchRoute()),
    messageBoxModify: async (value) => dispatch(messageBoxModify(value)),
  });
  export default withRouter(
    connect(mapStatesToProps, mapDispatchesToProps)(Flights)
  );
  