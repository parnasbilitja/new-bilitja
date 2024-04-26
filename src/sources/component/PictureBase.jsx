import React from 'react';
import styles from "../../../styles/Home.module.scss";
import { motion } from 'framer-motion';
const PictureBase = () => {
    return (
      <motion.div  
      initial="pageInitial" animate="pageAnimate" variants={{
          pageInitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1,
          },}}
  >
        <div className="hidden-xs hidden-sm row">
          <div className="col-md-6 px-0">
            <img
              width=""
              height=""
              alt="بلبطجا- لوگو - بیس"
              src="../../../Images/map.webp"
              className={`${styles["hero-image-2"]} pull-right`}
            />
          </div>
          {/*<div className="text-center col-md-4 pt-10 mt-5 px-0">*/}
          {/*  <img*/}
          {/*    width=""*/}
          {/*    height=""*/}
          {/*    alt="بلیطجا - لوگو- بیس۲"*/}
          {/*    src="../../../Images/hamnavaz-logo-bg-tr1.png"*/}
          {/*    className={styles["hero-image-center"]}*/}
          {/*  />*/}
          {/*</div>*/}
          <div className="col-md-6 px-0">
            <img
              width=""
              height=""
              alt="بلبطجا - قطب نما"
              src="../../../Images/earth.webp"
              className={`${styles["hero-image-1"]} pull-left`}
            />
          </div>
        </div>
        </motion.div>
    );
};

export default PictureBase;
