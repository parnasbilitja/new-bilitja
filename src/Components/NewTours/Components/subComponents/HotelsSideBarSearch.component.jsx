import React, {useEffect, useState} from "react";
import styles from "../../../../../styles/newTour/components/subComponent/HotelSidebarSearch.module.scss";
import {motion, AnimatePresence} from 'framer-motion'
import CollapseSearchComponent from "./CollapseSearch.component";
const HotelsSideBarSearch = (props) => {
    const [searchTab, setSearchTab] = useState(props.searchElement[0].inputType);
    const variants = {
        initial: {
            right: '-400px',
        },
        animate: {
            right: 0
            , transition: {duration: .5}
        },
        exit: {right: '-400px', transition: {duration: .5}}
    }
    const closeModal=(e)=>{
        props.setShowFilter()

    }
    return (
        <>
            <AnimatePresence>
                <div className={styles['p-sidebar']}
                     onClick={(e)=>closeModal(e)}
                >
                    <motion.div variants={variants} initial='initial' animate='animate' exit='exit'
                                className={styles.sidebar}>
                        <div style={{
                            marginBottom: '15px',
                            borderBottom: '2px solid #dee2e6',
                            // padding: '5px 0 2px 0',
                            display:'flex',
                            justifyContent:'space-between'
                        }}>
                            <strong style={{margin:'0',padding:'0' ,display:'flex',alignItems:'center'}}>
                                فیلتر ها
                            </strong>
                            <div className={styles['btn-container']}>

                                <button onClick={()=>{props.reset()}}>
                                    حذف فیلتر
                                </button>
                            </div>
                        </div>


                        {props.searchElement.map(s=>(
                            <CollapseSearchComponent searchTab={searchTab}
                                                     setSearchTab={() => setSearchTab(s.inputType)}
                                                     title={s.title}
                                                     svg={s.svg}
                                                     inputType={s.inputType}
                            >

                                {
                                    s.inputTag
                                }

                            </CollapseSearchComponent>
                        ))}
                    </motion.div>
                </div>
            </AnimatePresence>
        </>


    );
};
export default HotelsSideBarSearch;
