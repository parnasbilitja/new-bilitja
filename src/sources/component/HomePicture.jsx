import React from 'react';
import styles from "../../../styles/Home.module.scss";

const HomePicture = ({state}) => {
    return (
        <div>
        {state.width >= 826 ? (
          <div className={`${styles["parentbackTour"]}`}>
          <img
            className={`${styles[""]}`}
            width="60%"
            height=""
            alt="بلیطجا-اسلایدر"
            src="../../../../Images/tour-bg-new.png"
          />
        </div>
        ) : null}
        {state.width < 826 ? (
          <div className={`${styles["hero-big-image"]} container`}>
            <img
              width=""
              height=""
              alt="بلیطجا-اسلایدر"
              src="../../../../Images/tour-bg-new.png"
            />
          </div>
        ) : null}
        </div>
    );
};

export default HomePicture;
