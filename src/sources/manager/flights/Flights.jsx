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
import axios from "axios";
import NewLoader from "../../../Components/NewTours/Components/subComponents/NewLoader";


const Flights = (props) => {
    const [ data, setData ] = useState([])
    const [ searchReset, setSearchReset ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ state, setState ] = useState({...props.credentials})
    const [ width, setWidth ] = useState(827)
    const [azhansName, setAzhansName ] = useState([])
    const [date,setDate] = useState({
      year:'',
      month:'',
      day:'',
    })
    useEffect(() => {
      setState({...props.credentials})
    },[props.credentials])
    
    const seachData = async() => {
     
      const agenciesDeclare = await axios.get(
        `${globals.baseUrlNew}BilitAirLines/GetRavisKndSysDeclare/1a157116-a01a-4027-ab10-74098ac63815`
      );
      setAzhansName(agenciesDeclare.data)
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
            <NewLoader/>
            :
            data.length>0 ?
            <>
            {width>826 ?
            <>
              <ShowFlightList type='panel' azhansName={azhansName} flightList={data} />
            </>
              :
              <ShowFlightListMobile type='panel' azhansName={azhansName} flightList={data}/>
            }
            </>
            :
            data.length==[] ?
            <MiniClaender setDate={setDate} {...props.credentials} seachData={seachData} />:''
          }
          </div>
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
  