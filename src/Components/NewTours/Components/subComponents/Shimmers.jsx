import React from 'react';
import {motion} from "framer-motion";
import styles from "../../../../../styles/newTour/components/subComponent/Shimmers.module.scss";

export const Shimmers = () => {
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

export const Shimmers1= () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.9, repeat: Infinity, repeatType: "reverse",
            }}
            className={styles["box-top-box-reserve3"]}
        >
            {/* <div className={styles["skew"]}></div> */}
        </motion.div>
    );
};

export const Shimmers3= () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.9, repeat: Infinity, repeatType: "reverse",
            }}
            className={styles["box-top-box-reserve4"]}
        >
            {/* <div className={styles["skew"]}></div> */}
        </motion.div>
    );
};export const Shimmers4= () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.9, repeat: Infinity, repeatType: "reverse",
            }}
            className={styles["box-top-box-reserve5"]}
        >
            {/* <div className={styles["skew"]}></div> */}
        </motion.div>
    );
};
export const Shimmers5= () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.9, repeat: Infinity, repeatType: "reverse",
            }}
            className={styles["box-top-box-reserve6"]}
        >
            {/* <div className={styles["skew"]}></div> */}
        </motion.div>
    );
};

export const Shimmers6= ({selectedHeight}) => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.9, repeat: Infinity, repeatType: "reverse",
            }}
            className={styles["box-top-box-reserve7"]}
            style={{height:selectedHeight}}
        >
            {/* <div className={styles["skew"]}></div> */}
        </motion.div>
    );
};




