import React from 'react';
import styles from "../../../styles/Home.module.scss";
const PictureBase = () => {
    return (
        <>
        <div className="hidden-xs hidden-sm row">
          <div className="col-md-4 px-0">
            <img
              width=""
              height=""
              alt="بلیطجا- لوگو"
              src="../../../Images/map.webp"
              className={`${styles["hero-image-2"]} pull-right`}
            />
          </div>
          <div className="text-center col-md-4 pt-10 mt-5 px-0">
            <img
              width=""
              height=""
              alt="بلیطجا - لوگو"
              src="../../../Images/bilitja.webp"
              className={styles["hero-image-center"]}
            />
          </div>
          <div className="col-md-4 px-0">
            <img
              width=""
              height=""
              alt="بلیطجا - قطب نما"
              src="../../../Images/earth.webp"
              className={`${styles["hero-image-1"]} pull-left`}
            />
          </div>
        </div>
        </>
    );
};

export default PictureBase;