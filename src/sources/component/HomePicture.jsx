import React from 'react';
import styles from "../../../styles/Home.module.scss";

const HomePicture = ({state}) => {
    return (
        <div>
        {state.width >= 826 ? (
          <div className={`${styles["parentbackTour"]}`}>
          <img
            className={`${styles["backFight"]}`}
            width=""
            height=""
            alt="بلیطجا-اسلایدر"
            src="../../../Images/backTour.png"
          />
          <img
          className={`${styles["frontFight"]}`}
            width=""
            height=""
            alt="بلیطجا-اسلایدر"
            src="../../../Images/frontTour.png"
          />
        </div>
        ) : null}
        {state.width < 826 ? (
          <div className={`${styles["hero-big-image"]} container`}>
            <img
              width=""
              height=""
              alt="بلیطجا-اسلایدر"
              src="../../../Images/flight-index-mobile.webp"
            />
          </div>
        ) : null}
        </div>
    );
};

export default HomePicture;