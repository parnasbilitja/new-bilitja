import React from 'react';
import {motion} from "framer-motion";
import styles from "../../../../../styles/newTour/components/subComponent/Shimmers.module.scss";

const Shimmers = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.9, repeat: Infinity, repeatType: "reverse",
            }}
            className={styles["box-top-box-reserve2"]}
        >
            {/* <div className={styles["skew"]}></div> */}
        </motion.div>
    );
};

export default Shimmers;