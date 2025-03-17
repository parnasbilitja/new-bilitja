import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import styles from "../../../../../styles/newTour/components/subComponent/Shimmers.module.scss";
import NewLoader from "../../../NewTours/Components/subComponents/NewLoader";

// import styles from '../../../../../styles/allTours.module.scss';



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
            <div className={styles["loadingbox_container"]}>
                <div className={styles["loadingbox"]}>
                    <NewLoader/>
                    <p>بلیطجا در حال یافتن تور انتخابی شماست...</p>
                </div>
            </div>

        </motion.div>
    );
};

export const Shimmers3 = () => {
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




export const Loading=({title})=> {

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const duration = 1 * 60 * 1000; 
        const interval = 100; // Update every 100ms
        const increment = (100 * interval) / duration;

        const intervalId = setInterval(() => {
            setProgress((prev) => {
                if (prev + increment >= 100) {
                    clearInterval(intervalId);
                    return 100;
                }
                return prev + increment;
            });
        }, interval);

        return () => clearInterval(intervalId);
    }, []);
    return <>

<div className='loading'>
<div className={'content'}>
                <img src="../../Images/travel.gif" alt="" width='80px' height='80px'style={{marginBottom:'3px'}}/>
                <p>{title}</p>

        <div className={"progress-bar-container"}>
            <div className={"progress-bar"}>
                <div className={"progress-bar-fill"} style={{width: `${progress}%`}}></div>
            </div>
            <div className={"progress-bar-text"}>{Math.round(progress)}%</div>
        </div>
        </div>
</div>


    </>
}
