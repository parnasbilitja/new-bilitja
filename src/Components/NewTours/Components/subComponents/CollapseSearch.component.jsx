import React from 'react'
import styles from "../../../../../styles/newTour/components/subComponent/CollapseSearch.module.scss";
import {AnimatePresence, motion} from "framer-motion";
import {collapseVariants, rotateVariants} from "../../../../Utils/newTour";

const CollapseSearchComponent = (props) => {
    return (<>
            <div className={styles.hotelSearchInput}>
                <div className={styles['filter_type']}>
                    <div style={{display: 'flex'}}>
                        {props.svg}
                        <p>{props.title}</p>
                    </div>

                    <motion.div variants={rotateVariants} initial='initial'
                                animate={props.searchTab === props.inputType ? 'animate' : 0} exit='exit'
                                className={styles['collapse_btn']} onClick={(e) => {
                        e.stopPropagation()
                        props.setSearchTab(props.inputType)
                    }}>
                        <svg height="20px" width="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"/>
                        </svg>
                    </motion.div>
                </div>
                <AnimatePresence>
                    {props.searchTab === props.inputType &&
                        <motion.div variants={collapseVariants} initial='initial' animate='animate' exit='exit'
                                    className={styles['inputContainer']}>
                            <div style={{
                                padding: '.725rem',
                                display: 'flex',

                            }}>
                                {props.children}
                            </div>
                        </motion.div>}
                </AnimatePresence>

            </div>
        </>)
}
export default CollapseSearchComponent
