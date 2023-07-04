import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "../../../../styles/newTour/Reserve.module.scss";
import moon from "../../../../public/Images/moon.png";
import Image from "next/image";
import Reservation from "../../../Components/NewTours/Reservation";
import NavHandler from "../../../Components/share/NavHandler";
const ReservedHotel = () => {
  const router = useRouter();
  useEffect(() => {
    // console.log(JSON.parse(router.query.rooms));
  }, []);
  return (
    <>
      <NavHandler />
      <div style={{ paddingTop: "7rem" }}>
        <Reservation />
      </div>
    </>
  );
};

export default ReservedHotel;
