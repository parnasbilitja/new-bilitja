import React, { useEffect, useState } from "react";
import axios from "axios";
import NavHandler from "../../Components/share/NavHandler";
import Footer from "../../sources/component/Footer.component";
import globals from "../../sources/Global";
import {
  Loading,
  Shimmers3,
} from "../../Components/NewTours/Components/subComponents/Shimmers";
import NotFound from "../NotFound";
import Packages from "../../sources/component/Packages";

const tour = (props) => {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData(props.Pathname?.flight_id);
  }, [props.Pathname]);

  const getData = async (flightId = 0) => {
    debugger;
    setIsLoading(true);
    setData(null);
    // setPackages([]);
    axios
      .post(
        `${globals.tourPackagesnew}packages/${props.Pathname.tour[0]}`,
        { flight_id: flightId },
        {
          headers: {
            "x-app-key":
              "1671|4fd32tDjR5YMiFBuPTIiRHJhDkKgGrd5SaBigR6C5a86ac05", //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        setData(res.data.data);
        // setPackages(res.data?.data?.packages);
        setSelectedFlight(res.data.data?.selected_flight);

        // setFlightList(res.data.data?.flights);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <NavHandler mobileFixed={true} />

      {data ? (
        <Packages
          getData={(val) => getData(val)}
          tourdata={data}
          tourId={props.Pathname.tour[0]}
          selected_flight={selectedFlight}
          tour_type={props.Pathname.tour_type}
          isLoading={isLoading}
          setIsLoading={(val) => setIsLoading(val)}
        />
      ) : isLoading ? (
        <div className={"container"}>
          <Shimmers3 />
          <Shimmers3 />
          <Shimmers3 />
          <Shimmers3 />
          <Shimmers3 />

          <Loading title={"درحال جستجو تور انتخابی شما هستیم..."} />
        </div>
      ) : (
        <NotFound title={"متاسفانه توری یافت نشد"} />
      )}
      <Footer />
    </>
  );
};

tour.getInitialProps = ({ query }) => {
  return {
    Pathname: query,
  };
};

export default tour;
