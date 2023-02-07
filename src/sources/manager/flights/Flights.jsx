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


const Flights = (props) => {
    const [ data, setData ] = useState([])
    const [ searchReset, setSearchReset ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    useEffect(() => {
        setLoading(true)
        fetch(`${globals.baseUrl2}BilitAirLines/getFlights`, {
            method: "POST",
            body: JSON.stringify({ ...props.credentials }),
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
          body: JSON.stringify({ ...props.credentials }),
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
          {
            loading?
            <Loader/>:
            data.length>0 ?
              <ShowFlightList flightList={data} />:
              data.length==[]?
              <MiniClaender {...props.credentials} seachData={seachData} />:''
          }
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
  